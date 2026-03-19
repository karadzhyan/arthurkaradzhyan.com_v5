"use client";

import Link from "next/link";
import { caseLaw } from "@/data/caseLaw";

export default function DoctrineMap() {
  var doctrines = [
    { key: "meal", label: "Meal/Rest" },
    { key: "rate", label: "Regular Rate" },
    { key: "recover", label: "Recoverability" },
    { key: "standing", label: "Standing" },
    { key: "manage", label: "Manageability" },
    { key: "arb", label: "Arbitration" },
    { key: "sampling", label: "Sampling" },
    { key: "derivative", label: "Derivative Penalties" }
  ];

  var cases = [
    { name: "Brinker", year: 2012, doctrines: { meal: "primary", rate: "", recover: "", standing: "", manage: "", arb: "", sampling: "", derivative: "" } },
    { name: "Kirby", year: 2012, doctrines: { meal: "related", rate: "", recover: "primary", standing: "", manage: "", arb: "", sampling: "", derivative: "" } },
    { name: "Duran", year: 2014, doctrines: { meal: "", rate: "", recover: "", standing: "", manage: "related", arb: "", sampling: "primary", derivative: "" } },
    { name: "Alvarado", year: 2018, doctrines: { meal: "", rate: "primary", recover: "", standing: "", manage: "", arb: "", sampling: "", derivative: "" } },
    { name: "ZB, N.A.", year: 2019, doctrines: { meal: "", rate: "", recover: "primary", standing: "", manage: "", arb: "", sampling: "", derivative: "" } },
    { name: "Donohue", year: 2021, doctrines: { meal: "primary", rate: "", recover: "", standing: "", manage: "", arb: "", sampling: "", derivative: "related" } },
    { name: "Ferra", year: 2021, doctrines: { meal: "related", rate: "primary", recover: "", standing: "", manage: "", arb: "", sampling: "", derivative: "related" } },
    { name: "Naranjo", year: 2022, doctrines: { meal: "related", rate: "", recover: "related", standing: "", manage: "", arb: "", sampling: "", derivative: "primary" } },
    { name: "Adolph", year: 2023, doctrines: { meal: "", rate: "", recover: "", standing: "primary", manage: "", arb: "related", sampling: "", derivative: "" } },
    { name: "Estrada", year: 2024, doctrines: { meal: "", rate: "", recover: "", standing: "", manage: "primary", arb: "", sampling: "related", derivative: "" } },
    { name: "Hohenshelt", year: 2025, doctrines: { meal: "", rate: "", recover: "", standing: "", manage: "", arb: "primary", sampling: "", derivative: "" } },
    { name: "Leeper", year: 2026, doctrines: { meal: "", rate: "", recover: "", standing: "primary", manage: "", arb: "related", sampling: "", derivative: "" } }
  ];

  function findSlug(name) {
    var match = caseLaw.find(function (c) {
      return c.case.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    });
    return match ? match.slug : null;
  }

  function cellStyle(val) {
    if (val === "primary") return { bg: "#2c3e3a", color: "#fff", label: "Governs" };
    if (val === "related") return { bg: "rgba(44,62,58,.12)", color: "#2c3e3a", label: "Affects" };
    return { bg: "transparent", color: "transparent", label: "" };
  }

  return (
    <div className="doctrine-map">
      <div className="doctrine-map-scroll">
        <table className="doctrine-map-table">
          <thead>
            <tr>
              <th className="doctrine-th doctrine-th-case">Case</th>
              <th className="doctrine-th doctrine-th-year">Year</th>
              {doctrines.map(function (d) {
                return <th key={d.key} className="doctrine-th">{d.label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {cases.map(function (c, i) {
              var slug = findSlug(c.name);
              var isPending = c.year === 2026;
              return (
                <tr key={i} className={"doctrine-row" + (isPending ? " doctrine-row-pending" : "")}>
                  <td className="doctrine-td doctrine-td-case">
                    {slug ? (
                      <Link href={"/cases/" + slug} className="doctrine-case-link">
                        {c.name}
                      </Link>
                    ) : (
                      <span className="doctrine-case-name">{c.name}</span>
                    )}
                  </td>
                  <td className="doctrine-td doctrine-td-year">{c.year}</td>
                  {doctrines.map(function (d) {
                    var val = c.doctrines[d.key];
                    var style = cellStyle(val);
                    return (
                      <td key={d.key} className="doctrine-td doctrine-td-cell" style={{
                        background: style.bg,
                        color: style.color
                      }}>
                        {val && (
                          <div className="doctrine-cell-dot" style={{
                            background: val === "primary" ? "#fff" : "#2c3e3a"
                          }} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="doctrine-map-legend">
        <div className="doctrine-legend-item">
          <span className="doctrine-legend-swatch" style={{ background: "#2c3e3a" }} />
          <span className="doctrine-legend-label">Governs — primary authority for this doctrine</span>
        </div>
        <div className="doctrine-legend-item">
          <span className="doctrine-legend-swatch" style={{ background: "rgba(44,62,58,.12)" }} />
          <span className="doctrine-legend-label">Affects — modifies or interacts with doctrine</span>
        </div>
      </div>
    </div>
  );
}
