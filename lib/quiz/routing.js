import { buildDateOfBirth } from "@/lib/quiz/schema";

const ROUTE_CONTENT = {
  not_eligible: {
    label: "Not eligible",
    title: "A standard online GLP-1 pathway does not look like the right next step.",
    summary:
      "Your answers suggest the usual online medication route may not be appropriate right now.",
    nextSteps: [
      "Treat this result as guidance only, not a diagnosis or prescription decision.",
      "Review your history with a licensed clinician before pursuing treatment.",
      "If your circumstances change, you can repeat the assessment later."
    ]
  },
  manual_review: {
    label: "Manual review",
    title: "A clinician should review your intake before any recommendation is made.",
    summary:
      "One or more safety considerations mean your history should be reviewed directly by a clinician.",
    nextSteps: [
      "Keep a list of diagnoses, medications, and prior treatments ready for follow-up.",
      "A clinician may still recommend treatment after reviewing the full intake.",
      "Final eligibility always depends on clinician judgment."
    ]
  },
  eligible_injection: {
    label: "Eligible for injection consult",
    title: "A weekly injection consult looks like the strongest next step.",
    summary:
      "Based on your answers, the strongest next step appears to be clinician review for a weekly injectable treatment path.",
    nextSteps: [
      "Treat this route as a starting point, not a prescription decision.",
      "A licensed clinician still confirms fit, dosing, and contraindications before treatment begins.",
      "If prescribed, refills, follow-up, and support continue through the Revya portal."
    ]
  },
  eligible_oral: {
    label: "Eligible for oral consult",
    title: "A daily oral program looks like the strongest next step.",
    summary:
      "Based on your answers, the strongest next step appears to be clinician review for an oral treatment format.",
    nextSteps: [
      "Treat this route as a starting point, not a prescription decision.",
      "A licensed clinician still confirms fit, dosing, and contraindications before treatment begins.",
      "If prescribed, refills, follow-up, and support continue through the Revya portal."
    ]
  },
  eligible_flexible: {
    label: "Eligible for flexible consult",
    title: "A flexible clinician-led consult looks like the strongest next step.",
    summary:
      "Your answers support clinician review, with the final medication format left open based on history and provider judgment.",
    nextSteps: [
      "A clinician can compare fit across injection, oral, or transition pathways.",
      "Your treatment format should be chosen only after reviewing your full history.",
      "If prescribed, refills, follow-up, and support continue through the Revya portal."
    ]
  }
};

function asNumber(value) {
  if (value === "" || value === undefined || value === null) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function calculateAge(answers) {
  const birthDate = buildDateOfBirth(answers);

  if (!birthDate) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDelta = today.getMonth() - birthDate.getMonth();

  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
}

export function calculateBodyMassIndex(answers) {
  const feet = asNumber(answers.heightFeet);
  const inches = asNumber(answers.heightInches);
  const currentWeight = asNumber(answers.currentWeight);

  if (feet === null || inches === null || currentWeight === null) {
    return null;
  }

  const totalInches = feet * 12 + inches;

  if (totalInches <= 0) {
    return null;
  }

  return Number(((currentWeight / (totalInches * totalInches)) * 703).toFixed(1));
}

export function calculateTargetLoss(answers) {
  const currentWeight = asNumber(answers.currentWeight);
  const goalWeight = asNumber(answers.goalWeight);

  if (currentWeight === null || goalWeight === null) {
    return null;
  }

  return Number((currentWeight - goalWeight).toFixed(1));
}

function buildResult(routeKey, reasons, answers, overrides = {}) {
  const base = ROUTE_CONTENT[routeKey];

  return {
    route: routeKey,
    label: base.label,
    title: overrides.title || base.title,
    summary: overrides.summary || base.summary,
    reasons,
    nextSteps: overrides.nextSteps || base.nextSteps,
    currentMedicationContext: Boolean(overrides.currentMedicationContext),
    metrics: {
      age: calculateAge(answers),
      bmi: calculateBodyMassIndex(answers),
      targetLoss: calculateTargetLoss(answers)
    }
  };
}

export function getEligibilityRoute(answers) {
  const age = calculateAge(answers);

  if (age !== null && age < 18) {
    return buildResult(
      "not_eligible",
      ["This program is intended for adults age 18 and older."],
      answers
    );
  }

  if (answers.pregnancyStatus === "yes") {
    return buildResult(
      "not_eligible",
      ["Pregnancy, breastfeeding, or trying to become pregnant should not route into the standard GLP-1 flow."],
      answers
    );
  }

  if (answers.thyroidHistory === "yes") {
    return buildResult(
      "not_eligible",
      ["A history of medullary thyroid cancer or MEN2 is a standard contraindication for automatic GLP-1 routing."],
      answers
    );
  }

  const manualReviewReasons = [];

  if (answers.diabetesHistory === "yes" || answers.diabetesHistory === "not_sure") {
    manualReviewReasons.push(
      "Diabetes history should be reviewed directly by a clinician before recommending a standard weight-loss pathway."
    );
  }

  if (answers.pancreatitisHistory === "yes") {
    manualReviewReasons.push(
      "A history of pancreatitis needs clinician review before medication routing."
    );
  }

  if (answers.severeGiDiseaseHistory === "yes") {
    manualReviewReasons.push(
      "Severe gastrointestinal disease such as gastroparesis needs clinician review before medication routing."
    );
  }

  if (answers.gallbladderHistory === "yes") {
    manualReviewReasons.push(
      "Gallbladder history should be reviewed by a clinician before standard routing."
    );
  }

  if (answers.eatingDisorderHistory === "yes") {
    manualReviewReasons.push(
      "Eating-disorder history should be reviewed directly by a clinician before recommending treatment."
    );
  }

  if (manualReviewReasons.length > 0) {
    return buildResult("manual_review", manualReviewReasons, answers);
  }

  if (answers.glp1Usage === "current") {
    return buildResult(
      "eligible_flexible",
      [
        "Current GLP-1 use means a clinician should review dose, tolerance, and transition context instead of treating this as a first-start intake.",
        "Your preferred treatment format can still be discussed after your current medication history is reviewed."
      ],
      answers,
      {
        title: "Current GLP-1 use points to clinician review focused on continuation or transition.",
        summary:
          "Because you are already using a GLP-1, the next step should focus on optimization, continuation, or transition planning with a clinician.",
        currentMedicationContext: true
      }
    );
  }

  if (answers.glp1Usage === "past") {
    return buildResult(
      "eligible_flexible",
      [
        "Prior GLP-1 history usually benefits from a clinician-led comparison instead of a fixed first-start recommendation.",
        "Your prior experience can help a provider match you to the best next format."
      ],
      answers
    );
  }

  if (answers.treatmentPreference === "weekly_injection") {
    return buildResult(
      "eligible_injection",
      [
        "You reported no GLP-1 history that would force a transition workflow.",
        "Your stated preference is a weekly injection format."
      ],
      answers
    );
  }

  if (answers.treatmentPreference === "daily_pill") {
    return buildResult(
      "eligible_oral",
      [
        "You reported no GLP-1 history that would force a transition workflow.",
        "Your stated preference is a daily pill format."
      ],
      answers
    );
  }

  return buildResult(
    "eligible_flexible",
    [
      "You reported no GLP-1 history that would force a transition workflow.",
      "You did not specify a fixed treatment format, so the best next step is a flexible clinician-led consult."
    ],
    answers
  );
}
