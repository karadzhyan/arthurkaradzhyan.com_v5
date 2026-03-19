/*
 * Per-insight diagrams for individual publication pages.
 * Each export is a pure SVG server component keyed to an insight slug.
 */


/* Insight 1 — Two Hotels: exposure reduction funnel + two-period split + evidence */
export function TwoHotelsDiagram() {
  var W = 560, H = 320;
  var stages = [
    { label: 'Theoretical Max', value: '$3M+', w: 440, color: '#dc3545' },
    { label: 'Modeled (Two Hotels)', value: '<$650K', w: 300, color: '#CC8800' },
    { label: 'Settlement Authority', value: '$200–500K', w: 200, color: '#198754' },
  ];
  var stageH = 38, gap = 8, startY = 36;
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
                fontFamily="'Outfit',sans-serif" fontSize={16} fontWeight={700} fill={s.color}>
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

        {/* Two-period split */}
        <text x={W / 2} y={182} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          TEMPORAL BIFURCATION
        </text>
        <rect x={20} y={190} width={250} height={52} rx={4}
          fill="#dc3545" opacity={0.06} stroke="#dc3545" strokeWidth={0.5} />
        <rect x={20} y={190} width={250} height={3} rx={1.5} fill="#dc3545" />
        <text x={145} y={208} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#dc3545">
          LEGACY PERIOD (Pre-Compliance)
        </text>
        <text x={145} y={220} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#888">
          Higher violation rates · $200 subsequent penalty · No cap
        </text>
        <text x={145} y={234} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#888">
          Standard PAGA exposure calculation applies
        </text>

        <text x={W / 2} y={220} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={12} fill="#ccc">→</text>

        <rect x={290} y={190} width={250} height={52} rx={4}
          fill="#198754" opacity={0.06} stroke="#198754" strokeWidth={0.5} />
        <rect x={290} y={190} width={250} height={3} rx={1.5} fill="#198754" />
        <text x={415} y={208} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#198754">
          REMEDIED PERIOD (Post-Compliance)
        </text>
        <text x={415} y={220} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#888">
          Lower rates · 15% cap (pre-notice) / 30% cap (post-notice)
        </text>
        <text x={415} y={234} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#888">
          Requires documented "all reasonable steps"
        </text>

        {/* Evidence documentation */}
        <text x={W / 2} y={260} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600}
          letterSpacing={1.5} fill="#4a7a6f">
          REMEDIED PERIOD EVIDENCE
        </text>
        {['OT reduction data', 'Policy implementation', 'Training documentation', 'Supervisor ack.'].map(function (item, i) {
          var ix = 50 + i * 130;
          return (
            <g key={i}>
              <rect x={ix} y={268} width={120} height={16} rx={3}
                fill="#4a7a6f" opacity={0.06} stroke="#4a7a6f" strokeWidth={0.5} />
              <text x={ix + 60} y={279} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#4a7a6f">
                {item}
              </text>
            </g>
          );
        })}

        <text x={W / 2} y={300} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#8aa39e">
          See: AB 2288 Penalty Cap Qualifier tool
        </text>
        <text x={W / 2} y={314} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Illustrative only — actual reduction depends on matter-specific data
        </text>
      </svg>
    </div>
  );
}


