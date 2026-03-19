"use client";

/*
  Bifurcation timeline diagram — deepened version.
  Shows Legacy/Remedied period split with:
  - Per-period penalty calculation bars
  - Violation rate trajectory line showing the improvement curve
  - Compliance milestone markers
  - Penalty savings calculation (blended vs. bifurcated)
*/

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n).toLocaleString();
  return "$" + Math.round(n);
}

export default function BifurcationTimeline({ legacyPct, legacyRate, remediedRate, periods, empCount }) {
  var legacyPeriods = Math.round(periods * (legacyPct / 100));
  var remediedPeriods = periods - legacyPeriods;
  var employees = empCount || 50;

  // Penalty calculations
  var blendedRate = ((legacyRate * legacyPeriods + remediedRate * remediedPeriods) / periods);
  var blendedPenalty = Math.round(employees * periods * 100 * (blendedRate / 100));
  var bifurcatedPenalty = Math.round(
    employees * legacyPeriods * 100 * (legacyRate / 100) +
    employees * remediedPeriods * 100 * (remediedRate / 100)
  );
  var savings = blendedPenalty - bifurcatedPenalty;
  var savingsPct = blendedPenalty > 0 ? Math.round((savings / blendedPenalty) * 100) : 0;

  // Generate per-period violation rate trajectory (smooth curve from legacy to remedied)
  var trajectoryPoints = [];
  for (var i = 0; i < periods; i++) {
    var rate;
    if (i < legacyPeriods) {
      rate = legacyRate;
    } else if (i === legacyPeriods) {
      rate = (legacyRate + remediedRate) / 2; // transition point
    } else {
      // Decay curve in remedied period
      var progress = (i - legacyPeriods) / Math.max(remediedPeriods - 1, 1);
      rate = remediedRate + (legacyRate - remediedRate) * 0.3 * Math.exp(-3 * progress);
    }
    trajectoryPoints.push({ period: i, rate: rate });
  }

  // SVG dimensions
  var w = 680;
  var h = 260;
  var barY = 60;
  var barH = 32;
  var padL = 40;
  var padR = 40;
  var barW = w - padL - padR;
  var splitX = padL + barW * (legacyPct / 100);

  // Trajectory line dimensions
  var trajY = barY + barH + 30;
  var trajH = 60;
  var maxRate = Math.max(legacyRate, remediedRate, 10);

  function rateToY(rate) {
    return trajY + trajH - (rate / maxRate) * trajH;
  }

  // Build trajectory path
  var trajPath = "";
  for (var j = 0; j < trajectoryPoints.length; j++) {
    var px = padL + (j / Math.max(periods - 1, 1)) * barW;
    var py = rateToY(trajectoryPoints[j].rate);
    trajPath += (j === 0 ? "M " : " L ") + px + " " + py;
  }

  return (
    <div style={{
      padding: "16px 0",
      marginBottom: 16,
    }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 12 }}>
        Temporal Bifurcation — The "Two Hotels" Framework
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          <defs>
            <linearGradient id="legacyGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#dc3545" />
              <stop offset="100%" stopColor="#e06070" />
            </linearGradient>
            <linearGradient id="remediedGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#198754" />
              <stop offset="100%" stopColor="#28a070" />
            </linearGradient>
          </defs>

          {/* Timeline axis */}
          <line x1={padL} y1={barY + barH + 12} x2={padL + barW} y2={barY + barH + 12} stroke="#e0e0e0" strokeWidth={1} />

          {/* Legacy period bar */}
          <rect x={padL} y={barY} width={barW * (legacyPct / 100)} height={barH} rx={3} fill="url(#legacyGrad)" />

          {/* Remedied period bar */}
          <rect x={splitX} y={barY} width={barW * ((100 - legacyPct) / 100)} height={barH} rx={3} fill="url(#remediedGrad)" />

          {/* Split line */}
          <line x1={splitX} y1={barY - 20} x2={splitX} y2={barY + barH + 20} stroke="#333" strokeWidth={2} strokeDasharray="4 2" />

          {/* Compliance transformation label */}
          <text x={splitX} y={barY - 26} textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 600, fill: "#333", letterSpacing: 2 }}>
            COMPLIANCE TRANSFORMATION
          </text>

          {/* Legacy label */}
          <text x={padL + (barW * legacyPct / 100) / 2} y={barY + barH / 2 - 4} textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: "#fff", letterSpacing: 1 }}>
            LEGACY PERIOD
          </text>
          <text x={padL + (barW * legacyPct / 100) / 2} y={barY + barH / 2 + 10} textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700, fill: "#fff" }}>
            {legacyRate}% violation rate
          </text>

          {/* Remedied label */}
          <text x={splitX + (barW * (100 - legacyPct) / 100) / 2} y={barY + barH / 2 - 4} textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: "#fff", letterSpacing: 1 }}>
            REMEDIED PERIOD
          </text>
          <text x={splitX + (barW * (100 - legacyPct) / 100) / 2} y={barY + barH / 2 + 10} textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700, fill: "#fff" }}>
            {remediedRate}% violation rate
          </text>

          {/* Period counts below bar */}
          <text x={padL + (barW * legacyPct / 100) / 2} y={barY + barH + 28} textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#dc3545" }}>
            {legacyPeriods} pay periods
          </text>
          <text x={splitX + (barW * (100 - legacyPct) / 100) / 2} y={barY + barH + 28} textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#198754" }}>
            {remediedPeriods} pay periods
          </text>

          {/* Start/end markers */}
          <text x={padL} y={barY - 6} textAnchor="start"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#999" }}>
            PAGA Period Start
          </text>
          <text x={padL + barW} y={barY - 6} textAnchor="end"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#999" }}>
            Notice Date
          </text>

          {/* Violation rate trajectory line */}
          <text x={padL} y={trajY - 8}
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 600, fill: "#888", letterSpacing: 1 }}>
            VIOLATION RATE TRAJECTORY
          </text>

          {/* Trajectory background area */}
          <rect x={padL} y={trajY} width={barW * (legacyPct / 100)} height={trajH}
            fill="#dc354508" />
          <rect x={splitX} y={trajY} width={barW * ((100 - legacyPct) / 100)} height={trajH}
            fill="#19875408" />

          {/* Y-axis labels for trajectory */}
          <text x={padL - 4} y={trajY + 4} textAnchor="end"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#bbb" }}>
            {maxRate}%
          </text>
          <text x={padL - 4} y={trajY + trajH} textAnchor="end"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#bbb" }}>
            0%
          </text>

          {/* Blended rate reference line */}
          <line x1={padL} y1={rateToY(blendedRate)} x2={padL + barW} y2={rateToY(blendedRate)}
            stroke="#dc354540" strokeWidth={1} strokeDasharray="6 3" />
          <text x={padL + barW + 4} y={rateToY(blendedRate) + 3}
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#dc3545" }}>
            {blendedRate.toFixed(1)}% blended
          </text>

          {/* The trajectory line itself */}
          <path d={trajPath} fill="none" stroke="#2c3e3a" strokeWidth={2} />

          {/* Split line through trajectory */}
          <line x1={splitX} y1={trajY} x2={splitX} y2={trajY + trajH}
            stroke="#333" strokeWidth={1} strokeDasharray="3 2" />
        </svg>
      </div>

      {/* Penalty comparison panel */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 12,
        marginTop: 12,
        padding: "12px 0",
        borderTop: "1px solid #eee",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#dc3545", letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>
            Blended Penalty
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#dc3545" }}>
            {fmt(blendedPenalty)}
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999" }}>
            {blendedRate.toFixed(1)}% × {periods} pp × {employees} emp
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#2c3e3a", letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>
            Bifurcated Penalty
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#2c3e3a" }}>
            {fmt(bifurcatedPenalty)}
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999" }}>
            Legacy + Remedied separately
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#198754", letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>
            Bifurcation Savings
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#198754" }}>
            {fmt(savings)}
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999" }}>
            {savingsPct}% reduction
          </div>
        </div>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#888", lineHeight: 1.6, marginTop: 4 }}>
        The defense disaggregates Legacy-period violations (pre-compliance) from Remedied-period violations (post-transformation). The blended rate of {blendedRate.toFixed(1)}% masks the improvement to {remediedRate}%. Bifurcation reveals the {savingsPct}% penalty reduction.
      </div>
    </div>
  );
}
