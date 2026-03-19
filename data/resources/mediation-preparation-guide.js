export default {
  slug: "mediation-preparation-guide",
  title: "Mediation Preparation Guide",
  subtitle: "From Exposure Model to Settlement Authority",
  cardDesc: "Three-scenario exposure presentation, penalty cap documentation package assembly, plaintiff demand rebuttal framework, carrier authority recommendation format, and Moniz requirements.",
  metaDescription: "PAGA mediation preparation guide covering exposure presentation, penalty cap evidence, demand rebuttal, carrier authority, and Moniz settlement approval requirements.",
  placeholder: false,

  statutoryContext: {
    paragraphs: [
      {label: "Mediation is where PAGA cases resolve.", text: "The vast majority of PAGA cases settle at mediation. The quality of the defense presentation at mediation — not the quality of the legal arguments in the briefs — is what drives settlement outcomes. A mediator who sees a data-driven exposure model, a comprehensive remediation record, and a transparent settlement authority recommendation will value the defense position differently than a mediator who sees a one-page coverage letter and a blanket denial."},
      {label: "Post-Moniz requirements.", text: "Under Moniz v. Adecco USA, Inc. (2021) 72 Cal.App.5th 56, PAGA settlements require court approval with documented investigation, a reasonable settlement amount relative to the PAGA penalty exposure, and a demonstration that the settlement serves PAGA's remedial purposes. The mediation presentation should anticipate Moniz requirements because the settlement approval motion will rely on the same evidence."},
    ]
  },

  sections: [
    {
      number: "01",
      label: "Pre-Mediation Timeline",
      intro: "Mediation preparation begins 30–45 days before the session. Each phase builds on the prior one.",
      blocks: [
        {
          type: "timeline",
          items: [
            {dot: "default", day: "Day -45", title: "Finalize Exposure Model", body: "Complete the three-scenario exposure model. Update violation rates with the latest discovery data. Apply all applicable reform provisions.", actions: ["Pull final time records and payroll data.", "Recalculate violation rates by category.", "Apply penalty caps, anti-stacking, and standing limitations.", "Prepare per-category exposure summary."]},
            {dot: "default", day: "Day -30", title: "Assemble Penalty Cap Evidence", body: "Compile the 10-tab evidence binder documenting pre-notice compliance (15% cap) or post-notice remediation (30% cap).", actions: ["Organize all remediation documentation by category.", "Prepare timeline exhibit showing compliance actions with dates.", "Draft officer declaration attesting to compliance efforts."]},
            {dot: "default", day: "Day -21", title: "Prepare Mediation Brief", body: "Draft the mediation brief with a focus on the exposure model, reform mechanisms, and settlement range.", actions: ["Three-scenario summary table.", "Per-category analysis with data sources.", "Reform mechanism application.", "Settlement range recommendation with supporting rationale."]},
            {dot: "active", day: "Day -14", title: "Carrier Authority Submission", body: "Present the exposure model and settlement recommendation to the carrier. Request settlement authority based on Scenario 2.", actions: ["Cover memo explaining methodology and recommendation.", "Three-scenario exposure summary.", "Defense strategy assessment with litigation cost comparison.", "Recommended authority range."]},
            {dot: "critical", day: "Day 0", title: "Mediation Session", body: "Present the defense analysis. Respond to plaintiff's demand. Negotiate within the authorized range.", actions: ["Opening presentation: remediation record, exposure model, reform impact.", "Demand analysis: identify inflated assumptions, challenge violation rates.", "Counter-offer framework: data-driven range anchored to Scenario 2."]},
          ]
        },
      ]
    },

    {
      number: "02",
      label: "Three-Scenario Presentation",
      intro: "The exposure model is the centerpiece of the defense presentation. Present all three scenarios with the methodology and data sources visible.",
      blocks: [
        {
          type: "calc-block",
          header: "Sample Presentation — 4 Violation Categories",
          rows: [
            {label: "Scenario 1 — Plaintiff Maximum (100% violation rate)", value: "$840,000"},
            {label: "Scenario 2 — Data-Driven Realistic (actual rates)", value: "$168,000"},
            {label: "Scenario 3 — Defense Best Case (caps + reforms)", value: "$25,200"},
            {label: "Settlement range (50–75% of Scenario 2)", value: "$84,000–$126,000"},
            {label: "Add: plaintiff attorney fees (33–40%)", value: "$42,000–$72,000"},
            {label: "Total settlement range including fees", value: "$126,000–$198,000", total: true},
          ]
        },
        {
          type: "info-box",
          label: "Lead with the gap.",
          text: "The most powerful moment in the mediation presentation is showing the gap between Scenario 1 and Scenario 2. When the mediator sees that the plaintiff's $840,000 demand assumes a 100% violation rate — and the actual data shows 20–35% — the plaintiff's leverage collapses. The data does the work."
        },
      ]
    },

    {
      number: "03",
      label: "Plaintiff Demand Rebuttal",
      intro: "Plaintiff's demands follow predictable patterns. Prepare rebuttals for each.",
      blocks: [
        {
          type: "accordion",
          title: "Rebuttal 1: 100% Violation Rate Assumption",
          text: "Plaintiff assumes every employee missed every meal period in every pay period. Counter with actual violation rates from time records. Show the total qualifying shifts, the shifts with compliant meal periods, and the resulting violation rate. If the rate is 28%, the plaintiff's demand is inflated by 72%."
        },
        {
          type: "accordion",
          title: "Rebuttal 2: Pre-Reform Penalty Structure Applied to Post-Reform Notice",
          text: "Plaintiff may apply the $200 subsequent-violation rate to all violations. Post-reform, the default penalty is $100 — the $200 rate requires proof of malice, fraud, or oppression, or a prior finding. Challenge any demand using $200 without evidentiary basis."
        },
        {
          type: "accordion",
          title: "Rebuttal 3: Full Naranjo Stacking",
          text: "Plaintiff may stack derivative penalties across all four Naranjo streams. Post-reform, § 2699(i) limits penalties to one per employee per pay period per violation. The derivative cascade is eliminated. Pre-reform periods require temporal bifurcation."
        },
        {
          type: "accordion",
          title: "Rebuttal 4: No Credit for Remediation",
          text: "Plaintiff may refuse to credit the employer's post-notice remediation. The penalty caps under §§ 2699(g) and (h) are statutory — they apply regardless of plaintiff's position. Present the 10-tab evidence binder documenting compliance efforts."
        },
        {
          type: "accordion",
          title: "Rebuttal 5: Inflated Attorney Fee Request",
          text: "Plaintiff's counsel may seek fees based on a lodestar that exceeds the PAGA recovery. Under Moniz, the court reviews whether fees are reasonable relative to the settlement. A negative lodestar multiplier (fees less than hours × rate) strengthens the defense position."
        },
      ]
    },

    {
      number: "04",
      label: "Moniz Settlement Approval Requirements",
      intro: "Every PAGA settlement requires court approval. The mediation should produce a settlement that satisfies Moniz requirements.",
      blocks: [
        {
          type: "checklist",
          id: "moniz-requirements",
          items: [
            {label: "Reasonable investigation.", text: "The settlement must reflect an adequate investigation of the PAGA claims. Document the discovery conducted, the time records reviewed, and the analytical methodology employed. Kullar v. Foot Locker requires sufficient investigation to evaluate the claims."},
            {label: "Reasonable amount.", text: "The settlement amount must be reasonable relative to the total PAGA penalty exposure. Present the three-scenario exposure model showing that the settlement falls within the data-driven range."},
            {label: "PAGA purposes served.", text: "Under Moniz's three-part purpose test: (1) remediation — has the employer corrected the violations? (2) deterrence — does the settlement deter future violations? (3) enforcement maximization — does the settlement advance the enforcement purpose of PAGA?"},
            {label: "35/65 split.", text: "Post-reform, the employee share is 35% and the LWDA share is 65%. The settlement must allocate accordingly. Pre-reform matters use the 25/75 split."},
            {label: "LWDA review.", text: "Under § 2699(s) and proposed regulations, the LWDA has authority to review proposed PAGA settlements. Build a 45-day LWDA review period into the settlement timeline."},
            {label: "Attorney fees.", text: "Plaintiff's attorney fees are separate from the PAGA penalty recovery. Document the lodestar, the fee percentage, and the reasonableness relative to the recovery."},
          ]
        },
        {
          type: "info-box",
          label: "Build the approval motion at mediation.",
          text: "Every element of the Moniz analysis should be addressed during mediation negotiations. The settlement terms, the investigation documentation, and the remediation record form the foundation of the approval motion. If these elements are not established at mediation, the approval motion will be weak."
        },
      ]
    },

    {
      number: "05",
      label: "Post-Mediation Documentation",
      intro: "Whether the case settles or not, the mediation produces documentation that supports the next phase.",
      blocks: [
        {
          type: "accordion",
          title: "If Settled — Next Steps",
          subsections: [
            {label: "Memorandum of understanding", text: "Execute the MOU at mediation. Include: gross settlement amount, PAGA penalty allocation (35/65), attorney fees and costs, administration costs, release scope, and LWDA notification requirements."},
            {label: "Long-form agreement", text: "Draft within 30 days. Include the full release, Moniz compliance provisions, payment timeline, and LWDA review provisions."},
            {label: "Approval motion", text: "Draft the approval motion using the three-scenario exposure model and remediation evidence presented at mediation. The motion should preemptively address every Moniz factor."},
            {label: "LWDA notification", text: "Notify the LWDA of the proposed settlement. Build 45 days for LWDA review before submitting the approval motion."},
          ]
        },
        {
          type: "accordion",
          title: "If Not Settled — Next Steps",
          subsections: [
            {label: "Evaluate the gap", text: "Identify why the case did not settle. Was the gap in violation rates? Penalty calculation? Attorney fees? Liability disputes? The gap analysis informs the next litigation phase."},
            {label: "Preserve the record", text: "The remediation evidence, exposure model, and mediation brief support every subsequent motion: penalty caps, manageability, summary judgment."},
            {label: "Consider a second session", text: "If the gap is narrow, a second mediation session (often by telephone) can be more productive after both sides have time to reassess."},
          ]
        },
      ]
    },
  ],

  authorities: [
    {cite: "Moniz v. Adecco USA, Inc. (2021) 72 Cal.App.5th 56", note: "PAGA settlement approval requirements"},
    {cite: "Kullar v. Foot Locker (2008) 168 Cal.App.4th 116", note: "Adequate investigation requirement for settlement approval"},
    {cite: "Lab. Code § 2699(m)", note: "35% employee / 65% LWDA split (post-reform)"},
    {cite: "Lab. Code § 2699(s)", note: "LWDA settlement review authority"},
    {cite: "Lab. Code § 2699(g)(1)", note: "15% penalty cap"},
    {cite: "Lab. Code § 2699(h)(1)", note: "30% penalty cap"},
    {cite: "Lab. Code § 2699(i)", note: "Anti-stacking provision"},
  ],

  footer: "For illustrative and educational purposes only. Settlement negotiations and court approval requirements involve case-specific analysis.",
};
