/*
 * ExposureChart — horizontal bar chart comparing exposure categories
 * by per-employee-per-pay-period statutory penalty magnitude.
 *
 * Pure SVG, no client-side hooks. Designed for server component pages.
 * Used on ALL industry pages. Derives chart data from the category names.
 *
 * Enhanced with cascade indicators, pre-reform vs post-reform comparison bars,
 * total exposure sum, and relative risk indicators.
 */

/* Map category names to exposure magnitude + metadata.
 * Values represent estimated combined per-employee/per-pay-period exposure
 * including direct penalties + derivative cascades.
 * preReform values represent exposure before 2024 reforms. */
var exposureLookup = {
  /* Hospitality */
  'Tip Pooling and Service Charge Distribution': { value: 200, preReform: 400, statute: '§ 351', note: '$200 PAGA default per emp/pp', color: '#4a7a6f', cascade: false },
  'Meal and Rest Period Compliance in 24/7 Operations': { value: 500, preReform: 1200, statute: '§§ 226.7, 512', note: 'Premium + PAGA + § 226 + § 203 derivative cascade', color: '#2c3e3a', cascade: true },
  'Split-Shift Premiums': { value: 225, preReform: 500, statute: 'WO5 § 4(C)', note: 'Premium + PAGA + wage statement derivative', color: '#8aa39e', cascade: true },
  'Pre-Shift and Post-Shift Off-the-Clock Work': { value: 500, preReform: 1100, statute: '§§ 510, 1194', note: 'Wage differential + PAGA + § 226 + § 210 cascade', color: '#dc3545', cascade: true },

  /* Automotive */
  'Commission Forfeiture at Separation': { value: 450, preReform: 900, statute: '§§ 200-204, Sciborski', note: 'Earned wages + § 203 waiting time + § 226', color: '#dc3545', cascade: true },
  'Commissioned-Employee Overtime Exemption': { value: 350, preReform: 750, statute: '§ 510, WO 4-2001', note: 'Misclassification + OT underpayment + derivative', color: '#2c3e3a', cascade: true },
  'Flat-Rate Technician Overtime': { value: 400, preReform: 850, statute: '§ 510, Alvarado', note: 'Rate miscalculation + OT + Ferra premium cascade', color: '#4a7a6f', cascade: true },
  'Regular Rate Inclusion for Complex Compensation': { value: 500, preReform: 1100, statute: 'Ferra/Alvarado', note: 'Systematic underpayment across all compensated employees', color: '#CC8800', cascade: true },

  /* Healthcare */
  'Joint Employer Liability Allocation': { value: 300, preReform: 600, statute: '§ 2810.3', note: 'Shared liability + manageability complexity', color: '#4a7a6f', cascade: false },
  'Multi-Worksite Manageability': { value: 200, preReform: 400, statute: 'Estrada/AB 2288', note: 'Scope limitation defense opportunity', color: '#8aa39e', cascade: false },
  'Travel Time Between Client Locations': { value: 350, preReform: 750, statute: '§§ 510, 1194', note: 'Compensable travel + OT cascade', color: '#2c3e3a', cascade: true },

  /* Solar */
  'Alternative Workweek Schedule Invalidity': { value: 400, preReform: 900, statute: '§ 510(a), § 511', note: 'Entire OT exemption collapses if procedurally defective', color: '#dc3545', cascade: true },
  'Piece-Rate Non-Productive Time': { value: 350, preReform: 700, statute: '§ 226.2', note: 'Separate hourly compensation for NPT + rest periods', color: '#2c3e3a', cascade: true },

  /* Technology */
  'Computer Professional Exemption Misclassification': { value: 400, preReform: 850, statute: '§ 515.5', note: 'Salary threshold + duties test; full OT cascade if exempt fails', color: '#2c3e3a', cascade: true },
  'Remote Work Expense Reimbursement': { value: 250, preReform: 450, statute: '§ 2802', note: 'Internet, phone, home office + PAGA $100/$200', color: '#4a7a6f', cascade: false },

  /* Agriculture */
  'Heat Illness Prevention Compliance': { value: 200, preReform: 400, statute: '8 CCR § 3395', note: 'Cal/OSHA + PAGA § 2699.5 overlay', color: '#dc3545', cascade: false },
};

