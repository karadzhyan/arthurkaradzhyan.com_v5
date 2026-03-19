"use client";

export default function ComplianceScorecard() {
  var categories = [
    {
      area: "Written Policies",
      items: [
        { element: "Meal period policy (Brinker-compliant)", weight: "Critical" },
        { element: "Rest period policy (Augustus-compliant)", weight: "Critical" },
        { element: "Overtime and regular rate policy", weight: "High" },
        { element: "Wage statement format (9 elements of § 226(a))", weight: "High" },
        { element: "Expense reimbursement (§ 2802)", weight: "Medium" }
      ],
      icon: "P"
    },
    {
      area: "Documentation & Systems",
      items: [
        { element: "Electronic meal period attestation", weight: "Critical" },
        { element: "Timekeeping system with break tracking", weight: "Critical" },
        { element: "Payroll audit trail (last 12 months)", weight: "High" },
        { element: "Employee acknowledgment forms", weight: "High" },
        { element: "Manager training records with attendance", weight: "High" }
      ],
      icon: "D"
    },
    {
      area: "Proactive Compliance",
      items: [
        { element: "Regular rate true-up calculations", weight: "High" },
        { element: "Premium auto-payment for short/missed breaks", weight: "Critical" },
        { element: "Final pay timing procedures", weight: "Medium" },
        { element: "Separation checklist with premium review", weight: "Medium" }
      ],
      icon: "C"
    },
    {
      area: "Penalty Cap Readiness",
      items: [
        { element: "Pre-notice compliance documentation package", weight: "Critical" },
        { element: "60-day remediation action plan (template)", weight: "High" },
        { element: "Back-pay calculation methodology documented", weight: "High" },
        { element: "Cure proposal framework (draft)", weight: "Medium" }
      ],
      icon: "R"
    }
  ];

  function weightColor(w) {
    if (w === "Critical") return "#dc3545";
    if (w === "High") return "#CC8800";
    return "#8aa39e";
  }

  var totalItems = categories.reduce(function (s, c) { return s + c.items.length; }, 0);
  var critical = 0;
  var high = 0;
  categories.forEach(function (c) {
    c.items.forEach(function (item) {
      if (item.weight === "Critical") critical++;
      if (item.weight === "High") high++;
    });
  });

  return (
    <div className="scorecard">
      <div className="scorecard-summary">
        <div className="scorecard-summary-item">
          <div className="scorecard-summary-num">{totalItems}</div>
          <div className="scorecard-summary-label">Compliance Elements</div>
        </div>
        <div className="scorecard-summary-item">
          <div className="scorecard-summary-num" style={{ color: "#dc3545" }}>{critical}</div>
          <div className="scorecard-summary-label">Critical for Cap</div>
        </div>
        <div className="scorecard-summary-item">
          <div className="scorecard-summary-num" style={{ color: "#CC8800" }}>{high}</div>
          <div className="scorecard-summary-label">High Priority</div>
        </div>
      </div>
      <div className="scorecard-categories">
        {categories.map(function (cat, i) {
          return (
            <div key={i} className="scorecard-category">
              <div className="scorecard-cat-header">
                <div className="scorecard-cat-icon">{cat.icon}</div>
                <div className="scorecard-cat-name">{cat.area}</div>
                <div className="scorecard-cat-count">{cat.items.length} items</div>
              </div>
              <div className="scorecard-items">
                {cat.items.map(function (item, j) {
                  return (
                    <div key={j} className="scorecard-item">
                      <div className="scorecard-item-check" />
                      <div className="scorecard-item-text">{item.element}</div>
                      <div className="scorecard-item-weight" style={{
                        color: weightColor(item.weight),
                        borderColor: weightColor(item.weight),
                        background: item.weight === "Critical"
                          ? "rgba(220,53,69,.06)"
                          : item.weight === "High"
                            ? "rgba(204,136,0,.06)"
                            : "rgba(138,163,158,.06)"
                      }}>
                        {item.weight}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="scorecard-cite">
        Assessment framework based on §§ 2699(g)–(h) penalty cap requirements · AB 2288 / SB 92
      </div>
    </div>
  );
}
