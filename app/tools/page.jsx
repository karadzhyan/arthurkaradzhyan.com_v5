import Link from 'next/link';
import { tools } from '@/data/tools';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { getToolIcon } from '@/components/Icons';

export var metadata = {
  title: 'Interactive Tools — PAGA Defense Analytics | Arthur Karadzhyan',
  description: 'Eight interactive analytical tools for PAGA penalty modeling, regular rate calculation, penalty cap qualification, statute of limitations, recoverability analysis, and more.',
  openGraph: {
    title: 'Interactive Tools | Arthur Karadzhyan',
    description: 'Eight PAGA defense analytical tools. All calculations run in your browser.',
    type: 'website',
  },
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
            return (
              <Link
                key={tool.slug}
                href={'/tools/' + tool.slug}
                className="tool-index-card"
              >
                {(function() { var ToolIcon = getToolIcon(tool.component); return <div className="tool-index-icon"><ToolIcon size={28} color="#2c3e3a" /></div>; })()}
                <div className="tool-index-id">{String(tool.id + 1).padStart(2, '0')}</div>
                <h2 className="tool-index-name">{tool.name}</h2>
                <div className="tool-index-sub">{tool.sub}</div>
                <p className="tool-index-desc">{tool.desc.length > 180 ? tool.desc.slice(0, 180) + '...' : tool.desc}</p>
                <div className="tool-index-cta">Open Tool →</div>
              </Link>
            );
          })}
        </div>

        <div className="page-primer">
          <div className="page-primer-label">New to PAGA?</div>
          <p className="page-primer-text">
            PAGA (Private Attorneys General Act, Lab. Code § 2698 et seq.)
            authorizes employees to sue employers for Labor Code violations on
            behalf of all "aggrieved employees." Penalties are calculated per
            employee × per pay period × per violation category. A single meal
            period violation across 50 employees and 26 pay periods generates
            $260,000 — before derivative penalties multiply the exposure. The
            2024 reforms (AB 2288 / SB 92) introduced penalty caps, cure
            mechanisms, and manageability limitations that fundamentally changed
            defense strategy.
          </p>
          <Link href="/insights" className="page-primer-link">
            Read the Publications →
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
