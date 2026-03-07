"use client";
import { useState, useEffect, useRef } from "react";
import S from "../S";

function RegRateCalc(){
  const [base,setBase]=useState(17);
  const [hours,setHours]=useState(45);
  const [comps,setComps]=useState([{id:1,type:"commission",label:"Commission",amount:3200}]);
  const [missedMeals,setMissedMeals]=useState(1);
  const [missedRests,setMissedRests]=useState(0);
  const [scenario,setScenario]=useState(null);
  const [weeksToExtrapolate,setWeeksToExtrapolate]=useState(52);
  const [empCount,setEmpCount]=useState(25);
  const nextId=useRef(2);

  const scenarios={
    dealership:{base:15,hours:45,comps:[{id:99,type:"commission",label:"Monthly Commission",amount:3200}],missedMeals:2,missedRests:1,label:"Car Dealership Salesperson"},
    hotel:{base:17,hours:42,comps:[{id:99,type:"bonus",label:"Attendance Bonus",amount:150}],missedMeals:1,missedRests:1,label:"Hotel Room Attendant"},
    solar:{base:18,hours:50,comps:[{id:99,type:"piecerate",label:"Panel Incentive",amount:600}],missedMeals:2,missedRests:2,label:"Solar Installer"},
    server:{base:16.50,hours:38,comps:[{id:99,type:"service",label:"Service Charge Distribution",amount:400}],missedMeals:1,missedRests:0,label:"Restaurant Server"},
  };

  const apply=(k)=>{const s=scenarios[k];setBase(s.base);setHours(s.hours);setComps(s.comps);setMissedMeals(s.missedMeals);setMissedRests(s.missedRests);setScenario(k)};
  const addComp=()=>{setComps(p=>[...p,{id:nextId.current++,type:"bonus",label:"Bonus",amount:0}])};
  const removeComp=(id)=>setComps(p=>p.filter(c=>c.id!==id));
  const updateComp=(id,field,val)=>setComps(p=>p.map(c=>c.id===id?{...c,[field]:val}:c));

  // Calculations
  const otHours=Math.max(0,hours-40);
  const regHours=Math.min(hours,40);
  const totalNonBase=comps.reduce((s,c)=>s+c.amount,0);

  // Regular rate: (base*all hours + non-discretionary comp) / total hours
  const totalStraightComp=(base*hours)+totalNonBase;
  const correctRegRate=hours>0?totalStraightComp/hours:base;

  // For flat-sum bonus: divide by non-OT hours only (Alvarado)
  const alvaradoRegRate=regHours>0?(base*regHours+totalNonBase)/regHours:base;
  const alvaradoOTRate=alvaradoRegRate*1.5;

  // What was likely paid (wrong method: OT at 1.5x base only)
  const wrongOT=otHours*base*0.5;
  const wrongMealPremium=missedMeals*base;
  const wrongRestPremium=missedRests*base;
  const wrongTotal=wrongOT+wrongMealPremium+wrongRestPremium;

  // What should have been paid (correct method)
  const correctOT=otHours*correctRegRate*0.5;
  const correctMealPremium=missedMeals*correctRegRate; // Ferra: regular rate
  const correctRestPremium=missedRests*correctRegRate;
  const correctTotal=correctOT+correctMealPremium+correctRestPremium;

  const weeklyGap=correctTotal-wrongTotal;
  const annualGap=weeklyGap*weeksToExtrapolate;
  const pagaGap=annualGap*empCount;

  const fmt=(n)=>`$${n.toFixed(2)}`;
  const fmtBig=(n)=>n>=1000000?`$${(n/1000000).toFixed(2)}M`:n>=1000?`$${Math.round(n).toLocaleString()}`:`$${Math.round(n)}`;

  return(
    <div style={{background:"#fff",border:"1px solid #e0e0e0",padding:"40px 40px 28px",position:"relative",overflow:"hidden",marginTop:32}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#2c3e3a,#4a7a6f)"}}/>
      <S fontSize={10} fontWeight={500} letterSpacing={4} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>Interactive · Regular Rate Calculator</S>
      <S fontSize={12} color="#999" marginBottom={24}>Calculates the correct regular rate under Ferra and Alvarado. Shows the gap between what was likely paid and what should have been paid, with PAGA extrapolation.</S>

      {/* SCENARIO PRESETS */}
      <S fontSize={11} fontWeight={500} color="#555" marginBottom={8}>Pre-Loaded Industry Scenarios</S>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:24}}>
        {Object.entries(scenarios).map(([k,s])=>(
          <button key={k} onClick={()=>apply(k)} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,padding:"7px 14px",border:"1px solid "+(scenario===k?"#2c3e3a":"#ddd"),background:scenario===k?"#2c3e3a":"#fff",color:scenario===k?"#fff":"#888",cursor:"pointer"}}>{s.label}</button>
        ))}
        <button onClick={()=>{setScenario(null);setComps([{id:1,type:"bonus",label:"Bonus",amount:0}])}} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,padding:"7px 14px",border:"1px solid #ddd",background:"#fff",color:"#888",cursor:"pointer"}}>Custom</button>
      </div>

      {/* BASE INPUTS */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:16,marginBottom:20}}>
        <div>
          <S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Base Rate ($/hr)</S>
          <input type="range" min={15} max={50} step={0.5} value={base} onChange={e=>setBase(+e.target.value)} style={{width:"100%",accentColor:"#2c3e3a"}}/>
          <S fontSize={18} fontWeight={600} color="#2c3e3a">${base.toFixed(2)}</S>
        </div>
        <div>
          <S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Hours Worked</S>
          <input type="range" min={20} max={60} value={hours} onChange={e=>setHours(+e.target.value)} style={{width:"100%",accentColor:"#2c3e3a"}}/>
          <S fontSize={18} fontWeight={600} color="#2c3e3a">{hours} hrs <span style={{fontSize:11,color:otHours>0?"#dc3545":"#999"}}>{otHours>0?`(${otHours} OT)`:""}</span></S>
        </div>
        <div>
          <S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Missed Meals</S>
          <input type="range" min={0} max={5} value={missedMeals} onChange={e=>setMissedMeals(+e.target.value)} style={{width:"100%",accentColor:"#2c3e3a"}}/>
          <S fontSize={18} fontWeight={600} color={missedMeals>0?"#dc3545":"#999"}>{missedMeals}</S>
        </div>
        <div>
          <S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Missed Rests</S>
          <input type="range" min={0} max={5} value={missedRests} onChange={e=>setMissedRests(+e.target.value)} style={{width:"100%",accentColor:"#2c3e3a"}}/>
          <S fontSize={18} fontWeight={600} color={missedRests>0?"#dc3545":"#999"}>{missedRests}</S>
        </div>
      </div>

      {/* ADDITIONAL COMPENSATION */}
      <S fontSize={11} fontWeight={500} color="#555" marginBottom={8}>Non-Discretionary Compensation (included in regular rate)</S>
      {comps.map(c=>(
        <div key={c.id} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
          <select value={c.type} onChange={e=>updateComp(c.id,"type",e.target.value)} style={{fontFamily:"'Outfit',sans-serif",fontSize:12,padding:"6px 10px",border:"1px solid #ddd",flex:"0 0 140px"}}>
            <option value="commission">Commission</option>
            <option value="bonus">Flat-Sum Bonus</option>
            <option value="piecerate">Piece-Rate</option>
            <option value="service">Service Charge</option>
            <option value="shift">Shift Differential</option>
          </select>
          <input type="text" value={c.label} onChange={e=>updateComp(c.id,"label",e.target.value)} placeholder="Label" style={{fontFamily:"'Outfit',sans-serif",fontSize:12,padding:"6px 10px",border:"1px solid #ddd",flex:"0 0 160px"}}/>
          <div style={{display:"flex",alignItems:"center",flex:1}}>
            <span style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"#999",marginRight:4}}>$</span>
            <input type="number" value={c.amount} onChange={e=>updateComp(c.id,"amount",+e.target.value)} style={{fontFamily:"'Outfit',sans-serif",fontSize:12,padding:"6px 10px",border:"1px solid #ddd",width:100}}/>
          </div>
          {comps.length>1&&<button onClick={()=>removeComp(c.id)} style={{fontFamily:"'Outfit',sans-serif",fontSize:14,color:"#dc3545",background:"none",border:"none",cursor:"pointer",padding:"4px 8px"}}>×</button>}
        </div>
      ))}
      <button onClick={addComp} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"#2c3e3a",background:"none",border:"1px dashed #2c3e3a",padding:"6px 16px",cursor:"pointer",marginBottom:24}}>+ Add Compensation Component</button>

      {/* RESULTS: SIDE BY SIDE */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,marginBottom:20}}>
        <div style={{padding:24,borderTop:"3px solid #dc3545",background:"#fafafa",borderRight:"1px solid #eee"}}>
          <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#dc3545" marginBottom={16}>What Was Likely Paid (Base Rate Method)</S>
          <div style={{marginBottom:6}}><S fontSize={11} color="#999">Overtime premium: {otHours} hrs × ${base.toFixed(2)} × 0.5</S><S fontSize={14} fontWeight={600} color="#333" style={{textAlign:"right"}}>{fmt(wrongOT)}</S></div>
          {missedMeals>0&&<div style={{marginBottom:6}}><S fontSize={11} color="#999">Meal premiums: {missedMeals} × ${base.toFixed(2)}</S><S fontSize={14} fontWeight={600} color="#333" style={{textAlign:"right"}}>{fmt(wrongMealPremium)}</S></div>}
          {missedRests>0&&<div style={{marginBottom:6}}><S fontSize={11} color="#999">Rest premiums: {missedRests} × ${base.toFixed(2)}</S><S fontSize={14} fontWeight={600} color="#333" style={{textAlign:"right"}}>{fmt(wrongRestPremium)}</S></div>}
          <div style={{borderTop:"1px solid #ddd",paddingTop:8,marginTop:8}}><S fontSize={12} fontWeight={700} color="#dc3545">Total: {fmt(wrongTotal)}</S></div>
        </div>
        <div style={{padding:24,borderTop:"3px solid #198754",background:"#fafafa"}}>
          <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#198754" marginBottom={16}>What Should Have Been Paid (Regular Rate Method)</S>
          <div style={{marginBottom:6}}><S fontSize={11} color="#999">Correct regular rate</S><S fontSize={14} fontWeight={600} color="#2c3e3a">{fmt(correctRegRate)}/hr <span style={{fontSize:11,color:"#999"}}>({fmt(correctRegRate-base)} above base)</span></S></div>
          <div style={{marginBottom:6}}><S fontSize={11} color="#999">Overtime premium: {otHours} hrs × {fmt(correctRegRate)} × 0.5</S><S fontSize={14} fontWeight={600} color="#333" style={{textAlign:"right"}}>{fmt(correctOT)}</S></div>
          {missedMeals>0&&<div style={{marginBottom:6}}><S fontSize={11} color="#999">Meal premiums (Ferra): {missedMeals} × {fmt(correctRegRate)}</S><S fontSize={14} fontWeight={600} color="#333" style={{textAlign:"right"}}>{fmt(correctMealPremium)}</S></div>}
          {missedRests>0&&<div style={{marginBottom:6}}><S fontSize={11} color="#999">Rest premiums (Ferra): {missedRests} × {fmt(correctRegRate)}</S><S fontSize={14} fontWeight={600} color="#333" style={{textAlign:"right"}}>{fmt(correctRestPremium)}</S></div>}
          <div style={{borderTop:"1px solid #ddd",paddingTop:8,marginTop:8}}><S fontSize={12} fontWeight={700} color="#198754">Total: {fmt(correctTotal)}</S></div>
        </div>
      </div>

      {/* UNDERPAYMENT + EXTRAPOLATION */}
      <div style={{padding:20,background:weeklyGap>0?"#fff0f0":"#f0fff0",border:"1px solid "+(weeklyGap>0?"#dc3545":"#198754"),textAlign:"center",marginBottom:16}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color={weeklyGap>0?"#dc3545":"#198754"} marginBottom={6}>{weeklyGap>0?"Weekly Underpayment Per Employee":"No Underpayment Detected"}</S>
        <S fontSize={32} fontWeight={700} color={weeklyGap>0?"#dc3545":"#198754"}>{weeklyGap>0?fmt(weeklyGap):"$0.00"}</S>
      </div>

      {weeklyGap>0&&<div style={{padding:20,background:"#fafafa",border:"1px solid #e0e0e0",marginBottom:16}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#2c3e3a" marginBottom={16}>PAGA Exposure Extrapolation</S>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:12}}>
          <div>
            <S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Weeks to Extrapolate</S>
            <input type="range" min={1} max={52} value={weeksToExtrapolate} onChange={e=>setWeeksToExtrapolate(+e.target.value)} style={{width:"100%",accentColor:"#2c3e3a"}}/>
            <S fontSize={14} fontWeight={600} color="#2c3e3a">{weeksToExtrapolate} weeks</S>
          </div>
          <div>
            <S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Similarly Situated Employees</S>
            <input type="range" min={1} max={200} value={empCount} onChange={e=>setEmpCount(+e.target.value)} style={{width:"100%",accentColor:"#2c3e3a"}}/>
            <S fontSize={14} fontWeight={600} color="#2c3e3a">{empCount}</S>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
          <div style={{padding:16,background:"#fff",border:"1px solid #eee",textAlign:"center"}}>
            <S fontSize={10} color="#999">Per Employee (Annual)</S>
            <S fontSize={20} fontWeight={700} color="#dc3545">{fmtBig(annualGap)}</S>
          </div>
          <div style={{padding:16,background:"#fff",border:"1px solid #eee",textAlign:"center"}}>
            <S fontSize={10} color="#999">All Employees (Wages Owed)</S>
            <S fontSize={20} fontWeight={700} color="#dc3545">{fmtBig(pagaGap)}</S>
          </div>
          <div style={{padding:16,background:"#fff",border:"1px solid #eee",textAlign:"center"}}>
            <S fontSize={10} color="#999">PAGA Penalty Exposure (est.)</S>
            <S fontSize={20} fontWeight={700} color="#2c3e3a">{fmtBig(empCount*26*200)}</S>
            <S fontSize={10} color="#bbb">{empCount} × 26 × $200 default</S>
          </div>
        </div>
        <S fontSize={10} color="#bbb" marginTop={8}>Wage underpayments are NOT recoverable as PAGA penalties (ZB, N.A. v. Superior Court). The PAGA penalty for overtime/regular rate violations is the default $100/$200. But wage underpayments create derivative § 226 and § 203 exposure.</S>
      </div>}

      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#2c3e3a",marginBottom:8,display:"flex",alignItems:"center",gap:6,cursor:"pointer"}} onClick={()=>{const el=document.getElementById("section-insights");if(el)el.scrollIntoView({behavior:"smooth",block:"start"})}}><span style={{fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Read the Analysis</span><span style={{color:"#999"}}>The Regular Rate Problem: Why Every Commission Plan Is a Ticking Clock →</span></div>
      <S fontSize={10} color="#bbb" fontStyle="italic">For illustrative purposes only. Regular rate under Alvarado v. Dart Container (2018) 4 Cal.5th 542 (flat-sum bonus: divide by non-OT hours). Premium calculation under Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858 (regular rate, not base rate). True-up obligations apply when compensation is earned in a prior workweek.</S>
    </div>
  );
}

export default RegRateCalc;
