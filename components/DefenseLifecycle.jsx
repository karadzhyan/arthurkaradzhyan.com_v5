"use client";

export default function DefenseLifecycle() {
  var phases = [
    {
      day: "Day 0",
      title: "PAGA Notice Received",
      type: "trigger",
      color: "#dc3545",
      actions: [
        "Identify all alleged violation categories",
        "Determine LWDA notice date — all deadlines run from here",
        "Pull personnel and payroll data for aggrieved group"
      ],
      deadline: null
    },
    {
      day: "Day 1–5",
      title: "Triage & Exposure Model",
      type: "analysis",
      color: "#CC8800",
      actions: [
        "Run three-scenario penalty model (worst / realistic / best)",
        "Apply recoverability framework — strip non-PAGA categories",
        "Identify temporal bifurcation opportunity (remediation date)",
        "Calculate regular rate gap for all compensation plans"
      ],
      deadline: null
    },
    {
      day: "Day 5–15",
      title: "Cure Proposal Strategy",
      type: "defense",
      color: "#CC8800",
      actions: [
        "Draft and submit cure proposal to LWDA",
        "Begin remediation — policy revisions, retraining, payroll corrections",
        "Document all compliance steps (timestamps, records, sign-offs)"
      ],
      deadline: "33-day cure window"
    },
    {
      day: "Day 15–60",
      title: "Penalty Cap Qualification",
      type: "defense",
      color: "#4a7a6f",
      actions: [
        "Complete all remediation within 60 days of notice",
        "Distribute back-pay for identified underpayments",
        "Compile documentation package for 15% or 30% cap argument",
        "Prepare carrier status report with three-scenario analysis"
      ],
      deadline: "60-day remediation window"
    },
    {
      day: "Day 60+",
      title: "Litigation / Resolution",
      type: "resolution",
      color: "#2c3e3a",
      actions: [
        "File motion to compel arbitration (if applicable)",
        "Request early evaluation conference (AB 2288)",
        "Challenge manageability under § 2699(p)",
        "Position for mediation with data-driven settlement range"
      ],
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
