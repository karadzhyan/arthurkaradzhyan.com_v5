/*
 * HomeCaseTimeline — compact horizontal timeline for the homepage case law section.
 * Shows key case dots on a timeline with a single highlighted pending case.
 * Enhanced with year ticks, reform zone, issue labels, and larger dots with shadow.
 */

export default function HomeCaseTimeline() {
  var cases = [
    { year: 2012, label: 'Brinker · Kirby', issue: 'Meal · Premiums' },
    { year: 2014, label: 'Duran', issue: 'Sampling' },
    { year: 2018, label: 'Alvarado', issue: 'Bonus' },
    { year: 2019, label: 'ZB, N.A.', issue: 'Recovery' },
    { year: 2021, label: 'Donohue · Ferra', issue: 'Presumption · RegRate' },
    { year: 2022, label: 'Naranjo', issue: 'Cascade' },
    { year: 2023, label: 'Adolph', issue: 'Standing' },
    { year: 2024, label: 'Estrada', issue: 'Scope' },
    { year: 2025, label: 'Hohenshelt', issue: 'Arb Fee' },
    { year: 2026, label: 'Leeper', pending: true, issue: 'Headless' },
  ];

  var W = 700, H = 100;
  var padL = 20, padR = 20;
  var plotW = W - padL - padR;
  var yearMin = 2012, yearMax = 2026;
  var axisY = 42;

  function xFor(y) {
    return padL + ((y - yearMin) / (yearMax - yearMin)) * plotW;
  }

  /* Year tick marks */
  var tickYears = [2012, 2014, 2016, 2018, 2020, 2022, 2024, 2026];

  /* Reform zone */
  var reformX1 = xFor(2024);
  var reformX2 = xFor(2026);

  return (
    <div style={{ maxWidth: 740, margin: '8px auto 20px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <defs>
          <filter id="homeDotShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0.5" stdDeviation="1" floodColor="#000" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Reform zone shaded area */}
        <rect x={reformX1} y={axisY - 30} width={reformX2 - reformX1} height={46}
          fill="#dc3545" opacity={0.05} rx={3} />
        <rect x={reformX1} y={axisY - 30} width={reformX2 - reformX1} height={46}
          fill="none" stroke="#dc3545" strokeWidth={0.5} strokeDasharray="3 2" opacity={0.2} rx={3} />
        <text x={(reformX1 + reformX2) / 2} y={axisY - 33} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={6} fontWeight={600} fill="#dc3545"
          letterSpacing={1} opacity={0.6}>
          REFORM ERA
        </text>

        {/* Axis */}
        <line x1={padL} y1={axisY} x2={W - padR} y2={axisY}
          stroke="#e0e0e0" strokeWidth={1} />

        {/* Year tick marks below axis */}
        {tickYears.map(function (yr) {
          var x = xFor(yr);
          return (
            <g key={'tick' + yr}>
              <line x1={x} y1={axisY + 1} x2={x} y2={axisY + 6} stroke="#ccc" strokeWidth={0.75} />
              <text x={x} y={axisY + 15} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#bbb">
                {yr}
              </text>
            </g>
          );
        })}

        {/* Cases */}
        {cases.map(function (c, i) {
          var x = xFor(c.year);
          var above = i % 2 === 0;
          return (
            <g key={i}>
              {/* Dot with shadow — larger r=4 */}
              <circle cx={x} cy={axisY} r={4}
                fill={c.pending ? 'none' : '#2c3e3a'}
                stroke={c.pending ? '#dc3545' : '#2c3e3a'}
                strokeWidth={c.pending ? 1.5 : 0}
                filter="url(#homeDotShadow)" />

              {/* Case name label */}
              <text x={x} y={above ? 18 : axisY + 30} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7.5}
                fill={c.pending ? '#dc3545' : '#888'}
                fontWeight={c.pending ? 600 : 400}>
                {c.label}
              </text>

              {/* Issue label — compact */}
              <text x={x} y={above ? 27 : axisY + 39} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={6} fontWeight={500}
                fill={c.pending ? '#dc3545' : '#bbb'} opacity={0.8}>
                {c.issue}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
