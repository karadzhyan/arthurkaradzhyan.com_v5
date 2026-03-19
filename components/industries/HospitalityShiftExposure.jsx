"use client";

export default function HospitalityShiftExposure() {
  var shifts = [
    {
      name: "Day Shift",
      time: "7:00 AM – 3:30 PM",
      roles: "Front desk, housekeeping, banquet setup, restaurant (breakfast/lunch)",
      mealRisk: 4,
      mealNote: "High — guest check-out surge (10–12 AM) overlaps first meal window. Housekeepers routinely clock short meals to meet room-ready quotas.",
      restRisk: 3,
      restNote: "Moderate — rest periods missed during banquet changeovers and check-out rushes.",
      overtimeRisk: 3,
      overtimeNote: "Pre-shift huddles (Troester) and post-shift room inspections generate 10–15 min unpaid OT daily.",
      keyExposure: "Donohue presumption — every short punch in the time-clock data is a rebuttable presumption"
    },
    {
      name: "Swing Shift",
      time: "3:00 PM – 11:30 PM",
      roles: "Front desk, restaurant (dinner service), bar, room service, events/banquets",
      mealRisk: 5,
      mealNote: "Critical — dinner rush (6–9 PM) and banquet service make 30-min uninterrupted meals structurally impossible for servers and bartenders.",
      restRisk: 4,
      restNote: "High — event-driven scheduling (weddings, conferences) eliminates rest period windows.",
      overtimeRisk: 4,
      overtimeNote: "Events run long. Servers closing out tabs and bartenders restocking after shift end generate systematic off-the-clock work.",
      keyExposure: "Split-shift premium exposure for employees working morning + evening with gaps exceeding 1 hour"
    },
    {
      name: "Night / Graveyard",
      time: "11:00 PM – 7:30 AM",
      roles: "Front desk (skeleton), security, night audit, laundry, housekeeping prep",
      mealRisk: 5,
      mealNote: "Critical — skeleton staffing means pulling one employee for a 30-min break leaves critical functions uncovered. On-duty meal agreements required but often absent or defective.",
      restRisk: 5,
      restNote: "Critical — Augustus requires employees be relieved of all duties. Night audit and solo front desk cannot be relieved.",
      overtimeRisk: 2,
      overtimeNote: "Lower volume, but on-duty meal period premium miscalculation is common.",
      keyExposure: "On-duty meal period agreements under WO 5 § 11(A) — 'nature of work' prerequisite rarely documented"
    }
  ];

  function riskColor(val) {
    if (val === 5) return "#dc3545";
    if (val === 4) return "#CC8800";
    if (val === 3) return "rgba(204,136,0,.5)";
    if (val === 2) return "#8aa39e";
    return "#ddd";
  }

  function riskLabel(val) {
    if (val === 5) return "Critical";
    if (val === 4) return "High";
    if (val === 3) return "Moderate";
    if (val === 2) return "Low";
    return "Minimal";
  }

  return (
    <div className="hosp-shift-exposure">
      <div className="hosp-shift-label">24/7 Exposure Timeline — Violation Intensity by Shift</div>
      <div className="hosp-shifts">
        {shifts.map(function (s, i) {
          var colors = ["#2c3e3a", "#CC8800", "#444"];
          return (
            <div key={i} className="hosp-shift-card" style={{ borderTopColor: colors[i] }}>
              <div className="hosp-shift-header">
                <div className="hosp-shift-name">{s.name}</div>
                <div className="hosp-shift-time">{s.time}</div>
              </div>
              <div className="hosp-shift-roles">{s.roles}</div>

              <div className="hosp-shift-risks">
                {[
                  { label: "Meal Period", risk: s.mealRisk, note: s.mealNote },
                  { label: "Rest Period", risk: s.restRisk, note: s.restNote },
                  { label: "Overtime / OTC", risk: s.overtimeRisk, note: s.overtimeNote }
                ].map(function (r, j) {
                  return (
                    <div key={j} className="hosp-shift-risk">
                      <div className="hosp-shift-risk-header">
                        <span className="hosp-shift-risk-label">{r.label}</span>
                        <span className="hosp-shift-risk-badge" style={{ color: riskColor(r.risk), borderColor: riskColor(r.risk) }}>
                          {riskLabel(r.risk)}
                        </span>
                      </div>
                      <div className="hosp-shift-risk-blocks">
                        {[1, 2, 3, 4, 5].map(function (n) {
                          return <div key={n} className="hosp-shift-block" style={{ background: n <= r.risk ? riskColor(r.risk) : "#f0f0f0" }} />;
                        })}
                      </div>
                      <div className="hosp-shift-risk-note">{r.note}</div>
                    </div>
                  );
                })}
              </div>

              <div className="hosp-shift-key-exposure">{s.keyExposure}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
