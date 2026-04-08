import { dosageTracks } from "@/lib/site-data";

const detailLists = {
  doctors: [
    "Licensed clinicians review assessment results, prescribing decisions, dose changes, and follow-up questions.",
    "Care coordinators help with scheduling, portal tasks, and routine member support.",
    "Pharmacy fulfillment partners handle prescription processing and discreet shipment updates."
  ],
  refills: [
    "Email or text reminders can prompt you when a refill check-in opens.",
    "Refill requests are submitted inside the patient portal, not through scattered support threads.",
    "Your clinician may request updated labs or a follow-up visit before approving the next shipment.",
    "Dose changes are reviewed case by case rather than advanced automatically."
  ],
  billing: [
    "Membership billing is designed to stay straightforward, with recurring details visible from your account.",
    "Medication costs can vary by treatment path, and pricing context should stay visible before checkout.",
    "Billing questions, account changes, and support requests can be routed through the portal."
  ],
  continuing: [
    "Transfer patients can upload prescription records and care documents through the portal.",
    "Helpful records include the medication name, dose, frequency, patient details, and a recent written or fill date.",
    "If anything is missing, the care team can tell you what is still needed before review."
  ],
  labs: [
    "Updated labs may be requested before certain dose increases or treatment milestones.",
    "Recent outside labs may still be usable if they match what your clinician needs.",
    "Lab status stays visible in the portal so you know whether anything is still outstanding."
  ]
};

export function WelcomeDetail({ id }) {
  if (id === "dosage") {
    return (
      <div className="dosage-grid">
        {dosageTracks.map((track) => (
          <article className="dosage-card" key={track.name}>
            <h3>{track.name}</h3>
            <div className="level-row">
              {track.levels.map((level) => (
                <span key={`${track.name}-${level}`}>{level}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    );
  }

  const items = detailLists[id];

  if (items) {
    return (
      <ul className="detail-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className="welcome-note">
      This step connects directly to the matching portal task, support workflow, or clinician review.
    </p>
  );
}
