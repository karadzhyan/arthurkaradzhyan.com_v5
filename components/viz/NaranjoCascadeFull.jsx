"use client";
import { useState, useEffect, useRef } from "react";

/*
  Full Naranjo Cascade — shows ALL four violation types side by side
  with their derivative penalty streams. Comprehensive reference diagram.
  Per Naranjo v. Spectrum Security (2022) 13 Cal.5th 93.
*/

var chains = [
  {
    trigger: "Missed\nMeal Period",
    color: "#dc3545",
    derivatives: [
      { code: "§ 226.7", label: "Premium", type: "wage" },
      { code: "§ 2699(f)", label: "PAGA Penalty", type: "penalty" },
      { code: "§ 226(a)", label: "Wage Stmt", type: "penalty" },
      { code: "§ 203", label: "Waiting Time", type: "penalty" },
    ],
  },
  {
    trigger: "Missed\nRest Period",
    color: "#CC8800",
    derivatives: [
      { code: "§ 226.7", label: "Premium", type: "wage" },
      { code: "§ 2699(f)", label: "PAGA Penalty", type: "penalty" },
      { code: "§ 226(a)", label: "Wage Stmt", type: "penalty" },
      { code: "§ 203", label: "Waiting Time", type: "penalty" },
    ],
  },
  {
    trigger: "Overtime\nUnderpayment",
    color: "#2c3e3a",
    derivatives: [
      { code: "§ 510", label: "OT Wages", type: "wage" },
      { code: "§ 2699(f)", label: "PAGA Penalty", type: "penalty" },
      { code: "§ 226(a)", label: "Wage Stmt", type: "penalty" },
      { code: "§ 210", label: "Late Payment", type: "penalty" },
    ],
  },
  {
    trigger: "Regular Rate\nError (Ferra)",
    color: "#8B0000",
    derivatives: [
      { code: "§ 226.7", label: "Underpayment", type: "wage" },
      { code: "§ 2699(f)", label: "PAGA Penalty", type: "penalty" },
      { code: "§ 226(a)", label: "Wage Stmt", type: "penalty" },
      { code: "§ 203", label: "Waiting Time", type: "penalty" },
    ],
  },
];

export default function NaranjoCascadeFull() {
  var [visible, setVisible] = useState(false);
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  var colW = 160;
  var w = 40 + chains.length * colW;
  var h = 300;
  var triggerY = 40;
  var triggerH = 40;
  var derivStartY = 120;
  var derivH = 28;
  var derivGap = 6;

  return (
    <div ref={ref} style={{
      background: "#fff",
      border: "1px solid #e0e0e0",
      padding: "32px 24px 20px",
      marginBottom: 32,
      position: "relative",
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #2c3e3a, #4a7a6f)" }} />

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 6 }}>
        Complete Reference
      </div>
      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, color: "#333", marginBottom: 4, lineHeight: 1.4 }}>
        The Naranjo Derivative Cascade — All Four Chains
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginBottom: 20, lineHeight: 1.5 }}>
        Every primary violation triggers the same four-stream derivative chain. The underlying violation category changes — the cascading penalty structure does not.
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          {chains.map(function (chain, ci) {
            var cx = 20 + ci * colW + colW / 2;
            var delay = 0.2 + ci * 0.15;

            return (
              <g key={ci} opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s ease " + delay + "s" }}>
                {/* Trigger box */}
                <rect x={cx - 55} y={triggerY} width={110} height={triggerH} rx={4}
                  fill={chain.color + "15"} stroke={chain.color} strokeWidth={1.5} />
                {chain.trigger.split("\n").map(function (line, li) {
                  return (
                    <text key={li} x={cx} y={triggerY + 16 + li * 13} textAnchor="middle"
                      style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: chain.color }}>
                      {line}
                    </text>
                  );
                })}

                {/* Vertical line from trigger to derivatives */}
                <line x1={cx} y1={triggerY + triggerH} x2={cx} y2={derivStartY - 6}
                  stroke={chain.color + "40"} strokeWidth={1.5} />
                <circle cx={cx} cy={derivStartY - 6} r={3} fill={chain.color} />

                {/* Derivative nodes */}
                {chain.derivatives.map(function (d, di) {
                  var dy = derivStartY + di * (derivH + derivGap);
                  var isWage = d.type === "wage";
                  return (
                    <g key={di}>
                      <rect x={cx - 55} y={dy} width={110} height={derivH} rx={3}
                        fill={isWage ? "#CC880010" : chain.color + "08"} stroke={isWage ? "#CC880040" : chain.color + "30"} strokeWidth={0.5} />
                      <rect x={cx - 55} y={dy} width={2.5} height={derivH} rx={1}
                        fill={isWage ? "#CC8800" : chain.color} />
                      <text x={cx - 48} y={dy + 12}
                        style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 700, fill: isWage ? "#CC8800" : chain.color }}>
                        {d.code}
                      </text>
                      <text x={cx - 48} y={dy + 22}
                        style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#888" }}>
                        {d.label}
                      </text>
                      {/* Type badge */}
                      <text x={cx + 50} y={dy + 18} textAnchor="end"
                        style={{ fontFamily: "'Outfit', sans-serif", fontSize: 6, fontWeight: 600, fill: isWage ? "#CC8800" : chain.color, letterSpacing: 0.5 }}>
                        {isWage ? "WAGE" : "PAGA"}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
        Naranjo v. Spectrum Security (2022) 13 Cal.5th 93 · Kirby v. Immoos (2012) 53 Cal.4th 1244 · Post-reform: § 2699(i) limits derivative stacking
      </div>
    </div>
  );
}
