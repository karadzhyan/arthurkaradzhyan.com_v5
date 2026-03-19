"use client";
/* Industry × Violation Category Heatmap — Color-coded matrix showing
   which industries face which violation categories at what intensity.
   The kind of matrix a GC screenshots. */

export default function IndustryHeatmap() {
  var industries = ["Hospitality", "Automotive", "Healthcare\nStaffing", "Solar &\nEnergy", "Technology", "Agriculture"];
  var categories = [
    "Meal/Rest\nPeriods",
    "Regular Rate\n& OT",
    "Wage\nStatements",
    "Commission\n& Piece-Rate",
    "Off-the-Clock\nWork",
    "Exemption\nClassification",
    "Waiting Time\nPenalties",
  ];

  // Exposure intensity: 0 = none, 1 = low, 2 = moderate, 3 = high, 4 = critical
  var matrix = [
    // Hosp  Auto   HC    Solar  Tech   Ag
    [4,     2,     3,    3,     2,     3],  // Meal/Rest
    [3,     4,     2,    4,     3,     3],  // Regular Rate
    [3,     3,     3,    2,     2,     3],  // Wage Statements
    [2,     4,     1,    4,     2,     4],  // Commission/Piece-Rate
    [4,     2,     3,    3,     3,     3],  // Off-the-Clock
    [3,     3,     3,    2,     4,     2],  // Exemption
    [3,     4,     2,    2,     2,     3],  // Waiting Time
  ];

  var colors = [
    "rgba(44,62,58,0.03)",   // 0 - none
    "rgba(44,62,58,0.08)",   // 1 - low
    "rgba(44,62,58,0.18)",   // 2 - moderate
    "rgba(44,62,58,0.35)",   // 3 - high
    "rgba(204,136,0,0.55)",  // 4 - critical
  ];

  var textColors = [
    "rgba(44,62,58,0.15)",
    "rgba(44,62,58,0.3)",
    "rgba(44,62,58,0.5)",
    "#fff",
    "#fff",
  ];

  var labels = ["—", "LOW", "MOD", "HIGH", "CRIT"];

  var cellW = 85;
  var cellH = 44;
  var labelColW = 100;
  var headerH = 60;
  var totalW = labelColW + industries.length * cellW;
  var totalH = headerH + categories.length * cellH + 60;

  return (
    <div className="viz-heatmap">
      <div className="viz-header">
        <div className="viz-label">Industry × Violation Exposure Matrix</div>
        <div className="viz-subtitle">Relative exposure intensity across 6 industries and 7 PAGA violation categories</div>
      </div>
      <svg viewBox={"0 0 " + totalW + " " + totalH} fill="none" className="viz-svg" role="img" aria-label="Heatmap showing PAGA violation exposure intensity across 6 industries and 7 violation categories">
        {/* Column headers (industries) */}
        {industries.map(function (ind, i) {
          var lines = ind.split("\n");
          return (
            <g key={"h" + i}>
              {lines.map(function (line, li) {
                return (
                  <text key={li} x={labelColW + i * cellW + cellW / 2} y={20 + li * 13} textAnchor="middle"
                    fontSize="9" fontWeight="600" fill="#2c3e3a" fontFamily="Outfit,sans-serif">{line}</text>
                );
              })}
            </g>
          );
        })}

        {/* Rows */}
        {categories.map(function (cat, ri) {
          var lines = cat.split("\n");
          var y = headerH + ri * cellH;
          return (
            <g key={"r" + ri}>
              {/* Row label */}
              {lines.map(function (line, li) {
                return (
                  <text key={li} x={labelColW - 8} y={y + 20 + li * 12} textAnchor="end"
                    fontSize="9" fill="#666" fontFamily="Outfit,sans-serif">{line}</text>
                );
              })}
              {/* Cells */}
              {industries.map(function (_ind, ci) {
                var val = matrix[ri][ci];
                return (
                  <g key={"c" + ci}>
                    <rect x={labelColW + ci * cellW + 1} y={y + 1} width={cellW - 2} height={cellH - 2}
                      rx="3" fill={colors[val]} />
                    <text x={labelColW + ci * cellW + cellW / 2} y={y + cellH / 2 + 4}
                      textAnchor="middle" fontSize="8" fontWeight="600" letterSpacing="1"
                      fill={textColors[val]} fontFamily="Outfit,sans-serif">{labels[val]}</text>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Legend */}
        <g transform={"translate(" + labelColW + "," + (headerH + categories.length * cellH + 20) + ")"}>
          <text x="0" y="10" fontSize="8" fill="#999" fontFamily="Outfit,sans-serif" letterSpacing="1" fontWeight="500">EXPOSURE INTENSITY:</text>
          {["Low", "Moderate", "High", "Critical"].map(function (lbl, i) {
            var xOff = 120 + i * 90;
            return (
              <g key={i}>
                <rect x={xOff} y="0" width="14" height="14" rx="2" fill={colors[i + 1]} />
                <text x={xOff + 20} y="11" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">{lbl}</text>
              </g>
            );
          })}
        </g>
      </svg>
      <div className="viz-footnote">
        Exposure intensity reflects structural vulnerability of industry to each violation category, not frequency of litigation
      </div>
    </div>
  );
}
