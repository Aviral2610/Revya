"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  appointmentSlots,
  careTeam,
  dashboardMetrics,
  dashboardTasks,
  dashboardWeightTrendPoints,
  documents,
  mockPatient,
  portalNav,
  startingMessages
} from "@/lib/site-data";
import { ActionLink, BrandMark, MockBanner } from "@/components/site-sections";
import { useDemoToast } from "@/lib/use-demo-toast";

function weightProgress(targetWeight) {
  const total = mockPatient.currentWeight - targetWeight;
  const completed = mockPatient.lossToDate;

  if (total <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((completed / total) * 100));
}

function ProgressChart() {
  const path = dashboardWeightTrendPoints.map((point) => point.join(" ")).join(" L ");

  return (
    <svg aria-label="Weight trend" role="img" viewBox="0 0 260 130">
      <defs>
        <linearGradient id="chartGradient" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#59755f" />
          <stop offset="100%" stopColor="#d7a96c" />
        </linearGradient>
      </defs>
      <path
        d={`M ${path}`}
        fill="none"
        stroke="url(#chartGradient)"
        strokeLinecap="round"
        strokeWidth="6"
      />
      {dashboardWeightTrendPoints.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} fill="#17201a" r="5" />
          <circle cx={x} cy={y} fill="#fff8ef" r="3" />
        </g>
      ))}
    </svg>
  );
}

