import Link from 'next/link';
import { industries, getIndustryBySlug, getAllIndustrySlugs } from '@/data/industries';
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
    description: 'Defense-side analysis of PAGA and wage-and-hour exposure for ' + ind.name.toLowerCase() + ' employers in California.',
    openGraph: { title: ind.name + ' — Industry Intelligence | Arthur Karadzhyan', description: ind.headline, type: 'article' },
  };
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
          </div>
          {ind.wageOrder && <div className="article-industry-wage">Applicable: {ind.wageOrder}</div>}
        </div>
      </div>

      <article className="article-wrap wide">
        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Structural Vulnerability</div>
          <div className="article-body">
            {ind.structuralVulnerability.split('\n').filter(function(p) { return p.trim(); }).map(function(p, i) { return <p key={i}>{p}</p>; })}
          </div>
        </section>

        <ExposureProfileChart industryName={ind.name} />

        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Exposure Categories</div>
          {ind.exposureCategories.map(function(cat, i) {
            return (
              <div key={i} className="article-exposure-cat" style={{ borderBottom: i < ind.exposureCategories.length - 1 ? undefined : 'none' }}>
                <div className="article-exposure-name">{cat.name}</div>
                <div className="article-exposure-statute">{cat.statute}</div>
                <div className="article-exposure-analysis">{cat.analysis}</div>
                <div className="article-exposure-defense">
                  <div className="article-section-label green">Defense Strategy</div>
                  <div className="article-exposure-defense-text">{cat.defenseStrategy}</div>
                </div>
              </div>
            );
          })}
        </section>

        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Full Exposure Profile</div>
          <div className="article-issues-grid">
            {ind.issues.map(function(issue, i) {
              return <div key={i} className="article-issue-item">{issue}</div>;
            })}
          </div>
        </section>

        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Governing Authorities</div>
          <AuthorityTimeline authorities={ind.authorities} />
          {ind.authorities.map(function(auth, i) {
            return <div key={i} className="article-authority">{auth}</div>;
          })}
        </section>

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

        {ind.monitoring && ind.monitoring.length > 0 && (
          <div className="article-monitoring">
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

        <section style={{ marginBottom: 40 }}>
          <div className="article-section-label lg">Related on This Site</div>
          <div className="article-related-links">
            {ind.relatedInsights && ind.relatedInsights.map(function(slug, i) {
              return <Link key={'i' + i} href={'/insights/' + slug} className="article-related-link">Publication →</Link>;
            })}
            {ind.relatedTools && ind.relatedTools.map(function(slug, i) {
              return <Link key={'t' + i} href={'/tools/' + slug} className="article-related-link muted">Interactive Tool →</Link>;
            })}
            <Link href="/industries" className="article-related-link muted">All Industries →</Link>
          </div>
        </section>

        <div className="article-disclaimer">
          This industry analysis is for informational purposes only and does not constitute legal advice.
        </div>

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
