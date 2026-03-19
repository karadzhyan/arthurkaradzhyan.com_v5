"use client";

export default function SeasonalWorkforceTimeline() {
  var phases = [
    {
      season: "Pre-Season Hiring",
      months: "Feb – Mar",
      workforce: "Scaling up",
      riskCategories: [
        { risk: "Classification", detail: "Labor contractor vs. direct hire — ABC test under Dynamex determines status", level: 3 },
        { risk: "Written Agreements", detail: "§ 2751 commission/piece-rate agreements must be executed before work begins", level: 4 }
      ],
      color: "#4a7a6f"
    },
    {
      season: "Peak Harvest",
      months: "Apr – Oct",
      workforce: "100+ field workers",
      riskCategories: [
        { risk: "Piece-Rate Compliance", detail: "§ 226.2 rest period and non-productive time compensation — every shift, every worker", level: 5 },
        { risk: "Heat Illness Prevention", detail: "Cal/OSHA § 3395 — shade, water (1 qt/hr), cool-down rest, training documentation", level: 5 },
        { risk: "Overtime (AB 1066)", detail: "Agricultural overtime now at 8/day, 40/week — phased in by 2022, many operations still adjusting", level: 4 },
        { risk: "Wage Statement Accuracy", detail: "§ 226(a) — must separately identify piece-rate, rest period pay, and non-productive time on every statement", level: 4 }
      ],
      color: "#dc3545"
    },
    {
      season: "Wind-Down",
      months: "Oct – Nov",
      workforce: "Rapid separation",
      riskCategories: [
        { risk: "Final Pay Timing", detail: "§§ 201–203 — is end of season a 'discharge' (immediate pay) or 'resignation' (72 hrs)? Most treat as neither.", level: 5 },
        { risk: "Waiting Time Penalties", detail: "§ 203 — up to 30 days × daily wages per employee. With 100+ employees separating simultaneously, exposure is enormous.", level: 5 },
        { risk: "Record Retention", detail: "Payroll records, time records, piece-rate records must be retained — frequently lost during seasonal transitions", level: 3 }
      ],
      color: "#CC8800"
    },
    {
      season: "Off-Season",
      months: "Dec – Jan",
      workforce: "Minimal / skeleton",
      riskCategories: [
        { risk: "Claims Filing Window", detail: "Separated employees file DLSE complaints or join PAGA actions. The 1-year statutory period begins running.", level: 3 },
        { risk: "Audit & Remediation", detail: "Window to audit payroll systems, fix § 226.2 calculations, update heat illness training, revise final pay procedures", level: 2 }
      ],
      color: "#8aa39e"
    }
  ];

  function levelColor(l) {
    if (l === 5) return "#dc3545";
    if (l === 4) return "#CC8800";
    if (l === 3) return "rgba(204,136,0,.5)";
    if (l === 2) return "#8aa39e";
    return "#ddd";
  }

  return (
    <div className="seasonal-timeline">
      <div className="seasonal-label">Seasonal Workforce Lifecycle — Compliance Obligations by Phase</div>
      <div className="seasonal-phases">
        {phases.map(function (p, i) {
          return (
            <div key={i} className="seasonal-phase" style={{ borderTopColor: p.color }}>
              <div className="seasonal-phase-header">
                <div className="seasonal-phase-name" style={{ color: p.color }}>{p.season}</div>
                <div className="seasonal-phase-months">{p.months}</div>
                <div className="seasonal-phase-workforce">{p.workforce}</div>
              </div>
              <div className="seasonal-risks">
                {p.riskCategories.map(function (r, j) {
                  return (
                    <div key={j} className="seasonal-risk">
                      <div className="seasonal-risk-header">
                        <span className="seasonal-risk-name">{r.risk}</span>
                        <span className="seasonal-risk-blocks">
                          {[1, 2, 3, 4, 5].map(function (n) {
                            return <span key={n} className="seasonal-block" style={{ background: n <= r.level ? levelColor(r.level) : "#f0f0f0" }} />;
                          })}
                        </span>
                      </div>
                      <div className="seasonal-risk-detail">{r.detail}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
