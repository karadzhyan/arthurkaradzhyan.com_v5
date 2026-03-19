import Link from 'next/link';
import { industries, getIndustryBySlug, getAllIndustrySlugs } from '@/data/industries';
import { insights } from '@/data/insights';
import { tools } from '@/data/tools';
import { caseLaw } from '@/data/caseLaw';
import { matters } from '@/data/matters';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import IndustryExposureProfile from '@/components/industries/IndustryExposureProfile';

import DefenseStrategyFlow from '@/components/industries/DefenseStrategyFlow';
import HospitalityShiftExposure from '@/components/industries/HospitalityShiftExposure';
import DonohueCascade from '@/components/industries/DonohueCascade';
import ServiceChargeFlow from '@/components/industries/ServiceChargeFlow';
import SciborskiTimeline from '@/components/industries/SciborskiTimeline';
import AutoCompensationMap from '@/components/industries/AutoCompensationMap';
import JointEmployerMatrix from '@/components/industries/JointEmployerMatrix';
import WorksiteVariation from '@/components/industries/WorksiteVariation';
import AWSElectionProcess from '@/components/industries/AWSElectionProcess';
import TravelTimeAnalysis from '@/components/industries/TravelTimeAnalysis';
import TechExemptionAnalysis from '@/components/industries/TechExemptionAnalysis';
import RemoteWorkExposure from '@/components/industries/RemoteWorkExposure';
import PieceRateBreakdown from '@/components/industries/PieceRateBreakdown';
import SeasonalWorkforceTimeline from '@/components/industries/SeasonalWorkforceTimeline';

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
        <div className="not-found">
          <h1>Industry Not Found</h1>
          <Link href="/industries">Back to all industries</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.arthurkaradzhyan.com' },
        { name: 'Industries', url: 'https://www.arthurkaradzhyan.com/industries' },
        { name: ind.name, url: 'https://www.arthurkaradzhyan.com/industries/' + params.slug }
      ]} />
      <SiteNav current="Industries" />

      <div className="article-industry-header">
        <div className="article-industry-header-inner">
          <div className="page-label-dark">Industry Intelligence</div>
          <h1 className="page-title-dark" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700 }}>{ind.name}</h1>
          <div className="page-desc-dark" style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', maxWidth: 640, marginBottom: 24 }}>{ind.headline}</div>
          <div className="article-industry-stats">
            <div>
              <div className="article-industry-stat-num">{ind.issues.length}</div>
              <div className="article-industry-stat-label">Exposure Categories</div>
            </div>
            <div>
              <div className="article-industry-stat-num">{ind.authorities.length}</div>
              <div className="article-industry-stat-label">Governing Authorities</div>
            </div>
            <div>
              <div className="article-industry-stat-num">{ind.defenseStrategies.length}</div>
              <div className="article-industry-stat-label">Defense Strategies</div>
            </div>
          </div>
          {ind.wageOrder && <div className="article-industry-wage">Applicable: {ind.wageOrder}</div>}
        </div>
      </div>

      <article className="article-wrap wide">

        {/* EXPOSURE PROFILE VISUALIZATION */}
        <section style={{ marginBottom: 48 }}>
          <IndustryExposureProfile industry={ind} />
        </section>

        {/* STRUCTURAL VULNERABILITY */}
        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Structural Vulnerability</div>
          <div className="article-body">
            {ind.structuralVulnerability.split('\n').filter(function(p) { return p.trim(); }).map(function(p, i) { return <p key={i}>{p}</p>; })}
          </div>
        </section>

        {/* HOSPITALITY-SPECIFIC VISUALIZATIONS */}
        {params.slug === 'hospitality' && (
          <>
            <section style={{ marginBottom: 48 }}>
              <div className="article-section-label lg">24/7 Shift Exposure Analysis</div>
              <HospitalityShiftExposure />
            </section>

            <section style={{ marginBottom: 48 }}>
              <div className="article-section-label lg">The Donohue Derivative Cascade</div>
              <DonohueCascade />
            </section>

            <section style={{ marginBottom: 48 }}>
              <div className="article-section-label lg">Service Charge vs. Gratuity Classification</div>
              <ServiceChargeFlow />
            </section>
          </>
        )}

        {/* AGRICULTURE-SPECIFIC VISUALIZATIONS */}
        {params.slug === 'agriculture' && (
          <>
            <section style={{ marginBottom: 48 }}>
              <div className="article-section-label lg">§ 226.2 Piece-Rate Calculation</div>
              <PieceRateBreakdown />
            </section>

            <section style={{ marginBottom: 48 }}>
              <div className="article-section-label lg">Seasonal Workforce Lifecycle</div>
              <SeasonalWorkforceTimeline />
            </section>
          </>
        )}

        {/* TECHNOLOGY-SPECIFIC VISUALIZATIONS */}
        {params.slug === 'technology-startups' && (
          <>
            <section style={{ marginBottom: 48 }}>
              <div className="article-section-label lg">§ 515.5 Exemption — Duties Analysis</div>
              <TechExemptionAnalysis />
            </section>

            <section style={{ marginBottom: 48 }}>
              <div className="article-section-label lg">§ 2802 Remote Work Reimbursement</div>
              <RemoteWorkExposure />
            </section>
          </>
        )}

        {/* SOLAR-SPECIFIC VISUALIZATIONS */}
        {params.slug === 'solar-energy' && (
          <>
            <section style={{ marginBottom: 48 }}>
              <div className="article-section-label lg">AWS Election Compliance Audit</div>
              <AWSElectionProcess />
            </section>

            <section style={{ marginBottom: 48 }}>
              <div className="article-section-label lg">Travel Time — Yard to Site</div>
              <TravelTimeAnalysis />
            </section>
          </>
        )}

        {/* HEALTHCARE-SPECIFIC VISUALIZATIONS */}
        {params.slug === 'healthcare-staffing' && (
          <>
            <section style={{ marginBottom: 48 }}>
              <div className="article-section-label lg">Joint Employer Liability Allocation</div>
              <JointEmployerMatrix />
            </section>

            <section style={{ marginBottom: 48 }}>
              <div className="article-section-label lg">Multi-Worksite Compliance Variation</div>
              <WorksiteVariation />
            </section>
          </>
        )}

        {/* AUTOMOTIVE-SPECIFIC VISUALIZATIONS */}
        {params.slug === 'automotive-dealerships' && (
          <>
            <section style={{ marginBottom: 48 }}>
              <div className="article-section-label lg">Sciborski Forfeiture Analysis</div>
              <SciborskiTimeline />
            </section>

            <section style={{ marginBottom: 48 }}>
              <div className="article-section-label lg">Compensation Structure & Regular Rate</div>
              <AutoCompensationMap />
            </section>
          </>
        )}

        {/* EXPOSURE CATEGORIES DETAIL */}
        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Exposure Categories — Analysis & Defense</div>
          {ind.exposureCategories.map(function(cat, i) {
            var colors = ["#dc3545", "#CC8800", "#b85c00", "#4a7a6f", "#2c3e3a", "#8aa39e"];
            return (
              <div key={i} className="article-exposure-cat" style={{ borderBottom: i < ind.exposureCategories.length - 1 ? undefined : 'none' }}>
                <div className="article-exposure-cat-num" style={{ color: colors[i % colors.length] }}>{String(i + 1).padStart(2, '0')}</div>
                <div className="article-exposure-name">{cat.name}</div>
                <div className="article-exposure-statute">{cat.statute}</div>
                <div className="article-exposure-analysis">{cat.analysis}</div>
                <div className="article-exposure-defense">
                  <div className="article-section-label green">Defense Strategy</div>
                  <div className="article-exposure-defense-text">{cat.defenseStrategy}</div>
                </div>
              </div>
            );
          })}
        </section>

        {/* FULL EXPOSURE PROFILE */}
        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Full Exposure Profile</div>
          <div className="article-issues-grid">
            {ind.issues.map(function(issue, i) {
              return <div key={i} className="article-issue-item">{issue}</div>;
            })}
          </div>
        </section>

        {/* GOVERNING AUTHORITIES */}
        <section style={{ marginBottom: 60 }}>
          <div className="article-section-label lg">Governing Authorities</div>
          {ind.authorities.map(function(auth, i) {
            var shortName = auth.split(' v. ')[0];
            if (!shortName || shortName === auth) shortName = auth.split('(')[0].trim();
            var caseMatch = caseLaw.find(function(c) {
              return c.case && c.case.toLowerCase().indexOf(shortName.toLowerCase()) !== -1;
            });
            if (caseMatch) {
              return (
                <Link key={i} href={'/cases/' + caseMatch.slug} className="article-authority article-authority-linked">
                  <span className="article-authority-text">{auth}</span>
                  <span className="article-authority-arrow">→</span>
                </Link>
              );
            }
            return <div key={i} className="article-authority">{auth}</div>;
          })}
        </section>

        {/* DEFENSE STRATEGY FLOW */}
        <section style={{ marginBottom: 60 }}>
          <DefenseStrategyFlow strategies={ind.defenseStrategies} industryName={ind.name} />
        </section>

        {/* MONITORING */}
        {ind.monitoring && ind.monitoring.length > 0 && (
          <div className="article-monitoring">
            <div className="article-monitoring-bar" />
            <div className="article-monitoring-inner">
              <div className="article-section-label lg">Currently Monitoring</div>
              {ind.monitoring.map(function(item, i) {
                return (
                  <div key={i} className="article-monitoring-item">
                    <div className="article-monitoring-dot" />
                    <div className="article-monitoring-text">{item}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* RELATED */}
        <section style={{ marginBottom: 40, marginTop: 40 }}>
          <div className="article-section-label lg">Related on This Site</div>
          <div className="article-related-grid">
            {ind.relatedMatters && ind.relatedMatters.length > 0 && ind.relatedMatters.map(function(matterName, i) {
              var match = matters.find(function(m) { return m.title === matterName; });
              if (!match) return null;
              return (
                <Link key={'m' + i} href={'/matters/' + match.slug} className="article-related-card article-related-card-matter">
                  <div className="article-related-type">Matter Experience</div>
                  <div className="article-related-title">{match.title}</div>
                  <div className="article-related-desc">{match.short}</div>
                  {match.result && <div className="article-related-result">{match.result}</div>}
                </Link>
              );
            })}
            {ind.relatedInsights && ind.relatedInsights.map(function(insightSlug, i) {
              var match = insights.find(function(ins) { return ins.slug === insightSlug; });
              return (
                <Link key={'i' + i} href={'/insights/' + insightSlug} className="article-related-card">
                  <div className="article-related-type">Publication</div>
                  <div className="article-related-title">{match ? match.title : insightSlug}</div>
                  {match && match.desc && <div className="article-related-desc">{match.desc.length > 120 ? match.desc.slice(0, 120) + '...' : match.desc}</div>}
                </Link>
              );
            })}
            {ind.relatedTools && ind.relatedTools.map(function(toolSlug, i) {
              var match = tools.find(function(t) { return t.slug === toolSlug; });
              return (
                <Link key={'t' + i} href={'/tools/' + toolSlug} className="article-related-card article-related-card-tool">
                  <div className="article-related-type">Interactive Tool</div>
                  <div className="article-related-title">{match ? match.name : toolSlug}</div>
                  {match && match.sub && <div className="article-related-desc">{match.sub}</div>}
                </Link>
              );
            })}
          </div>
          <div style={{ marginTop: 12 }}>
            <Link href="/industries" className="article-related-link muted">← All Industries</Link>
          </div>
        </section>

        <div className="article-disclaimer">
          This industry analysis is for informational purposes only and does not constitute legal advice.
        </div>

        <div className="article-nav">
          {ind.index > 0 ? (
            <Link href={'/industries/' + industries[ind.index - 1].slug} className="article-nav-link">← {industries[ind.index - 1].name}</Link>
          ) : <span />}
          {ind.index < industries.length - 1 ? (
            <Link href={'/industries/' + industries[ind.index + 1].slug} className="article-nav-link">{industries[ind.index + 1].name} →</Link>
          ) : <span />}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
