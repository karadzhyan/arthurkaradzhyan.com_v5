"use client";
import { useState, useEffect, useRef } from "react";

/*
  Authority case law timeline — deepened version.
  Extracts year from citation strings, renders horizontal timeline with:
  - Hover tooltips showing full citation + holding
  - Doctrine-shift markers (when a case overrules prior authority)
  - Significance indicators (Supreme Court vs. appellate)
  - Connectors between related decisions
*/

function extractYear(citation) {
  var match = citation.match(/\((\d{4})\)/);
  return match ? parseInt(match[1]) : null;
}

function extractName(citation) {
  var match = citation.match(/^([^(]+)/);
  return match ? match[1].trim() : citation;
}

function extractCourt(citation) {
  if (/Cal\.\s*5th/.test(citation)) return "Supreme Court";
  if (/Cal\.App\.\s*5th/.test(citation)) return "Court of Appeal";
  if (/Cal\.App\.\s*4th/.test(citation)) return "Court of Appeal";
  if (/U\.S\./.test(citation)) return "U.S. Supreme Court";
  return "Court of Appeal";
}

/* Known overruling relationships and holdings for enhanced display */
var caseAnnotations = {
  "Hohenshelt": { shift: true, shiftLabel: "Overturns strict-liability line", holding: "Equitable principles replace automatic forfeiture for late arbitration fees" },
  "Adolph": { shift: true, shiftLabel: "Reverses Viking River standing", holding: "PAGA representative standing survives individual claim arbitration" },
  "Naranjo": { shift: true, shiftLabel: "Premiums classified as wages", holding: "Meal/rest premiums are wages for derivative penalty purposes" },
  "Ferra": { shift: true, shiftLabel: "Regular rate for premiums", holding: "Meal/rest premiums must be paid at the regular rate, applied retroactively" },
  "Estrada": { shift: true, shiftLabel: "Manageability as defense tool", holding: "Courts have inherent authority to limit PAGA scope for manageability" },
  "Donohue": { shift: false, holding: "Rounded or short meal punches create rebuttable presumption of violation" },
  "Brinker": { shift: false, holding: "Employers must provide meal periods but need not ensure they are taken" },
  "Duran": { shift: false, holding: "Statistical sampling must satisfy due process — random, representative, adequate" },
  "Kirby": { shift: false, holding: "§ 226.7 premium is a wage, not a penalty — affects PAGA recoverability" },
  "Alvarado": { shift: false, holding: "Flat-sum bonus divided by non-overtime hours only for regular rate" },
  "ZB, N.A.": { shift: false, holding: "Foundational recoverability framework: wages vs. penalties in PAGA" },
  "Leeper": { shift: false, holding: "Pending — whether plaintiffs can disclaim individual claims to avoid arbitration" },
};

function getAnnotation(name) {
  for (var key in caseAnnotations) {
    if (name.indexOf(key) !== -1) return caseAnnotations[key];
  }
  return null;
}

export default function AuthorityTimeline({ authorities }) {
  var [visible, setVisible] = useState(false);
  var [hoveredIdx, setHoveredIdx] = useState(-1);
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

  if (!authorities || authorities.length === 0) return null;

  var parsed = authorities.map(function (auth) {
    var name = extractName(auth);
    var annotation = getAnnotation(name);
    return {
      full: auth,
      year: extractYear(auth),
      name: name,
      court: extractCourt(auth),
      annotation: annotation,
    };
  }).filter(function (a) { return a.year !== null; }).sort(function (a, b) { return a.year - b.year; });

  if (parsed.length === 0) return null;

  var minYear = parsed[0].year;
  var maxYear = parsed[parsed.length - 1].year;
  var range = Math.max(maxYear - minYear, 1);

  var w = 680;
  var h = 170;
  var padL = 40;
  var padR = 40;
  var lineY = 70;
  var barW = w - padL - padR;

  function yearToX(year) {
    return padL + ((year - minYear) / range) * barW;
  }

  var supremeCount = parsed.filter(function (a) { return a.court === "Supreme Court" || a.court === "U.S. Supreme Court"; }).length;
  var shiftCount = parsed.filter(function (a) { return a.annotation && a.annotation.shift; }).length;

  return (
    <div ref={ref} style={{
      padding: "20px 0 16px",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: "#2c3e3a",
        marginBottom: 4,
      }}>
        Case Law Timeline
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#888" }}>
          {parsed.length} decisions · {minYear}–{maxYear}
          {supremeCount > 0 ? " · " + supremeCount + " Supreme Court" : ""}
          {shiftCount > 0 ? " · " + shiftCount + " doctrine shifts" : ""}
        </span>
      </div>

      <div style={{ width: "100%", overflowX: "auto", position: "relative" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          {/* Year ticks along bottom */}
          {Array.from({ length: range + 1 }, function (_, i) { return minYear + i; }).map(function (yr) {
            var x = yearToX(yr);
            return (
              <g key={yr}>
                <line x1={x} y1={lineY + 8} x2={x} y2={lineY + 14} stroke="#ddd" strokeWidth={1} />
                <text x={x} y={lineY + 24} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#ccc" }}>
                  {yr}
                </text>
              </g>
            );
          })}

          {/* Timeline line */}
          <line x1={padL} y1={lineY} x2={w - padR} y2={lineY} stroke="#e0e0e0" strokeWidth={2} />

          {/* Doctrine shift zones */}
          {parsed.filter(function (a) { return a.annotation && a.annotation.shift; }).map(function (auth, i) {
            var x = yearToX(auth.year);
            return (
              <rect key={"shift-" + i} x={x - 3} y={lineY - 50} width={6} height={100} rx={3}
                fill="#8B000008" />
            );
          })}

          {/* Authority points */}
          {parsed.map(function (auth, i) {
            var x = yearToX(auth.year);
            var labelAbove = i % 2 === 0;
            var delay = 0.2 + i * 0.15;
            var isSupreme = auth.court === "Supreme Court" || auth.court === "U.S. Supreme Court";
            var isShift = auth.annotation && auth.annotation.shift;
            var isHovered = hoveredIdx === i;
            var dotR = isSupreme ? 7 : 5;
            var dotColor = isShift ? "#8B0000" : "#2c3e3a";

            return (
              <g key={i} opacity={visible ? 1 : 0} style={{ transition: "opacity 0.4s ease " + delay + "s", cursor: "pointer" }}
                onMouseEnter={function () { setHoveredIdx(i); }}
                onMouseLeave={function () { setHoveredIdx(-1); }}>
                {/* Hit area */}
                <rect x={x - 30} y={lineY - 50} width={60} height={100} fill="transparent" />

                {/* Dot */}
                <circle cx={x} cy={lineY} r={isHovered ? dotR + 2 : dotR} fill={dotColor}
                  style={{ transition: "r 0.2s ease" }} />
                {isSupreme && (
                  <circle cx={x} cy={lineY} r={dotR + 3} fill="none" stroke={dotColor} strokeWidth={1.5}
                    strokeDasharray="2 2" />
                )}

                {/* Shift indicator */}
                {isShift && (
                  <g>
                    <polygon points={(x - 4) + "," + (lineY - dotR - 10) + " " + x + "," + (lineY - dotR - 4) + " " + (x + 4) + "," + (lineY - dotR - 10)}
                      fill="#8B0000" />
                  </g>
                )}

                {/* Connector line */}
                <line x1={x} y1={lineY + (labelAbove ? -dotR - 2 : dotR + 2)}
                  x2={x} y2={lineY + (labelAbove ? -22 : 22)}
                  stroke={dotColor} strokeWidth={1} />

                {/* Year */}
                <text x={x} y={labelAbove ? lineY - 26 : lineY + 32} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, fill: dotColor }}>
                  {auth.year}
                </text>

                {/* Case name */}
                <text x={x} y={labelAbove ? lineY - 38 : lineY + 44} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: isHovered ? "#333" : "#888",
                    fontWeight: isHovered ? 600 : 400, transition: "all 0.2s ease" }}>
                  {auth.name.length > 25 ? auth.name.substring(0, 25) + "..." : auth.name}
                </text>

                {/* Court badge */}
                {isSupreme && (
                  <text x={x} y={labelAbove ? lineY - 48 : lineY + 54} textAnchor="middle"
                    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 6, fontWeight: 600, fill: dotColor, letterSpacing: 0.5 }}>
                    {auth.court === "U.S. Supreme Court" ? "SCOTUS" : "CAL. S.CT."}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {hoveredIdx >= 0 && parsed[hoveredIdx] && (
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #e0e0e0",
            padding: "10px 14px",
            fontFamily: "'Outfit', sans-serif",
            boxShadow: "0 2px 8px rgba(0,0,0,.06)",
            zIndex: 10,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#2c3e3a", marginBottom: 2 }}>
              {parsed[hoveredIdx].name} ({parsed[hoveredIdx].year})
            </div>
            <div style={{ fontSize: 9, color: "#999", marginBottom: 4 }}>{parsed[hoveredIdx].court}</div>
            {parsed[hoveredIdx].annotation && (
              <div style={{ fontSize: 10, color: "#555", lineHeight: 1.5 }}>
                {parsed[hoveredIdx].annotation.holding}
              </div>
            )}
            {parsed[hoveredIdx].annotation && parsed[hoveredIdx].annotation.shift && (
              <div style={{ fontSize: 9, fontWeight: 600, color: "#8B0000", marginTop: 4, letterSpacing: 0.5 }}>
                DOCTRINE SHIFT: {parsed[hoveredIdx].annotation.shiftLabel}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <svg width={12} height={12}><circle cx={6} cy={6} r={4} fill="#2c3e3a" /><circle cx={6} cy={6} r={6} fill="none" stroke="#2c3e3a" strokeWidth={1} strokeDasharray="2 2" /></svg>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, color: "#888" }}>Supreme Court</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <svg width={12} height={12}><circle cx={6} cy={6} r={4} fill="#2c3e3a" /></svg>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, color: "#888" }}>Court of Appeal</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <svg width={12} height={12}><circle cx={6} cy={6} r={4} fill="#8B0000" /><polygon points="2,1 6,5 10,1" fill="#8B0000" /></svg>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, color: "#888" }}>Doctrine Shift</span>
        </div>
      </div>
    </div>
  );
}
