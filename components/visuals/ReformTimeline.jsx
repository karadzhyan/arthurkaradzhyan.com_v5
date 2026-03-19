"use client";
/* AB 2288 / SB 92 Reform Timeline — Shows the critical windows and
   strategic decision points under the 2024 PAGA reforms. */

export default function ReformTimeline() {
  var phases = [
    {
      day: "Day 0",
      title: "PAGA Notice Received",
      desc: "Clock starts on all remediation windows",
      color: "#CC8800",
      icon: "!",
      detail: "LWDA notice triggers § 2699.3 procedures"
    },
    {
      day: "Day 33",
      title: "Cure Proposal Deadline",
      desc: "Submit written cure proposal to employee & LWDA",
      color: "#CC8800",
      icon: "33",
      detail: "§ 2699.3(c)(2)(A) — shortest window"
    },
    {
      day: "Day 60",
      title: "Remediation Window Closes",
      desc: "Complete 'all reasonable steps' for 30% cap qualification",
      color: "#2c3e3a",
      icon: "60",
      detail: "§ 2699(h) — documentation must be complete"
    },
    {
      day: "Day 65",
      title: "LWDA Response Period Ends",
      desc: "If LWDA does not act, plaintiff may file complaint",
      color: "#4a7a6f",
      icon: "65",
      detail: "§ 2699.3(a)(2)(A) — 65 calendar days"
    },
    {
      day: "Post-Filing",
      title: "Early Evaluation Conference",
      desc: "Court-supervised conference for narrowing claims",
      color: "#2c3e3a",
      icon: "EEC",
      detail: "§ 2699.3(b)(2) — new procedural mechanism"
    },
    {
      day: "Trial",
      title: "Manageability Limitation",
      desc: "Court may limit unmanageable claims under § 2699(p)",
      color: "#1e2d2a",
      icon: "§p",
      detail: "Estrada v. Royalty Carpet Mills framework"
    },
  ];

  var svgW = 760;
  var svgH = 420;
  var lineY = 120;
  var nodeSpacing = svgW / (phases.length + 1);

  return (
    <div className="viz-timeline">
      <div className="viz-header">
        <div className="viz-label">PAGA Reform Timeline</div>
        <div className="viz-subtitle">AB 2288 / SB 92 — Critical deadlines and strategic windows after notice receipt</div>
      </div>
      <svg viewBox={"0 0 " + svgW + " " + svgH} fill="none" className="viz-svg" role="img" aria-label="PAGA reform timeline showing critical deadlines from notice receipt through trial">
        {/* Timeline base line */}
        <line x1="40" y1={lineY} x2={svgW - 40} y2={lineY} stroke="#2c3e3a" strokeWidth="2" strokeOpacity="0.15" />

        {/* Urgency zone */}
        <rect x={nodeSpacing - 10} y={lineY - 30} width={nodeSpacing * 2 + 20} height="60" rx="4"
          fill="rgba(204,136,0,0.04)" stroke="rgba(204,136,0,0.15)" strokeWidth="1" strokeDasharray="4 4" />
        <text x={nodeSpacing * 2} y={lineY - 36} textAnchor="middle" fontSize="7" fontWeight="600"
          fill="#CC8800" fontFamily="Outfit,sans-serif" letterSpacing="2">CRITICAL WINDOW</text>

        {/* Cap qualification zone */}
        <rect x={nodeSpacing * 2 + 10} y={lineY - 24} width={nodeSpacing + 10} height="48" rx="4"
          fill="rgba(44,62,58,0.03)" stroke="rgba(44,62,58,0.1)" strokeWidth="1" strokeDasharray="4 4" />
        <text x={nodeSpacing * 2.5 + 15} y={lineY - 30} textAnchor="middle" fontSize="7" fontWeight="600"
          fill="#2c3e3a" fontFamily="Outfit,sans-serif" letterSpacing="2">CAP QUALIFICATION</text>

        {/* Nodes */}
        {phases.map(function (p, i) {
          var x = nodeSpacing * (i + 1);
          return (
            <g key={i}>
              {/* Connector line */}
              <line x1={x} y1={lineY} x2={x} y2={lineY + 50} stroke={p.color} strokeWidth="1" strokeOpacity="0.3" />

              {/* Node circle */}
              <circle cx={x} cy={lineY} r="18" fill={p.color} fillOpacity="0.1" stroke={p.color} strokeWidth="1.5" />
              <text x={x} y={lineY + 4} textAnchor="middle" fontSize="9" fontWeight="700"
                fill={p.color} fontFamily="Outfit,sans-serif">{p.icon}</text>

              {/* Day label above */}
              <text x={x} y={lineY - 28} textAnchor="middle" fontSize="10" fontWeight="700"
                fill={p.color} fontFamily="Outfit,sans-serif">{p.day}</text>

              {/* Card below */}
              <rect x={x - 52} y={lineY + 54} width="104" height="72" rx="4"
                fill="rgba(44,62,58,0.03)" stroke="rgba(44,62,58,0.08)" strokeWidth="1" />
              <text x={x} y={lineY + 74} textAnchor="middle" fontSize="9" fontWeight="700"
                fill="#1a1a1a" fontFamily="Outfit,sans-serif">
                {p.title.length > 16 ? p.title.slice(0, 16) : p.title}
              </text>
              {p.title.length > 16 && (
                <text x={x} y={lineY + 87} textAnchor="middle" fontSize="9" fontWeight="700"
                  fill="#1a1a1a" fontFamily="Outfit,sans-serif">
                  {p.title.slice(16)}
                </text>
              )}
              <foreignObject x={x - 48} y={lineY + (p.title.length > 16 ? 90 : 80)} width="96" height="30">
                <div style={{ fontSize: "7.5px", color: "#888", fontFamily: "Outfit,sans-serif", textAlign: "center", lineHeight: "1.4" }}>
                  {p.desc}
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Penalty cap labels at bottom */}
        <g transform={"translate(60," + (lineY + 160) + ")"}>
          <rect x="0" y="0" width="200" height="36" rx="3" fill="rgba(44,62,58,0.05)" />
          <text x="16" y="15" fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">15% Cap</text>
          <text x="16" y="28" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Pre-notice "all reasonable steps" — § 2699(g)</text>

          <rect x="220" y="0" width="200" height="36" rx="3" fill="rgba(44,62,58,0.05)" />
          <text x="236" y="15" fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">30% Cap</text>
          <text x="236" y="28" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Post-notice remediation within 60 days — § 2699(h)</text>

          <rect x="440" y="0" width="240" height="36" rx="3" fill="rgba(204,136,0,0.06)" />
          <text x="456" y="15" fontSize="9" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif">No Cap — Default Penalties</text>
          <text x="456" y="28" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Neither window met — full penalty exposure applies</text>
        </g>
      </svg>
      <div className="viz-footnote">
        AB 2288 (Stats. 2024, ch. 330) · SB 92 (Stats. 2024, ch. 331) · Effective July 1, 2024
      </div>
    </div>
  );
}
