function renderField(field, value, error, onFieldChange) {
  const baseProps = {
    id: field.key,
    name: field.key,
    onChange: (event) => onFieldChange(field.key, event.target.value),
    value: value ?? ""
  };

  if (field.component === "textarea") {
    return <textarea {...baseProps} placeholder={field.placeholder} rows={field.rows || 4} />;
  }

  if (field.component === "select") {
    return (
      <select {...baseProps}>
        <option value="">{field.placeholder || "Select an option"}</option>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      {...baseProps}
      autoComplete={field.autoComplete}
      inputMode={field.inputMode}
      max={field.max}
      min={field.min}
      placeholder={field.placeholder}
      step={field.step}
      type={field.inputType || "text"}
    />
  );
}

export function TextQuestion({ answers, errors, onFieldChange, step }) {
  return (
    <div className="quiz-question-block">
      {step.eyebrow ? <p className="eyebrow">{step.eyebrow}</p> : null}
      <h2>{step.title}</h2>
      <p className="lede-alt">{step.description}</p>

      <div className={`quiz-field-grid ${step.fields.length > 1 ? "quiz-field-grid-wide" : ""}`}>
        {step.fields.map((field) => {
          const error = errors[field.key];

          return (
            <label className="quiz-field" htmlFor={field.key} key={field.key}>
              <span>{field.label}</span>
              {renderField(field, answers[field.key], error, onFieldChange)}
              {error ? <small className="quiz-field-error">{error}</small> : null}
            </label>
          );
        })}
      </div>
    </div>
  );
}
