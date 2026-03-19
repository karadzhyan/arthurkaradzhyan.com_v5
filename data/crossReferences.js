// data/crossReferences.js
// Computes reverse links across all content types.
// Industries already declare relatedInsights, relatedTools, relatedMatters.
// Tools declare relatedInsights, relatedCases.
// Commentary declares relatedInsights, relatedCases.
//
// This module inverts those relationships so any content item can discover
// what links TO it — without duplicating data across files.

import { industries } from './industries';
import { tools } from './tools';
import { insights } from './insights';
import { caseLaw } from './caseLaw';
import { commentary } from './commentary';
import { matters } from './matters';

// ── Derived reverse links ────────────────────────────────────────

// Which industries reference this insight?
export function getIndustriesForInsight(insightSlug) {
  return industries.filter(function(ind) {
    return ind.relatedInsights && ind.relatedInsights.indexOf(insightSlug) !== -1;
  });
}

// Which industries reference this tool?
export function getIndustriesForTool(toolSlug) {
  return industries.filter(function(ind) {
    return ind.relatedTools && ind.relatedTools.indexOf(toolSlug) !== -1;
  });
}

// Which industries reference this matter?
export function getIndustriesForMatter(matterSlug) {
  return industries.filter(function(ind) {
    if (!ind.relatedMatters) return false;
    var m = matters.find(function(mt) { return mt.slug === matterSlug; });
    if (!m) return false;
    return ind.relatedMatters.indexOf(m.title) !== -1;
  });
}

// Which industries reference this case?
export function getIndustriesForCase(caseSlug) {
  return industries.filter(function(ind) {
    return ind.relatedCases && ind.relatedCases.indexOf(caseSlug) !== -1;
  });
}

// Which tools reference this insight?
export function getToolsForInsight(insightSlug) {
  return tools.filter(function(t) {
    return t.relatedInsights && t.relatedInsights.indexOf(insightSlug) !== -1;
  });
}

// Which tools reference this case?
export function getToolsForCase(caseSlug) {
  return tools.filter(function(t) {
    return t.relatedCases && t.relatedCases.indexOf(caseSlug) !== -1;
  });
}

// Which insights reference this tool (by relatedTool slug)?
export function getInsightsForTool(toolSlug) {
  return insights.filter(function(ins) {
    return ins.relatedTool === toolSlug;
  });
}

// Which insights reference this case?
export function getInsightsForCase(caseSlug) {
  return insights.filter(function(ins) {
    return ins.relatedCases && ins.relatedCases.indexOf(caseSlug) !== -1;
  });
}

// Which commentary references this insight?
export function getCommentaryForInsight(insightSlug) {
  return commentary.filter(function(c) {
    return c.relatedInsights && c.relatedInsights.indexOf(insightSlug) !== -1;
  });
}

// Which commentary references this case?
export function getCommentaryForCase(caseSlug) {
  return commentary.filter(function(c) {
    return c.relatedCases && c.relatedCases.indexOf(caseSlug) !== -1;
  });
}

// Which matters reference this industry?
export function getMattersForIndustry(industrySlug) {
  return matters.filter(function(m) {
    return m.relatedIndustries && m.relatedIndustries.indexOf(industrySlug) !== -1;
  });
}

// Which matters reference this insight?
export function getMattersForInsight(insightSlug) {
  return matters.filter(function(m) {
    return m.relatedInsights && m.relatedInsights.indexOf(insightSlug) !== -1;
  });
}

// Which matters reference this case?
export function getMattersForCase(caseSlug) {
  return matters.filter(function(m) {
    return m.relatedCases && m.relatedCases.indexOf(caseSlug) !== -1;
  });
}

// Which matters reference this tool?
export function getMattersForTool(toolSlug) {
  return matters.filter(function(m) {
    return m.relatedTools && m.relatedTools.indexOf(toolSlug) !== -1;
  });
}
