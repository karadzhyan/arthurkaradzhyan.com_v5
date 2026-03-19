/*
 * InsightTopicMap — visual taxonomy of 12 publications by topic cluster.
 * Shows Framework / Analysis / Case Law / Strategy / Toolkit categories
 * with connections to tools and cases.
 * Enhanced with article titles radiating from bubbles, tool connections, and prominent badges.
 * Used on /insights index page. Server component.
 */

export default function InsightTopicMap() {
  var tags = [
    { tag: 'Framework', count: 1, color: '#2c3e3a', x: 60, y: 55, articles: ['Two Hotels'], originals: 1, toolLinks: 1 },
    { tag: 'Analysis', count: 4, color: '#4a7a6f', x: 195, y: 55, articles: ['Recoverable', 'Sampling', 'Regular Rate', 'Naranjo'], originals: 1, toolLinks: 3 },
    { tag: 'Case Law', count: 2, color: '#dc3545', x: 340, y: 55, articles: ['Hohenshelt', 'Headless PAGA'], originals: 0, toolLinks: 1 },
    { tag: 'Strategy', count: 3, color: '#8aa39e', x: 485, y: 55, articles: ['Sciborski', 'Expert Depo', 'Manageability'], originals: 1, toolLinks: 1 },
    { tag: 'Toolkit', count: 2, color: '#CC8800', x: 630, y: 55, articles: ['AB 2288', 'Moniz Motion'], originals: 1, toolLinks: 1 },
  ];

  var W = 700, H = 170;

  /* Total tool links across all categories */
  var totalToolLinks = tags.reduce(function (s, t) { return s + t.toolLinks; }, 0);
  var totalOriginals = tags.reduce(function (s, t) { return s + t.originals; }, 0);

  return (
    <div style={{ maxWidth: 740, margin: '0 auto 32px', padding: '0 16px' }}>
      <div style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600,
        letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 12,
      }}>
        12 Publications by Category
      </div>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        {/* Connecting line */}
        <line x1={tags[0].x} y1={45} x2={tags[tags.length - 1].x} y2={45}
          stroke="#e8e8e8" strokeWidth={1} />

        {/* Tool connection lines between bubbles that link to tools */}
        {tags.map(function (t, i) {
          if (t.toolLinks > 0 && i < tags.length - 1) {
            var nextWithTools = null;
            for (var j = i + 1; j < tags.length; j++) {
              if (tags[j].toolLinks > 0) { nextWithTools = tags[j]; break; }
            }
            if (nextWithTools) {
              return (
                <line key={'tconn' + i} x1={t.x} y1={45} x2={nextWithTools.x} y2={45}
                  stroke="#CC8800" strokeWidth={1.5} strokeDasharray="2 3" opacity={0.2} />
              );
            }
          }
          return null;
        })}

        {tags.map(function (t, i) {
          /* Size circle by count */
          var r = 14 + t.count * 5;

          /* Calculate article positions radiating below the bubble */
          var articleY = t.y + r + 14;
          var articleSpacing = 10;

          return (
            <g key={i}>
              {/* Bubble */}
              <circle cx={t.x} cy={t.y} r={r}
                fill={t.color} opacity={0.12}
                stroke={t.color} strokeWidth={1.5} />

              {/* Count */}
              <text x={t.x} y={t.y - 4} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={16} fontWeight={700} fill={t.color}>
                {t.count}
              </text>

              {/* Category label */}
              <text x={t.x} y={t.y + 10} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600}
                letterSpacing={1} fill={t.color}>
                {t.tag.toUpperCase()}
              </text>

              {/* Article titles radiating below */}
              {t.articles.map(function (article, ai) {
                return (
                  <text key={'art' + ai} x={t.x} y={articleY + ai * articleSpacing}
                    textAnchor="middle"
                    fontFamily="'Libre Baskerville',serif" fontSize={6.5}
                    fill="#999" fontStyle="italic">
                    {article}
                  </text>
                );
              })}

              {/* "Original" badge — prominent */}
              {t.originals > 0 && (
                <g>
                  <rect x={t.x + r - 4} y={t.y - r - 2} width={32} height={12} rx={6}
                    fill={t.color} opacity={0.15} stroke={t.color} strokeWidth={0.5} />
                  <text x={t.x + r + 12} y={t.y - r + 7} textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={6} fontWeight={700}
                    fill={t.color} letterSpacing={0.5}>
                    ORIGINAL
                  </text>
                </g>
              )}

              {/* Tool link indicator */}
              {t.toolLinks > 0 && (
                <g>
                  <circle cx={t.x - r + 2} cy={t.y - r + 2} r={6}
                    fill="#CC8800" opacity={0.15} stroke="#CC8800" strokeWidth={0.5} />
                  <text x={t.x - r + 2} y={t.y - r + 5} textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={6} fontWeight={700} fill="#CC8800">
                    {t.toolLinks}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Summary stats bar at bottom */}
        <line x1={40} y1={H - 18} x2={W - 40} y2={H - 18}
          stroke="#f0f0f0" strokeWidth={0.5} />

        <text x={W / 2} y={H - 6} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb">
          {totalToolLinks} of 12 publications link to an interactive tool · {totalOriginals} original frameworks · ● = tool connections
        </text>
      </svg>
    </div>
  );
}
