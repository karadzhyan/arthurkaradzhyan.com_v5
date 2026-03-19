import Link from 'next/link';
import { insights, getInsightBySlug, getAllInsightSlugs } from '@/data/insights';
import { getIndustriesForInsight, getToolsForInsight, getMattersForInsight, getCommentaryForInsight } from '@/data/crossReferences';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export function generateStaticParams() {
  return getAllInsightSlugs().map(function(slug) { return { slug: slug }; });
}

export function generateMetadata({ params }) {
  var insight = getInsightBySlug(params.slug);
  if (!insight) return { title: 'Not Found' };
  return {
    title: insight.title + ' | Arthur Karadzhyan',
    description: insight.desc,
    openGraph: { title: insight.title, description: insight.desc, type: 'article' },
  };
}

export default function InsightPage({ params }) {
  var insight = getInsightBySlug(params.slug);

  if (!insight) {
    return (
      <div className="page-wrap">
        <SiteNav current="Insights" />
        <div className="not-found">
          <h1>Publication Not Found</h1>
          <Link href="/insights">Back to all publications</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  var paragraphs = insight.full.split('\n').filter(function(p) { return p.trim(); });

  return (
    <div className="page-wrap">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.arthurkaradzhyan.com' },
        { name: 'Insights', url: 'https://www.arthurkaradzhyan.com/insights' },
        { name: insight.title, url: 'https://www.arthurkaradzhyan.com/insights/' + params.slug }
      ]} />
      <SiteNav current="Insights" />

      {insight.datePublished && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": insight.title,
              "description": insight.desc,
              "author": { "@type": "Person", "name": "Arthur Karadzhyan" },
              "datePublished": insight.datePublished,
              "dateModified": insight.dateModified || insight.datePublished,
              "publisher": { "@type": "Person", "name": "Arthur Karadzhyan" }
            })
          }}
        />
      )}

      <article className="article-wrap">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span className="article-label" style={{ marginBottom: 0 }}>
            {insight.tag}
          </span>
          {insight.badge && (
            <span className="article-badge">{insight.badge}</span>
          )}
        </div>

        <h1 className="article-title">{insight.title}</h1>
        <p className="article-desc">{insight.desc}</p>

        {insight.tool && (
          <div className="article-tool-callout">
            <span className="article-tool-label">Interactive Tool</span>
            <span className="article-tool-name">{insight.tool}</span>
            {insight.relatedTool ? (
              <Link href={'/tools/' + insight.relatedTool} className="article-tool-link">
                Open Tool →
              </Link>
            ) : (
              <Link href="/tools" className="article-tool-link">
                All Tools →
              </Link>
            )}
          </div>
        )}

        <div className="article-body">
          {paragraphs.map(function(p, i) {
            return <p key={i}>{p}</p>;
          })}
        </div>

        {/* ── Related on This Site ──────────────────────────── */}
        {(function() {
          var relIndustries = getIndustriesForInsight(params.slug);
          var relTools = insight.relatedTool ? [insight.relatedTool] : [];
          var relCases = insight.relatedCases || [];
          var relMatters = getMattersForInsight(params.slug);
          var relCommentary = getCommentaryForInsight(params.slug);
          var hasRelated = relIndustries.length > 0 || relTools.length > 0 || relCases.length > 0 || relMatters.length > 0 || relCommentary.length > 0;
          if (!hasRelated) return null;
          return (
            <div className="article-related" style={{ marginTop: 40 }}>
              <div className="article-related-label">Related on This Site</div>
              <div className="article-related-links">
                {relIndustries.map(function(ind) {
                  return <Link key={'ind-' + ind.slug} href={'/industries/' + ind.slug} className="article-related-link">{ind.name} — Industry Profile →</Link>;
                })}
                {relCommentary.map(function(c) {
                  return <Link key={'com-' + c.slug} href={'/commentary/' + c.slug} className="article-related-link">Commentary →</Link>;
                })}
                {relMatters.map(function(m) {
                  return <Link key={'mat-' + m.slug} href={'/matters/' + m.slug} className="article-related-link muted">{m.title} →</Link>;
                })}
              </div>
            </div>
          );
        })()}

        <div className="article-disclaimer">
          For illustrative purposes only. This publication does not constitute legal advice. Prior results do not guarantee a similar outcome.
        </div>

        <div className="article-nav">
          {insight.index > 0 ? (
            <Link href={'/insights/' + insights[insight.index - 1].slug} className="article-nav-link">
              ← Previous
            </Link>
          ) : <span />}
          {insight.index < insights.length - 1 ? (
            <Link href={'/insights/' + insights[insight.index + 1].slug} className="article-nav-link">
              Next →
            </Link>
          ) : <span />}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
