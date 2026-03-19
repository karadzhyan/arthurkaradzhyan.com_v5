"use client";
import { useState, useEffect, useRef } from "react";

/*
  Full Naranjo Cascade — deepened version.
  Shows ALL four violation types side by side with their derivative penalty streams.
  Additions:
  - Pre/post reform toggle showing anti-stacking impact
  - Dollar amounts per stream (50 emp × 26 pp illustrative scenario)
  - Running total per chain and grand total
  - Scienter requirement badges on post-reform derivatives
*/

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n).toLocaleString();
  return "$" + Math.round(n);
}

var chains = [
  {
    trigger: "Missed\nMeal Period",
    color: "#dc3545",
    rate: 0.35,
    derivatives: [
      { code: "§ 226.7", label: "Premium", type: "wage", perUnit: 25, scienter: false },
      { code: "§ 2699(f)", label: "PAGA Penalty", type: "penalty", perUnit: 100, scienter: false },
      { code: "§ 226(a)", label: "Wage Stmt", type: "penalty", perUnit: 50, scienter: true },
      { code: "§ 203", label: "Waiting Time", type: "penalty", perUnit: 80, scienter: true },
    ],
  },
  {
    trigger: "Missed\nRest Period",
    color: "#CC8800",
    rate: 0.30,
    derivatives: [
      { code: "§ 226.7", label: "Premium", type: "wage", perUnit: 25, scienter: false },
      { code: "§ 2699(f)", label: "PAGA Penalty", type: "penalty", perUnit: 100, scienter: false },
      { code: "§ 226(a)", label: "Wage Stmt", type: "penalty", perUnit: 50, scienter: true },
      { code: "§ 203", label: "Waiting Time", type: "penalty", perUnit: 80, scienter: true },
    ],
  },
  {
    trigger: "Overtime\nUnderpayment",
    color: "#2c3e3a",
    rate: 0.25,
    derivatives: [
      { code: "§ 510", label: "OT Wages", type: "wage", perUnit: 18, scienter: false },
      { code: "§ 2699(f)", label: "PAGA Penalty", type: "penalty", perUnit: 100, scienter: false },
      { code: "§ 226(a)", label: "Wage Stmt", type: "penalty", perUnit: 50, scienter: true },
      { code: "§ 210", label: "Late Payment", type: "penalty", perUnit: 100, scienter: true },
    ],
  },
  {
    trigger: "Regular Rate\nError (Ferra)",
    color: "#8B0000",
    rate: 0.20,
    derivatives: [
      { code: "§ 226.7", label: "Underpayment", type: "wage", perUnit: 12, scienter: false },
      { code: "§ 2699(f)", label: "PAGA Penalty", type: "penalty", perUnit: 100, scienter: false },
      { code: "§ 226(a)", label: "Wage Stmt", type: "penalty", perUnit: 50, scienter: true },
      { code: "§ 203", label: "Waiting Time", type: "penalty", perUnit: 80, scienter: true },
    ],
  },
];

var illustrativeEmp = 50;
var illustrativePP = 26;

