/*
 * Per-case diagrams for individual case law pages.
 * Each function returns an inline SVG diagram specific to the case's legal framework.
 * Server component — no hooks.
 */

/* Brinker: 4-element compliance checklist + violation examples + timing rules + shift timeline */
export function BrinkerDiagram() {
  var elements = [
    { num: '1', text: 'Relieve of all duty', detail: 'Employee must be free from employer control', violation: 'Violation: on-premises requirement during meal' },
    { num: '2', text: 'Relinquish control', detail: 'No oversight of employee activities during break', violation: 'Violation: requiring phone monitoring' },
    { num: '3', text: 'Permit 30-min opportunity', detail: 'Reasonable opportunity for uninterrupted break', violation: 'Violation: scheduling conflicts preventing full 30 min' },
    { num: '4', text: 'Do not impede or discourage', detail: 'No pressure — explicit or implicit — to skip', violation: 'Violation: culture of working through breaks' },
  ];
  var W = 580, elH = 62, gap = 8, padT = 40;
  var H = padT + elements.length * (elH + gap) + 160;

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
              <text x={56} y={y + 52}
                fontFamily="'Outfit',sans-serif" fontSize={8} fill="#dc3545" fontStyle="italic">
                {el.violation}
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

              {/* Provide not ensure */}
              <rect x={80} y={ty + 54} width={W - 160} height={20} rx={10}
                fill="#4a7a6f" opacity={0.06} stroke="#4a7a6f" strokeWidth={0.5} />
              <text x={W / 2} y={ty + 67} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8.5} fontWeight={600} fill="#4a7a6f">
                Brinker standard: employer must PROVIDE opportunity — not ENSURE it is taken
              </text>

              {/* Shift timeline */}
              <text x={W / 2} y={ty + 90} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
                letterSpacing={2} fill="#2c3e3a">
                SHIFT TIMELINE
              </text>
              <line x1={40} y1={ty + 102} x2={540} y2={ty + 102} stroke="#e0e0e0" strokeWidth={1.5} />
              {[1,2,3,4,5,6,7,8,9,10].map(function (hr) {
                var hx = 40 + (hr - 1) * 55.5;
                var isMeal = hr === 5 || hr === 10;
                return (
                  <g key={hr}>
                    <circle cx={hx} cy={ty + 102} r={isMeal ? 5 : 2.5}
                      fill={isMeal ? '#dc3545' : '#2c3e3a'} opacity={isMeal ? 0.8 : 0.4} />
                    <text x={hx} y={ty + 118} textAnchor="middle"
                      fontFamily="'Outfit',sans-serif" fontSize={7}
                      fontWeight={isMeal ? 700 : 400}
                      fill={isMeal ? '#dc3545' : '#999'}>
                      Hr {hr}
                    </text>
                    {isMeal && (
                      <text x={hx} y={ty + 95} textAnchor="middle"
                        fontFamily="'Outfit',sans-serif" fontSize={6.5} fontWeight={600} fill="#dc3545">
                        {hr === 5 ? '1st MEAL' : '2nd MEAL'}
                      </text>
                    )}
                  </g>
                );
              })}

              <text x={W / 2} y={ty + 136} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#8aa39e">
                See: Donohue presumption for punch data analysis
              </text>
              <text x={W / 2} y={ty + 150} textAnchor="middle"
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


/* ZB, N.A.: 3-step recoverability decision tree + demand reduction */
export function ZBDiagram() {
  var W = 580, H = 350;
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

        {/* Demand reduction visual */}
        <text x={cx} y={280} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#198754">
          DEMAND REDUCTION EXAMPLE
        </text>
        <rect x={cx - 200} y={288} width={160} height={22} rx={3}
          fill="#dc3545" opacity={0.06} stroke="#dc3545" strokeWidth={0.5} />
        <text x={cx - 120} y={302} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#dc3545">
          7-category demand: $1.2M
        </text>
        <text x={cx} y={302} fontFamily="'Outfit',sans-serif" fontSize={10} fill="#ccc">→</text>
        <rect x={cx + 40} y={288} width={160} height={22} rx={3}
          fill="#198754" opacity={0.06} stroke="#198754" strokeWidth={0.5} />
        <text x={cx + 120} y={302} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#198754">
          After stripping: $600K (–50%)
        </text>
        <text x={cx} y={324} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#888">
          Kirby v. Immoos (2012): § 226.7 premiums are wages, not penalties → not PAGA-recoverable
        </text>
        <text x={cx} y={342} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175
        </text>
      </svg>
    </div>
  );
}


