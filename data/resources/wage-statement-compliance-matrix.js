export default {
  slug: "wage-statement-compliance-matrix",
  title: "Wage Statement Compliance Matrix",
  subtitle: "Nine Elements of § 226(a)",
  cardDesc: "Element-by-element compliance guide with common deficiency patterns, risk ratings, Naranjo derivative exposure, and remediation steps including post-Ferra regular rate display requirements.",
  metaDescription: "Complete guide to California Labor Code § 226(a) wage statement compliance. Nine required elements, deficiency patterns, Naranjo derivative exposure, and Ferra regular rate display.",
  placeholder: false,

  statutoryContext: {
    paragraphs: [
      {label: "Why wage statements matter in PAGA.", text: "Wage statement violations under § 226 are independently PAGA-actionable. After Naranjo, they also serve as derivative violations — every unpaid premium or miscalculated wage automatically generates a wage statement deficiency. In many PAGA cases, the wage statement exposure exceeds the exposure on the underlying violations."},
      {label: "The nine-element requirement.", text: "Section 226(a) requires every wage statement to include nine specific elements. A deficiency in any single element is a violation. The penalty structure is $50 for a first violation and $100 for each subsequent violation per employee per pay period, with a cap of $4,000 per employee under § 226(e). For PAGA purposes, the civil penalty is $100/$200 per violation — without the $4,000 cap."},
    ]
  },

  sections: [
    {
      number: "01",
      label: "Nine Elements — Compliance Matrix",
      intro: "Each element is listed with compliance requirements, common deficiencies, and risk rating.",
      blocks: [
        {
          type: "curability-grid",
          items: [
            {status: "curable", title: "Element 1: Gross Wages Earned", body: "Total gross wages before deductions. Must include all compensation: base pay, overtime, premiums, commissions, bonuses, piece-rate earnings. Deficiency: omitting meal/rest premiums (Naranjo derivative) or commission adjustments."},
            {status: "curable", title: "Element 2: Total Hours Worked", body: "All hours worked in the pay period. Exempt employees are excluded. Non-productive time for piece-rate employees must be separately stated (AB 1513). Deficiency: rounding errors or omitting non-productive time."},
            {status: "difficult", title: "Element 3: Piece-Rate Units & Rate", body: "Required only for piece-rate employees. Number of units produced and the applicable piece rate. Deficiency: failing to separately state piece-rate earnings from non-productive time compensation."},
            {status: "difficult", title: "Element 4: All Deductions", body: "Every deduction must be itemized — taxes, insurance, garnishments, voluntary deductions. 'Miscellaneous' or 'Other' deductions without itemization violate this element. Deficiency: combining multiple deductions into a single line item."},
            {status: "curable", title: "Element 5: Net Wages Earned", body: "Gross wages minus all deductions. This is typically calculated correctly by payroll systems. Deficiency: rare, usually only when gross wages or deductions are incorrect."},
            {status: "curable", title: "Element 6: Inclusive Pay Period Dates", body: "The start and end dates of the pay period. Deficiency: omitting dates or using pay dates instead of pay period dates."},
            {status: "curable", title: "Element 7: Employee Name & ID", body: "Employee's legal name and either an identification number or the last four digits of the SSN. Deficiency: using only employee number without name, or displaying the full SSN."},
            {status: "curable", title: "Element 8: Employer Name & Address", body: "Legal entity name and address. DBA names alone are insufficient — the legal entity must be identified. Deficiency: using a DBA without the legal entity, or an outdated address."},
            {status: "difficult", title: "Element 9: All Applicable Hourly Rates & Hours", body: "Every hourly rate at which the employee worked and the hours at each rate. This is the most commonly deficient element. Employees paid at multiple rates (regular, OT, double-time, shift differential) must have each rate and corresponding hours displayed. Deficiency: showing a single blended rate or omitting the OT/DT rate breakdown."},
          ]
        },
      ]
    },

    {
      number: "02",
      label: "Post-Ferra Display Requirements",
      intro: "Ferra v. Loews Hollywood Hotel (2021) requires that meal and rest period premiums be paid at the regular rate of compensation. This creates a wage statement display requirement.",
      blocks: [
        {
          type: "accordion",
          title: "What Ferra Requires on the Wage Statement",
          subsections: [
            {label: "Premium rate display", text: "If a meal or rest period premium is paid, the wage statement should display the premium at the regular rate — not the base hourly rate. Under Element 9, the premium rate is an 'applicable hourly rate' that must be listed with corresponding hours (1 hour per premium)."},
            {label: "Multiple premium rates", text: "If the regular rate varies across pay periods (due to variable commissions or bonuses), the premium rate will also vary. Each premium should reflect the regular rate for the pay period in which the violation occurred."},
            {label: "Practical challenge", text: "Most payroll systems do not natively calculate meal/rest premiums at the regular rate. The premium is typically hard-coded at the base rate. Displaying the correct Ferra rate requires either payroll system reconfiguration or manual adjustment."},
          ]
        },
        {
          type: "warning-box",
          label: "Every Ferra error is also a § 226 error.",
          text: "If the premium is paid at the base rate instead of the regular rate, two violations occur simultaneously: (1) the premium underpayment under § 226.7, and (2) the wage statement inaccuracy under § 226(a)(1) (incorrect gross wages) and § 226(a)(9) (incorrect applicable rate). This is the Naranjo derivative cascade in action."
        },
      ]
    },

    {
      number: "03",
      label: "Common Deficiency Patterns",
      intro: "These patterns account for the majority of § 226 violations in PAGA cases.",
      blocks: [
        {
          type: "accordion",
          title: "Pattern 1: Missing Rate Breakdown (Element 9)",
          subsections: [
            {label: "Description", text: "The wage statement shows a single hourly rate (e.g., '$20.00/hr') without breaking down regular, overtime, and double-time rates and corresponding hours. For employees who work OT, this is a per-pay-period violation."},
            {label: "Prevalence", text: "This is the most common § 226 deficiency. Many payroll systems display only the base rate. Element 9 requires all applicable rates — including OT (1.5×), DT (2×), shift differentials, and premium rates."},
            {label: "Remediation", text: "Configure the payroll system to display each rate tier separately: Regular rate × [hours], OT rate × [hours], DT rate × [hours]. Test with a sample pay period to verify correct display."},
          ]
        },
        {
          type: "accordion",
          title: "Pattern 2: Naranjo Derivative — Unpaid Premiums",
          subsections: [
            {label: "Description", text: "Meal/rest premiums are not paid or are paid at the base rate instead of the regular rate. The wage statement either omits the premium or reports the wrong amount. This generates two violations: the § 226.7 premium failure and the § 226 statement inaccuracy."},
            {label: "Prevalence", text: "Extremely common. Most employers who pay premiums pay them at the base rate (pre-Ferra practice). Every such payment since August 2021 (Ferra's effective date) is both an underpayment and a wage statement deficiency."},
            {label: "Remediation", text: "Recalculate premiums at the regular rate. Issue corrected wage statements for all affected pay periods. Reconfigure the payroll system for prospective compliance."},
          ]
        },
        {
          type: "accordion",
          title: "Pattern 3: DBA Without Legal Entity (Element 8)",
          subsections: [
            {label: "Description", text: "The wage statement identifies the employer by its DBA (doing business as) name without including the legal entity name. Section 226(a)(8) requires the 'name and address of the legal entity that is the employer.'"},
            {label: "Remediation", text: "Add the legal entity name to the wage statement. This is typically a simple payroll system configuration change."},
          ]
        },
      ]
    },

    {
      number: "04",
      label: "Derivative Penalty Exposure",
      intro: "Understanding how § 226 violations interact with the Naranjo cascade and PAGA penalties.",
      blocks: [
        {
          type: "calc-block",
          header: "Wage Statement Exposure — 50 Employees, 26 Pay Periods",
          rows: [
            {label: "Employees with Element 9 deficiency", value: "50"},
            {label: "Pay periods with deficiency", value: "26"},
            {label: "Total violations (50 × 26)", value: "1,300"},
            {label: "§ 226(e) penalty ($50 first + $100 subsequent)", value: "$128,550"},
            {label: "§ 226(e) per-employee cap ($4,000 × 50)", value: "$200,000 cap"},
            {label: "Applicable § 226(e) exposure", value: "$128,550"},
            {label: "PAGA civil penalty ($100 × 1,300)", value: "$130,000"},
            {label: "Total § 226 exposure (penalties + PAGA)", value: "$258,550", total: true},
          ]
        },
        {
          type: "info-box",
          label: "The § 226(e) cap does not apply to PAGA penalties.",
          text: "Section 226(e) caps statutory penalties at $4,000 per employee. But PAGA civil penalties under § 2699(f) are separate and uncapped (absent the reform penalty caps). This means the PAGA penalty exposure on § 226 violations can exceed the statutory penalty exposure."
        },
      ]
    },

    {
      number: "05",
      label: "Remediation Protocol",
      intro: "Correcting wage statement deficiencies involves both retrospective correction and prospective system changes.",
      blocks: [
        {
          type: "checklist",
          id: "remediation-protocol",
          items: [
            {label: "Identify deficient elements.", text: "Review a sample of current wage statements against all nine elements. Identify which elements are deficient and whether the deficiency is systemic (all employees) or sporadic (certain pay types or configurations)."},
            {label: "Configure payroll system.", text: "Work with the payroll vendor to configure correct display of all nine elements. Focus on Element 9 (rate breakdown), Element 1 (gross wages including premiums), and Element 8 (legal entity name). Obtain vendor confirmation of changes."},
            {label: "Issue corrected statements.", text: "For all pay periods during the PAGA lookback where deficiencies existed, issue corrected wage statements. Distribute to all affected employees with a cover letter explaining the corrections."},
            {label: "Document the correction.", text: "Retain copies of corrected statements, vendor configuration confirmations, and distribution records. This evidence supports the 30% penalty cap (remediation within 60 days) and the cure proposal (if applicable)."},
            {label: "Test and verify.", text: "Run a test payroll cycle with the new configuration. Compare the test statement against all nine elements. Verify correct display of multiple rates, premiums, and deductions before going live."},
          ]
        },
      ]
    },
  ],

  authorities: [
    {cite: "Lab. Code § 226(a)", note: "Nine required wage statement elements"},
    {cite: "Lab. Code § 226(e)", note: "Penalties for wage statement violations — $50/$100 per violation, $4,000 cap"},
    {cite: "Naranjo v. Spectrum Security (2022) 13 Cal.5th 93", note: "Premiums are wages — derivative wage statement violations"},
    {cite: "Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858", note: "Premiums at regular rate — impacts wage statement display"},
    {cite: "Lab. Code § 2699(f)(2)(A)", note: "PAGA civil penalty — $100 per violation"},
    {cite: "Lab. Code § 2699(i)", note: "Anti-stacking — limits derivative penalty multiplication"},
  ],

  footer: "For illustrative and educational purposes only. Use the Wage Statement Compliance Checker tool for interactive element-by-element assessment.",
};
