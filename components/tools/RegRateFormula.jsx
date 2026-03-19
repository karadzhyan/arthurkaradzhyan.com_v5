"use client";
import { useEffect, useRef, useState } from "react";

export default function RegRateFormula() {
  var ref = useRef(null);
  var [visible, setVisible] = useState(false);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  /* layout constants */
  var W = 620, H = 310;
  var cx = W / 2;

  /* colors */
  var cGreen = "#198754";
  var cPrimary = "#2c3e3a";
  var cRed = "#dc3545";
  var cGray = "#999";
  var cLight = "#e0e0e0";

  /* formula box dimensions */
  var fW = 380, fH = 110, fX = 40, fY = 24;
  var fracY = fY + 40;   /* numerator baseline */
  var barY = fY + 56;    /* fraction bar */
  var denY = fY + 78;    /* denominator baseline */

  /* "equals" and result */
  var eqX = fX + fW + 16;
  var resX = eqX + 28;
  var resW = 150;

  /* downstream boxes */
  var dsY = 180;
  var ds1X = 100, ds2X = 360;
  var dsW = 160, dsH = 100;

  return (
    <div
      ref={ref}
      style={{
        maxWidth: 660,
        margin: "0 auto 36px",
        padding: "0 16px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity .6s ease, transform .6s ease",
      }}
    >
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: "block" }}
        role="img"
        aria-label="Regular rate calculation formula diagram showing how base pay plus non-discretionary compensation divided by total hours produces the regular rate, which then determines overtime and meal/rest premium rates under Ferra">
        {/* ═══ FORMULA BOX ═══ */}
        <rect x={fX} y={fY} width={fW} height={fH} rx={4}
          fill="#f9faf9" stroke={cPrimary + "30"} strokeWidth={1} />

        {/* label */}
        <text x={fX + 12} y={fY + 14}
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill={cPrimary} textTransform="uppercase">
          REGULAR RATE FORMULA
        </text>

        {/* numerator */}
        <text x={fX + fW / 2} y={fracY} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={11} fill="#333">
          <tspan fontWeight={600}>Base Pay</tspan>
          <tspan dx={6} fill={cGreen}>+</tspan>
          <tspan dx={6} fill={cGreen} fontWeight={600}>Commission</tspan>
          <tspan dx={6} fill={cGreen}>+</tspan>
          <tspan dx={6} fill={cGreen} fontWeight={600}>Bonus</tspan>
          <tspan dx={6} fill={cGreen}>+</tspan>
          <tspan dx={6} fill={cGreen} fontWeight={600}>Piece Rate</tspan>
        </text>

        <text x={fX + fW / 2} y={fracY + 14} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={11} fill={cGreen}>
          <tspan fontWeight={600}>+ Shift Diff</tspan>
          <tspan dx={6}>+</tspan>
          <tspan dx={6} fontWeight={600}>Service Charges</tspan>
        </text>

        {/* fraction bar */}
        <line x1={fX + 20} y1={barY} x2={fX + fW - 20} y2={barY}
          stroke={cPrimary} strokeWidth={2} />

        {/* denominator */}
        <text x={fX + fW / 2} y={denY} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={12} fontWeight={600} fill="#333">
          Total Hours Worked
        </text>
        <text x={fX + fW / 2} y={denY + 14} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill={cGray}>
          Alvarado: non-OT hours for flat-sum bonuses
        </text>

        {/* ═══ EQUALS SIGN ═══ */}
        <text x={eqX} y={barY + 5} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={22} fontWeight={300} fill={cGray}>
          =
        </text>

        {/* ═══ RESULT BOX ═══ */}
        <rect x={resX} y={fY + 16} width={resW} height={fH - 32} rx={4}
          fill={cPrimary} />
        <text x={resX + resW / 2} y={fY + 44} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={2} fill="#8aa39e">
          CORRECT
        </text>
        <text x={resX + resW / 2} y={fY + 62} textAnchor="middle"
          fontFamily="'Libre Baskerville',serif" fontSize={16} fontWeight={700} fill="#fff">
          Regular Rate
        </text>
        <text x={resX + resW / 2} y={fY + 78} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#8aa39e">
          ($/hr)
        </text>

        {/* ═══ CONNECTORS ═══ */}
        {/* center drop from result box */}
        <line x1={resX + resW / 2} y1={fY + fH - 16} x2={resX + resW / 2} y2={dsY - 30}
          stroke={cLight} strokeWidth={1.5} />
        {/* horizontal bar */}
        <line x1={ds1X + dsW / 2} y1={dsY - 30} x2={ds2X + dsW / 2} y2={dsY - 30}
          stroke={cLight} strokeWidth={1.5} />
        {/* drops to boxes */}
        <line x1={ds1X + dsW / 2} y1={dsY - 30} x2={ds1X + dsW / 2} y2={dsY}
          stroke={cLight} strokeWidth={1.5} />
        <line x1={ds2X + dsW / 2} y1={dsY - 30} x2={ds2X + dsW / 2} y2={dsY}
          stroke={cLight} strokeWidth={1.5} />
        {/* arrowheads */}
        {[ds1X + dsW / 2, ds2X + dsW / 2].map(function (ax) {
          return (
            <polygon key={ax}
              points={(ax - 4) + "," + (dsY - 1) + " " + (ax + 4) + "," + (dsY - 1) + " " + ax + "," + (dsY + 5)}
              fill={cLight} />
          );
        })}
        {/* branch dots */}
        {[ds1X + dsW / 2, ds2X + dsW / 2].map(function (dx) {
          return <circle key={dx} cx={dx} cy={dsY - 30} r={3} fill={cLight} />;
        })}

        {/* ═══ BOX 1 — OVERTIME RATE ═══ */}
        <rect x={ds1X} y={dsY} width={dsW} height={dsH} rx={4}
          fill="#fafafa" stroke={cPrimary + "30"} strokeWidth={1} />
        <rect x={ds1X} y={dsY} width={dsW} height={3} rx={1.5}
          fill={cPrimary} />
        <text x={ds1X + dsW / 2} y={dsY + 24} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill={cPrimary}>
          OVERTIME PREMIUM
        </text>
        <text x={ds1X + dsW / 2} y={dsY + 44} textAnchor="middle"
          fontFamily="'Libre Baskerville',serif" fontSize={14} fontWeight={700} fill="#333">
          1.5× Regular Rate
        </text>
        <text x={ds1X + dsW / 2} y={dsY + 62} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill={cGray}>
          Lab. Code § 510
        </text>
        <text x={ds1X + dsW / 2} y={dsY + 80} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#bbb" fontStyle="italic">
          Not base rate
        </text>

        {/* ═══ BOX 2 — FERRA PREMIUM ═══ */}
        <rect x={ds2X} y={dsY} width={dsW} height={dsH} rx={4}
          fill="#fafafa" stroke={cRed + "30"} strokeWidth={1} />
        <rect x={ds2X} y={dsY} width={dsW} height={3} rx={1.5}
          fill={cRed} />
        <text x={ds2X + dsW / 2} y={dsY + 24} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill={cRed}>
          MEAL / REST PREMIUM
        </text>
        <text x={ds2X + dsW / 2} y={dsY + 44} textAnchor="middle"
          fontFamily="'Libre Baskerville',serif" fontSize={14} fontWeight={700} fill="#333">
          1× Regular Rate
        </text>
        <text x={ds2X + dsW / 2} y={dsY + 62} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill={cGray}>
          Ferra v. Loews (2021)
        </text>
        <text x={ds2X + dsW / 2} y={dsY + 80} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#bbb" fontStyle="italic">
          Not base rate
        </text>

        {/* ═══ FOOTER ═══ */}
        <text x={cx} y={H - 6} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#bbb" fontStyle="italic">
          Alvarado v. Dart Container (2018) 4 Cal.5th 542 · Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858
        </text>
      </svg>
    </div>
  );
}
