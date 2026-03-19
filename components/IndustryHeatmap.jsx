"use client";

import Link from "next/link";
import { industries as industryData } from "@/data/industries";

export default function IndustryHeatmap() {
  var violations = [
    { key: "meal", label: "Meal Period" },
    { key: "rest", label: "Rest Period" },
    { key: "ot", label: "OT / Rate" },
    { key: "wage", label: "Wage Stmt" },
    { key: "reimb", label: "Reimburse" },
    { key: "timing", label: "Final Pay" },
    { key: "class", label: "Misclass." }
  ];

  var rows = [
    {
      industry: "Hospitality", slug: "hospitality",
      data: { meal: 5, rest: 5, ot: 3, wage: 4, reimb: 2, timing: 3, class: 4 },
      keyRisk: "24/7 ops + Donohue presumption",
      wageOrder: "WO 5",
      topCase: "Donohue v. AMN"
    },
    {
      industry: "Automotive", slug: "automotive-dealerships",
      data: { meal: 3, rest: 3, ot: 5, wage: 4, reimb: 2, timing: 5, class: 3 },
      keyRisk: "Commission forfeiture at departure",
      wageOrder: "WO 7",
      topCase: "Sciborski"
    },
    {
      industry: "Healthcare", slug: "healthcare-staffing",
      data: { meal: 5, rest: 4, ot: 4, wage: 3, reimb: 3, timing: 3, class: 5 },
      keyRisk: "Joint employer + multi-worksite",
      wageOrder: "WO 4/5",
      topCase: "Dynamex / ABC test"
    },
    {
      industry: "Solar / Energy", slug: "solar-energy",
      data: { meal: 4, rest: 4, ot: 5, wage: 4, reimb: 5, timing: 3, class: 3 },
      keyRisk: "Travel time + piece-rate gaps",
      wageOrder: "WO 16",
      topCase: "Troester"
    },
    {
      industry: "Technology", slug: "technology-startups",
      data: { meal: 2, rest: 2, ot: 3, wage: 3, reimb: 5, timing: 2, class: 5 },
      keyRisk: "§ 2802 remote + exemption risk",
      wageOrder: "WO 4",
      topCase: "§ 515.5 / Dynamex"
    },
    {
      industry: "Agriculture", slug: "agriculture",
      data: { meal: 4, rest: 4, ot: 4, wage: 5, reimb: 3, timing: 5, class: 3 },
      keyRisk: "Piece-rate + seasonal final pay",
      wageOrder: "WO 14",
      topCase: "§ 226.2"
    }
  ];

  function intensityColor(val) {
    if (val === 5) return { bg: "#dc3545", color: "#fff" };
    if (val === 4) return { bg: "#CC8800", color: "#fff" };
    if (val === 3) return { bg: "rgba(204,136,0,.2)", color: "#8a6600" };
    if (val === 2) return { bg: "rgba(44,62,58,.08)", color: "#666" };
    return { bg: "transparent", color: "#ccc" };
  }

  function intensityLabel(val) {
    if (val === 5) return "Critical";
    if (val === 4) return "High";
    if (val === 3) return "Moderate";
    if (val === 2) return "Low";
    return "Minimal";
  }

  var columnTotals = violations.map(function (v) {
    return rows.reduce(function (s, r) { return s + r.data[v.key]; }, 0);
  });

  var rowTotals = rows.map(function (r) {
    return violations.reduce(function (s, v) { return s + r.data[v.key]; }, 0);
  });

  var criticalCombos = [
    { industry: "Hospitality", combo: "Meal (5) + Rest (5)", note: "Donohue presumption creates near-automatic exposure in 24/7 operations" },
    { industry: "Automotive", combo: "OT (5) + Final Pay (5)", note: "Commission regular rate errors compound with departure timing violations" },
    { industry: "Healthcare", combo: "Meal (5) + Misclass. (5)", note: "Joint employer status across staffing arrangements creates dual liability" },
    { industry: "Solar", combo: "OT (5) + Reimburse (5)", note: "Travel time classification + vehicle/tool reimbursement gaps" }
  ];

  return (
    <div className="heatmap">
      <div className="heatmap-scroll">
        <table className="heatmap-table">
          <thead>
            <tr>
              <th className="heatmap-th heatmap-th-industry" />
              {violations.map(function (v) {
                return <th key={v.key} className="heatmap-th">{v.label}</th>;
              })}
              <th className="heatmap-th heatmap-th-num">Score</th>
              <th className="heatmap-th heatmap-th-risk">Key Risk</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(function (row, i) {
              return (
                <tr key={i} className="heatmap-row">
                  <td className="heatmap-td heatmap-td-industry">
                    <Link href={"/industries/" + row.slug} className="heatmap-industry-link">{row.industry}</Link>
                    <div className="heatmap-td-wo">{row.wageOrder}</div>
                  </td>
                  {violations.map(function (v) {
                    var val = row.data[v.key];
                    var style = intensityColor(val);
                    return (
                      <td key={v.key} className="heatmap-td heatmap-td-cell" style={{
                        background: style.bg,
                        color: style.color
                      }}>
                        <div className="heatmap-cell-val">{val}</div>
                        <div className="heatmap-cell-label">{intensityLabel(val)}</div>
                      </td>
                    );
                  })}
                  <td className="heatmap-td heatmap-td-score">
                    <div className="heatmap-score">{rowTotals[i]}<span className="heatmap-score-max">/35</span></div>
                  </td>
                  <td className="heatmap-td heatmap-td-risk">{row.keyRisk}</td>
                </tr>
              );
            })}
            <tr className="heatmap-row heatmap-row-totals">
              <td className="heatmap-td heatmap-td-industry" style={{ fontWeight: 700 }}>Avg.</td>
              {columnTotals.map(function (t, i) {
                var avg = (t / rows.length).toFixed(1);
                return (
                  <td key={i} className="heatmap-td heatmap-td-avg">{avg}</td>
                );
              })}
              <td className="heatmap-td" />
              <td className="heatmap-td heatmap-td-risk" style={{ fontStyle: "normal", color: "#666" }}>Cross-industry average</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="heatmap-combos">
        <div className="heatmap-combos-title">Critical Exposure Combinations</div>
        <div className="heatmap-combos-grid">
          {criticalCombos.map(function (c, i) {
            return (
              <div key={i} className="heatmap-combo">
                <div className="heatmap-combo-industry">{c.industry}</div>
                <div className="heatmap-combo-pair">{c.combo}</div>
                <div className="heatmap-combo-note">{c.note}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="heatmap-legend">
        {[
          { val: 5, label: "Critical — near-certain exposure" },
          { val: 4, label: "High — structural vulnerability" },
          { val: 3, label: "Moderate — depends on practices" },
          { val: 2, label: "Low — limited but present" }
        ].map(function (item) {
          var style = intensityColor(item.val);
          return (
            <div key={item.val} className="heatmap-legend-item">
              <span className="heatmap-legend-swatch" style={{ background: style.bg }} />
              <span className="heatmap-legend-label">{item.val} — {item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
