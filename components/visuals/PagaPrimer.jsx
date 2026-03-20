"use client";
/* PagaPrimer — Visual infographic replacing the plain text "New to PAGA?"
   primer. Shows the penalty formula, key dates, and reform impact in a
   scannable format. */

export default function PagaPrimer() {
  return (
    <div className="viz-primer">
      <div className="viz-header">
        <div className="viz-label">New to PAGA?</div>
        <div className="viz-subtitle">Private Attorneys General Act — Lab. Code § 2698 et seq.</div>
      </div>
      <svg viewBox="0 0 760 280" fill="none" className="viz-svg" role="img" aria-label="PAGA primer infographic showing the penalty formula, key statutes, and 2024 reform impact">
        {/* Three-column layout */}

        {/* Column 1: What PAGA does */}
        <rect x="0" y="0" width="235" height="230" rx="6" fill="rgba(44,62,58,0.03)" stroke="rgba(44,62,58,0.06)" strokeWidth="1" />
        <text x="16" y="22" fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">WHAT PAGA DOES</text>
        <line x1="16" y1="30" x2="80" y2="30" stroke="rgba(44,62,58,0.1)" strokeWidth="1" />

        <text x="16" y="50" fontSize="8" fill="#555" fontFamily="Outfit,sans-serif">Employees sue employers for</text>
        <text x="16" y="62" fontSize="8" fill="#555" fontFamily="Outfit,sans-serif">Labor Code violations on behalf</text>
        <text x="16" y="74" fontSize="8" fill="#555" fontFamily="Outfit,sans-serif">of <tspan fontWeight="700" fill="#1a1a1a">all "aggrieved employees."</tspan></text>

        <text x="16" y="98" fontSize="8" fontWeight="600" fill="#2c3e3a" fontFamily="Outfit,sans-serif">Penalty formula:</text>
        <g transform="translate(16, 108)">
          {["Employees", "×", "Pay Periods", "×", "Violations", "×", "$200"].map(function (item, i) {
            var isOp = item === "×";
            return isOp ? (
              <text key={i} x={i * 30 + 15} y="12" fontSize="10" fill="rgba(44,62,58,0.25)" fontFamily="Outfit,sans-serif">{item}</text>
            ) : (
              <g key={i}>
                <rect x={i * 30} y="0" width="28" height="20" rx="3" fill="rgba(44,62,58,0.06)" />
                <text x={i * 30 + 14} y="13" textAnchor="middle" fontSize="6" fontWeight="600" fill="#2c3e3a" fontFamily="Outfit,sans-serif">{item}</text>
              </g>
            );
          })}
        </g>

        <text x="16" y="148" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Example: 50 emp × 26 periods ×</text>
        <text x="16" y="160" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">1 violation × $200 =</text>
        <text x="16" y="180" fontSize="18" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif">$260,000</text>
        <text x="16" y="196" fontSize="7" fill="#999" fontFamily="Outfit,sans-serif">Before derivative penalties multiply it</text>

        {/* Column 2: Key statutes */}
        <rect x="255" y="0" width="235" height="230" rx="6" fill="rgba(44,62,58,0.03)" stroke="rgba(44,62,58,0.06)" strokeWidth="1" />
        <text x="271" y="22" fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">KEY STATUTES</text>
        <line x1="271" y1="30" x2="340" y2="30" stroke="rgba(44,62,58,0.1)" strokeWidth="1" />

        {[
          { s: "§ 2699(f)", d: "Default penalty rates" },
          { s: "§ 226.7", d: "Meal/rest period premiums" },
          { s: "§ 226(a)", d: "Wage statement requirements" },
          { s: "§ 203", d: "Waiting time penalties" },
          { s: "§ 510", d: "Overtime premium calculation" },
          { s: "§ 2699(g)(h)", d: "Penalty cap provisions" },
          { s: "§ 2699(i)", d: "Anti-stacking limitation" },
          { s: "§ 2699(p)", d: "Manageability limit" },
        ].map(function (item, i) {
          return (
            <g key={i}>
              <text x="271" y={50 + i * 22} fontSize="8" fontWeight="600" fill="#2c3e3a" fontFamily="Outfit,sans-serif" fontStyle="italic">{item.s}</text>
              <text x="340" y={50 + i * 22} fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">{item.d}</text>
            </g>
          );
        })}

        {/* Column 3: 2024 Reforms */}
        <rect x="510" y="0" width="250" height="230" rx="6" fill="rgba(44,62,58,0.03)" stroke="rgba(44,62,58,0.06)" strokeWidth="1" />
        <text x="526" y="22" fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">2024 REFORMS (AB 2288 / SB 92)</text>
        <line x1="526" y1="30" x2="620" y2="30" stroke="rgba(44,62,58,0.1)" strokeWidth="1" />

        {[
          { label: "Default penalty cut", detail: "$200 → $100", color: "#4a7a6f" },
          { label: "15% cap", detail: "Pre-notice compliance", color: "#4a7a6f" },
          { label: "30% cap", detail: "Post-notice remediation", color: "#4a7a6f" },
          { label: "Cure mechanism", detail: "33-day proposal window", color: "#CC8800" },
          { label: "Anti-stacking", detail: "§ 2699(i) — derivative limit", color: "#4a7a6f" },
          { label: "Manageability", detail: "§ 2699(p) — court can limit", color: "#4a7a6f" },
          { label: "Early eval conference", detail: "New procedural mechanism", color: "#2c3e3a" },
        ].map(function (r, i) {
          return (
            <g key={i}>
              <circle cx="534" cy={50 + i * 26 - 3} r="3" fill={r.color} fillOpacity="0.4" />
              <text x="544" y={50 + i * 26} fontSize="8" fontWeight="600" fill="#1a1a1a" fontFamily="Outfit,sans-serif">{r.label}</text>
              <text x="544" y={62 + i * 26} fontSize="7" fill="#999" fontFamily="Outfit,sans-serif">{r.detail}</text>
            </g>
          );
        })}

        {/* Bottom bar */}
        <rect x="0" y="244" width="760" height="30" rx="4" fill="rgba(44,62,58,0.04)" />
        <text x="380" y="263" textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">
          These tools model every dimension above. Start with the Penalty Estimator to see the full three-scenario exposure model.
        </text>
      </svg>
    </div>
  );
}
