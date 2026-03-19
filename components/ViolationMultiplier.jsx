"use client";

export default function ViolationMultiplier() {
  var emp = 200;
  var periods = 24;
  var rate = 0.40;
  var instances = Math.round(emp * periods * rate);
  var rr = 26.70;
  var separated = Math.round(emp * 0.35);

  var violations = [
    {
      trigger: "Missed Meal Period",
      streams: [
        { label: "§ 226.7 Premium", type: "wage", per: "1hr × RR", dollar: rr * instances },
        { label: "§ 2699(f) PAGA", type: "penalty", per: "$100/$200", dollar: emp * 100 + (instances - emp) * 200 },
        { label: "§ 226(e) Wage Stmt", type: "penalty", per: "$50/$100", dollar: Math.min(emp * 4000, emp * 50 + (instances - emp) * 100) },
        { label: "§ 203 Wait Time", type: "penalty", per: "30 days", dollar: separated * rr * 8 * 30 }
      ],
      multiplier: "4×",
      color: "#dc3545"
    },
    {
      trigger: "OT Underpayment",
      streams: [
        { label: "OT Differential", type: "wage", per: "Δ rate", dollar: (rr - 18) * 0.5 * 10 * 104 * emp },
        { label: "§ 558(a) PAGA", type: "penalty", per: "$50/$100", dollar: emp * 50 + (instances - emp) * 100 },
        { label: "§ 226(e) Wage Stmt", type: "penalty", per: "$50/$100", dollar: Math.min(emp * 4000, emp * 50 + (instances - emp) * 100) },
        { label: "§ 203 Wait Time", type: "penalty", per: "30 days", dollar: separated * rr * 8 * 30 }
      ],
      multiplier: "4×",
      color: "#CC8800"
    },
    {
      trigger: "Minimum Wage",
      streams: [
        { label: "Wage Differential", type: "wage", per: "Δ amount", dollar: 120000 },
        { label: "§ 1197.1 Penalty", type: "penalty", per: "$100/$250", dollar: emp * 100 + (instances - emp) * 250 },
        { label: "§ 226(e) Wage Stmt", type: "penalty", per: "$50/$100", dollar: Math.min(emp * 4000, emp * 50 + (instances - emp) * 100) },
        { label: "§ 203 Wait Time", type: "penalty", per: "30 days", dollar: separated * rr * 8 * 30 }
      ],
      multiplier: "4×",
      color: "#b85c00"
    },
    {
      trigger: "Wage Statement",
      streams: [
        { label: "§ 226(e) Penalty", type: "penalty", per: "$50/$100", dollar: Math.min(emp * 4000, emp * 50 + (instances - emp) * 100) }
      ],
      multiplier: "1×",
      color: "#2c3e3a"
    },
    {
      trigger: "Final Pay Timing",
      streams: [
        { label: "§ 203 Wait Time", type: "penalty", per: "30 days", dollar: separated * rr * 8 * 30 },
        { label: "§ 2699(f) PAGA", type: "penalty", per: "$100/$200", dollar: separated * 200 }
      ],
      multiplier: "2×",
      color: "#4a7a6f"
    }
  ];

  function fmt(n) {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return "$" + Math.round(n / 1000) + "K";
    return "$" + Math.round(n);
  }

  var grandTotal = violations.reduce(function (s, v) {
    return s + v.streams.reduce(function (ss, st) { return ss + st.dollar; }, 0);
  }, 0);

  return (
    <div className="vmx">
      <div className="vmx-assumptions">
        <span>{emp} employees</span>
        <span>{periods} pay periods</span>
        <span>{Math.round(rate * 100)}% violation rate</span>
        <span>${rr.toFixed(2)} regular rate</span>
      </div>
      <div className="vmx-grid">
        {violations.map(function (v, i) {
          var catTotal = v.streams.reduce(function (s, st) { return s + st.dollar; }, 0);
          var wageTotal = v.streams.filter(function (s) { return s.type === "wage"; }).reduce(function (s, st) { return s + st.dollar; }, 0);
          var penaltyTotal = catTotal - wageTotal;
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
                      <div className="vmx-stream-dollar">{fmt(s.dollar)}</div>
                    </div>
                  );
                })}
              </div>
              <div className="vmx-card-total">
                <div className="vmx-card-total-row">
                  <span>Category Total</span>
                  <span style={{ color: v.color }}>{fmt(catTotal)}</span>
                </div>
                {wageTotal > 0 && (
                  <div className="vmx-card-total-row vmx-card-total-sub">
                    <span>Recoverable (penalties only)</span>
                    <span>{fmt(penaltyTotal)}</span>
                  </div>
                )}
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
          5 categories × avg. 3 streams × {emp} employees × {periods} periods × {Math.round(rate * 100)}% rate = <strong>{Math.round(5 * 3 * emp * periods * rate).toLocaleString()}</strong> individual calculations
        </div>
        <div className="vmx-formula-total">
          Illustrative combined exposure across all categories: <strong style={{ color: "#dc3545" }}>{fmt(grandTotal)}</strong>
        </div>
      </div>
    </div>
  );
}
