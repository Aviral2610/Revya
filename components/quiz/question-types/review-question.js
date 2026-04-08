export function ReviewQuestion({ groups, onEditStep, recommendation }) {
  return (
    <div className="quiz-question-block">
      <p className="eyebrow">Review</p>
      <h2>Check your answers before the recommendation is generated.</h2>
      <p className="lede-alt">
        You can jump back to any section, make edits, and then continue when everything looks
        right.
      </p>

      <div className="quiz-review-groups">
        {groups.map((group) => (
          <section className="quiz-review-card" key={group.title}>
            <div className="quiz-review-header">
              <div>
                <p className="mini-label">{group.title}</p>
              </div>
            </div>
            <div className="quiz-review-list">
              {group.items.map((item) => (
                <article className="quiz-review-item" key={item.id}>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                  </div>
                  <button
                    className="button ghost"
                    onClick={() => onEditStep(item.id)}
                    type="button"
                  >
                    Edit
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <aside className="quiz-preview-card">
        <p className="mini-label">Preview</p>
        <strong>{recommendation.track.label}</strong>
        <p>{recommendation.summary}</p>
      </aside>
    </div>
  );
}
