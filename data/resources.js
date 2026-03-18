// data/resources.js
// Thin index — each built-out resource lives in its own file under data/resources/
// To add a new resource: create data/resources/[slug].js with `export default { ... }`,
// then import it here and add it to the array.

import cureProposal from './resources/cure-proposal-framework';
import manageabilityMotion from './resources/manageability-motion-framework';
import reformReference from './resources/2024-reform-quick-reference';

export var resources = [

  // ---- Placeholders (not yet built) ----
  { slug: "paga-notice-response-checklist", title: "PAGA Notice Response Checklist", subtitle: "The First 72 Hours", cardDesc: "Five-phase action plan from Day 1 through post-65-day litigation preparation. Matter information sheet, remediation plan structure, carrier notification guide, and key authorities appendix.", placeholder: true },
  { slug: "penalty-cap-qualification-tracker", title: "Penalty Cap Qualification Tracker", subtitle: "§§ 2699(g) and 2699(h) Documentation", cardDesc: "Two-track checklist for the 15% and 30% caps with statutory citations. Common documentation failures, 10-tab evidence assembly guide, and dollar-impact worksheet.", placeholder: true },
  { slug: "pre-paga-compliance-audit", title: "Pre-PAGA Compliance Audit", subtitle: "Self-Assessment for California Employers", cardDesc: "24-item assessment across five compliance categories with three industry-specific addenda. Scored output with remediation priority matrix and 90-day implementation timeline.", placeholder: true },
  { slug: "three-scenario-exposure-template", title: "Three-Scenario Exposure Template", subtitle: "Carrier-Ready Reporting Format", cardDesc: "Structured template for presenting plaintiff maximum, data-driven realistic, and defense best case scenarios. Per-category breakdown, penalty cap impact analysis, and settlement authority format.", placeholder: true },

  // ---- Built-out resources ----
  cureProposal,
  manageabilityMotion,
  reformReference,

  // ---- More placeholders ----
  { slug: "regular-rate-audit-worksheet", title: "Regular Rate Audit Worksheet", subtitle: "Ferra and Alvarado Exposure", cardDesc: "Calculating correct regular rates across compensation types — commissions, flat-sum bonuses, piece-rate, shift differentials. Side-by-side comparison with per-employee underpayment quantification.", placeholder: true },
  { slug: "derivative-cascade-reference", title: "Derivative Cascade Reference", subtitle: "Naranjo Stacking — Pre- and Post-Reform", cardDesc: "Visual reference mapping how a single meal period violation generates up to four penalty streams. Pre-reform full cascade and post-reform § 2699(i) anti-stacking limitations.", placeholder: true },
  { slug: "arbitration-agreement-checklist", title: "Arbitration Agreement Checklist", subtitle: "Post-Adolph, Post-Hohenshelt", cardDesc: "14-point review protocol. PAGA splitting provision analysis, poison pill identification, Iskanian waiver check, fee payment compliance, and Hohenshelt-responsive language.", placeholder: true },
  { slug: "wage-statement-compliance-matrix", title: "Wage Statement Compliance Matrix", subtitle: "Nine Elements of § 226(a)", cardDesc: "Element-by-element compliance guide with common deficiency patterns, risk ratings, Naranjo derivative exposure, and remediation steps including post-Ferra regular rate display requirements.", placeholder: true },
  { slug: "mediation-preparation-guide", title: "Mediation Preparation Guide", subtitle: "From Exposure Model to Settlement Authority", cardDesc: "Three-scenario exposure presentation, penalty cap documentation package assembly, plaintiff demand rebuttal framework, carrier authority recommendation format, and Moniz requirements.", placeholder: true },
  { slug: "early-evaluation-conference-playbook", title: "Early Evaluation Conference Playbook", subtitle: "Maximizing § 2699.3(f)", cardDesc: "Strategic guide to the post-reform EEC process. Confidential statement drafting, cure identification strategy, neutral evaluator preparation, and post-conference positioning.", placeholder: true },
  { slug: "carrier-status-report-template", title: "Carrier Status Report Template", subtitle: "First 30 Days After Notice", cardDesc: "Structured format for the initial carrier report: matter summary, three-scenario exposure analysis, defense strategy recommendation, litigation budget estimate, and early resolution assessment.", placeholder: true },
  { slug: "expert-deposition-framework", title: "Expert Deposition Framework", subtitle: "Statistical Sampling Challenges", cardDesc: "Six-domain deposition outline targeting plaintiff's sampling expert: population definition, sample selection, violation definition, paid premiums, confidence intervals, and affirmative defense accommodation.", placeholder: true },
  { slug: "commission-plan-audit-checklist", title: "Commission Plan Audit Checklist", subtitle: "Sciborski Forfeiture and § 2751 Compliance", cardDesc: "Timing analysis framework for commission payment structures. Identifies forfeiture exposure for departed employees with pending deals, § 2751 written agreement requirements, and regular rate inclusion methodology.", placeholder: true },
];

// Helper: get all resources for homepage grid (only built-out resources)
export function getAllResourceCards() {
  return resources.filter(function(r) { return !r.placeholder; }).map(function(r) {
    return {
      title: r.title,
      sub: r.subtitle,
      desc: r.cardDesc,
      url: '/resources/' + r.slug,
    };
  });
}

// Helper: get built-out resource by slug
export function getResourceBySlug(slug) {
  return resources.find(function(r) { return r.slug === slug && !r.placeholder; }) || null;
}

// Helper: get all built-out resource slugs (for generateStaticParams)
export function getBuiltResourceSlugs() {
  return resources.filter(function(r) { return !r.placeholder; }).map(function(r) { return r.slug; });
}