/* Insight 2 — Recoverable vs. Non-Recoverable: decision tree + demand comparison */
export function RecoverabilityTreeDiagram() {
  var W = 580, H = 310;
  var demandRows = [
    { cat: 'Meal period premiums', demanded: '$180K', actual: '$0', note: 'Wages per Kirby', color: '#dc3545' },
    { cat: 'Rest period premiums', demanded: '$120K', actual: '$0', note: 'Wages per Kirby', color: '#dc3545' },
    { cat: 'OT underpayments', demanded: '$95K', actual: '$0', note: 'Wages, not penalties', color: '#dc3545' },
    { cat: 'Wage statement § 226(e)', demanded: '$85K', actual: '$85K', note: 'Recoverable', color: '#198754' },
    { cat: 'PAGA default § 2699(f)', demanded: '$120K', actual: '$120K', note: 'Recoverable', color: '#198754' },
  ];
  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          RECOVERABILITY DECISION TREE
        </text>
        <text x={W / 2} y={28} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#999">
          Three-question test per alleged violation — can reduce demands 30–50%
        </text>

        {/* Question 1 */}
        <rect x={180} y={38} width={220} height={28} rx={4}
          fill="#2c3e3a" opacity={0.08} stroke="#2c3e3a" strokeWidth={1} />
        <text x={290} y={56} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#2c3e3a">
          1. Specific civil penalty statute?
        </text>
        <line x1={240} y1={66} x2={160} y2={82} stroke="#198754" strokeWidth={1} />
        <text x={190} y={76} fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600} fill="#198754">YES</text>
        <line x1={340} y1={66} x2={420} y2={82} stroke="#dc3545" strokeWidth={1} />
        <text x={390} y={76} fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600} fill="#dc3545">NO</text>

        {/* Question 2 */}
        <rect x={60} y={84} width={200} height={28} rx={4}
          fill="#4a7a6f" opacity={0.08} stroke="#4a7a6f" strokeWidth={1} />
        <text x={160} y={102} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#4a7a6f">
          2. PAGA-authorized recovery?
        </text>
        <line x1={110} y1={112} x2={80} y2={128} stroke="#198754" strokeWidth={1} />
        <text x={88} y={122} fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600} fill="#198754">YES</text>
        <rect x={20} y={130} width={120} height={24} rx={12}
          fill="#198754" opacity={0.1} stroke="#198754" strokeWidth={1} />
        <text x={80} y={146} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={700} fill="#198754">
          RECOVERABLE
        </text>
        <line x1={210} y1={112} x2={230} y2={128} stroke="#dc3545" strokeWidth={1} />
        <text x={226} y={122} fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600} fill="#dc3545">NO</text>
        <rect x={170} y={130} width={130} height={24} rx={12}
          fill="#dc3545" opacity={0.1} stroke="#dc3545" strokeWidth={1} />
        <text x={235} y={146} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={700} fill="#dc3545">
          NOT RECOVERABLE
        </text>

        {/* Question 3 */}
        <rect x={340} y={84} width={200} height={28} rx={4}
          fill="#CC8800" opacity={0.08} stroke="#CC8800" strokeWidth={1} />
        <text x={440} y={102} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#CC8800">
          3. Default § 2699(f) applies?
        </text>
        <line x1={440} y1={112} x2={440} y2={128} stroke="#CC8800" strokeWidth={1} />
        <rect x={380} y={130} width={120} height={24} rx={12}
          fill="#CC8800" opacity={0.1} stroke="#CC8800" strokeWidth={1} />
        <text x={440} y={146} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={700} fill="#CC8800">
          $100 / $200
        </text>

        {/* Demand comparison table */}
        <text x={W / 2} y={172} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          DEMAND vs. STATUTE-AUTHORIZED COMPARISON
        </text>
        {/* Header */}
        <text x={40} y={188} fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600}
          fill="#888" letterSpacing={1}>CATEGORY</text>
        <text x={300} y={188} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600}
          fill="#dc3545" letterSpacing={1}>DEMANDED</text>
        <text x={390} y={188} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600}
          fill="#198754" letterSpacing={1}>AUTHORIZED</text>
        <text x={490} y={188} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600}
          fill="#888" letterSpacing={1}>STATUS</text>
        <line x1={30} y1={192} x2={550} y2={192} stroke="#e8e8e8" strokeWidth={0.5} />
        {demandRows.map(function (r, i) {
          var ry = 202 + i * 17;
          return (
            <g key={i}>
              <text x={40} y={ry} fontFamily="'Outfit',sans-serif" fontSize={8} fill="#555">{r.cat}</text>
              <text x={300} y={ry} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#dc3545">{r.demanded}</text>
              <text x={390} y={ry} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill={r.color}>{r.actual}</text>
              <text x={490} y={ry} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7.5} fill={r.color}>{r.note}</text>
            </g>
          );
        })}
        <line x1={30} y1={290} x2={550} y2={290} stroke="#e8e8e8" strokeWidth={0.5} />

        {/* Reduction bar */}
        <rect x={W / 2 - 100} y={294} width={200} height={4} rx={2} fill="#e8e8e8" />
        <rect x={W / 2 - 100} y={294} width={100} height={4} rx={2} fill="#198754" />
        <text x={W / 2 + 110} y={299} fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#198754">
          ~34% stripped
        </text>

        <text x={W / 2} y={310} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175 · Kirby v. Immoos (2012) 53 Cal.4th 1244
        </text>
      </svg>
    </div>
  );
}


