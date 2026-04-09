import { welcomeSections } from "@/lib/site-data";
import { JsonLd } from "@/components/json-ld";
import { WelcomeDetail } from "@/components/welcome-detail";
import { ActionLink, ArtPanel, SiteFooter, SiteHeader } from "@/components/site-sections";
import { buildPageSchema, getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("welcome");

export default function WelcomePage() {
  return (
    <>
      <JsonLd data={buildPageSchema("welcome")} />
      <SiteHeader />
      <main>
        <section className="hero welcome-hero">
          <div className="shell split">
            <div className="split-copy">
              <p className="eyebrow">Getting started</p>
              <h1>What care looks like after approval.</h1>
              <p className="lede">
                The Revya guide explains how refills, visits, billing, labs, document uploads, and
                dose review work once your care plan is active.
              </p>
              <div className="hero-actions-row">
                <ActionLink href="/dashboard">Preview patient portal</ActionLink>
                <ActionLink href="/weight-loss" variant="ghost">
                  Back to programs
                </ActionLink>
              </div>
            </div>
            <div className="split-media">
              <ArtPanel
                detail="Appointments, refills, documents, billing, dose guidance, and lab requests stay visible in one account."
                kind="welcome"
                label="Inside the portal"
                imageAlt="Patient dashboard mockup with refills, appointments, and treatment progress"
                priority
                imageSrc="/images/revya-portal-support.jpg"
              />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell welcome-layout">
            <aside aria-label="Welcome guide sections" className="welcome-sidebar">
              {welcomeSections.map((section) => (
                <a className="welcome-link" href={`#${section.id}`} key={section.id}>
                  {section.title}
                </a>
              ))}
            </aside>
            <div className="welcome-content">
              {welcomeSections.map((section) => (
                <article className="welcome-card" id={section.id} key={section.id}>
                  <p className="mini-label">Guide section</p>
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
