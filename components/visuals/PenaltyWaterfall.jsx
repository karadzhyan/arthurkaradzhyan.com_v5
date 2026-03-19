"use client";
import { useState, useEffect, useRef } from "react";
/* Penalty Waterfall — Step-by-step accumulation showing how penalties stack
   from a single violation category to seven-figure total exposure.
   The "oh shit" chart for a board presentation. */

export default function PenaltyWaterfall() {
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

  var steps = [
    { label: "Base penalty\n(1 category, 1 period, 1 employee)", amount: 200, running: 200 },
    { label: "× 26 pay periods\n(12-month lookback, bi-weekly)", amount: 5000, running: 5200 },
    { label: "× 50 employees\n(all aggrieved employees)", amount: 254800, running: 260000 },
    { label: "+ Derivative: § 226(a)\nwage statement violations", amount: 130000, running: 390000 },
    { label: "+ Derivative: § 203\nwaiting time penalties", amount: 95000, running: 485000 },
    { label: "× 7 violation categories\ntotal exposure before reform", amount: 2362000, running: 2847000 },
    { label: "− ZB, N.A. recoverability\nstrip non-recoverable categories", amount: -1140000, running: 1707000 },
    { label: "− 30% penalty cap\nAB 2288 remediation credit", amount: -512000, running: 1195000 },
    { label: "− Temporal bifurcation\nremedy period rate reduction", amount: -511000, running: 684000 },
  ];

  var maxVal = 2847000;
  var barMaxW = 440;
  var svgW = 760;
  var rowH = 48;
  var headerH = 10;
  var svgH = headerH + steps.length * rowH + 40;

  function barWidth(val) {
    return Math.abs(val) / maxVal * barMaxW;
  }

  function fmtK(n) {
    if (Math.abs(n) >= 1000000) return (n < 0 ? "−" : "") + "$" + (Math.abs(n) / 1000000).toFixed(1) + "M";
    return (n < 0 ? "−" : "+") + "$" + (Math.abs(n) / 1000).toFixed(0) + "K";
  }

  function fmtTotal(n) {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
    return "$" + (n / 1000).toFixed(0) + "K";
  }

  var labelColW = 240;
  var barStartX = labelColW + 16;

  return (
    <div className="viz-waterfall" ref={ref}>
      <div className="viz-header">
        <div className="viz-label">Penalty Accumulation Waterfall</div>
        <div className="viz-subtitle">How a single compliance gap builds to seven-figure exposure — and how defense methodology reduces it</div>
      </div>
      <svg viewBox={"0 0 " + svgW + " " + svgH} fill="none" className="viz-svg" role="img" aria-label="Waterfall chart showing step-by-step penalty accumulation and defense reductions">
        {steps.map(function (step, i) {
          var y = headerH + i * rowH;
          var isNeg = step.amount < 0;
          var bw = visible ? barWidth(step.amount) : 0;
          var labelLines = step.label.split("\n");
          var prevRunning = i > 0 ? steps[i - 1].running : 0;
          var barX = isNeg ? barStartX + barWidth(step.running) : barStartX + barWidth(prevRunning);

          return (
            <g key={i}>
              {/* Alternating row bg */}
              {i % 2 === 0 && <rect x="0" y={y} width={svgW} height={rowH} fill="rgba(44,62,58,0.015)" />}

              {/* Step label */}
              {labelLines.map(function (line, li) {
                return (
                  <text key={li} x="8" y={y + 18 + li * 13} fontSize={li === 0 ? "9" : "8"}
                    fontWeight={li === 0 ? "600" : "400"}
                    fill={li === 0 ? "#1a1a1a" : "#999"} fontFamily="Outfit,sans-serif">{line}</text>
                );
              })}

              {/* Bar */}
              <rect x={barX} y={y + 8} width={bw} height="24" rx="2"
                fill={isNeg ? "#4a7a6f" : (i <= 2 ? "#CC8800" : "rgba(204,136,0,0.6)")}
                fillOpacity={isNeg ? 0.7 : (i <= 2 ? 0.5 : 0.35)}
                style={{ transition: "width 0.8s cubic-bezier(0.25,0.46,0.45,0.94)", transitionDelay: (i * 0.12) + "s" }} />

              {/* Amount label on bar */}
              {visible && (
                <text x={barX + bw + 6} y={y + 24} fontSize="10" fontWeight="700"
                  fill={isNeg ? "#4a7a6f" : "#CC8800"} fontFamily="Outfit,sans-serif"
                  style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s", transitionDelay: (0.5 + i * 0.12) + "s" }}>
                  {fmtK(step.amount)}
                </text>
              )}

              {/* Running total (right-aligned) */}
              {visible && (
                <text x={svgW - 8} y={y + 24} textAnchor="end" fontSize="10" fontWeight="600"
                  fill={isNeg ? "#4a7a6f" : "#2c3e3a"} fontFamily="Outfit,sans-serif"
                  style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s", transitionDelay: (0.6 + i * 0.12) + "s" }}>
                  {fmtTotal(step.running)}
                </text>
              )}

              {/* Connector line between steps */}
              {i > 0 && !isNeg && (
                <line x1={barX} y1={y} x2={barX} y2={y + 8} stroke="rgba(44,62,58,0.1)" strokeWidth="1" strokeDasharray="2 2" />
              )}
            </g>
          );
        })}

        {/* Column header */}
        <text x={svgW - 8} y={headerH + steps.length * rowH + 10} textAnchor="end" fontSize="7" fontWeight="600"
          fill="#aaa" fontFamily="Outfit,sans-serif" letterSpacing="1">RUNNING TOTAL</text>

        {/* Defense reduction zone label */}
        <rect x="0" y={headerH + 6 * rowH - 4} width="4" height={rowH * 3 + 8} fill="#4a7a6f" fillOpacity="0.3" rx="2" />
        <text x="1" y={headerH + 7.5 * rowH + 4} fontSize="7" fill="#4a7a6f" fontFamily="Outfit,sans-serif"
          letterSpacing="1" fontWeight="600" transform={"rotate(-90," + 1 + "," + (headerH + 7.5 * rowH + 4) + ")"} textAnchor="middle">
        </text>
      </svg>
      <div className="viz-footnote">
        Illustrative 50-employee scenario · Bi-weekly payroll · 12-month PAGA period · Hypothetical violation rates
      </div>
    </div>
  );
}
