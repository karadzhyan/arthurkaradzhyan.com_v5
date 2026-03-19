/*
 * Per-case diagrams for individual case law pages.
 * Each function returns an inline SVG diagram specific to the case's legal framework.
 * Server component — no hooks.
 */

/* Brinker: 4-element compliance checklist + timing rules */
export function BrinkerDiagram() {
  var elements = [
    { num: '1', text: 'Relieve of all duty', detail: 'Employee must be free from employer control' },
    { num: '2', text: 'Relinquish control', detail: 'No oversight of employee activities during break' },
    { num: '3', text: 'Permit 30-min opportunity', detail: 'Reasonable opportunity for uninterrupted break' },
    { num: '4', text: 'Do not impede or discourage', detail: 'No pressure — explicit or implicit — to skip' },
  ];
  var W = 580, elH = 52, gap = 8, padT = 40;
  var H = padT + elements.length * (elH + gap) + 100;

  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={18} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          BRINKER FOUR-ELEMENT COMPLIANCE STANDARD
        </text>
        <text x={W / 2} y={32} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#999">
          Employer satisfies meal period obligation when ALL four are met
        </text>

        {elements.map(function (el, i) {
          var y = padT + i * (elH + gap);
          return (
            <g key={i}>
              <rect x={0} y={y} width={W} height={elH} rx={4}
                fill="#f9faf9" stroke="#e0e0e0" strokeWidth={0.75} />
              {/* Number badge */}
              <circle cx={28} cy={y + elH / 2} r={14}
                fill="#2c3e3a" />
              <text x={28} y={y + elH / 2 + 4} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={12} fontWeight={700} fill="#fff">
                {el.num}
              </text>
              {/* Text */}
              <text x={56} y={y + 22}
                fontFamily="'Libre Baskerville',serif" fontSize={12} fontWeight={700} fill="#333">
                {el.text}
              </text>
              <text x={56} y={y + 38}
                fontFamily="'Outfit',sans-serif" fontSize={9} fill="#888">
                {el.detail}
              </text>
            </g>
          );
        })}

        {/* Timing rules */}
        {(function () {
          var ty = padT + elements.length * (elH + gap) + 16;
          return (
            <g>
              <text x={W / 2} y={ty} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
                letterSpacing={2} fill="#dc3545">
                TIMING RULES
              </text>
              <rect x={40} y={ty + 8} width={220} height={36} rx={3}
                fill="#fff0f0" stroke="#dc3545" strokeWidth={0.75} />
              <text x={150} y={ty + 28} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={600} fill="#dc3545">
                1st Meal: by end of Hour 5
              </text>
              <text x={150} y={ty + 40} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fill="#999">
                Lab. Code § 512(a)
              </text>

              <rect x={320} y={ty + 8} width={220} height={36} rx={3}
                fill="#fff0f0" stroke="#dc3545" strokeWidth={0.75} />
              <text x={430} y={ty + 28} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={600} fill="#dc3545">
                2nd Meal: by end of Hour 10
              </text>
              <text x={430} y={ty + 40} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fill="#999">
                Lab. Code § 512(a)
              </text>

              <text x={W / 2} y={ty + 62} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fill="#bbb" fontStyle="italic">
                Brinker Restaurant Corp. v. Superior Court (2012) 53 Cal.4th 1004
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}


/* ZB, N.A.: 3-step recoverability decision tree */
export function ZBDiagram() {
  var W = 580, H = 280;
  var cx = W / 2;

  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={cx} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          ZB, N.A. RECOVERABILITY ANALYSIS
        </text>

        {/* Step 1 */}
        <rect x={cx - 130} y={30} width={260} height={40} rx={4}
          fill="#2c3e3a" />
        <text x={cx} y={48} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#8aa39e">STEP 1</text>
        <text x={cx} y={62} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill="#fff">
          Is there a specific civil penalty statute?
        </text>

        {/* Branches from Step 1 */}
        <line x1={cx - 40} y1={70} x2={cx - 100} y2={100} stroke="#e0e0e0" strokeWidth={1} />
        <line x1={cx + 40} y1={70} x2={cx + 100} y2={100} stroke="#e0e0e0" strokeWidth={1} />
        <text x={cx - 80} y={88} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#198754">YES</text>
        <text x={cx + 80} y={88} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#dc3545">NO</text>

        {/* Step 2 (YES branch) */}
        <rect x={cx - 230} y={100} width={260} height={40} rx={4}
          fill="#4a7a6f" />
        <text x={cx - 100} y={118} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#c8e0db">STEP 2</text>
        <text x={cx - 100} y={132} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill="#fff">
          Is it recoverable through PAGA?
        </text>

        {/* NO branch → Default penalty */}
        <rect x={cx + 50} y={100} width={180} height={40} rx={4}
          fill="#dc3545" opacity={0.1} stroke="#dc3545" strokeWidth={0.75} />
        <text x={cx + 140} y={118} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#dc3545">
          DEFAULT PENALTY APPLIES
        </text>
        <text x={cx + 140} y={132} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#dc3545">
          § 2699(f)(2): $100 / $200
        </text>

        {/* Branches from Step 2 */}
        <line x1={cx - 140} y1={140} x2={cx - 200} y2={170} stroke="#e0e0e0" strokeWidth={1} />
        <line x1={cx - 60} y1={140} x2={cx} y2={170} stroke="#e0e0e0" strokeWidth={1} />
        <text x={cx - 180} y={158} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#198754">YES</text>
        <text x={cx - 20} y={158} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#dc3545">NO</text>

        {/* YES → Specific penalty */}
        <rect x={cx - 290} y={170} width={180} height={50} rx={4}
          fill="#198754" opacity={0.1} stroke="#198754" strokeWidth={0.75} />
        <text x={cx - 200} y={188} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#198754">
          SPECIFIC PENALTY APPLIES
        </text>
        <text x={cx - 200} y={202} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#555">
          e.g., § 558: $50 / $100
        </text>
        <text x={cx - 200} y={214} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#999">
          Per employee per pay period
        </text>

        {/* NO → Step 3 */}
        <rect x={cx - 90} y={170} width={180} height={50} rx={4}
          fill="#8aa39e" opacity={0.15} stroke="#8aa39e" strokeWidth={0.75} />
        <text x={cx} y={185} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">STEP 3</text>
        <text x={cx} y={198} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#555">
          Default penalty: § 2699(f)(2)
        </text>
        <text x={cx} y={211} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#555">
          $100 initial / $200 subsequent
        </text>

        {/* Key exclusions */}
        <text x={cx} y={244} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#dc3545">
          KEY EXCLUSIONS (NOT RECOVERABLE AS PAGA PENALTIES)
        </text>
        {['Overtime underpayments', 'Meal/rest premiums (Kirby)', 'Unreimbursed expenses'].map(function (ex, i) {
          var exX = cx - 150 + i * 150;
          return (
            <text key={i} x={exX} y={260} textAnchor="middle"
              fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#999">
              × {ex}
            </text>
          );
        })}

        <text x={cx} y={276} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175
        </text>
      </svg>
    </div>
  );
}


/* Hohenshelt: 3-part forfeiture standard */
export function HohensheltDiagram() {
  var W = 580, H = 220;
  var standards = [
    { label: 'Willful', desc: 'Deliberate refusal\nto pay', icon: '×', color: '#dc3545' },
    { label: 'Grossly\nNegligent', desc: 'Inexcusable failure\nto supervise', icon: '!', color: '#CC8800' },
    { label: 'Fraudulent', desc: 'Deceptive conduct\nto avoid payment', icon: '⚠', color: '#dc3545' },
  ];
  var boxW = 150, boxH = 100, gap = 30;
  var totalW = standards.length * boxW + (standards.length - 1) * gap;
  var startX = (W - totalW) / 2;

  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          HOHENSHELT FORFEITURE STANDARD
        </text>
        <text x={W / 2} y={30} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#999">
          Arbitration fee forfeiture requires at least ONE of the following:
        </text>

        {standards.map(function (s, i) {
          var x = startX + i * (boxW + gap);
          var y = 44;
          return (
            <g key={i}>
              <rect x={x} y={y} width={boxW} height={boxH} rx={6}
                fill={s.color + '08'} stroke={s.color} strokeWidth={1} />
              {/* Icon */}
              <circle cx={x + boxW / 2} cy={y + 24} r={12}
                fill={s.color} opacity={0.15} />
              <text x={x + boxW / 2} y={y + 28} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={14} fontWeight={700} fill={s.color}>
                {s.icon}
              </text>
              {/* Label */}
              {s.label.split('\n').map(function (line, li) {
                return (
                  <text key={li} x={x + boxW / 2} y={y + 52 + li * 14} textAnchor="middle"
                    fontFamily="'Libre Baskerville',serif" fontSize={11} fontWeight={700} fill="#333">
                    {line}
                  </text>
                );
              })}
              {/* Description */}
              {s.desc.split('\n').map(function (line, li) {
                return (
                  <text key={'d' + li} x={x + boxW / 2} y={y + 80 + li * 11} textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
                    {line}
                  </text>
                );
              })}
              {/* OR connectors */}
              {i < standards.length - 1 && (
                <text x={x + boxW + gap / 2} y={y + boxH / 2 + 4} textAnchor="middle"
                  fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={700} fill="#ccc">
                  OR
                </text>
              )}
            </g>
          );
        })}

        {/* Outcome */}
        <rect x={W / 2 - 120} y={160} width={240} height={32} rx={4}
          fill="#198754" opacity={0.08} stroke="#198754" strokeWidth={0.75} />
        <text x={W / 2} y={178} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#198754">
          If NONE → Equitable Relief From Forfeiture Applies
        </text>
        <text x={W / 2} y={190} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#198754">
          CCP § 1281.98 · Civil Code §§ 3275, 1511 · CCP § 473(b)
        </text>

        <text x={W / 2} y={212} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Hohenshelt v. Superior Court (2025) 18 Cal.5th 310 · 5-2 · Disapproved 7 prior decisions
        </text>
      </svg>
    </div>
  );
}


/* Leeper: Circuit split visualization */
export function LeeperDiagram() {
  var W = 580, H = 200;

  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          LEEPER v. SHIPT — CIRCUIT SPLIT
        </text>
        <text x={W / 2} y={30} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#999">
          Whether "headless" PAGA actions (representative claims without individual claims) are permitted
        </text>

        {/* Supreme Court at top */}
        <rect x={W / 2 - 100} y={42} width={200} height={36} rx={4}
          fill="#2c3e3a" />
        <text x={W / 2} y={58} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#8aa39e">CALIFORNIA SUPREME COURT</text>
        <text x={W / 2} y={72} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill="#fff" fontWeight={600}>
          Review Granted · S289305
        </text>

        {/* Lines down */}
        <line x1={W / 2 - 80} y1={78} x2={140} y2={108} stroke="#e0e0e0" strokeWidth={1} />
        <line x1={W / 2 + 80} y1={78} x2={440} y2={108} stroke="#e0e0e0" strokeWidth={1} />

        {/* PROHIBITED side */}
        <rect x={40} y={108} width={200} height={56} rx={4}
          fill="#dc3545" opacity={0.06} stroke="#dc3545" strokeWidth={0.75} />
        <text x={140} y={124} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#dc3545">HEADLESS PAGA PROHIBITED</text>
        <text x={140} y={140} textAnchor="middle"
          fontFamily="'Libre Baskerville',serif" fontSize={10} fontWeight={700} fill="#333">
          Second District
        </text>
        <text x={140} y={156} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#888">
          Statutory text requires both individual + representative
        </text>

        {/* PERMITTED side */}
        <rect x={340} y={108} width={200} height={56} rx={4}
          fill="#198754" opacity={0.06} stroke="#198754" strokeWidth={0.75} />
        <text x={440} y={124} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#198754">HEADLESS PAGA PERMITTED</text>
        <text x={440} y={140} textAnchor="middle"
          fontFamily="'Libre Baskerville',serif" fontSize={10} fontWeight={700} fill="#333">
          Fourth & Fifth Districts
        </text>
        <text x={440} y={156} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#888">
          Adolph preserves standing; no individual claim needed
        </text>

        {/* Decision pending */}
        <rect x={W / 2 - 90} y={176} width={180} height={18} rx={9}
          fill="none" stroke="#dc3545" strokeWidth={0.75} />
        <text x={W / 2} y={189} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={1} fill="#dc3545">
          DECISION EXPECTED MID-TO-LATE 2026
        </text>
      </svg>
    </div>
  );
}


/* Naranjo: 4-stream derivative cascade (for case page — simplified version of NaranjoCascade) */
export function NaranjoCaseDiagram() {
  var streams = [
    { num: '1', label: 'Meal/Rest Premium', statute: '§ 226.7', type: 'WAGE', color: '#2c3e3a' },
    { num: '2', label: 'PAGA Default Penalty', statute: '§ 2699(f)(2)', type: 'PENALTY', color: '#4a7a6f' },
    { num: '3', label: 'Wage Statement Penalty', statute: '§ 226(e)', type: 'DERIVATIVE', color: '#dc3545' },
    { num: '4', label: 'Waiting Time Penalty', statute: '§ 203', type: 'DERIVATIVE', color: '#dc3545' },
  ];
  var W = 580, H = 220;

  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          NARANJO DERIVATIVE CASCADE
        </text>
        <text x={W / 2} y={30} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#999">
          One missed meal period → four independent penalty streams
        </text>

        {/* Source violation */}
        <rect x={W / 2 - 100} y={40} width={200} height={32} rx={4}
          fill="#2c3e3a" />
        <text x={W / 2} y={60} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fill="#fff" fontWeight={600}>
          Missed Meal Period
        </text>

        {/* Fan out lines */}
        {streams.map(function (s, i) {
          var sx = 70 + i * 150;
          return (
            <line key={'line' + i} x1={W / 2} y1={72} x2={sx} y2={100}
              stroke="#e0e0e0" strokeWidth={1} />
          );
        })}

        {/* Stream boxes */}
        {streams.map(function (s, i) {
          var sx = 70 + i * 150;
          var bx = sx - 60;
          return (
            <g key={i}>
              <rect x={bx} y={100} width={120} height={80} rx={4}
                fill={s.color + '08'} stroke={s.color} strokeWidth={0.75} />
              <circle cx={sx} cy={116} r={12}
                fill={s.color} />
              <text x={sx} y={120} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={11} fontWeight={700} fill="#fff">
                {s.num}
              </text>
              <text x={sx} y={142} textAnchor="middle"
                fontFamily="'Libre Baskerville',serif" fontSize={9} fontWeight={700} fill="#333">
                {s.label}
              </text>
              <text x={sx} y={156} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
                {s.statute}
              </text>
              <rect x={sx - 24} y={162} width={48} height={12} rx={6}
                fill={s.color} opacity={0.15} />
              <text x={sx} y={171} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600}
                fill={s.color} letterSpacing={1}>
                {s.type}
              </text>
            </g>
          );
        })}

        <text x={W / 2} y={206} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Naranjo v. Spectrum Security Services (2022) 13 Cal.5th 93
        </text>
      </svg>
    </div>
  );
}


