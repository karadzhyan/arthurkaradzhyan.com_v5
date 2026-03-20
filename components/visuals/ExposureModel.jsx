"use client";
import { useState, useEffect, useRef } from "react";
/* Three-Scenario Exposure Model — Now with per-category stacked breakdown bars,
   defense methodology annotations, and reform impact overlay. */

export default function ExposureModel() {
  var [visible, setVisible] = useState(false);
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  /* Per-category breakdown for each scenario (in thousands) */
  var categories = [
    { name: "Meal Period", statute: "§ 226.7", plaintiff: 520, realistic: 156, defense: 42 },
    { name: "Rest Period", statute: "§ 226.7", plaintiff: 390, realistic: 78, defense: 20 },
    { name: "Overtime", statute: "§ 510", plaintiff: 468, realistic: 120, defense: 0, note: "Not recoverable" },
    { name: "Wage Stmts", statute: "§ 226(a)", plaintiff: 520, realistic: 130, defense: 45 },
    { name: "Waiting Time", statute: "§ 203", plaintiff: 390, realistic: 95, defense: 30 },
    { name: "Min. Wage", statute: "§ 1194", plaintiff: 299, realistic: 55, defense: 0, note: "Not recoverable" },
    { name: "Regular Rate", statute: "§ 510/226.7", plaintiff: 260, realistic: 50, defense: 50 },
  ];

  var totalP = 0, totalR = 0, totalD = 0;
  categories.forEach(function (c) { totalP += c.plaintiff; totalR += c.realistic; totalD += c.defense; });

  function fmtK(n) {
    if (n >= 1000) return "$" + (n / 1000).toFixed(1) + "M";
    return "$" + n + "K";
  }

  var maxVal = totalP;
  var barAreaW = 380;
  var barAreaX = 180;
  var catRowH = 34;
  var scenarioStartY = 16;
  var catStartY = scenarioStartY + 260;
  var svgH = catStartY + categories.length * catRowH + 80;

  return (
    <div className="viz-exposure" ref={ref}>
      <div className="viz-header">
        <div className="viz-label">Three-Scenario Exposure Model</div>
        <div className="viz-subtitle">Hypothetical 50-employee employer · 7 PAGA violation categories · 12-month lookback · bi-weekly payroll</div>
      </div>
      <svg viewBox={"0 0 760 " + svgH} fill="none" className="viz-svg" role="img" aria-label="Three-scenario PAGA exposure model with per-category breakdown">
        {/* ── SCENARIO BARS (top section) ── */}
        <text x="10" y={scenarioStartY + 10} fontSize="8" fontWeight="600" letterSpacing="2" fill="rgba(44,62,58,0.3)" fontFamily="Outfit,sans-serif">AGGREGATE EXPOSURE</text>

        {/* Grid */}
        <g stroke="rgba(44,62,58,0.05)" strokeWidth="1">
          {[0, 0.25, 0.5, 0.75, 1].map(function (pct) {
            var x = barAreaX + pct * barAreaW;
            return <line key={pct} x1={x} y1={scenarioStartY + 20} x2={x} y2={scenarioStartY + 230} />;
          })}
        </g>
        {[0, 0.25, 0.5, 0.75, 1].map(function (pct) {
          return <text key={pct} x={barAreaX + pct * barAreaW} y={scenarioStartY + 245} textAnchor="middle" fontSize="7" fill="#ccc" fontFamily="Outfit,sans-serif">{fmtK(Math.round(maxVal * pct))}</text>;
        })}

        {/* Three scenario bars with stacked categories */}
        {[
          { label: "Plaintiff Maximum", sub: "100% violation rates · no reform · all categories", total: totalP, color: "#CC8800", y: scenarioStartY + 30 },
          { label: "Data-Driven Realistic", sub: "Actual rates from payroll data · temporal bifurcation", total: totalR, color: "#2c3e3a", y: scenarioStartY + 100 },
          { label: "Defense Best Case", sub: "Non-recoverable stripped · 15% cap · cure applied", total: totalD, color: "#4a7a6f", y: scenarioStartY + 170 },
        ].map(function (scenario, si) {
          var scenarioKey = si === 0 ? "plaintiff" : si === 1 ? "realistic" : "defense";
          var barW = visible ? (scenario.total / maxVal) * barAreaW : 0;

          /* Build stacked segments */
          var segments = [];
          var runX = 0;
          categories.forEach(function (cat, ci) {
            var val = cat[scenarioKey];
            var segW = (val / maxVal) * barAreaW;
            if (val > 0) {
              segments.push({ x: runX, w: segW, val: val, name: cat.name, notRecoverable: !!cat.note && scenarioKey === "defense" });
            }
            runX += segW;
          });

          return (
            <g key={si}>
              <text x="10" y={scenario.y + 10} fontSize="11" fontWeight="700" fill="#1a1a1a" fontFamily="Outfit,sans-serif">{scenario.label}</text>
              <text x="10" y={scenario.y + 24} fontSize="8" fill="#999" fontFamily="Outfit,sans-serif">{scenario.sub}</text>

              {/* Stacked bar */}
              <g style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s", transitionDelay: (si * 0.3) + "s" }}>
                {segments.map(function (seg, segi) {
                  var segOpacity = 0.3 + (segi / segments.length) * 0.5;
                  return (
                    <rect key={segi} x={barAreaX + seg.x} y={scenario.y + 32} width={visible ? seg.w : 0} height="24" rx="1"
                      fill={scenario.color} fillOpacity={segOpacity}
                      stroke={scenario.color} strokeWidth="0.5" strokeOpacity="0.2"
                      style={{ transition: "width 1s cubic-bezier(0.25,0.46,0.45,0.94)", transitionDelay: (si * 0.3 + segi * 0.05) + "s" }} />
                  );
                })}
              </g>

              {/* Total amount */}
              <text x={barAreaX + barW + 8} y={scenario.y + 50} fontSize="14" fontWeight="700" fill={scenario.color}
                fontFamily="Outfit,sans-serif" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s", transitionDelay: (0.8 + si * 0.3) + "s" }}>
                {fmtK(scenario.total)}
              </text>
            </g>
          );
        })}

        {/* Reduction bracket */}
        <g style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s", transitionDelay: "1.2s" }}>
          <line x1={barAreaX + barAreaW + 80} y1={scenarioStartY + 44} x2={barAreaX + barAreaW + 80} y2={scenarioStartY + 184} stroke="#2c3e3a" strokeWidth="1.5" strokeOpacity="0.2" />
          <line x1={barAreaX + barAreaW + 75} y1={scenarioStartY + 44} x2={barAreaX + barAreaW + 85} y2={scenarioStartY + 44} stroke="#2c3e3a" strokeWidth="1.5" strokeOpacity="0.2" />
          <line x1={barAreaX + barAreaW + 75} y1={scenarioStartY + 184} x2={barAreaX + barAreaW + 85} y2={scenarioStartY + 184} stroke="#2c3e3a" strokeWidth="1.5" strokeOpacity="0.2" />
          <text x={barAreaX + barAreaW + 100} y={scenarioStartY + 106} fontSize="22" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">93%</text>
          <text x={barAreaX + barAreaW + 100} y={scenarioStartY + 122} fontSize="8" fill="#8aa39e" fontFamily="Outfit,sans-serif">REDUCTION</text>
          <text x={barAreaX + barAreaW + 100} y={scenarioStartY + 136} fontSize="7" fill="#bbb" fontFamily="Outfit,sans-serif">{fmtK(totalP)} → {fmtK(totalD)}</text>
        </g>

        {/* Defense methodology annotations */}
        <g style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s", transitionDelay: "1.5s" }}>
          {[
            { label: "ZB, N.A. Filter", desc: "Strip non-recoverable categories", y: scenarioStartY + 160 },
            { label: "Temporal Bifurcation", desc: "Separate Legacy/Remedied rates", y: scenarioStartY + 175 },
            { label: "Penalty Cap (15%)", desc: "AB 2288 § 2699(g)", y: scenarioStartY + 190 },
          ].map(function (ann, i) {
            return (
              <g key={i}>
                <rect x={barAreaX + barAreaW + 95} y={ann.y - 1} width="5" height="5" rx="1" fill="#4a7a6f" fillOpacity="0.4" />
                <text x={barAreaX + barAreaW + 106} y={ann.y + 4} fontSize="7" fontWeight="600" fill="#4a7a6f" fontFamily="Outfit,sans-serif">{ann.label}</text>
              </g>
            );
          })}
        </g>

        {/* ── PER-CATEGORY BREAKDOWN (bottom section) ── */}
        <line x1="10" y1={catStartY - 16} x2="750" y2={catStartY - 16} stroke="rgba(44,62,58,0.08)" strokeWidth="1" />
        <text x="10" y={catStartY} fontSize="8" fontWeight="600" letterSpacing="2" fill="rgba(44,62,58,0.3)" fontFamily="Outfit,sans-serif">PER-CATEGORY BREAKDOWN</text>

        {/* Column headers */}
        <text x={barAreaX + 30} y={catStartY} textAnchor="middle" fontSize="7" fontWeight="600" fill="#CC8800" fontFamily="Outfit,sans-serif">PLAINTIFF</text>
        <text x={barAreaX + 130} y={catStartY} textAnchor="middle" fontSize="7" fontWeight="600" fill="#2c3e3a" fontFamily="Outfit,sans-serif">REALISTIC</text>
        <text x={barAreaX + 230} y={catStartY} textAnchor="middle" fontSize="7" fontWeight="600" fill="#4a7a6f" fontFamily="Outfit,sans-serif">DEFENSE</text>
        <text x={barAreaX + 330} y={catStartY} textAnchor="end" fontSize="7" fontWeight="600" fill="#aaa" fontFamily="Outfit,sans-serif">ΔREDUCTION</text>

        {categories.map(function (cat, i) {
          var y = catStartY + 14 + i * catRowH;
          var pW = (cat.plaintiff / 600) * 100;
          var rW = (cat.realistic / 600) * 100;
          var dW = (cat.defense / 600) * 100;
          var reduction = cat.plaintiff > 0 ? Math.round((1 - cat.defense / cat.plaintiff) * 100) : 0;
          var isStripped = cat.defense === 0 && cat.plaintiff > 0;

          return (
            <g key={i} style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s", transitionDelay: (1 + i * 0.08) + "s" }}>
              {i % 2 === 0 && <rect x="0" y={y - 2} width="760" height={catRowH} fill="rgba(44,62,58,0.015)" />}
              <text x="10" y={y + 12} fontSize="9" fontWeight="600" fill="#1a1a1a" fontFamily="Outfit,sans-serif">{cat.name}</text>
              <text x="10" y={y + 24} fontSize="7" fill="#aaa" fontFamily="Outfit,sans-serif" fontStyle="italic">{cat.statute}</text>

              {/* Mini bars */}
              <rect x={barAreaX} y={y + 4} width={visible ? pW : 0} height="8" rx="1" fill="#CC8800" fillOpacity="0.4"
                style={{ transition: "width 0.6s", transitionDelay: (1.2 + i * 0.08) + "s" }} />
              <text x={barAreaX + pW + 4} y={y + 12} fontSize="7" fill="#CC8800" fontFamily="Outfit,sans-serif">${cat.plaintiff}K</text>

              <rect x={barAreaX + 100} y={y + 4} width={visible ? rW : 0} height="8" rx="1" fill="#2c3e3a" fillOpacity="0.4"
                style={{ transition: "width 0.6s", transitionDelay: (1.3 + i * 0.08) + "s" }} />
              <text x={barAreaX + 100 + rW + 4} y={y + 12} fontSize="7" fill="#2c3e3a" fontFamily="Outfit,sans-serif">${cat.realistic}K</text>

              <rect x={barAreaX + 200} y={y + 4} width={visible ? dW : 0} height="8" rx="1" fill={isStripped ? "rgba(204,68,68,0.2)" : "#4a7a6f"} fillOpacity="0.4"
                style={{ transition: "width 0.6s", transitionDelay: (1.4 + i * 0.08) + "s" }} />
              <text x={barAreaX + 200 + Math.max(dW, 0) + 4} y={y + 12} fontSize="7" fill={isStripped ? "rgba(204,68,68,0.5)" : "#4a7a6f"} fontFamily="Outfit,sans-serif">
                {isStripped ? "STRIPPED" : "$" + cat.defense + "K"}
              </text>

              {/* Reduction percentage */}
              <text x={barAreaX + 330} y={y + 12} textAnchor="end" fontSize="8" fontWeight="700"
                fill={reduction === 100 ? "rgba(204,68,68,0.5)" : reduction > 80 ? "#4a7a6f" : "#888"} fontFamily="Outfit,sans-serif">
                {reduction}%
              </text>

              {/* Note */}
              {cat.note && (
                <text x={barAreaX + 340} y={y + 12} fontSize="7" fill="rgba(204,68,68,0.4)" fontFamily="Outfit,sans-serif" fontStyle="italic">{cat.note}</text>
              )}
            </g>
          );
        })}

        {/* Totals row */}
        <g style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s", transitionDelay: "1.8s" }}>
          <line x1="10" y1={catStartY + 14 + categories.length * catRowH} x2="560" y2={catStartY + 14 + categories.length * catRowH} stroke="rgba(44,62,58,0.12)" strokeWidth="1.5" />
          <text x="10" y={catStartY + 14 + categories.length * catRowH + 16} fontSize="10" fontWeight="700" fill="#1a1a1a" fontFamily="Outfit,sans-serif">Total</text>
          <text x={barAreaX + 30} y={catStartY + 14 + categories.length * catRowH + 16} textAnchor="middle" fontSize="10" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif">{fmtK(totalP)}</text>
          <text x={barAreaX + 130} y={catStartY + 14 + categories.length * catRowH + 16} textAnchor="middle" fontSize="10" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">{fmtK(totalR)}</text>
          <text x={barAreaX + 230} y={catStartY + 14 + categories.length * catRowH + 16} textAnchor="middle" fontSize="10" fontWeight="700" fill="#4a7a6f" fontFamily="Outfit,sans-serif">{fmtK(totalD)}</text>
          <text x={barAreaX + 330} y={catStartY + 14 + categories.length * catRowH + 16} textAnchor="end" fontSize="10" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">
            {Math.round((1 - totalD / totalP) * 100)}%
          </text>
        </g>

        {/* Methodology note */}
        <rect x="10" y={svgH - 30} width="740" height="22" rx="2" fill="rgba(44,62,58,0.03)" />
        <text x="380" y={svgH - 15} textAnchor="middle" fontSize="8" fill="#aaa" fontFamily="Outfit,sans-serif" letterSpacing="0.5">
          Scenario outputs reflect analytical methodology, not predictions of case outcomes · Per-category violation rates are illustrative
        </text>
      </svg>
    </div>
  );
}
