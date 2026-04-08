"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  appointmentSlots,
  careTeam,
  dashboardTasks,
  dashboardWeightTrendPoints,
  documents,
  portalNav,
  startingMessages
} from "@/lib/site-data";
import { ActionLink, BrandMark, MockBanner } from "@/components/site-sections";
import { useDemoToast } from "@/lib/use-demo-toast";

function weightProgress(patient) {
  const total = patient.currentWeight - patient.targetWeight;
  const completed = patient.lossToDate;

  if (total <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((completed / total) * 100));
}

function getDashboardMetrics(patient) {
  return [
    { label: "Weight lost", value: `${patient.lossToDate} lbs` },
    { label: "Goal progress", value: `${weightProgress(patient)}%` },
    {
      label: "Next shipment review",
      value: typeof patient.nextRefillDate === "string" ? patient.nextRefillDate.split(",")[0] : "TBD"
    },
    { label: "Current cycle", value: patient.refillEligible ? "On track" : "Review needed" }
  ];
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

function OverviewPanel({ appointmentBooked, patient, targetWeight }) {
  return (
    <section className="dashboard-grid">
      <article className="portal-card portal-hero">
        <div>
          <p className="eyebrow">Current program</p>
          <h2>{patient.medication}</h2>
          <p>{patient.dosage}</p>
        </div>
        <div className="metric-grid">
          {getDashboardMetrics(patient).map((metric) => (
            <div className="metric-tile" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="portal-card">
        <p className="mini-label">Action items</p>
        <h3>Tasks before your next shipment review</h3>
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
        <h3>Recent weight trend</h3>
        <div className="chart-card">
          <ProgressChart />
        </div>
        <div className="progress-summary">
          <span>Latest check-in: {patient.currentWeight} lbs</span>
          <span>Goal: {targetWeight} lbs</span>
          <strong>{weightProgress(patient)}% of goal path complete</strong>
        </div>
      </article>

      <article className="portal-card">
        <p className="mini-label">This cycle</p>
        <h3>Refill, labs, and delivery status</h3>
        <ul className="detail-list tight">
          <li>Next shipment review: {patient.nextRefillDate}</li>
          <li>Shipment status: {patient.shipmentStatus}</li>
          <li>Labs status: {patient.labsStatus}</li>
          <li>Next appointment: {appointmentBooked || patient.nextAppointment}</li>
        </ul>
      </article>
    </section>
  );
}

function TreatmentPanel({ onSubmitRefill, refillSubmitted }) {
  return (
    <section className="dashboard-grid">
      <article className="portal-card">
        <p className="mini-label">Refill review</p>
        <h3>{refillSubmitted ? "Submitted for clinician review" : "Ready to submit"}</h3>
        <p>
          When your refill window opens, answer a short check-in about progress, tolerability, and
          current weight so your clinician can review the next shipment.
        </p>
        <button
          className="button primary"
          disabled={refillSubmitted}
          onClick={onSubmitRefill}
          type="button"
        >
          {refillSubmitted ? "Check-in submitted" : "Submit refill review"}
        </button>
      </article>

      <article className="portal-card">
        <p className="mini-label">Dose plan</p>
        <h3>Current dose path</h3>
        <div className="level-row large">
          <span>0.25 mg</span>
          <span className="active">0.5 mg</span>
          <span>1.0 mg</span>
          <span>1.5 mg</span>
          <span>2.5 mg</span>
        </div>
        <p>Dose changes depend on your response to treatment, any side effects, and clinician review.</p>
      </article>

      <article className="portal-card">
        <p className="mini-label">Lab requests</p>
        <h3>Next required item</h3>
        <ul className="detail-list tight">
          <li>Upload a current metabolic panel before the next dose review.</li>
          <li>Recent outside labs may still be usable if they are up to date.</li>
          <li>Your portal will show when nothing else is needed.</li>
        </ul>
      </article>

      <article className="portal-card">
        <p className="mini-label">Between visits</p>
        <h3>How to stay in touch with your care team</h3>
        <ul className="detail-list tight">
          <li>Book follow-ups when you want to discuss dose changes or side effects.</li>
          <li>Use secure messages for routine care questions between visits.</li>
          <li>Refill reviews can be escalated to a clinician visit when needed.</li>
        </ul>
      </article>
    </section>
  );
}

function AppointmentsPanel({ appointmentBooked, onBookSlot, patient }) {
  return (
    <section className="dashboard-grid">
      <article className="portal-card">
        <p className="mini-label">Schedule a visit</p>
        <h3>Choose a follow-up time</h3>
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
        <p className="mini-label">Upcoming visit</p>
        <h3>{appointmentBooked || patient.nextAppointment}</h3>
        <p>
          Follow-up scheduling is built into the care journey so you can discuss dosing, refill
          timing, and side effects without leaving the portal.
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
        <p className="mini-label">Care messages</p>
        <h3>Your care team thread</h3>
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
            placeholder="Ask about side effects, refill timing, or your upcoming visit"
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
            <p className="mini-label">Records</p>
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

function BillingPanel({ onContactSupport, patient }) {
  return (
    <section className="dashboard-grid">
      <article className="portal-card">
        <p className="mini-label">Current plan</p>
        <h3>{patient.billingAmount}</h3>
        <ul className="detail-list tight">
          <li>Billing is organized around a recurring 28-day cycle.</li>
          <li>Account details stay visible in one place.</li>
          <li>Support can help with plan questions or account changes.</li>
        </ul>
      </article>
      <article className="portal-card">
        <p className="mini-label">Included support</p>
        <h3>What your care experience can include</h3>
        <ul className="detail-list tight">
          <li>Clinician review</li>
          <li>Treatment guidance and refill support</li>
          <li>Portal messaging and appointment booking</li>
          <li>Document upload and care tracking</li>
          <li>Discreet shipment updates</li>
        </ul>
      </article>
      <article className="portal-card">
        <p className="mini-label">Billing help</p>
        <h3>Account support</h3>
        <p>Billing questions, account updates, and document issues can all be routed through support.</p>
        <button className="button ghost" onClick={onContactSupport} type="button">
          Contact support
        </button>
      </article>
    </section>
  );
}

export function DashboardPortal({
  googleAuthEnabled = false,
  patient,
  previewMode = true,
  sessionUser = null
}) {
  const router = useRouter();
  const [activeDashboardTab, setActiveDashboardTab] = useState("overview");
  const [appointmentBooked, setAppointmentBooked] = useState("");
  const [documentStatus, setDocumentStatus] = useState(
    Object.fromEntries(documents.map((document) => [document.id, document.status]))
  );
  const [messageDraft, setMessageDraft] = useState("");
  const [messages, setMessages] = useState(() => startingMessages.map((message) => ({ ...message })));
  const [refillSubmitted, setRefillSubmitted] = useState(false);
  const targetWeight = patient.targetWeight;
  const { showToast, toast } = useDemoToast();

  const activeLabel = portalNav.find((item) => item.id === activeDashboardTab)?.label || "Care Home";
  const sessionLabel = sessionUser?.email || (previewMode ? "Preview mode" : "");
  const bannerTitle = previewMode ? "Portal preview" : "Live account";
  const bannerCopy = previewMode
    ? googleAuthEnabled
      ? "This scaffolded portal stays available for demos. Use Google sign-in to load the Supabase-backed member profile."
      : "Google auth env vars are still missing, so this dashboard stays in preview mode with scaffolded portal data."
    : "This session is tied to the signed-in Google member and resolves the portal profile through Supabase on the server.";

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
        text: "Thanks. I reviewed your note. Book a quick follow-up if you want to discuss staying at your current dose before the refill is approved."
      }
    ]);
    setMessageDraft("");
    showToast("Message sent to the care team.");
  }

  function handleSidebarAction() {
    if (sessionUser) {
      signOut({ callbackUrl: "/login" });
      return;
    }

    router.push("/login");
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
        <AppointmentsPanel
          appointmentBooked={appointmentBooked}
          onBookSlot={handleBookSlot}
          patient={patient}
        />
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
            showToast("Opened care messages so you can contact support.");
          }}
          patient={patient}
        />
      );
    }

    return (
      <OverviewPanel
        appointmentBooked={appointmentBooked}
        patient={patient}
        targetWeight={targetWeight}
      />
    );
  }

  return (
    <>
      <main className="portal-shell">
        <aside className="portal-sidebar">
          <BrandMark light />
          <div className="sidebar-patient">
            <p className="mini-label">Member since {patient.memberSince}</p>
            <h2>{patient.name}</h2>
            <p>{patient.medication}</p>
            {sessionLabel ? <p className="mini-label">{sessionLabel}</p> : null}
          </div>

          <MockBanner copy={bannerCopy} title={bannerTitle} />

          <nav aria-label="Dashboard sections" className="portal-nav">
            {portalNav.map((item) => (
              <button
                aria-pressed={activeDashboardTab === item.id}
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

          <button className="button ghost-light full-width" onClick={handleSidebarAction} type="button">
            {sessionUser ? "Sign out" : "Back to secure sign-in"}
          </button>
        </aside>

        <section className="portal-main">
          <header className="portal-topbar">
            <div>
              <p className="eyebrow">Revya patient portal</p>
              <h1>{activeLabel}</h1>
              {previewMode ? (
                <p>Viewing scaffolded member data for preview and QA.</p>
              ) : sessionUser?.email ? (
                <p>{sessionUser.email}</p>
              ) : null}
            </div>
            <div className="portal-top-actions">
              <ActionLink href="/welcome" variant="ghost">
                How portal support works
              </ActionLink>
              <button
                className="button primary"
                onClick={() => setActiveDashboardTab("appointments")}
                type="button"
              >
                Book follow-up
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
