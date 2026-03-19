"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/*
  Full cross-industry vulnerability matrix for the Industries index page.
  Larger, more detailed version of IndustryHeatMap.
  Shows 6 industries × 5 violation categories with clickable navigation.
*/

var categories = [
  { key: "mealrest", label: "Meal/Rest Period Compliance" },
  { key: "compensation", label: "Compensation Timing & Structure" },
  { key: "offclock", label: "Off-Clock / Compensable Time" },
  { key: "exemption", label: "Exemption Classification" },
  { key: "multisite", label: "Multi-Site / Joint Employer" },
];

var industries = [
  {
    name: "Hospitality",
    slug: "hospitality",
    wageOrder: "WO 5",
    metric: "24/7 × Donohue",
    data: { mealrest: 3, compensation: 2, offclock: 3, exemption: 1, multisite: 1 },
  },
  {
    name: "Automotive",
    slug: "automotive-dealerships",
    wageOrder: "WO 7",
    metric: "$0 at departure",
    data: { mealrest: 1, compensation: 3, offclock: 0, exemption: 2, multisite: 1 },
  },
  {
    name: "Healthcare",
    slug: "healthcare-staffing",
    wageOrder: "WO 4/5",
    metric: "14 worksites, 1 PAGA",
    data: { mealrest: 2, compensation: 1, offclock: 2, exemption: 1, multisite: 3 },
  },
  {
    name: "Solar/Energy",
    slug: "solar-energy",
    wageOrder: "WO 16/4",
    metric: "2 hrs/day retroactive OT",
    data: { mealrest: 1, compensation: 2, offclock: 3, exemption: 1, multisite: 2 },
  },
  {
    name: "Technology",
    slug: "technology-startups",
    wageOrder: "WO 4",
    metric: "§ 515.5 ≠ exempt",
    data: { mealrest: 0, compensation: 2, offclock: 1, exemption: 3, multisite: 1 },
  },
  {
    name: "Agriculture",
    slug: "agriculture",
    wageOrder: "WO 14",
    metric: "100+ employees, no records",
    data: { mealrest: 2, compensation: 3, offclock: 0, exemption: 1, multisite: 2 },
  },
];

var intensityBg = { 0: "#f9f9f9", 1: "#e8f0ee", 2: "#b8d4cd", 3: "#2c3e3a" };
var intensityText = { 0: "#ddd", 1: "#888", 2: "#2c3e3a", 3: "#fff" };
var intensityLabel = { 0: "—", 1: "●", 2: "●●", 3: "●●●" };

export default function CrossIndustryMatrix() {
  var [visible, setVisible] = useState(false);
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
        Where each industry faces disproportionate exposure. Click an industry to view its full defense profile.
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700, fontFamily: "'Outfit', sans-serif" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "#2c3e3a", borderBottom: "2px solid #2c3e3a", width: 140 }}>
                Industry
              </th>
              <th style={{ padding: "10px 8px", textAlign: "center", fontSize: 9, color: "#999", borderBottom: "2px solid #2c3e3a", width: 60 }}>
                Wage Order
              </th>
              {categories.map(function (cat) {
                return (
                  <th key={cat.key} style={{ padding: "10px 8px", textAlign: "center", fontSize: 9, fontWeight: 600, color: "#666", borderBottom: "2px solid #2c3e3a", lineHeight: 1.3 }}>
                    {cat.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {industries.map(function (ind) {
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
                    return (
                      <td key={cat.key} style={{
                        padding: "12px 8px",
                        textAlign: "center",
                        background: intensityBg[score],
                        color: intensityText[score],
                        fontSize: 11,
                        borderBottom: "1px solid #f0f0f0",
                        transition: "all 0.3s ease",
                      }}>
                        {intensityLabel[score]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
