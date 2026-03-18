import { slugify } from './slugify';

var industriesRaw = [
  {
    name: "Hospitality",
    icon: "HO",
    metric: "24/7 × Donohue",
    headline: "Every short meal punch in the time-clock data creates a rebuttable presumption of violation — and hotels generate thousands of them.",
    issues: ["Meal/rest period compliance across 24/7 operations", "Tip pooling and service charge distribution under § 351", "Room attendant piece-rate calculations and non-productive time", "Manager overtime exemption classification (duties test, salary basis)", "AWS implementation for housekeeping and laundry departments", "Event-driven scheduling and predictive scheduling compliance", "Split-shift premiums for employees working non-consecutive shifts"],
    wageOrder: "Wage Order 5-2001 (Public Housekeeping Industry)",
    structuralVulnerability: "Hospitality employers face simultaneous exposure across nearly every PAGA-eligible violation category, and the operational realities of the business make full compliance genuinely difficult — not because employers are cutting corners, but because 24/7 guest-facing operations create inherent tension with California's rigid meal and rest period requirements.\n\nThe Donohue v. AMN Services presumption applies with particular force in this industry. Hotels and restaurants generate extensive time-clock data, and that data routinely shows patterns that trigger the presumption: short meal punches from employees who voluntarily returned to the floor early, late clock-ins from pre-shift meetings, and missed rest periods during high-occupancy events or banquet service. Each of these creates a rebuttable presumption of violation that the employer must affirmatively overcome with evidence that the meal or rest period was provided — not merely that the opportunity existed.\n\nThe structural challenge is that 'relieved of all duties' — the standard for a compliant meal period under Brinker — conflicts with the guest-facing service model. A hotel front desk employee who is nominally on a meal break but responds to a guest who approaches the desk has arguably had their meal period interrupted. A restaurant server who checks on a table during a break has the same problem. The Brinker 'provide not ensure' framework creates a defense, but it does not eliminate the exposure — it shifts the burden to the employer to demonstrate that the opportunity was genuinely provided.",
    exposureCategories: [
      {
        name: "Tip Pooling and Service Charge Distribution",
        statute: "Lab. Code § 351",
        analysis: "Section 351 prohibits employers from collecting, taking, or receiving any gratuity left for an employee. Tip pooling arrangements must exclude managers and supervisors — but the definition of 'supervisor' under Wage Order 5 is narrower than the colloquial understanding, creating classification traps. Hotels that impose mandatory service charges on banquet events must distribute those charges to the employees who performed the services — the characterization of a charge as a 'service charge' versus a 'gratuity' determines the distribution obligation. Mischaracterization creates both individual claims and PAGA penalty exposure.",
        defenseStrategy: "Document the legal basis for tip pool composition. Audit service charge language on banquet event orders and guest-facing materials. Ensure mandatory service charges are clearly distinguished from voluntary gratuities in all communications."
      },
      {
        name: "Meal and Rest Period Compliance in 24/7 Operations",
        statute: "Lab. Code §§ 226.7, 512",
        analysis: "The 24/7 operational model creates structural tension with meal period requirements. Night-shift employees at hotels with skeleton staffing face the most acute challenge — pulling one employee for a 30-minute uninterrupted break may leave critical functions uncovered. On-duty meal period agreements under Wage Order 5, section 11(A) are available when the 'nature of the work prevents an employee from being relieved of all duties,' but these require a written agreement that can be revoked at any time. Many hospitality employers either lack the written agreement entirely or have agreements that do not satisfy the 'nature of the work' prerequisite.",
        defenseStrategy: "Implement electronic meal period attestation systems that capture whether the employee was relieved of all duties, whether the meal period was voluntarily shortened, and whether a premium was auto-paid for non-compliant periods. Build the 'Two Hotels' temporal bifurcation framework around the implementation date of the attestation system."
      },
      {
        name: "Split-Shift Premiums",
        statute: "IWC Wage Order 5, § 4(C)",
        analysis: "Split-shift premiums are endemic in restaurant scheduling. Part-time employees who work a morning shift and an evening shift with a gap exceeding one hour are entitled to one additional hour of pay at the minimum wage rate for each split shift worked. Many hospitality employers either do not track split shifts or calculate the premium incorrectly — the premium is one hour at minimum wage, not one hour at the employee's regular rate, but it applies only if total daily compensation does not already exceed the minimum wage for total hours worked plus the premium.",
        defenseStrategy: "Audit scheduling software output to identify split-shift patterns. Calculate premium obligations against actual compensation to determine whether existing pay already exceeds the threshold. Document the analysis to support the 'already compensated' defense."
      },
      {
        name: "Pre-Shift and Post-Shift Off-the-Clock Work",
        statute: "Lab. Code §§ 510, 1194",
        analysis: "The Troester v. Starbucks decision effectively eliminated the federal de minimis doctrine for California wage claims, meaning that pre-shift setup tasks (logging into POS systems, counting cash drawers, pre-shift meetings) and post-shift closing tasks (cleaning, restocking, end-of-day reports) that take 5–10 minutes per shift are compensable. In hospitality operations with hundreds of employees each performing these tasks daily, the aggregate exposure is substantial — and it compounds across every pay period in the PAGA statutory period.",
        defenseStrategy: "Audit clock-in and clock-out procedures to identify systematic gaps between arrival and first clock punch. Implement pre-shift clock-in requirements and post-shift sign-off procedures. If historical exposure exists, quantify it precisely for settlement positioning — blanket assumptions from plaintiff's counsel will overstate the actual time."
      }
    ],
    authorities: ["Donohue v. AMN Services (2021) 11 Cal.5th 58", "Brinker Restaurant Corp. v. Superior Court (2012) 53 Cal.4th 1004", "Augustus v. ABM Security Services (2016) 2 Cal.5th 257", "Troester v. Starbucks Corp. (2018) 5 Cal.5th 829"],
    defenseStrategies: [
      "Deploy the 'Two Hotels' temporal bifurcation framework — disaggregate Legacy Period violation rates from Remedied Period rates using PMS system logs, overtime reduction metrics, and electronic meal period attestation data.",
      "Challenge the Donohue presumption with affirmative evidence of meal period provision: on-duty meal period agreements, electronic attestation records, and supervisor training documentation demonstrating that the policy was to provide, not merely schedule, compliant meal periods.",
      "Pursue manageability limitations under § 2699(p) for multi-property operators where each property has different staffing levels, scheduling practices, and operational constraints — a unified PAGA claim across 12 hotel properties with different general managers and different HR practices is analytically unmanageable.",
      "Position for the 15% penalty cap by documenting pre-notice compliance efforts: meal period policy revisions, supervisor training with attendance records, payroll audit reports, and electronic timekeeping system implementation."
    ],
    monitoring: [
      "Pending DLSE guidance on service charge distribution for mandatory hotel and banquet service charges.",
      "Legislative proposals affecting predictive scheduling requirements for hospitality workers in California.",
      "Evolving treatment of on-duty meal period agreements in hospitality settings — no published appellate decision has addressed whether the 'nature of the work' prerequisite is satisfied for hotel front desk employees during overnight shifts."
    ],
    relatedTools: ["paga-penalty-estimator", "regular-rate-calculator"],
    relatedInsights: ["the-two-hotels-framework-temporal-bifurcation-in-paga-penalty-analysis"],
    relatedMatters: ["Multi-Property Hotel Operator"]
  },
  {
    name: "Automotive (Dealerships)",
    icon: "AU",
    metric: "$0 at departure",
    headline: "Every salesperson who departed between deal closing and deal funding was denied earned wages. The exposure is structural — and industry-wide.",
    issues: ["Commission forfeiture under Sciborski v. Pacific Bell", "Regular rate true-up for commission/draw compensation plans", "Wage Order 7 commissioned-employee exemption (workweek-by-workweek)", "F&I manager exempt classification under administrative exemption", "Flat-rate technician overtime calculations", "Dealership-specific bonus and incentive structures (spiffs, holdbacks)", "Service advisor commission structures and minimum wage compliance"],
    wageOrder: "Wage Order 7-2001 (Mercantile Industry)",
    structuralVulnerability: "Dealership compensation structures are built around commission timing that creates forfeiture exposure under Sciborski v. Pacific Bell Directory. This exposure is systematic rather than episodic. Every departed salesperson with a pending deal at the time of separation is a potential claimant.\n\nThe timing mismatch is structural: a salesperson closes a deal (negotiates price, gets signatures, hands off to F&I), but the commission is not paid until the financing funds — which can take weeks. If the salesperson leaves between closing and funding, most dealership commission plans forfeit the commission on the pending deal. Under Sciborski, commissions are earned when the employee completes the work entitling them to the commission — at deal closing, not at deal funding. Conditioning payment on continued employment through funding constitutes an unlawful forfeiture.\n\nThe exposure analysis requires tracing every departed salesperson's pending deals at departure, whether those deals subsequently funded, and whether the departed salesperson was paid. This forensic work is labor-intensive but devastating when it reveals a pattern. In one analysis, the supervising partner — a senior wage-and-hour practitioner with decades of experience — noted he had never seen the Sciborski forfeiture theory raised in his practice. The theory has the potential to generate claims industry-wide.",
    exposureCategories: [
      {
        name: "Commission Forfeiture at Separation",
        statute: "Lab. Code §§ 200-204; Sciborski v. Pacific Bell Directory (2012) 205 Cal.App.4th 1152",
        analysis: "Under Sciborski, commissions are earned when the employee completes the work entitling them to the commission. For car salespeople, that moment is deal closing — not deal funding. Every salesperson who departed between closing and funding has a claim for unpaid earned wages, plus derivative § 203 waiting time penalties (up to 30 days of daily wages per employee) and § 226 wage statement violations (for failing to report the earned but unpaid commission). The exposure compounds: a dealership with 20% annual salesperson turnover and an average of 2 pending deals per departed salesperson creates 8-12 claimants per year, each with commission, waiting time, and wage statement exposure.",
        defenseStrategy: "Audit all commission plans for forfeiture-on-departure provisions. For pending litigation, trace every departed salesperson's deal pipeline at separation and determine whether pending deals funded post-departure. Calculate precise exposure for each departed employee. For compliance, revise commission plans to eliminate forfeiture provisions and implement post-separation commission payment procedures."
      },
      {
        name: "Commissioned-Employee Overtime Exemption",
        statute: "Wage Order 7-2001, § 3(D); Lab. Code § 204.1",
        analysis: "The Wage Order 7 commissioned-employee overtime exemption requires that (1) more than half of the employee's compensation is commissions and (2) total earnings exceed 1.5 times the minimum wage — verified on a workweek-by-workweek basis, not averaged. During slow sales months, a commissioned salesperson can fall below the 1.5 times threshold for specific workweeks, creating overtime exposure for those weeks even if the annual average exceeds the threshold. Dealerships that rely on monthly or quarterly true-ups rather than workweek-by-workweek verification are mispricing the exemption.",
        defenseStrategy: "Pull payroll records and verify exemption qualification on a workweek-by-workweek basis. Identify specific workweeks where the exemption failed. Calculate overtime exposure for those workweeks only — resist plaintiff's attempt to treat exemption failure in some weeks as exemption failure across the entire period."
      },
      {
        name: "Flat-Rate Technician Overtime",
        statute: "Lab. Code §§ 510, 1194",
        analysis: "Flat-rate technicians are compensated based on 'flag hours' — manufacturer-estimated time per repair — not actual hours worked. But California overtime must be calculated on actual hours exceeding 8 per day or 40 per week regardless of flag-hour production. A technician who flags 10 hours of work in 9 actual hours is entitled to 1 hour of overtime at 1.5 times the regular rate. The regular rate calculation itself is complex: flat-rate earnings divided by actual hours worked, then multiplied by 1.5 for the overtime premium. Most dealership payroll systems do not perform this calculation correctly.",
        defenseStrategy: "Audit time records against flag-hour reports to identify actual versus flagged hours. Recalculate overtime using actual hours and the correct regular rate. Quantify the underpayment per technician per pay period to build the three-scenario exposure model."
      },
      {
        name: "Regular Rate Inclusion for Complex Compensation",
        statute: "Lab. Code § 510; Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858; Alvarado v. Dart Container (2018) 4 Cal.5th 542",
        analysis: "Dealership compensation typically includes base salary or draw, commissions, manufacturer incentive bonuses (spiffs), holdback bonuses, customer satisfaction index bonuses, and sometimes volume-based escalators. Under Alvarado, flat-sum bonuses must be included in the regular rate by dividing the bonus by the total hours worked in the bonus period — not by 40 hours. Under Ferra, meal and rest period premiums must be calculated at the regular rate of pay, not the base hourly rate. Most dealership payroll systems calculate these incorrectly, creating systematic underpayment that compounds across every affected pay period.",
        defenseStrategy: "Map every compensation component to its regular rate treatment. Use the Regular Rate Calculator with the Car Dealership Salesperson preset to model the actual regular rate versus the rate used by payroll. Quantify the per-employee underpayment to determine realistic exposure."
      }
    ],
    authorities: ["Sciborski v. Pacific Bell Directory (2012) 205 Cal.App.4th 1152", "Alvarado v. Dart Container (2018) 4 Cal.5th 542", "Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858", "Lab. Code § 204.1 (commissioned employee exemption)"],
    defenseStrategies: [
      "Conduct a Sciborski-specific forensic audit: trace every departed salesperson's pending deals, determine funding status, and calculate exact forfeiture exposure. This is the single highest-value compliance action a dealership can take.",
      "Verify the Wage Order 7 overtime exemption on a workweek-by-workweek basis — not monthly or quarterly. Identify failure weeks and calculate overtime exposure for only those weeks.",
      "Recalculate the regular rate with all compensation components included per Alvarado and Ferra. The difference between the payroll system's regular rate and the legally correct regular rate is the per-hour underpayment — multiply across all overtime and premium hours for the exposure figure.",
      "Revise commission plan language to eliminate forfeiture-on-departure provisions, implement post-separation payment procedures for pending deals, and establish § 2751-compliant written commission agreements for all commissioned employees."
    ],
    monitoring: [
      "Pending appellate treatment of the commissioned-employee overtime exemption and whether workweek-by-workweek verification can be satisfied through retroactive true-up payments.",
      "Legislative proposals affecting dealership compensation structures and commission payment timing.",
      "DLSE enforcement actions targeting automotive dealership commission practices."
    ],
    relatedTools: ["regular-rate-calculator", "paga-penalty-estimator"],
    relatedInsights: ["commission-forfeiture-after-sciborski-the-liability-theory-nobody-s-raising", "the-regular-rate-problem-why-every-commission-plan-in-california-is-a-ticking-cl"],
    relatedMatters: ["Luxury Dealership — Commissions"]
  },
  {
    name: "Healthcare & Staffing",
    icon: "HC",
    metric: "14 worksites, 1 PAGA",
    headline: "Who bears the PAGA penalty when the staffing firm cannot control the client hospital's meal period scheduling?",
    issues: ["Public agency immunity for staffing firms at government worksites", "Multi-worksite compliance variation across client locations", "Travel time between client locations (compensable vs. commute)", "On-call and standby compensation (engaged-to-wait vs. waiting-to-engage)", "Per diem and expense reimbursement for traveling healthcare workers", "Joint employer liability allocation between staffing firm and client", "Exempt classification for traveling nurses and therapists"],
    wageOrder: "Wage Order 4-2001 (Professional, Technical, Clerical) / Wage Order 5-2001 (Public Housekeeping)",
    structuralVulnerability: "The structural vulnerability in healthcare staffing is the joint employer problem. Healthcare staffing agencies supply nurses, CNAs, therapists, and other clinical staff to hospitals and skilled nursing facilities that the staffing agency does not own, operate, or control. But the staffing agency is the employer of record, which means it is liable for Labor Code violations that occur at client facilities where it has no operational authority.\n\nThe PAGA exposure is acute because the violations are systematic. CDPH staffing ratios create scheduling constraints that make compliant meal period provision structurally difficult at many facilities, but the staffing agency cannot unilaterally change the facility's scheduling practices. When a county hospital's charge nurse tells a staffing agency nurse that she cannot leave the floor for a meal break because the unit is at minimum staffing, the staffing agency bears the PAGA penalty for a violation it could not have prevented.\n\nThe novel defense I developed in one healthcare staffing matter argued that where the alleged violations arise from working conditions controlled by an immune public agency employer, and the staffing firm is a secondary employer without operational authority over those conditions, PAGA penalties should not attach to the staffing firm for those specific violation categories. This required distinguishing between violations attributable to the staffing firm's own payroll and administrative obligations — wage statements, timely payment, expense reimbursement — and violations attributable to the agency's worksite operations — meal timing, rest period scheduling, overtime resulting from facility-mandated shift extensions.",
    exposureCategories: [
      {
        name: "Joint Employer Liability Allocation",
        statute: "Martinez v. Combs (2012) 49 Cal.4th 35; Dynamex Operations West v. Superior Court (2018) 4 Cal.5th 903",
        analysis: "Martinez established a three-part test for employment: (1) exercise control over wages, hours, or working conditions, (2) suffer or permit to work, or (3) engage, thereby creating a common law employment relationship. In staffing arrangements, both the staffing agency and the client facility may satisfy one or more prongs, creating joint employer liability. But the allocation of PAGA penalties between joint employers is uncharted — no published decision addresses whether the staffing agency bears the full penalty burden for violations caused by the client facility's operational decisions.",
        defenseStrategy: "Document the allocation of operational control between the staffing agency and each client facility. Build a facility-by-facility matrix showing which entity controls scheduling, meal period timing, rest period availability, and overtime authorization. Use this matrix to argue that penalties should be allocated to the entity that controlled the conditions generating the violation."
      },
      {
        name: "Multi-Worksite Manageability",
        statute: "Lab. Code § 2699(p); Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582",
        analysis: "A staffing firm placing employees at 14 different client locations, each with different scheduling practices, break policies, supervisory structures, and patient care requirements, creates individualized proof requirements that representative treatment cannot adequately address. The meal period compliance environment at a Level I trauma center is categorically different from the environment at an outpatient rehabilitation clinic. A unified PAGA claim across all worksites treats these fundamentally different workplaces as interchangeable.",
        defenseStrategy: "Build the manageability motion under § 2699(p) around facility-specific evidence: different scheduling software, different break relief protocols, different staffing ratios, different patient acuity levels. Demonstrate that assessing liability requires facility-by-facility, shift-by-shift analysis that representative treatment cannot accommodate."
      },
      {
        name: "Travel Time Between Client Locations",
        statute: "Morillion v. Royal Packing (2000) 22 Cal.4th 575; Lab. Code § 1194",
        analysis: "Healthcare workers who travel between client locations during the workday — a traveling nurse who works a morning shift at one hospital and an afternoon shift at another — have a strong argument that the inter-facility travel time is compensable under Morillion. The distinction turns on whether the employer 'requires' the travel: if the staffing agency assigns the employee to two facilities in one day, the travel between them is employer-directed and compensable. Home-to-first-facility and last-facility-to-home travel is generally not compensable as ordinary commute time.",
        defenseStrategy: "Audit scheduling records to identify same-day multi-facility assignments. Calculate compensable travel time for each assignment and verify whether travel time was paid. If systematic underpayment exists, quantify it precisely for exposure modeling."
      }
    ],
    authorities: ["Martinez v. Combs (2012) 49 Cal.4th 35", "Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582", "Morillion v. Royal Packing (2000) 22 Cal.4th 575", "Dynamex Operations West v. Superior Court (2018) 4 Cal.5th 903"],
    defenseStrategies: [
      "Develop the public agency immunity defense for violations occurring at government client facilities where the staffing firm lacks operational control.",
      "Pursue manageability limitations by demonstrating that each client facility presents a distinct compliance environment requiring individualized analysis.",
      "Distinguish between violations attributable to the staffing firm's payroll obligations (wage statements, timely payment) and violations attributable to client facility operations (meal/rest period scheduling) — penalties for the latter should not attach to the staffing firm.",
      "Audit inter-facility travel time assignments and per diem/expense reimbursement compliance to address the violation categories the staffing firm directly controls."
    ],
    monitoring: [
      "Development of the joint employer PAGA penalty allocation doctrine — no published appellate authority addresses this issue.",
      "CDPH staffing ratio changes that affect meal period scheduling constraints at client facilities.",
      "Legislative proposals affecting healthcare staffing agency liability for client facility working conditions."
    ],
    relatedTools: ["statute-of-limitations-calculator", "paga-penalty-estimator"],
    relatedInsights: ["statistical-sampling-in-wage-and-hour-defense-building-a-duran-compliant-framewo"],
    relatedMatters: []
  },
  {
    name: "Solar & Energy",
    icon: "SE",
    metric: "2 hrs/day retroactive OT",
    headline: "One missed step in the AWS election retroactively converts every 10-hour day across every affected employee into 2 hours of unpaid daily overtime.",
    issues: ["AWS compliance and DIR election procedures (four-step statutory process)", "Travel time from reporting locations to remote installation sites", "Piece-rate non-productive time compensation under § 226.2", "Expense reimbursement for personal vehicles, tools, and safety equipment", "Heat illness prevention compliance (shade, water, rest, training)", "Multi-site scheduling and rest period logistics for field crews", "Prevailing wage compliance for public works projects"],
    wageOrder: "Wage Order 16-2001 (On-Site Construction) / Wage Order 4-2001",
    structuralVulnerability: "Alternative workweek schedule compliance is the primary exposure driver in solar and energy. The DIR election process has four mandatory steps: (1) written disclosure at least 14 days before election, (2) a meeting to discuss the proposed schedule, (3) a secret ballot election with two-thirds approval, and (4) results reported to DIR within 30 days. Missing any single step — even a procedural technicality like late DIR filing — can invalidate the entire AWS retroactively.\n\nThe retroactive exposure is enormous. Solar installers routinely work four 10-hour days under a 4/10 AWS. If the AWS is invalidated, every hour beyond 8 in each day becomes unpaid overtime — 2 hours per day, 8 hours per week, across every employee covered by the invalid AWS, for every week the AWS was in effect. For a crew of 30 installers working under an invalid AWS for two years, the overtime exposure alone exceeds $500,000 before PAGA penalties are calculated.\n\nTravel time compounds the problem. Field crews who report to an employer-designated yard, pick up equipment and vehicles, and then drive to remote installation sites have a strong argument that the travel time from yard to site is compensable under Morillion. If the employer does not pay this travel time, every day generates additional overtime exposure — the compensable travel time pushes total daily hours beyond 8 even before the installation work begins.",
    exposureCategories: [
      {
        name: "Alternative Workweek Schedule Invalidity",
        statute: "Lab. Code § 511; IWC Wage Orders, § 3(B)",
        analysis: "The four-step process is unforgiving. Step 1 requires written disclosure of the proposed schedule's effects on wages, hours, and benefits at least 14 days before the election. Step 2 requires a meeting — not merely a document distribution — to discuss the proposal. Step 3 requires a secret ballot with two-thirds approval of affected employees in the 'work unit.' Step 4 requires filing results with DIR within 30 days. Failure at any step invalidates the AWS retroactively to its inception, converting every alternative schedule workday into a standard 8-hour day with overtime beyond 8.",
        defenseStrategy: "Audit all AWS elections for strict compliance with each step. If deficiencies exist, conduct a new compliant election immediately to stop the bleeding prospectively. For historical exposure, calculate the precise overtime hours generated by the invalid AWS and build the three-scenario model around that data."
      },
      {
        name: "Piece-Rate Non-Productive Time",
        statute: "Lab. Code § 226.2",
        analysis: "Solar installers paid on piece-rate (per panel installed, per system completed) must receive separate compensation for rest and recovery periods and 'other nonproductive time' — calculated at a regular rate derived from piece-rate earnings. Most legacy payroll systems cannot perform this calculation automatically. The failure to separately identify and compensate non-productive time creates both a wage claim and a derivative wage statement violation.",
        defenseStrategy: "Audit payroll system output for § 226.2 compliance. Ensure rest period compensation is separately calculated and identified on the wage statement. Implement payroll system updates or manual calculation procedures to address the gap."
      }
    ],
    authorities: ["Lab. Code § 511 (AWS election requirements)", "Morillion v. Royal Packing (2000) 22 Cal.4th 575", "Lab. Code § 226.2 (piece-rate compensation)", "Cal/OSHA T8 § 3395 (heat illness prevention)"],
    defenseStrategies: [
      "Conduct an immediate AWS compliance audit — verify all four steps for every active alternative workweek election. This is the single highest-priority action for any solar/energy employer.",
      "Audit travel time practices: distinguish between employer-required yard reporting (compensable travel from yard to site) and voluntary reporting (non-compensable commute). Document the policy and ensure consistent application.",
      "Implement § 226.2-compliant payroll procedures for piece-rate workers — separate compensation for rest periods and non-productive time, separately identified on the wage statement.",
      "Position for the 15% penalty cap by documenting heat illness prevention training, rest period provision at remote sites, and equipment/vehicle expense reimbursement policies."
    ],
    monitoring: [
      "DIR enforcement activity related to AWS election procedures in the construction and energy sectors.",
      "Evolving prevailing wage requirements for solar installation on public works projects.",
      "Cal/OSHA heat illness prevention enforcement actions and proposed regulation updates."
    ],
    relatedTools: ["regular-rate-calculator", "paga-penalty-estimator"],
    relatedInsights: ["ab-2288-sb-92-a-defense-side-roadmap-to-the-2024-paga-reforms"],
    relatedMatters: []
  },
  {
    name: "Technology & Startups",
    icon: "TE",
    metric: "§ 515.5 ≠ exempt",
    headline: "The administrative exemption does not cover 'important work.' It covers work 'directly related to management policies or general business operations.' Most tech companies conflate the two.",
    issues: ["Exempt classification under administrative, professional, and computer employee exemptions", "Equity compensation (RSUs, stock options) in regular rate calculations", "Remote work expense reimbursement under § 2802", "Flexible scheduling and unlimited PTO policies vs. daily overtime triggers", "Startup dissolution, wind-down, and ABC-assignee employment obligations", "Misclassification of contractors in platform and gig-model operations", "Wage statement compliance for complex multi-component compensation"],
    wageOrder: "Wage Order 4-2001 (Professional, Technical, Clerical)",
    structuralVulnerability: "Technology companies present two distinct PAGA profiles. Active companies face classification-driven exposure: the administrative exemption requires work 'directly related to management policies or general business operations' — not merely important work. A software engineer who exercises independent judgment on complex technical decisions is not administratively exempt. The computer professional exemption under section 515.5 requires a minimum hourly rate ($56.97 for 2025) or a minimum annual salary, and the work must be 'intellectual or creative' requiring the exercise of discretion and independent judgment. QA engineers, IT support staff, junior developers who spend substantial time on non-exempt tasks like data entry or manual testing, and project managers who are misclassified as computer professionals when their work is primarily managerial rather than technical all present classification risk.\n\nThe remote work expense reimbursement exposure under section 2802 exploded post-COVID. Companies that shifted to remote or hybrid models without implementing reimbursement policies for home internet, cell phone, office equipment, and home office supplies created PAGA-actionable violations affecting every remote employee. The exposure scales with workforce size — a 200-person tech company with no § 2802 policy has 200 aggrieved employees generating penalties in every pay period.\n\nDissolved startups present a categorically different defense challenge: no active employees, corporate records scattered across former executives' personal devices, assignments for benefit of creditors complicating document production and asset tracing. In one matter involving a dissolved fashion technology company, I managed a 121-page discovery response reconstructing the entire employment framework from fragments — building the exempt classification defense into the production framework itself.",
    exposureCategories: [
      {
        name: "Computer Professional Exemption Misclassification",
        statute: "Lab. Code § 515.5",
        analysis: "The computer professional exemption has a salary threshold that adjusts annually and is among the highest of any California exemption. The duties test requires that the employee be 'primarily engaged' in intellectual or creative work requiring discretion and independent judgment. Roles that commonly fail: QA engineers whose work is primarily testing against predefined specifications, IT support staff who follow established troubleshooting protocols, junior developers who spend substantial time on rote tasks, and project managers whose work is organizational rather than technical. Each misclassified employee creates overtime, meal period, and rest period exposure for every workweek of misclassification.",
        defenseStrategy: "Conduct a role-by-role duties analysis for every position classified as exempt under § 515.5. Verify salary threshold compliance against the current-year minimum. For roles that fail the duties test, reclassify prospectively and quantify historical exposure for settlement positioning."
      },
      {
        name: "Remote Work Expense Reimbursement",
        statute: "Lab. Code § 2802",
        analysis: "Section 2802 requires employers to reimburse employees for all necessary expenditures incurred in direct consequence of the discharge of their duties. For remote workers, this includes a reasonable portion of home internet costs, cell phone bills, computer equipment, office furniture, and supplies. The 'reasonable portion' calculation is employer-specific — a policy that reimburses a flat $50/month may be adequate for some employees and inadequate for others depending on their actual costs. The absence of any policy creates per-employee, per-pay-period PAGA exposure.",
        defenseStrategy: "Implement a § 2802 reimbursement policy with either a flat stipend supported by cost analysis or an expense submission process. Document the basis for the reimbursement amount. For historical exposure, calculate the per-employee reimbursement shortfall and build into the exposure model."
      },
      {
        name: "RSU and Equity Compensation in Regular Rate",
        statute: "Lab. Code § 510; 29 C.F.R. § 778.209",
        analysis: "When restricted stock units vest on a schedule, the value at vesting must be included in the regular rate calculation for overtime purposes during the vesting period. Most payroll systems do not perform this calculation — they treat equity compensation as separate from hourly or salary pay. The result is systematic underpayment of overtime for every employee who receives equity compensation and works overtime hours. The magnitude depends on the equity component's proportion of total compensation, which in technology companies can be substantial.",
        defenseStrategy: "Audit payroll system treatment of equity compensation vesting events. Determine whether vested equity value is included in the regular rate for overtime and premium calculations. If not, calculate the per-employee underpayment and quantify exposure. This is a compliance gap that affects most technology companies."
      }
    ],
    authorities: ["Lab. Code § 515.5 (computer professional exemption)", "Lab. Code § 2802 (expense reimbursement)", "Dynamex Operations West v. Superior Court (2018) 4 Cal.5th 903", "Lab. Code § 226 (wage statement requirements)"],
    defenseStrategies: [
      "Conduct a § 515.5 duties analysis for every role classified as exempt under the computer professional exemption. Verify salary threshold compliance and reclassify roles that fail the duties test.",
      "Implement a documented § 2802 remote work expense reimbursement policy with a defensible cost basis. This is the single most common PAGA-actionable gap in technology companies.",
      "Audit payroll system treatment of RSU and equity vesting events to determine whether equity compensation is included in the regular rate. Calculate underpayment per employee if it is not.",
      "For dissolved startups, reconstruct the employment record from available fragments — personal devices, cloud storage, former executive cooperation — and build the defense narrative into the document production framework."
    ],
    monitoring: [
      "Annual adjustment to the § 515.5 computer professional exemption salary threshold — verify compliance each January.",
      "Legislative and regulatory developments affecting independent contractor classification in platform and gig-economy technology companies.",
      "Evolving judicial treatment of § 2802 expense reimbursement adequacy for remote and hybrid work arrangements."
    ],
    relatedTools: ["wage-statement-compliance-checker", "recoverability-checker"],
    relatedInsights: [],
    relatedMatters: ["Dissolved Fashion Startup"]
  },
  {
    name: "Agriculture",
    icon: "AG",
    metric: "100+ employees, no records",
    headline: "Legacy piece-rate systems predating § 226.2 create a structural underpayment embedded in every pay period for every field worker — compounding across years of noncompliance.",
    issues: ["Piece-rate compensation and non-productive time under § 226.2", "Heat illness prevention compliance (Cal/OSHA regulations)", "Field sanitation and rest area requirements", "Labor contractor joint employment liability", "Seasonal workforce payroll complexity and final pay timing", "Wage Order 14 applicability and agricultural exemptions", "Crew leader and foreman exempt classification"],
    wageOrder: "Wage Order 14-2001 (Agricultural Occupations)",
    structuralVulnerability: "Agricultural PAGA matters carry distinctive exposure characteristics: large workforces (often 100 or more aggrieved employees), systemic violations embedded in legacy piece-rate compensation structures that predate section 226.2's separate-compensation requirements, and frequently inadequate record-keeping — particularly for rest periods, which are often not tracked in field operations.\n\nThe piece-rate problem is structural: before section 226.2 (effective January 1, 2016), many agricultural employers paid piece-rate without separately compensating workers for rest periods and non-productive time. Post-section 226.2, the employer must pay rest period time at a regular rate calculated from the piece-rate earnings, and must separately identify this payment on the wage statement. Most legacy payroll systems cannot perform this calculation automatically. The failure creates both a wage underpayment claim and a derivative wage statement violation under section 226(a) — the wage statement does not accurately reflect all compensation components.\n\nJoint employer liability between growers and labor contractors creates allocation disputes. If the contractor controls hiring, scheduling, and payroll but the grower controls the work pace, field conditions, and production quotas, both may be liable under Martinez v. Combs — but the allocation of PAGA penalties between joint employers is uncharted in published authority. The AB 1066 agricultural overtime phase-out compounds the exposure: agricultural workers are now entitled to overtime after 8 hours in a day and 40 hours in a week on the same basis as non-agricultural workers, which many operations have not fully adapted to operationally.",
    exposureCategories: [
      {
        name: "Piece-Rate Compensation Under § 226.2",
        statute: "Lab. Code § 226.2",
        analysis: "Section 226.2 requires that piece-rate employees receive separate compensation for rest and recovery periods at a regular rate calculated by dividing total piece-rate earnings by the number of hours worked (excluding rest and recovery period time), and separate compensation for 'other nonproductive time' at a rate no less than the applicable minimum wage. Each compensation component must be separately identified on the wage statement. The calculation is complex and most legacy agricultural payroll systems do not handle it correctly — creating systematic underpayment that compounds across every pay period for every piece-rate employee.",
        defenseStrategy: "Audit payroll system output against § 226.2 requirements. Verify that rest period compensation is calculated at the correct rate (piece-rate regular rate, not minimum wage) and separately identified on the wage statement. Implement system updates or manual calculation procedures."
      },
      {
        name: "Heat Illness Prevention",
        statute: "Cal/OSHA T8 § 3395",
        analysis: "Heat illness prevention is a PAGA-actionable violation category for outdoor agricultural work. The Cal/OSHA regulation requires shade access when temperatures exceed 80 degrees, water provision (one quart per hour per employee), cool-down rest periods (at least five minutes net), and training for all employees and supervisors. Violations are systematic in agricultural operations — inadequate shade structures in remote fields, insufficient water supply during peak harvest, and supervisor-level pressure to continue working through rest periods. Each violation creates PAGA penalty exposure separate from and in addition to Cal/OSHA enforcement penalties.",
        defenseStrategy: "Audit heat illness prevention compliance across all field locations. Document shade structure placement, water supply logistics, cool-down rest period practices, and training records. Build the compliance record for penalty cap positioning."
      },
      {
        name: "Seasonal Workforce Final Pay Timing",
        statute: "Lab. Code §§ 201-203",
        analysis: "Agricultural operations with seasonal workforces face particular final pay timing exposure. Section 201 requires that employees who are discharged receive all wages immediately. Section 202 requires that employees who resign receive wages within 72 hours (or immediately if 72 hours' notice is given). Seasonal workers whose employment ends at the conclusion of a harvest season present a characterization question: is the end of the season a 'discharge' (immediate payment required) or a 'resignation' (72-hour window)? Most agricultural employers treat it as neither, paying final wages on the next regular payday — which may violate both sections. Each late final payment generates § 203 waiting time penalty exposure of up to 30 days of the employee's daily wages.",
        defenseStrategy: "Establish a clear policy for seasonal employment termination characterization and final pay timing. Implement same-day or next-day final pay procedures for seasonal workers at the end of each growing season. Document the policy and its implementation."
      }
    ],
    authorities: ["Lab. Code § 226.2 (piece-rate compensation)", "AB 1066 (agricultural overtime phase-out)", "Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582", "Moniz v. Adecco USA (2021) 72 Cal.App.5th 56"],
    defenseStrategies: [
      "Implement § 226.2-compliant payroll procedures for all piece-rate workers. This is the single highest-priority compliance action for any agricultural employer.",
      "Build the heat illness prevention compliance record — shade, water, rest, training — with dated documentation suitable for penalty cap qualification.",
      "Establish final pay timing procedures for seasonal workforce transitions that comply with §§ 201-202 regardless of whether the separation is characterized as discharge or resignation.",
      "For PAGA settlement positioning, apply the Moniz three-part purpose test and the Kullar investigation standard to demonstrate the adequacy of the settlement investigation — the Premium Packing motion provides the analytical template."
    ],
    monitoring: [
      "Cal/OSHA heat illness prevention regulation updates and enforcement activity targeting agricultural operations.",
      "AB 1066 agricultural overtime phase-out implementation — employer compliance rates and enforcement actions.",
      "Development of the joint employer PAGA penalty allocation doctrine for grower/labor contractor arrangements."
    ],
    relatedTools: ["paga-penalty-estimator", "derivative-penalty-mapper"],
    relatedInsights: ["drafting-paga-settlement-approval-motions-after-moniz-a-practitioner-s-framework"],
    relatedMatters: []
  }
];

export var industries = industriesRaw.map(function(item, i) {
  return Object.assign({}, item, {
    slug: slugify(item.name),
    index: i
  });
});

export function getIndustryBySlug(slug) {
  return industries.find(function(ind) { return ind.slug === slug; }) || null;
}

export function getAllIndustrySlugs() {
  return industries.map(function(ind) { return ind.slug; });
}
