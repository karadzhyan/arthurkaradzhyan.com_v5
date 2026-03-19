"use client";

export default function AutoCompensationMap() {
  var roles = [
    {
      title: "Salesperson",
      wageOrder: "WO 7 — Mercantile",
      exemption: "Commissioned-employee OT exemption",
      compComponents: [
        { name: "Base / Draw", inRegRate: true, note: "Guaranteed minimum, recovered against commissions" },
        { name: "Unit Commission", inRegRate: true, note: "Per-vehicle commission — the core compensation" },
        { name: "Manufacturer Spiffs", inRegRate: true, note: "Per-model bonus from manufacturer — Alvarado flat-sum methodology" },
        { name: "CSI Bonus", inRegRate: true, note: "Customer satisfaction bonus — Alvarado applies" },
        { name: "Volume Escalator", inRegRate: true, note: "Tier-based bonus at volume thresholds — must be prorated into regular rate" }
      ],
      keyRisk: "Workweek-by-workweek exemption verification — fails if commission < 50% of earnings OR total < 1.5× minimum wage in any single workweek",
      riskLevel: "Critical"
    },
    {
      title: "F&I Manager",
      wageOrder: "WO 7 — Mercantile",
      exemption: "Administrative exemption (disputed)",
      compComponents: [
        { name: "Base Salary", inRegRate: true, note: "Fixed salary component" },
        { name: "F&I Product Commission", inRegRate: true, note: "Commission on warranty, GAP, protection products" },
        { name: "Penetration Bonus", inRegRate: true, note: "Bonus for exceeding product penetration targets" },
        { name: "Reserve / Markup", inRegRate: true, note: "Dealer participation in finance rate markup" }
      ],
      keyRisk: "Administrative exemption requires work 'directly related to management policies or general business operations' — F&I managers primarily sell, not manage. Exemption is frequently challenged.",
      riskLevel: "High"
    },
    {
      title: "Flat-Rate Technician",
      wageOrder: "WO 7 — Mercantile",
      exemption: "None — non-exempt",
      compComponents: [
        { name: "Flag Hour Rate", inRegRate: true, note: "Compensation per manufacturer-estimated repair hour" },
        { name: "Guaranteed Minimum", inRegRate: true, note: "Hourly minimum when flag hours fall below threshold" },
        { name: "Certification Bonus", inRegRate: true, note: "ASE / manufacturer certification premium" }
      ],
      keyRisk: "Overtime on actual hours, not flag hours. Regular rate = flag-hour earnings ÷ actual hours worked × 1.5. Most dealership payroll systems calculate this incorrectly.",
      riskLevel: "High"
    },
    {
      title: "Service Advisor",
      wageOrder: "WO 7 — Mercantile",
      exemption: "Commissioned-employee OT exemption (if qualified)",
      compComponents: [
        { name: "Base Hourly / Salary", inRegRate: true, note: "Fixed component" },
        { name: "Service Commission", inRegRate: true, note: "% of labor/parts revenue on ROs written" },
        { name: "Upsell Bonus", inRegRate: true, note: "Bonus for additional services recommended" }
      ],
      keyRisk: "Must verify commission exceeds 50% of total earnings workweek by workweek. Service advisors in slow months frequently fall below the threshold.",
      riskLevel: "Moderate"
    }
  ];

  function riskColor(level) {
    if (level === "Critical") return "#dc3545";
    if (level === "High") return "#CC8800";
    return "#4a7a6f";
  }

  return (
    <div className="auto-comp-map">
      <div className="auto-comp-label">Dealership Compensation Anatomy — Role-by-Role Regular Rate Exposure</div>
      <div className="auto-comp-roles">
        {roles.map(function (r, i) {
          return (
            <div key={i} className="auto-comp-role">
              <div className="auto-comp-role-header">
                <div className="auto-comp-role-title">{r.title}</div>
                <div className="auto-comp-role-meta">
                  <span className="auto-comp-wo">{r.wageOrder}</span>
                  <span className="auto-comp-exempt">{r.exemption}</span>
                </div>
              </div>
              <div className="auto-comp-components">
                {r.compComponents.map(function (c, j) {
                  return (
                    <div key={j} className="auto-comp-item">
                      <div className="auto-comp-item-name">
                        {c.name}
                        <span className="auto-comp-item-badge">In Regular Rate</span>
                      </div>
                      <div className="auto-comp-item-note">{c.note}</div>
                    </div>
                  );
                })}
              </div>
              <div className="auto-comp-risk" style={{ borderLeftColor: riskColor(r.riskLevel) }}>
                <span className="auto-comp-risk-level" style={{ color: riskColor(r.riskLevel) }}>{r.riskLevel}:</span> {r.keyRisk}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
