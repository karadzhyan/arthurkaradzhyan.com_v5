export default {
  slug: "arbitration-agreement-checklist",
  title: "Arbitration Agreement Checklist",
  subtitle: "Post-Adolph, Post-Hohenshelt",
  cardDesc: "14-point review protocol. PAGA splitting provision analysis, poison pill identification, Iskanian waiver check, fee payment compliance, and Hohenshelt-responsive language.",
  metaDescription: "14-point arbitration agreement review for PAGA defense. Post-Adolph splitting, Iskanian waiver analysis, Hohenshelt fee payment compliance, and drafting recommendations.",
  placeholder: false,

  statutoryContext: {
    paragraphs: [
      {label: "The post-Adolph landscape.", text: "Adolph v. Uber Technologies (2023) 14 Cal.5th 1104 established the framework: individual PAGA claims can be compelled to arbitration under a valid agreement, while representative PAGA claims remain in court. The arbitration agreement is now the threshold strategic question in every PAGA case — a valid agreement splits the case; an invalid agreement keeps everything in court."},
      {label: "Hohenshelt changed the fee analysis.", text: "Hohenshelt v. Superior Court (2025) 18 Cal.5th 310 replaced strict-liability forfeiture for late arbitration fee payments with an equitable standard. Late payment no longer automatically forfeits arbitration rights — only willful, grossly negligent, or fraudulent nonpayment triggers forfeiture. This changes both the drafting and the enforcement calculus."},
    ]
  },

  sections: [
    {
      number: "01",
      label: "14-Point Agreement Review",
      intro: "Review every arbitration agreement against these 14 points before relying on it in PAGA litigation.",
      blocks: [
        {
          type: "checklist",
          id: "14-point-review",
          items: [
            {label: "1. Mutual agreement to arbitrate.", text: "Both parties must be bound. Agreements where only the employee is bound to arbitrate are unconscionable under Armendariz v. Foundation Health Psychcare Services (2000) 24 Cal.4th 83."},
            {label: "2. Consideration.", text: "Continued employment is sufficient consideration for existing employees. For new employees, the employment offer is consideration. Stand-alone agreements without new consideration may be unenforceable."},
            {label: "3. Scope covers PAGA claims.", text: "The agreement must cover statutory wage-and-hour claims, including PAGA. Agreements limited to 'disputes arising out of the employment relationship' typically cover PAGA. Narrow agreements covering only 'contractual disputes' may not."},
            {label: "4. No PAGA waiver (Iskanian).", text: "Under Iskanian v. CLS Transportation (2014) 59 Cal.4th 348, a pre-dispute waiver of the right to bring representative PAGA claims is unenforceable as against public policy. The agreement may require individual PAGA claims to be arbitrated (per Adolph) but cannot waive representative claims entirely."},
            {label: "5. PAGA splitting provision.", text: "Post-Adolph, the ideal agreement includes a provision that individual PAGA claims are subject to arbitration while representative PAGA claims remain in court. This codifies the Adolph framework and avoids interpretive disputes."},
            {label: "6. No poison pill clause.", text: "A 'poison pill' is a provision stating that if any part of the agreement is found unenforceable, the entire agreement is void. If the PAGA waiver is unenforceable (Iskanian), a poison pill voids the entire agreement — including the individual arbitration provision. Remove all poison pills."},
            {label: "7. Severability clause.", text: "The agreement must include a severability clause providing that if any provision is found unenforceable, it is severed and the remainder of the agreement remains in effect. This saves the individual arbitration obligation if the representative PAGA waiver fails."},
            {label: "8. Employer pays arbitrator fees.", text: "Under Armendariz, the employer must pay all arbitration-specific costs — arbitrator fees, hearing room fees, and administrative fees. The employee pays only costs they would bear in court (filing fees). Non-payment triggers forfeiture under CCP § 1281.98 (subject to Hohenshelt)."},
            {label: "9. Adequate discovery provisions.", text: "The agreement must provide for sufficient discovery to vindicate statutory claims. Complete preclusion of discovery is unconscionable. At minimum: document requests, interrogatories, and depositions."},
            {label: "10. Written decision with findings.", text: "The arbitrator must issue a written decision with sufficient findings to permit judicial review. Agreements precluding written decisions are unconscionable."},
            {label: "11. Full statutory remedies available.", text: "The agreement cannot limit statutory remedies — including PAGA penalties, attorney fees, and injunctive relief. Provisions capping damages or excluding penalty claims are unenforceable."},
            {label: "12. Opt-out provision (recommended).", text: "A 30-day opt-out window strengthens enforceability by demonstrating voluntariness. Not legally required but significantly reduces unconscionability arguments."},
            {label: "13. Clear and conspicuous presentation.", text: "The agreement must be clearly written, readable, and presented in a manner that ensures the employee understands they are waiving the right to a jury trial. Buried clauses in dense handbooks are vulnerable to procedural unconscionability challenges."},
            {label: "14. Proper execution.", text: "Signed and dated by both parties. Electronic signatures are valid under ESIGN and UETA. Retain the executed copy. If the agreement is embedded in an employee handbook, the acknowledgment page must specifically reference the arbitration provision."},
          ]
        },
      ]
    },

    {
      number: "02",
      label: "PAGA-Specific Provisions",
      intro: "After Adolph, the PAGA provisions in an arbitration agreement require careful drafting to achieve the intended splitting effect.",
      blocks: [
        {
          type: "sample-block",
          label: "Recommended PAGA Splitting Language",
          text: "PAGA Claims. If Employee asserts claims under the California Private Attorneys General Act (Labor Code § 2698 et seq.), the following shall apply: (a) any individual PAGA claims — meaning claims seeking penalties for Labor Code violations personally suffered by Employee — shall be resolved through binding arbitration pursuant to this Agreement; (b) any representative PAGA claims — meaning claims seeking penalties on behalf of other current or former employees — shall not be subject to arbitration and may be pursued in a court of competent jurisdiction; and (c) the arbitration of individual PAGA claims shall proceed first, and the court action on representative claims shall be stayed pending the outcome of arbitration."
        },
        {
          type: "warning-box",
          label: "Avoid PAGA waivers.",
          text: "Do not include language stating that the employee 'waives the right to bring representative PAGA claims.' This is unenforceable under Iskanian and, if coupled with a poison pill, could void the entire arbitration agreement. The correct approach is splitting — not waiving."
        },
      ]
    },

    {
      number: "03",
      label: "Poison Pill Analysis",
      intro: "Poison pills are the most dangerous drafting error in PAGA-context arbitration agreements.",
      blocks: [
        {
          type: "accordion",
          title: "What Is a Poison Pill?",
          text: "A provision stating that if any part of the arbitration agreement is found unenforceable or void, the entire agreement is unenforceable. In the PAGA context, this means: if the representative PAGA waiver is struck (Iskanian), the poison pill voids the entire agreement — including the individual PAGA arbitration provision. The employer loses both the waiver and the arbitration."
        },
        {
          type: "sample-block",
          label: "Poison Pill Language to Remove",
          text: "If any provision of this arbitration agreement is found to be unenforceable or void, then the entire arbitration agreement shall be null and void and of no effect."
        },
        {
          type: "sample-block",
          label: "Replace With: Severability Clause",
          text: "If any provision of this Agreement is found to be unenforceable or void, such provision shall be severed from this Agreement and shall not affect the enforceability of the remaining provisions. The parties intend that the remaining provisions of this Agreement shall continue in full force and effect."
        },
      ]
    },

    {
      number: "04",
      label: "Fee Payment Compliance (Post-Hohenshelt)",
      intro: "Under CCP § 1281.98, the employer must pay arbitration fees within 30 days of the due date. Hohenshelt changed the consequence of late payment from automatic forfeiture to an equitable analysis.",
      blocks: [
        {
          type: "checklist",
          id: "fee-compliance",
          items: [
            {label: "Calendar all fee deadlines.", text: "When the arbitration administrator sends an invoice, calendar the 30-day payment deadline immediately. Add reminders at Day 7, Day 14, Day 21, and Day 25."},
            {label: "Designate a payment responsible person.", text: "Assign a specific individual to process arbitration fee payments — do not rely on general accounts payable workflows. The responsible person should have authority to expedite payment."},
            {label: "Document payment processing.", text: "Retain proof of every payment: check copies, wire transfer confirmations, payment portal receipts. Under Hohenshelt, the employer must demonstrate that late payment (if it occurs) was not willful, grossly negligent, or fraudulent."},
            {label: "If late: document the reason immediately.", text: "If a payment is late for any reason, document the cause contemporaneously — holiday processing delay, system error, staff absence. Hohenshelt requires evidence that the delay was inadvertent, not strategic."},
            {label: "Maintain a track record of timely payments.", text: "If the employer has paid all prior arbitration fees on time, this record supports the argument that any single late payment was inadvertent. Preserve payment records across all arbitration matters."},
          ]
        },
        {
          type: "info-box",
          label: "Hohenshelt is not a license for late payment.",
          text: "Hohenshelt applies an equitable standard — not a blanket excuse. Repeated late payments, strategic delays timed to litigation milestones, or payments made only after the opposing party moves to vacate will likely be found willful or grossly negligent. The safest approach remains timely payment in every instance."
        },
      ]
    },

    {
      number: "05",
      label: "Hohenshelt Standing Analysis",
      intro: "After Adolph splits the case, the individual PAGA claims go to arbitration. If the individual claims are resolved in the employer's favor, the plaintiff may lose standing to pursue the representative claims in court.",
      blocks: [
        {
          type: "accordion",
          title: "The Standing Question After Arbitration",
          subsections: [
            {label: "Adolph's reservation", text: "Adolph explicitly reserved the question of whether a plaintiff who loses individual PAGA claims in arbitration retains standing to pursue representative claims. The Court noted the question but did not decide it."},
            {label: "Defense argument", text: "If the arbitrator finds no individual violations, the plaintiff is not an 'aggrieved employee' under § 2699(a) — and only an aggrieved employee can bring representative PAGA claims. The representative claims should be dismissed for lack of standing."},
            {label: "Plaintiff's counterargument", text: "The plaintiff may argue that the arbitration resolved only the individual claims, not the plaintiff's status as an aggrieved employee. Alternatively, the plaintiff may argue that new violations occurred after the arbitration, restoring standing."},
            {label: "Interaction with § 2699(c)(1)", text: "The reformed standing requirement — 'personally suffered each violation' — strengthens the defense argument. If the arbitrator finds the plaintiff did not personally suffer the violations, § 2699(c)(1) independently bars the representative claims."},
          ]
        },
        {
          type: "warning-box",
          label: "Leeper may change this analysis.",
          text: "If the Supreme Court holds in Leeper that headless PAGA claims (without an individual claim) are not permitted, the standing argument after arbitration becomes much stronger. A plaintiff who lost individual claims in arbitration has, in effect, a headless representative claim."
        },
      ]
    },
  ],

  authorities: [
    {cite: "Adolph v. Uber Technologies (2023) 14 Cal.5th 1104", note: "Individual PAGA claims to arbitration; representative claims stay in court"},
    {cite: "Hohenshelt v. Superior Court (2025) 18 Cal.5th 310", note: "Late fee payment — equitable standard replaces strict liability"},
    {cite: "Iskanian v. CLS Transportation (2014) 59 Cal.4th 348", note: "Pre-dispute PAGA representative claim waivers unenforceable"},
    {cite: "Viking River Cruises v. Moriana (2022) 596 U.S. 639", note: "FAA preempts state rule barring individual PAGA claim arbitration"},
    {cite: "Armendariz v. Foundation Health (2000) 24 Cal.4th 83", note: "Minimum requirements for enforceable employment arbitration agreements"},
    {cite: "CCP § 1281.98", note: "Arbitration fee payment requirements and forfeiture"},
    {cite: "Lab. Code § 2699(c)(1)", note: "Standing — personal experience requirement (2024 reforms)"},
  ],

  footer: "For illustrative and educational purposes only. Arbitration agreement analysis requires case-specific review of the agreement, the plaintiff's claims, and the procedural posture.",
};
