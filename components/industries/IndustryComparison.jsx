"use client";

import Link from "next/link";

export default function IndustryComparison() {
  var rows = [
    {
      industry: "Hospitality",
      slug: "hospitality",
      wageOrder: "WO 5",
      exposureCats: 7,
      authorities: 4,
      strategies: 4,
      riskScore: 26,
      primaryDriver: "Donohue presumption × 24/7 operations",
      metric: "24/7 × Donohue",
      topExposure: "Meal/rest period cascade"
    },
    {
      industry: "Automotive",
      slug: "automotive-dealerships",
      wageOrder: "WO 7",
      exposureCats: 7,
      authorities: 4,
      strategies: 4,
      riskScore: 25,
      primaryDriver: "Commission forfeiture + regular rate complexity",
      metric: "$0 at departure",
      topExposure: "Sciborski commission forfeiture"
    },
    {
      industry: "Healthcare",
      slug: "healthcare-staffing",
      wageOrder: "WO 4/5",
      exposureCats: 7,
      authorities: 4,
      strategies: 4,
      riskScore: 27,
      primaryDriver: "Joint employer + multi-worksite manageability",
      metric: "14 worksites, 1 PAGA",
      topExposure: "Joint employer penalty allocation"
    },
    {
      industry: "Solar / Energy",
      slug: "solar-energy",
      wageOrder: "WO 16",
      exposureCats: 7,
      authorities: 4,
      strategies: 4,
      riskScore: 28,
      primaryDriver: "AWS invalidity retroactive overtime",
      metric: "2 hrs/day retro OT",
      topExposure: "Alternative workweek invalidity"
    },
    {
      industry: "Technology",
      slug: "technology-startups",
      wageOrder: "WO 4",
      exposureCats: 7,
      authorities: 4,
      strategies: 4,
      riskScore: 22,
      primaryDriver: "§ 515.5 misclassification + § 2802 remote work",
      metric: "§ 515.5 ≠ exempt",
      topExposure: "Classification + reimbursement"
    },
    {
      industry: "Agriculture",
      slug: "agriculture",
      wageOrder: "WO 14",
      exposureCats: 7,
      authorities: 4,
      strategies: 4,
      riskScore: 28,
      primaryDriver: "Piece-rate legacy gap + seasonal final pay",
      metric: "100+ emp, no records",
      topExposure: "§ 226.2 piece-rate non-productive"
    }
  ];

  var maxScore = 35;

  return (
    <div className="ind-comparison">
      <div className="ind-comparison-scroll">
        <table className="ind-comparison-table">
          <thead>
            <tr>
              <th className="ind-comp-th ind-comp-th-name">Industry</th>
              <th className="ind-comp-th">Wage Order</th>
              <th className="ind-comp-th ind-comp-th-center">Risk Score</th>
              <th className="ind-comp-th">Primary Exposure Driver</th>
              <th className="ind-comp-th">Key Metric</th>
            </tr>
          </thead>
          <tbody>
            {rows.sort(function (a, b) { return b.riskScore - a.riskScore; }).map(function (r, i) {
              var pct = Math.round(r.riskScore / maxScore * 100);
              var color = r.riskScore >= 27 ? "#dc3545" : r.riskScore >= 24 ? "#CC8800" : "#4a7a6f";
              return (
                <tr key={i} className="ind-comp-row">
                  <td className="ind-comp-td ind-comp-td-name">
                    <Link href={"/industries/" + r.slug} className="ind-comp-link">{r.industry}</Link>
                  </td>
                  <td className="ind-comp-td ind-comp-td-wo">{r.wageOrder}</td>
                  <td className="ind-comp-td ind-comp-td-score">
                    <div className="ind-comp-score-bar">
                      <div className="ind-comp-score-fill" style={{ width: pct + "%", background: color }} />
                    </div>
                    <div className="ind-comp-score-num" style={{ color: color }}>{r.riskScore}<span className="ind-comp-score-max">/{maxScore}</span></div>
                  </td>
                  <td className="ind-comp-td ind-comp-td-driver">{r.primaryDriver}</td>
                  <td className="ind-comp-td ind-comp-td-metric">{r.metric}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
