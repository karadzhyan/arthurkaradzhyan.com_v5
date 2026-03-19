/*
 * Per-insight diagrams for individual publication pages.
 * Each export is a pure SVG server component keyed to an insight slug.
 */


/* Insight 1 — Two Hotels: exposure reduction funnel */
export function TwoHotelsDiagram() {
  var W = 560, H = 200;
  var stages = [
    { label: 'Theoretical Max', value: '$3M+', w: 440, color: '#dc3545' },
    { label: 'Modeled (Two Hotels)', value: '<$650K', w: 300, color: '#CC8800' },
    { label: 'Settlement Authority', value: '$200–500K', w: 200, color: '#198754' },
  ];
  var stageH = 44, gap = 10, startY = 36;
  return (
    <div style={{ maxWidth: 600, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          EXPOSURE REDUCTION FUNNEL
        </text>
        <text x={W / 2} y={28} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#999">
          Legacy Period + Remedied Period → Data-Driven Settlement Authority
        </text>
        {stages.map(function (s, i) {
          var y = startY + i * (stageH + gap);
          var x = (W - s.w) / 2;
          return (
            <g key={i}>
              <rect x={x} y={y} width={s.w} height={stageH} rx={4}
                fill={s.color} opacity={0.08} stroke={s.color} strokeWidth={0.75} />
              <text x={W / 2 - 60} y={y + stageH / 2 + 4}
                fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
                fill={s.color} letterSpacing={1}>
                {s.label.toUpperCase()}
              </text>
              <text x={W / 2 + 80} y={y + stageH / 2 + 5}
                textAnchor="end"
                fontFamily="'Outfit',sans-serif" fontSize={18} fontWeight={700} fill={s.color}>
                {s.value}
              </text>
              {i > 0 && (
                <text x={W / 2 + 120} y={y + stageH / 2 + 4}
                  fontFamily="'Outfit',sans-serif" fontSize={8} fill="#bbb">
                  {i === 1 ? '~78% reduction' : 'Defense range'}
                </text>
              )}
            </g>
          );
        })}
        <text x={W / 2} y={H - 6} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Illustrative only — actual reduction depends on matter-specific data
        </text>
      </svg>
    </div>
  );
}


/* Insight 3 — Hohenshelt: Before/after + 7 disapproved cases */
export function HohensheltInsightDiagram() {
  var W = 580, H = 200;
  var disapproved = ['Gallo', 'Espinoza', 'De Leon', 'Williams', 'Doe', 'Colon-Perez', 'Sanders'];
  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          HOHENSHELT — BEFORE AND AFTER
        </text>
        {/* Before */}
        <rect x={20} y={30} width={250} height={60} rx={4}
          fill="#dc3545" opacity={0.06} stroke="#dc3545" strokeWidth={0.75} />
        <rect x={20} y={30} width={250} height={3} rx={1.5} fill="#dc3545" />
        <text x={145} y={50} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#dc3545">BEFORE: STRICT LIABILITY</text>
        <text x={145} y={66} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill="#333">
          Any late payment = automatic forfeiture
        </text>
        <text x={145} y={80} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
          No excuse. No equitable relief. Period.
        </text>
        {/* Arrow */}
        <text x={W / 2} y={66} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={16} fontWeight={300} fill="#ccc">→</text>
        {/* After */}
        <rect x={310} y={30} width={250} height={60} rx={4}
          fill="#198754" opacity={0.06} stroke="#198754" strokeWidth={0.75} />
        <rect x={310} y={30} width={250} height={3} rx={1.5} fill="#198754" />
        <text x={435} y={50} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#198754">AFTER: EQUITABLE STANDARD</text>
        <text x={435} y={66} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill="#333">
          Forfeiture only if willful/negligent/fraud
        </text>
        <text x={435} y={80} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
          5-2 decision · Civil Code §§ 3275, 1511
        </text>
        {/* 7 disapproved cases */}
        <text x={W / 2} y={112} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#dc3545">
          7 COURT OF APPEAL DECISIONS DISAPPROVED
        </text>
        {disapproved.map(function (name, i) {
          var x = 30 + i * 78;
          return (
            <g key={i}>
              <rect x={x} y={122} width={72} height={22} rx={3}
                fill="#dc3545" opacity={0.06} stroke="#dc3545" strokeWidth={0.5} />
              <line x1={x + 4} y1={133} x2={x + 68} y2={133}
                stroke="#dc3545" strokeWidth={0.75} opacity={0.4} />
              <text x={x + 36} y={137} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fill="#dc3545">
                {name}
              </text>
            </g>
          );
        })}
        <text x={W / 2} y={166} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#198754">
          Wilson v. Tap Worldwide: 1-day delay → not willful as a matter of law
        </text>
        <text x={W / 2} y={182} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Hohenshelt v. Superior Court (2025) 18 Cal.5th 310
        </text>
      </svg>
    </div>
  );
}


/* Insight 4 — Sciborski: Commission forfeiture deal timeline */
export function SciborskiDiagram() {
  var W = 580, H = 130;
  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          COMMISSION FORFEITURE TIMELINE
        </text>
        {/* Timeline line */}
        <line x1={40} y1={56} x2={540} y2={56} stroke="#e0e0e0" strokeWidth={2} />
        {/* Events */}
        {[
          { x: 80, label: 'Deal Closes', sub: 'Commission earned\n(Sciborski)', color: '#198754', top: true },
          { x: 260, label: 'Employee Departs', sub: 'During gap period', color: '#dc3545', top: false },
          { x: 440, label: 'Deal Funds', sub: 'Commission not paid\nto departed employee', color: '#CC8800', top: true },
        ].map(function (evt, i) {
          return (
            <g key={i}>
              <circle cx={evt.x} cy={56} r={6} fill={evt.color} />
              <text x={evt.x} y={evt.top ? 36 : 80} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={600} fill="#333">
                {evt.label}
              </text>
              {evt.sub.split('\n').map(function (line, li) {
                return (
                  <text key={li} x={evt.x} y={(evt.top ? 36 : 80) + 14 + li * 11}
                    textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={8} fill={evt.color}>
                    {line}
                  </text>
                );
              })}
            </g>
          );
        })}
        {/* Danger zone */}
        <rect x={110} y={48} width={120} height={16} rx={8}
          fill="#dc3545" opacity={0.08} />
        <text x={170} y={59} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600}
          fill="#dc3545" letterSpacing={1}>FORFEITURE GAP</text>
        <text x={W / 2} y={122} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Sciborski v. Pacific Bell Directory (2012) 205 Cal.App.4th 1152
        </text>
      </svg>
    </div>
  );
}


