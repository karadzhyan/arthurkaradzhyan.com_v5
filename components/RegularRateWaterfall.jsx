"use client";

export default function RegularRateWaterfall() {
  var components = [
    { label: "Base Hourly Rate", amount: 18.00, type: "base", note: "Agreed hourly wage" },
    { label: "Shift Differential", amount: 1.50, type: "add", note: "Night/weekend premium" },
    { label: "Non-Discretionary Bonus", amount: 2.40, type: "add", note: "Production / attendance bonus (Alvarado)" },
    { label: "Commission Earnings", amount: 4.80, type: "add", note: "Per-hour commission equivalent" }
  ];

  var regularRate = components.reduce(function (sum, c) { return sum + c.amount; }, 0);
  var baseRate = components[0].amount;
  var maxHeight = 200;

  function barHeight(val) {
    return Math.round((val / regularRate) * maxHeight);
  }

  return (
    <div className="waterfall">
      <div className="waterfall-chart">
        <div className="waterfall-cols">
          {components.map(function (comp, i) {
            var prevSum = components.slice(0, i).reduce(function (s, c) { return s + c.amount; }, 0);
            var height = barHeight(comp.amount);
            var bottom = barHeight(prevSum);

            return (
              <div key={i} className="waterfall-col">
                <div className="waterfall-col-amount">
                  {comp.type === "base" ? "" : "+"} ${comp.amount.toFixed(2)}
                </div>
                <div className="waterfall-col-bar-area" style={{ height: maxHeight + "px" }}>
                  <div
                    className="waterfall-col-bar"
                    style={{
                      height: height + "px",
                      bottom: bottom + "px",
                      background: comp.type === "base"
                        ? "#2c3e3a"
                        : i === 1 ? "#4a7a6f" : i === 2 ? "#CC8800" : "#b85c00"
                    }}
                  />
                </div>
                <div className="waterfall-col-label">{comp.label}</div>
              </div>
            );
          })}

          <div className="waterfall-col waterfall-col-total">
            <div className="waterfall-col-amount waterfall-col-amount-total">
              ${regularRate.toFixed(2)}
            </div>
            <div className="waterfall-col-bar-area" style={{ height: maxHeight + "px" }}>
              <div
                className="waterfall-col-bar"
                style={{
                  height: maxHeight + "px",
                  bottom: "0px",
                  background: "linear-gradient(0deg, #2c3e3a, #CC8800)"
                }}
              />
            </div>
            <div className="waterfall-col-label">Regular Rate</div>
          </div>
        </div>
      </div>

      <div className="waterfall-impact">
        <div className="waterfall-impact-title">What the Gap Means</div>
        <div className="waterfall-impact-grid">
          <div className="waterfall-impact-item">
            <div className="waterfall-impact-label">OT Premium — Employer Pays</div>
            <div className="waterfall-impact-val" style={{ color: "#dc3545" }}>
              ${(baseRate * 0.5).toFixed(2)}<span className="waterfall-impact-unit">/hr</span>
            </div>
            <div className="waterfall-impact-note">Using base rate only (wrong)</div>
          </div>
          <div className="waterfall-impact-item">
            <div className="waterfall-impact-label">OT Premium — Legally Required</div>
            <div className="waterfall-impact-val" style={{ color: "#2c3e3a" }}>
              ${(regularRate * 0.5).toFixed(2)}<span className="waterfall-impact-unit">/hr</span>
            </div>
            <div className="waterfall-impact-note">Using full regular rate (correct)</div>
          </div>
          <div className="waterfall-impact-item">
            <div className="waterfall-impact-label">Underpayment per OT Hour</div>
            <div className="waterfall-impact-val" style={{ color: "#CC8800" }}>
              ${((regularRate - baseRate) * 0.5).toFixed(2)}<span className="waterfall-impact-unit">/hr</span>
            </div>
            <div className="waterfall-impact-note">Systematic exposure per employee</div>
          </div>
          <div className="waterfall-impact-item">
            <div className="waterfall-impact-label">Extrapolated (200 emp × 2 yrs)</div>
            <div className="waterfall-impact-val" style={{ color: "#dc3545" }}>
              ${(((regularRate - baseRate) * 0.5) * 10 * 52 * 200 / 1000).toFixed(0)}K
            </div>
            <div className="waterfall-impact-note">10 OT hrs/wk assumption</div>
          </div>
        </div>
      </div>

      <div className="waterfall-cite">
        Ferra v. Loews (2021) 11 Cal.5th 858 · Alvarado v. Dart (2018) 4 Cal.5th 542
      </div>
    </div>
  );
}
