"use client";
import { useState, useEffect, useRef } from "react";

/*
  AB 2288 / SB 92 Reform Process Flowchart.
  Shows the critical path from PAGA notice receipt through cure, remediation,
  early evaluation, and litigation — with deadline gates.
  Per §§ 2699(c)(1), 2699(d)(1), 2699(f), 2699(g), 2699(h), 2699.3(f).
*/

var steps = [
  { id: "notice", label: "PAGA Notice\nReceived", color: "#dc3545", x: 20, y: 80, w: 100, h: 50, deadline: "Day 0" },
  { id: "cure", label: "Cure Proposal\n(< 100 emp)", color: "#CC8800", x: 160, y: 30, w: 110, h: 50, deadline: "33 Days", cite: "§ 2699.3(a)(2)(A)" },
  { id: "remediate", label: "Remediation\nAll Employers", color: "#CC8800", x: 160, y: 130, w: 110, h: 50, deadline: "60 Days", cite: "§ 2699(h)(1)" },
  { id: "eec", label: "Early Evaluation\nConference", color: "#2c3e3a", x: 330, y: 80, w: 110, h: 50, deadline: "Discretionary", cite: "§ 2699.3(f)" },
  { id: "cap15", label: "15% Cap\nQualified", color: "#198754", x: 490, y: 20, w: 100, h: 45, deadline: "Pre-notice steps", cite: "§ 2699(g)(1)" },
  { id: "cap30", label: "30% Cap\nQualified", color: "#198754", x: 490, y: 80, w: 100, h: 45, deadline: "Post-notice steps", cite: "§ 2699(h)(1)" },
  { id: "litigation", label: "Full\nLitigation", color: "#8B0000", x: 490, y: 145, w: 100, h: 45, deadline: "No cap", cite: "" },
];

var arrows = [
  { from: "notice", to: "cure", label: "< 100 employees" },
  { from: "notice", to: "remediate", label: "All employers" },
  { from: "cure", to: "eec", label: "" },
  { from: "remediate", to: "eec", label: "" },
  { from: "eec", to: "cap15", label: "All pre-notice\nsteps documented" },
  { from: "eec", to: "cap30", label: "Remediated\nwithin 60 days" },
  { from: "eec", to: "litigation", label: "No qualification" },
];

export default function ReformRoadmapFlow() {
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

  var w = 620;
  var h = 220;

  function getStepById(id) {
    return steps.find(function (s) { return s.id === id; });
  }

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
        Process Map
      </div>
      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, color: "#333", marginBottom: 4, lineHeight: 1.4 }}>
        2024 PAGA Reform — Critical Path
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginBottom: 20, lineHeight: 1.5 }}>
        From notice receipt through cure, remediation, and penalty cap qualification. Each deadline gate determines the available defense posture.
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          <defs>
            <marker id="flowArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#999" />
            </marker>
          </defs>

          {/* Arrows */}
          {arrows.map(function (arrow, i) {
            var from = getStepById(arrow.from);
            var to = getStepById(arrow.to);
            var x1 = from.x + from.w;
            var y1 = from.y + from.h / 2;
            var x2 = to.x;
            var y2 = to.y + to.h / 2;
            var midX = (x1 + x2) / 2;
            return (
              <g key={i}>
                <path
                  d={"M " + x1 + " " + y1 + " C " + midX + " " + y1 + " " + midX + " " + y2 + " " + x2 + " " + y2}
                  fill="none" stroke="#ccc" strokeWidth={1.5} markerEnd="url(#flowArrow)"
                />
                {arrow.label && arrow.label.split("\n").map(function (line, j) {
                  return (
                    <text key={j} x={midX} y={(y1 + y2) / 2 - 6 + j * 10} textAnchor="middle"
                      style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#999" }}>
                      {line}
                    </text>
                  );
                })}
              </g>
            );
          })}

          {/* Step boxes */}
          {steps.map(function (step) {
            var lines = step.label.split("\n");
            return (
              <g key={step.id}>
                <rect x={step.x} y={step.y} width={step.w} height={step.h} rx={4}
                  fill={step.color + "10"} stroke={step.color} strokeWidth={1.5} />
                {lines.map(function (line, i) {
                  return (
                    <text key={i} x={step.x + step.w / 2} y={step.y + step.h / 2 - 4 + i * 13} textAnchor="middle"
                      style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: step.color }}>
                      {line}
                    </text>
                  );
                })}
                <text x={step.x + step.w / 2} y={step.y - 6} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fontWeight: 600, fill: step.color, letterSpacing: 1 }}>
                  {step.deadline}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
        AB 2288 / SB 92 (eff. June 19, 2024) · §§ 2699(c)(1), 2699(g)(1), 2699(h)(1), 2699.3(a)(2)(A), 2699.3(f)
      </div>
    </div>
  );
}
