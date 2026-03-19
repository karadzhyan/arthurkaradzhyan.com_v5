"use client";
import { useState } from "react";

/*
  Statute of Limitations lookback zone diagram — deepened version.
  Additions:
  - Per-violation plaintiff overstatement calculation
  - Dollar impact column showing exposure difference between PAGA and underlying SOL
  - Interactive hover showing specific statutory authority
  - Plaintiff inflation percentage per violation type
  - Total overstatement summary
*/

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n).toLocaleString();
  return "$" + Math.round(n);
}

var violations = [
  {
    name: "Meal/Rest Period", code: "§ 226.7", paga: 1, underlying: 3, ucl: 4,
    color: "#dc3545", perUnit: 100, rate: 0.35,
    authority: "CCP § 340(a) (PAGA); CCP § 338(a) (wage claim)",
    overstatementNote: "Plaintiff claims 3 years of PAGA penalties but PAGA lookback is 1 year",
  },
  {
    name: "Overtime", code: "§ 510", paga: 1, underlying: 3, ucl: 4,
    color: "#CC8800", perUnit: 100, rate: 0.25,
    authority: "CCP § 340(a) (PAGA); CCP § 338(a) (wage claim)",
    overstatementNote: "OT wages recoverable for 3 years as wage claim, but PAGA penalties only 1 year",
  },
  {
    name: "Wage Statement", code: "§ 226", paga: 1, underlying: 1, ucl: null,
    color: "#2c3e3a", perUnit: 50, rate: 0.40,
    authority: "CCP § 340(a) (PAGA); Lab. Code § 226(e)(1)",
    overstatementNote: "Both PAGA and underlying SOL are 1 year — no overstatement on this claim",
  },
  {
    name: "Minimum Wage", code: "§ 1197.1", paga: 1, underlying: 3, ucl: 4,
    color: "#8B0000", perUnit: 100, rate: 0.10,
    authority: "CCP § 340(a) (PAGA); CCP § 338(a) (wage claim)",
    overstatementNote: "Specific penalty per § 1197.1 — 3-year claim but PAGA caps at 1 year",
  },
  {
    name: "Final Pay", code: "§ 203", paga: 1, underlying: 3, ucl: null,
    color: "#8aa39e", perUnit: 80, rate: 0.15,
    authority: "CCP § 340(a) (PAGA); CCP § 338(a)",
    overstatementNote: "Waiting time penalties: underlying 3-year SOL vs. PAGA 1-year lookback",
  },
  {
    name: "Expense Reimb.", code: "§ 2802", paga: 1, underlying: 3, ucl: 4,
    color: "#666", perUnit: 100, rate: 0.20,
    authority: "CCP § 340(a) (PAGA); CCP § 338(a)",
    overstatementNote: "Expense reimbursement — underlying 3 years, PAGA 1 year only",
  },
];

var illustrativeEmp = 50;
var illustrativePP = 26; // per year

