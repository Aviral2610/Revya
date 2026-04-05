import {
  doctors,
  featuredLogos,
  homeHeroTabs,
  homeHighlights,
  testimonials,
  trustFeatures,
  verticalSections
} from "@/lib/site-data";
import {
  ActionLink,
  ArtPanel,
  DoctorGrid,
  MockBanner,
  SiteFooter,
  SiteHeader,
  TestimonialGrid
} from "@/components/site-sections";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero home-hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Telehealth, redefined for real life</p>
              <h1>Healthcare, redefined for real life.</h1>
              <p className="lede">
                A Next.js reconstruction of the public Medvi-style experience, rebuilt with
                placeholder branding, mocked patient data, and the same care journey structure
                surfaced in the static reference.
              </p>
              <div className="hero-actions-row">
                <ActionLink href="/weight-loss">Start Weight Loss Flow</ActionLink>
                <ActionLink href="/login" variant="ghost">
                  Open Patient Login
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
                copy="Branding, patient records, and authenticated flows are intentionally mocked or inferred. This project does not rely on private Medvi APIs."
                title="Placeholder branding"
              />
            </div>

            <div className="hero-visual">
              <ArtPanel
                detail="Provider review, shipping, and portal follow-up are presented as a single streamlined flow."
                kind="hero"
                label="Membership from $99"
              />
              <div className="floating-card">
                <p className="mini-label">Patient portal</p>
                <strong>Refills, labs, appointments, and support in one place.</strong>
                <div className="mini-list">
                  <span>Refill ready</span>
                  <span>Daily appointments</span>
                  <span>Unlimited support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell logos-strip">
            <span>As seen in</span>
            <div className="logo-row">
              {featuredLogos.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        {verticalSections.map((section, index) => (
          <section className="section section-vertical" id={section.id} key={section.id}>
            <div className={`shell split ${index % 2 === 1 ? "split-reverse" : ""}`}>
              <div className="split-copy">
                <p className="eyebrow">{section.eyebrow}</p>
                <h2>{section.title}</h2>
                <p className="lede-alt">{section.copy}</p>
                <div className="benefit-card">
                  <p className="mini-label">{section.benefitTitle}</p>
                  <ul className="check-list">
                    {section.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <ActionLink href={section.actionHref}>{section.actionLabel}</ActionLink>
              </div>
              <div className="split-media">
                <ArtPanel detail={section.title} kind={section.art} label={section.eyebrow} />
              </div>
            </div>
          </section>
        ))}

        <section className="section trust-section">
          <div className="shell trust-panel">
            <div>
              <p className="eyebrow">Why the public funnel converts</p>
              <h2>Modern care, staged like a product, delivered like a medical service.</h2>
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
                <p className="eyebrow">Our doctors</p>
                <h2>Licensed providers stay at the center of the experience.</h2>
              </div>
              <ActionLink href="/dashboard" variant="ghost">
                View Portal Demo
              </ActionLink>
            </div>
            <DoctorGrid doctors={doctors} />
          </div>
        </section>

        <section className="section testimonial-section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Real results</p>
                <h2>Public trust cues repeated across the funnel.</h2>
              </div>
            </div>
            <TestimonialGrid testimonials={testimonials} />
          </div>
        </section>

        <section className="section final-cta">
          <div className="shell cta-panel">
            <div>
              <p className="eyebrow">Patient journey</p>
              <h2>See the full path from landing page to portal task list.</h2>
              <p className="lede-alt">
                This clone includes the public home page, dedicated weight-loss funnel, getting
                started guide, OTP-style login, and a mocked patient dashboard with refill,
                messages, appointments, labs, and document workflows.
              </p>
            </div>
            <div className="cta-actions">
              <ActionLink href="/weight-loss">Explore Weight Loss Funnel</ActionLink>
              <ActionLink href="/login" variant="ghost">
                Open Login + Dashboard
              </ActionLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
