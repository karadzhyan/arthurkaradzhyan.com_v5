/*
 * HomePracticeRing — donut chart showing practice area distribution.
 * Used in the homepage About section. Server component, pure SVG.
 */

export default function HomePracticeRing() {
  var areas = [
    { label: 'PAGA Defense', pct: 40, color: '#2c3e3a' },
    { label: 'Wage & Hour', pct: 25, color: '#4a7a6f' },
    { label: 'Investigations', pct: 12, color: '#8aa39e' },
    { label: 'Class Actions', pct: 15, color: '#dc3545' },
    { label: 'Advisory', pct: 8, color: '#CC8800' },
  ];

  var cx = 70, cy = 70, r = 52, strokeW = 18;
  var circumference = 2 * Math.PI * r;

  var cumPct = 0;
  var arcs = areas.map(function (a) {
    var offset = circumference * (1 - cumPct / 100);
    var length = circumference * (a.pct / 100);
    cumPct += a.pct;
    return { offset: offset, length: length, color: a.color, label: a.label, pct: a.pct };
  });

  var W = 260, H = 140;

  return (
    <div style={{ margin: '12px 0' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block', maxWidth: 280 }}>
        {/* Donut arcs */}
        {arcs.map(function (arc, i) {
          return (
            <circle key={i}
              cx={cx} cy={cy} r={r}
              fill="none" stroke={arc.color}
              strokeWidth={strokeW}
              strokeDasharray={arc.length + ' ' + (circumference - arc.length)}
              strokeDashoffset={arc.offset}
              strokeLinecap="butt"
              transform={"rotate(-90 " + cx + " " + cy + ")"}
              opacity={0.85}
            />
          );
        })}

        {/* Center label */}
        <text x={cx} y={cy - 4} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={20} fontWeight={700} fill="#2c3e3a">
          100%
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fill="#999"
          letterSpacing={1}>
          DEFENSE
        </text>

        {/* Legend */}
        {areas.map(function (a, i) {
          var ly = 14 + i * 24;
          return (
            <g key={i}>
              <rect x={154} y={ly} width={10} height={10} rx={2} fill={a.color} opacity={0.85} />
              <text x={170} y={ly + 9}
                fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#555">
                {a.label}
              </text>
              <text x={248} y={ly + 9} textAnchor="end"
                fontFamily="'Outfit',sans-serif" fontSize={8.5} fontWeight={600} fill={a.color}>
                {a.pct}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