/* Insight 3 — Hohenshelt: Before/after + 7 disapproved cases + equitable principles */
export function HohensheltInsightDiagram() {
  var W = 580, H = 280;
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
        {/* Equitable principles */}
        <text x={W / 2} y={166} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#198754">
          THREE EQUITABLE PRINCIPLES NOW HARMONIZED
        </text>
        {[
          { label: 'Civil Code § 3275', desc: 'Relief from forfeiture', x: 50 },
          { label: 'CCP § 473(b)', desc: 'Relief from mistake', x: 220 },
          { label: 'Civil Code § 1511', desc: 'Excuse for impossibility', x: 390 },
        ].map(function (p, i) {
          return (
            <g key={i}>
              <rect x={p.x} y={174} width={150} height={28} rx={3}
                fill="#198754" opacity={0.06} stroke="#198754" strokeWidth={0.5} />
              <text x={p.x + 75} y={186} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#198754">{p.label}</text>
              <text x={p.x + 75} y={197} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">{p.desc}</text>
            </g>
          );
        })}

        {/* Timeline */}
        <line x1={60} y1={222} x2={520} y2={222} stroke="#e0e0e0" strokeWidth={1} />
        <text x={100} y={218} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600} fill="#dc3545">2019–2024</text>
        <text x={100} y={234} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">Unanimous strict liability</text>
        <circle cx={100} cy={222} r={3} fill="#dc3545" />
        <text x={W / 2} y={218} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600} fill="#2c3e3a">2025</text>
        <text x={W / 2} y={234} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">Hohenshelt (5-2)</text>
        <circle cx={W / 2} cy={222} r={4} fill="#2c3e3a" />
        <text x={460} y={218} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600} fill="#198754">Post-Hohenshelt</text>
        <text x={460} y={234} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">Equitable standard applies</text>
        <circle cx={460} cy={222} r={3} fill="#198754" />

        <text x={W / 2} y={252} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#198754">
          Wilson v. Tap Worldwide: 1-day delay → not willful as a matter of law
        </text>
        <text x={W / 2} y={270} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Hohenshelt v. Superior Court (2025) 18 Cal.5th 310
        </text>
      </svg>
    </div>
  );
}


/* Insight 4 — Sciborski: Commission forfeiture deal timeline + forensic steps */
export function SciborskiDiagram() {
  var W = 580, H = 210;
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
        {/* Forensic analysis steps */}
        <text x={W / 2} y={122} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          FORENSIC ANALYSIS PROTOCOL
        </text>
        {[
          { num: '1', label: 'Trace Pending Deals', desc: 'Every departed salesperson' },
          { num: '2', label: 'Track Subsequent Funding', desc: 'Did deals fund post-departure?' },
          { num: '3', label: 'Verify Payment', desc: 'Was departed employee paid?' },
        ].map(function (step, i) {
          var sx = 70 + i * 170;
          return (
            <g key={i}>
              <rect x={sx} y={130} width={150} height={36} rx={4}
                fill="#f9faf9" stroke="#e0e0e0" strokeWidth={0.75} />
              <circle cx={sx + 16} cy={148} r={9} fill="#2c3e3a" />
              <text x={sx + 16} y={152} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={700} fill="#fff">{step.num}</text>
              <text x={sx + 84} y={144} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#333">{step.label}</text>
              <text x={sx + 84} y={158} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">{step.desc}</text>
              {i < 2 && (
                <text x={sx + 160} y={148} fontFamily="'Outfit',sans-serif" fontSize={12} fill="#ddd">→</text>
              )}
            </g>
          );
        })}
        <rect x={60} y={174} width={W - 120} height={16} rx={8}
          fill="#dc3545" opacity={0.06} />
        <text x={W / 2} y={185} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#dc3545">
          Pattern repeats for every departed salesperson with pending deals — "devastating" exposure
        </text>
        <text x={W / 2} y={204} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Sciborski v. Pacific Bell Directory (2012) 205 Cal.App.4th 1152
        </text>
      </svg>
    </div>
  );
}


/* Insight 5 — AB 2288/SB 92: Three reform axes + documentation + timeline */
export function ReformAxesDiagram() {
  var W = 580, H = 300;
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
        {/* Documentation checklist */}
        <text x={W / 2} y={186} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600}
          letterSpacing={1.5} fill="#4a7a6f">
          DOCUMENTATION REQUIRED FOR CAP QUALIFICATION
        </text>
        {['Written policies', 'Training records', 'Supervisor ack.', 'Payroll audit evidence'].map(function (item, i) {
          var dx = 46 + i * 130;
          return (
            <g key={i}>
              <rect x={dx} y={194} width={120} height={16} rx={3}
                fill="#4a7a6f" opacity={0.06} stroke="#4a7a6f" strokeWidth={0.5} />
              <text x={dx + 8} y={205} fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600} fill="#4a7a6f">✓</text>
              <text x={dx + 60} y={205} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#555">{item}</text>
            </g>
          );
        })}

        {/* 20-year timeline */}
        <line x1={60} y1={232} x2={520} y2={232} stroke="#e0e0e0" strokeWidth={1} />
        <circle cx={80} cy={232} r={3} fill="#888" />
        <text x={80} y={224} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={700} fill="#888">2004</text>
        <text x={80} y={244} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">PAGA enacted</text>
        <rect x={160} y={228} width={230} height={8} rx={4} fill="#dc3545" opacity={0.08} />
        <text x={275} y={234} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={6.5} fill="#dc3545">20 YEARS — NO PENALTY CAPS</text>
        <circle cx={500} cy={232} r={4} fill="#198754" />
        <text x={500} y={224} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={700} fill="#198754">2024</text>
        <text x={500} y={244} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7} fill="#198754">Reform enacted</text>

        {/* Standing reform */}
        <rect x={W / 2 - 160} y={256} width={320} height={18} rx={9}
          fill="#CC8800" opacity={0.08} stroke="#CC8800" strokeWidth={0.5} />
        <text x={W / 2} y={269} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#CC8800">
          Standing reform: plaintiff must have "personally suffered" each violation
        </text>

        <text x={W / 2} y={292} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Zero published appellate decisions interpreting these provisions as of Q1 2026
        </text>
      </svg>
    </div>
  );
}


