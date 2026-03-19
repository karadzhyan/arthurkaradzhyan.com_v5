import { slugify } from './slugify';

/* ── Cross-Industry Patterns ─────────────────────────────────────── */

export var crossIndustryPatterns = [
  {
    id: "meal-rest-exposure",
    name: "Meal & Rest Period Structural Exposure",
    summary: "The Donohue presumption converts routine time-clock data into rebuttable violations. Industries with continuous operations, patient care mandates, or remote field work face structural barriers to providing compliant 30-minute off-duty meal periods — creating systematic exposure that generic defense strategies cannot address.",
    description: "Three industries share a common structural problem: the operational model conflicts with California's rigid meal and rest period requirements. In hospitality, 24/7 guest-facing operations mean that 'relieved of all duties' is in tension with the service model. In healthcare staffing, CDPH staffing ratios at client facilities create scheduling constraints the staffing firm cannot control. In agriculture, remote field locations and piece-rate production pressure make compliant break provision logistically difficult. The Donohue v. AMN Services presumption applies to all three — and in each, the employer's time-clock data generates patterns that trigger the presumption even when breaks were offered.",
    industries: ["hospitality", "healthcare-staffing", "agriculture"],
    keyAuthority: "Donohue v. AMN Services (2021) 11 Cal.5th 58",
    relatedAuthorities: ["Brinker Restaurant Corp. v. Superior Court (2012) 53 Cal.4th 1004", "Augustus v. ABM Security Services (2016) 2 Cal.5th 257"],
    defenseAngle: "Temporal bifurcation — disaggregating Legacy Period violation rates from Remedied Period rates — combined with industry-specific evidence that breaks were provided, not merely scheduled. The defense framework varies by sector: attestation systems in hospitality, facility-specific control matrices in healthcare, field-level documentation in agriculture."
  },
  {
    id: "piece-rate-npt",
    name: "Piece-Rate Non-Productive Time",
    summary: "Section 226.2 requires separate compensation for rest periods and non-productive time — a calculation most legacy payroll systems cannot perform. Industries relying on piece-rate pay carry embedded underpayment in every pay period for every affected worker.",
    description: "Solar installers paid per panel and agricultural workers paid per bin share the same payroll compliance failure: section 226.2 requires that piece-rate employees receive separate compensation for rest and recovery periods at a regular rate derived from piece-rate earnings, and separate compensation for other non-productive time at not less than the applicable minimum wage. Each component must be separately identified on the wage statement. Most legacy payroll systems predate this requirement and cannot perform the calculation automatically. The result is systematic underpayment compounding across every pay period, with derivative wage statement violations under section 226(a) for every affected worker.",
    industries: ["solar-energy", "agriculture"],
    keyAuthority: "Lab. Code § 226.2",
    relatedAuthorities: ["Lab. Code § 226(a) (wage statement requirements)"],
    defenseAngle: "Payroll system audit and retroactive calculation methodology — verify whether the system separately identifies and correctly calculates rest period compensation at the piece-rate regular rate (not minimum wage). Implement compliant calculations prospectively to stop the bleeding and quantify historical exposure precisely."
  },
  {
    id: "joint-employer-allocation",
    name: "Joint Employer Liability Allocation",
    summary: "When operational control is split between entities — staffing firm and client facility, grower and labor contractor — PAGA penalty allocation between joint employers is uncharted in published authority. This creates both exposure and opportunity.",
    description: "Healthcare staffing agencies and agricultural operations share a structural defense challenge: the employer of record bears PAGA liability for violations occurring in workplaces it does not control. A staffing firm is liable when a county hospital's charge nurse prevents a meal break at minimum staffing. A grower is liable when a labor contractor's payroll system fails to calculate piece-rate rest period compensation correctly. In both cases, Martinez v. Combs establishes joint employer status, but no published decision addresses how PAGA penalties should be allocated between joint employers based on which entity controlled the violation-generating conditions.",
    industries: ["healthcare-staffing", "agriculture"],
    keyAuthority: "Martinez v. Combs (2012) 49 Cal.4th 35",
    relatedAuthorities: ["Dynamex Operations West v. Superior Court (2018) 4 Cal.5th 903"],
    defenseAngle: "Build a facility-by-facility or entity-by-entity control matrix documenting which employer controlled the conditions that generated each violation category. Argue that PAGA penalties should attach to the entity with operational authority over the violation — not the entity that happens to be the employer of record."
  },
  {
    id: "regular-rate-complexity",
    name: "Regular Rate Calculation Complexity",
    summary: "Multi-component compensation plans — commissions, bonuses, spiffs, equity — systematically understate the regular rate when payroll systems fail to include all components. The per-hour underpayment multiplies across every overtime and premium hour.",
    description: "Automotive dealerships and technology companies both use complex compensation structures that create regular rate miscalculation exposure. Dealerships layer base salary, commissions, manufacturer spiffs, holdback bonuses, CSI bonuses, and volume escalators. Technology companies add RSU vesting, equity grants, and performance bonuses. Under Alvarado v. Dart Container, flat-sum bonuses must be divided by total hours worked in the bonus period. Under Ferra v. Loews Hollywood Hotel, meal and rest period premiums must be calculated at the regular rate, not the base hourly rate. Most payroll systems fail both calculations. Hospitality employers with tipped and service-charge-based compensation face parallel complexity under different wage order provisions.",
    industries: ["automotive-dealerships", "technology-startups", "hospitality"],
    keyAuthority: "Alvarado v. Dart Container (2018) 4 Cal.5th 542",
    relatedAuthorities: ["Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858"],
    defenseAngle: "Map every compensation component to its regular rate treatment under current authority. Compare the payroll system's calculated rate against the legally correct rate. The delta is the per-hour underpayment — multiply across all overtime and premium hours for the exposure figure. Use the Regular Rate Calculator to model the correct rate."
  },
  {
    id: "travel-time",
    name: "Travel Time Compensability",
    summary: "Employer-directed travel between worksites or from designated reporting locations creates compensable time that pushes daily hours past the overtime threshold — generating daily overtime exposure that compounds across every affected workday.",
    description: "Solar field crews who report to an employer-designated yard and then drive to remote installation sites have compensable travel time under Morillion. Healthcare workers assigned to two facilities in one day have compensable inter-facility travel time. In both industries, the unpaid travel time pushes total daily hours beyond 8, generating overtime exposure even before substantive work begins. The distinction between compensable employer-directed travel and non-compensable voluntary commute turns on whether the employer requires reporting to a specific location — and both industries have reporting structures that satisfy this requirement.",
    industries: ["solar-energy", "healthcare-staffing"],
    keyAuthority: "Morillion v. Royal Packing (2000) 22 Cal.4th 575",
    relatedAuthorities: ["Lab. Code §§ 510, 1194"],
    defenseAngle: "Distinguish between employer-required yard or facility reporting (compensable) and voluntary reporting patterns (non-compensable commute). Audit scheduling records to identify same-day multi-site assignments. Calculate precise compensable travel time and verify whether it was paid."
  },
  {
    id: "manageability-limitations",
    name: "Manageability Limitations in Multi-Location Operations",
    summary: "Employers operating across multiple worksites with varying compliance environments can challenge PAGA representative treatment under section 2699(p) — the compliance landscape at each location is too distinct for unified penalty treatment.",
    description: "Healthcare staffing firms placing employees at 14 different client facilities, hospitality operators managing 12 hotel properties with different general managers, and agricultural operations spanning multiple fields with different labor contractors all share a common defense opportunity: section 2699(p) manageability. When each location has different scheduling software, break policies, supervisory structures, and operational constraints, a unified PAGA claim treats fundamentally different workplaces as interchangeable. The Estrada v. Royalty Carpet Mills framework supports arguing that representative treatment cannot accommodate the individualized proof requirements these operations demand.",
    industries: ["healthcare-staffing", "hospitality", "agriculture"],
    keyAuthority: "Lab. Code § 2699(p)",
    relatedAuthorities: ["Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582"],
    defenseAngle: "Build the manageability motion around location-specific evidence: different compliance systems, different supervisory practices, different workforce demographics, different operational constraints. Demonstrate that liability assessment requires location-by-location, shift-by-shift analysis."
  }
];

