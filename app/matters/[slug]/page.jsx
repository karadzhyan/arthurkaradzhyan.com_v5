import Link from 'next/link';
import { matters, getMatterBySlug, getAllMatterSlugs } from '@/data/matters';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export function generateStaticParams() {
  return getAllMatterSlugs().map(function(slug) { return { slug: slug }; });
}

export function generateMetadata({ params }) {
  var matter = getMatterBySlug(params.slug);
  if (!matter) return { title: 'Not Found' };
  return {
    title: matter.title + ' — ' + matter.cat + ' | Arthur Karadzhyan',
    description: matter.short + ' ' + matter.result + '.',
    openGraph: {
      title: matter.title + ' | Arthur Karadzhyan',
      description: matter.short,
      type: 'article',
    },
  };
}

export default function MatterPage({ params }) {
  var matter = getMatterBySlug(params.slug);

  if (!matter) {
    return (
      <div className="page-wrap">
        <SiteNav current="Matters" />
        <div className="not-found">
          <h1>Matter Not Found</h1>
          <Link href="/matters">Back to all matters</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.arthurkaradzhyan.com' },
        { name: 'Matters', url: 'https://www.arthurkaradzhyan.com/matters' },
        { name: matter.title, url: 'https://www.arthurkaradzhyan.com/matters/' + params.slug }
      ]} />
      <SiteNav current="Matters" />

      <article className="article-wrap wide">
        <div className="article-label">{matter.cat}</div>
        <h1 className="article-title">{matter.title}</h1>

        <p className="article-desc">{matter.short}</p>

        {/* LEVEL 0: THE ANSWER — result leads */}
        <div className="matter-result" style={{ marginTop: 16, marginBottom: 24 }}>
          {matter.result}
        </div>

        {/* LEVEL 1: KEY TAKEAWAY — the transferable insight */}
        {matter.keyTakeaway && (
          <div className="ind-cat-impact" style={{ marginBottom: 24 }}>
            {matter.keyTakeaway}
          </div>
        )}

        {/* LEVEL 2: SUPPORTING NARRATIVE */}
        <div className="article-body">
          <p>{matter.full}</p>
        </div>

        {matter.quote && (
          <div className="matter-quote" style={{ marginTop: 32 }}>
            <div className="matter-quote-text">
              &ldquo;{matter.quote.text}&rdquo;
            </div>
            <div className="matter-quote-attr">
              {matter.quote.attr}
            </div>
          </div>
        )}

        {/* LEVEL 3: EVIDENCE — methodology and authorities */}
        {matter.techniques && matter.techniques.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <div className="article-section-label lg">Methodology</div>
            <div className="ind-issues-grid">
              {matter.techniques.map(function(t, i) {
                return (
                  <div key={i} className="ind-issue-item">
                    <div className="ind-issue-num">{i + 1}</div>
                    <div className="ind-issue-text">{t}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {matter.statutes && matter.statutes.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <div className="article-section-label lg">Governing Authorities</div>
            <div className="ind-authorities-list">
              {matter.statutes.map(function(s, i) {
                return (
                  <div key={i} className="ind-authority-item">
                    <div className="ind-authority-num">{i + 1}</div>
                    <div className="ind-authority-text">{s}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="article-disclaimer">
          This matter description is for illustrative purposes only. Details have been generalized to protect client confidentiality. Prior results do not guarantee a similar outcome.
        </div>

        <div className="article-nav">
          {matter.index > 0 ? (
            <Link href={'/matters/' + matters[matter.index - 1].slug} className="article-nav-link">
              ← {matters[matter.index - 1].title}
            </Link>
          ) : <span />}
          {matter.index < matters.length - 1 ? (
            <Link href={'/matters/' + matters[matter.index + 1].slug} className="article-nav-link">
              {matters[matter.index + 1].title} →
            </Link>
          ) : <span />}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
