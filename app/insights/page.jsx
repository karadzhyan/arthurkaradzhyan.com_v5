import Link from 'next/link';
import { insights } from '@/data/insights';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import InsightsPageViz from '@/components/visuals/InsightsPageViz';

export var metadata = {
  title: 'Insights & Publications — PAGA Defense Strategy | Arthur Karadzhyan',
  description: 'Twelve defense-side publications on PAGA penalty analysis, regular rate methodology, 2024 reform strategy, settlement approval frameworks, and case law developments.',
  openGraph: {
    title: 'Insights & Publications | Arthur Karadzhyan',
    description: 'Twelve publications on PAGA defense strategy and California employment law.',
    type: 'website',
  },
};

export default function InsightsIndex() {
  return (
    <div className="page-wrap">
      <SiteNav current="Insights" />

      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-label">Publications</div>
          <h1 className="page-title">Insights</h1>
          <p className="page-desc">
            Twelve publications. Each one addresses a specific analytical
            framework, defense methodology, or case law development in PAGA and
            wage-and-hour defense.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="insights-index-grid">
          {insights.map(function (ins) {
            return (
              <Link
                key={ins.slug}
                href={'/insights/' + ins.slug}
                className="insight-index-card"
              >
                <div className="insight-index-top">
                  <span className="insight-index-tag">{ins.tag}</span>
                  {ins.badge && (
                    <span className="insight-index-badge">{ins.badge}</span>
                  )}
                </div>
                <h2 className="insight-index-title">{ins.title}</h2>
                <p className="insight-index-desc">{ins.desc}</p>
                {ins.tool && (
                  <div className="insight-index-tool">
                    Interactive Tool: {ins.tool.split('—')[0].trim()}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <InsightsPageViz />
      </div>

      <SiteFooter />
    </div>
  );
}
