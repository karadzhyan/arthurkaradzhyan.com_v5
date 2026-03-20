"use client";
/* MatterOutcomes — Visual summary of case outcomes: win rate donut,
   category breakdown bars, and key results. Replaces the visually
   empty Matters section with analytical proof points. */

export default function MatterOutcomes() {
  var outcomes = [
    { label: "Favorable Settlement", count: 4, color: "#2c3e3a" },
    { label: "Framework / Theory Adopted", count: 3, color: "#4a7a6f" },
    { label: "Exposure Reduced 50%+", count: 3, color: "#8aa39e" },
    { label: "Motion / Procedural Win", count: 2, color: "rgba(44,62,58,0.4)" },
    { label: "Investigation Complete", count: 2, color: "rgba(44,62,58,0.25)" },
    { label: "Active / In Progress", count: 2, color: "rgba(44,62,58,0.12)" },
  ];

  var total = 0;
  outcomes.forEach(function (o) { total += o.count; });

  /* Donut chart segments */
  var radius = 44;
  var circumference = 2 * Math.PI * radius;
  var runningOffset = 0;

  var segments = outcomes.map(function (o) {
    var pct = o.count / total;
    var dashLen = pct * circumference;
    var offset = runningOffset;
    runningOffset += dashLen;
    return { dashLen: dashLen, offset: offset, color: o.color, pct: pct };
  });

  var keyResults = [
    { metric: "60%+", label: "Average exposure reduction at mediation" },
    { metric: "93%", label: "Maximum reduction achieved (penalty model)" },
    { metric: "$0", label: "Exposure on non-recoverable categories" },
    { metric: "3", label: "Novel defense theories adopted by practice groups" },
  ];

  return (
    <div className="viz-outcomes">
      <div className="viz-header">
        <div className="viz-label">Matter Outcomes</div>
        <div className="viz-subtitle">{total} representative matters across PAGA defense, wage-and-hour, and workplace investigations</div>
      </div>
      <svg viewBox="0 0 760 200" fill="none" className="viz-svg" role="img" aria-label="Matter outcomes showing case result categories and key metrics">
        {/* Donut chart */}
        <g transform="translate(70, 100)">
          {segments.map(function (seg, i) {
            return (
              <circle key={i} cx="0" cy="0" r={radius} fill="none"
                stroke={seg.color} strokeWidth="16"
                strokeDasharray={seg.dashLen + " " + (circumference - seg.dashLen)}
                strokeDashoffset={-seg.offset}
                transform="rotate(-90)" />
            );
          })}
          <text x="0" y="-4" textAnchor="middle" fontSize="24" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">{total}</text>
          <text x="0" y="12" textAnchor="middle" fontSize="8" fill="#999" fontFamily="Outfit,sans-serif" letterSpacing="1">MATTERS</text>
        </g>

        {/* Category legend with bars */}
        <g transform="translate(160, 16)">
          {outcomes.map(function (o, i) {
            var barW = (o.count / total) * 140;
            return (
              <g key={i} transform={"translate(0," + (i * 28) + ")"}>
                <rect x="0" y="0" width={barW} height="14" rx="2" fill={o.color} fillOpacity="0.8" />
                <text x={barW + 6} y="11" fontSize="10" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">{o.count}</text>
                <text x={barW + 24} y="11" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">{o.label}</text>
              </g>
            );
          })}
        </g>

        {/* Key results */}
        <g transform="translate(470, 16)">
          <text x="0" y="0" fontSize="7" fontWeight="600" letterSpacing="2" fill="rgba(44,62,58,0.3)" fontFamily="Outfit,sans-serif">KEY METRICS</text>
          {keyResults.map(function (r, i) {
            return (
              <g key={i} transform={"translate(0," + (16 + i * 40) + ")"}>
                <text x="0" y="12" fontSize="22" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">{r.metric}</text>
                <text x="0" y="28" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">{r.label}</text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
