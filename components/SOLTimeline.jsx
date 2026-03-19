"use client";

export default function SOLTimeline() {
  var periods = [
    {
      label: "PAGA Statute of Limitations",
      statute: "CCP § 340(a)",
      duration: "1 year from LWDA notice",
      start: 0,
      width: 25,
      color: "#2c3e3a"
    },
    {
      label: "PAGA Penalty Lookback",
      statute: "Lab. Code § 2699(d)",
      duration: "1 year before LWDA notice",
      start: 0,
      width: 25,
      color: "#4a7a6f"
    },
    {
      label: "Wage Claims (§ 338)",
      statute: "CCP § 338(a)",
      duration: "3 years from violation",
      start: 0,
      width: 75,
      color: "#CC8800"
    },
    {
      label: "UCL Claims",
      statute: "Bus. & Prof. Code § 17208",
      duration: "4 years from violation",
      start: 0,
      width: 100,
      color: "#dc3545"
    }
  ];

  return (
    <div className="sol-timeline">
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
            </div>
          );
        })}
      </div>
      <div className="sol-timeline-callout">
        <div className="sol-callout-icon">!</div>
        <div className="sol-callout-text">
          <strong>The mismatch matters.</strong> A plaintiff can file PAGA within 1 year of the LWDA notice
          but seek penalties for underlying violations going back 3–4 years — dramatically expanding
          the penalty period beyond the PAGA-specific lookback.
        </div>
      </div>
    </div>
  );
}
