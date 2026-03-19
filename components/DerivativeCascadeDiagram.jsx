"use client";
import { useState, useEffect, useRef } from "react";

/*
  Static SVG diagram showing how a single violation cascades into
  derivative penalty streams. Syncs with the selected trigger in
  DerivativeMapper via the `trigger` prop.

  Chain data mirrors DerivativeMapper.jsx exactly.
*/

var chainData = {
  meal: {
    triggerLabel: "Missed Meal Period",
    triggerSub: "Employer fails to provide a compliant 30-minute meal period",
    nodes: [
      { code: "§ 226.7", label: "Meal Period Premium", type: "wage", color: "#CC8800" },
      { code: "§ 2699(f)(2)", label: "PAGA Default Penalty", type: "penalty", color: "#2c3e3a" },
      { code: "§ 226(a)/(e)", label: "Wage Statement Penalty", type: "penalty", color: "#dc3545" },
      { code: "§ 203", label: "Waiting Time Penalty", type: "penalty", color: "#8B0000" },
    ],
  },
  rest: {
    triggerLabel: "Missed Rest Period",
    triggerSub: "Employer fails to authorize a compliant 10-minute rest period",
    nodes: [
      { code: "§ 226.7", label: "Rest Period Premium", type: "wage", color: "#CC8800" },
      { code: "§ 2699(f)(2)", label: "PAGA Default Penalty", type: "penalty", color: "#2c3e3a" },
      { code: "§ 226(a)/(e)", label: "Wage Statement Penalty", type: "penalty", color: "#dc3545" },
      { code: "§ 203", label: "Waiting Time Penalty", type: "penalty", color: "#8B0000" },
    ],
  },
  overtime: {
    triggerLabel: "Overtime Underpayment",
    triggerSub: "Regular rate miscalculated — overtime premium underpaid",
    nodes: [
      { code: "§ 510/1194", label: "Underpaid OT Wages", type: "wage", color: "#CC8800" },
      { code: "§ 2699(f)(2)", label: "PAGA Default Penalty", type: "penalty", color: "#2c3e3a" },
      { code: "§ 226(a)/(e)", label: "Wage Statement Penalty", type: "penalty", color: "#dc3545" },
      { code: "§ 210", label: "Late Payment Penalty", type: "penalty", color: "#666" },
    ],
  },
  regrate: {
    triggerLabel: "Regular Rate Error",
    triggerSub: "Premiums at base rate instead of regular rate (Ferra)",
    nodes: [
      { code: "§ 226.7", label: "Premium Underpayment", type: "wage", color: "#CC8800" },
      { code: "§ 2699(f)(2)", label: "PAGA Default Penalty", type: "penalty", color: "#2c3e3a" },
      { code: "§ 226(a)/(e)", label: "Wage Statement Penalty", type: "penalty", color: "#dc3545" },
      { code: "§ 203", label: "Waiting Time Penalty", type: "penalty", color: "#8B0000" },
    ],
  },
};

