"use client";

import { ActionLink } from "@/components/site-sections";

const QUESTION_HELPERS = {
  heightWeight: "We use this to estimate BMI and understand your starting point.",
  goalWeight: "A realistic target helps frame the care conversation and timeline.",
  sex: "This helps the clinician interpret screening answers appropriately.",
  dateOfBirth: "Your age is part of program eligibility and medication safety review.",
  phone: "We use this for care updates if your clinician needs more context.",
  email: "Your assessment summary and next-step guidance are tied to this inbox.",
  pregnancyStatus: "Pregnancy and breastfeeding change what can be recommended safely.",
  diabetesHistory: "Diabetes history can change the right treatment and review path.",
  pancreatitisHistory: "Past pancreatitis is a safety signal that may require manual review.",
  gallbladderHistory: "Gallbladder history can change whether a standard route is appropriate.",
  severeGiDiseaseHistory: "GI history helps us avoid routing you into the wrong medication pathway.",
  thyroidHistory: "Certain thyroid histories are standard contraindications for GLP-1 routing.",
  eatingDisorderHistory: "This helps us keep the recommendation medically appropriate.",
  prescriptionMedicationStatus:
    "Current prescriptions can affect medication safety, interactions, and follow-up.",
  currentMedications: "List what you take regularly so the clinician sees the full picture.",
  glp1Usage: "Previous GLP-1 experience changes whether this is a start, continuation, or switch.",
  glp1Medications: "Your past medication history helps us route you more precisely.",
  primaryGoal: "Your goal helps shape the provider conversation, not just the recommendation.",
  treatmentPreference: "We use your preference to guide the consultation pathway when appropriate.",
  medicationAllergiesStatus: "Medication allergies can change what options are considered safe.",
  medicationAllergies: "Include any known reactions or allergies that matter for prescribing.",
  state: "State determines clinician licensing and treatment availability."
};

function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

function getScreenKind(screen) {
  return screen.screenKind || screen.type;
}

function FieldError({ fieldKey, errors }) {
  const message = errors[fieldKey];

  if (!message) {
    return null;
  }

  return (
    <p className="quiz-field-error" id={`${fieldKey}-error`}>
      {message}
    </p>
  );
}

function ScreenEyebrow({ screen }) {
  if (getScreenKind(screen) !== "question") {
    return null;
  }

  return (
    <div className="quiz-question-meta">
      <span className="quiz-section-chip">{screen.sectionLabel}</span>
      <span className="quiz-question-count">
        {screen.positionInSection} of {screen.totalInSection} in {screen.sectionLabel}
      </span>
    </div>
  );
}

function StepHeading({ screen }) {
  const screenKind = getScreenKind(screen);

  if (screenKind === "start") {
    return (
      <div className="quiz-step-heading">
        <p className="mini-label">Assessment overview</p>
        <h2>A short assessment before any clinician recommendation.</h2>
        <p>
          We ask only for the information needed to understand eligibility, safety signals, and
          the most appropriate next step. You review your answers before any route is shown.
        </p>
      </div>
    );
  }

  if (screenKind === "review") {
    return (
      <div className="quiz-step-heading">
        <p className="mini-label">Review and confirm</p>
        <h2>One final review before we show your route.</h2>
        <p>
          Double-check your details below. You can edit any answer before we generate the
          informational route and explain what a clinician would review next.
        </p>
      </div>
    );
  }

  if (screenKind === "result") {
    return null;
  }

  return (
    <div className="quiz-step-heading">
      <p className="mini-label">
        Question {screen.questionNumber} of {screen.totalQuestionCount}
      </p>
      <h2>{screen.prompt}</h2>
      <p>{QUESTION_HELPERS[screen.id] || screen.sectionSubtext}</p>
    </div>
  );
}

function ChoiceCard({
  checked,
  description,
  inputType = "radio",
  label,
  name,
  onChange,
  tone = "default",
  value
}) {
  return (
    <label className={classNames("quiz-choice-card", `quiz-choice-card-${tone}`, checked && "is-active")}>
      <input checked={checked} name={name} onChange={onChange} type={inputType} value={value} />
      <span className="quiz-choice-indicator" aria-hidden>
        {checked ? "✓" : ""}
      </span>
      <span className="quiz-choice-copy">
        <strong>{label}</strong>
        {description ? <small>{description}</small> : null}
      </span>
    </label>
  );
}

