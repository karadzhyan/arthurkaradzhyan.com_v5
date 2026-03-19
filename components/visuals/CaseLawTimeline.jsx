"use client";
/* Case Law Timeline — Chronological visualization of landmark PAGA decisions
   showing how the defense landscape evolved from 2012 to present. */

export default function CaseLawTimeline() {
  var cases = [
    { year: 2012, name: "Brinker", cite: "53 Cal.4th 1004", issue: "Provide, Not Ensure", impact: "Established meal period standard", side: "top" },
    { year: 2012, name: "Kirby", cite: "53 Cal.4th 1244", issue: "Premiums = Wages", impact: "Meal/rest premiums are wages, not penalties", side: "bottom" },
    { year: 2014, name: "Duran", cite: "59 Cal.4th 1", issue: "Statistical Sampling Limits", impact: "Due process constraints on sampling", side: "top" },
    { year: 2018, name: "Alvarado", cite: "4 Cal.5th 542", issue: "Flat-Sum Bonus Rate", impact: "Changed regular rate calculation", side: "bottom" },
    { year: 2019, name: "ZB, N.A.", cite: "8 Cal.5th 175", issue: "PAGA Recoverability", impact: "Limited what PAGA can recover", side: "top" },
    { year: 2021, name: "Donohue", cite: "11 Cal.5th 58", issue: "Rounding Eliminated", impact: "No rounding; rebuttable presumption", side: "bottom" },
    { year: 2021, name: "Ferra", cite: "11 Cal.5th 858", issue: "Regular Rate Premiums", impact: "Premiums at regular rate, not base", side: "top" },
    { year: 2022, name: "Naranjo", cite: "13 Cal.5th 93", issue: "Derivative Penalties", impact: "Meal premiums → wage stmt violations", side: "bottom" },
    { year: 2023, name: "Adolph", cite: "14 Cal.5th 1104", issue: "Standing Post-Arb", impact: "PAGA claims survive arbitration", side: "top" },
    { year: 2024, name: "Estrada", cite: "15 Cal.5th 582", issue: "Manageability", impact: "Courts can limit PAGA scope", side: "bottom" },
    { year: 2024, name: "AB 2288/SB 92", cite: "Stats. 2024", issue: "PAGA Reforms", impact: "Penalty caps, cure, anti-stacking", side: "top" },
    { year: 2025, name: "Hohenshelt", cite: "18 Cal.5th 310", issue: "Arb Fee Forfeiture", impact: "Changed forfeiture standard", side: "bottom" },
  ];

  var svgW = 760;
  var svgH = 380;
  var lineY = 170;
  var startX = 40;
  var endX = svgW - 40;
  var years = cases.map(function (c) { return c.year; });
  var minYear = 2011;
  var maxYear = 2026;

  function xForYear(y) {
    return startX + ((y - minYear) / (maxYear - minYear)) * (endX - startX);
  }

  return (
    <div className="viz-case-timeline">
      <div className="viz-header">
        <div className="viz-label">California PAGA Defense — Case Law Evolution</div>
        <div className="viz-subtitle">13 years of landmark decisions that shaped the current defense landscape</div>
      </div>
      <svg viewBox={"0 0 " + svgW + " " + svgH} fill="none" className="viz-svg" role="img" aria-label="Timeline of landmark PAGA case law decisions from 2012 to 2025">
        {/* Year ticks */}
        {[2012, 2014, 2016, 2018, 2020, 2022, 2024, 2026].map(function (y) {
          var x = xForYear(y);
          return (
            <g key={y}>
              <line x1={x} y1={lineY - 6} x2={x} y2={lineY + 6} stroke="rgba(44,62,58,0.15)" strokeWidth="1" />
              <text x={x} y={lineY + 20} textAnchor="middle" fontSize="9" fill="#aaa" fontFamily="Outfit,sans-serif">{y}</text>
            </g>
          );
        })}

        {/* Timeline base */}
        <line x1={startX} y1={lineY} x2={endX} y2={lineY} stroke="#2c3e3a" strokeWidth="2" strokeOpacity="0.15" />

        {/* Reform era highlight */}
        <rect x={xForYear(2024) - 5} y={lineY - 60} width={xForYear(2025.5) - xForYear(2024) + 10} height="120" rx="4"
          fill="rgba(44,62,58,0.03)" stroke="rgba(44,62,58,0.08)" strokeWidth="1" strokeDasharray="3 3" />
        <text x={xForYear(2024.75)} y={lineY - 66} textAnchor="middle" fontSize="7" fontWeight="600"
          fill="#8aa39e" fontFamily="Outfit,sans-serif" letterSpacing="1.5">REFORM ERA</text>

        {/* Cases */}
        {cases.map(function (c, i) {
          var x = xForYear(c.year + (c.side === "bottom" ? 0.3 : 0));
          var isTop = c.side === "top";
          var isReform = c.name === "AB 2288/SB 92";
          var cardY = isTop ? lineY - 140 : lineY + 30;
          var connY1 = isTop ? lineY - 8 : lineY + 8;
          var connY2 = isTop ? cardY + 78 : cardY;

          return (
            <g key={i}>
              {/* Connector */}
              <line x1={x} y1={connY1} x2={x} y2={connY2}
                stroke={isReform ? "#CC8800" : "#8aa39e"} strokeWidth="1" strokeOpacity="0.4" />
              {/* Node dot */}
              <circle cx={x} cy={lineY} r={isReform ? "5" : "3.5"}
                fill={isReform ? "#CC8800" : "#2c3e3a"} fillOpacity={isReform ? "0.8" : "0.5"} />
              {/* Card */}
              <rect x={x - 36} y={cardY} width="72" height="78" rx="3"
                fill={isReform ? "rgba(204,136,0,0.05)" : "rgba(44,62,58,0.03)"}
                stroke={isReform ? "rgba(204,136,0,0.2)" : "rgba(44,62,58,0.1)"} strokeWidth="1" />
              <text x={x} y={cardY + 16} textAnchor="middle" fontSize="10" fontWeight="700"
                fill={isReform ? "#CC8800" : "#1a1a1a"} fontFamily="Outfit,sans-serif">{c.name}</text>
              <text x={x} y={cardY + 30} textAnchor="middle" fontSize="7" fill="#999" fontFamily="Outfit,sans-serif">{c.cite}</text>
              <line x1={x - 20} y1={cardY + 36} x2={x + 20} y2={cardY + 36} stroke="rgba(44,62,58,0.08)" strokeWidth="0.5" />
              <foreignObject x={x - 33} y={cardY + 40} width="66" height="36">
                <div style={{ fontSize: "7px", color: "#888", fontFamily: "Outfit,sans-serif", textAlign: "center", lineHeight: "1.4" }}>
                  {c.issue}
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Bottom legend */}
        <g transform="translate(40, 350)">
          <circle cx="6" cy="6" r="3.5" fill="#2c3e3a" fillOpacity="0.5" />
          <text x="16" y="10" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Supreme Court Decision</text>
          <circle cx="150" cy="6" r="5" fill="#CC8800" fillOpacity="0.8" />
          <text x="162" y="10" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Legislative Reform</text>
          <text x="680" y="10" textAnchor="end" fontSize="8" fill="#aaa" fontFamily="Outfit,sans-serif" fontStyle="italic">
            Pending: Leeper v. Shipt (headless PAGA)
          </text>
        </g>
      </svg>
    </div>
  );
}