/* Hohenshelt: 3-part forfeiture standard + evidence + spectrum */
export function HohensheltDiagram() {
  var W = 580, H = 300;
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

        {/* Spectrum annotation */}
        <text x={W / 2} y={216} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          FORFEITURE SPECTRUM
        </text>
        <line x1={80} y1={232} x2={500} y2={232} stroke="#e0e0e0" strokeWidth={2} />
        <defs>
          <linearGradient id="hoh-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#198754" />
            <stop offset="100%" stopColor="#dc3545" />
          </linearGradient>
        </defs>
        <rect x={80} y={229} width={420} height={6} rx={3} fill="url(#hoh-grad)" opacity={0.2} />
        <text x={80} y={248} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600} fill="#198754">Innocent error</text>
        <text x={80} y={258} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">Relief granted</text>
        <text x={W / 2} y={248} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600} fill="#CC8800">Gross negligence</text>
        <text x={W / 2} y={258} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">Case-by-case</text>
        <text x={500} y={248} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600} fill="#dc3545">Willful nonpayment</text>
        <text x={500} y={258} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">Forfeiture applies</text>

        {/* Wilson example */}
        <circle cx={130} cy={232} r={4} fill="#198754" />
        <text x={130} y={272} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fill="#198754" fontStyle="italic">
          Wilson: 1-day delay = not willful
        </text>

        <text x={W / 2} y={292} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Hohenshelt v. Superior Court (2025) 18 Cal.5th 310 · 5-2 · Disapproved 7 prior decisions
        </text>
      </svg>
    </div>
  );
}


/* Leeper: Circuit split + case holdings + defense strategy */
export function LeeperDiagram() {
  var W = 580, H = 280;

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

        {/* Case holdings */}
        <text x={140} y={176} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fill="#dc3545">
          Leeper (2024) 107 Cal.App.5th 1001
        </text>
        <text x={140} y={188} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fill="#dc3545">
          Williams (2025) 110 Cal.App.5th 932
        </text>
        <text x={440} y={176} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fill="#198754">
          Balderas (2024) 101 Cal.App.5th 533
        </text>
        <text x={440} y={188} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fill="#198754">
          Rodriguez (2025) 109 Cal.App.5th 69
        </text>

        {/* Statutory text */}
        <text x={W / 2} y={208} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          § 2699(g)(1): "AND" vs. "OR"
        </text>

        {/* Defense strategy */}
        <rect x={40} y={216} width={240} height={24} rx={3}
          fill="#dc3545" opacity={0.04} stroke="#dc3545" strokeWidth={0.5} />
        <text x={160} y={232} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#dc3545">
          If prohibited: move to dismiss representative claims
        </text>
        <rect x={300} y={216} width={240} height={24} rx={3}
          fill="#198754" opacity={0.04} stroke="#198754" strokeWidth={0.5} />
        <text x={420} y={232} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#198754">
          If permitted: § 2699(p) manageability defense
        </text>

        {/* Decision pending */}
        <rect x={W / 2 - 90} y={250} width={180} height={18} rx={9}
          fill="none" stroke="#dc3545" strokeWidth={0.75} />
        <text x={W / 2} y={263} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={1} fill="#dc3545">
          DECISION EXPECTED MID-TO-LATE 2026
        </text>
      </svg>
    </div>
  );
}


