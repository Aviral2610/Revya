"use client";

import { useEffect, useRef, useState } from "react";

import { ProgressBar } from "@/components/quiz/progress-bar";
import { QuestionRenderer } from "@/components/quiz/question-renderer";
import {
  formatDateOfBirth,
  formatQuizValue,
  getDefaultQuizAnswers,
  getFlattenedQuizQuestions,
  validateQuizStep
} from "@/lib/quiz/schema";
import { getEligibilityRoute } from "@/lib/quiz/routing";
import { clearQuizSession, loadQuizSession, saveQuizSession } from "@/lib/quiz/storage";

function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

function formatPhoneValue(answers) {
  if (!answers.phoneCountryCode && !answers.phoneNumber) {
    return "Not provided";
  }

  return [answers.phoneCountryCode, answers.phoneNumber].filter(Boolean).join(" ").trim();
}

function formatHeightWeightValue(answers) {
  const heightLabel =
    answers.heightFeet && answers.heightInches !== ""
      ? `${answers.heightFeet} ft ${answers.heightInches} in`
      : "Not provided";
  const weightLabel = answers.currentWeight ? `${answers.currentWeight} lbs` : "Not provided";

  if (heightLabel === "Not provided" && weightLabel === "Not provided") {
    return "Not provided";
  }

  return `${heightLabel} / ${weightLabel}`;
}

function getQuestionLabel(question) {
  switch (question.id) {
    case "heightWeight":
      return "Height and current weight";
    case "dateOfBirth":
      return "Date of birth";
    case "glp1Medications":
      return "GLP-1 medications used";
    default:
      return question.label || question.prompt.replace(/\?$/, "");
  }
}

function getQuestionValue(question, answers) {
  switch (question.type) {
    case "height-weight":
      return formatHeightWeightValue(answers);
    case "date-of-birth":
      return formatDateOfBirth(answers);
    case "phone":
      return formatPhoneValue(answers);
    default:
      return formatQuizValue(question.field, answers[question.field]);
  }
}

function buildQuestionSteps(answers) {
  const visibleQuestions = getFlattenedQuizQuestions(answers);

  return visibleQuestions.map((question, index) => ({
    ...question,
    id: question.id,
    screenKind: "question",
    questionNumber: index + 1,
    totalQuestionCount: visibleQuestions.length
  }));
}

function buildFlowSteps(questionSteps) {
  return [
    {
      id: "start",
      type: "start",
      screenKind: "start",
      sectionId: "start",
      sectionLabel: "Start"
    },
    ...questionSteps,
    {
      id: "review",
      type: "review",
      screenKind: "review",
      sectionId: "eligibility",
      sectionLabel: "Eligibility"
    }
  ];
}

function resolveSavedStepId(stepId, answers) {
  const questionSteps = buildQuestionSteps(answers);
  const validStepIds = new Set(questionSteps.map((question) => question.id));
  const firstDetailsId = questionSteps.find((question) => question.sectionId === "details")?.id;
  const firstEligibilityId = questionSteps.find((question) => question.sectionId === "eligibility")?.id;

  if (stepId === "result") {
    return "result";
  }

  if (stepId === "review") {
    return "review";
  }

  if (stepId === "details") {
    return firstDetailsId || "start";
  }

  if (stepId === "eligibility") {
    return firstEligibilityId || "review";
  }

  if (validStepIds.has(stepId)) {
    return stepId;
  }

  return "start";
}

function buildSummaryRows(answers) {
  return [
    {
      label: "Height / weight",
      value: formatHeightWeightValue(answers)
    },
    {
      label: "Goal weight",
      value: answers.goalWeight ? `${answers.goalWeight} lbs` : "Not provided"
    },
    {
      label: "Sex assigned at birth",
      value: formatQuizValue("sex", answers.sex)
    },
    {
      label: "Date of birth",
      value: formatDateOfBirth(answers)
    },
    {
      label: "Phone",
      value: formatPhoneValue(answers)
    },
    {
      label: "Email",
      value: answers.email || "Not provided"
    },
    {
      label: "GLP-1 history",
      value: formatQuizValue("glp1Usage", answers.glp1Usage)
    },
    {
      label: "Treatment preference",
      value: formatQuizValue("treatmentPreference", answers.treatmentPreference)
    },
    {
      label: "State",
      value: formatQuizValue("state", answers.state)
    }
  ];
}

function buildReviewGroups(questionSteps, answers) {
  const groups = [
    {
      id: "details",
      eyebrow: "Profile",
      title: "Details",
      items: []
    },
    {
      id: "eligibility",
      eyebrow: "Medical review",
      title: "Eligibility",
      items: []
    }
  ];

  questionSteps.forEach((question) => {
    const group = groups.find((item) => item.id === question.sectionId);

    if (!group) {
      return;
    }

    group.items.push({
      id: question.id,
      label: getQuestionLabel(question),
      value: getQuestionValue(question, answers)
    });
  });

  return groups.filter((group) => group.items.length > 0);
}

