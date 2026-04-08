export function IntroQuestion({ step }) {
  return (
    <div className="quiz-intro-question">
      <p className="eyebrow">{step.eyebrow}</p>
      <h2>{step.title}</h2>
      <p className="lede-alt">{step.description}</p>
      <div className="quiz-feature-grid">
        {step.bullets.map((item) => (
          <article className="quiz-feature-card" key={item}>
            <strong>{item}</strong>
          </article>
        ))}
      </div>
      <div className="mock-banner">
        <p className="mini-label">Important</p>
        <p>
          This intake is a decision-support flow only. It is not a diagnosis, prescription, or
          emergency service.
        </p>
      </div>
    </div>
  );
}
