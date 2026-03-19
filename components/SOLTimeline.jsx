"use client";

export default function SOLTimeline() {
  var noticeDate = "March 15, 2026";

  var periods = [
    {
      label: "PAGA Statute of Limitations",
      statute: "CCP § 340(a)",
      duration: "1 year from LWDA notice",
      width: 25,
      color: "#2c3e3a",
      dateRange: "Mar 15, 2026 → Mar 15, 2027",
      penaltyPeriods: "24 pay periods",
      note: "Must file complaint within 1 year of LWDA notice"
    },
    {
      label: "PAGA Penalty Lookback",
      statute: "Lab. Code § 2699(d)",
      duration: "1 year before LWDA notice",
      width: 25,
      color: "#4a7a6f",
      dateRange: "Mar 15, 2025 → Mar 15, 2026",
      penaltyPeriods: "24 pay periods",
      note: "Penalties calculated for this window only"
    },
    {
      label: "Wage Claims",
      statute: "CCP § 338(a)",
      duration: "3 years from violation",
      width: 75,
      color: "#CC8800",
      dateRange: "Mar 15, 2023 → Mar 15, 2026",
      penaltyPeriods: "72 pay periods",
      note: "Underlying violations may reach back 3 years — expanding the penalty calculation base"
    },
    {
      label: "UCL Claims",
      statute: "Bus. & Prof. Code § 17208",
      duration: "4 years from violation",
      width: 100,
      color: "#dc3545",
      dateRange: "Mar 15, 2022 → Mar 15, 2026",
      penaltyPeriods: "96 pay periods",
      note: "Maximum lookback under UCL — applies to certain wage violations brought as unfair business practices"
    }
  ];

  return (
    <div className="sol-timeline">
      <div className="sol-timeline-example">
        <div className="sol-timeline-example-label">Example: LWDA Notice Filed</div>
        <div className="sol-timeline-example-date">{noticeDate}</div>
      </div>
      <div className="sol-timeline-header">
        <div className="sol-timeline-axis">
          <span>LWDA Notice Filed</span>
          <span className="sol-timeline-axis-end">4 Years Prior</span>
        </div>
      </div>
      <div className="sol-timeline-bars">
        {periods.map(function (p, i) {
          return (
            <div key={i} className="sol-bar-row">
              <div className="sol-bar-label">
                <div className="sol-bar-name">{p.label}</div>
                <div className="sol-bar-statute">{p.statute}</div>
              </div>
              <div className="sol-bar-track">
                <div
                  className="sol-bar-fill"
                  style={{
                    width: p.width + "%",
                    background: p.color
                  }}
                >
                  <span className="sol-bar-duration">{p.duration}</span>
                </div>
              </div>
              <div className="sol-bar-detail">
                <div className="sol-bar-daterange">{p.dateRange}</div>
                <div className="sol-bar-periods">{p.penaltyPeriods}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sol-timeline-callout">
        <div className="sol-callout-icon">!</div>
        <div className="sol-callout-text">
          <strong>The mismatch matters.</strong> A plaintiff can file PAGA within 1 year of the LWDA notice
          but seek penalties for underlying violations going back 3–4 years — dramatically expanding
          the penalty period beyond the PAGA-specific lookback. The difference between 24 and 96
          pay periods is a <strong>4× multiplier</strong> on every per-period penalty calculation.
        </div>
      </div>

      <div className="sol-timeline-math">
        <div className="sol-math-title">Penalty Period Impact</div>
        <div className="sol-math-grid">
          <div className="sol-math-item">
            <div className="sol-math-num" style={{ color: "#2c3e3a" }}>24</div>
            <div className="sol-math-label">Pay periods (PAGA lookback)</div>
            <div className="sol-math-calc">200 emp × $200 × 24 = $960K</div>
          </div>
          <div className="sol-math-item">
            <div className="sol-math-num" style={{ color: "#CC8800" }}>72</div>
            <div className="sol-math-label">Pay periods (3-year wage claim)</div>
            <div className="sol-math-calc">200 emp × $200 × 72 = $2.88M</div>
          </div>
          <div className="sol-math-item">
            <div className="sol-math-num" style={{ color: "#dc3545" }}>96</div>
            <div className="sol-math-label">Pay periods (4-year UCL)</div>
            <div className="sol-math-calc">200 emp × $200 × 96 = $3.84M</div>
          </div>
        </div>
      </div>
    </div>
  );
}
