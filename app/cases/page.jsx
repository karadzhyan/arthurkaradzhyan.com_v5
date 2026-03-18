import Link from 'next/link';
import { caseLaw } from '@/data/caseLaw';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export var metadata = {
  title: 'Case Law Laboratory — Defense-Side Analysis | Arthur Karadzhyan',
  description: 'Twelve California Supreme Court and Court of Appeal decisions that define PAGA defense practice. Each analysis includes holding, impact, and actionable defense strategy.',
  openGraph: {
    title: 'Case Law Laboratory | Arthur Karadzhyan',
    description: 'Defense-side analysis of twelve landmark PAGA and employment cases.',
    type: 'website',
  },
};

export default function CasesIndex() {
  return (
    <div className="page-wrap">
      <SiteNav current="Cases" />

      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-label">Defense Analysis</div>
          <h1 className="page-title">Case Law Laboratory</h1>
          <p className="page-desc">
            Twelve decisions. Each one changed how PAGA defense is practiced.
            From Kirby's foundational distinction between wages and penalties to
            Hohenshelt's reversal of five years of strict-liability authority.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="cases-index-grid">
          {caseLaw.map(function (c) {
            return (
              <Link
                key={c.slug}
                href={'/cases/' + c.slug}
                className="case-index-card"
              >
                <div className="case-index-issue">{c.issue}</div>
                <h2 className="case-index-name">{c.case}</h2>
                <div className="case-index-cite">{c.cite}</div>
                {c.preview && (
                  <p className="case-index-preview">
                    {c.preview.length > 180
                      ? c.preview.slice(0, 180) + '...'
                      : c.preview}
                  </p>
                )}
                <div className="case-index-cta">Read Analysis →</div>
              </Link>
            );
          })}
        </div>

        <div className="monitoring-section">
          <div className="monitoring-bar" />
          <div className="monitoring-inner">
            <div className="monitoring-label">Currently Monitoring</div>
            {[
              {status:"pending",name:"Leeper v. Shipt, Inc.",cite:"S289305",desc:"Whether headless PAGA claims are permitted. Decision expected mid-to-late 2026."},
              {status:"pending",name:"Camp v. Home Depot U.S.A.",cite:"S277518",desc:"Whether time rounding in general timekeeping violates the Labor Code after Donohue."},
              {status:"pending",name:"Prime Healthcare Mgmt. v. Superior Court",cite:"",desc:"Whether an arbitrator's finding of no individual injury eliminates representative PAGA standing."},
              {status:"tracking",name:"LWDA Proposed Regulations",cite:"",desc:"First-ever formal PAGA regulations published Feb. 2026."},
              {status:"tracking",name:"Reform Appellate Authority",cite:"",desc:"No published decision has yet interpreted the 2024 reform provisions."},
              {status:"tracking",name:"Hohenshelt Progeny",cite:"",desc:"Post-Hohenshelt decisions on the willful/grossly negligent/fraudulent standard."},
            ].map(function (item, i) {
              return (
                <div key={i} className="monitoring-item">
                  <div className={'monitoring-dot ' + (item.status === 'pending' ? 'pending' : 'tracking')} />
                  <div className="monitoring-content">
                    <div className="monitoring-name">
                      {item.name}
                      {item.cite && <span className="monitoring-cite"> ({item.cite})</span>}
                      <span className={'monitoring-status ' + item.status}>
                        {item.status === 'pending' ? 'PENDING' : 'TRACKING'}
                      </span>
                    </div>
                    <div className="monitoring-desc">{item.desc}</div>
                  </div>
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
