"use client";
import { useState, useEffect, useRef } from "react";
import S from "../S";

function SOLCalc(){
  const [noticeDate,setNoticeDate]=useState(new Date().toISOString().split("T")[0]);
  const [showTimeline,setShowTimeline]=useState(true);
  const violations=[
    {code:"§ 226.7",name:"Meal/Rest Premiums",pagaSOL:1,underlyingSOL:3,uclSOL:4,note:"Premium is a 'wage' (Murphy) — 3-year SOL. PAGA penalty limited to 1-year lookback.",color:"#dc3545"},
    {code:"§ 510",name:"Overtime",pagaSOL:1,underlyingSOL:3,uclSOL:4,note:"Unpaid OT is wages with 3-year SOL. PAGA penalty lookback is 1 year.",color:"#e06070"},
    {code:"§ 226(a)",name:"Wage Statements",pagaSOL:1,underlyingSOL:1,uclSOL:4,note:"Both PAGA and underlying SOL are 1 year. UCL extends to 4.",color:"#2c3e3a"},
    {code:"§ 203",name:"Waiting Time",pagaSOL:1,underlyingSOL:1,uclSOL:null,note:"Penalty, not wage. 1-year lookback. No UCL claim available.",color:"#4a7a6f"},
    {code:"§ 2802",name:"Expense Reimb.",pagaSOL:1,underlyingSOL:3,uclSOL:4,note:"3-year SOL for underlying claim. PAGA penalty lookback is 1 year.",color:"#CC8800"},
    {code:"§ 1197.1",name:"Minimum Wage",pagaSOL:1,underlyingSOL:3,uclSOL:4,note:"Specific penalty: $100/$250. Underlying wage claim has 3-year SOL.",color:"#8B0000"},
    {code:"§ 201/202",name:"Final Pay",pagaSOL:1,underlyingSOL:3,uclSOL:4,note:"Underlying obligation has 3-year SOL. PAGA penalty lookback is 1 year.",color:"#666"},
    {code:"§ 2751",name:"Commission Agmt.",pagaSOL:1,underlyingSOL:3,uclSOL:4,note:"Written commission agreement requirement. 3-year underlying SOL.",color:"#444"},
  ];
  const calcDate=(base,years)=>{const d=new Date(base);d.setFullYear(d.getFullYear()-years);return d.toISOString().split("T")[0]};
  const fmtDate=(d)=>{if(!d)return"N/A";const p=d.split("-");return `${p[1]}/${p[2]}/${p[0]}`};
  return(
    <div style={{background:"#fff",border:"1px solid #e0e0e0",padding:"40px 40px 28px",position:"relative",overflow:"hidden",marginTop:32}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#2c3e3a,#4a7a6f)"}}/>
      <S fontSize={10} fontWeight={500} letterSpacing={4} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>Interactive · Statute of Limitations Calculator</S>
      <S fontSize={12} color="#999" marginBottom={24}>Maps the PAGA lookback versus underlying SOL for each violation. Visual timeline identifies where plaintiff has overstated the penalty-recoverable period.</S>
      <div style={{display:"flex",gap:24,alignItems:"flex-end",marginBottom:28}}>
        <div><S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>PAGA Notice Date</S>
          <input type="date" value={noticeDate} onChange={e=>setNoticeDate(e.target.value)} style={{fontFamily:"'Outfit',sans-serif",fontSize:14,padding:"10px 14px",border:"1px solid #ddd",outline:"none"}}/></div>
        <button onClick={()=>setShowTimeline(!showTimeline)} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,padding:"10px 16px",border:"1px solid "+(showTimeline?"#2c3e3a":"#ddd"),background:showTimeline?"#2c3e3a":"#fff",color:showTimeline?"#fff":"#888",cursor:"pointer",marginBottom:1}}>{showTimeline?"✓ ":""}Visual Timeline</button>
      </div>
      {showTimeline&&<div style={{marginBottom:28,padding:20,background:"#fafafa",border:"1px solid #eee"}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#2c3e3a" marginBottom={16}>Lookback Period Timeline</S>
        <div style={{display:"flex",marginBottom:8,justifyContent:"space-between"}}>
          <S fontSize={10} color="#999">4 years before notice</S><S fontSize={10} color="#999">3 years</S><S fontSize={10} color="#999">2 years</S><S fontSize={10} color="#999">1 year</S><S fontSize={10} color="#2c3e3a" fontWeight={600}>Notice</S>
        </div>
        {violations.map((v,i)=>{const pw=25;const uw=Math.min(100,(v.underlyingSOL/4)*100);return(
          <div key={i} style={{marginBottom:6,display:"flex",alignItems:"center",gap:8}}>
            <S fontSize={10} color="#666" style={{width:100,flexShrink:0,textAlign:"right"}}>{v.code}</S>
            <div style={{flex:1,height:16,background:"#eee",position:"relative",borderRadius:2,overflow:"hidden"}}>
              {v.uclSOL&&<div style={{position:"absolute",right:0,top:0,bottom:0,width:"100%",background:""+(v.color)+"10",borderLeft:"1px dashed "+(v.color)+"30"}}/>}
              <div style={{position:"absolute",right:0,top:0,bottom:0,width:uw+"%",background:""+(v.color)+"25"}}/>
              <div style={{position:"absolute",right:0,top:0,bottom:0,width:pw+"%",background:v.color,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <S fontSize={7} fontWeight={600} color="#fff">PAGA</S>
              </div>
            </div>
          </div>
        )})}
        <div style={{display:"flex",gap:16,marginTop:12}}>
          <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:12,height:12,background:"#2c3e3a"}}/><S fontSize={10} color="#999">PAGA penalty (1 yr)</S></div>
          <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:12,height:12,background:"rgba(44,62,58,.25)"}}/><S fontSize={10} color="#999">Underlying SOL</S></div>
          <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:12,height:12,background:"rgba(44,62,58,.06)",border:"1px dashed rgba(44,62,58,.25)"}}/><S fontSize={10} color="#999">UCL (4 yr)</S></div>
        </div>
      </div>}
      <div style={{overflowX:"auto",marginBottom:20}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"'Outfit',sans-serif",fontSize:12}}>
          <thead><tr style={{background:"#2c3e3a"}}>
            {["Violation","PAGA Start","Underlying SOL","UCL Start","Notes"].map(h=>(
              <th key={h} style={{padding:"10px 12px",color:"#fff",fontWeight:500,fontSize:10,letterSpacing:1,textTransform:"uppercase",textAlign:"left"}}>{h}</th>
            ))}</tr></thead>
          <tbody>{violations.map((v,i)=>(
            <tr key={i} style={{borderBottom:"1px solid #f0f0f0",background:i%2===0?"#fafafa":"#fff"}}>
              <td style={{padding:"10px 12px"}}><span style={{fontWeight:600,color:"#333"}}>{v.code}</span><br/><span style={{color:"#888",fontSize:11}}>{v.name}</span></td>
              <td style={{padding:"10px 12px",color:"#2c3e3a",fontWeight:600}}>{fmtDate(calcDate(noticeDate,v.pagaSOL))}</td>
              <td style={{padding:"10px 12px",color:"#666"}}>{fmtDate(calcDate(noticeDate,v.underlyingSOL))} ({v.underlyingSOL}yr)</td>
              <td style={{padding:"10px 12px",color:"#999"}}>{v.uclSOL?fmtDate(calcDate(noticeDate,v.uclSOL)):"N/A"}</td>
              <td style={{padding:"10px 12px",color:"#999",fontSize:11}}>{v.note}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <div style={{padding:20,background:"#fff0f0",border:"1px solid #f0c0c0",textAlign:"center"}}>
          <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#dc3545" marginBottom={8}>Plaintiff Overstatement Risk</S>
          <S fontSize={11} color="#888" marginBottom={8}>For violations with 3-year underlying SOL, using that SOL for PAGA penalties:</S>
          <S fontSize={36} fontWeight={700} color="#dc3545">67%</S>
          <S fontSize={11} color="#999">of their penalty demand covers non-PAGA periods</S>
          <S fontSize={10} color="#bbb" marginTop={6}>{violations.filter(function(v){return v.underlyingSOL>v.pagaSOL}).length} of {violations.length} violations have longer underlying SOL</S>
        </div>
        <div style={{padding:20,background:"#f0fff0",border:"1px solid #c0e0c0",textAlign:"center"}}>
          <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#198754" marginBottom={8}>Defense Reduction Opportunity</S>
          <S fontSize={11} color="#888" marginBottom={8}>Correcting the lookback period in a 3-year demand:</S>
          <S fontSize={36} fontWeight={700} color="#198754">~67%</S>
          <S fontSize={11} color="#999">penalty exposure reduction</S>
          <S fontSize={10} color="#bbb" marginTop={6}>Does not apply to § 226(a) or § 203 (1-year underlying SOL)</S>
        </div>
      </div>
      {/* STRATEGIC ANALYSIS */}
      <div style={{padding:24,background:"#f8faf9",border:"1px solid #e0e8e6",marginBottom:16}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#2c3e3a" marginBottom={16}>Strategic Analysis: PAGA vs. Class Action Lookback</S>
        <S fontSize={13} lineHeight="1.8" color="#555" marginBottom={12}>This is where PAGA and class action defense diverge most sharply. In a class action, the 3-year (or 4-year UCL) statute of limitations controls the damages period — every overtime underpayment, every missed meal premium, and every unreimbursed expense going back 3-4 years is potentially recoverable as wages. In a PAGA action, the penalty exposure is limited to one year — but plaintiff's counsel routinely conflates the two, demanding PAGA penalties for the full 3-4 year period.</S>
        <S fontSize={13} lineHeight="1.8" color="#555" marginBottom={12}>The defense opportunity: when you receive a PAGA demand that calculates penalties across a 3-year period, respond with this analysis. Strip every penalty calculation back to the one-year PAGA period. The wage claims for years 2-3 survive as direct claims or UCL claims — but the per-employee-per-pay-period penalties (which are the bulk of PAGA exposure) apply only to the most recent year. On a typical 3-year demand, this correction alone reduces the penalty component by approximately 67%.</S>
        <S fontSize={13} lineHeight="1.8" color="#555">When both tracks are pending: the class action damages cover 3 years of wages; the PAGA action covers 1 year of penalties. The exposure model must calculate these separately. A common defense error is presenting a single blended number that understates the wage damages while overstating the PAGA penalties. Separate the calculations to give the carrier an accurate picture of both tracks — and to identify which track drives the settlement value.</S>
      </div>

      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#2c3e3a",marginBottom:8,display:"flex",alignItems:"center",gap:6,cursor:"pointer"}} onClick={()=>{const el=document.getElementById("section-insights");if(el)el.scrollIntoView({behavior:"smooth",block:"start"})}}><span style={{fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Read the Analysis</span><span style={{color:"#999"}}>Recoverable vs. Non-Recoverable Penalties Under PAGA — see PAGA lookback vs. underlying SOL distinction →</span></div>
      <S fontSize={10} color="#bbb" fontStyle="italic">For illustrative purposes only. Lab. Code § 2699(d) (1-year PAGA period); CCP § 338(a) (3-year wage claims); Bus. & Prof. Code § 17208 (4-year UCL). Tolling, equitable estoppel, and continuing violation theories may extend applicable periods.</S>
    </div>
  );
}

export default SOLCalc;
