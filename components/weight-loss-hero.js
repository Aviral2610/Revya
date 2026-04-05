"use client";

import { useState } from "react";

import { mockPatient } from "@/lib/site-data";
import { ActionLink, ArtPanel } from "@/components/site-sections";

function predictedLoss(weight) {
  return Math.max(18, Math.round(weight * 0.18));
}

export function WeightLossHero() {
  const [weightInput, setWeightInput] = useState(mockPatient.currentWeight);
  const possibleLoss = predictedLoss(weightInput);

  return (
    <section className="hero glp-hero">
      <div className="shell hero-grid glp-grid">
        <div className="hero-copy">
          <p className="eyebrow">Doctor-guided weight loss</p>
          <h1>Lose up to {possibleLoss} pounds with a provider-guided GLP-1 plan.</h1>
          <p className="lede">
            The public Medvi-style funnel centers on clear pricing, clinician review, online
            follow-up, and a patient portal that handles refills, appointments, lab reminders, and
            support.
          </p>
          <div className="hero-actions-row">
            <ActionLink href="/login">Take the Assessment</ActionLink>
            <ActionLink href="/dashboard" variant="ghost">
              Preview the Portal
            </ActionLink>
          </div>
          <ul className="icon-list">
            <li>100% online evaluation</li>
            <li>Provider review before prescribing</li>
            <li>Unlimited support</li>
            <li>Fast, discreet shipping</li>
            <li>Portal-led refill workflow</li>
          </ul>
        </div>
        <div className="hero-visual">
          <ArtPanel
            detail="Then refill pricing continues through the portal."
            kind="weight-loss"
            label="First month from $179"
          />
          <div className="calculator-card">
            <p className="mini-label">Weight goal estimator</p>
            <label>
              Current weight
              <input
                max="320"
                min="160"
                onChange={(event) => setWeightInput(Number(event.target.value))}
                type="range"
                value={weightInput}
              />
            </label>
            <div className="calculator-values">
              <span>{weightInput} lbs</span>
              <strong>Potential loss: {possibleLoss} lbs</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
