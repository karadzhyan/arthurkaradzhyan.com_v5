/*
 * ExposureChart — horizontal bar chart comparing exposure categories
 * by per-employee-per-pay-period statutory penalty magnitude.
 *
 * Pure SVG, no client-side hooks. Designed for server component pages.
 * Used on ALL industry pages. Derives chart data from the category names.
 */

/* Map category names to exposure magnitude + metadata.
 * Values represent estimated combined per-employee/per-pay-period exposure
 * including direct penalties + derivative cascades. */
var exposureLookup = {
  /* Hospitality */
  'Tip Pooling and Service Charge Distribution': { value: 200, statute: '§ 351', note: '$200 PAGA default per emp/pp', color: '#4a7a6f' },
  'Meal and Rest Period Compliance in 24/7 Operations': { value: 500, statute: '§§ 226.7, 512', note: 'Premium + PAGA + § 226 + § 203 derivative cascade', color: '#2c3e3a' },
  'Split-Shift Premiums': { value: 225, statute: 'WO5 § 4(C)', note: 'Premium + PAGA + wage statement derivative', color: '#8aa39e' },
  'Pre-Shift and Post-Shift Off-the-Clock Work': { value: 500, statute: '§§ 510, 1194', note: 'Wage differential + PAGA + § 226 + § 210 cascade', color: '#dc3545' },

  /* Automotive */
  'Commission Forfeiture at Separation': { value: 450, statute: '§§ 200-204, Sciborski', note: 'Earned wages + § 203 waiting time + § 226', color: '#dc3545' },
  'Commissioned-Employee Overtime Exemption': { value: 350, statute: '§ 510, WO 4-2001', note: 'Misclassification + OT underpayment + derivative', color: '#2c3e3a' },
  'Flat-Rate Technician Overtime': { value: 400, statute: '§ 510, Alvarado', note: 'Rate miscalculation + OT + Ferra premium cascade', color: '#4a7a6f' },
  'Regular Rate Inclusion for Complex Compensation': { value: 500, statute: 'Ferra/Alvarado', note: 'Systematic underpayment across all compensated employees', color: '#CC8800' },

  /* Healthcare */
  'Joint Employer Liability Allocation': { value: 300, statute: '§ 2810.3', note: 'Shared liability + manageability complexity', color: '#4a7a6f' },
  'Multi-Worksite Manageability': { value: 200, statute: 'Estrada/AB 2288', note: 'Scope limitation defense opportunity', color: '#8aa39e' },
  'Travel Time Between Client Locations': { value: 350, statute: '§§ 510, 1194', note: 'Compensable travel + OT cascade', color: '#2c3e3a' },

  /* Solar */
  'Alternative Workweek Schedule Invalidity': { value: 400, statute: '§ 510(a), § 511', note: 'Entire OT exemption collapses if procedurally defective', color: '#dc3545' },
  'Piece-Rate Non-Productive Time': { value: 350, statute: '§ 226.2', note: 'Separate hourly compensation for NPT + rest periods', color: '#2c3e3a' },

  /* Technology */
  'Computer Professional Exemption Misclassification': { value: 400, statute: '§ 515.5', note: 'Salary threshold + duties test; full OT cascade if exempt fails', color: '#2c3e3a' },
  'Remote Work Expense Reimbursement': { value: 250, statute: '§ 2802', note: 'Internet, phone, home office + PAGA $100/$200', color: '#4a7a6f' },

  /* Agriculture */
  'Heat Illness Prevention Compliance': { value: 200, statute: '8 CCR § 3395', note: 'Cal/OSHA + PAGA § 2699.5 overlay', color: '#dc3545' },
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
      note: lookup ? lookup.note : 'PAGA default penalty',
      color: lookup ? lookup.color : colors[i % colors.length],
    };
  });

  var maxVal = Math.max.apply(null, exposureData.map(function (d) { return d.value; }));

  var W = 600, barH = 38, gapY = 24, padL = 220, padR = 60, padT = 8;
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
          var w = Math.max(4, (d.value / maxVal) * barW);

          return (
            <g key={i}>
              <text x={padL - 12} y={y + 14} textAnchor="end"
                fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={600} fill="#333">
                {d.name}
              </text>
              <text x={padL - 12} y={y + 28} textAnchor="end"
                fontFamily="'Outfit',sans-serif" fontSize={9} fill="#999">
                {d.statute}
              </text>
              <rect x={padL} y={y + 2} width={w} height={22} rx={2} fill={d.color} opacity={0.85} />
              <text x={padL + w + 8} y={y + 18}
                fontFamily="'Outfit',sans-serif" fontSize={11} fontWeight={700} fill={d.color}>
                ${d.value}
              </text>
              <text x={padL} y={y + 36}
                fontFamily="'Outfit',sans-serif" fontSize={8} fill="#aaa">
                {d.note}
              </text>
            </g>
          );
        })}

        <text x={padL} y={chartH - 4}
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#bbb" fontStyle="italic">
          Estimated combined exposure per employee per pay period (statutory penalties + derivative cascade)
        </text>
      </svg>
    </div>
  );
}
