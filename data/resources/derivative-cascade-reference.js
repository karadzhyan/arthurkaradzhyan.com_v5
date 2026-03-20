export default {
  slug: "derivative-cascade-reference",
  title: "Derivative Cascade Reference",
  subtitle: "Naranjo Stacking — Pre- and Post-Reform",
  cardDesc: "Visual reference mapping how a single meal period violation generates up to four penalty streams. Pre-reform full cascade and post-reform § 2699(i) anti-stacking limitations.",
  metaDescription: "Reference guide to derivative penalty stacking under Naranjo v. Spectrum Security. Pre-reform four-stream cascade and post-reform anti-stacking under § 2699(i).",
  placeholder: false,

  statutoryContext: {
    paragraphs: [
      {label: "The Naranjo doctrine.", text: "In Naranjo v. Spectrum Security Services (2022) 13 Cal.5th 93, the California Supreme Court held that meal and rest period premiums under Labor Code § 226.7 are 'wages' — not penalties. This classification triggers derivative obligations: if premiums are wages, then failing to pay them is a wage violation that independently triggers wage statement penalties under § 226, waiting time penalties under § 203, and PAGA civil penalties on each derivative violation. One missed meal period generates up to four independent penalty streams."},
      {label: "The reform response.", text: "The 2024 PAGA reforms addressed derivative stacking through § 2699(i), which limits penalties to one per employee per pay period per violation. This anti-stacking provision does not eliminate derivative violations — it limits the PAGA penalty multiplier. The underlying wage obligations (premiums, wage statement corrections, waiting time) remain fully enforceable."},
    ]
  },

  sections: [
    {
      number: "01",
      label: "Pre-Reform Cascade — Four Streams",
      intro: "Before the 2024 reforms, a single meal period violation could generate four independent penalty streams. Understanding the pre-reform cascade is essential because it still applies to notices filed before June 19, 2024.",
      blocks: [
        {
          type: "accordion",
          title: "Stream 1 — Meal Period Premium (§ 226.7)",
          subsections: [
            {label: "Trigger", text: "Employer fails to provide a compliant meal period. Under Donohue, a time record showing a meal period shorter than 30 minutes creates a rebuttable presumption of non-compliance."},
            {label: "Remedy", text: "One hour of pay at the regular rate of compensation (Ferra). This is a wage — not a penalty — per Naranjo."},
            {label: "PAGA penalty", text: "$100 per employee per pay period (first violation); $200 per employee per pay period (subsequent violations). Pre-reform: stacking across all four streams."},
          ]
        },
        {
          type: "accordion",
          title: "Stream 2 — Wage Statement Violation (§ 226)",
          subsections: [
            {label: "Trigger", text: "Because the premium is a 'wage' (Naranjo), failing to pay it or reporting it incorrectly on the wage statement is a § 226(a) violation. The wage statement either omits the premium entirely or reports it at the wrong rate (base rate instead of regular rate under Ferra)."},
            {label: "Remedy", text: "Statutory penalties under § 226(e): $50 (first violation), $100 (subsequent violations) per employee per pay period. Plus actual damages. Requires 'knowing and intentional' — but a systemic payroll configuration error may satisfy this standard."},
            {label: "PAGA penalty", text: "Independently PAGA-actionable. A separate $100/$200 penalty per employee per pay period — in addition to the Stream 1 penalty."},
          ]
        },
        {
          type: "accordion",
          title: "Stream 3 — Waiting Time Penalties (§ 203)",
          subsections: [
            {label: "Trigger", text: "For departed employees only. If the premium is a 'wage' (Naranjo) and was not paid at termination, waiting time penalties accrue under § 203 — up to 30 days of the employee's daily wages."},
            {label: "Remedy", text: "Up to 30 days × daily wages. This is the most punitive derivative stream. For a $200/day employee, the maximum waiting time penalty is $6,000 — from a single missed meal period that would have cost $30 to pay."},
            {label: "PAGA penalty", text: "The waiting time penalty is itself PAGA-actionable if it arises from a Labor Code violation enforceable through PAGA. However, under ZB, N.A. v. Superior Court, the recoverability of PAGA penalties on certain derivative violations is limited."},
          ]
        },
        {
          type: "accordion",
          title: "Stream 4 — PAGA Civil Penalty on Each Stream (§ 2699(f))",
          subsections: [
            {label: "Trigger", text: "Each of the three underlying violations (premium, wage statement, waiting time) is independently PAGA-actionable, generating its own $100/$200 civil penalty per employee per pay period."},
            {label: "Pre-reform total", text: "One missed meal period generates: (1) the premium itself, (2) a § 226 penalty, (3) a § 203 penalty (for departed employees), and (4) PAGA civil penalties on streams 1, 2, and 3. The exposure multiplier from a single violation is 4–6×."},
          ]
        },
        {
          type: "danger-box",
          label: "Pre-reform exposure is enormous.",
          text: "For 50 employees over 26 pay periods with a 30% meal period violation rate, the pre-reform cascade produces: Stream 1 — $39,000 in premiums. Stream 2 — $39,000 in wage statement penalties. Stream 3 — waiting time for departed employees (variable). Stream 4 — $117,000+ in PAGA civil penalties across all streams. Total single-category exposure: $195,000+ from meal periods alone."
        },
      ]
    },

    {
      number: "02",
      label: "Post-Reform Anti-Stacking — § 2699(i)",
      intro: "Section 2699(i) limits PAGA penalties to one per employee per pay period per violation. This eliminates the penalty multiplier — but not the underlying wage obligations.",
      blocks: [
        {
          type: "calc-block",
          header: "Post-Reform — Same Scenario (50 Employees, 26 Periods, 30% Rate)",
          rows: [
            {label: "Employee-pay-period violations", value: "390"},
            {label: "PAGA penalty per violation (anti-stacked)", value: "$100"},
            {label: "Total PAGA penalties — meal period category", value: "$39,000"},
            {label: "No derivative penalty stacking", value: "$0"},
            {label: "Post-reform total penalties — single category", value: "$39,000", total: true},
          ]
        },
        {
          type: "calc-block",
          header: "Comparison — Pre-Reform vs. Post-Reform",
          rows: [
            {label: "Pre-reform (full cascade)", value: "$195,000+"},
            {label: "Post-reform (anti-stacked)", value: "$39,000"},
            {label: "Reduction", value: "$156,000+ (80%)", total: true},
          ]
        },
        {
          type: "info-box",
          label: "Anti-stacking does not eliminate underlying wages.",
          text: "The meal period premiums ($39,000 in wages) are still owed regardless of anti-stacking. The wage statement corrections are still required. The waiting time penalties for departed employees still apply. Anti-stacking limits the PAGA civil penalty layer — it does not limit the underlying wage and statutory penalty obligations."
        },
      ]
    },

    {
      number: "03",
      label: "Violation-by-Violation Cascade Maps",
      intro: "Each violation type has its own cascade pattern. Some generate more derivative streams than others.",
      blocks: [
        {
          type: "accordion",
          title: "Meal Period Violation — Full Cascade",
          subsections: [
            {label: "Primary violation", text: "§ 226.7 / § 512 — failure to provide compliant meal period."},
            {label: "Stream 1", text: "Premium: 1 hour at regular rate (Ferra). This is a 'wage' (Naranjo)."},
            {label: "Stream 2", text: "Wage statement: § 226(a) — unpaid premium → inaccurate wage statement."},
            {label: "Stream 3", text: "Waiting time: § 203 — unpaid premium at termination (departed employees only)."},
            {label: "Stream 4 (pre-reform)", text: "PAGA penalty on each stream independently."},
            {label: "Post-reform", text: "§ 2699(i) — one PAGA penalty per employee per pay period for the meal period violation category. Derivative PAGA penalties eliminated."},
          ]
        },
        {
          type: "accordion",
          title: "Overtime Underpayment — Cascade",
          subsections: [
            {label: "Primary violation", text: "§ 510 / § 1194 — underpayment of overtime (typically from regular rate error)."},
            {label: "Stream 1", text: "Wage underpayment: the difference between the correct and paid OT rate × OT hours."},
            {label: "Stream 2", text: "Wage statement: § 226(a) — incorrect hourly rate displayed → inaccurate statement."},
            {label: "Stream 3", text: "Waiting time: § 203 — underpaid wages at termination."},
            {label: "PAGA recoverability note", text: "Under ZB, N.A. v. Superior Court, overtime underpayments are wages — not civil penalties. The PAGA penalty on the overtime violation itself may be limited. But the derivative wage statement and waiting time violations generate independent PAGA penalties."},
          ]
        },
        {
          type: "accordion",
          title: "Wage Statement Deficiency — Cascade (No Underlying Wage Violation)",
          subsections: [
            {label: "Primary violation", text: "§ 226(a) — missing or incorrect element on wage statement, not caused by an underlying wage violation."},
            {label: "Derivative exposure", text: "Minimal. A standalone wage statement deficiency (e.g., missing employer address) generates § 226(e) penalties and a PAGA civil penalty but does not cascade into other violation categories."},
            {label: "Defense significance", text: "Distinguishing between standalone and derivative wage statement violations is critical for exposure modeling. A standalone deficiency is a single-stream penalty. A Naranjo-derivative deficiency is part of a multi-stream cascade."},
          ]
        },
      ]
    },

    {
      number: "04",
      label: "Defense Strategy — Anti-Stacking Arguments",
      intro: "Anti-stacking under § 2699(i) is the single most impactful reform provision for reducing PAGA exposure. These are the key arguments for maximizing its application.",
      blocks: [
        {
          type: "accordion",
          title: "Argument 1: One Penalty Per Underlying Conduct",
          text: "When multiple penalty streams arise from a single instance of underlying conduct (e.g., one missed meal period), § 2699(i) limits the total PAGA penalties to one per employee per pay period. The derivative violations are consequences of the same conduct — not independent violations warranting separate penalties."
        },
        {
          type: "accordion",
          title: "Argument 2: Temporal Alignment",
          text: "Match the PAGA penalty to the pay period in which the underlying violation occurred. If a meal period violation in Pay Period 1 generates a wage statement violation in Pay Period 1, these are the same employee-pay-period-violation event. Anti-stacking applies."
        },
        {
          type: "accordion",
          title: "Argument 3: Pre-Reform Cases with Post-Reform Notices",
          text: "For cases where the violations occurred before the reforms but the PAGA notice was filed after June 19, 2024, argue that the anti-stacking provision applies to the penalty calculation (a procedural/remedial provision) even though the violations predate the reforms."
        },
        {
          type: "warning-box",
          label: "Open question.",
          text: "No published appellate decision has yet interpreted how § 2699(i) interacts with the Naranjo derivative cascade. The statutory text is clear — 'one penalty per employee per pay period per violation' — but whether derivative violations count as separate 'violations' or manifestations of a single violation is untested. Build the record for both interpretations."
        },
      ]
    },
  ],

  authorities: [
    {cite: "Naranjo v. Spectrum Security (2022) 13 Cal.5th 93", note: "Meal/rest premiums are 'wages' — triggering derivative obligations"},
    {cite: "Lab. Code § 2699(i)", note: "Anti-stacking — one penalty per employee per pay period per violation"},
    {cite: "Lab. Code § 226.7", note: "Meal/rest period premium obligation"},
    {cite: "Lab. Code § 226(a)", note: "Wage statement requirements"},
    {cite: "Lab. Code § 203", note: "Waiting time penalties for unpaid wages at termination"},
    {cite: "Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858", note: "Premiums at regular rate"},
    {cite: "Donohue v. AMN Services (2021) 11 Cal.5th 58", note: "Short meal punch presumption"},
    {cite: "ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175", note: "Recoverability of PAGA penalties on wage violations"},
    {cite: "Kirby v. Immoos Fire Protection (2012) 53 Cal.4th 1244", note: "Meal/rest violations are premium obligations, not penalties"},
  ],

  footer: "For illustrative and educational purposes only. Use the Derivative Mapper tool for interactive cascade analysis. No published appellate decision has yet interpreted § 2699(i) in the context of Naranjo derivative stacking.",
};
