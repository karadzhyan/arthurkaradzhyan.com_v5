"use client";

export default function WageOrderMap() {
  var orders = [
    {
      number: "WO 4",
      name: "Professional, Technical, Clerical",
      industries: ["Technology & Startups", "Healthcare (clinical staff)"],
      keyProvisions: [
        { provision: "Computer professional exemption (§ 515.5)", note: "$56.97/hr minimum (2025)" },
        { provision: "Administrative exemption duties test", note: "'Directly related to management policies'" },
        { provision: "Professional exemption", note: "Licensed professionals, learned professions" }
      ],
      mealRule: "Standard — 30 min before 5th hour",
      otRule: "Standard — 8/day, 40/week"
    },
    {
      number: "WO 5",
      name: "Public Housekeeping Industry",
      industries: ["Hospitality", "Healthcare (facility staff)"],
      keyProvisions: [
        { provision: "On-duty meal period agreements", note: "Available when 'nature of work' prevents relief" },
        { provision: "Tip pooling under § 351", note: "Managers/supervisors excluded (narrow definition)" },
        { provision: "Split-shift premium", note: "1 hr at minimum wage for non-consecutive shifts" }
      ],
      mealRule: "Standard + on-duty meal option",
      otRule: "Standard — 8/day, 40/week"
    },
    {
      number: "WO 7",
      name: "Mercantile Industry",
      industries: ["Automotive (Dealerships)"],
      keyProvisions: [
        { provision: "Commissioned-employee OT exemption", note: "Workweek-by-workweek verification required" },
        { provision: "§ 204.1 commission payment timing", note: "Must pay earned commissions per schedule" },
        { provision: "Regular rate for complex comp plans", note: "Draws, spiffs, holdbacks, volume escalators" }
      ],
      mealRule: "Standard — 30 min before 5th hour",
      otRule: "Standard unless commissioned exemption applies"
    },
    {
      number: "WO 14",
      name: "Agricultural Occupations",
      industries: ["Agriculture"],
      keyProvisions: [
        { provision: "AB 1066 overtime phase-out", note: "Now 8/day, 40/week (phased in 2022)" },
        { provision: "Piece-rate compensation (§ 226.2)", note: "Separate rest/non-productive time pay required" },
        { provision: "Heat illness prevention", note: "Cal/OSHA T8 § 3395 — shade, water, rest" }
      ],
      mealRule: "Standard — 30 min before 5th hour",
      otRule: "Standard (post-AB 1066 phase-in)"
    },
    {
      number: "WO 16",
      name: "On-Site Construction",
      industries: ["Solar & Energy (installation)"],
      keyProvisions: [
        { provision: "Alternative workweek schedules (§ 511)", note: "4-step election — failure invalidates retroactively" },
        { provision: "Travel time from yard to site", note: "Employer-directed travel is compensable (Morillion)" },
        { provision: "Piece-rate non-productive time", note: "§ 226.2 applies to per-panel/per-system pay" }
      ],
      mealRule: "Standard — 30 min before 5th hour",
      otRule: "Standard unless valid AWS (4/10, 3/12)"
    }
  ];

  return (
    <div className="wo-map">
      <div className="wo-map-grid">
        {orders.map(function (wo, i) {
          return (
            <div key={i} className="wo-card">
              <div className="wo-card-header">
                <div className="wo-card-num">{wo.number}</div>
                <div className="wo-card-name">{wo.name}</div>
              </div>
              <div className="wo-card-industries">
                {wo.industries.map(function (ind, j) {
                  return <span key={j} className="wo-card-ind">{ind}</span>;
                })}
              </div>
              <div className="wo-card-provisions">
                {wo.keyProvisions.map(function (p, j) {
                  return (
                    <div key={j} className="wo-provision">
                      <div className="wo-provision-name">{p.provision}</div>
                      <div className="wo-provision-note">{p.note}</div>
                    </div>
                  );
                })}
              </div>
              <div className="wo-card-rules">
                <div className="wo-rule">
                  <span className="wo-rule-label">Meal:</span> {wo.mealRule}
                </div>
                <div className="wo-rule">
                  <span className="wo-rule-label">OT:</span> {wo.otRule}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
