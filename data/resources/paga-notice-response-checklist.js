export default {
  slug: "paga-notice-response-checklist",
  title: "PAGA Notice Response Checklist",
  subtitle: "The First 72 Hours",
  cardDesc: "Five-phase action plan from Day 1 through post-65-day litigation preparation. Matter information sheet, remediation plan structure, carrier notification guide, and key authorities appendix.",
  metaDescription: "Step-by-step response checklist for California employers upon receiving a PAGA notice. Triage, carrier notification, cure and reform assessment, discovery preparation, and litigation strategy.",
  placeholder: false,

  statutoryContext: {
    paragraphs: [
      {label: "The clock starts now.", text: "The moment a PAGA notice arrives, multiple jurisdictional deadlines begin running simultaneously. The cure proposal window (33 days for employers under 100) is the most aggressive, but the 60-day remediation window for the 30% penalty cap under § 2699(h)(1) is equally critical. Both are measured from receipt — not from the date counsel is engaged, not from the date the carrier acknowledges coverage. Every day of delay compresses the timeline for every downstream strategic decision."},
      {label: "Why a checklist matters.", text: "The most common failure in PAGA defense is not a bad legal argument — it is a missed deadline or an incomplete record. The cure deadline passes because counsel was not engaged quickly enough. The 30% cap documentation is incomplete because no one preserved the pre-notice compliance record. The carrier is notified late, compressing authority timelines. This checklist prevents those failures by sequencing every action in the order it must be performed."},
    ]
  },

  sections: [
    {
      number: "01",
      label: "Immediate Response — Day 0",
      intro: "Day 0 is the date the employer actually receives the PAGA notice — not the mailing date, not the date of service on prior counsel. Document the receipt date with a timestamp. Everything flows from this date.",
      blocks: [
        {
          type: "timeline",
          items: [
            {
              dot: "critical",
              day: "Hour 0",
              title: "Document Receipt & Identify Deadlines",
              body: "Confirm receipt date. Under CCP § 1013(a), mailed notices are presumed received five calendar days after mailing. If the employer can document actual receipt on a different date, use that date.",
              actions: [
                "Photograph or scan the envelope and notice. Record the receipt date, time, and method of delivery.",
                "Calendar the Day 33 cure proposal deadline (if employer has fewer than 100 employees).",
                "Calendar the Day 60 remediation deadline for the 30% penalty cap under § 2699(h)(1).",
                "Calendar the Day 65 LWDA response window — after which the plaintiff may file suit.",
                "Identify whether the PAGA notice was filed on or after June 19, 2024. If so, the 2024 reform provisions (AB 2288 / SB 92) apply.",
              ]
            },
            {
              dot: "active",
              day: "Hours 1–4",
              title: "Issue Litigation Hold",
              body: "A litigation hold must be issued before any routine document destruction occurs. The hold covers all records relating to the violation categories alleged in the notice.",
              actions: [
                "Issue a written litigation hold to all custodians of relevant records: HR, payroll, operations, IT, and any third-party payroll processors.",
                "Preserve time records, payroll data, scheduling records, policies, handbooks, training materials, employee complaints, and all communications relating to the alleged violation categories.",
                "Suspend any automatic data deletion or overwrite schedules for the preservation period.",
                "Identify and preserve the specific payroll system configuration — regular rate formulas, premium calculation rules, wage statement templates.",
              ]
            },
            {
              dot: "active",
              day: "Hours 4–8",
              title: "Assemble Matter Information Sheet",
              body: "Before contacting counsel or the carrier, compile the basic facts that every downstream decision requires.",
              actions: [
                "Employer legal entity name, EIN, address, industry classification, applicable wage order(s).",
                "Current employee headcount. Historical headcount for the PAGA period — critical for cure eligibility (fewer than 100).",
                "Named plaintiff: name, job title, dates of employment, location(s), compensation structure.",
                "Violation categories alleged in the notice — map each to the underlying Labor Code section.",
                "Existing arbitration agreements — determine whether any cover PAGA claims and whether the named plaintiff signed one.",
                "Insurance coverage: EPLI carrier, policy number, coverage counsel contact, reporting requirements.",
              ]
            },
          ]
        },
        {
          type: "danger-box",
          label: "Do not contact the plaintiff or plaintiff's counsel directly.",
          text: "All communications should go through defense counsel. Direct contact with a represented party violates Rule of Professional Conduct 4.2 and can create waiver or admission issues."
        },
      ]
    },

    {
      number: "02",
      label: "Internal Assessment — Days 1–3",
      intro: "Before engaging counsel or the carrier, the employer should conduct a preliminary internal assessment of the allegations. This is not a legal analysis — it is a factual inventory that will inform every subsequent decision.",
      blocks: [
        {
          type: "checklist",
          id: "internal-assessment",
          items: [
            {label: "Violation category inventory.", text: "List every violation alleged in the PAGA notice. Map each to the specific Labor Code section. Distinguish between violations that are independently PAGA-actionable and those that are derivative (e.g., wage statement violations arising from underlying premium failures)."},
            {label: "Preliminary violation assessment.", text: "For each violation category, make a preliminary assessment: is this a genuine compliance gap, a system error, or a meritless allegation? This is a factual question, not a legal one — does the employer's current practice actually comply with the statute?"},
            {label: "Affected employee identification.", text: "Identify the universe of potentially aggrieved employees. Which job classifications? Which locations? Which time periods? The PAGA period is one year before the LWDA notice filing date through the present."},
            {label: "Prior complaints or investigations.", text: "Has the employer received prior PAGA notices, DLSE complaints, or LWDA investigations involving the same violation categories? Prior findings are relevant to cure eligibility and penalty enhancement."},
            {label: "Existing compliance infrastructure.", text: "Document what compliance measures were in place before the notice: written policies, training records, payroll audit results, complaint mechanisms. This is the foundation for the 15% penalty cap under § 2699(g)(1)."},
            {label: "Recent compliance changes.", text: "Identify any compliance improvements implemented in the 12 months preceding the notice. These demonstrate good faith and support both the cure proposal and penalty cap arguments."},
          ]
        },
        {
          type: "info-box",
          label: "Document everything now.",
          text: "The pre-notice compliance record cannot be created retroactively. If the employer had policies, training, or audit procedures in place before the notice, document them now with dates, attendees, and supporting evidence. This evidence is the foundation for the 15% penalty cap — and it must demonstrably predate the notice."
        },
      ]
    },

    {
      number: "03",
      label: "Carrier Notification — Days 1–3",
      intro: "Most California employment defense is carrier-assigned. Early carrier notification is essential — not just for coverage purposes, but because carrier authority timelines constrain every downstream decision.",
      blocks: [
        {
          type: "checklist",
          id: "carrier-notification",
          items: [
            {label: "Identify reporting obligations.", text: "Review the EPLI policy for notice provisions. Most policies require reporting within a specified period (often 30 days) of the employer becoming aware of the claim. Late reporting can jeopardize coverage."},
            {label: "Prepare the initial report.", text: "Include: the PAGA notice (full copy), matter information sheet, preliminary violation assessment, estimated aggrieved employee count, and any known prior related claims."},
            {label: "Flag jurisdictional deadlines.", text: "Explicitly notify the carrier of the 33-day cure deadline (if applicable) and the 60-day remediation window. Request expedited assignment of coverage counsel to preserve these deadlines."},
            {label: "Request authority timeline.", text: "Advise the carrier that settlement authority may be needed within 60–90 days for cure or early resolution. Build carrier review time into every downstream timeline."},
            {label: "Identify coverage questions.", text: "PAGA penalties may or may not be covered depending on policy language. The distinction between 'damages' and 'penalties' matters. Flag this for early coverage counsel review."},
          ]
        },
        {
          type: "warning-box",
          label: "Carrier delay is the most common cause of missed cure deadlines.",
          text: "If the employer qualifies for the cure mechanism (fewer than 100 employees), the 33-day deadline cannot be extended for carrier review. If carrier assignment is likely to take more than 7 business days, engage interim counsel to begin cure preparation immediately. The cure proposal can be filed before carrier review is complete."
        },
      ]
    },

    {
      number: "04",
      label: "Reform Mechanism Assessment — Days 3–7",
      intro: "The 2024 reforms created four defense mechanisms that must be evaluated within the first week. Each has its own eligibility requirements, deadlines, and strategic implications.",
      blocks: [
        {
          type: "scenario-panel",
          items: [
            {level: "strong", title: "Cure Proposal (§ 2699.3(b)(1)(A))", body: "Available if: employer had fewer than 100 employees during the violation period, notice filed after June 19, 2024, and no prior cure for the same violations. Deadline: Day 33. Strategic value: can eliminate PAGA action on cured categories entirely."},
            {level: "strong", title: "30% Penalty Cap (§ 2699(h)(1))", body: "Available if: employer takes 'all reasonable steps' to comply within 60 days of the notice. No headcount limitation. Strategic value: reduces maximum penalties to 30% of statutory amount. Available even if cure is rejected."},
            {level: "moderate", title: "15% Penalty Cap (§ 2699(g)(1))", body: "Available if: employer took 'all reasonable steps' to comply before receiving the notice. Requires pre-existing compliance infrastructure. Strategic value: most aggressive cap — 15% of statutory penalties. Cannot be manufactured after notice receipt."},
          ]
        },
        {
          type: "scenario-panel",
          items: [
            {level: "moderate", title: "Early Evaluation Conference (§ 2699.3(f))", body: "Available to all employers. Confidential forum to discuss claims with neutral evaluator. Strategic value: early intelligence, cure identification, compliance demonstration. No deadline for requesting."},
            {level: "moderate", title: "Standing Challenge (§ 2699(c)(1))", body: "Challenge any violation category the plaintiff did not personally experience. Can be raised at the pleading stage. Strategic value: narrows case scope before discovery."},
            {level: "strong", title: "Anti-Stacking (§ 2699(i))", body: "Automatic for all post-reform notices. Limits penalties to one per employee per pay period per violation. Strategic value: eliminates derivative penalty cascade. No action required — applies by operation of law."},
          ]
        },
        {
          type: "info-box",
          label: "These mechanisms are cumulative.",
          text: "The cure, caps, standing challenges, and anti-stacking provisions work together. An employer under 100 employees can pursue the cure for curable violations, document remediation for the 30% cap on non-cured violations, invoke pre-notice compliance for the 15% cap on categories where infrastructure existed, challenge standing on categories the plaintiff did not personally experience, and benefit from anti-stacking on all remaining categories. Use every available mechanism."
        },
      ]
    },

    {
      number: "05",
      label: "Strategic Planning — Days 7–30",
      intro: "With the immediate triage complete, the focus shifts to building the factual record and defense strategy that will drive the remainder of the matter.",
      blocks: [
        {
          type: "checklist",
          id: "strategic-planning",
          items: [
            {label: "Build the exposure model.", text: "Construct a three-scenario exposure model: plaintiff maximum, data-driven realistic, and defense best case. Pull time records and payroll data. Calculate actual violation rates by category. Apply reform provisions (caps, anti-stacking, standing limitations). Present to carrier for authority."},
            {label: "Begin remediation immediately.", text: "Do not wait for the cure to be accepted, the carrier to approve, or litigation to be filed. Begin implementing compliance corrections now. Every remediation action supports both the cure proposal (if applicable) and the 30% penalty cap. Document every action with dates and evidence."},
            {label: "Prepare discovery responses.", text: "Draft preliminary discovery responses in anticipation of the complaint. Identify document custodians, begin organizing responsive documents, and prepare privilege logs for attorney-client communications."},
            {label: "Evaluate arbitration.", text: "If the named plaintiff signed an arbitration agreement, evaluate whether to move to compel arbitration of individual PAGA claims under Adolph v. Uber Technologies (2023) 14 Cal.5th 1104. Consider Hohenshelt if prior fee payment issues exist."},
            {label: "Assess manageability.", text: "For multi-location or multi-classification employers, begin building the record for a § 2699(p) manageability motion. Document worksite variation, scheduling system differences, and job classification diversity."},
            {label: "Identify affirmative defenses.", text: "Good faith compliance, statute of limitations, safe harbor provisions, exemption defenses, voluntary meal period waivers (Brinker), and any applicable complete defenses."},
          ]
        },
        {
          type: "accordion",
          title: "Remediation Priority Sequencing",
          subsections: [
            {label: "Week 1–2: Monetary remediation", text: "Calculate and begin paying any identified underpayments — meal/rest premiums at the correct regular rate (Ferra), overtime differentials (Alvarado), expense reimbursements. This is the highest-value remediation action for both the cure and the 30% cap."},
            {label: "Week 2–3: Policy corrections", text: "Revise all policies implicated by the notice. Distribute corrected policies to all employees with signed acknowledgments. The revised policies should incorporate current legal standards — Brinker 'provide' language for meal periods, Ferra regular rate for premiums."},
            {label: "Week 3–4: Training", text: "Conduct supervisor training on each compliance area implicated by the notice. Document attendance, content, and completion. Training should cover the specific compliance failures alleged in the notice, not generic wage-and-hour topics."},
            {label: "Week 4+: System changes", text: "Implement payroll system reconfigurations — regular rate formulas, premium calculations, wage statement formatting. Document the changes with vendor confirmations and test-period results."},
          ]
        },
      ]
    },

    {
      number: "06",
      label: "Post-65-Day Litigation Preparation",
      intro: "After the 65-day LWDA waiting period expires, the plaintiff may file a civil complaint. Defense counsel should be fully prepared before the complaint arrives.",
      blocks: [
        {
          type: "checklist",
          id: "litigation-prep",
          items: [
            {label: "Anticipate the complaint.", text: "Review the PAGA notice to identify every claim that will likely be alleged. Draft preliminary responses and affirmative defenses. Identify the venue (superior court in the county where the violations allegedly occurred)."},
            {label: "Preserve the compliance record.", text: "Compile all remediation documentation: payment records, revised policies, training materials, system change confirmations, post-remediation audit results. This is the penalty cap evidence package."},
            {label: "Finalize the exposure model.", text: "Update the three-scenario exposure model with any new data obtained during the 65-day period. Present the updated model to the carrier with a defense strategy recommendation and settlement authority request."},
            {label: "Prepare the motion calendar.", text: "Identify early motions: demurrer (standing challenge under § 2699(c)(1)), motion to compel arbitration (if applicable), motion to strike (if demand includes non-PAGA claims), and any responsive pleading deadlines."},
            {label: "Discovery readiness.", text: "Organize documents by category. Identify responsive custodians. Prepare a privilege log template. Draft form interrogatory responses. Have the document production substantially ready before the complaint is filed."},
            {label: "Early resolution assessment.", text: "Based on the exposure model, remediation record, and reform mechanism analysis, assess whether early resolution (pre-litigation settlement) is viable. If so, consider initiating mediation before the complaint is filed."},
          ]
        },
        {
          type: "info-box",
          label: "The 65-day period is an opportunity, not a waiting period.",
          text: "Employers who use the 65-day LWDA window to implement remediation, build the compliance record, and prepare the defense are in dramatically stronger positions than employers who wait for the complaint. Every action taken during this period simultaneously supports the cure proposal, the penalty cap documentation, the exposure model, and the litigation defense."
        },
      ]
    },
  ],

  authorities: [
    {cite: "Lab. Code § 2699.3(a)(1)", note: "65-day LWDA waiting period before filing civil action"},
    {cite: "Lab. Code § 2699.3(b)(1)(A)", note: "33-day cure proposal window for employers under 100 employees"},
    {cite: "Lab. Code § 2699(g)(1)", note: "15% penalty cap for pre-notice compliance"},
    {cite: "Lab. Code § 2699(h)(1)", note: "30% penalty cap for post-notice remediation within 60 days"},
    {cite: "Lab. Code § 2699(i)", note: "Anti-stacking — one penalty per employee per pay period per violation"},
    {cite: "Lab. Code § 2699(c)(1)", note: "Personal experience standing requirement"},
    {cite: "Lab. Code § 2699(p)", note: "Court may limit evidence and scope of PAGA claims"},
    {cite: "Lab. Code § 2699.3(f)", note: "Early evaluation conference"},
    {cite: "Adolph v. Uber Technologies (2023) 14 Cal.5th 1104", note: "Individual PAGA claims subject to arbitration; representative claims stay in court"},
    {cite: "Hohenshelt v. Superior Court (2025) 18 Cal.5th 310", note: "Late arbitration fee payment — equitable standard replaces strict liability"},
    {cite: "AB 2288 / SB 92 (2024)", note: "Comprehensive PAGA reform effective June 19, 2024"},
  ],

  footer: "For illustrative and educational purposes only. This checklist does not constitute legal advice. PAGA notices trigger jurisdictional deadlines that cannot be extended — consult counsel immediately upon receiving a notice.",
};
