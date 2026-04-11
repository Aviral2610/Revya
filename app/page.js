import Image from "next/image";

import { JsonLd } from "@/components/json-ld";
import { WeightLossEstimator } from "@/components/weight-loss-estimator";
import { ActionLink, SiteFooter, SiteHeader } from "@/components/site-sections";
import {
  homeFeaturedStory,
  homeOfferSummary,
  homeOutcomeStats,
  homeProgramSteps,
  homeSectionLinks,
  homeTestimonials,
  homeTrustHighlights,
  homeWhatYouGet,
  homeWhyRevyaComparison,
  homeWhyRevyaPillars,
  pricingGuaranteeHighlights
} from "@/lib/site-data";
import { getImageDimensions } from "@/lib/image-assets";
import { buildMedicalOrganizationSchema, buildPageSchema, getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("home");

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildPageSchema("home", [buildMedicalOrganizationSchema()])} />
      <SiteHeader />
      <main>
        <section className="hero home-hero revya-hero">
          <div className="shell revya-hero-grid">
            <div className="revya-hero-copy">
              <p className="eyebrow">Clinician-guided medical weight loss</p>
              <h1>Start medical weight-loss care with a plan you can actually stay on.</h1>
              <p className="revya-proofline">
                Programs from $179/mo, most intakes take about 3 minutes, and prescribing only
                happens after clinician review.
              </p>
              <p className="lede">
                Revya combines treatment options, clinician oversight, delivery coordination, and
                follow-through so the next step stays clear from your first intake to your next
                refill.
              </p>
              <div className="hero-actions-row revya-hero-actions">
                <ActionLink href="/quiz">Start assessment</ActionLink>
                <ActionLink href="/pricing" variant="ghost">
                  See programs & pricing
                </ActionLink>
              </div>
              <p className="guarantee-line">
                30-day program-fee guarantee on eligible fees. Medication already filled or shipped
                is excluded.
              </p>
              <div className="hero-pill-row revya-anchor-row">
                {homeSectionLinks.map((item) => (
                  <ActionLink href={item.href} key={item.label} variant="chip">
                    {item.label}
                  </ActionLink>
                ))}
              </div>
            </div>

            <div className="revya-hero-visual">
              <div className="revya-hero-frame">
                <div className="revya-hero-image-wrap">
                  <Image
                    alt="Clinician reviewing a weight-loss care plan with a patient"
                    className="revya-hero-image"
                    height={getImageDimensions("/images/hero-homepage.jpg").height}
                    priority
                    sizes="(max-width: 760px) 100vw, 48vw"
                    src="/images/hero-homepage.jpg"
                    width={getImageDimensions("/images/hero-homepage.jpg").width}
                  />
                </div>
                <div className="revya-hero-frame-inner">
                  <article className="revya-hero-card revya-hero-card-top">
                    <p className="mini-label">Member result</p>
                    <strong>31 lbs lost in 5 months</strong>
                    <span>Featured story below. Results vary by member and adherence.</span>
                  </article>
                  <article className="revya-hero-card revya-hero-card-bottom">
                    <p className="mini-label">Support stays visible</p>
                    <strong>Refills, messages, appointments, and billing live in one portal.</strong>
                    <div className="mini-list">
                      <span>Progress check-ins</span>
                      <span>Shipment updates</span>
                      <span>Care-team messages</span>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="results">
          <div className="shell section-heading">
            <div>
              <p className="eyebrow">Member results</p>
              <h2>Members do better when the program does not disappear after checkout.</h2>
              <p className="lede-alt">
                Revya does not promise instant results. It gives eligible members a clearer
                starting point, clinician-led treatment decisions, and a visible support system to
                keep them moving.
              </p>
            </div>
            <ActionLink href="/quiz" variant="ghost">
              Start assessment
            </ActionLink>
          </div>
          <div className="shell revya-proof-grid">
            <div className="revya-proof-stats">
              {homeOutcomeStats.map((item) => (
                <article className="revya-proof-stat" key={`${item.value}-${item.detail}`}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <p>{item.detail}</p>
                </article>
              ))}
              <p className="revya-proof-note">Illustrative member stories. Results vary.</p>
            </div>

            <article className="revya-story-card">
              <p className="mini-label">Featured story</p>
              <strong>{homeFeaturedStory.outcome}</strong>
              <p className="revya-story-quote">"{homeFeaturedStory.quote}"</p>
              <p className="revya-story-name">{homeFeaturedStory.name}</p>
              <ul className="detail-list">
                {homeFeaturedStory.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="revya-visual-proof-card">
              <div className="revya-visual-proof-image">
                <Image
                  alt="Revya patient portal showing progress, tasks, and next steps"
                  className="revya-proof-image"
                  height={getImageDimensions("/images/revya-portal-support.jpg").height}
                  sizes="(max-width: 760px) 100vw, 32vw"
                  src="/images/revya-portal-support.jpg"
                  width={getImageDimensions("/images/revya-portal-support.jpg").width}
                />
              </div>
              <div className="revya-visual-proof-copy">
                <p className="mini-label">Visual proof</p>
                <strong>Support stays visible after approval.</strong>
                <p>
                  The part members notice quickly is continuity. Refills, progress updates,
                  appointments, and care messages stay connected instead of getting scattered.
                </p>
                <div className="mini-list">
                  <span>Refill reviews</span>
                  <span>Follow-up booking</span>
                  <span>Secure messages</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section section-soft" id="what-you-get">
          <div className="shell section-heading">
            <div>
              <p className="eyebrow">What you get</p>
              <h2>Everything needed to start care with confidence, not just a prescription path.</h2>
              <p className="lede-alt">
                Revya is designed to answer the main buying questions quickly: what is included,
                how medical oversight works, what support looks like, and where everything lives
                after you start.
              </p>
            </div>
          </div>
          <div className="shell revya-offer-layout">
            <article className="revya-offer-card">
              <p className="mini-label">{homeOfferSummary.eyebrow}</p>
              <h3>{homeOfferSummary.title}</h3>
              <p>{homeOfferSummary.copy}</p>
              <div className="revya-offer-rows">
                {homeOfferSummary.rows.map((item) => (
                  <div className="revya-offer-row" key={item.label}>
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="revya-offer-note">{homeOfferSummary.note}</p>
              <ActionLink href="/pricing">See programs and pricing</ActionLink>
            </article>

            <div className="revya-includes-grid">
              {homeWhatYouGet.map((item) => (
                <article className="revya-include-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section estimator-section" id="estimator">
          <div className="shell">
            <WeightLossEstimator />
          </div>
        </section>

        <section className="section" id="why-revya">
          <div className="shell section-heading">
            <div>
              <p className="eyebrow">Why Revya works</p>
              <h2>Support and structure make treatment easier to stay with.</h2>
              <p className="lede-alt">{homeWhyRevyaComparison.intro}</p>
            </div>
          </div>
          <div className="shell revya-comparison-grid">
            <article className="revya-compare-card revya-compare-card-muted">
              <p className="mini-label">Treatment alone</p>
              <h3>The prescription can be clear, while the experience around it is not.</h3>
              <ul className="detail-list">
                {homeWhyRevyaComparison.standalone.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="revya-compare-card revya-compare-card-accent">
              <p className="mini-label">The Revya program</p>
              <h3>Revya wraps treatment in the systems that help members keep going.</h3>
              <ul className="detail-list">
                {homeWhyRevyaComparison.revya.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <div className="shell revya-pillars-grid">
            {homeWhyRevyaPillars.map((item) => (
              <article className="revya-pillar-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="how-it-works">
          <div className="shell section-heading">
            <div>
              <p className="eyebrow">How it works</p>
              <h2>From your first intake to ongoing refills, the path stays straightforward.</h2>
              <p className="lede-alt">
                You should be able to understand what happens next before you commit. That is why
                Revya makes the full sequence visible from intake through follow-up.
              </p>
            </div>
          </div>
          <div className="shell revya-steps-grid">
            {homeProgramSteps.map((step, index) => (
              <article className="revya-step-card" key={step.title}>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
          <div className="shell revya-process-note">
            <div>
              <p className="mini-label">Before you start</p>
              <strong>You will see your likely route before any treatment decision is made.</strong>
              <p>
                The assessment prepares your case for medical review. It does not replace clinician
                judgment, and it does not generate a prescription on its own.
              </p>
            </div>
            <div className="cta-actions">
              <ActionLink href="/quiz">Start assessment</ActionLink>
              <ActionLink href="/pricing" variant="ghost">
                See programs and pricing
              </ActionLink>
            </div>
          </div>
        </section>

        <section className="section testimonial-section" id="trust">
          <div className="shell section-heading">
            <div>
              <p className="eyebrow">Why people trust Revya</p>
              <h2>Enough proof to feel confident before you start.</h2>
              <p className="lede-alt">
                Revya is designed to feel medically grounded and buyer-friendly: visible pricing,
                clinician review before prescribing, structured follow-up, and a clear refund
                window on eligible program fees.
              </p>
            </div>
          </div>
          <div className="shell revya-trust-layout">
            <article className="revya-guarantee-panel">
              <p className="mini-label">Risk reversal</p>
              <h3>Start with less guesswork and less downside.</h3>
              <p>
                If the program is not right for you early on, eligible program fees are covered by
                a 30-day guarantee. That gives new members room to start with more confidence.
              </p>
              <ul className="detail-list tight">
                {pricingGuaranteeHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="revya-trust-strip">
                {homeTrustHighlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>

            <div className="revya-testimonial-grid">
              {homeTestimonials.map((item) => (
                <article className="revya-testimonial-card" key={`${item.name}-${item.outcome}`}>
                  <div className="revya-testimonial-topline">
                    <span className="mini-label">Member note</span>
                    <span className="testimonial-outcome">{item.outcome}</span>
                  </div>
                  <p>"{item.quote}"</p>
                  <div className="revya-testimonial-meta">
                    <strong>{item.name}</strong>
                    <span>{item.detail}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section final-cta revya-final-cta">
          <div className="shell revya-final-panel">
            <div>
              <p className="eyebrow">Ready to start</p>
              <h2>Start your assessment and see whether Revya fits your goals.</h2>
              <p className="lede-alt">
                Most patients finish the intake in about 3 minutes. From there, a clinician
                reviews your information before any treatment recommendation is made.
              </p>
            </div>
            <div className="revya-final-actions">
              <ActionLink href="/quiz">Start assessment</ActionLink>
              <ActionLink href="/pricing" variant="ghost">
                See programs and pricing
              </ActionLink>
              <p className="guarantee-line">
                30-day program-fee guarantee on eligible fees. Prescribing remains clinician-led.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
