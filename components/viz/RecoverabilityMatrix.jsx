"use client";
import { useState, useEffect, useRef } from "react";

/*
  Recoverability Classification Matrix.
  Shows which penalty categories are recoverable through PAGA vs. class action.
  Per ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175 and
  Kirby v. Immoos (2012) 53 Cal.4th 1244.
*/

var categories = [
  {
    violation: "Meal/Rest Period Premium",
    code: "§ 226.7",
    isWage: true,
    isPAGAPenalty: false,
    pagaRecoverable: "Partial",
    classRecoverable: true,
    derivative: true,
    note: "Premium is a WAGE (Kirby). Not a PAGA penalty. But triggers § 2699(f)(2) default penalty.",
  },
  {
    violation: "Overtime Underpayment",
    code: "§ 510",
    isWage: true,
    isPAGAPenalty: false,
    pagaRecoverable: "No",
    classRecoverable: true,
    derivative: true,
    note: "Wage recovery only through direct claim or UCL. PAGA default penalty applies separately.",
  },
  {
    violation: "Wage Statement Deficiency",
    code: "§ 226(a)/(e)",
    isWage: false,
    isPAGAPenalty: true,
    pagaRecoverable: "Yes",
    classRecoverable: false,
    derivative: false,
    note: "Specific penalty: $50 initial / $100 subsequent. Recoverable through PAGA.",
  },
  {
    violation: "Waiting Time Penalty",
    code: "§ 203",
    isWage: false,
    isPAGAPenalty: true,
    pagaRecoverable: "Disputed",
    classRecoverable: true,
    derivative: false,
    note: "Up to 30 days' wages. Disputed whether PAGA-recoverable or individual claim only.",
  },
  {
    violation: "Minimum Wage Violation",
    code: "§ 1197.1",
    isWage: true,
    isPAGAPenalty: true,
    pagaRecoverable: "Yes",
    classRecoverable: true,
    derivative: false,
    note: "Specific penalty: $100 initial / $250 subsequent + underpaid wages.",
  },
  {
    violation: "Expense Reimbursement",
    code: "§ 2802",
    isWage: false,
    isPAGAPenalty: false,
    pagaRecoverable: "Partial",
    classRecoverable: true,
    derivative: false,
    note: "Unreimbursed amount is not a penalty. PAGA default penalty applies.",
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

export default function RecoverabilityMatrix() {
  var [visible, setVisible] = useState(false);
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
        Not every penalty category is recoverable through PAGA. The distinction between wages and penalties determines the recovery path.
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600, fontFamily: "'Outfit', sans-serif" }}>
          <thead>
            <tr>
              <th style={{ padding: "8px 12px", textAlign: "left", fontSize: 9, fontWeight: 600, color: "#999", letterSpacing: 1, textTransform: "uppercase", borderBottom: "2px solid #2c3e3a", width: 180 }}>
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
            </tr>
          </thead>
          <tbody>
            {categories.map(function (cat, i) {
              return (
                <tr key={i}>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0f0" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#333" }}>{cat.violation}</div>
                    <div style={{ fontSize: 9, color: "#999" }}>{cat.code}</div>
                  </td>
                  {columns.map(function (col) {
                    return (
                      <td key={col.key} style={{ padding: "10px 8px", borderBottom: "1px solid #f0f0f0", textAlign: "center" }}>
                        <StatusCell value={cat[col.key]} />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
        Per ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175; Kirby v. Immoos (2012) 53 Cal.4th 1244; Naranjo v. Spectrum Security (2022) 13 Cal.5th 93
      </div>
    </div>
  );
}
