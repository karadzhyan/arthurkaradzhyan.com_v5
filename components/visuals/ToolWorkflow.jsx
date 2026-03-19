"use client";
/* ToolWorkflow — Shows how the 8 tools fit into an actual PAGA defense
   engagement. This is the "how to use the platform" visualization —
   unique to the /tools page, not duplicated from the homepage. */

export default function ToolWorkflow() {
  var svgW = 760, svgH = 520;

  /* Phases of a PAGA defense engagement with associated tools */
  var phases = [
    {
      label: "NOTICE RECEIVED", y: 30, color: "#CC8800",
      tools: [
        { name: "SOL Calculator", id: 4, x: 80, desc: "Map deadlines & lookback" },
        { name: "Decision Tree", id: 7, x: 340, desc: "Route defense strategy" },
      ]
    },
    {
      label: "EXPOSURE ANALYSIS", y: 170, color: "#2c3e3a",
      tools: [
        { name: "Penalty Estimator", id: 1, x: 40, desc: "3-scenario model" },
        { name: "Regular Rate Calc", id: 2, x: 220, desc: "True rate computation" },
        { name: "Recoverability", id: 5, x: 420, desc: "ZB, N.A. filter" },
        { name: "Derivative Mapper", id: 6, x: 600, desc: "Cascade analysis" },
      ]
    },
    {
      label: "COMPLIANCE & REFORM", y: 340, color: "#4a7a6f",
      tools: [
        { name: "Cap Qualifier", id: 3, x: 150, desc: "15%/30% documentation" },
        { name: "Wage Stmt Check", id: 8, x: 420, desc: "9-element § 226(a)" },
      ]
    },
  ];

  /* Data flow arrows between tools */
  var flows = [
    { from: { phase: 0, tool: 0 }, to: { phase: 1, tool: 0 }, label: "Lookback period" },
    { from: { phase: 0, tool: 1 }, to: { phase: 1, tool: 0 }, label: "Strategy inputs" },
    { from: { phase: 1, tool: 0 }, to: { phase: 1, tool: 2 }, label: "Categories" },
    { from: { phase: 1, tool: 1 }, to: { phase: 1, tool: 0 }, label: "Rate data" },
    { from: { phase: 1, tool: 2 }, to: { phase: 1, tool: 3 }, label: "Recoverable" },
    { from: { phase: 1, tool: 0 }, to: { phase: 2, tool: 0 }, label: "Exposure model" },
    { from: { phase: 1, tool: 3 }, to: { phase: 2, tool: 1 }, label: "Derivative gaps" },
  ];

  var toolW = 130, toolH = 54;
  var outputY = 440;

  return (
    <div className="viz-workflow">
      <div className="viz-header">
        <div className="viz-label">Defense Engagement Workflow</div>
        <div className="viz-subtitle">How the 8 tools connect across three phases of a PAGA defense matter — from notice receipt to mediation-ready position</div>
      </div>
      <svg viewBox={"0 0 " + svgW + " " + svgH} fill="none" className="viz-svg" role="img" aria-label="Workflow diagram showing how 8 PAGA defense tools interconnect across engagement phases">
        <defs>
          <marker id="wf-arrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0L10 3.5L0 7z" fill="#8aa39e" />
          </marker>
        </defs>

        {/* Phase backgrounds and labels */}
        {phases.map(function (phase, pi) {
          var nextY = pi < phases.length - 1 ? phases[pi + 1].y : outputY;
          var h = nextY - phase.y - 20;
          return (
            <g key={"phase-" + pi}>
              <rect x="0" y={phase.y} width={svgW} height={h} rx="6"
                fill={pi % 2 === 0 ? "rgba(44,62,58,0.02)" : "rgba(44,62,58,0.04)"} />
              <text x="14" y={phase.y + 16} fontSize="8" fontWeight="700" letterSpacing="3"
                fill={phase.color} fontFamily="Outfit,sans-serif" fillOpacity="0.5">{phase.label}</text>
              {/* Phase number */}
              <text x={svgW - 14} y={phase.y + 16} textAnchor="end" fontSize="24" fontWeight="700"
                fill={phase.color} fontFamily="Outfit,sans-serif" fillOpacity="0.08">{pi + 1}</text>
            </g>
          );
        })}

        {/* Data flow arrows */}
        {flows.map(function (flow, fi) {
          var fromPhase = phases[flow.from.phase];
          var fromTool = fromPhase.tools[flow.from.tool];
          var toPhase = phases[flow.to.phase];
          var toTool = toPhase.tools[flow.to.tool];

          var x1 = fromTool.x + toolW / 2;
          var y1 = fromPhase.y + 32 + toolH;
          var x2 = toTool.x + toolW / 2;
          var y2 = toPhase.y + 32;

          /* Same-phase horizontal flow */
          if (flow.from.phase === flow.to.phase) {
            var x1r = fromTool.x + toolW;
            var y1h = fromPhase.y + 32 + toolH / 2;
            var x2l = toTool.x;
            return (
              <g key={"flow-" + fi}>
                <path d={"M" + x1r + " " + y1h + " L" + x2l + " " + y1h}
                  stroke="#8aa39e" strokeWidth="1" strokeOpacity="0.25" markerEnd="url(#wf-arrow)" />
                <text x={(x1r + x2l) / 2} y={y1h - 5} textAnchor="middle" fontSize="6"
                  fill="rgba(138,163,158,0.4)" fontFamily="Outfit,sans-serif">{flow.label}</text>
              </g>
            );
          }

          /* Cross-phase vertical flow */
          var midY = (y1 + y2) / 2;
          return (
            <g key={"flow-" + fi}>
              <path d={"M" + x1 + " " + y1 + " C" + x1 + " " + midY + " " + x2 + " " + midY + " " + x2 + " " + y2}
                stroke="#8aa39e" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3" markerEnd="url(#wf-arrow)" fill="none" />
              <rect x={(x1 + x2) / 2 - 30} y={midY - 6} width="60" height="12" rx="6" fill="rgba(138,163,158,0.06)" />
              <text x={(x1 + x2) / 2} y={midY + 2} textAnchor="middle" fontSize="6"
                fill="rgba(138,163,158,0.4)" fontFamily="Outfit,sans-serif">{flow.label}</text>
            </g>
          );
        })}

        {/* Tool nodes */}
        {phases.map(function (phase, pi) {
          return phase.tools.map(function (tool, ti) {
            var x = tool.x;
            var y = phase.y + 32;
            return (
              <g key={"tool-" + pi + "-" + ti}>
                <rect x={x} y={y} width={toolW} height={toolH} rx="5"
                  fill="white" stroke={phase.color} strokeWidth="1.5" strokeOpacity="0.3" />
                {/* Tool number */}
                <text x={x + 10} y={y + 16} fontSize="16" fontWeight="700" fill={phase.color}
                  fontFamily="Outfit,sans-serif" fillOpacity="0.12">{String(tool.id).padStart(2, "0")}</text>
                {/* Tool name */}
                <text x={x + toolW / 2} y={y + 22} textAnchor="middle" fontSize="9" fontWeight="700"
                  fill="#1a1a1a" fontFamily="Outfit,sans-serif">{tool.name}</text>
                {/* Description */}
                <text x={x + toolW / 2} y={y + 38} textAnchor="middle" fontSize="7"
                  fill="#999" fontFamily="Outfit,sans-serif">{tool.desc}</text>
                {/* Phase color indicator bar */}
                <rect x={x} y={y + toolH - 3} width={toolW} height="3" rx="0 0 5 5" fill={phase.color} fillOpacity="0.2" />
              </g>
            );
          });
        })}

        {/* Output convergence */}
        {phases[2].tools.map(function (tool, i) {
          return (
            <path key={"conv-" + i} d={"M" + (tool.x + toolW / 2) + " " + (phases[2].y + 32 + toolH) + " L" + (svgW / 2) + " " + outputY}
              stroke="#8aa39e" strokeWidth="1" strokeOpacity="0.15" fill="none" />
          );
        })}

        {/* Output node */}
        <rect x={svgW / 2 - 130} y={outputY} width="260" height="48" rx="24" fill="#2c3e3a" />
        <text x={svgW / 2} y={outputY + 20} textAnchor="middle" fontSize="10" fontWeight="600"
          fill="#fff" fontFamily="Outfit,sans-serif" letterSpacing="1">MEDIATION-READY POSITION</text>
        <text x={svgW / 2} y={outputY + 36} textAnchor="middle" fontSize="8"
          fill="rgba(255,255,255,0.4)" fontFamily="Outfit,sans-serif">Quantified · Documented · Reform-leveraged</text>

        {/* Timing annotations */}
        <g>
          <rect x={svgW - 80} y={phases[0].y + 20} width="70" height="16" rx="8" fill="rgba(204,136,0,0.08)" />
          <text x={svgW - 45} y={phases[0].y + 31} textAnchor="middle" fontSize="7" fontWeight="600" fill="#CC8800" fontFamily="Outfit,sans-serif">DAY 0-33</text>
          <rect x={svgW - 80} y={phases[1].y + 20} width="70" height="16" rx="8" fill="rgba(44,62,58,0.06)" />
          <text x={svgW - 45} y={phases[1].y + 31} textAnchor="middle" fontSize="7" fontWeight="600" fill="#2c3e3a" fontFamily="Outfit,sans-serif">DAY 1-60</text>
          <rect x={svgW - 80} y={phases[2].y + 20} width="70" height="16" rx="8" fill="rgba(74,122,111,0.08)" />
          <text x={svgW - 45} y={phases[2].y + 31} textAnchor="middle" fontSize="7" fontWeight="600" fill="#4a7a6f" fontFamily="Outfit,sans-serif">DAY 30-65</text>
        </g>
      </svg>
      <div className="viz-footnote">
        Tool sequencing reflects typical defense engagement timeline — actual usage varies by procedural posture
      </div>
    </div>
  );
}
