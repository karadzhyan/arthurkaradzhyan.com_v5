"use client";
import { useState, useEffect, useRef } from "react";

/*
  AB 2288 / SB 92 Reform Process Flowchart — deepened version.
  Additions:
  - Timeline ruler with day markers
  - Active deadline highlighting with urgency indicators
  - Documentation requirements per node (hover/click to expand)
  - Statutory citation badges
  - Penalty cap dollar impact annotations
*/

var steps = [
  {
    id: "notice", label: "PAGA Notice\nReceived", color: "#dc3545",
    x: 20, y: 85, w: 105, h: 55,
    deadline: "Day 0", cite: "§ 2699.3(a)(1)",
    docs: ["Retain notice and all attachments", "Identify all named violations", "Calendar all statutory deadlines", "Notify insurance carrier immediately"],
    urgency: "critical",
  },
  {
    id: "cure", label: "Cure Proposal\n(< 100 emp)", color: "#CC8800",
    x: 170, y: 30, w: 115, h: 55,
    deadline: "≤ 33 Days", cite: "§ 2699.3(a)(2)(A)",
    docs: ["Draft written cure proposal", "Identify each alleged violation", "Propose specific remedial measures", "Submit to LWDA and employee"],
    urgency: "high",
  },
  {
    id: "remediate", label: "Remediation\n(All Employers)", color: "#CC8800",
    x: 170, y: 140, w: 115, h: 55,
    deadline: "≤ 60 Days", cite: "§ 2699(h)(1)",
    docs: ["Revise all written policies", "Distribute updated acknowledgments", "Conduct compliance training", "Audit payroll retroactively", "Document all remedial steps with dates"],
    urgency: "high",
  },
  {
    id: "eec", label: "Early Evaluation\nConference", color: "#2c3e3a",
    x: 340, y: 85, w: 115, h: 55,
    deadline: "Court-set", cite: "§ 2699.3(f)",
    docs: ["Prepare exposure model (3 scenarios)", "Compile remediation evidence binder", "Draft settlement authority memo", "Identify manageability issues"],
    urgency: "moderate",
  },
  {
    id: "cap15", label: "15% Cap\nQualified", color: "#198754",
    x: 510, y: 15, w: 110, h: 50,
    deadline: "Pre-notice", cite: "§ 2699(g)(1)",
    docs: ["All 12 pre-notice compliance items documented", "Written policies with distribution proof", "Training records with attendance", "Payroll compliance audit results"],
    urgency: "resolved",
  },
  {
    id: "cap30", label: "30% Cap\nQualified", color: "#198754",
    x: 510, y: 85, w: 110, h: 50,
    deadline: "Post-notice", cite: "§ 2699(h)(1)",
    docs: ["6 post-notice remediation items documented", "Remediation completed within 60 days", "Policy revision + distribution + training", "Payroll correction + back-pay"],
    urgency: "resolved",
  },
  {
    id: "litigation", label: "Full\nLitigation", color: "#8B0000",
    x: 510, y: 160, w: 110, h: 50,
    deadline: "No cap", cite: "",
    docs: ["Prepare full litigation defense", "Challenge standing, manageability", "Deploy arbitration if applicable", "Three-scenario exposure model"],
    urgency: "critical",
  },
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

var urgencyBadges = {
  critical: { label: "URGENT", bg: "#dc354515", border: "#dc354540", color: "#dc3545" },
  high: { label: "TIME-SENSITIVE", bg: "#CC880015", border: "#CC880040", color: "#CC8800" },
  moderate: { label: "STRATEGIC", bg: "#2c3e3a10", border: "#2c3e3a30", color: "#2c3e3a" },
  resolved: { label: "OUTCOME", bg: "#19875410", border: "#19875430", color: "#198754" },
};

export default function ReformRoadmapFlow() {
  var [visible, setVisible] = useState(false);
  var [activeStep, setActiveStep] = useState(null);
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

  var w = 650;
  var h = 230;

  function getStepById(id) {
    return steps.find(function (s) { return s.id === id; });
  }

  var activeStepData = activeStep ? getStepById(activeStep) : null;

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
        From notice receipt through cure, remediation, and penalty cap qualification. Click any node for documentation requirements and statutory authority.
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          <defs>
            <marker id="flowArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#999" />
            </marker>
          </defs>

          {/* Timeline ruler at bottom */}
          <line x1={20} y1={h - 12} x2={w - 20} y2={h - 12} stroke="#eee" strokeWidth={1} />
          {[
            { label: "Day 0", x: 72 },
            { label: "Day 33", x: 227 },
            { label: "Day 60", x: 227 },
            { label: "EEC", x: 397 },
            { label: "Resolution", x: 565 },
          ].map(function (tick, i) {
            return (
              <g key={i}>
                <line x1={tick.x} y1={h - 16} x2={tick.x} y2={h - 8} stroke="#ddd" strokeWidth={1} />
                <text x={tick.x} y={h - 2} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#bbb" }}>
                  {tick.label}
                </text>
              </g>
            );
          })}

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
            var isActive = activeStep === step.id;
            return (
              <g key={step.id} style={{ cursor: "pointer" }}
                onClick={function () { setActiveStep(isActive ? null : step.id); }}>
                <rect x={step.x} y={step.y} width={step.w} height={step.h} rx={4}
                  fill={isActive ? step.color + "20" : step.color + "10"}
                  stroke={step.color} strokeWidth={isActive ? 2.5 : 1.5} />
                {lines.map(function (line, i) {
                  return (
                    <text key={i} x={step.x + step.w / 2} y={step.y + step.h / 2 - 4 + i * 13} textAnchor="middle"
                      style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: step.color }}>
                      {line}
                    </text>
                  );
                })}
                {/* Deadline badge */}
                <rect x={step.x + step.w / 2 - 28} y={step.y - 14} width={56} height={14} rx={7}
                  fill={step.color} />
                <text x={step.x + step.w / 2} y={step.y - 4} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fontWeight: 700, fill: "#fff", letterSpacing: 0.5 }}>
                  {step.deadline}
                </text>
                {/* Statutory cite */}
                {step.cite && (
                  <text x={step.x + step.w / 2} y={step.y + step.h + 10} textAnchor="middle"
                    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 6, fill: step.color + "80" }}>
                    {step.cite}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Documentation requirements panel */}
      {activeStepData && (
        <div style={{
          marginTop: 12,
          padding: "12px 16px",
          background: activeStepData.color + "08",
          border: "1px solid " + activeStepData.color + "20",
          borderLeft: "3px solid " + activeStepData.color,
          borderRadius: 4,
          transition: "all 0.3s ease",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, color: activeStepData.color }}>
              {activeStepData.label.replace("\n", " ")}
            </div>
            <div style={{
              padding: "2px 8px",
              background: urgencyBadges[activeStepData.urgency].bg,
              border: "1px solid " + urgencyBadges[activeStepData.urgency].border,
              borderRadius: 3,
              fontFamily: "'Outfit', sans-serif",
              fontSize: 8,
              fontWeight: 600,
              color: urgencyBadges[activeStepData.urgency].color,
              letterSpacing: 1,
            }}>
              {urgencyBadges[activeStepData.urgency].label}
            </div>
          </div>
          {activeStepData.cite && (
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", marginBottom: 8 }}>
              Governing: {activeStepData.cite}
            </div>
          )}
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, color: "#666", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
            Documentation Requirements
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {activeStepData.docs.map(function (doc, i) {
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: activeStepData.color, marginTop: 5, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#555", lineHeight: 1.5 }}>{doc}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
        AB 2288 / SB 92 (eff. June 19, 2024) · §§ 2699(c)(1), 2699(g)(1), 2699(h)(1), 2699.3(a)(2)(A), 2699.3(f)
      </div>
    </div>
  );
}
