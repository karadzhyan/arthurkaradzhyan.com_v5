"use client";

export default function IndustryHeatmap() {
  var violations = [
    { key: "meal", label: "Meal Period" },
    { key: "rest", label: "Rest Period" },
    { key: "ot", label: "Overtime / Regular Rate" },
    { key: "wage", label: "Wage Statement" },
    { key: "reimb", label: "Reimbursement" },
    { key: "timing", label: "Final Pay Timing" },
    { key: "class", label: "Misclassification" }
  ];

  var rows = [
    {
      industry: "Hospitality",
      data: { meal: 5, rest: 5, ot: 3, wage: 4, reimb: 2, timing: 3, class: 4 },
      keyRisk: "24/7 ops + Donohue presumption"
    },
    {
      industry: "Automotive",
      data: { meal: 3, rest: 3, ot: 5, wage: 4, reimb: 2, timing: 5, class: 3 },
      keyRisk: "Commission forfeiture at departure"
    },
    {
      industry: "Healthcare",
      data: { meal: 5, rest: 4, ot: 4, wage: 3, reimb: 3, timing: 3, class: 5 },
      keyRisk: "Joint employer + multi-worksite"
    },
    {
      industry: "Solar / Energy",
      data: { meal: 4, rest: 4, ot: 5, wage: 4, reimb: 5, timing: 3, class: 3 },
      keyRisk: "Travel time + piece-rate gaps"
    },
    {
      industry: "Technology",
      data: { meal: 2, rest: 2, ot: 3, wage: 3, reimb: 5, timing: 2, class: 5 },
      keyRisk: "§ 2802 remote + exemption risk"
    },
    {
      industry: "Agriculture",
      data: { meal: 4, rest: 4, ot: 4, wage: 5, reimb: 3, timing: 5, class: 3 },
      keyRisk: "Piece-rate + seasonal final pay"
    }
  ];

  function intensityColor(val) {
    if (val === 5) return { bg: "#dc3545", color: "#fff" };
    if (val === 4) return { bg: "#CC8800", color: "#fff" };
    if (val === 3) return { bg: "rgba(204,136,0,.2)", color: "#8a6600" };
    if (val === 2) return { bg: "rgba(44,62,58,.08)", color: "#666" };
    return { bg: "transparent", color: "#ccc" };
  }

  function intensityLabel(val) {
    if (val === 5) return "Critical";
    if (val === 4) return "High";
    if (val === 3) return "Moderate";
    if (val === 2) return "Low";
    return "Minimal";
  }

  return (
    <div className="heatmap">
      <div className="heatmap-scroll">
        <table className="heatmap-table">
          <thead>
            <tr>
              <th className="heatmap-th heatmap-th-industry" />
              {violations.map(function (v) {
                return (
                  <th key={v.key} className="heatmap-th">{v.label}</th>
                );
              })}
              <th className="heatmap-th heatmap-th-risk">Key Structural Risk</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(function (row, i) {
              return (
                <tr key={i} className="heatmap-row">
                  <td className="heatmap-td heatmap-td-industry">{row.industry}</td>
                  {violations.map(function (v) {
                    var val = row.data[v.key];
                    var style = intensityColor(val);
                    return (
                      <td key={v.key} className="heatmap-td heatmap-td-cell" style={{
                        background: style.bg,
                        color: style.color
                      }}>
                        <div className="heatmap-cell-val">{val}</div>
                        <div className="heatmap-cell-label">{intensityLabel(val)}</div>
                      </td>
                    );
                  })}
                  <td className="heatmap-td heatmap-td-risk">{row.keyRisk}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="heatmap-legend">
        {[
          { val: 5, label: "Critical" },
          { val: 4, label: "High" },
          { val: 3, label: "Moderate" },
          { val: 2, label: "Low" }
        ].map(function (item) {
          var style = intensityColor(item.val);
          return (
            <div key={item.val} className="heatmap-legend-item">
              <span className="heatmap-legend-swatch" style={{ background: style.bg }} />
              <span className="heatmap-legend-label">{item.val} — {item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
