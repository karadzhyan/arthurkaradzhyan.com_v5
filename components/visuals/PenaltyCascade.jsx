"use client";
/* Naranjo Cascade — Now with 4 derivative streams, dollar amounts flowing through
   each node, per-employee/per-period math, reform overlay comparison, and
   cross-references to related cases at each node. */

export default function PenaltyCascade() {
  /* Layout constants */
  var svgW = 760, svgH = 640;
  var tierY = [32, 140, 268, 380, 490, 575];

  return (
    <div className="viz-cascade">
      <div className="viz-header">
        <div className="viz-label">The Naranjo Cascade</div>
        <div className="viz-subtitle">How one meal period violation generates four independent penalty streams — with dollar amounts at each stage</div>
      </div>
      <svg viewBox={"0 0 " + svgW + " " + svgH} fill="none" className="viz-svg" role="img" aria-label="Naranjo penalty cascade flowchart with dollar amounts and reform overlay">
        <defs>
          <marker id="arrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0L10 3.5L0 7z" fill="#8aa39e" />
          </marker>
          <marker id="arrow-amber" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0L10 3.5L0 7z" fill="#CC8800" />
          </marker>
        </defs>

        {/* ── TIER LABELS (right side) ── */}
        {[
          { y: tierY[0], label: "PRIMARY VIOLATION" },
          { y: tierY[1], label: "DERIVATIVE OBLIGATIONS" },
          { y: tierY[2], label: "PAGA PENALTY AMOUNTS" },
          { y: tierY[3], label: "PER-EMPLOYEE MULTIPLICATION" },
          { y: tierY[4], label: "AGGREGATE EXPOSURE" },
        ].map(function (t, i) {
          var h = (tierY[i + 1] || svgH) - t.y - 10;
          return (
            <g key={i}>
              <rect x="0" y={t.y - 8} width={svgW} height={h} fill={i % 2 === 0 ? "rgba(44,62,58,0.02)" : "transparent"} rx="3" />
              <text x={svgW - 10} y={t.y + 6} textAnchor="end" fontSize="7" fontWeight="600" letterSpacing="2" fill="rgba(44,62,58,0.18)" fontFamily="Outfit,sans-serif">{t.label}</text>
            </g>
          );
        })}

        {/* ── TIER 0: Primary Violation ── */}
        <rect x="250" y={tierY[0]} width="260" height="56" rx="5" fill="rgba(204,136,0,0.08)" stroke="#CC8800" strokeWidth="2" strokeOpacity="0.6" />
        <text x="380" y={tierY[0] + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif">1 Missed Meal Period</text>
        <text x="380" y={tierY[0] + 35} textAnchor="middle" fontSize="9" fill="rgba(204,136,0,0.6)" fontFamily="Outfit,sans-serif">Lab. Code § 226.7 · Brinker "provide not ensure"</text>
        <text x="380" y={tierY[0] + 48} textAnchor="middle" fontSize="8" fill="rgba(204,136,0,0.4)" fontFamily="Outfit,sans-serif">Donohue: rebuttable presumption from short punches</text>

        {/* ── TIER 1: Derivative Obligations (4 streams) ── */}
        {/* Connector lines from root to 4 nodes */}
        {[95, 260, 460, 640].map(function (targetX, i) {
          return (
            <path key={"e1-" + i} d={"M380 88 C380 114 " + targetX + " 114 " + targetX + " " + tierY[1]}
              stroke="#8aa39e" strokeWidth="1.5" strokeOpacity="0.35" markerEnd="url(#arrow)" fill="none" />
          );
        })}

        {/* Stream 1: Meal Period Premium */}
        <rect x="20" y={tierY[1]} width="150" height="74" rx="4" fill="rgba(44,62,58,0.05)" stroke="rgba(44,62,58,0.15)" strokeWidth="1" />
        <text x="95" y={tierY[1] + 16} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1a1a1a" fontFamily="Outfit,sans-serif">Meal Period Premium</text>
        <text x="95" y={tierY[1] + 30} textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">§ 226.7(c)</text>
        <rect x="35" y={tierY[1] + 38} width="120" height="14" rx="2" fill="rgba(204,136,0,0.06)" />
        <text x="95" y={tierY[1] + 49} textAnchor="middle" fontSize="8" fontWeight="600" fill="#CC8800" fontFamily="Outfit,sans-serif">1 hr × regular rate</text>
        <text x="95" y={tierY[1] + 65} textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">Ferra: at regular rate, not base</text>

        {/* Stream 2: Wage Statement Violation */}
        <rect x="185" y={tierY[1]} width="150" height="74" rx="4" fill="rgba(44,62,58,0.05)" stroke="rgba(44,62,58,0.15)" strokeWidth="1" />
        <text x="260" y={tierY[1] + 16} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1a1a1a" fontFamily="Outfit,sans-serif">Wage Statement</text>
        <text x="260" y={tierY[1] + 30} textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">§ 226(a) — premium not reported</text>
        <rect x="200" y={tierY[1] + 38} width="120" height="14" rx="2" fill="rgba(204,136,0,0.06)" />
        <text x="260" y={tierY[1] + 49} textAnchor="middle" fontSize="8" fontWeight="600" fill="#CC8800" fontFamily="Outfit,sans-serif">$50 initial / $100 subseq.</text>
        <text x="260" y={tierY[1] + 65} textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">Capped $4K/employee · Naranjo</text>

        {/* Stream 3: Waiting Time */}
        <rect x="385" y={tierY[1]} width="150" height="74" rx="4" fill="rgba(44,62,58,0.05)" stroke="rgba(44,62,58,0.15)" strokeWidth="1" />
        <text x="460" y={tierY[1] + 16} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1a1a1a" fontFamily="Outfit,sans-serif">Waiting Time</text>
        <text x="460" y={tierY[1] + 30} textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">§ 203 — unpaid at separation</text>
        <rect x="400" y={tierY[1] + 38} width="120" height="14" rx="2" fill="rgba(204,136,0,0.06)" />
        <text x="460" y={tierY[1] + 49} textAnchor="middle" fontSize="8" fontWeight="600" fill="#CC8800" fontFamily="Outfit,sans-serif">Up to 30 days' wages</text>
        <text x="460" y={tierY[1] + 65} textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">Per separated employee</text>

        {/* Stream 4: Interest */}
        <rect x="570" y={tierY[1]} width="170" height="74" rx="4" fill="rgba(44,62,58,0.05)" stroke="rgba(44,62,58,0.15)" strokeWidth="1" />
        <text x="655" y={tierY[1] + 16} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1a1a1a" fontFamily="Outfit,sans-serif">Statutory Interest</text>
        <text x="655" y={tierY[1] + 30} textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">§ 218.6 — prejudgment interest</text>
        <rect x="590" y={tierY[1] + 38} width="130" height="14" rx="2" fill="rgba(44,62,58,0.04)" />
        <text x="655" y={tierY[1] + 49} textAnchor="middle" fontSize="8" fontWeight="600" fill="#666" fontFamily="Outfit,sans-serif">7% per annum on wages</text>
        <text x="655" y={tierY[1] + 65} textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">Compounding from accrual</text>

        {/* ── TIER 2: PAGA Penalty Amounts ── */}
        {[95, 260, 460].map(function (x, i) {
          return (
            <path key={"e2-" + i} d={"M" + x + " " + (tierY[1] + 74) + " L" + x + " " + tierY[2]}
              stroke="#8aa39e" strokeWidth="1.5" strokeOpacity="0.3" markerEnd="url(#arrow)" fill="none" />
          );
        })}

        {/* Penalty box 1: Default § 2699(f) */}
        <rect x="20" y={tierY[2]} width="150" height="62" rx="4" fill="rgba(74,122,111,0.06)" stroke="#4a7a6f" strokeWidth="1" strokeOpacity="0.3" />
        <text x="95" y={tierY[2] + 16} textAnchor="middle" fontSize="9" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif">Default Penalty</text>
        <text x="95" y={tierY[2] + 30} textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">§ 2699(f)(2)</text>
        <text x="95" y={tierY[2] + 46} textAnchor="middle" fontSize="14" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif">$100 / $200</text>
        <text x="95" y={tierY[2] + 58} textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">Initial / subsequent violation</text>

        {/* Penalty box 2: § 226(e) */}
        <rect x="185" y={tierY[2]} width="150" height="62" rx="4" fill="rgba(74,122,111,0.06)" stroke="#4a7a6f" strokeWidth="1" strokeOpacity="0.3" />
        <text x="260" y={tierY[2] + 16} textAnchor="middle" fontSize="9" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif">§ 226(e) Penalty</text>
        <text x="260" y={tierY[2] + 30} textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Knowing & intentional</text>
        <text x="260" y={tierY[2] + 46} textAnchor="middle" fontSize="14" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif">$50 → $100</text>
        <text x="260" y={tierY[2] + 58} textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">Per employee per pay period</text>

        {/* Penalty box 3: § 203 */}
        <rect x="385" y={tierY[2]} width="150" height="62" rx="4" fill="rgba(74,122,111,0.06)" stroke="#4a7a6f" strokeWidth="1" strokeOpacity="0.3" />
        <text x="460" y={tierY[2] + 16} textAnchor="middle" fontSize="9" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif">§ 203 Penalty</text>
        <text x="460" y={tierY[2] + 30} textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Willful failure to pay</text>
        <text x="460" y={tierY[2] + 46} textAnchor="middle" fontSize="14" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif">30 days</text>
        <text x="460" y={tierY[2] + 58} textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">× daily rate of pay</text>

        {/* Reform comparison box */}
        <rect x="570" y={tierY[2]} width="170" height="62" rx="4" fill="rgba(44,62,58,0.04)" stroke="rgba(44,62,58,0.12)" strokeWidth="1" strokeDasharray="4 3" />
        <text x="655" y={tierY[2] + 14} textAnchor="middle" fontSize="8" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">2024 REFORM IMPACT</text>
        <text x="655" y={tierY[2] + 30} textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Pre-reform: $200 default</text>
        <text x="655" y={tierY[2] + 42} textAnchor="middle" fontSize="8" fill="#4a7a6f" fontFamily="Outfit,sans-serif">Post-reform: $100 default</text>
        <text x="655" y={tierY[2] + 56} textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">AB 2288 § 2699(f)(2)(A)</text>

        {/* ── TIER 3: Per-Employee Multiplication ── */}
        {[95, 260, 460].map(function (x, i) {
          return (
            <path key={"e3-" + i} d={"M" + x + " " + (tierY[2] + 62) + " L" + x + " " + tierY[3]}
              stroke="#8aa39e" strokeWidth="1.5" strokeOpacity="0.25" markerEnd="url(#arrow)" fill="none" />
          );
        })}

        {/* Multiplication boxes */}
        {[
          { x: 20, label: "$200 × 26 periods × 50 emp", result: "$260,000", sub: "Single category, pre-reform" },
          { x: 185, label: "$100 × 26 periods × 50 emp", result: "$130,000", sub: "Per Naranjo derivative" },
          { x: 385, label: "30 days × $200/day × 15 sep", result: "$90,000", sub: "15 separated employees" },
        ].map(function (m, i) {
          return (
            <g key={i}>
              <rect x={m.x} y={tierY[3]} width="150" height="56" rx="4" fill="rgba(30,45,42,0.06)" stroke="#1e2d2a" strokeWidth="1" strokeOpacity="0.15" />
              <text x={m.x + 75} y={tierY[3] + 14} textAnchor="middle" fontSize="7" fill="#888" fontFamily="Outfit,sans-serif">{m.label}</text>
              <text x={m.x + 75} y={tierY[3] + 34} textAnchor="middle" fontSize="16" fontWeight="700" fill="#1e2d2a" fontFamily="Outfit,sans-serif">{m.result}</text>
              <text x={m.x + 75} y={tierY[3] + 48} textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">{m.sub}</text>
            </g>
          );
        })}

        {/* ── TIER 4: Aggregate Exposure ── */}
        <path d="M95 436 L380 470" stroke="#8aa39e" strokeWidth="1" strokeOpacity="0.2" fill="none" />
        <path d="M260 436 L380 470" stroke="#8aa39e" strokeWidth="1" strokeOpacity="0.2" fill="none" />
        <path d="M460 436 L380 470" stroke="#8aa39e" strokeWidth="1" strokeOpacity="0.2" fill="none" />

        {/* Pre-reform total */}
        <rect x="200" y={tierY[4]} width="180" height="56" rx="5" fill="#1e2d2a" stroke="#2c3e3a" strokeWidth="2" />
        <text x="290" y={tierY[4] + 16} textAnchor="middle" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.4)" fontFamily="Outfit,sans-serif" letterSpacing="1">PRE-REFORM TOTAL</text>
        <text x="290" y={tierY[4] + 38} textAnchor="middle" fontSize="22" fontWeight="700" fill="#fff" fontFamily="Outfit,sans-serif">$480,000</text>
        <text x="290" y={tierY[4] + 52} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="Outfit,sans-serif">Single meal period category only</text>

        {/* Arrow to post-reform */}
        <path d={"M400 " + (tierY[4] + 28) + " L430 " + (tierY[4] + 28)} stroke="#4a7a6f" strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />

        {/* Post-reform total */}
        <rect x="440" y={tierY[4]} width="180" height="56" rx="5" fill="rgba(74,122,111,0.1)" stroke="#4a7a6f" strokeWidth="1.5" />
        <text x="530" y={tierY[4] + 16} textAnchor="middle" fontSize="8" fontWeight="600" fill="rgba(74,122,111,0.6)" fontFamily="Outfit,sans-serif" letterSpacing="1">POST-REFORM</text>
        <text x="530" y={tierY[4] + 38} textAnchor="middle" fontSize="22" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif">$240,000</text>
        <text x="530" y={tierY[4] + 52} textAnchor="middle" fontSize="7" fill="#888" fontFamily="Outfit,sans-serif">With penalty cap + anti-stacking</text>

        {/* Reduction badge */}
        <rect x="638" y={tierY[4] + 14} width="50" height="28" rx="14" fill="rgba(74,122,111,0.15)" />
        <text x="663" y={tierY[4] + 32} textAnchor="middle" fontSize="11" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif">−50%</text>

        {/* ── BOTTOM: Anti-stacking + cross-references ── */}
        <line x1="20" y1={tierY[5] - 10} x2="740" y2={tierY[5] - 10} stroke="rgba(44,62,58,0.08)" strokeWidth="1" />

        <rect x="20" y={tierY[5]} width="340" height="48" rx="4" fill="rgba(44,62,58,0.04)" stroke="rgba(44,62,58,0.1)" strokeWidth="1" strokeDasharray="3 3" />
        <text x="36" y={tierY[5] + 16} fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">§ 2699(i) Anti-Stacking Limitation</text>
        <text x="36" y={tierY[5] + 30} fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Derivative penalties from same conduct limited under 2024 reforms.</text>
        <text x="36" y={tierY[5] + 42} fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif" fontStyle="italic">No published appellate interpretation as of March 2026.</text>

        <rect x="380" y={tierY[5]} width="360" height="48" rx="4" fill="rgba(44,62,58,0.02)" stroke="rgba(44,62,58,0.06)" strokeWidth="1" />
        <text x="396" y={tierY[5] + 14} fontSize="8" fontWeight="600" letterSpacing="1" fill="rgba(44,62,58,0.3)" fontFamily="Outfit,sans-serif">KEY AUTHORITIES</text>
        <text x="396" y={tierY[5] + 28} fontSize="7" fill="#888" fontFamily="Outfit,sans-serif">Naranjo v. Spectrum (2022) 13 Cal.5th 93 — derivative wage stmt violations</text>
        <text x="396" y={tierY[5] + 40} fontSize="7" fill="#888" fontFamily="Outfit,sans-serif">Ferra v. Loews (2021) 11 Cal.5th 858 — premiums at regular rate</text>
      </svg>
      <div className="viz-footnote">
        Illustrative calculation: 50 employees · 26 bi-weekly pay periods · 12-month PAGA period · 15 separated employees · $200/day avg rate
      </div>
    </div>
  );
}
