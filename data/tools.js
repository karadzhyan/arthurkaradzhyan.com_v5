import { slugify } from './slugify';

var toolsRaw = [
  {
    id: 0,
    name: "PAGA Penalty Estimator",
    sub: "Three-scenario exposure model",
    component: "PagaCalc",
    desc: "Models PAGA penalty exposure across seven violation categories with three output scenarios: plaintiff maximum, data-driven realistic, and defense best case. Supports pre-reform and post-reform penalty rates, the temporal bifurcation toggle for the 'Two Hotels' framework, derivative penalty stacking, weekly pay period halving under section 2699(o), and legacy/remedied period split analysis.",
    methodology: "Penalties are calculated per employee, per pay period, per violation category using the statutory penalty rates under Labor Code sections 2699(f), 226(e), and 1197.1. Violation rates are user-adjustable per category — the default rates represent common analytical assumptions, not empirical data from any specific matter. Post-reform rates reflect the default penalty reduction from $200 to $100 under AB 2288 section 2699(f)(2)(A). The cap qualification overlay applies the 15% or 30% reduction to the realistic scenario when the user enables the penalty cap toggle.",
    relatedInsights: ["the-two-hotels-framework-temporal-bifurcation-in-paga-penalty-analysis", "ab-2288-sb-92-a-defense-side-roadmap-to-the-2024-paga-reforms", "recoverable-vs-non-recoverable-penalties-under-paga-what-the-statute-actually-au"],
    relatedCases: ["zb-n-a-v-superior-court", "naranjo-v-spectrum-security-services-inc"],
    datePublished: "2026-01-15",
    dateModified: "2026-03-19"
  },
  {
    id: 1,
    name: "Regular Rate Calculator",
    sub: "Ferra and Alvarado methodology",
    component: "RegRateCalc",
    desc: "Calculates the correct regular rate of pay including all compensation components — hourly base, commissions, flat-sum bonuses, piece-rate earnings, shift differentials, and non-discretionary incentives. Applies the Alvarado v. Dart Container methodology for flat-sum bonuses and the Ferra v. Loews Hollywood Hotel standard requiring meal and rest period premiums at the regular rate, not the base hourly rate. Includes presets for car dealership salespeople, hotel room attendants, and solar installers.",
    methodology: "The regular rate is calculated by dividing total non-excludable compensation by total hours worked in the relevant period. Under Alvarado, flat-sum bonuses earned over a specific period are divided by total hours worked during that period — not by 40. The resulting regular rate determines the correct overtime premium (1.5x or 2x the regular rate) and the correct meal/rest period premium (1x the regular rate per Ferra). The delta between the employer's calculated rate and the legally correct rate is the per-hour underpayment.",
    relatedInsights: ["the-regular-rate-problem-why-every-commission-plan-in-california-is-a-ticking-cl", "commission-forfeiture-after-sciborski-the-liability-theory-nobody-s-raising"],
    relatedCases: ["ferra-v-loews-hollywood-hotel-inc", "alvarado-v-dart-container-corp-of-california"],
    datePublished: "2026-01-15",
    dateModified: "2026-03-19"
  },
  {
    id: 2,
    name: "Penalty Cap Qualifier",
    sub: "15% and 30% documentation",
    component: "CapQualifier",
    desc: "Evaluates whether an employer's compliance documentation satisfies the 'all reasonable steps' standard for the 15% or 30% PAGA penalty caps under the 2024 reforms. Walks through the specific documentation categories — written policies, supervisor training records, payroll audits, employee acknowledgments — and scores the employer's qualification status with identification of documentation gaps.",
    methodology: "The qualification assessment is based on the statutory text of Labor Code sections 2699(g) (15% cap — pre-notice 'all reasonable steps') and 2699(h) (30% cap — post-notice 'all reasonable steps' within 60 days). No published appellate decision has yet interpreted these provisions. The assessment identifies the documentation categories that the statutory text and legislative history suggest will be required, without predicting how courts will ultimately interpret the standard.",
    relatedInsights: ["ab-2288-sb-92-a-defense-side-roadmap-to-the-2024-paga-reforms"],
    relatedCases: [],
    datePublished: "2026-01-15",
    dateModified: "2026-03-19"
  },
  {
    id: 3,
    name: "Statute of Limitations Calculator",
    sub: "PAGA vs. underlying lookback",
    component: "SOLCalc",
    desc: "Calculates the operative limitations periods for PAGA claims and underlying Labor Code violations. Distinguishes between the one-year PAGA statute of limitations (from LWDA notice filing) and the varying limitations periods for underlying violations — three years for wage claims under section 338(a), four years under UCL section 17200, and the PAGA-specific lookback from the date of the LWDA notice.",
    methodology: "PAGA claims are subject to a one-year statute of limitations running from the date the PAGA notice is filed with the LWDA. The underlying violations have their own limitations periods, which define the lookback window for penalty calculation. The calculator determines the operative lookback for each violation category based on the applicable statute of limitations and the relationship between the LWDA notice date, complaint filing date, and violation accrual dates.",
    relatedInsights: [],
    relatedCases: [],
    datePublished: "2026-01-15",
    dateModified: "2026-03-19"
  },
  {
    id: 4,
    name: "Recoverability Checker",
    sub: "ZB, N.A. category analysis",
    component: "RecoverCheck",
    desc: "Analyzes each alleged violation category to determine whether the associated monetary remedy is a 'civil penalty' recoverable through PAGA or a wage/damages remedy that PAGA does not authorize. Includes Category Analysis mode (individual violation assessment) and Demand Comparison mode (side-by-side analysis of plaintiff's demand versus PAGA-authorized recovery). Applies the ZB, N.A. v. Superior Court and Kirby v. Immoos Fire Protection analytical frameworks.",
    methodology: "The recoverability analysis asks three questions for each violation: (1) Is there a specific civil penalty statute? (2) If so, is it a penalty PAGA authorizes an aggrieved employee to recover? (3) If not, does the default penalty under section 2699(f) apply? Meal and rest period premiums under section 226.7 are wages, not penalties (Kirby). Overtime premiums are wages. Waiting time penalties under section 203 are penalties but present complex recoverability questions depending on characterization.",
    relatedInsights: ["recoverable-vs-non-recoverable-penalties-under-paga-what-the-statute-actually-au"],
    relatedCases: ["zb-n-a-v-superior-court", "kirby-v-immoos-fire-protection-inc"],
    datePublished: "2026-01-15",
    dateModified: "2026-03-19"
  },
  {
    id: 5,
    name: "Derivative Penalty Mapper",
    sub: "Naranjo penalty cascade",
    component: "DerivativeMapper",
    desc: "Maps how a single primary violation — such as a meal period violation — generates multiple derivative penalty streams through statutory interconnections. A single missed meal period creates: (1) the meal period premium under section 226.7, (2) a wage statement violation under section 226(a) for failing to report the premium, (3) a waiting time penalty under section 203 if the premium remains unpaid at separation, and (4) potential interest under section 218.6. Visualizes pre-reform and post-reform cascade structures including the anti-stacking limitation under section 2699(i).",
    methodology: "The derivative cascade analysis traces statutory cross-references from the primary violation to each derivative obligation. The mapping is based on the California Supreme Court's analysis in Naranjo v. Spectrum Security Services, which established that unpaid meal period premiums create independent wage statement violations under section 226. The anti-stacking provision under section 2699(i), introduced by the 2024 reforms, limits penalties for derivative violations that arise from the same underlying conduct.",
    relatedInsights: ["the-naranjo-cascade-how-one-meal-period-violation-generates-four-independent-pen"],
    relatedCases: ["naranjo-v-spectrum-security-services-inc"],
    datePublished: "2026-01-15",
    dateModified: "2026-03-19"
  },
  {
    id: 6,
    name: "PAGA Reform Decision Tree",
    sub: "Post-reform strategic routing",
    component: "DecisionTree",
    desc: "Guides employers through a structured decision framework based on their current PAGA posture — pre-notice, post-notice, or in active litigation. Five to eight questions produce a strategic recommendation with statutory citations, identifying the optimal defense path under the 2024 reform provisions: pre-notice compliance positioning, cure proposal submission, 60-day remediation for the 30% cap, early evaluation conference strategy, or manageability limitation.",
    methodology: "The decision tree maps the procedural posture of the matter (pre-notice, within 33-day cure window, within 60-day remediation window, post-65-day LWDA period, or in active litigation) to the available defense mechanisms under the 2024 reforms. Each terminal node provides specific statutory citations, documentation requirements, and strategic recommendations.",
    relatedInsights: ["ab-2288-sb-92-a-defense-side-roadmap-to-the-2024-paga-reforms"],
    relatedCases: [],
    datePublished: "2026-01-15",
    dateModified: "2026-03-19"
  },
  {
    id: 7,
    name: "Wage Statement Compliance Checker",
    sub: "Nine elements of § 226(a)",
    component: "WageStmtCheck",
    desc: "Evaluates compliance with each of the nine required elements of a California wage statement under Labor Code section 226(a): (1) gross wages, (2) total hours worked, (3) piece-rate units and rate, (4) all deductions, (5) net wages, (6) pay period dates, (7) employee name and last four digits of SSN or employee ID, (8) employer's legal name and address, and (9) all applicable hourly rates and corresponding hours. Identifies common deficiency patterns and derivative Naranjo exposure for each element.",
    methodology: "Each of the nine elements is evaluated independently. The assessment identifies whether the element is present, whether it is accurate, and whether any deficiency creates 'knowing and intentional' exposure under section 226(e) — the scienter requirement that distinguishes between technical deficiencies (no penalty) and actionable violations ($50/$100 per employee per pay period, capped at $4,000 per employee). Post-Naranjo, the failure to include meal/rest period premiums in gross wages and applicable hourly rates creates derivative wage statement exposure.",
    relatedInsights: ["the-naranjo-cascade-how-one-meal-period-violation-generates-four-independent-pen"],
    relatedCases: ["naranjo-v-spectrum-security-services-inc"],
    datePublished: "2026-01-15",
    dateModified: "2026-03-19"
  }
];

export var tools = toolsRaw.map(function(item) {
  return Object.assign({}, item, {
    slug: slugify(item.name)
  });
});

export function getToolBySlug(slug) {
  return tools.find(function(t) { return t.slug === slug; }) || null;
}

export function getAllToolSlugs() {
  return tools.map(function(t) { return t.slug; });
}
