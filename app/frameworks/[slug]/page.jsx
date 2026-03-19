import Link from 'next/link';
import { frameworks, getFrameworkBySlug, getAllFrameworkSlugs } from '@/data/frameworks';
import { insights } from '@/data/insights';
import { tools } from '@/data/tools';
import { caseLaw } from '@/data/caseLaw';
import { matters } from '@/data/matters';
import { industries } from '@/data/industries';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export function generateStaticParams() {
  return getAllFrameworkSlugs().map(function(slug) { return { slug: slug }; });
}

export function generateMetadata({ params }) {
  var fw = getFrameworkBySlug(params.slug);
  if (!fw) return { title: 'Not Found' };
  return {
    title: fw.name + ' — Defense Framework | Arthur Karadzhyan',
    description: fw.headline,
    openGraph: { title: fw.name + ' — Defense Framework', description: fw.headline, type: 'article' },
  };
}

function getInsightTitle(slug) {
  var found = insights.find(function(i) { return i.slug === slug; });
  return found ? found.title : 'Publication';
}

function getToolName(slug) {
  var found = tools.find(function(t) { return t.slug === slug; });
  return found ? found.name : 'Tool';
}

function getCaseName(slug) {
  var found = caseLaw.find(function(c) { return c.slug === slug; });
  return found ? found.case : 'Case';
}

function getMatterSlug(title) {
  var found = matters.find(function(m) { return m.title === title; });
  return found ? found.slug : null;
}

export default function FrameworkPage({ params }) {
  var fw = getFrameworkBySlug(params.slug);

  if (!fw) {
    return (
      <div className="page-wrap">
        <SiteNav current="Frameworks" />
        <div className="not-found">
          <h1>Framework Not Found</h1>
          <Link href="/frameworks">Back to all frameworks</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  var methodologyParagraphs = fw.methodology.split('\n').filter(function(p) { return p.trim(); });

  return (
    <div className="page-wrap">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.arthurkaradzhyan.com' },
        { name: 'Frameworks', url: 'https://www.arthurkaradzhyan.com/frameworks' },
        { name: fw.name, url: 'https://www.arthurkaradzhyan.com/frameworks/' + params.slug }
      ]} />
      <SiteNav current="Frameworks" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": fw.name + ' — ' + fw.subtitle,
            "description": fw.headline,
            "author": { "@type": "Person", "name": "Arthur Karadzhyan" },
            "datePublished": fw.datePublished,
            "dateModified": fw.dateModified,
            "publisher": { "@type": "Person", "name": "Arthur Karadzhyan" }
          })
        }}
      />

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="article-industry-header">
        <div className="article-industry-header-inner">
          <div className="page-label-dark">Defense Framework</div>
          <h1 className="page-title-dark" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700 }}>{fw.name}</h1>
          {fw.subtitle && (
            <div className="page-desc-dark" style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', maxWidth: 640, marginBottom: 20 }}>
              {fw.subtitle}
            </div>
          )}
          <div className="page-desc-dark" style={{ maxWidth: 680, opacity: 0.85 }}>{fw.headline}</div>
        </div>
      </div>

      <article className="article-wrap wide">

        {/* ── Core Description ────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <div className="article-section-label lg">Framework Overview</div>
          <div className="article-body">
            <p>{fw.description}</p>
          </div>
        </section>

        {/* ── Methodology ─────────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <div className="article-section-label lg">Methodology</div>
          <div className="article-body">
            {methodologyParagraphs.map(function(p, i) { return <p key={i}>{p}</p>; })}
          </div>
        </section>

        {/* ── Applicability ───────────────────────────────────── */}
        <div className="article-defense-box" style={{ marginBottom: 48 }}>
          <div className="article-section-label green" style={{ marginBottom: 12 }}>Applicability</div>
          <div className="article-defense-box-text">{fw.applicability}</div>
        </div>

        {/* ── Key Insight ─────────────────────────────────────── */}
        <div className="article-practice-note" style={{ marginBottom: 48 }}>
          <div className="article-practice-note-label">Key Insight</div>
          <p className="article-practice-note-text">{fw.keyInsight}</p>
        </div>

        {/* ── Applies Across All Industries ────────────────────── */}
        {fw.applicableIndustries === 'all' && (
          <section style={{ marginBottom: 48 }}>
            <div className="article-section-label lg">Applicable Industries</div>
            <p className="article-cross-intro">
              This framework applies to every PAGA matter regardless of sector. Below are the
              industry profiles that adapt it to sector-specific exposure architectures.
            </p>
            <div className="article-issues-grid">
              {industries.map(function(ind) {
                return (
                  <Link key={ind.slug} href={'/industries/' + ind.slug} className="article-issue-item" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    {ind.name}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Related on This Site ──────────────────────────── */}
        <section style={{ marginBottom: 40 }}>
          <div className="article-section-label lg">Related on This Site</div>
          <div className="article-related-links">
            {fw.relatedInsights && fw.relatedInsights.map(function(slug, i) {
              return <Link key={'i' + i} href={'/insights/' + slug} className="article-related-link">{getInsightTitle(slug)} →</Link>;
            })}
            {fw.relatedTools && fw.relatedTools.map(function(slug, i) {
              return <Link key={'t' + i} href={'/tools/' + slug} className="article-related-link muted">{getToolName(slug)} →</Link>;
            })}
            {fw.relatedCases && fw.relatedCases.map(function(slug, i) {
              return <Link key={'c' + i} href={'/cases/' + slug} className="article-related-link muted">{getCaseName(slug)} →</Link>;
            })}
            {fw.relatedMatters && fw.relatedMatters.map(function(title, i) {
              var mSlug = getMatterSlug(title);
              if (mSlug) {
                return <Link key={'m' + i} href={'/matters/' + mSlug} className="article-related-link muted">{title} →</Link>;
              }
              return null;
            })}
            <Link href="/frameworks" className="article-related-link muted">All Frameworks →</Link>
          </div>
        </section>

        {/* ── Disclaimer ────────────────────────────────────── */}
        <div className="article-disclaimer">
          This framework description is for informational purposes only and does not constitute legal advice.
        </div>

        {/* ── Prev/Next Navigation ──────────────────────────── */}
        <div className="article-nav">
          {fw.index > 0 ? (
            <Link href={'/frameworks/' + frameworks[fw.index - 1].slug} className="article-nav-link">
              <span className="article-nav-dir">← Previous</span>
              <span className="article-nav-name">{frameworks[fw.index - 1].name}</span>
            </Link>
          ) : <span />}
          {fw.index < frameworks.length - 1 ? (
            <Link href={'/frameworks/' + frameworks[fw.index + 1].slug} className="article-nav-link article-nav-link-next">
              <span className="article-nav-dir">Next →</span>
              <span className="article-nav-name">{frameworks[fw.index + 1].name}</span>
            </Link>
          ) : <span />}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
