"use client";
/* Recoverability Matrix — Now with dollar impact estimates, percentage of
   typical demand, plaintiff's characterization vs. defense position, and
   cumulative stripped/retained running totals. */

export default function RecoverabilityMatrix() {
  var categories = [
    { name: "Meal Period Premiums", statute: "§ 226.7", type: "wage", recoverable: false, plaintiffAmt: 520, defenseAmt: 0, plaintiffChar: "Civil penalty", defensePos: "Wages per Kirby", authority: "Kirby v. Immoos" },
    { name: "Rest Period Premiums", statute: "§ 226.7", type: "wage", recoverable: false, plaintiffAmt: 390, defenseAmt: 0, plaintiffChar: "Civil penalty", defensePos: "Wages per Kirby", authority: "Kirby v. Immoos" },
    { name: "Overtime Premiums", statute: "§ 510", type: "wage", recoverable: false, plaintiffAmt: 468, defenseAmt: 0, plaintiffChar: "Liquidated damages", defensePos: "Wage obligation", authority: "Statutory text" },
    { name: "Minimum Wage Violations", statute: "§ 1194", type: "wage", recoverable: false, plaintiffAmt: 299, defenseAmt: 0, plaintiffChar: "§ 1197.1 penalty", defensePos: "Wage differential", authority: "ZB, N.A." },
    { name: "Wage Statement Violations", statute: "§ 226(a)", type: "penalty", recoverable: true, plaintiffAmt: 260, defenseAmt: 260, plaintiffChar: "§ 226(e) penalty", defensePos: "Recoverable penalty", authority: "§ 226(e)(1)" },
    { name: "Waiting Time Penalties", statute: "§ 203", type: "mixed", recoverable: "partial", plaintiffAmt: 390, defenseAmt: 130, plaintiffChar: "Civil penalty", defensePos: "Disputed characterization", authority: "Pending authority" },
    { name: "Default PAGA Penalty", statute: "§ 2699(f)", type: "penalty", recoverable: true, plaintiffAmt: 520, defenseAmt: 520, plaintiffChar: "Statutory penalty", defensePos: "Recoverable penalty", authority: "§ 2699(f)(2)" },
    { name: "Expense Reimbursement", statute: "§ 2802", type: "wage", recoverable: false, plaintiffAmt: 195, defenseAmt: 0, plaintiffChar: "Civil penalty", defensePos: "Indemnity obligation", authority: "ZB, N.A." },
  ];

  var totalPlaintiff = 0, totalDefense = 0;
  categories.forEach(function (c) { totalPlaintiff += c.plaintiffAmt; totalDefense += c.defenseAmt; });
  var strippedPct = Math.round((1 - totalDefense / totalPlaintiff) * 100);

  var svgW = 760;
  var rowH = 48;
  var headerH = 44;
  var svgH = headerH + categories.length * rowH + 110;

  function fmtK(n) { return n === 0 ? "$0" : "$" + n + "K"; }

  return (
    <div className="viz-recoverability">
      <div className="viz-header">
        <div className="viz-label">PAGA Recoverability Analysis</div>
        <div className="viz-subtitle">ZB, N.A. v. Superior Court framework — plaintiff's characterization vs. defense position on each category, with dollar impact</div>
      </div>
      <svg viewBox={"0 0 " + svgW + " " + svgH} fill="none" className="viz-svg" role="img" aria-label="Recoverability matrix with dollar impact showing what PAGA can and cannot recover">
        {/* Column headers */}
        <rect x="0" y="0" width={svgW} height={headerH} rx="4" fill="rgba(44,62,58,0.05)" />
        <text x="12" y="18" fontSize="8" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">CATEGORY</text>
        <text x="12" y="34" fontSize="7" fill="#999" fontFamily="Outfit,sans-serif">Statute</text>
        <text x="200" y="18" fontSize="8" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">TYPE</text>
        <text x="260" y="18" fontSize="8" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif" letterSpacing="1">PLAINTIFF</text>
        <text x="260" y="34" fontSize="7" fill="rgba(204,136,0,0.5)" fontFamily="Outfit,sans-serif">Characterization</text>
        <text x="400" y="18" fontSize="8" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif" letterSpacing="1">DEFENSE</text>
        <text x="400" y="34" fontSize="7" fill="rgba(74,122,111,0.5)" fontFamily="Outfit,sans-serif">Position</text>
        <text x="540" y="18" fontSize="8" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">PAGA?</text>
        <text x="590" y="18" fontSize="8" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif" letterSpacing="1">$ CLAIMED</text>
        <text x="670" y="18" fontSize="8" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif" letterSpacing="1">$ RECOVERABLE</text>

        {/* Rows */}
        {categories.map(function (cat, i) {
          var y = headerH + i * rowH;
          var isRecoverable = cat.recoverable === true;
          var isPartial = cat.recoverable === "partial";
          var bg = i % 2 === 0 ? "rgba(44,62,58,0.02)" : "transparent";
          var claimedBarW = (cat.plaintiffAmt / 520) * 50;
          var recoverBarW = (cat.defenseAmt / 520) * 50;

          return (
            <g key={i}>
              <rect x="0" y={y} width={svgW} height={rowH} fill={bg} />

              {/* Name & statute */}
              <text x="12" y={y + 18} fontSize="9" fontWeight="600" fill="#1a1a1a" fontFamily="Outfit,sans-serif">{cat.name}</text>
              <text x="12" y={y + 30} fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif" fontStyle="italic">{cat.statute}</text>
              <text x="12" y={y + 42} fontSize="6" fill="#ccc" fontFamily="Outfit,sans-serif">{cat.authority}</text>

              {/* Type badge */}
              <rect x="200" y={y + 6} width={cat.type === "mixed" ? 36 : 44} height="18" rx="9"
                fill={cat.type === "wage" ? "rgba(204,136,0,0.06)" : cat.type === "penalty" ? "rgba(44,62,58,0.06)" : "rgba(128,128,128,0.06)"}
                stroke={cat.type === "wage" ? "rgba(204,136,0,0.15)" : cat.type === "penalty" ? "rgba(44,62,58,0.15)" : "rgba(128,128,128,0.15)"}
                strokeWidth="1" />
              <text x={cat.type === "mixed" ? 218 : 222} y={y + 19} textAnchor="middle" fontSize="7" fontWeight="600" letterSpacing="1"
                fill={cat.type === "wage" ? "#CC8800" : cat.type === "penalty" ? "#2c3e3a" : "#888"}
                fontFamily="Outfit,sans-serif">{cat.type.toUpperCase()}</text>

              {/* Plaintiff characterization */}
              <text x="260" y={y + 18} fontSize="8" fill="#CC8800" fontFamily="Outfit,sans-serif">{cat.plaintiffChar}</text>

              {/* Defense position */}
              <text x="400" y={y + 18} fontSize="8" fill="#4a7a6f" fontFamily="Outfit,sans-serif">{cat.defensePos}</text>

              {/* Recoverable indicator */}
              <circle cx="556" cy={y + 14} r="9"
                fill={isRecoverable ? "rgba(44,62,58,0.1)" : isPartial ? "rgba(204,136,0,0.08)" : "rgba(204,68,68,0.06)"}
                stroke={isRecoverable ? "#2c3e3a" : isPartial ? "#CC8800" : "rgba(204,68,68,0.3)"}
                strokeWidth="1.5" />
              <text x="556" y={y + 18} textAnchor="middle" fontSize="10" fontWeight="700"
                fill={isRecoverable ? "#2c3e3a" : isPartial ? "#CC8800" : "rgba(204,68,68,0.5)"}
                fontFamily="Outfit,sans-serif">
                {isRecoverable ? "✓" : isPartial ? "?" : "✕"}
              </text>

              {/* Dollar bars */}
              <rect x="590" y={y + 8} width={claimedBarW} height="10" rx="2" fill="#CC8800" fillOpacity="0.3" />
              <text x={590 + claimedBarW + 4} y={y + 17} fontSize="7" fontWeight="600" fill="#CC8800" fontFamily="Outfit,sans-serif">{fmtK(cat.plaintiffAmt)}</text>

              <rect x="670" y={y + 8} width={recoverBarW} height="10" rx="2"
                fill={cat.defenseAmt === 0 ? "rgba(204,68,68,0.15)" : "#4a7a6f"} fillOpacity={cat.defenseAmt === 0 ? 1 : 0.3} />
              <text x={670 + Math.max(recoverBarW, 0) + 4} y={y + 17} fontSize="7" fontWeight="600"
                fill={cat.defenseAmt === 0 ? "rgba(204,68,68,0.4)" : "#4a7a6f"} fontFamily="Outfit,sans-serif">
                {cat.defenseAmt === 0 ? "STRIPPED" : fmtK(cat.defenseAmt)}
              </text>

              {/* Strikethrough for stripped amounts */}
              {cat.defenseAmt === 0 && (
                <line x1="590" y1={y + 36} x2={590 + claimedBarW} y2={y + 36} stroke="rgba(204,68,68,0.2)" strokeWidth="1" />
              )}
            </g>
          );
        })}

        {/* ── TOTALS ── */}
        <line x1="0" y1={headerH + categories.length * rowH + 4} x2={svgW} y2={headerH + categories.length * rowH + 4} stroke="rgba(44,62,58,0.15)" strokeWidth="1.5" />

        <g transform={"translate(0," + (headerH + categories.length * rowH + 16) + ")"}>
          {/* Summary boxes */}
          <rect x="12" y="0" width="200" height="40" rx="4" fill="rgba(204,136,0,0.04)" stroke="rgba(204,136,0,0.1)" strokeWidth="1" />
          <text x="22" y="14" fontSize="8" fontWeight="600" fill="#CC8800" fontFamily="Outfit,sans-serif">Plaintiff's Total Demand</text>
          <text x="22" y="32" fontSize="16" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif">{fmtK(totalPlaintiff)}</text>
          <text x="100" y="32" fontSize="8" fill="rgba(204,136,0,0.5)" fontFamily="Outfit,sans-serif">8 categories at 100%</text>

          <rect x="230" y="0" width="200" height="40" rx="4" fill="rgba(74,122,111,0.04)" stroke="rgba(74,122,111,0.1)" strokeWidth="1" />
          <text x="240" y="14" fontSize="8" fontWeight="600" fill="#4a7a6f" fontFamily="Outfit,sans-serif">Actually Recoverable via PAGA</text>
          <text x="240" y="32" fontSize="16" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif">{fmtK(totalDefense)}</text>
          <text x="330" y="32" fontSize="8" fill="rgba(74,122,111,0.5)" fontFamily="Outfit,sans-serif">after ZB, N.A. filter</text>

          <rect x="448" y="0" width="130" height="40" rx="4" fill="rgba(204,68,68,0.04)" stroke="rgba(204,68,68,0.1)" strokeWidth="1" />
          <text x="458" y="14" fontSize="8" fontWeight="600" fill="rgba(204,68,68,0.5)" fontFamily="Outfit,sans-serif">Stripped from Demand</text>
          <text x="458" y="32" fontSize="16" fontWeight="700" fill="rgba(204,68,68,0.5)" fontFamily="Outfit,sans-serif">{fmtK(totalPlaintiff - totalDefense)}</text>
          <text x="530" y="32" fontSize="8" fill="rgba(204,68,68,0.3)" fontFamily="Outfit,sans-serif">({strippedPct}%)</text>

          {/* Impact badge */}
          <rect x="596" y="0" width="152" height="40" rx="4" fill="#2c3e3a" />
          <text x="672" y="16" textAnchor="middle" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.5)" fontFamily="Outfit,sans-serif" letterSpacing="1">DEMAND REDUCTION</text>
          <text x="672" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="Outfit,sans-serif">{strippedPct}%</text>
        </g>

        {/* Bottom key insight */}
        <rect x="12" y={svgH - 36} width="736" height="28" rx="3" fill="rgba(44,62,58,0.03)" />
        <text x="24" y={svgH - 18} fontSize="8" fontWeight="600" fill="#2c3e3a" fontFamily="Outfit,sans-serif">
          Key: Plaintiff's demand typically includes all 8 categories. The recoverability filter removes 4-5 categories before any other defense analysis begins.
        </text>
      </svg>
      <div className="viz-footnote">
        Framework: <em>ZB, N.A. v. Superior Court</em> (2019) 8 Cal.5th 175 · <em>Kirby v. Immoos Fire Protection</em> (2012) 53 Cal.4th 1244 · Dollar amounts are illustrative (50 emp., 26 periods)
      </div>
    </div>
  );
}
