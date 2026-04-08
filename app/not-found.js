import { ActionLink, SiteFooter, SiteHeader } from "@/components/site-sections";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found">
        <div className="shell cta-panel">
          <div>
            <p className="eyebrow">Not found</p>
            <h1>The page you were looking for is not available.</h1>
            <p className="lede-alt">
              Start with Revya weight-loss care, the online assessment, or the patient portal.
            </p>
          </div>
          <div className="cta-actions">
            <ActionLink href="/">Go home</ActionLink>
            <ActionLink href="/weight-loss" variant="ghost">
              See programs and pricing
            </ActionLink>
            <ActionLink href="/quiz" variant="ghost">
              Start assessment
            </ActionLink>
            <ActionLink href="/dashboard" variant="ghost">
              Preview patient portal
            </ActionLink>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
