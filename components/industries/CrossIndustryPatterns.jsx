"use client";

export default function CrossIndustryPatterns() {
  var universal = [
    {
      violation: "Meal Period Compliance",
      statutes: "§§ 226.7, 512",
      industries: 6,
      avgIntensity: 3.8,
      pattern: "Donohue presumption applies universally — every industry generates time records showing short or missed meals. Operational cause differs: 24/7 guest service (hospitality), patient care ratios (healthcare), field work logistics (solar/agriculture), commission-driven floor time (automotive).",
      defenseConstant: "Electronic attestation + premium auto-payment eliminates the derivative cascade regardless of industry."
    },
    {
      violation: "Regular Rate Miscalculation",
      statutes: "§ 510; Ferra; Alvarado",
      industries: 6,
      avgIntensity: 3.7,
      pattern: "Every industry has non-hourly compensation components that payroll systems exclude from the regular rate. The component differs — commissions (automotive), piece-rate (solar/agriculture), shift differentials (hospitality/healthcare), RSUs (technology) — but the error is identical: undercomputed OT and premium rates.",
      defenseConstant: "Map every compensation element to its regular rate treatment. The Regular Rate Calculator models the gap for any compensation structure."
    },
    {
      violation: "Wage Statement Deficiency",
      statutes: "§ 226(a)",
      industries: 6,
      avgIntensity: 3.8,
      pattern: "Derivative of every other violation. If premiums are underpaid (Ferra), the wage statement is wrong. If piece-rate non-productive time is missing (§ 226.2), the wage statement is wrong. If the regular rate is undercomputed, every OT calculation on every statement is wrong. This is the universal amplifier.",
      defenseConstant: "Fix the underlying violation and the wage statement fixes itself. The Wage Statement Checker audits all 9 elements of § 226(a)."
    },
    {
      violation: "Final Pay Timing",
      statutes: "§§ 201-203",
      industries: 5,
      avgIntensity: 3.4,
      pattern: "High-turnover industries (hospitality, automotive, agriculture) generate the most § 203 exposure because each separated employee is a potential 30-day waiting time penalty. The trigger is any unpaid wage at separation — including unpaid premiums (Naranjo), unreimbursed expenses, or earned commissions (Sciborski).",
      defenseConstant: "Separation checklist that reviews all compensation components — premiums, commissions, reimbursements — before final pay issuance."
    }
  ];

  var industrySpecific = [
    { violation: "AWS Invalidity", industry: "Solar / Energy", statute: "§ 511", note: "4-step election process — procedural failure invalidates retroactively" },
    { violation: "Commission Forfeiture", industry: "Automotive", statute: "Sciborski", note: "Departure between deal closing and funding = forfeiture of earned commission" },
    { violation: "Joint Employer Allocation", industry: "Healthcare", statute: "Martinez", note: "Staffing firm liable for client facility's operational violations" },
    { violation: "§ 515.5 Misclassification", industry: "Technology", statute: "§ 515.5", note: "Computer professional exemption requires specific duties + salary threshold" },
    { violation: "Piece-Rate Non-Productive", industry: "Agriculture", statute: "§ 226.2", note: "Rest period and non-productive time require separate compensation and wage statement entries" },
    { violation: "Service Charge Distribution", industry: "Hospitality", statute: "§ 351", note: "Mandatory service charges on banquets must be distributed to service employees" }
  ];

  return (
    <div className="cross-patterns">
      <div className="cross-patterns-section">
        <div className="cross-patterns-label">Universal Patterns — Present Across All Industries</div>
        <div className="cross-patterns-universal">
          {universal.map(function (u, i) {
            return (
              <div key={i} className="cross-pattern-card">
                <div className="cross-pattern-header">
                  <div className="cross-pattern-name">{u.violation}</div>
                  <div className="cross-pattern-stats">
                    <span className="cross-pattern-count">{u.industries}/6 industries</span>
                    <span className="cross-pattern-statute">{u.statutes}</span>
                  </div>
                </div>
                <div className="cross-pattern-bar-track">
                  <div className="cross-pattern-bar" style={{
                    width: Math.round(u.avgIntensity / 5 * 100) + "%",
                    background: u.avgIntensity >= 4 ? "#dc3545" : u.avgIntensity >= 3.5 ? "#CC8800" : "#4a7a6f"
                  }} />
                  <span className="cross-pattern-bar-label">{u.avgIntensity.toFixed(1)} avg. intensity</span>
                </div>
                <div className="cross-pattern-text">{u.pattern}</div>
                <div className="cross-pattern-defense">
                  <span className="cross-pattern-defense-label">Defense Constant:</span> {u.defenseConstant}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="cross-patterns-section">
        <div className="cross-patterns-label">Industry-Specific Vulnerabilities — Unique Exposure Drivers</div>
        <div className="cross-patterns-specific">
          {industrySpecific.map(function (s, i) {
            return (
              <div key={i} className="cross-specific-card">
                <div className="cross-specific-industry">{s.industry}</div>
                <div className="cross-specific-violation">{s.violation}</div>
                <div className="cross-specific-statute">{s.statute}</div>
                <div className="cross-specific-note">{s.note}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
