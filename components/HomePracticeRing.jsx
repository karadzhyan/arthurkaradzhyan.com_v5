/*
 * HomePracticeRing — donut chart showing practice area distribution.
 * Used in the homepage About section. Server component, pure SVG.
 * Enhanced with matter counts, secondary experience ring, defense annotation, and impactful center.
 */

export default function HomePracticeRing() {
  var areas = [
    { label: 'PAGA Defense', pct: 40, color: '#2c3e3a', matters: '80+', yrsExp: 7 },
    { label: 'Wage & Hour', pct: 25, color: '#4a7a6f', matters: '50+', yrsExp: 10 },
    { label: 'Investigations', pct: 12, color: '#8aa39e', matters: '25+', yrsExp: 6 },
    { label: 'Class Actions', pct: 15, color: '#dc3545', matters: '30+', yrsExp: 8 },
    { label: 'Advisory', pct: 8, color: '#CC8800', matters: '15+', yrsExp: 5 },
  ];

  var cx = 70, cy = 78, r = 52, strokeW = 18;
  var circumference = 2 * Math.PI * r;

  /* Inner ring for years of experience */
  var innerR = 30, innerStrokeW = 8;
  var innerCirc = 2 * Math.PI * innerR;
  var maxYrs = 12; /* scale factor for inner ring */

  var cumPct = 0;
  var arcs = areas.map(function (a) {
    var offset = circumference * (1 - cumPct / 100);
    var length = circumference * (a.pct / 100);
    cumPct += a.pct;
    return { offset: offset, length: length, color: a.color, label: a.label, pct: a.pct };
  });

  /* Inner arcs — proportional to years of experience */
  var totalYrs = areas.reduce(function (s, a) { return s + a.yrsExp; }, 0);
  var cumYrsPct = 0;
  var innerArcs = areas.map(function (a) {
    var pct = (a.yrsExp / totalYrs) * 100;
    var offset = innerCirc * (1 - cumYrsPct / 100);
    var length = innerCirc * (pct / 100);
    cumYrsPct += pct;
    return { offset: offset, length: length, color: a.color, yrs: a.yrsExp };
  });

  var W = 260, H = 180;

  return (
    <div style={{ margin: '12px 0' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block', maxWidth: 280 }}>
        {/* Outer donut arcs */}
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

        {/* Inner experience ring */}
        {innerArcs.map(function (arc, i) {
          return (
            <circle key={'inner' + i}
              cx={cx} cy={cy} r={innerR}
              fill="none" stroke={arc.color}
              strokeWidth={innerStrokeW}
              strokeDasharray={arc.length + ' ' + (innerCirc - arc.length)}
              strokeDashoffset={arc.offset}
              strokeLinecap="butt"
              transform={"rotate(-90 " + cx + " " + cy + ")"}
              opacity={0.4}
            />
          );
        })}

        {/* Center label — impactful */}
        <text x={cx} y={cy - 2} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={18} fontWeight={800} fill="#2c3e3a">
          100%
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={6} fill="#888"
          letterSpacing={1.5} fontWeight={700}>
          DEFENSE COUNSEL
        </text>

        {/* Legend with matter counts */}
        {areas.map(function (a, i) {
          var ly = 10 + i * 28;
          return (
            <g key={i}>
              <rect x={148} y={ly} width={10} height={10} rx={2} fill={a.color} opacity={0.85} />
              <text x={163} y={ly + 9}
                fontFamily="'Outfit',sans-serif" fontSize={8} fill="#555">
                {a.label} ({a.pct}%)
              </text>
              <text x={163} y={ly + 20}
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#aaa">
                {a.matters} matters · {a.yrsExp} yrs
              </text>
            </g>
          );
        })}

        {/* 100% employer-side annotation */}
        <text x={cx} y={H - 12} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600}
          letterSpacing={1.5} fill="#4a7a6f" opacity={0.7}>
          100% EMPLOYER-SIDE
        </text>

        {/* Ring labels */}
        <text x={cx} y={H - 2} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={6} fill="#ccc">
          Outer: practice mix · Inner: years of experience
        </text>
      </svg>
    </div>
  );
}
