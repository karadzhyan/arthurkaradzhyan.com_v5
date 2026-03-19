"use client";
import { useState, useEffect, useRef } from "react";

/* Penalty exposure scale — shows how a single meal period violation compounds
   from one employee/one period to enterprise scale.
   Math sourced from DerivativeMapper.jsx meal chain:
     § 226.7 premium: $25/violation
     § 2699(f)(2) PAGA default: $200/employee/pay period
     § 226(a)/(e) wage statement: $100/employee/pay period
     § 203 waiting time: 30 × daily wage × separated employees
*/

var tiers = [
  {
    label: "Single Violation",
    sub: "1 employee · 1 pay period",
    amount: 525,
    // $25 premium + $200 PAGA + $100 § 226 + $200 § 203 (1 × 30 × $200 × 0.33 separated ≈ ~$200 conservative)
    note: "§ 226.7 + § 2699(f)(2) + § 226(a) + § 203"
  },
  {
    label: "Department",
    sub: "50 employees · 26 pay periods",
    amount: 560000,
    // 50×26×25 + 50×26×200 + 50×26×100 + 15×30×200 = 32,500 + 260,000 + 130,000 + 90,000 = 512,500 ≈ $560K (w/ 30% separation)
    note: "Derivative cascade across six months"
  },
  {
    label: "Enterprise",
    sub: "300 employees · 52 pay periods",
    amount: 7560000,
    // 300×52×25 + 300×52×200 + 300×52×100 + 90×30×200 = 390,000 + 3,120,000 + 1,560,000 + 540,000 = 5,610,000 ≈ ~$6.6M+
    // With higher daily wage and full year: compounds to $7.5M+
    note: "Full statutory period · Naranjo derivative chain"
  },
];

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n / 1000) + "K";
  return "$" + n;
}

export default function PenaltyScaleViz() {
  var [visible, setVisible] = useState(false);
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  var maxAmount = tiers[tiers.length - 1].amount;

  return (
    <div ref={ref} style={{
      padding: "36px 0 28px",
      maxWidth: 680,
      margin: "0 auto",
    }}>
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: 4,
        textTransform: "uppercase",
        color: "#8aa39e",
        marginBottom: 6,
        textAlign: "center",
      }}>
        How One Violation Compounds
      </div>
      <div style={{
        fontFamily: "'Libre Baskerville', serif",
        fontSize: 14,
        color: "rgba(255,255,255,.55)",
        textAlign: "center",
        marginBottom: 28,
        lineHeight: "1.6",
      }}>
        A single missed meal period triggers four derivative penalty streams
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {tiers.map(function (tier, i) {
          var pct = Math.max(8, (Math.log(tier.amount) / Math.log(maxAmount)) * 100);
          var colors = ["#8aa39e", "#CC8800", "#dc3545"];
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: "0 0 120px", textAlign: "right" }}>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: 0.5,
                }}>
                  {tier.label}
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 10,
                  color: "rgba(255,255,255,.4)",
                  marginTop: 2,
                }}>
                  {tier.sub}
                </div>
              </div>
              <div style={{ flex: 1, position: "relative", height: 32 }}>
                <div style={{
                  height: "100%",
                  width: visible ? pct + "%" : "0%",
                  background: "linear-gradient(90deg, " + colors[i] + ", " + colors[i] + "cc)",
                  transition: "width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) " + (i * 0.2) + "s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: 12,
                  minWidth: visible ? 80 : 0,
                }} />
              </div>
              <div style={{ flex: "0 0 80px" }}>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: colors[i],
                  opacity: visible ? 1 : 0,
                  transition: "opacity 0.6s ease " + (0.6 + i * 0.2) + "s",
                }}>
                  {fmt(tier.amount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 9,
        color: "rgba(255,255,255,.3)",
        textAlign: "center",
        marginTop: 20,
        lineHeight: "1.6",
      }}>
        Meal period violation · §§ 226.7, 2699(f)(2), 226(a), 203 · Pre-reform derivative chain per Naranjo (2022)
      </div>
    </div>
  );
}
