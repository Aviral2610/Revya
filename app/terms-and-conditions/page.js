import { SiteHeader, SiteFooter } from "@/components/site-sections";
import { getPageMetadata } from "@/lib/seo";

export const metadata = {
  title: "Terms & Conditions | Revya",
  description:
    "Revya's terms and conditions outline the rules, responsibilities, and limitations governing use of our telehealth weight-loss care platform and patient services."
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-generic">
        <div className="shell page-generic-shell">
          <div className="page-generic-header">
            <p className="eyebrow">Legal</p>
            <h1>Terms & Conditions</h1>
            <p className="page-generic-date">Effective date: January 1, 2026</p>
          </div>

          <div className="page-generic-body prose">
            <p>
              Welcome to Revya. These Terms & Conditions ("Terms") govern your access to and use
              of the Revya telehealth platform, patient portal, and associated services
              (collectively, "Services"). By using our Services, you agree to be bound by these
              Terms. If you do not agree, do not use our Services.
            </p>

            <h2>1. About Our Services</h2>
            <p>
              Revya provides a telehealth platform that connects patients with licensed clinicians
              for weight-loss assessment, clinical review, and ongoing care management. Revya itself
              is not a healthcare provider. Clinical services are provided by independent, licensed
              providers in our network. Revya does not guarantee the issuance of any prescription.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be 18 years or older and a resident of a state where Revya operates to use
              our Services. You represent that all information you provide during assessment and
              registration is accurate and complete. Providing false information may result in
              disqualification from the program and termination of your account.
            </p>

            <h2>3. Clinical Services and Prescriptions</h2>
            <p>
              All clinical decisions, including the issuance of prescriptions, are made solely by
              licensed clinicians after an individual review of your health history and assessment.
              Revya does not influence, override, or substitute the clinical judgment of any
              licensed provider. Prescriptions are dispensed by state-licensed pharmacies. Compound
              medications are produced in FDA-regulated facilities but are not FDA-approved
              themselves. Treatment recommendations are at the clinician's discretion.
            </p>

            <h2>4. Program Fees and Billing</h2>
            <p>
              Program fees are displayed on the relevant program page at the time of purchase.
              Prices may change; changes will be communicated before you are charged. You authorize
              us to charge the payment method on file for all fees associated with your selected
              program. Refunds are governed by our refund policy, available upon request or at the
              time of cancellation.
            </p>

            <h2>5. Money-Back Guarantee</h2>
            <p>
              If you are not satisfied with your experience in the first 30 days of receiving your
              first order, you may request a full refund of your program fees by contacting us at{" "}
              the secure Revya patient portal. Refund requests are
              processed within 5–7 business days. This guarantee applies to program fees only and
              does not cover medication costs already dispensed.
            </p>

            <h2>6. Account Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials
              and for all activity under your account. You agree to notify us immediately of any
              unauthorized access. You may not share your account with another person or allow
              others to access your portal on your behalf without our written consent.
            </p>

            <h2>7. Prohibited Use</h2>
            <p>
              You agree not to: use our Services for any unlawful purpose; submit false, misleading,
              or fraudulent health information; attempt to obtain prescriptions for third parties;
              or interfere with the operation of our platform. Violation may result in account
              suspension or termination without refund.
            </p>

            <h2>8. Disclaimers</h2>
            <p>
              OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
              WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY
              SECURE. RESULTS FROM ANY TREATMENT PROGRAM VARY BY INDIVIDUAL. REVYA IS NOT
              RESPONSIBLE FOR ANY OUTCOMES RESULTING FROM CLINICAL CARE PROVIDED BY INDEPENDENT
              LICENSED PRACTITIONERS.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Revya shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of or
              inability to use our Services. Our total liability shall not exceed the amount you
              paid for your program in the 12 months preceding the claim.
            </p>

            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Revya, its officers, directors,
              employees, and agents from any claims, damages, losses, or expenses (including
              reasonable attorneys' fees) arising from your violation of these Terms or your use
              of our Services.
            </p>

            <h2>11. Termination</h2>
            <p>
              We may suspend or terminate your access to our Services at any time for violation of
              these Terms, suspected fraud, or any reason we deem necessary to protect our platform,
              clinicians, or patients. Upon termination, your right to access the portal and any
              stored data ceases. Termination does not entitle you to a refund unless otherwise
              required by law or our refund policy.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of
              Delaware, without regard to its conflict of law principles. Any disputes shall be
              resolved exclusively in the state or federal courts located in Delaware.
            </p>

            <h2>13. Changes to These Terms</h2>
            <p>
              We may modify these Terms at any time. Material changes will be communicated via email
              or a notice on our platform at least 14 days before they take effect. Your continued
              use of our Services after such changes constitutes acceptance of the revised Terms.
            </p>

            <h2>14. Contact</h2>
            <p>
              For questions about these Terms, contact us at:{" "}
              the secure Revya patient portal once live support channels are enabled.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}