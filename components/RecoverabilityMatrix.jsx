"use client";

export default function RecoverabilityMatrix() {
  var categories = [
    {
      violation: "Meal Period Violation",
      statute: "§ 226.7",
      premium: { recoverable: false, label: "Wage", amount: "1 hr × regular rate" },
      pagaPenalty: { recoverable: true, label: "§ 2699(f)(2)", amount: "$100 / $200" },
      wageStmt: { recoverable: true, label: "§ 226(e)", amount: "$50 / $100" },
      waitTime: { recoverable: true, label: "§ 203", amount: "Up to 30 days" },
      note: "Kirby + Naranjo"
    },
    {
      violation: "Rest Period Violation",
      statute: "§ 226.7",
      premium: { recoverable: false, label: "Wage", amount: "1 hr × regular rate" },
      pagaPenalty: { recoverable: true, label: "§ 2699(f)(2)", amount: "$100 / $200" },
      wageStmt: { recoverable: true, label: "§ 226(e)", amount: "$50 / $100" },
      waitTime: { recoverable: true, label: "§ 203", amount: "Up to 30 days" },
      note: "Kirby + Naranjo"
    },
    {
      violation: "Overtime Underpayment",
      statute: "§ 510",
      premium: { recoverable: false, label: "Wage", amount: "OT differential" },
      pagaPenalty: { recoverable: true, label: "§ 558(a)", amount: "$50 / $100" },
      wageStmt: { recoverable: true, label: "§ 226(e)", amount: "$50 / $100" },
      waitTime: { recoverable: true, label: "§ 203", amount: "Up to 30 days" },
      note: "ZB, N.A. — wage portion stripped"
    },
    {
      violation: "Minimum Wage",
      statute: "§ 1197",
      premium: { recoverable: false, label: "Wage", amount: "Differential" },
      pagaPenalty: { recoverable: true, label: "§ 1197.1", amount: "$100 / $250" },
      wageStmt: { recoverable: true, label: "§ 226(e)", amount: "$50 / $100" },
      waitTime: { recoverable: true, label: "§ 203", amount: "Up to 30 days" },
      note: "Specific penalty statute"
    },
    {
      violation: "Wage Statement",
      statute: "§ 226(a)",
      premium: { recoverable: false, label: "N/A", amount: "—" },
      pagaPenalty: { recoverable: true, label: "§ 226(e)", amount: "$50 / $100" },
      wageStmt: { recoverable: false, label: "Same", amount: "—" },
      waitTime: { recoverable: false, label: "N/A", amount: "—" },
      note: "Standalone — no cascade"
    },
    {
      violation: "Unreimbursed Expenses",
      statute: "§ 2802",
      premium: { recoverable: false, label: "Wage", amount: "Actual amount" },
      pagaPenalty: { recoverable: true, label: "§ 2699(f)(2)", amount: "$100 / $200" },
      wageStmt: { recoverable: false, label: "N/A", amount: "—" },
      waitTime: { recoverable: false, label: "N/A", amount: "—" },
      note: "Reimbursement is not a penalty"
    }
  ];

  return (
    <div className="recover-matrix">
      <div className="recover-matrix-scroll">
        <table className="recover-matrix-table">
          <thead>
            <tr>
              <th className="recover-th recover-th-violation">Violation</th>
              <th className="recover-th">Underlying Remedy</th>
              <th className="recover-th">PAGA Penalty</th>
              <th className="recover-th">Wage Stmt Derivative</th>
              <th className="recover-th">Waiting Time Derivative</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(function (cat, i) {
              return (
                <tr key={i} className="recover-row">
                  <td className="recover-td recover-td-violation">
                    <div className="recover-violation-name">{cat.violation}</div>
                    <div className="recover-violation-statute">{cat.statute}</div>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="recover-matrix-legend">
        <div className="recover-legend-item">
          <span className="recover-legend-swatch" style={{ background: "rgba(44,62,58,.08)" }} />
          <span className="recover-legend-label">Recoverable as PAGA penalty</span>
        </div>
        <div className="recover-legend-item">
          <span className="recover-legend-swatch" style={{ background: "rgba(220,53,69,.06)" }} />
          <span className="recover-legend-label">Not recoverable — wage, not penalty (ZB, N.A.)</span>
        </div>
      </div>
      <div className="recover-matrix-cite">
        ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175 · Kirby v. Immoos (2012) 53 Cal.4th 1244 · Naranjo v. Spectrum (2022) 13 Cal.5th 93
      </div>
    </div>
  );
}
