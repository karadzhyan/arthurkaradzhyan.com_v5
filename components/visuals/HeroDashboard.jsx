"use client";
import { useState, useEffect } from "react";
/* Hero Dashboard — Composite analytical visualization for the hero panel.
   Shows a command-center view: mini exposure chart, penalty cascade preview,
   case law density, and reform status. This is what makes a GC stop scrolling. */

export default function HeroDashboard() {
  var [tick, setTick] = useState(0);
  useEffect(function () {
    var t = setTimeout(function () { setTick(1); }, 400);
    return function () { clearTimeout(t); };
  }, []);

  return (
    <svg viewBox="0 0 400 900" fill="none" className="home-hero-dashboard" role="img" aria-label="Analytical dashboard showing PAGA exposure metrics and defense methodology">
      {/* Subtle grid */}
      <g stroke="rgba(255,255,255,0.025)" strokeWidth="0.5">
        {[80, 160, 240, 320].map(function (x) { return <line key={"v" + x} x1={x} y1="0" x2={x} y2="900" />; })}
        {[100, 200, 300, 400, 500, 600, 700, 800].map(function (y) { return <line key={"h" + y} x1="0" y1={y} x2="400" y2={y} />; })}
      </g>

      {/* ── Section 1: Exposure Scenarios ── */}
      <text x="30" y="80" fontSize="8" fontWeight="600" letterSpacing="3" fill="rgba(138,163,158,0.5)" fontFamily="Outfit,sans-serif">EXPOSURE ANALYSIS</text>
      <line x1="30" y1="88" x2="170" y2="88" stroke="rgba(138,163,158,0.15)" strokeWidth="0.5" />

      {/* Mini bar chart */}
      <g transform="translate(30, 100)">
        <rect x="0" y="0" width={tick ? 300 : 0} height="20" rx="2" fill="rgba(204,136,0,0.3)"
          style={{ transition: "width 1.2s ease-out" }} />
        <text x="310" y="14" fontSize="10" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif"
          style={{ opacity: tick, transition: "opacity 0.5s 1s" }}>$2.8M</text>
        <text x={tick ? 8 : -50} y="14" fontSize="7" fontWeight="500" fill="rgba(255,255,255,0.6)" fontFamily="Outfit,sans-serif"
          style={{ transition: "all 0.8s 0.3s" }}>PLAINTIFF MAX</text>

        <rect x="0" y="28" width={tick ? 72 : 0} height="20" rx="2" fill="rgba(138,163,158,0.4)"
          style={{ transition: "width 1s ease-out 0.2s" }} />
        <text x="82" y="42" fontSize="10" fontWeight="700" fill="#8aa39e" fontFamily="Outfit,sans-serif"
          style={{ opacity: tick, transition: "opacity 0.5s 1.2s" }}>$684K</text>
        <text x={tick ? 8 : -50} y="42" fontSize="7" fontWeight="500" fill="rgba(255,255,255,0.6)" fontFamily="Outfit,sans-serif"
          style={{ transition: "all 0.8s 0.5s" }}>REALISTIC</text>

        <rect x="0" y="56" width={tick ? 20 : 0} height="20" rx="2" fill="rgba(74,122,111,0.5)"
          style={{ transition: "width 0.8s ease-out 0.4s" }} />
        <text x="30" y="70" fontSize="10" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif"
          style={{ opacity: tick, transition: "opacity 0.5s 1.4s" }}>$187K</text>
        <text x={tick ? 8 : -50} y="70" fontSize="7" fontWeight="500" fill="rgba(255,255,255,0.4)" fontFamily="Outfit,sans-serif"
          style={{ transition: "all 0.8s 0.7s" }}>DEFENSE</text>
      </g>

      {/* Reduction label */}
      <g style={{ opacity: tick, transition: "opacity 0.8s 1.5s" }}>
        <rect x="260" y="130" width="110" height="56" rx="4" fill="rgba(138,163,158,0.06)" stroke="rgba(138,163,158,0.15)" strokeWidth="1" />
        <text x="315" y="155" textAnchor="middle" fontSize="24" fontWeight="700" fill="#8aa39e" fontFamily="Outfit,sans-serif">93%</text>
        <text x="315" y="175" textAnchor="middle" fontSize="7" fontWeight="600" letterSpacing="2" fill="rgba(138,163,158,0.5)" fontFamily="Outfit,sans-serif">REDUCTION</text>
      </g>

      {/* ── Section 2: Penalty Cascade Mini ── */}
      <text x="30" y="230" fontSize="8" fontWeight="600" letterSpacing="3" fill="rgba(138,163,158,0.5)" fontFamily="Outfit,sans-serif">NARANJO CASCADE</text>
      <line x1="30" y1="238" x2="170" y2="238" stroke="rgba(138,163,158,0.15)" strokeWidth="0.5" />

      {/* Mini cascade */}
      <g transform="translate(80, 255)" style={{ opacity: tick, transition: "opacity 1s 0.6s" }}>
        {/* Root */}
        <rect x="60" y="0" width="120" height="26" rx="3" fill="rgba(204,136,0,0.12)" stroke="rgba(204,136,0,0.3)" strokeWidth="1" />
        <text x="120" y="16" textAnchor="middle" fontSize="8" fontWeight="600" fill="#CC8800" fontFamily="Outfit,sans-serif">1 MISSED MEAL</text>

        {/* Arrows */}
        <line x1="90" y1="26" x2="30" y2="44" stroke="rgba(138,163,158,0.3)" strokeWidth="1" />
        <line x1="120" y1="26" x2="120" y2="44" stroke="rgba(138,163,158,0.3)" strokeWidth="1" />
        <line x1="150" y1="26" x2="210" y2="44" stroke="rgba(138,163,158,0.3)" strokeWidth="1" />

        {/* Derivative boxes */}
        <rect x="0" y="46" width="60" height="22" rx="2" fill="rgba(44,62,58,0.15)" />
        <text x="30" y="60" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.6)" fontFamily="Outfit,sans-serif">§ 226.7</text>
        <rect x="90" y="46" width="60" height="22" rx="2" fill="rgba(44,62,58,0.15)" />
        <text x="120" y="60" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.6)" fontFamily="Outfit,sans-serif">§ 226(a)</text>
        <rect x="180" y="46" width="60" height="22" rx="2" fill="rgba(44,62,58,0.15)" />
        <text x="210" y="60" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.6)" fontFamily="Outfit,sans-serif">§ 203</text>

        {/* Convergence */}
        <line x1="30" y1="68" x2="120" y2="86" stroke="rgba(138,163,158,0.2)" strokeWidth="0.75" />
        <line x1="120" y1="68" x2="120" y2="86" stroke="rgba(138,163,158,0.2)" strokeWidth="0.75" />
        <line x1="210" y1="68" x2="120" y2="86" stroke="rgba(138,163,158,0.2)" strokeWidth="0.75" />
        <rect x="70" y="88" width="100" height="22" rx="2" fill="rgba(30,45,42,0.4)" />
        <text x="120" y="102" textAnchor="middle" fontSize="7" fontWeight="600" fill="rgba(255,255,255,0.7)" fontFamily="Outfit,sans-serif">× PAGA MULTIPLIER</text>
      </g>

      {/* ── Section 3: Reform Windows ── */}
      <text x="30" y="400" fontSize="8" fontWeight="600" letterSpacing="3" fill="rgba(138,163,158,0.5)" fontFamily="Outfit,sans-serif">REFORM WINDOWS</text>
      <line x1="30" y1="408" x2="170" y2="408" stroke="rgba(138,163,158,0.15)" strokeWidth="0.5" />

      <g transform="translate(30, 420)" style={{ opacity: tick, transition: "opacity 1s 0.8s" }}>
        {/* Timeline bar */}
        <line x1="0" y1="30" x2="340" y2="30" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

        {/* Day markers */}
        {[
          { x: 0, day: "0", label: "Notice", color: "#CC8800" },
          { x: 90, day: "33", label: "Cure", color: "#CC8800" },
          { x: 160, day: "60", label: "Remediation", color: "#8aa39e" },
          { x: 220, day: "65", label: "LWDA", color: "#4a7a6f" },
          { x: 340, day: "→", label: "Trial", color: "#2c3e3a" },
        ].map(function (m) {
          return (
            <g key={m.x}>
              <circle cx={m.x} cy="30" r="4" fill={m.color} fillOpacity="0.5" />
              <text x={m.x} y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill={m.color} fontFamily="Outfit,sans-serif">{m.day}</text>
              <text x={m.x} y="48" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.35)" fontFamily="Outfit,sans-serif">{m.label}</text>
            </g>
          );
        })}

        {/* Window zones */}
        <rect x="0" y="56" width="90" height="18" rx="2" fill="rgba(204,136,0,0.1)" />
        <text x="45" y="68" textAnchor="middle" fontSize="6.5" fontWeight="600" fill="rgba(204,136,0,0.6)" fontFamily="Outfit,sans-serif">CRITICAL</text>
        <rect x="0" y="78" width="160" height="18" rx="2" fill="rgba(138,163,158,0.08)" />
        <text x="80" y="90" textAnchor="middle" fontSize="6.5" fontWeight="600" fill="rgba(138,163,158,0.5)" fontFamily="Outfit,sans-serif">30% CAP WINDOW</text>
      </g>

      {/* ── Section 4: Violation Category Heatmap Mini ── */}
      <text x="30" y="550" fontSize="8" fontWeight="600" letterSpacing="3" fill="rgba(138,163,158,0.5)" fontFamily="Outfit,sans-serif">VIOLATION MATRIX</text>
      <line x1="30" y1="558" x2="170" y2="558" stroke="rgba(138,163,158,0.15)" strokeWidth="0.5" />

      <g transform="translate(30, 570)" style={{ opacity: tick, transition: "opacity 1s 1s" }}>
        {/* Mini heatmap - 6 cols × 4 rows */}
        {[
          [4, 2, 3, 3, 2, 3],
          [3, 4, 2, 4, 3, 3],
          [2, 4, 1, 4, 2, 4],
          [4, 2, 3, 3, 3, 3],
        ].map(function (row, ri) {
          return row.map(function (val, ci) {
            var fills = ["rgba(138,163,158,0.05)", "rgba(138,163,158,0.1)", "rgba(138,163,158,0.2)", "rgba(138,163,158,0.35)", "rgba(204,136,0,0.4)"];
            return (
              <rect key={ri + "-" + ci} x={ci * 52} y={ri * 22} width="48" height="18" rx="2" fill={fills[val]} />
            );
          });
        })}
        {/* Labels */}
        {["HO", "AU", "HC", "SE", "TE", "AG"].map(function (lbl, i) {
          return <text key={i} x={i * 52 + 24} y={-6} textAnchor="middle" fontSize="7" fontWeight="600" fill="rgba(138,163,158,0.4)" fontFamily="Outfit,sans-serif">{lbl}</text>;
        })}
      </g>

      {/* ── Section 5: Platform Stats ── */}
      <text x="30" y="700" fontSize="8" fontWeight="600" letterSpacing="3" fill="rgba(138,163,158,0.5)" fontFamily="Outfit,sans-serif">PLATFORM</text>
      <line x1="30" y1="708" x2="170" y2="708" stroke="rgba(138,163,158,0.15)" strokeWidth="0.5" />

      <g transform="translate(30, 720)" style={{ opacity: tick, transition: "opacity 1s 1.2s" }}>
        {[
          { n: "8", l: "Tools" },
          { n: "16", l: "Publications" },
          { n: "16", l: "Cases" },
          { n: "6", l: "Industries" },
        ].map(function (s, i) {
          return (
            <g key={i} transform={"translate(" + (i * 85) + ",0)"}>
              <text x="0" y="0" fontSize="22" fontWeight="700" fill="#8aa39e" fontFamily="Outfit,sans-serif">{s.n}</text>
              <text x="0" y="14" fontSize="7" fill="rgba(138,163,158,0.4)" fontFamily="Outfit,sans-serif" letterSpacing="1">{s.l.toUpperCase()}</text>
            </g>
          );
        })}
      </g>

      {/* Bottom decorative elements */}
      <circle cx="350" cy="780" r="40" stroke="rgba(138,163,158,0.06)" strokeWidth="0.75" fill="none" />
      <circle cx="350" cy="780" r="28" stroke="rgba(138,163,158,0.04)" strokeWidth="0.5" fill="none" />
      <circle cx="350" cy="780" r="3" fill="#8aa39e" opacity="0.15" />
    </svg>
  );
}