/* ── Universal Defense Frameworks ─────────────────────────────────── */

export var universalFrameworks = [
  {
    id: "temporal-bifurcation",
    name: "Temporal Bifurcation",
    subtitle: "The Two Hotels Framework",
    description: "Disaggregate the PAGA period into a Legacy Period (pre-remediation, higher violation rates) and a Remedied Period (post-compliance improvement, lower violation rates). This framework prevents plaintiffs from applying Legacy Period violation rates to the entire statutory period. The penalty calculation for each period uses the actual violation rate for that period — not a blended average. Implementation requires documenting the remediation inflection point with contemporaneous evidence: system implementation dates, policy revision records, training attendance logs, and payroll audit reports.",
    applicability: "Any employer that implemented compliance improvements during the PAGA statutory period — new timekeeping systems, revised meal period policies, payroll corrections, supervisor training programs.",
    keyInsight: "The inflection point between Legacy and Remedied periods must be documented with contemporaneous evidence — not reconstructed after litigation begins."
  },
  {
    id: "penalty-cap",
    name: "15% Penalty Cap Qualification",
    subtitle: "Reform-Era Good Faith Defense",
    description: "Under the 2024 PAGA reforms, employers who took all reasonable steps to comply with the underlying provisions before receiving a PAGA notice or agency request to cure may qualify for a penalty cap of 15% of the maximum penalty amount. Qualification requires documented pre-notice compliance efforts: written policies addressing the alleged violation categories, supervisor training with attendance records, payroll audits and correction procedures, and system implementations designed to prevent the violations. The documentation must predate the PAGA notice — post-notice compliance efforts do not qualify.",
    applicability: "All PAGA matters filed after the 2024 reform effective date — the cap creates significant leverage in settlement negotiations when the employer can demonstrate pre-notice good faith compliance efforts.",
    keyInsight: "Documentation is everything. The 15% cap is available only to employers who can prove they took reasonable steps before the notice — post-hoc compliance reconstruction does not satisfy the standard."
  },
  {
    id: "manageability",
    name: "Manageability Under § 2699(p)",
    subtitle: "Individualized Proof Defense",
    description: "The 2024 PAGA reforms codified manageability as a basis for limiting or restructuring PAGA claims. Where individual issues predominate over common ones — different job classifications, different work locations, different supervisors, different compliance environments — the court may limit the scope of the PAGA claim to claims that can be manageably tried. This defense is particularly powerful for multi-location employers, staffing firms, and any operation where the compliance environment varies materially across the workforce.",
    applicability: "Multi-location employers, staffing firms with multiple client sites, operations with diverse job classifications, and any employer where workplace conditions vary materially across the aggrieved employee population.",
    keyInsight: "Manageability is not an abstract argument — it requires concrete evidence showing how each location or classification presents a distinct compliance environment that representative treatment cannot accommodate."
  },
  {
    id: "three-scenario",
    name: "Three-Scenario Exposure Modeling",
    subtitle: "Structured Settlement Analytics",
    description: "Build three exposure scenarios for every PAGA matter: (1) plaintiff-maximum — every alleged violation sustained at maximum penalty rates with no offsets, (2) defense-adjusted — applying actual violation rates, applicable defenses, temporal bifurcation, and penalty cap qualification, and (3) realistic-settlement — the range where informed parties settle based on the litigation risk profile. This framework structures settlement negotiations, carrier reserve recommendations, and mediation positioning. Each scenario requires granular payroll data analysis — not estimates or assumptions.",
    applicability: "Every PAGA defense matter. The three-scenario model is the analytical backbone of settlement positioning and carrier communication.",
    keyInsight: "The gap between Scenario 1 and Scenario 2 is the defense value — it quantifies what competent defense work is worth in reducing exposure from the plaintiff's demand to a realistic settlement figure."
  }
];

/* ── Industry Data ────────────────────────────────────────────────── */

