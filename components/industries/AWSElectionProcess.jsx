"use client";

export default function AWSElectionProcess() {
  var steps = [
    {
      num: 1,
      name: "Written Disclosure",
      deadline: "≥ 14 days before election",
      requirement: "Written proposal disclosing the effects of the proposed AWS on wages, hours, and benefits — distributed to all affected employees in the proposed work unit.",
      failureMode: "Disclosure not provided at least 14 days before election, or disclosure incomplete (e.g., omits overtime impact, fails to describe the specific schedule proposed).",
      consequence: "Election invalid — cannot be cured retroactively.",
      color: "#2c3e3a"
    },
    {
      num: 2,
      name: "Pre-Election Meeting",
      deadline: "Before election date",
      requirement: "A meeting to discuss the proposed arrangement — not merely document distribution. Employees must have the opportunity to ask questions and understand the implications.",
      failureMode: "No meeting held (disclosure was mailed or posted without discussion), or meeting held less than 14 days after disclosure.",
      consequence: "Election invalid.",
      color: "#4a7a6f"
    },
    {
      num: 3,
      name: "Secret Ballot Election",
      deadline: "After 14-day disclosure + meeting",
      requirement: "Secret ballot election with two-thirds approval of affected employees in the 'work unit.' Work unit definition is critical — it must be a recognizable, identifiable group performing related work.",
      failureMode: "Non-secret ballot (show of hands, group vote), less than two-thirds approval, or work unit improperly defined (too broad or too narrow).",
      consequence: "Election invalid.",
      color: "#CC8800"
    },
    {
      num: 4,
      name: "DIR Filing",
      deadline: "Within 30 days of election",
      requirement: "Results reported to the Division of Industrial Relations within 30 days of the election. Filing must include the election results, the proposed schedule, and the work unit definition.",
      failureMode: "Filing submitted after 30-day window, filing incomplete, or filing never submitted.",
      consequence: "Election invalid — even a one-day late filing invalidates the entire AWS retroactively.",
      color: "#dc3545"
    }
  ];

  return (
    <div className="aws-process">
      <div className="aws-process-label">AWS Election — 4-Step Statutory Process (§ 511)</div>
      <div className="aws-steps">
        {steps.map(function (s, i) {
          return (
            <div key={i} className="aws-step">
              <div className="aws-step-left">
                <div className="aws-step-num" style={{ background: s.color }}>{s.num}</div>
                {i < steps.length - 1 && <div className="aws-step-connector" />}
              </div>
              <div className="aws-step-right">
                <div className="aws-step-header">
                  <div className="aws-step-name">{s.name}</div>
                  <div className="aws-step-deadline">{s.deadline}</div>
                </div>
                <div className="aws-step-requirement">{s.requirement}</div>
                <div className="aws-step-failure">
                  <div className="aws-failure-label">Failure Mode</div>
                  <div className="aws-failure-text">{s.failureMode}</div>
                </div>
                <div className="aws-step-consequence">
                  <span className="aws-consequence-icon">⚠</span> {s.consequence}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="aws-retro-box">
        <div className="aws-retro-label">Retroactive Exposure Calculation</div>
        <div className="aws-retro-grid">
          <div className="aws-retro-item">
            <div className="aws-retro-formula">4/10 AWS → Standard 8-hr day</div>
            <div className="aws-retro-detail">Every 10-hour day becomes 8 hours straight + 2 hours OT</div>
          </div>
          <div className="aws-retro-item">
            <div className="aws-retro-formula">2 hrs/day × 4 days/week = 8 hrs OT/week</div>
            <div className="aws-retro-detail">Per employee, per week the invalid AWS was in effect</div>
          </div>
          <div className="aws-retro-item">
            <div className="aws-retro-formula">30 employees × 104 weeks × 8 hrs × $37.50</div>
            <div className="aws-retro-detail">Example: 30 installers, 2 years, $25/hr × 1.5 = $37.50 OT rate</div>
          </div>
          <div className="aws-retro-item aws-retro-total">
            <div className="aws-retro-formula">= $936,000 overtime exposure</div>
            <div className="aws-retro-detail">Before PAGA penalties, wage statement violations, or interest</div>
          </div>
        </div>
      </div>
    </div>
  );
}
