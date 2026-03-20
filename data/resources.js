// data/resources.js
// Thin index — each built-out resource lives in its own file under data/resources/
// To add a new resource: create data/resources/[slug].js with `export default { ... }`,
// then import it here and add it to the array.

import pagaNoticeResponse from './resources/paga-notice-response-checklist';
import penaltyCapTracker from './resources/penalty-cap-qualification-tracker';
import prePagaAudit from './resources/pre-paga-compliance-audit';
import threeScenario from './resources/three-scenario-exposure-template';
import cureProposal from './resources/cure-proposal-framework';
import manageabilityMotion from './resources/manageability-motion-framework';
import reformReference from './resources/2024-reform-quick-reference';
import regularRateAudit from './resources/regular-rate-audit-worksheet';
import derivativeCascade from './resources/derivative-cascade-reference';
import arbitrationChecklist from './resources/arbitration-agreement-checklist';
import wageStatementMatrix from './resources/wage-statement-compliance-matrix';
import mediationGuide from './resources/mediation-preparation-guide';
import eecPlaybook from './resources/early-evaluation-conference-playbook';
import carrierReport from './resources/carrier-status-report-template';
import expertDeposition from './resources/expert-deposition-framework';
import commissionAudit from './resources/commission-plan-audit-checklist';

export var resources = [
  pagaNoticeResponse,
  penaltyCapTracker,
  prePagaAudit,
  threeScenario,
  cureProposal,
  manageabilityMotion,
  reformReference,
  regularRateAudit,
  derivativeCascade,
  arbitrationChecklist,
  wageStatementMatrix,
  mediationGuide,
  eecPlaybook,
  carrierReport,
  expertDeposition,
  commissionAudit,
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
