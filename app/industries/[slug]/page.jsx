import Link from 'next/link';
import { industries, getIndustryBySlug, getAllIndustrySlugs, crossIndustryPatterns } from '@/data/industries';
import { insights } from '@/data/insights';
import { tools } from '@/data/tools';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export function generateStaticParams() {
  return getAllIndustrySlugs().map(function(slug) { return { slug: slug }; });
}

export function generateMetadata({ params }) {
  var ind = getIndustryBySlug(params.slug);
  if (!ind) return { title: 'Not Found' };
  return {
    title: ind.name + ' — PAGA Defense & Employment Litigation | Arthur Karadzhyan',
    description: 'Defense-side analysis of PAGA and wage-and-hour exposure for ' + ind.name.toLowerCase() + ' employers in California. ' + ind.issues.length + ' exposure categories, ' + ind.authorities.length + ' governing authorities, ' + ind.defenseStrategies.length + ' defense strategies.',
    openGraph: { title: ind.name + ' — Industry Intelligence | Arthur Karadzhyan', description: ind.headline, type: 'article' },
  };
}

function getInsightTitle(slug) {
  var found = insights.find(function(i) { return i.slug === slug; });
  return found ? found.title : 'Publication';
}

function getToolName(slug) {
  var found = tools.find(function(t) { return t.slug === slug; });
  return found ? found.name : 'Interactive Tool';
}

function getIndustryName(slug) {
  var found = industries.find(function(i) { return i.slug === slug; });
  return found ? found.name : slug;
}

