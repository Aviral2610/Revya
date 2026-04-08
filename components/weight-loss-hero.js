import { ActionLink, ArtPanel } from "@/components/site-sections";

const HERO_POINTS = [
  "Programs and pricing shown up front",
  "Assessment before clinician review",
  "Discreet delivery when prescribed",
  "Refills and follow-up in one portal"
];

export function WeightLossHero() {
  return (
    <section className="hero glp-hero">
      <div className="shell hero-grid glp-grid">
        <div className="hero-copy">
          <p className="eyebrow">Clinician-guided weight-loss care</p>
          <h1>Medical weight-loss care with clear options and real follow-through.</h1>
          <p className="lede">
            Review pricing, compare program formats, and start with a short assessment. If care
            may fit, a licensed clinician reviews your intake before any treatment recommendation
            is made.
          </p>
          <div className="hero-actions-row">
            <ActionLink href="/quiz">Start assessment</ActionLink>
            <ActionLink href="#programs" variant="ghost">
              See programs and pricing
            </ActionLink>
          </div>
          <ul className="icon-list">
            {HERO_POINTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <ArtPanel
            detail="Revya is built to make the next step clear before, during, and after treatment review."
            kind="weight-loss"
            label="Programs from $179/mo"
            imageAlt="Patient during a healthy weight-loss journey"
            priority
            imageSrc="/images/hero-weightloss.jpg"
          />
          <div className="floating-card">
            <p className="mini-label">After the assessment</p>
            <strong>You see your route first, then a clinician reviews the intake before care begins.</strong>
            <div className="mini-list">
              <span>Review before submit</span>
              <span>Clinician-led next step</span>
              <span>Portal support after approval</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