/* Insight 6 — Statistical sampling methodology + illustrative pipeline */
export function SamplingDiagram() {
  var W = 580, H = 210;
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
        {/* Illustrative example pipeline */}
        <text x={W / 2} y={118} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          ILLUSTRATIVE PIPELINE
        </text>
        {[
          { val: '500', label: 'Employees', color: '#2c3e3a' },
          { val: '150', label: '30% Sampled', color: '#4a7a6f' },
          { val: '12%', label: 'Violation Rate', color: '#CC8800' },
          { val: '60', label: 'Est. Violations', color: '#dc3545' },
          { val: '±3%', label: '95% CI', color: '#8aa39e' },
        ].map(function (item, i) {
          var ix = 28 + i * 112;
          return (
            <g key={i}>
              <rect x={ix} y={126} width={96} height={30} rx={4}
                fill={item.color} opacity={0.06} stroke={item.color} strokeWidth={0.5} />
              <text x={ix + 48} y={140} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={13} fontWeight={700} fill={item.color}>{item.val}</text>
              <text x={ix + 48} y={152} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">{item.label}</text>
              {i < 4 && (
                <text x={ix + 104} y={140} fontFamily="'Outfit',sans-serif" fontSize={11} fill="#ddd">→</text>
              )}
            </g>
          );
        })}

        {/* Defense callout */}
        <rect x={60} y={166} width={W - 120} height={18} rx={9}
          fill="#198754" opacity={0.06} stroke="#198754" strokeWidth={0.5} />
        <text x={W / 2} y={178} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#198754">
          Defense opportunity: actual data typically shows rates well below blanket allegations
        </text>
        <text x={W / 2} y={196} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb">
          Forensic economist required · Coordinate with payroll records
        </text>
        <text x={W / 2} y={208} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Duran v. U.S. Bank National Assn. (2014) 59 Cal.4th 1
        </text>
      </svg>
    </div>
  );
}


