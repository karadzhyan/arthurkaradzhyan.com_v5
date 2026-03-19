"use client";
/* StatsEnhanced — Sparkline mini-charts, trend arrows, comparison context,
   and year-over-year deltas behind each stat counter. Replaces the plain
   stats section with something a GC actually lingers on. */

export default function StatsEnhanced() {
  /* Each stat has: sparkline data, trend direction, YoY comparison, context note */
  var stats = [
    {
      sparkline: [4200, 5100, 5800, 6300, 7100, 8200, 10098],
      years: ["'19", "'20", "'21", "'22", "'23", "'24", "'25"],
      trend: "up",
      yoy: "+23%",
      yoyLabel: "vs. 2024",
      context: "Doubled since 2019 reforms",
    },
    {
      sparkline: [0, 0, 0, 0, 0, 85, 85],
      years: ["'19", "'20", "'21", "'22", "'23", "'24", "'25"],
      trend: "new",
      yoy: "NEW",
      yoyLabel: "AB 2288",
      context: "15% or 30% cap available",
    },
    {
      sparkline: null,
      trend: "critical",
      yoy: "SHORTEST",
      yoyLabel: "of 3 windows",
      context: "33 → 60 → 65 day deadlines",
    },
    {
      sparkline: [1, 1, 2, 2, 3, 3, 3],
      years: ["'19", "'20", "'21", "'22", "'23", "'24", "'25"],
      trend: "up",
      yoy: "+1",
      yoyLabel: "since 2023",
      context: "Leeper, Camp, Prime HC",
    },
  ];

  var sparkW = 70;
  var sparkH = 24;

  function sparkPath(data) {
    if (!data) return "";
    var max = Math.max.apply(null, data);
    var min = Math.min.apply(null, data);
    var range = max - min || 1;
    return data.map(function (v, i) {
      var x = (i / (data.length - 1)) * sparkW;
      var y = sparkH - ((v - min) / range) * sparkH;
      return (i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1);
    }).join(" ");
  }

  function sparkAreaPath(data) {
    if (!data) return "";
    var line = sparkPath(data);
    return line + " L" + sparkW + " " + sparkH + " L0 " + sparkH + " Z";
  }

  return (
    <div className="stats-enhanced">
      {stats.map(function (s, i) {
        return (
          <div key={i} className="stats-enhanced-item">
            {/* Sparkline */}
            {s.sparkline && (
              <svg width={sparkW} height={sparkH} viewBox={"0 0 " + sparkW + " " + sparkH} className="stats-sparkline">
                <path d={sparkAreaPath(s.sparkline)} fill="rgba(138,163,158,0.1)" />
                <path d={sparkPath(s.sparkline)} fill="none" stroke="#8aa39e" strokeWidth="1.5" strokeOpacity="0.5" />
                <circle cx={sparkW} cy={sparkH - ((s.sparkline[s.sparkline.length - 1] - Math.min.apply(null, s.sparkline)) / (Math.max.apply(null, s.sparkline) - Math.min.apply(null, s.sparkline) || 1)) * sparkH}
                  r="2.5" fill="#8aa39e" fillOpacity="0.7" />
              </svg>
            )}
            {/* Deadline bars for the 33-day stat */}
            {!s.sparkline && s.trend === "critical" && (
              <div className="stats-deadline-bars">
                <div className="stats-deadline-bar" style={{ width: "33%", background: "rgba(204,136,0,0.4)" }}>
                  <span>33d</span>
                </div>
                <div className="stats-deadline-bar" style={{ width: "60%", background: "rgba(138,163,158,0.25)" }}>
                  <span>60d</span>
                </div>
                <div className="stats-deadline-bar" style={{ width: "100%", background: "rgba(138,163,158,0.12)" }}>
                  <span>65d</span>
                </div>
              </div>
            )}
            {/* YoY badge */}
            <div className="stats-yoy">
              <span className={"stats-yoy-value " + (s.trend === "up" ? "up" : s.trend === "critical" ? "critical" : "neutral")}>{s.yoy}</span>
              <span className="stats-yoy-label">{s.yoyLabel}</span>
            </div>
            {/* Context */}
            <div className="stats-context">{s.context}</div>
          </div>
        );
      })}
    </div>
  );
}
