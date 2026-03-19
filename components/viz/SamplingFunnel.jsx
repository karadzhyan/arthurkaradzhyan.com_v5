"use client";
import { useState, useEffect, useRef } from "react";

/*
  Statistical sampling funnel diagram — deepened version.
  Per Duran v. U.S. Bank (2014) 59 Cal.4th 1 and Bell v. Farmers Ins. (2001) 87 Cal.App.4th 805.
  Additions:
  - Defense attack vectors per stage (where to challenge)
  - Confidence interval visualization band
  - Vulnerability indicators for each funnel stage
  - Deposition question domains mapped to stages
  - Population vs. sample error metrics
*/

var stages = [
  {
    label: "Total Workforce",
    value: "500",
    sub: "All employees in job classification",
    width: 100,
    attack: "Population Definition",
    vulnerabilities: [
      "Over-inclusive: merged job classifications",
      "Under-inclusive: excluded relevant subgroups",
      "Temporal mismatch with PAGA period",
    ],
    depositionQ: "How did you define the population? Did you include all job classifications or only certain ones?",
  },
  {
    label: "Aggrieved Employees",
    value: "200",
    sub: "Worked during PAGA period",
    width: 80,
    attack: "Sample Frame Construction",
    vulnerabilities: [
      "Frame includes non-aggrieved employees",
      "Currently employed only (selection bias)",
      "No verification of actual 'aggrieved' status",
    ],
    depositionQ: "Did your sample frame include terminated employees? How did you verify 'aggrieved' status?",
  },
  {
    label: "Statistical Sample",
    value: "40",
    sub: "Duran-compliant random sample",
    width: 60,
    attack: "Selection Method",
    vulnerabilities: [
      "Convenience sample, not random",
      "Stratification ignores key variables",
      "Sample size inadequate for subgroups",
    ],
    depositionQ: "Describe your randomization method. Was the selection stratified by location, shift, or classification?",
  },
  {
    label: "Violation Rate",
    value: "32%",
    sub: "Sample violation frequency",
    width: 40,
    attack: "Violation Coding",
    vulnerabilities: [
      "28-29 min meals coded as violations (should be compliant)",
      "Auto-deducted breaks not examined",
      "Paid premiums not credited against violations",
    ],
    depositionQ: "How did you code a 29-minute meal? Did you credit employer-paid premiums against violation count?",
  },
  {
    label: "Extrapolated Exposure",
    value: "$1.2M",
    sub: "Applied to full class/PAGA group",
    width: 70,
    attack: "Extrapolation Method",
    vulnerabilities: [
      "Point estimate without confidence interval",
      "Assumed uniform distribution across all employees",
      "Did not account for affirmative defenses per subgroup",
    ],
    depositionQ: "What is the confidence interval around your violation rate? Did you account for employer defenses in your extrapolation?",
  },
];

