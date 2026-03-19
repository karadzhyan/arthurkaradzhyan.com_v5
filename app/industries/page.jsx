import Link from 'next/link';
import { industries } from '@/data/industries';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import CrossIndustryMatrix from '@/components/viz/CrossIndustryMatrix';

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
            {[['6', 'Industries'], ['42', 'Exposure Categories'], ['18', 'Authorities'], ['12', 'Defense Strategies']].map(function (pair, i) {
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
        <CrossIndustryMatrix />
        <div className="industries-index-grid">
          {industries.map(function (ind) {
            return (
              <Link
                key={ind.slug}
                href={'/industries/' + ind.slug}
                className="industry-index-card"
              >
                <div className="industry-index-count">
                  {ind.issues.length} Exposure Categories
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
