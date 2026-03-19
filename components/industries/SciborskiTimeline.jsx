"use client";

export default function SciborskiTimeline() {
  var phases = [
    {
      label: "Deal Negotiation",
      time: "Day 1–3",
      actor: "Salesperson",
      work: "Test drive, price negotiation, trade-in appraisal, F&I handoff",
      color: "#4a7a6f",
      status: "Work performed",
      sciborski: "The salesperson performs the work entitling them to the commission."
    },
    {
      label: "Deal Closing",
      time: "Day 3",
      actor: "Salesperson + F&I",
      work: "Customer signs purchase agreement, financing application submitted",
      color: "#2c3e3a",
      status: "Commission earned",
      sciborski: "Under Sciborski v. Pacific Bell Directory, the commission is earned at this moment — when the employee completes the work entitling them to the commission."
    },
    {
      label: "Financing Period",
      time: "Day 3–21",
      actor: "F&I Department",
      work: "Lender approval, stipulations, contract packaging, funding",
      color: "#CC8800",
      status: "Waiting for funding",
      sciborski: "The salesperson has no further role. The deal is in F&I's hands. But dealership commission plans typically condition payment on funding completion."
    },
    {
      label: "Salesperson Departs",
      time: "Day 10",
      actor: "—",
      work: "Salesperson resigns or is terminated with pending deals in pipeline",
      color: "#dc3545",
      status: "Separation event",
      sciborski: "Commission plan says: 'No commission paid on deals not yet funded at time of separation.' Under Sciborski, this is an unlawful forfeiture — the commission was already earned at closing."
    },
    {
      label: "Deal Funds",
      time: "Day 18",
      actor: "F&I Department",
      work: "Lender funds the deal. Dealership receives proceeds.",
      color: "#b85c00",
      status: "Funding complete",
      sciborski: "The deal funds, but the departed salesperson receives $0. The dealership retains the commission on a deal the salesperson earned."
    },
    {
      label: "Derivative Exposure",
      time: "Day 18+",
      actor: "Legal",
      work: "§ 200–204 unpaid wages + § 203 waiting time (up to 30 days) + § 226 wage statement + PAGA penalties",
      color: "#444",
      status: "Compounding",
      sciborski: "One departed salesperson with one pending deal generates 4 separate violation streams. A dealership with 20% annual turnover creates 8–12 claimants per year."
    }
  ];

  return (
    <div className="sciborski-timeline">
      <div className="sciborski-timeline-label">Sciborski Forfeiture Timeline — Deal Closing to Penalty Exposure</div>
      <div className="sciborski-phases">
        {phases.map(function (p, i) {
          return (
            <div key={i} className="sciborski-phase">
              <div className="sciborski-phase-left">
                <div className="sciborski-phase-dot" style={{ background: p.color }} />
                {i < phases.length - 1 && <div className="sciborski-phase-line" />}
              </div>
              <div className="sciborski-phase-content">
                <div className="sciborski-phase-header">
                  <div className="sciborski-phase-label" style={{ color: p.color }}>{p.label}</div>
                  <div className="sciborski-phase-time">{p.time}</div>
                  <div className="sciborski-phase-status" style={{
                    color: p.color,
                    borderColor: p.color
                  }}>{p.status}</div>
                </div>
                <div className="sciborski-phase-work">{p.work}</div>
                <div className="sciborski-phase-legal">{p.sciborski}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sciborski-bottom">
        <div className="sciborski-bottom-label">Forensic Audit Requirement</div>
        <div className="sciborski-bottom-text">
          Trace every departed salesperson's pending deals at separation. Determine whether each deal funded post-departure. Calculate unpaid commission, § 203 waiting time penalties (up to 30 days × daily wage per employee), and § 226 wage statement violations. This is the single highest-value compliance action a dealership can take.
        </div>
      </div>
    </div>
  );
}
