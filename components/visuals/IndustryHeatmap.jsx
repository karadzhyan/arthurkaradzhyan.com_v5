"use client";
/* Industry × Violation Category Heatmap — Now with row/column risk scores,
   top-risk callouts per industry, total exposure index, and defense
   strategy priority indicators. */

export default function IndustryHeatmap() {
  var industries = [
    { code: "HO", name: "Hospitality", wageOrder: "WO-5" },
    { code: "AU", name: "Automotive", wageOrder: "WO-7" },
    { code: "HC", name: "Healthcare", wageOrder: "WO-4/5" },
    { code: "SE", name: "Solar", wageOrder: "WO-16" },
    { code: "TE", name: "Technology", wageOrder: "WO-4" },
    { code: "AG", name: "Agriculture", wageOrder: "WO-14" },
  ];

  var categories = [
    { code: "M/R", name: "Meal/Rest Periods", statute: "§ 226.7, § 512" },
    { code: "OT", name: "Regular Rate & OT", statute: "§ 510, § 1194" },
    { code: "WS", name: "Wage Statements", statute: "§ 226(a)" },
    { code: "C/P", name: "Commission/Piece-Rate", statute: "§ 226.2, WO" },
    { code: "OTC", name: "Off-the-Clock Work", statute: "§ 510, § 1194" },
    { code: "EXM", name: "Exemption Class.", statute: "§ 515, WO" },
    { code: "WT", name: "Waiting Time", statute: "§ 201-203" },
    { code: "EXP", name: "Expense Reimburse.", statute: "§ 2802" },
  ];

  /* Exposure intensity: 0=none, 1=low, 2=moderate, 3=high, 4=critical
     Each cell also has a defense priority: P (proactive), R (reactive), M (monitor) */
  var matrix = [
    //          HO   AU   HC   SE   TE   AG
    { vals: [4,  2,  3,  3,  2,  3], pri: ["P","R","P","P","R","P"] },  // Meal/Rest
    { vals: [3,  4,  2,  4,  3,  3], pri: ["R","P","R","P","P","P"] },  // Regular Rate
    { vals: [3,  3,  3,  2,  2,  3], pri: ["R","R","R","R","R","R"] },  // Wage Stmts
    { vals: [2,  4,  1,  4,  2,  4], pri: ["M","P","M","P","M","P"] },  // Commission/PR
    { vals: [4,  2,  3,  3,  3,  3], pri: ["P","M","P","P","P","P"] },  // Off-the-Clock
    { vals: [3,  3,  3,  2,  4,  2], pri: ["R","R","R","M","P","M"] },  // Exemption
    { vals: [3,  4,  2,  2,  2,  3], pri: ["R","P","R","M","M","R"] },  // Waiting Time
    { vals: [2,  1,  2,  4,  3,  2], pri: ["M","M","M","P","P","M"] },  // Expense
  ];

  var colors = [
    "rgba(44,62,58,0.03)",
    "rgba(44,62,58,0.08)",
    "rgba(44,62,58,0.18)",
    "rgba(44,62,58,0.35)",
    "rgba(204,136,0,0.55)",
  ];
  var textColors = ["rgba(44,62,58,0.15)", "rgba(44,62,58,0.3)", "rgba(44,62,58,0.5)", "#fff", "#fff"];
  var labels = ["—", "LOW", "MOD", "HIGH", "CRIT"];

  /* Calculate column totals (industry risk score) */
  var colTotals = industries.map(function (_ind, ci) {
    var sum = 0;
    matrix.forEach(function (row) { sum += row.vals[ci]; });
    return sum;
  });

  /* Calculate row totals (category risk score) */
  var rowTotals = matrix.map(function (row) {
    var sum = 0;
    row.vals.forEach(function (v) { sum += v; });
    return sum;
  });

  /* Find top-risk category per industry */
  var topRiskPerIndustry = industries.map(function (_ind, ci) {
    var maxVal = 0, maxIdx = 0;
    matrix.forEach(function (row, ri) {
      if (row.vals[ci] > maxVal) { maxVal = row.vals[ci]; maxIdx = ri; }
    });
    return { category: categories[maxIdx].code, level: maxVal };
  });

  var cellW = 72, cellH = 42, labelColW = 130, headerH = 68;
  var scoreColW = 48;
  var totalW = labelColW + industries.length * cellW + scoreColW + 10;
  var totalH = headerH + categories.length * cellH + 100;

  return (
    <div className="viz-heatmap">
      <div className="viz-header">
        <div className="viz-label">Industry × Violation Exposure Matrix</div>
        <div className="viz-subtitle">Relative exposure intensity across 6 industries and 8 PAGA violation categories · with defense priority indicators and risk scores</div>
      </div>
      <svg viewBox={"0 0 " + totalW + " " + totalH} fill="none" className="viz-svg" role="img" aria-label="Heatmap showing PAGA violation exposure intensity with risk scores and defense priorities">
        {/* Column headers */}
        {industries.map(function (ind, i) {
          return (
            <g key={"h" + i}>
              <text x={labelColW + i * cellW + cellW / 2} y="16" textAnchor="middle"
                fontSize="10" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">{ind.code}</text>
              <text x={labelColW + i * cellW + cellW / 2} y="28" textAnchor="middle"
                fontSize="7" fill="#999" fontFamily="Outfit,sans-serif">{ind.name}</text>
              <text x={labelColW + i * cellW + cellW / 2} y="40" textAnchor="middle"
                fontSize="6" fill="#bbb" fontFamily="Outfit,sans-serif">{ind.wageOrder}</text>
              {/* Top risk indicator */}
              <rect x={labelColW + i * cellW + cellW / 2 - 16} y="46" width="32" height="14" rx="7"
                fill={topRiskPerIndustry[i].level === 4 ? "rgba(204,136,0,0.12)" : "rgba(44,62,58,0.04)"}
                stroke={topRiskPerIndustry[i].level === 4 ? "rgba(204,136,0,0.25)" : "rgba(44,62,58,0.08)"} strokeWidth="0.75" />
              <text x={labelColW + i * cellW + cellW / 2} y="56" textAnchor="middle"
                fontSize="6" fontWeight="600" fill={topRiskPerIndustry[i].level === 4 ? "#CC8800" : "#999"}
                fontFamily="Outfit,sans-serif">#{topRiskPerIndustry[i].category}</text>
            </g>
          );
        })}

        {/* Score column header */}
        <text x={labelColW + industries.length * cellW + scoreColW / 2} y="24" textAnchor="middle"
          fontSize="7" fontWeight="600" fill="#8aa39e" fontFamily="Outfit,sans-serif" letterSpacing="1">RISK</text>
        <text x={labelColW + industries.length * cellW + scoreColW / 2} y="36" textAnchor="middle"
          fontSize="7" fontWeight="600" fill="#8aa39e" fontFamily="Outfit,sans-serif" letterSpacing="1">SCORE</text>

        {/* Rows */}
        {categories.map(function (cat, ri) {
          var y = headerH + ri * cellH;
          var maxInRow = Math.max.apply(null, matrix[ri].vals);
          return (
            <g key={"r" + ri}>
              {/* Row label */}
              <text x="8" y={y + 18} fontSize="9" fontWeight="600" fill="#1a1a1a" fontFamily="Outfit,sans-serif">{cat.name}</text>
              <text x="8" y={y + 30} fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif" fontStyle="italic">{cat.statute}</text>

              {/* Cells */}
              {industries.map(function (_ind, ci) {
                var val = matrix[ri].vals[ci];
                var pri = matrix[ri].pri[ci];
                var isMax = val === maxInRow && val >= 3;
                return (
                  <g key={"c" + ci}>
                    <rect x={labelColW + ci * cellW + 1} y={y + 1} width={cellW - 2} height={cellH - 2}
                      rx="3" fill={colors[val]}
                      stroke={isMax ? "rgba(204,136,0,0.3)" : "none"} strokeWidth={isMax ? "1.5" : "0"} />
                    <text x={labelColW + ci * cellW + cellW / 2} y={y + cellH / 2}
                      textAnchor="middle" fontSize="8" fontWeight="600" letterSpacing="1"
                      fill={textColors[val]} fontFamily="Outfit,sans-serif">{labels[val]}</text>
                    {/* Defense priority dot */}
                    <circle cx={labelColW + ci * cellW + cellW - 8} cy={y + 8} r="3"
                      fill={pri === "P" ? "rgba(204,136,0,0.5)" : pri === "R" ? "rgba(44,62,58,0.25)" : "rgba(44,62,58,0.08)"} />
                    <text x={labelColW + ci * cellW + cellW - 8} y={y + 10.5} textAnchor="middle"
                      fontSize="4" fontWeight="700" fill={val >= 3 ? "rgba(255,255,255,0.7)" : "#888"} fontFamily="Outfit,sans-serif">{pri}</text>
                  </g>
                );
              })}

              {/* Row risk score */}
              <rect x={labelColW + industries.length * cellW + 4} y={y + 6} width={scoreColW - 8} height={cellH - 12} rx="3"
                fill={rowTotals[ri] >= 20 ? "rgba(204,136,0,0.08)" : "rgba(44,62,58,0.03)"}
                stroke={rowTotals[ri] >= 20 ? "rgba(204,136,0,0.15)" : "rgba(44,62,58,0.06)"} strokeWidth="1" />
              <text x={labelColW + industries.length * cellW + scoreColW / 2} y={y + cellH / 2 + 4}
                textAnchor="middle" fontSize="12" fontWeight="700"
                fill={rowTotals[ri] >= 20 ? "#CC8800" : "#2c3e3a"} fontFamily="Outfit,sans-serif">{rowTotals[ri]}</text>
            </g>
          );
        })}

        {/* Column totals row */}
        <line x1={labelColW} y1={headerH + categories.length * cellH + 4} x2={labelColW + industries.length * cellW} y2={headerH + categories.length * cellH + 4}
          stroke="rgba(44,62,58,0.12)" strokeWidth="1.5" />
        <text x="8" y={headerH + categories.length * cellH + 22} fontSize="9" fontWeight="700" fill="#1a1a1a" fontFamily="Outfit,sans-serif">Industry Risk Score</text>
        {industries.map(function (_ind, ci) {
          var maxCol = Math.max.apply(null, colTotals);
          var isMax = colTotals[ci] === maxCol;
          return (
            <g key={"ct" + ci}>
              <rect x={labelColW + ci * cellW + cellW / 2 - 16} y={headerH + categories.length * cellH + 10} width="32" height="22" rx="4"
                fill={isMax ? "rgba(204,136,0,0.1)" : "rgba(44,62,58,0.04)"} />
              <text x={labelColW + ci * cellW + cellW / 2} y={headerH + categories.length * cellH + 26} textAnchor="middle"
                fontSize="12" fontWeight="700" fill={isMax ? "#CC8800" : "#2c3e3a"} fontFamily="Outfit,sans-serif">{colTotals[ci]}</text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={"translate(8," + (headerH + categories.length * cellH + 46) + ")"}>
          <text x="0" y="10" fontSize="7" fill="#999" fontFamily="Outfit,sans-serif" letterSpacing="1" fontWeight="600">EXPOSURE:</text>
          {["Low", "Moderate", "High", "Critical"].map(function (lbl, i) {
            var xOff = 70 + i * 72;
            return (
              <g key={i}>
                <rect x={xOff} y="0" width="12" height="12" rx="2" fill={colors[i + 1]} />
                <text x={xOff + 16} y="10" fontSize="7" fill="#888" fontFamily="Outfit,sans-serif">{lbl}</text>
              </g>
            );
          })}

          <text x="370" y="10" fontSize="7" fill="#999" fontFamily="Outfit,sans-serif" letterSpacing="1" fontWeight="600">DEFENSE PRIORITY:</text>
          {[{ l: "P", d: "Proactive", c: "rgba(204,136,0,0.5)" }, { l: "R", d: "Reactive", c: "rgba(44,62,58,0.25)" }, { l: "M", d: "Monitor", c: "rgba(44,62,58,0.08)" }].map(function (p, i) {
            return (
              <g key={i}>
                <circle cx={450 + i * 70} cy="6" r="4" fill={p.c} />
                <text x={450 + i * 70} y="8" textAnchor="middle" fontSize="4" fontWeight="700" fill="#666" fontFamily="Outfit,sans-serif">{p.l}</text>
                <text x={458 + i * 70} y="10" fontSize="7" fill="#888" fontFamily="Outfit,sans-serif">{p.d}</text>
              </g>
            );
          })}
        </g>
      </svg>
      <div className="viz-footnote">
        Exposure intensity reflects structural vulnerability based on industry operating model, applicable wage order, and compensation structure — not litigation frequency · Risk scores are sum of intensity values (max 32)
      </div>
    </div>
  );
}
