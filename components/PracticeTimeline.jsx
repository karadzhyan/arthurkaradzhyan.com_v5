/*
 * PracticeTimeline — horizontal career trajectory visualization
 * Used on /about page. Server component.
 */

export default function PracticeTimeline() {
  var phases = [
    { period: 'Early Career', role: 'IP Boutique', desc: 'Trademark prosecution, licensing, analytical writing', color: '#8aa39e', width: 14 },
    { period: 'Foundation', role: 'Plaintiff Side', desc: 'Wage-and-hour class actions, meal/rest, overtime, off-the-clock', color: '#4a7a6f', width: 22 },
    { period: 'Transition', role: 'Global Firm · Defense', desc: 'PAGA modeling, novel defense theories, sampling methodology', color: '#2c3e3a', width: 32 },
    { period: 'Current', role: 'Defense Practice', desc: 'Analytical platform, quantitative exposure modeling, carrier defense', color: '#2c3e3a', width: 32 },
  ];

  var W = 600, H = 130;
  var barY = 40, barH = 24;
  var padL = 0;
  var totalWidth = phases.reduce(function (s, p) { return s + p.width; }, 0);

  var positions = [];
  var cumX = padL;
  phases.forEach(function (p) {
    var w = (p.width / totalWidth) * W;
    positions.push({ x: cumX, w: w });
    cumX += w;
  });

  return (
    <div style={{ maxWidth: 640, margin: '24px auto 32px' }}>
      <div style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600,
        letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 12,
      }}>
        Practice Trajectory
      </div>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        {phases.map(function (p, i) {
          var pos = positions[i];
          return (
            <g key={i}>
              {/* Bar segment */}
              <rect x={pos.x + 1} y={barY} width={pos.w - 2} height={barH} rx={2}
                fill={p.color} opacity={0.8 + i * 0.05} />

              {/* Period label above */}
              <text x={pos.x + pos.w / 2} y={barY - 8} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
                letterSpacing={1.5} fill={p.color} opacity={0.7}>
                {p.period.toUpperCase()}
              </text>

              {/* Role label inside bar */}
              <text x={pos.x + pos.w / 2} y={barY + barH / 2 + 4} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={pos.w > 120 ? 9 : 7.5}
                fontWeight={600} fill="#fff">
                {p.role}
              </text>

              {/* Description below */}
              <text x={pos.x + pos.w / 2} y={barY + barH + 16} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#888">
                {p.desc.length > 40 && pos.w < 160 ? p.desc.slice(0, 36) + '...' : p.desc}
              </text>

              {/* Arrow connector */}
              {i < phases.length - 1 && (
                <polygon
                  points={(pos.x + pos.w - 1) + "," + (barY + 4) + " " +
                    (pos.x + pos.w + 6) + "," + (barY + barH / 2) + " " +
                    (pos.x + pos.w - 1) + "," + (barY + barH - 4)}
                  fill={phases[i + 1].color} opacity={0.3} />
              )}
            </g>
          );
        })}

        {/* Thread line */}
        <text x={W / 2} y={barY + barH + 42} textAnchor="middle"
          fontFamily="'Libre Baskerville',serif" fontSize={9} fill="#999" fontStyle="italic">
          "I treat every legal problem as a system to be understood completely before a position is taken."
        </text>
      </svg>
    </div>
  );
}
