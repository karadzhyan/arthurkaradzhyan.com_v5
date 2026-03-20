"use client";
/* Case Law Timeline — Now with interconnection arrows showing how cases build
   on each other, impact magnitude indicators, and defense/plaintiff outcome markers. */

export default function CaseLawTimeline() {
  var cases = [
    { year: 2012, name: "Brinker", cite: "53 Cal.4th 1004", issue: "Provide, Not Ensure", impact: 5, side: "defense", lineage: [], side_pos: "top" },
    { year: 2012, name: "Kirby", cite: "53 Cal.4th 1244", issue: "Premiums = Wages", impact: 4, side: "defense", lineage: [], side_pos: "bottom" },
    { year: 2014, name: "Duran", cite: "59 Cal.4th 1", issue: "Sampling Limits", impact: 3, side: "defense", lineage: [], side_pos: "top" },
    { year: 2018, name: "Alvarado", cite: "4 Cal.5th 542", issue: "Flat-Sum Bonus Rate", impact: 3, side: "plaintiff", lineage: [], side_pos: "bottom" },
    { year: 2019, name: "ZB, N.A.", cite: "8 Cal.5th 175", issue: "PAGA Recoverability", impact: 5, side: "defense", lineage: [1], side_pos: "top" },
    { year: 2021, name: "Donohue", cite: "11 Cal.5th 58", issue: "Rounding Eliminated", impact: 4, side: "plaintiff", lineage: [0], side_pos: "bottom" },
    { year: 2021, name: "Ferra", cite: "11 Cal.5th 858", issue: "Regular Rate Premiums", impact: 4, side: "plaintiff", lineage: [3], side_pos: "top" },
    { year: 2022, name: "Naranjo", cite: "13 Cal.5th 93", issue: "Derivative Penalties", impact: 5, side: "plaintiff", lineage: [1, 6], side_pos: "bottom" },
    { year: 2023, name: "Adolph", cite: "14 Cal.5th 1104", issue: "Standing Post-Arb", impact: 4, side: "mixed", lineage: [], side_pos: "top" },
    { year: 2024, name: "Estrada", cite: "15 Cal.5th 582", issue: "Manageability", impact: 5, side: "defense", lineage: [2], side_pos: "bottom" },
    { year: 2024, name: "AB 2288", cite: "Stats. 2024", issue: "PAGA Reforms", impact: 5, side: "defense", lineage: [], side_pos: "top" },
    { year: 2025, name: "Hohenshelt", cite: "18 Cal.5th 310", issue: "Arb Fee Standard", impact: 3, side: "defense", lineage: [8], side_pos: "bottom" },
  ];

  var svgW = 760, svgH = 430;
  var lineY = 190;
  var startX = 40, endX = svgW - 40;
  var minYear = 2011, maxYear = 2026;

  function xForYear(y) { return startX + ((y - minYear) / (maxYear - minYear)) * (endX - startX); }

  /* Impact size: maps 3-5 to radius */
  function impactR(imp) { return imp === 5 ? 6 : imp === 4 ? 4.5 : 3.5; }

  var sideColors = { defense: "#4a7a6f", plaintiff: "#CC8800", mixed: "#888" };

  return (
    <div className="viz-case-timeline">
      <div className="viz-header">
        <div className="viz-label">California PAGA Defense — Case Law Evolution</div>
        <div className="viz-subtitle">13 years of landmark decisions with doctrinal interconnections, impact magnitude, and defense/plaintiff outcome markers</div>
      </div>
      <svg viewBox={"0 0 " + svgW + " " + svgH} fill="none" className="viz-svg" role="img" aria-label="Timeline of PAGA case law with interconnections showing doctrinal development">
        {/* Year ticks */}
        {[2012, 2014, 2016, 2018, 2020, 2022, 2024, 2026].map(function (y) {
          var x = xForYear(y);
          return (
            <g key={y}>
              <line x1={x} y1={lineY - 6} x2={x} y2={lineY + 6} stroke="rgba(44,62,58,0.12)" strokeWidth="1" />
              <text x={x} y={lineY + 22} textAnchor="middle" fontSize="9" fill="#bbb" fontFamily="Outfit,sans-serif">{y}</text>
            </g>
          );
        })}

        {/* Timeline base */}
        <line x1={startX} y1={lineY} x2={endX} y2={lineY} stroke="#2c3e3a" strokeWidth="2" strokeOpacity="0.12" />

        {/* Reform era highlight */}
        <rect x={xForYear(2024) - 8} y={lineY - 70} width={xForYear(2025.5) - xForYear(2024) + 16} height="140" rx="4"
          fill="rgba(44,62,58,0.025)" stroke="rgba(44,62,58,0.06)" strokeWidth="1" strokeDasharray="3 3" />
        <text x={xForYear(2024.75)} y={lineY - 76} textAnchor="middle" fontSize="6" fontWeight="600"
          fill="#8aa39e" fontFamily="Outfit,sans-serif" letterSpacing="1.5">REFORM ERA</text>

        {/* Interconnection arrows (drawn first so they're behind nodes) */}
        {cases.map(function (c, i) {
          if (!c.lineage || c.lineage.length === 0) return null;
          var x2 = xForYear(c.year + (c.side_pos === "bottom" ? 0.2 : 0));
          return c.lineage.map(function (srcIdx) {
            var src = cases[srcIdx];
            var x1 = xForYear(src.year + (src.side_pos === "bottom" ? 0.2 : 0));
            var cy = lineY + (c.side_pos === src.side_pos ? (c.side_pos === "top" ? -30 : 30) : 0);
            return (
              <path key={i + "-" + srcIdx}
                d={"M" + x1 + " " + lineY + " Q" + ((x1 + x2) / 2) + " " + cy + " " + x2 + " " + lineY}
                stroke="rgba(138,163,158,0.12)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            );
          });
        })}

        {/* Case nodes */}
        {cases.map(function (c, i) {
          var x = xForYear(c.year + (c.side_pos === "bottom" ? 0.2 : 0));
          var isTop = c.side_pos === "top";
          var isReform = c.name === "AB 2288";
          var cardY = isTop ? lineY - 155 : lineY + 32;
          var connY1 = isTop ? lineY - impactR(c.impact) : lineY + impactR(c.impact);
          var connY2 = isTop ? cardY + 90 : cardY;
          var sideColor = sideColors[c.side];

          return (
            <g key={i}>
              {/* Connector */}
              <line x1={x} y1={connY1} x2={x} y2={connY2}
                stroke={isReform ? "#4a7a6f" : "rgba(138,163,158,0.2)"} strokeWidth="1" />

              {/* Impact node */}
              <circle cx={x} cy={lineY} r={impactR(c.impact)}
                fill={isReform ? "#4a7a6f" : sideColor} fillOpacity={isReform ? 0.7 : 0.4}
                stroke={sideColor} strokeWidth="1" strokeOpacity="0.4" />

              {/* Card */}
              <rect x={x - 34} y={cardY} width="68" height="90" rx="3"
                fill={isReform ? "rgba(74,122,111,0.04)" : "rgba(44,62,58,0.03)"}
                stroke={isReform ? "rgba(74,122,111,0.15)" : "rgba(44,62,58,0.08)"} strokeWidth="1" />

              {/* Case name */}
              <text x={x} y={cardY + 14} textAnchor="middle" fontSize="9" fontWeight="700"
                fill={isReform ? "#4a7a6f" : "#1a1a1a"} fontFamily="Outfit,sans-serif">{c.name}</text>

              {/* Citation */}
              <text x={x} y={cardY + 26} textAnchor="middle" fontSize="6" fill="#bbb" fontFamily="Outfit,sans-serif">
                {c.cite.length > 16 ? c.cite.slice(0, 16) : c.cite}
              </text>

              {/* Separator */}
              <line x1={x - 20} y1={cardY + 32} x2={x + 20} y2={cardY + 32} stroke="rgba(44,62,58,0.06)" strokeWidth="0.5" />

              {/* Issue */}
              <foreignObject x={x - 31} y={cardY + 36} width="62" height="24">
                <div style={{ fontSize: "6.5px", color: "#888", fontFamily: "Outfit,sans-serif", textAlign: "center", lineHeight: "1.3" }}>
                  {c.issue}
                </div>
              </foreignObject>

              {/* Side indicator */}
              <rect x={x - 18} y={cardY + 64} width="36" height="12" rx="6"
                fill={sideColor} fillOpacity="0.1" stroke={sideColor} strokeWidth="0.5" strokeOpacity="0.3" />
              <text x={x} y={cardY + 73} textAnchor="middle" fontSize="5" fontWeight="600" letterSpacing="0.5"
                fill={sideColor} fontFamily="Outfit,sans-serif">
                {c.side === "defense" ? "DEF" : c.side === "plaintiff" ? "PLT" : "MIXED"}
              </text>

              {/* Impact dots */}
              <g transform={"translate(" + (x - 10) + "," + (cardY + 82) + ")"}>
                {[0, 1, 2, 3, 4].map(function (d) {
                  return <circle key={d} cx={d * 5} cy="0" r="1.5" fill={d < c.impact ? sideColor : "rgba(44,62,58,0.06)"} fillOpacity={d < c.impact ? 0.5 : 1} />;
                })}
              </g>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={"translate(20," + (svgH - 50) + ")"}>
          {/* Impact scale */}
          <text x="0" y="10" fontSize="7" fontWeight="600" fill="#999" fontFamily="Outfit,sans-serif" letterSpacing="1">IMPACT:</text>
          {[3, 4, 5].map(function (imp, i) {
            return (
              <g key={i}>
                <circle cx={60 + i * 40} cy="6" r={impactR(imp)} fill="#2c3e3a" fillOpacity="0.3" />
                <text x={60 + i * 40 + impactR(imp) + 4} y="10" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">
                  {imp === 3 ? "Moderate" : imp === 4 ? "Major" : "Landmark"}
                </text>
              </g>
            );
          })}

          {/* Outcome markers */}
          <text x="250" y="10" fontSize="7" fontWeight="600" fill="#999" fontFamily="Outfit,sans-serif" letterSpacing="1">OUTCOME:</text>
          {[
            { l: "Defense-favorable", c: "#4a7a6f" },
            { l: "Plaintiff-favorable", c: "#CC8800" },
            { l: "Mixed", c: "#888" },
          ].map(function (o, i) {
            return (
              <g key={i}>
                <rect x={310 + i * 120} y="0" width="8" height="12" rx="4" fill={o.c} fillOpacity="0.3" />
                <text x={322 + i * 120} y="10" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">{o.l}</text>
              </g>
            );
          })}

          {/* Pending */}
          <text x="0" y="30" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif" fontStyle="italic">
            Pending: Leeper v. Shipt (headless PAGA) · Camp v. Home Depot (time rounding) · Prime Healthcare (arb standing)
          </text>
          <line x1="0" y1="36" x2="680" y2="36" stroke="rgba(44,62,58,0.06)" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="0" y="48" fontSize="7" fill="#ccc" fontFamily="Outfit,sans-serif">
            Dashed lines show doctrinal lineage — how later decisions build on or respond to earlier holdings
          </text>
        </g>
      </svg>
    </div>
  );
}