export default function ExposureChart({ categories }) {
  if (!categories || categories.length === 0) return null;

  /* Build chart data from actual category names */
  var colors = ['#2c3e3a', '#4a7a6f', '#8aa39e', '#dc3545', '#CC8800', '#555'];
  var exposureData = categories.map(function (cat, i) {
    var lookup = exposureLookup[cat.name];
    return {
      name: cat.name.length > 36 ? cat.name.slice(0, 33) + '...' : cat.name,
      fullName: cat.name,
      statute: lookup ? lookup.statute : cat.statute || '',
      value: lookup ? lookup.value : 200,
      preReform: lookup ? lookup.preReform : 400,
      note: lookup ? lookup.note : 'PAGA default penalty',
      color: lookup ? lookup.color : colors[i % colors.length],
      cascade: lookup ? lookup.cascade : false,
    };
  });

  var maxVal = Math.max.apply(null, exposureData.map(function (d) { return d.preReform; }));
  var totalExposure = exposureData.reduce(function (s, d) { return s + d.value; }, 0);
  var totalPreReform = exposureData.reduce(function (s, d) { return s + d.preReform; }, 0);

  var W = 600, barH = 38, gapY = 28, padL = 220, padR = 70, padT = 8;
  var chartH = exposureData.length * (barH + gapY) - gapY + padT + 70;
  var barW = W - padL - padR;

  /* Risk thresholds */
  function riskColor(val) {
    if (val >= 450) return '#dc3545';
    if (val >= 300) return '#CC8800';
    return '#4a7a6f';
  }

  function riskLabel(val) {
    if (val >= 450) return 'HIGH';
    if (val >= 300) return 'ELEVATED';
    return 'MODERATE';
  }

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
          var w = Math.max(4, (d.value / maxVal) * barW);
          var preW = Math.max(4, (d.preReform / maxVal) * barW);
          var rc = riskColor(d.value);

          return (
            <g key={i}>
              {/* Category name */}
              <text x={padL - 12} y={y + 14} textAnchor="end"
                fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={600} fill="#333">
                {d.name}
              </text>

              {/* Statute reference */}
              <text x={padL - 12} y={y + 28} textAnchor="end"
                fontFamily="'Outfit',sans-serif" fontSize={9} fill="#999">
                {d.statute}
              </text>

              {/* Pre-reform bar (dashed outline, behind) */}
              <rect x={padL} y={y + 2} width={preW} height={22} rx={2}
                fill="none" stroke={d.color} strokeWidth={1} strokeDasharray="4 2" opacity={0.3} />

              {/* Post-reform bar (solid, foreground) */}
              <rect x={padL} y={y + 2} width={w} height={22} rx={2} fill={d.color} opacity={0.85} />

              {/* Value label */}
              <text x={padL + w + 8} y={y + 18}
                fontFamily="'Outfit',sans-serif" fontSize={11} fontWeight={700} fill={d.color}>
                ${d.value}
              </text>

              {/* Pre-reform value (ghost) */}
              <text x={padL + preW + 8} y={y + 8}
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#ccc">
                pre: ${d.preReform}
              </text>

              {/* Cascade badge */}
              {d.cascade && (
                <g>
                  <rect x={padL + w + 50} y={y + 7} width={46} height={12} rx={6}
                    fill="#dc3545" opacity={0.08} stroke="#dc3545" strokeWidth={0.5} />
                  <text x={padL + w + 73} y={y + 16} textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={6} fontWeight={700}
                    fill="#dc3545" letterSpacing={0.5}>
                    CASCADE
                  </text>
                </g>
              )}

              {/* Relative risk indicator */}
              <circle cx={padL - 20} cy={y + 12} r={4}
                fill={rc} opacity={0.25} stroke={rc} strokeWidth={0.75} />

              {/* Note */}
              <text x={padL} y={y + 36}
                fontFamily="'Outfit',sans-serif" fontSize={8} fill="#aaa">
                {d.note}
              </text>
            </g>
          );
        })}

        {/* Total exposure summary */}
        <g>
          <line x1={padL} y1={chartH - 52} x2={W - padR} y2={chartH - 52}
            stroke="#e0e0e0" strokeWidth={0.75} />

          {/* Post-reform total */}
          <text x={padL} y={chartH - 36}
            fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#2c3e3a">
            Total Post-Reform Exposure:
          </text>
          <text x={padL + 160} y={chartH - 36}
            fontFamily="'Outfit',sans-serif" fontSize={11} fontWeight={700} fill="#2c3e3a">
            ${totalExposure.toLocaleString()}/emp/pp
          </text>

          {/* Pre-reform total */}
          <text x={padL + 310} y={chartH - 36}
            fontFamily="'Outfit',sans-serif" fontSize={8} fill="#bbb">
            Pre-reform: ${totalPreReform.toLocaleString()}/emp/pp
          </text>

          {/* Legend for bar styles */}
          <rect x={padL} y={chartH - 24} width={20} height={6} rx={1} fill="#4a7a6f" opacity={0.85} />
          <text x={padL + 26} y={chartH - 19}
            fontFamily="'Outfit',sans-serif" fontSize={7} fill="#bbb">
            Post-reform
          </text>
          <rect x={padL + 80} y={chartH - 24} width={20} height={6} rx={1}
            fill="none" stroke="#4a7a6f" strokeWidth={1} strokeDasharray="3 2" opacity={0.4} />
          <text x={padL + 106} y={chartH - 19}
            fontFamily="'Outfit',sans-serif" fontSize={7} fill="#bbb">
            Pre-reform
          </text>
          <circle cx={padL + 165} cy={chartH - 21} r={4} fill="#dc3545" opacity={0.25} stroke="#dc3545" strokeWidth={0.5} />
          <text x={padL + 174} y={chartH - 19}
            fontFamily="'Outfit',sans-serif" fontSize={7} fill="#bbb">
            Risk level (●)
          </text>
        </g>

        <text x={padL} y={chartH - 4}
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#bbb" fontStyle="italic">
          Estimated combined exposure per employee per pay period (statutory penalties + derivative cascade)
        </text>
      </svg>
    </div>
  );
}
