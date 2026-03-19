import Link from 'next/link';
import { matters, getMatterBySlug, getAllMatterSlugs } from '@/data/matters';
import { industries } from '@/data/industries';
import { insights } from '@/data/insights';
import { caseLaw } from '@/data/caseLaw';
import { tools } from '@/data/tools';
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

        <div className="matter-result" style={{ marginTop: 32 }}>
          {matter.result}
        </div>

        {/* ── Related on This Site ──────────────────────────── */}
        {(function() {
          var relIndustries = (matter.relatedIndustries || []).map(function(slug) {
            return industries.find(function(ind) { return ind.slug === slug; });
          }).filter(Boolean);
          var relInsightsArr = (matter.relatedInsights || []).map(function(slug) {
            return insights.find(function(ins) { return ins.slug === slug; });
          }).filter(Boolean);
          var relCasesArr = (matter.relatedCases || []).map(function(slug) {
            return caseLaw.find(function(c) { return c.slug === slug; });
          }).filter(Boolean);
          var relToolsArr = (matter.relatedTools || []).map(function(slug) {
            return tools.find(function(t) { return t.slug === slug; });
          }).filter(Boolean);
          var hasRelated = relIndustries.length > 0 || relInsightsArr.length > 0 || relCasesArr.length > 0 || relToolsArr.length > 0;
          if (!hasRelated) return null;
          return (
            <div className="article-related" style={{ marginTop: 40 }}>
              <div className="article-related-label">Related on This Site</div>
              <div className="article-related-links">
                {relIndustries.map(function(ind) {
                  return <Link key={'ind-' + ind.slug} href={'/industries/' + ind.slug} className="article-related-link">{ind.name} — Industry Profile →</Link>;
                })}
                {relInsightsArr.map(function(ins) {
                  return <Link key={'ins-' + ins.slug} href={'/insights/' + ins.slug} className="article-related-link">{ins.title} →</Link>;
                })}
                {relCasesArr.map(function(c) {
                  return <Link key={'case-' + c.slug} href={'/cases/' + c.slug} className="article-related-link muted">{c.case} →</Link>;
                })}
                {relToolsArr.map(function(t) {
                  return <Link key={'tool-' + t.slug} href={'/tools/' + t.slug} className="article-related-link muted">{t.name} →</Link>;
                })}
              </div>
            </div>
          );
        })()}

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
