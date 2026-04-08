import { JsonLd } from "@/components/json-ld";
import { DashboardPortal } from "@/components/dashboard-portal";
import { getServerAuthSession, isGoogleAuthEnabled } from "@/lib/auth";
import { getPortalProfileForUser } from "@/lib/portal-profile";
import { buildPageSchema, getPageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const metadata = getPageMetadata("dashboard");

export default async function DashboardPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const session = await getServerAuthSession();
  const googleAuthEnabled = isGoogleAuthEnabled();
  const previewMode = resolvedSearchParams?.preview === "1";

  if (googleAuthEnabled && !session && !previewMode) {
    redirect("/login?callbackUrl=%2Fdashboard");
  }

  const patient = await getPortalProfileForUser(session?.user);

  return (
    <>
      <JsonLd data={buildPageSchema("dashboard")} />
      <DashboardPortal
        googleAuthEnabled={googleAuthEnabled}
        patient={patient}
        previewMode={!session}
        sessionUser={session?.user ?? null}
      />
    </>
  );
}
