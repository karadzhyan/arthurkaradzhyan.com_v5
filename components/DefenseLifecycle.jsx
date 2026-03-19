"use client";

import Link from "next/link";

export default function DefenseLifecycle() {
  var phases = [
    {
      day: "Day 0",
      title: "PAGA Notice Received",
      type: "trigger",
      color: "#dc3545",
      risk: "Critical",
      actions: [
        "Identify all alleged violation categories from the LWDA notice",
        "Determine LWDA notice date — all deadlines run from here",
        "Pull personnel and payroll data for aggrieved group",
        "Notify carrier immediately — most policies require notice within 30 days"
      ],
      tools: [{ name: "Decision Tree", slug: "paga-reform-decision-tree" }, { name: "SOL Calculator", slug: "statute-of-limitations-calculator" }],
      ifMissed: "Loss of cure proposal window, potential late-notice coverage issues",
      deadline: null
    },
    {
      day: "Day 1–5",
      title: "Triage & Exposure Model",
      type: "analysis",
      color: "#CC8800",
      risk: "High",
      actions: [
        "Run three-scenario penalty model (worst / realistic / best)",
        "Apply recoverability framework — strip non-PAGA categories under ZB, N.A.",
        "Identify temporal bifurcation opportunity (find the remediation date)",
        "Calculate regular rate gap for all compensation plans (Ferra + Alvarado)",
        "Map derivative penalty cascade for each alleged violation"
      ],
      tools: [{ name: "PAGA Estimator", slug: "paga-penalty-estimator" }, { name: "Regular Rate Calc", slug: "regular-rate-calculator" }, { name: "Derivative Mapper", slug: "derivative-penalty-mapper" }],
      ifMissed: "Uninformed cure proposal, no data for carrier status report",
      deadline: null
    },
    {
      day: "Day 5–15",
      title: "Cure Proposal Strategy",
      type: "defense",
      color: "#CC8800",
      risk: "High",
      actions: [
        "Draft and submit cure proposal to LWDA with specific remediation plan",
        "Begin remediation — policy revisions, retraining, payroll corrections",
        "Document all compliance steps (timestamps, records, sign-offs)",
        "Calculate and distribute back-pay for identified underpayments"
      ],
      tools: [{ name: "Penalty Cap Qualifier", slug: "penalty-cap-qualifier" }, { name: "Wage Stmt Checker", slug: "wage-statement-compliance-checker" }],
      ifMissed: "Cure proposal window expires at Day 33 — cannot be extended",
      deadline: "33-day cure window"
    },
    {
      day: "Day 15–60",
      title: "Penalty Cap Qualification",
      type: "defense",
      color: "#4a7a6f",
      risk: "Medium",
      actions: [
        "Complete all remediation within 60 days of notice",
        "Distribute back-pay for identified underpayments with documentation",
        "Compile documentation package for 15% or 30% cap argument",
        "Prepare carrier status report with three-scenario analysis",
        "Assess arbitration enforceability (Hohenshelt standard)"
      ],
      tools: [{ name: "Recoverability Checker", slug: "recoverability-checker" }],
      ifMissed: "Forfeiture of 30% cap qualification — full penalties apply",
      deadline: "60-day remediation window"
    },
    {
      day: "Day 60+",
      title: "Litigation / Resolution",
      type: "resolution",
      color: "#2c3e3a",
      risk: "Variable",
      actions: [
        "File motion to compel arbitration (if applicable, per Adolph + Hohenshelt)",
        "Request early evaluation conference under § 2699.3(b)(2)",
        "Challenge manageability under § 2699(p) for multi-location/classification cases",
        "Position for mediation with data-driven settlement range",
        "Prepare Moniz-compliant settlement approval briefing if resolution achieved"
      ],
      tools: [],
      ifMissed: "N/A — ongoing phase",
      deadline: null
    }
  ];

  return (
    <div className="lifecycle">
      <div className="lifecycle-track">
        {phases.map(function (p, i) {
          return (
            <div key={i} className="lifecycle-phase">
              <div className="lifecycle-marker">
                <div className="lifecycle-dot" style={{ background: p.color }} />
                {i < phases.length - 1 && <div className="lifecycle-line" />}
              </div>
              <div className="lifecycle-content">
                <div className="lifecycle-header">
                  <div className="lifecycle-day" style={{ color: p.color }}>{p.day}</div>
                  {p.deadline && (
                    <div className="lifecycle-deadline">{p.deadline}</div>
                  )}
                  <div className="lifecycle-risk" style={{
                    color: p.risk === "Critical" ? "#dc3545" : p.risk === "High" ? "#CC8800" : "#8aa39e"
                  }}>{p.risk}</div>
                </div>
                <div className="lifecycle-title">{p.title}</div>
                <div className="lifecycle-actions">
                  {p.actions.map(function (action, j) {
                    return (
                      <div key={j} className="lifecycle-action">
                        <span className="lifecycle-action-bullet" style={{ background: p.color }} />
                        {action}
                      </div>
                    );
                  })}
                </div>
                {p.tools.length > 0 && (
                  <div className="lifecycle-tools">
                    <span className="lifecycle-tools-label">Tools:</span>
                    {p.tools.map(function (tool, j) {
                      return (
                        <Link key={j} href={"/tools/" + tool.slug} className="lifecycle-tool-link">{tool.name}</Link>
                      );
                    })}
                  </div>
                )}
                {p.ifMissed && p.type !== "resolution" && (
                  <div className="lifecycle-missed">
                    <span className="lifecycle-missed-label">If missed:</span> {p.ifMissed}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="lifecycle-bottom">
        <div className="lifecycle-bottom-label">Critical Deadlines</div>
        <div className="lifecycle-deadlines">
          <div className="lifecycle-dl-item">
            <div className="lifecycle-dl-days" style={{ color: "#dc3545" }}>33</div>
            <div className="lifecycle-dl-text">Days to submit cure proposal after LWDA notice</div>
          </div>
          <div className="lifecycle-dl-item">
            <div className="lifecycle-dl-days" style={{ color: "#CC8800" }}>60</div>
            <div className="lifecycle-dl-text">Days to complete remediation for penalty cap</div>
          </div>
          <div className="lifecycle-dl-item">
            <div className="lifecycle-dl-days" style={{ color: "#4a7a6f" }}>65</div>
            <div className="lifecycle-dl-text">Days before plaintiff can file in court</div>
          </div>
          <div className="lifecycle-dl-item">
            <div className="lifecycle-dl-days" style={{ color: "#2c3e3a" }}>365</div>
            <div className="lifecycle-dl-text">Days — PAGA statute of limitations from notice</div>
          </div>
        </div>
      </div>
    </div>
  );
}
