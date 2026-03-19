"use client";

export default function PenaltyCascade() {
  var rr = 26.70;
  var employees = 200;
  var periods = 24;
  var violationRate = 0.40;
  var separatedPct = 0.35;
  var dailyWage = rr * 8;

  var instances = Math.round(employees * periods * violationRate);
  var separatedEmp = Math.round(employees * separatedPct);

  var streams = [
    {
      statute: "§ 226.7",
      label: "Meal Period Premium",
      type: "Wage",
      color: "#2c3e3a",
      per: "1 hr × regular rate",
      note: "Per employee, per violation",
      perUnit: rr,
      total: instances * rr,
      recoverable: false,
      recoverNote: "Wage — not a PAGA penalty (Kirby)"
    },
    {
      statute: "§ 2699(f)(2)",
      label: "PAGA Default Penalty",
      type: "Penalty",
      color: "#CC8800",
      per: "$100 / $200",
      note: "First / subsequent violation",
      perUnit: 200,
      total: employees * 100 + (instances - employees) * 200,
      recoverable: true,
      recoverNote: "Recoverable — civil penalty"
    },
    {
      statute: "§ 226(e)",
      label: "Wage Statement Penalty",
      type: "Penalty",
      color: "#b85c00",
      per: "$50 / $100",
      note: "Premium omitted from pay stub",
      perUnit: 100,
      total: Math.min(employees * 50 + (instances - employees) * 100, employees * 4000),
      recoverable: true,
      recoverNote: "Recoverable — capped at $4,000/employee"
    },
    {
      statute: "§ 203",
      label: "Waiting Time Penalty",
      type: "Penalty",
      color: "#dc3545",
      per: "Up to 30 days' wages",
      note: "Separated employees only",
      perUnit: dailyWage * 30,
      total: separatedEmp * dailyWage * 30,
      recoverable: true,
      recoverNote: "Recoverable for separated employees"
    }
  ];

  var totalAll = streams.reduce(function (s, st) { return s + st.total; }, 0);
  var totalRecoverable = streams.filter(function (s) { return s.recoverable; }).reduce(function (s, st) { return s + st.total; }, 0);
  var totalNotRecoverable = totalAll - totalRecoverable;
  var pctStripped = Math.round(totalNotRecoverable / totalAll * 100);

  function fmt(n) {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return "$" + Math.round(n / 1000) + "K";
    return "$" + Math.round(n);
  }

  return (
    <div className="cascade-wrap">
      <div className="cascade-assumptions">
        <div className="cascade-assumption">{employees} employees</div>
        <div className="cascade-assumption">{periods} pay periods</div>
        <div className="cascade-assumption">{Math.round(violationRate * 100)}% violation rate</div>
        <div className="cascade-assumption">${rr.toFixed(2)} regular rate</div>
        <div className="cascade-assumption">{Math.round(separatedPct * 100)}% separated</div>
      </div>

      <div className="cascade-trigger">
        <div className="cascade-trigger-icon">1</div>
        <div className="cascade-trigger-text">
          <div className="cascade-trigger-label">Triggering Violation</div>
          <div className="cascade-trigger-title">Missed Meal Period</div>
          <div className="cascade-trigger-math">{instances.toLocaleString()} violation instances ({employees} × {periods} × {Math.round(violationRate * 100)}%)</div>
        </div>
      </div>

      <div className="cascade-connector">
        <div className="cascade-connector-line" />
        <div className="cascade-connector-branch" />
      </div>

      <div className="cascade-streams">
        {streams.map(function (s, i) {
          var pctOfTotal = Math.round(s.total / totalAll * 100);
          return (
            <div key={i} className="cascade-stream" style={{ borderLeftColor: s.color }}>
              <div className="cascade-stream-dot" style={{ background: s.color }} />
              <div className="cascade-stream-statute">{s.statute}</div>
              <div className="cascade-stream-label">{s.label}</div>
              <div className="cascade-stream-amount">{s.per}</div>
              <div className="cascade-stream-dollar">{fmt(s.total)}</div>
              <div className="cascade-stream-pct">{pctOfTotal}% of total</div>
              <div className="cascade-stream-recover" style={{
                color: s.recoverable ? "#2c3e3a" : "#dc3545",
                background: s.recoverable ? "rgba(44,62,58,.06)" : "rgba(220,53,69,.06)"
              }}>
                {s.recoverNote}
              </div>
            </div>
          );
        })}
      </div>

      <div className="cascade-totals">
        <div className="cascade-totals-row">
          <div className="cascade-totals-label">Total Demand (All 4 Streams)</div>
          <div className="cascade-totals-val" style={{ color: "#dc3545" }}>{fmt(totalAll)}</div>
        </div>
        <div className="cascade-totals-row">
          <div className="cascade-totals-label">Non-Recoverable (Wage — Kirby/ZB, N.A.)</div>
          <div className="cascade-totals-val cascade-totals-strike">−{fmt(totalNotRecoverable)}</div>
        </div>
        <div className="cascade-totals-row cascade-totals-row-final">
          <div className="cascade-totals-label">Actual PAGA Penalty Exposure</div>
          <div className="cascade-totals-val" style={{ color: "#2c3e3a" }}>{fmt(totalRecoverable)}</div>
        </div>
        <div className="cascade-totals-pct">
          {pctStripped}% of plaintiff&apos;s calculation is not recoverable through PAGA
        </div>
      </div>

      <div className="cascade-cite">
        Naranjo v. Spectrum Security (2022) 13 Cal.5th 93 · Ferra v. Loews (2021) 11 Cal.5th 858 · Kirby v. Immoos (2012) 53 Cal.4th 1244
      </div>
    </div>
  );
}
