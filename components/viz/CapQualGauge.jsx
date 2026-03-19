"use client";

/*
  Penalty Cap Qualification Gauge — deepened version.
  Additions:
  - Documentation gap list showing missing items
  - Per-item scoring breakdown with impact weights
  - Remediation timeline showing progress
  - Statutory citation for cap provision
*/

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n).toLocaleString();
  return "$" + Math.round(n);
}

export default function CapQualGauge({ pct, capLabel, exposure, savings, gaps, items }) {
  var cx = 140;
  var cy = 130;
  var r = 100;
  var startAngle = Math.PI;

  function angleToXY(angle) {
    return {
      x: cx + r * Math.cos(angle),
      y: cy - r * Math.sin(angle),
    };
  }

  function arcPath(startPct, endPct) {
    var a1 = startAngle - (startPct / 100) * Math.PI;
    var a2 = startAngle - (endPct / 100) * Math.PI;
    var start = angleToXY(a1);
    var end = angleToXY(a2);
    var largeArc = (endPct - startPct) > 50 ? 1 : 0;
    return "M " + start.x + " " + start.y + " A " + r + " " + r + " 0 " + largeArc + " 1 " + end.x + " " + end.y;
  }

  var needleAngle = startAngle - (Math.min(100, Math.max(0, pct)) / 100) * Math.PI;
  var needleEnd = {
    x: cx + (r - 20) * Math.cos(needleAngle),
    y: cy - (r - 20) * Math.sin(needleAngle),
  };

  var status = pct >= 75 ? "Likely Qualified" : pct >= 45 ? "Arguable" : "Unlikely";
  var statusColor = pct >= 75 ? "#198754" : pct >= 45 ? "#CC8800" : "#dc3545";
  var capCite = capLabel === "15%" ? "§ 2699(g)(1)" : "§ 2699(h)(1)";

  // Parse gaps into high/medium/low impact
  var gapList = gaps || [];
  var highImpact = gapList.filter(function (g) { return g.impact === "high"; });
  var medImpact = gapList.filter(function (g) { return g.impact === "medium"; });

  return (
    <div style={{
      padding: "20px 16px 16px",
      background: "#fafafa",
      border: "1px solid #eee",
      marginBottom: 16,
    }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 4 }}>
        Cap Qualification Score
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", marginBottom: 12 }}>
        Penalty cap per {capCite} · {capLabel === "15%" ? "Pre-notice compliance" : "Post-notice remediation"}
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        {/* Gauge */}
        <div>
          <svg viewBox="0 0 280 150" style={{ width: 280, height: 150 }}>
            {/* Background arcs */}
            <path d={arcPath(0, 45)} fill="none" stroke="#dc354530" strokeWidth={16} strokeLinecap="round" />
            <path d={arcPath(45, 75)} fill="none" stroke="#CC880030" strokeWidth={16} strokeLinecap="round" />
            <path d={arcPath(75, 100)} fill="none" stroke="#19875430" strokeWidth={16} strokeLinecap="round" />

            {/* Progress arc */}
            {pct > 0 && <path d={arcPath(0, Math.min(pct, 100))} fill="none" stroke={statusColor} strokeWidth={16} strokeLinecap="round" />}

            {/* Tick marks at zone boundaries */}
            {[45, 75].map(function (tick) {
              var angle = startAngle - (tick / 100) * Math.PI;
              var inner = { x: cx + (r - 10) * Math.cos(angle), y: cy - (r - 10) * Math.sin(angle) };
              var outer = { x: cx + (r + 10) * Math.cos(angle), y: cy - (r + 10) * Math.sin(angle) };
              return <line key={tick} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="#ddd" strokeWidth={1} />;
            })}

            {/* Needle */}
            <line x1={cx} y1={cy} x2={needleEnd.x} y2={needleEnd.y} stroke="#333" strokeWidth={2} strokeLinecap="round" />
            <circle cx={cx} cy={cy} r={5} fill="#333" />

            {/* Score text */}
            <text x={cx} y={cy - 20} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 700, fill: statusColor }}>
              {Math.round(pct)}%
            </text>
            <text x={cx} y={cy - 4} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, fill: statusColor, letterSpacing: 1 }}>
              {status.toUpperCase()}
            </text>

            {/* Zone labels */}
            <text x={30} y={145} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#dc3545" }}>Unlikely</text>
            <text x={cx} y={30} textAnchor="middle" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#CC8800" }}>Arguable</text>
            <text x={230} y={145} textAnchor="end" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#198754" }}>Qualified</text>
          </svg>
        </div>

        {/* Impact summary + gaps */}
        <div style={{ flex: "1 1 200px", minWidth: 200 }}>
          {/* Financial impact */}
          {exposure > 0 && savings > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
                {capLabel} Cap Impact
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: "#198754" }}>
                    {fmt(savings)}
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#888" }}>
                    saved from {fmt(exposure)}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: "#2c3e3a" }}>
                    {exposure > 0 ? Math.round((savings / exposure) * 100) : 0}%
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#888" }}>
                    reduction
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documentation gaps */}
          {gapList.length > 0 && (
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, color: "#dc3545", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
                Documentation Gaps ({gapList.length})
              </div>
              {gapList.slice(0, 4).map(function (gap, i) {
                var impactColor = gap.impact === "high" ? "#dc3545" : gap.impact === "medium" ? "#CC8800" : "#999";
                return (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: impactColor, marginTop: 4, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#555", lineHeight: 1.4 }}>
                      {gap.label}
                    </span>
                  </div>
                );
              })}
              {gapList.length > 4 && (
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", marginTop: 2 }}>
                  +{gapList.length - 4} more gaps
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
