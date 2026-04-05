import { ActionLink, SiteFooter, SiteHeader } from "@/components/site-sections";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found">
        <div className="shell cta-panel">
          <div>
            <p className="eyebrow">Not found</p>
            <h1>This route is not part of the clone.</h1>
            <p className="lede-alt">Use one of the implemented public or portal routes below.</p>
          </div>
          <div className="cta-actions">
            <ActionLink href="/">Go Home</ActionLink>
            <ActionLink href="/dashboard" variant="ghost">
              Open Dashboard
            </ActionLink>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
