"use client";

export default function ViolationMultiplier() {
  var violations = [
    {
      trigger: "Missed Meal Period",
      streams: [
        { label: "§ 226.7 Premium", type: "wage", per: "1hr × RR" },
        { label: "§ 2699(f) PAGA", type: "penalty", per: "$100/$200" },
        { label: "§ 226(e) Wage Stmt", type: "penalty", per: "$50/$100" },
        { label: "§ 203 Wait Time", type: "penalty", per: "30 days" }
      ],
      multiplier: "4×",
      color: "#dc3545"
    },
    {
      trigger: "OT Underpayment",
      streams: [
        { label: "OT Differential", type: "wage", per: "Δ rate" },
        { label: "§ 558(a) PAGA", type: "penalty", per: "$50/$100" },
        { label: "§ 226(e) Wage Stmt", type: "penalty", per: "$50/$100" },
        { label: "§ 203 Wait Time", type: "penalty", per: "30 days" }
      ],
      multiplier: "4×",
      color: "#CC8800"
    },
    {
      trigger: "Minimum Wage",
      streams: [
        { label: "Wage Differential", type: "wage", per: "Δ amount" },
        { label: "§ 1197.1 Penalty", type: "penalty", per: "$100/$250" },
        { label: "§ 226(e) Wage Stmt", type: "penalty", per: "$50/$100" },
        { label: "§ 203 Wait Time", type: "penalty", per: "30 days" }
      ],
      multiplier: "4×",
      color: "#b85c00"
    },
    {
      trigger: "Wage Statement",
      streams: [
        { label: "§ 226(e) Penalty", type: "penalty", per: "$50/$100" }
      ],
      multiplier: "1×",
      color: "#2c3e3a"
    },
    {
      trigger: "Final Pay Timing",
      streams: [
        { label: "§ 203 Wait Time", type: "penalty", per: "30 days" },
        { label: "§ 2699(f) PAGA", type: "penalty", per: "$100/$200" }
      ],
      multiplier: "2×",
      color: "#4a7a6f"
    }
  ];

  return (
    <div className="vmx">
      <div className="vmx-grid">
        {violations.map(function (v, i) {
          return (
            <div key={i} className="vmx-card" style={{ borderTopColor: v.color }}>
              <div className="vmx-card-header">
                <div className="vmx-card-trigger">{v.trigger}</div>
                <div className="vmx-card-multiplier" style={{ color: v.color }}>
                  {v.multiplier}
                </div>
              </div>
              <div className="vmx-card-streams">
                {v.streams.map(function (s, j) {
                  return (
                    <div key={j} className="vmx-stream">
                      <div className={"vmx-stream-type vmx-stream-" + s.type}>
                        {s.type === "wage" ? "W" : "P"}
                      </div>
                      <div className="vmx-stream-info">
                        <div className="vmx-stream-label">{s.label}</div>
                        <div className="vmx-stream-per">{s.per}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="vmx-formula">
        <div className="vmx-formula-label">Aggregate Exposure Formula</div>
        <div className="vmx-formula-text">
          Σ (Violation Categories × Penalty Streams × Employees × Pay Periods × Violation Rate)
        </div>
        <div className="vmx-formula-example">
          6 categories × avg. 3.5 streams × 200 employees × 24 periods × 40% rate = <strong>40,320</strong> individual calculations
        </div>
      </div>
    </div>
  );
}
