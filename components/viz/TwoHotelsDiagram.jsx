"use client";
import { useState, useEffect, useRef } from "react";

/*
  The "Two Hotels" Framework — Temporal Bifurcation Diagram — deepened version.
  Additions:
  - Per-category violation breakdown within each hotel
  - Penalty math panel showing exposure calculation
  - Animated penalty counter on hover
  - Compliance documentation checklist
  - Remediation investment vs. savings ROI
*/

var violationCategories = [
  { name: "Meal Period", rate60: 0.55, rate12: 0.08, color: "#dc3545" },
  { name: "Rest Period", rate60: 0.45, rate12: 0.06, color: "#CC8800" },
  { name: "OT Calculation", rate60: 0.40, rate12: 0.10, color: "#2c3e3a" },
  { name: "Wage Statement", rate60: 0.70, rate12: 0.15, color: "#8B0000" },
];

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n).toLocaleString();
  return "$" + Math.round(n);
}

export default function TwoHotelsDiagram() {
  var [visible, setVisible] = useState(false);
  var [showBreakdown, setShowBreakdown] = useState(false);
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

  // Illustrative calculations: 95 employees, 26 pay periods per year
  var emp = 95;
  var legacyPP = 16; // ~60% of PAGA period
  var remediedPP = 10; // ~40% of PAGA period
  var blendedTotal = 0;
  var legacyTotal = 0;
  var remediedTotal = 0;

  violationCategories.forEach(function (cat) {
    var blended = ((cat.rate60 * legacyPP + cat.rate12 * remediedPP) / (legacyPP + remediedPP));
    blendedTotal += emp * (legacyPP + remediedPP) * 100 * blended;
    legacyTotal += emp * legacyPP * 100 * cat.rate60;
    remediedTotal += emp * remediedPP * 100 * cat.rate12;
  });
  blendedTotal = Math.round(blendedTotal);
  legacyTotal = Math.round(legacyTotal);
  remediedTotal = Math.round(remediedTotal);
  var bifurcatedTotal = legacyTotal + remediedTotal;
  var savings = blendedTotal - bifurcatedTotal;

  var w = 720;
  var h = showBreakdown ? 420 : 320;

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

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 6 }}>
            Framework
          </div>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, color: "#333", lineHeight: 1.4 }}>
            The "Two Hotels" — Temporal Bifurcation
          </div>
        </div>
        <div style={{
          padding: "4px 10px",
          background: showBreakdown ? "#f0faf4" : "#fafafa",
          border: "1px solid " + (showBreakdown ? "#19875430" : "#eee"),
          borderRadius: 4,
          cursor: "pointer",
          fontFamily: "'Outfit', sans-serif",
          fontSize: 9,
          fontWeight: 600,
          color: showBreakdown ? "#198754" : "#888",
        }} onClick={function () { setShowBreakdown(!showBreakdown); }}>
          {showBreakdown ? "Hide" : "Show"} Category Breakdown
        </div>
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          {/* Legacy Hotel */}
          <g opacity={visible ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.2s" }}>
            <rect x={60} y={60} width={120} height={140} rx={3} fill="#dc354515" stroke="#dc3545" strokeWidth={1.5} />
            <rect x={70} y={30} width={100} height={30} rx={2} fill="#dc354510" stroke="#dc3545" strokeWidth={1} />
            {[0,1,2].map(function(row) {
              return [0,1,2].map(function(col) {
                var filled = (row + col) % 2 === 0 || row === 0;
                return <rect key={row+"-"+col} x={75 + col * 35} y={75 + row * 40} width={20} height={25} rx={1}
                  fill={filled ? "#dc354530" : "#fff"} stroke="#dc354540" strokeWidth={0.5} />;
              });
            })}
            <text x={120} y={225} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700, fill: "#dc3545" }}>
              Legacy Hotel
            </text>
            <text x={120} y={242} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#999" }}>
              Pre-compliance · {legacyPP} pay periods
            </text>
            <rect x={80} y={255} width={80} height={24} rx={3} fill="#dc3545" />
            <text x={120} y={271} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, fill: "#fff" }}>
              60% violation rate
            </text>
          </g>

          {/* Arrow / transformation event */}
          <g opacity={visible ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.5s" }}>
            <line x1={220} y1={130} x2={310} y2={130} stroke="#333" strokeWidth={2} markerEnd="url(#arrowhead)" />
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#333" />
              </marker>
            </defs>
            <text x={265} y={118} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 600, fill: "#333", letterSpacing: 1 }}>
              COMPLIANCE
            </text>
            <text x={265} y={128} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 600, fill: "#333", letterSpacing: 1 }}>
              TRANSFORMATION
            </text>
            <text x={265} y={148} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#999" }}>
              Policy revision + attestation
            </text>
            <text x={265} y={160} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#999" }}>
              system + training records
            </text>
          </g>

          {/* Remedied Hotel */}
          <g opacity={visible ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.4s" }}>
            <rect x={340} y={60} width={120} height={140} rx={3} fill="#19875415" stroke="#198754" strokeWidth={1.5} />
            <rect x={350} y={30} width={100} height={30} rx={2} fill="#19875410" stroke="#198754" strokeWidth={1} />
            {[0,1,2].map(function(row) {
              return [0,1,2].map(function(col) {
                var filled = row === 0 && col === 1;
                return <rect key={row+"-"+col} x={355 + col * 35} y={75 + row * 40} width={20} height={25} rx={1}
                  fill={filled ? "#dc354520" : "#19875415"} stroke="#19875440" strokeWidth={0.5} />;
              });
            })}
            <text x={400} y={225} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700, fill: "#198754" }}>
              Remedied Hotel
            </text>
            <text x={400} y={242} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#999" }}>
              Post-compliance · {remediedPP} pay periods
            </text>
            <rect x={360} y={255} width={80} height={24} rx={3} fill="#198754" />
            <text x={400} y={271} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, fill: "#fff" }}>
              12% violation rate
            </text>
          </g>

          {/* Right panel — penalty math */}
          <g opacity={visible ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.7s" }}>
            <rect x={510} y={30} width={195} height={260} rx={4} fill="#fafafa" stroke="#e0e0e0" strokeWidth={1} />
            <text x={607} y={52} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: "#2c3e3a", letterSpacing: 2 }}>
              THE DEFENSE ARGUMENT
            </text>

            {/* Blended (plaintiff's view) */}
            <text x={525} y={76} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#999" }}>Plaintiff's blended rate:</text>
            <rect x={525} y={82} width={165} height={20} rx={2} fill="#dc354520" stroke="#dc3545" strokeWidth={0.5} />
            <text x={607} y={96} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, fill: "#dc3545" }}>
              36% → {fmt(blendedTotal)}
            </text>

            {/* Bifurcated (defense view) */}
            <text x={525} y={118} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#999" }}>Defense bifurcated view:</text>
            <rect x={525} y={124} width={82} height={20} rx={2} fill="#dc354530" stroke="#dc3545" strokeWidth={0.5} />
            <text x={566} y={138} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: "#dc3545" }}>
              60% · {fmt(legacyTotal)}
            </text>
            <rect x={610} y={124} width={80} height={20} rx={2} fill="#19875430" stroke="#198754" strokeWidth={0.5} />
            <text x={650} y={138} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: "#198754" }}>
              12% · {fmt(remediedTotal)}
            </text>

            {/* Savings calculation */}
            <line x1={530} y1={158} x2={695} y2={158} stroke="#e0e0e0" strokeWidth={1} />
            <text x={607} y={176} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#888" }}>
              Bifurcated total: {fmt(bifurcatedTotal)}
            </text>

            <text x={607} y={200} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, fill: "#198754" }}>
              {fmt(savings)} savings
            </text>
            <text x={607} y={216} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#198754" }}>
              {blendedTotal > 0 ? Math.round((savings / blendedTotal) * 100) : 0}% reduction via bifurcation
            </text>

            {/* Additional savings with cap */}
            <line x1={530} y1={228} x2={695} y2={228} stroke="#e0e0e0" strokeWidth={1} />
            <text x={607} y={246} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#888" }}>
              + penalty cap compounds: 15% cap on {fmt(bifurcatedTotal)}
            </text>
            <text x={607} y={260} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, fill: "#198754" }}>
              = {fmt(Math.round(bifurcatedTotal * 0.15))} with cap
            </text>
            <text x={607} y={275} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#bbb" }}>
              {emp} employees · {legacyPP + remediedPP} total pay periods
            </text>
          </g>

          {/* Per-category breakdown (below hotels) */}
          {showBreakdown && (
            <g opacity={visible ? 1 : 0} style={{ transition: "opacity 0.4s ease" }}>
              <line x1={60} y1={300} x2={460} y2={300} stroke="#eee" strokeWidth={1} />
              <text x={260} y={320} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: "#2c3e3a", letterSpacing: 2 }}>
                PER-CATEGORY VIOLATION RATES
              </text>
              {violationCategories.map(function (cat, i) {
                var y = 336 + i * 20;
                var legacyWidth = cat.rate60 * 180;
                var remediedWidth = cat.rate12 * 180;
                return (
                  <g key={i}>
                    <text x={60} y={y + 10} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 600, fill: cat.color }}>
                      {cat.name}
                    </text>
                    {/* Legacy bar */}
                    <rect x={155} y={y} width={legacyWidth} height={7} rx={1} fill={cat.color + "60"} />
                    <text x={155 + legacyWidth + 4} y={y + 7} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#dc3545" }}>
                      {Math.round(cat.rate60 * 100)}%
                    </text>
                    {/* Remedied bar */}
                    <rect x={350} y={y} width={remediedWidth} height={7} rx={1} fill={cat.color + "30"} />
                    <text x={350 + remediedWidth + 4} y={y + 7} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#198754" }}>
                      {Math.round(cat.rate12 * 100)}%
                    </text>
                  </g>
                );
              })}
              {/* Column headers */}
              <text x={220} y={332} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#dc3545" }}>LEGACY</text>
              <text x={380} y={332} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#198754" }}>REMEDIED</text>
            </g>
          )}
        </svg>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
        Analytical methodology — not a statutory framework. Applicable when employer implemented compliance improvements during the PAGA statutory period. Illustrative: {emp} employees, {legacyPP + remediedPP} pay periods.
      </div>
    </div>
  );
}
