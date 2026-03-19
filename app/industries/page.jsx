import Link from 'next/link';
import { industries } from '@/data/industries';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import IndustryHeatmap from '@/components/IndustryHeatmap';
import CrossIndustryPatterns from '@/components/industries/CrossIndustryPatterns';
import WageOrderMap from '@/components/industries/WageOrderMap';
import SharedAuthorities from '@/components/industries/SharedAuthorities';
import IndustryComparison from '@/components/industries/IndustryComparison';

export var metadata = {
  title: 'Industry Intelligence — PAGA Defense by Sector | Arthur Karadzhyan',
  description: 'Six industry-specific PAGA and wage-and-hour defense profiles. Hospitality, Automotive, Healthcare Staffing, Solar, Technology, and Agriculture.',
  openGraph: {
    title: 'Industry Intelligence | Arthur Karadzhyan',
    description: 'Industry-specific PAGA defense analysis for six California sectors.',
    type: 'website',
  },
};

export default function IndustriesIndex() {
  var totalExposureCats = industries.reduce(function (s, ind) { return s + ind.issues.length; }, 0);
  var totalAuthorities = industries.reduce(function (s, ind) { return s + ind.authorities.length; }, 0);
  var totalStrategies = industries.reduce(function (s, ind) { return s + ind.defenseStrategies.length; }, 0);
  var totalMonitoring = industries.reduce(function (s, ind) { return s + (ind.monitoring ? ind.monitoring.length : 0); }, 0);

  return (
    <div className="page-wrap">
      <SiteNav current="Industries" />

      <div className="page-header page-header-dark">
        <div className="page-header-inner">
          <div className="page-label-dark">Sector Analysis</div>
          <h1 className="page-title-dark">Industry Intelligence</h1>
          <p className="page-desc-dark">
            Every industry has a structural vulnerability that generic defense
            strategies miss. Six profiles mapping the specific violation
            categories, governing authorities, and defense methodologies for
            each sector.
          </p>
          <div className="industry-stats-row">
            {[
              [String(industries.length), 'Industries Profiled'],
              [String(totalExposureCats), 'Exposure Categories'],
              [String(totalAuthorities), 'Governing Authorities'],
              [String(totalStrategies), 'Defense Strategies'],
              [String(totalMonitoring), 'Items Monitoring']
            ].map(function (pair, i) {
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

        {/* INDUSTRY RISK COMPARISON */}
        <section className="ind-page-section">
          <div className="ind-page-section-header">
            <div className="ind-page-section-label">Comparative Risk Assessment</div>
            <div className="ind-page-section-line" />
          </div>
          <p className="ind-page-section-desc">
            Aggregate risk scores across 7 violation categories, ranked by total
            exposure intensity. Score methodology: each violation category rated
            1–5 per industry, summed to a composite score out of 35.
          </p>
          <IndustryComparison />
        </section>

        {/* EXPOSURE HEATMAP */}
        <section className="ind-page-section">
          <div className="ind-page-section-header">
            <div className="ind-page-section-label">Exposure Heatmap</div>
            <div className="ind-page-section-line" />
          </div>
          <p className="ind-page-section-desc">
            Color-coded intensity matrix: 6 industries × 7 violation categories.
            Read down a column to see which industries share a vulnerability.
            Read across a row to see the full exposure profile.
          </p>
          <IndustryHeatmap />
        </section>

        {/* CROSS-INDUSTRY PATTERNS */}
        <section className="ind-page-section">
          <div className="ind-page-section-header">
            <div className="ind-page-section-label">Universal Patterns vs. Industry-Specific Drivers</div>
            <div className="ind-page-section-line" />
          </div>
          <p className="ind-page-section-desc">
            Four violation types appear in every industry with similar analytical
            frameworks. Six others are structurally unique to a single sector.
            The universal patterns have universal defenses. The industry-specific
            drivers require specialized knowledge.
          </p>
          <CrossIndustryPatterns />
        </section>

        {/* WAGE ORDER MAP */}
        <section className="ind-page-section">
          <div className="ind-page-section-header">
            <div className="ind-page-section-label">Wage Order Framework</div>
            <div className="ind-page-section-line" />
          </div>
          <p className="ind-page-section-desc">
            Five IWC wage orders govern these six industries. Each carries
            distinct exemption rules, meal period options, overtime triggers,
            and compensation requirements that define the industry's
            compliance landscape.
          </p>
          <WageOrderMap />
        </section>

        {/* SHARED AUTHORITIES */}
        <section className="ind-page-section">
          <div className="ind-page-section-header">
            <div className="ind-page-section-label">Governing Authorities by Reach</div>
            <div className="ind-page-section-line" />
          </div>
          <p className="ind-page-section-desc">
            Nine landmark decisions. Six apply universally across all industries.
            Three are sector-specific. The number of industries affected determines
            how broadly each authority shapes defense strategy.
          </p>
          <SharedAuthorities />
        </section>

        {/* INDUSTRY CARDS */}
        <section className="ind-page-section">
          <div className="ind-page-section-header">
            <div className="ind-page-section-label">Individual Industry Profiles</div>
            <div className="ind-page-section-line" />
          </div>
          <div className="industries-index-grid">
            {industries.map(function (ind) {
              return (
                <Link
                  key={ind.slug}
                  href={'/industries/' + ind.slug}
                  className="industry-index-card"
                >
                  <div className="industry-index-count">
                    {ind.issues.length} Exposure Categories · {ind.authorities.length} Authorities
                  </div>
                  <h2 className="industry-index-name">{ind.name}</h2>
                  <p className="industry-index-headline">
                    {ind.headline.length > 130
                      ? ind.headline.slice(0, 130) + '...'
                      : ind.headline}
                  </p>
                  <div className="industry-index-issues">
                    {ind.issues.slice(0, 3).join(' · ')}
                  </div>
                  <div className="industry-index-metric">{ind.metric}</div>
                </Link>
              );
            })}
          </div>
        </section>

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
              salespeople.
            </p>
            <p>
              Generic defense strategies that apply the same analytical framework
              across industries miss the structural vulnerabilities unique to
              each sector — the AWS election exposure in solar, the commission
              forfeiture pattern in automotive, the multi-worksite manageability
              challenge in staffing, the piece-rate legacy compliance gap in
              agriculture.
            </p>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
