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

  return (
    <div className="page-wrap">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.arthurkaradzhyan.com' },
        { name: 'Industries', url: 'https://www.arthurkaradzhyan.com/industries' },
        { name: ind.name, url: 'https://www.arthurkaradzhyan.com/industries/' + params.slug }
      ]} />
      <SiteNav current="Industries" />

      <div className="article-industry-header">
        <div className="article-industry-header-inner">
          <div className="page-label-dark">Industry Intelligence</div>
          <h1 className="page-title-dark" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700 }}>{ind.name}</h1>
          <div className="page-desc-dark" style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', maxWidth: 640, marginBottom: 24 }}>{ind.headline}</div>
          <div className="article-industry-stats">
            <div>
              <div className="article-industry-stat-num">{ind.exposureCategories.length}</div>
              <div className="article-industry-stat-label">Detailed Categories</div>
            </div>
            <div>
              <div className="article-industry-stat-num">{ind.issues.length}</div>
              <div className="article-industry-stat-label">Exposure Areas</div>
            </div>
            <div>
              <div className="article-industry-stat-num">{ind.authorities.length}</div>
              <div className="article-industry-stat-label">Governing Authorities</div>
            </div>
            <div>
              <div className="article-industry-stat-num">{ind.defenseStrategies.length}</div>
              <div className="article-industry-stat-label">Defense Strategies</div>
            </div>
          </div>
          {ind.wageOrder && <div className="article-industry-wage">Applicable: {ind.wageOrder}</div>}
        </div>
      </div>

      <article className="article-wrap wide">

        {/* ─── QUICK FACTS ─── */}
        <div className="ind-quick-facts">
          <div className="ind-quick-facts-title">Quick Facts</div>
          <div className="ind-quick-facts-grid">
            <div className="ind-quick-fact">
              <div className="ind-quick-fact-label">Wage Order</div>
              <div className="ind-quick-fact-value">{ind.wageOrder.split(' (')[0]}</div>
            </div>
            <div className="ind-quick-fact">
              <div className="ind-quick-fact-label">Primary Risk</div>
              <div className="ind-quick-fact-value">{ind.primaryRisk}</div>
            </div>
            <div className="ind-quick-fact">
              <div className="ind-quick-fact-label">Key Authority</div>
              <div className="ind-quick-fact-value">{ind.keyCase}</div>
            </div>
            <div className="ind-quick-fact">
              <div className="ind-quick-fact-label">Est. Annual Exposure</div>
              <div className="ind-quick-fact-value">{ind.annualExposure ? fmtK(ind.annualExposure) : '—'}</div>
              <div className="ind-quick-fact-note">50 employees · 26 pay periods</div>
            </div>
          </div>
        </div>

        {/* ─── STRUCTURAL VULNERABILITY ─── */}
        <section style={{ marginBottom: 40 }}>
          <div className="article-section-label lg">Structural Vulnerability</div>
          <div className="article-body">
            {ind.structuralVulnerability.split('\n').filter(function(p) { return p.trim(); }).map(function(p, i) { return <p key={i}>{p}</p>; })}
          </div>
        </section>

        {/* ─── KEY TAKEAWAY ─── */}
        {ind.keyTakeaway && (
          <div className="ind-key-takeaway">
            <div className="ind-key-takeaway-label">Key Takeaway</div>
            <div className="ind-key-takeaway-text">{ind.keyTakeaway}</div>
          </div>
        )}

        {/* ─── EXPOSURE PROFILE CHART ─── */}
        <ExposureProfileChart industryName={ind.name} />

        {/* ─── EXPOSURE CATEGORIES ─── */}
        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Exposure Categories</div>
          <div className="ind-exposure-cat-note">
            {ind.exposureCategories.length} detailed categories with statutory basis, analysis, and defense strategy.
          </div>
          {ind.exposureCategories.map(function(cat, i) {
            var severity = cat.severity || 'moderate';
            return (
              <div key={i} className="article-exposure-cat" style={{ borderBottom: i < ind.exposureCategories.length - 1 ? undefined : 'none' }}>
                <div className="ind-cat-header">
                  <div>
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
                <div className="article-exposure-analysis">{cat.analysis}</div>
                <div className="article-exposure-defense">
                  <div className="ind-defense-header">
                    <div className="article-section-label green">Defense Strategy</div>
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

        {/* ─── FULL EXPOSURE PROFILE ─── */}
        <section style={{ marginBottom: 60 }}>
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

        {/* ─── GOVERNING AUTHORITIES ─── */}
        <section style={{ marginBottom: 60 }}>
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

        {/* ─── DEFENSE STRATEGIES ─── */}
        <div className="article-defense-box" style={{ marginBottom: 60 }}>
          <div className="article-section-label green" style={{ marginBottom: 20 }}>Defense Strategies</div>
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

        {/* ─── CURRENTLY MONITORING ─── */}
        {ind.monitoring && ind.monitoring.length > 0 && (
          <div className="article-monitoring">
            <div className="article-monitoring-bar" />
            <div className="article-monitoring-inner">
              <div className="article-section-label lg">Currently Monitoring</div>
              <div className="ind-monitoring-note">
                Active developments that may affect {ind.name.toLowerCase()} employers.
              </div>
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
