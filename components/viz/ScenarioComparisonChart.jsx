"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";

/*
  Three-scenario comparison chart for the PAGA Penalty Estimator.
  Reactive to the tool's calculated values — receives worst, realistic, best as props.
  Segmentation by violation category is visual shorthand; actual breakdown is in the tool.
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
    <div style={{ background: "#fff", border: "1px solid #e0e0e0", padding: "12px 16px", fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: d.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{d.name}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: d.color }}>{fmt(d.value)}</div>
      <div style={{ fontSize: 10, color: "#888", marginTop: 4 }}>{d.desc}</div>
    </div>
  );
}

export default function ScenarioComparisonChart({ worst, realistic, best, capRate }) {
  if (!worst || worst <= 0) return null;

  var data = [
    {
      name: "Plaintiff Maximum",
      value: worst,
      color: "#dc3545",
      desc: "Full penalty demand at user-set violation rates",
    },
    {
      name: "Data-Driven Realistic",
      value: realistic,
      color: "#1a5276",
      desc: "Violation rates reduced ~40% from user-set rates",
    },
    {
      name: "Defense Best Case",
      value: best,
      color: "#198754",
      desc: capRate !== "none" ? "With " + capRate + "% penalty cap applied" : "15% of total exposure",
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
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 12 }}>
        Scenario Comparison
      </div>

      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 20, left: 10, bottom: 8 }} layout="vertical">
            <XAxis type="number" tickFormatter={fmt} tick={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fill: "#999" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fill: "#666", fontWeight: 500 }} axisLine={false} tickLine={false} width={120} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(44,62,58,.04)" }} />
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

      {/* Negotiation space callout */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 32,
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
      </div>
    </div>
  );
}
