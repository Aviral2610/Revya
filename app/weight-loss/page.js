import Image from "next/image";

import {
  doctors,
  faqs,
  processSteps,
  productCards,
  trustFeatures,
  weightLossStats
} from "@/lib/site-data";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { QuizEntryPanel } from "@/components/quiz/entry-panel";
import {
  ActionLink,
  ArtPanel,
  DoctorGrid,
  SiteFooter,
  SiteHeader
} from "@/components/site-sections";
import { WeightLossHero } from "@/components/weight-loss-hero";
import { getImageDimensions } from "@/lib/image-assets";
import { buildFaqSchema, buildPageSchema, buildProductSchemas, getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("weightLoss");

export default function WeightLossPage() {
  return (
    <>
      <JsonLd
        data={buildPageSchema("weightLoss", [buildFaqSchema(), ...buildProductSchemas()])}
      />
      <div className="promo-bar">
        Programs from $179/mo. Assessment first. Clinician review required before prescribing.
      </div>
      <SiteHeader />
      <main>
        <WeightLossHero />

        <section className="section" id="programs">
          <div className="shell section-heading">
            <div>
              <p className="eyebrow">Programs and pricing</p>
              <h2>Compare the available care paths before you begin.</h2>
              <p className="lede-alt">
                Revya shows the major program formats up front so patients can understand the
                range of options before taking the assessment. Final program fit still depends on
                clinician review.
              </p>
            </div>
          </div>
          <div className="shell product-grid">
            {productCards.map((product) => (
              <article className={`product-card product-${product.tone}`} key={product.title}>
                {product.image ? (
                  <div className="product-card-image">
                    <Image
                      alt={product.imageAlt || `${product.title} treatment support`}
                      height={getImageDimensions(product.image).height}
                      loading="lazy"
                      sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 25vw"
                      src={product.image}
                      width={getImageDimensions(product.image).width}
                    />
                  </div>
                ) : null}
                <p className="mini-label">{product.note}</p>
                <h3>{product.title}</h3>
                <strong>{product.price}</strong>
                <p>{product.summary}</p>
                <div className="mini-list">
                  {product.highlights.map((item) => (
                    <span key={`${product.title}-${item}`}>{item}</span>
                  ))}
                </div>
                <ActionLink href="/quiz" variant="ghost">
                  Start assessment
                </ActionLink>
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

        <section className="section" id="how-it-works">
          <div className="shell split">
            <div className="split-copy">
              <p className="eyebrow">How it works</p>
              <h2>Understand the full path from assessment to refill support.</h2>
              <p className="lede-alt">
                Revya is designed to answer the main objections early: how qualification works,
                who reviews the intake, what happens after approval, and where support lives once
                treatment is active.
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

        <section className="section section-soft" id="eligibility">
          <div className="shell split assessment-showcase assessment-showcase-tight">
            <div className="split-copy">
              <p className="eyebrow">Assessment and clinician review</p>
              <h2>The assessment qualifies the next step. A clinician still makes the treatment call.</h2>
              <p className="lede-alt">
                Patients answer a short intake, review their answers, and see a preliminary route.
                If they move forward, a licensed clinician reviews the intake before recommending
                a specific program or prescription path.
              </p>
              <div className="cta-actions">
                <ActionLink href="/quiz">Start assessment</ActionLink>
                <ActionLink href="/welcome" variant="ghost">
                  See what happens after approval
                </ActionLink>
              </div>
            </div>
            <div className="split-media">
              <QuizEntryPanel
                copy="The intake is designed to prepare patients for clinician review, not replace it."
                ctaLabel="Start assessment"
                secondaryLabel="See what happens after approval"
                secondaryHref="/welcome"
                title="A short intake that leads into a real medical review."
              />
            </div>
          </div>
        </section>

        <section className="section trust-section">
          <div className="shell trust-panel">
            <div className="trust-lead">
              <div>
                <p className="eyebrow">Trust and oversight</p>
                <h2>Revya keeps the clinical parts visible instead of hiding them behind checkout.</h2>
              </div>
              <div className="trust-visual">
                <ArtPanel
                  detail="Assessment, clinician review, discreet fulfillment, and portal support are part of one care model."
                  kind="portal"
                  label="Clinician-led workflow"
                  imageAlt="Clinician and patient discussing treatment options in a consultation setting"
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

        <section className="section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Who supports care</p>
                <h2>Clinicians, coordinators, and pharmacy partners each have a visible role.</h2>
              </div>
            </div>
            <DoctorGrid doctors={doctors} />
          </div>
        </section>

        <section className="section" id="portal-support">
          <div className="shell split split-reverse">
            <div className="split-copy">
              <p className="eyebrow">Portal and support</p>
              <h2>Ongoing care should feel organized after the first delivery.</h2>
              <p className="lede-alt">
                The Revya portal is where patients can manage refill check-ins, appointments,
                messages, documents, billing details, and shipment status once treatment is active.
              </p>
              <div className="portal-mini-grid">
                <article>
                  <strong>Refill reviews</strong>
                  <p>Submit a quick check-in before the next shipment is approved.</p>
                </article>
                <article>
                  <strong>Follow-up visits</strong>
                  <p>Book time with a clinician to review dosing, tolerability, or progress.</p>
                </article>
                <article>
                  <strong>Care support</strong>
                  <p>Keep routine questions, documents, and billing details in one secure place.</p>
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
                detail="Refills, labs, billing, appointments, and care messages stay connected inside one account."
                kind="portal"
                label="Portal support"
                imageAlt="Patient and clinician reviewing a personalized treatment plan on a tablet"
                imageSrc="/images/personalized-plan.jpg"
              />
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Frequently asked questions</p>
                <h2>Straight answers on pricing, review, prescribing, and follow-up.</h2>
              </div>
            </div>
            <FaqList items={faqs} />
          </div>
        </section>

        <section className="section final-cta">
          <div className="shell cta-panel">
            <div>
              <p className="eyebrow">Next step</p>
              <h2>Take the assessment and see which Revya path may fit.</h2>
              <p className="lede-alt">
                Start with the intake, review your route, and move into clinician review if you
                want to continue.
              </p>
              <p className="guarantee-line">
                Love your weight loss in 30 days or your money back.
              </p>
            </div>
            <div className="cta-actions">
              <ActionLink href="/quiz">Start assessment</ActionLink>
              <ActionLink href="/login" variant="ghost">
                Open patient login
              </ActionLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
