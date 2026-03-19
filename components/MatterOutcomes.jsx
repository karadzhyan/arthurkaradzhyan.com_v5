"use client";

export default function MatterOutcomes() {
  var outcomes = [
    { label: "Framework Adopted", count: 3, color: "#2c3e3a", desc: "Analytical framework adopted by client firm-wide" },
    { label: "Exposure Reduced 50%+", count: 4, color: "#4a7a6f", desc: "Settlement or ruling reducing exposure by majority" },
    { label: "Favorable Ruling", count: 3, color: "#8aa39e", desc: "Motion granted, certification denied, or arbitration compelled" },
    { label: "Novel Defense Identified", count: 3, color: "#CC8800", desc: "First-in-kind or creative defense theory developed" },
    { label: "Active / Pre-Trial", count: 3, color: "#999", desc: "Currently in litigation or pending resolution" }
  ];

  var total = outcomes.reduce(function (s, o) { return s + o.count; }, 0);

  var metrics = [
    { num: "60%+", label: "Average Exposure\nReduction" },
    { num: "16", label: "Matters\nAcross 6 Industries" },
    { num: "41", label: "Citations in Single\nApproval Motion" },
    { num: "121", label: "Pages — Largest\nDiscovery Response" }
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
              </div>
            </div>
          );
        })}
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
