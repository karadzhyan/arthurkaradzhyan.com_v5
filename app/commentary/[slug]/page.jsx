import Link from 'next/link';
import { commentary, getCommentaryBySlug, getAllCommentarySlugs } from '@/data/commentary';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
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
    description: item.bottomLine || item.summary,
    openGraph: {
      title: item.title,
      description: item.bottomLine || item.summary,
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
      <div className="page-wrap">
        <SiteNav current="Commentary" />
        <div className="not-found">
          <h1>Commentary Not Found</h1>
          <Link href="/commentary">Back to all commentary</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  var paragraphs = item.content.split('\n').filter(function(p) { return p.trim(); });

  return (
    <div className="page-wrap">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.arthurkaradzhyan.com' },
        { name: 'Commentary', url: 'https://www.arthurkaradzhyan.com/commentary' },
        { name: item.title, url: 'https://www.arthurkaradzhyan.com/commentary/' + params.slug }
      ]} />
      <SiteNav current="Commentary" />

      <article className="article-wrap narrow">
        <div className="article-label-muted">{formatDate(item.date)}</div>

        <h1 className="article-title" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)' }}>
          {item.title}
        </h1>

        {/* LEVEL 0: THE ANSWER — bottom line leads */}
        {item.bottomLine && (
          <div className="ind-cat-impact" style={{ marginBottom: 24 }}>
            {item.bottomLine}
          </div>
        )}

        {/* LEVEL 1: FRAMING — the context that makes the answer meaningful */}
        <p className="article-desc">{item.summary}</p>

        <div className="article-body sm">
          {paragraphs.map(function(p, i) {
            return <p key={i} style={{ marginBottom: 20 }}>{p}</p>;
          })}
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="article-tags">
            {item.tags.map(function(tag, i) {
              return <span key={i} className="article-tag">{tag}</span>;
            })}
          </div>
        )}

        {((item.relatedInsights && item.relatedInsights.length > 0) || (item.relatedCases && item.relatedCases.length > 0)) && (
          <div className="article-related">
            <div className="article-related-label">Related</div>
            <div className="article-related-links">
              {item.relatedInsights && item.relatedInsights.map(function(slug, i) {
                return (
                  <Link key={'i' + i} href={'/insights/' + slug} className="article-related-link">
                    Full Publication →
                  </Link>
                );
              })}
              {item.relatedCases && item.relatedCases.map(function(slug, i) {
                return (
                  <Link key={'c' + i} href={'/cases/' + slug} className="article-related-link muted">
                    Case Analysis →
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="article-disclaimer">
          This commentary is for informational purposes only and does not constitute legal advice.
        </div>

        <div className="article-nav">
          {item.index > 0 ? (
            <Link href={'/commentary/' + commentary[item.index - 1].slug} className="article-nav-link">
              ← Previous
            </Link>
          ) : <span />}
          {item.index < commentary.length - 1 ? (
            <Link href={'/commentary/' + commentary[item.index + 1].slug} className="article-nav-link">
              Next →
            </Link>
          ) : <span />}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
