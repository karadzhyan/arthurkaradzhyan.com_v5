"use client";
import { useEffect, useRef, useState } from "react";

export default function NaranjoCascade() {
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

  /* ---- layout constants ---- */
  var W = 660, H = 400;
  var cx = W / 2;                       /* centre x */

  /* trigger box */
  var tW = 270, tH = 50, tX = cx - tW / 2, tY = 12;

  /* primary § 226.7 box */
  var pW = 350, pH = 68, pX = cx - pW / 2, pY = 86;

  /* branch geometry */
  var branchY = pY + pH + 20;           /* horizontal bar y */
  var boxY = branchY + 20;              /* top of penalty boxes */

  /* three penalty boxes */
  var bW = 190, bH = 142;
  var gap = (W - 3 * bW) / 4;
  var b1X = gap;
  var b2X = gap * 2 + bW;
  var b3X = gap * 3 + bW * 2;
  var b1cx = b1X + bW / 2;
  var b2cx = b2X + bW / 2;
  var b3cx = b3X + bW / 2;

  /* footer */
  var footY = boxY + bH + 14;

  /* ---- colours (from DerivativeMapper) ---- */
  var cTrigger = "#dc3545";
  var cWage    = "#CC8800";
  var cPaga    = "#2c3e3a";
  var cStmt    = "#dc3545";
  var cWait    = "#8B0000";
  var cLine    = "#c8c8c8";

  /* ---- helpers ---- */
  function Badge(props) {
    return (
      <g>
        <rect
          x={props.x} y={props.y} width={props.w} height={16} rx={2}
          fill={props.bg} stroke={props.border} strokeWidth={0.5}
        />
        <text
          x={props.x + props.w / 2} y={props.y + 11}
          textAnchor="middle" fontFamily="'Outfit',sans-serif"
          fontSize={7.5} fontWeight={600} letterSpacing={1.2}
          fill={props.color}
        >
          {props.label}
        </text>
      </g>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        maxWidth: 700,
        margin: "0 auto 36px",
        padding: "0 16px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity .6s ease, transform .6s ease",
      }}
    >
      <svg
        viewBox={"0 0 " + W + " " + (footY + 28)}
        width="100%"
        style={{ display: "block" }}
        role="img"
        aria-label="Naranjo derivative cascade diagram — one missed meal period violation generates four separate liability streams through PAGA penalty, wage statement, and waiting time derivatives"
      >
        {/* ══════ TRIGGER BOX ══════ */}
        <rect x={tX} y={tY} width={tW} height={tH} rx={4}
          fill="#fdf2f2" stroke="#e8d0d0" strokeWidth={1} />
        <text x={cx} y={tY + 18} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={3} fill={cTrigger}>
          TRIGGERING EVENT
        </text>
        <text x={cx} y={tY + 38} textAnchor="middle"
          fontFamily="'Libre Baskerville',serif" fontSize={13} fontWeight={700}
          fill="#333">
          Missed Meal Period
        </text>

        {/* ── connector: trigger → primary ── */}
        <line x1={cx} y1={tY + tH} x2={cx} y2={pY}
          stroke={cLine} strokeWidth={1.5} />
        <polygon
          points={(cx - 4) + "," + (pY - 1) + " " + (cx + 4) + "," + (pY - 1) + " " + cx + "," + (pY + 5)}
          fill={cLine}
        />

        {/* ══════ PRIMARY § 226.7 BOX ══════ */}
        <rect x={pX} y={pY} width={pW} height={pH} rx={4}
          fill="#fffcf5" stroke={cWage + "60"} strokeWidth={1} />
        <rect x={pX} y={pY} width={4} height={pH} rx={2}
          fill={cWage} />

        <text x={pX + 18} y={pY + 22}
          fontFamily="'Outfit',sans-serif" fontSize={14} fontWeight={700}
          fill={cWage}>
          § 226.7
        </text>
        <Badge x={pX + 80} y={pY + 10} w={108} h={16}
          label="WAGE · NOT PAGA" bg="#fff8e0" border={cWage + "40"} color={cWage} />

        <text x={pX + 18} y={pY + 42}
          fontFamily="'Outfit',sans-serif" fontSize={11.5} fontWeight={600}
          fill="#333">
          Meal Period Premium
        </text>
        <text x={pX + 18} y={pY + 58}
          fontFamily="'Outfit',sans-serif" fontSize={10} fill="#888">
          1 hr at regular rate · per violation · triggers all derivatives below
        </text>

        {/* ── connector: primary → branch bar ── */}
        <line x1={cx} y1={pY + pH} x2={cx} y2={branchY}
          stroke={cLine} strokeWidth={1.5} />
        {/* horizontal bar */}
        <line x1={b1cx} y1={branchY} x2={b3cx} y2={branchY}
          stroke={cLine} strokeWidth={1.5} />
        {/* three drops */}
        <line x1={b1cx} y1={branchY} x2={b1cx} y2={boxY}
          stroke={cLine} strokeWidth={1.5} />
        <line x1={b2cx} y1={branchY} x2={b2cx} y2={boxY}
          stroke={cLine} strokeWidth={1.5} />
        <line x1={b3cx} y1={branchY} x2={b3cx} y2={boxY}
          stroke={cLine} strokeWidth={1.5} />
        {/* arrowheads */}
        {[b1cx, b2cx, b3cx].map(function (ax) {
          return (
            <polygon key={ax}
              points={(ax - 4) + "," + (boxY - 1) + " " + (ax + 4) + "," + (boxY - 1) + " " + ax + "," + (boxY + 5)}
              fill={cLine}
            />
          );
        })}
        {/* branch dots */}
        {[b1cx, b2cx, b3cx].map(function (dx) {
          return <circle key={dx} cx={dx} cy={branchY} r={3} fill={cLine} />;
        })}

        {/* ══════ BOX 1 — § 2699(f)(2) PAGA DEFAULT PENALTY ══════ */}
        <rect x={b1X} y={boxY} width={bW} height={bH} rx={4}
          fill="#f8faf9" stroke={cPaga + "40"} strokeWidth={1} />
        <rect x={b1X} y={boxY} width={bW} height={4} rx={2}
          fill={cPaga} />

        <Badge x={b1X + 10} y={boxY + 14} w={80}
          label="PAGA PENALTY" bg={cPaga + "15"} border={cPaga + "40"} color={cPaga} />

        <text x={b1cx} y={boxY + 50} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={13} fontWeight={700}
          fill={cPaga}>
          § 2699(f)(2)
        </text>
        <text x={b1cx} y={boxY + 68} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10.5} fontWeight={600}
          fill="#444">
          Default Penalty
        </text>
        <text x={b1cx} y={boxY + 88} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill="#888">
          $200 / employee
        </text>
        <text x={b1cx} y={boxY + 102} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill="#888">
          / pay period
        </text>
        <text x={b1cx} y={boxY + 124} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#aaa"
          fontStyle="italic">
          Directly recoverable
        </text>

        {/* ══════ BOX 2 — § 226(a)/(e) WAGE STATEMENT ══════ */}
        <rect x={b2X} y={boxY} width={bW} height={bH} rx={4}
          fill="#fdf6f6" stroke={cStmt + "30"} strokeWidth={1} />
        <rect x={b2X} y={boxY} width={bW} height={4} rx={2}
          fill={cStmt} />

        <Badge x={b2X + 10} y={boxY + 14} w={80}
          label="PAGA PENALTY" bg={cStmt + "12"} border={cStmt + "30"} color={cStmt} />

        <text x={b2cx} y={boxY + 50} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={13} fontWeight={700}
          fill={cStmt}>
          § 226(a)/(e)
        </text>
        <text x={b2cx} y={boxY + 68} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10.5} fontWeight={600}
          fill="#444">
          Wage Statement Violation
        </text>
        <text x={b2cx} y={boxY + 88} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill="#888">
          $100 / employee
        </text>
        <text x={b2cx} y={boxY + 102} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill="#888">
          / pay period
        </text>
        <text x={b2cx} y={boxY + 124} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#aaa"
          fontStyle="italic">
          Naranjo derivative
        </text>

        {/* ══════ BOX 3 — § 203 WAITING TIME ══════ */}
        <rect x={b3X} y={boxY} width={bW} height={bH} rx={4}
          fill="#fdf5f5" stroke={cWait + "30"} strokeWidth={1} />
        <rect x={b3X} y={boxY} width={bW} height={4} rx={2}
          fill={cWait} />

        <Badge x={b3X + 10} y={boxY + 14} w={80}
          label="PAGA PENALTY" bg={cWait + "12"} border={cWait + "30"} color={cWait} />

        <text x={b3cx} y={boxY + 50} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={13} fontWeight={700}
          fill={cWait}>
          § 203
        </text>
        <text x={b3cx} y={boxY + 68} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10.5} fontWeight={600}
          fill="#444">
          Waiting Time Penalty
        </text>
        <text x={b3cx} y={boxY + 88} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill="#888">
          Up to 30 days' wages
        </text>
        <text x={b3cx} y={boxY + 102} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill="#888">
          / separated employee
        </text>
        <text x={b3cx} y={boxY + 124} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#aaa"
          fontStyle="italic">
          Separated employees only
        </text>

        {/* ══════ FOOTER ANNOTATION ══════ */}
        <text x={cx} y={footY + 6} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9.5} fontWeight={500}
          fill="#999">
          One meal period violation generates four separate liability streams.
        </text>
        <text x={cx} y={footY + 22} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#bbb"
          fontStyle="italic">
          Naranjo v. Spectrum Security (2022) 13 Cal.5th 93
        </text>
      </svg>
    </div>
  );
}
