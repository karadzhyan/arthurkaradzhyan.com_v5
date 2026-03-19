"use client";

export default function RecoverabilityMatrix() {
  var employees = 200;
  var periods = 24;
  var rate = 0.40;
  var instances = Math.round(employees * periods * rate);
  var separatedEmp = Math.round(employees * 0.35);
  var rr = 26.70;
  var dailyWage = rr * 8;

  var categories = [
    {
      violation: "Meal Period",
      statute: "§ 226.7",
      plaintiffIncludes: rr * instances,
      correctPaga: employees * 100 + (instances - employees) * 200,
      premium: { recoverable: false, label: "Wage", amount: "1 hr × $" + rr.toFixed(2) },
      pagaPenalty: { recoverable: true, label: "§ 2699(f)(2)", amount: "$100 / $200" },
      wageStmt: { recoverable: true, label: "§ 226(e)", amount: "$50 / $100" },
      waitTime: { recoverable: true, label: "§ 203", amount: "Up to 30 days" },
      authority: "Kirby + Naranjo"
    },
    {
      violation: "Rest Period",
      statute: "§ 226.7",
      plaintiffIncludes: rr * instances * 0.75,
      correctPaga: employees * 100 + Math.round(instances * 0.75 - employees) * 200,
      premium: { recoverable: false, label: "Wage", amount: "1 hr × $" + rr.toFixed(2) },
      pagaPenalty: { recoverable: true, label: "§ 2699(f)(2)", amount: "$100 / $200" },
      wageStmt: { recoverable: true, label: "§ 226(e)", amount: "$50 / $100" },
      waitTime: { recoverable: true, label: "§ 203", amount: "Up to 30 days" },
      authority: "Kirby + Naranjo"
    },
    {
      violation: "Overtime",
      statute: "§ 510",
      plaintiffIncludes: (rr - 18) * 0.5 * 10 * 52 * employees,
      correctPaga: employees * 50 + (instances - employees) * 100,
      premium: { recoverable: false, label: "Wage", amount: "OT differential" },
      pagaPenalty: { recoverable: true, label: "§ 558(a)", amount: "$50 / $100" },
      wageStmt: { recoverable: true, label: "§ 226(e)", amount: "$50 / $100" },
      waitTime: { recoverable: true, label: "§ 203", amount: "Up to 30 days" },
      authority: "ZB, N.A. — wage stripped"
    },
    {
      violation: "Minimum Wage",
      statute: "§ 1197",
      plaintiffIncludes: 120000,
      correctPaga: employees * 100 + (instances - employees) * 250,
      premium: { recoverable: false, label: "Wage", amount: "Differential" },
      pagaPenalty: { recoverable: true, label: "§ 1197.1", amount: "$100 / $250" },
      wageStmt: { recoverable: true, label: "§ 226(e)", amount: "$50 / $100" },
      waitTime: { recoverable: true, label: "§ 203", amount: "Up to 30 days" },
      authority: "Specific penalty statute"
    },
    {
      violation: "Wage Statement",
      statute: "§ 226(a)",
      plaintiffIncludes: Math.min(employees * 4000, 800000),
      correctPaga: Math.min(employees * 4000, 800000),
      premium: { recoverable: false, label: "N/A", amount: "—" },
      pagaPenalty: { recoverable: true, label: "§ 226(e)", amount: "$50 / $100" },
      wageStmt: { recoverable: false, label: "Same", amount: "—" },
      waitTime: { recoverable: false, label: "N/A", amount: "—" },
      authority: "Standalone — no cascade"
    },
    {
      violation: "Expenses",
      statute: "§ 2802",
      plaintiffIncludes: employees * 50 * periods,
      correctPaga: employees * 100 + (instances - employees) * 200,
      premium: { recoverable: false, label: "Wage", amount: "Actual amount" },
      pagaPenalty: { recoverable: true, label: "§ 2699(f)(2)", amount: "$100 / $200" },
      wageStmt: { recoverable: false, label: "N/A", amount: "—" },
      waitTime: { recoverable: false, label: "N/A", amount: "—" },
      authority: "Reimbursement ≠ penalty"
    }
  ];

  var totalPlaintiff = categories.reduce(function (s, c) { return s + c.plaintiffIncludes; }, 0);
  var totalCorrect = categories.reduce(function (s, c) { return s + c.correctPaga; }, 0);
  var totalStripped = totalPlaintiff - totalCorrect;
  var pctStripped = Math.round(totalStripped / totalPlaintiff * 100);

  function fmt(n) {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return "$" + Math.round(n / 1000) + "K";
    return "$" + Math.round(n);
  }

  return (
    <div className="recover-matrix">
      <div className="recover-matrix-scroll">
        <table className="recover-matrix-table">
          <thead>
            <tr>
              <th className="recover-th recover-th-violation">Violation</th>
              <th className="recover-th">Underlying Remedy</th>
              <th className="recover-th">PAGA Penalty</th>
              <th className="recover-th">Wage Stmt</th>
              <th className="recover-th">Wait Time</th>
              <th className="recover-th recover-th-num">Plaintiff Demand</th>
              <th className="recover-th recover-th-num">Correct PAGA</th>
              <th className="recover-th recover-th-num">Stripped</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(function (cat, i) {
              var stripped = cat.plaintiffIncludes - cat.correctPaga;
              var pct = cat.plaintiffIncludes > 0 ? Math.round(stripped / cat.plaintiffIncludes * 100) : 0;
              return (
                <tr key={i} className="recover-row">
                  <td className="recover-td recover-td-violation">
                    <div className="recover-violation-name">{cat.violation}</div>
                    <div className="recover-violation-statute">{cat.statute}</div>
                    <div className="recover-violation-auth">{cat.authority}</div>
                  </td>
                  {[cat.premium, cat.pagaPenalty, cat.wageStmt, cat.waitTime].map(function (cell, j) {
                    return (
                      <td key={j} className={"recover-td" + (cell.recoverable ? " recover-yes" : " recover-no")}>
                        <div className="recover-cell-indicator">
                          {cell.label === "N/A" || cell.label === "Same" ? (
                            <span className="recover-cell-na">{cell.label}</span>
                          ) : cell.recoverable ? (
                            <span className="recover-cell-check">PAGA</span>
                          ) : (
                            <span className="recover-cell-x">NOT PAGA</span>
                          )}
                        </div>
                        <div className="recover-cell-amount">{cell.amount}</div>
                      </td>
                    );
                  })}
                  <td className="recover-td recover-td-num" style={{ color: "#dc3545" }}>{fmt(cat.plaintiffIncludes)}</td>
                  <td className="recover-td recover-td-num" style={{ color: "#2c3e3a" }}>{fmt(cat.correctPaga)}</td>
                  <td className="recover-td recover-td-num">
                    {stripped > 0 ? (
                      <span className="recover-stripped-badge">{pct}%</span>
                    ) : (
                      <span style={{ color: "#ccc" }}>0%</span>
                    )}
                  </td>
                </tr>
              );
            })}
            <tr className="recover-row recover-row-total">
              <td className="recover-td recover-td-violation" style={{ fontWeight: 700 }}>Total</td>
              <td className="recover-td" colSpan="4" />
              <td className="recover-td recover-td-num" style={{ color: "#dc3545", fontWeight: 700 }}>{fmt(totalPlaintiff)}</td>
              <td className="recover-td recover-td-num" style={{ color: "#2c3e3a", fontWeight: 700 }}>{fmt(totalCorrect)}</td>
              <td className="recover-td recover-td-num">
                <span className="recover-stripped-badge" style={{ fontWeight: 700 }}>{pctStripped}%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="recover-matrix-summary">
        <div className="recover-summary-item">
          <div className="recover-summary-label">Plaintiff&apos;s Demand</div>
          <div className="recover-summary-num" style={{ color: "#dc3545" }}>{fmt(totalPlaintiff)}</div>
        </div>
        <div className="recover-summary-arrow">→</div>
        <div className="recover-summary-item">
          <div className="recover-summary-label">Non-Recoverable Stripped</div>
          <div className="recover-summary-num" style={{ color: "#CC8800" }}>−{fmt(totalStripped)}</div>
        </div>
        <div className="recover-summary-arrow">→</div>
        <div className="recover-summary-item">
          <div className="recover-summary-label">Correct PAGA Exposure</div>
          <div className="recover-summary-num" style={{ color: "#2c3e3a" }}>{fmt(totalCorrect)}</div>
        </div>
      </div>

      <div className="recover-matrix-legend">
        <div className="recover-legend-item">
          <span className="recover-legend-swatch" style={{ background: "rgba(44,62,58,.08)" }} />
          <span className="recover-legend-label">Recoverable as PAGA penalty — civil penalty authorized by statute</span>
        </div>
        <div className="recover-legend-item">
          <span className="recover-legend-swatch" style={{ background: "rgba(220,53,69,.06)" }} />
          <span className="recover-legend-label">Not recoverable — wage or damages remedy, not a civil penalty</span>
        </div>
      </div>
      <div className="recover-matrix-cite">
        ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175 · Kirby v. Immoos (2012) 53 Cal.4th 1244 · Naranjo v. Spectrum (2022) 13 Cal.5th 93
      </div>
    </div>
  );
}