/* Insight 5 — AB 2288/SB 92: Three reform axes */
export function ReformAxesDiagram() {
  var W = 580, H = 190;
  var axes = [
    { label: 'CURE', detail: '≤100 employees\n33-day window\nLWDA proposal', color: '#198754', x: 100 },
    { label: 'PENALTY CAPS', detail: '15% pre-notice\n30% post-notice\n"All reasonable steps"', color: '#4a7a6f', x: 290 },
    { label: 'PROCEDURE', detail: 'Early evaluation\n§ 2699(p) scope\nStanding reform', color: '#2c3e3a', x: 480 },
  ];
  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          2024 PAGA REFORM — THREE AXES
        </text>
        <text x={W / 2} y={30} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#999">
          AB 2288 / SB 92 · Effective June 19, 2024
        </text>
        {/* Center hub */}
        <circle cx={W / 2} cy={80} r={20} fill="#2c3e3a" opacity={0.08}
          stroke="#2c3e3a" strokeWidth={1} />
        <text x={W / 2} y={78} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600}
          letterSpacing={1} fill="#2c3e3a">PAGA</text>
        <text x={W / 2} y={88} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600}
          letterSpacing={1} fill="#2c3e3a">REFORM</text>
        {axes.map(function (a, i) {
          return (
            <g key={i}>
              {/* Spoke line */}
              <line x1={W / 2 + (a.x - W / 2) * 0.2} y1={80} x2={a.x} y2={80}
                stroke={a.color} strokeWidth={1} opacity={0.3} />
              <circle cx={a.x} cy={60} r={28} fill={a.color} opacity={0.08}
                stroke={a.color} strokeWidth={1.5} />
              <text x={a.x} y={58} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={700}
                letterSpacing={2} fill={a.color}>
                {a.label}
              </text>
              {a.detail.split('\n').map(function (line, li) {
                return (
                  <text key={li} x={a.x} y={96 + li * 13} textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#555">
                    {line}
                  </text>
                );
              })}
            </g>
          );
        })}
        {/* Max reduction */}
        <rect x={W / 2 - 80} y={152} width={160} height={20} rx={10}
          fill="#198754" opacity={0.08} stroke="#198754" strokeWidth={0.75} />
        <text x={W / 2} y={166} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#198754">
          Up to 85% penalty reduction
        </text>
        <text x={W / 2} y={186} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Zero published appellate decisions interpreting these provisions as of Q1 2026
        </text>
      </svg>
    </div>
  );
}


