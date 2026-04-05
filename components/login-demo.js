"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { demoLoginCode } from "@/lib/site-data";
import { BrandMark, MockBanner, TextLink } from "@/components/site-sections";
import { useDemoToast } from "@/lib/use-demo-toast";

export function LoginDemo() {
  const router = useRouter();
  const [loginStep, setLoginStep] = useState("identifier");
  const [identifierValue, setIdentifierValue] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const { showToast, toast } = useDemoToast();

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

    router.push("/dashboard");
  }

  return (
    <>
      <main className="login-screen">
        <section className="login-panel login-panel-visual">
          <BrandMark light />
          <div className="login-copy">
            <p className="eyebrow">Patient login</p>
            <h1>Your care stays organized after checkout.</h1>
            <p>
              The public login starts with email or phone entry. This demo adds a second, inferred
              verification step before dropping the user into a mocked portal.
            </p>
            <div className="login-benefits">
              <article>
                <strong>Refills</strong>
                <span>Triggered by text and email reminders</span>
              </article>
              <article>
                <strong>Appointments</strong>
                <span>Daily availability shown in the portal</span>
              </article>
              <article>
                <strong>Support</strong>
                <span>Unlimited access to providers and nursing line</span>
              </article>
            </div>
          </div>
          <div className="floating-support">
            <p className="mini-label">Support thread</p>
            <strong>Refill form is ready</strong>
            <span>Book a quick visit if you want to talk through side effects.</span>
          </div>
        </section>

        <section className="login-panel login-panel-form">
          <div className="login-card">
            <TextLink className="back-link" href="/">
              Back to home
            </TextLink>
            <p className="eyebrow">Secure account access</p>
            <h2>{loginStep === "identifier" ? "Sign in" : "Verify your code"}</h2>
            <p className="login-subcopy">
              {loginStep === "identifier"
                ? "Enter the email or phone number linked to your account."
                : `We sent a demo code to ${identifierValue || "your account"}.`}
            </p>

            {loginStep === "identifier" ? (
              <form className="stack-form" onSubmit={handleIdentifierSubmit}>
                <label>
                  Email or phone number
                  <input
                    onChange={(event) => setIdentifierValue(event.target.value)}
                    placeholder="name@example.com"
                    type="text"
                    value={identifierValue}
                  />
                </label>
                <button className="button primary full-width" type="submit">
                  Continue
                </button>
              </form>
            ) : (
              <form className="stack-form" onSubmit={handleVerificationSubmit}>
                <label>
                  6-digit verification code
                  <input
                    inputMode="numeric"
                    onChange={(event) => setVerificationCode(event.target.value)}
                    placeholder={demoLoginCode}
                    type="text"
                    value={verificationCode}
                  />
                </label>
                <button className="button primary full-width" type="submit">
                  Open dashboard
                </button>
                <button
                  className="button ghost full-width"
                  onClick={() => {
                    setLoginStep("identifier");
                    setVerificationCode("");
                  }}
                  type="button"
                >
                  Use another email or phone
                </button>
              </form>
            )}

            <div className="login-note">
              <strong>Demo note</strong>
              <p>
                The identifier-first sign-in screen is based on the public login page. The code
                step and everything after it are inferred and mocked because the real authenticated
                flow is not publicly accessible.
              </p>
            </div>

            <MockBanner
              className="login-mock-banner"
              copy="Placeholder branding is intentional. No private Medvi APIs, credentials, or real patient data are used in this Next.js version."
              title="Mocked + inferred"
            />
          </div>
        </section>
      </main>
      {toast ? <div className="toast">{toast}</div> : null}
    </>
  );
}
