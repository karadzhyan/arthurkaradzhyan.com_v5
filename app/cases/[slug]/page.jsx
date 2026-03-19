import Link from 'next/link';
import { caseLaw, getCaseBySlug, getAllCaseSlugs } from '@/data/caseLaw';
import { getIndustriesForCase, getToolsForCase, getInsightsForCase, getCommentaryForCase, getMattersForCase } from '@/data/crossReferences';
import { insights } from '@/data/insights';
import { tools } from '@/data/tools';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export function generateStaticParams() {
  return getAllCaseSlugs().map(function(slug) { return { slug: slug }; });
}

export function generateMetadata({ params }) {
  var caseItem = getCaseBySlug(params.slug);
  if (!caseItem) return { title: 'Not Found' };
  return {
    title: caseItem.case + ' — ' + caseItem.issue + ' | Arthur Karadzhyan',
    description: caseItem.preview || ('Defense-side analysis of ' + caseItem.case + ' ' + caseItem.cite),
    openGraph: { title: caseItem.case + ' — Defense Analysis', description: caseItem.issue, type: 'article' },
  };
}

export default function CasePage({ params }) {
  var caseItem = getCaseBySlug(params.slug);

  if (!caseItem) {
    return (
      <div className="page-wrap">
        <SiteNav current="Cases" />
        <div className="not-found">
          <h1>Case Not Found</h1>
          <Link href="/cases">Back to all case analyses</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.arthurkaradzhyan.com' },
        { name: 'Cases', url: 'https://www.arthurkaradzhyan.com/cases' },
        { name: caseItem.case, url: 'https://www.arthurkaradzhyan.com/cases/' + params.slug }
      ]} />
      <SiteNav current="Cases" />

      {caseItem.datePublished && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": caseItem.case + ' — ' + caseItem.issue,
              "description": caseItem.preview || caseItem.issue,
              "author": { "@type": "Person", "name": "Arthur Karadzhyan" },
              "datePublished": caseItem.datePublished,
              "dateModified": caseItem.dateModified || caseItem.datePublished,
              "publisher": { "@type": "Person", "name": "Arthur Karadzhyan" }
            })
          }}
        />
      )}

      <article className="article-wrap wide">
        <div className="article-label">{caseItem.issue}</div>
        <div className="article-label-muted">Current as of {caseItem.current}</div>
        <h1 className="article-title italic">{caseItem.case}</h1>
        <div className="article-cite">{caseItem.cite}</div>

        {caseItem.preview && (
          <div className="article-preview">{caseItem.preview}</div>
        )}

        <div className="article-section">
          <div className="article-section-label">Holding</div>
          <div className="article-section-body">{caseItem.holding}</div>
        </div>

        <div className="article-section">
          <div className="article-section-label">Impact on Defense Practice</div>
          <div className="article-section-body">{caseItem.impact}</div>
        </div>

        <div className="article-defense-box">
          <div className="article-section-label green">Defense Strategy</div>
          <div className="article-defense-box-text">{caseItem.defense}</div>
        </div>

        {/* ── Related on This Site ──────────────────────────── */}
        {(function() {
          var relIndustries = getIndustriesForCase(params.slug);
          var relTools = getToolsForCase(params.slug);
          var relInsights = getInsightsForCase(params.slug);
          var relCommentary = getCommentaryForCase(params.slug);
          var relMatters = getMattersForCase(params.slug);
          var hasRelated = relIndustries.length > 0 || relTools.length > 0 || relInsights.length > 0 || relCommentary.length > 0 || relMatters.length > 0;
          if (!hasRelated) return null;
          return (
            <div className="article-related" style={{ marginTop: 40 }}>
              <div className="article-related-label">Related on This Site</div>
              <div className="article-related-links">
                {relInsights.map(function(ins) {
                  return <Link key={'ins-' + ins.slug} href={'/insights/' + ins.slug} className="article-related-link">{ins.title} →</Link>;
                })}
                {relIndustries.map(function(ind) {
                  return <Link key={'ind-' + ind.slug} href={'/industries/' + ind.slug} className="article-related-link">{ind.name} — Industry Profile →</Link>;
                })}
                {relTools.map(function(t) {
                  return <Link key={'tool-' + t.slug} href={'/tools/' + t.slug} className="article-related-link muted">{t.name} →</Link>;
                })}
                {relCommentary.map(function(c) {
                  return <Link key={'com-' + c.slug} href={'/commentary/' + c.slug} className="article-related-link muted">Commentary →</Link>;
                })}
                {relMatters.map(function(m) {
                  return <Link key={'mat-' + m.slug} href={'/matters/' + m.slug} className="article-related-link muted">{m.title} →</Link>;
                })}
              </div>
            </div>
          );
        })()}

        <div className="article-disclaimer">
          This analysis is for informational purposes only. Case law is current as of {caseItem.current}.
        </div>

        <div className="article-nav">
          {caseItem.index > 0 ? (
            <Link href={'/cases/' + caseLaw[caseItem.index - 1].slug} className="article-nav-link">← Previous</Link>
          ) : <span />}
          {caseItem.index < caseLaw.length - 1 ? (
            <Link href={'/cases/' + caseLaw[caseItem.index + 1].slug} className="article-nav-link">Next →</Link>
          ) : <span />}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
