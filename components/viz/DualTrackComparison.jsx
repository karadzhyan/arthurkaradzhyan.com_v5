"use client";
import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";

/*
  PAGA Penalties vs. Class Action Damages — same facts, different tracks.
  Shows why PAGA exposure is 3-8× class exposure for identical violations.
  Data mirrors PagaCalc.jsx dual-track model (50 employees, 26 periods).
*/

var data = [
  {
    track: "Class Action\nDamages",
    wages: 120000,     // 50 emp × 26 pp × avg $25 underpayment × 35% rate
    interest: 8400,    // 7% prejudgment interest
    waitingTime: 72000, // 30% separated × 50 × 30 days × $20/hr × 8
    fees: 66000,       // 33% lodestar
    total: 266400,
    color: "#1a5276",
  },
  {
    track: "PAGA Penalties\n(Post-Reform)",
    defaultPenalty: 227500,  // 50 × 26 × $100 × (35% meal + 30% rest)
    derivative: 11375,       // Naranjo stacking, reduced 75% by § 2699(i)
    wageStatement: 0,        // included in derivative
    total: 238875,
    color: "#2c3e3a",
  },
  {
    track: "PAGA Penalties\n(Pre-Reform)",
    defaultPenalty: 455000,  // 50 × 26 × $200 × (35% meal + 30% rest)
    derivative: 45500,       // Full Naranjo stacking
    wageStatement: 0,
    total: 500500,
    color: "#dc3545",
  },
];

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n / 1000) + "K";
  return "$" + n;
}

function CustomTooltip(props) {
  if (!props.active || !props.payload || !props.payload.length) return null;
  var d = props.payload[0].payload;
  return (
    <div style={{ background: "#fff", border: "1px solid #e0e0e0", padding: "12px 16px", fontFamily: "'Outfit', sans-serif", minWidth: 180 }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: d.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
        {d.track.replace("\n", " ")}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: d.color }}>{fmt(d.total)}</div>
      {d.wages !== undefined && (
        <div style={{ marginTop: 6, fontSize: 10, color: "#888", lineHeight: 1.6 }}>
          Wages owed: {fmt(d.wages)}<br />
          Prejudgment interest: {fmt(d.interest)}<br />
          § 203 waiting time: {fmt(d.waitingTime)}<br />
          Attorney fees (est.): {fmt(d.fees)}
        </div>
      )}
      {d.defaultPenalty !== undefined && (
        <div style={{ marginTop: 6, fontSize: 10, color: "#888", lineHeight: 1.6 }}>
          Default penalties: {fmt(d.defaultPenalty)}<br />
          Derivative (Naranjo): {fmt(d.derivative)}
        </div>
      )}
    </div>
  );
}

function CustomTick(props) {
  var lines = (props.payload.value || "").split("\n");
  return (
    <g transform={"translate(" + props.x + "," + props.y + ")"}>
      {lines.map(function (line, i) {
        return (
          <text key={i} x={0} y={i * 13} dy={10} textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fill: "#666", fontWeight: 500 }}>
            {line}
          </text>
        );
      })}
    </g>
  );
}

export default function DualTrackComparison() {
  var [visible, setVisible] = useState(false);
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

  return (
    <div ref={ref} style={{
      background: "#fff",
      border: "1px solid #e0e0e0",
      padding: "32px 24px 20px",
      position: "relative",
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #2c3e3a, #4a7a6f)" }} />

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 6 }}>
        Dual-Track Comparison
      </div>
      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, color: "#333", marginBottom: 4 }}>
        Same Violations, Different Exposure
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginBottom: 20, lineHeight: 1.5 }}>
        Identical meal and rest period violations (50 employees, 26 pay periods) generate fundamentally different exposure through class action wages vs. PAGA civil penalties. The penalty multiplier is a PAGA-specific phenomenon.
      </div>

      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 36 }}>
            <XAxis dataKey="track" tick={<CustomTick />} axisLine={{ stroke: "#e0e0e0" }} tickLine={false} interval={0} height={48} />
            <YAxis tickFormatter={fmt} tick={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fill: "#999" }} axisLine={false} tickLine={false} width={55} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(44,62,58,.04)" }} />
            <Bar dataKey="total" radius={[3, 3, 0, 0]} maxBarSize={72}>
              {data.map(function (entry, index) {
                return <Cell key={index} fill={entry.color} />;
              })}
              <LabelList dataKey="total" position="top" formatter={fmt}
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700, fill: "#333" }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Multiplier callout */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 24,
        marginTop: 8,
        padding: "12px 0",
        borderTop: "1px solid #eee",
        flexWrap: "wrap",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>Pre-Reform Multiplier</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: "#dc3545" }}>
            {(data[2].total / data[0].total).toFixed(1)}×
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999" }}>PAGA vs. Class</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>Post-Reform Multiplier</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: "#2c3e3a" }}>
            {(data[1].total / data[0].total).toFixed(1)}×
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999" }}>PAGA vs. Class</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>Reform Impact</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: "#198754" }}>
            {Math.round((1 - data[1].total / data[2].total) * 100)}%
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999" }}>Penalty Reduction</div>
        </div>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
        50 employees · 26 pay periods · Meal (35%) + Rest (30%) violations · Class damages per §§ 226.7, 1194 · PAGA per § 2699(f)(2)
      </div>
    </div>
  );
}
