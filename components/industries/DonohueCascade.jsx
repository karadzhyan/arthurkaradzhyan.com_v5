"use client";

export default function DonohueCascade() {
  var stages = [
    {
      label: "Triggering Event",
      color: "#dc3545",
      title: "Short Meal Punch in Time-Clock Data",
      detail: "Employee clocks out at 12:00 PM, clocks back in at 12:22 PM — an 8-minute shortfall from the required 30-minute uninterrupted meal period.",
      legal: "Under Donohue v. AMN Services (2021), time records showing a meal period of less than 30 minutes create a rebuttable presumption that the employer failed to provide a compliant meal period."
    },
    {
      label: "Presumption Attaches",
      color: "#CC8800",
      title: "Donohue Rebuttable Presumption",
      detail: "The employer must now affirmatively prove that the meal period was provided — not merely that the opportunity existed. Evidence must show the employee was relieved of all duties and voluntarily chose to shorten the break.",
      legal: "The Brinker 'provide not ensure' framework creates a defense, but the burden shifts to the employer. Without electronic attestation capturing the reason for the short punch, rebutting the presumption is extremely difficult."
    },
    {
      label: "Primary Violation",
      color: "#b85c00",
      title: "Meal Period Premium — § 226.7",
      detail: "One additional hour of pay at the employee's regular rate (not base rate — Ferra v. Loews) for each workday the meal period was not provided.",
      penalty: "Per-employee, per-violation premium. At $25/hr regular rate: $25 per short meal punch."
    },
    {
      label: "Derivative #1",
      color: "#4a7a6f",
      title: "Wage Statement Violation — § 226(a)",
      detail: "The premium was not paid, so it does not appear on the wage statement. Under Naranjo v. Spectrum Security Services (2022), the unpaid premium renders the wage statement inaccurate — a derivative § 226(a) violation.",
      penalty: "$50 for the initial pay period, $100 for each subsequent pay period (up to $4,000 per employee)."
    },
    {
      label: "Derivative #2",
      color: "#2c3e3a",
      title: "Waiting Time Penalty — § 203",
      detail: "If the employee separates from employment and the unpaid premium is not included in the final paycheck, § 203 waiting time penalties accrue at the employee's daily rate of pay for up to 30 calendar days.",
      penalty: "At $200/day: up to $6,000 per separated employee. Applies to every employee who departed with unpaid premiums."
    },
    {
      label: "PAGA Multiplier",
      color: "#444",
      title: "PAGA Civil Penalty — § 2699(f)",
      detail: "Each underlying violation generates a separate PAGA civil penalty: $100 for the initial violation, $200 for each subsequent violation, per employee per pay period. Three violation types (§ 226.7, § 226, § 203) create triple penalty stacking.",
      penalty: "75% to LWDA, 25% to aggrieved employees. The derivative cascade means one short meal punch generates 3 separate penalty streams."
    }
  ];

  return (
    <div className="donohue-cascade">
      <div className="donohue-cascade-label">The Derivative Penalty Cascade — One Short Meal Punch</div>
      <div className="donohue-cascade-steps">
        {stages.map(function (s, i) {
          return (
            <div key={i} className="donohue-step">
              <div className="donohue-step-marker">
                <div className="donohue-step-dot" style={{ background: s.color }} />
                {i < stages.length - 1 && <div className="donohue-step-line" />}
              </div>
              <div className="donohue-step-body">
                <div className="donohue-step-phase" style={{ color: s.color }}>{s.label}</div>
                <div className="donohue-step-title">{s.title}</div>
                <div className="donohue-step-detail">{s.detail}</div>
                {s.legal && <div className="donohue-step-legal">{s.legal}</div>}
                {s.penalty && <div className="donohue-step-penalty">{s.penalty}</div>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="donohue-cascade-summary">
        <div className="donohue-summary-label">Aggregate Exposure — Per Short Meal Punch</div>
        <div className="donohue-summary-items">
          <div className="donohue-summary-item">
            <div className="donohue-summary-num">3</div>
            <div className="donohue-summary-desc">Separate violation types from one triggering event</div>
          </div>
          <div className="donohue-summary-item">
            <div className="donohue-summary-num">3×</div>
            <div className="donohue-summary-desc">PAGA penalty streams (§ 226.7 + § 226 + § 203)</div>
          </div>
          <div className="donohue-summary-item">
            <div className="donohue-summary-num">$6K+</div>
            <div className="donohue-summary-desc">Maximum § 203 exposure per separated employee</div>
          </div>
        </div>
      </div>
    </div>
  );
}
