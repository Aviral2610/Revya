import Image from "next/image";

import { doctors, faqs } from "@/lib/site-data";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { WeightLossEstimator } from "@/components/weight-loss-estimator";
import { ActionLink, SiteFooter, SiteHeader } from "@/components/site-sections";
import { getImageDimensions } from "@/lib/image-assets";
import { buildFaqSchema, buildPageSchema, buildProductSchemas, getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("weightLoss");

const SECTION_LINKS = [
  { label: "Biology", href: "#biology" },
  { label: "Program", href: "#program" },
  { label: "First year", href: "#first-year" },
  { label: "FAQ", href: "#faq" }
];

const BIOLOGY_FACTORS = [
  {
    title: "Stress chemistry matters",
    copy:
      "High stress, poor sleep, and uneven recovery can push appetite higher and make evening cravings feel much louder than morning intentions."
  },
  {
    title: "Hunger signals are not static",
    copy:
      "Hormones tied to fullness, blood sugar, and appetite can shift how easy or hard it feels to stop eating when you planned to."
  },
  {
    title: "Family pattern can shape baseline",
    copy:
      "Genetics can influence insulin response, appetite drive, and how strongly the body protects a higher set point over time."
  },
  {
    title: "Metabolism adapts during weight loss",
    copy:
      "As pounds come off, calorie burn can dip and hunger can climb. A realistic plan needs room for that pushback."
  }
];

const PROGRAM_BENEFITS = [
  {
    title: "Assessment built for real context",
    copy:
      "Revya starts by collecting health history, goals, current medications, and previous attempts so clinician review begins with substance."
  },
  {
    title: "Clinician review before prescribing",
    copy:
      "Treatment fit is reviewed by a licensed clinician before any medication recommendation is made."
  },
  {
    title: "More than one treatment route",
    copy:
      "Weekly GLP-1 paths, oral formats, and brand-support options can be considered when they match your history and goals."
  },
  {
    title: "Dose and tolerability checkpoints",
    copy:
      "Questions about side effects, pace, and whether to stay or move on a dose are handled inside a structured review process."
  },
  {
    title: "Portal follow-through after approval",
    copy:
      "Refill check-ins, secure messages, appointments, and billing stay visible in one place once care is active."
  },
  {
    title: "Early downside protection",
    copy:
      "Eligible program fees are covered by a 30-day money-back guarantee, which makes it easier to start without blind commitment."
  }
];

const TREATMENT_PATHS = ["Weekly GLP-1 paths", "Daily oral routes", "Brand-support options"];

const FIRST_YEAR_STEPS = [
  {
    timing: "Week 0",
    title: "Take the quiz",
    copy:
      "Answer a short intake on your goals, medical history, and treatment preferences so Revya can map the most likely next step."
  },
  {
    timing: "Week 1",
    title: "Receive clinician review",
    copy:
      "A licensed clinician looks at contraindications, medications, and fit before deciding whether an online treatment path is appropriate."
  },
  {
    timing: "Month 1",
    title: "Start treatment if prescribed",
    copy:
      "If a plan is approved, you move into onboarding, delivery coordination, and the first round of dose and tolerability support."
  },
  {
    timing: "Months 2-12",
    title: "Adjust, refill, and protect momentum",
    copy:
      "Progress rarely moves in a straight line. Revya keeps refill reviews, follow-up visits, and plateau decisions organized through the year."
  }
];

const EVIDENCE_COMPARISON = {
  standalone: [
    "Questions build up between refill windows.",
    "Side effects can go unaddressed until they derail consistency.",
    "Plateaus feel like failure instead of a signal to review the plan.",
    "Tracking, billing, delivery, and follow-up are easier to let slide."
  ],
  program: [
    "Clinician review shapes the route before treatment begins.",
    "Refill check-ins create natural moments to review progress and tolerability.",
    "Portal-based follow-up keeps logistics from competing with treatment.",
    "Habit support and visible next steps help members stay engaged longer."
  ]
};

const BODY_RESPONSE_SIGNALS = [
  {
    title: "Hunger can rise again",
    copy:
      "As the body senses weight loss, appetite can rebound and fullness can fade faster than it did at the start."
  },
  {
    title: "Energy burn can soften",
    copy:
      "The body may use slightly fewer calories as weight drops, which makes the same habits produce slower results later on."
  },
  {
    title: "Plateaus are part of the process",
    copy:
      "A stall does not always mean the plan failed. It often means the next clinical or behavioral adjustment matters more."
  }
];

const leadClinician = doctors[0];
const leadClinicianName = leadClinician?.name ?? "a Revya clinician";
const leadClinicianInitials = leadClinicianName
  .replace(/^Dr\.\s*/, "")
  .split(" ")
  .filter(Boolean)
  .map((part) => part[0])
  .slice(0, 2)
  .join("")
  .toUpperCase();

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
        <section className="hero glp-hero weight-loss-revamp-hero">
          <div className="shell revya-hero-grid weight-loss-hero-grid">
            <div className="revya-hero-copy weight-loss-hero-copy">
              <p className="eyebrow">Clinician-guided medical weight loss</p>
              <h1>Medical weight-loss treatments built around how your body actually responds.</h1>
              <p className="revya-proofline">
                Programs from $179/mo. Clinician review comes before prescribing, and eligible
                program fees are backed by a 30-day money-back guarantee.
              </p>
              <p className="lede">
                Revya looks at appetite, metabolism, hormones, health history, and prior attempts
                before a clinician recommends a path. The goal is not just to start treatment. It
                is to make the plan easier to stay with once real life shows up.
              </p>
              <div className="hero-actions-row revya-hero-actions">
                <ActionLink href="/quiz">Start assessment</ActionLink>
                <ActionLink href="/quiz" variant="ghost">
                  See if you may qualify
                </ActionLink>
              </div>
              <p className="guarantee-line">
                30-day money-back guarantee on eligible program fees. Medication already filled or
                shipped is excluded.
              </p>
              <div className="hero-pill-row revya-anchor-row">
                {SECTION_LINKS.map((item) => (
                  <ActionLink href={item.href} key={item.label} variant="chip">
                    {item.label}
                  </ActionLink>
                ))}
              </div>
            </div>

            <div className="weight-loss-hero-side">
              <article className="weight-loss-proof-card">
                <div>
                  <p className="mini-label">Illustrative member progress</p>
                  <strong>24 lbs in 4 months</strong>
                </div>
                <p>
                  For many starting points, that lands near a 10% body-weight change. Results vary
                  with treatment fit, clinician review, and consistency over time.
                </p>
                <div className="mini-list">
                  <span>Clinician review first</span>
                  <span>Refill check-ins</span>
                  <span>Visible next steps</span>
                </div>
              </article>

              <WeightLossEstimator
                className="weight-loss-page-estimator"
                description="Move the sliders to test a starting weight, target, and pace before you begin the Revya quiz."
                eyebrow="Weight-loss estimator"
                secondaryLabel="Take the quiz"
                secondaryHref="/quiz"
                showSecondary={false}
                title="Estimate a goal that feels ambitious but medically realistic."
              />
            </div>
          </div>
        </section>

        <section className="section" id="biology">
          <div className="shell section-heading">
            <div>
              <p className="eyebrow">Your biology influences your weight</p>
              <h2>The number on the scale is rarely just about discipline.</h2>
              <p className="lede-alt">
                Appetite signaling, stress load, sleep, genetics, and metabolic adaptation can all
                change how hard weight loss feels. Revya is built to review those pressures before
                the treatment conversation starts.
              </p>
            </div>
          </div>
          <div className="shell weight-loss-biology-grid">
            {BIOLOGY_FACTORS.map((item) => (
              <article className="weight-loss-biology-card" key={item.title}>
                <p className="mini-label">Biology factor</p>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-soft" id="program">
          <div className="shell section-heading">
            <div>
              <p className="eyebrow">A program that works with your body</p>
              <h2>The treatment matters. The structure around it matters just as much.</h2>
              <p className="lede-alt">
                Revya is designed to remove the usual drop-off points: unclear eligibility,
                scattered follow-up, dosing uncertainty, and no obvious place to ask questions
                after the first shipment.
              </p>
            </div>
          </div>
          <div className="shell weight-loss-benefit-grid">
            {PROGRAM_BENEFITS.map((item) => (
              <article className="weight-loss-benefit-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="treatment">
          <div className="shell weight-loss-reveal-layout">
            <article className="weight-loss-reveal-card">
              <p className="eyebrow">Wondering what the treatment is called?</p>
              <h2>The medication name comes after the medical fit is clear.</h2>
              <p className="lede-alt">
                Some patients come in asking for a specific shot. Others just want help with
                appetite, portions, or a frustrating plateau. Revya clinicians start by reviewing
                your history and then decide which route may fit, which can include GLP-1-based
                care, oral options, or a brand-support path when appropriate.
              </p>
              <div className="weight-loss-path-list">
                {TREATMENT_PATHS.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <p className="weight-loss-support-note">
                Not every patient is a fit for an online medication pathway. If the match is not
                there, clinician review should make that obvious instead of pushing a sale.
              </p>
              <div className="cta-actions">
                <ActionLink href="/quiz">Start assessment</ActionLink>
              </div>
            </article>

            <article className="weight-loss-visual-card">
              <div className="weight-loss-visual-image">
                <Image
                  alt="Clinician reviewing medication options for a weight-loss program"
                  className="weight-loss-visual-photo"
                  height={getImageDimensions("/images/revya-doctor-medication.jpg").height}
                  sizes="(max-width: 760px) 100vw, 44vw"
                  src="/images/revya-doctor-medication.jpg"
                  width={getImageDimensions("/images/revya-doctor-medication.jpg").width}
                />
              </div>
              <div className="weight-loss-visual-copy">
                <p className="mini-label">After clinician review</p>
                <strong>
                  Weekly GLP-1 paths, oral treatment options, and ongoing dose support can all live
                  inside one connected Revya program.
                </strong>
                <p>
                  Prescribing depends on contraindications, current medications, and clinician
                  judgment. Support continues after approval so the plan stays usable.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="section section-soft" id="first-year">
          <div className="shell section-heading">
            <div>
              <p className="eyebrow">What to expect in your first year</p>
              <h2>The path is simple even when the exact treatment route is not.</h2>
              <p className="lede-alt">
                Revya keeps the sequence visible from day one: quiz, clinician review, treatment if
                prescribed, then structured follow-through as results, side effects, and plateaus
                unfold.
              </p>
            </div>
          </div>
          <div className="shell weight-loss-year-grid">
            {FIRST_YEAR_STEPS.map((step, index) => (
              <article className="weight-loss-year-card" key={step.title}>
                <span>{index + 1}</span>
                <p className="mini-label">{step.timing}</p>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
          <div className="shell weight-loss-year-note">
            <strong>The exact prescription can vary. The care sequence should not.</strong>
            <p>
              Revya keeps assessment first, clinician review before prescribing, and continued
              support after treatment starts so progress does not rely on memory alone.
            </p>
          </div>
        </section>

        <section className="section" id="clinical-rationale">
          <div className="shell section-heading">
            <div>
              <p className="eyebrow">Clinical rationale</p>
              <h2>A connected program usually works better than medication in isolation.</h2>
              <p className="lede-alt">
                Treatment may open the door, but adherence, refill timing, side-effect management,
                and follow-up are what help people keep walking through it. That is why Revya is
                built as a program, not just a prescription touchpoint.
              </p>
            </div>
          </div>
          <div className="shell revya-comparison-grid">
            <article className="revya-compare-card revya-compare-card-muted">
              <p className="mini-label">Treatment alone</p>
              <h3>The prescription can be clear while everything around it stays fragmented.</h3>
              <ul className="detail-list">
                {EVIDENCE_COMPARISON.standalone.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="revya-compare-card revya-compare-card-accent">
              <p className="mini-label">The Revya program</p>
              <h3>Revya keeps the medical and operational pieces connected from start to refill.</h3>
              <ul className="detail-list">
                {EVIDENCE_COMPARISON.program.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section section-soft" id="body-response">
          <div className="shell weight-loss-response-layout">
            <article className="weight-loss-response-intro">
              <p className="eyebrow">Your body fights to maintain your weight</p>
              <h2>That resistance is part of physiology. It is not proof that you failed.</h2>
              <p className="lede-alt">
                As weight comes down, the body may ask for more food, feel satisfied for less time,
                and spend energy a little more slowly. The plan has to expect those responses
                instead of turning them into blame.
              </p>
              <p className="weight-loss-support-note">
                Revya frames plateaus and rebound hunger as signals to review the plan, the pace,
                or the treatment fit with a clinician.
              </p>
            </article>

            <div className="weight-loss-response-grid">
              {BODY_RESPONSE_SIGNALS.map((item) => (
                <article className="weight-loss-response-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="shell weight-loss-faq-top">
            <div>
              <p className="eyebrow">Frequently asked questions</p>
              <h2>Questions patients ask {leadClinicianName} before they start.</h2>
              <p className="lede-alt">
                These are the practical questions that usually come up first: assessment time,
                clinician review, program pricing, GLP-1 treatment fit, and what happens if Revya
                is not the right path.
              </p>
            </div>
            <article className="weight-loss-clinician-card">
              <span className="avatar avatar-sage">{leadClinicianInitials}</span>
              <div>
                <p className="mini-label">Clinician review lead</p>
                <strong>{leadClinicianName}</strong>
                <p>{leadClinician?.specialty}</p>
              </div>
            </article>
          </div>
          <div className="shell">
            <FaqList items={faqs} />
          </div>
        </section>

        <section className="section final-cta revya-final-cta">
          <div className="shell revya-final-panel">
            <div>
              <p className="eyebrow">Ready to begin</p>
              <h2>Start the quiz and see which Revya path may fit your biology, history, and goals.</h2>
              <p className="lede-alt">
                Most patients finish the intake in a few minutes. From there, clinician review
                determines whether treatment, which route, and what the next step should be.
              </p>
            </div>
            <div className="revya-final-actions">
              <ActionLink href="/quiz">Start assessment</ActionLink>
              <ActionLink href="/quiz" variant="ghost">
                Check eligibility
              </ActionLink>
              <p className="guarantee-line">
                30-day money-back guarantee on eligible program fees. Prescribing stays
                clinician-led.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
