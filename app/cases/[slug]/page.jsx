import Link from 'next/link';
import { caseLaw, getCaseBySlug, getAllCaseSlugs } from '@/data/caseLaw';
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
        <div style={{ fontFamily: "'Outfit',sans-serif", padding: '120px 48px', textAlign: 'center' }}>
          <h1>Case Not Found</h1>
          <Link href="/cases" style={{ color: '#2c3e3a' }}>Back to all case analyses</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <SiteNav current="Cases" />

      <article style={{ maxWidth: 780, margin: '0 auto', padding: '80px 48px 120px' }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 8 }}>
          {caseItem.issue}
        </div>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
          Current as of {caseItem.current}
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.25, marginBottom: 4 }}>
          {caseItem.case}
        </h1>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: '#999', marginBottom: 16 }}>
          {caseItem.cite}
        </div>

        {caseItem.preview && (
          <div style={{ fontFamily: "Georgia,serif", fontSize: 16, lineHeight: 1.7, color: '#555', fontStyle: 'italic', marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid #eee', paddingLeft: 20, borderLeft: '3px solid #2c3e3a' }}>
            {caseItem.preview}
          </div>
        )}

        <section style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 12 }}>Holding</div>
          <div style={{ fontSize: 17, lineHeight: 2, color: '#444' }}>{caseItem.holding}</div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 12 }}>Impact on Defense Practice</div>
          <div style={{ fontSize: 17, lineHeight: 2, color: '#444' }}>{caseItem.impact}</div>
        </section>

        <section style={{ padding: 24, background: '#f0fff0', border: '1px solid #c0e0c0', marginBottom: 40 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#198754', marginBottom: 12 }}>Defense Strategy</div>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, lineHeight: 2, color: '#555' }}>{caseItem.defense}</div>
        </section>

        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: '#bbb', fontStyle: 'italic', marginTop: 60, paddingTop: 24, borderTop: '1px solid #eee' }}>
          This analysis is for informational purposes only. Case law is current as of {caseItem.current}.
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, paddingTop: 24, borderTop: '1px solid #eee' }}>
          {caseItem.index > 0 ? (
            <Link href={'/cases/' + caseLaw[caseItem.index - 1].slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#2c3e3a', textDecoration: 'none' }}>← Previous</Link>
          ) : <span />}
          {caseItem.index < caseLaw.length - 1 ? (
            <Link href={'/cases/' + caseLaw[caseItem.index + 1].slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#2c3e3a', textDecoration: 'none' }}>Next →</Link>
          ) : <span />}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
