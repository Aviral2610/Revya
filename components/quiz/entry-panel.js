import { ActionLink, TextLink } from "@/components/site-sections";

const FLOW_STEPS = [
  {
    id: "assessment",
    label: "Assessment",
    copy: "Answer a short intake about goals, health history, and current medications."
  },
  {
    id: "review",
    label: "Review",
    copy: "Confirm your details before you submit so nothing feels rushed."
  },
  {
    id: "route",
    label: "Route",
    copy: "See the likely next step based on your answers and safety screening."
  },
  {
    id: "clinician-review",
    label: "Clinician review",
    copy: "If you continue, a licensed clinician reviews the intake before recommending care."
  }
];

export function QuizEntryPanel({
  ctaHref = "/quiz",
  ctaLabel = "Start assessment",
  eyebrow = "Guided assessment",
  secondaryHref = "/weight-loss",
  secondaryLabel = "See programs and pricing",
  title,
  copy
}) {
  return (
    <div className="quiz-entry-panel">
      <div className="quiz-entry-head">
        <p className="mini-label">{eyebrow}</p>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>

      <div className="quiz-entry-list">
        {FLOW_STEPS.map((step, index) => (
          <article className="quiz-entry-step" key={step.id}>
            <span>{index + 1}</span>
            <div>
              <strong>{step.label}</strong>
              <p>{step.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="quiz-entry-meta">
        <span>About 3 minutes</span>
        <span>Saved on this device</span>
        <span>No prescription from quiz alone</span>
      </div>

      <div className="quiz-entry-actions">
        <ActionLink href={ctaHref}>{ctaLabel}</ActionLink>
        <TextLink href={secondaryHref}>{secondaryLabel}</TextLink>
      </div>
    </div>
  );
}
