"use client";
import { useState, useEffect, useRef } from "react";

/*
  Recoverability Classification Matrix — deepened version.
  Per ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175 and Kirby v. Immoos (2012) 53 Cal.4th 1244.
  Additions:
  - Expandable notes row with case law citation and defense implication
  - Dollar impact per category (illustrative 50 emp × 26 pp)
  - Demand inflation calculation showing plaintiff overstatement
  - Visual recoverability path indicators
*/

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n).toLocaleString();
  return "$" + Math.round(n);
}

var categories = [
  {
    violation: "Meal/Rest Period Premium",
    code: "§ 226.7",
    isWage: true,
    isPAGAPenalty: false,
    pagaRecoverable: "Partial",
    classRecoverable: true,
    derivative: true,
    perUnit: 25,
    plaintiffPerUnit: 200,
    rate: 0.35,
    note: "Premium is a WAGE (Kirby). Not a PAGA penalty. But triggers § 2699(f)(2) default penalty.",
    authority: "Kirby v. Immoos (2012) 53 Cal.4th 1244",
    defenseImplication: "Strip the premium from the PAGA demand — it's a wage, recoverable only through direct action or class. The PAGA default penalty ($100) applies, not the $200 subsequent penalty.",
  },
  {
    violation: "Overtime Underpayment",
    code: "§ 510",
    isWage: true,
    isPAGAPenalty: false,
    pagaRecoverable: "No",
    classRecoverable: true,
    derivative: true,
    perUnit: 18,
    plaintiffPerUnit: 200,
    rate: 0.25,
    note: "Wage recovery only through direct claim or UCL. PAGA default penalty applies separately.",
    authority: "ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175",
    defenseImplication: "OT wages are not recoverable through PAGA — only penalties. Plaintiff's demand combining wage underpayments with PAGA penalties double-counts.",
  },
  {
    violation: "Wage Statement Deficiency",
    code: "§ 226(a)/(e)",
    isWage: false,
    isPAGAPenalty: true,
    pagaRecoverable: "Yes",
    classRecoverable: false,
    derivative: false,
    perUnit: 50,
    plaintiffPerUnit: 100,
    rate: 0.40,
    note: "Specific penalty: $50 initial / $100 subsequent. Recoverable through PAGA.",
    authority: "Lab. Code § 226(e)(1)-(2)",
    defenseImplication: "Post-reform: derivative § 226 claims require scienter (knowing/intentional). Absent scienter proof, this stream collapses.",
  },
  {
    violation: "Waiting Time Penalty",
    code: "§ 203",
    isWage: false,
    isPAGAPenalty: true,
    pagaRecoverable: "Disputed",
    classRecoverable: true,
    derivative: false,
    perUnit: 80,
    plaintiffPerUnit: 320,
    rate: 0.15,
    note: "Up to 30 days' wages. Disputed whether PAGA-recoverable or individual claim only.",
    authority: "Disputed — no controlling authority",
    defenseImplication: "Argue § 203 is a penalty for the individual employee, not a civil penalty recoverable under PAGA. Multiple Districts have not resolved this split.",
  },
  {
    violation: "Minimum Wage Violation",
    code: "§ 1197.1",
    isWage: true,
    isPAGAPenalty: true,
    pagaRecoverable: "Yes",
    classRecoverable: true,
    derivative: false,
    perUnit: 100,
    plaintiffPerUnit: 250,
    rate: 0.10,
    note: "Specific penalty: $100 initial / $250 subsequent + underpaid wages.",
    authority: "Lab. Code § 1197.1(a)-(b)",
    defenseImplication: "Specific penalty statute — § 2699(f)(2) default does not apply. Cap the penalty at the statutory amount rather than the $200 default.",
  },
  {
    violation: "Expense Reimbursement",
    code: "§ 2802",
    isWage: false,
    isPAGAPenalty: false,
    pagaRecoverable: "Partial",
    classRecoverable: true,
    derivative: false,
    perUnit: 0,
    plaintiffPerUnit: 200,
    rate: 0.20,
    note: "Unreimbursed amount is not a penalty. PAGA default penalty applies.",
    authority: "Gattuso v. Harte-Hanks Shoppers (2007) 42 Cal.4th 554",
    defenseImplication: "The unreimbursed expense itself is a wage — not recoverable through PAGA. Only the $100 default penalty is PAGA-recoverable. Strip the reimbursement amount from the demand.",
  },
];

