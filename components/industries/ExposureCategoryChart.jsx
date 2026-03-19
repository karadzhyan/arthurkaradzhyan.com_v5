"use client";

export default function ExposureCategoryChart({ categories }) {
  if (!categories || categories.length === 0) return null;

  var maxLen = 0;
  categories.forEach(function (c) {
    var len = c.analysis.length + (c.defenseStrategy ? c.defenseStrategy.length : 0);
    if (len > maxLen) maxLen = len;
  });

  return (
    <div className="exp-cat-chart">
      <div className="exp-cat-bars">
        {categories.map(function (cat, i) {
          var complexity = Math.round(((cat.analysis.length + (cat.defenseStrategy ? cat.defenseStrategy.length : 0)) / maxLen) * 100);
          var colors = ["#dc3545", "#CC8800", "#b85c00", "#4a7a6f", "#2c3e3a", "#8aa39e"];
          var color = colors[i % colors.length];
          return (
            <div key={i} className="exp-cat-bar-row">
              <div className="exp-cat-bar-label">
                <div className="exp-cat-bar-name">{cat.name}</div>
                <div className="exp-cat-bar-statute">{cat.statute}</div>
              </div>
              <div className="exp-cat-bar-track">
                <div className="exp-cat-bar-fill" style={{ width: complexity + "%", background: color }} />
              </div>
              <div className="exp-cat-bar-pct" style={{ color: color }}>{complexity}%</div>
            </div>
          );
        })}
      </div>
      <div className="exp-cat-note">
        Bars represent relative analytical complexity (analysis depth + defense strategy length) per category.
      </div>
    </div>
  );
}
