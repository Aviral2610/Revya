import {
  doctors,
  faqs,
  processSteps,
  productCards,
  testimonials,
  weightLossStats
} from "@/lib/site-data";
import { FaqList } from "@/components/faq-list";
import {
  ActionLink,
  ArtPanel,
  DoctorGrid,
  SiteFooter,
  SiteHeader,
  TestimonialGrid,
  TextLink
} from "@/components/site-sections";
import { WeightLossHero } from "@/components/weight-loss-hero";

export default function WeightLossPage() {
  return (
    <>
      <div className="promo-bar">
        Public-funnel clone: first-month promo, locked-in refill pricing, and provider review
        surfaced up front.
      </div>
      <SiteHeader />
      <main>
        <WeightLossHero />

        <section className="section">
          <div className="shell section-heading compact">
            <div>
              <p className="eyebrow">Our products</p>
              <h2>Four public product lanes, one consistent portal.</h2>
            </div>
          </div>
          <div className="shell product-grid">
            {productCards.map((product) => (
              <article className={`product-card product-${product.tone}`} key={product.title}>
                <p className="mini-label">{product.note}</p>
                <h3>{product.title}</h3>
                <strong>{product.price}</strong>
                <TextLink href="/login">
                  Get started
                </TextLink>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-soft">
          <div className="shell stats-grid">
            {weightLossStats.map((item) => (
              <article className="stat-card" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="shell split">
            <div className="split-copy">
              <p className="eyebrow">What to expect</p>
              <h2>The flow is simple because the site stages the journey in three moves.</h2>
            </div>
            <div className="timeline">
              {processSteps.map((step, index) => (
                <article className="timeline-step" key={step.title}>
                  <span>{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="shell split split-reverse">
            <div className="split-copy">
              <p className="eyebrow">24/7 support</p>
              <h2>Patients are pushed into the portal after checkout, not left in email threads.</h2>
              <p className="lede-alt">
                Public onboarding documents say patients can make appointments in the portal,
                submit refill forms there, upload transfer documents, and manage membership and
                labs without leaving the account area.
              </p>
              <div className="portal-mini-grid">
                <article>
                  <strong>Refill form</strong>
                  <p>Email and text reminders direct patients back into the portal.</p>
                </article>
                <article>
                  <strong>Daily appointments</strong>
                  <p>Appointments with providers are presented as a built-in part of the membership.</p>
                </article>
                <article>
                  <strong>Unlimited support</strong>
                  <p>The public site repeatedly advertises access to providers and nursing support.</p>
                </article>
              </div>
            </div>
            <div className="split-media">
              <ArtPanel
                detail="Refills, labs, billing, support, and appointments in one account."
                kind="portal"
                label="Portal preview"
              />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Testimonials</p>
                <h2>Social proof is heavy and repeated throughout the funnel.</h2>
              </div>
            </div>
            <TestimonialGrid testimonials={testimonials.slice(0, 4)} />
          </div>
        </section>

        <section className="section faq-section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">FAQ</p>
                <h2>Most objections are handled with direct answers and pricing clarity.</h2>
              </div>
            </div>
            <FaqList items={faqs} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Our doctors</p>
                <h2>Provider presence anchors trust and keeps the flow medical, not cosmetic.</h2>
              </div>
            </div>
            <DoctorGrid doctors={doctors} />
          </div>
        </section>

        <section className="section final-cta">
          <div className="shell cta-panel">
            <div>
              <p className="eyebrow">What happens next</p>
              <h2>Assessment, provider review, portal, refill.</h2>
              <p className="lede-alt">
                The real authenticated experience is private, so this clone recreates the account
                surface with mocked data based on the public help and onboarding documentation.
              </p>
            </div>
            <div className="cta-actions">
              <ActionLink href="/login">Continue to Login</ActionLink>
              <ActionLink href="/welcome" variant="ghost">
                Read Getting Started Guide
              </ActionLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
