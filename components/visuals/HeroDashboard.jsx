"use client";
import { useState, useEffect } from "react";
/* Hero Dashboard — Dense analytical command-center with 6 data sections:
   exposure scenarios, Naranjo cascade, reform windows, violation matrix,
   recoverability filter, and platform stats. */

export default function HeroDashboard() {
  var [tick, setTick] = useState(0);
  useEffect(function () {
    var t = setTimeout(function () { setTick(1); }, 400);
    return function () { clearTimeout(t); };
  }, []);

  return (
    <svg viewBox="0 0 400 900" fill="none" className="home-hero-dashboard" role="img" aria-label="Analytical dashboard with PAGA exposure metrics, penalty cascades, reform windows, and violation matrix">
      {/* Subtle grid */}
      <g stroke="rgba(255,255,255,0.02)" strokeWidth="0.5">
        {[80, 160, 240, 320].map(function (x) { return <line key={"v" + x} x1={x} y1="0" x2={x} y2="900" />; })}
        {[100, 200, 300, 400, 500, 600, 700, 800].map(function (y) { return <line key={"h" + y} x1="0" y1={y} x2="400" y2={y} />; })}
      </g>

      {/* ── §1: EXPOSURE SCENARIOS ── */}
      <text x="30" y="72" fontSize="7" fontWeight="600" letterSpacing="3" fill="rgba(138,163,158,0.45)" fontFamily="Outfit,sans-serif">EXPOSURE ANALYSIS</text>
      <line x1="30" y1="78" x2="160" y2="78" stroke="rgba(138,163,158,0.12)" strokeWidth="0.5" />

      {[
        { label: "PLAINTIFF MAX", w: 300, amt: "$2.8M", color: "#CC8800", y: 0 },
        { label: "REALISTIC", w: 72, amt: "$684K", color: "#8aa39e", y: 28 },
        { label: "DEFENSE", w: 20, amt: "$187K", color: "#4a7a6f", y: 56 },
      ].map(function (bar) {
        return (
          <g key={bar.label} transform="translate(30, 90)">
            <rect x="0" y={bar.y} width={tick ? bar.w : 0} height="18" rx="2" fill={bar.color} fillOpacity="0.3"
              style={{ transition: "width 1s ease-out", transitionDelay: (bar.y / 80) + "s" }} />
            <text x={tick ? bar.w + 6 : 6} y={bar.y + 13} fontSize="9" fontWeight="700" fill={bar.color} fontFamily="Outfit,sans-serif"
              style={{ opacity: tick, transition: "opacity 0.5s 1s" }}>{bar.amt}</text>
            <text x={tick ? 6 : -40} y={bar.y + 13} fontSize="6" fontWeight="500" fill="rgba(255,255,255,0.5)" fontFamily="Outfit,sans-serif"
              style={{ transition: "all 0.6s 0.3s" }}>{bar.label}</text>
          </g>
        );
      })}

      {/* Reduction badge */}
      <g style={{ opacity: tick, transition: "opacity 0.8s 1.2s" }}>
        <rect x="280" y="120" width="90" height="44" rx="4" fill="rgba(138,163,158,0.06)" stroke="rgba(138,163,158,0.12)" strokeWidth="1" />
        <text x="325" y="142" textAnchor="middle" fontSize="20" fontWeight="700" fill="#8aa39e" fontFamily="Outfit,sans-serif">93%</text>
        <text x="325" y="156" textAnchor="middle" fontSize="6" fontWeight="600" letterSpacing="2" fill="rgba(138,163,158,0.4)" fontFamily="Outfit,sans-serif">REDUCTION</text>
      </g>

      {/* ── §2: NARANJO CASCADE (mini) ── */}
      <text x="30" y="196" fontSize="7" fontWeight="600" letterSpacing="3" fill="rgba(138,163,158,0.45)" fontFamily="Outfit,sans-serif">NARANJO CASCADE</text>
      <line x1="30" y1="202" x2="160" y2="202" stroke="rgba(138,163,158,0.12)" strokeWidth="0.5" />

      <g transform="translate(60, 214)" style={{ opacity: tick, transition: "opacity 0.8s 0.5s" }}>
        <rect x="80" y="0" width="120" height="22" rx="3" fill="rgba(204,136,0,0.12)" stroke="rgba(204,136,0,0.25)" strokeWidth="1" />
        <text x="140" y="14" textAnchor="middle" fontSize="7" fontWeight="600" fill="#CC8800" fontFamily="Outfit,sans-serif">1 MISSED MEAL</text>

        {[{ x: 20, l: "§226.7", a: "$260K" }, { x: 110, l: "§226(a)", a: "$130K" }, { x: 200, l: "§203", a: "$90K" }].map(function (d, i) {
          return (
            <g key={i}>
              <line x1="140" y1="22" x2={d.x + 30} y2="36" stroke="rgba(138,163,158,0.25)" strokeWidth="0.75" />
              <rect x={d.x} y="38" width="60" height="28" rx="2" fill="rgba(44,62,58,0.12)" />
              <text x={d.x + 30} y="50" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.5)" fontFamily="Outfit,sans-serif">{d.l}</text>
              <text x={d.x + 30} y="60" textAnchor="middle" fontSize="7" fontWeight="700" fill="#8aa39e" fontFamily="Outfit,sans-serif">{d.a}</text>
            </g>
          );
        })}

        {/* Convergence */}
        {[50, 140, 230].map(function (x) { return <line key={x} x1={x} y1="66" x2="140" y2="80" stroke="rgba(138,163,158,0.15)" strokeWidth="0.5" />; })}
        <rect x="80" y="82" width="120" height="20" rx="2" fill="rgba(30,45,42,0.35)" />
        <text x="140" y="95" textAnchor="middle" fontSize="7" fontWeight="600" fill="rgba(255,255,255,0.6)" fontFamily="Outfit,sans-serif">× PAGA MULTIPLIER → $480K</text>
      </g>

      {/* ── §3: REFORM WINDOWS ── */}
      <text x="30" y="340" fontSize="7" fontWeight="600" letterSpacing="3" fill="rgba(138,163,158,0.45)" fontFamily="Outfit,sans-serif">REFORM WINDOWS</text>
      <line x1="30" y1="346" x2="160" y2="346" stroke="rgba(138,163,158,0.12)" strokeWidth="0.5" />

      <g transform="translate(30, 358)" style={{ opacity: tick, transition: "opacity 0.8s 0.7s" }}>
        <line x1="0" y1="24" x2="340" y2="24" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
        {[
          { x: 0, d: "0", l: "Notice", c: "#CC8800" },
          { x: 85, d: "33", l: "Cure", c: "#CC8800" },
          { x: 155, d: "60", l: "Remediation", c: "#8aa39e" },
          { x: 210, d: "65", l: "LWDA", c: "#4a7a6f" },
          { x: 340, d: "→", l: "Trial", c: "rgba(138,163,158,0.3)" },
        ].map(function (m) {
          return (
            <g key={m.x}>
              <circle cx={m.x} cy="24" r="3.5" fill={m.c} fillOpacity="0.5" />
              <text x={m.x} y="14" textAnchor="middle" fontSize="9" fontWeight="700" fill={m.c} fontFamily="Outfit,sans-serif">{m.d}</text>
              <text x={m.x} y="40" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.3)" fontFamily="Outfit,sans-serif">{m.l}</text>
            </g>
          );
        })}

        {/* Cap zones */}
        <rect x="0" y="48" width="85" height="14" rx="2" fill="rgba(204,136,0,0.08)" />
        <text x="42" y="58" textAnchor="middle" fontSize="5" fontWeight="600" fill="rgba(204,136,0,0.5)" fontFamily="Outfit,sans-serif">CRITICAL WINDOW</text>
        <rect x="0" y="66" width="155" height="14" rx="2" fill="rgba(138,163,158,0.06)" />
        <text x="77" y="76" textAnchor="middle" fontSize="5" fontWeight="600" fill="rgba(138,163,158,0.4)" fontFamily="Outfit,sans-serif">30% CAP QUALIFICATION</text>

        {/* Cap boxes */}
        <rect x="200" y="48" width="70" height="32" rx="3" fill="rgba(138,163,158,0.06)" stroke="rgba(138,163,158,0.1)" strokeWidth="0.5" />
        <text x="235" y="60" textAnchor="middle" fontSize="7" fontWeight="700" fill="#8aa39e" fontFamily="Outfit,sans-serif">15%</text>
        <text x="235" y="72" textAnchor="middle" fontSize="5" fill="rgba(138,163,158,0.3)" fontFamily="Outfit,sans-serif">Pre-notice</text>
        <rect x="275" y="48" width="70" height="32" rx="3" fill="rgba(138,163,158,0.06)" stroke="rgba(138,163,158,0.1)" strokeWidth="0.5" />
        <text x="310" y="60" textAnchor="middle" fontSize="7" fontWeight="700" fill="#8aa39e" fontFamily="Outfit,sans-serif">30%</text>
        <text x="310" y="72" textAnchor="middle" fontSize="5" fill="rgba(138,163,158,0.3)" fontFamily="Outfit,sans-serif">Post-notice</text>
      </g>

      {/* ── §4: VIOLATION MATRIX (mini heatmap) ── */}
      <text x="30" y="470" fontSize="7" fontWeight="600" letterSpacing="3" fill="rgba(138,163,158,0.45)" fontFamily="Outfit,sans-serif">VIOLATION MATRIX</text>
      <line x1="30" y1="476" x2="160" y2="476" stroke="rgba(138,163,158,0.12)" strokeWidth="0.5" />

      <g transform="translate(30, 486)" style={{ opacity: tick, transition: "opacity 0.8s 0.9s" }}>
        {/* Labels */}
        {["HO", "AU", "HC", "SE", "TE", "AG"].map(function (l, i) {
          return <text key={i} x={i * 52 + 26} y="-4" textAnchor="middle" fontSize="6" fontWeight="600" fill="rgba(138,163,158,0.35)" fontFamily="Outfit,sans-serif">{l}</text>;
        })}
        {/* Heatmap cells - 5 rows × 6 cols */}
        {[
          [4, 2, 3, 3, 2, 3],
          [3, 4, 2, 4, 3, 3],
          [2, 4, 1, 4, 2, 4],
          [4, 2, 3, 3, 3, 3],
          [3, 3, 3, 2, 4, 2],
        ].map(function (row, ri) {
          return row.map(function (val, ci) {
            var fills = ["rgba(138,163,158,0.04)", "rgba(138,163,158,0.08)", "rgba(138,163,158,0.16)", "rgba(138,163,158,0.3)", "rgba(204,136,0,0.35)"];
            return <rect key={ri + "-" + ci} x={ci * 52} y={ri * 20} width="48" height="16" rx="2" fill={fills[val]} />;
          });
        })}
        {/* Row labels */}
        {["M/R", "OT", "C/P", "OTC", "EXM"].map(function (l, i) {
          return <text key={i} x="316" y={i * 20 + 12} fontSize="5" fill="rgba(138,163,158,0.25)" fontFamily="Outfit,sans-serif">{l}</text>;
        })}
      </g>

      {/* ── §5: RECOVERABILITY FILTER ── */}
      <text x="30" y="610" fontSize="7" fontWeight="600" letterSpacing="3" fill="rgba(138,163,158,0.45)" fontFamily="Outfit,sans-serif">RECOVERABILITY FILTER</text>
      <line x1="30" y1="616" x2="160" y2="616" stroke="rgba(138,163,158,0.12)" strokeWidth="0.5" />

      <g transform="translate(30, 628)" style={{ opacity: tick, transition: "opacity 0.8s 1.1s" }}>
        {/* Demand → Filter → Recoverable */}
        <rect x="0" y="0" width="100" height="36" rx="3" fill="rgba(204,136,0,0.08)" stroke="rgba(204,136,0,0.15)" strokeWidth="0.75" />
        <text x="50" y="14" textAnchor="middle" fontSize="6" fontWeight="600" fill="rgba(204,136,0,0.6)" fontFamily="Outfit,sans-serif">DEMAND</text>
        <text x="50" y="28" textAnchor="middle" fontSize="12" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif">$3.0M</text>

        <text x="120" y="22" textAnchor="middle" fontSize="12" fill="rgba(138,163,158,0.25)" fontFamily="Outfit,sans-serif">→</text>

        <rect x="140" y="0" width="100" height="36" rx="3" fill="rgba(44,62,58,0.1)" stroke="rgba(44,62,58,0.15)" strokeWidth="0.75" />
        <text x="190" y="14" textAnchor="middle" fontSize="6" fontWeight="600" fill="rgba(138,163,158,0.5)" fontFamily="Outfit,sans-serif">ZB, N.A. FILTER</text>
        <text x="190" y="28" textAnchor="middle" fontSize="8" fontWeight="600" fill="rgba(204,68,68,0.4)" fontFamily="Outfit,sans-serif">−4 categories</text>

        <text x="260" y="22" textAnchor="middle" fontSize="12" fill="rgba(138,163,158,0.25)" fontFamily="Outfit,sans-serif">→</text>

        <rect x="280" y="0" width="90" height="36" rx="3" fill="rgba(74,122,111,0.1)" stroke="rgba(74,122,111,0.15)" strokeWidth="0.75" />
        <text x="325" y="14" textAnchor="middle" fontSize="6" fontWeight="600" fill="rgba(74,122,111,0.6)" fontFamily="Outfit,sans-serif">RECOVERABLE</text>
        <text x="325" y="28" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif">$910K</text>

        {/* Category breakdown */}
        {[
          { l: "Meal premiums", s: true }, { l: "Rest premiums", s: true },
          { l: "Overtime", s: true }, { l: "Min wage", s: true },
          { l: "Wage stmts", s: false }, { l: "Wait time", s: false },
          { l: "Default pen.", s: false }, { l: "Expenses", s: true },
        ].map(function (c, i) {
          var col = i < 4 ? 0 : 1;
          var row = i % 4;
          return (
            <g key={i}>
              <text x={col * 170} y={50 + row * 12} fontSize="6" fill={c.s ? "rgba(204,68,68,0.3)" : "rgba(138,163,158,0.5)"}
                fontFamily="Outfit,sans-serif" textDecoration={c.s ? "line-through" : "none"}>{c.l}</text>
              <text x={col * 170 + 70} y={50 + row * 12} fontSize="6" fontWeight="600"
                fill={c.s ? "rgba(204,68,68,0.3)" : "rgba(74,122,111,0.5)"} fontFamily="Outfit,sans-serif">
                {c.s ? "✕" : "✓"}
              </text>
            </g>
          );
        })}
      </g>

      {/* ── §6: PLATFORM STATS ── */}
      <text x="30" y="750" fontSize="7" fontWeight="600" letterSpacing="3" fill="rgba(138,163,158,0.45)" fontFamily="Outfit,sans-serif">PLATFORM</text>
      <line x1="30" y1="756" x2="160" y2="756" stroke="rgba(138,163,158,0.12)" strokeWidth="0.5" />

      <g transform="translate(30, 768)" style={{ opacity: tick, transition: "opacity 0.8s 1.3s" }}>
        {[
          { n: "8", l: "TOOLS" }, { n: "16", l: "PUBLICATIONS" },
          { n: "16", l: "CASES" }, { n: "6", l: "INDUSTRIES" },
        ].map(function (s, i) {
          return (
            <g key={i} transform={"translate(" + (i * 85) + ",0)"}>
              <text x="0" y="0" fontSize="20" fontWeight="700" fill="#8aa39e" fontFamily="Outfit,sans-serif">{s.n}</text>
              <text x="0" y="14" fontSize="6" fill="rgba(138,163,158,0.35)" fontFamily="Outfit,sans-serif" letterSpacing="1">{s.l}</text>
            </g>
          );
        })}
      </g>

      {/* Decorative circles */}
      <circle cx="350" cy="830" r="35" stroke="rgba(138,163,158,0.04)" strokeWidth="0.75" fill="none" />
      <circle cx="350" cy="830" r="22" stroke="rgba(138,163,158,0.03)" strokeWidth="0.5" fill="none" />
      <circle cx="350" cy="830" r="2.5" fill="#8aa39e" opacity="0.12" />
    </svg>
  );
}
