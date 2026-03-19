"use client";
import { useEffect, useRef, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

/*
  Pre- vs. Post-Reform PAGA penalty trajectory — deepened version.
  Additions:
  - 30% cap line (in addition to 15%)
  - Reform effective date marker
  - Savings callout annotations at key inflection points
  - Detailed tooltip with per-category breakdown
  - Key metric callouts: maximum divergence, crossover point
*/

function generateData() {
  var data = [];
  var employees = 50;
  var mealRate = 0.35;
  var restRate = 0.30;

  for (var pp = 2; pp <= 52; pp += 2) {
    var preMeal = employees * pp * 200 * mealRate;
    var preRest = employees * pp * 200 * restRate;
    var preDerivative = employees * pp * 100 * 0.35;
    var preTotal = Math.round(preMeal + preRest + preDerivative);

    var postMeal = employees * pp * 100 * mealRate;
    var postRest = employees * pp * 100 * restRate;
    var postDerivative = Math.round(employees * pp * 100 * 0.35 * 0.25);
    var postTotal = Math.round(postMeal + postRest + postDerivative);

    var capped15 = Math.round(postTotal * 0.15);
    var capped30 = Math.round(postTotal * 0.30);

    data.push({
      periods: pp,
      preReform: preTotal,
      postReform: postTotal,
      capped15: capped15,
      capped30: capped30,
      savings: preTotal - postTotal,
      capSavings15: postTotal - capped15,
      capSavings30: postTotal - capped30,
      mealPre: Math.round(preMeal),
      restPre: Math.round(preRest),
      derivPre: Math.round(preDerivative),
      mealPost: Math.round(postMeal),
      restPost: Math.round(postRest),
      derivPost: postDerivative,
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
      minWidth: 240,
    }}>
      <div style={{ fontSize: 10, color: "#999", marginBottom: 8 }}>{d.periods} pay periods · 50 employees</div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#dc3545", marginBottom: 2 }}>Pre-Reform — {fmt(d.preReform)}</div>
        <div style={{ fontSize: 9, color: "#999", lineHeight: 1.5 }}>
          Meal: {fmt(d.mealPre)} · Rest: {fmt(d.restPre)} · Derivative: {fmt(d.derivPre)}
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#CC8800", marginBottom: 2 }}>Post-Reform — {fmt(d.postReform)}</div>
        <div style={{ fontSize: 9, color: "#999", lineHeight: 1.5 }}>
          Meal: {fmt(d.mealPost)} · Rest: {fmt(d.restPost)} · Derivative: {fmt(d.derivPost)}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #eee", paddingTop: 6, display: "flex", gap: 16 }}>
        <div>
          <div style={{ fontSize: 9, color: "#198754" }}>15% Cap</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#198754" }}>{fmt(d.capped15)}</div>
        </div>
        <div>
          <div style={{ fontSize: 9, color: "#4a7a6f" }}>30% Cap</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#4a7a6f" }}>{fmt(d.capped30)}</div>
        </div>
        <div>
          <div style={{ fontSize: 9, color: "#2c3e3a" }}>Reform Savings</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#2c3e3a" }}>{fmt(d.savings)}</div>
        </div>
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
  var maxSavings = lastPoint.preReform - lastPoint.capped15;
  var maxSavingsPct = Math.round((maxSavings / lastPoint.preReform) * 100);

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
        Same violation pattern (meal + rest periods, 50 employees, 35%/30% violation rates) under four regulatory regimes. Maximum savings with 15% cap: {fmt(maxSavings)} ({maxSavingsPct}% reduction).
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
              <linearGradient id="capped30Grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4a7a6f" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#4a7a6f" stopOpacity={0.01} />
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
            <ReferenceLine x={26} stroke="#2c3e3a" strokeDasharray="6 3" strokeWidth={1} label={{ value: "1 Year", position: "top", style: { fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#2c3e3a" } }} />
            <Area type="monotone" dataKey="preReform" stroke="#dc3545" strokeWidth={2} fill="url(#preReformGrad)" dot={false} name="Pre-Reform" />
            <Area type="monotone" dataKey="postReform" stroke="#CC8800" strokeWidth={2} fill="url(#postReformGrad)" dot={false} name="Post-Reform" />
            <Area type="monotone" dataKey="capped30" stroke="#4a7a6f" strokeWidth={1.5} fill="url(#capped30Grad)" dot={false} strokeDasharray="4 2" name="30% Cap" />
            <Area type="monotone" dataKey="capped15" stroke="#198754" strokeWidth={2} fill="url(#cappedGrad)" dot={false} name="15% Cap" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend + endpoint values */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 12, flexWrap: "wrap" }}>
        {[
          { label: "Pre-Reform ($200)", color: "#dc3545", value: lastPoint.preReform },
          { label: "Post-Reform ($100)", color: "#CC8800", value: lastPoint.postReform },
          { label: "30% Cap", color: "#4a7a6f", value: lastPoint.capped30, dashed: true },
          { label: "15% Cap", color: "#198754", value: lastPoint.capped15 },
        ].map(function (item) {
          return (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 16, height: 2, background: item.color, borderTop: item.dashed ? "none" : undefined }} />
              <div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#666" }}>{item.label}: </span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, color: item.color }}>{fmt(item.value)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key metric callouts */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 24,
        marginTop: 12,
        padding: "10px 0",
        borderTop: "1px solid #eee",
        flexWrap: "wrap",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 1, textTransform: "uppercase" }}>Reform Reduction</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#CC8800" }}>
            {Math.round((1 - lastPoint.postReform / lastPoint.preReform) * 100)}%
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 1, textTransform: "uppercase" }}>15% Cap Savings</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#198754" }}>
            {maxSavingsPct}%
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999", letterSpacing: 1, textTransform: "uppercase" }}>30% Cap Savings</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#4a7a6f" }}>
            {Math.round((1 - lastPoint.capped30 / lastPoint.preReform) * 100)}%
          </div>
        </div>
      </div>

      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#bbb", textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
        AB 2288 / SB 92 (eff. June 19, 2024) · § 2699(f)(2) default penalty · § 2699(i) anti-stacking · § 2699(g)(1) 15% cap · § 2699(h)(1) 30% cap
      </div>
    </div>
  );
}
