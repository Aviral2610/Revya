import { JsonLd } from "@/components/json-ld";
import { QuizShell } from "@/components/quiz/quiz-shell";
import { ActionLink, SiteFooter, SiteHeader, TextLink } from "@/components/site-sections";
import { buildPageSchema, getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("quiz");

export default function QuizPage() {
  return (
    <>
      <JsonLd data={buildPageSchema("quiz")} />
      <SiteHeader mode="dark" />
      <main className="quiz-premium-main">
        <section className="quiz-premium-page">
          <div className="quiz-premium-orb quiz-premium-orb-a" aria-hidden />
          <div className="quiz-premium-orb quiz-premium-orb-b" aria-hidden />
          <div className="quiz-premium-grid shell">
            <aside className="quiz-premium-aside">
              <p className="eyebrow">Revya assessment</p>
              <h1>Check whether Revya care may fit in a short medical intake.</h1>
              <p className="lede">
                Answer a few guided questions about your goals, health history, current
                medications, and treatment preferences. You will see an informational route first.
                If you continue, a licensed clinician reviews the full intake before recommending
                care.
              </p>
              <div className="quiz-premium-proof">
                <span>About 3 minutes</span>
                <span>Saved on this device</span>
                <span>Clinician review required before treatment</span>
              </div>

              <div className="quiz-premium-highlights">
                <article>
                  <strong>About 3 minutes</strong>
                  <p>One question at a time, designed to stay easy on mobile and desktop.</p>
                </article>
                <article>
                  <strong>Review before result</strong>
                  <p>Confirm your answers before the route is generated.</p>
                </article>
                <article>
                  <strong>Clinician review comes next</strong>
                  <p>The quiz helps qualify the next step, but treatment decisions stay clinician-led.</p>
                </article>
              </div>

              <div className="quiz-premium-journey">
                <article>
                  <span>01</span>
                  <div>
                    <strong>Assessment</strong>
                    <p>Provide your goals, body metrics, treatment history, and safety details.</p>
                  </div>
                </article>
                <article>
                  <span>02</span>
                  <div>
                    <strong>Route</strong>
                    <p>See the likely next step based on your answers and clinician-informed screening logic.</p>
                  </div>
                </article>
                <article>
                  <span>03</span>
                  <div>
                    <strong>Clinician review</strong>
                    <p>If you continue, a provider reviews the intake before recommending a program.</p>
                  </div>
                </article>
              </div>

              <div className="quiz-premium-links">
                <ActionLink href="/weight-loss" variant="primary-light">
                  See programs and pricing
                </ActionLink>
                <TextLink className="quiz-premium-text-link" href="/welcome">
                  See what happens after approval
                </TextLink>
              </div>
            </aside>

            <div className="quiz-premium-shell">
              <QuizShell />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
