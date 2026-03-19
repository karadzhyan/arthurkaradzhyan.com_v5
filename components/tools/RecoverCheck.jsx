"use client";
import { useState, useEffect, useRef } from "react";
import S from "../S";
import DemandWaterfall from "../viz/DemandWaterfall";

function RecoverCheck(){
  const [selected,setSelected]=useState(null);
  const [demandMode,setDemandMode]=useState(false);
  const [empCount,setEmpCount]=useState(50);
  const [ppCount,setPpCount]=useState(26);

  const items=[
    {code:"§ 226.7",name:"Meal/Rest Period Premiums",recoverable:"partial",rate:200,plaintiffRate:25,note:"uses premium $",penalty:"Default § 2699(f)(2): $100/$200",analysis:"The premium itself (one hour of pay) is a WAGE, not a penalty — per Kirby v. Immoos (2012) 53 Cal.4th 1244. It cannot be recovered as a PAGA penalty. However, the failure to provide meal/rest periods triggers the default PAGA penalty under § 2699(f)(2). Plaintiff's counsel routinely includes the premium dollar amount in PAGA calculations — this is incorrect and inflates exposure by the full premium amount for every violation.",authority:"Kirby v. Immoos (2012) 53 Cal.4th 1244; ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175",defense:"Strip the premium amounts from plaintiff's PAGA calculation. The correct PAGA exposure for meal/rest violations is the $100/$200 default penalty per employee per pay period — NOT the premium amount. This distinction alone can reduce theoretical exposure by 30-50%.",current:"Q1 2026"},
    {code:"§ 510",name:"Overtime Underpayments",recoverable:"no",rate:200,plaintiffRate:400,note:"includes wages",penalty:"Default § 2699(f)(2): $100/$200",analysis:"Unpaid overtime is a WAGE, not a civil penalty. The wage itself is not recoverable through PAGA — only through a direct claim (§ 1194) or UCL action. The PAGA penalty for overtime violations is the default $100/$200 per employee per pay period. Many plaintiff demands include the underpaid wages as part of the PAGA calculation — this is incorrect.",authority:"ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175",defense:"Challenge any PAGA calculation that adds unpaid overtime wages to the penalty amount. The penalty is fixed at $100/$200 regardless of the size of the underpayment.",current:"Q1 2026"},
    {code:"§ 226(a)",name:"Wage Statement Violations",recoverable:"yes",rate:100,plaintiffRate:100,note:"correct",penalty:"§ 226(e): $50/$100 (max $4,000/emp)",analysis:"Section 226(e) provides a SPECIFIC civil penalty for knowing and intentional wage statement violations. This penalty IS recoverable through PAGA. Note the scienter requirement: the violation must be 'knowing and intentional.' Post-Naranjo, failure to include meal/rest premiums on the wage statement is an independent § 226 violation — creating derivative exposure.",authority:"Lab. Code § 226(e); Naranjo v. Spectrum Security (2022) 13 Cal.5th 93",defense:"Challenge scienter: require plaintiff to prove 'knowing and intentional' violation. An employer who relied on payroll vendor configuration or prior legal guidance has an argument. The Naranjo II good-faith defense is available.",current:"Q1 2026"},
    {code:"§ 203",name:"Waiting Time Penalties",recoverable:"disputed",rate:200,plaintiffRate:4800,note:"30 days wages",penalty:"Up to 30 days daily wages",analysis:"Section 203 provides 'waiting time penalties' for late final pay — up to 30 days of the employee's daily rate. Whether fully recoverable through PAGA is analytically complex. Courts have generally allowed PAGA recovery, but § 203 requires 'willful' failure, creating a defense for good-faith disputes.",authority:"Lab. Code § 203; Mamika v. Barca (1998) 68 Cal.App.4th 487",defense:"The 'willful' requirement is a significant defense. If the employer had a good-faith belief that all wages were paid, § 203 penalties should not apply. Document the basis for the good-faith dispute.",current:"Q1 2026"},
    {code:"§ 1197.1",name:"Minimum Wage Violations",recoverable:"yes",rate:250,plaintiffRate:250,note:"correct",penalty:"§ 1197.1: $100/$250 + wages",analysis:"Section 1197.1 provides a SPECIFIC penalty for minimum wage violations. Both the penalty and the underpaid wages are recoverable through PAGA — this is one of the few violation types where PAGA authorizes recovery of both.",authority:"Lab. Code § 1197.1(b); ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175",defense:"Minimum wage violations carry the highest per-violation penalty rate. Prioritize compliance. If the violation exists, early remediation and cure positioning are critical.",current:"Q1 2026"},
    {code:"§ 2802",name:"Expense Reimbursement",recoverable:"partial",rate:200,plaintiffRate:350,note:"includes expenses",penalty:"Default § 2699(f)(2): $100/$200",analysis:"The unreimbursed expense itself is NOT a penalty — it is an amount owed. The PAGA penalty is the default $100/$200. Plaintiff's demands that include unreimbursed amounts as PAGA penalties overstate exposure.",authority:"ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175",defense:"Strip unreimbursed amounts from the penalty calculation. The PAGA penalty is the $100/$200 default, not the unreimbursed amount.",current:"Q1 2026"},
  ];

  const colors={yes:"#198754",no:"#dc3545",partial:"#CC8800",disputed:"#666"};
  const labels={yes:"Recoverable",no:"Not Recoverable (Wages Only)",partial:"Partially Recoverable",disputed:"Disputed"};
  const fmt=(n)=>n>=1000000?`$${(n/1000000).toFixed(2)}M`:n>=1000?`$${Math.round(n).toLocaleString()}`:`$${Math.round(n)}`;

  // Demand comparison calculations
  const plaintiffTotal=items.reduce((s,c)=>s+(empCount*ppCount*c.plaintiffRate),0);
  const correctTotal=items.reduce((s,c)=>s+(empCount*ppCount*c.rate),0);
  const reduction=plaintiffTotal>0?Math.round(((plaintiffTotal-correctTotal)/plaintiffTotal)*100):0;

  return(
    <div style={{background:"#fff",border:"1px solid #e0e0e0",padding:"40px 40px 28px",position:"relative",overflow:"hidden",marginTop:32}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#2c3e3a,#4a7a6f)"}}/>
      <S fontSize={10} fontWeight={500} letterSpacing={4} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>Interactive · Dual-Track Recoverability Checker</S>
      <S fontSize={12} color="#999" marginBottom={24}>In a combined class action and PAGA case, the same violation creates two separate exposure tracks. Items that are NOT recoverable as PAGA penalties are often recoverable as class action damages — and vice versa. This tool maps both tracks for each violation type.</S>

      {/* MODE TOGGLE */}
      <div style={{display:"flex",gap:0,marginBottom:24}}>
        <button onClick={()=>setDemandMode(false)} style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:500,padding:"10px 20px",border:"1px solid #2c3e3a",borderRight:"none",background:!demandMode?"#2c3e3a":"#fff",color:!demandMode?"#fff":"#2c3e3a",cursor:"pointer"}}>Category Analysis</button>
        <button onClick={()=>setDemandMode(true)} style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:500,padding:"10px 20px",border:"1px solid #2c3e3a",background:demandMode?"#2c3e3a":"#fff",color:demandMode?"#fff":"#2c3e3a",cursor:"pointer"}}>Demand Comparison</button>
      </div>

      {/* DEMAND COMPARISON MODE */}
      {demandMode&&<div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
          <div><S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Employees</S>
            <input type="range" min={5} max={300} value={empCount} onChange={e=>setEmpCount(+e.target.value)} style={{width:"100%",accentColor:"#2c3e3a"}}/>
            <S fontSize={16} fontWeight={600} color="#2c3e3a">{empCount}</S></div>
          <div><S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Pay Periods</S>
            <input type="range" min={1} max={52} value={ppCount} onChange={e=>setPpCount(+e.target.value)} style={{width:"100%",accentColor:"#2c3e3a"}}/>
            <S fontSize={16} fontWeight={600} color="#2c3e3a">{ppCount}</S></div>
        </div>
        {/* Comparison table */}
        <div style={{marginBottom:20}}>
          {items.map((item,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"180px 1fr 1fr 1fr 80px",gap:0,borderBottom:"1px solid #f0f0f0",padding:"8px 0",alignItems:"center"}}>
              <S fontSize={12} fontWeight={500} color="#333">{item.code}</S>
              <div style={{textAlign:"right",paddingRight:16}}>
                <S fontSize={11} color="#dc3545">{fmt(empCount*ppCount*item.plaintiffRate)}</S>
                <S fontSize={9} color="#999">${item.plaintiffRate}/emp/pp</S>
              </div>
              <div style={{textAlign:"center"}}><S fontSize={14} color="#999">→</S></div>
              <div style={{textAlign:"right",paddingRight:16}}>
                <S fontSize={11} color="#198754" fontWeight={600}>{fmt(empCount*ppCount*item.rate)}</S>
                <S fontSize={9} color="#999">${item.rate}/emp/pp</S>
              </div>
              <div style={{textAlign:"right"}}>
                <S fontSize={10} fontWeight={600} color={item.plaintiffRate>item.rate?"#dc3545":"#198754"}>{item.plaintiffRate>item.rate?`-${Math.round(((item.plaintiffRate-item.rate)/item.plaintiffRate)*100)}%`:"="}</S>
              </div>
            </div>
          ))}
        </div>
        {/* Aggregate comparison */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 60px 1fr",gap:0,marginBottom:20}}>
          <div style={{padding:24,background:"#fff0f0",border:"1px solid #f0c0c0",textAlign:"center"}}>
            <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#dc3545" marginBottom={8}>What Plaintiff Demands</S>
            <S fontSize={28} fontWeight={700} color="#dc3545">{fmt(plaintiffTotal)}</S>
            <S fontSize={10} color="#999">Includes wages, inflated rates, and non-recoverable amounts</S>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><S fontSize={24} color="#999">→</S></div>
          <div style={{padding:24,background:"#f0fff0",border:"1px solid #c0e0c0",textAlign:"center"}}>
            <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#198754" marginBottom={8}>What PAGA Actually Authorizes</S>
            <S fontSize={28} fontWeight={700} color="#198754">{fmt(correctTotal)}</S>
            <S fontSize={10} color="#999">Civil penalties only, at correct statutory rates</S>
          </div>
        </div>
        <div style={{padding:20,background:"#fafafa",border:"1px solid #eee",textAlign:"center"}}>
          <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>Demand Inflation</S>
          <S fontSize={48} fontWeight={700} color="#dc3545">{reduction}%</S>
          <S fontSize={12} color="#888">of plaintiff's demand is non-recoverable through PAGA</S>
          <S fontSize={11} color="#999" marginTop={8}>Savings from applying ZB, N.A. and Kirby: {fmt(plaintiffTotal-correctTotal)}</S>
        </div>
        {/* WATERFALL CHART */}
        <DemandWaterfall items={items} empCount={empCount} ppCount={ppCount} />
      </div>}

      {/* CATEGORY ANALYSIS MODE */}
      {!demandMode&&<div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:24}}>
          {items.map((item,i)=>(
            <button key={i} onClick={()=>setSelected(selected===i?null:i)} style={{fontFamily:"'Outfit',sans-serif",fontSize:12,padding:"10px 18px",border:"1px solid "+(selected===i?"#2c3e3a":"#ddd"),background:selected===i?"#2c3e3a":"#fff",color:selected===i?"#fff":"#666",cursor:"pointer",transition:"all .2s"}}>
              <span style={{display:"inline-block",width:8,height:8,borderRadius:"50%",background:colors[item.recoverable],marginRight:8}}/>{item.code} — {item.name}
            </button>
          ))}
        </div>

        {selected!==null&&<div style={{border:"1px solid #e0e0e0",overflow:"hidden"}}>
          <div style={{padding:"16px 24px",background:"#fafafa",borderBottom:"1px solid #e0e0e0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <S fontSize={16} fontWeight={700} color="#1a1a1a">{items[selected].code} — {items[selected].name}</S>
              <S fontSize={11} color="#999" marginTop={4}>Penalty rate: {items[selected].penalty}</S>
            </div>
            <div style={{padding:"6px 16px",border:"1px solid "+(colors[items[selected].recoverable]),background:""+(colors[items[selected].recoverable])+"11",display:"inline-block"}}>
              <S fontSize={11} fontWeight={600} letterSpacing={2} textTransform="uppercase" color={colors[items[selected].recoverable]}>{labels[items[selected].recoverable]}</S>
            </div>
          </div>
          <div style={{padding:24}}>
            <div style={{marginBottom:20}}>
              <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>Analysis</S>
              <S fontSize={13} lineHeight="1.8" color="#555">{items[selected].analysis}</S>
            </div>
            <div style={{marginBottom:20}}>
              <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>Governing Authority</S>
              <S fontSize={12} color="#888" fontStyle="italic">{items[selected].authority}</S>
            </div>
            <div style={{padding:16,background:"#f0fff0",border:"1px solid #c0e0c0"}}>
              <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#198754" marginBottom={8}>Defense Strategy</S>
              <S fontSize={13} lineHeight="1.8" color="#555">{items[selected].defense}</S>
            </div>
          </div>
        </div>}

        {selected===null&&<div style={{padding:40,textAlign:"center",color:"#ccc"}}><S fontSize={13}>Select a violation category above to see the recoverability analysis.</S></div>}
      </div>}

      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#2c3e3a",marginBottom:8,display:"flex",alignItems:"center",gap:6,cursor:"pointer"}} onClick={()=>{const el=document.getElementById("section-insights");if(el)el.scrollIntoView({behavior:"smooth",block:"start"})}}><span style={{fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Read the Analysis</span><span style={{color:"#999"}}>Recoverable vs. Non-Recoverable Penalties Under PAGA →</span></div>
      <S fontSize={10} color="#bbb" marginTop={16} fontStyle="italic">For illustrative purposes only. Recoverability analysis based on ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175 and Kirby v. Immoos Fire Protection (2012) 53 Cal.4th 1244. Plaintiff demand rates are illustrative estimates of typical inflated demands, not actual statutory rates.</S>
    </div>
  );
}

export default RecoverCheck;
