/*
 * InsightTopicMap — visual taxonomy of 12 publications by topic cluster.
 * Shows Framework / Analysis / Case Law / Strategy / Toolkit categories
 * with connections to tools and cases.
 * Used on /insights index page. Server component.
 */

export default function InsightTopicMap() {
  var tags = [
    { tag: 'Framework', count: 1, color: '#2c3e3a', x: 60, y: 50 },
    { tag: 'Analysis', count: 4, color: '#4a7a6f', x: 200, y: 50 },
    { tag: 'Case Law', count: 2, color: '#dc3545', x: 340, y: 50 },
    { tag: 'Strategy', count: 3, color: '#8aa39e', x: 480, y: 50 },
    { tag: 'Toolkit', count: 2, color: '#CC8800', x: 620, y: 50 },
  ];

  var W = 700, H = 100;

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
        <line x1={tags[0].x} y1={40} x2={tags[tags.length - 1].x} y2={40}
          stroke="#e8e8e8" strokeWidth={1} />

        {tags.map(function (t, i) {
          /* Size circle by count */
          var r = 14 + t.count * 5;
          return (
            <g key={i}>
              <circle cx={t.x} cy={t.y} r={r}
                fill={t.color} opacity={0.12}
                stroke={t.color} strokeWidth={1.5} />
              <text x={t.x} y={t.y - 4} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={16} fontWeight={700} fill={t.color}>
                {t.count}
              </text>
              <text x={t.x} y={t.y + 10} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600}
                letterSpacing={1} fill={t.color}>
                {t.tag.toUpperCase()}
              </text>
              {/* "Original" badge count */}
              {(t.tag === 'Framework' || t.tag === 'Strategy' || t.tag === 'Toolkit' || t.tag === 'Analysis') && (
                <g>
                  <text x={t.x} y={t.y + r + 14} textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={7} fill="#999">
                    {t.tag === 'Framework' ? '1 Original' :
                      t.tag === 'Strategy' ? '1 Original' :
                        t.tag === 'Toolkit' ? '1 Original' :
                          t.tag === 'Analysis' ? '1 Original' : ''}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Tool connection note */}
        <text x={W / 2} y={H - 4} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb">
          7 of 12 publications link directly to an interactive tool · 4 are original frameworks
        </text>
      </svg>
    </div>
  );
}
