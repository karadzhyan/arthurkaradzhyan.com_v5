"use client";
import { useState } from "react";
import Link from "next/link";
import { matters } from "@/data/matters";
import MattersOutcomeStrip from "@/components/MattersOutcomeStrip";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function MattersClient() {
  var [expanded, setExpanded] = useState(null);

  return (
    <div className="page-wrap">
      <SiteNav current="Matters" />

      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-label">Representative Engagements</div>
          <h1 className="page-title">Select Matters</h1>
          <p className="page-desc">
            The methodology in practice. Each engagement below produced a
            specific, identifiable defense outcome. Click to expand.
          </p>
        </div>
      </div>

      <div className="page-body">
        <MattersOutcomeStrip />
        <div className="matters-grid">
          {matters.map(function (m, i) {
            var isOpen = expanded === i;
            return (
              <div
                key={i}
                className={"matter-card" + (isOpen ? " open" : "")}
                onClick={function () {
                  setExpanded(isOpen ? null : i);
                }}
                onKeyDown={function (e) {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpanded(isOpen ? null : i);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
              >
                <div className="matter-top">
                  <div className="matter-info">
                    <div className="matter-cat">{m.cat}</div>
                    <div className="matter-title">{m.title}</div>
                    {!isOpen && (
                      <div className="matter-short">{m.short}</div>
                    )}
                  </div>
                  <div className={"matter-toggle" + (isOpen ? " open" : "")}>
                    +
                  </div>
                </div>
                {isOpen && (
                  <div className="matter-expanded">
                    <div className="matter-short-expanded">{m.short}</div>
                    <div className="matter-full">{m.full}</div>
                    {m.quote && (
                      <div className="matter-quote">
                        <div className="matter-quote-text">
                          &ldquo;{m.quote.text}&rdquo;
                        </div>
                        <div className="matter-quote-attr">
                          {m.quote.attr}
                        </div>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
                      <div className="matter-result">{m.result}</div>
                      <Link
                        href={"/matters/" + m.slug}
                        className="article-nav-link"
                        onClick={function(e) { e.stopPropagation(); }}
                        style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}
                      >
                        Read Full Matter →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
