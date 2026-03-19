"use client";
import { useState, useEffect, useRef } from "react";
/* Three-Scenario Exposure Model — Animated bar chart showing the core
   analytical methodology: Plaintiff Max / Data-Driven Realistic / Defense Best Case */

export default function ExposureModel() {
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

  var scenarios = [
    {
      label: "Plaintiff Maximum",
      sub: "All violations at 100% rate, no reform reductions",
      amount: 2847000,
      width: 100,
      color: "#CC8800",
      detail: "7 categories × 100% violation rate × $200/period × 52 periods × 50 employees"
    },
    {
      label: "Data-Driven Realistic",
      sub: "Actual violation rates from payroll data, temporal bifurcation applied",
      amount: 684000,
      width: 24,
      color: "#2c3e3a",
      detail: "Per-category rates from timekeeping records, Remedied Period rates separated"
    },
    {
      label: "Defense Best Case",
      sub: "Non-recoverable categories stripped, 15% cap qualification, cure applied",
      amount: 187000,
      width: 6.6,
      color: "#4a7a6f",
      detail: "ZB, N.A. recoverability filter + AB 2288 penalty cap + § 2699.3 cure"
    },
  ];

  function formatDollar(n) {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
    return "$" + (n / 1000).toFixed(0) + "K";
  }

  var maxBarWidth = 520;

  return (
    <div className="viz-exposure" ref={ref}>
      <div className="viz-header">
        <div className="viz-label">Three-Scenario Exposure Model</div>
        <div className="viz-subtitle">Hypothetical 50-employee employer · 7 PAGA violation categories · 12-month period</div>
      </div>
      <svg viewBox="0 0 760 310" fill="none" className="viz-svg" role="img" aria-label="Three-scenario PAGA exposure model showing plaintiff maximum, realistic, and defense best case">
        {/* Grid lines */}
        <g stroke="rgba(44,62,58,0.06)" strokeWidth="1">
          <line x1="220" y1="30" x2="220" y2="250" />
          <line x1="350" y1="30" x2="350" y2="250" />
          <line x1="480" y1="30" x2="480" y2="250" />
          <line x1="610" y1="30" x2="610" y2="250" />
          <line x1="740" y1="30" x2="740" y2="250" />
        </g>
        {/* Grid labels */}
        <text x="220" y="270" textAnchor="middle" fontSize="8" fill="#bbb" fontFamily="Outfit,sans-serif">$0</text>
        <text x="350" y="270" textAnchor="middle" fontSize="8" fill="#bbb" fontFamily="Outfit,sans-serif">$750K</text>
        <text x="480" y="270" textAnchor="middle" fontSize="8" fill="#bbb" fontFamily="Outfit,sans-serif">$1.5M</text>
        <text x="610" y="270" textAnchor="middle" fontSize="8" fill="#bbb" fontFamily="Outfit,sans-serif">$2.25M</text>
        <text x="740" y="270" textAnchor="middle" fontSize="8" fill="#bbb" fontFamily="Outfit,sans-serif">$3M</text>

        {scenarios.map(function (s, i) {
          var y = 44 + i * 80;
          var barW = visible ? (s.width / 100) * maxBarWidth : 0;
          return (
            <g key={i}>
              {/* Label */}
              <text x="10" y={y} fontSize="12" fontWeight="700" fill="#1a1a1a" fontFamily="Outfit,sans-serif">{s.label}</text>
              <text x="10" y={y + 16} fontSize="9" fill="#999" fontFamily="Outfit,sans-serif">{s.sub}</text>
              {/* Bar */}
              <rect x="220" y={y + 26} width={barW} height="28" rx="2" fill={s.color}
                style={{ transition: "width 1.2s cubic-bezier(0.25,0.46,0.45,0.94)", transitionDelay: (i * 0.2) + "s" }} />
              {/* Amount label */}
              {visible && (
                <text x={220 + barW + 8} y={y + 45} fontSize="14" fontWeight="700" fill={s.color}
                  fontFamily="Outfit,sans-serif" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s", transitionDelay: (0.8 + i * 0.2) + "s" }}>
                  {formatDollar(s.amount)}
                </text>
              )}
              {/* Detail line */}
              <text x="220" y={y + 64} fontSize="8" fill="#bbb" fontFamily="Outfit,sans-serif" letterSpacing="0.5">{s.detail}</text>
            </g>
          );
        })}

        {/* Reduction callout */}
        <g>
          <line x1="160" y1="72" x2="160" y2="212" stroke="#2c3e3a" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="155" y1="72" x2="165" y2="72" stroke="#2c3e3a" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="155" y1="212" x2="165" y2="212" stroke="#2c3e3a" strokeWidth="1" strokeOpacity="0.2" />
          <text x="160" y="148" textAnchor="middle" fontSize="16" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">93%</text>
          <text x="160" y="163" textAnchor="middle" fontSize="8" fill="#8aa39e" fontFamily="Outfit,sans-serif">REDUCTION</text>
        </g>

        {/* Methodology note */}
        <rect x="220" y="284" width="520" height="20" rx="2" fill="rgba(44,62,58,0.03)" />
        <text x="480" y="298" textAnchor="middle" fontSize="8" fill="#aaa" fontFamily="Outfit,sans-serif" letterSpacing="0.5">
          Scenario outputs reflect analytical methodology, not predictions of case outcomes
        </text>
      </svg>
    </div>
  );
}
