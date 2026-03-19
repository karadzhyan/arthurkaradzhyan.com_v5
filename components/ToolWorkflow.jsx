"use client";

import Link from "next/link";

export default function ToolWorkflow() {
  var phases = [
    {
      phase: "1. Triage",
      label: "Assess the Notice",
      color: "#dc3545",
      tools: [
        { name: "PAGA Reform Decision Tree", slug: "paga-reform-decision-tree", desc: "Route the case through post-reform framework" },
        { name: "SOL Calculator", slug: "statute-of-limitations-calculator", desc: "Determine lookback periods and deadlines" }
      ]
    },
    {
      phase: "2. Quantify",
      label: "Model the Exposure",
      color: "#CC8800",
      tools: [
        { name: "PAGA Penalty Estimator", slug: "paga-penalty-estimator", desc: "Three-scenario exposure across all categories" },
        { name: "Regular Rate Calculator", slug: "regular-rate-calculator", desc: "Identify regular rate underpayment gap" },
        { name: "Derivative Penalty Mapper", slug: "derivative-penalty-mapper", desc: "Map cascade from each violation type" }
      ]
    },
    {
      phase: "3. Reduce",
      label: "Strip & Compress",
      color: "#4a7a6f",
      tools: [
        { name: "Recoverability Checker", slug: "recoverability-checker", desc: "Strip non-PAGA categories (ZB, N.A.)" },
        { name: "Penalty Cap Qualifier", slug: "penalty-cap-qualifier", desc: "Assess 15%/30% cap qualification" }
      ]
    },
    {
      phase: "4. Verify",
      label: "Check Compliance",
      color: "#2c3e3a",
      tools: [
        { name: "Wage Statement Checker", slug: "wage-statement-compliance-checker", desc: "Audit 9 elements of § 226(a)" }
      ]
    }
  ];

  return (
    <div className="workflow">
      <div className="workflow-phases">
        {phases.map(function (p, i) {
          return (
            <div key={i} className="workflow-phase">
              <div className="workflow-phase-header" style={{ borderLeftColor: p.color }}>
                <div className="workflow-phase-num" style={{ color: p.color }}>{p.phase}</div>
                <div className="workflow-phase-label">{p.label}</div>
              </div>
              <div className="workflow-phase-tools">
                {p.tools.map(function (tool, j) {
                  return (
                    <Link key={j} href={"/tools/" + tool.slug} className="workflow-tool">
                      <div className="workflow-tool-dot" style={{ background: p.color }} />
                      <div className="workflow-tool-body">
                        <div className="workflow-tool-name">{tool.name}</div>
                        <div className="workflow-tool-desc">{tool.desc}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {i < phases.length - 1 && (
                <div className="workflow-connector">
                  <div className="workflow-connector-line" style={{ background: p.color }} />
                  <div className="workflow-connector-arrow" style={{ borderTopColor: p.color }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="workflow-note">
        The output of each phase feeds the next. Triage determines which tools to run.
        Quantification produces the raw numbers. Reduction applies the legal framework.
        Verification identifies remaining compliance gaps.
      </div>
    </div>
  );
}