export default function NaranjoCascadeFull() {
  var [visible, setVisible] = useState(false);
  var [showPostReform, setShowPostReform] = useState(false);
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  // Calculate totals
  var grandTotalPre = 0;
  var grandTotalPost = 0;
  var chainTotals = chains.map(function (chain) {
    var preTot = 0;
    var postTot = 0;
    chain.derivatives.forEach(function (d) {
      var base = illustrativeEmp * illustrativePP * chain.rate * d.perUnit;
      preTot += base;
      if (d.scienter && showPostReform) {
        postTot += 0; // § 2699(i) blocks without scienter
      } else {
        postTot += d.type === "penalty" && showPostReform && d.code === "§ 2699(f)" ? base * 0.5 : base;
      }
    });
    grandTotalPre += preTot;
    grandTotalPost += postTot;
    return { pre: Math.round(preTot), post: Math.round(postTot) };
  });

  var colW = 170;
  var w = 40 + chains.length * colW;
  var h = 370;
  var triggerY = 40;
  var triggerH = 44;
  var derivStartY = 120;
  var derivH = 42;
  var derivGap = 6;

  var activeTotal = showPostReform ? grandTotalPost : grandTotalPre;
  var reformSavings = grandTotalPre - grandTotalPost;

  return (
    <div ref={ref} style={{
      background: "#fff",
      border: "1px solid #e0e0e0",
      padding: "32px 24px 20px",
      marginBottom: 32,
      position: "relative",
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #2c3e3a, #4a7a6f)" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 6 }}>
        <div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 6 }}>
            Complete Reference
          </div>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, color: "#333", marginBottom: 4, lineHeight: 1.4 }}>
            The Naranjo Derivative Cascade — All Four Chains
          </div>
        </div>

        {/* Pre/Post Reform Toggle */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          background: showPostReform ? "#f0faf4" : "#fef3f3",
          border: "1px solid " + (showPostReform ? "#19875430" : "#dc354530"),
          borderRadius: 4,
          cursor: "pointer",
        }} onClick={function () { setShowPostReform(!showPostReform); }}>
          <div style={{
            width: 32,
            height: 16,
            borderRadius: 8,
            background: showPostReform ? "#198754" : "#dc3545",
            position: "relative",
            transition: "background 0.3s ease",
          }}>
            <div style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#fff",
              position: "absolute",
              top: 2,
              left: showPostReform ? 18 : 2,
              transition: "left 0.3s ease",
            }} />
          </div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, color: showPostReform ? "#198754" : "#dc3545" }}>
            {showPostReform ? "Post-Reform (§ 2699(i))" : "Pre-Reform (Full Stacking)"}
          </span>
        </div>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginBottom: 20, lineHeight: 1.5 }}>
        Every primary violation triggers derivative penalty streams. {showPostReform ?
          "Post-reform: § 2699(i) blocks derivative wage statement and waiting time penalties absent scienter." :
          "Pre-reform: full derivative stacking — every stream compounds."}
        {" "}Illustrative: {illustrativeEmp} employees, {illustrativePP} pay periods.
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          {chains.map(function (chain, ci) {
            var cx = 20 + ci * colW + colW / 2;
            var delay = 0.2 + ci * 0.15;
            var chainTotal = showPostReform ? chainTotals[ci].post : chainTotals[ci].pre;

            return (
              <g key={ci} opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s ease " + delay + "s" }}>
                {/* Trigger box */}
                <rect x={cx - 65} y={triggerY} width={130} height={triggerH} rx={4}
                  fill={chain.color + "15"} stroke={chain.color} strokeWidth={1.5} />
                {chain.trigger.split("\n").map(function (line, li) {
                  return (
                    <text key={li} x={cx} y={triggerY + 16 + li * 13} textAnchor="middle"
                      style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: chain.color }}>
                      {line}
                    </text>
                  );
                })}
                {/* Violation rate badge */}
                <text x={cx} y={triggerY + triggerH - 4} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: chain.color + "80" }}>
                  {Math.round(chain.rate * 100)}% rate
                </text>

                {/* Vertical line from trigger to derivatives */}
                <line x1={cx} y1={triggerY + triggerH} x2={cx} y2={derivStartY - 6}
                  stroke={chain.color + "40"} strokeWidth={1.5} />
                <circle cx={cx} cy={derivStartY - 6} r={3} fill={chain.color} />

                {/* Derivative nodes */}
                {chain.derivatives.map(function (d, di) {
                  var dy = derivStartY + di * (derivH + derivGap);
                  var isWage = d.type === "wage";
                  var blocked = showPostReform && d.scienter;
                  var amount = Math.round(illustrativeEmp * illustrativePP * chain.rate * d.perUnit);
                  var displayAmount = blocked ? 0 : (showPostReform && d.code === "§ 2699(f)" ? Math.round(amount * 0.5) : amount);

                  return (
                    <g key={di} opacity={blocked ? 0.3 : 1} style={{ transition: "opacity 0.4s ease" }}>
                      <rect x={cx - 65} y={dy} width={130} height={derivH} rx={3}
                        fill={blocked ? "#f5f5f5" : (isWage ? "#CC880010" : chain.color + "08")}
                        stroke={blocked ? "#ddd" : (isWage ? "#CC880040" : chain.color + "30")} strokeWidth={0.5} />
                      <rect x={cx - 65} y={dy} width={2.5} height={derivH} rx={1}
                        fill={blocked ? "#ddd" : (isWage ? "#CC8800" : chain.color)} />

                      {/* Code and label */}
                      <text x={cx - 58} y={dy + 12}
                        style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 700,
                          fill: blocked ? "#ccc" : (isWage ? "#CC8800" : chain.color) }}>
                        {d.code}
                      </text>
                      <text x={cx - 58} y={dy + 22}
                        style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: blocked ? "#ccc" : "#888" }}>
                        {d.label}
                      </text>

                      {/* Dollar amount */}
                      <text x={cx + 60} y={dy + 14} textAnchor="end"
                        style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 700,
                          fill: blocked ? "#ccc" : (isWage ? "#CC8800" : chain.color) }}>
                        {blocked ? "—" : fmt(displayAmount)}
                      </text>

                      {/* Type badge */}
                      <text x={cx + 60} y={dy + 25} textAnchor="end"
                        style={{ fontFamily: "'Outfit', sans-serif", fontSize: 6, fontWeight: 600,
                          fill: blocked ? "#ccc" : (isWage ? "#CC8800" : chain.color), letterSpacing: 0.5 }}>
                        {isWage ? "WAGE" : "PAGA"}
                      </text>

                      {/* Blocked indicator */}
                      {blocked && (
                        <text x={cx - 58} y={dy + 36}
                          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 6, fontWeight: 600, fill: "#dc3545", letterSpacing: 0.5 }}>
                          BLOCKED — SCIENTER REQ'D
                        </text>
                      )}

                      {/* Scienter badge (visible in both modes) */}
                      {d.scienter && !blocked && (
                        <text x={cx - 58} y={dy + 36}
                          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 6, fill: "#999" }}>
                          Scienter required post-reform
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Chain total */}
                <rect x={cx - 50} y={derivStartY + 4 * (derivH + derivGap) + 6} width={100} height={22} rx={3}
                  fill={chain.color + "10"} stroke={chain.color + "30"} strokeWidth={1} />
                <text x={cx} y={derivStartY + 4 * (derivH + derivGap) + 21} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, fill: chain.color }}>
                  {fmt(chainTotal)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Grand totals */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 32,
        marginTop: 12,
        padding: "12px 0",
        borderTop: "1px solid #eee",
        flexWrap: "wrap",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>
            Total Cascade ({showPostReform ? "Post-Reform" : "Pre-Reform"})
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: showPostReform ? "#198754" : "#dc3545" }}>
            {fmt(activeTotal)}
          </div>
        </div>
        {showPostReform && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>
              Anti-Stacking Savings
            </div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: "#198754" }}>
              {fmt(reformSavings)}
            </div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999" }}>
              {grandTotalPre > 0 ? Math.round((reformSavings / grandTotalPre) * 100) : 0}% reduction via § 2699(i)
            </div>
          </div>
        )}
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
        Naranjo v. Spectrum Security (2022) 13 Cal.5th 93 · Kirby v. Immoos (2012) 53 Cal.4th 1244 · Post-reform: § 2699(i) limits derivative stacking where scienter absent
      </div>
    </div>
  );
}
