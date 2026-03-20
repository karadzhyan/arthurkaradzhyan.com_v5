"use client";
/* Defense Decision Flowchart — Strategic routing based on procedural posture.
   Shows the analytical decision framework that drives every engagement. */

export default function DefenseFlowchart() {
  var svgW = 760;
  var svgH = 520;

  return (
    <div className="viz-flowchart">
      <div className="viz-header">
        <div className="viz-label">Post-Reform Defense Decision Framework</div>
        <div className="viz-subtitle">Strategic routing based on procedural posture at time of engagement</div>
      </div>
      <svg viewBox={"0 0 " + svgW + " " + svgH} fill="none" className="viz-svg" role="img" aria-label="Defense decision flowchart showing strategic routing based on PAGA procedural posture">
        <defs>
          <marker id="flow-arrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0L10 3.5L0 7z" fill="#8aa39e" />
          </marker>
        </defs>

        {/* Entry node */}
        <rect x="280" y="10" width="200" height="44" rx="22" fill="#2c3e3a" />
        <text x="380" y="28" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff" fontFamily="Outfit,sans-serif" letterSpacing="1">NEW PAGA MATTER</text>
        <text x="380" y="42" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)" fontFamily="Outfit,sans-serif">What is the current posture?</text>

        {/* Branch lines from entry */}
        <path d="M310 54 L310 80 L150 80 L150 100" stroke="#8aa39e" strokeWidth="1.5" markerEnd="url(#flow-arrow)" fill="none" />
        <path d="M380 54 L380 100" stroke="#8aa39e" strokeWidth="1.5" markerEnd="url(#flow-arrow)" fill="none" />
        <path d="M450 54 L450 80 L610 80 L610 100" stroke="#8aa39e" strokeWidth="1.5" markerEnd="url(#flow-arrow)" fill="none" />

        {/* Phase 1: Pre-Notice */}
        <rect x="70" y="104" width="160" height="50" rx="4" fill="rgba(44,62,58,0.05)" stroke="#2c3e3a" strokeWidth="1.5" />
        <text x="150" y="124" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">Pre-Notice</text>
        <text x="150" y="140" textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">No LWDA notice received</text>

        {/* Phase 2: Post-Notice */}
        <rect x="300" y="104" width="160" height="50" rx="4" fill="rgba(204,136,0,0.06)" stroke="#CC8800" strokeWidth="1.5" />
        <text x="380" y="124" textAnchor="middle" fontSize="10" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif">Post-Notice</text>
        <text x="380" y="140" textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Within 33/60-day windows</text>

        {/* Phase 3: Active Litigation */}
        <rect x="530" y="104" width="160" height="50" rx="4" fill="rgba(44,62,58,0.05)" stroke="#2c3e3a" strokeWidth="1.5" />
        <text x="610" y="124" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">Active Litigation</text>
        <text x="610" y="140" textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Complaint filed</text>

        {/* Pre-Notice actions */}
        <path d="M150 154 L150 180" stroke="#8aa39e" strokeWidth="1.5" markerEnd="url(#flow-arrow)" fill="none" />
        <rect x="50" y="184" width="200" height="100" rx="4" fill="rgba(44,62,58,0.03)" stroke="rgba(44,62,58,0.1)" strokeWidth="1" />
        <text x="150" y="202" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">COMPLIANCE POSITIONING</text>
        <text x="60" y="220" fontSize="8" fill="#666" fontFamily="Outfit,sans-serif">1. Payroll audit — identify gaps</text>
        <text x="60" y="234" fontSize="8" fill="#666" fontFamily="Outfit,sans-serif">2. Written policy revisions</text>
        <text x="60" y="248" fontSize="8" fill="#666" fontFamily="Outfit,sans-serif">3. Supervisor training (documented)</text>
        <text x="60" y="262" fontSize="8" fill="#666" fontFamily="Outfit,sans-serif">4. Electronic attestation system</text>
        <path d="M150 284 L150 310" stroke="#8aa39e" strokeWidth="1.5" markerEnd="url(#flow-arrow)" fill="none" />
        <rect x="70" y="314" width="160" height="36" rx="4" fill="rgba(44,62,58,0.08)" stroke="#2c3e3a" strokeWidth="1" />
        <text x="150" y="330" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2c3e3a" fontFamily="Outfit,sans-serif">→ 15% CAP QUALIFIED</text>
        <text x="150" y="344" textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">§ 2699(g)</text>

        {/* Post-Notice actions */}
        <path d="M340 154 L340 180" stroke="#CC8800" strokeWidth="1.5" markerEnd="url(#flow-arrow)" fill="none" />
        <rect x="270" y="184" width="100" height="44" rx="4" fill="rgba(204,136,0,0.06)" stroke="rgba(204,136,0,0.2)" strokeWidth="1" />
        <text x="320" y="202" textAnchor="middle" fontSize="9" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif">Cure Proposal</text>
        <text x="320" y="218" textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Day 33 deadline</text>

        <path d="M420 154 L420 180" stroke="#CC8800" strokeWidth="1.5" markerEnd="url(#flow-arrow)" fill="none" />
        <rect x="380" y="184" width="120" height="44" rx="4" fill="rgba(204,136,0,0.06)" stroke="rgba(204,136,0,0.2)" strokeWidth="1" />
        <text x="440" y="202" textAnchor="middle" fontSize="9" fontWeight="700" fill="#CC8800" fontFamily="Outfit,sans-serif">60-Day Remediation</text>
        <text x="440" y="218" textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">"All reasonable steps"</text>

        <path d="M380 228 L380 270 L380 310" stroke="#8aa39e" strokeWidth="1.5" markerEnd="url(#flow-arrow)" fill="none" />
        <rect x="300" y="314" width="160" height="36" rx="4" fill="rgba(44,62,58,0.08)" stroke="#2c3e3a" strokeWidth="1" />
        <text x="380" y="330" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2c3e3a" fontFamily="Outfit,sans-serif">→ 30% CAP QUALIFIED</text>
        <text x="380" y="344" textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">§ 2699(h)</text>

        {/* Active Litigation actions */}
        <path d="M610 154 L610 180" stroke="#8aa39e" strokeWidth="1.5" markerEnd="url(#flow-arrow)" fill="none" />
        <rect x="510" y="184" width="200" height="100" rx="4" fill="rgba(44,62,58,0.03)" stroke="rgba(44,62,58,0.1)" strokeWidth="1" />
        <text x="610" y="202" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2c3e3a" fontFamily="Outfit,sans-serif">LITIGATION DEFENSE</text>
        <text x="520" y="220" fontSize="8" fill="#666" fontFamily="Outfit,sans-serif">1. Exposure model — 3 scenarios</text>
        <text x="520" y="234" fontSize="8" fill="#666" fontFamily="Outfit,sans-serif">2. Recoverability analysis (ZB, N.A.)</text>
        <text x="520" y="248" fontSize="8" fill="#666" fontFamily="Outfit,sans-serif">3. Early evaluation conference</text>
        <text x="520" y="262" fontSize="8" fill="#666" fontFamily="Outfit,sans-serif">4. Manageability limitation (§ 2699(p))</text>

        <path d="M610 284 L610 310" stroke="#8aa39e" strokeWidth="1.5" markerEnd="url(#flow-arrow)" fill="none" />
        <rect x="530" y="314" width="160" height="36" rx="4" fill="rgba(44,62,58,0.08)" stroke="#2c3e3a" strokeWidth="1" />
        <text x="610" y="330" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2c3e3a" fontFamily="Outfit,sans-serif">→ DATA-DRIVEN POSITION</text>
        <text x="610" y="344" textAnchor="middle" fontSize="8" fill="#888" fontFamily="Outfit,sans-serif">Settlement or trial</text>

        {/* Bottom convergence */}
        <path d="M150 350 L150 380 L380 380" stroke="rgba(44,62,58,0.15)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <path d="M610 350 L610 380 L380 380" stroke="rgba(44,62,58,0.15)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <path d="M380 380 L380 400" stroke="#8aa39e" strokeWidth="1.5" markerEnd="url(#flow-arrow)" fill="none" />

        <rect x="250" y="404" width="260" height="50" rx="6" fill="#2c3e3a" />
        <text x="380" y="425" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff" fontFamily="Outfit,sans-serif" letterSpacing="1">MEDIATION-READY POSITION</text>
        <text x="380" y="442" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)" fontFamily="Outfit,sans-serif">Quantified exposure · documented compliance · reform leverage</text>

        {/* Side annotations */}
        <rect x="50" y="380" width="80" height="24" rx="3" fill="rgba(44,62,58,0.04)" />
        <text x="90" y="396" textAnchor="middle" fontSize="8" fontWeight="600" fill="#8aa39e" fontFamily="Outfit,sans-serif">PROACTIVE</text>
        <rect x="630" y="380" width="80" height="24" rx="3" fill="rgba(44,62,58,0.04)" />
        <text x="670" y="396" textAnchor="middle" fontSize="8" fontWeight="600" fill="#8aa39e" fontFamily="Outfit,sans-serif">REACTIVE</text>
      </svg>
    </div>
  );
}