/* Naranjo: 4-stream derivative cascade + dollar amounts + total exposure */
export function NaranjoCaseDiagram() {
  var streams = [
    { num: '1', label: 'Meal/Rest Premium', statute: '§ 226.7', type: 'WAGE', amount: '1 hr × reg. rate', recoverable: false, color: '#2c3e3a' },
    { num: '2', label: 'PAGA Default Penalty', statute: '§ 2699(f)(2)', type: 'PENALTY', amount: '$100/$200 per emp/pp', recoverable: true, color: '#4a7a6f' },
    { num: '3', label: 'Wage Statement Penalty', statute: '§ 226(e)', type: 'DERIVATIVE', amount: '$50/$100, cap $4K', recoverable: true, color: '#dc3545' },
    { num: '4', label: 'Waiting Time Penalty', statute: '§ 203', type: 'DERIVATIVE', amount: 'Up to 30 days', recoverable: true, color: '#dc3545' },
  ];
  var W = 580, H = 310;

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
              {/* Amount */}
              <text x={sx} y={164} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7.5} fill={s.color} fontWeight={600}>
                {s.amount}
              </text>
              {/* Type badge */}
              <rect x={sx - 28} y={170} width={56} height={12} rx={6}
                fill={s.recoverable ? '#198754' : '#dc3545'} opacity={0.15} />
              <text x={sx} y={179} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={6.5} fontWeight={600}
                fill={s.recoverable ? '#198754' : '#dc3545'} letterSpacing={0.5}>
                {s.recoverable ? 'RECOVERABLE' : 'NOT PAGA'}
              </text>
            </g>
          );
        })}

        {/* Total exposure callout */}
        <rect x={60} y={200} width={W - 120} height={32} rx={4}
          fill="#dc3545" opacity={0.04} stroke="#dc3545" strokeWidth={0.75} />
        <text x={W / 2} y={216} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={700} fill="#dc3545">
          50 emps × 26 pp → ~$260,000 PAGA-recoverable from meal violations alone
        </text>
        <text x={W / 2} y={228} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
          Before the underlying premium is even calculated
        </text>

        {/* 5-10x multiplier */}
        <rect x={W / 2 - 110} y={242} width={220} height={18} rx={9}
          fill="#dc3545" opacity={0.06} />
        <text x={W / 2} y={254} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8.5} fontWeight={700} fill="#dc3545">
          Demands appear 5–10× larger than underlying wages
        </text>

        {/* Kirby cross-ref */}
        <text x={W / 2} y={278} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#888">
          Stream 1 not PAGA-recoverable per Kirby v. Immoos (2012) — but derivative streams 2-4 are
        </text>

        <text x={W / 2} y={298} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Naranjo v. Spectrum Security Services (2022) 13 Cal.5th 93
        </text>
      </svg>
    </div>
  );
}


/* Alvarado: Side-by-side rate comparison + worked example + aggregate */
export function AlvaradoDiagram() {
  var W = 580, H = 260;

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

        {/* Worked example */}
        <text x={W / 2} y={148} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          WORKED EXAMPLE
        </text>
        {[
          { label: '40 ST + 10 OT hrs', sub: '= 50 total hrs', color: '#888' },
          { label: '$500 bonus', sub: '', color: '#888' },
          { label: '÷ 50 = $10/hr', sub: 'WRONG', color: '#dc3545' },
          { label: '÷ 40 = $12.50/hr', sub: 'CORRECT', color: '#198754' },
          { label: '$2.50 gap', sub: '× 10 OT × 0.5x', color: '#dc3545' },
        ].map(function (item, i) {
          var ix = 20 + i * 112;
          return (
            <g key={i}>
              <text x={ix + 50} y={166} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill={item.color}>{item.label}</text>
              {item.sub && (
                <text x={ix + 50} y={178} textAnchor="middle"
                  fontFamily="'Outfit',sans-serif" fontSize={7} fill={item.color}>{item.sub}</text>
              )}
              {i < 4 && (
                <text x={ix + 106} y={168} fontFamily="'Outfit',sans-serif" fontSize={10} fill="#ddd">→</text>
              )}
            </g>
          );
        })}

        {/* Payroll system warning */}
        <rect x={60} y={190} width={W - 120} height={16} rx={8}
          fill="#CC8800" opacity={0.06} />
        <text x={W / 2} y={201} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#CC8800">
          Most payroll systems (ADP, Workday, Paychex) default to total hours denominator
        </text>

        {/* Aggregate scaling */}
        <rect x={60} y={214} width={W - 120} height={20} rx={4}
          fill="#dc3545" opacity={0.04} stroke="#dc3545" strokeWidth={0.5} />
        <text x={W / 2} y={228} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#dc3545">
          $12.50/week × 50 employees × 52 weeks = $32,500/year underpayment
        </text>

        <text x={W / 2} y={252} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Alvarado v. Dart Container Corp. (2018) 4 Cal.5th 542
        </text>
      </svg>
    </div>
  );
}


