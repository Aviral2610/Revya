const REQUIRED_MESSAGE = "Field is required";

const US_STATES = [
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"],
  ["DC", "District of Columbia"]
];

const MONTH_OPTIONS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
].map((label, index) => ({
  value: String(index + 1),
  label
}));

const COUNTRY_CODE_OPTIONS = [
  { value: "+1", label: "US +1" },
  { value: "+44", label: "UK +44" },
  { value: "+61", label: "AU +61" },
  { value: "+91", label: "IN +91" }
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - 1899 }, (_, index) => {
  const year = String(CURRENT_YEAR - index);
  return {
    value: year,
    label: year
  };
});

function buildBinaryOptions(yesLabel = "Yes", noLabel = "No") {
  return [
    { value: "yes", label: yesLabel },
    { value: "no", label: noLabel }
  ];
}

export const quizProgressSteps = [
  { id: "start", label: "Start" },
  { id: "details", label: "Details" },
  { id: "eligibility", label: "Eligibility" }
];

export const quizSections = [
  {
    id: "start",
    label: "Start",
    heroHeading: "Start with a short assessment before clinician-guided weight-loss care.",
    subtext:
      "Answer a few guided questions so we can understand your goals, screening needs, and likely next step.",
    ctaLabel: "Start assessment"
  },
  {
    id: "details",
    label: "Details",
    heading: "Tell us about your goals and the basics of your profile.",
    subtext:
      "These details help us prepare your route and give a clinician the right starting context if you continue.",
    questions: [
      {
        id: "heightWeight",
        type: "height-weight",
        prompt: "What is your height and weight?",
        fields: [
          {
            key: "heightFeet",
            label: "Feet",
            eyebrow: "FEET",
            options: ["4", "5", "6", "7"].map((value) => ({ value, label: value }))
          },
          {
            key: "heightInches",
            label: "Inches",
            eyebrow: "INCHES",
            options: Array.from({ length: 12 }, (_, index) => ({
              value: String(index),
              label: String(index)
            }))
          },
          {
            key: "currentWeight",
            label: "Weight (in lbs)",
            eyebrow: "WEIGHT",
            inputType: "number",
            inputMode: "numeric",
            min: 70,
            max: 700,
            invalidMessage: "Please enter a valid weight"
          }
        ]
      },
      {
        id: "goalWeight",
        type: "number",
        prompt: "What is your goal weight?",
        field: "goalWeight",
        label: "What is your goal weight?",
        inputType: "number",
        inputMode: "numeric",
        min: 70,
        max: 700,
        invalidMessage: "Please enter a valid goal weight"
      },
      {
        id: "sex",
        type: "radio",
        prompt: "What sex were you assigned at birth?",
        field: "sex",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" }
        ]
      },
      {
        id: "dateOfBirth",
        type: "date-of-birth",
        prompt: "What is your date of birth?",
        fields: [
          {
            key: "dobMonth",
            label: "Month",
            component: "select",
            placeholder: "Month",
            options: MONTH_OPTIONS
          },
          {
            key: "dobDay",
            label: "Day",
            inputType: "text",
            inputMode: "numeric",
            placeholder: "DD",
            maxLength: 2
          },
          {
            key: "dobYear",
            label: "Year",
            component: "select",
            placeholder: "Year",
            options: YEAR_OPTIONS
          }
        ]
      },
      {
        id: "phone",
        type: "phone",
        prompt: "What phone number should we use for care updates?",
        fields: [
          {
            key: "phoneCountryCode",
            label: "Country code",
            component: "select",
            placeholder: "Code",
            options: COUNTRY_CODE_OPTIONS
          },
          {
            key: "phoneNumber",
            label: "Phone number",
            inputType: "tel",
            inputMode: "tel",
            autoComplete: "tel",
            placeholder: "(555) 123-4567"
          }
        ]
      },
      {
        id: "email",
        type: "email",
        prompt: "What email should we use for your assessment?",
        field: "email",
        label: "Email",
        inputType: "email",
        autoComplete: "email",
        placeholder: "you@example.com"
      }
    ]
  },
  {
    id: "eligibility",
    label: "Eligibility",
    heading: "Complete your medical screening.",
    subtext:
      "These answers help us route you toward the most appropriate next step instead of a broad, one-size-fits-all result.",
    questions: [
      {
        id: "pregnancyStatus",
        type: "radio",
        prompt: "Are you currently pregnant, trying to become pregnant, or breastfeeding?",
        field: "pregnancyStatus",
        options: buildBinaryOptions()
      },
      {
        id: "diabetesHistory",
        type: "radio",
        prompt: "Have you ever been diagnosed with Type 1 or Type 2 diabetes?",
        field: "diabetesHistory",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not_sure", label: "Not sure" }
        ]
      },
      {
        id: "pancreatitisHistory",
        type: "radio",
        prompt: "Have you ever been diagnosed with pancreatitis?",
        field: "pancreatitisHistory",
        options: buildBinaryOptions()
      },
      {
        id: "gallbladderHistory",
        type: "radio",
        prompt: "Have you ever had gallbladder disease or gallbladder surgery?",
        field: "gallbladderHistory",
        options: buildBinaryOptions()
      },
      {
        id: "severeGiDiseaseHistory",
        type: "radio",
        prompt: "Have you ever been diagnosed with severe gastrointestinal disease, such as gastroparesis?",
        field: "severeGiDiseaseHistory",
        options: buildBinaryOptions()
      },
      {
        id: "thyroidHistory",
        type: "radio",
        prompt: "Have you ever been diagnosed with medullary thyroid cancer or MEN2 syndrome?",
        field: "thyroidHistory",
        options: buildBinaryOptions()
      },
      {
        id: "eatingDisorderHistory",
        type: "radio",
        prompt: "Have you ever had an eating disorder such as anorexia or bulimia?",
        field: "eatingDisorderHistory",
        options: buildBinaryOptions()
      },
      {
        id: "prescriptionMedicationStatus",
        type: "radio",
        prompt: "Are you currently taking any prescription medications?",
        field: "prescriptionMedicationStatus",
        options: buildBinaryOptions()
      },
      {
        id: "currentMedications",
        type: "textarea",
        prompt: "Please list your current medications",
        field: "currentMedications",
        placeholder: "Include prescription names and doses if you know them.",
        rows: 4,
        condition: (answers) => answers.prescriptionMedicationStatus === "yes"
      },
      {
        id: "glp1Usage",
        type: "radio",
        prompt: "Have you ever used GLP-1 medication (like Ozempic, Wegovy, Mounjaro, Zepbound)?",
        field: "glp1Usage",
        options: [
          { value: "current", label: "Yes, currently" },
          { value: "past", label: "Yes, in the past" },
          { value: "never", label: "Never" }
        ]
      },
      {
        id: "glp1Medications",
        type: "multi-select",
        prompt: "Which GLP-1 medications have you used?",
        field: "glp1Medications",
        condition: (answers) => answers.glp1Usage === "current" || answers.glp1Usage === "past",
        exclusiveValues: ["not_sure"],
        options: [
          { value: "semaglutide", label: "Semaglutide" },
          { value: "tirzepatide", label: "Tirzepatide" },
          { value: "liraglutide", label: "Liraglutide" },
          { value: "wegovy", label: "Wegovy" },
          { value: "ozempic", label: "Ozempic" },
          { value: "zepbound", label: "Zepbound" },
          { value: "mounjaro", label: "Mounjaro" },
          { value: "not_sure", label: "Not sure" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "primaryGoal",
        type: "select",
        prompt: "What is your primary goal for weight loss?",
        field: "primaryGoal",
        label: "Primary goal",
        placeholder: "Select your primary goal",
        options: [
          { value: "reduce_weight", label: "Reduce weight" },
          { value: "improve_energy", label: "Improve energy" },
          { value: "improve_health_markers", label: "Improve health markers" },
          { value: "better_mobility", label: "Better mobility" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "treatmentPreference",
        type: "radio",
        prompt: "Which treatment format do you prefer?",
        field: "treatmentPreference",
        options: [
          { value: "weekly_injection", label: "Weekly injection" },
          { value: "daily_pill", label: "Daily pill" },
          { value: "no_preference", label: "No preference" }
        ]
      },
      {
        id: "medicationAllergiesStatus",
        type: "radio",
        prompt: "Do you have any allergies to medications?",
        field: "medicationAllergiesStatus",
        options: buildBinaryOptions()
      },
      {
        id: "medicationAllergies",
        type: "textarea",
        prompt: "Please list your allergies",
        field: "medicationAllergies",
        placeholder: "List any medication allergies or prior reactions.",
        rows: 4,
        condition: (answers) => answers.medicationAllergiesStatus === "yes"
      },
      {
        id: "state",
        type: "select",
        prompt: "What is your current state of residence?",
        field: "state",
        label: "State of residence",
        placeholder: "Select your state",
        options: US_STATES.map(([value, label]) => ({ value, label }))
      }
    ]
  }
];

const allQuestions = quizSections.flatMap((section) => section.questions || []);

const optionLookup = allQuestions.reduce((lookup, question) => {
  if (!question.field || !question.options) {
    return lookup;
  }

  lookup[question.field] = question.options.reduce((questionLookup, option) => {
    questionLookup[option.value] = option.label;
    return questionLookup;
  }, {});

  return lookup;
}, {});

function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === "";
}

function asNumber(value) {
  if (isBlank(value)) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function validateSimpleNumber(value, config) {
  const parsed = asNumber(value);

  if (parsed === null) {
    return config.invalidMessage || "Please enter a valid number";
  }

  if (config.min !== undefined && parsed < config.min) {
    return config.invalidMessage || "Please enter a valid number";
  }

  if (config.max !== undefined && parsed > config.max) {
    return config.invalidMessage || "Please enter a valid number";
  }

  return null;
}

export function getQuizSection(sectionId) {
  return quizSections.find((section) => section.id === sectionId) || null;
}

export function getVisibleQuestions(sectionId, answers) {
  const section = getQuizSection(sectionId);

  if (!section?.questions) {
    return [];
  }

  return section.questions.filter((question) =>
    typeof question.condition === "function" ? question.condition(answers) : true
  );
}

export function getFlattenedQuizQuestions(answers) {
  return quizSections
    .filter((section) => Array.isArray(section.questions) && section.questions.length > 0)
    .flatMap((section) => {
      const questions = getVisibleQuestions(section.id, answers);

      return questions.map((question, index) => ({
        ...question,
        sectionId: section.id,
        sectionLabel: section.label,
        sectionHeading: section.heading,
        sectionSubtext: section.subtext,
        positionInSection: index + 1,
        totalInSection: questions.length
      }));
    });
}

export function getDefaultQuizAnswers() {
  const defaults = {};

  allQuestions.forEach((question) => {
    if (question.field) {
      defaults[question.field] = question.type === "multi-select" ? [] : "";
    }

    if (question.fields) {
      question.fields.forEach((field) => {
        defaults[field.key] = "";
      });
    }
  });

  return defaults;
}

export function buildDateOfBirth(answers) {
  const month = Number(answers.dobMonth);
  const day = Number(answers.dobDay);
  const year = Number(answers.dobYear);

  if (!Number.isInteger(month) || !Number.isInteger(day) || !Number.isInteger(year)) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function formatDateOfBirth(answers) {
  const date = buildDateOfBirth(answers);

  if (!date) {
    return "Not provided";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function formatQuizValue(field, value) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "Not provided";
    }

    return value.map((item) => optionLookup[field]?.[item] || item).join(", ");
  }

  if (isBlank(value)) {
    return "Not provided";
  }

  return optionLookup[field]?.[value] || value;
}

function validateQuestion(question, answers) {
  const errors = {};

  switch (question.type) {
    case "height-weight": {
      const [feetField, inchesField, weightField] = question.fields;

      if (isBlank(answers[feetField.key])) {
        errors[feetField.key] = REQUIRED_MESSAGE;
      }

      if (isBlank(answers[inchesField.key])) {
        errors[inchesField.key] = REQUIRED_MESSAGE;
      }

      if (isBlank(answers[weightField.key])) {
        errors[weightField.key] = REQUIRED_MESSAGE;
      } else {
        const weightError = validateSimpleNumber(answers[weightField.key], weightField);
        if (weightError) {
          errors[weightField.key] = weightError;
        }
      }
      break;
    }
    case "number": {
      if (isBlank(answers[question.field])) {
        errors[question.field] = REQUIRED_MESSAGE;
      } else {
        const numberError = validateSimpleNumber(answers[question.field], question);
        if (numberError) {
          errors[question.field] = numberError;
        }
      }
      break;
    }
    case "email": {
      const value = answers[question.field];

      if (isBlank(value)) {
        errors[question.field] = REQUIRED_MESSAGE;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())) {
        errors[question.field] = "Please enter a valid email";
      }
      break;
    }
    case "phone": {
      const [countryField, phoneField] = question.fields;
      const phoneValue = answers[phoneField.key];

      if (isBlank(answers[countryField.key])) {
        errors[countryField.key] = REQUIRED_MESSAGE;
      }

      if (isBlank(phoneValue)) {
        errors[phoneField.key] = REQUIRED_MESSAGE;
      } else {
        const digits = String(phoneValue).replace(/\D/g, "");

        if (digits.length < 10) {
          errors[phoneField.key] = "Please enter a valid phone number";
        }
      }
      break;
    }
    case "date-of-birth": {
      const [monthField, dayField, yearField] = question.fields;

      if (isBlank(answers[monthField.key])) {
        errors[monthField.key] = REQUIRED_MESSAGE;
      }

      if (isBlank(answers[dayField.key])) {
        errors[dayField.key] = REQUIRED_MESSAGE;
      }

      if (isBlank(answers[yearField.key])) {
        errors[yearField.key] = REQUIRED_MESSAGE;
      }

      if (!errors[monthField.key] && !errors[dayField.key] && !errors[yearField.key]) {
        const birthDate = buildDateOfBirth(answers);

        if (!birthDate) {
          errors[dayField.key] = "Please enter a valid date of birth";
        } else if (birthDate > new Date()) {
          errors[yearField.key] = "Please enter a valid date of birth";
        }
      }
      break;
    }
    case "radio":
    case "select":
    case "textarea": {
      if (isBlank(answers[question.field])) {
        errors[question.field] = REQUIRED_MESSAGE;
      }
      break;
    }
    case "multi-select": {
      const selectedValues = Array.isArray(answers[question.field]) ? answers[question.field] : [];

      if (selectedValues.length === 0) {
        errors[question.field] = REQUIRED_MESSAGE;
      }
      break;
    }
    default:
      break;
  }

  return errors;
}

export function validateQuizStep(stepId, answers) {
  const question = allQuestions.find((item) => item.id === stepId);

  if (!question) {
    return {};
  }

  const errors = validateQuestion(question, answers);

  if (question.id === "goalWeight") {
    const currentWeight = asNumber(answers.currentWeight);
    const goalWeight = asNumber(answers.goalWeight);

    if (currentWeight !== null && goalWeight !== null && goalWeight >= currentWeight) {
      errors.goalWeight = "Goal weight must be lower than your current weight";
    }
  }

  return errors;
}

export function validateQuizSection(sectionId, answers) {
  const errors = {};
  const questions = getVisibleQuestions(sectionId, answers);

  questions.forEach((question) => {
    Object.assign(errors, validateQuestion(question, answers));
  });

  if (sectionId === "details") {
    const currentWeight = asNumber(answers.currentWeight);
    const goalWeight = asNumber(answers.goalWeight);

    if (currentWeight !== null && goalWeight !== null && goalWeight >= currentWeight) {
      errors.goalWeight = "Goal weight must be lower than your current weight";
    }
  }

  return errors;
}