/* Insight 6 — Statistical sampling methodology */
export function SamplingDiagram() {
  var W = 580, H = 130;
  var steps = [
    { num: '1', label: 'Define\nUniverse', detail: 'Jobs, locations, periods' },
    { num: '2', label: 'Size\nSample', detail: '25-30% for significance' },
    { num: '3', label: 'Select\nMethod', detail: 'Random / stratified' },
    { num: '4', label: 'Analyze\nViolations', detail: 'Rate per category' },
    { num: '5', label: 'Extrapolate\nResults', detail: 'With confidence interval' },
  ];
  var boxW = 96, gap = 12;
  var totalW = steps.length * (boxW + gap) - gap;
  var startX = (W - totalW) / 2;
  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          DURAN-COMPLIANT SAMPLING FRAMEWORK
        </text>
        {steps.map(function (s, i) {
          var x = startX + i * (boxW + gap);
          return (
            <g key={i}>
              <rect x={x} y={28} width={boxW} height={70} rx={4}
                fill="#f9faf9" stroke="#e0e0e0" strokeWidth={0.75} />
              <circle cx={x + boxW / 2} cy={44} r={10} fill="#2c3e3a" />
              <text x={x + boxW / 2} y={48} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={700} fill="#fff">
                {s.num}
              </text>
              {s.label.split('\n').map(function (line, li) {
                return (
                  <text key={li} x={x + boxW / 2} y={64 + li * 12} textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={8.5} fontWeight={600} fill="#333">
                    {line}
                  </text>
                );
              })}
              <text x={x + boxW / 2} y={92} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">
                {s.detail}
              </text>
              {i < steps.length - 1 && (
                <text x={x + boxW + gap / 2} y={60} textAnchor="middle"
                  fontFamily="'Outfit',sans-serif" fontSize={14} fill="#ddd">→</text>
              )}
            </g>
          );
        })}
        <text x={W / 2} y={H - 6} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Duran v. U.S. Bank National Assn. (2014) 59 Cal.4th 1
        </text>
      </svg>
    </div>
  );
}


/* Insight 8 — Moniz three-part settlement test */
export function MonizDiagram() {
  var W = 580, H = 150;
  var pillars = [
    { label: 'Remediation', desc: 'Correct present\nviolations', color: '#2c3e3a' },
    { label: 'Deterrence', desc: 'Prevent future\nviolations', color: '#4a7a6f' },
    { label: 'Enforcement', desc: 'Maximize\nenforcement', color: '#8aa39e' },
  ];
  var pW = 150, gap = 20;
  var startX = (W - (pillars.length * pW + (pillars.length - 1) * gap)) / 2;
  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          MONIZ THREE-PART PURPOSE TEST
        </text>
        <text x={W / 2} y={28} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#999">
          Settlement must satisfy all three — Moniz v. Adecco (2021) 72 Cal.App.5th 56
        </text>
        {pillars.map(function (p, i) {
          var x = startX + i * (pW + gap);
          return (
            <g key={i}>
              <rect x={x} y={40} width={pW} height={70} rx={4}
                fill={p.color} opacity={0.08} stroke={p.color} strokeWidth={1} />
              <rect x={x} y={40} width={pW} height={3} rx={1.5} fill={p.color} />
              <text x={x + pW / 2} y={62} textAnchor="middle"
                fontFamily="'Libre Baskerville',serif" fontSize={12} fontWeight={700} fill="#333">
                {p.label}
              </text>
              {p.desc.split('\n').map(function (line, li) {
                return (
                  <text key={li} x={x + pW / 2} y={80 + li * 12} textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={9} fill="#888">
                    {line}
                  </text>
                );
              })}
            </g>
          );
        })}
        {/* Kullar warning */}
        <rect x={W / 2 - 140} y={118} width={280} height={18} rx={9}
          fill="#dc3545" opacity={0.08} />
        <text x={W / 2} y={131} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#dc3545">
          Kullar reversal risk: inadequate investigation = reversed settlement
        </text>
      </svg>
    </div>
  );
}


/* Insight 9 — Expert deposition 6-domain framework */
export function ExpertDeposDiagram() {
  var W = 580, H = 140;
  var domains = [
    { num: '1', label: 'Population', color: '#2c3e3a' },
    { num: '2', label: 'Selection', color: '#4a7a6f' },
    { num: '3', label: 'Violation Def.', color: '#8aa39e' },
    { num: '4', label: 'Paid Premiums', color: '#CC8800' },
    { num: '5', label: 'Confidence', color: '#dc3545' },
    { num: '6', label: 'Aff. Defenses', color: '#2c3e3a' },
  ];
  var boxW = 82, gap = 8;
  var totalW = domains.length * (boxW + gap) - gap;
  var startX = (W - totalW) / 2;
  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          SIX-DOMAIN EXPERT DEPOSITION FRAMEWORK
        </text>
        {domains.map(function (d, i) {
          var x = startX + i * (boxW + gap);
          return (
            <g key={i}>
              <rect x={x} y={30} width={boxW} height={64} rx={4}
                fill={d.color} opacity={0.06} stroke={d.color} strokeWidth={0.75} />
              <circle cx={x + boxW / 2} cy={48} r={11} fill={d.color} />
              <text x={x + boxW / 2} y={52} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={700} fill="#fff">
                {d.num}
              </text>
              <text x={x + boxW / 2} y={74} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#333">
                {d.label}
              </text>
              <text x={x + boxW / 2} y={86} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">
                Attack vector
              </text>
            </g>
          );
        })}
        <text x={W / 2} y={116} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#CC8800">
          Example: 45% ± 12pp → true rate could be 33–57% (worthless precision)
        </text>
        <text x={W / 2} y={134} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Duran v. U.S. Bank (2014) 59 Cal.4th 1 at p. 49
        </text>
      </svg>
    </div>
  );
}


