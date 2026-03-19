"use client";

export default function JointEmployerMatrix() {
  var categories = [
    { violation: "Meal Period Scheduling", staffingControl: "None", facilityControl: "Full", penaltyBearer: "Staffing firm (employer of record)", equitable: "Facility controls scheduling — staffing firm cannot change it", tension: "critical" },
    { violation: "Rest Period Availability", staffingControl: "None", facilityControl: "Full", penaltyBearer: "Staffing firm", equitable: "Facility's patient ratios determine rest availability", tension: "critical" },
    { violation: "Overtime Authorization", staffingControl: "Partial", facilityControl: "Primary", penaltyBearer: "Staffing firm", equitable: "Facility mandates shift extensions; staffing firm pays OT", tension: "high" },
    { violation: "Wage Statement Accuracy", staffingControl: "Full", facilityControl: "None", penaltyBearer: "Staffing firm", equitable: "Staffing firm controls payroll — legitimate liability", tension: "aligned" },
    { violation: "Timely Wage Payment", staffingControl: "Full", facilityControl: "None", penaltyBearer: "Staffing firm", equitable: "Staffing firm controls pay processing", tension: "aligned" },
    { violation: "Expense Reimbursement", staffingControl: "Full", facilityControl: "None", penaltyBearer: "Staffing firm", equitable: "Staffing firm sets reimbursement policy", tension: "aligned" },
    { violation: "Travel Time Payment", staffingControl: "Primary", facilityControl: "Partial", penaltyBearer: "Staffing firm", equitable: "Staffing firm assigns multi-facility schedules", tension: "moderate" }
  ];

  function tensionColor(t) {
    if (t === "critical") return "#dc3545";
    if (t === "high") return "#CC8800";
    if (t === "moderate") return "#b85c00";
    return "#4a7a6f";
  }

  function tensionLabel(t) {
    if (t === "critical") return "Misaligned";
    if (t === "high") return "Partially Misaligned";
    if (t === "moderate") return "Moderate Tension";
    return "Properly Aligned";
  }

  return (
    <div className="je-matrix">
      <div className="je-matrix-label">Joint Employer Liability Allocation — Who Controls, Who Pays</div>
      <div className="je-matrix-scroll">
        <table className="je-matrix-table">
          <thead>
            <tr>
              <th className="je-th">Violation Category</th>
              <th className="je-th">Staffing Firm Control</th>
              <th className="je-th">Facility Control</th>
              <th className="je-th">PAGA Penalty Bearer</th>
              <th className="je-th">Alignment</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(function (c, i) {
              return (
                <tr key={i} className="je-row">
                  <td className="je-td je-td-violation">{c.violation}</td>
                  <td className="je-td">{c.staffingControl}</td>
                  <td className="je-td">{c.facilityControl}</td>
                  <td className="je-td je-td-bearer">{c.penaltyBearer}</td>
                  <td className="je-td">
                    <div className="je-tension" style={{ color: tensionColor(c.tension), borderColor: tensionColor(c.tension) }}>
                      {tensionLabel(c.tension)}
                    </div>
                    <div className="je-equitable">{c.equitable}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="je-matrix-footer">
        <div className="je-footer-item">
          <div className="je-footer-dot" style={{ background: "#dc3545" }} />
          <span>Misaligned — staffing firm pays for violations it cannot control</span>
        </div>
        <div className="je-footer-item">
          <div className="je-footer-dot" style={{ background: "#4a7a6f" }} />
          <span>Aligned — staffing firm pays for violations within its operational control</span>
        </div>
      </div>
    </div>
  );
}
