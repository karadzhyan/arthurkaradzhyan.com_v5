import Link from 'next/link';
import { caseLaw, getCaseBySlug, getAllCaseSlugs } from '@/data/caseLaw';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { BrinkerDiagram, ZBDiagram, HohensheltDiagram, LeeperDiagram, NaranjoCaseDiagram, AlvaradoDiagram, DonohueDiagram } from '@/components/CaseDiagrams';
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

      <article className="article-wrap wide">
        <div className="article-label">{caseItem.issue}</div>
        <div className="article-label-muted">Current as of {caseItem.current}</div>
        <h1 className="article-title italic">{caseItem.case}</h1>
        <div className="article-cite">{caseItem.cite}</div>

        {caseItem.preview && (
          <div className="article-preview">{caseItem.preview}</div>
        )}

        {/* Per-case visual diagrams */}
        {params.slug === 'brinker-restaurant-corp-v-superior-court' && <BrinkerDiagram />}
        {params.slug === 'zb-na-v-superior-court' && <ZBDiagram />}
        {params.slug === 'hohenshelt-v-superior-court' && <HohensheltDiagram />}
        {params.slug === 'leeper-v-shipt-inc' && <LeeperDiagram />}
        {params.slug === 'naranjo-v-spectrum-security-services-inc' && <NaranjoCaseDiagram />}
        {params.slug === 'alvarado-v-dart-container-corp-of-california' && <AlvaradoDiagram />}
        {params.slug === 'donohue-v-amn-services-inc' && <DonohueDiagram />}

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
