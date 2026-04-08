export function SingleSelectQuestion({ answers, errors, onFieldChange, step }) {
  const value = answers[step.field];

  return (
    <div className="quiz-question-block">
      <h2>{step.title}</h2>
      <p className="lede-alt">{step.description}</p>
      <div className="quiz-choice-grid">
        {step.options.map((option) => {
          const isChecked = value === option.value;

          return (
            <label
              className={`quiz-choice-card ${isChecked ? "quiz-choice-card-active" : ""}`}
              key={option.value}
            >
              <input
                checked={isChecked}
                name={step.field}
                onChange={() => onFieldChange(step.field, option.value)}
                type="radio"
                value={option.value}
              />
              <div>
                <strong>{option.label}</strong>
                {option.description ? <p>{option.description}</p> : null}
              </div>
            </label>
          );
        })}
      </div>
      {errors[step.field] ? <p className="quiz-field-error">{errors[step.field]}</p> : null}
    </div>
  );
}
