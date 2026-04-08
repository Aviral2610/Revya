import { SiteHeader, SiteFooter } from "@/components/site-sections";
import { getPageMetadata } from "@/lib/seo";

export const metadata = {
  title: "Privacy Policy | Revya",
  description:
    "Revya's privacy policy explains how we collect, use, and protect your personal health information in connection with our telehealth weight-loss care services."
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-generic">
        <div className="shell page-generic-shell">
          <div className="page-generic-header">
            <p className="eyebrow">Legal</p>
            <h1>Privacy Policy</h1>
            <p className="page-generic-date">Effective date: January 1, 2026</p>
          </div>

          <div className="page-generic-body prose">
            <p>
              Revya Health LLC ("Revya," "we," "our," or "us") is committed to protecting your
              personal health information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard information when you use our telehealth platform, website,
              and patient portal (collectively, the "Services").
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly, including: name, contact details, date of
              birth, health history, current medications, treatment goals, and assessment responses.
              We also collect usage and technical data such as IP addresses, browser type, and
              pages accessed to improve our platform and ensure security.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use your information to: deliver telehealth clinical services; match you with
              licensed clinicians; process prescription fulfillment; send care-related communications;
              manage refills, follow-ups, and billing; comply with legal obligations; and improve our
              platform and services.
            </p>

            <h2>3. HIPAA Compliance</h2>
            <p>
              Revya is committed to compliance with the Health Insurance Portability and
              Accountability Act (HIPAA). All patient health information is treated as protected
              health information (PHI) and is stored and transmitted in encrypted, HIPAA-compliant
              environments. Our clinicians and pharmacy partners are also HIPAA-covered entities.
            </p>

            <h2>4. Information Sharing</h2>
            <p>
              We share your information only with: licensed clinicians involved in your care;
              pharmacy partners for prescription fulfillment and delivery; service providers who
              support our platform (hosting, security, analytics); and legal authorities when
              required by law or to protect rights, safety, or compliance. We do not sell your
              personal health information.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We use administrative, technical, and physical safeguards including TLS/SSL
              encryption, access controls, secure data centers, and regular security audits to
              protect your information against unauthorized access, disclosure, or destruction.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              You have the right to: access a copy of your health records; request correction of
              inaccurate information; request deletion of your account (subject to legal retention
              requirements); opt out of non-essential communications; and file a complaint with us
              or the HHS Office for Civil Rights if you believe your rights have been violated.
            </p>

            <h2>7. Cookies and Tracking</h2>
            <p>
              Our website uses essential cookies for site functionality and analytics cookies to
              understand how visitors use our site. You can control cookie preferences through your
              browser settings. We do not use advertising or cross-site tracking cookies.
            </p>

            <h2>8. Retention</h2>
            <p>
              We retain your health information for as long as your account is active and for such
              additional periods as required by law for medical record keeping. When you request
              account deletion, we will remove your personal data subject to legal retention
              obligations.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any material changes will be
              communicated via email or a notice on our platform prior to the new effective date.
              Your continued use of our Services after changes take effect constitutes acceptance
              of the revised policy.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, contact us at:{" "}
              <a href="mailto:support@revya.com">support@revya.com</a> or call (323) 690-1564, or
              mail to 131 Continental Dr. Ste 305, Newark, DE 19713.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}