var industriesRaw = [
  {
    name: "Hospitality",
    icon: "HO",
    metric: "24/7 × Donohue",
    headline: "Every short meal punch in the time-clock data creates a rebuttable presumption of violation — and hotels generate thousands of them.",
    sectorContext: "California's hospitality sector employs over 1.9 million workers across hotels, restaurants, catering operations, and event venues — making it the state's largest private employment sector and one of its most PAGA-exposed. The industry operates under Wage Order 5, which governs the public housekeeping industry, and its 24/7 operational model creates inherent tension with California's meal and rest period requirements that no amount of policy drafting can fully resolve.",
    keyStatistic: { value: "1.9M+", label: "hospitality workers in California" },
    practiceNote: "In one multi-property hotel matter, the 'Two Hotels' temporal bifurcation framework — separating Legacy Period violation rates from Remedied Period rates using the implementation date of an electronic meal period attestation system — reduced the realistic settlement range by over 60%. The framework has since been applied to restaurant and catering operations with comparable results.",
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
      },
      {
        name: "Room Attendant Piece-Rate and Non-Productive Time",
        statute: "Lab. Code § 226.2",
        analysis: "Room attendants compensated on a per-room or per-floor basis are piece-rate employees subject to section 226.2's separate-compensation requirements. This means the hotel must separately calculate and pay rest period time at a regular rate derived from the piece-rate earnings — not at minimum wage, but at the actual piece-rate regular rate. Non-productive time (waiting for room assignments, attending meetings, traveling between floors) must also be separately compensated at no less than the applicable minimum wage. Most hotel payroll systems do not distinguish between productive and non-productive time for housekeeping staff, creating systematic underpayment. The wage statement must separately identify each compensation component — a requirement that virtually no legacy hotel payroll system satisfies.",
        defenseStrategy: "Audit the compensation structure for all housekeeping positions paid on a per-room or per-task basis. Verify whether the payroll system separately calculates rest period compensation at the piece-rate regular rate and identifies non-productive time compensation on the wage statement. Implement system updates to achieve § 226.2 compliance and quantify any historical underpayment for exposure modeling."
      },
      {
        name: "Manager and Supervisor Overtime Exemption",
        statute: "Lab. Code §§ 510, 515; IWC Wage Order 5, § 1(A)",
        analysis: "The executive exemption requires that the employee spend more than 50% of working time on exempt duties — managing the enterprise or a customarily recognized department, directing the work of two or more employees, and exercising discretion and independent judgment. In hospitality, the line between exempt managerial work and non-exempt production work is blurred: a restaurant manager who regularly works the floor during rush periods, a hotel front desk supervisor who checks in guests during peak times, or a housekeeping manager who cleans rooms when short-staffed is performing non-exempt duties that may push the time allocation below 50%. The salary basis test adds a second vulnerability — managers paid a salary but subject to deductions for partial-day absences or performance-based reductions may lose the exemption entirely.",
        defenseStrategy: "Conduct a duties analysis for every position classified as exempt under the executive exemption. Document the actual allocation of time between managerial and production tasks using contemporaneous records — not job descriptions. For positions where the 50% threshold is borderline, implement workload redistribution and supervisory staffing adjustments to ensure the exemption is defensible."
      },
      {
        name: "Alternative Workweek Schedules in Housekeeping and Laundry",
        statute: "Lab. Code § 511; IWC Wage Order 5, § 3(B)",
        analysis: "Hotels implementing 4/10 or 3/12 schedules for housekeeping, laundry, and maintenance departments must comply with the four-step DIR election process — the same process that creates catastrophic retroactive exposure in the solar industry. The exposure is compounded in hospitality because housekeeping departments experience high turnover, meaning that employees hired after the original election may not have voted in the election and may not have received the required written disclosure. Whether these post-election hires are covered by the existing AWS or must participate in a new election is an unresolved question that creates ongoing compliance risk.",
        defenseStrategy: "Audit all active alternative workweek elections for strict compliance with each procedural step. Verify that post-election hires received written disclosure and were informed of the alternative schedule. If procedural deficiencies exist, conduct a new compliant election immediately to limit prospective exposure. Calculate the retroactive overtime exposure from any invalid AWS period."
      }
    ],
    authorities: ["Donohue v. AMN Services (2021) 11 Cal.5th 58", "Brinker Restaurant Corp. v. Superior Court (2012) 53 Cal.4th 1004", "Augustus v. ABM Security Services (2016) 2 Cal.5th 257", "Troester v. Starbucks Corp. (2018) 5 Cal.5th 829", "Lab. Code § 226.2 (piece-rate compensation)", "Lab. Code § 511 (alternative workweek schedules)"],
    defenseStrategies: [
      "Deploy the 'Two Hotels' temporal bifurcation framework — disaggregate Legacy Period violation rates from Remedied Period rates using PMS system logs, overtime reduction metrics, and electronic meal period attestation data.",
      "Challenge the Donohue presumption with affirmative evidence of meal period provision: on-duty meal period agreements, electronic attestation records, and supervisor training documentation demonstrating that the policy was to provide, not merely schedule, compliant meal periods.",
      "Pursue manageability limitations under § 2699(p) for multi-property operators where each property has different staffing levels, scheduling practices, and operational constraints — a unified PAGA claim across 12 hotel properties with different general managers and different HR practices is analytically unmanageable.",
      "Position for the 15% penalty cap by documenting pre-notice compliance efforts: meal period policy revisions, supervisor training with attendance records, payroll audit reports, and electronic timekeeping system implementation.",
      "Audit piece-rate compliance for housekeeping departments under § 226.2 — this is the most commonly overlooked exposure category in hospitality because employers do not recognize per-room pay as piece-rate compensation subject to separate non-productive time and rest period compensation requirements."
    ],
    monitoring: [
      "Pending DLSE guidance on service charge distribution for mandatory hotel and banquet service charges.",
      "Legislative proposals affecting predictive scheduling requirements for hospitality workers in California.",
      "Evolving treatment of on-duty meal period agreements in hospitality settings — no published appellate decision has addressed whether the 'nature of the work' prerequisite is satisfied for hotel front desk employees during overnight shifts.",
      "Application of § 226.2 piece-rate requirements to per-room housekeeping compensation — limited published authority on whether per-room pay structures constitute piece-rate under the statute."
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
    sectorContext: "California has over 3,200 franchised new-car dealerships and thousands more independent used-car lots, each employing salespeople, F&I managers, service advisors, and technicians under compensation structures that create distinctive PAGA exposure. The industry operates under Wage Order 7 (Mercantile Industry), which provides a commissioned-employee overtime exemption — but the exemption's workweek-by-workweek verification requirement is widely misapplied, and the Sciborski commission forfeiture theory represents an industry-wide liability that most dealerships have never analyzed.",
    keyStatistic: { value: "3,200+", label: "franchised dealerships in California" },
    practiceNote: "The Sciborski forfeiture theory — commissions earned at deal closing, not deal funding — was characterized by a supervising partner with decades of wage-and-hour experience as a theory he had never seen raised in practice. The exposure is structural: every departed salesperson with a pending deal at separation is a potential claimant. A single dealership's forensic audit of departed salespeople's deal pipelines can reveal six-figure exposure that no one had identified.",
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
      },
      {
        name: "F&I Manager Exempt Classification",
        statute: "Lab. Code § 515; IWC Wage Order 7, § 1(A)(2)",
        analysis: "Finance and Insurance managers are routinely classified as exempt under the administrative exemption, but the classification frequently fails the duties test. The administrative exemption requires work 'directly related to management policies or general business operations of the employer or the employer's customers.' F&I managers negotiate financing terms, sell extended warranties, and process deal paperwork — functions that are production work (generating revenue through customer transactions), not administrative work (supporting the business's internal operations). The distinction between production and administration is the exemption's critical fault line, and F&I managers fall on the production side. Each misclassified F&I manager generates overtime, meal period, and rest period exposure for every workweek of misclassification — and most dealerships have 2-4 F&I managers working well over 8 hours per day during busy periods.",
        defenseStrategy: "Conduct a duties analysis of F&I manager positions comparing actual daily activities against the administrative exemption requirements. Document the proportion of time spent on customer-facing revenue-generating activities versus internal administrative functions. If the classification is defensible, build the documentation. If it is not, reclassify prospectively and quantify historical overtime exposure."
      },
      {
        name: "Dealership Bonus and Incentive Structures",
        statute: "Lab. Code § 510; 29 C.F.R. § 778.211",
        analysis: "Dealerships layer multiple bonus and incentive payments on top of base compensation: manufacturer spiffs (per-unit bonuses from the manufacturer for selling specific models), holdback bonuses (deferred compensation released upon deal funding), CSI bonuses (customer satisfaction index bonuses tied to survey scores), and volume escalators (additional per-unit bonuses triggered when monthly sales thresholds are met). Each of these compensation components must be included in the regular rate calculation for overtime purposes. The calculation methodology varies by bonus type: flat-sum bonuses are divided by total hours worked in the bonus period per Alvarado, while production bonuses tied to specific units may be allocated differently. Most dealership payroll systems treat these bonuses as separate from the regular rate, creating systematic underpayment.",
        defenseStrategy: "Map each bonus and incentive component to its correct regular rate treatment. Build a compensation matrix showing every pay component, its payment frequency, and the correct regular rate inclusion methodology. Compare the payroll system's regular rate output against the correctly calculated rate to quantify the per-employee, per-pay-period underpayment."
      },
      {
        name: "Service Advisor Commission Compliance",
        statute: "Lab. Code §§ 200-204, 2751; Wage Order 7-2001, § 3(D)",
        analysis: "Service advisors — the customer-facing employees in the service department who write repair orders and recommend maintenance — are typically compensated through a commission structure based on labor and parts sales. Three compliance issues converge: first, whether the service advisor's commission plan satisfies the § 2751 written agreement requirement (many dealerships use informal or outdated commission structures). Second, whether the service advisor qualifies for the Wage Order 7 commissioned-employee overtime exemption on a workweek-by-workweek basis. Third, whether the minimum wage guarantee is being correctly calculated — service advisors who earn below minimum wage in slow weeks must receive a true-up, but dealerships often advance against future commissions rather than paying the minimum wage guarantee, creating a draw-against-commission arrangement that may itself violate section 221's prohibition on wage deductions.",
        defenseStrategy: "Audit service advisor commission agreements for § 2751 compliance. Verify overtime exemption qualification on a workweek-by-workweek basis. Review minimum wage true-up calculations to ensure they comply with § 221 — draw advances that create negative balances carried forward may constitute unlawful wage deductions."
      }
    ],
    authorities: ["Sciborski v. Pacific Bell Directory (2012) 205 Cal.App.4th 1152", "Alvarado v. Dart Container (2018) 4 Cal.5th 542", "Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858", "Lab. Code § 204.1 (commissioned employee exemption)", "Lab. Code § 2751 (written commission agreements)", "Lab. Code § 221 (unlawful wage deductions)"],
    defenseStrategies: [
      "Conduct a Sciborski-specific forensic audit: trace every departed salesperson's pending deals, determine funding status, and calculate exact forfeiture exposure. This is the single highest-value compliance action a dealership can take.",
      "Verify the Wage Order 7 overtime exemption on a workweek-by-workweek basis — not monthly or quarterly. Identify failure weeks and calculate overtime exposure for only those weeks.",
      "Recalculate the regular rate with all compensation components included per Alvarado and Ferra. The difference between the payroll system's regular rate and the legally correct regular rate is the per-hour underpayment — multiply across all overtime and premium hours for the exposure figure.",
      "Revise commission plan language to eliminate forfeiture-on-departure provisions, implement post-separation payment procedures for pending deals, and establish § 2751-compliant written commission agreements for all commissioned employees.",
      "Audit F&I manager and service advisor classifications under the administrative and commissioned-employee exemptions — these are the two most commonly misclassified positions in dealership operations."
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
    sectorContext: "Healthcare staffing is a $20 billion industry in California, supplying nurses, CNAs, therapists, and clinical support staff to hospitals and skilled nursing facilities across the state. The sector operates at the intersection of two regulatory frameworks — employment law and healthcare staffing ratios — creating a structural tension that generic PAGA defense strategies cannot address. Staffing firms are employers of record for workers whose daily conditions are controlled by client facilities they do not own or operate.",
    keyStatistic: { value: "$20B", label: "healthcare staffing industry in California" },
    practiceNote: "The public agency immunity defense — arguing that PAGA penalties should not attach to a staffing firm for violations arising from conditions controlled by an immune public agency client — is a novel theory I developed in one healthcare staffing matter. It required distinguishing between violations attributable to the staffing firm's payroll obligations and violations attributable to the client facility's operational decisions. No published appellate authority has addressed this allocation question.",
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
      },
      {
        name: "Public Agency Immunity and Staffing Firm Liability",
        statute: "Gov. Code §§ 815-818; Lab. Code § 2699",
        analysis: "When a staffing firm places healthcare workers at government-operated hospitals or county health facilities, the staffing firm bears PAGA liability for Labor Code violations that arise from working conditions controlled by an immune public agency employer. The public agency itself may be immune from PAGA penalties under Government Code sections 815 through 818 — but the staffing firm, as the employer of record, has no parallel immunity. This creates a structural inequity: the entity that controls the conditions generating the violation (the public hospital) is immune, while the entity that cannot control those conditions (the staffing firm) bears the penalty. No published appellate decision has addressed whether PAGA penalties should attach to a secondary employer for violations arising from conditions controlled by an immune primary employer.",
        defenseStrategy: "Identify all client facilities that are public agencies or government-operated entities. Document the operational control allocation at each public facility — scheduling authority, break timing control, overtime authorization. Build the immunity defense by demonstrating that the staffing firm lacked operational authority over the conditions that generated the violations, and that imposing penalties on the staffing firm for public-agency-controlled conditions would be inequitable and inconsistent with the statutory framework."
      },
      {
        name: "On-Call and Standby Compensation",
        statute: "Mendiola v. CPS Security Solutions (2015) 60 Cal.4th 833; Lab. Code § 510",
        analysis: "Healthcare staffing agencies frequently require nurses and clinical staff to remain on-call for shift openings, emergency staffing needs, or client facility requests. Under Mendiola, the determination of whether on-call time is compensable turns on the degree of the employer's control over the employee during on-call periods. If the staffing agency requires the employee to remain within a geographic radius, respond within a short timeframe, or refrain from personal activities during on-call periods, the time may be compensable as hours worked. The 'engaged to wait' versus 'waiting to be engaged' distinction is fact-intensive — and healthcare on-call arrangements frequently fall on the compensable side because the response time requirements are short and the geographic restrictions are significant.",
        defenseStrategy: "Audit on-call policies and actual practices for each client facility assignment. Document the degree of geographic restriction, response time requirements, and frequency of actual call-ins. If on-call time is compensable, calculate the additional hours worked and resulting overtime exposure. If the restrictions are minimal, document the employee's freedom during on-call periods to support the 'waiting to be engaged' characterization."
      },
      {
        name: "Per Diem and Expense Reimbursement for Traveling Workers",
        statute: "Lab. Code § 2802; Gattuso v. Harte-Hanks Shoppers (2007) 42 Cal.4th 554",
        analysis: "Traveling healthcare workers — nurses, therapists, and technicians assigned to facilities away from their home base — incur substantial expenses: temporary housing, meals, transportation, and professional licensing fees for the assignment location. Section 2802 requires reimbursement of all necessary expenditures incurred in direct consequence of job duties. Many staffing agencies provide per diem stipends, but the stipend amount may not cover actual costs — and if the per diem is structured as taxable compensation rather than a non-taxable reimbursement, it may not satisfy section 2802 at all. The distinction between a per diem payment (which may or may not satisfy the reimbursement obligation) and an actual expense reimbursement (which does) creates PAGA exposure when the per diem is inadequate or improperly structured.",
        defenseStrategy: "Audit per diem payment structures to determine whether they are structured as non-taxable reimbursements or taxable compensation. Compare per diem amounts against actual costs in the assignment location. If the per diem is inadequate, calculate the per-employee reimbursement shortfall. Implement expense submission procedures or increase per diem amounts to defensible levels."
      },
      {
        name: "Exempt Classification for Traveling Nurses and Therapists",
        statute: "Lab. Code § 515; IWC Wage Order 4, § 1(A)",
        analysis: "Traveling nurses and therapists are sometimes classified as exempt under the professional exemption, but the classification may fail for nurses who are not registered nurses (LVNs, CNAs) or for therapists whose work is primarily the application of established protocols rather than the exercise of discretion and independent judgment. The professional exemption requires that the employee be 'primarily engaged in an occupation commonly recognized as a learned profession' — and the duties test requires the exercise of discretion and independent judgment. Staff-level nurses following physician orders and established care plans may not satisfy the discretion requirement, even though their work is important and requires specialized training.",
        defenseStrategy: "Conduct a role-by-role analysis of all positions classified as exempt under the professional exemption. Verify that the employee holds the requisite professional license or certification. Document the degree of discretion and independent judgment exercised in daily work versus the application of established protocols and physician orders."
      }
    ],
    authorities: ["Martinez v. Combs (2012) 49 Cal.4th 35", "Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582", "Morillion v. Royal Packing (2000) 22 Cal.4th 575", "Dynamex Operations West v. Superior Court (2018) 4 Cal.5th 903", "Mendiola v. CPS Security Solutions (2015) 60 Cal.4th 833", "Gattuso v. Harte-Hanks Shoppers (2007) 42 Cal.4th 554"],
    defenseStrategies: [
      "Develop the public agency immunity defense for violations occurring at government client facilities where the staffing firm lacks operational control.",
      "Pursue manageability limitations by demonstrating that each client facility presents a distinct compliance environment requiring individualized analysis.",
      "Distinguish between violations attributable to the staffing firm's payroll obligations (wage statements, timely payment) and violations attributable to client facility operations (meal/rest period scheduling) — penalties for the latter should not attach to the staffing firm.",
      "Audit inter-facility travel time assignments and per diem/expense reimbursement compliance to address the violation categories the staffing firm directly controls.",
      "Review on-call and standby compensation policies at each client facility — the compensability determination is facility-specific and depends on the degree of control exercised during on-call periods."
    ],
    monitoring: [
      "Development of the joint employer PAGA penalty allocation doctrine — no published appellate authority addresses this issue.",
      "CDPH staffing ratio changes that affect meal period scheduling constraints at client facilities.",
      "Legislative proposals affecting healthcare staffing agency liability for client facility working conditions.",
      "Evolving treatment of on-call compensation in healthcare settings — the Mendiola control test applies differently in clinical environments where response times are driven by patient safety requirements."
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
    sectorContext: "California leads the nation in solar installations, with over 47,000 solar workers and a rapidly expanding energy sector driven by state mandates and federal incentives. The industry's workforce — field installers, electricians, project managers — operates under Wage Order 16 (On-Site Construction) or Wage Order 4, and relies heavily on alternative workweek schedules to accommodate the 4/10 work pattern standard in the trade. The AWS compliance requirements are among the most technically exacting in California employment law, and procedural failures are endemic.",
    keyStatistic: { value: "47,000+", label: "solar workers in California" },
    practiceNote: "In one solar installation matter, a single missed step in the DIR election process — late filing of election results — retroactively invalidated an AWS covering 30 installers over two years. The overtime exposure exceeded $500,000 before PAGA penalties were calculated. The employer had complied with every other procedural requirement. The lesson is stark: AWS compliance is all-or-nothing, and partial compliance is indistinguishable from no compliance.",
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
      },
      {
        name: "Travel Time from Reporting Locations to Installation Sites",
        statute: "Morillion v. Royal Packing (2000) 22 Cal.4th 575; Lab. Code §§ 510, 1194",
        analysis: "Solar field crews typically report to an employer-designated yard or warehouse each morning, load equipment and materials onto company vehicles, and then drive to remote installation sites that may be 30 to 90 minutes away. Under Morillion, when the employer requires the employee to report to a specific location and then travel to the worksite, the travel time from the reporting location to the worksite is compensable as hours worked — it is not a non-compensable commute. This travel time pushes total daily hours well beyond 8 even before installation work begins. On a 4/10 AWS, a crew that spends 1 hour traveling each way works 12 hours (10 + 2 travel), generating 2 hours of unpaid overtime per day if travel time is not compensated. If the AWS is also invalid, the overtime calculation resets to an 8-hour day, generating 4 hours of unpaid overtime per day.",
        defenseStrategy: "Audit the travel time policy and actual practices for all field crews. Distinguish between employer-required yard reporting (compensable travel from yard to site) and voluntary direct reporting to the job site (potentially non-compensable commute). Document the policy and ensure consistent application. If travel time is compensable and unpaid, calculate the aggregate overtime exposure across all affected employees."
      },
      {
        name: "Expense Reimbursement for Field Workers",
        statute: "Lab. Code § 2802",
        analysis: "Solar field workers frequently incur unreimbursed expenses: personal vehicle mileage when driving to remote sites, personal cell phone use for job-site coordination, personal tools and equipment, safety gear replacement, and work clothing required by the employer or by safety regulations. Section 2802 requires reimbursement of all necessary expenditures incurred in direct consequence of the discharge of duties. Many solar employers provide company vehicles and some equipment but do not reimburse for personal cell phone use, personal tool wear, or other out-of-pocket expenses. The absence of a comprehensive reimbursement policy creates per-employee, per-pay-period PAGA exposure for every field worker.",
        defenseStrategy: "Audit expense reimbursement policies and practices for all field positions. Identify every category of employee expenditure — vehicles, fuel, tools, equipment, phones, safety gear, clothing — and determine whether reimbursement is provided. Implement a comprehensive § 2802 reimbursement policy with documented cost analysis supporting the reimbursement amounts."
      },
      {
        name: "Heat Illness Prevention Compliance",
        statute: "Cal/OSHA T8 § 3395; Lab. Code § 6720",
        analysis: "Solar installation is outdoor work performed in direct sun exposure, often on rooftops where reflected heat can push effective temperatures well above ambient. Cal/OSHA's heat illness prevention regulation requires shade access when temperatures exceed 80 degrees Fahrenheit, potable water provision (one quart per hour per employee), cool-down rest periods of at least five minutes net whenever an employee feels the need to cool down, and training for all employees and supervisors on heat illness recognition and response. Violations are PAGA-actionable under Labor Code section 6720, which creates a private right of action for certain Cal/OSHA violations. On remote installation sites — particularly residential rooftop installations — compliance with shade and water requirements presents logistical challenges that many solar employers have not adequately addressed.",
        defenseStrategy: "Audit heat illness prevention compliance at representative installation sites during peak temperature periods. Document shade structure availability (or alternative cooling measures for rooftop work), water supply logistics, cool-down rest period practices, and training records. Build the compliance documentation for 15% penalty cap qualification."
      },
      {
        name: "Multi-Site Rest Period Logistics",
        statute: "Lab. Code § 226.7; IWC Wage Orders, § 12",
        analysis: "Solar field crews working at remote residential or commercial installation sites face practical barriers to rest period compliance. A 10-minute rest period requires a safe location to rest — but on a residential rooftop, the crew must climb down, find shade, and then climb back up. The total time consumed exceeds 10 minutes even if the actual rest time is compliant. Multi-site days — where a crew finishes one installation and drives to another — compress the available work time and create pressure to skip or shorten rest periods. If the employer does not track rest periods at remote sites, the absence of records creates a presumption of non-compliance that the employer must rebut.",
        defenseStrategy: "Implement electronic rest period tracking for all field crews at all installation sites. Document the logistics of rest period provision at different site types (rooftop residential, ground-mount commercial, utility-scale). If rest period provision is structurally difficult at certain site types, evaluate whether the rest period premium auto-pay model is more defensible than attempting to demonstrate 100% compliance."
      },
      {
        name: "Prevailing Wage on Public Works Projects",
        statute: "Lab. Code §§ 1720-1861; DIR Prevailing Wage Determinations",
        analysis: "Solar installations on public buildings, schools, government facilities, or projects receiving public funding may trigger prevailing wage requirements. The prevailing wage determination sets minimum hourly rates for each craft classification — and solar installer classifications can vary significantly depending on whether the work is characterized as electrical, roofing, or general construction. Misclassification of the craft type, failure to pay the correct prevailing wage rate, or failure to maintain certified payroll records creates both DIR enforcement exposure and PAGA exposure for the wage underpayment. The intersection of prevailing wage requirements with the AWS and piece-rate issues creates a compliance matrix that few solar employers navigate correctly.",
        defenseStrategy: "Identify all projects that may trigger prevailing wage requirements. Verify craft classification for each solar installation role against DIR prevailing wage determinations. Audit payroll records against the applicable prevailing wage rates. Maintain certified payroll records for all prevailing wage projects. If underpayment exists, calculate the per-employee shortfall and assess whether voluntary correction through the DIR's self-audit program is available."
      }
    ],
    authorities: ["Lab. Code § 511 (AWS election requirements)", "Morillion v. Royal Packing (2000) 22 Cal.4th 575", "Lab. Code § 226.2 (piece-rate compensation)", "Cal/OSHA T8 § 3395 (heat illness prevention)", "Lab. Code §§ 1720-1861 (prevailing wage)", "Lab. Code § 2802 (expense reimbursement)"],
    defenseStrategies: [
      "Conduct an immediate AWS compliance audit — verify all four steps for every active alternative workweek election. This is the single highest-priority action for any solar/energy employer.",
      "Audit travel time practices: distinguish between employer-required yard reporting (compensable travel from yard to site) and voluntary reporting (non-compensable commute). Document the policy and ensure consistent application.",
      "Implement § 226.2-compliant payroll procedures for piece-rate workers — separate compensation for rest periods and non-productive time, separately identified on the wage statement.",
      "Position for the 15% penalty cap by documenting heat illness prevention training, rest period provision at remote sites, and equipment/vehicle expense reimbursement policies.",
      "For public works projects, verify prevailing wage classification and payment compliance — the intersection of prevailing wage underpayment with PAGA penalties creates compound exposure that dwarfs either violation category standing alone."
    ],
    monitoring: [
      "DIR enforcement activity related to AWS election procedures in the construction and energy sectors.",
      "Evolving prevailing wage requirements for solar installation on public works projects.",
      "Cal/OSHA heat illness prevention enforcement actions and proposed regulation updates.",
      "Development of rest period compliance standards for remote outdoor worksites — limited published authority on what constitutes adequate rest period facilities at temporary installation sites."
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
    sectorContext: "California's technology sector — from mature public companies to pre-revenue startups — employs hundreds of thousands of workers under compensation structures that create distinctive PAGA exposure. The sector operates under Wage Order 4 (Professional, Technical, Clerical), and its reliance on the computer professional exemption under section 515.5, combined with post-COVID remote work models and equity-heavy compensation packages, creates a compliance landscape that few technology companies have adequately addressed.",
    keyStatistic: { value: "$56.97/hr", label: "2025 computer professional exemption minimum" },
    practiceNote: "In one dissolved fashion technology startup matter, I managed a 121-page discovery response reconstructing the entire employment framework from fragments scattered across former executives' personal devices. The exempt classification defense was built into the production framework itself — the documents told the story of a workforce that was genuinely exempt under the computer professional standard, but the company's dissolution meant the evidence had to be reconstructed rather than produced from organized records.",
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
      },
      {
        name: "Flexible Scheduling and Daily Overtime",
        statute: "Lab. Code § 510",
        analysis: "Technology companies frequently offer flexible scheduling — letting employees choose their own hours, work from home, or shift their schedules around personal commitments. But California's daily overtime requirement (premium pay for hours exceeding 8 in a workday) applies regardless of whether the employee chose to work a longer day. An engineer who voluntarily works 10 hours on Monday and 6 hours on Tuesday is entitled to 2 hours of overtime on Monday even though the weekly total is 16 hours. 'Unlimited PTO' policies create a parallel problem: if the employer does not track whether time off is actually taken, it cannot demonstrate that employees were provided with adequate rest opportunities — and the absence of PTO tracking records may create a presumption that the policy was illusory. Illusory PTO policies have generated PAGA claims based on failure to pay out accrued vacation at separation under section 227.3.",
        defenseStrategy: "Implement daily time tracking for all non-exempt employees regardless of flexible scheduling arrangements. Ensure that the daily overtime calculation is performed correctly even when employees choose non-standard schedules. For unlimited PTO policies, implement minimum-use tracking to demonstrate that the policy is genuine and that employees actually take time off."
      },
      {
        name: "Startup Dissolution and Wind-Down Obligations",
        statute: "Lab. Code §§ 201-203; Corp. Code §§ 1800-1809",
        analysis: "When a startup ceases operations — whether through assignment for benefit of creditors, voluntary dissolution, or simply running out of funding — the employment obligations do not dissolve with the corporate entity. Final wages must be paid immediately upon discharge under section 201. Accrued vacation must be paid out at the final rate of pay under section 227.3. COBRA and Cal-COBRA notifications must be issued. Wage statements must be provided for the final pay period. In practice, dissolved startups frequently fail to satisfy these obligations — the individuals responsible for payroll have moved on, the bank accounts have been frozen or depleted, and the corporate records are scattered. Each failure creates PAGA exposure that can be pursued against the dissolved entity, its assignee, or in some cases its officers and directors personally under section 558.1.",
        defenseStrategy: "For matters involving dissolved startups, immediately identify and preserve all available employment records — payroll data, time records, offer letters, commission agreements, equity grants. Reconstruct the employment framework from available fragments. Assess whether final pay obligations were satisfied and calculate any shortfall. Determine whether officer/director personal liability under § 558.1 is at issue."
      },
      {
        name: "Independent Contractor Misclassification",
        statute: "Dynamex Operations West v. Superior Court (2018) 4 Cal.5th 903; Lab. Code § 2775 (ABC test)",
        analysis: "Technology companies — particularly those operating platform or gig-model businesses — face misclassification exposure under the ABC test codified in section 2775. The ABC test presumes that a worker is an employee unless the hiring entity demonstrates three conditions: (A) the worker is free from the company's control and direction, (B) the worker performs work outside the usual course of the company's business, and (C) the worker is customarily engaged in an independently established trade, occupation, or business. Prong B is the most challenging for technology companies — a software developer writing code for a technology company is arguably performing work within the usual course of the company's business, regardless of how the engagement is structured. Each misclassified independent contractor creates retroactive exposure for overtime, meal and rest periods, expense reimbursement, and wage statements for the entire engagement period.",
        defenseStrategy: "Audit all independent contractor relationships against the ABC test. Focus on Prong B — whether the contractor's work is outside the usual course of the company's business. For contractors who fail the test, assess whether the Borello multi-factor test applies under one of the statutory exceptions. If misclassification exposure exists, calculate the retroactive wage and hour exposure for each contractor and consider reclassification."
      },
      {
        name: "Wage Statement Compliance for Complex Compensation",
        statute: "Lab. Code § 226(a)",
        analysis: "Technology companies with multi-component compensation — base salary, bonuses, RSU vesting, commission payments, expense reimbursements, PTO payouts — face wage statement compliance challenges that compound across the workforce. Section 226(a) requires that the wage statement show, among other items, gross wages earned, total hours worked, all deductions, net wages, and the inclusive dates of the pay period. When equity vesting events, bonus payments, and commission true-ups are processed outside the regular payroll cycle, the corresponding wage statements may not accurately reflect all compensation components. Each deficient wage statement creates a penalty of $50 for the first violation and $100 for each subsequent violation per employee per pay period — and in a technology company with hundreds of employees, the aggregate penalty exposure is substantial.",
        defenseStrategy: "Audit wage statement output for all pay periods that include non-standard compensation events (equity vesting, bonus payments, commission true-ups). Verify that each compensation component is accurately reflected on the wage statement. Implement payroll system updates to ensure that non-standard payments generate compliant wage statements. Use the Wage Statement Compliance Checker to identify specific deficiency categories."
      }
    ],
    authorities: ["Lab. Code § 515.5 (computer professional exemption)", "Lab. Code § 2802 (expense reimbursement)", "Dynamex Operations West v. Superior Court (2018) 4 Cal.5th 903", "Lab. Code § 226 (wage statement requirements)", "Lab. Code § 2775 (ABC test codification)", "Lab. Code § 558.1 (officer/director personal liability)"],
    defenseStrategies: [
      "Conduct a § 515.5 duties analysis for every role classified as exempt under the computer professional exemption. Verify salary threshold compliance and reclassify roles that fail the duties test.",
      "Implement a documented § 2802 remote work expense reimbursement policy with a defensible cost basis. This is the single most common PAGA-actionable gap in technology companies.",
      "Audit payroll system treatment of RSU and equity vesting events to determine whether equity compensation is included in the regular rate. Calculate underpayment per employee if it is not.",
      "For dissolved startups, reconstruct the employment record from available fragments — personal devices, cloud storage, former executive cooperation — and build the defense narrative into the document production framework.",
      "Audit all independent contractor relationships against the ABC test, with particular focus on Prong B. Technology companies that engage contractors to perform work within their core business (software development, data analysis, product design) face the highest misclassification risk."
    ],
    monitoring: [
      "Annual adjustment to the § 515.5 computer professional exemption salary threshold — verify compliance each January.",
      "Legislative and regulatory developments affecting independent contractor classification in platform and gig-economy technology companies.",
      "Evolving judicial treatment of § 2802 expense reimbursement adequacy for remote and hybrid work arrangements.",
      "Development of case law on illusory unlimited PTO policies and their treatment under § 227.3 — limited published authority on when an unlimited PTO policy creates an accrued vacation obligation."
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
    sectorContext: "California produces over a third of the country's vegetables and three-quarters of its fruits and nuts, employing an agricultural workforce of over 400,000 — many working under piece-rate compensation structures that predate modern wage-and-hour requirements. The industry operates under Wage Order 14 (Agricultural Occupations) and has been subject to the AB 1066 agricultural overtime phase-out, which brought agricultural workers to parity with non-agricultural overtime standards. The combination of large workforces, legacy payroll systems, seasonal employment patterns, and joint employer arrangements between growers and labor contractors creates a distinctive and often severe PAGA exposure profile.",
    keyStatistic: { value: "400,000+", label: "agricultural workers in California" },
    practiceNote: "Agricultural PAGA matters are defined by scale. A single grower with 100+ field workers, each subject to piece-rate non-productive time violations compounding across every pay period for years, generates exposure figures that dwarf most other industries. The defense challenge is equally distinctive: records are often incomplete, the workforce is seasonal and mobile, and joint employer liability between growers and labor contractors creates allocation disputes that no published appellate authority has resolved.",
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
      },
      {
        name: "Field Sanitation and Rest Area Requirements",
        statute: "Cal/OSHA T8 § 3457; Lab. Code § 6712",
        analysis: "Cal/OSHA field sanitation regulations require agricultural employers to provide toilet facilities within a quarter-mile walk or five-minute travel time of each employee's work area, hand-washing facilities with soap and single-use towels, and drinking water that is suitably cool and in sufficient quantity. Rest areas must be shaded when temperatures exceed 80 degrees, with enough space for the number of employees on rest at any given time. In remote agricultural fields, compliance with these requirements is logistically challenging — portable facilities must be transported, maintained, and repositioned as crews move through different sections of the operation. Violations are PAGA-actionable under section 6712's private right of action for health and safety violations, and they are among the most common Cal/OSHA citations in agriculture.",
        defenseStrategy: "Audit field sanitation compliance at all active work locations. Document the placement and maintenance schedule for portable toilets, hand-washing stations, and shade structures. Establish a protocol for repositioning facilities as crews move between work areas. Maintain compliance records with dates and photographic documentation suitable for penalty cap qualification."
      },
      {
        name: "Labor Contractor Joint Employment Liability",
        statute: "Martinez v. Combs (2012) 49 Cal.4th 35; Lab. Code § 2810.3",
        analysis: "Agricultural operations that use labor contractors to supply field workers face joint employer liability under both Martinez v. Combs and section 2810.3. Under Martinez, the grower may satisfy one or more of the three alternative employment tests — exercise of control, suffer or permit to work, or engage — even when the labor contractor handles all payroll and HR functions. Under section 2810.3, a client employer that obtains workers from a labor contractor shares liability for the labor contractor's failure to pay wages, provide workers' compensation coverage, or comply with health and safety requirements. The grower's exposure is compounded when the labor contractor lacks the resources to satisfy a PAGA judgment — the grower becomes the deep pocket for violations committed by the contractor's payroll and scheduling systems.",
        defenseStrategy: "Document the operational control allocation between the grower and each labor contractor. Build a matrix showing which entity controls hiring, scheduling, work pace, field conditions, payroll, and HR functions. Audit the labor contractor's payroll and compliance systems — the grower's exposure is directly proportional to the contractor's compliance failures. Implement contractual indemnification provisions and compliance verification procedures."
      },
      {
        name: "Agricultural Overtime Phase-Out Under AB 1066",
        statute: "AB 1066; Lab. Code § 857",
        analysis: "AB 1066 phased out the agricultural overtime exemption over a multi-year schedule, bringing agricultural workers to parity with non-agricultural overtime standards. As of January 1, 2022, agricultural workers at employers with 26 or more employees are entitled to overtime after 8 hours in a day and 40 hours in a week — the same standard as all other California workers. Many agricultural operations have not fully adapted to this change operationally. Harvest schedules, weather-dependent work patterns, and production quotas frequently result in workdays exceeding 8 hours — and if the payroll system has not been updated to calculate daily overtime on the non-agricultural standard, every affected pay period generates overtime underpayment exposure. The transition from weekly-only overtime to daily overtime represents a fundamental change in how agricultural payroll must be calculated.",
        defenseStrategy: "Verify that the payroll system calculates overtime on a daily basis (after 8 hours) rather than a weekly-only basis. Audit payroll output for the period following the AB 1066 transition date applicable to the employer's size. If the system was not updated at the correct date, calculate the overtime underpayment for each affected employee and build the exposure model around the transition date."
      },
      {
        name: "Crew Leader and Foreman Exempt Classification",
        statute: "Lab. Code § 515; IWC Wage Order 14, § 1(A)",
        analysis: "Crew leaders and foremen in agricultural operations are frequently classified as exempt under the executive exemption, but the classification often fails because the individual spends more than 50% of working time performing the same field work as the crew members they supervise. A crew leader who picks alongside the crew, operates machinery alongside other workers, or performs field tasks when the crew is shorthanded is performing non-exempt production work. The executive exemption requires that exempt duties — managing the enterprise or a customarily recognized department, directing the work of two or more employees, and exercising discretion and independent judgment in hiring, firing, and disciplinary decisions — occupy more than 50% of working time. In agricultural operations where the crew leader is a working supervisor rather than a full-time manager, the exemption frequently fails.",
        defenseStrategy: "Conduct a duties analysis for all crew leaders and foremen classified as exempt. Document the actual time allocation between supervisory and field production tasks using contemporaneous observation or time studies rather than job descriptions. If the classification is defensible, build the documentation. If the 50% threshold is not met, reclassify prospectively and calculate historical overtime exposure."
      }
    ],
    authorities: ["Lab. Code § 226.2 (piece-rate compensation)", "AB 1066 (agricultural overtime phase-out)", "Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582", "Moniz v. Adecco USA (2021) 72 Cal.App.5th 56", "Martinez v. Combs (2012) 49 Cal.4th 35", "Lab. Code § 2810.3 (client employer liability)", "Cal/OSHA T8 § 3457 (field sanitation)"],
    defenseStrategies: [
      "Implement § 226.2-compliant payroll procedures for all piece-rate workers. This is the single highest-priority compliance action for any agricultural employer.",
      "Build the heat illness prevention compliance record — shade, water, rest, training — with dated documentation suitable for penalty cap qualification.",
      "Establish final pay timing procedures for seasonal workforce transitions that comply with §§ 201-202 regardless of whether the separation is characterized as discharge or resignation.",
      "For PAGA settlement positioning, apply the Moniz three-part purpose test and the Kullar investigation standard to demonstrate the adequacy of the settlement investigation — the Premium Packing motion provides the analytical template.",
      "Audit the labor contractor relationship under Martinez v. Combs and § 2810.3 — the grower's exposure depends on both the allocation of operational control and the contractor's compliance record. Document both."
    ],
    monitoring: [
      "Cal/OSHA heat illness prevention regulation updates and enforcement activity targeting agricultural operations.",
      "AB 1066 agricultural overtime phase-out implementation — employer compliance rates and enforcement actions.",
      "Development of the joint employer PAGA penalty allocation doctrine for grower/labor contractor arrangements.",
      "Evolving enforcement of field sanitation requirements at remote agricultural worksites — Cal/OSHA inspection frequency and citation patterns."
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
