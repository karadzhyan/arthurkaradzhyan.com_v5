import Link from 'next/link';
import { frameworks } from '@/data/frameworks';
import { industries } from '@/data/industries';
import { insights } from '@/data/insights';
import { tools } from '@/data/tools';
import { caseLaw } from '@/data/caseLaw';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export var metadata = {
  title: 'Defense Frameworks — Universal PAGA Analytical Methodology | Arthur Karadzhyan',
  description: 'Four universal defense frameworks that apply to every PAGA matter regardless of industry: temporal bifurcation, penalty cap qualification, manageability, and three-scenario exposure modeling.',
  openGraph: {
    title: 'Defense Frameworks | Arthur Karadzhyan',
    description: 'Universal analytical methodology for PAGA defense — temporal bifurcation, penalty cap qualification, manageability under § 2699(p), and three-scenario exposure modeling.',
    type: 'website',
  },
};

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

export default function FrameworksIndex() {
  return (
    <div className="page-wrap">
      <SiteNav current="Frameworks" />

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="page-header page-header-dark">
        <div className="page-header-inner">
          <div className="page-label-dark">Universal Methodology</div>
          <h1 className="page-title-dark">Defense Frameworks</h1>
          <p className="page-desc-dark">
            Every PAGA matter — regardless of industry — requires four analytical
            frameworks to convert raw exposure data into defense strategy. These
            frameworks are the intellectual infrastructure of the practice: the
            insights apply them to specific legal questions, the tools implement
            them computationally, and the industry profiles adapt them to
            sector-specific exposure architectures.
          </p>
          <div className="industry-stats-row">
            <div className="industry-stat-item">
              <div className="industry-stat-num">{frameworks.length}</div>
              <div className="industry-stat-label">Frameworks</div>
            </div>
            <div className="industry-stat-item">
              <div className="industry-stat-num">{industries.length}</div>
              <div className="industry-stat-label">Industries Served</div>
            </div>
            <div className="industry-stat-item">
              <div className="industry-stat-num">{tools.length}</div>
              <div className="industry-stat-label">Tools Implementing</div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">

        {/* ── Framework Cards ──────────────────────────────────── */}
        <div className="frameworks-grid">
          {frameworks.map(function(fw, i) {
            return (
              <Link
                key={fw.id}
                href={'/frameworks/' + fw.slug}
                className="framework-card"
                style={{ cursor: 'pointer', textDecoration: 'none' }}
              >
                <div className="framework-num">{i + 1}</div>
                <div className="framework-content">
                  <div className="framework-name">{fw.name}</div>
                  {fw.subtitle && <div className="framework-subtitle">{fw.subtitle}</div>}
                  <p className="framework-desc">{fw.headline}</p>
                  <div className="framework-applies">
                    <span className="framework-applies-label">Applies to</span>
                    {fw.applicability.length > 160
                      ? fw.applicability.slice(0, 160) + '...'
                      : fw.applicability}
                  </div>
                  <div className="framework-insight">
                    <span className="framework-insight-label">Key Insight</span>
                    {fw.keyInsight}
                  </div>
                  <div style={{ marginTop: 16, fontFamily: 'Outfit, sans-serif', fontSize: 13, letterSpacing: '0.03em', color: '#4a7c6f' }}>
                    Read Framework →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── How They Connect ──────────────────────────────────── */}
        <div className="ind-section-divider" />
        <div className="page-essay">
          <h3 className="page-essay-title">How These Frameworks Connect</h3>
          <div className="page-essay-cols">
            <p>
              The four frameworks are not independent — they operate as a
              unified analytical system. Temporal bifurcation identifies the
              employer's compliance trajectory. The penalty cap qualification
              captures the documentation supporting that trajectory. The
              manageability analysis determines which claims can be
              representatively tried and which must be narrowed. And the
              three-scenario model integrates all three into a quantitative
              settlement framework that structures every negotiation, carrier
              reserve recommendation, and mediation position.
            </p>
            <p>
              Each framework is implemented by one or more interactive tools
              on this site, discussed in depth in one or more publications, and
              adapted to sector-specific exposure architectures in the industry
              profiles. The links on each framework page show every piece of
              content on this site that applies, implements, or demonstrates
              the framework.
            </p>
          </div>
        </div>

        <div className="page-primer" style={{ marginTop: 20 }}>
          <div className="page-primer-label">Start Here</div>
          <p className="page-primer-text">
            If you are new to this analytical methodology, start with Temporal
            Bifurcation — it is the foundational framework from which the others
            derive. The Two Hotels insight describes the framework's origin in a
            specific hospitality defense matter, and the PAGA Penalty Estimator
            tool implements the bifurcation computationally.
          </p>
          <Link href="/frameworks/temporal-bifurcation" className="page-primer-link">
            Start with Temporal Bifurcation →
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
