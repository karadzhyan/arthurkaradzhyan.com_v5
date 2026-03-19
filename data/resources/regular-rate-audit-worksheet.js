export default {
  slug: "regular-rate-audit-worksheet",
  title: "Regular Rate Audit Worksheet",
  subtitle: "Ferra and Alvarado Exposure",
  cardDesc: "Calculating correct regular rates across compensation types — commissions, flat-sum bonuses, piece-rate, shift differentials. Side-by-side comparison with per-employee underpayment quantification.",
  metaDescription: "Worksheet for calculating correct regular rates under Ferra and Alvarado across compensation types. Flat-sum bonuses, commissions, piece-rate, shift differentials with underpayment quantification.",
  placeholder: false,

  statutoryContext: {
    paragraphs: [
      {label: "Why the regular rate matters.", text: "The regular rate of compensation is the multiplier applied to every overtime hour, every meal period premium, and every rest period premium. A regular rate that is $2.00 too low compounds across every calculation. For an employee with 10 overtime hours per week and 2 missed meal periods per month, the underpayment per pay period is $20 (OT) + $4 (premiums) = $24. Over a one-year PAGA period, that is $624 per employee. For 50 employees, that is $31,200 — before penalties."},
      {label: "The two foundational cases.", text: "Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858 held that meal and rest period premiums must be calculated at the regular rate — not the base hourly rate. Alvarado v. Dart Container (2018) 4 Cal.5th 542 held that flat-sum bonuses must be divided by only non-overtime hours when calculating the regular rate. Together, these decisions restructured how California employers must calculate virtually every wage-and-hour payment."},
    ]
  },

  sections: [
    {
      number: "01",
      label: "Regular Rate Fundamentals",
      intro: "The regular rate includes all remuneration for employment except statutory exclusions. The most common error is excluding compensation that should be included.",
      blocks: [
        {
          type: "curability-grid",
          items: [
            {status: "curable", title: "Included: Non-Discretionary Bonuses", body: "Production bonuses, attendance bonuses, performance bonuses, safety bonuses — any bonus paid pursuant to a prior agreement, policy, or promise. The key question is whether the employee had a reasonable expectation of receiving the bonus. If yes, it is non-discretionary and must be included."},
            {status: "curable", title: "Included: Flat-Sum Bonuses", body: "Under Alvarado, flat-sum bonuses (fixed-amount bonuses not tied to hours) are divided by non-overtime hours only when calculating the regular rate. This produces a higher regular rate than dividing by total hours — which is the most common employer error."},
            {status: "curable", title: "Included: Commissions", body: "Commissions earned during the pay period are included in the regular rate for that period. The timing question — when is the commission 'earned' vs. 'paid' — creates complexity. Under Sciborski, commissions are earned when the employee completes the work entitling them to the commission."},
            {status: "curable", title: "Included: Shift Differentials", body: "Additional pay for working specific shifts (night shift, weekend shift) is included in the regular rate. The differential is added to the base rate for the hours worked at the premium shift."},
            {status: "noncurable", title: "Excluded: Truly Discretionary Bonuses", body: "Bonuses where both the fact of payment and the amount are at the employer's sole discretion, with no prior commitment, expectation, or pattern. These are rare. If the employer pays the same 'discretionary' bonus every quarter, it is not discretionary."},
            {status: "noncurable", title: "Excluded: Gifts & Special Occasion Payments", body: "Holiday gifts, birthday bonuses, and similar payments made as gifts — not as compensation for services. The payment must be a genuine gift, not an expected component of compensation."},
          ]
        },
      ]
    },

    {
      number: "02",
      label: "Flat-Sum Bonus Analysis (Alvarado)",
      intro: "The Alvarado methodology requires dividing the flat-sum bonus by only non-overtime hours worked in the pay period. Most payroll systems default to dividing by total hours — which understates the regular rate.",
      blocks: [
        {
          type: "calc-block",
          header: "Correct Calculation — Alvarado Method",
          rows: [
            {label: "Base hourly rate", value: "$20.00/hr"},
            {label: "Flat-sum attendance bonus (monthly)", value: "$300.00"},
            {label: "Total hours worked in pay period", value: "184 hrs"},
            {label: "Overtime hours worked", value: "24 hrs"},
            {label: "Non-overtime hours (184 - 24)", value: "160 hrs"},
            {label: "Bonus component (÷ non-OT hours: $300 ÷ 160)", value: "$1.875/hr"},
            {label: "Correct regular rate", value: "$21.875/hr"},
            {label: "Correct OT rate (1.5×)", value: "$32.8125/hr"},
          ]
        },
        {
          type: "calc-block",
          header: "Common Error — Total Hours Method",
          rows: [
            {label: "Base hourly rate", value: "$20.00/hr"},
            {label: "Flat-sum bonus", value: "$300.00"},
            {label: "Bonus component (÷ total hours: $300 ÷ 184)", value: "$1.63/hr"},
            {label: "Incorrect regular rate", value: "$21.63/hr"},
            {label: "Incorrect OT rate (1.5×)", value: "$32.445/hr"},
          ]
        },
        {
          type: "calc-block",
          header: "Per-Employee Underpayment — This Pay Period",
          rows: [
            {label: "Correct OT rate", value: "$32.8125/hr"},
            {label: "Incorrect OT rate", value: "$32.445/hr"},
            {label: "Underpayment per OT hour", value: "$0.3675/hr"},
            {label: "OT hours in period", value: "24 hrs"},
            {label: "OT underpayment — this period", value: "$8.82"},
            {label: "Meal premium underpayment ($21.875 vs $21.63 × 2 premiums)", value: "$0.49"},
            {label: "Total regular rate underpayment — this pay period", value: "$9.31", total: true},
          ]
        },
        {
          type: "warning-box",
          label: "The compounding effect.",
          text: "A $9.31 underpayment per pay period compounds to $241.06 per employee per year. For 50 employees, the annual wage underpayment is $12,053 — before PAGA penalties. Each underpaid pay period is also a wage statement violation (Naranjo) and potentially a waiting time violation for departed employees (§ 203)."
        },
      ]
    },

    {
      number: "03",
      label: "Commission Inclusion",
      intro: "Commissions create the most complex regular rate calculation because of timing mismatches between when commissions are earned and when they are paid.",
      blocks: [
        {
          type: "calc-block",
          header: "Commission Regular Rate — Monthly Payment",
          rows: [
            {label: "Base hourly rate", value: "$18.00/hr"},
            {label: "Commission earned in month", value: "$2,400.00"},
            {label: "Total hours worked in month", value: "176 hrs"},
            {label: "Non-overtime hours", value: "160 hrs"},
            {label: "Commission component ($2,400 ÷ 160 non-OT hrs)", value: "$15.00/hr"},
            {label: "Regular rate including commissions", value: "$33.00/hr"},
            {label: "OT rate (1.5× regular rate)", value: "$49.50/hr"},
            {label: "Meal premium at regular rate", value: "$33.00", total: true},
          ]
        },
        {
          type: "accordion",
          title: "Timing: When Are Commissions 'Earned'?",
          subsections: [
            {label: "Sciborski rule", text: "Under Sciborski v. Pacific Bell Directory (2012) 205 Cal.App.4th 1152, commissions are earned when the employee completes the work entitling them to the commission — not when the employer receives payment or when a post-completion contingency is satisfied. For a car salesperson, the commission is earned at deal closing, not at deal funding."},
            {label: "Regular rate timing", text: "For regular rate purposes, commissions should be allocated to the pay period in which they were earned. If a commission earned in January is paid in February, the January regular rate should include the commission — which means January overtime and premium calculations must be retroactively adjusted."},
            {label: "Practical approach", text: "Most employers pay commissions monthly or quarterly and calculate the regular rate adjustment retrospectively. The adjustment multiplies the difference between the base OT rate and the commission-adjusted OT rate by all OT hours in the commission period."},
          ]
        },
      ]
    },

    {
      number: "04",
      label: "Shift Differential Analysis",
      intro: "Shift differentials are straightforward to include but frequently miscalculated when combined with overtime.",
      blocks: [
        {
          type: "calc-block",
          header: "Shift Differential Regular Rate",
          rows: [
            {label: "Base hourly rate (day shift)", value: "$22.00/hr"},
            {label: "Night shift differential", value: "$3.00/hr"},
            {label: "Night shift rate", value: "$25.00/hr"},
            {label: "Day shift hours worked", value: "24 hrs"},
            {label: "Night shift hours worked", value: "16 hrs"},
            {label: "Total straight-time earnings ($22×24 + $25×16)", value: "$928.00"},
            {label: "Total hours", value: "40 hrs"},
            {label: "Weighted regular rate ($928 ÷ 40)", value: "$23.20/hr"},
            {label: "OT rate for hours beyond 40", value: "$34.80/hr", total: true},
          ]
        },
        {
          type: "info-box",
          label: "Common error.",
          text: "The most common error is calculating overtime at the base rate without including the weighted differential. If the employee works OT during a night shift, the OT rate must reflect the weighted regular rate — not just the base rate × 1.5."
        },
      ]
    },

    {
      number: "05",
      label: "Meal/Rest Period Premium Impact (Ferra)",
      intro: "Under Ferra, meal and rest period premiums are one hour of pay at the regular rate of compensation — not the base hourly rate. This distinction is the single most common payroll configuration error in California.",
      blocks: [
        {
          type: "calc-block",
          header: "Ferra Impact — Employee with Commission + Bonus",
          rows: [
            {label: "Base hourly rate", value: "$20.00/hr"},
            {label: "Monthly commission", value: "$1,500.00"},
            {label: "Monthly attendance bonus", value: "$200.00"},
            {label: "Non-OT hours in month", value: "160 hrs"},
            {label: "Commission component ($1,500 ÷ 160)", value: "$9.375/hr"},
            {label: "Bonus component ($200 ÷ 160)", value: "$1.25/hr"},
            {label: "Regular rate of compensation", value: "$30.625/hr"},
            {label: "Premium at regular rate (Ferra — correct)", value: "$30.625"},
            {label: "Premium at base rate (incorrect)", value: "$20.00"},
            {label: "Underpayment per premium", value: "$10.625", total: true},
          ]
        },
        {
          type: "warning-box",
          label: "The Ferra multiplier.",
          text: "For employees with significant non-discretionary compensation above their base rate, the Ferra premium can be 50–100% higher than the base-rate premium. An employee with a $20 base rate and $10.625 in additional regular rate components pays a premium of $30.625 — not $20.00. Every premium paid at the base rate since Ferra (August 2021) is an underpayment."
        },
      ]
    },

    {
      number: "06",
      label: "Common Miscalculation Patterns",
      intro: "These are the most frequent regular rate errors identified in PAGA defense audits.",
      blocks: [
        {
          type: "curability-grid",
          items: [
            {status: "noncurable", title: "Dividing Flat-Sum Bonus by Total Hours", body: "The most common Alvarado error. The correct divisor is non-overtime hours only. Most payroll systems default to total hours. This requires a system configuration change, not just a policy update."},
            {status: "noncurable", title: "Excluding Commissions from Regular Rate", body: "Commission exclusion understates the regular rate for every overtime hour and every premium. The exposure compounds rapidly for sales-heavy workforces."},
            {status: "difficult", title: "Premiums at Base Rate Instead of Regular Rate", body: "The Ferra error. Payroll systems must be configured to calculate premiums at the full regular rate. This requires the system to know the regular rate before calculating the premium — a configuration many legacy systems do not support natively."},
            {status: "difficult", title: "Ignoring Non-Discretionary Bonuses", body: "Quarterly or annual bonuses that are expected (even if the amount varies) are non-discretionary and must be included. Retroactive adjustment is required when the bonus is paid."},
            {status: "curable", title: "Incorrect Overtime Tier Application", body: "Applying weekly OT when daily OT should apply, or failing to apply the double-time rate after 12 daily hours. These are system configuration errors that can be corrected prospectively."},
            {status: "curable", title: "No Retroactive Adjustment for Late-Paid Commissions", body: "When commissions paid in a later period should have been included in a prior period's regular rate, the OT and premium calculations for the prior period must be retroactively adjusted."},
          ]
        },
      ]
    },
  ],

  authorities: [
    {cite: "Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858", note: "Premiums at regular rate of compensation"},
    {cite: "Alvarado v. Dart Container (2018) 4 Cal.5th 542", note: "Flat-sum bonuses ÷ non-overtime hours only"},
    {cite: "Sciborski v. Pacific Bell Directory (2012) 205 Cal.App.4th 1152", note: "Commissions earned at completion of work"},
    {cite: "Naranjo v. Spectrum Security (2022) 13 Cal.5th 93", note: "Meal/rest premiums are 'wages' — derivative penalties"},
    {cite: "Lab. Code § 510", note: "Overtime rates and tier structure"},
    {cite: "Lab. Code § 226.7", note: "Meal/rest period premium obligation"},
    {cite: "Lab. Code § 515.5", note: "Computer professional exemption salary threshold"},
    {cite: "29 C.F.R. § 778.109", note: "Federal regular rate calculation (applicable to California)"},
  ],

  footer: "For illustrative and educational purposes only. Use the Regular Rate Calculator tool for interactive modeling. Calculations are illustrative — actual regular rates must be computed from employee-specific payroll data.",
};
