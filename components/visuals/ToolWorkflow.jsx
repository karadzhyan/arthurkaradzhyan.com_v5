"use client";
/* ToolWorkflow — Shows how the 8 tools fit into an actual PAGA defense
   engagement. Three phases: intake → analysis → compliance/reform. */

export default function ToolWorkflow() {
  var svgW = 760, svgH = 480;

  var phases = [
    {
      label: "NOTICE RECEIVED", num: "1", y: 24, color: "#CC8800",
      tools: [
        { name: "SOL Calculator", id: "04", x: 100, desc: "Map deadlines & lookback" },
        { name: "Decision Tree", id: "07", x: 380, desc: "Route defense strategy" },
      ]
    },
    {
      label: "EXPOSURE ANALYSIS", num: "2", y: 160, color: "#2c3e3a",
      tools: [
        { name: "Penalty Estimator", id: "01", x: 30, desc: "3-scenario model" },
        { name: "Regular Rate Calc", id: "02", x: 210, desc: "True rate computation" },
        { name: "Recoverability", id: "05", x: 400, desc: "ZB, N.A. filter" },
        { name: "Derivative Mapper", id: "06", x: 590, desc: "Cascade analysis" },
      ]
    },
    {
      label: "COMPLIANCE & REFORM", num: "3", y: 310, color: "#4a7a6f",
      tools: [
        { name: "Cap Qualifier", id: "03", x: 160, desc: "15%/30% documentation" },
        { name: "Wage Stmt Check", id: "08", x: 420, desc: "9-element § 226(a)" },
      ]
    },
  ];

  var toolW = 140, toolH = 56;

  /* Data flow arrows between tools */
  var flows = [
    { from: [0, 0], to: [1, 0], label: "Lookback" },
    { from: [0, 1], to: [1, 0], label: "Strategy" },
    { from: [1, 1], to: [1, 0], label: "Rate data" },
    { from: [1, 0], to: [1, 2], label: "Categories" },
    { from: [1, 2], to: [1, 3], label: "Recoverable" },
    { from: [1, 0], to: [2, 0], label: "Exposure" },
    { from: [1, 3], to: [2, 1], label: "Gaps" },
  ];

  var outputY = 420;

  return (
    <div className="viz-workflow">
      <div className="viz-header">
        <div className="viz-label">Defense Engagement Workflow</div>
        <div className="viz-subtitle">How the 8 tools connect across three phases of a PAGA defense matter</div>
      </div>
      <svg viewBox={"0 0 " + svgW + " " + svgH} fill="none" className="viz-svg" role="img" aria-label="Workflow diagram showing how 8 PAGA defense tools interconnect across engagement phases">
        <defs>
          <marker id="wf-arrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0L10 3.5L0 7z" fill="#8aa39e" />
          </marker>
          <filter id="card-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#2c3e3a" floodOpacity="0.06" />
          </filter>
        </defs>

        {/* Phase backgrounds */}
        {phases.map(function (phase, pi) {
          var nextY = pi < phases.length - 1 ? phases[pi + 1].y : outputY - 10;
          var h = nextY - phase.y - 8;
          return (
            <g key={"phase-" + pi}>
              <rect x="4" y={phase.y} width={svgW - 8} height={h} rx="8"
                fill={pi % 2 === 0 ? "rgba(44,62,58,0.02)" : "rgba(44,62,58,0.035)"} />
              <text x="18" y={phase.y + 17} fontSize="9" fontWeight="700" letterSpacing="3"
                fill={phase.color} fontFamily="Outfit,sans-serif" fillOpacity="0.6">{phase.label}</text>
              {/* Timing badge */}
              <rect x={svgW - 90} y={phase.y + 6} width="76" height="18" rx="9" fill={phase.color} fillOpacity="0.08" />
              <text x={svgW - 52} y={phase.y + 18} textAnchor="middle" fontSize="8" fontWeight="600" fill={phase.color} fontFamily="Outfit,sans-serif">
                {pi === 0 ? "DAY 0–33" : pi === 1 ? "DAY 1–60" : "DAY 30–65"}
              </text>
            </g>
          );
        })}

        {/* Data flow arrows */}
        {flows.map(function (flow, fi) {
          var fromPhase = phases[flow.from[0]];
          var fromTool = fromPhase.tools[flow.from[1]];
          var toPhase = phases[flow.to[0]];
          var toTool = toPhase.tools[flow.to[1]];

          /* Same-phase horizontal flow */
          if (flow.from[0] === flow.to[0]) {
            var x1r = fromTool.x + toolW + 2;
            var y1h = fromPhase.y + 36 + toolH / 2;
            var x2l = toTool.x - 2;
            return (
              <g key={"flow-" + fi}>
                <path d={"M" + x1r + " " + y1h + " L" + x2l + " " + y1h}
                  stroke="#8aa39e" strokeWidth="1.2" strokeOpacity="0.3" markerEnd="url(#wf-arrow)" />
                <text x={(x1r + x2l) / 2} y={y1h - 6} textAnchor="middle" fontSize="7" fontWeight="500"
                  fill="rgba(138,163,158,0.5)" fontFamily="Outfit,sans-serif">{flow.label}</text>
              </g>
            );
          }

          /* Cross-phase vertical flow */
          var x1 = fromTool.x + toolW / 2;
          var y1 = fromPhase.y + 36 + toolH + 2;
          var x2 = toTool.x + toolW / 2;
          var y2 = toPhase.y + 36 - 2;
          var midY = (y1 + y2) / 2;
          return (
            <g key={"flow-" + fi}>
              <path d={"M" + x1 + " " + y1 + " C" + x1 + " " + midY + " " + x2 + " " + midY + " " + x2 + " " + y2}
                stroke="#8aa39e" strokeWidth="1.2" strokeOpacity="0.25" strokeDasharray="5 3" markerEnd="url(#wf-arrow)" fill="none" />
              <rect x={(x1 + x2) / 2 - 22} y={midY - 7} width="44" height="14" rx="7" fill="rgba(138,163,158,0.07)" />
              <text x={(x1 + x2) / 2} y={midY + 2} textAnchor="middle" fontSize="7" fontWeight="500"
                fill="rgba(138,163,158,0.5)" fontFamily="Outfit,sans-serif">{flow.label}</text>
            </g>
          );
        })}

        {/* Tool nodes */}
        {phases.map(function (phase, pi) {
          return phase.tools.map(function (tool, ti) {
            var x = tool.x;
            var y = phase.y + 36;
            return (
              <g key={"tool-" + pi + "-" + ti} filter="url(#card-shadow)">
                <rect x={x} y={y} width={toolW} height={toolH} rx="6"
                  fill="white" stroke={phase.color} strokeWidth="1.5" strokeOpacity="0.25" />
                {/* Phase accent line at top */}
                <rect x={x + 1} y={y} width={toolW - 2} height="3" rx="3 3 0 0" fill={phase.color} fillOpacity="0.35" />
                {/* Tool number */}
                <text x={x + 10} y={y + 20} fontSize="11" fontWeight="700" fill={phase.color}
                  fontFamily="Outfit,sans-serif" fillOpacity="0.18">{tool.id}</text>
                {/* Tool name */}
                <text x={x + toolW / 2} y={y + 26} textAnchor="middle" fontSize="10" fontWeight="700"
                  fill="#1a1a1a" fontFamily="Outfit,sans-serif">{tool.name}</text>
                {/* Description */}
                <text x={x + toolW / 2} y={y + 42} textAnchor="middle" fontSize="8"
                  fill="#999" fontFamily="Outfit,sans-serif">{tool.desc}</text>
              </g>
            );
          });
        })}

        {/* Convergence lines to output */}
        {phases[2].tools.map(function (tool, i) {
          return (
            <path key={"conv-" + i} d={"M" + (tool.x + toolW / 2) + " " + (phases[2].y + 36 + toolH) + " L" + (svgW / 2) + " " + outputY}
              stroke="#8aa39e" strokeWidth="1" strokeOpacity="0.15" fill="none" />
          );
        })}

        {/* Output node */}
        <rect x={svgW / 2 - 140} y={outputY} width="280" height="44" rx="22" fill="#2c3e3a" />
        <text x={svgW / 2} y={outputY + 19} textAnchor="middle" fontSize="11" fontWeight="600"
          fill="#fff" fontFamily="Outfit,sans-serif" letterSpacing="1.5">MEDIATION-READY POSITION</text>
        <text x={svgW / 2} y={outputY + 34} textAnchor="middle" fontSize="8"
          fill="rgba(255,255,255,0.45)" fontFamily="Outfit,sans-serif">Quantified · Documented · Reform-leveraged</text>
      </svg>
      <div className="viz-footnote">
        Tool sequencing reflects typical defense engagement timeline — actual usage varies by procedural posture
      </div>
    </div>
  );
}
