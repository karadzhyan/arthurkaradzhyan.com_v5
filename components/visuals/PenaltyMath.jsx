"use client";
import { useState, useEffect, useRef } from "react";
/* Penalty Math — Now with derivative multiplier equation, reform comparison
   (pre vs post), and per-category exposure table showing real dollar impact. */

export default function PenaltyMath() {
  var [visible, setVisible] = useState(false);
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  var factors = [
    { value: "50", label: "Aggrieved\nEmployees", sub: "12-month period" },
    { value: "26", label: "Pay\nPeriods", sub: "Bi-weekly payroll" },
    { value: "7", label: "Violation\nCategories", sub: "Per LWDA notice" },
    { value: "$200", label: "Default\nPenalty", sub: "§ 2699(f)(2)" },
  ];

  /* Per-category detail table */
  var catBreakdown = [
    { name: "Meal periods", statute: "§ 226.7", rate: "$200", periods: 26, amount: 260000 },
    { name: "Rest periods", statute: "§ 226.7", rate: "$200", periods: 26, amount: 260000 },
    { name: "Overtime", statute: "§ 510", rate: "$200", periods: 26, amount: 260000 },
    { name: "Wage statements", statute: "§ 226(e)", rate: "$100", periods: 26, amount: 130000 },
    { name: "Waiting time", statute: "§ 203", rate: "$200", periods: 26, amount: 260000 },
    { name: "Minimum wage", statute: "§ 1194", rate: "$200", periods: 26, amount: 260000 },
    { name: "Regular rate", statute: "§ 510", rate: "$200", periods: 26, amount: 260000 },
  ];

  var baseTotal = 1820000;
  var derivativeTotal = 1027000;
  var grandTotal = baseTotal + derivativeTotal;
  var reformTotal = Math.round(grandTotal * 0.5);

  function fmtDollar(n) {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
    return "$" + (n / 1000).toFixed(0) + "K";
  }

  var svgH = 580;

  return (
    <div className="viz-math" ref={ref}>
      <div className="viz-header">
        <div className="viz-label">The PAGA Penalty Equation</div>
        <div className="viz-subtitle">Why a single compliance gap creates seven-figure exposure — base penalties, derivative multipliers, and reform impact</div>
      </div>
      <svg viewBox={"0 0 760 " + svgH} fill="none" className="viz-svg" role="img" aria-label="PAGA penalty multiplication with derivative multiplier and reform comparison">
        {/* ── EQUATION 1: Base Penalty ── */}
        <text x="10" y="16" fontSize="8" fontWeight="600" letterSpacing="2" fill="rgba(44,62,58,0.3)" fontFamily="Outfit,sans-serif">EQUATION 1: BASE DEFAULT PENALTIES</text>

        {/* Factor boxes */}
        {factors.map(function (f, i) {
          var x = 30 + i * 145;
          var labelLines = f.label.split("\n");
          return (
            <g key={i}>
              <rect x={x} y="28" width="110" height="88" rx="6"
                fill="rgba(44,62,58,0.04)" stroke="rgba(44,62,58,0.12)" strokeWidth="1.5" />
              <text x={x + 55} y="60" textAnchor="middle" fontSize="26" fontWeight="700"
                fill="#2c3e3a" fontFamily="Outfit,sans-serif"
                style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s", transitionDelay: (i * 0.15) + "s" }}>
                {f.value}
              </text>
              {labelLines.map(function (line, li) {
                return (
                  <text key={li} x={x + 55} y={78 + li * 11} textAnchor="middle" fontSize="8" fontWeight="600"
                    fill="#666" fontFamily="Outfit,sans-serif" letterSpacing="1">{line}</text>
                );
              })}
              <text x={x + 55} y="108" textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">{f.sub}</text>
              {i < factors.length - 1 && (
                <text x={x + 130} y="72" textAnchor="middle" fontSize="18" fontWeight="300"
                  fill="rgba(44,62,58,0.2)" fontFamily="Outfit,sans-serif">×</text>
              )}
            </g>
          );
        })}

        {/* Equals */}
        <text x="640" y="72" textAnchor="middle" fontSize="18" fontWeight="300" fill="rgba(44,62,58,0.2)" fontFamily="Outfit,sans-serif">=</text>

        {/* Base result */}
        <rect x="660" y="36" width="90" height="72" rx="6" fill="rgba(44,62,58,0.08)" stroke="#2c3e3a" strokeWidth="1.5" />
        <text x="705" y="68" textAnchor="middle" fontSize="16" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s", transitionDelay: "0.7s" }}>
          $18.2M
        </text>
        <text x="705" y="84" textAnchor="middle" fontSize="7" fontWeight="600" fill="#8aa39e" fontFamily="Outfit,sans-serif">AT 100%</text>
        <text x="705" y="96" textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">Violation Rate</text>

        {/* ── EQUATION 2: Derivative Multiplier ── */}
        <line x1="10" y1="134" x2="750" y2="134" stroke="rgba(44,62,58,0.06)" strokeWidth="1" />
        <text x="10" y="154" fontSize="8" fontWeight="600" letterSpacing="2" fill="rgba(44,62,58,0.3)" fontFamily="Outfit,sans-serif">EQUATION 2: DERIVATIVE PENALTY CASCADE (NARANJO)</text>

        <rect x="30" y="168" width="700" height="64" rx="6" fill="rgba(204,136,0,0.04)" stroke="rgba(204,136,0,0.15)" strokeWidth="1" />

        {[
          { x: 55, val: "Base\nExposure", sub: "$18.2M" },
          { x: 205, val: "§ 226(a)\nWage Stmt", sub: "+$6.5M" },
          { x: 355, val: "§ 203\nWait Time", sub: "+$4.5M" },
          { x: 505, val: "§ 218.6\nInterest", sub: "+$1.3M" },
        ].map(function (d, i) {
          var lines = d.val.split("\n");
          return (
            <g key={i} style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s", transitionDelay: (0.9 + i * 0.15) + "s" }}>
              <text x={d.x} y="188" textAnchor="middle" fontSize="8" fontWeight="600" fill="#666" fontFamily="Outfit,sans-serif">{lines[0]}</text>
              <text x={d.x} y="200" textAnchor="middle" fontSize="8" fill="#999" fontFamily="Outfit,sans-serif">{lines[1]}</text>
              <text x={d.x} y="220" textAnchor="middle" fontSize="14" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif">{d.sub}</text>
              {i < 3 && (
                <text x={d.x + 75} y="204" textAnchor="middle" fontSize="16" fontWeight="300" fill="rgba(204,136,0,0.25)" fontFamily="Outfit,sans-serif">+</text>
              )}
            </g>
          );
        })}

        <text x="650" y="204" textAnchor="middle" fontSize="16" fontWeight="300" fill="rgba(204,136,0,0.25)" fontFamily="Outfit,sans-serif">=</text>
        <text x="710" y="204" textAnchor="middle" fontSize="18" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s", transitionDelay: "1.5s" }}>$30.5M</text>

        {/* ── PER-CATEGORY TABLE ── */}
        <line x1="10" y1="248" x2="750" y2="248" stroke="rgba(44,62,58,0.06)" strokeWidth="1" />
        <text x="10" y="268" fontSize="8" fontWeight="600" letterSpacing="2" fill="rgba(44,62,58,0.3)" fontFamily="Outfit,sans-serif">PER-CATEGORY AT 100% VIOLATION RATE (50 EMPLOYEES × 26 PERIODS)</text>

        {/* Headers */}
        <text x="20" y="290" fontSize="8" fontWeight="600" fill="#666" fontFamily="Outfit,sans-serif">Category</text>
        <text x="180" y="290" fontSize="8" fontWeight="600" fill="#666" fontFamily="Outfit,sans-serif">Statute</text>
        <text x="280" y="290" fontSize="8" fontWeight="600" fill="#666" fontFamily="Outfit,sans-serif">Rate</text>
        <text x="380" y="290" textAnchor="end" fontSize="8" fontWeight="600" fill="#CC8800" fontFamily="Outfit,sans-serif">Pre-Reform</text>
        <text x="480" y="290" textAnchor="end" fontSize="8" fontWeight="600" fill="#4a7a6f" fontFamily="Outfit,sans-serif">Post-Reform</text>
        <text x="550" y="290" textAnchor="end" fontSize="8" fontWeight="600" fill="#aaa" fontFamily="Outfit,sans-serif">Δ</text>

        {catBreakdown.map(function (cat, i) {
          var y = 302 + i * 24;
          var postAmt = Math.round(cat.amount * 0.5);
          var delta = Math.round((1 - postAmt / cat.amount) * 100);
          return (
            <g key={i} style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s", transitionDelay: (1.2 + i * 0.06) + "s" }}>
              {i % 2 === 0 && <rect x="10" y={y - 4} width="550" height="24" fill="rgba(44,62,58,0.015)" rx="2" />}
              <text x="20" y={y + 11} fontSize="9" fontWeight="500" fill="#1a1a1a" fontFamily="Outfit,sans-serif">{cat.name}</text>
              <text x="180" y={y + 11} fontSize="8" fill="#999" fontFamily="Outfit,sans-serif" fontStyle="italic">{cat.statute}</text>
              <text x="280" y={y + 11} fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">{cat.rate}/period</text>

              {/* Pre-reform bar */}
              <rect x="320" y={y + 1} width={cat.amount / 260000 * 50} height="12" rx="1" fill="#CC8800" fillOpacity="0.3" />
              <text x="380" y={y + 11} textAnchor="end" fontSize="8" fontWeight="600" fill="#CC8800" fontFamily="Outfit,sans-serif">{fmtDollar(cat.amount)}</text>

              {/* Post-reform bar */}
              <rect x="420" y={y + 1} width={postAmt / 260000 * 50} height="12" rx="1" fill="#4a7a6f" fillOpacity="0.3" />
              <text x="480" y={y + 11} textAnchor="end" fontSize="8" fontWeight="600" fill="#4a7a6f" fontFamily="Outfit,sans-serif">{fmtDollar(postAmt)}</text>

              <text x="550" y={y + 11} textAnchor="end" fontSize="8" fontWeight="600" fill="#aaa" fontFamily="Outfit,sans-serif">−{delta}%</text>
            </g>
          );
        })}

        {/* Totals */}
        <g style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s", transitionDelay: "1.8s" }}>
          <line x1="20" y1={302 + catBreakdown.length * 24 + 2} x2="560" y2={302 + catBreakdown.length * 24 + 2} stroke="rgba(44,62,58,0.15)" strokeWidth="1.5" />
          <text x="20" y={302 + catBreakdown.length * 24 + 18} fontSize="10" fontWeight="700" fill="#1a1a1a" fontFamily="Outfit,sans-serif">Total (all categories, 100% rate)</text>
          <text x="380" y={302 + catBreakdown.length * 24 + 18} textAnchor="end" fontSize="10" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif">$1.69M</text>
          <text x="480" y={302 + catBreakdown.length * 24 + 18} textAnchor="end" fontSize="10" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif">$845K</text>
          <text x="550" y={302 + catBreakdown.length * 24 + 18} textAnchor="end" fontSize="10" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">−50%</text>
        </g>

        {/* ── BOTTOM: Key insight callout ── */}
        <rect x="20" y={svgH - 70} width="720" height="54" rx="4" fill="rgba(204,136,0,0.04)" stroke="rgba(204,136,0,0.12)" strokeWidth="1" />
        <text x="40" y={svgH - 48} fontSize="10" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif">Key: This is the number plaintiff's counsel puts in the demand letter.</text>
        <text x="40" y={svgH - 32} fontSize="9" fill="#888" fontFamily="Outfit,sans-serif">
          The defense methodology reduces it by 76-93% through recoverability analysis, actual violation rates, temporal bifurcation, and penalty cap qualification.
        </text>
      </svg>
      <div className="viz-footnote">
        Illustrative calculation at 100% violation rate — actual exposure depends on per-category violation rates from payroll data, recoverability under ZB, N.A., and applicable reform reductions
      </div>
    </div>
  );
}
