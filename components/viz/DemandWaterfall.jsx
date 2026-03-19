"use client";

/*
  Demand deflation waterfall chart for the Recoverability Checker.
  Shows plaintiff's inflated demand → subtract non-recoverable → actual PAGA-authorized.
  Props: items (violation categories with plaintiffRate and rate), empCount, ppCount
*/

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n).toLocaleString();
  return "$" + Math.round(n);
}

export default function DemandWaterfall({ items, empCount, ppCount }) {
  if (!items || items.length === 0) return null;

  var plaintiffTotal = items.reduce(function (s, item) {
    return s + empCount * ppCount * item.plaintiffRate;
  }, 0);

  var correctTotal = items.reduce(function (s, item) {
    return s + empCount * ppCount * item.rate;
  }, 0);

  if (plaintiffTotal <= 0) return null;

  var reduction = plaintiffTotal - correctTotal;
  var pctReduction = Math.round((reduction / plaintiffTotal) * 100);

  // Build waterfall segments
  var segments = [];
  segments.push({ label: "Plaintiff's\nDemand", value: plaintiffTotal, running: plaintiffTotal, type: "total", color: "#dc3545" });

  var running = plaintiffTotal;
  items.forEach(function (item) {
    var diff = empCount * ppCount * (item.plaintiffRate - item.rate);
    if (diff > 0) {
      running -= diff;
      segments.push({ label: item.name.replace(/ /g, "\n").substring(0, 20), value: -diff, running: running, type: "drop", color: "#CC8800" });
    }
  });

  segments.push({ label: "PAGA-\nAuthorized", value: correctTotal, running: correctTotal, type: "total", color: "#198754" });

  // SVG dimensions
  var w = 580;
  var h = 220;
  var padL = 12;
  var padR = 12;
  var padT = 30;
  var padB = 50;
  var chartW = w - padL - padR;
  var chartH = h - padT - padB;
  var barW = Math.min(60, chartW / segments.length - 12);
  var maxVal = plaintiffTotal;

  function yScale(val) {
    return padT + chartH - (val / maxVal) * chartH;
  }

  return (
    <div style={{
      padding: "20px 16px 16px",
      background: "#fafafa",
      border: "1px solid #eee",
      marginBottom: 16,
    }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 12 }}>
        Demand Deflation
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          {/* Baseline */}
          <line x1={padL} y1={padT + chartH} x2={w - padR} y2={padT + chartH} stroke="#e0e0e0" strokeWidth={1} />

          {segments.map(function (seg, i) {
            var x = padL + i * (chartW / segments.length) + (chartW / segments.length - barW) / 2;
            var barTop, barBottom, barHeight;

            if (seg.type === "total") {
              barTop = yScale(seg.value);
              barBottom = padT + chartH;
              barHeight = barBottom - barTop;
            } else {
              barTop = yScale(seg.running - seg.value);
              barBottom = yScale(seg.running);
              barHeight = barBottom - barTop;
            }

            var lines = seg.label.split("\n");

            return (
              <g key={i}>
                {/* Bar */}
                <rect x={x} y={Math.min(barTop, barBottom)} width={barW} height={Math.abs(barHeight)} rx={2}
                  fill={seg.color + "30"} stroke={seg.color} strokeWidth={1} />

                {/* Value label */}
                <text x={x + barW / 2} y={Math.min(barTop, barBottom) - 6} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: seg.color }}>
                  {seg.type === "drop" ? "−" + fmt(Math.abs(seg.value)) : fmt(seg.value)}
                </text>

                {/* Connector line to next bar */}
                {i < segments.length - 1 && seg.type !== "total" && (
                  <line x1={x + barW} y1={yScale(seg.running)} x2={x + (chartW / segments.length)} y2={yScale(seg.running)}
                    stroke="#ddd" strokeWidth={1} strokeDasharray="3 2" />
                )}

                {/* Category label */}
                {lines.map(function (line, j) {
                  return (
                    <text key={j} x={x + barW / 2} y={padT + chartH + 14 + j * 10} textAnchor="middle"
                      style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#888" }}>
                      {line}
                    </text>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 8, flexWrap: "wrap" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>Total Deflation</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#198754" }}>{fmt(reduction)}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>Demand Inflated By</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#dc3545" }}>{pctReduction}%</div>
        </div>
      </div>
    </div>
  );
}
