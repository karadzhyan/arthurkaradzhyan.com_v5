"use client";
import { useState, useEffect, useRef } from "react";
import S from "../S";

function WageStmtCheck(){
  const [checks,setChecks]=useState({});

  const elements=[
    {id:"gross",num:"(1)",label:"Gross wages earned",desc:"Total compensation earned during the pay period, before deductions. Must include overtime, bonuses, commissions, and meal/rest premiums (post-Naranjo).",risk:"high",note:"If meal/rest premiums are missing, this triggers an independent § 226 violation per Naranjo — separate from the underlying meal/rest violation."},
    {id:"hours",num:"(2)",label:"Total hours worked",desc:"All hours worked during the pay period. Required only for non-exempt employees. Must reflect actual hours, not scheduled hours.",risk:"medium",note:"If the employer uses rounding, the stated hours may differ from actual hours worked. Post-Donohue, this creates a potential violation if the rounding disadvantages the employee."},
    {id:"piece",num:"(3)",label:"Number of piece-rate units earned and applicable piece rate",desc:"Required ONLY if the employee is compensated on a piece-rate basis. Must show both the number of units and the rate per unit. Under § 226.2, must also show rest period and non-productive time compensation separately.",risk:"low",note:"Applies only to piece-rate employees. But when it applies, the level of detail required is significant — particularly the separate § 226.2 disclosures."},
    {id:"deductions",num:"(4)",label:"All deductions",desc:"Every deduction from gross pay must be itemized. This includes taxes, benefits, garnishments, and any other withholding. Lump-sum 'other deductions' lines are insufficient.",risk:"medium",note:"Unlawful deductions (§ 221) and insufficiently itemized deductions are separate violation categories. Each creates independent penalty exposure."},
    {id:"net",num:"(5)",label:"Net wages earned",desc:"Gross wages minus all deductions. This is the amount actually paid to the employee.",risk:"low",note:"If gross or deductions are wrong, net will be wrong — but the underlying violation is the gross or deduction error, not the net calculation."},
    {id:"dates",num:"(6)",label:"Inclusive dates of the period for which the employee is paid",desc:"The start and end date of the pay period. Must be the actual pay period dates, not the pay date.",risk:"medium",note:"Common error: showing the check date instead of the pay period dates. This is a technical violation that plaintiff's counsel frequently includes in PAGA notices."},
    {id:"name",num:"(7)",label:"Name and last four digits of SSN, or employee ID number",desc:"The employee's legal name and either the last four SSN digits or an employee identification number.",risk:"low",note:"Relatively low-risk item. Most payroll systems handle this automatically. But verify that the legal name (not nickname) is used."},
    {id:"employer",num:"(8)",label:"Name and address of the legal entity that is the employer",desc:"The employer's legal name (not a DBA or trade name) and physical address. P.O. boxes are insufficient if the employer has a physical location.",risk:"high",note:"This is a surprisingly common error for multi-entity employers, staffing firms, and companies that have changed names or addresses. If the legal entity name on the wage statement doesn't match the actual employer, every wage statement is deficient."},
    {id:"rates",num:"(9)",label:"All applicable hourly rates and the corresponding number of hours worked at each rate",desc:"EVERY hourly rate must be shown with the hours worked at that rate. This includes: regular rate, overtime rate (1.5× and 2×), and any other rate differentials. Post-Ferra, if meal/rest premiums are paid at the regular rate, that rate must be identifiable.",risk:"high",note:"The most technically complex element. For employees with variable rates, commissions, or bonuses affecting the regular rate, this element requires showing the calculated regular rate — not just the base rate. This is where most employers fail after Ferra and Alvarado."},
  ];

  // States: undefined=unchecked, true=compliant, false=deficient

  const deficient=elements.filter(e=>checks[e.id]===false);
  const compliant=elements.filter(e=>checks[e.id]===true);
  const unchecked=elements.filter(e=>checks[e.id]===undefined);
  const riskColors={high:"#dc3545",medium:"#CC8800",low:"#198754"};

  const empCount=50;const ppCount=26;
  const penaltyPerDeficient=100; // subsequent rate
  const maxPerEmployee=4000;
  const estimatedPenalty=Math.min(deficient.length*empCount*ppCount*penaltyPerDeficient, empCount*maxPerEmployee);

  return(
    <div style={{background:"#fff",border:"1px solid #e0e0e0",padding:"40px 40px 28px",position:"relative",overflow:"hidden",marginTop:32}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#2c3e3a,#4a7a6f)"}}/>
      <S fontSize={10} fontWeight={500} letterSpacing={4} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>Interactive · Wage Statement Compliance Checker</S>
      <S fontSize={12} color="#999" marginBottom={24}>The nine elements required by Labor Code § 226(a). Click each item to mark it as compliant or deficient. Deficient items generate independent PAGA penalty exposure at $50/$100 per employee per pay period (max $4,000 per employee).</S>

      <S fontSize={11} fontWeight={500} color="#555" marginBottom={12}>Mark each element as compliant or deficient using the buttons.</S>

      <div style={{marginBottom:24}}>
        {elements.map(el=>{
          const status=checks[el.id];
          const borderColor=status===true?"#198754":status===false?"#dc3545":"#e0e0e0";
          const bgColor=status===true?"#f0fff0":status===false?"#fff0f0":"#fff";
          return(
            <div key={el.id} style={{padding:16,border:"1px solid "+(borderColor),borderLeft:"4px solid "+(borderColor),background:bgColor,marginBottom:8,transition:"all .2s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                    <S fontSize={12} fontWeight={700} color="#333">§ 226(a){el.num}</S>
                    <S fontSize={13} fontWeight={600} color={status===true?"#198754":status===false?"#dc3545":"#555"}>{el.label}</S>
                    <span style={{fontFamily:"'Outfit',sans-serif",fontSize:9,padding:"2px 6px",background:""+(riskColors[el.risk])+"15",color:riskColors[el.risk],border:"1px solid "+(riskColors[el.risk])+"30",fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>{el.risk} risk</span>
                  </div>
                  <S fontSize={11} color="#888" lineHeight="1.6">{el.desc}</S>
                  {status===false&&<div style={{marginTop:8,padding:10,background:"#fff8f0",border:"1px solid #f0e0c0"}}>
                    <S fontSize={10} fontWeight={600} color="#CC8800" marginBottom={4}>Compliance Note</S>
                    <S fontSize={11} color="#888" lineHeight="1.6">{el.note}</S>
                  </div>}
                </div>
                <div style={{display:"flex",gap:0,flexShrink:0,marginLeft:12}}>
                  {[["✓","#198754",true],["—","#e0e0e0",undefined],["✗","#dc3545",false]].map(([icon,clr,val])=>(
                    <button key={icon} onClick={()=>setChecks(p=>({...p,[el.id]:p[el.id]===val?undefined:val}))} style={{width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid "+(status===val?clr:"#e0e0e0"),borderRight:icon!=="✗"?"none":undefined,background:status===val?clr+"15":"#fff",color:status===val?clr:"#ccc",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Outfit',sans-serif",transition:"all .15s"}}>{icon}</button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SUMMARY */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12,marginBottom:16}}>
        <div style={{padding:16,background:"#fafafa",textAlign:"center",borderTop:"3px solid #198754"}}>
          <S fontSize={10} fontWeight={600} color="#999" marginBottom={4}>Compliant</S>
          <S fontSize={28} fontWeight={700} color="#198754">{compliant.length}</S>
        </div>
        <div style={{padding:16,background:"#fafafa",textAlign:"center",borderTop:"3px solid #dc3545"}}>
          <S fontSize={10} fontWeight={600} color="#999" marginBottom={4}>Deficient</S>
          <S fontSize={28} fontWeight={700} color="#dc3545">{deficient.length}</S>
        </div>
        <div style={{padding:16,background:"#fafafa",textAlign:"center",borderTop:"3px solid #ccc"}}>
          <S fontSize={10} fontWeight={600} color="#999" marginBottom={4}>Unchecked</S>
          <S fontSize={28} fontWeight={700} color="#999">{unchecked.length}</S>
        </div>
        <div style={{padding:16,background:"#fafafa",textAlign:"center",borderTop:"3px solid #2c3e3a"}}>
          <S fontSize={10} fontWeight={600} color="#999" marginBottom={4}>Est. § 226 Penalty</S>
          <S fontSize={20} fontWeight={700} color="#2c3e3a">{deficient.length>0?`$${estimatedPenalty.toLocaleString()}`:"$0"}</S>
          <S fontSize={9} color="#bbb">50 emp × 26 pp × ${penaltyPerDeficient}</S>
        </div>
      </div>

      {deficient.length>0&&<div style={{padding:16,background:"#fff0f0",border:"1px solid #f0c0c0",marginBottom:16}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#dc3545" marginBottom={8}>Deficient Elements — Each Creates Independent PAGA Exposure</S>
        {deficient.map(el=>(
          <div key={el.id} style={{marginBottom:4}}>
            <S fontSize={12} color="#333">• <strong>§ 226(a){el.num}</strong>: {el.label}</S>
          </div>
        ))}
        <S fontSize={11} color="#888" marginTop={8}>Note: under Naranjo, each deficient element triggers the § 226(e) penalty independently. Multiple deficiencies on the same wage statement can generate stacking penalties — though courts have limited this in some circumstances. The scienter requirement ('knowing and intentional') applies to each element.</S>
      </div>}

      {/* STRATEGIC ANALYSIS */}
      {(compliant.length>0||deficient.length>0)&&<div style={{padding:24,background:"#f8faf9",border:"1px solid #e0e8e6",marginBottom:16}}>
        <S fontSize={10} fontWeight={600} letterSpacing={3} textTransform="uppercase" color="#2c3e3a" marginBottom={16}>Strategic Analysis</S>
        {deficient.length===0&&compliant.length===9&&<S fontSize={13} lineHeight="1.8" color="#555">All nine elements are compliant. Wage statement claims in the PAGA notice are defensible. Preserve this analysis — it demonstrates that the employer's wage statement system was configured correctly, which negates the "knowing and intentional" scienter requirement under § 226(e). This compliance record also supports the penalty cap qualification (the Penalty Cap Qualifier's wage statement element can be marked "Documented").</S>}
        {deficient.length>0&&deficient.length<=3&&<div>
          <S fontSize={13} lineHeight="1.8" color="#555" marginBottom={12}>Limited deficiencies ({deficient.length} of 9 elements). The scienter defense is critical here: § 226(e) requires "knowing and intentional" failure. If the deficiency results from a payroll vendor's configuration error, a reasonable interpretation of an ambiguous requirement, or reliance on prior legal guidance, scienter may not be established. The Naranjo II good-faith defense (2024) provides additional protection.</S>
          <S fontSize={13} lineHeight="1.8" color="#555">Class action implication: wage statement deficiencies that appear on every employee's pay stub are facially common — meaning they support class certification. A deficient element (9) (incorrect hourly rates) that affects all commissioned employees is common proof. By contrast, a deficient element (1) (gross wages) that depends on whether individual employees had meal period violations is individualized proof. Identify which deficiencies are systemic vs. individualized — the systemic ones are the class certification risk.</S>
        </div>}
        {deficient.length>3&&<div>
          <S fontSize={13} lineHeight="1.8" color="#555" marginBottom={12}>Substantial deficiencies ({deficient.length} of 9 elements). At this level, the wage statement itself is likely a significant source of independent PAGA exposure — separate from and in addition to the underlying substantive violations. Priority: fix the {deficient.filter(e=>e.risk==="high").length} high-risk deficiencies immediately. Element (8) (employer legal name and address) and element (9) (all applicable hourly rates) are the most commonly litigated.</S>
          <S fontSize={13} lineHeight="1.8" color="#555">At mediation, plaintiff will argue that the wage statement deficiencies are per se "knowing and intentional" because the employer configured the payroll system. The defense: configuration errors by third-party vendors, reasonable reliance on vendor defaults, and the Naranjo II good-faith defense. But this argument is harder to make with {deficient.length} deficient elements than with 1 or 2.</S>
        </div>}
      </div>}

      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#2c3e3a",marginBottom:8,display:"flex",alignItems:"center",gap:6,cursor:"pointer"}} onClick={()=>{const el=document.getElementById("section-insights");if(el)el.scrollIntoView({behavior:"smooth",block:"start"})}}><span style={{fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Read the Analysis</span><span style={{color:"#999"}}>The Naranjo Cascade — see how wage statement deficiencies create derivative penalty exposure →</span></div>
      <S fontSize={10} color="#bbb" fontStyle="italic">For illustrative purposes only. Lab. Code § 226(a)(1)-(9) (nine required elements); § 226(e) ($50 initial / $100 subsequent, max $4,000 per employee). Scienter requirement: 'knowing and intentional' violation. Naranjo v. Spectrum Security (2022) 13 Cal.5th 93 (premiums on wage statements). Estimated penalties assume 50 employees and 26 pay periods; adjust for actual population.</S>
    </div>
  );
}

export default WageStmtCheck;
