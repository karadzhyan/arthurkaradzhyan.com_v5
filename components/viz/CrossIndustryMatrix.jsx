"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/*
  Full cross-industry vulnerability matrix — deepened version.
  Additions:
  - Statutory citations per cell (hover tooltips)
  - Estimated annual exposure per industry
  - Wage order and key case law reference
  - Column risk concentration bars
  - Row-level defense priority indicators
*/

var categories = [
  { key: "mealrest", label: "Meal/Rest Period Compliance", cite: "§§ 226.7, 512" },
  { key: "compensation", label: "Compensation Timing & Structure", cite: "§§ 204, 226.2" },
  { key: "offclock", label: "Off-Clock / Compensable Time", cite: "§§ 510, 1194" },
  { key: "exemption", label: "Exemption Classification", cite: "§ 515.5" },
  { key: "multisite", label: "Multi-Site / Joint Employer", cite: "Martinez (2012)" },
];

var industries = [
  {
    name: "Hospitality",
    slug: "hospitality",
    wageOrder: "WO 5",
    metric: "24/7 × Donohue",
    annualExposure: 850000,
    data: { mealrest: 3, compensation: 2, offclock: 3, exemption: 1, multisite: 1 },
    cites: { mealrest: "Donohue v. AMN (2021)", compensation: "§ 351 tip credit", offclock: "Troester v. Starbucks (2018)", exemption: "Martinez v. Combs (2012)", multisite: "Single-property" },
  },
  {
    name: "Automotive",
    slug: "automotive-dealerships",
    wageOrder: "WO 7",
    metric: "$0 at departure",
    annualExposure: 620000,
    data: { mealrest: 1, compensation: 3, offclock: 0, exemption: 2, multisite: 1 },
    cites: { mealrest: "Standard", compensation: "Sciborski commission forfeiture", offclock: "N/A", exemption: "Alvarado v. Dart (2018)", multisite: "Multi-dealer group" },
  },
  {
    name: "Healthcare",
    slug: "healthcare-staffing",
    wageOrder: "WO 4/5",
    metric: "14 worksites, 1 PAGA",
    annualExposure: 720000,
    data: { mealrest: 2, compensation: 1, offclock: 2, exemption: 1, multisite: 3 },
    cites: { mealrest: "Joint employer meal", compensation: "Standard", offclock: "Travel time compensable", exemption: "Standard", multisite: "14 worksites, § 2699(p)" },
  },
  {
    name: "Solar/Energy",
    slug: "solar-energy",
    wageOrder: "WO 16/4",
    metric: "2 hrs/day retroactive OT",
    annualExposure: 540000,
    data: { mealrest: 1, compensation: 2, offclock: 3, exemption: 1, multisite: 2 },
    cites: { mealrest: "Standard", compensation: "§ 226.2 piece-rate", offclock: "Yard-to-site travel", exemption: "AWS invalidity", multisite: "Distributed crews" },
  },
  {
    name: "Technology",
    slug: "technology-startups",
    wageOrder: "WO 4",
    metric: "§ 515.5 ≠ exempt",
    annualExposure: 380000,
    data: { mealrest: 0, compensation: 2, offclock: 1, exemption: 3, multisite: 1 },
    cites: { mealrest: "N/A", compensation: "RSU regular rate", offclock: "§ 2802 remote reimb.", exemption: "§ 515.5 misclass", multisite: "Dissolved entity" },
  },
  {
    name: "Agriculture",
    slug: "agriculture",
    wageOrder: "WO 14",
    metric: "100+ employees, no records",
    annualExposure: 690000,
    data: { mealrest: 2, compensation: 3, offclock: 0, exemption: 1, multisite: 2 },
    cites: { mealrest: "Heat/rest required", compensation: "§ 226.2 piece-rate", offclock: "N/A", exemption: "Foreman exempt", multisite: "Grower/contractor joint" },
  },
];

var intensityBg = { 0: "#f9f9f9", 1: "#e8f0ee", 2: "#b8d4cd", 3: "#2c3e3a" };
var intensityText = { 0: "#ddd", 1: "#888", 2: "#2c3e3a", 3: "#fff" };
var intensityLabel = { 0: "—", 1: "●", 2: "●●", 3: "●●●" };

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n / 1000) + "K";
  return "$" + n;
}