/* Insight 7 — Headless PAGA: Appellate split timeline + statutory text + defense strategy */
export function LeeperTimelineDiagram() {
  var W = 580, H = 300;
  var events = [
    { year: '2003', label: '"or" → "and"', sub: 'Legislative change', x: 60, color: '#888' },
    { year: '2022', label: 'Viking River', sub: 'Individual vs.\nrepresentative split', x: 180, color: '#2c3e3a' },
    { year: '2024', label: 'Appellate Split', sub: 'Leeper, Balderas\nconflicting rulings', x: 320, color: '#CC8800' },
    { year: '2025', label: 'Review Granted', sub: 'Cal. Supreme Court\nApril 16, 2025', x: 430, color: '#dc3545' },
    { year: '2026', label: 'Decision', sub: 'Expected mid-to-\nlate 2026', x: 530, color: '#198754' },
  ];
  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          HEADLESS PAGA — TIMELINE TO RESOLUTION
        </text>
        {/* Timeline line */}
        <line x1={40} y1={56} x2={550} y2={56} stroke="#e0e0e0" strokeWidth={2} />
        {events.map(function (e, i) {
          return (
            <g key={i}>
              <circle cx={e.x} cy={56} r={5} fill={e.color} />
              <text x={e.x} y={42} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={700} fill={e.color}>
                {e.year}
              </text>
              <text x={e.x} y={74} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#333">
                {e.label}
              </text>
              {e.sub.split('\n').map(function (line, li) {
                return (
                  <text key={li} x={e.x} y={86 + li * 11} textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#888">
                    {line}
                  </text>
                );
              })}
            </g>
          );
        })}
        {/* 19-year gap annotation */}
        <line x1={60} y1={34} x2={180} y2={34} stroke="#ccc" strokeWidth={0.5} />
        <text x={120} y={30} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fill="#bbb">19-year gap</text>

        {/* Split courts */}
        <text x={145} y={126} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#dc3545">PROHIBITED</text>
        <rect x={40} y={132} width={210} height={38} rx={4}
          fill="#dc3545" opacity={0.06} stroke="#dc3545" strokeWidth={0.5} />
        <text x={145} y={148} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#333">
          Leeper v. Shipt (2024)
        </text>
        <text x={145} y={162} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#333">
          Williams v. Alacrity (2025)
        </text>

        <text x={435} y={126} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#198754">PERMITTED</text>
        <rect x={330} y={132} width={210} height={38} rx={4}
          fill="#198754" opacity={0.06} stroke="#198754" strokeWidth={0.5} />
        <text x={435} y={148} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#333">
          Balderas v. Fresh Start (2024)
        </text>
        <text x={435} y={162} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#333">
          Rodriguez v. Packers (2025)
        </text>

        {/* VS */}
        <text x={W / 2} y={155} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={700} fill="#ccc">
          vs.
        </text>

        {/* Pending resolution note */}
        <rect x={W / 2 - 130} y={182} width={260} height={20} rx={10}
          fill="#CC8800" opacity={0.08} stroke="#CC8800" strokeWidth={0.75} />
        <text x={W / 2} y={196} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#CC8800">
          Cal. Supreme Court review pending — plan for both outcomes
        </text>
        {/* Statutory text comparison */}
        <text x={W / 2} y={214} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          § 2699(g)(1) — STATUTORY TEXT AT ISSUE
        </text>
        <rect x={60} y={222} width={200} height={22} rx={3}
          fill="#888" opacity={0.06} stroke="#888" strokeWidth={0.5} />
        <text x={160} y={236} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
          Pre-2003: individual "or" representative
        </text>
        <text x={W / 2} y={236} fontFamily="'Outfit',sans-serif" fontSize={12} fill="#ccc">→</text>
        <rect x={320} y={222} width={200} height={22} rx={3}
          fill="#dc3545" opacity={0.06} stroke="#dc3545" strokeWidth={0.5} />
        <text x={420} y={236} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#dc3545">
          Post-2003: individual "and" representative
        </text>

        {/* Defense strategy */}
        <text x={W / 2} y={260} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#4a7a6f">
          DEFENSE STRATEGY — PREPARE FOR BOTH OUTCOMES
        </text>
        <rect x={40} y={266} width={240} height={18} rx={3}
          fill="#dc3545" opacity={0.04} stroke="#dc3545" strokeWidth={0.5} />
        <text x={160} y={279} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#dc3545">
          If prohibited: motion to dismiss representative claims
        </text>
        <rect x={300} y={266} width={240} height={18} rx={3}
          fill="#198754" opacity={0.04} stroke="#198754" strokeWidth={0.5} />
        <text x={420} y={279} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#198754">
          If permitted: manageability defense under § 2699(p)
        </text>

        <text x={W / 2} y={298} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Cal. Supreme Court S289305 · Decision expected mid-to-late 2026
        </text>
      </svg>
    </div>
  );
}


/* Insight 8 — Moniz three-part settlement test + Kullar deficiencies + motion requirements */
export function MonizDiagram() {
  var W = 580, H = 280;
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
        {/* Kullar deficiency checklist */}
        <text x={W / 2} y={126} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#dc3545">
          KULLAR REVERSAL DEFICIENCIES
        </text>
        {['× No time records reviewed', '× No penalty quantification', '× No settlement methodology'].map(function (item, i) {
          return (
            <text key={i} x={40 + i * 190} y={142}
              fontFamily="'Outfit',sans-serif" fontSize={8} fill="#dc3545">{item}</text>
          );
        })}

        {/* Required motion elements */}
        <text x={W / 2} y={162} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#198754">
          REQUIRED MOTION ELEMENTS
        </text>
        {['✓ Summarize Kullar holding', '✓ Identify reversal deficiencies', '✓ Distinguish present case'].map(function (item, i) {
          return (
            <text key={i} x={40 + i * 190} y={178}
              fontFamily="'Outfit',sans-serif" fontSize={8} fill="#198754">{item}</text>
          );
        })}

        {/* Sophistication markers */}
        <text x={W / 2} y={200} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          MARKERS OF SOPHISTICATED PRACTICE
        </text>
        {[
          'Claim-by-claim risk analysis',
          'Brinker "provide not ensure"',
          'Scienter requirements',
          'Negative lodestar multiplier',
        ].map(function (marker, i) {
          var mx = 30 + i * 138;
          return (
            <g key={i}>
              <rect x={mx} y={208} width={130} height={16} rx={3}
                fill="#2c3e3a" opacity={0.04} stroke="#2c3e3a" strokeWidth={0.5} />
              <text x={mx + 65} y={219} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#555">{marker}</text>
            </g>
          );
        })}

        {/* Motion stats */}
        <rect x={W / 2 - 130} y={234} width={260} height={24} rx={4}
          fill="#f9faf9" stroke="#e0e0e0" strokeWidth={0.5} />
        {[
          { val: '20', label: 'pages' },
          { val: '41', label: 'citations' },
          { val: '3', label: 'databases' },
        ].map(function (stat, i) {
          return (
            <g key={i}>
              <text x={W / 2 - 80 + i * 80} y={248} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={12} fontWeight={700} fill="#2c3e3a">{stat.val}</text>
              <text x={W / 2 - 80 + i * 80} y={256} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">{stat.label}</text>
            </g>
          );
        })}

        <text x={W / 2} y={276} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Moniz v. Adecco (2021) 72 Cal.App.5th 56 · Kullar v. Foot Locker (2008) 168 Cal.App.4th 116
        </text>
      </svg>
    </div>
  );
}


