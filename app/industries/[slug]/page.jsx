import Link from 'next/link';
import { industries, getIndustryBySlug, getAllIndustrySlugs } from '@/data/industries';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export function generateStaticParams() {
  return getAllIndustrySlugs().map(function(slug) { return { slug: slug }; });
}

export function generateMetadata({ params }) {
  var ind = getIndustryBySlug(params.slug);
  if (!ind) return { title: 'Not Found' };
  return {
    title: ind.name + ' — PAGA Defense & Employment Litigation | Arthur Karadzhyan',
    description: 'Defense-side analysis of PAGA and wage-and-hour exposure for ' + ind.name.toLowerCase() + ' employers in California.',
    openGraph: { title: ind.name + ' — Industry Intelligence | Arthur Karadzhyan', description: ind.headline, type: 'article' },
  };
}

export default function IndustryPage({ params }) {
  var ind = getIndustryBySlug(params.slug);

  if (!ind) {
    return (
      <div className="page-wrap">
        <SiteNav current="Industries" />
        <div style={{ fontFamily: "'Outfit',sans-serif", padding: '120px 48px', textAlign: 'center' }}>
          <h1>Industry Not Found</h1>
          <Link href="/industries" style={{ color: '#2c3e3a' }}>Back to all industries</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <SiteNav current="Industries" />

      {/* HEADER BAND */}
      <div style={{ background: 'linear-gradient(160deg,#2c3e3a,#1e2d2a)', padding: '80px 48px 60px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(138,163,158,.7)', marginBottom: 12 }}>Industry Intelligence</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>{ind.name}</h1>
          <div style={{ fontFamily: 'Georgia,serif', fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,.7)', fontStyle: 'italic', maxWidth: 640, marginBottom: 24 }}>{ind.headline}</div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div><div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 28, fontWeight: 700, color: '#8aa39e' }}>{ind.issues.length}</div><div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>Exposure Categories</div></div>
            <div><div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 28, fontWeight: 700, color: '#8aa39e' }}>{ind.authorities.length}</div><div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>Governing Authorities</div></div>
            <div><div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 28, fontWeight: 700, color: '#8aa39e' }}>{ind.defenseStrategies.length}</div><div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>Defense Strategies</div></div>
          </div>
          {ind.wageOrder && <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: 'rgba(255,255,255,.35)', marginTop: 20 }}>Applicable: {ind.wageOrder}</div>}
        </div>
      </div>

      <article style={{ maxWidth: 780, margin: '0 auto', padding: '60px 48px 120px' }}>
        <section style={{ marginBottom: 60 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 16 }}>Structural Vulnerability</div>
          <div style={{ fontSize: 17, lineHeight: 2, color: '#444' }}>
            {ind.structuralVulnerability.split('\n').filter(function(p) { return p.trim(); }).map(function(p, i) { return <p key={i} style={{ marginBottom: 24 }}>{p}</p>; })}
          </div>
        </section>

        <section style={{ marginBottom: 60 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 24 }}>Exposure Categories</div>
          {ind.exposureCategories.map(function(cat, i) {
            return (
              <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < ind.exposureCategories.length - 1 ? '1px solid #eee' : 'none' }}>
                <div style={{ fontSize: 19, fontWeight: 700, color: '#1a1a1a', marginBottom: 4, lineHeight: 1.3 }}>{cat.name}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#999', marginBottom: 16, fontStyle: 'italic' }}>{cat.statute}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, lineHeight: 2, color: '#555', marginBottom: 16 }}>{cat.analysis}</div>
                <div style={{ padding: '16px 20px', background: '#f0fff0', border: '1px solid #c0e0c0' }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#198754', marginBottom: 8 }}>Defense Strategy</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, lineHeight: 1.9, color: '#555' }}>{cat.defenseStrategy}</div>
                </div>
              </div>
            );
          })}
        </section>

        <section style={{ marginBottom: 60 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 16 }}>Full Exposure Profile</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {ind.issues.map(function(issue, i) {
              return <div key={i} style={{ padding: '12px 16px', background: '#fafafa', border: '1px solid #eee', fontFamily: "'Outfit',sans-serif", fontSize: 12, color: '#555', lineHeight: 1.6 }}>{issue}</div>;
            })}
          </div>
        </section>

        <section style={{ marginBottom: 60 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 16 }}>Governing Authorities</div>
          {ind.authorities.map(function(auth, i) {
            return <div key={i} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: '#555', lineHeight: 1.8, padding: '8px 0', borderBottom: i < ind.authorities.length - 1 ? '1px solid #f0f0f0' : 'none' }}>{auth}</div>;
          })}
        </section>

        <section style={{ marginBottom: 60, padding: '28px 28px', background: '#f8faf9', border: '1px solid #e0e8e6' }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: '#198754', marginBottom: 20 }}>Defense Strategies</div>
          {ind.defenseStrategies.map(function(strategy, i) {
            return (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: i < ind.defenseStrategies.length - 1 ? 16 : 0 }}>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 18, fontWeight: 700, color: '#2c3e3a', opacity: 0.25, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, lineHeight: 2, color: '#555' }}>{strategy}</div>
              </div>
            );
          })}
        </section>

        {ind.monitoring && ind.monitoring.length > 0 && (
          <section style={{ marginBottom: 60 }}>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#2c3e3a,#4a7a6f)' }} />
              <div style={{ padding: '24px 24px', border: '1px solid #e0e0e0', borderTop: 'none' }}>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 16 }}>Currently Monitoring</div>
                {ind.monitoring.map(function(item, i) {
                  return (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0', borderBottom: i < ind.monitoring.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2c3e3a', marginTop: 6, flexShrink: 0 }} />
                      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: '#666', lineHeight: 1.7 }}>{item}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 16 }}>Related on This Site</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ind.relatedInsights && ind.relatedInsights.map(function(slug, i) {
              return <Link key={'i' + i} href={'/insights/' + slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#2c3e3a', textDecoration: 'none', padding: '8px 14px', border: '1px solid #2c3e3a' }}>Publication →</Link>;
            })}
            {ind.relatedTools && ind.relatedTools.map(function(slug, i) {
              return <Link key={'t' + i} href={'/tools/' + slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#2c3e3a', textDecoration: 'none', padding: '8px 14px', border: '1px solid #e0e0e0' }}>Interactive Tool →</Link>;
            })}
            <Link href="/industries" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#999', textDecoration: 'none', padding: '8px 14px', border: '1px solid #eee' }}>All Industries →</Link>
          </div>
        </section>

        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: '#bbb', fontStyle: 'italic', marginTop: 60, paddingTop: 24, borderTop: '1px solid #eee' }}>
          This industry analysis is for informational purposes only and does not constitute legal advice.
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, paddingTop: 24, borderTop: '1px solid #eee' }}>
          {ind.index > 0 ? (
            <Link href={'/industries/' + industries[ind.index - 1].slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#2c3e3a', textDecoration: 'none' }}>← {industries[ind.index - 1].name}</Link>
          ) : <span />}
          {ind.index < industries.length - 1 ? (
            <Link href={'/industries/' + industries[ind.index + 1].slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#2c3e3a', textDecoration: 'none' }}>{industries[ind.index + 1].name} →</Link>
          ) : <span />}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
