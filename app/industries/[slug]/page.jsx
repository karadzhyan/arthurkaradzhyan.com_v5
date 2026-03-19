import Link from 'next/link';
import { industries, getIndustryBySlug, getAllIndustrySlugs } from '@/data/industries';
import { getInsightBySlug } from '@/data/insights';
import { getToolBySlug } from '@/data/tools';
import { matters } from '@/data/matters';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import ExposureProfileChart from '@/components/ExposureProfileChart';
import DefenseStrategyFlow from '@/components/viz/DefenseStrategyFlow';
import AuthorityTimeline from '@/components/viz/AuthorityTimeline';

export function generateStaticParams() {
  return getAllIndustrySlugs().map(function(slug) { return { slug: slug }; });
}

export function generateMetadata({ params }) {
  var ind = getIndustryBySlug(params.slug);
  if (!ind) return { title: 'Not Found' };
  return {
    title: ind.name + ' — PAGA Defense & Employment Litigation | Arthur Karadzhyan',
    description: 'Defense-side analysis of PAGA and wage-and-hour exposure for ' + ind.name.toLowerCase() + ' employers in California. ' + ind.primaryRisk,
    openGraph: { title: ind.name + ' — Industry Intelligence | Arthur Karadzhyan', description: ind.headline, type: 'article' },
  };
}

function fmtK(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n / 1000) + "K";
  return "$" + n;
}

/* Resolve related content slugs to actual titles */
function resolveRelated(ind) {
  var items = [];
  if (ind.relatedInsights) {
    ind.relatedInsights.forEach(function(slug) {
      var ins = getInsightBySlug(slug);
      if (ins) items.push({ type: 'Publication', title: ins.title, href: '/insights/' + slug });
    });
  }
  if (ind.relatedTools) {
    ind.relatedTools.forEach(function(slug) {
      var tool = getToolBySlug(slug);
      if (tool) items.push({ type: 'Tool', title: tool.name, href: '/tools/' + slug });
    });
  }
  if (ind.relatedMatters) {
    ind.relatedMatters.forEach(function(ref) {
      /* relatedMatters may contain titles rather than slugs */
      var matter = matters.find(function(m) { return m.slug === ref || m.title === ref; });
      if (matter) items.push({ type: 'Matter', title: matter.title, href: '/matters/' + matter.slug });
    });
  }
  return items;
}

var severityColors = { critical: '#dc3545', high: '#CC8800', moderate: '#2c3e3a' };
var severityLabels = { critical: 'Critical', high: 'High', moderate: 'Moderate' };

