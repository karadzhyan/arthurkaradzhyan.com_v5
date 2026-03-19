"use client";

export default function WorksiteVariation() {
  var facilities = [
    {
      type: "Level I Trauma Center",
      mealRisk: 5,
      restRisk: 5,
      staffingRatio: "CDPH-mandated 1:2 ICU, 1:4 med-surg",
      breakRelief: "Dedicated relief nurses required — often unavailable",
      scheduling: "12-hour shifts with mandatory overtime extensions",
      color: "#dc3545"
    },
    {
      type: "Skilled Nursing Facility",
      mealRisk: 4,
      restRisk: 4,
      staffingRatio: "CDPH-mandated minimums by license type",
      breakRelief: "Charge nurse provides relief — pulled from own duties",
      scheduling: "8-hour shifts, rotating weekends",
      color: "#CC8800"
    },
    {
      type: "Outpatient Rehabilitation",
      mealRisk: 2,
      restRisk: 2,
      staffingRatio: "Appointment-based — no minimum ratios",
      breakRelief: "Scheduled between appointments",
      scheduling: "Standard business hours, no OT pressure",
      color: "#4a7a6f"
    },
    {
      type: "County Hospital (Public)",
      mealRisk: 5,
      restRisk: 5,
      staffingRatio: "CDPH + county union rules",
      breakRelief: "Subject to public agency's discretion",
      scheduling: "12-hour shifts, facility-mandated extensions",
      color: "#dc3545"
    }
  ];

  function riskLabel(val) {
    if (val === 5) return "Critical";
    if (val === 4) return "High";
    if (val === 3) return "Moderate";
    if (val === 2) return "Low";
    return "Minimal";
  }

  return (
    <div className="worksite-var">
      <div className="worksite-var-label">Worksite Compliance Variation — Why Unified PAGA Treatment Fails</div>
      <div className="worksite-var-grid">
        {facilities.map(function (f, i) {
          return (
            <div key={i} className="worksite-card" style={{ borderTopColor: f.color }}>
              <div className="worksite-card-type" style={{ color: f.color }}>{f.type}</div>
              <div className="worksite-card-risks">
                <div className="worksite-risk-row">
                  <span className="worksite-risk-label">Meal Risk:</span>
                  <span className="worksite-risk-blocks">
                    {[1, 2, 3, 4, 5].map(function (n) {
                      return <span key={n} className="worksite-block" style={{ background: n <= f.mealRisk ? f.color : "#f0f0f0" }} />;
                    })}
                  </span>
                  <span className="worksite-risk-val" style={{ color: f.color }}>{riskLabel(f.mealRisk)}</span>
                </div>
                <div className="worksite-risk-row">
                  <span className="worksite-risk-label">Rest Risk:</span>
                  <span className="worksite-risk-blocks">
                    {[1, 2, 3, 4, 5].map(function (n) {
                      return <span key={n} className="worksite-block" style={{ background: n <= f.restRisk ? f.color : "#f0f0f0" }} />;
                    })}
                  </span>
                  <span className="worksite-risk-val" style={{ color: f.color }}>{riskLabel(f.restRisk)}</span>
                </div>
              </div>
              <div className="worksite-details">
                <div className="worksite-detail"><span className="worksite-detail-label">Ratio:</span> {f.staffingRatio}</div>
                <div className="worksite-detail"><span className="worksite-detail-label">Relief:</span> {f.breakRelief}</div>
                <div className="worksite-detail"><span className="worksite-detail-label">Schedule:</span> {f.scheduling}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="worksite-var-bottom">
        A unified PAGA claim across these 4 facility types treats fundamentally different compliance environments as interchangeable. The § 2699(p) manageability motion argues that liability assessment requires facility-by-facility, shift-by-shift analysis that representative treatment cannot accommodate.
      </div>
    </div>
  );
}