export default function SamplingFunnel() {
  var [visible, setVisible] = useState(false);
  var [activeStage, setActiveStage] = useState(-1);
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  var w = 580;
  var h = 340;
  var cx = w / 2;
  var startY = 30;
  var stageH = 50;
  var gap = 12;
  var colors = ["#2c3e3a", "#2c3e3a", "#CC8800", "#dc3545", "#198754"];

  // Confidence interval visualization data
  var ciLow = 20; // 32% - 12%
  var ciHigh = 44; // 32% + 12%
  var ciCenter = 32;

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

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 6 }}>
        Methodology
      </div>
      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, color: "#333", marginBottom: 4, lineHeight: 1.4 }}>
        Statistical Sampling — From Population to Exposure
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginBottom: 20, lineHeight: 1.5 }}>
        A Duran-compliant sampling framework narrows the workforce to a representative sample. Click any stage for defense attack vectors and deposition questions.
      </div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {/* Funnel */}
        <div style={{ flex: "1 1 300px", overflowX: "auto" }}>
          <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
            {stages.map(function (stage, i) {
              var y = startY + i * (stageH + gap);
              var halfW = (stage.width / 100) * (w * 0.38);
              var nextHalfW = i < stages.length - 1 ? (stages[i + 1].width / 100) * (w * 0.38) : halfW;
              var delay = 0.2 + i * 0.15;
              var color = colors[i];
              var isActive = activeStage === i;

              return (
                <g key={i} opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s ease " + delay + "s", cursor: "pointer" }}
                  onClick={function () { setActiveStage(isActive ? -1 : i); }}>
                  {/* Trapezoid */}
                  <path d={
                    "M " + (cx - halfW) + " " + y +
                    " L " + (cx + halfW) + " " + y +
                    " L " + (cx + nextHalfW) + " " + (y + stageH) +
                    " L " + (cx - nextHalfW) + " " + (y + stageH) + " Z"
                  } fill={isActive ? color + "25" : color + "15"} stroke={isActive ? color : color + "40"} strokeWidth={isActive ? 2 : 1} />

                  {/* Value */}
                  <text x={cx} y={y + 22} textAnchor="middle"
                    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, fill: color }}>
                    {stage.value}
                  </text>

                  {/* Label */}
                  <text x={cx} y={y + 37} textAnchor="middle"
                    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 500, fill: "#888" }}>
                    {stage.label}
                  </text>

                  {/* Attack vector label (right side) */}
                  <text x={cx + halfW + 12} y={y + 20} textAnchor="start"
                    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 600, fill: color, letterSpacing: 0.5 }}>
                    {stage.attack}
                  </text>
                  <text x={cx + halfW + 12} y={y + 32} textAnchor="start"
                    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#bbb" }}>
                    {stage.vulnerabilities.length} attack vectors
                  </text>

                  {/* Active indicator */}
                  {isActive && (
                    <rect x={cx - halfW - 4} y={y} width={4} height={stageH} rx={2} fill={color} />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right panel: attack vectors or confidence interval */}
        <div style={{ flex: "1 1 240px", minWidth: 240 }}>
          {activeStage >= 0 ? (
            <div style={{
              padding: "12px 16px",
              background: colors[activeStage] + "08",
              border: "1px solid " + colors[activeStage] + "20",
              borderLeft: "3px solid " + colors[activeStage],
              borderRadius: 4,
            }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, color: colors[activeStage], marginBottom: 8 }}>
                {stages[activeStage].attack}
              </div>

              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, color: "#666", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
                Vulnerability Points
              </div>
              {stages[activeStage].vulnerabilities.map(function (v, i) {
                return (
                  <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#dc3545", marginTop: 5, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#555", lineHeight: 1.5 }}>{v}</span>
                  </div>
                );
              })}

              <div style={{ marginTop: 10, padding: "8px", background: "#fff", border: "1px solid #eee", borderRadius: 3 }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, color: "#2c3e3a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                  Deposition Question
                </div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 10, color: "#555", lineHeight: 1.6, fontStyle: "italic" }}>
                  "{stages[activeStage].depositionQ}"
                </div>
              </div>
            </div>
          ) : (
            /* Default: Confidence interval visualization */
            <div style={{
              padding: "12px 16px",
              background: "#fafafa",
              border: "1px solid #eee",
              borderRadius: 4,
            }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, color: "#2c3e3a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                Confidence Interval
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#888", marginBottom: 12, lineHeight: 1.5 }}>
                The 32% violation rate has a 95% confidence interval of ±12 percentage points. The true rate lies between {ciLow}% and {ciHigh}%.
              </div>

              {/* CI bar visualization */}
              <div style={{ position: "relative", height: 40, marginBottom: 8 }}>
                <div style={{ position: "absolute", top: 14, left: 0, right: 0, height: 12, background: "#eee", borderRadius: 6 }} />
                <div style={{
                  position: "absolute", top: 14,
                  left: (ciLow / 100 * 100) + "%",
                  width: ((ciHigh - ciLow) / 100 * 100) + "%",
                  height: 12, background: "#dc354530", borderRadius: 6,
                }} />
                <div style={{
                  position: "absolute", top: 10,
                  left: (ciCenter / 100 * 100) + "%",
                  width: 3, height: 20, background: "#dc3545", borderRadius: 1,
                  transform: "translateX(-1px)",
                }} />
                <div style={{ position: "absolute", top: 0, left: (ciLow / 100 * 100) + "%", fontFamily: "'Outfit', sans-serif", fontSize: 8, color: "#999" }}>
                  {ciLow}%
                </div>
                <div style={{ position: "absolute", top: 0, left: (ciCenter / 100 * 100) + "%", transform: "translateX(-8px)", fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 700, color: "#dc3545" }}>
                  {ciCenter}%
                </div>
                <div style={{ position: "absolute", top: 0, left: (ciHigh / 100 * 100) + "%", transform: "translateX(-14px)", fontFamily: "'Outfit', sans-serif", fontSize: 8, color: "#999" }}>
                  {ciHigh}%
                </div>
              </div>

              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, color: "#198754", letterSpacing: 1, marginTop: 12, marginBottom: 4 }}>
                DEFENSE ARGUMENT
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#555", lineHeight: 1.6 }}>
                The plaintiff's point estimate of 32% is misleading. The true violation rate could be as low as {ciLow}% — a {Math.round(((ciCenter - ciLow) / ciCenter) * 100)}% reduction from the claimed rate.
              </div>

              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", marginTop: 8 }}>
                Click any funnel stage to see defense attack vectors.
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
        Per Duran v. U.S. Bank (2014) 59 Cal.4th 1; Bell v. Farmers Ins. (2001) 87 Cal.App.4th 805. Sample must be random, representative, and statistically significant.
      </div>
    </div>
  );
}
