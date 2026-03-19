export default {
  slug: "penalty-cap-qualification-tracker",
  title: "Penalty Cap Qualification Tracker",
  subtitle: "§§ 2699(g) and 2699(h) Documentation",
  cardDesc: "Two-track checklist for the 15% and 30% caps with statutory citations. Common documentation failures, 10-tab evidence assembly guide, and dollar-impact worksheet.",
  metaDescription: "Documentation guide for qualifying for the 15% and 30% PAGA penalty caps under California Labor Code §§ 2699(g) and 2699(h). Evidence assembly, common failures, and exposure reduction calculations.",
  placeholder: false,

  statutoryContext: {
    paragraphs: [
      {label: "Two caps, two standards.", text: "The 2024 PAGA reforms created two penalty cap tiers. The 15% cap under § 2699(g)(1) requires that the employer took 'all reasonable steps to be in compliance with the underlying statutes' before receiving the PAGA notice. The 30% cap under § 2699(h)(1) requires that the employer took 'all reasonable steps to be in compliance' within 60 days of the notice. The difference is timing — not substance. The 15% cap rewards proactive compliance; the 30% cap rewards responsive remediation."},
      {label: "The documentation burden.", text: "Neither cap is self-executing. The employer must demonstrate compliance efforts with specific, dated, verifiable evidence. Courts will not accept conclusory declarations. The evidence must show what was done, when it was done, and how it addressed the specific violation categories alleged in the PAGA notice. This tracker guides the assembly of that evidence."},
    ]
  },

  sections: [
    {
      number: "01",
      label: "Cap Overview & Qualification Criteria",
      intro: "Understanding which cap applies — and whether per-category application is available — is the threshold question.",
      blocks: [
        {
          type: "scenario-panel",
          items: [
            {level: "strong", title: "15% Cap — § 2699(g)(1)", body: "Maximum penalty reduced to 15% of statutory amount. Requires pre-notice compliance infrastructure: policies, training, audits, system configuration — all documented and dated before the PAGA notice was received. The most aggressive exposure reduction tool in the reform package."},
            {level: "moderate", title: "30% Cap — § 2699(h)(1)", body: "Maximum penalty reduced to 30% of statutory amount. Requires 'all reasonable steps' to comply within 60 days of the notice. Available to employers who had no pre-notice infrastructure. The fallback cap for responsive employers."},
            {level: "weak", title: "No Cap — Unqualified", body: "Full statutory penalties apply. The employer either failed to comply before the notice and failed to remediate within 60 days after, or the compliance efforts were insufficient to satisfy 'all reasonable steps.' This is the exposure baseline."},
          ]
        },
        {
          type: "info-box",
          label: "Per-category application.",
          text: "The statutory text supports applying different caps to different violation categories within the same action. An employer with pre-notice meal period policies (15% cap on meal period claims) that implemented overtime corrections after the notice (30% cap on overtime claims) can argue for per-category cap application. No published appellate decision has addressed this question, but the statutory structure supports it — §§ 2699(g) and (h) operate independently."
        },
      ]
    },

    {
      number: "02",
      label: "15% Cap — Pre-Notice Compliance Checklist",
      intro: "Every item in this checklist must be documented and dated before the PAGA notice was received. Post-notice documentation of pre-notice actions (e.g., 'we had a policy in place but did not put it in writing until after the notice') will be scrutinized and likely discounted.",
      blocks: [
        {
          type: "checklist",
          id: "fifteen-pct-checklist",
          items: [
            {label: "Written policies for each violation category.", text: "Each violation category alleged in the PAGA notice must be addressed by a written policy. Meal period policies must include Brinker 'provide' language. Rest period policies must specify timing (before the end of the 4th hour of work). Overtime policies must describe the regular rate methodology. Policies must be dated and signed by an authorized representative."},
            {label: "Policy distribution records.", text: "Signed employee acknowledgments confirming receipt of each policy. Distribution dates must predate the PAGA notice. If policies were included in a handbook, the handbook distribution log serves as the acknowledgment record."},
            {label: "Supervisor training documentation.", text: "Training records showing that supervisors were trained on each compliance area: attendance sheets, training materials, completion certificates. Training dates must predate the notice."},
            {label: "Payroll system configuration.", text: "Documentation showing that the payroll system was configured to include all required compensation components in the regular rate (Ferra/Alvarado), calculate premiums at the regular rate, and produce compliant wage statements. Configuration dates and vendor confirmations."},
            {label: "Internal audit records.", text: "Evidence of periodic compliance reviews: audit reports, findings summaries, corrective actions taken. Quarterly audits are the minimum frequency courts will likely consider 'reasonable.' Audit scope should include time records, wage statements, and premium calculations."},
            {label: "Employee complaint mechanism.", text: "Documentation of a system for employees to report compliance concerns — hotline, email address, HR reporting channel. Evidence that complaints were received and addressed. The mechanism must predate the notice."},
            {label: "Corrective action history.", text: "Records showing that when compliance issues were identified (through audits or complaints), the employer took corrective action. This demonstrates that the compliance program was not paper-only but was actively enforced."},
            {label: "Industry-specific compliance.", text: "For hospitality: Donohue-compliant time-rounding analysis. For automotive: commission plan § 2751 compliance and Sciborski forfeiture analysis. For healthcare staffing: worksite-specific policies. Industry-specific compliance demonstrates sophistication."},
          ]
        },
        {
          type: "danger-box",
          label: "The timestamp is everything.",
          text: "Every document in the 15% cap evidence package must be independently dateable to a period before the PAGA notice. Metadata timestamps, version histories, email transmissions, signed acknowledgments with dates, and system configuration logs are all acceptable. Undated documents will be treated as post-notice unless independently verifiable."
        },
      ]
    },

    {
      number: "03",
      label: "30% Cap — Post-Notice Remediation Checklist",
      intro: "The 60-day clock starts on the date the employer receives the PAGA notice. Every item must be completed and documented within this window.",
      blocks: [
        {
          type: "timeline",
          items: [
            {
              dot: "active",
              day: "Days 1–14",
              title: "Monetary Remediation",
              body: "Calculate and pay any identified underpayments. This includes meal/rest period premiums at the regular rate (Ferra), overtime differentials (Alvarado), and unreimbursed expenses.",
              actions: [
                "Pull payroll data for all aggrieved employees for the PAGA period.",
                "Recalculate premiums at the regular rate of compensation — not the base hourly rate.",
                "Calculate overtime differentials using the correct regular rate methodology.",
                "Issue payments with detailed pay stubs showing the calculation methodology.",
              ]
            },
            {
              dot: "default",
              day: "Days 7–30",
              title: "Policy Revisions & Distribution",
              body: "Revise all policies implicated by the notice. Distribute to all employees with signed acknowledgments.",
              actions: [
                "Revise meal period policy to include Brinker 'provide' standard.",
                "Revise overtime policy to include correct regular rate methodology.",
                "Update wage statement template to include all nine § 226(a) elements.",
                "Distribute revised policies with signed acknowledgments. Retain copies with dates.",
              ]
            },
            {
              dot: "default",
              day: "Days 14–45",
              title: "Training & System Changes",
              body: "Train supervisors on revised policies. Implement payroll system changes.",
              actions: [
                "Conduct supervisor training. Document attendance, content, and date.",
                "Reconfigure payroll system: regular rate formulas, premium calculations, wage statement format.",
                "Document system changes with vendor confirmations and test-period results.",
              ]
            },
            {
              dot: "critical",
              day: "Day 60 — Deadline",
              title: "Complete All Remediation",
              body: "All remediation actions must be completed by Day 60. Document completion with a sworn declaration.",
              actions: [
                "Compile all remediation evidence into the 10-tab evidence binder (see Section 04).",
                "Prepare a declaration of the authorized officer attesting to completion of all remediation.",
                "Retain proof of every payment, policy distribution, training session, and system change.",
              ]
            },
          ]
        },
        {
          type: "warning-box",
          label: "Begin remediation immediately.",
          text: "Do not wait for the carrier to assign counsel or for the cure proposal to be accepted or rejected. The 60-day clock runs regardless. Every remediation action supports both the cure proposal and the 30% cap. Start on Day 1."
        },
      ]
    },

    {
      number: "04",
      label: "10-Tab Evidence Assembly Guide",
      intro: "Organize all cap qualification evidence into a structured binder. This format is designed for submission to the court, the mediator, or the carrier.",
      blocks: [
        {
          type: "proposal-section",
          num: "Tab 1",
          title: "Timeline & Compliance History",
          body: "Chronological timeline of all compliance actions. For the 15% cap: all pre-notice actions with dates. For the 30% cap: all post-notice actions with dates. Include a cover declaration attesting to the timeline's accuracy."
        },
        {
          type: "proposal-section",
          num: "Tab 2",
          title: "Written Policies — Current & Prior Versions",
          body: "All wage-and-hour policies in effect during the PAGA period. For the 15% cap: prior versions with effective dates. For the 30% cap: revised versions with revision dates. Red-line showing changes."
        },
        {
          type: "proposal-section",
          num: "Tab 3",
          title: "Policy Distribution Records",
          body: "Signed employee acknowledgments. Handbook distribution logs. Email distribution records. Date-stamped for each distribution."
        },
        {
          type: "proposal-section",
          num: "Tab 4",
          title: "Training Documentation",
          body: "Training materials, attendance sheets, completion certificates. Training dates, duration, content covered, trainer identification."
        },
        {
          type: "proposal-section",
          num: "Tab 5",
          title: "Payroll System Configuration",
          body: "System configuration documentation. Regular rate formulas. Premium calculation rules. Vendor confirmations of changes. Test-period results demonstrating correct calculations."
        },
        {
          type: "proposal-section",
          num: "Tab 6",
          title: "Internal Audit Records",
          body: "Audit reports, findings, corrective actions. Audit scope, methodology, and frequency. For the 15% cap: pre-notice audits. For the 30% cap: post-notice verification audits."
        },
        {
          type: "proposal-section",
          num: "Tab 7",
          title: "Monetary Remediation Records",
          body: "Payment records for any underpayments identified and corrected. Per-employee calculations. Proof of payment (check copies, direct deposit confirmations). Interest calculations under § 218.6."
        },
        {
          type: "proposal-section",
          num: "Tab 8",
          title: "Corrected Wage Statements",
          body: "If wage statement deficiencies were identified: corrected statements for all affected pay periods. Proof of distribution to affected employees."
        },
        {
          type: "proposal-section",
          num: "Tab 9",
          title: "Complaint Mechanism & Response Records",
          body: "Documentation of the employee complaint mechanism. Records of complaints received and responses provided. For the 15% cap: pre-notice complaint history showing responsive action."
        },
        {
          type: "proposal-section",
          num: "Tab 10",
          title: "Declarations & Certifications",
          body: "Officer declaration attesting to compliance efforts and remediation completion. Payroll administrator declaration regarding system changes. Counsel declaration regarding methodology (if appropriate). All declarations under penalty of perjury."
        },
      ]
    },

    {
      number: "05",
      label: "Common Documentation Failures",
      intro: "These are the documentation gaps that most frequently prevent employers from qualifying for the penalty caps.",
      blocks: [
        {
          type: "curability-grid",
          items: [
            {status: "noncurable", title: "Undated Policies", body: "Policies without creation or effective dates cannot be verified as pre-notice. Courts will not accept a declaration stating 'this policy was in place before the notice' without independent corroboration."},
            {status: "noncurable", title: "Missing Acknowledgments", body: "A policy that was never distributed to employees is not a compliance measure. Without signed acknowledgments, the employer cannot demonstrate that employees were aware of the policy."},
            {status: "difficult", title: "Generic Training Records", body: "A sign-in sheet showing employees attended a 'compliance training' without content documentation is weak evidence. Training must be linked to specific compliance topics."},
            {status: "difficult", title: "No Audit History", body: "Employers who claim compliance but conducted no audits cannot demonstrate that their compliance program was actively monitored. Courts will view this as a paper compliance program."},
            {status: "curable", title: "Incomplete Remediation Calculations", body: "If monetary remediation was paid but the calculation methodology was not documented, supplement the record with a detailed methodology explanation. The calculation must reflect current law (Ferra/Alvarado)."},
            {status: "curable", title: "Late But Genuine Remediation", body: "Remediation completed after the 60-day window but before litigation may still support a good faith argument, even if the 30% cap is not technically available. Document it anyway."},
          ]
        },
      ]
    },

    {
      number: "06",
      label: "Dollar Impact Worksheet",
      intro: "The financial impact of the penalty caps is substantial. These calculations illustrate the exposure reduction for a typical PAGA case.",
      blocks: [
        {
          type: "calc-block",
          header: "Baseline — No Cap (50 Employees, 26 Pay Periods, 35% Violation Rate)",
          rows: [
            {label: "Aggrieved employees", value: "50"},
            {label: "Pay periods (bi-weekly, 1-year PAGA period)", value: "26"},
            {label: "Data-driven violation rate", value: "35%"},
            {label: "Employee-pay-period violations (50 × 26 × 0.35)", value: "455"},
            {label: "Penalty per violation (default $100)", value: "$100"},
            {label: "Total penalty exposure — single violation category", value: "$45,500", total: true},
          ]
        },
        {
          type: "calc-block",
          header: "With 30% Cap — Post-Notice Remediation",
          rows: [
            {label: "Baseline exposure", value: "$45,500"},
            {label: "30% cap applied", value: "× 30%"},
            {label: "Capped exposure — single category", value: "$13,650"},
            {label: "Reduction from baseline", value: "$31,850 (70%)", total: true},
          ]
        },
        {
          type: "calc-block",
          header: "With 15% Cap — Pre-Notice Compliance",
          rows: [
            {label: "Baseline exposure", value: "$45,500"},
            {label: "15% cap applied", value: "× 15%"},
            {label: "Capped exposure — single category", value: "$6,825"},
            {label: "Reduction from baseline", value: "$38,675 (85%)", total: true},
          ]
        },
        {
          type: "calc-block",
          header: "Multi-Category Comparison (4 Violation Categories)",
          rows: [
            {label: "Baseline: 4 categories × $45,500", value: "$182,000"},
            {label: "With 30% cap: 4 categories × $13,650", value: "$54,600"},
            {label: "With 15% cap: 4 categories × $6,825", value: "$27,300"},
            {label: "15% cap total reduction", value: "$154,700 (85%)", total: true},
          ]
        },
        {
          type: "info-box",
          label: "These figures are per-category.",
          text: "A typical PAGA case involves 4–8 violation categories. The cap applies to each category independently. For a case with 6 categories, the difference between the 15% cap ($40,950) and no cap ($273,000) is $232,050. The cost of implementing the pre-notice compliance program that qualifies for the 15% cap is typically $5,000–$15,000. The ROI is extraordinary."
        },
      ]
    },
  ],

  authorities: [
    {cite: "Lab. Code § 2699(g)(1)", note: "15% penalty cap — pre-notice compliance measures"},
    {cite: "Lab. Code § 2699(h)(1)", note: "30% penalty cap — post-notice remediation within 60 days"},
    {cite: "Lab. Code § 2699(i)", note: "Anti-stacking — one penalty per employee per pay period per violation"},
    {cite: "Lab. Code § 2699(f)(2)(A)", note: "Default penalty — $100 per violation"},
    {cite: "Lab. Code § 2699(f)(2)(B)", note: "Enhanced penalty — $200 for malicious/oppressive/prior findings"},
    {cite: "Lab. Code § 218.6", note: "Interest on unpaid wages — 7% per annum"},
    {cite: "Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858", note: "Premiums at regular rate of compensation"},
    {cite: "Alvarado v. Dart Container (2018) 4 Cal.5th 542", note: "Flat-sum bonuses divided by non-overtime hours"},
    {cite: "AB 2288 / SB 92 (2024)", note: "PAGA reform enacting penalty cap provisions"},
  ],

  footer: "For illustrative and educational purposes only. This tracker does not constitute legal advice. No published appellate decision has yet interpreted the penalty cap provisions. Calculations are illustrative — use the Penalty Estimator tool for case-specific modeling.",
};
