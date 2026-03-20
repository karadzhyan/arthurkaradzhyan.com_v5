export default {
  slug: "cure-proposal-framework",
  title: "Cure Proposal Framework",
  subtitle: "Employers Under 100 Employees",
  cardDesc: "Comprehensive guide to the 33-day cure process under § 2699.3. Eligibility analysis, curability assessment matrix, seven-part proposal structure with sample language, monetary remediation methodology with worked calculations, cure conference preparation with objection/rebuttal frameworks, and strategic integration with penalty cap qualification.",
  metaDescription: "Step-by-step guide to the PAGA cure proposal process under California Labor Code § 2699.3 for employers with fewer than 100 employees. 33-day timeline, eligibility analysis, curability matrix, sample proposal language, monetary remediation calculations, cure conference preparation, and strategic integration with penalty caps.",
  placeholder: false,
  relatedInsights: ["ab-2288-sb-92-a-defense-side-roadmap-to-the-2024-paga-reforms"],
  relatedTools: ["paga-reform-decision-tree", "penalty-cap-qualifier"],
  relatedCases: [],
  relatedIndustries: [],
  datePublished: "2026-01-15",
  dateModified: "2026-03-19",

  statutoryContext: {
    paragraphs: [
      {label: "Statutory basis.", text: "Labor Code § 2699.3(b)(1)(A) permits an employer with fewer than 100 employees to propose a cure within 33 days of receiving the PAGA notice. If the LWDA determines the proposal is adequate — or if the aggrieved employee does not object within the statutory window — the violations are deemed cured and the PAGA action cannot proceed on the cured categories. This is a one-shot mechanism: a rejected or inadequate cure proposal cannot be resubmitted for the same notice."},
      {label: "Strategic context.", text: "The cure proposal does not exist in isolation. It interacts with three other reform mechanisms: the 30% penalty cap under § 2699(h)(1) (which rewards post-notice remediation within 60 days), the early evaluation conference under § 2699.3(f) (which provides a confidential forum for discussing claims), and the 15% penalty cap under § 2699(g)(1) (which rewards pre-notice compliance infrastructure). Even if the cure is rejected, the work product — remediation calculations, corrected policies, training records — feeds directly into the penalty cap analysis. Every dollar spent on cure preparation is dual-purpose."},
    ]
  },

  sections: [
    // ---- SECTION 01: TIMELINE ----
    {
      number: "01",
      label: "33-Day Timeline",
      intro: "The 33-day window is jurisdictional — it cannot be extended by stipulation, court order, or equitable tolling. But the deadline is only the endpoint. What matters is the internal sequencing. The most common failure is not a late filing; it is an inadequate filing driven by compressed preparation. The timeline below allocates time to each phase based on what the LWDA evaluator will scrutinize.",
      blocks: [
        {
          type: "timeline",
          items: [
            {
              dot: "active",
              day: "Day 0",
              title: "PAGA Notice Received — Triage",
              body: "The clock begins on the date the employer actually receives the LWDA notice — not the mailing date, not the date of service on counsel. If the notice was mailed, the receipt date is presumed to be five calendar days after mailing under CCP § 1013(a), but the employer should document the actual receipt date with a timestamp, email confirmation, or certified mail receipt.",
              actions: [
                "Confirm headcount: the employer must have had fewer than 100 employees at the time of the alleged violations — not at the time of notice receipt. Pull payroll records for every pay period within the PAGA lookback.",
                "Calendar the Day 33 deadline. Add it to the docket, the case management system, and a personal calendar with reminders at Day 7, Day 14, Day 21, and Day 28.",
                "Issue a litigation hold covering all payroll records, time data, scheduling records, policies, handbooks, training materials, and communications relating to the violation categories alleged in the notice.",
                "If carrier-assigned: notify the carrier immediately. Build in at least 7 business days for carrier review and authority — this compresses every downstream phase.",
                "Order a certified copy of the LWDA filing. Confirm the notice was filed on or after June 19, 2024 (the cure mechanism applies only to post-reform notices).",
              ]
            },
            {
              dot: "default",
              day: "Days 1–5",
              title: "Violation Assessment & Curability Analysis",
              body: "Parse the PAGA notice violation by violation. Categorize each alleged violation as curable, potentially curable, or non-curable (see the Curability Matrix in Section 3). For each curable violation, identify the specific remediation action required.",
              actions: [
                "Map each violation to the underlying Labor Code section. Verify that the violation categories in the notice actually correspond to PAGA-eligible violations — not all Labor Code provisions are enforceable through PAGA.",
                "Pull time records and payroll data for the aggrieved employee group. Begin quantifying the monetary remediation: back wages owed, premium underpayments, regular rate differentials, unreimbursed expenses.",
                "Assess whether any violation categories should be excluded from the cure proposal because including them would create an acknowledgment of liability without a realistic prospect of the cure being accepted on that category.",
              ]
            },
            {
              dot: "default",
              day: "Days 6–12",
              title: "Monetary Remediation Calculation",
              body: "This is the most labor-intensive phase. The monetary component must be calculated with the same rigor as a damages model in litigation — employee-level detail, correct regular rate methodology, premium calculations at the Ferra rate, interest where applicable.",
              actions: [
                "Calculate meal and rest period premiums at the regular rate of compensation — not the base hourly rate. Under Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858, the premium must reflect all non-discretionary compensation.",
                "For overtime violations: recalculate the regular rate under Alvarado v. Dart Container (2018) 4 Cal.5th 542, dividing flat-sum bonuses by non-overtime hours only. Compare to what was actually paid.",
                "Build the remediation spreadsheet: one row per employee, columns for each violation category, per-pay-period calculations, totals, and interest. This spreadsheet is the single most important exhibit in the cure proposal.",
              ]
            },
            {
              dot: "default",
              day: "Days 13–20",
              title: "Proposal Drafting & Prospective Measures",
              body: "Draft the written cure proposal following the seven-part structure in Section 4. Simultaneously develop the prospective compliance measures — revised policies, training materials, payroll system changes, monitoring procedures.",
              actions: [
                "Draft or revise every policy implicated by the notice. Meal period policies should include the Brinker \"provide\" standard with specific scheduling language.",
                "Develop a training curriculum for supervisors covering each violation category. Include specific compliance requirements, revised policies, and monitoring expectations.",
                "Document payroll system changes: if the regular rate was miscalculated, describe the specific configuration change and when it will take effect.",
                "Establish a compliance monitoring schedule: post-cure audits at 30, 60, and 90 days with identified auditors, review scope, and corrective action protocols.",
              ]
            },
            {
              dot: "default",
              day: "Days 21–28",
              title: "Internal Review, Carrier Authority & Filing Preparation",
              body: "Review the proposal with the client. Walk through each remediation commitment and confirm the employer can and will fulfill it. If carrier-assigned, submit for carrier review.",
              actions: [
                "Client meeting: review the monetary remediation total, confirm budget approval, discuss implementation timeline feasibility, obtain authorization to bind the entity.",
                "Carrier submission: include a cover memo explaining the strategic rationale, the monetary exposure with and without the cure, and the penalty cap implications if the cure is rejected.",
                "Prepare the LWDA filing package: cure proposal, declarations, exhibits, proof of service.",
              ]
            },
            {
              dot: "critical",
              day: "Day 33 — Jurisdictional Deadline",
              title: "File Cure Proposal with LWDA & Serve on Plaintiff's Counsel",
              body: "Submit the cure proposal to the LWDA and serve a copy on the aggrieved employee's counsel on or before Day 33. There is no extension mechanism. A filing on Day 34 is treated as no filing.",
              actions: [
                "File with the LWDA via the method specified in the notice or on the LWDA website. Retain proof of filing: confirmation email, filing receipt, timestamp.",
                "Serve on plaintiff's counsel by the method most likely to produce a contemporaneous proof of service.",
              ]
            },
            {
              dot: "default",
              day: "Days 34–60",
              title: "Response Window & 30% Cap Parallel Track",
              body: "While waiting for the employee's response, continue implementing remediation. The 60-day window for the 30% penalty cap under § 2699(h)(1) runs concurrently. Even if the cure is rejected, completing remediation within 60 days preserves the cap argument.",
              actions: [
                "Begin making monetary payments to affected employees as described in the proposal. Do not wait for cure acceptance.",
                "Implement policy revisions. Schedule and complete supervisor training. Document every action with dates and evidence.",
              ]
            },
          ]
        },
        {
          type: "danger-box",
          label: "Critical.",
          text: "The 33-day deadline is jurisdictional. It cannot be extended by stipulation, court order, equitable tolling, or carrier delay. If the carrier review process threatens to extend beyond the deadline, file the proposal with a cover letter noting that supplemental information may follow — but get the proposal on file."
        },
      ]
    },

    // ---- SECTION 02: ELIGIBILITY ----
    {
      number: "02",
      label: "Eligibility Verification",
      intro: "Eligibility turns on a single threshold — the employer must have had fewer than 100 employees at the time of the alleged violations. But this simple threshold conceals several analytical questions that can determine whether the mechanism is available.",
      blocks: [
        {
          type: "checklist",
          id: "eligibility-checklist",
          items: [
            {label: "Headcount threshold.", text: "Employer had fewer than 100 employees at the time of the alleged violations. Count all employees, not just those in the aggrieved class. Include part-time, seasonal, and temporary employees. The statute says \"employees\" — not FTEs."},
            {label: "Measurement date.", text: "The threshold is measured at the time of the alleged violations, not at the time of notice receipt. If the employer grew past 100 after the violation period but was below 100 during it, the cure mechanism is available."},
            {label: "Joint employer analysis.", text: "If a staffing firm, franchisor, or parent company is alleged to be a joint employer, determine whether the joint employer's employees count toward the threshold. The statute does not explicitly address this. Conservative approach: include them and address the issue in the proposal."},
            {label: "Multi-entity employers.", text: "If the employer operates through multiple legal entities that share employees, management, or operational control, assess whether an integrated enterprise theory could aggregate headcounts across entities."},
            {label: "No prior cure for same violations.", text: "The employer has not previously submitted a cure proposal for the same violations alleged in this notice. This is a per-violation analysis — a prior cure on meal periods does not preclude a cure for overtime violations."},
            {label: "Post-reform notice.", text: "The PAGA notice was filed with the LWDA on or after June 19, 2024. Verify the LWDA filing date, not the service date."},
            {label: "Curability assessment.", text: "At least some of the alleged violations are curable through monetary payments, policy corrections, system changes, or training."},
            {label: "No prior adverse finding.", text: "No prior court or LWDA finding for the same violations. A prior finding undermines both the cure proposal's credibility and the penalty cap arguments."},
            {label: "33-day window is open.", text: "The filing deadline has not passed. Calculate from the actual receipt date."},
          ]
        },
        {
          type: "warning-box",
          label: "Headcount fluctuation.",
          text: "If the employer's headcount fluctuated above and below 100 during the PAGA period (e.g., seasonal businesses, growth-stage startups), the analysis is more complex. Absent appellate guidance, the safest approach is to demonstrate that the headcount was below 100 for the majority of the relevant period and to address the fluctuation directly in the eligibility declaration."
        },
      ]
    },

    // ---- SECTION 03: CURABILITY MATRIX ----
    {
      number: "03",
      label: "Curability Assessment Matrix",
      intro: "Not every PAGA violation is curable. The cure mechanism is most effective for system-based violations — failures that result from policies, payroll configurations, or operational processes that can be corrected. It is least effective for conduct-based violations — deliberate refusal to comply or practices that cannot be undone through policy changes.",
      blocks: [
        {
          type: "curability-grid",
          items: [
            {status: "curable", title: "Wage Statement Deficiencies", body: "Missing or incorrect elements under § 226(a). Cure: correct the statement format, issue corrected statements for prior periods, reconfigure the payroll system."},
            {status: "curable", title: "Regular Rate Miscalculation", body: "Failure to include non-discretionary bonuses, commissions, or shift differentials in the regular rate. Cure: recalculate and pay the difference, reconfigure the payroll system."},
            {status: "curable", title: "Final Pay Timing", body: "Late payment of final wages upon termination (§ 201/202). Cure: pay outstanding amounts with applicable waiting time penalties, implement a final pay procedure."},
            {status: "curable", title: "Expense Reimbursement", body: "Failure to reimburse necessary business expenses under § 2802. Cure: calculate and pay outstanding reimbursements, implement a reimbursement policy."},
            {status: "difficult", title: "Meal Period Scheduling Failures", body: "If violations resulted from inadequate scheduling systems or unclear policies — rather than deliberate denial — the violation is curable through system and policy changes plus retroactive premiums."},
            {status: "difficult", title: "Rest Period Policy Gaps", body: "If rest periods were not provided because of policy silence, the gap is curable. If rest periods were affirmatively denied by supervisors, the curability argument is weaker."},
            {status: "difficult", title: "Overtime Calculation Errors", body: "If overtime was not paid correctly due to payroll system misconfiguration, the error is system-based and curable. If overtime was not paid because hours were not recorded, curability depends on whether the recording failure was systemic or individual."},
            {status: "noncurable", title: "Willful Misclassification", body: "Deliberate classification of employees as independent contractors or exempt employees to avoid wage-and-hour obligations. The underlying conduct cannot be cured retroactively."},
            {status: "noncurable", title: "Deliberate Meal Period Denial", body: "A policy or practice of affirmatively requiring employees to work through meal periods. This reflects a deliberate choice that the evaluator may view as non-curable through prospective policy changes alone."},
            {status: "noncurable", title: "Off-the-Clock Work Directives", body: "Systematic instructions to employees to perform work before clocking in or after clocking out. Like deliberate meal period denial, this is conduct-based and reflects a deliberate policy of wage theft."},
          ]
        },
        {
          type: "info-box",
          label: "Strategic note on partial cures.",
          text: "The cure proposal does not need to address every violation in the notice. If the notice alleges five violation categories and only three are curable, submit a proposal addressing the three. The non-cured categories remain actionable, but the employer has eliminated three fronts. This also narrows the scope of subsequent litigation and reduces the penalty exposure model."
        },
        {
          type: "info-box",
          label: "Recoverable vs. non-recoverable.",
          text: "Curability and recoverability are different questions. Some violations are curable but their penalties are not recoverable through PAGA (e.g., overtime underpayments are wages, not civil penalties — per ZB, N.A. v. Superior Court). Use the Recoverability Checker tool on this site to confirm which violation categories in the notice actually generate PAGA-recoverable penalties before building the cure proposal's priority matrix.",
          crossRef: {tool: "Recoverability Checker"}
        },
      ]
    },

    // ---- SECTION 04: PROPOSAL STRUCTURE ----
    {
      number: "04",
      label: "Proposal Structure & Sample Language",
      intro: "The cure proposal is a formal filing with the LWDA. It must be comprehensive, specific, and verifiable. The evaluator will assess whether the proposal genuinely addresses the violations or is a superficial gesture. Every remediation action must identify what will be done, how much will be paid, when it will be completed, and how completion will be verified.",
      blocks: [
        {
          type: "proposal-section",
          num: "Section I",
          title: "Employer Identification & Eligibility Statement",
          body: "Legal entity name, address, EIN, industry classification, applicable wage order(s). Declaration under penalty of perjury that the employer employed fewer than 100 employees during the relevant period. Attach payroll summary showing headcount for each pay period within the PAGA lookback."
        },
        {
          type: "sample-block",
          label: "Sample Language — Eligibility Declaration",
          text: "I, [Name], am the [Title] of [Employer Name] and am authorized to make this declaration on behalf of the company. I have personal knowledge of the facts stated herein. During the period from [Start Date] through [End Date], [Employer Name] employed between [minimum] and [maximum] employees in any given pay period, as reflected in the attached payroll summary (Exhibit A). At no point during this period did the company employ 100 or more individuals. I declare under penalty of perjury under the laws of the State of California that the foregoing is true and correct.",
          placeholders: ["Name", "Title", "Employer Name", "Start Date", "End Date", "minimum", "maximum"]
        },
        {
          type: "proposal-section",
          num: "Section II",
          title: "Notice Summary & Violation Categorization",
          body: "Restate each alleged violation from the PAGA notice by statutory section. Categorize each as curable or non-curable. For each curable violation, provide a one-sentence description of the remediation approach. This section serves as the roadmap."
        },
        {
          type: "sample-block",
          label: "Sample Language — Violation Categorization",
          text: "Violation 1: Meal Period Violations (Lab. Code §§ 226.7, 512) — Curable. The alleged violations resulted from scheduling system limitations that did not enforce automatic meal break scheduling for shifts exceeding five hours. Remediation: retroactive premium payments at the regular rate for all missed or short meal periods identified in the time records, plus implementation of an automated scheduling system with meal break enforcement.\n\nViolation 2: Wage Statement Deficiencies (Lab. Code § 226) — Curable. Wage statements omitted the applicable hourly rate(s) for employees paid at multiple rates during a pay period. Remediation: corrected wage statements for all affected pay periods, plus payroll system reconfiguration to display all applicable rates.\n\nViolation 3: Overtime Underpayment (Lab. Code § 510) — Curable. The regular rate calculation did not include [flat-sum bonus / shift differential / other component]. Remediation: recalculation and retroactive payment of the differential, plus payroll system reconfiguration.",
          placeholders: ["flat-sum bonus / shift differential / other component"]
        },
        {
          type: "proposal-section",
          num: "Section III",
          title: "Monetary Remediation — Detailed Calculations",
          body: "For each violation category involving unpaid wages, premiums, or reimbursements: the total amount owed, per-employee calculations, methodology, and payment timeline. The methodology must reflect current law. Attach the remediation spreadsheet as an exhibit with employee-level detail."
        },
        {
          type: "calc-block",
          header: "Illustrative — Meal Period Remediation (Single Employee)",
          rows: [
            {label: "Base hourly rate", value: "$20.00/hr"},
            {label: "Non-discretionary bonus (quarterly)", value: "$1,200.00"},
            {label: "Total hours worked in quarter (non-OT)", value: "480 hrs"},
            {label: "Bonus component of regular rate ($1,200 ÷ 480)", value: "$2.50/hr"},
            {label: "Regular rate of compensation (Ferra)", value: "$22.50/hr"},
            {label: "Missed meal periods identified in time records", value: "8 instances"},
            {label: "Premium per missed meal (1 hr × regular rate)", value: "$22.50"},
            {label: "Total meal period remediation — this employee", value: "$180.00", total: true},
          ]
        },
        {
          type: "calc-block",
          header: "Illustrative — Regular Rate Remediation (Flat-Sum Bonus)",
          rows: [
            {label: "Base hourly rate", value: "$18.00/hr"},
            {label: "Flat-sum attendance bonus (monthly)", value: "$200.00"},
            {label: "Non-overtime hours in month", value: "152 hrs"},
            {label: "Bonus component per Alvarado ($200 ÷ 152 non-OT hrs)", value: "$1.32/hr"},
            {label: "Correct regular rate", value: "$19.32/hr"},
            {label: "Correct OT rate (1.5×)", value: "$28.98/hr"},
            {label: "Rate actually paid for OT", value: "$27.00/hr"},
            {label: "Underpayment per OT hour", value: "$1.98/hr"},
            {label: "OT hours in month", value: "12 hrs"},
            {label: "Total regular rate remediation — this employee, this month", value: "$23.76", total: true},
          ]
        },
        {
          type: "info-box",
          label: "Model these calculations interactively.",
          text: "The Regular Rate Calculator tool on this site automates the Ferra and Alvarado methodology across compensation types — commissions, flat-sum bonuses, piece-rate, shift differentials. Use it to generate per-employee remediation figures for the spreadsheet (Exhibit C). The Derivative Mapper tool shows how each violation category generates downstream penalty streams pre- and post-reform — relevant to determining which violation categories to include in the cure proposal.",
          crossRef: {tools: ["Regular Rate Calculator", "Derivative Mapper"]}
        },
        {
          type: "warning-box",
          label: "Interest.",
          text: "Include statutory interest in the monetary calculation. Under Labor Code § 218.6, interest accrues at 7% per annum on unpaid wages from the date due. Omitting interest is a common deficiency that evaluators will flag."
        },
        {
          type: "proposal-section",
          num: "Section IV",
          title: "Prospective Compliance Measures",
          body: "For each curable violation: the specific policy, system, or procedural change that will prevent recurrence. Each measure must include an implementation date, the responsible individual, and a verification method."
        },
        {
          type: "accordion",
          title: "Sample Prospective Measures — Meal Period Compliance",
          subsections: [
            {label: "Policy Revision", text: "Implement a revised Meal Period Policy (Exhibit B) that: (a) requires all non-exempt employees working shifts exceeding five hours to be provided an uninterrupted 30-minute meal period before the end of the fifth hour; (b) requires a second meal period for shifts exceeding 10 hours; (c) provides a compliant meal period waiver form for shifts of six hours or less (first meal) and 12 hours or less (second meal); (d) prohibits supervisors from assigning tasks during meal periods; and (e) establishes a reporting mechanism for employees who believe their meal period was interrupted or denied. Distribution to all employees with signed acknowledgment by [Date]."},
            {label: "System Implementation", text: "Configure the timekeeping system ([System Name]) to: (a) generate automatic meal break alerts when an employee has worked 4.5 hours without a clock-out; (b) flag all meal periods shorter than 30 minutes for supervisor review; (c) auto-calculate and pay meal period premiums at the regular rate for all flagged short or missed meal periods unless a valid waiver is on file. Target completion: [Date]."},
            {label: "Training", text: "All supervisors and managers will complete a 90-minute meal period compliance training covering: the \"provide\" standard under Brinker, the Donohue rebuttable presumption, waiver requirements, supervisor responsibilities, and the consequences of non-compliance. Training conducted by [Trainer/Firm] on [Date(s)]. New supervisors will complete within 30 days of hire."},
            {label: "Monitoring", text: "Monthly audit of timekeeping records to identify: (1) short meal punches (< 30 minutes), (2) late meal punches (beginning after the 5th hour), and (3) missing meal punches. Audit results reviewed by [Title] monthly. Non-compliance trends escalated to [Senior Management] within 5 business days."},
          ]
        },
        {
          type: "accordion",
          title: "Sample Prospective Measures — Wage Statement Compliance",
          subsections: [
            {label: "System Reconfiguration", text: "Reconfigure the payroll system to include all nine required elements of § 226(a) on every wage statement: (1) gross wages earned, (2) total hours worked, (3) piece-rate units and applicable rate (if applicable), (4) all deductions, (5) net wages earned, (6) inclusive pay period dates, (7) employee name and identification number or last four digits of SSN, (8) name and address of the legal entity, and (9) all applicable hourly rates and corresponding hours worked at each rate."},
            {label: "Corrected Statements", text: "Issue corrected wage statements for all pay periods during the PAGA lookback where any element was missing or incorrect. Corrected statements provided with a cover letter explaining the corrections."},
            {label: "Post-Ferra Display", text: "For meal and rest period premiums, the wage statement will display the premium at the regular rate of compensation — not the base hourly rate — consistent with Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858."},
          ]
        },
        {
          type: "proposal-section",
          num: "Section V",
          title: "Documentation of Prior Compliance Efforts",
          body: "If the employer made compliance improvements before receiving the notice, document them here. This serves two purposes: (1) it demonstrates good faith to the cure evaluator, and (2) it preserves the record for the 15% penalty cap under § 2699(g)(1) if the cure is rejected."
        },
        {
          type: "proposal-section",
          num: "Section VI",
          title: "Implementation Timeline & Verification Protocol",
          body: "Date-specific timeline for every remediation action. Monetary payments: within 30 days. Policy revisions: within 14 days. Training: within 45 days. Payroll system changes: effective next full pay period. Proposed verification: sworn declaration, third-party audit, or LWDA inspection."
        },
        {
          type: "proposal-section",
          num: "Section VII",
          title: "Declarations & Supporting Exhibits",
          body: "Required declarations: (a) Company officer — attesting to headcount, remediation commitment, authority to bind. (b) Payroll administrator or HR director — detailing system changes and timeline. (c) Counsel (if appropriate) — confirming monetary methodology.\n\nExhibits: A — Payroll summary (headcount per pay period). B — Revised policies. C — Remediation spreadsheet (employee-level). D — Training curriculum and schedule. E — Payroll system configuration documentation. F — Prior compliance efforts. G — Implementation timeline chart."
        },
      ]
    },

    // ---- SECTION 05: CURE CONFERENCE ----
    {
      number: "05",
      label: "Cure Conference — Preparation & Strategy",
      intro: "The cure conference is convened only if the aggrieved employee's counsel objects. If no objection is filed, the cure is deemed accepted. But objections are routine — plaintiff's counsel has every incentive to object, because an accepted cure eliminates the case. Prepare with the same rigor as a mediation.",
      blocks: [
        {
          type: "accordion",
          title: "Conference Structure & Procedures",
          subsections: [
            {label: "Confidentiality", text: "The proceeding is confidential — statements made cannot be used as evidence in subsequent litigation if the cure is rejected. This allows the employer to acknowledge deficiencies and propose remediation without creating admissions."},
            {label: "Format", text: "The conference may be conducted in person, by video, or by telephone. Expect 60–90 minutes. Bring the remediation spreadsheet, corrected policies, training materials, and all declarations. Have the payroll administrator available to answer technical questions."},
            {label: "Evaluator's Role", text: "The evaluator is not an adversary. The evaluator is assessing whether the proposal genuinely addresses the violations — not whether it is perfect. Demonstrate responsiveness, specificity, and good faith. If the evaluator identifies a gap, offer to supplement rather than arguing the gap does not exist."},
          ]
        },
        {
          type: "accordion",
          title: "Common Objections & Detailed Rebuttals",
          subsections: [
            {label: "Objection: Monetary Remediation Is Incomplete", text: "Rebuttal: Walk through the remediation spreadsheet line by line. Show the methodology: data source, calculation approach (regular rate under Ferra/Alvarado, premium calculation under § 226.7), interest calculation, and total per employee. If the objection identifies specific employees, offer to supplement. The most common challenge is premiums calculated at base rate rather than regular rate — demonstrate the Ferra methodology."},
            {label: "Objection: Prospective Measures Are Insufficient", text: "Rebuttal: Detail the specific policy changes, training protocol, system reconfiguration, and monitoring frequency. Offer third-party compliance monitoring if the evaluator considers it appropriate. Present the implementation timeline with specific dates."},
            {label: "Objection: Violations Are Not Curable", text: "Rebuttal: Distinguish between system-based and conduct-based violations. If meal period violations resulted from scheduling failures, the system change is the cure. The statute does not require that the conduct be erased; it requires that the violation be \"cured\" — which encompasses both remediation and prospective compliance."},
            {label: "Objection: Employer Exceeded 100-Employee Threshold", text: "Rebuttal: Present payroll records for each relevant pay period. If there was seasonal fluctuation, explain the pattern and demonstrate the employer was below 100 for the substantial majority. Address whether temporary or staffing agency employees are counted."},
            {label: "Objection: Employer Has History of Same Violations", text: "Rebuttal: If there is no prior court or LWDA finding, state so. Distinguish prior complaints or investigations that did not result in findings. Clarify that the cure mechanism operates on a per-violation basis."},
          ]
        },
        {
          type: "accordion",
          title: "Presentation Strategy & Sequencing",
          subsections: [
            {label: "Opening", text: "Begin with a brief statement of commitment to compliance. Do not be defensive. Acknowledge that the notice identified areas for improvement. Set the tone: responsive, specific, good-faith."},
            {label: "Lead with Money", text: "Present the monetary remediation first. Walk through the spreadsheet — methodology, per-employee calculations, totals. The evaluator needs to see employee-level math, not a lump sum estimate."},
            {label: "Prospective Measures", text: "Walk through compliance changes: revised policies, system reconfigurations, training curriculum, monitoring schedule. Present already-implemented measures with evidence of completion."},
            {label: "Verification", text: "Close with the verification mechanism. Offer concrete options: sworn declaration, third-party audit, or LWDA inspection."},
            {label: "What Not to Do", text: "Do not argue that the violations did not occur. The cure conference is not the forum for liability disputes. Challenging the underlying allegations undermines the premise of the proposal and signals that the employer is not genuinely committed to compliance."},
          ]
        },
        {
          type: "accordion",
          title: "Post-Conference Outcomes & Next Steps",
          subsections: [
            {label: "Outcome 1: Cure Accepted", text: "Complete all remediation within specified timelines. Document every action item. Retain proof of payment, policy acknowledgments, training records, system change confirmations, and post-cure audit results."},
            {label: "Outcome 2: Cure Accepted with Modifications", text: "The evaluator may require additional remediation or an accelerated timeline. Assess feasibility, implement changes, and document compliance with each modification."},
            {label: "Outcome 3: Cure Rejected", text: "The PAGA action proceeds. But the cure documentation serves multiple purposes: (1) 30% penalty cap evidence if remediation was completed within 60 days. (2) Mediation positioning — demonstrates the employer quantified exposure, remediated harm, and implemented compliance. (3) Good faith evidence for any subsequent penalty determination. (4) The employee-level remediation spreadsheet becomes the defense exposure model."},
            {label: "Outcome 4: No Objection Filed", text: "If the employee does not object within the statutory window, the cure is deemed accepted by operation of law. Monitor the LWDA docket. Confirm acceptance in writing and proceed with remediation."},
          ]
        },
      ]
    },

    // ---- SECTION 06: POST-CURE DOCUMENTATION ----
    {
      number: "06",
      label: "Post-Cure Documentation & Compliance Verification",
      intro: "The cure proposal is a commitment. Post-cure documentation is the proof that the commitment was fulfilled. This evidence serves four purposes: (1) satisfying the LWDA, (2) supporting the 30% penalty cap if rejected, (3) defending against subsequent PAGA notices, and (4) demonstrating compliance culture to carriers, mediators, and courts.",
      blocks: [
        {
          type: "checklist",
          id: "postcure-checklist",
          items: [
            {label: "Monetary payments completed.", text: "Proof of payment to each affected employee. Cross-reference against the remediation spreadsheet to confirm every employee received the correct amount."},
            {label: "Interest included.", text: "Statutory interest at 7% per annum (Lab. Code § 218.6) calculated from the date each payment was due through the date of actual payment."},
            {label: "Revised policies distributed.", text: "Corrected policies distributed to all employees with signed acknowledgment forms. Date-stamped copies retained."},
            {label: "Training completed.", text: "Attendance sheets with signatures, dates, and session duration. Training materials retained. Certificate of completion for each supervisor."},
            {label: "Payroll system reconfigured.", text: "Screenshots of changes. Vendor confirmation. Test pay period results demonstrating correct calculations."},
            {label: "Corrected wage statements issued.", text: "Copies of corrected statements for all affected pay periods with proof of distribution."},
            {label: "Post-cure audits completed.", text: "At least two pay periods of post-implementation audit results demonstrating ongoing compliance."},
            {label: "Completion declaration filed.", text: "Declaration of officer confirming all remediation completed within specified timelines. Filed with LWDA and served on plaintiff's counsel."},
            {label: "File indexed and preserved.", text: "Complete cure file organized, indexed, and preserved. Retention period: at least 4 years (the maximum PAGA lookback)."},
          ]
        },
      ]
    },

    // ---- SECTION 07: STRATEGIC INTEGRATION ----
    {
      number: "07",
      label: "Strategic Integration — Cure, Caps & Litigation",
      intro: "The cure proposal is not a standalone document — it is the first move in a multi-phase defense strategy. Understanding how the cure interacts with penalty caps, the early evaluation conference, and litigation positioning is essential to maximizing its value regardless of outcome.",
      blocks: [
        {
          type: "accordion",
          title: "Relationship to the 30% Penalty Cap (§ 2699(h)(1))",
          text: "The 30% cap requires that the employer take \"all reasonable steps\" to come into compliance within 60 days of the notice. The cure proposal process runs within this window. Begin implementing remediation immediately — do not wait for the cure to be accepted or rejected. If the cure is rejected on Day 50 but remediation was completed by Day 45, the employer still qualifies for the 30% cap.\n\nThis is the critical insight: the cure process and the cap process are parallel, not sequential. Every action taken for the cure simultaneously builds the cap record. Defense counsel should explain this dual-purpose structure to the client and the carrier from Day 1."
        },
        {
          type: "accordion",
          title: "Relationship to the 15% Penalty Cap (§ 2699(g)(1))",
          text: "The 15% cap requires pre-notice compliance infrastructure. Section V of the cure proposal (Documentation of Prior Compliance Efforts) creates the record for this cap. Even if the cure is rejected, the pre-notice documentation supports the more aggressive 15% cap argument.\n\nThe strongest defense posture combines both caps: 15% on violation categories where pre-notice infrastructure existed, and 30% on categories where post-notice remediation was completed within 60 days. This per-category cap application has not been tested in published authority, but the statutory text supports it — § 2699(g) and § 2699(h) operate independently."
        },
        {
          type: "accordion",
          title: "Relationship to the Early Evaluation Conference (§ 2699.3(f))",
          text: "The cure and the EEC are separate mechanisms. The cure is for employers under 100; the EEC is for all employers. An eligible employer should pursue both. If the EEC is scheduled before the cure conference, use it to gauge the LWDA's preliminary assessment. If the cure comes first, the outcome informs EEC strategy — an accepted cure narrows the scope; a rejected cure reveals evaluator concerns that can be addressed in the EEC context."
        },
        {
          type: "accordion",
          title: "If the Cure Fails — Litigation Positioning",
          text: "A rejected cure is not a loss — it is a repositioning. The employer enters litigation with:\n\nA fully developed remediation record that demonstrates good faith, quantifies exposure, and shows prospective compliance.\n\nPenalty cap evidence already assembled. The cure documentation is the 30% cap evidence. If pre-notice compliance was documented in Section V, the 15% cap evidence is also in hand.\n\nA narrowed exposure model. The employee-level remediation spreadsheet replaces back-of-the-envelope estimates with data-driven analysis.\n\nAn anti-stacking foundation. The per-employee, per-violation methodology supports the anti-stacking argument under § 2699(i).\n\nMediation leverage. Present the cure proposal and remediation record at mediation. The employer offered comprehensive remediation within 33 days, the employee rejected it, and the employer completed the remediation anyway. This reframes the narrative: the employer is not resisting compliance; the plaintiff is resisting resolution."
        },
        {
          type: "accordion",
          title: "Scope Management — When the Remediation Analysis Reveals More Than the Notice Alleged",
          text: "This is the tension no checklist addresses: you pull payroll data to calculate meal period premiums for the cure proposal and discover that the regular rate was also miscalculated — a violation the PAGA notice did not allege. Do you include the newly discovered violations in the cure proposal, or exclude them?\n\nInclude: The Case For. Including undiscovered violations demonstrates comprehensive good faith. The evaluator sees an employer that went beyond what was alleged. If the cure is accepted, those categories are cured too — eliminating future exposure.\n\nExclude: The Case Against. Including violations the plaintiff hasn't found creates an acknowledgment record. If the cure is rejected, the cure proposal is now a roadmap showing the plaintiff exactly where to look. The confidentiality protections cover the cure conference — but the cure proposal itself is a filed document.\n\nThe Recommended Approach. Remediate the newly discovered violations operationally — fix the payroll system, pay the back wages — without including them as line items in the cure proposal. The cure proposal addresses the violations in the notice. The remediation of additional violations is part of the prospective compliance measures and the general remediation evidence supporting the 30% penalty cap. If the evaluator asks, respond truthfully — the confidentiality protections apply — and explain that the employer remediated them as part of comprehensive compliance improvement."
        },
        {
          type: "info-box",
          label: "Cross-references.",
          text: "The monetary remediation methodology in Section 4 of this framework uses the same regular rate calculations modeled in the Regular Rate Calculator tool on this site. Use the Penalty Estimator tool to model the total PAGA exposure with and without the cure — this produces the cost-benefit analysis carriers need for authority approval. The Cap Qualifier tool tracks the documentation requirements for the 15% and 30% penalty caps that the cure process feeds into.",
          crossRef: {tools: ["Regular Rate Calculator", "Penalty Estimator", "Cap Qualifier"]}
        },
      ]
    },
  ],

  // Checklist progress tracking (total items for the progress bar)
  checklistTotal: 18,

  authorities: [
    {cite: "Lab. Code § 2699.3(b)(1)(A)", note: "33-day cure proposal window for employers with fewer than 100 employees"},
    {cite: "Lab. Code § 2699.3(b)(1)(B)", note: "Cure conference procedures and neutral evaluator determination"},
    {cite: "Lab. Code § 2699(g)(1)", note: "15% penalty cap for pre-notice compliance measures"},
    {cite: "Lab. Code § 2699(h)(1)", note: "30% penalty cap for post-notice remediation within 60 days"},
    {cite: "Lab. Code § 2699(i)", note: "Anti-stacking — one penalty per employee per pay period per violation"},
    {cite: "Lab. Code § 2699.3(f)", note: "Early evaluation conference process"},
    {cite: "Lab. Code § 218.6", note: "Statutory interest rate on unpaid wages (7% per annum)"},
    {cite: "Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858", note: "Meal/rest premiums calculated at regular rate, not base rate"},
    {cite: "Alvarado v. Dart Container (2018) 4 Cal.5th 542", note: "Flat-sum bonuses divided by non-overtime hours only for regular rate"},
    {cite: "Brinker Restaurant Corp. v. Superior Court (2012) 53 Cal.4th 1004", note: "Employer must \"provide\" meal periods — not \"ensure\" they are taken"},
    {cite: "Donohue v. AMN Services (2021) 11 Cal.5th 58", note: "Short meal punch creates rebuttable presumption of non-compliance"},
    {cite: "Naranjo v. Spectrum Security (2022) 13 Cal.5th 93", note: "Meal/rest premiums are \"wages\" triggering derivative penalties"},
    {cite: "AB 2288 / SB 92 (2024)", note: "Enacted cure proposal framework as part of comprehensive PAGA reform"},
  ],

  footer: "For illustrative and educational purposes only. This framework does not constitute legal advice. The cure proposal process involves statutory deadlines that cannot be extended — consult counsel immediately upon receiving a PAGA notice. Monetary calculation examples are illustrative; actual remediation requires employee-level analysis. Statutory citations are to the Labor Code as amended by AB 2288 and SB 92 (effective June 19, 2024). No published appellate decision has yet interpreted the cure provisions.",
};
