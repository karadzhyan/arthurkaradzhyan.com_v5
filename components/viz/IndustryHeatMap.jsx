"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/*
  Cross-industry exposure heat map.
  Maps 6 industries × 5 violation categories.
  Intensity derived from each industry's exposure categories in data/industries.js.
  0 = not a primary concern, 1 = moderate, 2 = high, 3 = critical
*/

var categories = ["Meal/Rest\nPeriods", "Compensation\nTiming", "Off-Clock\nWork", "Exemption\nClassification", "Multi-Site\nManagement"];

var industries = [
  {
    name: "Hospitality",
    slug: "hospitality",
    scores: [3, 2, 3, 1, 1],
    // Meal/rest: 24/7 Donohue=critical; Tips=compensation timing; Off-clock: Troester=critical; Manager exempt=moderate; Single-site=low
  },
  {
    name: "Automotive",
    slug: "automotive-dealerships",
    scores: [1, 3, 0, 2, 1],
    // Meal/rest=low; Commission forfeiture=critical; Off-clock=n/a; Commissioned OT exempt + flat-rate=high; Multi-dealer=moderate
  },
  {
    name: "Healthcare",
    slug: "healthcare-staffing",
    scores: [2, 1, 2, 1, 3],
    // Meal/rest=high (joint employer); Comp timing=moderate; Travel time=high; Exempt=moderate; 14 worksites=critical
  },
  {
    name: "Solar/Energy",
    slug: "solar-energy",
    scores: [1, 2, 3, 1, 2],
    // Meal/rest=moderate; Piece-rate=high; Travel yard-to-site=critical; AWS exempt=moderate; Distributed crews=high
  },
  {
    name: "Technology",
    slug: "technology-startups",
    scores: [0, 2, 1, 3, 1],
    // Meal/rest=n/a; RSU regular rate=high; Remote reimbursement=moderate; § 515.5 misclass=critical; Dissolved=moderate
  },
  {
    name: "Agriculture",
    slug: "agriculture",
    scores: [2, 3, 0, 1, 2],
    // Meal/rest (heat+rest)=high; Piece-rate § 226.2=critical; Off-clock=n/a; Foreman exempt=moderate; Grower/contractor=high
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

export default function IndustryHeatMap() {
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
        Every industry has a structural vulnerability. This matrix shows where each faces disproportionate PAGA exposure based on operational model, applicable wage order, and case law.
      </div>

      {/* Matrix */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600, fontFamily: "'Outfit', sans-serif" }}>
          <thead>
            <tr>
              <th style={{ padding: "8px 12px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "#999", letterSpacing: 1, textTransform: "uppercase", borderBottom: "2px solid #2c3e3a", width: 120 }}>
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
                  </td>
                  {ind.scores.map(function (score, colIdx) {
                    return (
                      <td key={colIdx} style={{
                        padding: "10px 8px",
                        textAlign: "center",
                        background: intensityColors[score],
                        color: textColors[score],
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        borderBottom: "1px solid #f0f0f0",
                        transition: "all 0.3s ease",
                      }}>
                        {labels[score]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
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
        Based on statutory structure, applicable wage orders, and industry-specific case law. Actual exposure varies by employer.
      </div>
    </div>
  );
}
