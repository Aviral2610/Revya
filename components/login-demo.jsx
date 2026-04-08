"use client";

import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { brand, demoLoginCode } from "@/lib/site-data";
import { BrandMark, TextLink } from "@/components/site-sections";
import { useDemoToast } from "@/lib/use-demo-toast";

const portalBenefits = [
  {
    title: "Refill check-ins",
    copy: "Review what is due now, what is already under clinician review, and what still needs your attention."
  },
  {
    title: "Visits and care messages",
    copy: "Keep follow-up scheduling, secure messages, and treatment questions connected in one account."
  },
  {
    title: "Billing and documents",
    copy: "See statements, upload requested records, and keep account details organized after approval."
  }
];

const portalSnapshot = [
  { label: "Next refill review", value: "Apr 18" },
  { label: "Care messages", value: "2 unread" },
  { label: "Documents requested", value: "1 pending" }
];

export function LoginDemo({
  authErrorMessage = "",
  callbackUrl = "/dashboard",
  googleAuthEnabled = false,
  previewDashboardUrl = "/dashboard?preview=1",
  sessionUser = null
}) {
  const router = useRouter();
  const [loginStep, setLoginStep] = useState("identifier");
  const [identifierValue, setIdentifierValue] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const { showToast, toast } = useDemoToast();
  const supportPhoneHref = `tel:${brand.supportPhone.replace(/[^\d+]/g, "")}`;

  function handleIdentifierSubmit(event) {
    event.preventDefault();

    const identifier = identifierValue.trim();
    if (!identifier) {
      showToast("Enter an email or phone number to continue.");
      return;
    }

    setIdentifierValue(identifier);
    setLoginStep("verify");
    showToast(`Demo verification code: ${demoLoginCode}`);
  }

  function handleVerificationSubmit(event) {
    event.preventDefault();

    if (verificationCode.trim() !== demoLoginCode) {
      showToast(`Use demo code ${demoLoginCode}.`);
      return;
    }

    router.push(previewDashboardUrl);
  }

  function handleGoogleSignIn() {
    if (!googleAuthEnabled) {
      showToast("Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and AUTH_SECRET to enable Google sign-in.");
      return;
    }

    signIn("google", { callbackUrl });
  }

  return (
    <>
      <main className="login-screen">
        <section className="login-panel login-panel-visual">
          <div className="login-visual-header">
            <BrandMark light />
            <span className="login-visual-chip">Patient portal</span>
          </div>

          <div className="login-visual-body">
            <div className="login-copy">
              <p className="eyebrow">Secure patient access</p>
              <h1>Sign in to continue your Revya care plan.</h1>
              <p>
                Access refill timing, clinician follow-up, billing, documents, and care messages
                from one secure account built around the treatment journey.
              </p>
            </div>

            <div className="login-visual-pills" aria-label="Portal highlights">
              <span>{googleAuthEnabled ? "Google auth ready" : "Preview sign-in"}</span>
              <span>Refills and follow-ups</span>
              <span>Messages and records</span>
            </div>
          </div>

          <div className="login-visual-grid">
            <article className="login-visual-card login-visual-card-primary">
              <p className="mini-label">After sign in</p>
              <h2>See what needs attention now.</h2>
              <div className="login-benefits">
                {portalBenefits.map((item) => (
                  <article key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.copy}</span>
                  </article>
                ))}
              </div>
            </article>

            <article className="login-visual-card login-visual-card-secondary">
              <p className="mini-label">Account snapshot</p>
              <strong>Portal tasks, visits, and support stay visible between check-ins.</strong>
              <div className="login-snapshot-list">
                {portalSnapshot.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="login-panel login-panel-form">
          <div className="login-form-shell">
            <div className="login-card">
              <div className="login-card-topbar">
                <TextLink className="back-link" href="/">
                  Back to home
                </TextLink>
                <span className="login-security-chip">Secure sign-in</span>
              </div>

              <BrandMark />

              <div className="login-card-header">
                <p className="eyebrow">Patient portal access</p>
                <h2>
                  {sessionUser
                    ? "You are already signed in"
                    : loginStep === "identifier"
                      ? "Sign in to your account"
                      : "Verify your code"}
                </h2>
                <p className="login-subcopy">
                  {sessionUser
                    ? `Continue as ${sessionUser.email || sessionUser.name || "your account"} or sign out to switch profiles.`
                    : loginStep === "identifier"
                      ? "Use Google for a real session, or use the demo code flow to open the preview portal."
                      : `Enter the 6-digit code sent to ${identifierValue || "your account"} to open the preview portal.`}
                </p>
              </div>

              {sessionUser ? (
                <div className="stack-form">
                  <div className="login-security-note">
                    <strong>Current account</strong>
                    <p>{sessionUser.email || sessionUser.name || "Signed-in member"}</p>
                  </div>
                  <button
                    className="button primary full-width login-submit"
                    onClick={() => router.push(callbackUrl)}
                    type="button"
                  >
                    Continue to dashboard
                  </button>
                  <button
                    className="button ghost full-width"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    type="button"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <>
                  {authErrorMessage ? (
                    <div className="login-security-note">
                      <strong>Sign-in issue</strong>
                      <p>{authErrorMessage}</p>
                    </div>
                  ) : null}

                  <div className="login-stage-row" aria-label="Sign-in steps">
                    <article
                      className={`login-stage ${
                        loginStep === "identifier" ? "is-active" : "is-complete"
                      }`}
                    >
                      <span>1</span>
                      <div>
                        <strong>Confirm account</strong>
                        <small>Email or mobile number</small>
                      </div>
                    </article>
                    <article className={`login-stage ${loginStep === "verify" ? "is-active" : ""}`}>
                      <span>2</span>
                      <div>
                        <strong>Verify code</strong>
                        <small>Preview access</small>
                      </div>
                    </article>
                  </div>

                  {loginStep === "identifier" ? (
                    <form className="stack-form" onSubmit={handleIdentifierSubmit}>
                      <label className="login-field">
                        <span className="login-field-copy">
                          <span className="login-field-label">Email or mobile number</span>
                          <span className="login-field-helper">
                            Use the same contact information tied to your intake, billing, or active care plan.
                          </span>
                        </span>
                        <input
                          autoComplete="username"
                          enterKeyHint="next"
                          name="identifier"
                          onChange={(event) => setIdentifierValue(event.target.value)}
                          placeholder="name@example.com or (555) 123-4567"
                          type="text"
                          value={identifierValue}
                        />
                      </label>
                      <button className="button primary full-width login-submit" type="submit">
                        Continue with secure code
                      </button>
                      <div className="login-divider">
                        <span>or</span>
                      </div>
                      <button
                        className="button google-signin full-width"
                        disabled={!googleAuthEnabled}
                        onClick={handleGoogleSignIn}
                        type="button"
                      >
                        <svg
                          aria-hidden="true"
                          className="google-icon"
                          focusable="false"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        {googleAuthEnabled ? "Continue with Google" : "Google sign-in unavailable"}
                      </button>
                    </form>
                  ) : (
                    <form className="stack-form" onSubmit={handleVerificationSubmit}>
                      <label className="login-field">
                        <span className="login-field-copy">
                          <span className="login-field-label">6-digit verification code</span>
                          <span className="login-field-helper">
                            For this preview, use the demo code shown in the confirmation message after you continue.
                          </span>
                        </span>
                        <input
                          autoComplete="one-time-code"
                          enterKeyHint="done"
                          inputMode="numeric"
                          maxLength={6}
                          name="verificationCode"
                          onChange={(event) => setVerificationCode(event.target.value)}
                          placeholder={demoLoginCode}
                          type="text"
                          value={verificationCode}
                        />
                      </label>
                      <button className="button primary full-width login-submit" type="submit">
                        Open preview portal
                      </button>
                    </form>
                  )}
                </>
              )}

              <div className="login-note-grid">
                <article className="login-note-card">
                  <strong>{googleAuthEnabled ? "Google access is ready." : "Preview access is active."}</strong>
                  <p>
                    {googleAuthEnabled
                      ? "Google sign-in creates a real member session. The code flow still opens the scaffolded dashboard for demos."
                      : "Use the one-time verification flow for demos until Google auth env vars are supplied."}
                  </p>
                </article>
                <article className="login-note-card">
                  <strong>{googleAuthEnabled ? "Supabase profile sync" : "Passwordless preview"}</strong>
                  <p>
                    {googleAuthEnabled
                      ? "Signed-in Google members can be scaffolded into Supabase so the dashboard can resolve a real account state."
                      : "Revya uses a one-time code for portal previews, so there is no password to remember in this demo build."}
                  </p>
                </article>
              </div>

              <div className="login-security-note">
                <strong>Need help accessing your portal?</strong>
                <p>
                  Reach Revya support at <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a> or{" "}
                  <a href={supportPhoneHref}>{brand.supportPhone}</a>.
                </p>
              </div>
            </div>

            <aside className="login-support-card">
              <div>
                <p className="mini-label">Need help accessing your portal?</p>
                <p>
                  Use the intake email or phone number you gave Revya, or contact support if your
                  details recently changed.
                </p>
              </div>
              <div className="login-support-links">
                <TextLink href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</TextLink>
                <TextLink href={supportPhoneHref}>{brand.supportPhone}</TextLink>
              </div>
            </aside>
          </div>
        </section>
      </main>
      {toast ? <div className="toast">{toast}</div> : null}
    </>
  );
}
