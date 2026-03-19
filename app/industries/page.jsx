import Link from 'next/link';
import { industries, crossIndustryPatterns } from '@/data/industries';
import { frameworks } from '@/data/frameworks';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export var metadata = {
  title: 'Industry Intelligence — PAGA Defense by Sector | Arthur Karadzhyan',
  description: 'Six industry-specific PAGA and wage-and-hour defense profiles with cross-industry pattern analysis. Hospitality, Automotive, Healthcare Staffing, Solar, Technology, and Agriculture.',
  openGraph: {
    title: 'Industry Intelligence | Arthur Karadzhyan',
    description: 'Industry-specific PAGA defense analysis for six California sectors, with cross-industry patterns and universal defense frameworks.',
    type: 'website',
  },
};

function computeStats() {
  var totalExposure = 0;
  var totalAuthorities = 0;
  var totalStrategies = 0;
  industries.forEach(function (ind) {
    totalExposure += ind.issues.length;
    totalAuthorities += ind.authorities.length;
    totalStrategies += ind.defenseStrategies.length;
  });
  return [
    [String(industries.length), 'Industries'],
    [String(totalExposure), 'Exposure Categories'],
    [String(totalAuthorities), 'Authorities'],
    [String(totalStrategies), 'Defense Strategies'],
    [String(crossIndustryPatterns.length), 'Cross-Sector Patterns'],
  ];
}

function getPatternCountForIndustry(slug) {
  return crossIndustryPatterns.filter(function (p) {
    return p.industries.indexOf(slug) !== -1;
  }).length;
}

function getIndustryName(slug) {
  var ind = industries.find(function (i) { return i.slug === slug; });
  return ind ? ind.name : slug;
}

