export default {
  slug: "manageability-motion-framework",
  title: "Manageability Motion Framework",
  subtitle: "Scope Limitation Under § 2699(p) and Estrada",
  cardDesc: "Complete motion template with section-by-section structure, four manageability factor deep dives with hypotheticals, opposition anticipation, tiered scope limitation proposals with sample order language, bellwether trial alternative, discovery strategy, and dual-track coordination with class certification.",
  metaDescription: "Template for pre-trial PAGA manageability motions under California Labor Code § 2699(p) and Estrada v. Royalty Carpet Mills.",
  placeholder: false,
  relatedInsights: ["manageability-after-estrada-using-2699-p-to-limit-paga-scope"],
  relatedTools: ["paga-penalty-estimator"],
  relatedCases: ["estrada-v-royalty-carpet-mills-inc"],
  relatedIndustries: ["healthcare-staffing"],
  datePublished: "2026-01-15",
  dateModified: "2026-03-19",
  statutoryContext: {
    paragraphs: [
      {label: "The strategic landscape.", text: "After Estrada v. Royalty Carpet Mills, Inc. (2024) 15 Cal.5th 582, courts cannot dismiss PAGA claims on manageability grounds — but they can limit the scope of evidence and claims at trial. AB 2288 codified this authority in § 2699(p), giving trial courts explicit power to \"limit the evidence to be presented at trial or the scope\" of PAGA claims \"to ensure that the claims can be effectively tried.\""},
      {label: "Why this matters quantitatively.", text: "A manageability order that limits the trial to one location out of eight does not reduce the aggrieved employee count by one-eighth — it reduces the trial complexity by an order of magnitude. A well-constructed manageability motion can reduce the effective exposure model by 50–80% before any merits adjudication."},
    ]
  },
  sections: [
    {number: "01", label: "Statutory & Case Law Foundation",
     intro: "The manageability motion sits at the intersection of two authorities. Estrada established that due process requires a trial court to ensure that PAGA claims can be adjudicated fairly to the defendant. Section 2699(p), enacted seven months later, gave courts the statutory tool to implement that constitutional floor.",
     blocks: [
      {type: "accordion", title: "Estrada v. Royalty Carpet Mills — The Constitutional Foundation", subsections: [
        {label: "Holding", text: "Trial courts retain inherent authority to manage PAGA proceedings. A court cannot dismiss PAGA claims solely on manageability grounds — but it can narrow scope, limit evidence, and structure the trial to ensure fairness."},
        {label: "What Estrada Does Not Say", text: "Estrada does not hold that every PAGA case must proceed to trial in its entirety. It holds that manageability alone is not a basis for dismissal. The distinction between dismissal and scope limitation is the entire foundation of the manageability motion."},
        {label: "Defense Application", text: "Frame every manageability argument as a trial management request, not a dispositive motion. The court retains jurisdiction over all claims. This framing avoids the Estrada prohibition while securing the practical benefit of scope limitation."},
      ]},
      {type: "accordion", title: "Section 2699(p) — The Statutory Codification", subsections: [
        {label: "Statutory Text", text: "\"A court may limit the evidence to be presented at trial or the scope of any claim brought under this part to ensure that the claims can be effectively tried.\" — Lab. Code § 2699(p)."},
        {label: "Scope of Authority", text: "The statute authorizes two types of limitations: (1) evidence limitations — restricting the evidence for specific violation categories or employee subgroups; and (2) scope limitations — narrowing the claims themselves to subsets that can be effectively tried."},
        {label: "Unanswered Questions", text: "No published appellate decision has yet interpreted § 2699(p). The first decisions will define: (a) what standard the court applies; (b) whether the court can limit scope sua sponte; (c) whether a scope limitation order is immediately appealable."},
      ]},
      {type: "accordion", title: "Duran v. U.S. Bank — The Due Process Backstop", subsections: [
        {label: "Relevance to PAGA", text: "While Duran addressed statistical sampling in the class action context, its due process principles apply with equal force to PAGA. The defendant has a constitutional right to present individualized defenses."},
        {label: "Application", text: "When the defense argues that certain violation categories require individualized proof, Duran provides the constitutional authority. Section 2699(p) gives the court the statutory tool to avoid the constitutional problem."},
      ]},
      {type: "info-box", label: "Key distinction.", text: "A manageability motion is not a demurrer or motion to dismiss. It does not seek to eliminate PAGA claims — it seeks to narrow what gets tried. Frame it accordingly in every filing."},
    ]},
    {number: "02", label: "Manageability Factors — Building the Record",
     intro: "The motion must identify specific, concrete reasons why the PAGA claims as pled cannot be effectively tried on a representative basis. Four categories of proof individualization most commonly support scope limitation.",
     blocks: [
      {type: "factor-grid", items: [
        {label: "Factor 1", title: "Multi-Worksite Variation", body: "Different locations operate under different managers, policies, scheduling systems, and operational constraints. A single representative trial cannot capture site-specific conditions without devolving into a series of mini-trials."},
        {label: "Factor 2", title: "Job Classification Diversity", body: "PAGA notices often sweep in multiple job classifications with different duties, schedules, compensation structures, and applicable exemptions requiring separate analysis."},
        {label: "Factor 3", title: "Individualized Defenses", body: "When the employer's defense turns on employee-specific facts — voluntary meal period waivers, individual scheduling preferences, exempt classification analysis — representative adjudication cannot accommodate the necessary individualized inquiry."},
        {label: "Factor 4", title: "Temporal Variation", body: "Compliance infrastructure changes over time. Policy changes mid-period create distinct operational realities. The \"Two Hotels\" framework quantifies these temporal differences and supports period-specific scope limitation."},
      ]},
      {type: "accordion", title: "Factor 1 Deep Dive — Multi-Worksite Evidence Development", subsections: [
        {label: "What to Document", text: "For each location: (a) employee headcount, (b) on-site management structure, (c) scheduling system used, (d) specific meal/rest period policy in effect, (e) physical layout affecting break availability, (f) operational constraints (24/7 operations, client-site work, remote locations)."},
        {label: "How to Present", text: "Create a worksite comparison matrix as an exhibit. Columns: Location, Headcount, Supervisor(s), Scheduling System, Meal Policy, Rest Policy, Operational Constraints. If the matrix shows 8 locations used 3 different scheduling systems and 4 different meal policies — the argument for representative adjudication collapses."},
      ]},
      {type: "hypothetical", label: "Multi-Property Hotel Operator", text: "An employer operates 8 hotels across 3 counties. The downtown properties have union contracts with negotiated meal schedules. The resort properties use a different timekeeping system. Two properties opened during the PAGA period. A manageability motion argues: the trial should be limited to properties using the same scheduling system and meal period policy."},
      {type: "accordion", title: "Factor 2 Deep Dive — Job Classification Mapping", subsections: [
        {label: "Classification-Specific Variation", text: "Regular rate: Different compensation structures require different calculations. A representative trial using one methodology cannot establish violations for employees with different structures.\n\nExemption defenses: The exemption analysis is individualized by definition — it turns on each employee's actual duties.\n\nBreak patterns: A warehouse worker's break scheduling is governed by different operational demands than a delivery driver's or an office administrator's."},
      ]},
      {type: "hypothetical", label: "Automotive Dealership Group", text: "The PAGA notice defines \"aggrieved employees\" as \"all non-exempt employees.\" The dealership employs commissioned salespeople (Wage Order 7 exemption potentially applies), hourly service technicians (flat-rate pay), parts department (hourly), and administrative staff (potential administrative exemption). The regular rate calculation, meal period scheduling, and overtime exposure are all different for each group."},
      {type: "accordion", title: "Factor 3 Deep Dive — Individualized Defense Identification", subsections: [
        {label: "Common Individualized Defenses", text: "Voluntary meal period waivers: Under Brinker, each employee's waiver decision is individual and cannot be adjudicated representatively.\n\nDifferent managers, different practices: Representative evidence from one supervisor's team cannot establish violations on another's.\n\nExpense reimbursement variation: Individual employees incur different expenses at different levels — the reasonableness inquiry is individualized."},
      ]},
      {type: "accordion", title: "Factor 4 Deep Dive — Temporal Variation & the \"Two Hotels\" Framework", subsections: [
        {label: "The Core Concept", text: "When an employer demonstrably improved compliance during the PAGA period, the penalty analysis must account for two distinct operational realities with separate violation rates and potentially separate scope-limitation orders."},
        {label: "Interaction with Penalty Caps", text: "If the employer implemented compliance improvements before the PAGA notice (15% cap) and after the notice (30% cap), the manageability motion can argue that different penalty structures apply to different temporal slices."},
      ]},
    ]},
    {number: "03", label: "Motion Structure — Section-by-Section Template",
     intro: "The motion should walk the court from the factual record through the legal standard to the specific relief requested.",
     blocks: [
      {type: "motion-component", num: "I", title: "Introduction & Relief Requested", tag: "required", text: "State the motion seeks an order under § 2699(p). Lead with quantitative impact. Distinguish from a motion to dismiss."},
      {type: "motion-component", num: "II", title: "Factual Background — Operational Complexity", tag: "required", text: "Worksite-by-worksite breakdown, job classification matrix, policy/system timeline. Reference the plaintiff's own discovery responses acknowledging variation."},
      {type: "motion-component", num: "III", title: "Legal Standard — Estrada & § 2699(p)", tag: "required", text: "Three steps: Estrada's due process holding, § 2699(p)'s statutory codification, Duran's due process limits."},
      {type: "motion-component", num: "IV", title: "Individualized Proof Analysis — By Violation Category", tag: "critical", text: "For each violation category, demonstrate why representative proof cannot establish liability. Meal periods: Donohue rebuttable presumption requires individualized rebuttal. Rest periods: often untracked, inherently individual. Overtime: different compensation structures require different regular rate calculations. Wage statements: different payroll systems produce different formats."},
      {type: "motion-component", num: "V", title: "Opposition Anticipation & Preemptive Responses", tag: "strategic", text: "\"Estrada Prohibits This\": This motion seeks trial management, not dismissal.\n\"Sampling Can Solve the Problem\": Sampling is subject to Duran's due process constraints and does not eliminate heterogeneity.\n\"This Is a Disguised Dismissal\": The proposed order preserves jurisdiction over all claims."},
      {type: "motion-component", num: "VI", title: "Proposed Scope Limitation & Order Language", tag: "strategic", text: "Present three tiers: Tier 1 (Ideal) — plaintiff's location/classification only. Tier 2 (Moderate) — same scheduling system or compensation structure. Tier 3 (Minimal) — exclude only operational outliers. Always draft the proposed order language."},
      {type: "sample-block", label: "Sample Order Language — Scope Limitation", text: "Pursuant to Labor Code § 2699(p) and consistent with Estrada v. Royalty Carpet Mills, Inc. (2024) 15 Cal.5th 582, the Court hereby orders:\n\n1. Meal and rest period claims limited to employees at [Location(s)] during the PAGA period.\n2. Overtime claims tried separately for [Classification A] (hourly) and [Classification B] (commission-based).\n3. Wage statement claims limited to the period [Date] through [Date] when [Payroll System] was in use.\n4. This order does not dismiss any claim. Parties may seek modification upon good cause."},
      {type: "accordion", title: "Fallback: Bellwether Trial Proposal", subsections: [
        {label: "When to Deploy", text: "If the court is reluctant to limit scope outright, propose a bellwether structure — try claims for one representative location first."},
        {label: "Structure", text: "Phase 1: try plaintiff's own location/classification. Phase 2: court assesses whether results can be applied to other locations or whether separate proceedings are needed."},
        {label: "Strategic Advantage", text: "Signals the defense is not trying to prevent trial — it is trying to structure one. Forces plaintiff into a concession either way: if locations are the same, Phase 1 results apply broadly; if different, that supports scope limitation."},
      ]},
      {type: "motion-component", num: "VII", title: "Supporting Declarations & Evidence", tag: "required", text: "Operations Declaration: locations, employees, classifications, reporting structures, scheduling systems, policy history, operational differences.\nPayroll/Compliance Declaration: timekeeping systems, payroll platforms, statement formats.\nExpert Declaration (if applicable): why representative sampling would fail under Duran.\nPlaintiff's Own Evidence: cite any acknowledgment of site-specific variation."},
    ]},
    {number: "04", label: "Motion Strength Assessment",
     intro: "The viability depends on operational heterogeneity. Not every case warrants this motion.",
     blocks: [
      {type: "scenario-panel", items: [
        {level: "strong", title: "Multi-Location, Multi-Classification", body: "5+ locations, distinct managers and scheduling systems, 3+ job classifications. The ideal manageability motion."},
        {level: "moderate", title: "Single Location, Multiple Classifications", body: "One location but multiple classifications with different compensation structures. Strongest when exemption defenses apply to some classifications."},
        {level: "weak", title: "Single Location, Single Classification", body: "Must rely on temporal variation, individualized defenses, or violation-specific characteristics. Consider whether resources are better deployed elsewhere."},
      ]},
    ]},
    {number: "05", label: "Discovery Strategy for Building the Manageability Record",
     intro: "The motion is only as strong as the factual record supporting it.",
     blocks: [
      {type: "accordion", title: "Written Discovery Targets", subsections: [
        {label: "Interrogatories to Plaintiff", text: "Request identification of: every location worked, every supervisor managing breaks, scheduling systems used, whether they ever voluntarily waived meal periods, awareness of different practices at other locations."},
        {label: "Document Requests", text: "Request: all meal/rest policies by location, scheduling system documentation, organizational charts, training materials by location, communications about compliance changes."},
      ]},
      {type: "accordion", title: "Deposition Targets", subsections: [
        {label: "Named Plaintiff", text: "Establish geographic and temporal scope of personal experience. How many locations? Which supervisors? Voluntary meal period shortening? Awareness of different practices elsewhere?"},
        {label: "PMQ Deposition", text: "Topics: scheduling system differences, policy differences, supervisor training differences, changes during the PAGA period."},
        {label: "Plaintiff's Expert", text: "Whether site-specific variation was considered in sampling, whether sample was stratified, what assumptions about operational uniformity were made."},
      ]},
      {type: "warning-box", label: "Timing.", text: "File after close of fact discovery but before trial. The ideal window is post-MSJ, pre-trial."},
      {type: "info-box", label: "Expert deposition preparation.", text: "Use the Expert Deposition Framework resource — a six-domain deposition outline targeting population definition, sample selection, violation definition, paid premiums, confidence intervals, and affirmative defense accommodation.", crossRef: {resource: "Expert Deposition Framework"}},
    ]},
    {number: "06", label: "Coordination with Other Defense Motions",
     intro: "The manageability motion coordinates with several other pre-trial motions and defense strategies.",
     blocks: [
      {type: "accordion", title: "Standing Challenge Under § 2699(c)(1)", text: "Standing challenges eliminate violation categories the plaintiff did not experience. Manageability narrows the remaining categories. File both."},
      {type: "accordion", title: "Arbitration Motion Under Adolph", text: "The Adolph framework sends individual claims to arbitration while representative claims stay in court. The manageability motion applies to the remaining representative claims."},
      {type: "accordion", title: "Penalty Cap Evidence", text: "The factual record — compliance infrastructure documentation, policy revisions, training records — serves both the manageability motion and the penalty cap arguments."},
      {type: "accordion", title: "Dual-Track Coordination — PAGA Manageability & Class Certification", text: "The manageability arguments overlap with class certification predominance analysis. Build one factual record. A certification denial on predominance grounds is persuasive evidence that PAGA claims are also unmanageable."},
      {type: "info-box", label: "Cross-references.", text: "See the publication Manageability After Estrada: Using § 2699(p) to Limit PAGA Scope. The temporal variation analysis uses the \"Two Hotels\" Framework. The Penalty Estimator models the quantitative impact of scope limitation.", crossRef: {publications: ["Manageability After Estrada", "Two Hotels Framework"], tools: ["Penalty Estimator"]}},
    ]},
  ],
  authorities: [
    {cite: "Lab. Code § 2699(p)", note: "Court may limit evidence and scope of PAGA claims"},
    {cite: "Lab. Code § 2699(c)(1)", note: "Personal experience standing requirement"},
    {cite: "Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582", note: "Due process requires manageable PAGA proceedings"},
    {cite: "Duran v. U.S. Bank (2014) 59 Cal.4th 1", note: "Due process limits on statistical sampling"},
    {cite: "Adolph v. Uber Technologies (2023) 14 Cal.5th 1104", note: "Standing framework post-arbitration"},
    {cite: "Brinker Restaurant Corp. v. Superior Court (2012) 53 Cal.4th 1004", note: "\"Provide\" standard — rebuttal evidence is individualized"},
    {cite: "Donohue v. AMN Services (2021) 11 Cal.5th 58", note: "Rebuttable presumption requires individual inquiry"},
    {cite: "AB 2288 (2024)", note: "Codified § 2699(p) manageability authority"},
  ],
  footer: "For illustrative and educational purposes only. This framework does not constitute legal advice. No published appellate decision has yet interpreted § 2699(p).",
};
