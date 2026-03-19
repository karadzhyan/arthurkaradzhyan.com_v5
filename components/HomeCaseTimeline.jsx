/*
 * HomeCaseTimeline — compact horizontal timeline for the homepage case law section.
 * Shows key case dots on a timeline with a single highlighted pending case.
 */

export default function HomeCaseTimeline() {
  var cases = [
    { year: 2012, label: 'Brinker · Kirby' },
    { year: 2014, label: 'Duran' },
    { year: 2018, label: 'Alvarado' },
    { year: 2019, label: 'ZB, N.A.' },
    { year: 2021, label: 'Donohue · Ferra' },
    { year: 2022, label: 'Naranjo' },
    { year: 2023, label: 'Adolph' },
    { year: 2024, label: 'Estrada' },
    { year: 2025, label: 'Hohenshelt' },
    { year: 2026, label: 'Leeper', pending: true },
  ];

  var W = 700, H = 60;
  var padL = 20, padR = 20;
  var plotW = W - padL - padR;
  var yearMin = 2012, yearMax = 2026;

  function xFor(y) {
    return padL + ((y - yearMin) / (yearMax - yearMin)) * plotW;
  }

  return (
    <div style={{ maxWidth: 740, margin: '8px auto 20px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        {/* Axis */}
        <line x1={padL} y1={32} x2={W - padR} y2={32}
          stroke="#e0e0e0" strokeWidth={1} />

        {/* Cases */}
        {cases.map(function (c, i) {
          var x = xFor(c.year);
          var above = i % 2 === 0;
          return (
            <g key={i}>
              <circle cx={x} cy={32} r={3}
                fill={c.pending ? 'none' : '#2c3e3a'}
                stroke={c.pending ? '#dc3545' : '#2c3e3a'}
                strokeWidth={c.pending ? 1.5 : 0} />
              <text x={x} y={above ? 20 : 50} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7.5}
                fill={c.pending ? '#dc3545' : '#888'}
                fontWeight={c.pending ? 600 : 400}>
                {c.label}
              </text>
            </g>
          );
        })}

        {/* Reform marker */}
        <line x1={xFor(2024) - 20} y1={28} x2={xFor(2024) - 20} y2={36}
          stroke="#dc3545" strokeWidth={1} opacity={0.4} />
        <text x={xFor(2024) - 20} y={56} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={6} fill="#dc3545" letterSpacing={0.5}>
          REFORMS
        </text>
      </svg>
    </div>
  );
}
