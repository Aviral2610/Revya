import { ActionLink } from "@/components/site-sections";

function metricValue(value, suffix = "") {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "N/A";
  }

  return `${value}${suffix}`;
}

export function RoutingResultQuestion({ onRestart, recommendation }) {
  const toneClass =
    recommendation.status === "matched"
      ? "quiz-result-matched"
      : recommendation.status === "review"
        ? "quiz-result-review"
        : "quiz-result-not-fit";

  return (
    <div className={`quiz-result-card ${toneClass}`}>
      <p className="eyebrow">Recommendation</p>
      <h2>{recommendation.title}</h2>
      <p className="lede-alt">{recommendation.summary}</p>

      <div className="quiz-result-track">
        <strong>{recommendation.track.shortLabel}</strong>
        <p>{recommendation.track.description}</p>
      </div>

      <div className="quiz-result-metrics">
        <article>
          <span>Age</span>
          <strong>{metricValue(recommendation.metrics.age)}</strong>
        </article>
        <article>
          <span>BMI</span>
          <strong>{metricValue(recommendation.metrics.bmi)}</strong>
        </article>
        <article>
          <span>Target loss</span>
          <strong>{metricValue(recommendation.metrics.targetLoss, " lb")}</strong>
        </article>
      </div>

      <div className="quiz-result-columns">
        <section className="quiz-result-list">
          <p className="mini-label">Why this route</p>
          <ul className="detail-list">
            {recommendation.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </section>
        <section className="quiz-result-list">
          <p className="mini-label">Next steps</p>
          <ul className="detail-list">
            {recommendation.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </section>
      </div>

      {recommendation.considerations?.length ? (
        <aside className="quiz-result-note">
          <p className="mini-label">Keep in mind</p>
          <ul className="detail-list tight">
            {recommendation.considerations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      ) : null}

      <div className="quiz-result-actions">
        <ActionLink href="/login">Continue to patient login</ActionLink>
        <button className="button ghost" onClick={onRestart} type="button">
          Start over
        </button>
      </div>
    </div>
  );
}
