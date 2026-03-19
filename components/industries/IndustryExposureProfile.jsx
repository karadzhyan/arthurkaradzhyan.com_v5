"use client";

export default function IndustryExposureProfile({ industry }) {
  if (!industry) return null;

  var violationCategories = [
    { key: "meal", label: "Meal Period" },
    { key: "rest", label: "Rest Period" },
    { key: "ot", label: "Overtime / Regular Rate" },
    { key: "wage", label: "Wage Statement" },
    { key: "reimb", label: "Reimbursement" },
    { key: "timing", label: "Final Pay Timing" },
    { key: "class", label: "Misclassification" }
  ];

  var industryScores = {
    "Hospitality": { meal: 5, rest: 5, ot: 3, wage: 4, reimb: 2, timing: 3, class: 4, total: 26 },
    "Automotive (Dealerships)": { meal: 3, rest: 3, ot: 5, wage: 4, reimb: 2, timing: 5, class: 3, total: 25 },
    "Healthcare & Staffing": { meal: 5, rest: 4, ot: 4, wage: 3, reimb: 3, timing: 3, class: 5, total: 27 },
    "Solar & Energy": { meal: 4, rest: 4, ot: 5, wage: 4, reimb: 5, timing: 3, class: 3, total: 28 },
    "Technology & Startups": { meal: 2, rest: 2, ot: 3, wage: 3, reimb: 5, timing: 2, class: 5, total: 22 },
    "Agriculture": { meal: 4, rest: 4, ot: 4, wage: 5, reimb: 3, timing: 5, class: 3, total: 28 }
  };

  var scores = industryScores[industry.name];
  if (!scores) return null;

  function intensityColor(val) {
    if (val === 5) return "#dc3545";
    if (val === 4) return "#CC8800";
    if (val === 3) return "rgba(204,136,0,.5)";
    if (val === 2) return "#8aa39e";
    return "#ddd";
  }

  function intensityLabel(val) {
    if (val === 5) return "Critical";
    if (val === 4) return "High";
    if (val === 3) return "Moderate";
    if (val === 2) return "Low";
    return "Minimal";
  }

  return (
    <div className="ind-profile">
      <div className="ind-profile-score">
        <div className="ind-profile-score-num">{scores.total}</div>
        <div className="ind-profile-score-max">/35</div>
        <div className="ind-profile-score-label">Composite Risk Score</div>
      </div>
      <div className="ind-profile-bars">
        {violationCategories.map(function (v) {
          var val = scores[v.key];
          var color = intensityColor(val);
          return (
            <div key={v.key} className="ind-profile-bar-row">
              <div className="ind-profile-bar-label">{v.label}</div>
              <div className="ind-profile-bar-track">
                {[1, 2, 3, 4, 5].map(function (n) {
                  return (
                    <div key={n} className="ind-profile-bar-block" style={{
                      background: n <= val ? color : "#f0f0f0"
                    }} />
                  );
                })}
              </div>
              <div className="ind-profile-bar-val" style={{ color: color }}>
                {val} — {intensityLabel(val)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="ind-profile-meta">
        <div className="ind-profile-meta-item">
          <div className="ind-profile-meta-num">{industry.exposureCategories.length}</div>
          <div className="ind-profile-meta-label">Detailed Exposure Categories</div>
        </div>
        <div className="ind-profile-meta-item">
          <div className="ind-profile-meta-num">{industry.issues.length}</div>
          <div className="ind-profile-meta-label">Total Violation Types</div>
        </div>
        <div className="ind-profile-meta-item">
          <div className="ind-profile-meta-num">{industry.authorities.length}</div>
          <div className="ind-profile-meta-label">Governing Authorities</div>
        </div>
        <div className="ind-profile-meta-item">
          <div className="ind-profile-meta-num">{industry.defenseStrategies.length}</div>
          <div className="ind-profile-meta-label">Defense Strategies</div>
        </div>
      </div>
    </div>
  );
}
