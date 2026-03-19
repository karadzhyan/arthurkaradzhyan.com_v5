"use client";
/* ToolMatrix — Comparison matrix showing all 8 tools across multiple
   dimensions: engagement phase, input type, output type, key statute,
   reform impact, and cross-references. Unique to /tools. */

export default function ToolMatrix() {
  var tools = [
    { num: "01", name: "Penalty Estimator", phase: "Analysis", input: "Employee count, pay periods, violation rates", output: "3-scenario $ exposure", statute: "§ 2699(f)", reform: "high", insights: 3, cases: 2 },
    { num: "02", name: "Regular Rate Calc", phase: "Analysis", input: "Hourly, commissions, bonuses, hours", output: "Correct rate + underpayment Δ", statute: "§ 510", reform: "low", insights: 2, cases: 2 },
    { num: "03", name: "Cap Qualifier", phase: "Compliance", input: "Compliance documentation checklist", output: "15% or 30% cap qualification", statute: "§ 2699(g)(h)", reform: "critical", insights: 1, cases: 0 },
    { num: "04", name: "SOL Calculator", phase: "Intake", input: "Notice date, complaint date, violation dates", output: "Lookback window per category", statute: "§ 338(a), CCP", reform: "low", insights: 0, cases: 0 },
    { num: "05", name: "Recoverability", phase: "Analysis", input: "Alleged violation categories", output: "Recoverable vs. stripped", statute: "ZB, N.A.", reform: "med", insights: 1, cases: 2 },
    { num: "06", name: "Derivative Mapper", phase: "Analysis", input: "Primary violation type", output: "Cascade diagram + $ total", statute: "§ 2699(i)", reform: "high", insights: 1, cases: 1 },
    { num: "07", name: "Decision Tree", phase: "Intake", input: "Procedural posture questions", output: "Strategy + statutory citations", statute: "AB 2288", reform: "critical", insights: 1, cases: 0 },
    { num: "08", name: "Wage Stmt Check", phase: "Compliance", input: "9-element compliance status", output: "Deficiency map + Naranjo exposure", statute: "§ 226(a)(e)", reform: "med", insights: 1, cases: 1 },
  ];

  var reformColors = { low: "rgba(44,62,58,0.15)", med: "rgba(44,62,58,0.3)", high: "rgba(204,136,0,0.35)", critical: "rgba(204,136,0,0.6)" };
  var reformLabels = { low: "LOW", med: "MED", high: "HIGH", critical: "CRIT" };
  var phaseColors = { Intake: "#CC8800", Analysis: "#2c3e3a", Compliance: "#4a7a6f" };

  var svgW = 760;
  var rowH = 44;
  var headerH = 36;
  var svgH = headerH + tools.length * rowH + 30;

  return (
    <div className="viz-tool-matrix">
      <div className="viz-header">
        <div className="viz-label">Tool Comparison Matrix</div>
        <div className="viz-subtitle">All 8 tools compared across engagement phase, key statute, reform sensitivity, and cross-reference density</div>
      </div>
      <svg viewBox={"0 0 " + svgW + " " + svgH} fill="none" className="viz-svg" role="img" aria-label="Comparison matrix showing 8 PAGA defense tools across multiple dimensions">
        {/* Headers */}
        <rect x="0" y="0" width={svgW} height={headerH} rx="4" fill="rgba(44,62,58,0.04)" />
        <text x="12" y="22" fontSize="8" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">TOOL</text>
        <text x="160" y="22" fontSize="8" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">PHASE</text>
        <text x="230" y="22" fontSize="8" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">KEY INPUT</text>
        <text x="430" y="22" fontSize="8" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">OUTPUT</text>
        <text x="600" y="22" fontSize="8" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">STATUTE</text>
        <text x="670" y="14" fontSize="7" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">REFORM</text>
        <text x="670" y="26" fontSize="7" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">IMPACT</text>
        <text x="720" y="22" fontSize="8" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="1">REFS</text>

        {/* Rows */}
        {tools.map(function (tool, i) {
          var y = headerH + i * rowH;
          var pColor = phaseColors[tool.phase];
          var totalRefs = tool.insights + tool.cases;
          var refBarW = totalRefs * 6;

          return (
            <g key={i}>
              {i % 2 === 0 && <rect x="0" y={y} width={svgW} height={rowH} fill="rgba(44,62,58,0.015)" rx="2" />}

              {/* Tool number + name */}
              <text x="12" y={y + 18} fontSize="12" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif" fillOpacity="0.12">{tool.num}</text>
              <text x="34" y={y + 18} fontSize="9" fontWeight="700" fill="#1a1a1a" fontFamily="Outfit,sans-serif">{tool.name}</text>

              {/* Phase badge */}
              <rect x="160" y={y + 8} width={tool.phase.length * 6 + 12} height="18" rx="9" fill={pColor} fillOpacity="0.08" stroke={pColor} strokeWidth="0.75" strokeOpacity="0.2" />
              <text x="166" y={y + 20} fontSize="7" fontWeight="600" fill={pColor} fontFamily="Outfit,sans-serif">{tool.phase}</text>

              {/* Input */}
              <foreignObject x="230" y={y + 4} width="190" height={rowH - 8}>
                <div style={{ fontSize: "7.5px", color: "#888", fontFamily: "Outfit,sans-serif", lineHeight: "1.4" }}>{tool.input}</div>
              </foreignObject>

              {/* Output */}
              <foreignObject x="430" y={y + 4} width="160" height={rowH - 8}>
                <div style={{ fontSize: "7.5px", color: "#555", fontFamily: "Outfit,sans-serif", lineHeight: "1.4", fontWeight: 500 }}>{tool.output}</div>
              </foreignObject>

              {/* Statute */}
              <text x="600" y={y + 18} fontSize="8" fill="#999" fontFamily="Outfit,sans-serif" fontStyle="italic">{tool.statute}</text>

              {/* Reform impact badge */}
              <rect x="670" y={y + 8} width="28" height="18" rx="3" fill={reformColors[tool.reform]} />
              <text x="684" y={y + 20} textAnchor="middle" fontSize="6" fontWeight="700" letterSpacing="0.5"
                fill={tool.reform === "critical" || tool.reform === "high" ? "#fff" : "rgba(44,62,58,0.6)"} fontFamily="Outfit,sans-serif">{reformLabels[tool.reform]}</text>

              {/* Cross-reference dots */}
              <g transform={"translate(720," + (y + 10) + ")"}>
                {Array.from({ length: tool.insights }).map(function (_, di) {
                  return <circle key={"i" + di} cx={di * 8} cy="4" r="3" fill="#2c3e3a" fillOpacity="0.25" />;
                })}
                {Array.from({ length: tool.cases }).map(function (_, di) {
                  return <circle key={"c" + di} cx={(tool.insights + di) * 8} cy="4" r="3" fill="#CC8800" fillOpacity="0.3" />;
                })}
              </g>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={"translate(12," + (headerH + tools.length * rowH + 10) + ")"}>
          <text x="0" y="10" fontSize="7" fontWeight="600" fill="#999" fontFamily="Outfit,sans-serif" letterSpacing="1">PHASES:</text>
          {[{ l: "Intake", c: "#CC8800" }, { l: "Analysis", c: "#2c3e3a" }, { l: "Compliance", c: "#4a7a6f" }].map(function (p, i) {
            return (
              <g key={i}>
                <rect x={55 + i * 80} y="2" width="8" height="10" rx="5" fill={p.c} fillOpacity="0.3" />
                <text x={67 + i * 80} y="10" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">{p.l}</text>
              </g>
            );
          })}
          <text x="340" y="10" fontSize="7" fontWeight="600" fill="#999" fontFamily="Outfit,sans-serif" letterSpacing="1">REFS:</text>
          <circle cx="385" cy="6" r="3" fill="#2c3e3a" fillOpacity="0.25" />
          <text x="392" y="10" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">Insight</text>
          <circle cx="430" cy="6" r="3" fill="#CC8800" fillOpacity="0.3" />
          <text x="437" y="10" fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif">Case</text>
        </g>
      </svg>
    </div>
  );
}
