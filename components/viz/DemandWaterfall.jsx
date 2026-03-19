"use client";
import { useState } from "react";

/*
  Demand deflation waterfall chart — deepened version.
  Additions:
  - Per-category statutory citations and recoverability status
  - Running total connector line
  - Recoverability annotations (PAGA vs. Class vs. Neither)
  - Percentage contribution per deduction
  - Hover detail panel
*/

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n).toLocaleString();
  return "$" + Math.round(n);
}

var recoverabilityBadges = {
  "paga": { label: "PAGA", color: "#2c3e3a" },
  "class": { label: "CLASS", color: "#1a5276" },
  "both": { label: "BOTH", color: "#198754" },
  "disputed": { label: "DISPUTED", color: "#8B0000" },
};

export default function DemandWaterfall({ items, empCount, ppCount }) {
  var [hoveredSeg, setHoveredSeg] = useState(-1);

  if (!items || items.length === 0) return null;

  var plaintiffTotal = items.reduce(function (s, item) {
    return s + empCount * ppCount * item.plaintiffRate;
  }, 0);

  var correctTotal = items.reduce(function (s, item) {
    return s + empCount * ppCount * item.rate;
  }, 0);

  if (plaintiffTotal <= 0) return null;

  var reduction = plaintiffTotal - correctTotal;
  var pctReduction = Math.round((reduction / plaintiffTotal) * 100);

  // Build waterfall segments with enhanced data
  var segments = [];
  segments.push({
    label: "Plaintiff's\nDemand",
    value: plaintiffTotal,
    running: plaintiffTotal,
    type: "total",
    color: "#dc3545",
    cite: "",
    recoverability: "",
    pctOfTotal: 100,
  });

  var running = plaintiffTotal;
  items.forEach(function (item) {
    var diff = empCount * ppCount * (item.plaintiffRate - item.rate);
    if (diff > 0) {
      running -= diff;
      segments.push({
        label: item.name.replace(/ /g, "\n").substring(0, 24),
        fullName: item.name,
        value: -diff,
        running: running,
        type: "drop",
        color: "#CC8800",
        cite: item.cite || "",
        recoverability: item.recoverability || "disputed",
        pctOfTotal: Math.round((diff / plaintiffTotal) * 100),
        reason: item.reason || "Non-recoverable through PAGA per statutory classification",
      });
    }
  });

  segments.push({
    label: "PAGA-\nAuthorized",
    value: correctTotal,
    running: correctTotal,
    type: "total",
    color: "#198754",
    cite: "§ 2699(f)(2)",
    recoverability: "paga",
    pctOfTotal: Math.round((correctTotal / plaintiffTotal) * 100),
  });

  // SVG dimensions
  var w = 620;
  var h = 250;
  var padL = 12;
  var padR = 12;
  var padT = 30;
  var padB = 60;
  var chartW = w - padL - padR;
  var chartH = h - padT - padB;
  var barW = Math.min(65, chartW / segments.length - 14);
  var maxVal = plaintiffTotal;

  function yScale(val) {
    return padT + chartH - (val / maxVal) * chartH;
  }

  return (
    <div style={{
      padding: "20px 16px 16px",
      background: "#fafafa",
      border: "1px solid #eee",
      marginBottom: 16,
    }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 4 }}>
        Demand Deflation
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#888", marginBottom: 12, lineHeight: 1.5 }}>
        Each deduction represents a non-recoverable or misclassified category in the plaintiff's demand. Hover any bar for detail.
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          {/* Baseline */}
          <line x1={padL} y1={padT + chartH} x2={w - padR} y2={padT + chartH} stroke="#e0e0e0" strokeWidth={1} />

          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1.0].map(function (pct) {
            var gy = yScale(maxVal * pct);
            return (
              <g key={pct}>
                <line x1={padL} y1={gy} x2={w - padR} y2={gy} stroke="#f0f0f0" strokeWidth={0.5} />
                <text x={padL - 2} y={gy + 3} textAnchor="end"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#ddd" }}>
                  {fmt(maxVal * pct)}
                </text>
              </g>
            );
          })}

          {segments.map(function (seg, i) {
            var x = padL + i * (chartW / segments.length) + (chartW / segments.length - barW) / 2;
            var barTop, barBottom, barHeight;
            var isHovered = hoveredSeg === i;

            if (seg.type === "total") {
              barTop = yScale(seg.value);
              barBottom = padT + chartH;
              barHeight = barBottom - barTop;
            } else {
              barTop = yScale(seg.running - seg.value);
              barBottom = yScale(seg.running);
              barHeight = barBottom - barTop;
            }

            var lines = seg.label.split("\n");

            return (
              <g key={i}
                onMouseEnter={function () { setHoveredSeg(i); }}
                onMouseLeave={function () { setHoveredSeg(-1); }}
                style={{ cursor: "pointer" }}>

                {/* Bar */}
                <rect x={x} y={Math.min(barTop, barBottom)} width={barW} height={Math.abs(barHeight)} rx={2}
                  fill={isHovered ? seg.color + "50" : seg.color + "30"}
                  stroke={seg.color} strokeWidth={isHovered ? 1.5 : 1} />

                {/* Value label */}
                <text x={x + barW / 2} y={Math.min(barTop, barBottom) - 8} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: seg.color }}>
                  {seg.type === "drop" ? "−" + fmt(Math.abs(seg.value)) : fmt(seg.value)}
                </text>

                {/* Percentage badge */}
                {seg.type === "drop" && (
                  <text x={x + barW / 2} y={Math.min(barTop, barBottom) - 18} textAnchor="middle"
                    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#999" }}>
                    {seg.pctOfTotal}% of demand
                  </text>
                )}

                {/* Connector line to next bar */}
                {i < segments.length - 1 && seg.type !== "total" && (
                  <line x1={x + barW} y1={yScale(seg.running)} x2={x + (chartW / segments.length)} y2={yScale(seg.running)}
                    stroke="#ddd" strokeWidth={1} strokeDasharray="3 2" />
                )}

                {/* Category label */}
                {lines.map(function (line, j) {
                  return (
                    <text key={j} x={x + barW / 2} y={padT + chartH + 14 + j * 10} textAnchor="middle"
                      style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: isHovered ? "#333" : "#888" }}>
                      {line}
                    </text>
                  );
                })}

                {/* Statutory citation */}
                {seg.cite && (
                  <text x={x + barW / 2} y={padT + chartH + 14 + lines.length * 10 + 2} textAnchor="middle"
                    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 6, fill: "#bbb" }}>
                    {seg.cite}
                  </text>
                )}
              </g>
            );
          })}

          {/* Running total line */}
          {segments.length > 2 && (
            <polyline
              points={segments.map(function (seg, i) {
                var x = padL + i * (chartW / segments.length) + (chartW / segments.length) / 2;
                return x + "," + yScale(seg.running);
              }).join(" ")}
              fill="none" stroke="#2c3e3a" strokeWidth={1.5} strokeDasharray="4 2" opacity={0.4}
            />
          )}
        </svg>
      </div>

      {/* Hover detail panel */}
      {hoveredSeg > 0 && hoveredSeg < segments.length - 1 && segments[hoveredSeg] && (
        <div style={{
          marginTop: 4,
          padding: "8px 12px",
          background: "#fff",
          border: "1px solid #e0e0e0",
          borderLeft: "3px solid #CC8800",
          fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#CC8800", marginBottom: 2 }}>
            {segments[hoveredSeg].fullName || segments[hoveredSeg].label.replace("\n", " ")}
          </div>
          {segments[hoveredSeg].cite && (
            <div style={{ fontSize: 9, color: "#999", marginBottom: 4 }}>{segments[hoveredSeg].cite}</div>
          )}
          <div style={{ fontSize: 10, color: "#555", lineHeight: 1.5 }}>
            {segments[hoveredSeg].reason}
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 8, flexWrap: "wrap" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>Total Deflation</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#198754" }}>{fmt(reduction)}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>Demand Inflated By</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#dc3545" }}>{pctReduction}%</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>{empCount} Emp × {ppCount} PP</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#2c3e3a" }}>{fmt(correctTotal)}</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999" }}>PAGA-Authorized</div>
        </div>
      </div>
    </div>
  );
}