function renderSimpleInput(question, answers, errors, onFieldChange) {
  const error = errors[question.field];

  return (
    <label className="quiz-input-shell">
      <span>{question.label}</span>
      <input
        aria-describedby={error ? `${question.field}-error` : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={question.autoComplete}
        inputMode={question.inputMode}
        max={question.max}
        min={question.min}
        onChange={(event) => onFieldChange(question.field, event.target.value)}
        placeholder={question.placeholder}
        type={question.inputType || "text"}
        value={answers[question.field] || ""}
      />
      <FieldError errors={errors} fieldKey={question.field} />
    </label>
  );
}

function renderRadioQuestion(question, answers, errors, onFieldChange) {
  return (
    <fieldset className="quiz-input-group">
      <legend className="quiz-screen-reader-only">{question.prompt}</legend>
      <div className="quiz-choice-grid">
        {question.options.map((option) => (
          <ChoiceCard
            checked={answers[question.field] === option.value}
            description={option.description}
            key={option.value}
            label={option.label}
            name={question.field}
            onChange={() => onFieldChange(question.field, option.value)}
            value={option.value}
          />
        ))}
      </div>
      <FieldError errors={errors} fieldKey={question.field} />
    </fieldset>
  );
}

function renderSelectQuestion(question, answers, errors, onFieldChange) {
  const error = errors[question.field];

  return (
    <label className="quiz-input-shell">
      <span>{question.label}</span>
      <select
        aria-describedby={error ? `${question.field}-error` : undefined}
        aria-invalid={Boolean(error)}
        onChange={(event) => onFieldChange(question.field, event.target.value)}
        value={answers[question.field] || ""}
      >
        <option value="">{question.placeholder}</option>
        {question.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError errors={errors} fieldKey={question.field} />
    </label>
  );
}

function renderTextareaQuestion(question, answers, errors, onFieldChange) {
  const error = errors[question.field];

  return (
    <label className="quiz-input-shell">
      <span>{question.prompt}</span>
      <textarea
        aria-describedby={error ? `${question.field}-error` : undefined}
        aria-invalid={Boolean(error)}
        onChange={(event) => onFieldChange(question.field, event.target.value)}
        placeholder={question.placeholder}
        rows={question.rows || 4}
        value={answers[question.field] || ""}
      />
      <FieldError errors={errors} fieldKey={question.field} />
    </label>
  );
}

function renderMultiSelectQuestion(question, answers, errors, onToggleMulti) {
  const selectedValues = Array.isArray(answers[question.field]) ? answers[question.field] : [];

  return (
    <fieldset className="quiz-input-group">
      <legend className="quiz-screen-reader-only">{question.prompt}</legend>
      <div className="quiz-choice-grid">
        {question.options.map((option) => (
          <ChoiceCard
            checked={selectedValues.includes(option.value)}
            inputType="checkbox"
            key={option.value}
            label={option.label}
            name={`${question.field}-${option.value}`}
            onChange={(event) => onToggleMulti(question, option.value, event.target.checked)}
            value={option.value}
          />
        ))}
      </div>
      <FieldError errors={errors} fieldKey={question.field} />
    </fieldset>
  );
}

function renderHeightWeightQuestion(question, answers, errors, onFieldChange) {
  const [feetField, inchesField, weightField] = question.fields;

  return (
    <div className="quiz-composite-stack">
      <div className="quiz-input-split">
        <fieldset className="quiz-input-group">
          <legend>
            <span className="mini-label">{feetField.eyebrow}</span>
            <strong>{feetField.label}</strong>
          </legend>
          <div className="quiz-choice-row">
            {feetField.options.map((option) => (
              <ChoiceCard
                checked={answers[feetField.key] === option.value}
                key={option.value}
                label={option.label}
                name={feetField.key}
                onChange={() => onFieldChange(feetField.key, option.value)}
                tone="compact"
                value={option.value}
              />
            ))}
          </div>
          <FieldError errors={errors} fieldKey={feetField.key} />
        </fieldset>

        <fieldset className="quiz-input-group">
          <legend>
            <span className="mini-label">{inchesField.eyebrow}</span>
            <strong>{inchesField.label}</strong>
          </legend>
          <div className="quiz-choice-row quiz-choice-row-tight">
            {inchesField.options.map((option) => (
              <ChoiceCard
                checked={answers[inchesField.key] === option.value}
                key={option.value}
                label={option.label}
                name={inchesField.key}
                onChange={() => onFieldChange(inchesField.key, option.value)}
                tone="compact"
                value={option.value}
              />
            ))}
          </div>
          <FieldError errors={errors} fieldKey={inchesField.key} />
        </fieldset>
      </div>

      <label className="quiz-input-shell">
        <span>{weightField.label}</span>
        <input
          aria-describedby={errors[weightField.key] ? `${weightField.key}-error` : undefined}
          aria-invalid={Boolean(errors[weightField.key])}
          inputMode={weightField.inputMode}
          max={weightField.max}
          min={weightField.min}
          onChange={(event) => onFieldChange(weightField.key, event.target.value)}
          placeholder="Enter your current weight"
          type={weightField.inputType}
          value={answers[weightField.key] || ""}
        />
        <FieldError errors={errors} fieldKey={weightField.key} />
      </label>
    </div>
  );
}

function renderDateOfBirthQuestion(question, answers, errors, onFieldChange) {
  const [monthField, dayField, yearField] = question.fields;

  return (
    <div className="quiz-input-split quiz-input-split-three">
      <label className="quiz-input-shell">
        <span>{monthField.label}</span>
        <select
          aria-describedby={errors[monthField.key] ? `${monthField.key}-error` : undefined}
          aria-invalid={Boolean(errors[monthField.key])}
          onChange={(event) => onFieldChange(monthField.key, event.target.value)}
          value={answers[monthField.key] || ""}
        >
          <option value="">{monthField.placeholder}</option>
          {monthField.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} fieldKey={monthField.key} />
      </label>

      <label className="quiz-input-shell">
        <span>{dayField.label}</span>
        <input
          aria-describedby={errors[dayField.key] ? `${dayField.key}-error` : undefined}
          aria-invalid={Boolean(errors[dayField.key])}
          inputMode={dayField.inputMode}
          maxLength={dayField.maxLength}
          onChange={(event) => onFieldChange(dayField.key, event.target.value)}
          placeholder={dayField.placeholder}
          type={dayField.inputType}
          value={answers[dayField.key] || ""}
        />
        <FieldError errors={errors} fieldKey={dayField.key} />
      </label>

      <label className="quiz-input-shell">
        <span>{yearField.label}</span>
        <select
          aria-describedby={errors[yearField.key] ? `${yearField.key}-error` : undefined}
          aria-invalid={Boolean(errors[yearField.key])}
          onChange={(event) => onFieldChange(yearField.key, event.target.value)}
          value={answers[yearField.key] || ""}
        >
          <option value="">{yearField.placeholder}</option>
          {yearField.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} fieldKey={yearField.key} />
      </label>
    </div>
  );
}

function renderPhoneQuestion(question, answers, errors, onFieldChange) {
  const [countryField, phoneField] = question.fields;

  return (
    <div className="quiz-input-split quiz-input-split-phone">
      <label className="quiz-input-shell">
        <span>{countryField.label}</span>
        <select
          aria-describedby={errors[countryField.key] ? `${countryField.key}-error` : undefined}
          aria-invalid={Boolean(errors[countryField.key])}
          onChange={(event) => onFieldChange(countryField.key, event.target.value)}
          value={answers[countryField.key] || ""}
        >
          <option value="">{countryField.placeholder}</option>
          {countryField.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} fieldKey={countryField.key} />
      </label>

      <label className="quiz-input-shell">
        <span>{phoneField.label}</span>
        <input
          aria-describedby={errors[phoneField.key] ? `${phoneField.key}-error` : undefined}
          aria-invalid={Boolean(errors[phoneField.key])}
          autoComplete={phoneField.autoComplete}
          inputMode={phoneField.inputMode}
          onChange={(event) => onFieldChange(phoneField.key, event.target.value)}
          placeholder={phoneField.placeholder}
          type={phoneField.inputType}
          value={answers[phoneField.key] || ""}
        />
        <FieldError errors={errors} fieldKey={phoneField.key} />
      </label>
    </div>
  );
}

function renderQuestion(question, answers, errors, onFieldChange, onToggleMulti) {
  switch (question.type) {
    case "height-weight":
      return renderHeightWeightQuestion(question, answers, errors, onFieldChange);
    case "number":
    case "email":
      return renderSimpleInput(question, answers, errors, onFieldChange);
    case "radio":
      return renderRadioQuestion(question, answers, errors, onFieldChange);
    case "date-of-birth":
      return renderDateOfBirthQuestion(question, answers, errors, onFieldChange);
    case "phone":
      return renderPhoneQuestion(question, answers, errors, onFieldChange);
    case "textarea":
      return renderTextareaQuestion(question, answers, errors, onFieldChange);
    case "multi-select":
      return renderMultiSelectQuestion(question, answers, errors, onToggleMulti);
    case "select":
      return renderSelectQuestion(question, answers, errors, onFieldChange);
    default:
      return null;
  }
}

function StartSection() {
  return (
    <section className="quiz-step-card quiz-start-card">
      <StepHeading screen={{ type: "start" }} />
      <div className="quiz-start-grid">
        <article>
          <strong>Assessment</strong>
          <p>Answer a short intake about your goals, history, and current medications.</p>
        </article>
        <article>
          <strong>Safety screening</strong>
          <p>We surface follow-up questions only when your answers require extra review.</p>
        </article>
        <article>
          <strong>Review</strong>
          <p>Confirm your answers before the route is generated.</p>
        </article>
        <article>
          <strong>Clinician review if you continue</strong>
          <p>Your route is informational. A licensed clinician still reviews the intake before recommending care.</p>
        </article>
      </div>
      <div className="quiz-trust-strip">
        <span>About 3 minutes</span>
        <span>Saved on this device</span>
        <span>No prescription from quiz alone</span>
      </div>
    </section>
  );
}

function ReviewSection({ onEditStep, reviewGroups }) {
  return (
    <section className="quiz-step-card quiz-review-card">
      <StepHeading screen={{ type: "review" }} />

      <div className="quiz-review-grid">
        {reviewGroups.map((group) => (
          <section className="quiz-review-section" key={group.id}>
            <div className="quiz-review-section-head">
              <p className="mini-label">{group.eyebrow}</p>
              <h3>{group.title}</h3>
            </div>

            <div className="quiz-review-list">
              {group.items.map((item) => (
                <article className="quiz-review-row" key={item.id}>
                  <div>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                  <button className="quiz-inline-button" onClick={() => onEditStep(item.id)} type="button">
                    Edit
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="quiz-review-note">
        <strong>Next step:</strong> we’ll show an informational route and explain what happens if
        you decide to continue.
      </div>
    </section>
  );
}

function ResultSection({ result, resultMetrics, summaryRows }) {
  return (
    <div className="quiz-result-stack">
      <section className={classNames("quiz-step-card", "quiz-result-card", `quiz-route-${result.route}`)}>
        <p className="mini-label">Assessment result</p>
        <h2>{result.title}</h2>
        <p>{result.summary}</p>
        <div className="quiz-result-chip-row">
          <span className="quiz-result-chip">{result.label}</span>
          {result.currentMedicationContext ? (
            <span className="quiz-result-chip quiz-result-chip-muted">
              Current GLP-1 context captured
            </span>
          ) : null}
        </div>
      </section>

      <div className="quiz-result-grid">
        <section className="quiz-step-card quiz-result-panel">
          <h3>Why this route</h3>
          <ul className="quiz-result-list">
            {result.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </section>

        <section className="quiz-step-card quiz-result-panel">
          <h3>If you continue</h3>
          <ul className="quiz-result-list">
            {result.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="quiz-result-grid quiz-result-grid-secondary">
        <section className="quiz-step-card quiz-result-panel">
          <h3>Intake snapshot</h3>
          <dl className="quiz-summary-grid">
            {summaryRows.map((row) => (
              <div className="quiz-summary-row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="quiz-step-card quiz-result-panel">
          <h3>Key metrics</h3>
          <dl className="quiz-summary-grid quiz-summary-grid-compact">
            {resultMetrics.map((metric) => (
              <div className="quiz-summary-row" key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
          <div className="quiz-result-links">
            <ActionLink href="/weight-loss">See programs and pricing</ActionLink>
            <ActionLink href="/welcome" variant="ghost">
              See how ongoing care works
            </ActionLink>
          </div>
        </section>
      </div>
    </div>
  );
}

export function QuestionRenderer({
  answers,
  errors,
  onEditStep,
  onFieldChange,
  onToggleMulti,
  result,
  resultMetrics,
  reviewGroups,
  screen,
  summaryRows
}) {
  const screenKind = getScreenKind(screen);

  if (screenKind === "result" && result) {
    return <ResultSection result={result} resultMetrics={resultMetrics} summaryRows={summaryRows} />;
  }

  if (screenKind === "start") {
    return <StartSection />;
  }

  if (screenKind === "review") {
    return <ReviewSection onEditStep={onEditStep} reviewGroups={reviewGroups} />;
  }

  return (
    <section className="quiz-step-card quiz-question-card">
      <ScreenEyebrow screen={screen} />
      <StepHeading screen={screen} />
      {renderQuestion(screen, answers, errors, onFieldChange, onToggleMulti)}
    </section>
  );
}