export default function DerivativeCascadeDiagram({ trigger }) {
  var [visible, setVisible] = useState(false);
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  var chain = chainData[trigger] || chainData.meal;
  var nodeCount = chain.nodes.length;

  // SVG dimensions
  var svgW = 720;
  var svgH = 240;
  var triggerX = 20;
  var triggerY = svgH / 2;
  var triggerW = 190;
  var triggerH = 60;
  var nodeStartX = 320;
  var nodeW = 180;
  var nodeH = 40;
  var totalNodesH = nodeCount * nodeH + (nodeCount - 1) * 8;
  var nodeStartY = (svgH - totalNodesH) / 2;
  var junctionX = 270;

  return (
    <div ref={ref} style={{
      marginBottom: 24,
      padding: "24px 0 16px",
      overflow: "hidden",
    }}>
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: "#2c3e3a",
        marginBottom: 16,
      }}>
        The Naranjo Derivative Chain
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg
          viewBox={"0 0 " + svgW + " " + svgH}
          style={{ width: "100%", maxWidth: svgW, height: "auto", display: "block" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Trigger box */}
          <rect
            x={triggerX}
            y={triggerY - triggerH / 2}
            width={triggerW}
            height={triggerH}
            rx={4}
            fill="#f8f0f0"
            stroke="#dc3545"
            strokeWidth={1.5}
            opacity={visible ? 1 : 0}
            style={{ transition: "opacity 0.6s ease 0.1s" }}
          />
          <text
            x={triggerX + triggerW / 2}
            y={triggerY - 6}
            textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: "#dc3545", letterSpacing: 2 }}
            opacity={visible ? 1 : 0}
          >
            TRIGGERING EVENT
          </text>
          <text
            x={triggerX + triggerW / 2}
            y={triggerY + 12}
            textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, fill: "#333" }}
            opacity={visible ? 1 : 0}
          >
            {chain.triggerLabel}
          </text>

          {/* Main horizontal line from trigger to junction */}
          <line
            x1={triggerX + triggerW}
            y1={triggerY}
            x2={junctionX}
            y2={triggerY}
            stroke="#ddd"
            strokeWidth={2}
            opacity={visible ? 1 : 0}
            style={{ transition: "opacity 0.4s ease 0.3s" }}
          />

          {/* Junction dot */}
          <circle
            cx={junctionX}
            cy={triggerY}
            r={4}
            fill="#2c3e3a"
            opacity={visible ? 1 : 0}
            style={{ transition: "opacity 0.4s ease 0.3s" }}
          />

          {/* Vertical line at junction */}
          <line
            x1={junctionX}
            y1={nodeStartY + nodeH / 2}
            x2={junctionX}
            y2={nodeStartY + totalNodesH - nodeH / 2}
            stroke="#ddd"
            strokeWidth={2}
            opacity={visible ? 1 : 0}
            style={{ transition: "opacity 0.4s ease 0.4s" }}
          />

          {/* Derivative nodes */}
          {chain.nodes.map(function (node, i) {
            var ny = nodeStartY + i * (nodeH + 8);
            var delay = 0.5 + i * 0.15;
            return (
              <g key={i}>
                {/* Horizontal connector line */}
                <line
                  x1={junctionX}
                  y1={ny + nodeH / 2}
                  x2={nodeStartX}
                  y2={ny + nodeH / 2}
                  stroke={node.color + "60"}
                  strokeWidth={1.5}
                  opacity={visible ? 1 : 0}
                  style={{ transition: "opacity 0.3s ease " + delay + "s" }}
                />
                {/* Arrow head */}
                <polygon
                  points={
                    (nodeStartX - 6) + "," + (ny + nodeH / 2 - 4) + " " +
                    nodeStartX + "," + (ny + nodeH / 2) + " " +
                    (nodeStartX - 6) + "," + (ny + nodeH / 2 + 4)
                  }
                  fill={node.color + "80"}
                  opacity={visible ? 1 : 0}
                  style={{ transition: "opacity 0.3s ease " + delay + "s" }}
                />

                {/* Node rect */}
                <rect
                  x={nodeStartX}
                  y={ny}
                  width={nodeW}
                  height={nodeH}
                  rx={3}
                  fill={node.color + "0a"}
                  stroke={node.color + "40"}
                  strokeWidth={1}
                  opacity={visible ? 1 : 0}
                  style={{ transition: "opacity 0.4s ease " + delay + "s" }}
                />
                {/* Left accent bar */}
                <rect
                  x={nodeStartX}
                  y={ny}
                  width={3}
                  height={nodeH}
                  rx={1}
                  fill={node.color}
                  opacity={visible ? 1 : 0}
                  style={{ transition: "opacity 0.4s ease " + delay + "s" }}
                />

                {/* Statute code */}
                <text
                  x={nodeStartX + 12}
                  y={ny + 16}
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, fill: node.color }}
                  opacity={visible ? 1 : 0}
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, fill: node.color, transition: "opacity 0.4s ease " + delay + "s" }}
                >
                  {node.code}
                </text>

                {/* Label */}
                <text
                  x={nodeStartX + 12}
                  y={ny + 30}
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 500, fill: "#555", transition: "opacity 0.4s ease " + delay + "s" }}
                  opacity={visible ? 1 : 0}
                >
                  {node.label}
                </text>

                {/* Type badge */}
                <rect
                  x={nodeStartX + nodeW + 10}
                  y={ny + 10}
                  width={node.type === "wage" ? 78 : 68}
                  height={20}
                  rx={2}
                  fill={node.type === "wage" ? "#fff8e0" : node.color + "15"}
                  stroke={node.type === "wage" ? "#CC8800" + "50" : node.color + "40"}
                  strokeWidth={0.5}
                  opacity={visible ? 1 : 0}
                  style={{ transition: "opacity 0.4s ease " + delay + "s" }}
                />
                <text
                  x={nodeStartX + nodeW + 10 + (node.type === "wage" ? 39 : 34)}
                  y={ny + 24}
                  textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 600, fill: node.type === "wage" ? "#CC8800" : node.color, letterSpacing: 1, transition: "opacity 0.4s ease " + delay + "s" }}
                  opacity={visible ? 1 : 0}
                >
                  {node.type === "wage" ? "WAGE ONLY" : "PAGA"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 10,
        color: "#999",
        marginTop: 8,
        lineHeight: 1.5,
      }}>
        Per Naranjo v. Spectrum Security (2022) 13 Cal.5th 93. Post-reform anti-stacking under § 2699(i) may limit derivative penalties for non-knowing/non-willful violations.
      </div>
    </div>
  );
}
