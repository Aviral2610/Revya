"use client";

import { quizProgressSteps } from "@/lib/quiz/schema";

function formatSavedAt(savedAt) {
  if (!savedAt) {
    return "Ready to save";
  }

  const date = new Date(savedAt);

  if (Number.isNaN(date.getTime())) {
    return "Saved on this device";
  }

  return `Saved on this device at ${new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit"
  }).format(date)}`;
}

function getProgressCopy({
  currentScreenType,
  currentSectionId,
  currentQuestionNumber,
  totalQuestionCount,
  showingResult
}) {
  if (showingResult || currentScreenType === "result") {
    return "Assessment complete";
  }

  if (currentScreenType === "review") {
    return "Review and submit";
  }

  if (currentScreenType === "start") {
    return "Preview the 3-step flow";
  }

  if (currentQuestionNumber && totalQuestionCount) {
    return `Question ${currentQuestionNumber} of ${totalQuestionCount}`;
  }

  return currentSectionId === "eligibility" ? "Medical screening" : "Assessment in progress";
}

function getProgressPercent({ currentScreenType, currentQuestionNumber, totalQuestionCount }) {
  if (currentScreenType === "result") {
    return 100;
  }

  if (currentScreenType === "review") {
    return 96;
  }

  if (currentScreenType === "start") {
    return 8;
  }

  if (!currentQuestionNumber || !totalQuestionCount) {
    return 12;
  }

  return Math.max(12, Math.min(92, (currentQuestionNumber / totalQuestionCount) * 100));
}

export function ProgressBar({
  currentQuestionNumber,
  currentScreenType,
  currentSectionId,
  savedAt,
  showingResult = false,
  totalQuestionCount
}) {
  const currentIndex = quizProgressSteps.findIndex((step) => step.id === currentSectionId);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const progressPercent = getProgressPercent({
    currentScreenType,
    currentQuestionNumber,
    totalQuestionCount
  });
  const progressCopy = getProgressCopy({
    currentScreenType,
    currentSectionId,
    currentQuestionNumber,
    totalQuestionCount,
    showingResult
  });

  return (
    <div className="quiz-progress-card">
      <div className="quiz-progress-head">
        <div>
          <p className="mini-label">Revya Assessment</p>
          <strong>{progressCopy}</strong>
        </div>
        <span>{formatSavedAt(savedAt)}</span>
      </div>

      <div aria-hidden className="quiz-progress-meter">
        <span style={{ width: `${progressPercent}%` }} />
      </div>

      <ol aria-label="Quiz progress" className="quiz-stage-list">
        {quizProgressSteps.map((step, index) => {
          let state = "upcoming";

          if (showingResult || index < safeIndex) {
            state = "complete";
          } else if (index === safeIndex) {
            state = "current";
          }

          return (
            <li
              aria-current={state === "current" ? "step" : undefined}
              className={`quiz-stage quiz-stage-${state}`}
              key={step.id}
            >
              <span className="quiz-stage-orb" aria-hidden>
                {state === "complete" ? "✓" : index + 1}
              </span>
              <span className="quiz-stage-copy">
                <strong>{step.label}</strong>
                <small>
                  {step.id === "start"
                    ? "What to expect"
                    : step.id === "details"
                      ? "Profile details"
                      : "Medical screening"}
                </small>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
