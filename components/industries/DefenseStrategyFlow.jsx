"use client";

export default function DefenseStrategyFlow({ strategies, industryName }) {
  if (!strategies || strategies.length === 0) return null;

  var phaseColors = ["#dc3545", "#CC8800", "#4a7a6f", "#2c3e3a", "#8aa39e"];

  return (
    <div className="def-strategy-flow">
      <div className="def-strategy-label">Recommended Defense Sequence — {industryName}</div>
      <div className="def-strategy-steps">
        {strategies.map(function (strategy, i) {
          var color = phaseColors[i % phaseColors.length];
          var priority = i === 0 ? "Start Here" : i === strategies.length - 1 ? "Ongoing" : "Phase " + (i + 1);
          return (
            <div key={i} className="def-strategy-step">
              <div className="def-strategy-marker">
                <div className="def-strategy-num" style={{ background: color }}>{i + 1}</div>
                {i < strategies.length - 1 && <div className="def-strategy-connector" />}
              </div>
              <div className="def-strategy-body">
                <div className="def-strategy-priority" style={{ color: color }}>{priority}</div>
                <div className="def-strategy-text">{strategy}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
