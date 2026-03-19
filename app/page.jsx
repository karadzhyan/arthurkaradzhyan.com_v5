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
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import {
  IconUser, IconBook, IconGavel, IconWrench, IconBuilding, IconBriefcase, IconPen,
  IconPhone, IconFileText, IconClipboard, IconFolder,
  IconBarChart, IconTrendUp, IconScale,
  getToolIcon, getIndustryIcon,
} from "@/components/Icons";
import HeroDashboard from "@/components/visuals/HeroDashboard";
import PenaltyCascade from "@/components/visuals/PenaltyCascade";
import ExposureModel from "@/components/visuals/ExposureModel";
import PenaltyMath from "@/components/visuals/PenaltyMath";
import ReformTimeline from "@/components/visuals/ReformTimeline";
import DefenseFlowchart from "@/components/visuals/DefenseFlowchart";
import IndustryHeatmap from "@/components/visuals/IndustryHeatmap";
import RecoverabilityMatrix from "@/components/visuals/RecoverabilityMatrix";
import CaseLawTimeline from "@/components/visuals/CaseLawTimeline";
import PenaltyWaterfall from "@/components/visuals/PenaltyWaterfall";
import StatsEnhanced from "@/components/visuals/StatsEnhanced";
import MatterOutcomes from "@/components/visuals/MatterOutcomes";
import { MethodologyCallout, ReformCallout, TrackRecordCallout } from "@/components/visuals/DataCallouts";

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

  var timelineData = [
    { time: "Call", desc: "Scope & deadlines", detail: "Identify notice date, violation categories, employee count", Icon: IconPhone },
    { time: "24 hrs", desc: "Preliminary assessment", detail: "Initial exposure range, recoverability filter, deadline map", Icon: IconFileText },
    { time: "48 hrs", desc: "Action plan with citations", detail: "Three-scenario model, cure strategy, documentation checklist", Icon: IconClipboard },
    { time: "2 wks", desc: "Carrier status report", detail: "Full exposure model, defense roadmap, budget projection", Icon: IconFolder },
  ];

  return (
    <div className="page-wrap">
      <SiteNav />

      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-panel">
          <HeroDashboard />
        </div>
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
            { num: "10098", suf: "", label: "PAGA Notices Filed\nin California (2025)", Icon: IconBarChart },
            { num: "85", suf: "%", label: "Maximum Penalty\nReduction Under Reforms", Icon: IconTrendUp },
            { num: "33", suf: "", label: "Days — Shortest\nDeadline After Notice", Icon: null },
            { num: "3", suf: "", label: "Supreme Court PAGA\nCases Pending", Icon: IconScale },
          ].map(function (s, i) {
            return (
              <div className="home-stat" key={i}>
                {s.Icon && (
                  <div className="home-stat-icon">
                    <s.Icon size={20} color="#8aa39e" />
                  </div>
                )}
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
        <StatsEnhanced />
      </div>

      {/* 01 — ABOUT */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">01</span>
          <div className="home-section-icon"><IconUser size={18} color="#2c3e3a" /></div>
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
                Mediator — Former Plaintiff's Wage-and-Hour Attorney
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

        {/* Methodology visualizations */}
        <div className="home-viz-section">
          <PenaltyMath />
          <PenaltyWaterfall />
          <ExposureModel />
        </div>
      </section>

      <MethodologyCallout />

      {/* 02 — INSIGHTS */}
      <div className="home-dark-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num dark">02</span>
            <div className="home-section-icon"><IconBook size={18} color="#8aa39e" /></div>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span className="home-insight-tag-badge" style={{
                      background: ins.tag === 'Framework' ? 'rgba(138,163,158,.15)' : ins.tag === 'Analysis' ? 'rgba(204,136,0,.12)' : ins.tag === 'Strategy' ? 'rgba(74,122,111,.15)' : 'rgba(255,255,255,.06)',
                      color: ins.tag === 'Analysis' ? '#CC8800' : '#8aa39e',
                      padding: '2px 8px', borderRadius: '10px',
                      fontFamily: 'Outfit,sans-serif', fontSize: '8px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase'
                    }}>{ins.tag}</span>
                    {ins.badge && <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: '7px', fontWeight: 600, color: '#fff', background: '#CC8800', padding: '1px 5px', letterSpacing: '1px' }}>{ins.badge}</span>}
                  </div>
                  <div className="home-insight-title" style={{ color: '#fff' }}>{ins.title}</div>
                  <div className="home-insight-desc" style={{ color: 'rgba(255,255,255,.45)' }}>
                    {ins.desc.length > 120
                      ? ins.desc.slice(0, 120) + "..."
                      : ins.desc}
                  </div>
                  {ins.tool && (
                    <div style={{ marginTop: 8, fontFamily: 'Outfit,sans-serif', fontSize: '8px', color: 'rgba(138,163,158,.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
                      Interactive Tool
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
          <Link href="/insights" className="home-section-link dark">
            All {insights.length} Publications →
          </Link>

          <div className="home-viz-dark">
            <PenaltyCascade />
          </div>
        </section>
      </div>

      {/* COMMENTARY */}
      <div className="home-light-band">
        <section className="home-section">
          <div className="home-section-header-row">
            <div className="home-section-header-inline">
              <div className="home-section-icon"><IconPen size={16} color="#2c3e3a" /></div>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div className="home-commentary-date">
                        {months[d.getMonth()] + " " + d.getFullYear()}
                      </div>
                      {item.tags && item.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: 4 }}>
                          {item.tags.slice(0, 2).map(function (tag, ti) {
                            return (
                              <span key={ti} style={{
                                fontFamily: 'Outfit,sans-serif', fontSize: '7px', fontWeight: 600, letterSpacing: '1px',
                                color: '#2c3e3a', background: '#f0f5f4', padding: '1px 5px', textTransform: 'uppercase'
                              }}>{tag}</span>
                            );
                          })}
                        </div>
                      )}
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

      {/* 03 — CASE LAW */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">03</span>
          <div className="home-section-icon"><IconGavel size={18} color="#2c3e3a" /></div>
          <h2 className="home-section-title">Case Law Laboratory</h2>
          <div className="home-section-line" />
        </div>
        <p className="home-section-intro">
          {caseLaw.length} decisions that define PAGA defense practice.
        </p>
        <div className="home-cases-grid">
          {caseLaw.slice(0, 6).map(function (c) {
            var yearMatch = c.cite && c.cite.match(/\((\d{4})\)/);
            var year = yearMatch ? yearMatch[1] : "";
            var isSupreme = c.cite && c.cite.indexOf("Cal.5th") !== -1;
            return (
              <Link
                key={c.slug}
                href={"/cases/" + c.slug}
                className="home-case-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div className="home-case-issue">{c.issue}</div>
                  {year && (
                    <span style={{
                      fontFamily: 'Outfit,sans-serif', fontSize: '9px', fontWeight: 600, color: '#2c3e3a',
                      background: 'rgba(44,62,58,.06)', padding: '2px 6px', borderRadius: '2px', flexShrink: 0
                    }}>{year}</span>
                  )}
                </div>
                <div className="home-case-name">{c.case}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <div className="home-case-cite">{c.cite}</div>
                  {isSupreme && (
                    <span style={{
                      fontFamily: 'Outfit,sans-serif', fontSize: '6px', fontWeight: 700, letterSpacing: '1px',
                      color: '#2c3e3a', background: 'rgba(44,62,58,.06)', padding: '1px 5px', textTransform: 'uppercase'
                    }}>SUP. CT.</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        <Link href="/cases" className="home-section-link">
          All {caseLaw.length} Case Analyses →
        </Link>

        <div className="home-viz-section">
          <CaseLawTimeline />
        </div>
      </section>

      <ReformCallout />

      {/* 04 — TOOLS */}
      <div className="home-dark-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num dark">04</span>
            <div className="home-section-icon"><IconWrench size={18} color="#8aa39e" /></div>
            <h2 className="home-section-title dark">Tools</h2>
            <div className="home-section-line dark" />
          </div>
          <p className="home-section-intro dark">
            {tools.length} interactive analytical tools. All calculations run in your
            browser.
          </p>
          <div className="home-tools-grid">
            {tools.map(function (tool) {
              var ToolIcon = getToolIcon(tool.component);
              return (
                <Link
                  key={tool.slug}
                  href={"/tools/" + tool.slug}
                  className="home-tool-card"
                >
                  <div className="home-tool-icon">
                    <ToolIcon size={20} color="#8aa39e" />
                  </div>
                  <div className="home-tool-name">{tool.name}</div>
                  <div className="home-tool-sub">{tool.sub}</div>
                </Link>
              );
            })}
          </div>
          <Link href="/tools" className="home-section-link dark">
            View All Tools →
          </Link>

          <div className="home-viz-dark">
            <ReformTimeline />
            <DefenseFlowchart />
          </div>
        </section>
      </div>

      {/* RECOVERABILITY ANALYSIS */}
      <section className="home-section">
        <div className="home-viz-section">
          <RecoverabilityMatrix />
        </div>
      </section>

      {/* 05 — INDUSTRIES */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">05</span>
          <div className="home-section-icon"><IconBuilding size={18} color="#2c3e3a" /></div>
          <h2 className="home-section-title">Industry Intelligence</h2>
          <div className="home-section-line" />
        </div>
        <p className="home-section-intro">
          Every industry has a structural vulnerability that generic defense
          strategies miss.
        </p>
        <div className="home-industries-grid" style={{ borderColor: '#eee' }}>
          {industries.map(function (ind) {
            var IndIcon = getIndustryIcon(ind.name);
            return (
              <Link
                key={ind.slug}
                href={"/industries/" + ind.slug}
                className="home-industry-card"
                style={{ background: '#fafafa', borderColor: '#eee' }}
              >
                <div className="home-industry-icon-wrap">
                  <IndIcon size={24} color="#2c3e3a" />
                </div>
                <div className="home-industry-count" style={{ color: 'rgba(44,62,58,.4)' }}>
                  {ind.issues.length} Exposure Categories
                </div>
                <div className="home-industry-name" style={{ color: '#1a1a1a' }}>{ind.name}</div>
                <div className="home-industry-metric" style={{ color: '#2c3e3a', borderTopColor: '#eee' }}>{ind.metric}</div>
              </Link>
            );
          })}
        </div>
        <Link href="/industries" className="home-section-link">
          View All Industries →
        </Link>

        <div className="home-viz-section">
          <IndustryHeatmap />
        </div>
      </section>

      <TrackRecordCallout />

      {/* 06 — MATTERS */}
      <div className="home-light-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num">06</span>
            <div className="home-section-icon"><IconBriefcase size={18} color="#2c3e3a" /></div>
            <h2 className="home-section-title">Select Matters</h2>
            <div className="home-section-line" />
          </div>

          <div className="home-viz-section">
            <MatterOutcomes />
          </div>

          <div className="home-matters-grid">
            {matters.slice(0, 4).map(function (m) {
              return (
                <Link key={m.slug} href={"/matters/" + m.slug} className="home-matter-card" style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div className="home-matter-cat">{m.cat}</div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(44,62,58,.2)" strokeWidth="1.5">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
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
                {timelineData.map(function (step, i) {
                  return (
                    <div key={i} className="home-contact-timeline-step">
                      <div className="home-contact-timeline-icon">
                        <step.Icon size={16} color="#8aa39e" />
                      </div>
                      <div className="home-contact-timeline-time">
                        {step.time}
                      </div>
                      <div className="home-contact-timeline-desc">
                        {step.desc}
                      </div>
                      <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: '7px', color: 'rgba(255,255,255,.2)', marginTop: 4, lineHeight: 1.4 }}>
                        {step.detail}
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