/* Donohue: Presumption flow + punch analysis + defense strategy */
export function DonohueDiagram() {
  var W = 580, H = 240;

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

        {/* Punch analysis */}
        <text x={W / 2} y={134} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          TIME PUNCH ANALYSIS
        </text>
        {[
          { punch: '28 min', result: 'VIOLATION', note: 'Rounding cannot erase', color: '#dc3545' },
          { punch: '29 min', result: 'VIOLATION', note: 'If not fully relieved', color: '#dc3545' },
          { punch: '30 min', result: 'COMPLIANT', note: 'If duties relinquished', color: '#198754' },
          { punch: 'No punch', result: 'PRESUMED', note: 'Burden on employer', color: '#CC8800' },
        ].map(function (p, i) {
          var px = 30 + i * 138;
          return (
            <g key={i}>
              <rect x={px} y={142} width={128} height={32} rx={3}
                fill={p.color} opacity={0.04} stroke={p.color} strokeWidth={0.5} />
              <text x={px + 64} y={154} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={700} fill={p.color}>{p.punch} → {p.result}</text>
              <text x={px + 64} y={168} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">{p.note}</text>
            </g>
          );
        })}

        {/* Defense strategy */}
        <rect x={40} y={184} width={W - 80} height={28} rx={4}
          fill="#198754" opacity={0.04} stroke="#198754" strokeWidth={0.5} />
        <text x={W / 2} y={198} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#198754">
          Defense: Brinker-compliant policy + contemporaneous electronic attestation system
        </text>
        <text x={W / 2} y={210} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#888">
          Cannot be blanket waiver · Must be contemporaneous · See: Brinker four-element standard
        </text>

        <text x={W / 2} y={234} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Donohue v. AMN Services (2021) 11 Cal.5th 58
        </text>
      </svg>
    </div>
  );
}


