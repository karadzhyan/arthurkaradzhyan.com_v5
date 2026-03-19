"use client";
import { useState, useEffect, useRef } from "react";
/* Penalty Math Breakdown — Shows the PAGA penalty multiplication formula
   with real numbers that make GCs' eyes widen. */

export default function PenaltyMath() {
  var [visible, setVisible] = useState(false);
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) setVisible(true);
    }, { threshold: 0.3 });
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  var factors = [
    { value: "50", label: "Aggrieved\nEmployees", sub: "12-month period" },
    { value: "26", label: "Pay\nPeriods", sub: "Bi-weekly payroll" },
    { value: "7", label: "Violation\nCategories", sub: "Per LWDA notice" },
    { value: "$200", label: "Default\nPenalty", sub: "§ 2699(f)(2)" },
  ];

  return (
    <div className="viz-math" ref={ref}>
      <div className="viz-header">
        <div className="viz-label">The PAGA Penalty Equation</div>
        <div className="viz-subtitle">Why a single compliance gap creates seven-figure exposure</div>
      </div>
      <svg viewBox="0 0 760 260" fill="none" className="viz-svg" role="img" aria-label="PAGA penalty multiplication showing how penalties compound across employees, periods, and violation categories">
        {/* Factor boxes */}
        {factors.map(function (f, i) {
          var x = 30 + i * 160;
          var labelLines = f.label.split("\n");
          return (
            <g key={i}>
              <rect x={x} y="30" width="120" height="100" rx="6"
                fill="rgba(44,62,58,0.04)" stroke="rgba(44,62,58,0.12)" strokeWidth="1.5" />
              <text x={x + 60} y="68" textAnchor="middle" fontSize="28" fontWeight="700"
                fill="#2c3e3a" fontFamily="Outfit,sans-serif"
                style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s", transitionDelay: (i * 0.15) + "s" }}>
                {f.value}
              </text>
              {labelLines.map(function (line, li) {
                return (
                  <text key={li} x={x + 60} y={90 + li * 12} textAnchor="middle" fontSize="9" fontWeight="600"
                    fill="#666" fontFamily="Outfit,sans-serif" letterSpacing="1">{line}</text>
                );
              })}
              <text x={x + 60} y="122" textAnchor="middle" fontSize="8" fill="#aaa" fontFamily="Outfit,sans-serif">{f.sub}</text>

              {/* Multiplication sign between boxes */}
              {i < factors.length - 1 && (
                <text x={x + 140} y="82" textAnchor="middle" fontSize="20" fontWeight="300"
                  fill="rgba(44,62,58,0.25)" fontFamily="Outfit,sans-serif">×</text>
              )}
            </g>
          );
        })}

        {/* Equals sign and result */}
        <text x="680" y="82" textAnchor="middle" fontSize="20" fontWeight="300"
          fill="rgba(44,62,58,0.25)" fontFamily="Outfit,sans-serif">=</text>

        {/* Result box */}
        <rect x="20" y="160" width="720" height="80" rx="6"
          fill="rgba(44,62,58,0.06)" stroke="#2c3e3a" strokeWidth="1.5" />

        <text x="380" y="195" textAnchor="middle" fontSize="36" fontWeight="700"
          fill="#2c3e3a" fontFamily="Outfit,sans-serif"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s", transitionDelay: "0.8s" }}>
          $18,200,000
        </text>
        <text x="380" y="220" textAnchor="middle" fontSize="10" fill="#888" fontFamily="Outfit,sans-serif" letterSpacing="1">
          MAXIMUM THEORETICAL EXPOSURE — BEFORE DERIVATIVE PENALTIES
        </text>

        {/* Derivative multiplier callout */}
        <rect x="560" y="165" width="170" height="30" rx="3" fill="rgba(204,136,0,0.08)" stroke="rgba(204,136,0,0.2)" strokeWidth="1" />
        <text x="645" y="178" textAnchor="middle" fontSize="8" fontWeight="600" fill="#CC8800" fontFamily="Outfit,sans-serif">+ NARANJO DERIVATIVES</text>
        <text x="645" y="190" textAnchor="middle" fontSize="8" fill="rgba(204,136,0,0.6)" fontFamily="Outfit,sans-serif">§ 226(e) + § 203 cascades</text>
      </svg>
      <div className="viz-footnote">
        Illustrative calculation — actual exposure depends on per-category violation rates, recoverability analysis, and applicable reform reductions
      </div>
    </div>
  );
}
