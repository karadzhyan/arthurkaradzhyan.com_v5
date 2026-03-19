/*
 * IndustryRadar — spider/radar chart comparing 6 industries across 5 exposure axes.
 * Used on /industries index page. Server component, pure SVG.
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

  var W = 480, H = 300;
  var cx = 210, cy = 150, maxR = 110;
  var angleStep = (2 * Math.PI) / axes.length;
  var startAngle = -Math.PI / 2;

  function polar(angle, r) {
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  /* Grid rings */
  var rings = [25, 50, 75, 100];

  /* Build polygon paths for each industry */
  function polyPath(scores) {
    return scores.map(function (s, i) {
      var a = startAngle + i * angleStep;
      var r = (s / 100) * maxR;
      var p = polar(a, r);
      return (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1);
    }).join(' ') + ' Z';
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
            <polygon key={pct} points={pts}
              fill="none" stroke="#e8e8e8" strokeWidth={0.75} />
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

        {/* Industry dots at vertices */}
        {industries.map(function (ind) {
          return ind.scores.map(function (s, j) {
            var a = startAngle + j * angleStep;
            var p = polar(a, (s / 100) * maxR);
            return (
              <circle key={ind.name + j} cx={p.x} cy={p.y} r={2}
                fill={ind.color} opacity={0.7} />
            );
          });
        })}

        {/* Legend */}
        {industries.map(function (ind, i) {
          var lx = 360, ly = 40 + i * 38;
          return (
            <g key={'leg' + i}>
              <line x1={lx} y1={ly + 2} x2={lx + 20} y2={ly + 2}
                stroke={ind.color} strokeWidth={2.5} opacity={0.6} />
              <text x={lx + 28} y={ly + 5}
                fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#333">
                {ind.name}
              </text>
              {/* Mini bar showing total exposure score */}
              <rect x={lx + 28} y={ly + 10} width={ind.scores.reduce(function(a,b){return a+b;},0)/5 * 0.9} height={4} rx={2}
                fill={ind.color} opacity={0.3} />
              <text x={lx + 28 + ind.scores.reduce(function(a,b){return a+b;},0)/5 * 0.9 + 6} y={ly + 15}
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#bbb">
                {Math.round(ind.scores.reduce(function(a,b){return a+b;},0)/5)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
