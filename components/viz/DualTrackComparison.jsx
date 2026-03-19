"use client";
import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, Legend } from "recharts";

/*
  PAGA Penalties vs. Class Action Damages — deepened version.
  Additions:
  - Stacked bars showing component breakdown (wages, interest, penalties, fees, derivatives)
  - Per-employee calculation display
  - Attorney fee comparison (class 33% lodestar vs. PAGA 20% allocation)
  - Employee share comparison (class 67% vs. PAGA 35%)
  - Detailed tooltip with full component breakdown
*/

var employees = 50;
var periods = 26;

var data = [
  {
    track: "Class Action\nDamages",
    wages: 120000,
    interest: 8400,
    waitingTime: 72000,
    fees: 66000,
    total: 266400,
    color: "#1a5276",
    employeeShare: 0.67,
    feeShare: 0.33,
    perEmployee: Math.round(266400 / 50),
  },
  {
    track: "PAGA Post-\nReform",
    defaultPenalty: 227500,
    derivative: 11375,
    wageStatement: 0,
    total: 238875,
    color: "#2c3e3a",
    employeeShare: 0.35,
    feeShare: 0.20,
    perEmployee: Math.round(238875 / 50),
  },
  {
    track: "PAGA Pre-\nReform",
    defaultPenalty: 455000,
    derivative: 45500,
    wageStatement: 0,
    total: 500500,
    color: "#dc3545",
    employeeShare: 0.35,
    feeShare: 0.20,
    perEmployee: Math.round(500500 / 50),
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
  var empPay = Math.round(d.total * d.employeeShare);
  var attFees = Math.round(d.total * d.feeShare);

  return (
    <div style={{ background: "#fff", border: "1px solid #e0e0e0", padding: "12px 16px", fontFamily: "'Outfit', sans-serif", minWidth: 220 }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: d.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
        {d.track.replace("\n", " ")}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: d.color, marginBottom: 8 }}>{fmt(d.total)}</div>

      {/* Component breakdown */}
      {d.wages !== undefined && (
        <div style={{ fontSize: 10, color: "#888", lineHeight: 1.8, borderTop: "1px solid #eee", paddingTop: 6, marginTop: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Wages owed (§§ 226.7, 1194)</span><span style={{ fontWeight: 600 }}>{fmt(d.wages)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Prejudgment interest (7%)</span><span style={{ fontWeight: 600 }}>{fmt(d.interest)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>§ 203 waiting time</span><span style={{ fontWeight: 600 }}>{fmt(d.waitingTime)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Attorney fees (33%)</span><span style={{ fontWeight: 600 }}>{fmt(d.fees)}</span></div>
        </div>
      )}
      {d.defaultPenalty !== undefined && (
        <div style={{ fontSize: 10, color: "#888", lineHeight: 1.8, borderTop: "1px solid #eee", paddingTop: 6, marginTop: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Default penalties (§ 2699(f)(2))</span><span style={{ fontWeight: 600 }}>{fmt(d.defaultPenalty)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Derivative (Naranjo stacking)</span><span style={{ fontWeight: 600 }}>{fmt(d.derivative)}</span></div>
        </div>
      )}

      {/* Distribution breakdown */}
      <div style={{ fontSize: 10, color: "#666", lineHeight: 1.8, borderTop: "1px solid #eee", paddingTop: 6, marginTop: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Employee share ({Math.round(d.employeeShare * 100)}%)</span>
          <span style={{ fontWeight: 700, color: "#198754" }}>{fmt(empPay)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Per employee</span>
          <span style={{ fontWeight: 700, color: "#2c3e3a" }}>{fmt(d.perEmployee)}</span>
        </div>
      </div>
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
        Identical meal and rest period violations ({employees} employees, {periods} pay periods) generate fundamentally different exposure. Hover for full component breakdown and distribution analysis.
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

      {/* Multiplier + per-employee callouts */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 20,
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
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>Per Employee (Post)</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: "#2c3e3a" }}>
            {fmt(data[1].perEmployee)}
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999" }}>× {employees} employees</div>
        </div>
      </div>

      {/* Employee share comparison */}
      <div style={{
        display: "flex",
        gap: 12,
        marginTop: 12,
        padding: "10px 0",
        borderTop: "1px solid #eee",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        <div style={{ flex: "1 1 200px", maxWidth: 260 }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, color: "#1a5276", letterSpacing: 1, marginBottom: 4 }}>CLASS ACTION DISTRIBUTION</div>
          <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: "67%", background: "#1a5276" }} />
            <div style={{ width: "33%", background: "#1a527640" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, color: "#1a5276" }}>Employees 67%</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, color: "#999" }}>Fees 33%</span>
          </div>
        </div>
        <div style={{ flex: "1 1 200px", maxWidth: 260 }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, color: "#2c3e3a", letterSpacing: 1, marginBottom: 4 }}>PAGA DISTRIBUTION (POST-REFORM)</div>
          <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: "35%", background: "#2c3e3a" }} />
            <div style={{ width: "65%", background: "#2c3e3a40" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, color: "#2c3e3a" }}>Employees 35%</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, color: "#999" }}>LWDA 65%</span>
          </div>
        </div>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
        {employees} employees · {periods} pay periods · Meal (35%) + Rest (30%) violations · Class per §§ 226.7, 1194 · PAGA per § 2699(f)(2) · Employee share per § 2699(i)(1)
      </div>
    </div>
  );
}
