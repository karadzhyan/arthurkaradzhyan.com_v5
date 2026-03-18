"use client";
import { useState, useEffect, useRef } from "react";
import S from "../S";

function CapQualifier(){
  const [track,setTrack]=useState("pre");
  const preItems=[
    {id:"policy_meal",label:"Written meal period policy distributed to all employees",cite:"Brinker (2012) 53 Cal.4th 1004"},
    {id:"policy_rest",label:"Written rest period policy (off-premises permitted)",cite:"Augustus (2016) 2 Cal.5th 257"},
    {id:"policy_ot",label:"Written overtime/timekeeping policy prohibiting off-the-clock work",cite:"Lab. Code §§ 510, 1194"},
    {id:"acks",label:"Signed employee acknowledgments on file for all policies",cite:""},
    {id:"training",label:"Supervisor wage-and-hour training with attendance records",cite:""},
    {id:"audit",label:"Payroll audit conducted within prior 24 months",cite:""},
    {id:"regrate",label:"Regular rate calculation methodology documented (includes all non-discretionary comp)",cite:"Alvarado (2018) 4 Cal.5th 542"},
    {id:"expense",label:"Expense reimbursement policy with submission procedures",cite:"Lab. Code § 2802"},
    {id:"complaint",label:"Complaint mechanism with 2+ channels and anti-retaliation language",cite:""},
    {id:"rounding",label:"Time-clock rounding eliminated or data-verified as net-neutral",cite:"Donohue (2021) 11 Cal.5th 58"},
    {id:"premiums",label:"Meal/rest premiums calculated at regular rate, not base rate",cite:"Ferra (2021) 11 Cal.5th 858"},
    {id:"attestation",label:"Electronic attestation system for noncompliant meal punches",cite:""},
  ];
  const postItems=[
    {id:"p_timing",label:"All remediation steps completed within 60 days of notice",cite:"Lab. Code § 2699(h)(1)"},
    {id:"p_makeup",label:"Makeup payments calculated and issued with documentation",cite:""},
    {id:"p_policy",label:"Policy revisions with version dates, distribution records, new acknowledgments",cite:""},
    {id:"p_train",label:"Supervisor re-training specifically addressing alleged violations",cite:""},
    {id:"p_plan",label:"Written remediation plan: dated, signed by executive, allegation-by-allegation",cite:""},
    {id:"p_tied",label:"All corrective actions explicitly tied to specific PAGA notice allegations",cite:""},
  ];
  const items=track==="pre"?preItems:postItems;
  const [scores,setScores]=useState({});
  const [exposure,setExposure]=useState(500000);


  const maxScore=items.length*2;
  const totalScore=items.reduce((sum,item)=>(sum+(scores[item.id]||0)),0);
  const pct=maxScore>0?Math.round((totalScore/maxScore)*100):0;
  const capRate=track==="pre"?0.15:0.30;
  const capLabel=track==="pre"?"15%":"30%";
  const qualified=pct>=75?"green":pct>=45?"yellow":"red";
  const qualifiedLabel=qualified==="green"?"Likely Qualified":qualified==="yellow"?"Arguable — Gaps Exist":"Unlikely Without Action";
  const qualifiedColor=qualified==="green"?"#198754":qualified==="yellow"?"#CC8800":"#dc3545";
  const savings=exposure-(exposure*capRate);
  const fmt=(n)=>n>=1000000?`$${(n/1000000).toFixed(1)}M`:n>=1000?`$${Math.round(n/1000)}K`:`$${n}`;

  const stateColors=["#e0e0e0","#CC8800","#2c3e3a"];
  const stateLabels=["No","Undocumented","Documented"];

  return(
    <div style={{background:"#fff",border:"1px solid #e0e0e0",padding:40,position:"relative",overflow:"hidden",marginTop:32}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#2c3e3a,#4a7a6f)"}}/>
      <S fontSize={10} fontWeight={500} letterSpacing={4} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>Interactive · Penalty Cap Qualifier</S>
      <S fontSize={12} color="#999" marginBottom={24}>Assess whether you qualify for the 15% or 30% penalty cap under the 2024 PAGA reforms (AB 2288 / SB 92).</S>

      {/* TRACK TOGGLE */}
      <div style={{display:"flex",gap:0,marginBottom:28}}>
        <button onClick={()=>setTrack("pre")} style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:500,padding:"12px 24px",border:"1px solid #2c3e3a",background:track==="pre"?"#2c3e3a":"#fff",color:track==="pre"?"#fff":"#2c3e3a",cursor:"pointer",letterSpacing:2,borderRight:"none"}}>Pre-Notice (15% Cap)</button>
        <button onClick={()=>setTrack("post")} style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:500,padding:"12px 24px",border:"1px solid #2c3e3a",background:track==="post"?"#2c3e3a":"#fff",color:track==="post"?"#fff":"#2c3e3a",cursor:"pointer",letterSpacing:2}}>Post-Notice (30% Cap)</button>
      </div>

      {/* CHECKLIST */}
      <div style={{marginBottom:28}}>
        {items.map((item)=>{
          const score=scores[item.id]||0;
          return(
            <div key={item.id} style={{display:"flex",alignItems:"center",gap:16,padding:"12px 16px",borderBottom:"1px solid #f0f0f0",transition:"background .2s",background:score===2?"rgba(44,62,58,.03)":score===1?"rgba(204,136,0,.03)":"transparent"}}>
              <div style={{display:"flex",gap:0,flexShrink:0}}>
                {[[0,"No","#e0e0e0"],[1,"Undoc.","#CC8800"],[2,"Doc.","#2c3e3a"]].map(function(arr){var val=arr[0],lbl=arr[1],clr=arr[2];return(
                  <button key={val} onClick={function(){setScores(function(p){var n={};for(var k in p)n[k]=p[k];n[item.id]=p[item.id]===val?0:val;return n})}} style={{fontFamily:"'Outfit',sans-serif",fontSize:8,fontWeight:600,letterSpacing:1,padding:"4px 8px",border:"1px solid "+(score===val?clr:"#e0e0e0"),borderRight:val!==2?"none":undefined,background:score===val?clr:"#fff",color:score===val?"#fff":"#999",cursor:"pointer",transition:"all .15s",textTransform:"uppercase"}}>{lbl}</button>
                )})}
              </div>
              <div style={{flex:1}}>
                <S fontSize={13} color={score===2?"#1a1a1a":score===1?"#666":"#999"} fontWeight={score===2?500:400}>{item.label}</S>
                {item.cite&&<S fontSize={10} color="#bbb" fontStyle="italic">{item.cite}</S>}
              </div>
            </div>
          );
        })}
        <S fontSize={10} color="#bbb" marginTop={8} fontStyle="italic">Use the buttons to mark each item: No / Undocumented / Documented</S>
      </div>

      {/* RESULTS */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:24}}>
        {/* Score */}
        <div style={{padding:24,background:"#fafafa",textAlign:"center",borderTop:"3px solid "+(qualifiedColor)}}>
          <S fontSize={10} fontWeight={500} letterSpacing={2} textTransform="uppercase" color="#999" marginBottom={8}>Score</S>
          <S fontSize={40} fontWeight={700} color={qualifiedColor}>{pct}%</S>
          <S fontSize={11} color="#999">{totalScore} / {maxScore} points</S>
        </div>
        {/* Qualification */}
        <div style={{padding:24,background:"#fafafa",textAlign:"center",borderTop:"3px solid "+(qualifiedColor)}}>
          <S fontSize={10} fontWeight={500} letterSpacing={2} textTransform="uppercase" color="#999" marginBottom={8}>{capLabel} Cap Qualification</S>
          <S fontSize={20} fontWeight={700} color={qualifiedColor} marginBottom={4}>{qualifiedLabel}</S>
          <S fontSize={11} color="#999">{qualified==="green"?"Strong documentation":"Documentation gaps identified"}</S>
        </div>
        {/* Dollar Impact */}
        <div style={{padding:24,background:"#fafafa",textAlign:"center",borderTop:"3px solid #2c3e3a"}}>
          <S fontSize={10} fontWeight={500} letterSpacing={2} textTransform="uppercase" color="#999" marginBottom={8}>Dollar Impact</S>
          <div style={{marginBottom:8}}>
            <S fontSize={11} color="#999">Exposure input:</S>
            <input type="range" min={50000} max={3000000} step={25000} value={exposure} onChange={e=>setExposure(+e.target.value)} style={{width:"100%",accentColor:"#2c3e3a"}}/>
            <S fontSize={13} fontWeight={600} color="#333">{fmt(exposure)}</S>
          </div>
          <S fontSize={10} color="#999" marginBottom={4}>With {capLabel} cap: {fmt(exposure*capRate)}</S>
          <S fontSize={20} fontWeight={700} color="#2c3e3a">Savings: {fmt(savings)}</S>
        </div>
      </div>

      {/* GAPS */}
      {items.filter(i=>(scores[i.id]||0)<2).length>0&&<div style={{padding:20,background:"#fff8f0",border:"1px solid #f0e0c0",marginBottom:16}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#CC8800" marginBottom={12}>Documentation Gaps ({items.filter(i=>(scores[i.id]||0)<2).length} items)</S>
        {items.filter(i=>(scores[i.id]||0)<2).map(i=>(
          <div key={i.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <span style={{color:"#CC8800",fontSize:14}}>•</span>
            <S fontSize={12} color="#888">{i.label}</S>
          </div>
        ))}
      </div>}

      {/* STRATEGIC ANALYSIS */}
      {totalScore>0&&<div style={{padding:24,background:"#f8faf9",border:"1px solid #e0e8e6",marginBottom:16}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#2c3e3a" marginBottom={16}>Strategic Analysis</S>
        {pct>=75&&<div>
          <S fontSize={14} fontWeight={600} color="#198754" marginBottom={8}>Strong Documentation Position</S>
          <S fontSize={12} lineHeight="1.8" color="#555" marginBottom={12}>Your documentation record supports {capLabel} cap qualification. At mediation, present the penalty cap documentation package as a single organized binder (organize documentation into a 10-tab evidence binder covering each qualification requirement). Lead with the written remediation plan signed by a senior executive — this signals organizational commitment. The timeline showing every remediation action plotted against the {track==="pre"?"notice date":"60-day deadline"} is the single most persuasive visual tool in the package.</S>
          <S fontSize={12} lineHeight="1.8" color="#555">With {capLabel} cap applied to your exposure input of {fmt(exposure)}, the exposure reduces to {fmt(Math.round(exposure*capRate))} — a savings of {fmt(exposure-Math.round(exposure*capRate))}. This number should anchor your settlement authority recommendation to the carrier. The PAGA employee share (35% post-reform) of the capped amount is {fmt(Math.round(exposure*capRate*0.35))}.</S>
        </div>}
        {pct>=45&&pct<75&&<div>
          <S fontSize={14} fontWeight={600} color="#CC8800" marginBottom={8}>Qualification Arguable — Close the Gaps</S>
          <S fontSize={12} lineHeight="1.8" color="#555" marginBottom={12}>You have the foundation but the documentation gaps undermine the "all reasonable steps" argument. The items marked "Undocumented" are the most urgent — you may be complying in practice but cannot prove it in discovery. Focus on: {items.filter(i=>scores[i.id]===1).map(i=>i.label).slice(0,3).join("; ")}.</S>
          <S fontSize={12} lineHeight="1.8" color="#555" marginBottom={12}>Priority remediation: convert every "Undocumented" item to "Documented" within 30 days. For training: retroactively create a training log with dates, topics, and attendee confirmations (have attendees sign a confirmation that the training occurred). For policies: create distribution records with employee signatures. For payroll audits: commission a third-party audit — even a post-notice audit demonstrates "reasonable steps."</S>
          <S fontSize={12} lineHeight="1.8" color="#555">Class action implication: documentation gaps that prevent penalty cap qualification also weaken the employer's position at class certification. A court evaluating commonality may view undocumented practices as evidence that policies were not uniformly applied — which paradoxically helps plaintiff establish common questions while hurting the employer's merits defense.</S>
        </div>}
        {pct<45&&<div>
          <S fontSize={14} fontWeight={600} color="#dc3545" marginBottom={8}>Significant Gaps — Cap Unlikely Without Major Action</S>
          <S fontSize={12} lineHeight="1.8" color="#555" marginBottom={12}>At this score, the "all reasonable steps" standard is not met. The penalty cap argument will fail at mediation and at trial unless significant remediation is undertaken. The referring question is not "can we qualify?" but "is the cost of qualifying less than the penalty savings?" — and it almost always is.</S>
          <S fontSize={12} lineHeight="1.8" color="#555" marginBottom={12}>Estimated remediation cost to reach {capLabel} cap qualification: $5,000–$25,000 (policy drafting, training program, payroll audit, attestation system implementation). Estimated penalty savings from qualification on a {fmt(exposure)} exposure: {fmt(exposure-Math.round(exposure*capRate))}. ROI: {Math.round((exposure-Math.round(exposure*capRate))/15000)}× on a $15,000 investment.</S>
          <S fontSize={12} lineHeight="1.8" color="#555">If the matter is pre-notice: you have time. Conduct a comprehensive compliance audit covering all violation categories, build the 90-day remediation timeline, and reach 15% cap positioning before a notice arrives. If post-notice: the 60-day window is your last opportunity for the 30% cap. Every day of inaction is documented evidence of inaction.</S>
        </div>}
      </div>}

      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#2c3e3a",marginBottom:8,display:"flex",alignItems:"center",gap:6,cursor:"pointer"}} onClick={()=>{const el=document.getElementById("section-insights");if(el)el.scrollIntoView({behavior:"smooth",block:"start"})}}><span style={{fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Read the Analysis</span><span style={{color:"#999"}}>AB 2288 & SB 92: A Defense-Side Roadmap to the 2024 PAGA Reforms →</span></div>
      <S fontSize={10} color="#bbb" fontStyle="italic">For illustrative purposes only. Penalty cap qualification depends on the specific facts of each case. Lab. Code § 2699(g)(1) (15% cap); § 2699(h)(1) (30% cap).</S>
    </div>
  );
}

export default CapQualifier;