/* Insight 9 — Expert deposition 6-domain framework + attack questions + CI viz */
export function ExpertDeposDiagram() {
  var W = 580, H = 250;
  var domains = [
    { num: '1', label: 'Population', color: '#2c3e3a', question: 'Does universe match class?' },
    { num: '2', label: 'Selection', color: '#4a7a6f', question: 'Was sample truly random?' },
    { num: '3', label: 'Violation Def.', color: '#8aa39e', question: '28-min meal = violation?' },
    { num: '4', label: 'Paid Premiums', color: '#CC8800', question: 'Credits already paid?' },
    { num: '5', label: 'Confidence', color: '#dc3545', question: 'CI properly disclosed?' },
    { num: '6', label: 'Aff. Defenses', color: '#2c3e3a', question: 'Individual defenses?' },
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
              <rect x={x} y={30} width={boxW} height={84} rx={4}
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
              {/* Attack question */}
              <text x={x + boxW / 2} y={90} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={6.5} fill={d.color} fontStyle="italic">
                {d.question}
              </text>
              <line x1={x + 8} y1={100} x2={x + boxW - 8} y2={100}
                stroke={d.color} strokeWidth={0.3} opacity={0.4} />
              <text x={x + boxW / 2} y={108} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={6.5} fill="#888">
                Attack vector
              </text>
            </g>
          );
        })}

        {/* Confidence interval visualization */}
        <text x={W / 2} y={136} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#CC8800">
          CONFIDENCE INTERVAL VISUALIZATION
        </text>
        <line x1={100} y1={156} x2={480} y2={156} stroke="#e0e0e0" strokeWidth={1} />
        {/* CI range bar */}
        <rect x={180} y={149} width={200} height={14} rx={7} fill="#dc3545" opacity={0.08} stroke="#dc3545" strokeWidth={0.5} />
        <text x={180} y={146} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#dc3545">33%</text>
        <text x={380} y={146} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#dc3545">57%</text>
        {/* Center point */}
        <circle cx={280} cy={156} r={5} fill="#CC8800" />
        <text x={280} y={146} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={700} fill="#CC8800">45%</text>
        <text x={280} y={176} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={8} fill="#CC8800">± 12 percentage points</text>
        <text x={280} y={190} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#dc3545">
          True violation rate could be anywhere in this range — worthless precision
        </text>
        {/* Scale labels */}
        <text x={100} y={162} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7} fill="#bbb">0%</text>
        <text x={480} y={162} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={7} fill="#bbb">100%</text>

        {/* Illustrative errors */}
        <text x={W / 2} y={210} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={1.5} fill="#dc3545">
          COMMON EXPERT ERRORS
        </text>
        {['Population: excluded departed workers', 'Violation: counted 28-min meals', 'Premiums: ignored already-paid'].map(function (err, i) {
          return (
            <text key={i} x={40 + i * 190} y={226}
              fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#dc3545">× {err}</text>
          );
        })}
        <text x={W / 2} y={246} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Duran v. U.S. Bank (2014) 59 Cal.4th 1 at p. 49
        </text>
      </svg>
    </div>
  );
}


