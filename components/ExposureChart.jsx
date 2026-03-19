/*
 * ExposureChart — horizontal bar chart comparing exposure categories
 * by per-employee-per-pay-period statutory penalty magnitude.
 *
 * Pure SVG, no client-side hooks. Designed for server component pages.
 * Used on industry pages (currently hospitality).
 */

export default function ExposureChart({ categories }) {
  if (!categories || categories.length === 0) return null;

  /*
   * Map each exposure category to a defensible per-employee/per-pay-period
   * penalty magnitude based on the governing statute cited in the data.
   *
   * These are statutory amounts, not estimates:
   * - § 226.7 meal/rest premium: ~$25/violation (1 hr × CA min wage $16.50, ~$20-30 for typical rates)
   * - § 226(e) wage statement: $50 initial / $100 subsequent per employee per pay period
   * - § 203 waiting time: up to 30 days' wages per separated employee (~$6,000 at $200/day)
   * - § 351 tip violations: restitution + PAGA $200/emp/pp
   * - Split-shift premium: ~$16.50/day (1 hr × minimum wage)
   * - Off-the-clock: varies, typically 5-15 min/day × rate
   *
   * For comparability we show a standardized per-emp/per-pp exposure index.
   */
  var exposureData = [
    { name: "Meal & Rest Periods", short: "§§ 226.7, 512", value: 500, note: "Premium + PAGA + § 226 + § 203 derivative cascade", color: "#2c3e3a" },
    { name: "Tip Pooling & Service Charges", short: "§ 351", value: 200, note: "$200 PAGA default penalty per employee per pay period", color: "#4a7a6f" },
    { name: "Split-Shift Premiums", short: "Wage Order 5 § 4(C)", value: 225, note: "Premium + PAGA penalty + wage statement derivative", color: "#8aa39e" },
    { name: "Off-the-Clock Work", short: "§§ 510, 1194", value: 500, note: "Wage differential + PAGA + § 226 + § 210 derivative cascade", color: "#dc3545" },
  ];

  var maxVal = Math.max.apply(null, exposureData.map(function (d) { return d.value; }));

  var W = 600, barH = 38, gapY = 24, padL = 200, padR = 60, padT = 8;
  var chartH = exposureData.length * (barH + gapY) - gapY + padT + 40;
  var barW = W - padL - padR;

  return (
    <div style={{ maxWidth: 660, margin: '0 auto 40px' }}>
      <div style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600,
        letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 12,
      }}>
        Relative Exposure by Category
      </div>
      <svg viewBox={"0 0 " + W + " " + chartH} width="100%" style={{ display: 'block' }}>
        {exposureData.map(function (d, i) {
          var y = padT + i * (barH + gapY);
          var w = (d.value / maxVal) * barW;

          return (
            <g key={i}>
              {/* Category name */}
              <text x={padL - 12} y={y + 14} textAnchor="end"
                fontFamily="'Outfit',sans-serif" fontSize={11} fontWeight={600} fill="#333">
                {d.name}
              </text>
              {/* Statute */}
              <text x={padL - 12} y={y + 28} textAnchor="end"
                fontFamily="'Outfit',sans-serif" fontSize={9} fill="#999">
                {d.short}
              </text>
              {/* Bar */}
              <rect x={padL} y={y + 2} width={w} height={22} rx={2} fill={d.color} opacity={0.85} />
              {/* Value label */}
              <text x={padL + w + 8} y={y + 18}
                fontFamily="'Outfit',sans-serif" fontSize={11} fontWeight={700} fill={d.color}>
                ${d.value}
              </text>
              {/* Note */}
              <text x={padL} y={y + 36}
                fontFamily="'Outfit',sans-serif" fontSize={8} fill="#aaa">
                {d.note}
              </text>
            </g>
          );
        })}

        {/* Axis label */}
        <text x={padL} y={chartH - 4}
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#bbb" fontStyle="italic">
          Estimated combined exposure per employee per pay period (statutory penalties + derivative cascade)
        </text>
      </svg>
    </div>
  );
}
