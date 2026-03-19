import Link from 'next/link';
import { getAllResourceCards } from '@/data/resources';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export var metadata = {
  title: 'Resources — Defense Practice Tools | Arthur Karadzhyan',
  description: 'Operational tools and reference materials for California employment defense. Cure proposals, manageability motions, reform reference guides, and compliance frameworks.',
  openGraph: {
    title: 'Resources | Arthur Karadzhyan',
    description: 'Operational tools and reference materials for California employment defense.',
    type: 'website',
  },
};

export default function ResourcesIndex() {
  var cards = getAllResourceCards();

  return (
    <div className="page-wrap">
      <SiteNav current="Resources" />

      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-label">Practice Materials</div>
          <h1 className="page-title">Resources</h1>
          <p className="page-desc">
            Operational tools and reference materials for California employment
            defense. Sixteen practice-grade frameworks, checklists, and reference guides.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="resources-index-grid">
          {cards.map(function (r, i) {
            var inner = (
              <div className="resource-index-card">
                <div className="resource-index-bar" />
                <h3 className="resource-index-title">{r.title}</h3>
                <div className="resource-index-sub">{r.sub}</div>
                <p className="resource-index-desc">{r.desc}</p>
                {r.url && (
                  <div className="resource-index-cta">View Resource →</div>
                )}
              </div>
            );
            return r.url ? (
              <Link key={i} href={r.url} className="resource-index-link">
                {inner}
              </Link>
            ) : (
              <div key={i}>{inner}</div>
            );
          })}
        </div>

        <div className="resources-contact-prompt">
          <p>Contact to request resources not yet available online.</p>
          <Link href="/#contact" className="resources-contact-btn">
            Get in Touch
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