/* Insight 10 — Regular Rate: formula + comparison + true-up + compounding */
export function RegularRateDiagram() {
  var W = 580, H = 300;
  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          REGULAR RATE CALCULATION ERROR
        </text>
        <text x={W / 2} y={28} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#999">
          Every pay period × every commissioned employee = compounding systemic underpayment
        </text>

        {/* Formula */}
        <rect x={40} y={38} width={W - 80} height={36} rx={4}
          fill="#2c3e3a" opacity={0.06} stroke="#2c3e3a" strokeWidth={1} />
        <text x={W / 2} y={54} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={1} fill="#2c3e3a">CORRECT FORMULA</text>
        <text x={W / 2} y={68} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={11} fontWeight={600} fill="#333">
          Regular Rate = (Base Pay + Commissions + Bonuses + Shift Diff.) ÷ Total Hours
        </text>

        {/* Wrong vs. Right comparison */}
        <rect x={40} y={86} width={240} height={56} rx={4}
          fill="#dc3545" opacity={0.06} stroke="#dc3545" strokeWidth={0.75} />
        <rect x={40} y={86} width={240} height={3} rx={1.5} fill="#dc3545" />
        <text x={160} y={104} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#dc3545">EMPLOYER CALCULATES</text>
        <text x={160} y={120} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={14} fontWeight={700} fill="#dc3545">
          $18/hr × 1.5x
        </text>
        <text x={160} y={134} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
          Base hourly only
        </text>

        {/* Arrow */}
        <text x={W / 2} y={118} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={16} fontWeight={300} fill="#ccc">→</text>

        <rect x={300} y={86} width={240} height={56} rx={4}
          fill="#198754" opacity={0.06} stroke="#198754" strokeWidth={0.75} />
        <rect x={300} y={86} width={240} height={3} rx={1.5} fill="#198754" />
        <text x={420} y={104} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#198754">STATUTE REQUIRES</text>
        <text x={420} y={120} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={14} fontWeight={700} fill="#198754">
          $24.50/hr × 1.5x
        </text>
        <text x={420} y={134} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
          Regular rate with all comp.
        </text>

        {/* Per-hour gap */}
        <rect x={W / 2 - 100} y={152} width={200} height={20} rx={10}
          fill="#dc3545" opacity={0.08} stroke="#dc3545" strokeWidth={0.75} />
        <text x={W / 2} y={166} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#dc3545">
          $3.25/OT hour underpayment × 0.5x premium
        </text>

        {/* True-up timeline */}
        <text x={W / 2} y={180} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          TRUE-UP PROBLEM — RETROACTIVE RECALCULATION
        </text>
        <line x1={80} y1={200} x2={500} y2={200} stroke="#e0e0e0" strokeWidth={1.5} />
        {[
          { x: 120, label: 'Commission Earned', sub: 'Week A', color: '#198754' },
          { x: 290, label: 'Commission Calculable', sub: 'Weeks later', color: '#CC8800' },
          { x: 460, label: 'Shortfall Owed', sub: 'Retroactive', color: '#dc3545' },
        ].map(function (evt, i) {
          return (
            <g key={i}>
              <circle cx={evt.x} cy={200} r={4} fill={evt.color} />
              <text x={evt.x} y={192} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#333">{evt.label}</text>
              <text x={evt.x} y={214} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill={evt.color}>{evt.sub}</text>
            </g>
          );
        })}
        <rect x={150} y={196} width={110} height={8} rx={4} fill="#CC8800" opacity={0.08} />
        <text x={205} y={202} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize={5.5} fill="#CC8800">PAYROLL GAP</text>

        {/* Alvarado denominator distinction */}
        <text x={W / 2} y={236} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#4a7a6f">
          ALVARADO DENOMINATOR RULE
        </text>
        <rect x={80} y={242} width={180} height={18} rx={3}
          fill="#dc3545" opacity={0.06} stroke="#dc3545" strokeWidth={0.5} />
        <text x={170} y={254} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#dc3545">
          ÷ Total hours (WRONG)
        </text>
        <text x={W / 2} y={254} fontFamily="'Outfit',sans-serif" fontSize={10} fill="#ccc">vs.</text>
        <rect x={320} y={242} width={180} height={18} rx={3}
          fill="#198754" opacity={0.06} stroke="#198754" strokeWidth={0.5} />
        <text x={410} y={254} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#198754">
          ÷ Non-OT hours only (CORRECT)
        </text>

        {/* Compounding effect */}
        <rect x={60} y={268} width={W - 120} height={16} rx={8}
          fill="#dc3545" opacity={0.06} />
        <text x={W / 2} y={279} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#dc3545">
          $3.25/hr × 0.5x × OT hours × 50 employees × 26 pay periods = systemic PAGA exposure
        </text>

        <text x={W / 2} y={298} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Ferra v. Loews (2021) 11 Cal.5th 858 · Alvarado v. Dart (2018) 4 Cal.5th 542
        </text>
      </svg>
    </div>
  );
}


