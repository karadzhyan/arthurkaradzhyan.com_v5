"use client";
/* Naranjo Cascade — Shows how 1 meal period violation generates 4+ independent
   penalty streams through statutory cross-references. The signature diagram. */

export default function PenaltyCascade() {
  var nodes = [
    { id: "root", label: "1 Missed Meal Period", sub: "Lab. Code § 226.7", x: 280, y: 32, w: 200, color: "#CC8800" },
    { id: "p1", label: "Meal Period Premium", sub: "1 hr at regular rate", x: 60, y: 150, w: 170, color: "#2c3e3a" },
    { id: "p2", label: "Wage Statement Violation", sub: "§ 226(a) — premium not listed", x: 260, y: 150, w: 200, color: "#2c3e3a" },
    { id: "p3", label: "Waiting Time Penalty", sub: "§ 203 — unpaid at separation", x: 490, y: 150, w: 190, color: "#2c3e3a" },
    { id: "d1", label: "$100/violation", sub: "Default penalty § 2699(f)", x: 60, y: 270, w: 150, color: "#4a7a6f" },
    { id: "d2", label: "$50 → $100/stmt", sub: "§ 226(e) per employee per period", x: 260, y: 270, w: 190, color: "#4a7a6f" },
    { id: "d3", label: "Up to 30 days' wages", sub: "Per separated employee", x: 490, y: 270, w: 180, color: "#4a7a6f" },
    { id: "stack", label: "PAGA Multiplier", sub: "× aggrieved employees × pay periods", x: 205, y: 380, w: 350, color: "#1e2d2a" },
  ];

  var edges = [
    { from: "root", to: "p1" }, { from: "root", to: "p2" }, { from: "root", to: "p3" },
    { from: "p1", to: "d1" }, { from: "p2", to: "d2" }, { from: "p3", to: "d3" },
    { from: "d1", to: "stack" }, { from: "d2", to: "stack" }, { from: "d3", to: "stack" },
  ];

  function cx(n) { return n.x + n.w / 2; }
  function getNode(id) { return nodes.find(function (n) { return n.id === id; }); }

  return (
    <div className="viz-cascade">
      <div className="viz-header">
        <div className="viz-label">The Naranjo Cascade</div>
        <div className="viz-subtitle">How one meal period violation generates four independent penalty streams</div>
      </div>
      <svg viewBox="0 0 760 460" fill="none" className="viz-svg" role="img" aria-label="Naranjo penalty cascade flowchart showing how one missed meal period generates multiple penalty streams">
        <defs>
          <marker id="arrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0L10 3.5L0 7z" fill="#8aa39e" />
          </marker>
          <linearGradient id="cascade-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(44,62,58,0.04)" />
            <stop offset="1" stopColor="rgba(44,62,58,0)" />
          </linearGradient>
        </defs>

        {/* Background zones */}
        <rect x="0" y="125" width="760" height="90" fill="rgba(44,62,58,0.02)" rx="4" />
        <text x="740" y="145" textAnchor="end" fontSize="8" fill="rgba(44,62,58,0.2)" fontFamily="Outfit,sans-serif" letterSpacing="2" fontWeight="600">DERIVATIVE VIOLATIONS</text>
        <rect x="0" y="245" width="760" height="90" fill="rgba(44,62,58,0.04)" rx="4" />
        <text x="740" y="265" textAnchor="end" fontSize="8" fill="rgba(44,62,58,0.2)" fontFamily="Outfit,sans-serif" letterSpacing="2" fontWeight="600">PENALTY AMOUNTS</text>
        <rect x="0" y="355" width="760" height="90" fill="rgba(44,62,58,0.06)" rx="4" />
        <text x="740" y="375" textAnchor="end" fontSize="8" fill="rgba(44,62,58,0.2)" fontFamily="Outfit,sans-serif" letterSpacing="2" fontWeight="600">PAGA EXPOSURE</text>

        {/* Edges */}
        {edges.map(function (e, i) {
          var from = getNode(e.from);
          var to = getNode(e.to);
          var x1 = cx(from);
          var y1 = from.y + 52;
          var x2 = cx(to);
          var y2 = to.y;
          var midY = (y1 + y2) / 2;
          return (
            <path key={i} d={"M" + x1 + " " + y1 + " C" + x1 + " " + midY + " " + x2 + " " + midY + " " + x2 + " " + y2}
              stroke="#8aa39e" strokeWidth="1.5" strokeOpacity="0.4" markerEnd="url(#arrow)" />
          );
        })}

        {/* Nodes */}
        {nodes.map(function (n) {
          var isRoot = n.id === "root";
          var isStack = n.id === "stack";
          return (
            <g key={n.id}>
              <rect x={n.x} y={n.y} width={n.w} height={isStack ? 56 : 52} rx="4"
                fill={isRoot ? "rgba(204,136,0,0.08)" : isStack ? n.color : "rgba(44,62,58,0.06)"}
                stroke={isRoot ? "#CC8800" : n.color}
                strokeWidth={isRoot || isStack ? "2" : "1"}
                strokeOpacity={isRoot || isStack ? "0.6" : "0.3"} />
              <text x={cx(n)} y={n.y + 22} textAnchor="middle" fontSize="11" fontWeight="700"
                fill={isStack ? "#fff" : isRoot ? "#CC8800" : "#1a1a1a"}
                fontFamily="Outfit,sans-serif">{n.label}</text>
              <text x={cx(n)} y={n.y + 38} textAnchor="middle" fontSize="9"
                fill={isStack ? "rgba(255,255,255,0.5)" : isRoot ? "rgba(204,136,0,0.6)" : "#888"}
                fontFamily="Outfit,sans-serif">{n.sub}</text>
            </g>
          );
        })}

        {/* Anti-stacking callout */}
        <rect x="560" y="380" width="180" height="44" rx="3" fill="rgba(44,62,58,0.06)" stroke="rgba(44,62,58,0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <text x="650" y="398" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2c3e3a" fontFamily="Outfit,sans-serif">§ 2699(i) Anti-Stacking</text>
        <text x="650" y="414" textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">2024 reform limitation</text>
      </svg>
      <div className="viz-footnote">
        Source: <em>Naranjo v. Spectrum Security Services</em> (2022) 13 Cal.5th 93 · AB 2288 § 2699(i)
      </div>
    </div>
  );
}