/* Ferra: Regular rate vs base rate + component breakdown + retroactivity */
export function FerraDiagram() {
  var W = 580, H = 260;

  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          FERRA — PREMIUM CALCULATION STANDARD
        </text>
        <text x={W / 2} y={30} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#999">
          Meal and rest period premiums must use the regular rate — not the base hourly rate
        </text>

        {/* Base rate (wrong) */}
        <rect x={30} y={44} width={240} height={80} rx={4}
          fill="#dc3545" opacity={0.04} stroke="#dc3545" strokeWidth={0.75} />
        <rect x={30} y={44} width={240} height={3} rx={1.5} fill="#dc3545" />
        <text x={150} y={64} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#dc3545">WRONG: BASE RATE</text>
        <text x={150} y={84} textAnchor="middle"
          fontFamily="'Libre Baskerville',serif" fontSize={14} fill="#333" fontWeight={700}>
          $17.00/hr
        </text>
        <text x={150} y={100} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#888">
          Base hourly rate only
        </text>
        <text x={150} y={114} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#dc3545">
          Applied retroactively — no safe harbor
        </text>

        {/* Arrow */}
        <text x={W / 2} y={90} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={12} fontWeight={700} fill="#ccc">
          vs.
        </text>

        {/* Regular rate (correct) */}
        <rect x={310} y={44} width={240} height={80} rx={4}
          fill="#198754" opacity={0.04} stroke="#198754" strokeWidth={0.75} />
        <rect x={310} y={44} width={240} height={3} rx={1.5} fill="#198754" />
        <text x={430} y={64} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#198754">CORRECT: REGULAR RATE</text>
        <text x={430} y={84} textAnchor="middle"
          fontFamily="'Libre Baskerville',serif" fontSize={14} fill="#333" fontWeight={700}>
          $22.50/hr
        </text>
        <text x={430} y={100} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fill="#888">
          Base + commissions + bonuses + piece-rate
        </text>
        <text x={430} y={114} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#198754">
          Per Ferra + Alvarado methodology
        </text>

        {/* Gap callout */}
        <rect x={W / 2 - 100} y={136} width={200} height={20} rx={10}
          fill="#dc3545" opacity={0.08} stroke="#dc3545" strokeWidth={0.75} />
        <text x={W / 2} y={150} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#dc3545">
          $5.50/hr gap × premiums owed = exposure
        </text>

        {/* Component breakdown */}
        <text x={W / 2} y={164} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          REGULAR RATE COMPONENTS
        </text>
        {[
          { label: 'Base hourly', val: '$17.00', color: '#888' },
          { label: 'Commissions', val: '+$3.50', color: '#4a7a6f' },
          { label: 'Shift diff.', val: '+$1.00', color: '#8aa39e' },
          { label: 'ND bonus', val: '+$1.00', color: '#CC8800' },
          { label: 'Regular rate', val: '=$22.50', color: '#198754' },
        ].map(function (c, i) {
          var cx2 = 28 + i * 112;
          return (
            <g key={i}>
              <text x={cx2 + 46} y={180} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">{c.label}</text>
              <text x={cx2 + 46} y={194} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={11} fontWeight={700} fill={c.color}>{c.val}</text>
            </g>
          );
        })}

        {/* Retroactivity + Alvarado cross-ref */}
        <rect x={40} y={206} width={W - 80} height={16} rx={8}
          fill="#dc3545" opacity={0.06} />
        <text x={W / 2} y={217} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#dc3545">
          Ferra applies retroactively — no safe harbor for pre-decision conduct
        </text>
        <text x={W / 2} y={234} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">
          For flat-sum bonuses, use non-OT hours only per Alvarado · $5.50 gap × premiums × employees × pp = exposure
        </text>

        <text x={W / 2} y={254} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858 · Applied retroactively
        </text>
      </svg>
    </div>
  );
}


