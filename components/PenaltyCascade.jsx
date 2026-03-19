"use client";

export default function PenaltyCascade() {
  var streams = [
    {
      statute: "§ 226.7",
      label: "Meal Period Premium",
      type: "Wage",
      color: "#2c3e3a",
      per: "1 hr × regular rate",
      note: "Per employee, per violation"
    },
    {
      statute: "§ 2699(f)(2)",
      label: "PAGA Default Penalty",
      type: "Penalty",
      color: "#CC8800",
      per: "$100 / $200",
      note: "First / subsequent violation"
    },
    {
      statute: "§ 226(e)",
      label: "Wage Statement Penalty",
      type: "Penalty",
      color: "#b85c00",
      per: "$50 / $100",
      note: "Premium omitted from pay stub"
    },
    {
      statute: "§ 203",
      label: "Waiting Time Penalty",
      type: "Penalty",
      color: "#dc3545",
      per: "Up to 30 days' wages",
      note: "Separated employees only"
    }
  ];

  return (
    <div className="cascade-wrap">
      <div className="cascade-trigger">
        <div className="cascade-trigger-icon">1</div>
        <div className="cascade-trigger-text">
          <div className="cascade-trigger-label">Triggering Violation</div>
          <div className="cascade-trigger-title">Missed Meal Period</div>
        </div>
      </div>

      <div className="cascade-connector">
        <div className="cascade-connector-line" />
        <div className="cascade-connector-branch" />
      </div>

      <div className="cascade-streams">
        {streams.map(function (s, i) {
          return (
            <div key={i} className="cascade-stream" style={{ borderLeftColor: s.color }}>
              <div className="cascade-stream-dot" style={{ background: s.color }} />
              <div className="cascade-stream-statute">{s.statute}</div>
              <div className="cascade-stream-label">{s.label}</div>
              <div className="cascade-stream-amount">{s.per}</div>
              <div className="cascade-stream-type" style={{
                color: s.type === "Wage" ? "#2c3e3a" : "#CC8800",
                borderColor: s.type === "Wage" ? "rgba(44,62,58,.2)" : "rgba(204,136,0,.2)",
                background: s.type === "Wage" ? "rgba(44,62,58,.06)" : "rgba(204,136,0,.06)"
              }}>{s.type}</div>
              <div className="cascade-stream-note">{s.note}</div>
            </div>
          );
        })}
      </div>

      <div className="cascade-total">
        <div className="cascade-total-label">Extrapolation</div>
        <div className="cascade-total-math">
          200 employees × 24 pay periods × 4 penalty streams
        </div>
        <div className="cascade-total-result">
          One violation category → <strong>19,200</strong> individual penalty calculations
        </div>
      </div>

      <div className="cascade-cite">
        Naranjo v. Spectrum Security (2022) 13 Cal.5th 93 · Ferra v. Loews (2021) 11 Cal.5th 858
      </div>
    </div>
  );
}
