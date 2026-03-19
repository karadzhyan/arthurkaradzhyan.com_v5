export default {
  slug: "three-scenario-exposure-template",
  title: "Three-Scenario Exposure Template",
  subtitle: "Carrier-Ready Reporting Format",
  cardDesc: "Structured template for presenting plaintiff maximum, data-driven realistic, and defense best case scenarios. Per-category breakdown, penalty cap impact analysis, and settlement authority format.",
  metaDescription: "Template for presenting PAGA exposure analysis in three scenarios: plaintiff maximum, data-driven realistic, and defense best case. Per-category breakdown with penalty cap and reform impact modeling.",
  placeholder: false,

  statutoryContext: {
    paragraphs: [
      {label: "Why three scenarios.", text: "A single exposure number is either too high (plaintiff's demand) or too low (defense minimization). Neither is useful for settlement authority, mediation preparation, or client counseling. The three-scenario model presents the full range: what the plaintiff claims, what the data supports, and what the defense can achieve with all available tools. The realistic middle scenario — driven by actual violation rates from time records and payroll data — is the number that drives informed decision-making."},
      {label: "The audience.", text: "This template serves three audiences: the carrier (who needs a defensible authority range), the client (who needs to understand the risk), and the mediator (who needs to evaluate the reasonableness of the parties' positions). Each audience reads the same three numbers but uses them differently. The carrier uses Scenario 2 for reserve setting. The client uses the gap between Scenarios 1 and 3 to understand the value of defense strategy. The mediator uses the methodology's rigor to assess credibility."},
    ]
  },

  sections: [
    {
      number: "01",
      label: "Template Structure",
      intro: "The exposure model is organized by violation category. Each category receives its own three-scenario analysis. The per-category totals are then aggregated into a case-level summary.",
      blocks: [
        {
          type: "proposal-section",
          num: "Part A",
          title: "Case Summary & Key Variables",
          body: "Entity name. PAGA notice filing date. PAGA period (one year before notice filing through present or estimated trial). Total aggrieved employees. Pay period frequency (bi-weekly = 26 periods/year, semi-monthly = 24). Violation categories alleged. Reform applicability (pre- or post-June 19, 2024 notice). Cure eligibility (employer under 100 employees). Applicable penalty caps."
        },
        {
          type: "proposal-section",
          num: "Part B",
          title: "Per-Category Analysis",
          body: "For each violation category: three scenarios with specific inputs (violation rate, penalty rate, applicable reform provisions). Employee count, pay period count, violation rate, penalty per violation, applicable cap, and net exposure."
        },
        {
          type: "proposal-section",
          num: "Part C",
          title: "Case-Level Summary & Authority Recommendation",
          body: "Aggregated exposure across all categories. Per-scenario total. Settlement range recommendation based on Scenario 2 (realistic) with litigation risk adjustment. Attorney fee estimate."
        },
      ]
    },

    {
      number: "02",
      label: "Scenario 1 — Plaintiff Maximum",
      intro: "This scenario uses the plaintiff's methodology and assumptions. It represents the upper bound of exposure — the number the plaintiff will use in the demand letter and at mediation.",
      blocks: [
        {
          type: "calc-block",
          header: "Meal Period — Plaintiff Maximum",
          rows: [
            {label: "Aggrieved employees", value: "50"},
            {label: "Pay periods (26 bi-weekly)", value: "26"},
            {label: "Violation rate (plaintiff assumes 100%)", value: "100%"},
            {label: "Total violations (50 × 26 × 1.00)", value: "1,300"},
            {label: "PAGA penalty per violation", value: "$100"},
            {label: "Meal period PAGA penalties", value: "$130,000"},
            {label: "Derivative: wage statement penalties (Naranjo)", value: "$130,000"},
            {label: "Pre-reform total — single category", value: "$260,000", total: true},
          ]
        },
        {
          type: "warning-box",
          label: "The 100% assumption.",
          text: "Plaintiff's counsel almost always assumes a 100% violation rate — every employee, every pay period. This assumption is nearly always inflated. The actual violation rate, derived from time records and payroll data, is typically 15–40%. The gap between 100% and the actual rate is the single most impactful variable in the exposure model."
        },
      ]
    },

    {
      number: "03",
      label: "Scenario 2 — Data-Driven Realistic",
      intro: "This scenario uses actual violation rates derived from the employer's own records. It is the most labor-intensive scenario to build — and the most valuable.",
      blocks: [
        {
          type: "calc-block",
          header: "Meal Period — Data-Driven Realistic",
          rows: [
            {label: "Aggrieved employees", value: "50"},
            {label: "Pay periods", value: "26"},
            {label: "Actual violation rate (from time records)", value: "28%"},
            {label: "Total violations (50 × 26 × 0.28)", value: "364"},
            {label: "PAGA penalty per violation", value: "$100"},
            {label: "Meal period PAGA penalties", value: "$36,400"},
            {label: "Anti-stacking (§ 2699(i)) — no derivative stacking", value: "($0)"},
            {label: "Post-reform total — single category", value: "$36,400", total: true},
          ]
        },
        {
          type: "accordion",
          title: "How to Calculate Actual Violation Rates",
          subsections: [
            {label: "Meal period violations", text: "Pull every shift over 5 hours. Identify shifts where no meal period was recorded, or the meal period was shorter than 30 minutes, or the meal period began after the end of the 5th hour. Divide by total qualifying shifts. This is the actual violation rate. Under Donohue, short punches (< 30 min) are presumed violations — but the employer can rebut with evidence of voluntary shortening."},
            {label: "Overtime violations", text: "Recalculate the regular rate for each pay period using the correct methodology (include all non-discretionary compensation per Ferra/Alvarado). Compare to the rate actually used. Any pay period where the rate was incorrect is a violation. Divide by total pay periods to get the violation rate."},
            {label: "Wage statement violations", text: "Review a statistically valid sample of wage statements against the nine § 226(a) elements. Identify which elements are deficient. If the deficiency is systemic (e.g., missing hourly rate display), the violation rate may approach 100% for that element. If sporadic, sample to determine the rate."},
          ]
        },
        {
          type: "info-box",
          label: "The data must be defensible.",
          text: "Scenario 2 is only as strong as the underlying data. Pull complete time records, not samples. Use the employer's own records — they are the best evidence. If the records are incomplete, note the gaps and apply reasonable assumptions. The methodology must be transparent and replicable."
        },
      ]
    },

    {
      number: "04",
      label: "Scenario 3 — Defense Best Case",
      intro: "This scenario applies every available defense tool to the data-driven violation rates: penalty caps, standing challenges, anti-stacking, recoverability limitations, and temporal bifurcation.",
      blocks: [
        {
          type: "calc-block",
          header: "Meal Period — Defense Best Case",
          rows: [
            {label: "Data-driven penalties (from Scenario 2)", value: "$36,400"},
            {label: "15% penalty cap (§ 2699(g)(1))", value: "× 15%"},
            {label: "Capped exposure", value: "$5,460"},
            {label: "Employee share (35%)", value: "$1,911"},
            {label: "Per-employee recovery (÷ 50)", value: "$38.22"},
            {label: "Defense best case — single category", value: "$5,460", total: true},
          ]
        },
        {
          type: "calc-block",
          header: "Full Case Summary — All Three Scenarios (4 Violation Categories)",
          rows: [
            {label: "Scenario 1 — Plaintiff Maximum", value: "$1,040,000"},
            {label: "Scenario 2 — Data-Driven Realistic", value: "$145,600"},
            {label: "Scenario 3 — Defense Best Case (15% cap)", value: "$21,840"},
            {label: "Recommended settlement range (Scenario 2 × 50–75%)", value: "$72,800–$109,200"},
            {label: "Reduction from plaintiff demand", value: "86–93%", total: true},
          ]
        },
      ]
    },

    {
      number: "05",
      label: "Settlement Authority Recommendation Format",
      intro: "The carrier needs a specific authority recommendation with supporting rationale. This format provides the information carriers require.",
      blocks: [
        {
          type: "proposal-section",
          num: "I",
          title: "Matter Summary",
          body: "One paragraph: parties, violation categories, aggrieved employee count, PAGA period, reform applicability, procedural posture."
        },
        {
          type: "proposal-section",
          num: "II",
          title: "Exposure Analysis",
          body: "Three-scenario summary table. Per-category breakdown. Methodology description (data sources, violation rate calculation, reform provisions applied). Key assumptions and limitations."
        },
        {
          type: "proposal-section",
          num: "III",
          title: "Defense Strategy Assessment",
          body: "Available defenses: penalty caps, standing challenges, arbitration, manageability, affirmative defenses. Strength assessment for each. Litigation timeline and cost estimate."
        },
        {
          type: "proposal-section",
          num: "IV",
          title: "Authority Recommendation",
          body: "Recommended settlement authority: specific dollar range based on Scenario 2. Early resolution discount. Attorney fee estimate (plaintiff's counsel will request fees). Litigation cost comparison: settlement now versus trial cost. Risk factors that could increase or decrease exposure."
        },
        {
          type: "info-box",
          label: "Lead with the data.",
          text: "Carriers respond to quantitative analysis, not qualitative assessments. The three-scenario model with actual violation rates is dramatically more persuasive than 'we believe the case is defensible.' The model demonstrates that defense counsel has done the work — and that the authority recommendation is based on data, not intuition."
        },
      ]
    },
  ],

  authorities: [
    {cite: "Lab. Code § 2699(f)(2)(A)", note: "Default penalty — $100"},
    {cite: "Lab. Code § 2699(g)(1)", note: "15% penalty cap"},
    {cite: "Lab. Code § 2699(h)(1)", note: "30% penalty cap"},
    {cite: "Lab. Code § 2699(i)", note: "Anti-stacking provision"},
    {cite: "Lab. Code § 2699(m)", note: "35% employee / 65% LWDA split"},
    {cite: "Lab. Code § 2699(c)(1)", note: "Standing — personal experience requirement"},
    {cite: "Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858", note: "Regular rate for premium calculations"},
    {cite: "Alvarado v. Dart Container (2018) 4 Cal.5th 542", note: "Flat-sum bonus regular rate methodology"},
  ],

  footer: "For illustrative and educational purposes only. All calculations are hypothetical. Use the Penalty Estimator tool for case-specific modeling.",
};