/* Kirby: Demand stripping + demand vs. reality + Naranjo cross-ref */
export function KirbyDiagram() {
  var W = 580, H = 260;
  var categories = [
    { label: 'Overtime\nUnderpayments', recoverable: false, color: '#dc3545' },
    { label: 'Meal/Rest\nPremiums', recoverable: false, color: '#dc3545' },
    { label: 'Unreimbursed\nExpenses', recoverable: false, color: '#dc3545' },
    { label: 'Wage Statement\n§ 226(e)', recoverable: true, color: '#198754' },
    { label: 'Min. Wage\n§ 1197.1', recoverable: true, color: '#198754' },
    { label: 'Default PAGA\n§ 2699(f)', recoverable: true, color: '#198754' },
  ];

  var boxW = 80, boxH = 64, gap = 8;
  var totalW = categories.length * (boxW + gap) - gap;
  var startX = (W - totalW) / 2;

  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          KIRBY / ZB — DEMAND STRIPPING ANALYSIS
        </text>
        <text x={W / 2} y={30} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#999">
          Stripping non-recoverable categories reduces theoretical PAGA exposure 30–50%
        </text>

        {categories.map(function (cat, i) {
          var x = startX + i * (boxW + gap);
          var y = 44;
          return (
            <g key={i}>
              <rect x={x} y={y} width={boxW} height={boxH} rx={4}
                fill={cat.color} opacity={0.06}
                stroke={cat.color} strokeWidth={0.75} />

              {/* X or check */}
              <text x={x + boxW / 2} y={y + 20} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={16} fontWeight={700}
                fill={cat.color}>
                {cat.recoverable ? '✓' : '×'}
              </text>

              {/* Label */}
              {cat.label.split('\n').map(function (line, li) {
                return (
                  <text key={li} x={x + boxW / 2} y={y + 36 + li * 12} textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={8}
                    fontWeight={li === 0 ? 600 : 400}
                    fill={cat.recoverable ? '#198754' : '#dc3545'}>
                    {line}
                  </text>
                );
              })}

              {/* Status badge */}
              <rect x={x + 10} y={y + boxH + 6} width={boxW - 20} height={14} rx={7}
                fill={cat.recoverable ? '#198754' : '#dc3545'} opacity={0.12} />
              <text x={x + boxW / 2} y={y + boxH + 16} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fontWeight={600}
                fill={cat.recoverable ? '#198754' : '#dc3545'} letterSpacing={1}>
                {cat.recoverable ? 'RECOVERABLE' : 'NOT PAGA'}
              </text>
            </g>
          );
        })}

        {/* Reduction callout */}
        <rect x={W / 2 - 130} y={140} width={260} height={22} rx={4}
          fill="#198754" opacity={0.06} stroke="#198754" strokeWidth={0.75} />
        <text x={W / 2} y={155} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600} fill="#198754">
          Stripping 3 non-recoverable categories = 30–50% demand reduction
        </text>

        {/* Demand vs reality */}
        <text x={W / 2} y={176} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#2c3e3a">
          DEMAND REDUCTION PATH
        </text>
        {[
          { label: 'Original demand', val: '$1.2M', color: '#dc3545', w: 160 },
          { label: 'After stripping 3', val: '$600K', color: '#CC8800', w: 120 },
          { label: 'After analysis', val: '$400K', color: '#198754', w: 80 },
        ].map(function (stage, i) {
          var sx = W / 2 - stage.w / 2;
          var sy = 184 + i * 22;
          return (
            <g key={i}>
              <rect x={sx} y={sy} width={stage.w} height={18} rx={3}
                fill={stage.color} opacity={0.06} stroke={stage.color} strokeWidth={0.5} />
              <text x={W / 2 - 40} y={sy + 13}
                fontFamily="'Outfit',sans-serif" fontSize={8} fill="#888">{stage.label}</text>
              <text x={W / 2 + 40} y={sy + 13} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={10} fontWeight={700} fill={stage.color}>{stage.val}</text>
            </g>
          );
        })}

        {/* Naranjo cross-ref */}
        <text x={W / 2} y={254} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#888">
          Naranjo: premiums are wages → derivative penalties may still apply via § 226(e)
        </text>

        <text x={W / 2} y={258} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Kirby v. Immoos (2012) 53 Cal.4th 1244 · ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175
        </text>
      </svg>
    </div>
  );
}


