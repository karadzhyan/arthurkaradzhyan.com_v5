"use client";

export default function RemoteWorkExposure() {
  var categories = [
    { expense: "Home Internet", typicalCost: "$60–100/mo", reimbursable: "Reasonable portion — proportional to work use", note: "If employee works from home 5 days/week, ~100% is work-related. Hybrid: proportional.", risk: 4 },
    { expense: "Cell Phone", typicalCost: "$50–80/mo", reimbursable: "Reasonable portion — proportional to work use", note: "Personal device used for work calls, Slack, email. Even occasional use creates a reimbursement obligation.", risk: 4 },
    { expense: "Computer / Monitor", typicalCost: "$1,200–3,000", reimbursable: "Full cost if employer requires personal equipment", note: "If employer does not provide equipment and employee must purchase, full cost is reimbursable.", risk: 3 },
    { expense: "Office Furniture", typicalCost: "$200–800", reimbursable: "Necessary expenditures — desk, chair", note: "Ergonomic requirements create additional exposure. ADA accommodation intersects with § 2802.", risk: 2 },
    { expense: "Office Supplies", typicalCost: "$20–50/mo", reimbursable: "All necessary expenditures", note: "Paper, printer ink, pens, notebooks — de minimis individually but aggregate across workforce.", risk: 1 },
    { expense: "Home Electricity", typicalCost: "$30–60/mo increase", reimbursable: "Reasonable portion attributable to work", note: "Least commonly reimbursed but legally required if work materially increases home utility costs.", risk: 2 }
  ];

  function riskColor(r) {
    if (r >= 4) return "#dc3545";
    if (r >= 3) return "#CC8800";
    if (r >= 2) return "#8aa39e";
    return "#ccc";
  }

  return (
    <div className="remote-exposure">
      <div className="remote-exposure-label">§ 2802 Remote Work Expense Categories — Reimbursement Obligation</div>
      <div className="remote-exposure-cards">
        {categories.map(function (c, i) {
          return (
            <div key={i} className="remote-exp-card">
              <div className="remote-exp-header">
                <div className="remote-exp-name">{c.expense}</div>
                <div className="remote-exp-cost">{c.typicalCost}</div>
              </div>
              <div className="remote-exp-risk-bar">
                {[1, 2, 3, 4, 5].map(function (n) {
                  return <div key={n} className="remote-exp-block" style={{ background: n <= c.risk ? riskColor(c.risk) : "#f0f0f0" }} />;
                })}
              </div>
              <div className="remote-exp-reimb">{c.reimbursable}</div>
              <div className="remote-exp-note">{c.note}</div>
            </div>
          );
        })}
      </div>
      <div className="remote-exposure-calc">
        <div className="remote-calc-label">Exposure Scaling</div>
        <div className="remote-calc-grid">
          <div className="remote-calc-item">
            <div className="remote-calc-num">200</div>
            <div className="remote-calc-desc">Remote employees (example)</div>
          </div>
          <div className="remote-calc-item">
            <div className="remote-calc-num">×26</div>
            <div className="remote-calc-desc">Pay periods (1 year)</div>
          </div>
          <div className="remote-calc-item">
            <div className="remote-calc-num">×$200</div>
            <div className="remote-calc-desc">PAGA penalty per period</div>
          </div>
          <div className="remote-calc-item remote-calc-total">
            <div className="remote-calc-num">$1.04M</div>
            <div className="remote-calc-desc">PAGA penalty exposure (1 yr)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
