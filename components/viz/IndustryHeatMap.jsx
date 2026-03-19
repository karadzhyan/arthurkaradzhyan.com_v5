"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/*
  Cross-industry exposure heat map — deepened version.
  Additions:
  - Statutory citations per cell (tooltip-accessible)
  - Estimated annual exposure per industry
  - Industry-specific case law references
  - Wage order badge with applicable regulation
  - Column totals showing most-litigated violation categories
*/

var categories = ["Meal/Rest\nPeriods", "Compensation\nTiming", "Off-Clock\nWork", "Exemption\nClassification", "Multi-Site\nManagement"];

var industries = [
  {
    name: "Hospitality",
    slug: "hospitality",
    scores: [3, 2, 3, 1, 1],
    wageOrder: "WO 5",
    annualExposure: 850000,
    cites: ["Donohue (2021)", "§ 351 tips", "Troester (2018)", "Martinez (2012)", "—"],
    keyCase: "Donohue v. AMN Services",
  },
  {
    name: "Automotive",
    slug: "automotive-dealerships",
    scores: [1, 3, 0, 2, 1],
    wageOrder: "WO 7",
    annualExposure: 620000,
    cites: ["—", "Sciborski forfeiture", "—", "§ 515.5/Alvarado", "Joint employer"],
    keyCase: "Alvarado v. Dart Container",
  },
  {
    name: "Healthcare",
    slug: "healthcare-staffing",
    scores: [2, 1, 2, 1, 3],
    wageOrder: "WO 4/5",
    annualExposure: 720000,
    cites: ["Joint employer", "—", "Travel time", "—", "14 worksites"],
    keyCase: "Estrada v. Royalty Carpet Mills",
  },
  {
    name: "Solar/Energy",
    slug: "solar-energy",
    scores: [1, 2, 3, 1, 2],
    wageOrder: "WO 16/4",
    annualExposure: 540000,
    cites: ["—", "Piece-rate § 226.2", "Yard-to-site travel", "AWS invalidity", "Distributed crews"],
    keyCase: "Duran v. U.S. Bank",
  },
  {
    name: "Technology",
    slug: "technology-startups",
    scores: [0, 2, 1, 3, 1],
    wageOrder: "WO 4",
    annualExposure: 380000,
    cites: ["—", "RSU regular rate", "§ 2802 remote", "§ 515.5 misclass", "Dissolved entity"],
    keyCase: "Ferra v. Loews Hollywood",
  },
  {
    name: "Agriculture",
    slug: "agriculture",
    scores: [2, 3, 0, 1, 2],
    wageOrder: "WO 14",
    annualExposure: 690000,
    cites: ["Heat/rest required", "§ 226.2 piece-rate", "—", "Foreman exempt", "Grower/contractor"],
    keyCase: "Duran v. U.S. Bank",
  },
];

var intensityColors = {
  0: "#f9f9f9",
  1: "#e8f0ee",
  2: "#b8d4cd",
  3: "#2c3e3a",
};

var textColors = {
  0: "#ccc",
  1: "#666",
  2: "#2c3e3a",
  3: "#fff",
};

var labels = { 0: "—", 1: "Moderate", 2: "High", 3: "Critical" };

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n / 1000) + "K";
  return "$" + n;
}

