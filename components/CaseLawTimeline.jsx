/*
 * CaseLawTimeline — horizontal timeline of 12 landmark PAGA decisions (2012–2026)
 * Used on /cases index page. Pure SVG, server-rendered.
 *
 * Cases grouped by thematic cluster with connecting lines showing dependencies.
 * Enhanced with citation counts, doctrinal impact indicators, reform zone, and prominent clusters.
 */

export default function CaseLawTimeline() {
  var cases = [
    { year: 2012, short: 'Brinker', issue: 'Meal Period Standard', color: '#2c3e3a', citations: 'cited 2000+', impact: 8 },
    { year: 2012, short: 'Kirby', issue: 'Premiums ≠ Penalties', color: '#2c3e3a', citations: 'cited 800+', impact: 6 },
    { year: 2014, short: 'Duran', issue: 'Statistical Sampling', color: '#8aa39e', citations: 'cited 600+', impact: 6 },
    { year: 2018, short: 'Alvarado', issue: 'Flat-Sum Bonus Rate', color: '#4a7a6f', citations: 'cited 400+', impact: 5 },
    { year: 2019, short: 'ZB, N.A.', issue: 'Recoverability', color: '#2c3e3a', citations: 'cited 500+', impact: 6 },
    { year: 2021, short: 'Donohue', issue: 'Meal Presumption', color: '#2c3e3a', citations: 'cited 300+', impact: 5 },
    { year: 2021, short: 'Ferra', issue: 'Regular Rate Premiums', color: '#4a7a6f', citations: 'cited 350+', impact: 5 },
    { year: 2022, short: 'Naranjo', issue: 'Derivative Cascade', color: '#dc3545', citations: 'cited 250+', impact: 7 },
    { year: 2023, short: 'Adolph', issue: 'PAGA Standing', color: '#2c3e3a', citations: 'cited 200+', impact: 6 },
    { year: 2024, short: 'Estrada', issue: 'Manageability', color: '#8aa39e', citations: 'cited 50+', impact: 4 },
    { year: 2025, short: 'Hohenshelt', issue: 'Arb. Fee Relief', color: '#4a7a6f', citations: 'new', impact: 3 },
    { year: 2026, short: 'Leeper', issue: 'Headless PAGA', color: '#dc3545', pending: true, citations: 'pending', impact: 7 },
  ];

  /* Dependencies: arrows showing doctrinal connections */
  var deps = [
    [0, 5],  /* Brinker → Donohue */
    [1, 7],  /* Kirby → Naranjo */
    [3, 6],  /* Alvarado → Ferra */
    [4, 7],  /* ZB → Naranjo (recoverability context) */
    [6, 7],  /* Ferra → Naranjo */
    [8, 11], /* Adolph → Leeper */
  ];

  var W = 900, H = 400;
  var padL = 50, padR = 40, padT = 50, padB = 100;
  var plotW = W - padL - padR;

  var yearMin = 2012, yearMax = 2026;
  var yearRange = yearMax - yearMin;

  function xForYear(y) {
    return padL + ((y - yearMin) / yearRange) * plotW;
  }

  /* Stagger y positions to avoid overlap */
  var yPositions = [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1];
  var yTop = padT + 20, yBot = padT + 100;

  var nodes = cases.map(function (c, i) {
    /* Handle same-year cases by offsetting x slightly */
    var sameYearOffset = 0;
    if (i === 1) sameYearOffset = 14; /* Kirby after Brinker */
    if (i === 6) sameYearOffset = 14; /* Ferra after Donohue */
    return {
      x: xForYear(c.year) + sameYearOffset,
      y: yPositions[i] === 0 ? yTop : yBot,
      c: c,
      i: i,
    };
  });

  /* Axis years */
  var axisYears = [2012, 2014, 2016, 2018, 2020, 2022, 2024, 2026];
  var axisY = padT + 170;

  /* Reform zone coordinates */
  var reformX1 = xForYear(2024);
  var reformX2 = xForYear(2026);

  /* Thematic clusters */
  var clusters = [
    { label: 'Meal/Rest Period', x1: 0, x2: 5, y: H - 46, color: '#2c3e3a' },
    { label: 'Regular Rate', x1: 3, x2: 6, y: H - 46, color: '#4a7a6f' },
    { label: 'Recoverability', x1: 4, x2: 7, y: H - 28, color: '#dc3545' },
    { label: 'Arbitration / Standing', x1: 8, x2: 11, y: H - 46, color: '#8aa39e' },
  ];

  return (
    <div style={{ maxWidth: 920, margin: '0 auto 40px', padding: '0 16px' }}>
      <div style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600,
        letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 12,
      }}>
        California Supreme Court · PAGA Decision Timeline
      </div>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        {/* Arrow marker def */}
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3"
            orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke="#ccc" strokeWidth="1" />
          </marker>
          <filter id="dotShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Reform zone shaded rectangle */}
        <rect x={reformX1} y={padT - 10} width={reformX2 - reformX1} height={axisY - padT + 30}
          fill="#dc3545" opacity={0.04} rx={4} />
        <rect x={reformX1} y={padT - 10} width={reformX2 - reformX1} height={axisY - padT + 30}
          fill="none" stroke="#dc3545" strokeWidth={0.75} strokeDasharray="4 3" opacity={0.25} rx={4} />
        <text x={(reformX1 + reformX2) / 2} y={padT - 16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={700} fill="#dc3545"
          letterSpacing={2} opacity={0.7}>
          2024 PAGA REFORM ERA
        </text>

        {/* Axis line */}
        <line x1={padL} y1={axisY} x2={W - padR} y2={axisY}
          stroke="#e0e0e0" strokeWidth={1.5} />

        {/* Year ticks — more prominent */}
        {axisYears.map(function (yr) {
          var x = xForYear(yr);
          return (
            <g key={yr}>
              <line x1={x} y1={axisY - 6} x2={x} y2={axisY + 6} stroke="#bbb" strokeWidth={1} />
              <text x={x} y={axisY + 22} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={11} fontWeight={600} fill="#888">
                {yr}
              </text>
            </g>
          );
        })}

        {/* Reform marker line */}
        <rect x={xForYear(2024) - 1} y={axisY - 50} width={2} height={50}
          fill="#dc3545" opacity={0.3} />
        <text x={xForYear(2024)} y={axisY - 56} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#dc3545"
          letterSpacing={1}>
          AB 2288 / SB 92
        </text>

        {/* Dependency arrows */}
        {deps.map(function (d, i) {
          var from = nodes[d[0]], to = nodes[d[1]];
          return (
            <line key={'dep' + i}
              x1={from.x} y1={from.y + 8} x2={to.x} y2={to.y - 8}
              stroke="#e0e0e0" strokeWidth={1} strokeDasharray="3 3"
              markerEnd="url(#arrow)" />
          );
        })}

        {/* Stem lines from nodes to axis */}
        {nodes.map(function (n) {
          return (
            <line key={'stem' + n.i}
              x1={n.x} y1={n.y + 12} x2={n.x} y2={axisY}
              stroke="#e8e8e8" strokeWidth={0.75} />
          );
        })}

        {/* Case nodes */}
        {nodes.map(function (n) {
          return (
            <g key={'node' + n.i}>
              {/* Dot on axis */}
              <circle cx={n.x} cy={axisY} r={3.5} fill={n.c.color}
                opacity={n.c.pending ? 0.4 : 0.8} />

              {/* Doctrinal impact indicator — filled circle sized by impact */}
              <circle cx={n.x + 30} cy={n.y - 4} r={n.c.impact}
                fill={n.c.color} opacity={n.c.pending ? 0.15 : 0.2} />
              <circle cx={n.x + 30} cy={n.y - 4} r={n.c.impact}
                fill="none" stroke={n.c.color} strokeWidth={0.5}
                opacity={n.c.pending ? 0.3 : 0.5} />

              {/* Case name */}
              <text x={n.x} y={n.y - 4} textAnchor="middle"
                fontFamily="'Libre Baskerville',serif" fontSize={10} fontWeight={700}
                fill={n.c.pending ? '#999' : '#333'}>
                {n.c.short}
              </text>

              {/* Issue label */}
              <text x={n.x} y={n.y + 12} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8}
                fill={n.c.pending ? '#bbb' : '#888'}>
                {n.c.issue}
              </text>

              {/* Citation count annotation */}
              <text x={n.x} y={n.y + 23} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600}
                fill={n.c.pending ? '#ccc' : n.c.color} opacity={0.7}>
                {n.c.citations}
              </text>

              {/* Pending badge */}
              {n.c.pending && (
                <g>
                  <rect x={n.x - 22} y={n.y + 28} width={44} height={14} rx={7}
                    fill="none" stroke="#dc3545" strokeWidth={0.75} opacity={0.6} />
                  <text x={n.x} y={n.y + 38} textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600}
                    fill="#dc3545" letterSpacing={1}>
                    PENDING
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Thematic clusters with connecting brackets */}
        {clusters.map(function (cl, i) {
          var x1 = nodes[cl.x1].x, x2 = nodes[cl.x2].x;
          var bracketH = 6;
          return (
            <g key={'cl' + i}>
              {/* Left bracket arm */}
              <line x1={x1} y1={cl.y + bracketH} x2={x1} y2={cl.y}
                stroke={cl.color} strokeWidth={1.5} opacity={0.4} />
              {/* Bottom line */}
              <line x1={x1} y1={cl.y} x2={x2} y2={cl.y}
                stroke={cl.color} strokeWidth={1.5} opacity={0.4} />
              {/* Right bracket arm */}
              <line x1={x2} y1={cl.y + bracketH} x2={x2} y2={cl.y}
                stroke={cl.color} strokeWidth={1.5} opacity={0.4} />
              {/* Label */}
              <text x={(x1 + x2) / 2} y={cl.y - 5} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8.5} fontWeight={700}
                fill={cl.color} letterSpacing={1.5} opacity={0.7}>
                {cl.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Impact legend */}
        <g>
          <text x={padL} y={H - 6} fontFamily="'Outfit',sans-serif" fontSize={7} fill="#bbb">
            ● Impact indicator sized by doctrinal influence (radius 3–8)
          </text>
          <circle cx={padL + 200} cy={H - 9} r={3} fill="#8aa39e" opacity={0.3} />
          <text x={padL + 207} y={H - 6} fontFamily="'Outfit',sans-serif" fontSize={7} fill="#bbb">
            Low
          </text>
          <circle cx={padL + 230} cy={H - 9} r={5.5} fill="#4a7a6f" opacity={0.3} />
          <text x={padL + 239} y={H - 6} fontFamily="'Outfit',sans-serif" fontSize={7} fill="#bbb">
            Med
          </text>
          <circle cx={padL + 265} cy={H - 9} r={8} fill="#2c3e3a" opacity={0.3} />
          <text x={padL + 277} y={H - 6} fontFamily="'Outfit',sans-serif" fontSize={7} fill="#bbb">
            High
          </text>
        </g>
      </svg>
    </div>
  );
}