export default function CrossIndustryMatrix() {
  var [visible, setVisible] = useState(false);
  var [hoveredCell, setHoveredCell] = useState(null);
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  // Calculate column risk concentrations
  var colTotals = categories.map(function (cat) {
    return industries.reduce(function (sum, ind) { return sum + ind.data[cat.key]; }, 0);
  });
  var maxColTotal = Math.max.apply(null, colTotals);

  // Row totals (overall industry risk)
  var rowTotals = industries.map(function (ind) {
    return Object.values(ind.data).reduce(function (sum, v) { return sum + v; }, 0);
  });
  var maxRowTotal = Math.max.apply(null, rowTotals);

  return (
    <div ref={ref} style={{
      background: "#fff",
      border: "1px solid #e0e0e0",
      padding: "32px 24px 24px",
      marginBottom: 32,
      position: "relative",
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #2c3e3a, #4a7a6f)" }} />

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 6 }}>
        Comparative Analysis
      </div>
      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, color: "#333", marginBottom: 4, lineHeight: 1.4 }}>
        Cross-Industry Vulnerability Matrix
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginBottom: 20, lineHeight: 1.5 }}>
        Where each industry faces disproportionate exposure. Hover any cell for statutory basis and case law. Click an industry to view its full defense profile.
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 750, fontFamily: "'Outfit', sans-serif" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "#2c3e3a", borderBottom: "2px solid #2c3e3a", width: 150 }}>
                Industry
              </th>
              <th style={{ padding: "10px 8px", textAlign: "center", fontSize: 9, color: "#999", borderBottom: "2px solid #2c3e3a", width: 60 }}>
                Wage Order
              </th>
              {categories.map(function (cat) {
                return (
                  <th key={cat.key} style={{ padding: "10px 8px", textAlign: "center", fontSize: 9, fontWeight: 600, color: "#666", borderBottom: "2px solid #2c3e3a", lineHeight: 1.3 }}>
                    {cat.label}
                    <div style={{ fontSize: 7, color: "#bbb", fontWeight: 400, marginTop: 2 }}>{cat.cite}</div>
                  </th>
                );
              })}
              <th style={{ padding: "10px 8px", textAlign: "center", fontSize: 9, fontWeight: 600, color: "#666", borderBottom: "2px solid #2c3e3a", width: 80 }}>
                Est. Annual<br />Exposure
              </th>
            </tr>
          </thead>
          <tbody>
            {industries.map(function (ind, ri) {
              var rowTotal = rowTotals[ri];
              return (
                <tr key={ind.slug}>
                  <td style={{ padding: "12px 12px", borderBottom: "1px solid #f0f0f0" }}>
                    <Link href={"/industries/" + ind.slug} style={{ textDecoration: "none" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#2c3e3a" }}>{ind.name}</div>
                      <div style={{ fontSize: 9, color: "#999", marginTop: 2 }}>{ind.metric}</div>
                    </Link>
                  </td>
                  <td style={{ padding: "12px 8px", textAlign: "center", fontSize: 9, color: "#888", borderBottom: "1px solid #f0f0f0" }}>
                    {ind.wageOrder}
                  </td>
                  {categories.map(function (cat) {
                    var score = ind.data[cat.key];
                    var isHovered = hoveredCell && hoveredCell.row === ri && hoveredCell.col === cat.key;
                    var cellCite = ind.cites[cat.key];
                    return (
                      <td key={cat.key} style={{
                        padding: "12px 8px",
                        textAlign: "center",
                        background: isHovered ? (score === 3 ? "#1a2e2a" : intensityBg[score]) : intensityBg[score],
                        color: intensityText[score],
                        fontSize: 11,
                        borderBottom: "1px solid #f0f0f0",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                        position: "relative",
                      }}
                        onMouseEnter={function () { setHoveredCell({ row: ri, col: cat.key }); }}
                        onMouseLeave={function () { setHoveredCell(null); }}>
                        {intensityLabel[score]}
                        {isHovered && cellCite && cellCite !== "N/A" && (
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
                            {cellCite}
                          </div>
                        )}
                      </td>
                    );
                  })}
                  <td style={{ padding: "12px 8px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, color: "#2c3e3a" }}>
                      {fmt(ind.annualExposure)}
                    </div>
                    {/* Mini risk bar */}
                    <div style={{ width: 50, height: 3, background: "#eee", borderRadius: 1.5, margin: "4px auto 0", overflow: "hidden" }}>
                      <div style={{ width: Math.round((rowTotal / maxRowTotal) * 100) + "%", height: "100%", background: rowTotal === maxRowTotal ? "#dc3545" : "#2c3e3a", borderRadius: 1.5 }} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {/* Column risk concentration */}
            <tr>
              <td colSpan={2} style={{ padding: "8px 12px", borderTop: "2px solid #2c3e3a" }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, color: "#999", letterSpacing: 1 }}>RISK CONCENTRATION</span>
              </td>
              {categories.map(function (cat, ci) {
                var total = colTotals[ci];
                var pct = Math.round((total / (industries.length * 3)) * 100);
                return (
                  <td key={cat.key} style={{ padding: "8px 8px", textAlign: "center", borderTop: "2px solid #2c3e3a" }}>
                    <div style={{ height: 4, background: "#eee", borderRadius: 2, overflow: "hidden", marginBottom: 2 }}>
                      <div style={{ width: pct + "%", height: "100%", background: total === maxColTotal ? "#dc3545" : "#2c3e3a", borderRadius: 2 }} />
                    </div>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, color: total === maxColTotal ? "#dc3545" : "#999" }}>
                      {pct}%
                    </span>
                  </td>
                );
              })}
              <td style={{ borderTop: "2px solid #2c3e3a" }} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
