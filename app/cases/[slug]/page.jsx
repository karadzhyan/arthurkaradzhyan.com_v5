import Link from 'next/link';
import { caseLaw, getCaseBySlug, getAllCaseSlugs } from '@/data/caseLaw';

export function generateStaticParams() {
  return getAllCaseSlugs().map(function(slug) { return { slug: slug }; });
}

export function generateMetadata({ params }) {
  var caseItem = getCaseBySlug(params.slug);
  if (!caseItem) return { title: 'Not Found' };
  return {
    title: caseItem.case + ' — ' + caseItem.issue + ' | Arthur Karadzhyan',
    description: caseItem.preview || ('Defense-side analysis of ' + caseItem.case + ' ' + caseItem.cite + '. ' + caseItem.issue + '.'),
    openGraph: {
      title: caseItem.case + ' — Defense Analysis',
      description: caseItem.issue,
      type: 'article',
    },
  };
}

export default function CasePage({ params }) {
  var caseItem = getCaseBySlug(params.slug);

  if (!caseItem) {
    return (
      <div style={{ fontFamily: "'Outfit',sans-serif", padding: '120px 48px', textAlign: 'center' }}>
        <h1>Case Not Found</h1>
        <Link href="/#Cases" style={{ color: '#2c3e3a' }}>Back to all case analyses</Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Libre Baskerville',Georgia,serif", color: '#1a1a1a', background: '#fff', minHeight: '100vh' }}>
      <nav style={{ padding: '22px 48px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: 6, textTransform: 'uppercase', color: '#1a1a1a', textDecoration: 'none' }}>
          Arthur Karadzhyan
        </Link>
        <Link href="/#Cases" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#999', textDecoration: 'none' }}>
          ← All Case Analyses
        </Link>
      </nav>

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
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 12 }}>
            Holding
          </div>
          <div style={{ fontSize: 17, lineHeight: 2, color: '#444' }}>
            {caseItem.holding}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 12 }}>
            Impact on Defense Practice
          </div>
          <div style={{ fontSize: 17, lineHeight: 2, color: '#444' }}>
            {caseItem.impact}
          </div>
        </section>

        <section style={{ padding: 24, background: '#f0fff0', border: '1px solid #c0e0c0', marginBottom: 40 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#198754', marginBottom: 12 }}>
            Defense Strategy
          </div>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, lineHeight: 2, color: '#555' }}>
            {caseItem.defense}
          </div>
        </section>

        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: '#bbb', fontStyle: 'italic', marginTop: 60, paddingTop: 24, borderTop: '1px solid #eee' }}>
          This analysis is for informational purposes only and does not constitute legal advice. Case law is current as of {caseItem.current}. Subsequent decisions may affect the analysis.
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, paddingTop: 24, borderTop: '1px solid #eee' }}>
          {caseItem.index > 0 ? (
            <Link href={'/cases/' + caseLaw[caseItem.index - 1].slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#2c3e3a', textDecoration: 'none' }}>
              ← Previous
            </Link>
          ) : <span />}
          {caseItem.index < caseLaw.length - 1 ? (
            <Link href={'/cases/' + caseLaw[caseItem.index + 1].slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#2c3e3a', textDecoration: 'none' }}>
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
          Attorney Advertising · Prior results do not guarantee a similar outcome
        </div>
      </div>
    </div>
  );
}
