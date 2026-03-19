"use client";

import Link from "next/link";
import { caseLaw } from "@/data/caseLaw";

export default function SharedAuthorities() {
  var authorities = [
    {
      case: "Donohue",
      cite: "(2021) 11 Cal.5th 58",
      doctrine: "Meal period presumption",
      industries: ["Hospitality", "Healthcare", "Solar", "Agriculture"],
      universality: "high",
      impact: "Every industry with time-clock data showing short meal punches"
    },
    {
      case: "Brinker",
      cite: "(2012) 53 Cal.4th 1004",
      doctrine: "Provide-not-ensure standard",
      industries: ["Hospitality", "Healthcare", "Solar", "Agriculture", "Automotive", "Technology"],
      universality: "universal",
      impact: "Foundation for every meal period defense across all industries"
    },
    {
      case: "Ferra",
      cite: "(2021) 11 Cal.5th 858",
      doctrine: "Regular rate for premiums",
      industries: ["Hospitality", "Automotive", "Solar", "Healthcare", "Agriculture", "Technology"],
      universality: "universal",
      impact: "Any employer paying premiums at base rate instead of regular rate"
    },
    {
      case: "Alvarado",
      cite: "(2018) 4 Cal.5th 542",
      doctrine: "Flat-sum bonus methodology",
      industries: ["Hospitality", "Automotive", "Solar"],
      universality: "high",
      impact: "Industries with attendance bonuses, production bonuses, spiffs"
    },
    {
      case: "Naranjo",
      cite: "(2022) 13 Cal.5th 93",
      doctrine: "Derivative penalty cascade",
      industries: ["Hospitality", "Healthcare", "Solar", "Agriculture", "Automotive", "Technology"],
      universality: "universal",
      impact: "Every meal/rest premium creates § 226 + § 203 derivative exposure"
    },
    {
      case: "ZB, N.A.",
      cite: "(2019) 8 Cal.5th 175",
      doctrine: "Recoverability framework",
      industries: ["Hospitality", "Healthcare", "Solar", "Agriculture", "Automotive", "Technology"],
      universality: "universal",
      impact: "Strips 30-50% from every PAGA demand regardless of industry"
    },
    {
      case: "Estrada",
      cite: "(2024) 15 Cal.5th 582",
      doctrine: "Manageability / scope limitation",
      industries: ["Healthcare", "Hospitality", "Agriculture"],
      universality: "high",
      impact: "Multi-location employers with diverse job classifications"
    },
    {
      case: "Sciborski",
      cite: "(2012) 205 Cal.App.4th 1152",
      doctrine: "Commission forfeiture",
      industries: ["Automotive"],
      universality: "specific",
      impact: "Dealership-specific — commissions earned at closing, not funding"
    },
    {
      case: "Morillion",
      cite: "(2000) 22 Cal.4th 575",
      doctrine: "Compensable travel time",
      industries: ["Solar", "Healthcare", "Agriculture"],
      universality: "medium",
      impact: "Employer-directed travel from reporting location to worksite"
    }
  ];

  function findSlug(name) {
    var match = caseLaw.find(function (c) {
      return c.case.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    });
    return match ? match.slug : null;
  }

  function universalityColor(u) {
    if (u === "universal") return "#2c3e3a";
    if (u === "high") return "#CC8800";
    if (u === "medium") return "#8aa39e";
    return "#999";
  }

  return (
    <div className="shared-auth">
      <div className="shared-auth-grid">
        {authorities.map(function (a, i) {
          var slug = findSlug(a.case);
          return (
            <div key={i} className="shared-auth-card" style={{ borderLeftColor: universalityColor(a.universality) }}>
              <div className="shared-auth-top">
                <div className="shared-auth-case">
                  {slug ? (
                    <Link href={"/cases/" + slug} className="shared-auth-link">{a.case}</Link>
                  ) : (
                    <span className="shared-auth-name">{a.case}</span>
                  )}
                </div>
                <div className="shared-auth-badge" style={{
                  color: universalityColor(a.universality),
                  borderColor: universalityColor(a.universality)
                }}>
                  {a.industries.length}/6
                </div>
              </div>
              <div className="shared-auth-doctrine">{a.doctrine}</div>
              <div className="shared-auth-impact">{a.impact}</div>
              <div className="shared-auth-industries">
                {a.industries.map(function (ind, j) {
                  return <span key={j} className="shared-auth-ind">{ind}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
