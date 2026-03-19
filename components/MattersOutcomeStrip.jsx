/*
 * MattersOutcomeStrip — horizontal visual summary of matter outcomes.
 * Shows category distribution + key results as a compact infographic.
 * Used on /matters page. Server component (uses matters data directly).
 */

import { matters } from '@/data/matters';

export default function MattersOutcomeStrip() {
  /* Count categories */
  var catCounts = {};
  var catColors = {
    'Exposure Modeling': '#2c3e3a',
    'Novel Theory': '#4a7a6f',
    'Appellate Authority': '#dc3545',
    'Class Certification': '#8aa39e',
    'Forensic Analysis': '#CC8800',
    'FEHA Defense': '#2c3e3a',
    'Investigation': '#4a7a6f',
    'Misclassification': '#8aa39e',
    'Settlement': '#dc3545',
    'Discovery': '#2c3e3a',
    'Client Relations': '#4a7a6f',
  };
  matters.forEach(function (m) {
    catCounts[m.cat] = (catCounts[m.cat] || 0) + 1;
  });
  var categories = Object.keys(catCounts);

  var W = 700, H = 120;
  var barY = 40, barH = 32;
  var totalMatters = matters.length;
  var padL = 0;

  /* Build segments */
  var segments = [];
  var cumX = padL;
  categories.forEach(function (cat) {
    var w = (catCounts[cat] / totalMatters) * W;
    segments.push({ cat: cat, x: cumX, w: w, color: catColors[cat] || '#999' });
    cumX += w;
  });

  return (
    <div style={{ maxWidth: 740, margin: '0 auto 32px' }}>
      <div style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600,
        letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 12,
      }}>
        {totalMatters} Representative Engagements by Category
      </div>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        {/* Stacked bar */}
        {segments.map(function (seg, i) {
          return (
            <g key={i}>
              <rect x={seg.x + 0.5} y={barY} width={seg.w - 1} height={barH} rx={2}
                fill={seg.color} opacity={0.85} />
              {seg.w > 50 && (
                <text x={seg.x + seg.w / 2} y={barY + barH / 2 + 4} textAnchor="middle"
                  fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#fff">
                  {seg.cat}
                </text>
              )}
            </g>
          );
        })}

        {/* Legend below */}
        {(function () {
          var lx = 0, ly = barY + barH + 18;
          return segments.map(function (seg, i) {
            var item = (
              <g key={i}>
                <rect x={lx} y={ly} width={10} height={10} rx={2}
                  fill={seg.color} opacity={0.85} />
                <text x={lx + 14} y={ly + 9}
                  fontFamily="'Outfit',sans-serif" fontSize={8} fill="#666">
                  {seg.cat} ({catCounts[seg.cat]})
                </text>
              </g>
            );
            /* Measure text width approximately */
            lx += seg.cat.length * 5.5 + 40;
            if (lx > W - 80) { lx = 0; ly += 16; }
            return item;
          });
        })()}

        {/* Count badge */}
        <text x={W - 4} y={barY - 6} textAnchor="end"
          fontFamily="'Outfit',sans-serif" fontSize={22} fontWeight={700} fill="#2c3e3a">
          {totalMatters}
        </text>
        <text x={W - 4} y={barY + barH + 8} textAnchor="end"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#999">
          matters
        </text>
      </svg>
    </div>
  );
}
