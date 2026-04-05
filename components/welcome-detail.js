import { dosageTracks } from "@/lib/site-data";

const detailLists = {
  refills: [
    "Patients are notified by email and text when a refill becomes available.",
    "Refills are completed inside the patient portal.",
    "Oral programs unlock after 21 days, injectable programs after the third dose.",
    "Provider review or a new appointment may be required before approval."
  ],
  billing: [
    "Membership is month-to-month and renews automatically every 28 days.",
    "The public flow frames billing as a single recurring membership plus treatment cost.",
    "Patients can cancel through the portal or support."
  ],
  continuing: [
    "Transfer patients can upload proof from another provider in the documents area.",
    "Public requirements include medication, dose, frequency, patient name, DOB, and fill or written date.",
    "If upload is difficult, the guide also offers support email as a fallback."
  ],
  labs: [
    "Labs are required for later dosage increases and mandatory after month three.",
    "Recent outside labs may be uploaded if they are still valid.",
    "Supported public partners include large national lab networks."
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
      This section is represented in the dashboard demo as a task card, account module, or care
      team action.
    </p>
  );
}
