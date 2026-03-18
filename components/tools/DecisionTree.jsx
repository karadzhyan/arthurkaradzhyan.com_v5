"use client";
import { useState, useEffect, useRef } from "react";
import S from "../S";

function DecisionTree(){
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [history,setHistory]=useState([]);

  const steps=[
    {q:"Have you received a PAGA notice from the LWDA?",opts:[{label:"Yes",next:1},{label:"No — I want to prepare before one arrives",terminal:"prepare"}]},
    {q:"How many calendar days ago was the PAGA notice mailed to the LWDA?",opts:[{label:"0–15 days",next:2},{label:"16–33 days",next:3},{label:"34–60 days",next:4},{label:"61–65 days",next:5},{label:"Over 65 days",next:6}]},
    {q:"How many employees did you have in the prior 12 months? (You are still within the 33-day cure window.)",opts:[{label:"Under 100 — eligible for cure proposal",terminal:"early_small"},{label:"100 or more — not eligible for cure",terminal:"early_large"}]},
    {q:"How many employees did you have in the prior 12 months? (The 33-day cure deadline is approaching.)",opts:[{label:"Under 100 — cure deadline is imminent",terminal:"cure_urgent"},{label:"100 or more — focus on 60-day remediation",terminal:"mid_large"}]},
    {q:"Have you already begun remediation steps (policy revisions, makeup payments, training)?",opts:[{label:"Yes — documenting everything",terminal:"remediation_active"},{label:"No — haven't started",terminal:"remediation_urgent"},{label:"Partially — some steps taken but not documented",terminal:"remediation_undocumented"}]},
    {q:"Has the LWDA indicated whether it will investigate?",opts:[{label:"LWDA declined or no response",terminal:"pre_litigation"},{label:"LWDA is investigating",terminal:"lwda_investigating"}]},
    {q:"Has the plaintiff filed a civil complaint?",opts:[{label:"Yes",next:7},{label:"Not yet",terminal:"waiting_complaint"}]},
    {q:"Does the plaintiff (or any aggrieved employee) have an arbitration agreement?",opts:[{label:"Yes",terminal:"arbitration"},{label:"No",terminal:"no_arbitration"},{label:"Not sure",terminal:"check_arbitration"}]},
  ];

  const terminals={
    prepare:{title:"Pre-Notice Compliance Positioning",color:"#198754",recs:["Complete the Pre-PAGA Compliance Audit (Resources section) to identify gaps","Build the documentation record for the 15% penalty cap — it must exist BEFORE the notice","Implement electronic meal period attestation systems","Conduct supervisor wage-and-hour training with documented attendance","Schedule a payroll audit within the next 90 days","Use the Penalty Cap Qualifier tool to assess your current qualification status"],cite:"Lab. Code § 2699(g)(1) (15% cap requires pre-notice 'all reasonable steps')"},
    early_small:{title:"Immediate Action: Cure Proposal + Full Remediation",color:"#2c3e3a",recs:["You have 33 days from the notice mailing date to submit a cure proposal — this is the shortest deadline","Simultaneously begin 60-day remediation for the 30% penalty cap","Notify EPLI carrier immediately with a copy of the actual notice","Issue litigation hold on all employment records","Begin three-scenario exposure modeling using the Penalty Estimator","Download the PAGA Notice Response Checklist for the complete action plan"],cite:"Lab. Code § 2699.3(c)(2)(A) (33-day cure for employers with <100 employees); § 2699(h)(1) (60-day remediation for 30% cap)"},
    early_large:{title:"Immediate Action: Full Remediation Track",color:"#2c3e3a",recs:["You are NOT eligible for the cure proposal (100+ employees) — focus entirely on the 60-day remediation track for the 30% penalty cap","Notify EPLI carrier immediately","Issue litigation hold","Begin remediation: makeup payments, policy revisions, supervisor training — document everything with dates","Use the Penalty Cap Qualifier to identify documentation gaps","Prepare carrier status report with three-scenario exposure analysis within 30 days"],cite:"Lab. Code § 2699(h)(1) (60-day remediation for 30% cap); § 2699.3(c)(2)(A) (cure limited to <100 employees)"},
    cure_urgent:{title:"URGENT: Cure Deadline Imminent",color:"#dc3545",recs:["The 33-day cure proposal deadline is approaching or may have passed — verify the exact mailing date immediately","If within the window: prepare and submit the cure proposal to the LWDA (not to plaintiff's counsel)","Even if the cure deadline has passed, you still have the 60-day remediation track for the 30% cap","Begin documenting all remediation steps with specific dates immediately","Every day that passes without documented remediation reduces your penalty cap argument"],cite:"Lab. Code § 2699.3(c)(2)(A) (33-day cure deadline)"},
    mid_large:{title:"Remediation Track: 60-Day Window Active",color:"#CC8800",recs:["The cure deadline has passed (or you weren't eligible). Focus on the 60-day remediation window for the 30% penalty cap","Calculate and issue makeup payments for identifiable underpayments — overtime shortfalls, meal/rest premiums at the regular rate (Ferra), expense reimbursement","Revise deficient policies with documented version dates and employee acknowledgments","Conduct supervisor re-training specifically addressing the alleged violations","Prepare a written remediation plan signed by a senior executive","Compile the penalty cap documentation package — this becomes the centerpiece of your mediation position"],cite:"Lab. Code § 2699(h)(1); Ferra v. Loews (2021) 11 Cal.5th 858 (premiums at regular rate)"},
    remediation_active:{title:"Continue Documenting — 30% Cap Within Reach",color:"#198754",recs:["You are on the right track. Ensure every remediation step is documented with a specific date","Prepare the formal written remediation plan (see sample structure in the PAGA Notice Response Checklist)","Compile the complete evidence package using the 10-tab structure in the Penalty Cap Qualification Tracker","Run the Penalty Cap Qualifier to verify you're hitting every documentation requirement","Begin preparing the carrier status report with the three-scenario exposure analysis","The 30% cap can save 70% of your penalty exposure — the documentation is worth the effort"],cite:"Lab. Code § 2699(h)(1)"},
    remediation_urgent:{title:"URGENT: Begin Remediation Immediately",color:"#dc3545",recs:["Every day without documented remediation weakens the 30% cap argument","Start with the highest-exposure items: meal/rest premiums (at regular rate per Ferra), overtime calculations, and wage statement compliance","Issue makeup payments on separate checks with documented calculation methodology","Revise and re-distribute policies — collect new signed acknowledgments","Schedule supervisor training within the next 7 days","Download the PAGA Notice Response Checklist and the Penalty Cap Qualification Tracker"],cite:"Lab. Code § 2699(h)(1)"},
    remediation_undocumented:{title:"Document What You've Done — Then Fill the Gaps",color:"#CC8800",recs:["Undocumented remediation is invisible in litigation. Retroactively document everything you can: dates of policy changes, training sessions, payment calculations","For items you can't retroactively document, create new documentation going forward","The standard is 'all reasonable steps' — partial documentation is better than none, but gaps will be exploited","Use the Penalty Cap Qualifier to identify specifically which items are documented vs. undocumented","Prioritize: signed acknowledgments, training attendance records, and payment calculation methodology are the three most commonly missing items"],cite:"Lab. Code § 2699(h)(1)"},
    pre_litigation:{title:"Prepare for Litigation — Complaint Expected",color:"#CC8800",recs:["The LWDA period has expired without investigation — plaintiff can file at any time","Prepare the early evaluation conference request (file simultaneously with your answer)","Assess whether an arbitration agreement exists — if yes, prepare the motion to compel under Adolph","Prepare the responsive pleading: challenge standing for specific violation categories under the reformed personal-experience requirement","Complete the three-scenario exposure analysis and present recommended settlement authority to the carrier","Assess mediation timing: early mediation favors the defense if penalty cap documentation is strong"],cite:"Lab. Code § 2699.3(a)(2)(A); § 2699.3(f) (early evaluation conference); Adolph v. Uber (2023) 14 Cal.5th 1104"},
    lwda_investigating:{title:"LWDA Investigation — Monitor and Prepare",color:"#666",recs:["The LWDA investigation creates a pause — the plaintiff cannot file while it's pending","Use this time to complete all remediation and documentation","The investigation outcome doesn't bind the parties, but LWDA findings can influence settlement dynamics","Continue building the penalty cap documentation package","Prepare for litigation as if the investigation will conclude without action (the most common outcome)"],cite:"Lab. Code § 2699.3(a)(2)"},
    waiting_complaint:{title:"Post-65 Day: Complaint Not Yet Filed",color:"#198754",recs:["The plaintiff may be negotiating, may be waiting for more favorable timing, or may not file at all","Use this time to complete all remediation and build the strongest possible documentation record","Consider reaching out through counsel to explore pre-litigation resolution","Continue monitoring the LWDA PAGA notice database for any related filings","Prepare responsive pleading and EEC request so they're ready to file immediately upon service"],cite:""},
    arbitration:{title:"Arbitration Strategy: Adolph Framework",color:"#2c3e3a",recs:["Move to compel individual PAGA claims to arbitration — this is the most consequential procedural decision in the case","Request a stay of representative claims pending the arbitration outcome","Under Adolph, standing survives — but winning the individual arbitration eliminates standing for representative claims","The individual arbitration is now the decisive battle: invest resources there","Monitor Leeper v. Shipt (S289305) — if the Supreme Court holds that headless PAGA is prohibited, the arbitration framework is strengthened","Verify the arbitration agreement has a clear splitting provision (not a blanket waiver) and robust severability clause"],cite:"Adolph v. Uber (2023) 14 Cal.5th 1104; Viking River Cruises v. Moriana (2022) 596 U.S. 639; Hohenshelt v. Superior Court (2025) 18 Cal.5th 310 (equitable relief for late fee payment)"},
    no_arbitration:{title:"No Arbitration Agreement: Full Defense Strategy",color:"#CC8800",recs:["Without an arbitration agreement, defense focuses on: penalty cap qualification, standing challenges, manageability, and exposure reduction through forensic analysis","File the early evaluation conference request with your answer","Challenge standing: does the plaintiff personally suffered each alleged violation within one year before the notice?","Assess manageability: which violation categories require individualized proof across different job classifications or locations?","Build the three-scenario exposure model using the Penalty Estimator","Consider whether to implement arbitration agreements for current employees going forward (prospective protection only)"],cite:"Lab. Code § 2699(c)(1) (personal-experience standing); § 2699(p) (manageability); Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582"},
    check_arbitration:{title:"Locate and Review All Arbitration Agreements",color:"#CC8800",recs:["Check onboarding files, employment agreements, offer letters, and handbook acknowledgments for arbitration clauses","Arbitration provisions can appear in unexpected places — employee handbooks with 'binding arbitration' language, offer letter addenda, electronic onboarding platforms","If found: verify the agreement has a PAGA splitting provision (not a blanket waiver, which is unenforceable under Iskanian)","If found: check for a poison pill clause that voids the entire agreement if the PAGA clause is struck","If found: verify arbitration fees were paid on time if arbitration was previously initiated (Hohenshelt)","This determination should be made within the first 48 hours after receiving the PAGA notice"],cite:"Iskanian v. CLS Transportation (2014) 59 Cal.4th 348 (blanket waiver unenforceable); Hohenshelt v. Superior Court (2025) 18 Cal.5th 310"},
  };

  const answer=(opt)=>{
    setHistory(h=>[...h,{step,answer:opt.label}]);
    setAnswers(p=>({...p,[step]:opt.label}));
    if(opt.terminal){setStep(opt.terminal)}
    else{setStep(opt.next)}
  };
  const goBack=()=>{
    if(history.length===0)return;
    const prev=history[history.length-1];
    setHistory(h=>h.slice(0,-1));
    const newAnswers={...answers};delete newAnswers[prev.step];
    setAnswers(newAnswers);
    setStep(prev.step);
  };
  const reset=()=>{setStep(0);setAnswers({});setHistory([])};
  const isTerminal=typeof step==="string";
  const currentStep=isTerminal?null:steps[step];
  const result=isTerminal?terminals[step]:null;

  return(
    <div style={{background:"#fff",border:"1px solid #e0e0e0",padding:"40px 40px 28px",position:"relative",overflow:"hidden",marginTop:32}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#2c3e3a,#4a7a6f)"}}/>
      <S fontSize={10} fontWeight={500} letterSpacing={4} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>Interactive · PAGA Reform Decision Tree</S>
      <S fontSize={12} color="#999" marginBottom={24}>Answer a few questions to receive a specific strategic recommendation with statutory citations. Routes through the 2024 reform framework (AB 2288 / SB 92).</S>

      {/* BREADCRUMB */}
      {Object.keys(answers).length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:20}}>
        {Object.entries(answers).map(([k,v],i)=>(
          <span key={i} style={{fontFamily:"'Outfit',sans-serif",fontSize:10,padding:"4px 10px",background:"#f0f0f0",color:"#888"}}>{v}</span>
        ))}
      </div>}

      {/* QUESTION */}
      {!isTerminal&&<div style={{padding:32,background:"#fafafa",border:"1px solid #eee",textAlign:"center",marginBottom:20}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#2c3e3a" marginBottom={16}>Question {Object.keys(answers).length+1}</S>
        <S fontSize={18} fontWeight={600} color="#1a1a1a" marginBottom={24}>{currentStep.q}</S>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center"}}>
          {currentStep.opts.map((opt,i)=>(
            <button key={i} onClick={()=>answer(opt)} style={{fontFamily:"'Outfit',sans-serif",fontSize:13,padding:"14px 28px",border:"1px solid #2c3e3a",background:"#fff",color:"#2c3e3a",cursor:"pointer",transition:"all .2s",maxWidth:320}}
              onMouseEnter={e=>{e.target.style.background="#2c3e3a";e.target.style.color="#fff"}}
              onMouseLeave={e=>{e.target.style.background="#fff";e.target.style.color="#2c3e3a"}}>{opt.label}</button>
          ))}
        </div>
      </div>}

      {/* RESULT */}
      {isTerminal&&result&&<div>
        <div style={{padding:24,background:""+(result.color)+"10",border:"2px solid "+(result.color)+"30",borderLeft:"6px solid "+(result.color),marginBottom:20}}>
          <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color={result.color} marginBottom={8}>Strategic Recommendation</S>
          <S fontSize={20} fontWeight={700} color="#1a1a1a" marginBottom={16}>{result.title}</S>
          {result.recs.map((r,i)=>(
            <div key={i} style={{display:"flex",gap:12,marginBottom:10,alignItems:"flex-start"}}>
              <S fontSize={14} fontWeight={700} color={result.color} style={{flexShrink:0,marginTop:1}}>{i+1}.</S>
              <S fontSize={13} lineHeight="1.7" color="#444">{r}</S>
            </div>
          ))}
          {result.cite&&<div style={{marginTop:16,padding:12,background:"rgba(255,255,255,.7)",border:"1px solid #e0e0e0"}}>
            <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#999" marginBottom={4}>Governing Authority</S>
            <S fontSize={11} color="#888" fontStyle="italic">{result.cite}</S>
          </div>}
        </div>
        <button onClick={reset} style={{fontFamily:"'Outfit',sans-serif",fontSize:12,padding:"10px 20px",border:"1px solid #2c3e3a",background:"#fff",color:"#2c3e3a",cursor:"pointer"}}>Start Over</button>
      </div>}

      {/* Back button for questions */}
      {!isTerminal&&history.length>0&&<div style={{marginTop:12}}>
        <button onClick={goBack} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,padding:"8px 16px",border:"1px solid #ccc",background:"#fff",color:"#888",cursor:"pointer"}}>← Back</button>
      </div>}

      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#2c3e3a",marginBottom:8,display:"flex",alignItems:"center",gap:6,cursor:"pointer"}} onClick={()=>{const el=document.getElementById("section-insights");if(el)el.scrollIntoView({behavior:"smooth",block:"start"})}}><span style={{fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Read the Analysis</span><span style={{color:"#999"}}>AB 2288 & SB 92: A Defense-Side Roadmap to the 2024 PAGA Reforms →</span></div>
      <S fontSize={10} color="#bbb" marginTop={16} fontStyle="italic">For illustrative purposes only. Each PAGA matter involves unique facts requiring individualized analysis. This tool provides general strategic direction based on the 2024 reform framework; it does not constitute legal advice.</S>
    </div>
  );
}

export default DecisionTree;