/* Alvarado: Side-by-side rate comparison */
export function AlvaradoDiagram() {
  var W = 580, H = 170;

  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          ALVARADO — FLAT-SUM BONUS METHODOLOGY
        </text>

        {/* Wrong method */}
        <rect x={20} y={30} width={250} height={100} rx={4}
          fill="#dc3545" opacity={0.04} stroke="#dc3545" strokeWidth={0.75} />
        <rect x={20} y={30} width={250} height={3} rx={1.5}
          fill="#dc3545" />
        <text x={145} y={52} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#dc3545">INCORRECT (MOST PAYROLL SYSTEMS)</text>
        <text x={145} y={78} textAnchor="middle"
          fontFamily="'Libre Baskerville',serif" fontSize={13} fill="#333">
          Bonus ÷ Total Hours
        </text>
        <text x={145} y={96} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#888">
          = Lower regular rate
        </text>
        <text x={145} y={112} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#dc3545">
          = Systematic underpayment
        </text>

        {/* VS */}
        <text x={W / 2} y={86} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={12} fontWeight={700} fill="#ccc">
          vs.
        </text>

        {/* Correct method */}
        <rect x={310} y={30} width={250} height={100} rx={4}
          fill="#198754" opacity={0.04} stroke="#198754" strokeWidth={0.75} />
        <rect x={310} y={30} width={250} height={3} rx={1.5}
          fill="#198754" />
        <text x={435} y={52} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#198754">CORRECT (ALVARADO)</text>
        <text x={435} y={78} textAnchor="middle"
          fontFamily="'Libre Baskerville',serif" fontSize={13} fill="#333">
          Bonus ÷ Non-OT Hours
        </text>
        <text x={435} y={96} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#888">
          = Higher regular rate
        </text>
        <text x={435} y={112} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#198754">
          = Correct OT premium + Ferra premium
        </text>

        <text x={W / 2} y={152} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#dc3545" fontWeight={600}>
          Gap × OT hours × workforce × pay periods = aggregate exposure
        </text>
        <text x={W / 2} y={166} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Alvarado v. Dart Container Corp. (2018) 4 Cal.5th 542
        </text>
      </svg>
    </div>
  );
}


