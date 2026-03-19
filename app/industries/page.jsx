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

/* Compute aggregate stats from actual data */
var totalIssues = industries.reduce(function (s, ind) { return s + ind.issues.length; }, 0);
var totalAuthorities = industries.reduce(function (s, ind) { return s + ind.authorities.length; }, 0);
var totalStrategies = industries.reduce(function (s, ind) { return s + ind.defenseStrategies.length; }, 0);
var totalExposureCats = industries.reduce(function (s, ind) { return s + ind.exposureCategories.length; }, 0);
var totalWageOrders = new Set(industries.map(function (ind) { return ind.wageOrder; })).size;

/* Universal patterns — violation themes that appear across all or most industries */
var universalPatterns = [
  {
    theme: "Meal & Rest Period Exposure",
    cite: "§§ 226.7, 512",
    insight: "Appears in every industry — from 24/7 hotel operations to field crews at remote solar installations. The Donohue presumption and Brinker framework apply universally, but the operational constraints that generate violations are industry-specific.",
    industriesAffected: 6,
  },
  {
    theme: "Regular Rate Complexity",
    cite: "§ 510; Ferra; Alvarado",
    insight: "Commission plans, piece-rate structures, RSU vesting, flat-rate flag hours, spiffs — every industry has a compensation component that payroll systems miscalculate. The per-hour underpayment compounds across every overtime and premium hour.",
    industriesAffected: 6,
  },
  {
    theme: "Derivative Penalty Cascading",
    cite: "Naranjo (2022); § 2699(i)",
    insight: "One underlying violation generates four independent penalty streams — wage premium, PAGA default penalty, wage statement deficiency, and waiting time. Post-reform § 2699(i) limits stacking, but only where scienter is absent.",
    industriesAffected: 6,
  },
  {
    theme: "Statute of Limitations Overstatement",
    cite: "CCP § 340(a)",
    insight: "Plaintiff demands routinely apply 3-year lookbacks to PAGA claims that carry only a 1-year statutory period. The overstatement inflates demand by 67% or more — and most defendants do not catch it.",
    industriesAffected: 6,
  },
];

/* Format currency */
function fmtK(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n / 1000) + "K";
  return "$" + n;
}

