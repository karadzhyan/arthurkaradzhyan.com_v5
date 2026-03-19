"use client";

export default function ExposureRange() {
  var categories = [
    { name: "Meal Period (§ 226.7)", plaintiff: 512640, adjusted: 384000, defense: 115200 },
    { name: "Rest Period (§ 226.7)", plaintiff: 384480, adjusted: 192000, defense: 57600 },
    { name: "Overtime / Regular Rate", plaintiff: 936000, adjusted: 187200, defense: 56160 },
    { name: "Wage Statement (§ 226)", plaintiff: 800000, adjusted: 160000, defense: 48000 },
    { name: "Waiting Time (§ 203)", plaintiff: 1345680, adjusted: 134568, defense: 80741 },
    { name: "Unreimbursed Expenses (§ 2802)", plaintiff: 221200, adjusted: 42240, defense: 22272 }
  ];

  var plaintiffTotal = categories.reduce(function (s, c) { return s + c.plaintiff; }, 0);
  var adjustedTotal = categories.reduce(function (s, c) { return s + c.adjusted; }, 0);
  var defenseTotal = categories.reduce(function (s, c) { return s + c.defense; }, 0);

  function fmt(n) {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return "$" + Math.round(n / 1000) + "K";
    return "$" + Math.round(n);
  }

  var scenarios = [
    {
      label: "Plaintiff's Demand",
      amount: fmt(plaintiffTotal),
      raw: plaintiffTotal,
      width: 100,
      color: "#dc3545",
      detail: "All categories at maximum rates, wages included as penalties, no Duran correction"
    },
    {
      label: "Adjusted Exposure",
      amount: fmt(adjustedTotal),
      raw: adjustedTotal,
      width: Math.round(adjustedTotal / plaintiffTotal * 100),
      color: "#CC8800",
      detail: "Non-recoverable categories stripped (ZB, N.A.), violation rates corrected to actuals"
    },
    {
      label: "Defense Position",
      amount: fmt(defenseTotal),
      raw: defenseTotal,
      width: Math.round(defenseTotal / plaintiffTotal * 100),
      color: "#2c3e3a",
      detail: "Cure proposal + penalty cap (§ 2699.3) + temporal bifurcation applied"
    }
  ];

  var reductions = [
    { label: "Strip non-recoverable categories", ref: "ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175", pct: "−" + fmt(plaintiffTotal - adjustedTotal), pctLabel: Math.round((1 - adjustedTotal / plaintiffTotal) * 100) + "% of demand" },
    { label: "Correct violation rates from actual data", ref: "Duran v. U.S. Bank (2014) 59 Cal.4th 1", pct: "−" + fmt(Math.round((adjustedTotal - defenseTotal) * 0.35)), pctLabel: "Sampling methodology" },
    { label: "Apply temporal bifurcation", ref: "\"Two Hotels\" framework — Legacy vs. Remedied periods", pct: "−" + fmt(Math.round((adjustedTotal - defenseTotal) * 0.40)), pctLabel: "Remediation credit" },
    { label: "Qualify for 15% penalty cap", ref: "AB 2288, Lab. Code § 2699(g)", pct: "−" + fmt(Math.round((adjustedTotal - defenseTotal) * 0.25)), pctLabel: "Pre-notice compliance" }
  ];

  return (
    <div className="exposure-wrap">
      <div className="exposure-chart">
        {scenarios.map(function (s, i) {
          return (
            <div key={i} className="exposure-row">
              <div className="exposure-row-header">
                <div className="exposure-row-label">{s.label}</div>
                <div className="exposure-row-amount" style={{ color: s.color }}>{s.amount}</div>
              </div>
              <div className="exposure-bar-track">
                <div
                  className="exposure-bar-fill"
                  style={{ width: s.width + "%", background: s.color }}
                />
              </div>
              <div className="exposure-row-detail">{s.detail}</div>
              {i < scenarios.length - 1 && (
                <div className="exposure-row-delta">
                  ↓ −{fmt(s.raw - scenarios[i + 1].raw)} ({Math.round((1 - scenarios[i + 1].raw / s.raw) * 100)}% reduction)
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="exposure-breakdown">
        <div className="exposure-breakdown-title">Per-Category Breakdown</div>
        <div className="exposure-breakdown-scroll">
          <table className="exposure-breakdown-table">
            <thead>
              <tr>
                <th className="exposure-bt-th">Category</th>
                <th className="exposure-bt-th exposure-bt-right">Plaintiff</th>
                <th className="exposure-bt-th exposure-bt-right">Adjusted</th>
                <th className="exposure-bt-th exposure-bt-right">Defense</th>
                <th className="exposure-bt-th exposure-bt-right">Stripped</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(function (c, i) {
                var stripped = Math.round((1 - c.defense / c.plaintiff) * 100);
                return (
                  <tr key={i} className="exposure-bt-row">
                    <td className="exposure-bt-td exposure-bt-name">{c.name}</td>
                    <td className="exposure-bt-td exposure-bt-right" style={{ color: "#dc3545" }}>{fmt(c.plaintiff)}</td>
                    <td className="exposure-bt-td exposure-bt-right" style={{ color: "#CC8800" }}>{fmt(c.adjusted)}</td>
                    <td className="exposure-bt-td exposure-bt-right" style={{ color: "#2c3e3a" }}>{fmt(c.defense)}</td>
                    <td className="exposure-bt-td exposure-bt-right">
                      <span className="exposure-bt-stripped">{stripped}%</span>
                    </td>
                  </tr>
                );
              })}
              <tr className="exposure-bt-row exposure-bt-total">
                <td className="exposure-bt-td exposure-bt-name">Total</td>
                <td className="exposure-bt-td exposure-bt-right" style={{ color: "#dc3545", fontWeight: 700 }}>{fmt(plaintiffTotal)}</td>
                <td className="exposure-bt-td exposure-bt-right" style={{ color: "#CC8800", fontWeight: 700 }}>{fmt(adjustedTotal)}</td>
                <td className="exposure-bt-td exposure-bt-right" style={{ color: "#2c3e3a", fontWeight: 700 }}>{fmt(defenseTotal)}</td>
                <td className="exposure-bt-td exposure-bt-right">
                  <span className="exposure-bt-stripped" style={{ fontWeight: 700 }}>{Math.round((1 - defenseTotal / plaintiffTotal) * 100)}%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="exposure-reductions">
        <div className="exposure-reductions-title">Analytical Reductions Applied</div>
        {reductions.map(function (r, i) {
          return (
            <div key={i} className="exposure-reduction">
              <div className="exposure-reduction-pct">{r.pct}</div>
              <div className="exposure-reduction-body">
                <div className="exposure-reduction-label">{r.label}</div>
                <div className="exposure-reduction-ref">{r.ref}</div>
                <div className="exposure-reduction-pct-label">{r.pctLabel}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="exposure-note">
        Illustrative model · 200-employee workforce · 24-month PAGA period · 6 violation categories · 40% violation rate assumption
      </div>
    </div>
  );
}
