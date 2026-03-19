"use client";
import { useEffect, useRef, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

/*
  Pre- vs. Post-Reform PAGA penalty trajectory.
  Shows how the same violation pattern produces dramatically different
  exposure under pre-reform ($200 default, full stacking) vs. post-reform
  ($100 default, anti-stacking, penalty caps).

  Data: 50 employees, escalating pay periods (2→52), meal + rest violations
  at 35%/30% rates. Pre-reform uses $200 default; post-reform uses $100 + caps.
  Math mirrors PagaCalc.jsx exactly.
*/

function generateData() {
  var data = [];
  var employees = 50;
  var mealRate = 0.35;
  var restRate = 0.30;

  for (var pp = 2; pp <= 52; pp += 2) {
    // Pre-reform: $200 default penalty per category
    var preMeal = employees * pp * 200 * mealRate;
    var preRest = employees * pp * 200 * restRate;
    var preDerivative = employees * pp * 100 * 0.35; // Naranjo § 226 stacking
    var preTotal = Math.round(preMeal + preRest + preDerivative);

    // Post-reform: $100 default, anti-stacking reduces derivative by 75%
    var postMeal = employees * pp * 100 * mealRate;
    var postRest = employees * pp * 100 * restRate;
    var postDerivative = Math.round(employees * pp * 100 * 0.35 * 0.25); // § 2699(i)
    var postTotal = Math.round(postMeal + postRest + postDerivative);

    // With 15% cap
    var cappedTotal = Math.round(postTotal * 0.15);

    data.push({
      periods: pp,
      preReform: preTotal,
      postReform: postTotal,
      capped15: cappedTotal,
    });
  }
  return data;
}

var data = generateData();

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n / 1000) + "K";
  return "$" + n;
}

function CustomTooltip(props) {
  if (!props.active || !props.payload || !props.payload.length) return null;
  var d = props.payload[0].payload;
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e0e0e0",
      padding: "12px 16px",
      fontFamily: "'Outfit', sans-serif",
      minWidth: 200,
    }}>
      <div style={{ fontSize: 10, color: "#999", marginBottom: 8 }}>{d.periods} pay periods · 50 employees</div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "#dc3545" }}>Pre-Reform</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#dc3545" }}>{fmt(d.preReform)}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "#CC8800" }}>Post-Reform</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#CC8800" }}>{fmt(d.postReform)}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "#198754" }}>With 15% Cap</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#198754" }}>{fmt(d.capped15)}</span>
      </div>
    </div>
  );
}

export default function ReformTrajectoryChart() {
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

  var lastPoint = data[data.length - 1];

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
        Penalty Trajectory
      </div>
      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, color: "#333", marginBottom: 4 }}>
        Pre-Reform vs. Post-Reform Exposure
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginBottom: 20, lineHeight: 1.5 }}>
        Same violation pattern (meal + rest periods, 50 employees, 35%/30% violation rates) under three regulatory regimes. The 2024 reforms reduce the default penalty from $200 to $100 and limit derivative stacking.
      </div>

      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="preReformGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dc3545" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#dc3545" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="postReformGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CC8800" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#CC8800" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="cappedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#198754" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#198754" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="periods"
              tick={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fill: "#999" }}
              axisLine={{ stroke: "#e0e0e0" }}
              tickLine={false}
              label={{ value: "Pay Periods", position: "insideBottom", offset: -2, style: { fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#bbb" } }}
            />
            <YAxis
              tickFormatter={fmt}
              tick={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fill: "#999" }}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="preReform" stroke="#dc3545" strokeWidth={2} fill="url(#preReformGrad)" dot={false} />
            <Area type="monotone" dataKey="postReform" stroke="#CC8800" strokeWidth={2} fill="url(#postReformGrad)" dot={false} />
            <Area type="monotone" dataKey="capped15" stroke="#198754" strokeWidth={2} fill="url(#cappedGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend + endpoint values */}
      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 12, flexWrap: "wrap" }}>
        {[
          { label: "Pre-Reform ($200 default)", color: "#dc3545", value: lastPoint.preReform },
          { label: "Post-Reform ($100 default)", color: "#CC8800", value: lastPoint.postReform },
          { label: "Post-Reform + 15% Cap", color: "#198754", value: lastPoint.capped15 },
        ].map(function (item) {
          return (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 20, height: 2, background: item.color }} />
              <div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#666" }}>{item.label}: </span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700, color: item.color }}>{fmt(item.value)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
        AB 2288 / SB 92 (eff. June 19, 2024) · § 2699(f)(2) default penalty · § 2699(i) anti-stacking · § 2699(g)(1) 15% cap
      </div>
    </div>
  );
}