function OverviewPanel({ appointmentBooked, targetWeight }) {
  return (
    <section className="dashboard-grid">
      <article className="portal-card portal-hero">
        <div>
          <p className="eyebrow">Treatment overview</p>
          <h2>{mockPatient.medication}</h2>
          <p>{mockPatient.dosage}</p>
        </div>
        <div className="metric-grid">
          {dashboardMetrics.map((metric) => (
            <div className="metric-tile" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="portal-card">
        <p className="mini-label">Next steps</p>
        <h3>What needs attention now</h3>
        <div className="task-list">
          {dashboardTasks.map((task) => (
            <article className="task-item" key={task.title}>
              <div>
                <strong>{task.title}</strong>
                <p>{task.detail}</p>
              </div>
              <span>{task.status}</span>
            </article>
          ))}
        </div>
      </article>

      <article className="portal-card">
        <p className="mini-label">Progress</p>
        <h3>Weight trend</h3>
        <div className="chart-card">
          <ProgressChart />
        </div>
        <div className="progress-summary">
          <span>Current: {mockPatient.currentWeight} lbs</span>
          <span>Goal: {targetWeight} lbs</span>
          <strong>{weightProgress(targetWeight)}% of goal path complete</strong>
        </div>
      </article>

      <article className="portal-card">
        <p className="mini-label">Portal status</p>
        <h3>Refill, labs, shipping</h3>
        <ul className="detail-list tight">
          <li>Next refill date: {mockPatient.nextRefillDate}</li>
          <li>Shipment status: {mockPatient.shipmentStatus}</li>
          <li>Labs status: {mockPatient.labsStatus}</li>
          <li>Next appointment: {appointmentBooked || mockPatient.nextAppointment}</li>
        </ul>
      </article>
    </section>
  );
}

function TreatmentPanel({ onSubmitRefill, refillSubmitted }) {
  return (
    <section className="dashboard-grid">
      <article className="portal-card">
        <p className="mini-label">Refill workflow</p>
        <h3>{refillSubmitted ? "Submitted for review" : "Ready to complete"}</h3>
        <p>
          Public onboarding states that refill forms live in the portal, unlock on a schedule, and
          may trigger labs or appointments before approval.
        </p>
        <button
          className="button primary"
          disabled={refillSubmitted}
          onClick={onSubmitRefill}
          type="button"
        >
          {refillSubmitted ? "Refill submitted" : "Submit refill form"}
        </button>
      </article>

      <article className="portal-card">
        <p className="mini-label">Dosage progression</p>
        <h3>Current level</h3>
        <div className="level-row large">
          <span>0.25 mg</span>
          <span className="active">0.5 mg</span>
          <span>1.0 mg</span>
          <span>1.5 mg</span>
          <span>2.5 mg</span>
        </div>
        <p>Providers may require labs or an appointment before moving to the next level.</p>
      </article>

      <article className="portal-card">
        <p className="mini-label">Lab requirements</p>
        <h3>Next milestone</h3>
        <ul className="detail-list tight">
          <li>Upload a metabolic panel before the next increase.</li>
          <li>Accepted partners include large national lab networks.</li>
          <li>Recent outside labs may be reused if still valid.</li>
        </ul>
      </article>

      <article className="portal-card">
        <p className="mini-label">Support plan</p>
        <h3>How patients connect with clinicians</h3>
        <ul className="detail-list tight">
          <li>Daily appointment booking for dosage or side-effect questions.</li>
          <li>Unlimited support messaging from the care team.</li>
          <li>Refill review escalates to a visit when needed.</li>
        </ul>
      </article>
    </section>
  );
}

function AppointmentsPanel({ appointmentBooked, onBookSlot }) {
  return (
    <section className="dashboard-grid">
      <article className="portal-card">
        <p className="mini-label">Book a visit</p>
        <h3>Daily appointment availability</h3>
        <div className="slot-list">
          {appointmentSlots.map((slot) => (
            <button
              className={`slot-button ${appointmentBooked === slot ? "slot-selected" : ""}`}
              key={slot}
              onClick={() => onBookSlot(slot)}
              type="button"
            >
              {slot}
            </button>
          ))}
        </div>
      </article>

      <article className="portal-card">
        <p className="mini-label">Upcoming</p>
        <h3>{appointmentBooked || mockPatient.nextAppointment}</h3>
        <p>
          Appointment scheduling is publicly confirmed. The exact calendar and video flow are
          mocked here based on the portal references in the onboarding guide.
        </p>
      </article>

      <article className="portal-card">
        <p className="mini-label">Care team</p>
        <h3>Who can help</h3>
        <div className="team-list">
          {careTeam.map((member) => (
            <article className="team-member" key={member.name}>
              <div className="avatar avatar-small">{member.initials}</div>
              <div>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </div>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

function MessagesPanel({ messageDraft, messages, onDraftChange, onSendMessage }) {
  return (
    <section className="dashboard-grid single-column">
      <article className="portal-card">
        <p className="mini-label">Messages</p>
        <h3>Care team thread</h3>
        <div className="message-thread">
          {messages.map((message, index) => (
            <article className={`message message-${message.author}`} key={`${message.label}-${index}`}>
              <div>
                <strong>{message.label}</strong>
                <span>{message.role}</span>
              </div>
              <p>{message.text}</p>
            </article>
          ))}
        </div>
        <form className="message-form" onSubmit={onSendMessage}>
          <input
            name="message"
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder="Ask about dosage, side effects, or your refill"
            type="text"
            value={messageDraft}
          />
          <button className="button primary" type="submit">
            Send
          </button>
        </form>
      </article>
    </section>
  );
}

function DocumentsPanel({ documentStatus, onUpload }) {
  return (
    <section className="dashboard-grid">
      {documents.map((document) => {
        const status = documentStatus[document.id];

        return (
          <article className="portal-card" key={document.id}>
            <p className="mini-label">Documents</p>
            <h3>{document.title}</h3>
            <p>{document.detail}</p>
            <div className="document-status">
              <span
                className={`status-badge ${
                  status === "uploaded" ? "status-complete" : "status-pending"
                }`}
              >
                {status === "uploaded" ? "Uploaded" : "Missing"}
              </span>
            </div>
            <button className="button ghost" onClick={() => onUpload(document.id)} type="button">
              {status === "uploaded" ? "Replace file" : "Upload file"}
            </button>
          </article>
        );
      })}
    </section>
  );
}

function BillingPanel({ onContactSupport }) {
  return (
    <section className="dashboard-grid">
      <article className="portal-card">
        <p className="mini-label">Membership</p>
        <h3>{mockPatient.billingAmount}</h3>
        <ul className="detail-list tight">
          <li>Month-to-month billing every 28 days</li>
          <li>Automatic renewal until cancelled</li>
          <li>Portal or support can manage cancellation</li>
        </ul>
      </article>
      <article className="portal-card">
        <p className="mini-label">Included</p>
        <h3>What the public site says is covered</h3>
        <ul className="detail-list tight">
          <li>Provider review</li>
          <li>Medication guidance</li>
          <li>Daily appointment access</li>
          <li>Unlimited support</li>
          <li>Discreet shipping</li>
        </ul>
      </article>
      <article className="portal-card">
        <p className="mini-label">Need help?</p>
        <h3>Account support</h3>
        <p>Cancellation, billing questions, and document issues can all route through support.</p>
        <button className="button ghost" onClick={onContactSupport} type="button">
          Contact support
        </button>
      </article>
    </section>
  );
}

export function DashboardPortal() {
  const router = useRouter();
  const [activeDashboardTab, setActiveDashboardTab] = useState("overview");
  const [appointmentBooked, setAppointmentBooked] = useState("");
  const [documentStatus, setDocumentStatus] = useState(
    Object.fromEntries(documents.map((document) => [document.id, document.status]))
  );
  const [messageDraft, setMessageDraft] = useState("");
  const [messages, setMessages] = useState(() => startingMessages.map((message) => ({ ...message })));
  const [refillSubmitted, setRefillSubmitted] = useState(false);
  const targetWeight = mockPatient.targetWeight;
  const { showToast, toast } = useDemoToast();

  const activeLabel = portalNav.find((item) => item.id === activeDashboardTab)?.label || "Overview";

  function handleBookSlot(slot) {
    setAppointmentBooked(slot);
    showToast(`Visit booked for ${slot}.`);
  }

  function handleUpload(documentId) {
    setDocumentStatus((current) => ({ ...current, [documentId]: "uploaded" }));
    showToast("Document marked as uploaded in the demo.");
  }

  function handleSendMessage(event) {
    event.preventDefault();

    const message = messageDraft.trim();
    if (!message) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        author: "patient",
        label: "You",
        role: "Patient",
        text: message
      },
      {
        author: "care-team",
        label: "Dr. Elena Brooks",
        role: "Clinician",
        text: "Thanks. I reviewed your note. Book a quick visit if you want to discuss moving up a level before the refill is approved."
      }
    ]);
    setMessageDraft("");
    showToast("Message sent to the care team.");
  }

  function renderPanel() {
    if (activeDashboardTab === "treatment") {
      return (
        <TreatmentPanel
          onSubmitRefill={() => {
            setRefillSubmitted(true);
            showToast("Refill submitted for clinician review.");
          }}
          refillSubmitted={refillSubmitted}
        />
      );
    }

    if (activeDashboardTab === "appointments") {
      return (
        <AppointmentsPanel appointmentBooked={appointmentBooked} onBookSlot={handleBookSlot} />
      );
    }

    if (activeDashboardTab === "messages") {
      return (
        <MessagesPanel
          messageDraft={messageDraft}
          messages={messages}
          onDraftChange={setMessageDraft}
          onSendMessage={handleSendMessage}
        />
      );
    }

    if (activeDashboardTab === "documents") {
      return <DocumentsPanel documentStatus={documentStatus} onUpload={handleUpload} />;
    }

    if (activeDashboardTab === "billing") {
      return (
        <BillingPanel
          onContactSupport={() => {
            setActiveDashboardTab("messages");
            showToast("Opened messages so you can contact support.");
          }}
        />
      );
    }

    return <OverviewPanel appointmentBooked={appointmentBooked} targetWeight={targetWeight} />;
  }

  return (
    <>
      <main className="portal-shell">
        <aside className="portal-sidebar">
          <BrandMark light />
          <div className="sidebar-patient">
            <p className="mini-label">Member since {mockPatient.memberSince}</p>
            <h2>{mockPatient.name}</h2>
            <p>{mockPatient.medication}</p>
          </div>

          <MockBanner
            copy="This dashboard is a mocked reconstruction derived from public onboarding and help content. No authenticated Medvi systems are used."
            title="Portal demo"
          />

          <nav className="portal-nav">
            {portalNav.map((item) => (
              <button
                className={`portal-nav-link ${
                  activeDashboardTab === item.id ? "portal-nav-active" : ""
                }`}
                key={item.id}
                onClick={() => setActiveDashboardTab(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="button ghost-light full-width"
            onClick={() => router.push("/login")}
            type="button"
          >
            Log out
          </button>
        </aside>

        <section className="portal-main">
          <header className="portal-topbar">
            <div>
              <p className="eyebrow">Patient portal</p>
              <h1>{activeLabel}</h1>
            </div>
            <div className="portal-top-actions">
              <ActionLink href="/welcome" variant="ghost">
                Getting Started Guide
              </ActionLink>
              <button
                className="button primary"
                onClick={() => setActiveDashboardTab("appointments")}
                type="button"
              >
                Book a visit
              </button>
            </div>
          </header>
          {renderPanel()}
        </section>
      </main>
      {toast ? <div className="toast">{toast}</div> : null}
    </>
  );
}
