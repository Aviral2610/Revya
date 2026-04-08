import { JsonLd } from "@/components/json-ld";
import { LoginDemo } from "@/components/login-demo";
import { buildPreviewPath, getAuthErrorMessage, normalizeCallbackPath } from "@/lib/auth-redirect";
import { getServerAuthSession, isGoogleAuthEnabled } from "@/lib/auth";
import { buildPageSchema, getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("login");

export default async function LoginPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const callbackUrl = normalizeCallbackPath(resolvedSearchParams?.callbackUrl);
  const session = await getServerAuthSession();

  return (
    <>
      <JsonLd data={buildPageSchema("login")} />
      <LoginDemo
        authErrorMessage={getAuthErrorMessage(resolvedSearchParams?.error)}
        callbackUrl={callbackUrl}
        googleAuthEnabled={isGoogleAuthEnabled()}
        previewDashboardUrl={buildPreviewPath(callbackUrl)}
        sessionUser={session?.user ?? null}
      />
    </>
  );
}
