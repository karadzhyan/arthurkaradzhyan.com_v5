/*
 * ToolsPenaltyMatrix — Visual matrix showing penalty types, statutes,
 * and per-employee-per-period amounts.
 * A quick-reference grid that demonstrates analytical depth.
 * Used on /tools index page. Server component.
 */

export default function ToolsPenaltyMatrix() {
  var penalties = [
    { category: 'Overtime', statute: '§ 510, § 1194', penalty: 'Wages owed', paga: '§ 558: $50/$100', recoverable: false, note: 'ZB: wages not penalties' },
    { category: 'Meal Period', statute: '§ 226.7, § 512', penalty: '1 hr premium', paga: '§ 2699(f): $100/$200', recoverable: false, note: 'Kirby: premium ≠ penalty' },
    { category: 'Rest Period', statute: '§ 226.7', penalty: '1 hr premium', paga: '§ 2699(f): $100/$200', recoverable: false, note: 'Kirby: premium ≠ penalty' },
    { category: 'Wage Statement', statute: '§ 226(e)', penalty: '$50/$100', paga: '$50/$100', recoverable: true, note: 'Cap: $4,000/emp' },
    { category: 'Waiting Time', statute: '§ 203', penalty: '≤ 30 days wages', paga: '§ 2699(f): $100/$200', recoverable: false, note: 'Separated employees only' },
    { category: 'Min. Wage', statute: '§ 1197.1', penalty: '$100/$250 + wages', paga: '$100/$250', recoverable: true, note: 'Specific penalty' },
    { category: 'Pay Stub Items', statute: '§ 226(a)(1)-(9)', penalty: '$50/$100', paga: '$50/$100', recoverable: true, note: '9 required elements' },
    { category: 'Timely Payment', statute: '§ 210', penalty: '$100/$200 + 25%', paga: '$100/$200', recoverable: true, note: 'Underpayment interest' },
  ];

  var W = 720, rowH = 28, headerH = 32, padT = 36;
  var H = padT + headerH + penalties.length * rowH + 30;
  var cols = [0, 110, 220, 320, 430, 540];
  var colW = [110, 110, 100, 110, 110, 180];

  return (
    <div style={{ maxWidth: 760, margin: '0 auto 40px', padding: '0 16px' }}>
      <div style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600,
        letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 12,
      }}>
        PAGA Penalty Quick Reference
      </div>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        {/* Header row */}
        <rect x={0} y={padT} width={W} height={headerH} rx={0} fill="#2c3e3a" />
        {['Category', 'Statute', 'Direct Penalty', 'PAGA Penalty', 'Recoverable?', 'Note'].map(function (h, i) {
          return (
            <text key={i} x={cols[i] + 8} y={padT + headerH / 2 + 4}
              fontFamily="'Outfit',sans-serif" fontSize={8.5} fontWeight={600}
              letterSpacing={1} fill="#8aa39e">
              {h.toUpperCase()}
            </text>
          );
        })}

        {/* Data rows */}
        {penalties.map(function (p, i) {
          var y = padT + headerH + i * rowH;
          var bg = i % 2 === 0 ? '#fafafa' : '#fff';
          return (
            <g key={i}>
              <rect x={0} y={y} width={W} height={rowH} fill={bg} />
              <text x={cols[0] + 8} y={y + rowH / 2 + 4}
                fontFamily="'Libre Baskerville',serif" fontSize={9} fontWeight={700} fill="#333">
                {p.category}
              </text>
              <text x={cols[1] + 8} y={y + rowH / 2 + 4}
                fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#666">
                {p.statute}
              </text>
              <text x={cols[2] + 8} y={y + rowH / 2 + 4}
                fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#333">
                {p.penalty}
              </text>
              <text x={cols[3] + 8} y={y + rowH / 2 + 4}
                fontFamily="'Outfit',sans-serif" fontSize={8.5} fontWeight={600}
                fill={p.recoverable ? '#198754' : '#dc3545'}>
                {p.paga}
              </text>
              {/* Recoverable badge */}
              <rect x={cols[4] + 8} y={y + rowH / 2 - 7} width={38} height={14} rx={7}
                fill={p.recoverable ? '#198754' : '#dc3545'} opacity={0.12} />
              <text x={cols[4] + 27} y={y + rowH / 2 + 4} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600}
                fill={p.recoverable ? '#198754' : '#dc3545'}>
                {p.recoverable ? 'YES' : 'NO'}
              </text>
              <text x={cols[5] + 8} y={y + rowH / 2 + 4}
                fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#999" fontStyle="italic">
                {p.note}
              </text>
            </g>
          );
        })}

        {/* Bottom border */}
        <line x1={0} y1={padT + headerH + penalties.length * rowH}
          x2={W} y2={padT + headerH + penalties.length * rowH}
          stroke="#e0e0e0" strokeWidth={0.75} />

        <text x={W / 2} y={H - 6} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          ZB, N.A. v. Superior Court (2019) · Kirby v. Immoos (2012) · AB 2288 / SB 92 (2024)
        </text>
      </svg>
    </div>
  );
}