function buildResultMetrics(result) {
  return [
    {
      label: "Age",
      value: result.metrics.age === null ? "Pending" : `${result.metrics.age}`
    },
    {
      label: "BMI",
      value: result.metrics.bmi === null ? "Pending" : `${result.metrics.bmi}`
    },
    {
      label: "Weight to goal",
      value:
        result.metrics.targetLoss === null ? "Pending" : `${Math.max(result.metrics.targetLoss, 0)} lbs`
    }
  ];
}

function getCurrentSectionId(screen) {
  const screenKind = screen.screenKind || screen.type;

  if (screenKind === "start") {
    return "start";
  }

  if (screenKind === "question") {
    return screen.sectionId;
  }

  return "eligibility";
}

export function QuizShell() {
  const [answers, setAnswers] = useState(getDefaultQuizAnswers());
  const [currentStepId, setCurrentStepId] = useState("start");
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [savedAt, setSavedAt] = useState(null);
  const [restoreNote, setRestoreNote] = useState("");
  const [hasHydrated, setHasHydrated] = useState(false);
  const [transitionState, setTransitionState] = useState({
    phase: "idle",
    direction: 1
  });

  const exitTimerRef = useRef(null);
  const enterTimerRef = useRef(null);
  const pendingResultRef = useRef(null);

  const questionSteps = buildQuestionSteps(answers);
  const flowSteps = buildFlowSteps(questionSteps);
  const currentScreen =
    currentStepId === "result"
      ? {
          id: "result",
          type: "result",
          screenKind: "result",
          sectionId: "eligibility",
          sectionLabel: "Eligibility"
        }
      : flowSteps.find((step) => step.id === currentStepId) || flowSteps[0];
  const currentScreenKind = currentScreen.screenKind || currentScreen.type;
  const currentScreenIndex =
    currentStepId === "result" ? flowSteps.length : Math.max(flowSteps.findIndex((step) => step.id === currentStepId), 0);
  const currentSectionId = getCurrentSectionId(currentScreen);
  const summaryRows = buildSummaryRows(answers);
  const reviewGroups = buildReviewGroups(questionSteps, answers);
  const resultMetrics = result ? buildResultMetrics(result) : [];
  const nextFlowStep = currentStepId === "result" ? null : flowSteps[currentScreenIndex + 1] || null;
  const previousFlowStep =
    currentStepId === "result" ? { id: "review" } : flowSteps[Math.max(currentScreenIndex - 1, 0)];
  const isTransitioning = transitionState.phase !== "idle";

  useEffect(() => {
    const savedSession = loadQuizSession();

    if (!savedSession) {
      setHasHydrated(true);
      return;
    }

    const mergedAnswers = {
      ...getDefaultQuizAnswers(),
      ...savedSession.answers
    };
    const nextStepId = resolveSavedStepId(savedSession.currentStepId, mergedAnswers);

    setAnswers(mergedAnswers);
    setCurrentStepId(nextStepId);
    setSavedAt(savedSession.updatedAt);
    setRestoreNote(savedSession.updatedAt ? "We restored your assessment on this device." : "");

    if (nextStepId === "result") {
      setResult(getEligibilityRoute(mergedAnswers));
    }

    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const validStepIds = new Set(flowSteps.map((step) => step.id));

    if (currentStepId !== "result" && !validStepIds.has(currentStepId)) {
      setCurrentStepId("review");
    }
  }, [currentStepId, flowSteps, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const nextSavedAt = saveQuizSession({
      answers,
      currentStepId
    });

    setSavedAt(nextSavedAt);
  }, [answers, currentStepId, hasHydrated]);

  useEffect(() => {
    return () => {
      window.clearTimeout(exitTimerRef.current);
      window.clearTimeout(enterTimerRef.current);
    };
  }, []);

  function setFieldValue(field, value) {
    setAnswers((currentAnswers) => {
      const nextAnswers = {
        ...currentAnswers,
        [field]: value
      };

      if (field === "prescriptionMedicationStatus" && value === "no") {
        nextAnswers.currentMedications = "";
      }

      if (field === "glp1Usage" && value === "never") {
        nextAnswers.glp1Medications = [];
      }

      if (field === "medicationAllergiesStatus" && value === "no") {
        nextAnswers.medicationAllergies = "";
      }

      return nextAnswers;
    });

    setErrors((currentErrors) => {
      const nextErrors = {
        ...currentErrors,
        [field]: undefined
      };

      if (field === "prescriptionMedicationStatus" && value === "no") {
        nextErrors.currentMedications = undefined;
      }

      if (field === "glp1Usage" && value === "never") {
        nextErrors.glp1Medications = undefined;
      }

      if (field === "medicationAllergiesStatus" && value === "no") {
        nextErrors.medicationAllergies = undefined;
      }

      return nextErrors;
    });
  }

  function toggleMulti(question, value, checked) {
    setAnswers((currentAnswers) => {
      const currentValues = Array.isArray(currentAnswers[question.field])
        ? currentAnswers[question.field]
        : [];
      const exclusiveValues = question.exclusiveValues || [];
      let nextValues = currentValues;

      if (exclusiveValues.includes(value)) {
        nextValues = checked ? [value] : [];
      } else if (checked) {
        nextValues = [...currentValues.filter((item) => !exclusiveValues.includes(item)), value];
      } else {
        nextValues = currentValues.filter((item) => item !== value);
      }

      return {
        ...currentAnswers,
        [question.field]: Array.from(new Set(nextValues))
      };
    });

    setErrors((currentErrors) => ({
      ...currentErrors,
      [question.field]: undefined
    }));
  }

  function navigateToStep(nextStepId, direction, nextResult = null) {
    if (!nextStepId || nextStepId === currentStepId || isTransitioning) {
      return;
    }

    window.clearTimeout(exitTimerRef.current);
    window.clearTimeout(enterTimerRef.current);
    pendingResultRef.current = nextResult;

    setRestoreNote("");
    setErrors({});
    setTransitionState({
      phase: "exit",
      direction
    });

    exitTimerRef.current = window.setTimeout(() => {
      if (nextStepId === "result") {
        setResult(nextResult || pendingResultRef.current);
      } else {
        setResult(null);
      }

      setCurrentStepId(nextStepId);
      setTransitionState({
        phase: "enter",
        direction
      });

      enterTimerRef.current = window.setTimeout(() => {
        setTransitionState({
          phase: "idle",
          direction
        });
      }, 280);
    }, 180);
  }

  function handleContinue() {
    if (currentScreenKind === "start") {
      navigateToStep(nextFlowStep?.id, 1);
      return;
    }

    if (currentScreenKind === "question") {
      const validationErrors = validateQuizStep(currentScreen.id, answers);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      navigateToStep(nextFlowStep?.id, 1);
      return;
    }

    if (currentScreenKind === "review") {
      navigateToStep("result", 1, getEligibilityRoute(answers));
    }
  }

  function handleBack() {
    if (currentStepId === "result") {
      navigateToStep("review", -1);
      return;
    }

    if (currentScreenKind === "start") {
      return;
    }

    navigateToStep(previousFlowStep?.id, -1);
  }

  function handleRestart() {
    window.clearTimeout(exitTimerRef.current);
    window.clearTimeout(enterTimerRef.current);
    clearQuizSession();
    setAnswers(getDefaultQuizAnswers());
    setCurrentStepId("start");
    setErrors({});
    setResult(null);
    setSavedAt(null);
    setRestoreNote("");
    setTransitionState({
      phase: "idle",
      direction: 1
    });
  }

  function handleEditStep(stepId) {
    navigateToStep(stepId, -1);
  }

  let primaryActionLabel = "Next question";

  if (currentStepId === "result") {
    primaryActionLabel = "Start over";
  } else if (currentScreenKind === "start") {
    primaryActionLabel = "Start assessment";
  } else if (currentScreenKind === "review") {
    primaryActionLabel = "See my assessment result";
  } else if (nextFlowStep?.id === "review") {
    primaryActionLabel = "Review answers";
  } else if (nextFlowStep?.sectionId && nextFlowStep.sectionId !== currentScreen.sectionId) {
    primaryActionLabel = `Continue to ${nextFlowStep.sectionLabel}`;
  }

  return (
    <div className="quiz-flow-shell" id="quiz-funnel">
      <ProgressBar
        currentQuestionNumber={currentScreenKind === "question" ? currentScreen.questionNumber : null}
        currentScreenType={currentScreenKind}
        currentSectionId={currentSectionId}
        savedAt={savedAt}
        showingResult={currentStepId === "result"}
        totalQuestionCount={questionSteps.length}
      />

      {restoreNote ? <div className="quiz-restore-banner">{restoreNote}</div> : null}

      <div className="quiz-flow-surface">
        <div
          className={classNames(
            "quiz-screen-shell",
            transitionState.phase !== "idle" && `quiz-screen-${transitionState.phase}`,
            transitionState.direction > 0 ? "quiz-screen-forward" : "quiz-screen-backward"
          )}
        >
          <QuestionRenderer
            answers={answers}
            errors={errors}
            onEditStep={handleEditStep}
            onFieldChange={setFieldValue}
            onToggleMulti={toggleMulti}
            result={result}
            resultMetrics={resultMetrics}
            reviewGroups={reviewGroups}
            screen={currentScreen}
            summaryRows={summaryRows}
          />
        </div>

        <div className="quiz-flow-footer">
          <div className="quiz-flow-actions">
            {currentScreenKind !== "start" ? (
              <button className="button ghost" disabled={isTransitioning} onClick={handleBack} type="button">
                {currentStepId === "result" ? "Back to review" : "Back"}
              </button>
            ) : (
              <span aria-hidden className="quiz-flow-placeholder" />
            )}

            <button
              className="button primary quiz-primary-action"
              disabled={isTransitioning}
              onClick={currentStepId === "result" ? handleRestart : handleContinue}
              type="button"
            >
              {primaryActionLabel}
            </button>
          </div>

          <p className="quiz-flow-caption">
            {currentStepId === "result"
              ? "This assessment result is informational only and does not guarantee eligibility or a prescription."
              : "Answers are saved on this device while you move through the Revya assessment."}
          </p>
        </div>
      </div>
    </div>
  );
}
