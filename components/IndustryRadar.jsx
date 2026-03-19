/*
 * IndustryRadar — spider/radar chart comparing 6 industries across 5 exposure axes.
 * Used on /industries index page. Server component, pure SVG.
 * Enhanced with numerical scores at vertices, highest-risk annotations,
 * overall risk ratings, and composite scores.
 */

export default function IndustryRadar() {
  var axes = ['Meal/Rest', 'Overtime', 'Regular Rate', 'Wage Statement', 'Misclass.'];
  var industries = [
    { name: 'Hospitality', color: '#2c3e3a', scores: [95, 60, 40, 70, 30] },
    { name: 'Automotive', color: '#dc3545', scores: [50, 70, 95, 80, 40] },
    { name: 'Healthcare', color: '#4a7a6f', scores: [80, 55, 35, 50, 65] },
    { name: 'Solar', color: '#CC8800', scores: [70, 90, 45, 60, 30] },
    { name: 'Technology', color: '#8aa39e', scores: [30, 45, 50, 55, 85] },
    { name: 'Agriculture', color: '#555', scores: [75, 85, 35, 45, 40] },
  ];

  var W = 480, H = 360;
  var cx = 210, cy = 160, maxR = 110;
  var angleStep = (2 * Math.PI) / axes.length;
  var startAngle = -Math.PI / 2;

  function polar(angle, r) {
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  /* Grid rings */
  var rings = [25, 50, 75, 100];

  /* Risk rating based on composite */
  function riskRating(scores) {
    var avg = scores.reduce(function (a, b) { return a + b; }, 0) / scores.length;
    if (avg >= 65) return { label: 'HIGH', color: '#dc3545' };
    if (avg >= 55) return { label: 'ELEVATED', color: '#CC8800' };
    return { label: 'MODERATE', color: '#4a7a6f' };
  }

  /* Find highest risk axis index for each industry */
  function highestRiskIdx(scores) {
    var maxIdx = 0;
    for (var i = 1; i < scores.length; i++) {
      if (scores[i] > scores[maxIdx]) maxIdx = i;
    }
    return maxIdx;
  }

  return (
    <div style={{ maxWidth: 520, margin: '0 auto 40px', padding: '0 16px' }}>
      <div style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600,
        letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 12,
      }}>
        Exposure Profile by Industry
      </div>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        {/* Grid rings */}
        {rings.map(function (pct) {
          var r = (pct / 100) * maxR;
          var pts = axes.map(function (_, i) {
            var p = polar(startAngle + i * angleStep, r);
            return p.x.toFixed(1) + ',' + p.y.toFixed(1);
          }).join(' ');
          return (
            <g key={pct}>
              <polygon points={pts}
                fill="none" stroke="#e8e8e8" strokeWidth={0.75} />
              {/* Ring value label */}
              <text x={cx + 4} y={cy - (pct / 100) * maxR + 3}
                fontFamily="'Outfit',sans-serif" fontSize={6} fill="#ddd">
                {pct}
              </text>
            </g>
          );
        })}

        {/* Axis lines */}
        {axes.map(function (label, i) {
          var a = startAngle + i * angleStep;
          var end = polar(a, maxR + 10);
          var labelP = polar(a, maxR + 24);
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={end.x} y2={end.y}
                stroke="#ddd" strokeWidth={0.75} />
              <text x={labelP.x} y={labelP.y + 3} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#888">
                {label}
              </text>
            </g>
          );
        })}

        {/* Industry polygons */}
        {industries.map(function (ind, i) {
          return (
            <polygon key={i} points={
              ind.scores.map(function (s, j) {
                var a = startAngle + j * angleStep;
                var p = polar(a, (s / 100) * maxR);
                return p.x.toFixed(1) + ',' + p.y.toFixed(1);
              }).join(' ')
            }
              fill={ind.color} fillOpacity={0.08}
              stroke={ind.color} strokeWidth={1.5} strokeOpacity={0.6}
            />
          );
        })}

        {/* Industry dots at vertices with numerical scores */}
        {industries.map(function (ind) {
          var hrIdx = highestRiskIdx(ind.scores);
          return ind.scores.map(function (s, j) {
            var a = startAngle + j * angleStep;
            var p = polar(a, (s / 100) * maxR);
            var isHighest = j === hrIdx;
            return (
              <g key={ind.name + j}>
                <circle cx={p.x} cy={p.y} r={isHighest ? 3.5 : 2}
                  fill={ind.color} opacity={isHighest ? 0.9 : 0.7} />
                {/* Score label at vertex */}
                <text x={p.x} y={p.y - 5} textAnchor="middle"
                  fontFamily="'Outfit',sans-serif" fontSize={6} fontWeight={isHighest ? 700 : 500}
                  fill={ind.color} opacity={isHighest ? 0.9 : 0.5}>
                  {s}
                </text>
                {/* Highest risk annotation */}
                {isHighest && (
                  <g>
                    <circle cx={p.x} cy={p.y} r={6}
                      fill="none" stroke={ind.color} strokeWidth={0.75} strokeDasharray="2 1" opacity={0.4} />
                  </g>
                )}
              </g>
            );
          });
        })}

        {/* Legend with risk ratings and composite scores */}
        {industries.map(function (ind, i) {
          var lx = 350, ly = 28 + i * 50;
          var composite = Math.round(ind.scores.reduce(function (a, b) { return a + b; }, 0) / ind.scores.length);
          var rating = riskRating(ind.scores);
          var hrIdx = highestRiskIdx(ind.scores);
          return (
            <g key={'leg' + i}>
              {/* Color line */}
              <line x1={lx} y1={ly + 2} x2={lx + 20} y2={ly + 2}
                stroke={ind.color} strokeWidth={2.5} opacity={0.6} />

              {/* Industry name */}
              <text x={lx + 28} y={ly + 5}
                fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#333">
                {ind.name}
              </text>

              {/* Risk rating badge */}
              <rect x={lx + 28} y={ly + 9} width={38} height={11} rx={5.5}
                fill={rating.color} opacity={0.12} stroke={rating.color} strokeWidth={0.5} />
              <text x={lx + 47} y={ly + 17} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={6} fontWeight={700}
                fill={rating.color} letterSpacing={0.5}>
                {rating.label}
              </text>

              {/* Composite score */}
              <text x={lx + 72} y={ly + 17}
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#999">
                Composite: {composite}
              </text>

              {/* Mini bar showing total exposure score */}
              <rect x={lx + 28} y={ly + 23} width={composite * 0.9} height={4} rx={2}
                fill={ind.color} opacity={0.3} />

              {/* Highest risk axis label */}
              <text x={lx + 28 + composite * 0.9 + 6} y={ly + 27}
                fontFamily="'Outfit',sans-serif" fontSize={6} fill="#bbb">
                Peak: {axes[hrIdx]}
              </text>
            </g>
          );
        })}

        {/* Footer note */}
        <text x={W / 2} y={H - 6} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fill="#ccc">
          Scores 0–100 · Composite = average across 5 axes · Dashed ring = highest risk vertex
        </text>
      </svg>
    </div>
  );
}