export default function IndustryPage({ params }) {
  var ind = getIndustryBySlug(params.slug);

  if (!ind) {
    return (
      <div className="page-wrap">
        <SiteNav current="Industries" />
        <div className="not-found">
          <h1>Industry Not Found</h1>
          <Link href="/industries">Back to all industries</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  var relatedItems = resolveRelated(ind);
  var criticalCount = ind.exposureCategories.filter(function(c) { return c.severity === 'critical'; }).length;
  var highCount = ind.exposureCategories.filter(function(c) { return c.severity === 'high'; }).length;

  return (
    <div className="page-wrap">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.arthurkaradzhyan.com' },
        { name: 'Industries', url: 'https://www.arthurkaradzhyan.com/industries' },
        { name: ind.name, url: 'https://www.arthurkaradzhyan.com/industries/' + params.slug }
      ]} />
      <SiteNav current="Industries" />

      {/* ═══════════════════════════════════════════
          LEVEL 0: THE ANSWER
          Header delivers the governing thought immediately.
          ═══════════════════════════════════════════ */}
      <div className="article-industry-header">
        <div className="article-industry-header-inner">
          <div className="page-label-dark">Industry Intelligence</div>
          <h1 className="page-title-dark" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700 }}>{ind.name}</h1>

          {/* The answer — front and center */}
          <div className="ind-governing-thought">{ind.keyTakeaway}</div>

          <div className="ind-header-meta">
            <div className="ind-header-meta-item">
              <span className="ind-header-meta-label">Wage Order</span>
              <span className="ind-header-meta-value">{ind.wageOrder.split(' (')[0]}</span>
            </div>
            <div className="ind-header-meta-sep" />
            <div className="ind-header-meta-item">
              <span className="ind-header-meta-label">Est. Annual Exposure</span>
              <span className="ind-header-meta-value">{ind.annualExposure ? fmtK(ind.annualExposure) : '—'}</span>
            </div>
            <div className="ind-header-meta-sep" />
            <div className="ind-header-meta-item">
              <span className="ind-header-meta-label">Key Authority</span>
              <span className="ind-header-meta-value">{ind.keyCase}</span>
            </div>
          </div>
        </div>
      </div>

      <article className="article-wrap wide">

        {/* ═══════════════════════════════════════════
            LEVEL 1: SITUATION → COMPLICATION
            Why this industry, why now, why it matters.
            ═══════════════════════════════════════════ */}
        <section className="ind-scq">
          <div className="ind-scq-block">
            <div className="ind-scq-label">Situation</div>
            <div className="ind-scq-text">{ind.situation}</div>
          </div>
          <div className="ind-scq-block">
            <div className="ind-scq-label">Complication</div>
            <div className="ind-scq-text">{ind.complication}</div>
          </div>
        </section>

        {/* Severity summary — bridges SCQ to the exposure detail */}
        <div className="ind-severity-summary">
          <div className="ind-severity-summary-inner">
            <div className="ind-severity-summary-stat">
              <span className="ind-ss-num" style={{ color: severityColors.critical }}>{criticalCount}</span>
              <span className="ind-ss-label">Critical</span>
            </div>
            <div className="ind-severity-summary-stat">
              <span className="ind-ss-num" style={{ color: severityColors.high }}>{highCount}</span>
              <span className="ind-ss-label">High</span>
            </div>
            <div className="ind-severity-summary-stat">
              <span className="ind-ss-num" style={{ color: '#2c3e3a' }}>{ind.exposureCategories.length}</span>
              <span className="ind-ss-label">Total Categories</span>
            </div>
            <div className="ind-severity-summary-stat">
              <span className="ind-ss-num" style={{ color: '#2c3e3a' }}>{ind.issues.length}</span>
              <span className="ind-ss-label">Exposure Areas</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            LEVEL 2: EXPOSURE CATEGORIES
            Each category: Impact (the "so what") → Analysis (supporting) → Defense (action)
            ═══════════════════════════════════════════ */}
        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Where the Exposure Lives</div>
          {ind.exposureCategories.map(function(cat, i) {
            var severity = cat.severity || 'moderate';
            return (
              <div key={i} className="ind-cat-block" style={{ borderBottom: i < ind.exposureCategories.length - 1 ? undefined : 'none' }}>
                <div className="ind-cat-header">
                  <div>
                    <div className="ind-cat-num">{i + 1}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="article-exposure-name">{cat.name}</div>
                    <div className="article-exposure-statute">{cat.statute}</div>
                  </div>
                  <div className="ind-severity-badge" style={{
                    color: severityColors[severity],
                    background: severityColors[severity] + '10',
                    borderColor: severityColors[severity] + '30',
                  }}>
                    {severityLabels[severity]}
                  </div>
                </div>

                {/* Impact line — the "so what" leads */}
                {cat.impact && (
                  <div className="ind-cat-impact">{cat.impact}</div>
                )}

                {/* Supporting analysis */}
                <div className="article-exposure-analysis">{cat.analysis}</div>

                {/* Recommended action */}
                <div className="article-exposure-defense">
                  <div className="ind-defense-header">
                    <div className="article-section-label green">Recommended Action</div>
                    {cat.priority && (
                      <div className="ind-priority-badge">{cat.priority}</div>
                    )}
                  </div>
                  <div className="article-exposure-defense-text">{cat.defenseStrategy}</div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Exposure profile visualization */}
        <ExposureProfileChart industryName={ind.name} />

        {/* ═══════════════════════════════════════════
            LEVEL 2: DEFENSE FRAMEWORK
            What to do — elevated above reference material.
            ═══════════════════════════════════════════ */}
        <div className="ind-defense-framework" style={{ marginBottom: 60 }}>
          <div className="article-section-label lg" style={{ marginBottom: 8 }}>Defense Framework</div>
          <div className="ind-defense-framework-sub">Recommended actions in priority order.</div>
          <DefenseStrategyFlow strategies={ind.defenseStrategies} />
          {ind.defenseStrategies.map(function(strategy, i) {
            return (
              <div key={i} className="article-strategy">
                <div className="article-strategy-num">{i + 1}</div>
                <div className="article-strategy-text">{strategy}</div>
              </div>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════
            LEVEL 3: SUPPORTING REFERENCE
            Authorities, full exposure list, monitoring — reference material.
            ═══════════════════════════════════════════ */}
        <div className="ind-reference-section">
          <div className="ind-reference-label">Reference</div>

          {/* Governing Authorities */}
          <section style={{ marginBottom: 40 }}>
            <div className="article-section-label lg">Governing Authorities</div>
            <AuthorityTimeline authorities={ind.authorities} />
            <div className="ind-authorities-list">
              {ind.authorities.map(function(auth, i) {
                return (
                  <div key={i} className="ind-authority-item">
                    <div className="ind-authority-num">{i + 1}</div>
                    <div className="ind-authority-text">{auth}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Full Exposure Profile */}
          <section style={{ marginBottom: 40 }}>
            <div className="article-section-label lg">Full Exposure Profile</div>
            <div className="ind-issues-grid">
              {ind.issues.map(function(issue, i) {
                return (
                  <div key={i} className="ind-issue-item">
                    <div className="ind-issue-num">{i + 1}</div>
                    <div className="ind-issue-text">{issue}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Currently Monitoring */}
          {ind.monitoring && ind.monitoring.length > 0 && (
            <div className="article-monitoring" style={{ marginBottom: 40 }}>
              <div className="article-monitoring-bar" />
              <div className="article-monitoring-inner">
                <div className="article-section-label lg">Currently Monitoring</div>
                {ind.monitoring.map(function(item, i) {
                  return (
                    <div key={i} className="article-monitoring-item">
                      <div className="article-monitoring-dot" />
                      <div className="article-monitoring-text">{item}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ─── RELATED ON THIS SITE ─── */}
        <section style={{ marginBottom: 40 }}>
          <div className="article-section-label lg">Related on This Site</div>
          {relatedItems.length > 0 ? (
            <div className="ind-related-grid">
              {relatedItems.map(function(item, i) {
                return (
                  <Link key={i} href={item.href} className="ind-related-card">
                    <div className="ind-related-type">{item.type}</div>
                    <div className="ind-related-title">{item.title}</div>
                  </Link>
                );
              })}
              <Link href="/industries" className="ind-related-card ind-related-back">
                <div className="ind-related-type">Navigate</div>
                <div className="ind-related-title">All Industries</div>
              </Link>
            </div>
          ) : (
            <div className="article-related-links">
              <Link href="/industries" className="article-related-link muted">All Industries →</Link>
            </div>
          )}
        </section>

        <div className="article-disclaimer">
          This industry analysis is for informational purposes only and does not constitute legal advice.
        </div>

        {/* ─── NAVIGATION ─── */}
        <div className="article-nav">
          {ind.index > 0 ? (
            <Link href={'/industries/' + industries[ind.index - 1].slug} className="article-nav-link">← {industries[ind.index - 1].name}</Link>
          ) : <span />}
          {ind.index < industries.length - 1 ? (
            <Link href={'/industries/' + industries[ind.index + 1].slug} className="article-nav-link">{industries[ind.index + 1].name} →</Link>
          ) : <span />}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