export default function SOLZoneDiagram({ noticeDate }) {
  var [hoveredRow, setHoveredRow] = useState(-1);

  var w = 680;
  var rowH = 36;
  var padL = 120;
  var padR = 30;
  var padT = 40;
  var h = padT + violations.length * (rowH + 6) + 50;
  var barW = w - padL - padR;
  var maxYears = 4;

  function yearToX(years) {
    return padL + (years / maxYears) * barW;
  }

  // Calculate overstatement totals
  var totalPAGA = 0;
  var totalUnderlying = 0;
  violations.forEach(function (v) {
    var pagaAmt = illustrativeEmp * illustrativePP * v.paga * v.rate * v.perUnit;
    var underlyingAmt = illustrativeEmp * illustrativePP * v.underlying * v.rate * v.perUnit;
    totalPAGA += pagaAmt;
    totalUnderlying += underlyingAmt;
  });
  var overstatementPct = totalPAGA > 0 ? Math.round(((totalUnderlying - totalPAGA) / totalPAGA) * 100) : 0;

  return (
    <div style={{
      padding: "20px 16px 16px",
      background: "#fafafa",
      border: "1px solid #eee",
      marginBottom: 16,
    }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 4 }}>
        Lookback Zones
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginBottom: 12, lineHeight: 1.5 }}>
        PAGA covers only 1 year. The underlying wage claim may cover 3 years. A plaintiff demanding 3 years of penalties is inflating by ~{overstatementPct}%. Hover any violation for statutory authority.
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          {/* Year markers */}
          {[0, 1, 2, 3, 4].map(function (yr) {
            var x = yearToX(yr);
            return (
              <g key={yr}>
                <line x1={x} y1={padT - 5} x2={x} y2={h - 38} stroke="#eee" strokeWidth={1} />
                <text x={x} y={padT - 12} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#999" }}>
                  {yr === 0 ? "Notice" : yr + " yr"}
                </text>
              </g>
            );
          })}

          {/* PAGA zone highlight */}
          <rect x={yearToX(0)} y={padT - 5} width={yearToX(1) - yearToX(0)} height={h - padT - 33}
            fill="#2c3e3a" fillOpacity={0.04} />
          <text x={yearToX(0.5)} y={h - 22} textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 600, fill: "#2c3e3a", letterSpacing: 1 }}>
            PAGA ZONE (1 YEAR)
          </text>

          {/* Overstatement zone highlight */}
          <rect x={yearToX(1)} y={padT - 5} width={yearToX(3) - yearToX(1)} height={h - padT - 33}
            fill="#dc3545" fillOpacity={0.02} />
          <text x={yearToX(2)} y={h - 22} textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 600, fill: "#dc3545", letterSpacing: 1 }}>
            PLAINTIFF OVERSTATEMENT ZONE
          </text>

          {/* Violation rows */}
          {violations.map(function (v, i) {
            var y = padT + i * (rowH + 6);
            var pagaW = yearToX(v.paga) - padL;
            var underlyingW = yearToX(v.underlying) - padL;
            var uclW = v.ucl ? yearToX(v.ucl) - padL : 0;
            var isHovered = hoveredRow === i;

            // Dollar calculations
            var pagaAmt = illustrativeEmp * illustrativePP * v.paga * v.rate * v.perUnit;
            var underlyingAmt = illustrativeEmp * illustrativePP * v.underlying * v.rate * v.perUnit;
            var overstatement = underlyingAmt - pagaAmt;
            var overPct = pagaAmt > 0 ? Math.round((overstatement / pagaAmt) * 100) : 0;

            return (
              <g key={i}
                onMouseEnter={function () { setHoveredRow(i); }}
                onMouseLeave={function () { setHoveredRow(-1); }}
                style={{ cursor: "pointer" }}>

                {/* Row highlight on hover */}
                {isHovered && (
                  <rect x={0} y={y} width={w} height={rowH} fill="#f0f0f0" rx={2} />
                )}

                {/* Label */}
                <text x={padL - 8} y={y + rowH / 2 - 2} textAnchor="end"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: isHovered ? v.color : "#555" }}>
                  {v.name}
                </text>
                <text x={padL - 8} y={y + rowH / 2 + 9} textAnchor="end"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#bbb" }}>
                  {v.code}
                </text>

                {/* UCL bar (lightest, full width) */}
                {uclW > 0 && (
                  <rect x={padL} y={y + 4} width={uclW} height={rowH - 8} rx={3}
                    fill={v.color + "10"} stroke={v.color + "20"} strokeWidth={0.5} />
                )}

                {/* Underlying wage claim bar (medium) */}
                <rect x={padL} y={y + 4} width={underlyingW} height={rowH - 8} rx={3}
                  fill={v.color + "25"} stroke={v.color + "30"} strokeWidth={0.5} />

                {/* PAGA bar (darkest) */}
                <rect x={padL} y={y + 4} width={pagaW} height={rowH - 8} rx={3}
                  fill={v.color + "60"} stroke={v.color} strokeWidth={1} />

                {/* PAGA dollar amount inside bar */}
                <text x={padL + pagaW / 2} y={y + rowH / 2 + 1} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 600, fill: "#fff" }}>
                  {fmt(pagaAmt)}
                </text>

                {/* Overstatement amount (if exists) */}
                {overstatement > 0 && (
                  <text x={padL + underlyingW + 6} y={y + rowH / 2 + 1} textAnchor="start"
                    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 600, fill: "#dc3545" }}>
                    +{fmt(overstatement)} ({overPct}% inflation)
                  </text>
                )}
                {overstatement === 0 && (
                  <text x={padL + underlyingW + 6} y={y + rowH / 2 + 1} textAnchor="start"
                    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#198754" }}>
                    No overstatement
                  </text>
                )}
              </g>
            );
          })}

          {/* Legend */}
          <g>
            {[
              { label: "PAGA (1 yr)", opacity: "60" },
              { label: "Wage Claim (1-3 yr)", opacity: "25" },
              { label: "UCL (4 yr)", opacity: "10" },
            ].map(function (item, i) {
              var lx = padL + i * 130;
              return (
                <g key={i}>
                  <rect x={lx} y={h - 38} width={12} height={8} rx={1} fill={"#2c3e3a" + item.opacity} stroke="#2c3e3a30" strokeWidth={0.5} />
                  <text x={lx + 16} y={h - 31} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#999" }}>
                    {item.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Hover detail panel */}
      {hoveredRow >= 0 && violations[hoveredRow] && (
        <div style={{
          marginTop: 8,
          padding: "8px 12px",
          background: "#fff",
          border: "1px solid #e0e0e0",
          borderLeft: "3px solid " + violations[hoveredRow].color,
          fontSize: 10,
          fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ fontWeight: 600, color: violations[hoveredRow].color, marginBottom: 2 }}>
            {violations[hoveredRow].name} ({violations[hoveredRow].code})
          </div>
          <div style={{ fontSize: 9, color: "#999", marginBottom: 4 }}>
            {violations[hoveredRow].authority}
          </div>
          <div style={{ fontSize: 10, color: "#555", lineHeight: 1.5 }}>
            {violations[hoveredRow].overstatementNote}
          </div>
        </div>
      )}

      {/* Total overstatement summary */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 32,
        marginTop: 12,
        padding: "10px 0",
        borderTop: "1px solid #eee",
        flexWrap: "wrap",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#2c3e3a", letterSpacing: 2, textTransform: "uppercase" }}>PAGA-Authorized (1 yr)</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#2c3e3a" }}>{fmt(totalPAGA)}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#dc3545", letterSpacing: 2, textTransform: "uppercase" }}>Plaintiff's 3-yr Demand</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#dc3545" }}>{fmt(totalUnderlying)}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#CC8800", letterSpacing: 2, textTransform: "uppercase" }}>SOL Overstatement</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#CC8800" }}>{overstatementPct}%</div>
        </div>
      </div>
    </div>
  );
}
