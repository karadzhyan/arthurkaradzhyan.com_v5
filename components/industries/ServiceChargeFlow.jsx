"use client";

export default function ServiceChargeFlow() {
  var paths = [
    {
      type: "Voluntary Gratuity",
      color: "#4a7a6f",
      indicator: "Guest chooses amount",
      examples: ["Tip line on credit card receipt", "Cash left on table", "Tip added at guest's discretion"],
      rule: "Belongs entirely to employee(s) who provided service. § 351 prohibits employer from collecting, taking, or receiving any portion.",
      distribution: "Standard tip pooling permitted (servers, bussers, bartenders). Managers and supervisors excluded from pool — but 'supervisor' has a narrower definition under WO 5 than common understanding.",
      riskLevel: "Moderate",
      riskNote: "Tip pool composition is the primary risk. Including supervisory roles that do not qualify as excluded creates § 351 liability."
    },
    {
      type: "Mandatory Service Charge",
      color: "#dc3545",
      indicator: "Hotel/restaurant imposes fixed %",
      examples: ["18% banquet service charge", "20% room service charge", "Automatic gratuity for parties of 6+"],
      rule: "Not a 'gratuity' under § 351 — it is a charge imposed by the employer. But if it is characterized to guests as compensation for service employees, it must be distributed to those employees.",
      distribution: "Must be distributed to employees who performed the services. If the employer retains any portion, the characterization on guest-facing materials determines liability.",
      riskLevel: "Critical",
      riskNote: "Mischaracterization is the trap. If the banquet event order says 'service charge' and guests reasonably believe it goes to staff, retention by the employer creates individual claims + PAGA exposure."
    }
  ];

  return (
    <div className="svc-charge-flow">
      <div className="svc-charge-label">§ 351 Classification — Service Charge vs. Gratuity</div>
      <div className="svc-charge-paths">
        {paths.map(function (p, i) {
          return (
            <div key={i} className="svc-charge-path" style={{ borderTopColor: p.color }}>
              <div className="svc-charge-type" style={{ color: p.color }}>{p.type}</div>
              <div className="svc-charge-indicator">{p.indicator}</div>
              <div className="svc-charge-examples">
                {p.examples.map(function (e, j) {
                  return <div key={j} className="svc-charge-example">{e}</div>;
                })}
              </div>
              <div className="svc-charge-rule-box">
                <div className="svc-charge-rule-label">Legal Rule</div>
                <div className="svc-charge-rule">{p.rule}</div>
              </div>
              <div className="svc-charge-dist-box">
                <div className="svc-charge-dist-label">Distribution</div>
                <div className="svc-charge-dist">{p.distribution}</div>
              </div>
              <div className="svc-charge-risk" style={{ borderLeftColor: p.color }}>
                <span className="svc-charge-risk-level" style={{ color: p.color }}>{p.riskLevel}:</span> {p.riskNote}
              </div>
            </div>
          );
        })}
      </div>
      <div className="svc-charge-bottom">
        The characterization on guest-facing materials — not the employer's internal classification — determines whether a charge is a gratuity or a service charge. Audit all banquet event orders, room service menus, and receipt language.
      </div>
    </div>
  );
}
