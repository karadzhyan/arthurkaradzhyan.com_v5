import Link from 'next/link';
import { tools } from '@/data/tools';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { getToolIcon } from '@/components/Icons';
import ToolsPageViz from '@/components/visuals/ToolsPageViz';

export var metadata = {
  title: 'Interactive Tools — PAGA Defense Analytics | Arthur Karadzhyan',
  description: 'Eight interactive analytical tools for PAGA penalty modeling, regular rate calculation, penalty cap qualification, statute of limitations, recoverability analysis, and more.',
  openGraph: {
    title: 'Interactive Tools | Arthur Karadzhyan',
    description: 'Eight PAGA defense analytical tools. All calculations run in your browser.',
    type: 'website',
  },
};

/* Tool phase categorization for visual badges */
var toolPhases = {
  "PagaCalc": { phase: "Analysis", color: "#2c3e3a" },
  "RegRateCalc": { phase: "Analysis", color: "#2c3e3a" },
  "CapQualifier": { phase: "Compliance", color: "#4a7a6f" },
  "SOLCalc": { phase: "Intake", color: "#CC8800" },
  "RecoverCheck": { phase: "Analysis", color: "#2c3e3a" },
  "DerivativeMapper": { phase: "Analysis", color: "#2c3e3a" },
  "DecisionTree": { phase: "Intake", color: "#CC8800" },
  "WageStmtCheck": { phase: "Compliance", color: "#4a7a6f" },
};

export default function ToolsIndex() {
  return (
    <div className="page-wrap">
      <SiteNav current="Tools" />

      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-label">Interactive Analytical Platform</div>
          <h1 className="page-title">Tools</h1>
          <p className="page-desc">
            Eight tools. Each one models a specific dimension of PAGA exposure
            that carriers, mediators, and opposing counsel encounter in every
            case. All calculations run in your browser — no data is transmitted
            or stored.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="tools-index-grid">
          {tools.map(function (tool) {
            var ToolIcon = getToolIcon(tool.component);
            var phaseInfo = toolPhases[tool.component] || { phase: "Analysis", color: "#2c3e3a" };
            var refCount = (tool.relatedInsights ? tool.relatedInsights.length : 0) + (tool.relatedCases ? tool.relatedCases.length : 0);

            return (
              <Link
                key={tool.slug}
                href={'/tools/' + tool.slug}
                className="tool-index-card"
              >
                {/* Top row: icon + phase badge + ref count */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ opacity: 0.6 }}>
                    <ToolIcon size={28} color="#2c3e3a" />
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{
                      fontFamily: 'Outfit,sans-serif', fontSize: '7px', fontWeight: 600, letterSpacing: '1.5px',
                      color: phaseInfo.color, background: phaseInfo.color + '10', border: '1px solid ' + phaseInfo.color + '20',
                      padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase'
                    }}>{phaseInfo.phase}</span>
                    {refCount > 0 && (
                      <span style={{
                        fontFamily: 'Outfit,sans-serif', fontSize: '8px', fontWeight: 600,
                        color: '#999', background: 'rgba(44,62,58,0.04)', padding: '2px 6px', borderRadius: '2px'
                      }}>{refCount} refs</span>
                    )}
                  </div>
                </div>

                <div className="tool-index-id">{String(tool.id + 1).padStart(2, '0')}</div>
                <h2 className="tool-index-name">{tool.name}</h2>
                <div className="tool-index-sub">{tool.sub}</div>
                <p className="tool-index-desc">{tool.desc.length > 180 ? tool.desc.slice(0, 180) + '...' : tool.desc}</p>
                <div className="tool-index-cta">Open Tool →</div>
              </Link>
            );
          })}
        </div>

        <ToolsPageViz />
      </div>

      <SiteFooter />
    </div>
  );
}
