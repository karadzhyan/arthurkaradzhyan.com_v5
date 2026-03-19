"use client";

export default function PieceRateBreakdown() {
  var example = {
    worker: "Field Worker — Harvest Crew",
    shift: "10-hour shift",
    piecesHarvested: 85,
    ratePerPiece: "$2.50",
    totalPieceRate: "$212.50",
    actualHours: 10,
    restPeriods: 2,
    restMinutes: 20,
    nonProductiveMinutes: 40
  };

  var pieceEarnings = 212.50;
  var hoursWorked = 10;
  var restHours = 20 / 60;
  var npHours = 40 / 60;
  var productiveHours = hoursWorked - restHours - npHours;
  var regularRate = pieceEarnings / productiveHours;
  var restPay = regularRate * restHours;
  var npPay = 16.50 * npHours; // min wage
  var totalComp = pieceEarnings + restPay + npPay;

  var steps = [
    {
      label: "Piece-Rate Earnings",
      formula: "85 pieces × $2.50/piece",
      result: "$" + pieceEarnings.toFixed(2),
      note: "Gross piece-rate compensation for productive work",
      color: "#2c3e3a"
    },
    {
      label: "Productive Hours",
      formula: hoursWorked + " hrs − " + (restHours).toFixed(2) + " hrs rest − " + (npHours).toFixed(2) + " hrs NP",
      result: productiveHours.toFixed(2) + " hrs",
      note: "Hours actually spent on piece-rate productive work",
      color: "#4a7a6f"
    },
    {
      label: "Regular Rate (for rest period pay)",
      formula: "$" + pieceEarnings.toFixed(2) + " ÷ " + productiveHours.toFixed(2) + " hrs",
      result: "$" + regularRate.toFixed(2) + "/hr",
      note: "§ 226.2 requires rest period pay at this rate — NOT minimum wage",
      color: "#CC8800"
    },
    {
      label: "Rest Period Compensation",
      formula: "$" + regularRate.toFixed(2) + " × " + restHours.toFixed(2) + " hrs",
      result: "$" + restPay.toFixed(2),
      note: "Separately calculated, separately identified on wage statement",
      color: "#CC8800"
    },
    {
      label: "Non-Productive Time Compensation",
      formula: "$16.50 (min wage) × " + npHours.toFixed(2) + " hrs",
      result: "$" + npPay.toFixed(2),
      note: "Waiting time, equipment transport, crew meetings — at minimum wage floor",
      color: "#8aa39e"
    },
    {
      label: "Total Required Compensation",
      formula: "$" + pieceEarnings.toFixed(2) + " + $" + restPay.toFixed(2) + " + $" + npPay.toFixed(2),
      result: "$" + totalComp.toFixed(2),
      note: "Three separate components — all must appear on the wage statement",
      color: "#dc3545"
    }
  ];

  var legacyPay = pieceEarnings;
  var shortfall = totalComp - legacyPay;

  return (
    <div className="piece-rate-breakdown">
      <div className="piece-rate-label">§ 226.2 Piece-Rate Calculation — Step by Step</div>
      <div className="piece-rate-example">
        <div className="piece-rate-example-label">Example: {example.worker} — {example.shift}</div>
        <div className="piece-rate-example-meta">
          {example.piecesHarvested} pieces × {example.ratePerPiece}/piece · {example.restPeriods} rest periods ({example.restMinutes} min) · {example.nonProductiveMinutes} min non-productive time
        </div>
      </div>
      <div className="piece-rate-steps">
        {steps.map(function (s, i) {
          var isTotal = i === steps.length - 1;
          return (
            <div key={i} className={"piece-rate-step" + (isTotal ? " piece-rate-total" : "")} style={{ borderLeftColor: s.color }}>
              <div className="piece-rate-step-label" style={{ color: s.color }}>{s.label}</div>
              <div className="piece-rate-step-calc">
                <span className="piece-rate-formula">{s.formula}</span>
                <span className="piece-rate-equals">=</span>
                <span className="piece-rate-result" style={{ color: s.color }}>{s.result}</span>
              </div>
              <div className="piece-rate-step-note">{s.note}</div>
            </div>
          );
        })}
      </div>
      <div className="piece-rate-gap">
        <div className="piece-rate-gap-label">Legacy Payroll Gap</div>
        <div className="piece-rate-gap-row">
          <div className="piece-rate-gap-item">
            <div className="piece-rate-gap-num">${legacyPay.toFixed(2)}</div>
            <div className="piece-rate-gap-desc">Legacy pay (piece-rate only)</div>
          </div>
          <div className="piece-rate-gap-item">
            <div className="piece-rate-gap-num">${totalComp.toFixed(2)}</div>
            <div className="piece-rate-gap-desc">§ 226.2 compliant pay</div>
          </div>
          <div className="piece-rate-gap-item">
            <div className="piece-rate-gap-num" style={{ color: "#dc3545" }}>${shortfall.toFixed(2)}</div>
            <div className="piece-rate-gap-desc">Per-shift underpayment</div>
          </div>
        </div>
        <div className="piece-rate-gap-note">
          This per-shift shortfall compounds across every piece-rate employee, every shift, every pay period. For a crew of 100 workers over 2 years: approximately ${(shortfall * 500 * 100).toLocaleString()} in unpaid compensation — before PAGA penalties or wage statement violations.
        </div>
      </div>
    </div>
  );
}
