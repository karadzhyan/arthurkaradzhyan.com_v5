"use client";

import Link from "next/link";

export default function ComplianceScorecard() {
  var categories = [
    {
      area: "Written Policies",
      items: [
        { element: "Meal period policy (Brinker-compliant)", weight: "Critical", authority: "Brinker (2012)", consequence: "Presumption of violation under Donohue for every short meal punch", tool: null },
        { element: "Rest period policy (Augustus-compliant)", weight: "Critical", authority: "Augustus (2016)", consequence: "Cannot require on-call during rest — facial invalidity argument", tool: null },
        { element: "Overtime and regular rate policy", weight: "High", authority: "Ferra / Alvarado", consequence: "Systematic underpayment of OT and premium calculations", tool: "regular-rate-calculator" },
        { element: "Wage statement format (9 elements of § 226(a))", weight: "High", authority: "§ 226(a)(1)–(9)", consequence: "$50/$100 per statement, capped at $4,000/employee", tool: "wage-statement-compliance-checker" },
        { element: "Expense reimbursement policy (§ 2802)", weight: "Medium", authority: "§ 2802(a)", consequence: "Default PAGA penalty per pay period for each affected employee", tool: null }
      ],
      icon: "P"
    },
    {
      area: "Documentation & Systems",
      items: [
        { element: "Electronic meal period attestation system", weight: "Critical", authority: "Donohue / Brinker", consequence: "No evidence to rebut Donohue presumption — near-automatic liability", tool: null },
        { element: "Timekeeping with break tracking", weight: "Critical", authority: "§ 226.7 / § 512", consequence: "No data to support 'Two Hotels' bifurcation framework", tool: null },
        { element: "Payroll audit trail (last 12 months)", weight: "High", authority: "§ 2699(g)", consequence: "Cannot demonstrate pre-notice 'all reasonable steps' for 15% cap", tool: "penalty-cap-qualifier" },
        { element: "Employee acknowledgment forms on file", weight: "High", authority: "§ 2699(g)–(h)", consequence: "Weakens reasonable steps argument at mediation", tool: null },
        { element: "Manager training records with attendance", weight: "High", authority: "§ 2699(g)", consequence: "Gap in compliance documentation chain", tool: null }
      ],
      icon: "D"
    },
    {
      area: "Proactive Compliance",
      items: [
        { element: "Regular rate true-up calculations performed", weight: "High", authority: "Ferra / Alvarado", consequence: "Ongoing systematic underpayment expands PAGA period", tool: "regular-rate-calculator" },
        { element: "Premium auto-payment for short/missed breaks", weight: "Critical", authority: "Naranjo / Donohue", consequence: "Eliminates derivative cascade — no unpaid premiums means no § 226/§ 203 derivatives", tool: "derivative-penalty-mapper" },
        { element: "Final pay timing procedures documented", weight: "Medium", authority: "§ 201–203", consequence: "§ 203 waiting time penalties (up to 30 days' wages per separated employee)", tool: null },
        { element: "Separation checklist with premium review", weight: "Medium", authority: "Naranjo", consequence: "Premiums at separation trigger § 203 — checklist prevents derivatives", tool: null }
      ],
      icon: "C"
    },
    {
      area: "Penalty Cap Readiness",
      items: [
        { element: "Pre-notice compliance documentation package", weight: "Critical", authority: "§ 2699(g)", consequence: "Cannot qualify for 15% cap — full penalties apply", tool: "penalty-cap-qualifier" },
        { element: "60-day remediation action plan (template ready)", weight: "High", authority: "§ 2699(h)", consequence: "Lost time in 60-day window reduces cure completeness", tool: null },
        { element: "Back-pay calculation methodology documented", weight: "High", authority: "§ 2699(h)", consequence: "Cure argument undermined without verifiable back-pay math", tool: "paga-penalty-estimator" },
        { element: "Cure proposal framework (draft on file)", weight: "Medium", authority: "§ 2699.3(a)", consequence: "Rushed proposal within 33-day window — weaker first impression", tool: null }
      ],
      icon: "R"
    }
  ];

  function weightColor(w) {
    if (w === "Critical") return "#dc3545";
    if (w === "High") return "#CC8800";
    return "#8aa39e";
  }

  var totalItems = categories.reduce(function (s, c) { return s + c.items.length; }, 0);
  var critical = 0;
  var high = 0;
  categories.forEach(function (c) {
    c.items.forEach(function (item) {
      if (item.weight === "Critical") critical++;
      if (item.weight === "High") high++;
    });
  });

  return (
    <div className="scorecard">
      <div className="scorecard-summary">
        <div className="scorecard-summary-item">
          <div className="scorecard-summary-num">{totalItems}</div>
          <div className="scorecard-summary-label">Compliance Elements</div>
        </div>
        <div className="scorecard-summary-item">
          <div className="scorecard-summary-num" style={{ color: "#dc3545" }}>{critical}</div>
          <div className="scorecard-summary-label">Critical for Cap</div>
        </div>
        <div className="scorecard-summary-item">
          <div className="scorecard-summary-num" style={{ color: "#CC8800" }}>{high}</div>
          <div className="scorecard-summary-label">High Priority</div>
        </div>
      </div>
      <div className="scorecard-categories">
        {categories.map(function (cat, i) {
          return (
            <div key={i} className="scorecard-category">
              <div className="scorecard-cat-header">
                <div className="scorecard-cat-icon">{cat.icon}</div>
                <div className="scorecard-cat-name">{cat.area}</div>
                <div className="scorecard-cat-count">{cat.items.length} items</div>
              </div>
              <div className="scorecard-items">
                {cat.items.map(function (item, j) {
                  return (
                    <div key={j} className="scorecard-item">
                      <div className="scorecard-item-check" />
                      <div className="scorecard-item-body">
                        <div className="scorecard-item-text">{item.element}</div>
                        <div className="scorecard-item-auth">{item.authority}</div>
                        <div className="scorecard-item-consequence">{item.consequence}</div>
                      </div>
                      <div className="scorecard-item-right">
                        <div className="scorecard-item-weight" style={{
                          color: weightColor(item.weight),
                          borderColor: weightColor(item.weight),
                          background: item.weight === "Critical"
                            ? "rgba(220,53,69,.06)"
                            : item.weight === "High"
                              ? "rgba(204,136,0,.06)"
                              : "rgba(138,163,158,.06)"
                        }}>
                          {item.weight}
                        </div>
                        {item.tool && (
                          <Link href={"/tools/" + item.tool} className="scorecard-item-tool">
                            Tool →
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="scorecard-cite">
        Assessment framework based on §§ 2699(g)–(h) penalty cap requirements · AB 2288 / SB 92 · No published appellate interpretation as of Q1 2026
      </div>
    </div>
  );
}
