"use client";
import { useState, useEffect, useRef } from "react";

/*
  The "Two Hotels" Framework — Temporal Bifurcation Diagram.
  Shows Legacy Hotel (high violation rate, pre-compliance) vs.
  Remedied Hotel (low violation rate, post-compliance transformation).
  The defense disaggregates the two periods to reveal the improvement
  that a blended rate would mask.
*/

export default function TwoHotelsDiagram() {
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

  var w = 720;
  var h = 320;

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
        Framework
      </div>
      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, color: "#333", marginBottom: 20, lineHeight: 1.4 }}>
        The "Two Hotels" — Temporal Bifurcation
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          {/* Legacy Hotel */}
          <g opacity={visible ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.2s" }}>
            {/* Building silhouette */}
            <rect x={60} y={60} width={120} height={140} rx={3} fill="#dc354515" stroke="#dc3545" strokeWidth={1.5} />
            <rect x={70} y={30} width={100} height={30} rx={2} fill="#dc354510" stroke="#dc3545" strokeWidth={1} />
            {/* Windows (showing violations) */}
            {[0,1,2].map(function(row) {
              return [0,1,2].map(function(col) {
                var filled = (row + col) % 2 === 0 || row === 0;
                return <rect key={row+"-"+col} x={75 + col * 35} y={75 + row * 40} width={20} height={25} rx={1}
                  fill={filled ? "#dc354530" : "#fff"} stroke="#dc354540" strokeWidth={0.5} />;
              });
            })}
            {/* Label */}
            <text x={120} y={225} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700, fill: "#dc3545" }}>
              Legacy Hotel
            </text>
            <text x={120} y={242} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#999" }}>
              Pre-compliance transformation
            </text>
            {/* Violation rate */}
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
            {/* Windows (mostly compliant) */}
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
              Post-compliance transformation
            </text>
            <rect x={360} y={255} width={80} height={24} rx={3} fill="#198754" />
            <text x={400} y={271} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, fill: "#fff" }}>
              12% violation rate
            </text>
          </g>

          {/* Right panel — blended vs. bifurcated */}
          <g opacity={visible ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.7s" }}>
            <rect x={510} y={50} width={190} height={230} rx={4} fill="#fafafa" stroke="#e0e0e0" strokeWidth={1} />
            <text x={605} y={72} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: "#2c3e3a", letterSpacing: 2 }}>
              THE DEFENSE ARGUMENT
            </text>

            {/* Blended (plaintiff's view) */}
            <text x={525} y={100} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#999" }}>Plaintiff's blended rate:</text>
            <rect x={525} y={108} width={160} height={18} rx={2} fill="#dc354520" stroke="#dc3545" strokeWidth={0.5} />
            <text x={605} y={121} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, fill: "#dc3545" }}>
              36% (masks improvement)
            </text>

            {/* Bifurcated (defense view) */}
            <text x={525} y={150} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#999" }}>Defense bifurcated view:</text>
            <rect x={525} y={158} width={80} height={18} rx={2} fill="#dc354530" stroke="#dc3545" strokeWidth={0.5} />
            <text x={565} y={171} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: "#dc3545" }}>60%</text>
            <rect x={608} y={158} width={77} height={18} rx={2} fill="#19875430" stroke="#198754" strokeWidth={0.5} />
            <text x={647} y={171} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: "#198754" }}>12%</text>

            {/* Result */}
            <line x1={530} y1={192} x2={680} y2={192} stroke="#e0e0e0" strokeWidth={1} />
            <text x={605} y={210} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#888", lineHeight: 1.5 }}>
              Remedied period penalties reduce
            </text>
            <text x={605} y={224} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#888" }}>
              by 80% — the cascade collapses
            </text>
            <text x={605} y={245} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700, fill: "#198754" }}>
              Net: 50-70% exposure reduction
            </text>
            <text x={605} y={262} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#bbb" }}>
              + penalty cap compounds the reduction
            </text>
          </g>
        </svg>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
        Analytical methodology — not a statutory framework. Applicable when employer implemented compliance improvements during the PAGA statutory period.
      </div>
    </div>
  );
}
