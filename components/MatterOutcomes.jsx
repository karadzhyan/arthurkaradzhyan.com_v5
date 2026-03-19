"use client";

export default function MatterOutcomes() {
  var outcomes = [
    { label: "Framework Adopted", count: 3, color: "#2c3e3a", desc: "Analytical framework adopted by client firm-wide", examples: ["Multi-Property Hotel Operator", "Medical Transportation Company"] },
    { label: "Exposure Reduced 50%+", count: 4, color: "#4a7a6f", desc: "Settlement or ruling reducing exposure by majority", examples: ["Healthcare Staffing Agency — 60%+ reduction", "Luxury Dealership — Sciborski identification"] },
    { label: "Favorable Ruling", count: 3, color: "#8aa39e", desc: "Motion granted, certification denied, or arbitration compelled", examples: ["Car Wash Arbitration — Hohenshelt application", "Multi-Dealership Class Certification"] },
    { label: "Novel Defense Identified", count: 3, color: "#CC8800", desc: "First-in-kind defense theory or approach developed", examples: ["Public Agency Immunity — Healthcare", "Commission Forfeiture — Sciborski theory"] },
    { label: "Active / Pre-Trial", count: 3, color: "#999", desc: "Currently in litigation or pending resolution", examples: [] }
  ];

  var total = outcomes.reduce(function (s, o) { return s + o.count; }, 0);

  var industryBreakdown = [
    { industry: "Hospitality", count: 3, pct: 19 },
    { industry: "Automotive", count: 3, pct: 19 },
    { industry: "Healthcare", count: 3, pct: 19 },
    { industry: "Technology", count: 2, pct: 12 },
    { industry: "Agriculture", count: 2, pct: 12 },
    { industry: "Other", count: 3, pct: 19 }
  ];

  var metrics = [
    { num: "60%+", label: "Average Exposure\nReduction" },
    { num: "16", label: "Matters Across\n6 Industries" },
    { num: "41", label: "Citations in Single\nApproval Motion" },
    { num: "121", label: "Pages — Largest\nDiscovery Response" },
    { num: "174", label: "Questions in Expert\nDeposition Framework" },
    { num: "20", label: "Page PAGA Settlement\nApproval Brief" }
  ];

  return (
    <div className="outcomes">
      <div className="outcomes-bar">
        {outcomes.map(function (o, i) {
          var pct = Math.round((o.count / total) * 100);
          return (
            <div
              key={i}
              className="outcomes-bar-segment"
              style={{ width: pct + "%", background: o.color }}
              title={o.label + ": " + o.count}
            />
          );
        })}
      </div>
      <div className="outcomes-legend">
        {outcomes.map(function (o, i) {
          return (
            <div key={i} className="outcomes-legend-item">
              <div className="outcomes-legend-swatch" style={{ background: o.color }} />
              <div className="outcomes-legend-body">
                <div className="outcomes-legend-label">
                  {o.label} <span className="outcomes-legend-count">({o.count})</span>
                </div>
                <div className="outcomes-legend-desc">{o.desc}</div>
                {o.examples.length > 0 && (
                  <div className="outcomes-legend-examples">
                    {o.examples.join(" · ")}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="outcomes-industry">
        <div className="outcomes-industry-title">Industry Distribution</div>
        <div className="outcomes-industry-bar">
          {industryBreakdown.map(function (ind, i) {
            var colors = ["#2c3e3a", "#4a7a6f", "#8aa39e", "#CC8800", "#b85c00", "#999"];
            return (
              <div key={i} className="outcomes-industry-seg" style={{
                width: ind.pct + "%",
                background: colors[i]
              }}>
                <span className="outcomes-industry-seg-label">{ind.industry}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="outcomes-metrics">
        {metrics.map(function (m, i) {
          return (
            <div key={i} className="outcomes-metric">
              <div className="outcomes-metric-num">{m.num}</div>
              <div className="outcomes-metric-label">{m.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
