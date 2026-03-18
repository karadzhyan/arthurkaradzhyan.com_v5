import Link from 'next/link';
import { insights, getInsightBySlug, getAllInsightSlugs } from '@/data/insights';
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
      <SiteNav current="Insights" />

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
            <Link href="/tools" className="article-tool-link">
              All Tools →
            </Link>
          </div>
        )}

        <div className="article-body">
          {paragraphs.map(function(p, i) {
            return <p key={i}>{p}</p>;
          })}
        </div>

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
