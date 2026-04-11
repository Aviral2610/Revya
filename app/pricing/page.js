import { ActionLink, SiteFooter, SiteHeader } from "@/components/site-sections";
import { featuredLogos, pricingGuaranteeHighlights, productCards } from "@/lib/site-data";
import Image from "next/image";
import { getImageDimensions } from "@/lib/image-assets";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("pricing");

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-generic">
        <div className="shell">
          <div className="section-heading pricing-page-header">
            <div>
              <p className="eyebrow">Programs and pricing</p>
              <h1>Explore your care options.</h1>
              <p className="lede-alt">
                All programs include clinician review, secure portal access, and ongoing follow-up
                support. Final program fit is determined after your assessment and clinician review.
              </p>
            </div>
            <div className="pricing-actions">
              <ActionLink href="/quiz">Start assessment</ActionLink>
              <ActionLink href="/dashboard" variant="ghost">
                Preview patient portal
              </ActionLink>
            </div>
          </div>

          <div className="pricing-assurance-row">
            {featuredLogos.slice(0, 4).map((item) => (
              <span className="pricing-assurance-pill" key={item}>
                {item}
              </span>
            ))}
          </div>

          <div className="product-grid">
            {productCards.map((product) => (
              <article className={"product-card product-" + product.tone} key={product.title}>
                {product.image ? (
                  <div className="product-card-image">
                    <Image
                      alt={product.imageAlt || product.title + " treatment support"}
                      height={getImageDimensions(product.image).height}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      src={product.image}
                      width={getImageDimensions(product.image).width}
                    />
                  </div>
                ) : (
                  <div className={"product-card-icon icon-" + product.tone}>
                    <span>{product.title.charAt(0)}</span>
                  </div>
                )}
                <div className="product-card-body">
                  <p className="product-card-note">{product.note}</p>
                  <h3>{product.title}</h3>
                  <p className="product-card-price">{product.price}</p>
                  <p className="product-card-summary">{product.summary}</p>
                  <ul className="product-card-highlights">
                    {product.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
                <div className="product-card-footer">
                  <ActionLink href="/quiz" variant="ghost">
                    Start assessment
                  </ActionLink>
                </div>
              </article>
            ))}
          </div>

          <div className="pricing-guarantee">
            <div className="pricing-guarantee-grid">
              <div className="pricing-guarantee-copy">
                <p className="mini-label">30-day program-fee guarantee</p>
                <h3>Love your weight loss in 30 days or your money back.</h3>
                <p>
                  If you are not satisfied within the first 30 days of receiving your first order,
                  contact Revya support for a full refund of your program fees.
                </p>
              </div>
              <ul className="detail-list tight pricing-guarantee-list">
                {pricingGuaranteeHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pricing-faq">
            <h2>Common questions</h2>
            <div className="faq-grid">
              {[
                {
                  q: "Does program price include medication cost?",
                  a: "Program fees cover clinical review, portal access, and follow-up support. Medication costs are priced separately and will be discussed with you during clinician review."
                },
                {
                  q: "How does clinician review work?",
                  a: "After you complete the assessment, a licensed clinician reviews your health history, current medications, and treatment goals before recommending a specific program."
                },
                {
                  q: "What happens if I am not approved for a program?",
                  a: "If the clinician determines that Revya is not a fit for your situation, you will not be charged for the program and will receive a full refund."
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Yes. You can cancel your program at any time through the Revya patient portal once support workflows are enabled. Cancellation does not affect medication already dispensed."
                }
              ].map((item) => (
                <div className="faq-item" key={item.q}>
                  <h4>{item.q}</h4>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
