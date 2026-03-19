"use client";

export default function PenaltyCapFlow() {
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
      requirements: [
        "Compliant written policies distributed to all employees",
        "Supervisor training records with attendance documentation",
        "Periodic payroll audits (internal or third-party)",
        "Employee acknowledgment forms on file"
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
      requirements: [
        "Violations cured within 60-day window",
        "Back-pay distributed for affected employees",
        "Revised policies implemented and distributed",
        "Retraining completed with documentation"
      ]
    },
    {
      gate: true,
      result: "NO CAP",
      color: "#dc3545",
      label: "Full penalty exposure — no statutory reduction",
      statute: "§ 2699(f)(2)",
      requirements: [
        "Default $100/$200 per employee per pay period applies in full",
        "Derivative penalties stack without limit",
        "No documentation to support mitigation argument",
        "Settlement leverage significantly reduced"
      ]
    }
  ];

  return (
    <div className="cap-flow">
      {steps.map(function (step, i) {
        if (step.gate) {
          return (
            <div key={i} className="cap-flow-result" style={{ borderLeftColor: step.color }}>
              <div className="cap-flow-result-badge" style={{ background: step.color }}>
                {step.result}
              </div>
              <div className="cap-flow-result-label">{step.label}</div>
              <div className="cap-flow-result-statute">{step.statute}</div>
              <div className="cap-flow-result-reqs">
                {step.requirements.map(function (req, j) {
                  return (
                    <div key={j} className="cap-flow-req">
                      <span className="cap-flow-req-bullet" style={{ background: step.color }} />
                      {req}
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
                  NO →
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
