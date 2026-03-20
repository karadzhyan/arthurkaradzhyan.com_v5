"use client";
/* DataCallouts — Visual data strips that sit between homepage sections.
   Key numbers with context that break up text-heavy areas and reinforce
   the analytical depth. */

/* Between About and Insights — methodology proof point */
export function MethodologyCallout() {
  return (
    <div className="data-callout">
      <div className="data-callout-inner">
        <div className="data-callout-item">
          <div className="data-callout-num">3</div>
          <div className="data-callout-text">
            <div className="data-callout-title">Scenarios Per Matter</div>
            <div className="data-callout-sub">Plaintiff max · Data-driven realistic · Defense best case</div>
          </div>
        </div>
        <div className="data-callout-divider" />
        <div className="data-callout-item">
          <div className="data-callout-num">7</div>
          <div className="data-callout-text">
            <div className="data-callout-title">Violation Categories Modeled</div>
            <div className="data-callout-sub">Each disaggregated with per-category violation rates</div>
          </div>
        </div>
        <div className="data-callout-divider" />
        <div className="data-callout-item">
          <div className="data-callout-num">4</div>
          <div className="data-callout-text">
            <div className="data-callout-title">Defense Filters Applied</div>
            <div className="data-callout-sub">Recoverability · Bifurcation · Cap · Anti-stacking</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Between Cases and Tools — reform impact numbers */
export function ReformCallout() {
  return (
    <div className="data-callout reform">
      <div className="data-callout-inner">
        <div className="data-callout-item">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#8aa39e" strokeWidth="1.5" strokeOpacity="0.3" />
            <path d="M10 16 L14 20 L22 12" stroke="#8aa39e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="data-callout-text">
            <div className="data-callout-title light">AB 2288 Signed</div>
            <div className="data-callout-sub light">July 1, 2024</div>
          </div>
        </div>
        <div className="data-callout-divider light" />
        <div className="data-callout-item">
          <div className="data-callout-num light">50%</div>
          <div className="data-callout-text">
            <div className="data-callout-title light">Default Penalty Reduction</div>
            <div className="data-callout-sub light">$200 → $100 per subsequent violation</div>
          </div>
        </div>
        <div className="data-callout-divider light" />
        <div className="data-callout-item">
          <div className="data-callout-num light">0</div>
          <div className="data-callout-text">
            <div className="data-callout-title light">Published Appellate Decisions</div>
            <div className="data-callout-sub light">Interpreting the 2024 reform provisions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Between Industries and Matters — defense track record strip */
export function TrackRecordCallout() {
  var bars = [
    { label: "Exposure Modeling", pct: 90, count: "14" },
    { label: "PAGA Defense", pct: 75, count: "12" },
    { label: "Class Certification", pct: 50, count: "8" },
    { label: "Investigations", pct: 30, count: "5" },
  ];

  return (
    <div className="data-callout track-record">
      <div className="data-callout-inner">
        <div className="data-callout-item" style={{ flex: "0 0 auto" }}>
          <div className="data-callout-text">
            <div className="data-callout-title">Practice Composition</div>
            <div className="data-callout-sub">By matter type (representative sample)</div>
          </div>
        </div>
        <div className="data-callout-bars">
          {bars.map(function (b, i) {
            return (
              <div key={i} className="data-callout-bar-row">
                <div className="data-callout-bar-label">{b.label}</div>
                <div className="data-callout-bar-track">
                  <div className="data-callout-bar-fill" style={{ width: b.pct + "%" }} />
                </div>
                <div className="data-callout-bar-count">{b.count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
