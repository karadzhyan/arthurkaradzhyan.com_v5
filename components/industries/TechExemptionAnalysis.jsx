"use client";

export default function TechExemptionAnalysis() {
  var roles = [
    {
      title: "Senior Software Engineer",
      salary: "$185,000",
      passesThreshold: true,
      dutiesTest: "pass",
      analysis: "Intellectual and creative work requiring discretion and independent judgment. Designs system architecture, makes technology decisions, reviews junior engineers' code. Strong exemption.",
      risk: "Low"
    },
    {
      title: "QA Engineer",
      salary: "$95,000",
      passesThreshold: true,
      dutiesTest: "fail",
      analysis: "Primarily tests against predefined specifications. Follows established test plans, reports bugs to predefined criteria. Limited discretion — executes, does not design. Duties test fails.",
      risk: "Critical"
    },
    {
      title: "IT Support Specialist",
      salary: "$72,000",
      passesThreshold: true,
      dutiesTest: "fail",
      analysis: "Follows established troubleshooting protocols. Escalates complex issues to senior staff. Work is procedural, not intellectual or creative. Clear exemption failure.",
      risk: "Critical"
    },
    {
      title: "Junior Developer",
      salary: "$80,000",
      passesThreshold: true,
      dutiesTest: "borderline",
      analysis: "Writes code, but substantial time on rote tasks: data entry, manual testing, documentation, bug fixes from detailed tickets. 'Primarily engaged' test is the question — if more than 50% of time is non-exempt work, exemption fails.",
      risk: "High"
    },
    {
      title: "Technical Project Manager",
      salary: "$140,000",
      passesThreshold: true,
      dutiesTest: "fail",
      analysis: "Work is primarily organizational, not technical. Scheduling, resource allocation, status reporting, stakeholder communication. Computer professional exemption requires technical work, not management of technical workers.",
      risk: "High"
    },
    {
      title: "Data Analyst",
      salary: "$90,000",
      passesThreshold: true,
      dutiesTest: "borderline",
      analysis: "Runs queries against predefined schemas, generates reports from templates. Some original analysis requiring judgment, but substantial time on routine data extraction. Borderline — depends on the specific mix of duties.",
      risk: "Moderate"
    }
  ];

  var threshold2025 = "$56.97/hr ($118,657.43/yr)";

  function riskColor(r) {
    if (r === "Critical") return "#dc3545";
    if (r === "High") return "#CC8800";
    if (r === "Moderate") return "#b85c00";
    return "#4a7a6f";
  }

  function dutiesColor(d) {
    if (d === "pass") return "#4a7a6f";
    if (d === "fail") return "#dc3545";
    return "#CC8800";
  }

  return (
    <div className="tech-exempt">
      <div className="tech-exempt-label">§ 515.5 Computer Professional Exemption — Role-by-Role Duties Analysis</div>
      <div className="tech-exempt-threshold">
        2025 Minimum Threshold: <strong>{threshold2025}</strong> — adjusts annually
      </div>
      <div className="tech-exempt-roles">
        {roles.map(function (r, i) {
          return (
            <div key={i} className="tech-exempt-role" style={{ borderLeftColor: riskColor(r.risk) }}>
              <div className="tech-exempt-role-header">
                <div className="tech-exempt-role-title">{r.title}</div>
                <div className="tech-exempt-role-salary">{r.salary}</div>
              </div>
              <div className="tech-exempt-tests">
                <div className="tech-exempt-test">
                  <span className="tech-exempt-test-label">Salary:</span>
                  <span className={"tech-exempt-test-val"} style={{ color: r.passesThreshold ? "#4a7a6f" : "#dc3545" }}>
                    {r.passesThreshold ? "Passes" : "Fails"}
                  </span>
                </div>
                <div className="tech-exempt-test">
                  <span className="tech-exempt-test-label">Duties:</span>
                  <span className="tech-exempt-test-val" style={{ color: dutiesColor(r.dutiesTest) }}>
                    {r.dutiesTest === "pass" ? "Passes" : r.dutiesTest === "fail" ? "Fails" : "Borderline"}
                  </span>
                </div>
                <div className="tech-exempt-test">
                  <span className="tech-exempt-test-label">Risk:</span>
                  <span className="tech-exempt-test-val" style={{ color: riskColor(r.risk) }}>{r.risk}</span>
                </div>
              </div>
              <div className="tech-exempt-analysis">{r.analysis}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
