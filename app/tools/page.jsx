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

/* Tool phase categorization */
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

            return (
              <Link
                key={tool.slug}
                href={'/tools/' + tool.slug}
                className="tool-index-card"
              >
                <div className="tool-card-top">
                  <div className="tool-card-icon-wrap" style={{ '--phase-color': phaseInfo.color }}>
                    <ToolIcon size={24} color={phaseInfo.color} />
                  </div>
                  <span className="tool-card-phase" style={{
                    color: phaseInfo.color,
                    borderColor: phaseInfo.color + '30',
                    background: phaseInfo.color + '08'
                  }}>{phaseInfo.phase}</span>
                </div>

                <div className="tool-card-number">{String(tool.id + 1).padStart(2, '0')}</div>
                <h2 className="tool-index-name">{tool.name}</h2>
                <div className="tool-index-sub">{tool.sub}</div>
                <p className="tool-index-desc">{tool.desc.length > 160 ? tool.desc.slice(0, 160) + '…' : tool.desc}</p>
                <div className="tool-index-cta">Open Tool <span className="tool-cta-arrow">→</span></div>
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
