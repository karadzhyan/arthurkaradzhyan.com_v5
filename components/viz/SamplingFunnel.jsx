"use client";
import { useState, useEffect, useRef } from "react";

/*
  Statistical sampling funnel diagram.
  Shows: Total Workforce → Aggrieved Employees → Statistical Sample →
  Violation Rate → Extrapolated Exposure.
  Per Duran v. U.S. Bank (2014) 59 Cal.4th 1 and Bell v. Farmers Ins. (2001) 87 Cal.App.4th 805.
*/

var stages = [
  { label: "Total Workforce", value: "500", sub: "All employees in job classification", width: 100 },
  { label: "Aggrieved Employees", value: "200", sub: "Worked during PAGA period", width: 80 },
  { label: "Statistical Sample", value: "40", sub: "Duran-compliant random sample", width: 60 },
  { label: "Violation Rate", value: "32%", sub: "Sample violation frequency", width: 40 },
  { label: "Extrapolated Exposure", value: "$1.2M", sub: "Applied to full class/PAGA group", width: 70 },
];

export default function SamplingFunnel() {
  var [visible, setVisible] = useState(false);
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  var w = 520;
  var h = 320;
  var cx = w / 2;
  var startY = 30;
  var stageH = 50;
  var gap = 8;

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
        Methodology
      </div>
      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, color: "#333", marginBottom: 4, lineHeight: 1.4 }}>
        Statistical Sampling — From Population to Exposure
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginBottom: 20, lineHeight: 1.5 }}>
        A Duran-compliant sampling framework narrows the workforce to a representative sample, measures violations, and extrapolates to the full group.
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          {stages.map(function (stage, i) {
            var y = startY + i * (stageH + gap);
            var halfW = (stage.width / 100) * (w * 0.4);
            var nextHalfW = i < stages.length - 1 ? (stages[i + 1].width / 100) * (w * 0.4) : halfW;
            var delay = 0.2 + i * 0.15;
            var colors = ["#2c3e3a", "#2c3e3a", "#CC8800", "#dc3545", "#198754"];
            var color = colors[i];

            return (
              <g key={i} opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s ease " + delay + "s" }}>
                {/* Trapezoid */}
                <path d={
                  "M " + (cx - halfW) + " " + y +
                  " L " + (cx + halfW) + " " + y +
                  " L " + (cx + nextHalfW) + " " + (y + stageH) +
                  " L " + (cx - nextHalfW) + " " + (y + stageH) + " Z"
                } fill={color + "15"} stroke={color + "40"} strokeWidth={1} />

                {/* Value */}
                <text x={cx} y={y + 22} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, fill: color }}>
                  {stage.value}
                </text>

                {/* Label */}
                <text x={cx} y={y + 37} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 500, fill: "#888" }}>
                  {stage.label}
                </text>

                {/* Side annotation */}
                <text x={cx + halfW + 12} y={y + 28} textAnchor="start"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#bbb" }}>
                  {stage.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
        Per Duran v. U.S. Bank (2014) 59 Cal.4th 1; Bell v. Farmers Ins. (2001) 87 Cal.App.4th 805. Sample must be random, representative, and statistically significant.
      </div>
    </div>
  );
}
