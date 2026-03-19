"use client";
/* Recoverability Matrix — Shows which alleged violations actually produce
   PAGA-recoverable penalties vs. those that are wages/damages only.
   The ZB, N.A. framework that strips millions from plaintiff demands. */

export default function RecoverabilityMatrix() {
  var categories = [
    { name: "Meal Period Premiums", statute: "§ 226.7", type: "wage", recoverable: false, note: "Wages per Kirby — not a 'civil penalty'" },
    { name: "Rest Period Premiums", statute: "§ 226.7", type: "wage", recoverable: false, note: "Same Kirby analysis as meal premiums" },
    { name: "Overtime Premiums", statute: "§ 510", type: "wage", recoverable: false, note: "Wage obligation — damages, not penalties" },
    { name: "Minimum Wage Violations", statute: "§ 1194", type: "wage", recoverable: false, note: "Wage claim — § 1197.1 penalty is separate" },
    { name: "Wage Statement Violations", statute: "§ 226(a)", type: "penalty", recoverable: true, note: "§ 226(e) — $50/$100 per violation, capped $4K" },
    { name: "Waiting Time Penalties", statute: "§ 203", type: "mixed", recoverable: "partial", note: "Penalty, but PAGA recovery path is disputed" },
    { name: "Default PAGA Penalty", statute: "§ 2699(f)", type: "penalty", recoverable: true, note: "$100 initial, $200 subsequent per pay period" },
    { name: "Expense Reimbursement", statute: "§ 2802", type: "wage", recoverable: false, note: "Indemnity obligation — not a penalty" },
  ];

  var svgW = 760;
  var rowH = 36;
  var headerH = 40;
  var svgH = headerH + categories.length * rowH + 60;

  return (
    <div className="viz-recoverability">
      <div className="viz-header">
        <div className="viz-label">PAGA Recoverability Analysis</div>
        <div className="viz-subtitle">ZB, N.A. v. Superior Court framework — what PAGA can and cannot recover</div>
      </div>
      <svg viewBox={"0 0 " + svgW + " " + svgH} fill="none" className="viz-svg" role="img" aria-label="Matrix showing which violation categories are recoverable through PAGA and which are not">
        {/* Column headers */}
        <rect x="0" y="0" width={svgW} height={headerH} rx="4" fill="rgba(44,62,58,0.05)" />
        <text x="20" y="25" fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">VIOLATION CATEGORY</text>
        <text x="280" y="25" fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">STATUTE</text>
        <text x="370" y="25" fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">TYPE</text>
        <text x="460" y="25" fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">PAGA RECOVERABLE?</text>
        <text x="600" y="25" fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">ANALYSIS</text>

        {/* Rows */}
        {categories.map(function (cat, i) {
          var y = headerH + i * rowH;
          var isRecoverable = cat.recoverable === true;
          var isPartial = cat.recoverable === "partial";
          var bg = i % 2 === 0 ? "rgba(44,62,58,0.02)" : "transparent";
          return (
            <g key={i}>
              <rect x="0" y={y} width={svgW} height={rowH} fill={bg} />
              {/* Name */}
              <text x="20" y={y + 22} fontSize="10" fontWeight="600" fill="#1a1a1a" fontFamily="Outfit,sans-serif">{cat.name}</text>
              {/* Statute */}
              <text x="280" y={y + 22} fontSize="9" fill="#888" fontFamily="Outfit,sans-serif" fontStyle="italic">{cat.statute}</text>
              {/* Type badge */}
              <rect x="370" y={y + 8} width={cat.type === "mixed" ? 40 : 48} height="20" rx="3"
                fill={cat.type === "wage" ? "rgba(204,136,0,0.08)" : cat.type === "penalty" ? "rgba(44,62,58,0.08)" : "rgba(128,128,128,0.08)"}
                stroke={cat.type === "wage" ? "rgba(204,136,0,0.2)" : cat.type === "penalty" ? "rgba(44,62,58,0.2)" : "rgba(128,128,128,0.2)"}
                strokeWidth="1" />
              <text x={cat.type === "mixed" ? 390 : 394} y={y + 22} textAnchor="middle" fontSize="7" fontWeight="600" letterSpacing="1"
                fill={cat.type === "wage" ? "#CC8800" : cat.type === "penalty" ? "#2c3e3a" : "#888"}
                fontFamily="Outfit,sans-serif">{cat.type.toUpperCase()}</text>
              {/* Recoverable indicator */}
              <circle cx="500" cy={y + 18} r="8"
                fill={isRecoverable ? "rgba(44,62,58,0.12)" : isPartial ? "rgba(204,136,0,0.1)" : "rgba(204,68,68,0.08)"}
                stroke={isRecoverable ? "#2c3e3a" : isPartial ? "#CC8800" : "rgba(204,68,68,0.3)"}
                strokeWidth="1.5" />
              <text x="500" y={y + 22} textAnchor="middle" fontSize="9" fontWeight="700"
                fill={isRecoverable ? "#2c3e3a" : isPartial ? "#CC8800" : "rgba(204,68,68,0.6)"}
                fontFamily="Outfit,sans-serif">
                {isRecoverable ? "✓" : isPartial ? "?" : "✕"}
              </text>
              {/* Note */}
              <text x="530" y={y + 22} fontSize="8" fill="#999" fontFamily="Outfit,sans-serif">{cat.note}</text>
            </g>
          );
        })}

        {/* Bottom summary */}
        <g transform={"translate(0," + (headerH + categories.length * rowH + 16) + ")"}>
          <rect x="20" y="0" width="220" height="30" rx="4" fill="rgba(204,68,68,0.04)" stroke="rgba(204,68,68,0.1)" strokeWidth="1" />
          <text x="130" y="12" textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(204,68,68,0.6)" fontFamily="Outfit,sans-serif">4 of 8 Categories Not Recoverable</text>
          <text x="130" y="24" textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">Typically 40-60% of plaintiff's demand</text>

          <rect x="260" y="0" width="200" height="30" rx="4" fill="rgba(44,62,58,0.04)" stroke="rgba(44,62,58,0.1)" strokeWidth="1" />
          <text x="360" y="12" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">Recoverable Categories Only</text>
          <text x="360" y="24" textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">Form the basis of defense exposure model</text>
        </g>
      </svg>
      <div className="viz-footnote">
        Framework: <em>ZB, N.A. v. Superior Court</em> (2019) 8 Cal.5th 175 · <em>Kirby v. Immoos Fire Protection</em> (2012) 53 Cal.4th 1244
      </div>
    </div>
  );
}
