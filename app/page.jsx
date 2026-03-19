"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Counter from "@/components/Counter";
import ContactForm from "@/components/ContactForm";
import { insights } from "@/data/insights";
import { caseLaw } from "@/data/caseLaw";
import { commentary } from "@/data/commentary";
import { tools } from "@/data/tools";
import { industries } from "@/data/industries";
import { matters } from "@/data/matters";
import PenaltyCascade from "@/components/PenaltyCascade";
import ExposureRange from "@/components/ExposureRange";
import CaseLawTimeline from "@/components/CaseLawTimeline";
import PagaFilingChart from "@/components/PagaFilingChart";
import RecoverabilityMatrix from "@/components/RecoverabilityMatrix";
import IndustryHeatmap from "@/components/IndustryHeatmap";
import ReformImpact from "@/components/ReformImpact";
import SOLTimeline from "@/components/SOLTimeline";
import PenaltyCapFlow from "@/components/PenaltyCapFlow";
import RegularRateWaterfall from "@/components/RegularRateWaterfall";
import ViolationMultiplier from "@/components/ViolationMultiplier";
import ToolWorkflow from "@/components/ToolWorkflow";
import DefenseLifecycle from "@/components/DefenseLifecycle";
import DoctrineMap from "@/components/DoctrineMap";
import MatterOutcomes from "@/components/MatterOutcomes";
import ComplianceScorecard from "@/components/ComplianceScorecard";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  var [statsVisible, setStatsVisible] = useState(false);
  var statsRef = useRef(null);

  useEffect(function () {
    if (!statsRef.current) return;
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return function () { observer.disconnect(); };
  }, []);

  return (
    <div className="page-wrap">
      <SiteNav />

      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-panel" />
        <div className="home-hero-content">
          <div className="home-hero-stat">10,098</div>
          <div className="home-hero-stat-label">
            PAGA notices filed in California in 2025 — a record high
          </div>
          <h1 className="home-hero-name">
            Arthur<br />Karadzhyan
          </h1>
          <div className="home-hero-title">
            Employment Defense Attorney · California
          </div>
          <div className="home-hero-line" />
          <div className="home-hero-desc">
            Defending employers in PAGA representative actions, wage-and-hour
            class actions, workplace investigations, and complex employment
            litigation across California.
          </div>
          <div className="home-hero-cta">
            <a href="#contact" className="btn-primary">
              Get in Touch
            </a>
            <Link href="/insights" className="btn-outline">
              Read Insights
            </Link>
          </div>
          <div className="home-hero-breadcrumb">
            Analytical Platform · {tools.length} Interactive Tools · {insights.length} Publications · {caseLaw.length}
            {" "}Case Law Analyses · {industries.length} Industry Profiles · Commentary
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="home-stats" ref={statsRef}>
        <div className="home-stats-inner">
          {[
            { num: "10098", suf: "", label: "PAGA Notices Filed\nin California (2025)" },
            { num: "85", suf: "%", label: "Maximum Penalty\nReduction Under Reforms" },
            { num: "33", suf: "", label: "Days — Shortest\nDeadline After Notice" },
            { num: "3", suf: "", label: "Supreme Court PAGA\nCases Pending" },
          ].map(function (s, i) {
            return (
              <div className="home-stat" key={i}>
                <div className="home-stat-num">
                  <Counter end={s.num} suffix={s.suf} started={statsVisible} />
                </div>
                <div className="home-stat-label">{s.label}</div>
              </div>
            );
          })}
        </div>
        <div className="home-stats-source">
          DIR PAGA Filing Data · LWDA Initial Statement of Reasons (Feb. 2026) · AB 2288 / SB 92
        </div>
      </div>

      {/* PAGA FILING VOLUME CHART */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">—</span>
          <h2 className="home-section-title">PAGA Filing Volume</h2>
          <div className="home-section-line" />
        </div>
        <p className="home-section-intro">
          Nine years of PAGA notice filings. Reforms passed in 2024 — filings
          hit a record high in 2025.
        </p>
        <PagaFilingChart />
      </section>

      {/* 01 — ABOUT */}
      <div className="home-light-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num">01</span>
            <h2 className="home-section-title">About</h2>
            <div className="home-section-line" />
          </div>
          <div className="home-about-grid">
            <div className="home-about-text">
              <p>
                Most PAGA defense is reactive. I do it differently. Every matter
                starts with a quantitative exposure model that disaggregates
                penalties by violation category, strips non-recoverable categories,
                and produces three scenarios.
              </p>
              <div className="home-pullquote">
                <div className="home-pullquote-text">
                  &ldquo;Among the strongest declarations I have reviewed in my career.&rdquo;
                </div>
                <div className="home-pullquote-attr">
                  Mediator — Former Plaintiff&apos;s Wage-and-Hour Attorney
                </div>
              </div>
              <p>
                I built this practice on the plaintiff side — litigating
                wage-and-hour class actions before transitioning to defense. That
                foundation is the operating system.
              </p>
            </div>
            <div className="home-about-sidebar">
              <div className="home-about-focus-title">Focus</div>
              <div className="home-about-focus-list">
                PAGA penalty exposure modeling<br />
                Wage-and-hour class certification opposition<br />
                2024 reform strategy (AB 2288 / SB 92)<br />
                Forensic payroll and regular rate analysis<br />
                Carrier-assigned defense and panel work
              </div>
              <Link href="/about" className="home-section-link">
                Full Background →
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* DEFENSE LIFECYCLE */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">—</span>
          <h2 className="home-section-title">Defense Lifecycle</h2>
          <div className="home-section-line" />
        </div>
        <p className="home-section-intro">
          From PAGA notice to resolution — every phase has a deadline, every
          deadline has a strategic consequence.
        </p>
        <DefenseLifecycle />
      </section>

      {/* ANALYTICAL FRAMEWORK — PENALTY CASCADE + EXPOSURE MODEL */}
      <div className="home-light-band">
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">—</span>
          <h2 className="home-section-title">How the Analysis Works</h2>
          <div className="home-section-line" />
        </div>
        <p className="home-section-intro">
          Every PAGA demand inflates exposure by conflating wages with penalties
          and ignoring recoverability limits. The analytical framework
          disaggregates, corrects, and repositions.
        </p>
        <div className="home-analytics-grid">
          <div className="home-analytics-panel">
            <div className="home-analytics-panel-label">
              Derivative Penalty Cascade
            </div>
            <PenaltyCascade />
          </div>
          <div className="home-analytics-panel">
            <div className="home-analytics-panel-label">
              Three-Scenario Exposure Model
            </div>
            <ExposureRange />
          </div>
        </div>
      </section>
      </div>

      {/* VIOLATION MULTIPLIER MATRIX */}
      <div className="home-dark-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num dark">—</span>
            <h2 className="home-section-title dark">Violation × Penalty Streams</h2>
            <div className="home-section-line dark" />
          </div>
          <p className="home-section-intro dark">
            Each violation category generates a different number of penalty streams.
            The cascade effect is what turns a $200,000 wage problem into a
            $4,000,000 PAGA demand.
          </p>
          <ViolationMultiplier />
        </section>
      </div>

      {/* RECOVERABILITY MATRIX */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">—</span>
          <h2 className="home-section-title">Recoverability Framework</h2>
          <div className="home-section-line" />
        </div>
        <p className="home-section-intro">
          The single most important analytical distinction: which monetary
          remedies are recoverable as PAGA penalties, and which are wages that
          PAGA does not authorize. This analysis alone reduces inflated demands
          by 30–50%.
        </p>
        <RecoverabilityMatrix />
      </section>

      {/* REGULAR RATE WATERFALL */}
      <div className="home-light-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num">—</span>
            <h2 className="home-section-title">Regular Rate Anatomy</h2>
            <div className="home-section-line" />
          </div>
          <p className="home-section-intro">
            Most payroll systems calculate overtime using only the base hourly rate.
            The law requires including all non-discretionary compensation — and
            the gap creates systematic exposure.
          </p>
          <RegularRateWaterfall />
        </section>
      </div>

      {/* 2024 REFORM IMPACT */}
      <div className="home-dark-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num dark">—</span>
            <h2 className="home-section-title dark">2024 Reform Impact</h2>
            <div className="home-section-line dark" />
          </div>
          <p className="home-section-intro dark">
            AB 2288 and SB 92 fundamentally restructured PAGA penalties and
            created new defense mechanisms. Seven changes that matter.
          </p>
          <ReformImpact />
        </section>
      </div>

      {/* PENALTY CAP + SOL SIDE BY SIDE */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">—</span>
          <h2 className="home-section-title">Penalty Caps & Limitations</h2>
          <div className="home-section-line" />
        </div>
        <div className="home-analytics-grid">
          <div className="home-analytics-panel">
            <div className="home-analytics-panel-label">
              Penalty Cap Qualification Path
            </div>
            <PenaltyCapFlow />
          </div>
          <div className="home-analytics-panel">
            <div className="home-analytics-panel-label">
              Statute of Limitations Overlap
            </div>
            <SOLTimeline />
          </div>
        </div>
      </section>

      {/* 02 — INSIGHTS */}
      <div className="home-dark-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num dark">02</span>
            <h2 className="home-section-title dark">Insights & Publications</h2>
            <div className="home-section-line dark" />
          </div>
          <p className="home-section-intro dark">
            {insights.length} publications. Each one addresses a specific
            analytical framework or case law development in PAGA defense.
          </p>
          <div className="home-insights-grid">
            {insights.slice(0, 6).map(function (ins) {
              return (
                <Link
                  key={ins.slug}
                  href={"/insights/" + ins.slug}
                  className="home-insight-card"
                  style={{ borderColor: 'rgba(255,255,255,.08)', background: 'rgba(255,255,255,.03)' }}
                >
                  <div className="home-insight-tag" style={{ color: '#8aa39e' }}>{ins.tag}</div>
                  <div className="home-insight-title" style={{ color: '#fff' }}>{ins.title}</div>
                  <div className="home-insight-desc" style={{ color: 'rgba(255,255,255,.45)' }}>
                    {ins.desc.length > 120
                      ? ins.desc.slice(0, 120) + "..."
                      : ins.desc}
                  </div>
                </Link>
              );
            })}
          </div>
          <Link href="/insights" className="home-section-link dark">
            All {insights.length} Publications →
          </Link>
        </section>
      </div>

      {/* COMMENTARY */}
      <div className="home-light-band">
        <section className="home-section">
          <div className="home-section-header-row">
            <div className="home-section-header-inline">
              <div className="home-section-label">Recent Commentary</div>
              <div className="home-section-line short" />
            </div>
            <Link href="/commentary" className="home-section-link-btn">
              View All →
            </Link>
          </div>
          <div className="home-commentary-grid">
            {commentary
              .slice()
              .sort(function (a, b) { return new Date(b.date) - new Date(a.date); })
              .slice(0, 4)
              .map(function (item) {
                var d = new Date(item.date + "T00:00:00");
                var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                return (
                  <Link
                    key={item.slug}
                    href={"/commentary/" + item.slug}
                    className="home-commentary-card"
                  >
                    <div className="home-commentary-accent" />
                    <div className="home-commentary-date">
                      {months[d.getMonth()] + " " + d.getFullYear()}
                    </div>
                    <div className="home-commentary-title">{item.title}</div>
                    <div className="home-commentary-summary">
                      {item.summary.length > 140
                        ? item.summary.slice(0, 140) + "..."
                        : item.summary}
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>
      </div>

      {/* 03 — CASE LAW TIMELINE */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">03</span>
          <h2 className="home-section-title">Case Law Laboratory</h2>
          <div className="home-section-line" />
        </div>
        <p className="home-section-intro">
          {caseLaw.length} decisions that define PAGA defense practice — and how the
          landscape shifted with each one.
        </p>
        <CaseLawTimeline />
        <Link href="/cases" className="home-section-link">
          All {caseLaw.length} Case Analyses →
        </Link>
      </section>

      {/* DOCTRINE MAP */}
      <div className="home-light-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num">—</span>
            <h2 className="home-section-title">Doctrine Matrix</h2>
            <div className="home-section-line" />
          </div>
          <p className="home-section-intro">
            Which case governs which doctrine. Read across to see the legal
            foundation for each area of PAGA defense.
          </p>
          <DoctrineMap />
        </section>
      </div>

      {/* 04 — TOOLS */}
      <div className="home-dark-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num dark">04</span>
            <h2 className="home-section-title dark">Tools</h2>
            <div className="home-section-line dark" />
          </div>
          <p className="home-section-intro dark">
            {tools.length} interactive analytical tools. All calculations run in your
            browser.
          </p>
          <div className="home-tools-grid">
            {tools.map(function (tool) {
              return (
                <Link
                  key={tool.slug}
                  href={"/tools/" + tool.slug}
                  className="home-tool-card"
                >
                  <div className="home-tool-name">{tool.name}</div>
                  <div className="home-tool-sub">{tool.sub}</div>
                </Link>
              );
            })}
          </div>
          <Link href="/tools" className="home-section-link dark">
            View All Tools →
          </Link>
        </section>
      </div>

      {/* TOOL WORKFLOW */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">—</span>
          <h2 className="home-section-title">Analytical Workflow</h2>
          <div className="home-section-line" />
        </div>
        <p className="home-section-intro">
          The recommended sequence. Each phase feeds the next — triage
          determines scope, quantification produces raw numbers, reduction
          applies the legal framework.
        </p>
        <ToolWorkflow />
      </section>

      {/* 05 — INDUSTRY HEATMAP */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">05</span>
          <h2 className="home-section-title">Industry Intelligence</h2>
          <div className="home-section-line" />
        </div>
        <p className="home-section-intro">
          Every industry has a structural vulnerability that generic defense
          strategies miss. Exposure intensity across 7 violation categories.
        </p>
        <IndustryHeatmap />
        <Link href="/industries" className="home-section-link">
          View All Industries →
        </Link>
      </section>

      {/* 06 — MATTERS */}
      <div className="home-light-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num">06</span>
            <h2 className="home-section-title">Select Matters</h2>
            <div className="home-section-line" />
          </div>
          <div className="home-matters-grid">
            {matters.slice(0, 4).map(function (m) {
              return (
                <Link key={m.slug} href={"/matters/" + m.slug} className="home-matter-card" style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="home-matter-cat">{m.cat}</div>
                  <div className="home-matter-title">{m.title}</div>
                  <div className="home-matter-short">{m.short}</div>
                  <div className="home-matter-result">{m.result}</div>
                </Link>
              );
            })}
          </div>
          <Link href="/matters" className="home-section-link">
            All {matters.length} Matters →
          </Link>
        </section>
      </div>

      {/* MATTER OUTCOMES */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">—</span>
          <h2 className="home-section-title">Outcome Distribution</h2>
          <div className="home-section-line" />
        </div>
        <MatterOutcomes />
      </section>

      {/* COMPLIANCE SCORECARD */}
      <div className="home-light-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num">—</span>
            <h2 className="home-section-title">Compliance Readiness</h2>
            <div className="home-section-line" />
          </div>
          <p className="home-section-intro">
            The documentation framework for penalty cap qualification. {" "}
            18 elements across 4 categories — the difference between 15%
            and 100% of penalties.
          </p>
          <ComplianceScorecard />
        </section>
      </div>

      {/* CONTACT */}
      <section className="home-contact" id="contact">
        <div className="home-contact-inner">
          <div className="home-contact-left">
            <div className="home-contact-heading">
              The analysis<br />starts here.
            </div>
            <div className="home-contact-sub">
              Available for referrals, co-counsel arrangements,
              carrier-assigned defense, workplace investigations, and
              compliance advisory across California.
            </div>
            <div className="home-contact-urgency">
              <div className="home-contact-urgency-title">Time-Sensitive</div>
              <div className="home-contact-urgency-text">
                If you've received a PAGA notice, the 33-day cure proposal
                window may already be running. The 60-day remediation window
                for penalty cap qualification starts when you receive the
                notice.
              </div>
            </div>
            <ContactForm />
          </div>
          <div className="home-contact-right">
            <h4 className="home-contact-label">Email</h4>
            <p className="home-contact-value">
              <a href="mailto:arthur.karadzhyan@gmail.com">
                arthur.karadzhyan@gmail.com
              </a>
            </p>
            <h4 className="home-contact-label">Phone</h4>
            <p className="home-contact-value">
              <a href="tel:+18184218324">(818) 421-8324</a>
            </p>
            <h4 className="home-contact-label">Location</h4>
            <p className="home-contact-value">Los Angeles, California</p>
            <h4 className="home-contact-label">Bar Number</h4>
            <p className="home-contact-value">
              State Bar of California, No. 353639
            </p>
            <h4 className="home-contact-label">LinkedIn</h4>
            <p className="home-contact-value">
              <a
                href="https://www.linkedin.com/in/karadzhyan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/karadzhyan
              </a>
            </p>

            <div className="home-contact-timeline-section">
              <div className="home-contact-timeline-title">
                What Happens When You Call
              </div>
              <div className="home-contact-timeline">
                {[
                  ["Call", "Scope & deadlines"],
                  ["24 hrs", "Preliminary assessment"],
                  ["48 hrs", "Action plan with citations"],
                  ["2 wks", "Carrier status report"],
                ].map(function (pair, i) {
                  return (
                    <div key={i} className="home-contact-timeline-step">
                      <div className="home-contact-timeline-dot" />
                      <div className="home-contact-timeline-time">
                        {pair[0]}
                      </div>
                      <div className="home-contact-timeline-desc">
                        {pair[1]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
