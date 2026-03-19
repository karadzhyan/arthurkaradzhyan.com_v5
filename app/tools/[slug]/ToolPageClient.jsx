"use client";
import { useState } from 'react';
import Link from 'next/link';
import { tools, getToolBySlug } from '@/data/tools';
import PagaCalc from '@/components/tools/PagaCalc';
import RegRateCalc from '@/components/tools/RegRateCalc';
import CapQualifier from '@/components/tools/CapQualifier';
import SOLCalc from '@/components/tools/SOLCalc';
import RecoverCheck from '@/components/tools/RecoverCheck';
import DerivativeMapper from '@/components/tools/DerivativeMapper';
import NaranjoCascade from '@/components/tools/NaranjoCascade';
import RegRateFormula from '@/components/tools/RegRateFormula';
import DecisionTree from '@/components/tools/DecisionTree';
import WageStmtCheck from '@/components/tools/WageStmtCheck';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

var toolComponents = {
  PagaCalc: PagaCalc,
  RegRateCalc: RegRateCalc,
  CapQualifier: CapQualifier,
  SOLCalc: SOLCalc,
  RecoverCheck: RecoverCheck,
  DerivativeMapper: DerivativeMapper,
  DecisionTree: DecisionTree,
  WageStmtCheck: WageStmtCheck,
};

export default function ToolPageClient({ slug }) {
  var tool = getToolBySlug(slug);
  var [showMethodology, setShowMethodology] = useState(false);

  if (!tool) {
    return (
      <div className="page-wrap">
        <SiteNav current="Tools" />
        <div className="not-found">
          <h1>Tool Not Found</h1>
          <Link href="/tools">Back to all tools</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  var ToolComponent = toolComponents[tool.component];

  return (
    <div className="page-wrap">
      <SiteNav current="Tools" />

      <div className="tool-detail-header">
        <div className="article-label">Interactive Tool</div>
        <h1 className="article-title">{tool.name}</h1>
        <p className="tool-detail-desc">{tool.desc}</p>
        <div className="tool-detail-privacy">
          All calculations run in your browser. No data is transmitted or stored.
        </div>

        <div
          className="tool-detail-methodology"
          onClick={function() { setShowMethodology(!showMethodology); }}
          onKeyDown={function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowMethodology(!showMethodology);
            }
          }}
          role="button"
          tabIndex={0}
          aria-expanded={showMethodology}
        >
          <span className="tool-detail-methodology-label">Methodology</span>
          <span
            className="tool-detail-methodology-toggle"
            style={{ transform: showMethodology ? 'rotate(45deg)' : 'rotate(0)' }}
          >
            +
          </span>
        </div>
        {showMethodology && (
          <div className="tool-detail-methodology-body">
            {tool.methodology}
          </div>
        )}

        {(tool.relatedInsights.length > 0 || tool.relatedCases.length > 0) && (
          <div className="tool-detail-related">
            {tool.relatedInsights.map(function(s, i) {
              return (
                <Link key={'i' + i} href={'/insights/' + s} className="tool-detail-related-link primary">
                  Related Publication →
                </Link>
              );
            })}
            {tool.relatedCases.map(function(s, i) {
              return (
                <Link key={'c' + i} href={'/cases/' + s} className="tool-detail-related-link muted">
                  Related Case →
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="tool-detail-band">
        <div className="tool-detail-band-inner">
          {tool.component === 'DerivativeMapper' && <NaranjoCascade />}
          {tool.component === 'RegRateCalc' && <RegRateFormula />}
          {ToolComponent && <ToolComponent />}
        </div>
      </div>

      <div className="tool-other-section">
        <div className="tool-other-label">Other Tools</div>
        <div className="tool-other-grid">
          {tools.filter(function(t) { return t.slug !== slug; }).map(function(t) {
            return (
              <Link key={t.slug} href={'/tools/' + t.slug} className="tool-other-card">
                <div className="tool-other-name">{t.name}</div>
                <div className="tool-other-sub">{t.sub}</div>
              </Link>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 48px' }}>
        <div className="article-disclaimer" style={{ marginTop: 0 }}>
          For illustrative purposes only. This tool does not constitute legal advice.
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