/* Estrada: 5 court manageability tools + effectiveness + timing + codification */
export function EstradaDiagram() {
  var tools = [
    { num: '1', label: 'Representative Testimony', desc: 'Select employees testify for subgroups', impact: 40 },
    { num: '2', label: 'Surveys', desc: 'Written declarations as evidence', impact: 35 },
    { num: '3', label: 'Statistical Analysis', desc: 'Sampling to establish violation rates', impact: 70 },
    { num: '4', label: 'Evidence Limitation', desc: 'Narrow categories to manageable scope', impact: 75 },
    { num: '5', label: 'Scope Limitation', desc: 'Restrict to specific locations/periods', impact: 95 },
  ];
  var W = 580, H = 260;
  var boxW = 100, gap = 10;
  var totalW = tools.length * (boxW + gap) - gap;
  var startX = (W - totalW) / 2;

  return (
    <div style={{ maxWidth: 620, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        <text x={W / 2} y={16} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={9} fontWeight={600}
          letterSpacing={3} fill="#2c3e3a">
          ESTRADA — FIVE COURT MANAGEABILITY TOOLS
        </text>
        <text x={W / 2} y={30} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8.5} fill="#999">
          Cannot dismiss on manageability — but can limit scope using these tools
        </text>

        {tools.map(function (t, i) {
          var x = startX + i * (boxW + gap);
          return (
            <g key={i}>
              <rect x={x} y={44} width={boxW} height={90} rx={4}
                fill="#f9faf9" stroke="#e0e0e0" strokeWidth={0.75} />
              <circle cx={x + boxW / 2} cy={62} r={12}
                fill="#2c3e3a" />
              <text x={x + boxW / 2} y={66} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={11} fontWeight={700} fill="#fff">
                {t.num}
              </text>
              <text x={x + boxW / 2} y={86} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#333">
                {t.label}
              </text>
              <text x={x + boxW / 2} y={100} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888">
                {t.desc.length > 30 ? t.desc.slice(0, 28) + '...' : t.desc}
              </text>
              {/* Effectiveness bar */}
              <rect x={x + 10} y={110} width={boxW - 20} height={4} rx={2} fill="#e8e8e8" />
              <rect x={x + 10} y={110} width={(boxW - 20) * t.impact / 100} height={4} rx={2}
                fill={t.impact > 70 ? '#198754' : t.impact > 50 ? '#CC8800' : '#8aa39e'} />
              <text x={x + boxW / 2} y={124} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={6.5}
                fill={t.impact > 70 ? '#198754' : t.impact > 50 ? '#CC8800' : '#8aa39e'}>
                {t.impact > 70 ? 'HIGH' : t.impact > 50 ? 'MODERATE' : 'MODERATE'}
              </text>
            </g>
          );
        })}

        {/* Codified note */}
        <rect x={W / 2 - 130} y={142} width={260} height={16} rx={8}
          fill="#4a7a6f" opacity={0.08} />
        <text x={W / 2} y={153} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600} fill="#4a7a6f">
          Codified by AB 2288 → Lab. Code § 2699(p)
        </text>

        {/* Timing strategy */}
        <text x={W / 2} y={168} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#4a7a6f">
          MOTION TIMING — FILE AT EARLY EVALUATION
        </text>
        <line x1={60} y1={182} x2={520} y2={182} stroke="#e0e0e0" strokeWidth={1} />
        {[
          { x: 100, label: 'Early evaluation', color: '#198754' },
          { x: 230, label: '§ 2699(p) motion', color: '#4a7a6f' },
          { x: 370, label: 'Discovery (narrowed)', color: '#8aa39e' },
          { x: 490, label: 'Trial', color: '#2c3e3a' },
        ].map(function (evt, i) {
          return (
            <g key={i}>
              <circle cx={evt.x} cy={182} r={3} fill={evt.color} />
              <text x={evt.x} y={196} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill={evt.color}>{evt.label}</text>
            </g>
          );
        })}

        {/* Codification note */}
        <rect x={40} y={206} width={240} height={22} rx={3}
          fill="#888" opacity={0.04} stroke="#888" strokeWidth={0.5} />
        <text x={160} y={218} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#888">
          Before: constitutional argument only (Estrada)
        </text>
        <text x={W / 2} y={218} fontFamily="'Outfit',sans-serif" fontSize={10} fill="#ccc">→</text>
        <rect x={300} y={206} width={240} height={22} rx={3}
          fill="#198754" opacity={0.04} stroke="#198754" strokeWidth={0.5} />
        <text x={420} y={218} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600} fill="#198754">
          After 2024: statutory right (AB 2288 § 2699(p))
        </text>

        <text x={W / 2} y={248} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582
        </text>
      </svg>
    </div>
  );
}
