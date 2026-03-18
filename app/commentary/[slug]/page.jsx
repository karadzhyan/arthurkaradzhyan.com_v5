import Link from 'next/link';
import { commentary, getCommentaryBySlug, getAllCommentarySlugs } from '@/data/commentary';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export function generateStaticParams() {
  return getAllCommentarySlugs().map(function(slug) { return { slug: slug }; });
}

export function generateMetadata({ params }) {
  var item = getCommentaryBySlug(params.slug);
  if (!item) return { title: 'Not Found' };
  return {
    title: item.title + ' | Arthur Karadzhyan',
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      type: 'article',
    },
  };
}

function formatDate(dateStr) {
  var d = new Date(dateStr + 'T00:00:00');
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

export default function CommentaryPage({ params }) {
  var item = getCommentaryBySlug(params.slug);

  if (!item) {
    return (
      <div style={{ fontFamily: "'Outfit',sans-serif", padding: '120px 48px', textAlign: 'center' }}>
        <h1>Commentary Not Found</h1>
        <Link href="/commentary" style={{ color: '#2c3e3a' }}>Back to all commentary</Link>
      </div>
    );
  }

  var paragraphs = item.content.split('\n').filter(function(p) { return p.trim(); });

  return (
    <div className="page-wrap">
      <SiteNav current="Commentary" />

      <article style={{ maxWidth: 680, margin: '0 auto', padding: '80px 48px 120px' }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: 3, textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
          {formatDate(item.date)}
        </div>

        <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 700, lineHeight: 1.3, marginBottom: 20, letterSpacing: -0.3 }}>
          {item.title}
        </h1>

        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, lineHeight: 1.8, color: '#888', marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid #eee' }}>
          {item.summary}
        </p>

        <div style={{ fontSize: 16, lineHeight: 2, color: '#444' }}>
          {paragraphs.map(function(p, i) {
            return <p key={i} style={{ marginBottom: 20 }}>{p}</p>;
          })}
        </div>

        {/* TAGS */}
        {item.tags && item.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 40, paddingTop: 24, borderTop: '1px solid #eee' }}>
            {item.tags.map(function(tag, i) {
              return (
                <span key={i} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#2c3e3a', padding: '4px 10px', background: '#f0f5f4', border: '1px solid #e0e8e6' }}>
                  {tag}
                </span>
              );
            })}
          </div>
        )}

        {/* RELATED */}
        {((item.relatedInsights && item.relatedInsights.length > 0) || (item.relatedCases && item.relatedCases.length > 0)) && (
          <div style={{ marginTop: 24 }}>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#999', marginBottom: 10 }}>
              Related
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {item.relatedInsights && item.relatedInsights.map(function(slug, i) {
                return (
                  <Link key={'i' + i} href={'/insights/' + slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#2c3e3a', textDecoration: 'none', padding: '8px 14px', border: '1px solid #2c3e3a' }}>
                    Full Publication →
                  </Link>
                );
              })}
              {item.relatedCases && item.relatedCases.map(function(slug, i) {
                return (
                  <Link key={'c' + i} href={'/cases/' + slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#999', textDecoration: 'none', padding: '8px 14px', border: '1px solid #eee' }}>
                    Case Analysis →
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* DISCLAIMER */}
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: '#bbb', fontStyle: 'italic', marginTop: 48, paddingTop: 24, borderTop: '1px solid #eee' }}>
          This commentary is for informational purposes only and does not constitute legal advice.
        </div>

        {/* PREV/NEXT */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid #eee' }}>
          {item.index > 0 ? (
            <Link href={'/commentary/' + commentary[item.index - 1].slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#2c3e3a', textDecoration: 'none' }}>
              ← Previous
            </Link>
          ) : <span />}
          {item.index < commentary.length - 1 ? (
            <Link href={'/commentary/' + commentary[item.index + 1].slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#2c3e3a', textDecoration: 'none' }}>
              Next →
            </Link>
          ) : <span />}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
