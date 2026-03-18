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
        <div style={{ fontFamily: "'Outfit',sans-serif", padding: '120px 48px', textAlign: 'center' }}>
          <h1>Publication Not Found</h1>
          <Link href="/insights" style={{ color: '#2c3e3a' }}>Back to all publications</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  var paragraphs = insight.full.split('\n').filter(function(p) { return p.trim(); });

  return (
    <div className="page-wrap">
      <SiteNav current="Insights" />

      <article style={{ maxWidth: 720, margin: '0 auto', padding: '80px 48px 120px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a' }}>
            {insight.tag}
          </span>
          {insight.badge && (
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', padding: '2px 6px', background: '#2c3e3a', color: '#fff' }}>
              {insight.badge}
            </span>
          )}
        </div>

        <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, lineHeight: 1.25, marginBottom: 20, letterSpacing: -0.5 }}>
          {insight.title}
        </h1>

        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, lineHeight: 1.8, color: '#888', marginBottom: 40, borderBottom: '1px solid #eee', paddingBottom: 40 }}>
          {insight.desc}
        </p>

        {insight.tool && (
          <div style={{ padding: '12px 16px', background: '#f0f5f4', border: '1px solid #e0e8e6', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#2c3e3a' }}>Interactive Tool</span>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#888' }}>{insight.tool}</span>
            <Link href="/tools" style={{ marginLeft: 'auto', color: '#2c3e3a', textDecoration: 'none', fontFamily: "'Outfit',sans-serif", fontSize: 11 }}>
              All Tools →
            </Link>
          </div>
        )}

        <div style={{ fontSize: 17, lineHeight: 2, color: '#444' }}>
          {paragraphs.map(function(p, i) {
            return <p key={i} style={{ marginBottom: 24 }}>{p}</p>;
          })}
        </div>

        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: '#bbb', fontStyle: 'italic', marginTop: 60, paddingTop: 24, borderTop: '1px solid #eee' }}>
          For illustrative purposes only. This publication does not constitute legal advice. Prior results do not guarantee a similar outcome.
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, paddingTop: 24, borderTop: '1px solid #eee' }}>
          {insight.index > 0 ? (
            <Link href={'/insights/' + insights[insight.index - 1].slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#2c3e3a', textDecoration: 'none' }}>
              ← Previous
            </Link>
          ) : <span />}
          {insight.index < insights.length - 1 ? (
            <Link href={'/insights/' + insights[insight.index + 1].slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#2c3e3a', textDecoration: 'none' }}>
              Next →
            </Link>
          ) : <span />}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
