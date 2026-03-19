"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, ReferenceLine } from "recharts";

/*
  Three-scenario comparison chart — deepened version.
  Additions:
  - Settlement zone band (25th-75th percentile of outcomes)
  - Per-employee exposure calculation
  - Mediation positioning note
  - Category-level breakdown in tooltip
  - Visual negotiation arrow between worst and best
*/

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M";
  if (n >= 1000) return "$" + Math.round(n).toLocaleString();
  return "$" + Math.round(n);
}

function CustomTooltip(props) {
  if (!props.active || !props.payload || !props.payload.length) return null;
  var d = props.payload[0].payload;
  return (
    <div style={{ background: "#fff", border: "1px solid #e0e0e0", padding: "12px 16px", fontFamily: "'Outfit', sans-serif", minWidth: 200 }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: d.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{d.name}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: d.color }}>{fmt(d.value)}</div>
      <div style={{ fontSize: 10, color: "#888", marginTop: 4, lineHeight: 1.6 }}>{d.desc}</div>
      {d.perEmployee && (
        <div style={{ fontSize: 10, color: "#2c3e3a", marginTop: 6, fontWeight: 600, borderTop: "1px solid #eee", paddingTop: 6 }}>
          Per employee: {fmt(d.perEmployee)}
        </div>
      )}
      {d.methodology && (
        <div style={{ fontSize: 9, color: "#999", marginTop: 4, lineHeight: 1.5, borderTop: "1px solid #eee", paddingTop: 4 }}>
          {d.methodology}
        </div>
      )}
    </div>
  );
}

export default function ScenarioComparisonChart({ worst, realistic, best, capRate, empCount }) {
  if (!worst || worst <= 0) return null;

  var employees = empCount || 50;

  // Settlement zone (25th-75th percentile estimate)
  var settlementLow = Math.round(best + (realistic - best) * 0.3);
  var settlementHigh = Math.round(realistic + (worst - realistic) * 0.25);

  var data = [
    {
      name: "Plaintiff Maximum",
      value: worst,
      color: "#dc3545",
      desc: "Full penalty demand at user-set violation rates",
      perEmployee: Math.round(worst / employees),
      methodology: "All violation categories × full penalty rate × no defense adjustments",
    },
    {
      name: "Data-Driven Realistic",
      value: realistic,
      color: "#1a5276",
      desc: "Violation rates reduced ~40% from user-set rates",
      perEmployee: Math.round(realistic / employees),
      methodology: "Accounts for employer defenses (Brinker, paid premiums, affirmative defenses) but not cap",
    },
    {
      name: "Defense Best Case",
      value: best,
      color: "#198754",
      desc: capRate !== "none" ? "With " + capRate + "% penalty cap applied" : "15% of total exposure",
      perEmployee: Math.round(best / employees),
      methodology: capRate !== "none" ? "Penalty cap per § 2699(" + (capRate === "15" ? "g" : "h") + ")(1) applied to post-reform amount" : "Aggressive defense position with all defenses successful",
    },
  ];

  var gap = worst - best;
  var pctReduction = Math.round((gap / worst) * 100);

  return (
    <div style={{
      padding: "20px 16px 16px",
      background: "#fafafa",
      border: "1px solid #eee",
      marginBottom: 16,
    }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 4 }}>
        Scenario Comparison
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#888", marginBottom: 12, lineHeight: 1.5 }}>
        Three-scenario exposure model. Settlement zone (shaded): {fmt(settlementLow)} – {fmt(settlementHigh)}.
      </div>

      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 20, left: 10, bottom: 8 }} layout="vertical">
            <XAxis type="number" tickFormatter={fmt} tick={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fill: "#999" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fill: "#666", fontWeight: 500 }} axisLine={false} tickLine={false} width={120} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(44,62,58,.04)" }} />
            {/* Settlement zone reference area */}
            <ReferenceLine x={settlementLow} stroke="#2c3e3a" strokeDasharray="4 2" strokeWidth={1} />
            <ReferenceLine x={settlementHigh} stroke="#2c3e3a" strokeDasharray="4 2" strokeWidth={1} />
            <Bar dataKey="value" radius={[0, 3, 3, 0]} maxBarSize={36}>
              {data.map(function (entry, index) {
                return <Cell key={index} fill={entry.color} />;
              })}
              <LabelList dataKey="value" position="right" formatter={fmt}
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, fill: "#333" }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Negotiation metrics */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 24,
        marginTop: 8,
        paddingTop: 12,
        borderTop: "1px solid #eee",
        flexWrap: "wrap",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>Negotiation Space</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#2c3e3a" }}>{fmt(gap)}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>Potential Reduction</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#198754" }}>{pctReduction}%</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>Settlement Zone</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#1a5276" }}>
            {fmt(settlementLow)} – {fmt(settlementHigh)}
          </div>
        </div>
      </div>

      {/* Mediation positioning note */}
      <div style={{
        marginTop: 12,
        padding: "8px 12px",
        background: "#fff",
        borderLeft: "3px solid #2c3e3a",
        fontFamily: "'Outfit', sans-serif",
        fontSize: 10,
        color: "#555",
        lineHeight: 1.6,
      }}>
        <span style={{ fontWeight: 600, color: "#2c3e3a" }}>Mediation Positioning:</span> Open at {fmt(best)} (defense best case). The data-driven realistic figure of {fmt(realistic)} represents the likely settlement anchor. Plaintiff's {fmt(worst)} demand is {pctReduction}% above your best case — document every reduction layer.
      </div>
    </div>
  );
}
