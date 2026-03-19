import Link from 'next/link';
import { industries, crossIndustryPatterns, universalFrameworks } from '@/data/industries';
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
            Every industry has a structural vulnerability that generic defense
            strategies miss. Six sector profiles mapping the specific violation
            categories, governing authorities, cross-industry patterns, and defense
            methodologies — built from actual PAGA defense work across California's
            highest-exposure industries.
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
            Six vulnerability patterns cut across multiple industries —
            the same statutory framework, the same structural exposure, the same
            defense methodology adapted to different operational contexts. These
            patterns are where industry-specific knowledge compounds.
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
            Four analytical frameworks apply to every industry profile.
            These are the structural tools of PAGA defense — the methodologies
            that convert raw exposure data into actionable defense strategy
            regardless of sector.
          </p>
        </div>

        <div className="frameworks-grid">
          {universalFrameworks.map(function (fw, i) {
            return (
              <div key={fw.id} className="framework-card">
                <div className="framework-num">{i + 1}</div>
                <div className="framework-content">
                  <div className="framework-name">{fw.name}</div>
                  {fw.subtitle && <div className="framework-subtitle">{fw.subtitle}</div>}
                  <p className="framework-desc">{fw.description}</p>
                  <div className="framework-applies">
                    <span className="framework-applies-label">Applies to</span>
                    {fw.applicability}
                  </div>
                  <div className="framework-insight">
                    <span className="framework-insight-label">Key Insight</span>
                    {fw.keyInsight}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Essay + Primer ──────────────────────────────────── */}
        <div className="ind-section-divider" />
        <div className="page-essay">
          <h3 className="page-essay-title">Why Industry-Specific Analysis</h3>
          <div className="page-essay-cols">
            <p>
              These six industries represent structurally distinct PAGA and class
              action exposure profiles driven by differences in applicable wage
              orders, exemption frameworks, compensation structures, and
              operational patterns. A hospitality employer operating under Wage
              Order 5 with tipped employees and 24/7 scheduling faces a
              fundamentally different compliance landscape than an automotive
              dealership operating under Wage Order 7 with commissioned
              salespeople — and both differ from a healthcare staffing firm
              navigating joint employer liability across 14 client facilities.
            </p>
            <p>
              Generic defense strategies that apply the same analytical framework
              across industries miss the structural vulnerabilities unique to
              each sector — the AWS election exposure in solar, the commission
              forfeiture pattern in automotive, the multi-worksite manageability
              challenge in staffing, the piece-rate legacy compliance gap in
              agriculture. The cross-industry patterns identified above reveal
              where these sector-specific vulnerabilities share common statutory
              roots — and where defense strategies developed in one industry
              can be adapted to another.
            </p>
          </div>
        </div>

        <div className="page-primer" style={{ marginTop: 20 }}>
          <div className="page-primer-label">How to Use These Profiles</div>
          <p className="page-primer-text">
            Each industry profile follows the same analytical structure: structural
            vulnerability analysis identifying why the industry is exposed, followed
            by detailed exposure categories mapping each violation type to its
            governing statute and defense strategy, then the governing authorities
            and precedential framework, and finally the defense strategies specific
            to that sector. Start with the structural vulnerability to understand
            the industry's exposure architecture, then use the exposure categories
            to map the specific claims at issue. Apply the universal defense
            frameworks — temporal bifurcation, penalty cap qualification,
            manageability, and three-scenario modeling — to build the defense
            strategy. The cross-industry patterns reveal where analysis from one
            sector informs defense in another.
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