export default function IndustriesIndex() {
  var stats = computeStats();

  return (
    <div className="page-wrap">
      <SiteNav current="Industries" />

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="page-header page-header-dark">
        <div className="page-header-inner">
          <div className="page-label-dark">Sector Analysis</div>
          <h1 className="page-title-dark">Industry Intelligence</h1>
          <p className="page-desc-dark">
            Generic defense strategies fail because each industry's exposure
            architecture is structurally distinct. A hospitality employer's
            Donohue problem is not an automotive dealership's Sciborski problem
            is not a staffing firm's joint employer problem. These six profiles
            map the specific violation categories, governing authorities, and
            defense methodologies for each sector — and identify the cross-industry
            patterns where defense strategies developed in one sector transfer
            to another.
          </p>
          <div className="industry-stats-row">
            {stats.map(function (pair, i) {
              return (
                <div key={i} className="industry-stat-item">
                  <div className="industry-stat-num">{pair[0]}</div>
                  <div className="industry-stat-label">{pair[1]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="page-body">

        {/* ── Industry Cards ──────────────────────────────────── */}
        <div className="industries-index-grid">
          {industries.map(function (ind) {
            var patternCount = getPatternCountForIndustry(ind.slug);
            return (
              <Link
                key={ind.slug}
                href={'/industries/' + ind.slug}
                className="industry-index-card"
              >
                <div className="industry-index-top-row">
                  <div className="industry-index-count">
                    {ind.issues.length} Exposure Categories
                  </div>
                  {patternCount > 0 && (
                    <div className="industry-index-patterns">
                      {patternCount} Cross-Sector {patternCount === 1 ? 'Pattern' : 'Patterns'}
                    </div>
                  )}
                </div>
                <h2 className="industry-index-name">{ind.name}</h2>
                <p className="industry-index-headline">
                  {ind.headline.length > 140
                    ? ind.headline.slice(0, 140) + '...'
                    : ind.headline}
                </p>
                {ind.keyStatistic && (
                  <div className="industry-index-stat">
                    <span className="industry-index-stat-value">{ind.keyStatistic.value}</span>
                    <span className="industry-index-stat-label">{ind.keyStatistic.label}</span>
                  </div>
                )}
                <div className="industry-index-issues">
                  {ind.issues.slice(0, 3).join(' · ')}
                </div>
                <div className="industry-index-bottom">
                  <div className="industry-index-metric">{ind.metric}</div>
                  <div className="industry-index-wage">{ind.wageOrder.split('(')[0].trim()}</div>
                </div>
                <div className="industry-index-cta">Read Profile →</div>
              </Link>
            );
          })}
        </div>

        {/* ── Cross-Industry Patterns ─────────────────────────── */}
        <div className="ind-section-divider" />
        <div className="ind-section-header">
          <div className="ind-section-label">Cross-Sector Analysis</div>
          <h2 className="ind-section-title">Patterns Across Industries</h2>
          <p className="ind-section-desc">
            Defense strategies proven in one industry can be adapted to defend
            in another — when both share the same underlying statutory exposure.
            Six patterns cut across multiple sectors: meal/rest period
            structural barriers, piece-rate calculation failures, joint employer
            allocation gaps, regular rate complexity, travel time compensability,
            and manageability limitations. Each pattern below identifies the
            shared vulnerability, the affected industries, and the defense angle.
          </p>
        </div>

        <div className="cross-patterns-grid">
          {crossIndustryPatterns.map(function (pattern) {
            return (
              <div key={pattern.id} className="cross-pattern-card">
                <div className="cross-pattern-name">{pattern.name}</div>
                <p className="cross-pattern-summary">{pattern.summary}</p>
                <div className="cross-pattern-industries">
                  {pattern.industries.map(function (slug) {
                    return (
                      <Link
                        key={slug}
                        href={'/industries/' + slug}
                        className="cross-pattern-pill"
                      >
                        {getIndustryName(slug)}
                      </Link>
                    );
                  })}
                </div>
                <div className="cross-pattern-authority">
                  <span className="cross-pattern-authority-label">Key Authority</span>
                  {pattern.keyAuthority}
                </div>
                <div className="cross-pattern-defense">
                  <span className="cross-pattern-defense-label">Defense Angle</span>
                  {pattern.defenseAngle}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Universal Defense Frameworks ─────────────────────── */}
        <div className="ind-section-divider" />
        <div className="ind-section-header">
          <div className="ind-section-label">Universal Methodology</div>
          <h2 className="ind-section-title">Defense Frameworks Across All Industries</h2>
          <p className="ind-section-desc">
            Every PAGA matter — regardless of industry — requires four analytical
            frameworks to convert raw exposure data into defense strategy:
            temporal bifurcation to disaggregate violation rates, penalty cap
            qualification to limit exposure, manageability to challenge
            representative treatment, and three-scenario modeling to structure
            settlement positioning.
          </p>
        </div>

        <div className="frameworks-grid">
          {frameworks.map(function (fw, i) {
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

        {/* ── Essay + Primer ──────────────────────────────────── */}
        <div className="ind-section-divider" />
        <div className="page-essay">
          <h3 className="page-essay-title">Why Industry-Specific Analysis</h3>
          <div className="page-essay-cols">
            <p>
              Applying the same defense framework across industries misses
              sector-specific vulnerabilities that drive the largest exposure
              concentrations — the AWS election invalidity that creates
              retroactive overtime in solar, the commission forfeiture pattern
              that generates industry-wide claims in automotive, the
              multi-worksite manageability challenge that complicates
              representative treatment in staffing, the piece-rate legacy gap
              that compounds underpayment across years in agriculture. Each of
              these vulnerabilities arises from the intersection of a specific
              wage order, compensation structure, and operational model that
              generic analysis cannot capture.
            </p>
            <p>
              But the analysis cannot stop at individual sectors. The
              cross-industry patterns reveal where sector-specific
              vulnerabilities share common statutory roots — where a defense
              framework developed for hospitality meal period exposure can be
              adapted to defend a healthcare staffing firm facing the same
              Donohue presumption at client facilities. The value of
              industry-specific knowledge compounds when it operates across
              sectors.
            </p>
          </div>
        </div>

        <div className="page-primer" style={{ marginTop: 20 }}>
          <div className="page-primer-label">How to Use These Profiles</div>
          <p className="page-primer-text">
            Each profile gives you a complete defense architecture in four steps.
            First, the structural vulnerability identifies why the industry is
            exposed — the single operational or regulatory characteristic that
            drives the sector's highest-concentration risk. Second, the exposure
            categories map each violation type to its governing statute, the
            specific analytical challenge it presents, and the defense strategy
            that addresses it. Third, the governing authorities and defense
            strategies provide the legal and tactical framework. Fourth, the
            cross-industry patterns connect the sector's vulnerabilities to
            parallel exposures in other industries — revealing where defense
            strategies can be adapted across sectors.
          </p>
          <Link href="/industries/hospitality" className="page-primer-link">
            Start with Hospitality →
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
