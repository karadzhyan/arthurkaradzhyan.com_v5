import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export var metadata = {
  title: 'About — Background & Qualifications | Arthur Karadzhyan',
  description: 'California employment defense attorney. Plaintiff-side origins, global litigation firm experience, PAGA penalty modeling methodology. UC Berkeley, Pepperdine Law.',
  openGraph: {
    title: 'About | Arthur Karadzhyan',
    description: 'Background, education, admissions, and practice trajectory.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="page-wrap">
      <SiteNav current="About" />

      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-label">Background</div>
          <h1 className="page-title">About</h1>
        </div>
      </div>

      <div className="page-body">
        <div className="about-layout">
          <div className="about-text">
            <p>Most PAGA defense is reactive. A notice arrives, counsel answers, discovery happens, and someone negotiates a number at mediation. The exposure model — if one exists — is a back-of-the-envelope calculation based on blanket assumptions. The result: settlements driven by plaintiff's framing, not by the actual data.</p>
            <p>I do it differently. Every matter starts with a quantitative exposure model that disaggregates penalties by violation category, applies per-category violation rates derived from actual time records and payroll data, strips non-recoverable categories under the ZB, N.A. and Kirby frameworks, and produces three scenarios — plaintiff maximum, data-driven realistic, and defense best case.</p>

            <div className="about-pullquote">
              <div className="about-pullquote-text">&ldquo;Among the strongest declarations I have reviewed in my career.&rdquo;</div>
              <div className="about-pullquote-attr">Mediator — Former Plaintiff's Wage-and-Hour Attorney</div>
            </div>

            <p>I built this practice on the plaintiff side — litigating wage-and-hour class actions on behalf of employees before transitioning to defense. That foundation isn't background. It's the operating system. I evaluate claims the way opposing counsel evaluates them, anticipate certification arguments before they're filed, and identify the pressure points that actually move mediations.</p>
            <p>The eight interactive tools, twelve publications, and twelve case law analyses on this site aren't marketing. They are the methodology, made visible.</p>

            <h3 className="about-section-title">Practice Trajectory</h3>
            <p>I started on the plaintiff side — litigating wage-and-hour class actions at a Los Angeles firm that prosecuted meal-and-rest, overtime, and off-the-clock claims against mid-market and enterprise employers. I learned how plaintiff's counsel evaluates cases, prices risk, builds class certification motions, and approaches mediation.</p>
            <p>The transition to defense was deliberate. At a global litigation firm's employment practice group, I handled PAGA and wage-and-hour matters with a level of independence unusual for my seniority — building the quantitative exposure models, novel defense theories, and sampling methodologies that became standard analytical tools across the practice group.</p>
            <p>Earlier, I practiced intellectual property at a boutique firm — researching cutting-edge trademark and licensing issues, drafting prosecution briefs, and producing the kind of deep analytical writing that a transactional IP practice demands.</p>
            <p>The thread across all of it: I treat every legal problem as a system to be understood completely before a position is taken.</p>
          </div>

          <div className="about-sidebar">
            <div className="about-sidebar-section">
              <h4 className="about-sidebar-heading">Focus</h4>
              <div className="about-sidebar-list">
                PAGA penalty exposure modeling<br/>
                Wage-and-hour class certification opposition<br/>
                2024 reform strategy (AB 2288 / SB 92)<br/>
                Forensic payroll and regular rate analysis<br/>
                Carrier-assigned defense and panel work
              </div>
            </div>

            <div className="about-sidebar-section">
              <h4 className="about-sidebar-heading">On This Site</h4>
              <div className="about-stat-grid">
                {[['8', 'Tools'], ['12', 'Publications'], ['12', 'Case Analyses'], ['6', 'Industries']].map(function (pair, i) {
                  return (
                    <div key={i} className="about-stat-item">
                      <div className="about-stat-num">{pair[0]}</div>
                      <div className="about-stat-label">{pair[1]}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="about-sidebar-section">
              <h4 className="about-sidebar-heading">Education</h4>
              <div className="about-edu">
                <p className="about-edu-school">Pepperdine University School of Law</p>
                <p className="about-edu-degree">Juris Doctor</p>
                <p className="about-edu-honors">Full-Tuition Dean's Merit Scholarship · Dean's Honor List (Top 15%)</p>
              </div>
              <div className="about-edu">
                <p className="about-edu-school">University of California, Berkeley</p>
                <p className="about-edu-degree">Bachelor of Arts</p>
                <p className="about-edu-honors">Graduated with Honors · Dean's Honors List (Top 4%, College of Letters & Science)</p>
              </div>
            </div>

            <div className="about-sidebar-section">
              <h4 className="about-sidebar-heading">Admissions</h4>
              <ul className="about-admissions">
                {['State Bar of California (No. 353639)', 'U.S.D.C. Central District of California', 'U.S.D.C. Northern District of California', 'U.S.D.C. Eastern District of California', 'U.S.D.C. Southern District of California'].map(function (a, i) {
                  return <li key={i}>{a}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