var statusColors = {
  "Yes": "#198754",
  "No": "#dc3545",
  "Partial": "#CC8800",
  "Disputed": "#8B0000",
};

function StatusCell({ value }) {
  if (typeof value === "boolean") {
    return (
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 9,
        fontWeight: 600,
        color: value ? "#198754" : "#dc3545",
        textAlign: "center",
      }}>
        {value ? "YES" : "NO"}
      </div>
    );
  }
  return (
    <div style={{
      fontFamily: "'Outfit', sans-serif",
      fontSize: 9,
      fontWeight: 600,
      color: statusColors[value] || "#888",
      textAlign: "center",
    }}>
      {value.toUpperCase()}
    </div>
  );
}

var illustrativeEmp = 50;
var illustrativePP = 26;

export default function RecoverabilityMatrix() {
  var [visible, setVisible] = useState(false);
  var [expandedRow, setExpandedRow] = useState(-1);
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  var columns = [
    { key: "isWage", label: "Is It\na Wage?" },
    { key: "isPAGAPenalty", label: "PAGA\nPenalty?" },
    { key: "pagaRecoverable", label: "PAGA\nRecoverable?" },
    { key: "classRecoverable", label: "Class\nRecoverable?" },
    { key: "derivative", label: "Derivative\nExposure?" },
  ];

  // Calculate demand inflation totals
  var totalPlaintiff = 0;
  var totalCorrect = 0;
  categories.forEach(function (cat) {
    totalPlaintiff += illustrativeEmp * illustrativePP * cat.rate * cat.plaintiffPerUnit;
    totalCorrect += illustrativeEmp * illustrativePP * cat.rate * cat.perUnit;
  });
  var inflationPct = totalPlaintiff > 0 ? Math.round(((totalPlaintiff - totalCorrect) / totalCorrect) * 100) : 0;

  return (
    <div ref={ref} style={{
      background: "#fff",
      border: "1px solid #e0e0e0",
      padding: "32px 24px 20px",
      marginBottom: 32,
      position: "relative",
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #2c3e3a, #4a7a6f)" }} />

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 6 }}>
        Classification
      </div>
      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, color: "#333", marginBottom: 4, lineHeight: 1.4 }}>
        Penalty Recoverability Matrix
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginBottom: 20, lineHeight: 1.5 }}>
        Not every penalty category is recoverable through PAGA. The distinction between wages and penalties determines the recovery path. Click any row for the defense implication and governing authority.
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 650, fontFamily: "'Outfit', sans-serif" }}>
          <thead>
            <tr>
              <th style={{ padding: "8px 12px", textAlign: "left", fontSize: 9, fontWeight: 600, color: "#999", letterSpacing: 1, textTransform: "uppercase", borderBottom: "2px solid #2c3e3a", width: 160 }}>
                Category
              </th>
              {columns.map(function (col) {
                return (
                  <th key={col.key} style={{ padding: "8px 8px", textAlign: "center", fontSize: 9, fontWeight: 600, color: "#666", letterSpacing: 1, textTransform: "uppercase", borderBottom: "2px solid #2c3e3a", lineHeight: 1.3 }}>
                    {col.label.split("\n").map(function (line, i) {
                      return <span key={i}>{line}{i === 0 ? <br /> : null}</span>;
                    })}
                  </th>
                );
              })}
              <th style={{ padding: "8px 8px", textAlign: "center", fontSize: 9, fontWeight: 600, color: "#666", letterSpacing: 1, textTransform: "uppercase", borderBottom: "2px solid #2c3e3a", lineHeight: 1.3, width: 80 }}>
                Plaintiff<br />Demand
              </th>
              <th style={{ padding: "8px 8px", textAlign: "center", fontSize: 9, fontWeight: 600, color: "#666", letterSpacing: 1, textTransform: "uppercase", borderBottom: "2px solid #2c3e3a", lineHeight: 1.3, width: 80 }}>
                PAGA<br />Correct
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map(function (cat, i) {
              var plaintiffAmt = illustrativeEmp * illustrativePP * cat.rate * cat.plaintiffPerUnit;
              var correctAmt = illustrativeEmp * illustrativePP * cat.rate * cat.perUnit;
              var isExpanded = expandedRow === i;

              return [
                <tr key={i} onClick={function () { setExpandedRow(isExpanded ? -1 : i); }}
                  style={{ cursor: "pointer", background: isExpanded ? "#fafafa" : "transparent", transition: "background 0.2s ease" }}>
                  <td style={{ padding: "10px 12px", borderBottom: isExpanded ? "none" : "1px solid #f0f0f0" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#333" }}>{cat.violation}</div>
                    <div style={{ fontSize: 9, color: "#999" }}>{cat.code}</div>
                  </td>
                  {columns.map(function (col) {
                    return (
                      <td key={col.key} style={{ padding: "10px 8px", borderBottom: isExpanded ? "none" : "1px solid #f0f0f0", textAlign: "center" }}>
                        <StatusCell value={cat[col.key]} />
                      </td>
                    );
                  })}
                  <td style={{ padding: "10px 8px", borderBottom: isExpanded ? "none" : "1px solid #f0f0f0", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, color: "#dc3545" }}>
                      {fmt(plaintiffAmt)}
                    </div>
                  </td>
                  <td style={{ padding: "10px 8px", borderBottom: isExpanded ? "none" : "1px solid #f0f0f0", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, color: "#198754" }}>
                      {correctAmt > 0 ? fmt(correctAmt) : "—"}
                    </div>
                  </td>
                </tr>,
                isExpanded ? (
                  <tr key={i + "-detail"}>
                    <td colSpan={8} style={{ padding: "0 12px 12px", borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
                      <div style={{ padding: "8px 12px", borderLeft: "3px solid #2c3e3a", background: "#fff" }}>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, color: "#2c3e3a", letterSpacing: 1, marginBottom: 4 }}>
                          GOVERNING AUTHORITY
                        </div>
                        <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 11, color: "#555", fontStyle: "italic", marginBottom: 8 }}>
                          {cat.authority}
                        </div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, color: "#198754", letterSpacing: 1, marginBottom: 4 }}>
                          DEFENSE IMPLICATION
                        </div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#555", lineHeight: 1.6 }}>
                          {cat.defenseImplication}
                        </div>
                        {plaintiffAmt > correctAmt && correctAmt >= 0 && (
                          <div style={{ marginTop: 8, padding: "6px 8px", background: "#fef3f3", border: "1px solid #dc354520", borderRadius: 3 }}>
                            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, color: "#dc3545" }}>
                              Demand inflated by {fmt(plaintiffAmt - correctAmt)} ({correctAmt > 0 ? Math.round(((plaintiffAmt - correctAmt) / correctAmt) * 100) : "∞"}%)
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : null,
              ];
            })}
          </tbody>
        </table>
      </div>

      {/* Demand inflation summary */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 32,
        marginTop: 16,
        padding: "12px 0",
        borderTop: "1px solid #eee",
        flexWrap: "wrap",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#dc3545", letterSpacing: 2, textTransform: "uppercase" }}>Plaintiff's Total Demand</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#dc3545" }}>{fmt(totalPlaintiff)}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#198754", letterSpacing: 2, textTransform: "uppercase" }}>PAGA-Authorized Amount</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#198754" }}>{fmt(totalCorrect)}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#CC8800", letterSpacing: 2, textTransform: "uppercase" }}>Demand Inflation</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#CC8800" }}>{inflationPct}%</div>
        </div>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
        Per ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175; Kirby v. Immoos (2012) 53 Cal.4th 1244; Naranjo v. Spectrum Security (2022) 13 Cal.5th 93 · Illustrative: {illustrativeEmp} employees, {illustrativePP} pay periods
      </div>
    </div>
  );
}
