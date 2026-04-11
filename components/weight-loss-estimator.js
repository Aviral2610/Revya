"use client";

import { useState } from "react";

import { ActionLink } from "@/components/site-sections";

const PACE_OPTIONS = [
  { label: "0.5 lb / week", value: 0.5 },
  { label: "1 lb / week", value: 1 },
  { label: "1.5 lb / week", value: 1.5 }
];

function formatTimeline(months) {
  if (!Number.isFinite(months) || months <= 0) {
    return "You are already at your selected goal.";
  }

  if (months < 1) {
    return "Your selected goal is under a month away at this pace.";
  }

  const rounded = Math.round(months * 10) / 10;

  if (rounded === 1) {
    return "That timeline is about 1 month at this pace.";
  }

  return `That timeline is about ${rounded} months at this pace.`;
}

function formatMilestoneTimeline(months) {
  if (!Number.isFinite(months) || months <= 0) {
    return "Reached at the start";
  }

  if (months < 1) {
    return "Within the first month";
  }

  const rounded = Math.round(months * 10) / 10;

  if (rounded === 1) {
    return "About 1 month";
  }

  return `About ${rounded} months`;
}

export function WeightLossEstimator({
  eyebrow = "Weight-loss estimator",
  title = "See what your goal could look like on a realistic timeline.",
  description = "Use this planning tool to map your starting weight, target, and pace. Then begin your assessment with a clearer goal in mind.",
  primaryHref = "/quiz",
  primaryLabel = "Start assessment",
  secondaryHref = "/pricing",
  secondaryLabel = "See programs and pricing",
  showSecondary = true,
  disclaimer = "Planning tool only. Progress, treatment fit, and prescribing depend on clinician review, individual response, and ongoing adherence.",
  className = ""
}) {
  const [currentWeight, setCurrentWeight] = useState(220);
  const [goalWeight, setGoalWeight] = useState(185);
  const [pace, setPace] = useState(1);

  const poundsToLose = Math.max(currentWeight - goalWeight, 0);
  const monthlyPace = pace * 4.33;
  const monthsToGoal = poundsToLose / monthlyPace;

  const fivePercentWeight = Math.max(goalWeight, Math.round(currentWeight * 0.95));
  const tenPercentWeight = Math.max(goalWeight, Math.round(currentWeight * 0.9));

  const milestones = [
    {
      title: "First 5%",
      weight: fivePercentWeight,
      pounds: currentWeight - fivePercentWeight
    },
    {
      title: "First 10%",
      weight: tenPercentWeight,
      pounds: currentWeight - tenPercentWeight
    },
    {
      title: "Goal",
      weight: goalWeight,
      pounds: poundsToLose
    }
  ].filter((milestone, index, array) => {
    const duplicate = array.findIndex((candidate) => candidate.weight === milestone.weight);
    return duplicate === index;
  });

  function handleCurrentWeightChange(event) {
    const nextWeight = Number(event.target.value);

    setCurrentWeight(nextWeight);

    if (goalWeight >= nextWeight) {
      setGoalWeight(Math.max(110, nextWeight - 5));
    }
  }

  function handleGoalWeightChange(event) {
    setGoalWeight(Number(event.target.value));
  }

  return (
    <div className={["revya-estimator", className].filter(Boolean).join(" ")}>
      <div className="revya-estimator-controls">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="lede-alt">{description}</p>
        </div>

        <label className="revya-estimator-field">
          <span className="revya-estimator-label">Current weight</span>
          <div className="revya-estimator-value-row">
            <strong>{currentWeight} lbs</strong>
            <span>Today</span>
          </div>
          <input
            aria-label="Current weight in pounds"
            className="revya-range"
            max="350"
            min="130"
            onChange={handleCurrentWeightChange}
            type="range"
            value={currentWeight}
          />
        </label>

        <label className="revya-estimator-field">
          <span className="revya-estimator-label">Goal weight</span>
          <div className="revya-estimator-value-row">
            <strong>{goalWeight} lbs</strong>
            <span>Target</span>
          </div>
          <input
            aria-label="Goal weight in pounds"
            className="revya-range"
            max={currentWeight - 5}
            min="110"
            onChange={handleGoalWeightChange}
            type="range"
            value={goalWeight}
          />
        </label>

        <div className="revya-estimator-field">
          <span className="revya-estimator-label">Preferred pace</span>
          <div className="revya-pace-row">
            {PACE_OPTIONS.map((option) => (
              <button
                className={`revya-pace-button ${pace === option.value ? "is-active" : ""}`}
                key={option.label}
                onClick={() => setPace(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="revya-estimator-summary">
        <div className="revya-estimator-total">
          <p className="mini-label">Projected timeline</p>
          <strong>{poundsToLose > 0 ? `${poundsToLose} lbs to your goal` : "Goal selected"}</strong>
          <p>
            To move from {currentWeight} lbs to {goalWeight} lbs, you would be aiming to lose{" "}
            {poundsToLose} lbs. {formatTimeline(monthsToGoal)}
          </p>
        </div>

        <div className="revya-milestone-grid">
          {milestones.map((milestone) => {
            const progress = poundsToLose > 0 ? Math.min((milestone.pounds / poundsToLose) * 100, 100) : 100;

            return (
              <article className="revya-milestone-card" key={milestone.title}>
                <div className="revya-milestone-copy">
                  <div>
                    <p className="mini-label">{milestone.title}</p>
                    <strong>{milestone.weight} lbs</strong>
                  </div>
                  <span>{milestone.pounds} lbs down</span>
                </div>
                <div className="revya-milestone-track">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <p>{formatMilestoneTimeline(milestone.pounds / monthlyPace)}</p>
              </article>
            );
          })}
        </div>

        <div className="revya-estimator-actions">
          <ActionLink href={primaryHref}>{primaryLabel}</ActionLink>
          {showSecondary ? (
            <ActionLink href={secondaryHref} variant="ghost">
              {secondaryLabel}
            </ActionLink>
          ) : null}
        </div>

        <p className="estimator-disclaimer">{disclaimer}</p>
      </div>
    </div>
  );
}
