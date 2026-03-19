/*
 * CaseDependencyGraph — Shows how 12 landmark cases interconnect doctrinally.
 * Nodes = cases, edges = doctrinal dependencies ("feeds into", "refines", "limits").
 * Used on /cases index page below the card grid.
 */

export default function CaseDependencyGraph() {
  /* Node positions — manually laid out in 3 clusters */
  var nodes = [
    /* Meal/Rest cluster (left) */
    { id: 'brinker', label: 'Brinker', sub: '2012', x: 80, y: 60, color: '#2c3e3a' },
    { id: 'kirby', label: 'Kirby', sub: '2012', x: 80, y: 140, color: '#2c3e3a' },
    { id: 'donohue', label: 'Donohue', sub: '2021', x: 200, y: 60, color: '#2c3e3a' },
    { id: 'naranjo', label: 'Naranjo', sub: '2022', x: 200, y: 140, color: '#dc3545' },

    /* Regular Rate cluster (center) */
    { id: 'alvarado', label: 'Alvarado', sub: '2018', x: 360, y: 60, color: '#4a7a6f' },
    { id: 'ferra', label: 'Ferra', sub: '2021', x: 360, y: 140, color: '#4a7a6f' },

    /* Standing/Procedure cluster (right) */
    { id: 'zb', label: 'ZB, N.A.', sub: '2019', x: 520, y: 60, color: '#2c3e3a' },
    { id: 'adolph', label: 'Adolph', sub: '2023', x: 640, y: 60, color: '#2c3e3a' },
    { id: 'estrada', label: 'Estrada', sub: '2024', x: 640, y: 140, color: '#8aa39e' },
    { id: 'hohenshelt', label: 'Hohenshelt', sub: '2025', x: 520, y: 140, color: '#4a7a6f' },
    { id: 'leeper', label: 'Leeper', sub: '2026', x: 740, y: 100, color: '#dc3545', pending: true },
    { id: 'duran', label: 'Duran', sub: '2014', x: 740, y: 190, color: '#8aa39e' },
  ];

  var nodeMap = {};
  nodes.forEach(function (n) { nodeMap[n.id] = n; });

  var edges = [
    { from: 'brinker', to: 'donohue', label: 'tightens' },
    { from: 'kirby', to: 'naranjo', label: 'premiums = wages' },
    { from: 'alvarado', to: 'ferra', label: 'rate compounds' },
    { from: 'ferra', to: 'naranjo', label: 'premium rate' },
    { from: 'zb', to: 'naranjo', label: 'recoverability' },
    { from: 'adolph', to: 'leeper', label: 'standing question' },
    { from: 'adolph', to: 'estrada', label: 'manageability' },
    { from: 'duran', to: 'estrada', label: 'sampling limits' },
  ];

  var W = 820, H = 240;

  return (
    <div style={{ maxWidth: 860, margin: '0 auto 40px', padding: '0 16px' }}>
      <div style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600,
        letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 12,
      }}>
        Doctrinal Dependency Map
      </div>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <defs>
          <marker id="dep-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3"
            orient="auto" markerUnits="strokeWidth">
            <path d="M0,0.5 L5,3 L0,5.5" fill="none" stroke="#bbb" strokeWidth="0.8" />
          </marker>
        </defs>

        {/* Cluster backgrounds */}
        {[
          { x: 30, y: 25, w: 230, h: 170, label: 'Meal / Rest / Premiums' },
          { x: 310, y: 25, w: 120, h: 170, label: 'Regular Rate' },
          { x: 470, y: 25, w: 320, h: 200, label: 'Standing & Procedure' },
        ].map(function (cl, i) {
          return (
            <g key={'bg' + i}>
              <rect x={cl.x} y={cl.y} width={cl.w} height={cl.h} rx={8}
                fill="#f9faf9" stroke="#e8e8e8" strokeWidth={0.75} />
              <text x={cl.x + 8} y={cl.y + 14}
                fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600}
                letterSpacing={1.5} fill="#ccc" textTransform="uppercase">
                {cl.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Edges */}
        {edges.map(function (e, i) {
          var f = nodeMap[e.from], t = nodeMap[e.to];
          var mx = (f.x + t.x) / 2, my = (f.y + t.y) / 2;
          return (
            <g key={'edge' + i}>
              <line x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke="#ddd" strokeWidth={1} markerEnd="url(#dep-arrow)" />
              <rect x={mx - 28} y={my - 7} width={56} height={14} rx={7}
                fill="#fff" stroke="#e8e8e8" strokeWidth={0.5} />
              <text x={mx} y={my + 3} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#999">
                {e.label}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map(function (n) {
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={22}
                fill={n.pending ? '#fafafa' : n.color}
                stroke={n.color} strokeWidth={1.5}
                opacity={n.pending ? 0.5 : 1}
                strokeDasharray={n.pending ? '3 2' : 'none'} />
              <text x={n.x} y={n.y - 2} textAnchor="middle"
                fontFamily="'Libre Baskerville',serif" fontSize={9} fontWeight={700}
                fill={n.pending ? '#666' : '#fff'}>
                {n.label}
              </text>
              <text x={n.x} y={n.y + 10} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7.5}
                fill={n.pending ? '#999' : 'rgba(255,255,255,.7)'}>
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