/* Insight 11 — Naranjo cascade: multiplier arithmetic */
export function NaranjoMultiplierDiagram() {
  var W = 580, H = 160;
  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          NARANJO PENALTY ARITHMETIC
        </text>
        <text x={W / 2} y={30} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#999">
          Single meal period violation category → PAGA-recoverable penalties only
        </text>

        {/* Multiplication chain */}
        {[
          { val: '50', label: 'Employees', x: 50 },
          { val: '×', label: '', x: 120 },
          { val: '26', label: 'Pay Periods', x: 170 },
          { val: '×', label: '', x: 240 },
          { val: '$200', label: 'Subsequent', x: 300 },
          { val: '×', label: '', x: 370 },
          { val: '35%', label: 'Violation Rate', x: 430 },
          { val: '=', label: '', x: 500 },
        ].map(function (item, i) {
          var isOp = item.val === '×' || item.val === '=';
          return (
            <g key={i}>
              {!isOp && (
                <rect x={item.x - 30} y={42} width={60} height={36} rx={4}
                  fill="#2c3e3a" opacity={0.06} stroke="#2c3e3a" strokeWidth={0.5} />
              )}
              <text x={item.x} y={64} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={isOp ? 16 : 15}
                fontWeight={700} fill={isOp ? '#ccc' : '#2c3e3a'}>
                {item.val}
              </text>
              {item.label && (
                <text x={item.x} y={88} textAnchor="middle"
                  fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#888">
                  {item.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Result */}
        <rect x={W - 80} y={42} width={70} height={36} rx={4}
          fill="#dc3545" opacity={0.08} stroke="#dc3545" strokeWidth={1} />
        <text x={W - 45} y={65} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={16} fontWeight={700} fill="#dc3545">
          $91K
        </text>
        <text x={W - 45} y={88} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fill="#dc3545">
          One category
        </text>

        {/* Derivative stacking note */}
        <rect x={40} y={102} width={W - 80} height={32} rx={4}
          fill="#dc3545" opacity={0.04} stroke="#dc3545" strokeWidth={0.5} />
        <text x={W / 2} y={116} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#dc3545">
          + § 226(e) wage statement derivative + § 203 waiting time derivative
        </text>
        <text x={W / 2} y={128} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
          Demands appear 5–10× larger than underlying wage exposure
        </text>

        <text x={W / 2} y={152} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Naranjo v. Spectrum Security Services (2022) 13 Cal.5th 93
        </text>
      </svg>
    </div>
  );
}


/* Insight 12 — Manageability scope-narrowing funnel */
export function ManageabilityDiagram() {
  var W = 560, H = 170;
  var stages = [
    { label: 'Full PAGA Notice', sub: 'All violations, all employees, all periods', w: 440, color: '#dc3545' },
    { label: 'After § 2699(p) Motion', sub: 'Manageable violations, representative scope', w: 280, color: '#CC8800' },
    { label: 'Triable Claims', sub: 'Narrow scope = 50–80% effective reduction', w: 160, color: '#198754' },
  ];
  var stageH = 36, gap = 8, startY = 40;
  return (
    <div style={{ maxWidth: 600, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          SCOPE-NARROWING FUNNEL — § 2699(p)
        </text>
        <text x={W / 2} y={30} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#999">
          Manageability order can reduce effective exposure before merits
        </text>
        {stages.map(function (s, i) {
          var y = startY + i * (stageH + gap);
          var x = (W - s.w) / 2;
          return (
            <g key={i}>
              <rect x={x} y={y} width={s.w} height={stageH} rx={4}
                fill={s.color} opacity={0.08} stroke={s.color} strokeWidth={0.75} />
              <text x={W / 2} y={y + 15} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={600} fill={s.color}>
                {s.label}
              </text>
              <text x={W / 2} y={y + 29} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
                {s.sub}
              </text>
            </g>
          );
        })}
        <text x={W / 2} y={H - 6} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582 · Codified by AB 2288
        </text>
      </svg>
    </div>
  );
}
