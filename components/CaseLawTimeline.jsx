"use client";

import Link from "next/link";
import { caseLaw } from "@/data/caseLaw";

export default function CaseLawTimeline() {
  var milestones = [
    { year: 2012, cases: ["Brinker", "Kirby"], shift: "Foundation", desc: "Provide-not-ensure standard · Premiums classified as wages" },
    { year: 2014, cases: ["Duran"], shift: "Due Process", desc: "Constitutional floor for statistical sampling at trial" },
    { year: 2018, cases: ["Alvarado"], shift: "Regular Rate", desc: "Flat-sum bonus methodology changes every overtime calculation" },
    { year: 2019, cases: ["ZB, N.A."], shift: "Recoverability", desc: "Wages ≠ penalties — strips 30–50% from inflated PAGA demands" },
    { year: 2021, cases: ["Donohue", "Ferra"], shift: "Burden Shift", desc: "Rebuttable presumption + regular rate for premiums · Retroactive" },
    { year: 2022, cases: ["Naranjo"], shift: "Cascade", desc: "One violation → four penalty streams · Derivative exposure multiplier" },
    { year: 2023, cases: ["Adolph"], shift: "Standing", desc: "Individual claims to arbitration, representative PAGA stays in court" },
    { year: 2024, cases: ["Estrada"], shift: "Manageability", desc: "Cannot dismiss on manageability — but can narrow scope dramatically" },
    { year: 2025, cases: ["Hohenshelt"], shift: "Arbitration", desc: "Five years of strict-liability forfeiture authority — reversed" },
    { year: 2026, cases: ["Leeper"], shift: "Pending", desc: "Headless PAGA — the most significant pending question" }
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
                <div className="timeline-node-dot" />
                {i < milestones.length - 1 && <div className="timeline-node-line" />}
              </div>
              <div className="timeline-node-content">
                <div className="timeline-node-year">{m.year}</div>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
