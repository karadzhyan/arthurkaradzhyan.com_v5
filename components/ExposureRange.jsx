"use client";

export default function ExposureRange() {
  var scenarios = [
    {
      label: "Plaintiff's Demand",
      amount: "$4.2M",
      width: 100,
      color: "#dc3545",
      detail: "All categories at maximum rates, no recoverability analysis"
    },
    {
      label: "Adjusted Exposure",
      amount: "$1.1M",
      width: 26,
      color: "#CC8800",
      detail: "Non-recoverable categories stripped (ZB, N.A.), violation rates corrected"
    },
    {
      label: "Defense Position",
      amount: "$380K",
      width: 9,
      color: "#2c3e3a",
      detail: "Cure proposal + penalty cap (§ 2699.3) + temporal bifurcation applied"
    }
  ];

  var reductions = [
    { label: "Strip non-recoverable categories", ref: "ZB, N.A. v. Superior Court", pct: "−40%" },
    { label: "Correct violation rates from actuals", ref: "Duran sampling methodology", pct: "−25%" },
    { label: "Apply temporal bifurcation", ref: "\"Two Hotels\" framework", pct: "−35%" },
    { label: "Qualify for penalty cap", ref: "AB 2288, § 2699.3(b)", pct: "−15%" }
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
            </div>
          );
        })}
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
              </div>
            </div>
          );
        })}
      </div>

      <div className="exposure-note">
        Illustrative model · 200-employee workforce · 24-month PAGA period · 6 violation categories
      </div>
    </div>
  );
}
