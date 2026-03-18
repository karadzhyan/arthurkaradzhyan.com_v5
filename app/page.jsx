"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Counter from "@/components/Counter";
import { insights } from "@/data/insights";
import { caseLaw } from "@/data/caseLaw";
import { commentary } from "@/data/commentary";
import { tools } from "@/data/tools";
import { industries } from "@/data/industries";
import { matters } from "@/data/matters";
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
            ANALYTICAL PLATFORM · 8 INTERACTIVE TOOLS · 12 PUBLICATIONS · 12
            CASE LAW ANALYSES · 6 INDUSTRY PROFILES · COMMENTARY
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

      {/* ABOUT PREVIEW */}
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
      </section>

      {/* TOOLS PREVIEW */}
      <div className="home-dark-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num dark">02</span>
            <h2 className="home-section-title dark">Tools</h2>
            <div className="home-section-line dark" />
          </div>
          <p className="home-section-intro dark">
            Eight interactive analytical tools. All calculations run in your
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

      {/* INSIGHTS PREVIEW */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">03</span>
          <h2 className="home-section-title">Insights & Publications</h2>
          <div className="home-section-line" />
        </div>
        <div className="home-insights-grid">
          {insights.slice(0, 6).map(function (ins) {
            return (
              <Link
                key={ins.slug}
                href={"/insights/" + ins.slug}
                className="home-insight-card"
              >
                <div className="home-insight-tag">{ins.tag}</div>
                <div className="home-insight-title">{ins.title}</div>
                <div className="home-insight-desc">
                  {ins.desc.length > 120
                    ? ins.desc.slice(0, 120) + "..."
                    : ins.desc}
                </div>
              </Link>
            );
          })}
        </div>
        <Link href="/insights" className="home-section-link">
          All 12 Publications →
        </Link>
      </section>

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

      {/* INDUSTRIES PREVIEW */}
      <div className="home-dark-band">
        <section className="home-section">
          <div className="home-section-header">
            <span className="home-section-num dark">04</span>
            <h2 className="home-section-title dark">Industry Intelligence</h2>
            <div className="home-section-line dark" />
          </div>
          <p className="home-section-intro dark">
            Every industry has a structural vulnerability that generic defense
            strategies miss.
          </p>
          <div className="home-industries-grid">
            {industries.map(function (ind) {
              return (
                <Link
                  key={ind.slug}
                  href={"/industries/" + ind.slug}
                  className="home-industry-card"
                >
                  <div className="home-industry-count">
                    {ind.issues.length} Exposure Categories
                  </div>
                  <div className="home-industry-name">{ind.name}</div>
                  <div className="home-industry-metric">{ind.metric}</div>
                </Link>
              );
            })}
          </div>
          <Link href="/industries" className="home-section-link dark">
            View All Industries →
          </Link>
        </section>
      </div>

      {/* CASES PREVIEW */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">05</span>
          <h2 className="home-section-title">Case Law Laboratory</h2>
          <div className="home-section-line" />
        </div>
        <p className="home-section-intro">
          Twelve decisions that define PAGA defense practice.
        </p>
        <div className="home-cases-grid">
          {caseLaw.slice(0, 6).map(function (c) {
            return (
              <Link
                key={c.slug}
                href={"/cases/" + c.slug}
                className="home-case-card"
              >
                <div className="home-case-issue">{c.issue}</div>
                <div className="home-case-name">{c.case}</div>
                <div className="home-case-cite">{c.cite}</div>
              </Link>
            );
          })}
        </div>
        <Link href="/cases" className="home-section-link">
          All 12 Case Analyses →
        </Link>
      </section>

      {/* MATTERS PREVIEW */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-num">06</span>
          <h2 className="home-section-title">Select Matters</h2>
          <div className="home-section-line" />
        </div>
        <div className="home-matters-grid">
          {matters.slice(0, 4).map(function (m) {
            return (
              <div key={m.slug} className="home-matter-card">
                <div className="home-matter-cat">{m.cat}</div>
                <div className="home-matter-title">{m.title}</div>
                <div className="home-matter-short">{m.short}</div>
                <div className="home-matter-result">{m.result}</div>
              </div>
            );
          })}
        </div>
        <Link href="/matters" className="home-section-link">
          All {matters.length} Matters →
        </Link>
      </section>

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
