export default {
  slug: "commission-plan-audit-checklist",
  title: "Commission Plan Audit Checklist",
  subtitle: "Sciborski Forfeiture and § 2751 Compliance",
  cardDesc: "Timing analysis framework for commission payment structures. Identifies forfeiture exposure for departed employees with pending deals, § 2751 written agreement requirements, and regular rate inclusion methodology.",
  metaDescription: "Commission plan audit for California employers. Sciborski forfeiture analysis, § 2751 written agreement compliance, regular rate inclusion methodology, and industry-specific considerations.",
  placeholder: false,

  statutoryContext: {
    paragraphs: [
      {label: "Commission plans are liability generators.", text: "California commission plans create PAGA exposure in three ways: forfeiture of earned commissions for departed employees (Sciborski), failure to include commissions in the regular rate for overtime and premium calculations (Ferra/Alvarado), and failure to maintain a written commission agreement (§ 2751). Each failure is independently actionable — and a single commission plan deficiency can generate derivative exposure across multiple violation categories."},
      {label: "The § 2751 requirement.", text: "Labor Code § 2751 requires that any employment agreement providing for commissions as a method of compensation must be in writing, must set forth the method by which commissions shall be computed and paid, and must be signed by both the employer and the employee. An employer that pays commissions without a compliant written agreement is in violation of § 2751 — regardless of whether the commissions are actually calculated correctly."},
    ]
  },

  sections: [
    {
      number: "01",
      label: "Section 2751 Written Agreement Requirements",
      intro: "Every commission plan must satisfy § 2751. The written agreement requirement is independent of the substantive commission calculation.",
      blocks: [
        {
          type: "checklist",
          id: "section-2751-checklist",
          items: [
            {label: "Written agreement exists.", text: "The commission plan must be in writing. Oral agreements, informal understandings, and 'we've always done it this way' arrangements do not satisfy § 2751."},
            {label: "Computation method described.", text: "The agreement must describe how commissions are computed — the formula, rate, or methodology. Vague language like 'commissions will be determined by management' is likely insufficient."},
            {label: "Payment method described.", text: "The agreement must describe when and how commissions are paid — pay period, timing relative to the triggering event, and payment method."},
            {label: "Signed by both parties.", text: "Both the employer (authorized representative) and the employee must sign the agreement. Electronic signatures are valid. A signed acknowledgment of a handbook provision may satisfy this requirement if the acknowledgment specifically references the commission plan."},
            {label: "Copy provided to employee.", text: "The employer must provide a signed copy to the employee. Retain proof of distribution."},
            {label: "Updated when plan changes.", text: "If the commission structure changes (rates, quotas, qualifying events), a new written agreement must be executed. Amendments to the existing agreement are acceptable if they satisfy the signature requirement."},
          ]
        },
        {
          type: "warning-box",
          label: "The signature requirement is strictly enforced.",
          text: "A commission plan distributed in a handbook without an employee signature on the specific plan (or a specific reference to the plan in the acknowledgment) may not satisfy § 2751. The safest approach: a standalone commission agreement signed by both parties, provided to the employee, and updated whenever the plan changes."
        },
      ]
    },

    {
      number: "02",
      label: "Forfeiture Analysis (Sciborski)",
      intro: "Under Sciborski v. Pacific Bell Directory (2012) 205 Cal.App.4th 1152, commissions are earned when the employee completes the work entitling them to the commission — not when the employer receives payment or when a post-completion contingency is satisfied.",
      blocks: [
        {
          type: "accordion",
          title: "When Is a Commission 'Earned'?",
          subsections: [
            {label: "The Sciborski rule", text: "A commission is earned when the employee performs the act that triggers the commission obligation. For a salesperson, the commission is earned at the point of sale — not when the deal funds, the product ships, or the customer pays. Post-completion contingencies (funding, delivery, customer retention) cannot be conditions of payment if the employee's work is complete."},
            {label: "Exception: genuine contingencies", text: "If the commission is genuinely contingent on an event within the employee's control (e.g., achieving a quarterly quota), the commission is not earned until the contingency is satisfied. The distinction is between contingencies related to the employee's performance and contingencies related to events outside the employee's control."},
            {label: "Forfeiture trigger", text: "A commission plan that conditions payment on continued employment through a post-completion event (e.g., 'commissions are paid only if the employee is actively employed on the funding date') is a forfeiture provision. Under Sciborski, this forfeiture is unlawful because the commission was already earned at the point of sale."},
          ]
        },
        {
          type: "hypothetical",
          label: "Car Dealership — Deal Closing vs. Funding",
          text: "A salesperson closes a deal on March 1. The deal funds (financing finalized) on March 15. The salesperson resigns on March 10. Under the dealership's commission plan, the commission is payable only after funding — and only to 'active employees.' Under Sciborski, the commission was earned on March 1 (the closing date). The forfeiture-on-departure provision is unlawful. The commission must be paid. Failure to pay generates: § 201/202 (final pay timing), § 203 (waiting time penalties — up to 30 days' wages), § 226 (wage statement failure), and PAGA penalties on each."
        },
      ]
    },

    {
      number: "03",
      label: "Departure Scenarios",
      intro: "The forfeiture exposure crystallizes when an employee departs with pending commissions.",
      blocks: [
        {
          type: "scenario-panel",
          items: [
            {level: "strong", title: "Terminated — Pending Deals", body: "Terminated employees must receive all wages, including earned commissions, immediately (§ 201). If deals are pending but the employee's work is complete (Sciborski), the commissions are wages owed at termination. Late payment triggers § 203 waiting time penalties."},
            {level: "moderate", title: "Voluntary Quit — 72+ Hours Notice", body: "Employees who quit with 72+ hours' notice must receive all wages on their last day (§ 202). Same Sciborski analysis applies — earned commissions must be included in the final paycheck."},
            {level: "weak", title: "Voluntary Quit — No Notice", body: "Employees who quit without 72 hours' notice must receive all wages within 72 hours. The tight timeline makes it difficult to calculate pending commissions — but the obligation exists regardless."},
          ]
        },
        {
          type: "calc-block",
          header: "Departure Exposure — Single Employee",
          rows: [
            {label: "Pending deals at departure", value: "3"},
            {label: "Average commission per deal", value: "$1,200"},
            {label: "Total forfeited commissions", value: "$3,600"},
            {label: "§ 203 waiting time (30 days × $280/day)", value: "$8,400"},
            {label: "§ 226 wage statement penalty", value: "$100"},
            {label: "PAGA civil penalty", value: "$100"},
            {label: "Total exposure — single departed employee", value: "$12,200", total: true},
          ]
        },
        {
          type: "warning-box",
          label: "The turnover multiplier.",
          text: "For a dealership with 20% annual salesperson turnover and 40 salespeople, 8 employees depart per year. If each has 2–3 pending deals, the annual forfeiture exposure is $73,200–$97,600 in commissions alone — plus § 203 penalties of $67,200 and PAGA penalties. This is a systemic, recurring exposure that compounds every year the plan remains uncorrected."
        },
      ]
    },

    {
      number: "04",
      label: "Regular Rate Inclusion",
      intro: "Commissions must be included in the regular rate of compensation for overtime and premium calculations. The timing of inclusion — and the calculation methodology — is where errors occur.",
      blocks: [
        {
          type: "calc-block",
          header: "Commission Regular Rate — Quarterly Payment",
          rows: [
            {label: "Base hourly rate", value: "$18.00/hr"},
            {label: "Quarterly commission", value: "$6,000"},
            {label: "Non-overtime hours in quarter", value: "480 hrs"},
            {label: "Commission component ($6,000 ÷ 480)", value: "$12.50/hr"},
            {label: "Regular rate including commission", value: "$30.50/hr"},
            {label: "Correct OT rate (1.5×)", value: "$45.75/hr"},
            {label: "Actual OT rate paid (base only × 1.5)", value: "$27.00/hr"},
            {label: "Underpayment per OT hour", value: "$18.75", total: true},
          ]
        },
        {
          type: "info-box",
          label: "Retroactive adjustment required.",
          text: "When commissions are paid quarterly but regular rate is calculated weekly, the employer must retroactively adjust overtime pay for every week in the quarter when the commission is finally paid. This retroactive adjustment is required by law — it is not optional. Most payroll systems do not automate this adjustment."
        },
      ]
    },

    {
      number: "05",
      label: "Common Commission Plan Deficiencies",
      intro: "These deficiency patterns appear in the majority of California commission plans reviewed in litigation.",
      blocks: [
        {
          type: "curability-grid",
          items: [
            {status: "noncurable", title: "Forfeiture-on-Departure", body: "Commission plan conditions payment on active employment through a post-completion event (funding, delivery, retention period). Under Sciborski, this is unlawful forfeiture of earned wages. Every departure triggers exposure."},
            {status: "noncurable", title: "No Written Agreement", body: "Commissions paid without a § 2751 compliant written agreement. The violation exists regardless of whether commissions are calculated correctly. Every pay period without a signed agreement is a violation."},
            {status: "difficult", title: "Commission Excluded from Regular Rate", body: "Commissions not included in the regular rate for OT and premium calculations. Systemic underpayment affecting every OT hour and every premium. Requires payroll system reconfiguration and retroactive adjustment."},
            {status: "difficult", title: "No Retroactive OT Adjustment", body: "When commissions are paid in a later period, the prior period's OT is not retroactively adjusted. Each unadjusted pay period is a separate overtime underpayment."},
            {status: "curable", title: "Vague Computation Method", body: "The written agreement describes commissions in general terms but does not specify the exact computation methodology, quota structure, or payment formula. Revise the agreement to include specific terms."},
            {status: "curable", title: "Missing Employee Signature", body: "The commission plan exists in writing but was never signed by the employee. Obtain signatures immediately. Consider a new plan agreement with updated terms."},
          ]
        },
      ]
    },

    {
      number: "06",
      label: "Industry-Specific Considerations",
      intro: "Commission structures vary significantly by industry. Each creates different exposure patterns.",
      blocks: [
        {
          type: "accordion",
          title: "Automotive Dealerships",
          subsections: [
            {label: "Structure", text: "Commission on vehicle sales (front-end gross, back-end F&I), often with minimum guarantees (draw). Commission conditioned on deal funding. Multiple commission tiers based on unit volume."},
            {label: "Key risk", text: "Forfeiture-on-departure (deal closing vs. funding gap). Regular rate exclusion for commission-heavy salespeople with significant OT. Minimum wage guarantee violations if draw exceeds earned commissions."},
            {label: "Wage Order", text: "Wage Order 7 (Mercantile Industry) — potential commissioned salesperson exemption if more than 50% of earnings are commissions and earnings exceed 1.5× minimum wage."},
          ]
        },
        {
          type: "accordion",
          title: "Technology Sales",
          subsections: [
            {label: "Structure", text: "Commission on closed deals, often with quota-based accelerators, spiffs, and MBOs. Multi-quarter payout structures for enterprise deals. Clawback provisions for customer cancellation."},
            {label: "Key risk", text: "Clawback of earned commissions (Sciborski). Regular rate complexity with multiple commission components. § 515.5 exemption misapplication — commission does not automatically make an employee exempt."},
          ]
        },
        {
          type: "accordion",
          title: "Real Estate",
          subsections: [
            {label: "Structure", text: "Commission on closed transactions (percentage of sale price or gross commission). Split arrangements between brokerage and agent. Independent contractor classification common but often incorrect."},
            {label: "Key risk", text: "Misclassification as independent contractor (Dynamex ABC test). If classified as employee, commission must be included in regular rate for any hours where the agent is non-exempt. § 2751 written agreement requirement applies to employee agents."},
          ]
        },
      ]
    },
  ],

  authorities: [
    {cite: "Lab. Code § 2751", note: "Written commission agreement requirement"},
    {cite: "Sciborski v. Pacific Bell Directory (2012) 205 Cal.App.4th 1152", note: "Commissions earned at completion of work"},
    {cite: "Lab. Code § 201", note: "Final pay — termination (immediate)"},
    {cite: "Lab. Code § 202", note: "Final pay — voluntary quit (72 hours or last day)"},
    {cite: "Lab. Code § 203", note: "Waiting time penalties — up to 30 days' wages"},
    {cite: "Lab. Code § 204", note: "Pay timing requirements"},
    {cite: "Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858", note: "Regular rate for premium calculations"},
    {cite: "Alvarado v. Dart Container (2018) 4 Cal.5th 542", note: "Flat-sum bonus regular rate methodology"},
    {cite: "Lab. Code § 515.5", note: "Computer professional exemption"},
    {cite: "IWC Wage Order 7", note: "Mercantile industry — commissioned salesperson exemption"},
  ],

  footer: "For illustrative and educational purposes only. Commission plan compliance requires industry-specific analysis. Consult counsel for a tailored review.",
};
