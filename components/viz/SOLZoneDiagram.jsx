"use client";

/*
  Statute of Limitations lookback zone diagram.
  Shows PAGA 1-year vs. underlying 3-year vs. UCL 4-year for each violation type.
  Props: noticeDate (string)
*/

var violations = [
  { name: "Meal/Rest Period", code: "§ 226.7", paga: 1, underlying: 3, ucl: 4, color: "#dc3545" },
  { name: "Overtime", code: "§ 510", paga: 1, underlying: 3, ucl: 4, color: "#CC8800" },
  { name: "Wage Statement", code: "§ 226", paga: 1, underlying: 1, ucl: null, color: "#2c3e3a" },
  { name: "Minimum Wage", code: "§ 1197.1", paga: 1, underlying: 3, ucl: 4, color: "#8B0000" },
  { name: "Final Pay", code: "§ 203", paga: 1, underlying: 3, ucl: null, color: "#8aa39e" },
  { name: "Expense Reimb.", code: "§ 2802", paga: 1, underlying: 3, ucl: 4, color: "#666" },
];

export default function SOLZoneDiagram({ noticeDate }) {
  var w = 620;
  var rowH = 32;
  var padL = 120;
  var padR = 30;
  var padT = 40;
  var h = padT + violations.length * (rowH + 6) + 40;
  var barW = w - padL - padR;
  var maxYears = 4;

  function yearToX(years) {
    return padL + (years / maxYears) * barW;
  }

  return (
    <div style={{
      padding: "20px 16px 16px",
      background: "#fafafa",
      border: "1px solid #eee",
      marginBottom: 16,
    }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 4 }}>
        Lookback Zones
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginBottom: 12, lineHeight: 1.5 }}>
        PAGA covers only 1 year. The underlying wage claim may cover 3 years. A plaintiff demanding 3 years of penalties is inflating by ~67%.
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          {/* Year markers */}
          {[0, 1, 2, 3, 4].map(function (yr) {
            var x = yearToX(yr);
            return (
              <g key={yr}>
                <line x1={x} y1={padT - 5} x2={x} y2={h - 30} stroke="#eee" strokeWidth={1} />
                <text x={x} y={padT - 12} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fill: "#999" }}>
                  {yr === 0 ? "Notice" : yr + " yr"}
                </text>
              </g>
            );
          })}

          {/* PAGA zone highlight */}
          <rect x={yearToX(0)} y={padT - 5} width={yearToX(1) - yearToX(0)} height={h - padT - 25}
            fill="#2c3e3a" fillOpacity={0.04} />
          <text x={yearToX(0.5)} y={h - 14} textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 600, fill: "#2c3e3a", letterSpacing: 1 }}>
            PAGA ZONE
          </text>

          {/* Violation rows */}
          {violations.map(function (v, i) {
            var y = padT + i * (rowH + 6);
            var pagaW = yearToX(v.paga) - padL;
            var underlyingW = yearToX(v.underlying) - padL;
            var uclW = v.ucl ? yearToX(v.ucl) - padL : 0;

            return (
              <g key={i}>
                {/* Label */}
                <text x={padL - 8} y={y + rowH / 2 + 1} textAnchor="end"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 600, fill: "#555" }}>
                  {v.name}
                </text>
                <text x={padL - 8} y={y + rowH / 2 + 11} textAnchor="end"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#bbb" }}>
                  {v.code}
                </text>

                {/* UCL bar (lightest, full width) */}
                {uclW > 0 && (
                  <rect x={padL} y={y + 4} width={uclW} height={rowH - 8} rx={3}
                    fill={v.color + "10"} stroke={v.color + "20"} strokeWidth={0.5} />
                )}

                {/* Underlying wage claim bar (medium) */}
                <rect x={padL} y={y + 4} width={underlyingW} height={rowH - 8} rx={3}
                  fill={v.color + "25"} stroke={v.color + "30"} strokeWidth={0.5} />

                {/* PAGA bar (darkest) */}
                <rect x={padL} y={y + 4} width={pagaW} height={rowH - 8} rx={3}
                  fill={v.color + "60"} stroke={v.color} strokeWidth={1} />
              </g>
            );
          })}

          {/* Legend */}
          <g>
            {[
              { label: "PAGA (1 yr)", opacity: "60" },
              { label: "Wage Claim (1-3 yr)", opacity: "25" },
              { label: "UCL (4 yr)", opacity: "10" },
            ].map(function (item, i) {
              var lx = padL + i * 120;
              return (
                <g key={i}>
                  <rect x={lx} y={h - 30} width={12} height={8} rx={1} fill={"#2c3e3a" + item.opacity} stroke="#2c3e3a30" strokeWidth={0.5} />
                  <text x={lx + 16} y={h - 23} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 8, fill: "#999" }}>
                    {item.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