export default function IndustryHeatMap() {
  var [visible, setVisible] = useState(false);
  var [hoveredCell, setHoveredCell] = useState(null);
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

  // Column totals (most-litigated categories)
  var colTotals = categories.map(function (_, ci) {
    return industries.reduce(function (sum, ind) { return sum + ind.scores[ci]; }, 0);
  });
  var maxColTotal = Math.max.apply(null, colTotals);

  return (
    <div ref={ref} style={{
      background: "#fff",
      border: "1px solid #e0e0e0",
      padding: "32px 24px 20px",
      position: "relative",
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #2c3e3a, #4a7a6f)" }} />

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 6 }}>
        Cross-Industry Analysis
      </div>
      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, color: "#333", marginBottom: 4 }}>
        Exposure Profile by Industry and Violation Category
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginBottom: 20, lineHeight: 1.5 }}>
        Every industry has a structural vulnerability. Hover any cell for the specific statutory or case law basis.
      </div>

      {/* Matrix */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 650, fontFamily: "'Outfit', sans-serif" }}>
          <thead>
            <tr>
              <th style={{ padding: "8px 12px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "#999", letterSpacing: 1, textTransform: "uppercase", borderBottom: "2px solid #2c3e3a", width: 130 }}>
                Industry
              </th>
              {categories.map(function (cat, i) {
                return (
                  <th key={i} style={{ padding: "8px 8px", textAlign: "center", fontSize: 9, fontWeight: 600, color: "#666", letterSpacing: 1, textTransform: "uppercase", borderBottom: "2px solid #2c3e3a", lineHeight: 1.3 }}>
                    {cat.split("\n").map(function (line, j) {
                      return <span key={j}>{line}{j === 0 ? <br /> : null}</span>;
                    })}
                  </th>
                );
              })}
              <th style={{ padding: "8px 8px", textAlign: "center", fontSize: 9, fontWeight: 600, color: "#666", letterSpacing: 1, textTransform: "uppercase", borderBottom: "2px solid #2c3e3a", width: 80 }}>
                Est. Annual<br />Exposure
              </th>
            </tr>
          </thead>
          <tbody>
            {industries.map(function (ind, rowIdx) {
              return (
                <tr key={ind.slug}>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0f0" }}>
                    <Link href={"/industries/" + ind.slug} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, color: "#2c3e3a", textDecoration: "none" }}>
                      {ind.name}
                    </Link>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, color: "#999", marginTop: 2 }}>
                      {ind.wageOrder} · {ind.keyCase}
                    </div>
                  </td>
                  {ind.scores.map(function (score, colIdx) {
                    var isHovered = hoveredCell && hoveredCell.row === rowIdx && hoveredCell.col === colIdx;
                    return (
                      <td key={colIdx} style={{
                        padding: "10px 8px",
                        textAlign: "center",
                        background: isHovered ? (score === 3 ? "#1a2e2a" : intensityColors[score]) : intensityColors[score],
                        color: textColors[score],
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        borderBottom: "1px solid #f0f0f0",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                        position: "relative",
                      }}
                        onMouseEnter={function () { setHoveredCell({ row: rowIdx, col: colIdx }); }}
                        onMouseLeave={function () { setHoveredCell(null); }}>
                        {labels[score]}
                        {isHovered && ind.cites[colIdx] && ind.cites[colIdx] !== "—" && (
                          <div style={{
                            position: "absolute",
                            bottom: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "#333",
                            color: "#fff",
                            padding: "4px 8px",
                            borderRadius: 3,
                            fontSize: 8,
                            whiteSpace: "nowrap",
                            zIndex: 10,
                            pointerEvents: "none",
                          }}>
                            {ind.cites[colIdx]}
                          </div>
                        )}
                      </td>
                    );
                  })}
                  <td style={{ padding: "10px 8px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, color: "#2c3e3a" }}>
                      {fmt(ind.annualExposure)}
                    </div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, color: "#999" }}>
                      50 emp · 26 pp
                    </div>
                  </td>
                </tr>
              );
            })}
            {/* Column totals row */}
            <tr>
              <td style={{ padding: "8px 12px", borderTop: "2px solid #2c3e3a" }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, color: "#999", letterSpacing: 1 }}>RISK CONCENTRATION</span>
              </td>
              {colTotals.map(function (total, i) {
                var pct = Math.round((total / (industries.length * 3)) * 100);
                return (
                  <td key={i} style={{ padding: "8px 8px", textAlign: "center", borderTop: "2px solid #2c3e3a" }}>
                    <div style={{
                      height: 4,
                      background: "#eee",
                      borderRadius: 2,
                      overflow: "hidden",
                      marginBottom: 2,
                    }}>
                      <div style={{
                        width: pct + "%",
                        height: "100%",
                        background: total === maxColTotal ? "#dc3545" : "#2c3e3a",
                        borderRadius: 2,
                      }} />
                    </div>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, color: total === maxColTotal ? "#dc3545" : "#999" }}>
                      {pct}%
                    </span>
                  </td>
                );
              })}
              <td style={{ padding: "8px 8px", borderTop: "2px solid #2c3e3a" }} />
            </tr>
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
        {[
          { label: "Critical", bg: "#2c3e3a", color: "#fff" },
          { label: "High", bg: "#b8d4cd", color: "#2c3e3a" },
          { label: "Moderate", bg: "#e8f0ee", color: "#666" },
          { label: "Not Primary", bg: "#f9f9f9", color: "#ccc" },
        ].map(function (item) {
          return (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 14, height: 14, background: item.bg, border: "1px solid #e0e0e0" }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#888" }}>{item.label}</span>
            </div>
          );
        })}
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
        Based on statutory structure, applicable wage orders, and industry-specific case law. Estimated exposure for 50-employee employer over 1 year.
      </div>
    </div>
  );
}