/* Donohue: Presumption flow */
export function DonohueDiagram() {
  var W = 580, H = 140;

  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          DONOHUE PRESUMPTION FLOW
        </text>

        {/* Trigger */}
        <rect x={20} y={30} width={140} height={50} rx={4}
          fill="#dc3545" opacity={0.08} stroke="#dc3545" strokeWidth={0.75} />
        <text x={90} y={52} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={1} fill="#dc3545">TRIGGER</text>
        <text x={90} y={66} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#333">
          Punch {'<'} 30 min
        </text>
        <text x={90} y={76} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
          or no punch at all
        </text>

        {/* Arrow */}
        <line x1={160} y1={55} x2={200} y2={55} stroke="#e0e0e0" strokeWidth={1.5} />
        <polygon points="198,50 208,55 198,60" fill="#e0e0e0" />

        {/* Presumption */}
        <rect x={210} y={30} width={170} height={50} rx={4}
          fill="#CC8800" opacity={0.08} stroke="#CC8800" strokeWidth={0.75} />
        <text x={295} y={50} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={1} fill="#CC8800">REBUTTABLE PRESUMPTION</text>
        <text x={295} y={66} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#333">
          Employer failed to provide
        </text>
        <text x={295} y={76} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
          Burden shifts to employer
        </text>

        {/* Arrow */}
        <line x1={380} y1={55} x2={420} y2={55} stroke="#e0e0e0" strokeWidth={1.5} />
        <polygon points="418,50 428,55 418,60" fill="#e0e0e0" />

        {/* Defense */}
        <rect x={430} y={30} width={130} height={50} rx={4}
          fill="#198754" opacity={0.08} stroke="#198754" strokeWidth={0.75} />
        <text x={495} y={48} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={1} fill="#198754">DEFENSE REBUTTAL</text>
        <text x={495} y={62} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#333">
          Compliant policy +
        </text>
        <text x={495} y={74} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#333">
          attestation system
        </text>

        {/* Rounding bar */}
        <rect x={20} y={96} width={540} height={24} rx={4}
          fill="#dc3545" opacity={0.04} stroke="#dc3545" strokeWidth={0.75} />
        <text x={W / 2} y={112} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#dc3545">
          ROUNDING PROHIBITED — Cannot round away meal period violations
        </text>

        <text x={W / 2} y={136} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Donohue v. AMN Services (2021) 11 Cal.5th 58
        </text>
      </svg>
    </div>
  );
}
