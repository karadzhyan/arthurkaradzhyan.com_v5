"use client";
/* ArticleViz — Maps article slugs to the appropriate data visualization.
   Used by insight, case, and industry article pages to embed relevant
   diagrams inline within the article content. */

import PenaltyCascade from "./PenaltyCascade";
import ExposureModel from "./ExposureModel";
import PenaltyMath from "./PenaltyMath";
import ReformTimeline from "./ReformTimeline";
import DefenseFlowchart from "./DefenseFlowchart";
import RecoverabilityMatrix from "./RecoverabilityMatrix";
import CaseLawTimeline from "./CaseLawTimeline";
import IndustryHeatmap from "./IndustryHeatmap";
import PenaltyWaterfall from "./PenaltyWaterfall";

/* Slug → visualization mapping for insights */
var insightVizMap = {
  "the-naranjo-cascade-how-one-meal-period-violation-generates-four-independent-pen": [PenaltyCascade, PenaltyWaterfall],
  "ab-2288-sb-92-a-defense-side-roadmap-to-the-2024-paga-reforms": [ReformTimeline, DefenseFlowchart],
  "recoverable-vs-non-recoverable-penalties-under-paga-what-the-statute-actually-au": [RecoverabilityMatrix],
  "the-two-hotels-framework-temporal-bifurcation-in-paga-penalty-analysis": [ExposureModel],
  "the-regular-rate-problem-why-every-commission-plan-in-california-is-a-ticking-cl": [PenaltyMath],
  "manageability-after-estrada-using-2699-p-to-limit-paga-scope": [DefenseFlowchart],
  "statistical-sampling-in-wage-and-hour-defense-building-a-duran-compliant-framewo": [ExposureModel],
  "commission-forfeiture-after-sciborski-the-liability-theory-nobody-s-raising": [PenaltyWaterfall],
  "drafting-paga-settlement-approval-motions-after-moniz-a-practitioner-s-framework": [ExposureModel],
};

/* Slug → visualization mapping for cases */
var caseVizMap = {
  "naranjo-v-spectrum-security-services-inc": [PenaltyCascade],
  "zb-n-a-v-superior-court": [RecoverabilityMatrix],
  "estrada-v-royalty-carpet-mills-inc": [DefenseFlowchart],
  "donohue-v-amn-services-inc": [ExposureModel],
  "adolph-v-uber-technologies-inc": [DefenseFlowchart],
  "ferra-v-loews-hollywood-hotel-inc": [PenaltyMath],
  "alvarado-v-dart-container-corp-of-california": [PenaltyMath],
  "kirby-v-immoos-fire-protection-inc": [RecoverabilityMatrix],
};

/* All industry article pages get the heatmap */
var industryDefaultViz = [IndustryHeatmap];

export default function ArticleViz({ slug, type }) {
  var vizMap;
  if (type === "insight") vizMap = insightVizMap;
  else if (type === "case") vizMap = caseVizMap;
  else vizMap = {};

  var components = vizMap[slug] || (type === "industry" ? industryDefaultViz : null);

  if (!components || components.length === 0) return null;

  return (
    <div className="article-viz-section">
      {components.map(function (Comp, i) {
        return <Comp key={i} />;
      })}
    </div>
  );
}
