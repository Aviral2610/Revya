import {
  doctors,
  homeHeroTabs,
  homeHighlights,
  processSteps,
  productCards,
  testimonials,
  trustFeatures
} from "@/lib/site-data";
import { JsonLd } from "@/components/json-ld";
import { QuizEntryPanel } from "@/components/quiz/entry-panel";
import {
  ActionLink,
  ArtPanel,
  DoctorGrid,
  MockBanner,
  SiteFooter,
  SiteHeader,
  TestimonialGrid
} from "@/components/site-sections";
import { buildMedicalOrganizationSchema, buildPageSchema, getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("home");

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildPageSchema("home", [buildMedicalOrganizationSchema()])} />
      <SiteHeader />
      <main>
        <section className="hero home-hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Telehealth weight-loss care</p>
              <h1>Clinician-guided weight loss that stays with you after your prescription.</h1>
              <p className="lede">
                Revya brings pricing, assessment, clinician review, discreet delivery, and portal
                follow-through into one connected path so patients know what happens before they
                start and after they are approved.
              </p>
              <div className="hero-actions-row">
                <ActionLink href="/quiz">Start assessment</ActionLink>
                <ActionLink href="/weight-loss" variant="ghost">
                  See programs and pricing
                </ActionLink>
              </div>
              <div className="hero-pill-row">
                {homeHeroTabs.map((item) => (
                  <ActionLink href={item.href} key={item.label} variant="chip">
                    {item.label}
                  </ActionLink>
                ))}
              </div>
              <div className="stat-row">
                {homeHighlights.map((item) => (
                  <div className="stat-chip" key={item}>
                    <span />
                    {item}
                  </div>
                ))}
              </div>
              <MockBanner
                copy="The core Revya path is simple: compare programs, complete the assessment, receive clinician review, and manage refills in one secure portal."
                title="Focused on the main conversion path"
              />
            </div>

            <div className="hero-visual">
              <ArtPanel
                detail="Patients see how qualification, review, delivery, and support connect before they begin."
                kind="hero"
                label="Programs from $179/mo"
                imageAlt="Telehealth clinician speaking with a patient during a secure online visit"
                priority
                imageSrc="/images/hero-homepage.jpg"
              />
              <div className="floating-card">
                <p className="mini-label">Patient portal</p>
                <strong>Refills, progress, visits, and support stay visible in one place.</strong>
                <div className="mini-list">
                  <span>Shipment updates</span>
                  <span>Care messages</span>
                  <span>Follow-up booking</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="programs">
          <div className="shell section-heading">
            <div>
              <p className="eyebrow">Programs and pricing</p>
              <h2>Review the available care paths before you start.</h2>
              <p className="lede-alt">
                Revya surfaces program formats and starting prices up front. Final fit still
                depends on your assessment and clinician review.
              </p>
            </div>
            <ActionLink href="/weight-loss" variant="ghost">
              Explore the full weight-loss page
            </ActionLink>
          </div>
          <div className="shell product-grid">
            {productCards.map((product) => (
              <article className={`product-card product-${product.tone}`} key={product.title}>
                <p className="mini-label">{product.note}</p>
                <h3>{product.title}</h3>
                <strong>{product.price}</strong>
                <p>{product.summary}</p>
                <div className="mini-list">
                  {product.highlights.map((item) => (
                    <span key={`${product.title}-${item}`}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="assessment">
          <div className="shell split assessment-showcase">
            <div className="split-copy">
              <p className="eyebrow">Assessment and qualification</p>
              <h2>A short intake that explains the next step before any treatment decision.</h2>
              <p className="lede-alt">
                The Revya assessment collects the essentials, flags safety considerations, and
                shows a likely route based on your answers. If you move forward, a licensed
                clinician reviews the full intake before recommending care.
              </p>
              <div className="cta-actions">
                <ActionLink href="/quiz">Start assessment</ActionLink>
                <ActionLink href="/weight-loss" variant="ghost">
                  See programs and pricing
                </ActionLink>
              </div>
            </div>
            <div className="split-media">
              <QuizEntryPanel
                copy="Patients move from intake to review to a preliminary route, then into clinician review if they continue."
                title="Qualification should feel clear, not confusing."
              />
            </div>
          </div>
        </section>

        <section className="section" id="how-it-works">
          <div className="shell split">
            <div className="split-copy">
              <p className="eyebrow">How it works</p>
              <h2>Assessment first. Clinician review next. Support that continues after delivery.</h2>
              <p className="lede-alt">
                The page flow is designed to answer the questions most patients have before they
                commit: what the program costs, how eligibility is reviewed, what happens after
                approval, and how ongoing care is managed.
              </p>
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

        <section className="section trust-section">
          <div className="shell trust-panel">
            <div className="trust-lead">
              <div>
                <p className="eyebrow">Built for trust</p>
                <h2>Everything important stays visible before, during, and after clinician review.</h2>
              </div>
              <div className="trust-visual">
                <ArtPanel
                  detail="Revya is designed to feel medically grounded: clear review standards, discreet fulfillment, and ongoing portal support."
                  kind="portal"
                  label="Clear care model"
                  imageAlt="Clinician reviewing treatment options with a patient in a consultation setting"
                  imageSrc="/images/trust-signals.jpg"
                />
              </div>
            </div>
            <div className="feature-grid">
              {trustFeatures.map((item) => (
                <article className="feature-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section press-section">
          <div className="shell">
            <p className="press-label">As featured in</p>
            <div className="press-row">
              <span>HealthTech Weekly</span>
              <span className="press-dot" />
              <span>Digital Health Journal</span>
              <span className="press-dot" />
              <span>Telemedicine Today</span>
              <span className="press-dot" />
              <span>Telehealth Observer</span>
            </div>
          </div>
        </section>

        <section className="section" id="patient-portal">
          <div className="shell split split-reverse">
            <div className="split-copy">
              <p className="eyebrow">Patient portal</p>
              <h2>Revya keeps portal support close to the treatment journey.</h2>
              <p className="lede-alt">
                Once care is active, patients can review refill timing, message the care team,
                upload documents, check billing details, and book follow-ups without leaving the
                same account.
              </p>
              <div className="portal-mini-grid">
                <article>
                  <strong>Refill check-ins</strong>
                  <p>Submit progress updates before your next shipment is reviewed.</p>
                </article>
                <article>
                  <strong>Care messages</strong>
                  <p>Keep routine questions and updates in a secure, organized thread.</p>
                </article>
                <article>
                  <strong>Visits and documents</strong>
                  <p>Book follow-ups and upload requested records from the same portal.</p>
                </article>
              </div>
              <div className="cta-actions">
                <ActionLink href="/login">Open patient login</ActionLink>
                <ActionLink href="/dashboard" variant="ghost">
                  Preview patient portal
                </ActionLink>
              </div>
            </div>
            <div className="split-media">
              <ArtPanel
                detail="One secure portal keeps the treatment plan, messages, tasks, billing, and next steps connected."
                kind="portal"
                label="Ongoing support"
                imageAlt="Patient dashboard mockup with refill tasks and progress tracking"
                imageSrc="/images/patient-dashboard-mockup.svg"
              />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Clinical support</p>
                <h2>More than one person is keeping your care experience moving.</h2>
              </div>
            </div>
            <DoctorGrid doctors={doctors} />
          </div>
        </section>

        <section className="section testimonial-section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Member experience</p>
                <h2>Patients should understand the program before they feel pressure to buy it.</h2>
              </div>
            </div>
            <TestimonialGrid testimonials={testimonials.slice(0, 4)} />
          </div>
        </section>

        <section className="section estimator-section">
          <div className="shell">
            <div className="estimator-card">
              <p className="eyebrow">Weight-loss outcomes</p>
              <h3>See how much you could lose</h3>
              <p className="lede-alt">
                Patients in Revya programs have reported an average of 1–2 lbs of weight loss per
                week, combined with clinician-guided lifestyle support.
              </p>
              <p className="estimator-stat">14%</p>
              <p className="estimator-label">average body weight loss over 4 months*</p>
              <p className="estimator-disclaimer">
                *Based on patient-reported data from Revya program participants on GLP-1 treatment
                plans with clinician oversight. Individual results vary.
              </p>
            </div>
          </div>
        </section>

        <section className="section final-cta">
          <div className="shell cta-panel">
            <div>
              <p className="eyebrow">Next step</p>
              <h2>Start the assessment and see whether Revya care may fit.</h2>
              <p className="lede-alt">
                Begin with a short intake, review your route, and move into clinician review if
                you decide to continue.
              </p>
              <p className="guarantee-line">
                Love your weight loss in 30 days or your money back.
              </p>
            </div>
            <div className="cta-actions">
              <ActionLink href="/quiz">Start assessment</ActionLink>
              <ActionLink href="/weight-loss" variant="ghost">
                See programs and pricing
              </ActionLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
