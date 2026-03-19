"use client";
import { useState, useEffect, useRef } from "react";
import S from "../S";
import DerivativeCascadeDiagram from "../DerivativeCascadeDiagram";

function DerivativeMapper(){
  const [trigger,setTrigger]=useState("meal");
  const [empCount,setEmpCount]=useState(50);
  const [ppCount,setPpCount]=useState(26);
  const [separatedPct,setSeparatedPct]=useState(30);
  const [dailyWage,setDailyWage]=useState(200);
  const fmt=(n)=>n>=1000000?`$${(n/1000000).toFixed(2)}M`:n>=1000?`$${Math.round(n).toLocaleString()}`:`$${Math.round(n)}`;

  const chains={
    meal:{
      name:"Missed Meal Period",
      trigger:"Employer fails to provide a compliant 30-minute meal period",
      nodes:[
        {code:"§ 226.7",label:"Meal Period Premium",type:"wage",amount:"1 hour at regular rate",perUnit:"per violation",calc:(e,p)=>e*p*25,note:"Premium is a WAGE per Kirby — not recoverable as PAGA penalty. But it triggers every downstream penalty.",color:"#CC8800"},
        {code:"§ 2699(f)(2)",label:"PAGA Default Penalty",type:"penalty",amount:"$200 subsequent",perUnit:"per employee/pay period",calc:(e,p)=>e*p*200,note:"The actual PAGA penalty for the meal period violation itself. This IS recoverable.",color:"#2c3e3a"},
        {code:"§ 226(a)/(e)",label:"Wage Statement Penalty (Naranjo)",type:"penalty",amount:"$100 subsequent",perUnit:"per employee/pay period",calc:(e,p)=>e*p*100,note:"If the premium wasn't included on the wage statement, that's an independent § 226 violation. Naranjo v. Spectrum Security (2022) 13 Cal.5th 93.",color:"#dc3545"},
        {code:"§ 203",label:"Waiting Time Penalty",type:"penalty",amount:"Up to 30 days' wages",perUnit:"per separated employee",calc:(e,p,sep,dw)=>Math.round(e*(sep/100))*30*dw,note:"If the premium wasn't paid at separation, § 203 waiting time penalties apply. Only affects separated employees. Willfulness defense available under Mamika.",color:"#8B0000"},
      ]
    },
    rest:{
      name:"Missed Rest Period",
      trigger:"Employer fails to authorize a compliant 10-minute rest period",
      nodes:[
        {code:"§ 226.7",label:"Rest Period Premium",type:"wage",amount:"1 hour at regular rate",perUnit:"per violation",calc:(e,p)=>e*p*20,note:"Same framework as meal premiums — wage, not penalty. Triggers the same derivative chain.",color:"#CC8800"},
        {code:"§ 2699(f)(2)",label:"PAGA Default Penalty",type:"penalty",amount:"$200 subsequent",perUnit:"per employee/pay period",calc:(e,p)=>e*p*200,note:"The PAGA penalty for the rest period violation.",color:"#2c3e3a"},
        {code:"§ 226(a)/(e)",label:"Wage Statement Penalty (Naranjo)",type:"penalty",amount:"$100 subsequent",perUnit:"per employee/pay period",calc:(e,p)=>e*p*100,note:"If the premium wasn't itemized on the wage statement, independent § 226 violation.",color:"#dc3545"},
        {code:"§ 203",label:"Waiting Time Penalty",type:"penalty",amount:"Up to 30 days' wages",perUnit:"per separated employee",calc:(e,p,sep,dw)=>Math.round(e*(sep/100))*30*dw,note:"Applies to separated employees whose premiums weren't paid at termination.",color:"#8B0000"},
      ]
    },
    overtime:{
      name:"Overtime Underpayment",
      trigger:"Regular rate miscalculated — overtime premium underpaid",
      nodes:[
        {code:"§ 510/1194",label:"Underpaid Overtime Wages",type:"wage",amount:"Varies by underpayment",perUnit:"per employee/pay period",calc:(e,p)=>e*p*35,note:"The wage differential is NOT a PAGA penalty. Recoverable only through direct claim or UCL. But it triggers derivatives.",color:"#CC8800"},
        {code:"§ 2699(f)(2)",label:"PAGA Default Penalty",type:"penalty",amount:"$200 subsequent",perUnit:"per employee/pay period",calc:(e,p)=>e*p*200,note:"The PAGA penalty for the overtime violation itself.",color:"#2c3e3a"},
        {code:"§ 226(a)/(e)",label:"Wage Statement Penalty",type:"penalty",amount:"$100 subsequent",perUnit:"per employee/pay period",calc:(e,p)=>e*p*100,note:"If the wage statement shows an incorrect hourly rate (because the regular rate was wrong), that's an independent § 226 violation.",color:"#dc3545"},
        {code:"§ 210",label:"Late Payment Penalty",type:"penalty",amount:"$200 subsequent",perUnit:"per employee/pay period",calc:(e,p)=>e*p*200,note:"If the underpayment means wages weren't fully paid on the regular payday, § 210 applies. Often overlooked by both sides.",color:"#666"},
      ]
    },
    regrate:{
      name:"Regular Rate Error (Ferra)",
      trigger:"Meal/rest premiums calculated at base rate instead of regular rate",
      nodes:[
        {code:"§ 226.7",label:"Premium Underpayment (Ferra gap)",type:"wage",amount:"Difference between regular rate and base rate",perUnit:"per violation",calc:(e,p)=>e*p*15,note:"The gap between what was paid (base rate premium) and what should have been paid (regular rate premium). This is a wage, not a penalty.",color:"#CC8800"},
        {code:"§ 2699(f)(2)",label:"PAGA Default Penalty",type:"penalty",amount:"$200 subsequent",perUnit:"per employee/pay period",calc:(e,p)=>e*p*200,note:"Penalty for the incorrect premium calculation.",color:"#2c3e3a"},
        {code:"§ 226(a)/(e)",label:"Wage Statement Penalty",type:"penalty",amount:"$100 subsequent",perUnit:"per employee/pay period",calc:(e,p)=>e*p*100,note:"If the wage statement shows a premium at the base rate instead of the regular rate, the hourly rate shown is incorrect — § 226(a)(9) requires 'all applicable hourly rates.'",color:"#dc3545"},
        {code:"§ 203",label:"Waiting Time Penalty",type:"penalty",amount:"Up to 30 days' wages",perUnit:"per separated employee",calc:(e,p,sep,dw)=>Math.round(e*(sep/100))*30*dw,note:"If the underpaid premium differential wasn't included in final pay, § 203 applies to separated employees.",color:"#8B0000"},
      ]
    },
  };

  const chain=chains[trigger];
  const totalPenalties=chain.nodes.filter(n=>n.type==="penalty").reduce((s,n)=>s+n.calc(empCount,ppCount,separatedPct,dailyWage),0);
  const totalWages=chain.nodes.filter(n=>n.type==="wage").reduce((s,n)=>s+n.calc(empCount,ppCount,separatedPct,dailyWage),0);

  return(
    <div style={{background:"#fff",border:"1px solid #e0e0e0",padding:"40px 40px 28px",position:"relative",overflow:"hidden",marginTop:32}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#2c3e3a,#4a7a6f)"}}/>
      <S fontSize={10} fontWeight={500} letterSpacing={4} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>Interactive · Derivative Penalty Mapper</S>
      <S fontSize={12} color="#999" marginBottom={24}>One violation triggers a cascade of derivative penalties. This tool maps the chain from a single underlying violation through every downstream penalty it generates — showing how PAGA exposure multiplies.</S>

      {/* CASCADE DIAGRAM */}
      <DerivativeCascadeDiagram trigger={trigger} />

      {/* TRIGGER SELECTION */}
      <S fontSize={11} fontWeight={500} color="#555" marginBottom={8}>Triggering Violation</S>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
        {Object.entries(chains).map(([k,v])=>(
          <button key={k} onClick={()=>setTrigger(k)} style={{fontFamily:"'Outfit',sans-serif",fontSize:12,padding:"10px 18px",border:"1px solid "+(trigger===k?"#2c3e3a":"#ddd"),background:trigger===k?"#2c3e3a":"#fff",color:trigger===k?"#fff":"#666",cursor:"pointer"}}>{v.name}</button>
        ))}
      </div>

      {/* PARAMETERS */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:16,marginBottom:28}}>
        <div><S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Employees</S>
          <input type="range" min={5} max={300} value={empCount} onChange={e=>setEmpCount(+e.target.value)} style={{width:"100%",accentColor:"#2c3e3a"}}/>
          <S fontSize={16} fontWeight={600} color="#2c3e3a">{empCount}</S></div>
        <div><S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Pay Periods</S>
          <input type="range" min={1} max={52} value={ppCount} onChange={e=>setPpCount(+e.target.value)} style={{width:"100%",accentColor:"#2c3e3a"}}/>
          <S fontSize={16} fontWeight={600} color="#2c3e3a">{ppCount}</S></div>
        <div><S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Separated (%)</S>
          <input type="range" min={0} max={100} value={separatedPct} onChange={e=>setSeparatedPct(+e.target.value)} style={{width:"100%",accentColor:"#2c3e3a"}}/>
          <S fontSize={16} fontWeight={600} color="#2c3e3a">{separatedPct}% <span style={{fontSize:11,color:"#999"}}>({Math.round(empCount*(separatedPct/100))} emp)</span></S></div>
        <div><S fontSize={11} fontWeight={500} color="#555" marginBottom={6}>Avg Daily Wage (§ 203)</S>
          <input type="range" min={100} max={800} step={10} value={dailyWage} onChange={e=>setDailyWage(+e.target.value)} style={{width:"100%",accentColor:"#2c3e3a"}}/>
          <S fontSize={16} fontWeight={600} color="#2c3e3a">${dailyWage}</S></div>
      </div>

      {/* CASCADE VISUALIZATION */}
      <div style={{marginBottom:24}}>
        <div style={{padding:16,background:"#f8f0f0",border:"1px solid #e8d0d0",marginBottom:0,textAlign:"center"}}>
          <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#dc3545" marginBottom={4}>Triggering Event</S>
          <S fontSize={14} fontWeight={600} color="#333">{chain.trigger}</S>
        </div>
        <div style={{display:"flex",justifyContent:"center",padding:"8px 0"}}><div style={{width:2,height:20,background:"#ddd"}}/></div>

        {chain.nodes.map((node,i)=>(
          <div key={i}>
            <div style={{padding:16,border:"1px solid "+(node.color)+"30",borderLeft:"4px solid "+(node.color),background:""+(node.color)+"08",display:"grid",gridTemplateColumns:"1fr auto",gap:16,alignItems:"center"}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <S fontSize={12} fontWeight={700} color={node.color}>{node.code}</S>
                  <span style={{fontFamily:"'Outfit',sans-serif",fontSize:9,padding:"2px 8px",background:node.type==="penalty"?node.color+"20":"#fff8e0",color:node.type==="penalty"?node.color:"#CC8800",border:"1px solid "+(node.type==="penalty"?node.color:"#CC8800")+"40",letterSpacing:1,textTransform:"uppercase",fontWeight:600}}>{node.type==="penalty"?"PAGA PENALTY":"WAGE (NOT PAGA)"}</span>
                </div>
                <S fontSize={13} fontWeight={600} color="#333" marginBottom={4}>{node.label}</S>
                <S fontSize={11} color="#888" lineHeight="1.6">{node.note}</S>
              </div>
              <div style={{textAlign:"right",minWidth:100}}>
                <S fontSize={20} fontWeight={700} color={node.color}>{fmt(node.calc(empCount,ppCount,separatedPct))}</S>
                <S fontSize={10} color="#999">{node.amount}</S>
              </div>
            </div>
            {i<chain.nodes.length-1&&<div style={{display:"flex",justifyContent:"center",padding:"4px 0"}}><div style={{width:2,height:16,background:"#ddd"}}/></div>}
          </div>
        ))}
      </div>

      {/* TOTALS */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:16}}>
        <div style={{padding:20,background:"#fafafa",borderTop:"3px solid #CC8800",textAlign:"center"}}>
          <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#999" marginBottom={8}>Wages (Not PAGA)</S>
          <S fontSize={24} fontWeight={700} color="#CC8800">{fmt(totalWages)}</S>
          <S fontSize={10} color="#999">Recoverable via direct claim only</S>
        </div>
        <div style={{padding:20,background:"#fafafa",borderTop:"3px solid #2c3e3a",textAlign:"center"}}>
          <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#999" marginBottom={8}>PAGA Penalties</S>
          <S fontSize={24} fontWeight={700} color="#2c3e3a">{fmt(totalPenalties)}</S>
          <S fontSize={10} color="#999">Recoverable through PAGA</S>
        </div>
        <div style={{padding:20,background:"#fafafa",borderTop:"3px solid #dc3545",textAlign:"center"}}>
          <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#999" marginBottom={8}>Multiplier Effect</S>
          <S fontSize={24} fontWeight={700} color="#dc3545">{totalWages>0?`${((totalPenalties+totalWages)/totalWages).toFixed(1)}×`:"-"}</S>
          <S fontSize={10} color="#999">Total exposure vs. underlying wages</S>
        </div>
      </div>

      {/* POST-REFORM ANTI-STACKING NOTICE */}
      <div style={{padding:16,background:"#fff8f0",border:"1px solid #f0e0c0",borderLeft:"4px solid #CC8800",marginBottom:16}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#CC8800" marginBottom={6}>2024 Reform: Anti-Stacking (§ 2699(i))</S>
        <S fontSize={12} lineHeight="1.8" color="#888">For PAGA notices filed on or after June 19, 2024, derivative penalties for §§ 201-203 (unless willful), § 204 (unless willful/intentional), and § 226 (unless knowing/intentional) cannot be stacked on top of the underlying violation's penalty. The full cascade shown above applies to pre-reform cases or post-reform cases meeting elevated scienter requirements.</S>
      </div>

      {/* STRATEGIC ANALYSIS — DERIVATIVE MAPPER */}
      <div style={{padding:24,background:"#f8faf9",border:"1px solid #e0e8e6",marginBottom:16}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#2c3e3a" marginBottom={16}>Strategic Analysis</S>
        <S fontSize={13} lineHeight="1.8" color="#555" marginBottom={12}><strong>The defense implication:</strong> Fix the underlying violation and the entire cascade collapses. If the employer can show compliant meal periods for 80% of the PAGA period (through the "Two Hotels" bifurcation in the Penalty Estimator), the derivative penalties also reduce by 80%. The penalty cap further compounds the reduction — the 15% cap applied to a cascade that's already been reduced by bifurcation can result in total exposure under 5% of the plaintiff's maximum demand.</S>
        <S fontSize={13} lineHeight="1.8" color="#555"><strong>Class action vs. PAGA:</strong> In a class action, the derivative penalties largely don't apply — class damages focus on the underlying wage underpayment plus statutory interest. The derivative cascade is a PAGA-specific phenomenon. This is why the same set of facts can generate a $200,000 class action exposure and a $2,000,000 PAGA exposure — the penalty multiplier applies only to the PAGA track. When advising carriers on dual-track matters, separating the class damages from the PAGA penalties produces a fundamentally different settlement authority recommendation than a single blended number.</S>
      </div>

      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#2c3e3a",marginBottom:8,display:"flex",alignItems:"center",gap:6,cursor:"pointer"}} onClick={()=>{const el=document.getElementById("section-insights");if(el)el.scrollIntoView({behavior:"smooth",block:"start"})}}><span style={{fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Read the Analysis</span><span style={{color:"#999"}}>The Naranjo Cascade: How One Meal Period Violation Generates Four Penalty Streams →</span></div>
      <S fontSize={10} color="#bbb" fontStyle="italic">For illustrative purposes only. Derivative penalty analysis per Naranjo v. Spectrum Security (2022) 13 Cal.5th 93, Kirby v. Immoos (2012) 53 Cal.4th 1244, and ZB, N.A. v. Superior Court (2019) 8 Cal.5th 175. Post-reform: § 2699(i) limits derivative stacking for non-knowing § 226 and non-willful §§ 201-203 violations. Actual cascade depends on specific facts, reform applicability, and scienter. The Naranjo II good-faith defense may further limit § 226 and § 203 exposure.</S>
    </div>
  );
}

export default DerivativeMapper;
