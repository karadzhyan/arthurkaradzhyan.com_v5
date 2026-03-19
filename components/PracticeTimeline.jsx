/*
 * PracticeTimeline — horizontal career trajectory visualization
 * Used on /about page. Server component.
 * Enhanced with year ranges, milestones, matter counts, and skill progression.
 */

export default function PracticeTimeline() {
  var phases = [
    { period: 'Early Career', role: 'IP Boutique', desc: 'Trademark prosecution, licensing, analytical writing', color: '#8aa39e', width: 14, years: '2014–2016', milestone: 'Analytical writing foundation', matters: '15+', skill: 'Writing' },
    { period: 'Foundation', role: 'Plaintiff Side', desc: 'Wage-and-hour class actions, meal/rest, overtime, off-the-clock', color: '#4a7a6f', width: 22, years: '2016–2019', milestone: 'Class action trial experience, 50+ depositions', matters: '40+', skill: 'Litigation' },
    { period: 'Transition', role: 'Global Firm · Defense', desc: 'PAGA modeling, novel defense theories, sampling methodology', color: '#2c3e3a', width: 32, years: '2019–2022', milestone: 'PAGA modeling methodology, novel defense theories', matters: '60+', skill: 'Modeling' },
    { period: 'Current', role: 'Defense Practice', desc: 'Analytical platform, quantitative exposure modeling, carrier defense', color: '#2c3e3a', width: 32, years: '2022–present', milestone: '8 interactive tools, 12 publications, carrier defense', matters: '80+', skill: 'Platform' },
  ];

  var W = 600, H = 200;
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

  /* Skill progression line Y */
  var skillY = 168;

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
              {/* Year range above period label */}
              <text x={pos.x + pos.w / 2} y={barY - 20} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={700}
                fill={p.color} opacity={0.9}>
                {p.years}
              </text>

              {/* Period label above */}
              <text x={pos.x + pos.w / 2} y={barY - 8} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
                letterSpacing={1.5} fill={p.color} opacity={0.7}>
                {p.period.toUpperCase()}
              </text>

              {/* Bar segment */}
              <rect x={pos.x + 1} y={barY} width={pos.w - 2} height={barH} rx={2}
                fill={p.color} opacity={0.8 + i * 0.05} />

              {/* Role label inside bar */}
              <text x={pos.x + pos.w / 2} y={barY + barH / 2 + 4} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={pos.w > 120 ? 9 : 7.5}
                fontWeight={600} fill="#fff">
                {p.role}
              </text>

              {/* Matter count badge */}
              <rect x={pos.x + pos.w - 28} y={barY - 2} width={26} height={13} rx={6.5}
                fill={p.color} opacity={0.9} />
              <text x={pos.x + pos.w - 15} y={barY + 8} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={700} fill="#fff">
                {p.matters}
              </text>

              {/* Milestone annotation below the bar */}
              <text x={pos.x + pos.w / 2} y={barY + barH + 16} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">
                {pos.w < 100 ? p.milestone.slice(0, 28) + (p.milestone.length > 28 ? '...' : '') : (pos.w < 160 ? p.milestone.slice(0, 40) + (p.milestone.length > 40 ? '...' : '') : p.milestone)}
              </text>

              {/* Description below milestone */}
              <text x={pos.x + pos.w / 2} y={barY + barH + 30} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={6.5} fill="#bbb">
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

        {/* Skill progression line */}
        <line x1={0} y1={skillY - 14} x2={W} y2={skillY - 14}
          stroke="#e8e8e8" strokeWidth={0.5} />
        <text x={0} y={skillY - 18} fontFamily="'Outfit',sans-serif" fontSize={7}
          fontWeight={600} letterSpacing={2} fill="#bbb">
          SKILL PROGRESSION
        </text>

        {/* Skill progression arrows and labels */}
        {phases.map(function (p, i) {
          var pos = positions[i];
          var nextPos = i < phases.length - 1 ? positions[i + 1] : null;
          return (
            <g key={'skill' + i}>
              {/* Skill label */}
              <text x={pos.x + pos.w / 2} y={skillY} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={700}
                fill={p.color}>
                {p.skill}
              </text>
              {/* Arrow to next skill */}
              {nextPos && (
                <g>
                  <line x1={pos.x + pos.w / 2 + 22} y1={skillY - 4}
                    x2={nextPos.x + nextPos.w / 2 - 22} y2={skillY - 4}
                    stroke="#ccc" strokeWidth={0.75} />
                  <polygon
                    points={
                      (nextPos.x + nextPos.w / 2 - 22) + "," + (skillY - 7) + " " +
                      (nextPos.x + nextPos.w / 2 - 16) + "," + (skillY - 4) + " " +
                      (nextPos.x + nextPos.w / 2 - 22) + "," + (skillY - 1)
                    }
                    fill="#ccc" />
                </g>
              )}
            </g>
          );
        })}

        {/* Thread line / quote */}
        <text x={W / 2} y={H - 6} textAnchor="middle"
          fontFamily="'Libre Baskerville',serif" fontSize={9} fill="#999" fontStyle="italic">
          &quot;I treat every legal problem as a system to be understood completely before a position is taken.&quot;
        </text>
      </svg>
    </div>
  );
}
