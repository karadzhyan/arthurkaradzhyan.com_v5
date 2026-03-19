"use client";

export default function PenaltyCapFlow() {
  var totalExposure = 4200000;

  var steps = [
    {
      question: "Did the employer receive a PAGA notice?",
      yes: 1,
      no: null,
      noLabel: "No exposure yet"
    },
    {
      question: "Before the notice, had the employer taken 'all reasonable steps' to comply?",
      detail: "Written policies, supervisor training, payroll audits, employee acknowledgments",
      yes: 2,
      no: 3
    },
    {
      gate: true,
      result: "15% CAP",
      color: "#2c3e3a",
      label: "Penalty capped at 15% of total",
      statute: "§ 2699(g)",
      dollarImpact: "$" + Math.round(totalExposure * 0.15 / 1000) + "K maximum (from $" + (totalExposure / 1000000).toFixed(1) + "M)",
      savings: "$" + ((totalExposure - totalExposure * 0.15) / 1000000).toFixed(1) + "M saved",
      requirements: [
        { text: "Compliant written policies distributed to all employees", critical: true },
        { text: "Supervisor training records with attendance documentation", critical: true },
        { text: "Periodic payroll audits (internal or third-party)", critical: true },
        { text: "Employee acknowledgment forms on file", critical: false },
        { text: "Regular rate calculation methodology documented", critical: false }
      ]
    },
    {
      question: "Within 60 days of the notice, did the employer cure the violations and take 'all reasonable steps'?",
      detail: "Policy revisions, retraining, payroll corrections, back-pay distribution",
      yes: 4,
      no: 5
    },
    {
      gate: true,
      result: "30% CAP",
      color: "#CC8800",
      label: "Penalty capped at 30% of total",
      statute: "§ 2699(h)",
      dollarImpact: "$" + Math.round(totalExposure * 0.30 / 1000) + "K maximum (from $" + (totalExposure / 1000000).toFixed(1) + "M)",
      savings: "$" + ((totalExposure - totalExposure * 0.30) / 1000000).toFixed(1) + "M saved",
      requirements: [
        { text: "Violations cured within 60-day window from notice receipt", critical: true },
        { text: "Back-pay distributed for identified underpayments with documentation", critical: true },
        { text: "Revised policies implemented and distributed with sign-offs", critical: true },
        { text: "Retraining completed with attendance records", critical: false },
        { text: "Payroll system corrections verified by audit", critical: false }
      ]
    },
    {
      gate: true,
      result: "NO CAP",
      color: "#dc3545",
      label: "Full penalty exposure — no statutory reduction",
      statute: "§ 2699(f)(2)",
      dollarImpact: "$" + (totalExposure / 1000000).toFixed(1) + "M full exposure",
      savings: "$0 saved",
      requirements: [
        { text: "Default $100/$200 per employee per pay period applies in full", critical: false },
        { text: "Derivative penalties (§ 226, § 203) stack without limit", critical: false },
        { text: "No documentation to support mitigation at mediation", critical: false },
        { text: "Settlement leverage significantly reduced — plaintiff controls timing", critical: false }
      ]
    }
  ];

  return (
    <div className="cap-flow">
      {steps.map(function (step, i) {
        if (step.gate) {
          return (
            <div key={i} className="cap-flow-result" style={{ borderLeftColor: step.color }}>
              <div className="cap-flow-result-top">
                <div className="cap-flow-result-badge" style={{ background: step.color }}>
                  {step.result}
                </div>
                <div className="cap-flow-result-dollar" style={{ color: step.color }}>
                  {step.dollarImpact}
                </div>
              </div>
              <div className="cap-flow-result-label">{step.label}</div>
              <div className="cap-flow-result-statute">{step.statute} · {step.savings}</div>
              <div className="cap-flow-result-reqs">
                {step.requirements.map(function (req, j) {
                  return (
                    <div key={j} className="cap-flow-req">
                      <span className="cap-flow-req-bullet" style={{ background: req.critical ? step.color : "#ccc" }} />
                      <span style={{ fontWeight: req.critical ? 600 : 400 }}>{req.text}</span>
                      {req.critical && <span className="cap-flow-req-critical">Required</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        return (
          <div key={i} className="cap-flow-step">
            <div className="cap-flow-step-num">{i < 2 ? i + 1 : Math.ceil(i / 2) + 1}</div>
            <div className="cap-flow-step-body">
              <div className="cap-flow-question">{step.question}</div>
              {step.detail && (
                <div className="cap-flow-detail">{step.detail}</div>
              )}
              <div className="cap-flow-branches">
                <div className="cap-flow-branch cap-flow-branch-yes">
                  YES →
                </div>
                <div className="cap-flow-branch cap-flow-branch-no">
                  NO ↓
                </div>
              </div>
            </div>
            {step.no === null && (
              <div className="cap-flow-step-exit">{step.noLabel}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
