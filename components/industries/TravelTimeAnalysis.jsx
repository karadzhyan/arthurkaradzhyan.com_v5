"use client";

export default function TravelTimeAnalysis() {
  var segments = [
    {
      label: "Home → Employer Yard",
      time: "6:00 – 6:30 AM",
      duration: "30 min",
      compensable: false,
      reason: "Normal commute — employee's choice of residence. Not employer-directed travel.",
      color: "#999"
    },
    {
      label: "Yard — Equipment Load",
      time: "6:30 – 7:00 AM",
      duration: "30 min",
      compensable: true,
      reason: "Employer-required activity at employer-designated location. Loading equipment, vehicle inspection, crew assignment.",
      color: "#2c3e3a"
    },
    {
      label: "Yard → Remote Install Site",
      time: "7:00 – 8:15 AM",
      duration: "1 hr 15 min",
      compensable: true,
      reason: "Employer-directed travel from employer-designated yard to worksite. Under Morillion v. Royal Packing, travel in employer-provided vehicles from a required reporting location is compensable.",
      color: "#CC8800"
    },
    {
      label: "Installation Work",
      time: "8:15 AM – 5:00 PM",
      duration: "8 hr 45 min",
      compensable: true,
      reason: "Productive work — panel installation, wiring, inspection preparation.",
      color: "#4a7a6f"
    },
    {
      label: "Site → Employer Yard",
      time: "5:00 – 6:15 PM",
      duration: "1 hr 15 min",
      compensable: true,
      reason: "Return travel in employer vehicle to employer-designated yard. Compensable under Morillion.",
      color: "#CC8800"
    },
    {
      label: "Yard — Equipment Unload",
      time: "6:15 – 6:30 PM",
      duration: "15 min",
      compensable: true,
      reason: "Employer-required post-shift activity. Equipment return, vehicle check-in.",
      color: "#2c3e3a"
    },
    {
      label: "Employer Yard → Home",
      time: "6:30 – 7:00 PM",
      duration: "30 min",
      compensable: false,
      reason: "Normal commute home.",
      color: "#999"
    }
  ];

  var compHours = 0;
  segments.forEach(function (s) {
    if (s.compensable) {
      var parts = s.duration.split(" ");
      var hrs = 0;
      for (var j = 0; j < parts.length; j++) {
        if (parts[j] === "hr" || parts[j] === "hrs") hrs += parseInt(parts[j - 1]);
        if (parts[j] === "min") hrs += parseInt(parts[j - 1]) / 60;
      }
      compHours += hrs;
    }
  });

  return (
    <div className="travel-analysis">
      <div className="travel-analysis-label">Daily Travel Time Analysis — Yard Reporting Model</div>
      <div className="travel-segments">
        {segments.map(function (s, i) {
          return (
            <div key={i} className={"travel-segment" + (s.compensable ? " travel-comp" : " travel-noncomp")}>
              <div className="travel-seg-left">
                <div className="travel-seg-dot" style={{ background: s.color }} />
                {i < segments.length - 1 && <div className="travel-seg-line" />}
              </div>
              <div className="travel-seg-right">
                <div className="travel-seg-header">
                  <div className="travel-seg-label">{s.label}</div>
                  <div className="travel-seg-time">{s.time}</div>
                  <div className="travel-seg-duration">{s.duration}</div>
                  <div className={"travel-seg-badge" + (s.compensable ? " travel-badge-yes" : " travel-badge-no")}>
                    {s.compensable ? "Compensable" : "Not Compensable"}
                  </div>
                </div>
                <div className="travel-seg-reason">{s.reason}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="travel-summary">
        <div className="travel-summary-row">
          <div className="travel-summary-item">
            <div className="travel-summary-num">{compHours.toFixed(1)}</div>
            <div className="travel-summary-desc">Compensable hours (actual)</div>
          </div>
          <div className="travel-summary-item">
            <div className="travel-summary-num">8.0</div>
            <div className="travel-summary-desc">Standard daily threshold</div>
          </div>
          <div className="travel-summary-item">
            <div className="travel-summary-num" style={{ color: "#dc3545" }}>{(compHours - 8).toFixed(1)}</div>
            <div className="travel-summary-desc">Daily overtime hours</div>
          </div>
        </div>
        <div className="travel-summary-note">
          Travel time from the employer-designated yard to the remote installation site pushes total compensable hours beyond 8 before installation work begins. If the employer does not pay travel time, every workday generates overtime exposure.
        </div>
      </div>
    </div>
  );
}
