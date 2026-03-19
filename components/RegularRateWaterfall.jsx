"use client";

export default function RegularRateWaterfall() {
  var profiles = [
    {
      label: "Hotel Room Attendant",
      components: [
        { label: "Base Hourly", amount: 17.50, type: "base" },
        { label: "Shift Diff.", amount: 1.00, type: "add" },
        { label: "Attendance Bonus", amount: 1.80, type: "add" }
      ]
    },
    {
      label: "Dealership Salesperson",
      components: [
        { label: "Draw / Guarantee", amount: 16.50, type: "base" },
        { label: "Commissions", amount: 12.40, type: "add" },
        { label: "Spiff Bonus", amount: 2.10, type: "add" }
      ]
    },
    {
      label: "Solar Installer",
      components: [
        { label: "Base Hourly", amount: 22.00, type: "base" },
        { label: "Piece Rate", amount: 5.60, type: "add" },
        { label: "Production Bonus", amount: 3.20, type: "add" }
      ]
    }
  ];

  var activeProfile = profiles[1];
  var components = activeProfile.components;

  var regularRate = components.reduce(function (sum, c) { return sum + c.amount; }, 0);
  var baseRate = components[0].amount;
  var gap = regularRate - baseRate;
  var otHrsPerWeek = 10;
  var weeksPerYear = 52;
  var employees = 200;
  var years = 2;
  var maxHeight = 200;

  var otGapPerHr = gap * 0.5;
  var weeklyGap = otGapPerHr * otHrsPerWeek;
  var annualGap = weeklyGap * weeksPerYear;
  var workforceGap = annualGap * employees * years;
  var mealPremiumGap = regularRate - baseRate;
  var mealExposure = mealPremiumGap * employees * 24 * 0.4;

  function barHeight(val) {
    return Math.round((val / regularRate) * maxHeight);
  }

  function fmt(n) {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return "$" + Math.round(n / 1000) + "K";
    return "$" + Math.round(n);
  }

  return (
    <div className="waterfall">
      <div className="waterfall-profiles">
        {profiles.map(function (p, i) {
          var isActive = p.label === activeProfile.label;
          return (
            <div key={i} className={"waterfall-profile" + (isActive ? " waterfall-profile-active" : "")}>
              {p.label}
            </div>
          );
        })}
      </div>

      <div className="waterfall-chart">
        <div className="waterfall-cols">
          {components.map(function (comp, i) {
            var prevSum = components.slice(0, i).reduce(function (s, c) { return s + c.amount; }, 0);
            var height = barHeight(comp.amount);
            var bottom = barHeight(prevSum);
            var pctOfTotal = Math.round(comp.amount / regularRate * 100);

            return (
              <div key={i} className="waterfall-col">
                <div className="waterfall-col-amount">
                  {comp.type === "base" ? "" : "+"} ${comp.amount.toFixed(2)}
                  <span className="waterfall-col-pct">({pctOfTotal}%)</span>
                </div>
                <div className="waterfall-col-bar-area" style={{ height: maxHeight + "px" }}>
                  <div
                    className="waterfall-col-bar"
                    style={{
                      height: height + "px",
                      bottom: bottom + "px",
                      background: comp.type === "base"
                        ? "#2c3e3a"
                        : i === 1 ? "#CC8800" : "#b85c00"
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
        <div className="waterfall-impact-title">Overtime Underpayment Analysis</div>
        <div className="waterfall-impact-grid">
          <div className="waterfall-impact-item">
            <div className="waterfall-impact-label">Employer Pays (base only)</div>
            <div className="waterfall-impact-val" style={{ color: "#dc3545" }}>
              ${(baseRate * 0.5).toFixed(2)}<span className="waterfall-impact-unit">/hr</span>
            </div>
            <div className="waterfall-impact-note">0.5 × ${baseRate.toFixed(2)} base (wrong)</div>
          </div>
          <div className="waterfall-impact-item">
            <div className="waterfall-impact-label">Legally Required</div>
            <div className="waterfall-impact-val" style={{ color: "#2c3e3a" }}>
              ${(regularRate * 0.5).toFixed(2)}<span className="waterfall-impact-unit">/hr</span>
            </div>
            <div className="waterfall-impact-note">0.5 × ${regularRate.toFixed(2)} regular rate</div>
          </div>
          <div className="waterfall-impact-item">
            <div className="waterfall-impact-label">Gap per OT Hour</div>
            <div className="waterfall-impact-val" style={{ color: "#CC8800" }}>
              ${otGapPerHr.toFixed(2)}<span className="waterfall-impact-unit">/hr</span>
            </div>
            <div className="waterfall-impact-note">Systematic per-hour underpayment</div>
          </div>
          <div className="waterfall-impact-item">
            <div className="waterfall-impact-label">Per Employee / Week</div>
            <div className="waterfall-impact-val" style={{ color: "#CC8800" }}>
              ${weeklyGap.toFixed(2)}<span className="waterfall-impact-unit">/wk</span>
            </div>
            <div className="waterfall-impact-note">{otHrsPerWeek} OT hrs/wk assumption</div>
          </div>
          <div className="waterfall-impact-item">
            <div className="waterfall-impact-label">Per Employee / Year</div>
            <div className="waterfall-impact-val" style={{ color: "#dc3545" }}>
              {fmt(annualGap)}
            </div>
            <div className="waterfall-impact-note">{weeksPerYear} weeks</div>
          </div>
          <div className="waterfall-impact-item">
            <div className="waterfall-impact-label">Workforce ({employees} emp × {years} yrs)</div>
            <div className="waterfall-impact-val" style={{ color: "#dc3545" }}>
              {fmt(workforceGap)}
            </div>
            <div className="waterfall-impact-note">OT differential exposure only</div>
          </div>
        </div>
      </div>

      <div className="waterfall-ferra">
        <div className="waterfall-ferra-title">Ferra Impact — Meal/Rest Premium Gap</div>
        <div className="waterfall-ferra-text">
          The same gap applies to meal and rest period premiums. After <em>Ferra</em>, premiums
          must be paid at the regular rate (${regularRate.toFixed(2)}), not the base rate (${baseRate.toFixed(2)}).
          The underpayment is ${mealPremiumGap.toFixed(2)} per missed meal/rest period.
        </div>
        <div className="waterfall-ferra-math">
          {employees} employees × 24 periods × 40% violation rate × ${mealPremiumGap.toFixed(2)} gap = <strong>{fmt(mealExposure)}</strong> additional exposure
        </div>
      </div>

      <div className="waterfall-cite">
        Ferra v. Loews (2021) 11 Cal.5th 858 · Alvarado v. Dart (2018) 4 Cal.5th 542 · Dealership compensation model shown
      </div>
    </div>
  );
}
