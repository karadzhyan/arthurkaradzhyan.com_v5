"use client";

import Link from "next/link";
import { caseLaw } from "@/data/caseLaw";

export default function CaseLawTimeline() {
  var milestones = [
    { year: 2012, cases: ["Brinker", "Kirby"], shift: "Foundation", desc: "Provide-not-ensure standard · Premiums classified as wages", holding: "Employer must provide opportunity for break, not police it. § 226.7 premiums are wages, not penalties — cannot be recovered as PAGA penalties.", impact: "defense", magnitude: "high" },
    { year: 2014, cases: ["Duran"], shift: "Due Process", desc: "Constitutional floor for statistical sampling at trial", holding: "Sample must be representative, methodology sound, defendant retains right to challenge individual claims.", impact: "defense", magnitude: "high" },
    { year: 2018, cases: ["Alvarado"], shift: "Regular Rate", desc: "Flat-sum bonus methodology changes every overtime calculation", holding: "Flat-sum bonuses divided by nonovertime hours only — not total hours. Higher regular rate for OT and premiums.", impact: "plaintiff", magnitude: "medium" },
    { year: 2019, cases: ["ZB, N.A."], shift: "Recoverability", desc: "Wages ≠ penalties — strips 30–50% from inflated PAGA demands", holding: "The 'amount sufficient to recover underpaid wages' in § 558 is NOT a civil penalty recoverable through PAGA.", impact: "defense", magnitude: "high" },
    { year: 2021, cases: ["Donohue", "Ferra"], shift: "Burden Shift", desc: "Rebuttable presumption + regular rate for premiums · Retroactive", holding: "Short meal punches create presumption of violation. Premiums must be at regular rate, not base — applied retroactively.", impact: "plaintiff", magnitude: "high" },
    { year: 2022, cases: ["Naranjo"], shift: "Cascade", desc: "One violation → four penalty streams · Derivative exposure multiplier", holding: "Meal/rest premiums are 'wages' for § 226 and § 203 — unpaid premiums trigger derivative wage statement and waiting time penalties.", impact: "plaintiff", magnitude: "high" },
    { year: 2023, cases: ["Adolph"], shift: "Standing", desc: "Individual claims to arbitration, representative PAGA stays in court", holding: "Employee retains standing to pursue representative PAGA in court even after individual claims compelled to arbitration.", impact: "plaintiff", magnitude: "high" },
    { year: 2024, cases: ["Estrada"], shift: "Manageability", desc: "Cannot dismiss on manageability — but can narrow scope dramatically", holding: "No inherent authority to strike PAGA on manageability. But courts retain tools: sampling, scope limitation, evidence restriction.", impact: "defense", magnitude: "medium" },
    { year: 2025, cases: ["Hohenshelt"], shift: "Arbitration", desc: "Five years of strict-liability forfeiture authority — reversed", holding: "Late arbitration fee payment does not automatically forfeit rights. Relief from forfeiture available unless willful, grossly negligent, or fraudulent.", impact: "defense", magnitude: "high" },
    { year: 2026, cases: ["Leeper"], shift: "Pending", desc: "Headless PAGA — the most significant pending question", holding: "Can plaintiff abandon individual claims post-arbitration and still pursue representative PAGA? Supreme Court took case on own motion.", impact: "unknown", magnitude: "high" }
  ];

  function findSlug(name) {
    var match = caseLaw.find(function (c) {
      return c.case.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    });
    return match ? match.slug : null;
  }

  return (
    <div className="timeline-wrap">
      <div className="timeline-track">
        {milestones.map(function (m, i) {
          var isLast = i === milestones.length - 1;
          return (
            <div key={i} className={"timeline-node" + (isLast ? " timeline-node-pending" : "")}>
              <div className="timeline-node-marker">
                <div className={"timeline-node-dot" + (m.magnitude === "high" ? " timeline-node-dot-lg" : "")} style={{
                  background: m.impact === "defense" ? "#2c3e3a" : m.impact === "plaintiff" ? "#dc3545" : "#CC8800"
                }} />
                {i < milestones.length - 1 && <div className="timeline-node-line" />}
              </div>
              <div className="timeline-node-content">
                <div className="timeline-node-top">
                  <div className="timeline-node-year">{m.year}</div>
                  <div className={"timeline-node-impact timeline-node-impact-" + m.impact}>
                    {m.impact === "defense" ? "Defense" : m.impact === "plaintiff" ? "Plaintiff" : "Pending"}
                  </div>
                </div>
                <div className="timeline-node-shift">{m.shift}</div>
                <div className="timeline-node-cases">
                  {m.cases.map(function (name, j) {
                    var slug = findSlug(name);
                    return (
                      <span key={j}>
                        {j > 0 && " · "}
                        {slug ? (
                          <Link href={"/cases/" + slug} className="timeline-case-link">
                            {name}
                          </Link>
                        ) : (
                          <span className="timeline-case-name">{name}</span>
                        )}
                      </span>
                    );
                  })}
                </div>
                <div className="timeline-node-desc">{m.desc}</div>
                <div className="timeline-node-holding">{m.holding}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="timeline-legend">
        <div className="timeline-legend-item">
          <span className="timeline-legend-dot" style={{ background: "#2c3e3a" }} />
          <span className="timeline-legend-label">Favors defense</span>
        </div>
        <div className="timeline-legend-item">
          <span className="timeline-legend-dot" style={{ background: "#dc3545" }} />
          <span className="timeline-legend-label">Favors plaintiff</span>
        </div>
        <div className="timeline-legend-item">
          <span className="timeline-legend-dot" style={{ background: "#CC8800" }} />
          <span className="timeline-legend-label">Pending — outcome uncertain</span>
        </div>
      </div>
    </div>
  );
}
