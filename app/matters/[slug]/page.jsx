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
