export default {
  slug: "expert-deposition-framework",
  title: "Expert Deposition Framework",
  subtitle: "Statistical Sampling Challenges",
  cardDesc: "Six-domain deposition outline targeting plaintiff's sampling expert: population definition, sample selection, violation definition, paid premiums, confidence intervals, and affirmative defense accommodation.",
  metaDescription: "Six-domain deposition framework for challenging plaintiff's statistical sampling expert in PAGA and wage-and-hour litigation. Population, sampling, violation definition, and Duran compliance.",
  placeholder: false,

  statutoryContext: {
    paragraphs: [
      {label: "Why depose the sampling expert.", text: "In multi-plaintiff PAGA cases, plaintiff's counsel often retains a statistical expert to extrapolate violation rates from a sample to the full aggrieved employee population. The expert's methodology determines the exposure number. If the sample is flawed, the extrapolation is unreliable — and the exposure model collapses. The expert deposition is the defense's primary opportunity to expose methodological weaknesses before trial."},
      {label: "The Duran framework.", text: "Duran v. U.S. Bank National Assn. (2014) 59 Cal.4th 1 established that statistical sampling in employment litigation must satisfy due process requirements: the sample must be representative, the methodology must be sound, and the defendant must have the opportunity to present individualized defenses. The expert deposition tests each of these requirements."},
    ]
  },

  sections: [
    {
      number: "01",
      label: "Domain 1 — Population Definition",
      intro: "The first question in any sampling analysis is: who is in the population? If the population is incorrectly defined, every subsequent calculation is unreliable.",
      blocks: [
        {
          type: "accordion",
          title: "Key Questions — Population Definition",
          subsections: [
            {label: "Q1", text: "How did you define the population of aggrieved employees? What criteria did you use to include or exclude individuals?"},
            {label: "Q2", text: "Did you include employees who were exempt during any part of the PAGA period? How did you determine exempt status?"},
            {label: "Q3", text: "Did you include employees at all locations, or only specific locations? If specific locations, how did you determine which to include?"},
            {label: "Q4", text: "Did you include employees who signed meal period waivers? How did you account for voluntary waivers?"},
            {label: "Q5", text: "Did you include employees who were terminated before or hired after specific dates within the PAGA period? How did you account for partial-period employees?"},
          ]
        },
        {
          type: "hypothetical",
          label: "Multi-Location Employer",
          text: "The employer operates 8 locations across 3 counties. The expert includes all employees at all locations in the population — but 3 locations use a different timekeeping system with automatic meal break scheduling. The violation rate at these locations is likely near zero. Including them in the population dilutes the violation rate for the high-violation locations while providing no meaningful data about the low-violation ones. Challenge: the population should be stratified by location or scheduling system."
        },
      ]
    },

    {
      number: "02",
      label: "Domain 2 — Sample Selection",
      intro: "The sampling methodology determines whether the results can be extrapolated to the full population. Under Duran, the sample must be representative.",
      blocks: [
        {
          type: "accordion",
          title: "Key Questions — Sample Selection",
          subsections: [
            {label: "Q1", text: "How did you select the sample? Was it random, stratified, convenience, or purposive?"},
            {label: "Q2", text: "What was the sample size? How did you determine that this size was sufficient for the conclusions you drew?"},
            {label: "Q3", text: "Was the sample stratified by location, job classification, shift, or any other variable? If not, why not — given that these variables affect violation rates?"},
            {label: "Q4", text: "Did you verify that the sample was representative of the full population on key characteristics — job classification, location, shift, compensation structure?"},
            {label: "Q5", text: "Were any sampled employees excluded from the analysis after selection? If so, why?"},
          ]
        },
        {
          type: "warning-box",
          label: "Unstratified samples are vulnerable.",
          text: "Under Duran, an unstratified sample that does not account for known sources of variation (location, shift, classification) may violate due process. If 60% of employees work at Location A and 40% at Location B, but the sample draws 80% from Location A, the results are biased. Push for stratification details."
        },
      ]
    },

    {
      number: "03",
      label: "Domain 3 — Violation Definition",
      intro: "How the expert defines a 'violation' determines the violation rate. Different definitions produce dramatically different rates.",
      blocks: [
        {
          type: "accordion",
          title: "Key Questions — Violation Definition",
          subsections: [
            {label: "Q1", text: "How did you define a meal period violation? Is it any meal period shorter than 30 minutes, any shift over 5 hours without a recorded meal period, or something else?"},
            {label: "Q2", text: "Did you account for valid meal period waivers? Under Brinker, an employee may waive the first meal period for shifts of 6 hours or less. Did you exclude waived meal periods from the violation count?"},
            {label: "Q3", text: "For short meal punches (< 30 minutes), did you apply the Donohue rebuttable presumption — or did you treat every short punch as a conclusive violation?"},
            {label: "Q4", text: "For overtime violations, what regular rate methodology did you use? Did you apply the Alvarado methodology for flat-sum bonuses? The Ferra methodology for premiums?"},
            {label: "Q5", text: "Did you account for premiums that were actually paid — even if at an incorrect rate? The violation is the underpayment, not the entire premium."},
          ]
        },
        {
          type: "info-box",
          label: "The definition question is outcome-determinative.",
          text: "An expert who defines every short meal punch as a violation (without accounting for waivers or employer rebuttal evidence) will produce a 35–50% violation rate. The same data, with waivers and rebuttal evidence considered, may produce a 15–20% rate. The difference is the entire case."
        },
      ]
    },

    {
      number: "04",
      label: "Domain 4 — Paid Premium Analysis",
      intro: "Many employers paid meal/rest premiums but at the wrong rate (base rate instead of regular rate under Ferra). The violation is the differential — not the entire premium.",
      blocks: [
        {
          type: "accordion",
          title: "Key Questions — Paid Premiums",
          subsections: [
            {label: "Q1", text: "Did you review whether the employer paid meal or rest period premiums during the PAGA period?"},
            {label: "Q2", text: "If premiums were paid, did you credit those payments against the violation calculation? Or did you calculate the full premium as if nothing was paid?"},
            {label: "Q3", text: "If premiums were paid at the base rate instead of the regular rate, did you calculate the differential — or the full regular-rate premium?"},
            {label: "Q4", text: "Did you review the wage statements to determine whether premiums were separately itemized?"},
          ]
        },
        {
          type: "calc-block",
          header: "Premium Differential vs. Full Premium",
          rows: [
            {label: "Regular rate premium (Ferra)", value: "$28.50"},
            {label: "Premium actually paid (base rate)", value: "$20.00"},
            {label: "Underpayment (differential)", value: "$8.50"},
            {label: "Expert's figure if no credit for payment", value: "$28.50"},
            {label: "Correct figure (differential only)", value: "$8.50"},
            {label: "Overstatement if no credit given", value: "235%", total: true},
          ]
        },
      ]
    },

    {
      number: "05",
      label: "Domain 5 — Confidence Intervals & Extrapolation",
      intro: "The expert's conclusions are only as reliable as the statistical methodology. Challenge the confidence intervals and the extrapolation assumptions.",
      blocks: [
        {
          type: "accordion",
          title: "Key Questions — Statistical Methodology",
          subsections: [
            {label: "Q1", text: "What confidence level did you use for your conclusions? 95%? 90%? What is the margin of error?"},
            {label: "Q2", text: "If the confidence interval for the violation rate is 25–35%, did you use the midpoint, the upper bound, or the lower bound for your exposure calculation?"},
            {label: "Q3", text: "Did you test for statistical significance of the differences between subgroups (locations, classifications, shifts)?"},
            {label: "Q4", text: "What assumptions did you make about the distribution of violations? Normal distribution? Were those assumptions tested?"},
            {label: "Q5", text: "Did you perform any sensitivity analysis — showing how the exposure changes if the violation rate is 5% higher or lower than your estimate?"},
          ]
        },
        {
          type: "warning-box",
          label: "Challenge the upper bound.",
          text: "Plaintiff's experts typically use the upper bound of the confidence interval for the violation rate — maximizing the exposure estimate. The defense should argue for the midpoint or lower bound, supported by the employer's own records. If the full population data is available, argue that sampling is unnecessary — use the actual data."
        },
      ]
    },

    {
      number: "06",
      label: "Domain 6 — Affirmative Defense Accommodation",
      intro: "Under Duran, the defendant has a due process right to present individualized defenses. If the sampling methodology does not accommodate these defenses, the extrapolation violates due process.",
      blocks: [
        {
          type: "accordion",
          title: "Key Questions — Affirmative Defenses",
          subsections: [
            {label: "Q1", text: "Does your methodology accommodate the employer's affirmative defenses — voluntary meal period waivers, exempt classification, good faith compliance?"},
            {label: "Q2", text: "If the employer can demonstrate that specific employees voluntarily shortened their meal periods, does your methodology allow for employee-by-employee rebuttal?"},
            {label: "Q3", text: "If certain employees are exempt (and therefore not subject to meal/rest/OT requirements), did you verify exempt status before including them in the violation count?"},
            {label: "Q4", text: "Does your methodology allow for the 'Two Hotels' temporal analysis — different violation rates in different time periods based on compliance changes?"},
            {label: "Q5", text: "If the employer implemented the 30% penalty cap remediation after the notice, did your methodology account for the reduced penalty rate for the remediation period?"},
          ]
        },
        {
          type: "info-box",
          label: "Duran requires individual defense opportunity.",
          text: "The Supreme Court in Duran held that 'the trial court's approach to the case meant that [the defendant] was unable to litigate its exemption defense in a meaningful way.' If the sampling expert's methodology forecloses the employer from presenting individualized defenses, the entire analysis may be inadmissible."
        },
      ]
    },
  ],

  authorities: [
    {cite: "Duran v. U.S. Bank National Assn. (2014) 59 Cal.4th 1", note: "Due process requirements for statistical sampling"},
    {cite: "Brinker Restaurant Corp. v. Superior Court (2012) 53 Cal.4th 1004", note: "Meal period waiver defense"},
    {cite: "Donohue v. AMN Services (2021) 11 Cal.5th 58", note: "Short meal punch rebuttable presumption"},
    {cite: "Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858", note: "Regular rate for premium calculations"},
    {cite: "Alvarado v. Dart Container (2018) 4 Cal.5th 542", note: "Flat-sum bonus regular rate methodology"},
    {cite: "Lab. Code § 2699(p)", note: "Manageability — court may limit trial scope"},
    {cite: "Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582", note: "Due process in PAGA proceedings"},
  ],

  footer: "For illustrative and educational purposes only. Deposition strategies must be tailored to the specific expert, methodology, and case facts.",
};
