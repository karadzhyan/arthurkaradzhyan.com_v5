// data/frameworks.js
// Universal defense frameworks — extracted from industries.js into their own
// addressable section. Each framework has a slug for routing via /frameworks/[slug].

import { slugify } from './slugify';

var frameworksRaw = [
  {
    id: "temporal-bifurcation",
    name: "Temporal Bifurcation",
    subtitle: "The Two Hotels Framework",
    headline: "Disaggregate the PAGA period into Legacy and Remedied periods to reflect the employer's actual compliance trajectory — not the plaintiff's blended-maximum assumption.",
    description: "Plaintiffs apply the highest violation rate across the entire PAGA period. Temporal bifurcation defeats this by disaggregating the period into a Legacy Period (pre-remediation, higher violation rates) and a Remedied Period (post-compliance improvement, lower rates). The penalty calculation for each period uses the actual violation rate for that period — not a blended average. The framework requires a documented remediation inflection point supported by contemporaneous evidence: system implementation dates, policy revision records, training attendance logs, and payroll audit reports.",
    methodology: "The framework operates in four steps. First, identify the inflection point — the date when the employer implemented a material compliance improvement. This must be documented with contemporaneous evidence: a new timekeeping system went live, a revised meal period policy was distributed with acknowledgments, supervisor training was conducted with attendance records, or a payroll audit identified and corrected systematic errors. Second, disaggregate the PAGA period at the inflection point. The Legacy Period runs from the earliest recoverable date to the inflection point; the Remedied Period runs from the inflection point to the present. Third, calculate violation rates independently for each period using actual data — time records, payroll output, policy acknowledgments, and operational metrics. The Legacy Period will typically show higher violation rates; the Remedied Period should show substantially lower rates if the compliance improvement was genuine. Fourth, apply the appropriate penalty rate to each period and sum the results. The three-scenario model applies the same bifurcation to all three scenarios.\n\nThe inflection point is the critical element. It must be genuine — a documented operational change, not a post-hoc recharacterization. Courts and mediators will scrutinize whether the compliance improvement was real or cosmetic. The strongest inflection points are system changes (new timekeeping software, electronic attestation systems) because they produce objective before-and-after data that cannot be disputed.",
    applicability: "Any employer that implemented compliance improvements during the PAGA statutory period — new timekeeping systems, revised meal period policies, payroll corrections, supervisor training programs. The framework is most powerful when the employer can demonstrate a clear before-and-after difference in compliance metrics.",
    keyInsight: "The inflection point between Legacy and Remedied periods must be documented with contemporaneous evidence — not reconstructed after litigation begins.",
    relatedInsights: ["the-two-hotels-framework-temporal-bifurcation-in-paga-penalty-analysis"],
    relatedTools: ["paga-penalty-estimator"],
    relatedCases: ["donohue-v-amn-services-inc", "brinker-restaurant-corp-v-superior-court"],
    relatedMatters: ["Multi-Property Hotel Operator"],
    applicableIndustries: "all",
    datePublished: "2026-01-15",
    dateModified: "2026-03-19"
  },
  {
    id: "penalty-cap",
    name: "15% Penalty Cap Qualification",
    subtitle: "Reform-Era Good Faith Defense",
    headline: "The 2024 reforms cap penalties at 15% of the maximum for employers who documented pre-notice good faith compliance efforts — transforming the settlement calculus.",
    description: "The most powerful settlement lever in post-reform PAGA defense: employers who can document pre-notice good faith compliance efforts qualify for a penalty cap of 15% of the maximum amount. This transforms the settlement calculus by capping exposure at a fraction of the plaintiff's maximum demand. Qualification requires documented pre-notice efforts — written policies, supervisor training with attendance records, payroll audits and corrections, and system implementations — all predating the PAGA notice. Post-notice compliance efforts do not qualify for the 15% cap but may qualify for the 30% cap if implemented within 60 days.",
    methodology: "The 15% cap under Labor Code section 2699(g) requires that the employer took 'all reasonable steps' to comply with the provisions at issue before receiving the PAGA notice. The 30% cap under section 2699(h) requires the same standard but allows the compliance steps to be taken within 60 days after receiving the notice. The documentation burden is specific and cumulative.\n\nFive documentation categories are critical: (1) Written compliance policies — distributed to employees with dated acknowledgments — addressing each violation category alleged in the PAGA notice. (2) Supervisor training records — attendance logs, training materials, and competency assessments — demonstrating that managers were trained on the policies. (3) Payroll system audits — internal or third-party reviews of payroll calculations, regular rate methodology, and wage statement compliance — with dated reports and remediation evidence. (4) System implementations — new timekeeping systems, electronic meal period attestation, automated rest period tracking — with implementation dates and configuration documentation. (5) Employee communication — memos, policy updates, FAQ distributions — demonstrating that the compliance program was communicated to the workforce.\n\nNo published appellate decision has yet interpreted these provisions. The documentation framework described here is based on the statutory text and legislative history. The strategic imperative is clear: build the compliance record before the PAGA notice arrives. Every training log, every policy acknowledgment, every audit report is evidence for the 15% cap.",
    applicability: "All PAGA matters filed after the 2024 reform effective date (June 19, 2024). The cap creates significant leverage in settlement negotiations when the employer can demonstrate pre-notice good faith compliance efforts.",
    keyInsight: "Documentation is everything. The 15% cap is available only to employers who can prove they took reasonable steps before the notice — post-hoc compliance reconstruction does not satisfy the standard.",
    relatedInsights: ["ab-2288-sb-92-a-defense-side-roadmap-to-the-2024-paga-reforms"],
    relatedTools: ["penalty-cap-qualifier", "paga-reform-decision-tree"],
    relatedCases: [],
    relatedMatters: [],
    applicableIndustries: "all",
    datePublished: "2026-01-15",
    dateModified: "2026-03-19"
  },
  {
    id: "manageability",
    name: "Manageability Under § 2699(p)",
    subtitle: "Individualized Proof Defense",
    headline: "Multi-location employers can defeat or narrow overbroad PAGA claims by demonstrating that compliance varies too much across locations for representative treatment.",
    description: "Multi-location employers can defeat or narrow overbroad PAGA claims by demonstrating that the compliance environment varies too much across locations for representative treatment. The 2024 reforms codified this: where individual issues predominate — different job classifications, different work locations, different supervisors, different compliance environments — the court may limit the claim to what can be manageably tried. This defense is most powerful for staffing firms, multi-property operators, and any operation where no two worksites have the same compliance landscape.",
    methodology: "The manageability motion under section 2699(p) operates at the intersection of due process and statutory authority. Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582 established the constitutional floor: representative proceedings must allow the defendant to present individualized defenses. The 2024 reforms codified this in section 2699(p): 'The court may limit the evidence to be presented at trial or otherwise limit the scope of any claim filed pursuant to this part to ensure that the claim can be effectively tried.'\n\nThe motion should be structured around three elements. First, demonstrate variation: each location, job classification, or work unit presents a distinct compliance environment with different policies, different supervisors, different scheduling practices, and different operational constraints. Second, demonstrate that this variation creates individualized proof requirements: assessing whether a specific employee at a specific location during a specific period experienced a violation requires location-specific and employee-specific evidence that cannot be representatively established. Third, propose specific limitations: narrow the claim to a representative subset of locations or classifications that can be manageably tried, or limit the evidence to specific categories that representative treatment can accommodate.\n\nThe motion should be filed early — ideally in connection with the early evaluation conference request under section 2699.3(f). Waiting until trial to raise manageability forfeits the opportunity to narrow the case before the bulk of discovery costs are incurred. The evidence is location-specific in all cases: different compliance systems, different supervisory practices, different workforce demographics — making the manageability motion structurally identical across industries.",
    applicability: "Multi-location employers, staffing firms with multiple client sites, operations with diverse job classifications, and any employer where workplace conditions vary materially across the aggrieved employee population.",
    keyInsight: "Manageability is not an abstract argument — it requires concrete evidence showing how each location or classification presents a distinct compliance environment that representative treatment cannot accommodate.",
    relatedInsights: ["manageability-after-estrada-using-2699-p-to-limit-paga-scope"],
    relatedTools: ["paga-penalty-estimator"],
    relatedCases: ["estrada-v-royalty-carpet-mills-inc"],
    relatedMatters: [],
    applicableIndustries: "all",
    datePublished: "2026-01-15",
    dateModified: "2026-03-19"
  },
  {
    id: "three-scenario",
    name: "Three-Scenario Exposure Modeling",
    subtitle: "Structured Settlement Analytics",
    headline: "Quantify the gap between plaintiff's demand and realistic settlement — the defense value — using three independent exposure scenarios built from granular payroll data.",
    description: "The gap between plaintiff's demand and realistic settlement is the defense value — and quantifying it requires three scenarios. Scenario 1 (plaintiff-maximum): every alleged violation sustained at maximum penalty rates with no offsets. Scenario 2 (defense-adjusted): applying actual violation rates, applicable defenses, temporal bifurcation, and penalty cap qualification. Scenario 3 (realistic-settlement): the range where informed parties settle based on the litigation risk profile. This framework structures settlement negotiations, carrier reserve recommendations, and mediation positioning. Each scenario requires granular payroll data analysis — not estimates or assumptions.",
    methodology: "The three-scenario model is the analytical backbone of every PAGA defense matter. It serves three audiences: the carrier (for reserve setting and settlement authority), the mediator (for positioning), and the client (for decision-making).\n\nScenario 1 — Plaintiff Maximum — models the worst case: every alleged violation sustained at maximum penalty rates ($100 initial, $200 subsequent per employee per pay period under section 2699(f)), with no temporal bifurcation, no penalty cap, no recoverability reductions, and no manageability limitations. This is the number plaintiff's counsel will demand. It is intentionally overstated — its purpose is to establish the ceiling.\n\nScenario 2 — Defense-Adjusted — applies every available defense to reduce the exposure from Scenario 1. Strip non-recoverable categories per ZB, N.A. Apply actual violation rates from time record analysis (which are almost always lower than plaintiff's 100% assumption). Apply temporal bifurcation if the employer implemented compliance improvements during the PAGA period. Apply the 15% or 30% penalty cap if the documentation supports it. Apply the anti-stacking limitation under section 2699(i) for derivative violations. The resulting figure represents the defensible exposure — the number supported by the data and the law.\n\nScenario 3 — Realistic Settlement — incorporates litigation risk. Not every defense will succeed. Some violation categories may be more defensible than others. The realistic settlement range is typically between Scenario 2 and a risk-adjusted midpoint between Scenarios 1 and 2. The specific range depends on the strength of the evidence, the jurisdiction, the judge, and the plaintiff's counsel.\n\nThe gap between Scenario 1 and Scenario 2 is the defense value — it quantifies what competent defense work is worth in reducing exposure from the plaintiff's demand to a realistic settlement figure. This gap is the basis for settlement authority recommendations to carriers and for fee justification.",
    applicability: "Every PAGA defense matter. The three-scenario model is the analytical backbone of settlement positioning and carrier communication.",
    keyInsight: "The gap between Scenario 1 and Scenario 2 is the defense value — it quantifies what competent defense work is worth in reducing exposure from the plaintiff's demand to a realistic settlement figure.",
    relatedInsights: ["the-two-hotels-framework-temporal-bifurcation-in-paga-penalty-analysis", "recoverable-vs-non-recoverable-penalties-under-paga-what-the-statute-actually-au"],
    relatedTools: ["paga-penalty-estimator", "recoverability-checker"],
    relatedCases: ["zb-n-a-v-superior-court"],
    relatedMatters: ["Multi-Property Hotel Operator", "Medical Transportation Company"],
    applicableIndustries: "all",
    datePublished: "2026-01-15",
    dateModified: "2026-03-19"
  }
];

export var frameworks = frameworksRaw.map(function(item, i) {
  return Object.assign({}, item, {
    slug: slugify(item.name),
    index: i
  });
});

export function getFrameworkBySlug(slug) {
  return frameworks.find(function(f) { return f.slug === slug; }) || null;
}

export function getAllFrameworkSlugs() {
  return frameworks.map(function(f) { return f.slug; });
}
