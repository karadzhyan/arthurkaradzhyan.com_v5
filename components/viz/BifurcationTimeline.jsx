"use client";

/*
  Bifurcation timeline diagram for the PAGA Penalty Estimator.
  Shows the Legacy/Remedied period split with violation rate trajectories.
  Reactive to the tool's state — receives legacyPct, legacyRate, remediedRate, periods as props.
*/

export default function BifurcationTimeline({ legacyPct, legacyRate, remediedRate, periods }) {
  var legacyPeriods = Math.round(periods * (legacyPct / 100));
  var remediedPeriods = periods - legacyPeriods;

  // SVG dimensions
  var w = 680;
  var h = 160;
  var barY = 75;
  var barH = 32;
  var padL = 40;
  var padR = 40;
  var barW = w - padL - padR;
  var splitX = padL + barW * (legacyPct / 100);

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
          {/* Timeline axis */}
          <line x1={padL} y1={barY + barH + 12} x2={padL + barW} y2={barY + barH + 12} stroke="#e0e0e0" strokeWidth={1} />

          {/* Legacy period bar */}
          <rect x={padL} y={barY} width={barW * (legacyPct / 100)} height={barH} rx={3}
            fill="url(#legacyGrad)" />
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

          {/* Remedied period bar */}
          <rect x={splitX} y={barY} width={barW * ((100 - legacyPct) / 100)} height={barH} rx={3}
            fill="url(#remediedGrad)" />

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

          {/* Period counts below */}
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
        </svg>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#888", lineHeight: 1.6, marginTop: 4 }}>
        The defense disaggregates Legacy-period violations (pre-compliance) from Remedied-period violations (post-transformation). The blended rate masks the improvement. Bifurcation reveals it.
      </div>
    </div>
  );
}
