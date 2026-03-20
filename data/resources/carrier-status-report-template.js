export default {
  slug: "carrier-status-report-template",
  title: "Carrier Status Report Template",
  subtitle: "First 30 Days After Notice",
  cardDesc: "Structured format for the initial carrier report: matter summary, three-scenario exposure analysis, defense strategy recommendation, litigation budget estimate, and early resolution assessment.",
  metaDescription: "Template for the initial EPLI carrier status report after receiving a PAGA notice. Matter summary, three-scenario exposure, defense strategy, budget, and resolution assessment.",
  placeholder: false,

  statutoryContext: {
    paragraphs: [
      {label: "Why the initial report matters.", text: "The carrier's first impression of the matter drives reserve setting, authority timelines, and strategic latitude. A report that presents only the plaintiff's demand without independent analysis signals that defense counsel has not done the work. A report that presents a data-driven exposure model with a clear defense strategy recommendation demonstrates analytical rigor and earns carrier confidence."},
      {label: "Timing.", text: "The initial status report should be submitted within 30 days of counsel's engagement. This timeline balances thoroughness against the 33-day cure deadline (if applicable) and the 60-day remediation window for the 30% penalty cap. If the cure deadline is imminent, file a preliminary report and supplement after the cure proposal is submitted."},
    ]
  },

  sections: [
    {
      number: "01",
      label: "Report Structure",
      intro: "The initial status report follows a seven-part structure designed for carrier claims adjusters and coverage counsel.",
      blocks: [
        {
          type: "proposal-section",
          num: "I",
          title: "Matter Summary",
          body: "Insured entity name. Named plaintiff. Counsel for plaintiff. Counsel for defendant. PAGA notice filing date. LWDA notice number (if available). Violation categories alleged. PAGA period. Aggrieved employee estimate. Procedural status (pre-litigation / complaint filed / discovery stage). Applicable insurance policy and coverage limits."
        },
        {
          type: "proposal-section",
          num: "II",
          title: "Violation Category Analysis",
          body: "For each violation category alleged in the PAGA notice: the statutory basis, a preliminary merit assessment (strong defense / mixed / weak defense), the applicable penalty rate, and any reform mechanisms that apply. This is a table format — one row per violation category."
        },
        {
          type: "proposal-section",
          num: "III",
          title: "Three-Scenario Exposure Analysis",
          body: "Scenario 1 (Plaintiff Maximum): plaintiff's methodology, 100% violation rate, maximum penalties. Scenario 2 (Data-Driven Realistic): actual violation rates from employer records, applicable reform provisions. Scenario 3 (Defense Best Case): actual rates plus penalty caps, anti-stacking, standing challenges. Per-category breakdown and case-level summary."
        },
        {
          type: "proposal-section",
          num: "IV",
          title: "Reform Mechanism Assessment",
          body: "Which reform mechanisms are available: cure (if under 100 employees), 15% cap (if pre-notice compliance exists), 30% cap (if remediation is underway), EEC (all employers), standing challenges (§ 2699(c)(1)), anti-stacking (§ 2699(i)), manageability (§ 2699(p)). Status of each — available, in progress, or not available."
        },
        {
          type: "proposal-section",
          num: "V",
          title: "Defense Strategy Recommendation",
          body: "Recommended defense approach: early resolution, litigation to mediation, or full litigation. Supporting rationale. Key defense motions: arbitration (Adolph), standing (§ 2699(c)(1)), manageability (§ 2699(p)), demurrer. Timeline for each."
        },
        {
          type: "proposal-section",
          num: "VI",
          title: "Litigation Budget Estimate",
          body: "Phase-based budget: pre-litigation / pleading stage, written discovery, depositions, motion practice, mediation, trial preparation. Total estimated defense cost through resolution. Comparison to settlement range — is early resolution more cost-effective?"
        },
        {
          type: "proposal-section",
          num: "VII",
          title: "Early Resolution Assessment",
          body: "Is pre-litigation or early-stage resolution viable? If yes: recommended approach (direct negotiation, mediation, EEC). Recommended settlement range. If no: what must happen before resolution is possible (discovery needed, motion outcome, etc.)."
        },
      ]
    },

    {
      number: "02",
      label: "Exposure Analysis Examples",
      intro: "These calc-blocks illustrate the three-scenario analysis for a typical carrier report.",
      blocks: [
        {
          type: "calc-block",
          header: "Scenario 1 — Plaintiff Maximum",
          rows: [
            {label: "Meal period penalties (50 × 26 × 100% × $100)", value: "$130,000"},
            {label: "Rest period penalties", value: "$130,000"},
            {label: "Overtime (regular rate differential)", value: "$45,000"},
            {label: "Wage statement penalties", value: "$130,000"},
            {label: "Plaintiff Maximum — all categories", value: "$435,000", total: true},
          ]
        },
        {
          type: "calc-block",
          header: "Scenario 2 — Data-Driven Realistic",
          rows: [
            {label: "Meal period (28% actual rate, anti-stacked)", value: "$36,400"},
            {label: "Rest period (15% actual rate, anti-stacked)", value: "$19,500"},
            {label: "Overtime differential", value: "$12,300"},
            {label: "Wage statement (systemic — 100%)", value: "$130,000"},
            {label: "Data-Driven Realistic — all categories", value: "$198,200", total: true},
          ]
        },
        {
          type: "calc-block",
          header: "Scenario 3 — Defense Best Case (30% Cap)",
          rows: [
            {label: "Scenario 2 total", value: "$198,200"},
            {label: "30% penalty cap applied", value: "× 30%"},
            {label: "Defense Best Case — all categories", value: "$59,460", total: true},
          ]
        },
        {
          type: "calc-block",
          header: "Budget Comparison",
          rows: [
            {label: "Defense cost through mediation (estimated)", value: "$75,000–$100,000"},
            {label: "Settlement range (Scenario 2 × 50–75%)", value: "$99,100–$148,650"},
            {label: "Total cost of litigation + settlement", value: "$174,100–$248,650"},
            {label: "Early resolution target (Scenario 2 × 40%)", value: "$79,280"},
            {label: "Early resolution savings", value: "$94,820–$169,370", total: true},
          ]
        },
      ]
    },

    {
      number: "03",
      label: "Reporting Schedule",
      intro: "After the initial report, maintain regular communication with the carrier.",
      blocks: [
        {
          type: "timeline",
          items: [
            {dot: "critical", day: "Day 30", title: "Initial Status Report", body: "Full seven-part report as described above.", actions: ["Submit within 30 days of engagement.", "Include cure proposal status if applicable."]},
            {dot: "default", day: "Day 60", title: "First Supplemental Report", body: "Update on remediation progress, cure outcome (if applicable), and discovery status.", actions: ["Update exposure model with any new data.", "Report on 30% cap remediation progress.", "Advise on EEC or mediation scheduling."]},
            {dot: "default", day: "Day 120", title: "Discovery Status Report", body: "Written discovery results, deposition schedule, and revised exposure model.", actions: ["Update violation rates with discovery data.", "Report on plaintiff's expert designation.", "Assess mediation readiness."]},
            {dot: "active", day: "Pre-Mediation", title: "Settlement Authority Request", body: "Formal request for settlement authority based on the updated three-scenario model.", actions: ["Submit 21+ days before mediation.", "Include updated exposure model, remediation evidence, and defense strategy assessment.", "Recommend specific authority range."]},
          ]
        },
      ]
    },
  ],

  authorities: [
    {cite: "Lab. Code § 2699(f)(2)(A)", note: "Default PAGA penalty — $100"},
    {cite: "Lab. Code § 2699(g)(1)", note: "15% penalty cap"},
    {cite: "Lab. Code § 2699(h)(1)", note: "30% penalty cap"},
    {cite: "Lab. Code § 2699(i)", note: "Anti-stacking provision"},
    {cite: "Lab. Code § 2699(c)(1)", note: "Standing requirement"},
    {cite: "Lab. Code § 2699(p)", note: "Manageability authority"},
    {cite: "Lab. Code § 2699.3(b)(1)(A)", note: "Cure proposal — 33-day deadline"},
    {cite: "Lab. Code § 2699.3(f)", note: "Early evaluation conference"},
  ],

  footer: "For illustrative and educational purposes only. Carrier reporting requirements vary by policy and claims handler preferences.",
};
