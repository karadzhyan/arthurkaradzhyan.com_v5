"use client";
import { useState, useEffect, useRef } from "react";
import S from "../S";

function PagaCalc(){
  const [employees,setEmployees]=useState(50);
  const [periods,setPeriods]=useState(26);
  const [capTrack,setCapTrack]=useState("none");
  const [showDerivative,setShowDerivative]=useState(false);
  const [showBifurcation,setShowBifurcation]=useState(false);
  const [legacyPct,setLegacyPct]=useState(50);
  const [legacyRate,setLegacyRate]=useState(60);
  const [remediedRate,setRemediedRate]=useState(12);
  const [reformMode,setReformMode]=useState("post");
  const [base,setBase]=useState(20); // avg hourly rate for class damages calculation // "pre" = pre-June 19 2024, "post" = post-reform
  const [weeklyPay,setWeeklyPay]=useState(false); // § 2699(o) halving for weekly pay periods

  // Violation categories — rates adjust based on reform mode
  // Post-reform: default penalty is $100 (not $200) unless malicious/fraudulent/oppressive or prior finding (§ 2699(f)(2)(B))
  // Specific penalties (§ 226(e) $100, § 1197.1 $250) are unchanged by reform
  const preReformCats=[
    {id:"meal",name:"Meal Period",code:"§ 226.7",rate:200,specific:false,on:true,vRate:35},
    {id:"rest",name:"Rest Period",code:"§ 226.7",rate:200,specific:false,on:true,vRate:30},
    {id:"wage",name:"Wage Statement",code:"§ 226(e)",rate:100,specific:true,on:false,vRate:40},
    {id:"ot",name:"Overtime / Regular Rate",code:"§ 510",rate:200,specific:false,on:false,vRate:25},
    {id:"expense",name:"Expense Reimbursement",code:"§ 2802",rate:200,specific:false,on:false,vRate:15},
    {id:"minwage",name:"Minimum Wage",code:"§ 1197.1",rate:250,specific:true,on:false,vRate:5},
    {id:"final",name:"Final Pay Timing",code:"§ 203",rate:200,specific:false,on:false,vRate:20},
  ];
  const postReformCats=[
    {id:"meal",name:"Meal Period",code:"§ 226.7",rate:100,specific:false,on:true,vRate:35},
    {id:"rest",name:"Rest Period",code:"§ 226.7",rate:100,specific:false,on:true,vRate:30},
    {id:"wage",name:"Wage Statement",code:"§ 226(e)",rate:100,specific:true,on:false,vRate:40},
    {id:"ot",name:"Overtime / Regular Rate",code:"§ 510",rate:100,specific:false,on:false,vRate:25},
    {id:"expense",name:"Expense Reimbursement",code:"§ 2802",rate:100,specific:false,on:false,vRate:15},
    {id:"minwage",name:"Minimum Wage",code:"§ 1197.1",rate:250,specific:true,on:false,vRate:5},
    {id:"final",name:"Final Pay Timing",code:"§ 203",rate:100,specific:false,on:false,vRate:20},
  ];
  const [cats,setCats]=useState(postReformCats);
  // Sync cats when reform mode changes
  const switchReform=(mode)=>{setReformMode(mode);setCats(p=>{const base=mode==="pre"?preReformCats:postReformCats;return base.map((b,i)=>({...b,on:p[i]?p[i].on:b.on,vRate:p[i]?p[i].vRate:b.vRate}))});};

  const toggle=(id)=>setCats(p=>p.map(c=>c.id===id?{...c,on:!c.on}:c));
  const setVRate=(id,v)=>setCats(p=>p.map(c=>c.id===id?{...c,vRate:v}:c));
  const active=cats.filter(c=>c.on);

  // Calculate exposure per category
  const calcCatExposure=(cat)=>{
    const weeklyHalf=(weeklyPay&&reformMode==="post")?0.5:1; // § 2699(o)
    if(!showBifurcation){
      return employees*periods*cat.rate*(cat.vRate/100)*weeklyHalf;
    }
    const legacyPeriods=Math.round(periods*(legacyPct/100));
    const remediedPeriods=periods-legacyPeriods;
    const legExp=employees*legacyPeriods*cat.rate*(legacyRate/100)*weeklyHalf;
    const remExp=employees*remediedPeriods*cat.rate*(remediedRate/100)*weeklyHalf;
    return legExp+remExp;
  };

  const baseExposure=active.reduce((s,c)=>s+calcCatExposure(c),0);

  // Derivative: meal/rest triggers § 226 wage statement stacking (Naranjo)
  // Post-reform: § 2699(i) limits derivative stacking for non-knowing § 226 and non-willful §§ 201-203 violations
  const mealRestOn=(cats.find(c=>c.id==="meal")||{}).on||(cats.find(c=>c.id==="rest")||{}).on;
  const derivativeExp=(showDerivative&&mealRestOn)?(reformMode==="pre"?employees*periods*100*0.35:Math.round(employees*periods*100*0.35*0.25)):0; // post-reform: substantially reduced per § 2699(i)

  const totalExposure=Math.round(baseExposure+derivativeExp);

  // Penalty cap
  const capMult=capTrack==="15"?0.15:capTrack==="30"?0.30:1;
  const cappedTotal=Math.round(totalExposure*capMult);

  const [showClassDamages,setShowClassDamages]=useState(false);

  // Class damages calculation (separate from PAGA penalties)
  // These are WAGES owed, not penalties — recoverable through class action, not PAGA
  const classRates={meal:25,rest:25,ot:15,expense:50,minwage:16.50,final:0,wage:0}; // avg underpayment per employee per period
  const classDamages=showClassDamages?active.reduce((s,c)=>{
    const rate=classRates[c.id]||0;
    return s+(employees*periods*rate*(c.vRate/100));
  },0):0;
  const classInterest=Math.round(classDamages*0.07); // 7% prejudgment interest (1 year est)
  const avgHourly=base; // use base rate from context if available, fallback to $17
  const classWaiting=showClassDamages?(employees*0.3*30*avgHourly*8):0; // 30% separated, 30 days, avg hourly × 8hrs
  const classFees=Math.round((classDamages+classInterest)*0.33); // lodestar est
  const totalClassTrack=Math.round(classDamages+classInterest+classWaiting+classFees);
  const grandTotal=totalExposure+totalClassTrack;

  // Three scenarios
  const worst=totalExposure;
  // Realistic: reduce each category's violation rate by ~40% from user-set rates (capped at original)
  const realisticExposure=active.reduce((s,c)=>{const adjRate=Math.max(5,Math.round(c.vRate*0.6));const weeklyHalf=(weeklyPay&&reformMode==='post')?0.5:1;return s+(employees*periods*c.rate*(adjRate/100)*weeklyHalf)},0);
  const realistic=Math.round(realisticExposure+(showDerivative&&mealRestOn?(reformMode==='pre'?employees*periods*100*0.20:Math.round(employees*periods*100*0.20*0.25)):0));
  const best=Math.round(totalExposure*0.15);

  // Employee share (35% post-reform)
  const employeeShare35=Math.round(cappedTotal*0.35);
  const stateShare65=cappedTotal-employeeShare35;

  const fmt=(n)=>n>=1000000?`$${(n/1000000).toFixed(2)}M`:n>=1000?`$${Math.round(n).toLocaleString()}`:n>0?`$${n}`:"$0";

  return(
    <div style={{background:"#fff",border:"1px solid #e0e0e0",padding:"40px 40px 28px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#2c3e3a,#4a7a6f)"}}/>
      <S fontSize={10} fontWeight={500} letterSpacing={4} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>Interactive · Combined Exposure Estimator</S>
      <S fontSize={12} color="#999" marginBottom={24}>Dual-track model: PAGA penalties + class action damages. Per-category violation rates, penalty cap integration, derivative stacking, and temporal bifurcation.</S>

      {/* REFORM MODE + POPULATION INPUTS */}
      <div style={{marginBottom:20,padding:"16px 20px",background:reformMode==="pre"?"#fff8f0":"#f0fff0",border:"1px solid "+(reformMode==="pre"?"#f0e0c0":"#c0e0c0")}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color={reformMode==="pre"?"#CC8800":"#198754"} marginBottom={4}>{reformMode==="pre"?"Pre-Reform (Before June 19, 2024)":"Post-Reform (June 19, 2024+)"}</S>
            <S fontSize={11} color="#888">{reformMode==="pre"?"$100/$200 initial/subsequent penalties. Full derivative stacking. No penalty caps.":"$100 default penalty. $200 only for malicious/oppressive conduct or prior findings. Anti-stacking (§ 2699(i)). Penalty caps available."}</S>
          </div>
          <div style={{display:"flex",gap:0}}>
            <button onClick={()=>switchReform("pre")} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,padding:"7px 14px",border:"1px solid #2c3e3a",borderRight:"none",background:reformMode==="pre"?"#CC8800":"#fff",color:reformMode==="pre"?"#fff":"#888",cursor:"pointer"}}>Pre-Reform</button>
            <button onClick={()=>switchReform("post")} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,padding:"7px 14px",border:"1px solid #2c3e3a",background:reformMode==="post"?"#198754":"#fff",color:reformMode==="post"?"#fff":"#888",cursor:"pointer"}}>Post-Reform</button>
          </div>
        </div>
      </div>

      {/* POPULATION INPUTS */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:24}}>
        <div>
          <S fontSize={11} fontWeight={500} color="#555" marginBottom={8}>Aggrieved Employees</S>
          <input type="range" min={5} max={500} value={employees} onChange={e=>setEmployees(+e.target.value)} aria-label="Number of aggrieved employees" style={{width:"100%",accentColor:"#2c3e3a"}}/>
          <S fontSize={24} fontWeight={600} color="#2c3e3a">{employees}</S>
        </div>
        <div>
          <S fontSize={11} fontWeight={500} color="#555" marginBottom={8}>Pay Periods (1-Year PAGA Lookback)</S>
          <input type="range" min={1} max={52} value={periods} onChange={e=>setPeriods(+e.target.value)} aria-label="Number of pay periods" style={{width:"100%",accentColor:"#2c3e3a"}}/>
          <S fontSize={24} fontWeight={600} color="#2c3e3a">{periods} <span style={{fontSize:12,color:"#999"}}>{periods<=26?"bi-weekly":"weekly"}</span></S>
        </div>
      </div>

      {/* VIOLATION CATEGORIES WITH PER-CATEGORY VIOLATION RATES */}
      <S fontSize={11} fontWeight={500} color="#555" marginBottom={10}>Violation Categories · Per-Category Violation Rates</S>
      <div style={{marginBottom:24}}>
        {cats.map(c=>(
          <div key={c.id} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:"1px solid #f5f5f5"}}>
            <button onClick={()=>toggle(c.id)} style={{width:20,height:20,border:"2px solid "+(c.on?"#2c3e3a":"#ccc"),background:c.on?"#2c3e3a":"#fff",color:"#fff",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{c.on?"✓":""}</button>
            <div style={{flex:"0 0 200px"}}>
              <S fontSize={12} color={c.on?"#333":"#aaa"} fontWeight={c.on?600:400}>{c.name}</S>
              <S fontSize={10} color="#bbb">{c.code} · ${c.rate}{c.specific?" (specific)":" (default)"}</S>
            </div>
            {c.on&&!showBifurcation&&<div style={{flex:1,display:"flex",alignItems:"center",gap:8}}>
              <input type="range" min={1} max={100} value={c.vRate} onChange={e=>setVRate(c.id,+e.target.value)} style={{flex:1,accentColor:"#2c3e3a"}}/>
              <S fontSize={13} fontWeight={600} color="#2c3e3a" style={{width:45,textAlign:"right"}}>{c.vRate}%</S>
            </div>}
            {c.on&&showBifurcation&&<div style={{flex:1,display:"flex",alignItems:"center",gap:8,opacity:.35}}>
              <S fontSize={11} color="#999" fontStyle="italic">Using bifurcated rates</S>
            </div>}
            {c.on&&!showBifurcation&&<S fontSize={11} color="#999" style={{flex:"0 0 90px",textAlign:"right"}}>{fmt(calcCatExposure(c))}</S>}
            {c.on&&showBifurcation&&<S fontSize={11} color="#999" style={{flex:"0 0 90px",textAlign:"right"}}>{fmt(calcCatExposure(c))}</S>}
          </div>
        ))}
      </div>

      {/* CONTROLS ROW */}
      <div style={{display:"flex",gap:16,marginBottom:24,flexWrap:"wrap"}}>
        {/* Penalty Cap - only available post-reform */}
        <div style={{opacity:reformMode==="pre"?0.35:1}}>
          <S fontSize={10} fontWeight={500} color="#555" marginBottom={6}>Penalty Cap {reformMode==="pre"?"(Post-Reform Only)":"(§§ 2699(g), 2699(h))"}</S>
          <div style={{display:"flex"}}>
            {[["none","No Cap"],["30","30%"],["15","15%"]].map(([v,l])=>(
              <button key={v} onClick={()=>{if(reformMode==="post")setCapTrack(v)}} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,padding:"7px 14px",border:"1px solid #2c3e3a",borderRight:v!=="15"?"none":undefined,background:capTrack===v&&reformMode==="post"?"#2c3e3a":"#fff",color:capTrack===v&&reformMode==="post"?"#fff":"#2c3e3a",cursor:reformMode==="pre"?"not-allowed":"pointer"}}>{l}</button>
            ))}
          </div>
        </div>
        {/* Derivative Stacking */}
        <div>
          <S fontSize={10} fontWeight={500} color="#555" marginBottom={6}>Naranjo Derivative Stacking{reformMode==="post"?" (limited by § 2699(i))":""}</S>
          <button onClick={()=>setShowDerivative(!showDerivative)} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,padding:"7px 14px",border:"1px solid "+(showDerivative?"#2c3e3a":"#ccc"),background:showDerivative?"#2c3e3a":"#fff",color:showDerivative?"#fff":"#888",cursor:"pointer"}}>{showDerivative?"✓ ":""}§ 226 Wage Statement</button>
        </div>
        {/* Two Hotels Bifurcation */}
        <div>
          <S fontSize={10} fontWeight={500} color="#555" marginBottom={6}>Pre/Post Compliance Split</S>
          <button onClick={()=>setShowBifurcation(!showBifurcation)} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,padding:"7px 14px",border:"1px solid "+(showBifurcation?"#2c3e3a":"#ccc"),background:showBifurcation?"#2c3e3a":"#fff",color:showBifurcation?"#fff":"#888",cursor:"pointer"}}>{showBifurcation?"✓ ":""}Split PAGA Period</button>
        </div>
        {/* Class Damages Track */}
        <div>
          <S fontSize={10} fontWeight={500} color="#555" marginBottom={6}>Class Action Damages Track</S>
          <button onClick={()=>setShowClassDamages(!showClassDamages)} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,padding:"7px 14px",border:"1px solid "+(showClassDamages?"#dc3545":"#ccc"),background:showClassDamages?"#dc3545":"#fff",color:showClassDamages?"#fff":"#888",cursor:"pointer"}}>{showClassDamages?"✓ ":""}Wages + Interest + Fees</button>
        </div>
        {/* Weekly Pay Period Halving - post-reform only */}
        {reformMode==="post"&&<div>
          <S fontSize={10} fontWeight={500} color="#555" marginBottom={6}>Weekly Pay Period (§ 2699(o))</S>
          <button onClick={()=>setWeeklyPay(!weeklyPay)} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,padding:"7px 14px",border:"1px solid "+(weeklyPay?"#2c3e3a":"#ccc"),background:weeklyPay?"#2c3e3a":"#fff",color:weeklyPay?"#fff":"#888",cursor:"pointer"}}>{weeklyPay?"✓ ":""}Halve Penalties</button>
        </div>}
      </div>

      {/* TWO HOTELS BIFURCATION CONTROLS */}
      {showBifurcation&&<div style={{padding:20,background:"#f8faf9",border:"1px solid #e0e8e6",marginBottom:24}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#2c3e3a" marginBottom={12}>Period Split — Pre-Compliance vs. Post-Compliance</S>
        <S fontSize={11} color="#888" marginBottom={16}>Split the PAGA period into Legacy (pre-compliance transformation) and Remedied (post-transformation) periods. Different violation rates apply to each period. Per-category sliders above are overridden when bifurcation is active.</S>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
          <div>
            <S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Legacy Period ({Math.round(periods*(legacyPct/100))} pay periods)</S>
            <input type="range" min={10} max={90} value={legacyPct} onChange={e=>setLegacyPct(+e.target.value)} style={{width:"100%",accentColor:"#dc3545"}}/>
            <S fontSize={14} fontWeight={600} color="#dc3545">{legacyPct}% of PAGA period</S>
          </div>
          <div>
            <S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Legacy Violation Rate</S>
            <input type="range" min={5} max={100} value={legacyRate} onChange={e=>setLegacyRate(+e.target.value)} style={{width:"100%",accentColor:"#dc3545"}}/>
            <S fontSize={14} fontWeight={600} color="#dc3545">{legacyRate}%</S>
          </div>
          <div>
            <S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Remedied Violation Rate</S>
            <input type="range" min={0} max={50} value={remediedRate} onChange={e=>setRemediedRate(+e.target.value)} style={{width:"100%",accentColor:"#198754"}}/>
            <S fontSize={14} fontWeight={600} color="#198754">{remediedRate}%</S>
          </div>
        </div>
        {/* Visual period bar */}
        <div style={{marginTop:16,height:24,display:"flex",borderRadius:2,overflow:"hidden"}}>
          <div style={{width:legacyPct+"%",background:"linear-gradient(90deg,#dc3545,#e06070)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <S fontSize={9} fontWeight={600} color="#fff">LEGACY · {legacyRate}%</S>
          </div>
          <div style={{width:(100-legacyPct)+"%",background:"linear-gradient(90deg,#198754,#28a070)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <S fontSize={9} fontWeight={600} color="#fff">REMEDIED · {remediedRate}%</S>
          </div>
        </div>
      </div>}

      {/* THREE-SCENARIO OUTPUT */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:16}}>
        {[["Plaintiff Maximum",worst,"#dc3545"],["Data-Driven Realistic",realistic,"#1a5276"],["Defense Best Case",best,"#198754"]].map(([label,val,color])=>(
          <div key={label} style={{padding:20,background:"#fafafa",borderTop:"3px solid "+(color),textAlign:"center"}}>
            <S fontSize={10} fontWeight={500} letterSpacing={2} textTransform="uppercase" color="#999" marginBottom={8}>{label}</S>
            <S fontSize={28} fontWeight={700} color={color} marginBottom={4}>{active.length?fmt(val):"—"}</S>
            {capTrack!=="none"&&active.length>0&&<S fontSize={11} color="#999">With {capTrack}% cap: {fmt(Math.round(val*capMult))}</S>}
          </div>
        ))}
      </div>

      {/* BREAKDOWN TABLE */}
      {active.length>0&&<div style={{padding:16,background:"#fafafa",border:"1px solid #eee",marginBottom:12}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#2c3e3a" marginBottom={12}>Penalty Breakdown</S>
        {active.map(c=>(
          <div key={c.id} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #f0f0f0"}}>
            <S fontSize={12} color="#666">{c.name} ({c.code}) · {showBifurcation?"bifurcated":`${c.vRate}% violation rate`}</S>
            <S fontSize={12} fontWeight={600} color="#333">{fmt(calcCatExposure(c))}</S>
          </div>
        ))}
        {showDerivative&&mealRestOn&&<div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #f0f0f0"}}>
          <S fontSize={12} color="#CC8800">+ Derivative: § 226 wage statement (Naranjo)</S>
          <S fontSize={12} fontWeight={600} color="#CC8800">{fmt(derivativeExp)}</S>
        </div>}
        <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0"}}>
          <S fontSize={13} fontWeight={700} color="#2c3e3a">Total Exposure</S>
          <S fontSize={13} fontWeight={700} color="#2c3e3a">{fmt(totalExposure)}</S>
        </div>
        {capTrack!=="none"&&<div style={{display:"flex",justifyContent:"space-between",background:"#f0fff0",margin:"0 -16px",padding:"8px 16px"}}>
          <S fontSize={13} fontWeight={700} color="#198754">After {capTrack}% Cap</S>
          <S fontSize={13} fontWeight={700} color="#198754">{fmt(cappedTotal)} <span style={{fontWeight:400,fontSize:11}}>(savings: {fmt(totalExposure-cappedTotal)})</span></S>
        </div>}
        {/* Distribution */}
        <div style={{marginTop:12,padding:"12px 0",borderTop:"1px solid #e0e0e0"}}>
          <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#999" marginBottom={8}>Settlement Distribution (Post-Reform: 35% Employee / 65% LWDA)</S>
          <div style={{display:"flex",gap:16}}>
            <div style={{flex:1,padding:12,background:"#fff",border:"1px solid #eee",textAlign:"center"}}>
              <S fontSize={10} color="#999">Employee Share (35%)</S>
              <S fontSize={18} fontWeight={700} color="#2c3e3a">{fmt(Math.round(cappedTotal*0.35))}</S>
            </div>
            <div style={{flex:1,padding:12,background:"#fff",border:"1px solid #eee",textAlign:"center"}}>
              <S fontSize={10} color="#999">LWDA Share (65%)</S>
              <S fontSize={18} fontWeight={700} color="#666">{fmt(Math.round(cappedTotal*0.65))}</S>
            </div>
            <div style={{flex:1,padding:12,background:"#fff",border:"1px solid #eee",textAlign:"center"}}>
              <S fontSize={10} color="#999">Attorney Fees (est. 33%)</S>
              <S fontSize={18} fontWeight={700} color="#999">{fmt(Math.round(cappedTotal*0.35*0.33))}</S>
            </div>
          </div>
        </div>
      </div>}

      {/* DUAL-TRACK COMPARISON */}
      {showClassDamages&&active.length>0&&<div style={{padding:20,border:"1px solid #e0e0e0",marginBottom:16}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#2c3e3a" marginBottom={16}>Dual-Track Exposure: Class Damages + PAGA Penalties</S>
        <div style={{display:"grid",gridTemplateColumns:"1fr 32px 1fr 32px 1fr",gap:0,alignItems:"stretch"}}>
          <div style={{padding:20,background:"#fafafa",borderTop:"3px solid #dc3545",textAlign:"center"}}>
            <S fontSize={10} fontWeight={500} letterSpacing={2} textTransform="uppercase" color="#dc3545" marginBottom={10}>Class Action Track</S>
            <S fontSize={24} fontWeight={700} color="#dc3545" marginBottom={10}>{fmt(totalClassTrack)}</S>
            <S fontSize={10} color="#999">Wages owed: {fmt(classDamages)}</S>
            <S fontSize={10} color="#999">Prejudgment interest: {fmt(classInterest)}</S>
            <S fontSize={10} color="#999">§ 203 waiting time: {fmt(classWaiting)}</S>
            <S fontSize={10} color="#999">Attorney fees (est.): {fmt(classFees)}</S>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><S fontSize={18} color="#ccc">+</S></div>
          <div style={{padding:20,background:"#fafafa",borderTop:"3px solid #2c3e3a",textAlign:"center"}}>
            <S fontSize={10} fontWeight={500} letterSpacing={2} textTransform="uppercase" color="#2c3e3a" marginBottom={10}>PAGA Penalty Track</S>
            <S fontSize={24} fontWeight={700} color="#2c3e3a" marginBottom={10}>{fmt(capTrack!=="none"?cappedTotal:totalExposure)}</S>
            <S fontSize={10} color="#999">Civil penalties: {fmt(totalExposure)}</S>
            {capTrack!=="none"&&<S fontSize={10} color="#198754">After {capTrack}% cap: {fmt(cappedTotal)}</S>}
            <S fontSize={10} color="#999">Employee share (35%): {fmt(Math.round((capTrack!=="none"?cappedTotal:totalExposure)*0.35))}</S>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><S fontSize={18} color="#ccc">=</S></div>
          <div style={{padding:20,background:"#f0f5f4",borderTop:"3px solid #2c3e3a",textAlign:"center"}}>
            <S fontSize={10} fontWeight={500} letterSpacing={2} textTransform="uppercase" color="#2c3e3a" marginBottom={10}>Combined Exposure</S>
            <S fontSize={28} fontWeight={700} color="#2c3e3a" marginBottom={10}>{fmt(totalClassTrack+(capTrack!=="none"?cappedTotal:totalExposure))}</S>
            <S fontSize={10} color="#888">Settlement anchor for</S>
            <S fontSize={10} color="#888">carrier authority recommendation.</S>
          </div>
        </div>
        <S fontSize={10} color="#bbb" marginTop={12}>Class damages are wage recovery (§ 1194, UCL), not PAGA penalties. The two tracks are additive at settlement but legally distinct. Actual class damages require forensic payroll analysis.</S>
      </div>}

      {/* STRATEGIC NOTE - honesty about bad positions */}
      {active.length>0&&capTrack==="none"&&totalExposure>500000&&<div style={{padding:16,background:"#fff8f0",border:"1px solid #f0e0c0",marginBottom:12}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#CC8800" marginBottom={8}>Honest Assessment</S>
        <S fontSize={12} lineHeight="1.8" color="#888">At this documentation level with no penalty cap applied, consider whether early mediation at a higher settlement range is more cost-effective than litigating. The realistic exposure ({fmt(realistic)}) reflects substantial proven violations. Penalty cap qualification through immediate remediation may be the highest-ROI investment available.</S>
      </div>}

      {/* COPY SUMMARY */}
      {active.length>0&&<button onClick={()=>{const t=`PAGA Exposure Estimate (Preliminary)${reformMode==="post"?" — Post-Reform (AB 2288/SB 92)":""}\nEmployees: ${employees} | Pay Periods: ${periods}${weeklyPay?" (weekly — penalties halved per § 2699(o))":""}\nViolations: ${active.map(c=>`${c.name} (${c.vRate}%)`).join(", ")}\nPlaintiff Maximum: ${fmt(worst)}\nData-Driven Realistic: ${fmt(realistic)}\nDefense Best Case: ${fmt(best)}${capTrack!=="none"?`\nPenalty Cap: ${capTrack}% (§ 2699(${capTrack==="15"?"g":"h"})(1)) | Capped Realistic: ${fmt(Math.round(realistic*capMult))}`:""}${showBifurcation?`\nBifurcation: Legacy ${legacyPct}% at ${legacyRate}% | Remedied ${100-legacyPct}% at ${remediedRate}%`:""}${showClassDamages?`\nClass Action Damages Track: ${fmt(totalClassTrack)}\nCombined Exposure: ${fmt(totalClassTrack+(capTrack!=="none"?cappedTotal:totalExposure))}`:""}\n—\nFor illustrative purposes only. Not legal advice.`;try{if(navigator.clipboard){navigator.clipboard.writeText(t).then(()=>{const btn=document.activeElement;if(btn){btn.textContent="\u2713 Copied";setTimeout(()=>{btn.textContent="Copy Summary to Clipboard"},2000)}})}else{const ta=document.createElement("textarea");ta.value=t;ta.style.position="fixed";ta.style.left="-9999px";document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta)}}catch(e){}}} style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",padding:"8px 16px",background:"#fff",border:"1px solid #2c3e3a",color:"#2c3e3a",cursor:"pointer",marginBottom:12,transition:"all .2s"}}>Copy Summary to Clipboard</button>}

      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#2c3e3a",marginBottom:8,display:"flex",alignItems:"center",gap:6,cursor:"pointer"}} onClick={()=>{const el=document.getElementById("section-insights");if(el)el.scrollIntoView({behavior:"smooth",block:"start"})}}><span style={{fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Read the Analysis</span><span style={{color:"#999"}}>The "Two Hotels" Framework: Temporal Bifurcation in PAGA Penalty Analysis →</span></div>
      <S fontSize={10} color="#bbb" fontStyle="italic">For illustrative purposes only. Actual exposure depends on facts, evidence, and applicable defenses. Post-reform (June 19, 2024+): default penalty $100/employee/pay period (§ 2699(f)(2)(A)); $200 only for malicious/oppressive conduct or prior findings (§ 2699(f)(2)(B)). Penalty caps: 15% (§ 2699(g)(1)); 30% (§ 2699(h)(1)). Anti-stacking: § 2699(i). Weekly halving: § 2699(o). PAGA employee share: 35% (§ 2699(m)). Derivative stacking per Naranjo v. Spectrum Security (2022) 13 Cal.5th 93, limited post-reform by § 2699(i). "Two Hotels" temporal bifurcation is an analytical methodology, not a statutory framework. Class damages estimates are illustrative — actual damages require forensic payroll analysis.</S>
    </div>
  );
}

export default PagaCalc;
