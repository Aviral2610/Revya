import { welcomeSections } from "@/lib/site-data";
import { WelcomeDetail } from "@/components/welcome-detail";
import { ActionLink, ArtPanel, SiteFooter, SiteHeader } from "@/components/site-sections";

export default function WelcomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero welcome-hero">
          <div className="shell split">
            <div className="split-copy">
              <p className="eyebrow">Getting started guide</p>
              <h1>Public onboarding content reveals most of the portal behavior.</h1>
              <p className="lede">
                The welcome guide is the clearest public source for how Medvi-style care handles
                provider access, refill timing, billing, lab requirements, document uploads, and
                dosage progression once a patient is already in treatment.
              </p>
              <div className="hero-actions-row">
                <ActionLink href="/dashboard">Open Portal Demo</ActionLink>
                <ActionLink href="/" variant="ghost">
                  Back to Home
                </ActionLink>
              </div>
            </div>
            <div className="split-media">
              <ArtPanel
                detail="Appointments, refills, documents, billing, dosage, and labs are all called out publicly."
                kind="welcome"
                label="Publicly confirmed"
              />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell welcome-layout">
            <aside className="welcome-sidebar">
              {welcomeSections.map((section) => (
                <a className="welcome-link" href={`#${section.id}`} key={section.id}>
                  {section.title}
                </a>
              ))}
            </aside>
            <div className="welcome-content">
              {welcomeSections.map((section) => (
                <article className="welcome-card" id={section.id} key={section.id}>
                  <p className="mini-label">Public guide section</p>
                  <h2>{section.title}</h2>
                  <p>{section.summary}</p>
                  <WelcomeDetail id={section.id} />
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
