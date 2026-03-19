export default {
  slug: "pre-paga-compliance-audit",
  title: "Pre-PAGA Compliance Audit",
  subtitle: "Self-Assessment for California Employers",
  cardDesc: "24-item assessment across five compliance categories with three industry-specific addenda. Scored output with remediation priority matrix and 90-day implementation timeline.",
  metaDescription: "Comprehensive pre-PAGA compliance self-assessment for California employers. 24-item audit across meal periods, overtime, wage statements, reimbursement, and classification with industry-specific addenda.",
  placeholder: false,

  statutoryContext: {
    paragraphs: [
      {label: "Why audit before the notice arrives.", text: "The 15% penalty cap under § 2699(g)(1) requires pre-notice compliance infrastructure. An employer who receives a PAGA notice without documented compliance efforts is limited to the 30% cap at best — a 15-percentage-point difference that, in a multi-category case with 50+ employees, represents tens of thousands of dollars. The compliance audit creates the evidentiary foundation for the most aggressive cap."},
      {label: "How to use this audit.", text: "Work through each category systematically. For each item, assess current compliance, identify gaps, and assign a priority level. The remediation priority matrix in Section 07 translates audit findings into an implementation sequence. The 90-day timeline in Section 08 provides the implementation schedule. The completed audit — dated and signed — becomes the first exhibit in the penalty cap evidence package."},
    ]
  },

  sections: [
    {
      number: "01",
      label: "Audit Methodology",
      intro: "This audit covers the five compliance categories most frequently alleged in PAGA notices. Each category contains specific audit items with compliance criteria, common deficiencies, and risk ratings.",
      blocks: [
        {
          type: "info-box",
          label: "Scoring methodology.",
          text: "For each audit item, assign a compliance score: Compliant (the employer meets the legal standard with documented evidence), Partially Compliant (the employer has some measures in place but gaps exist), or Non-Compliant (the employer has no measures addressing this requirement). Non-compliant items are highest priority for remediation. Partially compliant items are the most dangerous — they create a false sense of security while leaving exposure."
        },
      ]
    },

    {
      number: "02",
      label: "Category 1 — Meal & Rest Period Compliance",
      intro: "Meal and rest period violations are the most common PAGA claim category. Under Donohue v. AMN Services (2021) 11 Cal.5th 58, a short meal punch creates a rebuttable presumption of non-compliance — shifting the burden to the employer.",
      blocks: [
        {
          type: "checklist",
          id: "meal-rest-audit",
          items: [
            {label: "1. Written meal period policy exists.", text: "Policy must include: 30-minute uninterrupted meal period before end of 5th hour for shifts over 5 hours; second meal period before end of 10th hour for shifts over 10 hours; waiver provisions for shifts of 6 hours or less (first meal) and 12 hours or less (second meal). Policy must use Brinker 'provide' language — not 'ensure.'"},
            {label: "2. Written rest period policy exists.", text: "Policy must include: 10-minute paid rest period for every 4 hours worked or major fraction thereof; timing before the end of the 4th hour; employer authorization and permission to take rest periods. Rest periods are not typically recorded in time systems."},
            {label: "3. Time system captures meal period start/end.", text: "The timekeeping system must record when employees clock out for and return from meal periods — not just the shift start and end. Without these punches, the employer has no evidence to rebut the Donohue presumption."},
            {label: "4. Short meal punches are flagged and reviewed.", text: "The system must flag meal periods shorter than 30 minutes for supervisor review. Under Donohue, short punches create a rebuttable presumption. The employer must document the review and any employee explanation."},
            {label: "5. Premiums are calculated at the regular rate.", text: "Under Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858, meal and rest period premiums must be calculated at the regular rate of compensation — not the base hourly rate. The regular rate includes all non-discretionary compensation."},
            {label: "6. Supervisors are trained on meal/rest obligations.", text: "Training must cover: the 'provide' standard (Brinker), waiver requirements, the Donohue presumption, supervisor responsibilities, and consequences of non-compliance. Training records with dates, attendance, and content."},
          ]
        },
      ]
    },

    {
      number: "03",
      label: "Category 2 — Wage Calculation & Payment",
      intro: "Regular rate errors are the most insidious PAGA violations because they compound across every overtime hour and every premium payment.",
      blocks: [
        {
          type: "checklist",
          id: "wage-calc-audit",
          items: [
            {label: "7. Regular rate includes all required components.", text: "The regular rate must include: non-discretionary bonuses, flat-sum bonuses (Alvarado methodology — divide by non-overtime hours only), commissions, shift differentials, piece-rate earnings, and any other non-discretionary compensation. Truly discretionary bonuses and gifts are excluded."},
            {label: "8. Overtime is calculated correctly.", text: "Daily overtime (hours 8–12 at 1.5×, hours 12+ at 2×), weekly overtime (hours 40+ at 1.5×), and seventh-day overtime (first 8 hours at 1.5×, hours 8+ at 2×) must all be calculated at the correct regular rate."},
            {label: "9. Final pay is timely.", text: "Terminated employees must receive all wages immediately (§ 201). Employees who quit with 72+ hours' notice must receive final pay on their last day (§ 202). Employees who quit without 72 hours' notice must receive final pay within 72 hours. Late payment triggers waiting time penalties under § 203."},
            {label: "10. Pay periods and pay dates comply.", text: "Wages must be paid at least semi-monthly (§ 204). The time between the end of the pay period and the pay date must not exceed the statutory maximum. Commission and piece-rate payments have separate timing rules."},
            {label: "11. Minimum wage compliance verified.", text: "California minimum wage (currently $16.50/hr as of 2026) applies to all non-exempt employees. Industry-specific minimums may be higher (healthcare, fast food). Local ordinances may impose higher minimums."},
            {label: "12. Piece-rate rest/recovery periods are compensated.", text: "Under AB 1513, piece-rate employees must receive separate compensation for rest and recovery periods and other non-productive time, calculated at the higher of the minimum wage or the average piece-rate for the pay period."},
          ]
        },
      ]
    },

    {
      number: "04",
      label: "Category 3 — Wage Statement & Recordkeeping",
      intro: "Wage statement violations under § 226(a) are independently PAGA-actionable and generate derivative exposure under Naranjo. After Naranjo, every premium underpayment is also a wage statement violation.",
      blocks: [
        {
          type: "checklist",
          id: "wage-statement-audit",
          items: [
            {label: "13. All nine § 226(a) elements present.", text: "Every wage statement must include: (1) gross wages earned, (2) total hours worked, (3) piece-rate units and applicable rate (if applicable), (4) all deductions, (5) net wages earned, (6) inclusive pay period dates, (7) employee name and ID/last four SSN digits, (8) employer legal entity name and address, (9) all applicable hourly rates and hours worked at each rate."},
            {label: "14. Multiple rates are displayed correctly.", text: "If an employee works at different rates during a pay period, each rate and corresponding hours must be listed separately on the wage statement. A single blended rate is not compliant."},
            {label: "15. Premium payments are itemized.", text: "Meal and rest period premiums should be separately identified on the wage statement — not lumped into base pay or overtime. The premium rate should reflect the regular rate (Ferra), not the base rate."},
            {label: "16. Records are retained for the required period.", text: "Payroll records must be retained for at least 4 years (the maximum PAGA lookback period). Time records, wage statements, and all supporting documentation. Electronic records are acceptable if they are accessible and printable."},
          ]
        },
      ]
    },

    {
      number: "05",
      label: "Category 4 — Expense Reimbursement & Classification",
      intro: "Expense reimbursement claims under § 2802 are increasingly common in PAGA notices, particularly for remote work, personal vehicle use, and cell phone expenses.",
      blocks: [
        {
          type: "checklist",
          id: "expense-class-audit",
          items: [
            {label: "17. Expense reimbursement policy exists.", text: "Written policy covering all necessary business expenses: mileage, cell phone, internet (for remote workers), tools, uniforms, and any other expenses incurred in the discharge of duties. Reimbursement methodology (actual cost, fixed allowance, or IRS rate)."},
            {label: "18. Remote work expenses addressed.", text: "If employees work remotely (even partially), the employer must reimburse a reasonable percentage of internet, phone, and home office expenses. A flat monthly allowance is the most defensible approach."},
            {label: "19. Exempt classification is defensible.", text: "Each exempt classification must satisfy all elements of the applicable exemption: salary basis (at least 2× minimum wage for full-time), duties test (executive, administrative, or professional), and the employee must customarily and regularly exercise discretion and independent judgment. The exemption analysis is per-employee."},
            {label: "20. Independent contractor classification reviewed.", text: "Under the ABC test (Dynamex), most workers are presumed employees unless all three prongs are satisfied: (A) free from control, (B) outside the usual course of business, (C) independently established trade. Borello factors apply to claims not covered by Dynamex."},
          ]
        },
      ]
    },

    {
      number: "06",
      label: "Category 5 — Systemic & Administrative Compliance",
      intro: "These items address the administrative infrastructure that supports all other compliance categories.",
      blocks: [
        {
          type: "checklist",
          id: "systemic-audit",
          items: [
            {label: "21. Timekeeping system is accurate and compliant.", text: "The system must capture: shift start/end, meal period start/end, total daily hours, total weekly hours. Rounding policies must be neutral over time (Donohue limited the viability of rounding). Automatic meal break alerts and short-punch flagging."},
            {label: "22. Payroll system is correctly configured.", text: "Regular rate formulas include all non-discretionary compensation. Premium calculations use the regular rate. Overtime is calculated correctly at each applicable rate. Wage statements include all nine required elements."},
            {label: "23. Employee handbook is current.", text: "Handbook includes all required policies. Annual review and update. Signed acknowledgment of receipt from every employee. Version control with effective dates."},
            {label: "24. Complaint and escalation mechanism exists.", text: "Employees have a documented way to report wage-and-hour concerns without retaliation. Complaints are investigated and documented. Corrective actions are tracked. This is critical for the 15% cap — it demonstrates active compliance management."},
          ]
        },
      ]
    },

    {
      number: "07",
      label: "Remediation Priority Matrix",
      intro: "After completing the audit, prioritize remediation based on risk level and implementation complexity.",
      blocks: [
        {
          type: "curability-grid",
          items: [
            {status: "noncurable", title: "Critical — Immediate Action", body: "Non-compliant items with high PAGA exposure: regular rate miscalculation, missing meal period premiums, exempt misclassification, missing wage statement elements. These generate the highest per-employee penalties and the broadest derivative exposure. Remediate within 14 days."},
            {status: "difficult", title: "High — Action Within 30 Days", body: "Partially compliant items with moderate exposure: incomplete training, outdated policies, payroll system gaps. These are curable but require coordinated action across HR, payroll, and operations. Target completion within 30 days."},
            {status: "curable", title: "Standard — Action Within 60 Days", body: "Non-compliant items with lower per-employee impact: expense reimbursement policy gaps, recordkeeping deficiencies, handbook updates. Important for comprehensive compliance but lower exposure per violation. Complete within 60 days."},
            {status: "curable", title: "Maintenance — Ongoing", body: "Compliant items requiring ongoing monitoring: quarterly audits, training refreshers, system configuration reviews, policy updates for new legislation. These maintain the compliance infrastructure after initial remediation."},
          ]
        },
      ]
    },

    {
      number: "08",
      label: "90-Day Implementation Timeline",
      intro: "This timeline sequences remediation actions to maximize compliance impact within 90 days — building the evidentiary record for the 15% cap.",
      blocks: [
        {
          type: "timeline",
          items: [
            {dot: "critical", day: "Days 1–14", title: "Critical Remediation", body: "Address all Critical-priority items: correct the regular rate formula, pay outstanding premiums at the Ferra rate, correct wage statement format, resolve any classification issues.", actions: ["Reconfigure payroll system for correct regular rate calculation.", "Calculate and pay retroactive premium underpayments.", "Correct wage statement template to include all nine § 226(a) elements.", "Review and correct any exempt classification issues."]},
            {dot: "active", day: "Days 15–30", title: "Policy & Training", body: "Revise all compliance policies. Distribute to employees. Schedule and begin supervisor training.", actions: ["Draft or revise meal period, rest period, overtime, and expense reimbursement policies.", "Distribute policies with signed acknowledgments.", "Conduct first round of supervisor compliance training."]},
            {dot: "default", day: "Days 31–60", title: "System & Process Changes", body: "Implement system changes and establish monitoring processes.", actions: ["Complete payroll system reconfiguration with vendor confirmation.", "Implement timekeeping system enhancements (meal break alerts, short-punch flags).", "Establish quarterly audit schedule with defined scope and methodology.", "Set up employee complaint mechanism with documented response protocols."]},
            {dot: "default", day: "Days 61–90", title: "Verification & Documentation", body: "Verify compliance, conduct first post-implementation audit, and compile the evidence package.", actions: ["Conduct first quarterly compliance audit.", "Document all remediation actions in the 10-tab evidence format.", "Prepare compliance certification signed by authorized officer.", "File completed audit with date stamp — this is the 15% cap evidence."]},
          ]
        },
        {
          type: "info-box",
          label: "Start today.",
          text: "Every day of documented compliance extends the pre-notice record. An employer who completes this audit and implementation timeline in January has a 15% cap evidence package dated months before any PAGA notice that arrives in June. The earlier the audit, the stronger the cap argument."
        },
      ]
    },
  ],

  authorities: [
    {cite: "Lab. Code § 2699(g)(1)", note: "15% penalty cap — pre-notice compliance"},
    {cite: "Lab. Code § 2699(h)(1)", note: "30% penalty cap — post-notice remediation"},
    {cite: "Lab. Code §§ 226.7, 512", note: "Meal and rest period requirements"},
    {cite: "Lab. Code § 226(a)", note: "Nine required wage statement elements"},
    {cite: "Lab. Code § 510", note: "Overtime calculation requirements"},
    {cite: "Lab. Code § 2802", note: "Expense reimbursement"},
    {cite: "Lab. Code § 2751", note: "Commission plan written agreement requirements"},
    {cite: "Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858", note: "Premiums at regular rate"},
    {cite: "Alvarado v. Dart Container (2018) 4 Cal.5th 542", note: "Flat-sum bonus regular rate methodology"},
    {cite: "Brinker Restaurant Corp. v. Superior Court (2012) 53 Cal.4th 1004", note: "Meal period 'provide' standard"},
    {cite: "Donohue v. AMN Services (2021) 11 Cal.5th 58", note: "Short meal punch rebuttable presumption"},
    {cite: "Dynamex Operations West v. Superior Court (2018) 4 Cal.5th 903", note: "ABC test for independent contractor classification"},
  ],

  footer: "For illustrative and educational purposes only. This audit framework does not constitute legal advice. Compliance requirements vary by industry, location, and workforce composition. Consult counsel for a tailored assessment.",
};