function getPatternsForIndustry(industrySlug) {
  return crossIndustryPatterns.filter(function(p) {
    return p.industries.indexOf(industrySlug) !== -1;
  });
}

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

  var patterns = getPatternsForIndustry(params.slug);

  return (
    <div className="page-wrap">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.arthurkaradzhyan.com' },
        { name: 'Industries', url: 'https://www.arthurkaradzhyan.com/industries' },
        { name: ind.name, url: 'https://www.arthurkaradzhyan.com/industries/' + params.slug }
      ]} />
      <SiteNav current="Industries" />

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="article-industry-header">
        <div className="article-industry-header-inner">
          <div className="page-label-dark">Industry Intelligence</div>
          <h1 className="page-title-dark" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700 }}>{ind.name}</h1>
          <div className="page-desc-dark" style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', maxWidth: 640, marginBottom: 20 }}>{ind.headline}</div>

          {ind.keyStatistic && (
            <div className="article-industry-key-stat">
              <span className="article-industry-key-stat-value">{ind.keyStatistic.value}</span>
              <span className="article-industry-key-stat-label">{ind.keyStatistic.label}</span>
            </div>
          )}

          <div className="article-industry-stats">
            <div>
              <div className="article-industry-stat-num">{ind.issues.length}</div>
              <div className="article-industry-stat-label">Exposure Categories</div>
            </div>
            <div>
              <div className="article-industry-stat-num">{ind.authorities.length}</div>
              <div className="article-industry-stat-label">Governing Authorities</div>
            </div>
            <div>
              <div className="article-industry-stat-num">{ind.defenseStrategies.length}</div>
              <div className="article-industry-stat-label">Defense Strategies</div>
            </div>
            {patterns.length > 0 && (
              <div>
                <div className="article-industry-stat-num">{patterns.length}</div>
                <div className="article-industry-stat-label">Cross-Sector Patterns</div>
              </div>
            )}
          </div>
          {ind.wageOrder && <div className="article-industry-wage">Applicable: {ind.wageOrder}</div>}
        </div>
      </div>

      <article className="article-wrap wide">

        {/* ── Sector Context ────────────────────────────────── */}
        {ind.sectorContext && (
          <section style={{ marginBottom: 48 }}>
            <div className="article-sector-context">{ind.sectorContext}</div>
          </section>
        )}

        {/* ── Structural Vulnerability ──────────────────────── */}
        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Structural Vulnerability</div>
          <div className="article-body">
            {ind.structuralVulnerability.split('\n').filter(function(p) { return p.trim(); }).map(function(p, i) { return <p key={i}>{p}</p>; })}
          </div>
        </section>

        {/* ── Practice Note ─────────────────────────────────── */}
        {ind.practiceNote && (
          <div className="article-practice-note">
            <div className="article-practice-note-label">Practice Note</div>
            <p className="article-practice-note-text">{ind.practiceNote}</p>
          </div>
        )}

        {/* ── Exposure Categories ────────────────────────────── */}
        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Exposure Categories</div>
          {ind.exposureCategories.map(function(cat, i) {
            return (
              <div key={i} className="article-exposure-cat" style={{ borderBottom: i < ind.exposureCategories.length - 1 ? undefined : 'none' }}>
                <div className="article-exposure-num-row">
                  <div className="article-exposure-num">{i + 1}</div>
                  <div>
                    <div className="article-exposure-name">{cat.name}</div>
                    <div className="article-exposure-statute">{cat.statute}</div>
                  </div>
                </div>
                <div className="article-exposure-analysis">{cat.analysis}</div>
                <div className="article-exposure-defense">
                  <div className="article-section-label green">Defense Strategy</div>
                  <div className="article-exposure-defense-text">{cat.defenseStrategy}</div>
                </div>
              </div>
            );
          })}
        </section>

        {/* ── Full Exposure Profile ─────────────────────────── */}
        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Full Exposure Profile</div>
          <div className="article-issues-grid">
            {ind.issues.map(function(issue, i) {
              return <div key={i} className="article-issue-item">{issue}</div>;
            })}
          </div>
        </section>

        {/* ── Cross-Industry Patterns ───────────────────────── */}
        {patterns.length > 0 && (
          <section style={{ marginBottom: 60 }}>
            <div className="article-section-label lg">Cross-Industry Patterns</div>
            <p className="article-cross-intro">
              This industry shares {patterns.length} exposure {patterns.length === 1 ? 'pattern' : 'patterns'} with
              other sectors — the same statutory framework creating parallel vulnerabilities
              across different operational contexts.
            </p>
            <div className="article-cross-patterns">
              {patterns.map(function(pattern) {
                var otherIndustries = pattern.industries.filter(function(s) { return s !== params.slug; });
                return (
                  <div key={pattern.id} className="article-cross-pattern-item">
                    <div className="article-cross-pattern-name">{pattern.name}</div>
                    <p className="article-cross-pattern-summary">{pattern.summary}</p>
                    <div className="article-cross-pattern-also">
                      <span className="article-cross-pattern-also-label">Also affects: </span>
                      {otherIndustries.map(function(slug, i) {
                        return (
                          <span key={slug}>
                            <Link href={'/industries/' + slug} className="article-cross-pattern-link">
                              {getIndustryName(slug)}
                            </Link>
                            {i < otherIndustries.length - 1 ? ', ' : ''}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Governing Authorities ─────────────────────────── */}
        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Governing Authorities</div>
          {ind.authorities.map(function(auth, i) {
            return <div key={i} className="article-authority">{auth}</div>;
          })}
        </section>

        {/* ── Defense Strategies ─────────────────────────────── */}
        <div className="article-defense-box" style={{ marginBottom: 60 }}>
          <div className="article-section-label green" style={{ marginBottom: 20 }}>Defense Strategies</div>
          {ind.defenseStrategies.map(function(strategy, i) {
            return (
              <div key={i} className="article-strategy">
                <div className="article-strategy-num">{i + 1}</div>
                <div className="article-strategy-text">{strategy}</div>
              </div>
            );
          })}
        </div>

        {/* ── Currently Monitoring ──────────────────────────── */}
        {ind.monitoring && ind.monitoring.length > 0 && (
          <div className="article-monitoring">
            <div className="article-monitoring-bar" />
            <div className="article-monitoring-inner">
              <div className="article-section-label lg">Currently Monitoring</div>
              {ind.monitoring.map(function(item, i) {
                return (
                  <div key={i} className="article-monitoring-item">
                    <div className={'article-monitoring-dot' + (i === 0 ? ' pending' : ' tracking')} />
                    <div className="article-monitoring-text">{item}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Related on This Site ──────────────────────────── */}
        <section style={{ marginBottom: 40 }}>
          <div className="article-section-label lg">Related on This Site</div>
          <div className="article-related-links">
            {ind.relatedInsights && ind.relatedInsights.map(function(slug, i) {
              return <Link key={'i' + i} href={'/insights/' + slug} className="article-related-link">{getInsightTitle(slug)} →</Link>;
            })}
            {ind.relatedTools && ind.relatedTools.map(function(slug, i) {
              return <Link key={'t' + i} href={'/tools/' + slug} className="article-related-link muted">{getToolName(slug)} →</Link>;
            })}
            {ind.relatedMatters && ind.relatedMatters.length > 0 && ind.relatedMatters.map(function(matter, i) {
              return <span key={'m' + i} className="article-related-link muted" style={{ cursor: 'default' }}>{matter}</span>;
            })}
            <Link href="/industries" className="article-related-link muted">All Industries →</Link>
          </div>
        </section>

        {/* ── Disclaimer ────────────────────────────────────── */}
        <div className="article-disclaimer">
          This industry analysis is for informational purposes only and does not constitute legal advice.
        </div>

        {/* ── Prev/Next Navigation ──────────────────────────── */}
        <div className="article-nav">
          {ind.index > 0 ? (
            <Link href={'/industries/' + industries[ind.index - 1].slug} className="article-nav-link">
              <span className="article-nav-dir">← Previous</span>
              <span className="article-nav-name">{industries[ind.index - 1].name}</span>
            </Link>
          ) : <span />}
          {ind.index < industries.length - 1 ? (
            <Link href={'/industries/' + industries[ind.index + 1].slug} className="article-nav-link article-nav-link-next">
              <span className="article-nav-dir">Next →</span>
              <span className="article-nav-name">{industries[ind.index + 1].name}</span>
            </Link>
          ) : <span />}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