export default function IndustriesIndex() {
  /* Sort by risk score descending for the exposure comparison */
  var sortedByExposure = industries.slice().sort(function (a, b) { return (b.annualExposure || 0) - (a.annualExposure || 0); });
  var maxExposure = sortedByExposure[0] ? sortedByExposure[0].annualExposure : 1;

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
              [String(totalWageOrders), 'Wage Orders'],
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

        {/* ─── CROSS-INDUSTRY MATRIX ─── */}
        <CrossIndustryMatrix />

        {/* ─── UNIVERSAL PATTERNS ─── */}
        <div className="ind-universal-section">
          <div className="ind-universal-header">
            <div className="ind-section-label">Cross-Industry Insight</div>
            <h3 className="ind-section-title">Universal Patterns</h3>
            <p className="ind-section-desc">
              Four violation themes appear across every industry we profile.
              The statutory framework is the same — the operational constraints
              that generate violations are what differ by sector.
            </p>
          </div>
          <div className="ind-universal-grid">
            {universalPatterns.map(function (pattern, i) {
              return (
                <div key={i} className="ind-universal-card">
                  <div className="ind-universal-num">{i + 1}</div>
                  <div className="ind-universal-body">
                    <div className="ind-universal-theme">{pattern.theme}</div>
                    <div className="ind-universal-cite">{pattern.cite}</div>
                    <div className="ind-universal-insight">{pattern.insight}</div>
                    <div className="ind-universal-affected">
                      Affects {pattern.industriesAffected} of {industries.length} industries
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── EXPOSURE COMPARISON ─── */}
        <div className="ind-exposure-section">
          <div className="ind-section-label">Comparative</div>
          <h3 className="ind-section-title">Estimated Annual Exposure by Industry</h3>
          <p className="ind-section-desc">
            Illustrative exposure for a 50-employee employer over one PAGA
            statutory year, based on structural violation patterns specific to
            each sector. Actual exposure varies by employer.
          </p>
          <div className="ind-exposure-bars">
            {sortedByExposure.map(function (ind) {
              var pct = Math.round(((ind.annualExposure || 0) / maxExposure) * 100);
              return (
                <Link key={ind.slug} href={'/industries/' + ind.slug} className="ind-exposure-row">
                  <div className="ind-exposure-name">{ind.name}</div>
                  <div className="ind-exposure-track">
                    <div className="ind-exposure-fill" style={{ width: pct + '%' }} />
                  </div>
                  <div className="ind-exposure-amt">{fmtK(ind.annualExposure || 0)}</div>
                </Link>
              );
            })}
          </div>
          <div className="ind-exposure-footnote">
            50 employees · 26 pay periods · Industry-specific violation rates · Default penalties per § 2699(f)(2)
          </div>
        </div>

        {/* ─── INDUSTRY CARDS ─── */}
        <div className="industries-index-grid">
          {industries.map(function (ind) {
            var riskPct = ((ind.riskScore || 5) / 10) * 100;
            return (
              <Link
                key={ind.slug}
                href={'/industries/' + ind.slug}
                className="industry-index-card"
              >
                <div className="ind-card-top">
                  <div className="industry-index-count">
                    {ind.exposureCategories.length} Detailed Categories · {ind.issues.length} Exposure Areas
                  </div>
                  <div className="ind-card-wage-order">{ind.wageOrder.split(' (')[0]}</div>
                </div>
                <h2 className="industry-index-name">{ind.name}</h2>
                <p className="industry-index-headline">
                  {ind.headline.length > 140
                    ? ind.headline.slice(0, 140) + '...'
                    : ind.headline}
                </p>

                {/* Risk severity bar */}
                <div className="ind-card-risk">
                  <div className="ind-card-risk-label">Structural Risk</div>
                  <div className="ind-card-risk-track">
                    <div className="ind-card-risk-fill" style={{ width: riskPct + '%', background: riskPct >= 90 ? '#dc3545' : riskPct >= 70 ? '#CC8800' : '#2c3e3a' }} />
                  </div>
                </div>

                {/* Key case + primary risk */}
                <div className="ind-card-details">
                  {ind.keyCase && (
                    <div className="ind-card-detail-row">
                      <span className="ind-card-detail-label">Key Authority</span>
                      <span className="ind-card-detail-value">{ind.keyCase}</span>
                    </div>
                  )}
                  <div className="ind-card-detail-row">
                    <span className="ind-card-detail-label">Primary Risk</span>
                    <span className="ind-card-detail-value">{ind.primaryRisk}</span>
                  </div>
                </div>

                <div className="ind-card-bottom">
                  <div className="industry-index-metric">{ind.metric}</div>
                  <div className="ind-card-exposure">{fmtK(ind.annualExposure || 0)}/yr est.</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ─── WHY INDUSTRY-SPECIFIC ANALYSIS ─── */}
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
            <p>
              The same meal period violation generates different exposure at a
              hotel than at a dealership than at a staffing agency. At the hotel,
              the Donohue presumption applies to time-clock data showing short
              punches. At the dealership, meal periods are secondary to the
              commission forfeiture problem. At the staffing agency, the joint
              employer framework means the violation occurred at a facility the
              employer does not control. The statutory citation is the same —
              § 226.7. The defense is categorically different.
            </p>
          </div>
        </div>

        {/* ─── CROSS-INDUSTRY DEFENSE TOOLKIT ─── */}
        <div className="ind-toolkit-section">
          <div className="ind-section-label">Shared Resources</div>
          <h3 className="ind-section-title">Cross-Industry Defense Toolkit</h3>
          <p className="ind-section-desc">
            Three tools that apply across every industry profile — penalty
            estimation, statute of limitations analysis, and penalty cap
            qualification.
          </p>
          <div className="ind-toolkit-grid">
            {[
              { name: 'PAGA Penalty Estimator', slug: 'paga-penalty-estimator', desc: 'Three-scenario exposure model with temporal bifurcation, derivative stacking, and penalty cap integration' },
              { name: 'Statute of Limitations Calculator', slug: 'statute-of-limitations-calculator', desc: 'PAGA 1-year vs. underlying 3-year lookback — quantifies plaintiff overstatement per violation category' },
              { name: 'Penalty Cap Qualifier', slug: 'penalty-cap-qualifier', desc: '15%/30% cap documentation assessment with pre-notice and post-notice compliance scoring' },
            ].map(function (tool) {
              return (
                <Link key={tool.slug} href={'/tools/' + tool.slug} className="ind-toolkit-card">
                  <div className="ind-toolkit-name">{tool.name}</div>
                  <div className="ind-toolkit-desc">{tool.desc}</div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ─── COMMON QUESTIONS ─── */}
        <div className="ind-questions-section">
          <div className="ind-section-label">Orientation</div>
          <h3 className="ind-section-title">Common Questions</h3>
          <div className="ind-questions-grid">
            {[
              {
                q: 'Which industry has the highest structural exposure?',
                a: 'Hospitality and Solar/Energy. Hospitality because the Donohue presumption applies to thousands of time-clock entries per PAGA period. Solar because AWS invalidity retroactively creates 2 hours of daily overtime per employee — the single highest per-employee exposure driver.',
              },
              {
                q: 'Which violation category appears in every industry?',
                a: 'Regular rate complexity. Every industry has a compensation component — commissions, piece-rate, RSUs, spiffs, flat-rate flag hours — that payroll systems miscalculate for overtime and premium purposes under Ferra and Alvarado.',
              },
              {
                q: 'What is the most underutilized defense across all industries?',
                a: 'Temporal bifurcation. The "Two Hotels" framework disaggregates Legacy Period violations from Remedied Period violations — revealing improvement that a blended rate masks. Applicable whenever the employer implemented compliance improvements during the PAGA statutory period.',
              },
              {
                q: 'How do the 2024 reforms change industry-specific analysis?',
                a: 'The penalty cap (15%/30%), cure mechanism (< 100 employees), and anti-stacking rule (§ 2699(i)) apply across all industries. But qualification requires industry-specific documentation — the compliance evidence that qualifies a hotel for the 15% cap differs entirely from what qualifies a solar company.',
              },
            ].map(function (item, i) {
              return (
                <div key={i} className="ind-question-item">
                  <div className="ind-question-q">{item.q}</div>
                  <div className="ind-question-a">{item.a}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
