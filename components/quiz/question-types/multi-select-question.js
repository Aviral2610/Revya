export function MultiSelectQuestion({ answers, errors, onToggleMulti, step }) {
  const selected = Array.isArray(answers[step.field]) ? answers[step.field] : [];

  return (
    <div className="quiz-question-block">
      <h2>{step.title}</h2>
      <p className="lede-alt">{step.description}</p>
      <div className="quiz-choice-grid">
        {step.options.map((option) => {
          const isChecked = selected.includes(option.value);

          return (
            <label
              className={`quiz-choice-card ${isChecked ? "quiz-choice-card-active" : ""}`}
              key={option.value}
            >
              <input
                checked={isChecked}
                onChange={(event) => onToggleMulti(step, option.value, event.target.checked)}
                type="checkbox"
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
