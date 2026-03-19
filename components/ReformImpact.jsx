"use client";

export default function ReformImpact() {
  var comparisons = [
    {
      category: "Default Penalty Rate",
      before: "$200 per employee per pay period (subsequent)",
      after: "$100 per employee per pay period (subsequent)",
      savings: "50%",
      statute: "§ 2699(f)(2)(A)"
    },
    {
      category: "Penalty Cap — Pre-Notice Compliance",
      before: "No cap available",
      after: "15% of total penalties if employer took all reasonable steps before notice",
      savings: "85%",
      statute: "§ 2699(g)"
    },
    {
      category: "Penalty Cap — Post-Notice Cure",
      before: "No cap available",
      after: "30% of total penalties if employer cures within 60 days of notice",
      savings: "70%",
      statute: "§ 2699(h)"
    },
    {
      category: "Cure Proposal Window",
      before: "33 days from LWDA notice (limited scope)",
      after: "33 days + expanded cure framework with employer proposal rights",
      savings: "—",
      statute: "§ 2699.3(a)"
    },
    {
      category: "Manageability",
      before: "No statutory authority to limit scope (Estrada)",
      after: "Court may limit claims and evidence at trial for manageability",
      savings: "—",
      statute: "§ 2699(p)"
    },
    {
      category: "Early Evaluation Conference",
      before: "No mechanism",
      after: "Court-supervised conference to narrow claims, discuss resolution",
      savings: "—",
      statute: "§ 2699.3(b)(2)"
    },
    {
      category: "Injunctive Relief Standing",
      before: "Courts split on availability",
      after: "Expressly authorized — compliance-focused resolution option",
      savings: "—",
      statute: "§ 2699(o)"
    }
  ];

  return (
    <div className="reform-impact">
      <div className="reform-impact-header">
        <div className="reform-impact-col-label reform-col-before">Before Reforms</div>
        <div className="reform-impact-col-label reform-col-after">After AB 2288 / SB 92</div>
      </div>
      <div className="reform-impact-rows">
        {comparisons.map(function (c, i) {
          return (
            <div key={i} className="reform-row">
              <div className="reform-row-category">
                <div className="reform-row-cat-name">{c.category}</div>
                <div className="reform-row-cat-statute">{c.statute}</div>
              </div>
              <div className="reform-row-cols">
                <div className="reform-row-before">{c.before}</div>
                <div className="reform-row-arrow">→</div>
                <div className="reform-row-after">{c.after}</div>
                {c.savings !== "—" && (
                  <div className="reform-row-savings">{c.savings}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="reform-impact-summary">
        <div className="reform-impact-summary-label">Maximum Combined Reduction</div>
        <div className="reform-impact-summary-grid">
          <div className="reform-summary-item">
            <div className="reform-summary-num" style={{ color: "#dc3545" }}>$4.2M</div>
            <div className="reform-summary-desc">Pre-reform exposure</div>
          </div>
          <div className="reform-summary-arrow">→</div>
          <div className="reform-summary-item">
            <div className="reform-summary-num" style={{ color: "#CC8800" }}>$1.1M</div>
            <div className="reform-summary-desc">Post-reform + analysis</div>
          </div>
          <div className="reform-summary-arrow">→</div>
          <div className="reform-summary-item">
            <div className="reform-summary-num" style={{ color: "#2c3e3a" }}>$380K</div>
            <div className="reform-summary-desc">With penalty cap</div>
          </div>
        </div>
      </div>
      <div className="reform-impact-cite">
        AB 2288 (Stats. 2024, ch. 330) · SB 92 (Stats. 2024, ch. 331) · Effective July 1, 2024
      </div>
    </div>
  );
}
