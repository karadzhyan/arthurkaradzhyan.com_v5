"use client";

/*
  Penalty Cap Qualification Gauge.
  Semicircular arc showing qualification score with three zones.
  Props: pct (0-100), capLabel ("15%"|"30%"), exposure (dollars), savings (dollars)
*/

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n).toLocaleString();
  return "$" + Math.round(n);
}

export default function CapQualGauge({ pct, capLabel, exposure, savings }) {
  var cx = 140;
  var cy = 130;
  var r = 100;
  var startAngle = Math.PI;
  var endAngle = 0;

  function angleToXY(angle) {
    return {
      x: cx + r * Math.cos(angle),
      y: cy - r * Math.sin(angle),
    };
  }

  // Three arc zones: red (0-45%), yellow (45-75%), green (75-100%)
  function arcPath(startPct, endPct) {
    var a1 = startAngle - (startPct / 100) * Math.PI;
    var a2 = startAngle - (endPct / 100) * Math.PI;
    var start = angleToXY(a1);
    var end = angleToXY(a2);
    var largeArc = (endPct - startPct) > 50 ? 1 : 0;
    return "M " + start.x + " " + start.y + " A " + r + " " + r + " 0 " + largeArc + " 1 " + end.x + " " + end.y;
  }

  // Needle position
  var needleAngle = startAngle - (Math.min(100, Math.max(0, pct)) / 100) * Math.PI;
  var needleEnd = {
    x: cx + (r - 20) * Math.cos(needleAngle),
    y: cy - (r - 20) * Math.sin(needleAngle),
  };

  var status = pct >= 75 ? "Likely Qualified" : pct >= 45 ? "Arguable" : "Unlikely";
  var statusColor = pct >= 75 ? "#198754" : pct >= 45 ? "#CC8800" : "#dc3545";

  return (
    <div style={{
      padding: "20px 16px 16px",
      background: "#fafafa",
      border: "1px solid #eee",
      marginBottom: 16,
    }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 12 }}>
        Cap Qualification Score
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <svg viewBox="0 0 280 150" style={{ width: 280, height: 150 }}>
          {/* Background arcs */}
          <path d={arcPath(0, 45)} fill="none" stroke="#dc354530" strokeWidth={16} strokeLinecap="round" />
          <path d={arcPath(45, 75)} fill="none" stroke="#CC880030" strokeWidth={16} strokeLinecap="round" />
          <path d={arcPath(75, 100)} fill="none" stroke="#19875430" strokeWidth={16} strokeLinecap="round" />

          {/* Progress arc */}
          {pct > 0 && <path d={arcPath(0, Math.min(pct, 100))} fill="none" stroke={statusColor} strokeWidth={16} strokeLinecap="round" />}

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

        {/* Impact summary */}
        {exposure > 0 && savings > 0 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
              {capLabel} Cap Impact
            </div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 700, color: "#198754", marginBottom: 4 }}>
              {fmt(savings)}
            </div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#888" }}>
              saved from {fmt(exposure)} exposure
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
