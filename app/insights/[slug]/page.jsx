import Link from 'next/link';
import { insights, getInsightBySlug, getAllInsightSlugs } from '@/data/insights';

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
      <div style={{ fontFamily: "'Outfit',sans-serif", padding: '120px 48px', textAlign: 'center' }}>
        <h1>Publication Not Found</h1>
        <Link href="/#Insights" style={{ color: '#2c3e3a' }}>Back to all publications</Link>
      </div>
    );
  }

  var paragraphs = insight.full.split('\n').filter(function(p) { return p.trim(); });

  return (
    <div style={{ fontFamily: "'Libre Baskerville',Georgia,serif", color: '#1a1a1a', background: '#fff', minHeight: '100vh' }}>
      <nav style={{ padding: '22px 48px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: 6, textTransform: 'uppercase', color: '#1a1a1a', textDecoration: 'none' }}>
          Arthur Karadzhyan
        </Link>
        <Link href="/#Insights" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#999', textDecoration: 'none' }}>
          ← All Publications
        </Link>
      </nav>

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
          <div style={{ padding: '12px 16px', background: '#f0f5f4', border: '1px solid #e0e8e6', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#2c3e3a' }}>Interactive Tool</span>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#888' }}>{insight.tool}</span>
            <Link href="/#Tools" style={{ marginLeft: 'auto', color: '#2c3e3a', textDecoration: 'none', fontFamily: "'Outfit',sans-serif", fontSize: 11 }}>
              Open →
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

      <div style={{ padding: '24px 48px', textAlign: 'center', borderTop: '1px solid #eee', background: '#fafafa' }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: '#999', letterSpacing: 2 }}>
          © {new Date().getFullYear()} Arthur Karadzhyan · Los Angeles, California
        </div>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, color: '#999', letterSpacing: 1, marginTop: 6 }}>
          Attorney Advertising · Prior results do not guarantee a similar outcome · This website does not constitute legal advice
        </div>
      </div>
    </div>
  );
}