/* Insight 11 — Naranjo cascade: multiplier arithmetic + 4-stream breakdown + total */
export function NaranjoMultiplierDiagram() {
  var W = 580, H = 310;
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

        {/* 4-stream cascade */}
        <text x={W / 2} y={150} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          FOUR INDEPENDENT PENALTY STREAMS
        </text>
        {[
          { num: '1', label: '§ 226.7 Premium', amount: '1 hr × reg. rate', type: 'WAGE', recoverable: false, color: '#2c3e3a' },
          { num: '2', label: '§ 2699(f) PAGA', amount: '$100/$200 per emp/pp', type: 'PENALTY', recoverable: true, color: '#4a7a6f' },
          { num: '3', label: '§ 226(e) Wage Stmt', amount: '$50/$100, cap $4K', type: 'DERIVATIVE', recoverable: true, color: '#dc3545' },
          { num: '4', label: '§ 203 Waiting', amount: 'Up to 30 days', type: 'DERIVATIVE', recoverable: true, color: '#dc3545' },
        ].map(function (s, i) {
          var sx = 20 + i * 140;
          return (
            <g key={i}>
              <rect x={sx} y={158} width={130} height={72} rx={4}
                fill={s.color} opacity={0.06} stroke={s.color} strokeWidth={0.75} />
              <circle cx={sx + 65} cy={172} r={10} fill={s.color} />
              <text x={sx + 65} y={176} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={700} fill="#fff">{s.num}</text>
              <text x={sx + 65} y={194} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#333">{s.label}</text>
              <text x={sx + 65} y={206} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">{s.amount}</text>
              <rect x={sx + 25} y={212} width={80} height={12} rx={6}
                fill={s.recoverable ? '#198754' : '#dc3545'} opacity={0.12} />
              <text x={sx + 65} y={221} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={6.5} fontWeight={600}
                fill={s.recoverable ? '#198754' : '#dc3545'} letterSpacing={0.5}>
                {s.recoverable ? 'RECOVERABLE' : 'NOT PAGA (Kirby)'}
              </text>
            </g>
          );
        })}

        {/* Total exposure */}
        <rect x={60} y={240} width={W - 120} height={30} rx={4}
          fill="#dc3545" opacity={0.04} stroke="#dc3545" strokeWidth={0.75} />
        <text x={W / 2} y={254} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={700} fill="#dc3545">
          50 emps × 26 pp → ~$260,000 PAGA-recoverable from meal violations alone
        </text>
        <text x={W / 2} y={264} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
          Before the underlying premium is even calculated
        </text>

        {/* 5-10x multiplier */}
        <rect x={W / 2 - 100} y={278} width={200} height={16} rx={8}
          fill="#dc3545" opacity={0.08} />
        <text x={W / 2} y={290} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={700} fill="#dc3545">
          Demands appear 5–10× larger than underlying wages
        </text>

        <text x={W / 2} y={308} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Naranjo v. Spectrum Security Services (2022) 13 Cal.5th 93
        </text>
      </svg>
    </div>
  );
}


/* Insight 12 — Manageability scope-narrowing funnel + scenarios + timing */
export function ManageabilityDiagram() {
  var W = 560, H = 310;
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
        {/* 3 scenario types */}
        <text x={W / 2} y={178} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          STRONG MANAGEABILITY SCENARIOS
        </text>
        {[
          { label: 'Staffing Firm', detail: '14 different client worksites\nDifferent scheduling practices', color: '#2c3e3a' },
          { label: 'Hotel Chain', detail: 'Properties in different cities\nDifferent local ordinances', color: '#4a7a6f' },
          { label: 'Dealership Group', detail: 'Commission + flat-rate + salaried\nAll in one PAGA notice', color: '#8aa39e' },
        ].map(function (sc, i) {
          var sx = 18 + i * 182;
          return (
            <g key={i}>
              <rect x={sx} y={186} width={170} height={44} rx={4}
                fill={sc.color} opacity={0.06} stroke={sc.color} strokeWidth={0.5} />
              <text x={sx + 85} y={200} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill={sc.color}>{sc.label}</text>
              {sc.detail.split('\n').map(function (line, li) {
                return (
                  <text key={li} x={sx + 85} y={212 + li * 10} textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={6.5} fill="#888">{line}</text>
                );
              })}
            </g>
          );
        })}

        {/* Timing diagram */}
        <text x={W / 2} y={248} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#4a7a6f">
          MOTION TIMING — FILE EARLY
        </text>
        <line x1={40} y1={262} x2={520} y2={262} stroke="#e0e0e0" strokeWidth={1} />
        {[
          { x: 80, label: 'Early Evaluation', sub: '§ 2699.3(f)', color: '#198754' },
          { x: 220, label: '§ 2699(p) Motion', sub: 'Scope limitation', color: '#4a7a6f' },
          { x: 360, label: 'Discovery Phase', sub: 'Narrowed scope', color: '#8aa39e' },
          { x: 480, label: 'Trial', sub: 'Manageable claims', color: '#2c3e3a' },
        ].map(function (evt, i) {
          return (
            <g key={i}>
              <circle cx={evt.x} cy={262} r={3.5} fill={evt.color} />
              <text x={evt.x} y={255} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600} fill="#333">{evt.label}</text>
              <text x={evt.x} y={275} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill={evt.color}>{evt.sub}</text>
            </g>
          );
        })}

        <rect x={W / 2 - 150} y={284} width={300} height={14} rx={7}
          fill="#dc3545" opacity={0.06} />
        <text x={W / 2} y={294} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600} fill="#dc3545">
          Filing late forfeits the opportunity to narrow before discovery costs accrue
        </text>

        <text x={W / 2} y={H - 4} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582 · Codified by AB 2288
        </text>
      </svg>
    </div>
  );
}
