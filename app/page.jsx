"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import S from "@/components/S";
import Counter from "@/components/Counter";
import Typer from "@/components/Typer";
import PagaCalc from "@/components/tools/PagaCalc";
import RegRateCalc from "@/components/tools/RegRateCalc";
import CapQualifier from "@/components/tools/CapQualifier";
import SOLCalc from "@/components/tools/SOLCalc";
import RecoverCheck from "@/components/tools/RecoverCheck";
import DerivativeMapper from "@/components/tools/DerivativeMapper";
import DecisionTree from "@/components/tools/DecisionTree";
import WageStmtCheck from "@/components/tools/WageStmtCheck";
import { insights } from "@/data/insights";
import { caseLaw } from "@/data/caseLaw";

const NAV = ["About","Practice","Tools","Insights","Industries","Cases","Matters","Background","Resources","Contact"];

export default function Site(){
  const [active,setActive]=useState("");const [scrollY,setScrollY]=useState(0);const [menu,setMenu]=useState(false);const refs=useRef({});const [vis,setVis]=useState({});const [expanded,setExpanded]=useState(null);const [expandedInsight,setExpandedInsight]=useState(null);const [expandedCase,setExpandedCase]=useState(null);const [expandedInd,setExpandedInd]=useState(null);const [activeTool,setActiveTool]=useState(0);const activeToolRef=useRef(null);const [expandedPrac,setExpandedPrac]=useState(null);const [showPrivacy,setShowPrivacy]=useState(false);
  useEffect(()=>{if(activeTool!==null&&activeToolRef.current){setTimeout(()=>{activeToolRef.current&&activeToolRef.current.scrollIntoView({behavior:'smooth',block:'start'})},100)}},[activeTool]);const [scrollPct,setScrollPct]=useState(0);const [simIdx,setSimIdx]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setSimIdx(p=>(p+1)%3),5000);return()=>clearInterval(t)},[]);


  // scrollPct tracked via useState + onScroll handler

  useEffect(()=>{
    let ticking=false;
    const onScroll=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{setScrollY(window.scrollY);const curr=NAV.reduce((best,s)=>{const el=refs.current[s];if(!el)return best;const top=el.getBoundingClientRect().top;return Math.abs(top-120)<Math.abs(((best||{}).top||Infinity)-120)?{name:s,top}:best},{name:"",top:Infinity});if(curr.top<500)setActive(curr.name);else setActive("");const h=document.documentElement;setScrollPct(Math.min(100,Math.round((h.scrollTop/(h.scrollHeight-h.clientHeight))*100)));
    [...NAV,"stats","Cases","Tools","Industries","Background","Resources"].forEach(s=>{const el=refs.current[s];if(el&&el.getBoundingClientRect().top<window.innerHeight*.92)setVis(p=>({...p,[s]:true}))});ticking=false})};
    
    window.addEventListener("scroll",onScroll,{passive:true});onScroll();
    return()=>{window.removeEventListener("scroll",onScroll);};
  },[]);

  const go=(s)=>{setMenu(false);refs.current[s]&&refs.current[s].scrollIntoView({behavior:"smooth",block:"start"})};
  const fade=(s,d=0)=>({opacity:vis[s]?1:0,transform:vis[s]?"translateY(0)":"translateY(40px)",transition:"opacity 1s cubic-bezier(.25,.1,.25,1) "+d+"s, transform 1s cubic-bezier(.25,.1,.25,1) "+d+"s"});



  const industries=[
    {metric:"24/7 × Donohue",name:"Hospitality",icon:"HO",headline:"Every short meal punch in the time-clock data creates a rebuttable presumption of violation — and hotels generate thousands of them.",issues:["Meal/rest period compliance across 24/7 operations","Tip pooling and service charge distribution under § 351","Room attendant piece-rate calculations and non-productive time","Manager overtime exemption classification (duties test, salary basis)","AWS implementation for housekeeping and laundry departments","Event-driven scheduling and predictive scheduling compliance","Split-shift premiums for employees working non-consecutive shifts"],key:"Donohue presumptions apply with particular force in hospitality — time-clock data is extensive but often shows patterns requiring contextual explanation: late clock-ins from pre-shift meetings, short meal punches from employees voluntarily returning to the floor, missed rest periods during high-occupancy events. The 'Two Hotels' temporal bifurcation framework was developed specifically for this industry, distinguishing Legacy Period (pre-compliance transformation) violation rates from Remedied Period rates using operational data such as overtime reduction metrics, policy implementation records, and PMS system logs. Service charge litigation (§ 351) creates additional exposure: hotels that impose mandatory service charges on banquet events must distribute those charges to the employees who performed the services. Tip pooling arrangements must exclude managers and supervisors — but the definition of 'supervisor' under Wage Order 5 is narrower than the colloquial understanding, creating classification traps.",authorities:["Donohue v. AMN Services (2021) 11 Cal.5th 58","Brinker Restaurant Corp. v. Superior Court (2012) 53 Cal.4th 1004","Augustus v. ABM Security Services (2016) 2 Cal.5th 257"],crossRef:[{type:"Publication",label:"The 'Two Hotels' Framework"},{type:"Tool",label:"PAGA Penalty Estimator — \"Two Hotels\" bifurcation toggle"},{type:"Matter",label:"Multi-Property Hotel Operator"},{type:"Tool",label:"Regular Rate Calculator — Hotel Room Attendant preset"}]},
    {metric:"$0 at departure",name:"Automotive",icon:"AU",headline:"Every salesperson who departed between deal closing and deal funding was denied earned wages. The exposure is structural — and industry-wide.",issues:["Commission forfeiture under Sciborski v. Pacific Bell","Regular rate true-up for commission/draw compensation plans","Wage Order 7 commissioned-employee exemption (workweek-by-workweek)","F&I manager exempt classification under administrative exemption","Flat-rate technician overtime calculations","Dealership-specific bonus and incentive structures (spiffs, holdbacks)","Service advisor commission structures and minimum wage compliance"],key:"The commission timing mismatch is structural and industry-wide. Dealerships condition commission payments on deal funding — which can take weeks after closing. Under Sciborski, the commission is earned at closing, not funding. Every salesperson who departed between closing and funding has a claim for unpaid earned wages, plus derivative § 203 waiting time penalties and § 226 wage statement violations. The Wage Order 7 commissioned-employee overtime exemption requires that (1) more than half of the employee's compensation is commissions and (2) total earnings exceed 1.5× minimum wage — verified on a workweek-by-workweek basis, not averaged. During slow sales months, a commissioned salesperson can fall below the 1.5× threshold for specific workweeks, creating overtime exposure for those weeks even if the annual average exceeds the threshold. Flat-rate technicians present a parallel problem: the flat-rate system compensates based on 'flag hours' (manufacturer-estimated time per repair), not actual hours worked, but California overtime must be calculated on actual hours exceeding 8/day or 40/week regardless of flag-hour production.",authorities:["Sciborski v. Pacific Bell Directory (2012) 205 Cal.App.4th 1152","Alvarado v. Dart Container (2018) 4 Cal.5th 542","Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858"],crossRef:[{type:"Publication",label:"Commission Forfeiture After Sciborski"},{type:"Publication",label:"The Regular Rate Problem"},{type:"Tool",label:"Regular Rate Calculator — Car Dealership preset"},{type:"Matter",label:"Luxury Dealership — Commissions"}]},
    {metric:"14 worksites, 1 PAGA",name:"Healthcare & Staffing",icon:"HC",headline:"Who bears the PAGA penalty when the staffing firm cannot control the client hospital's meal period scheduling?",issues:["Public agency immunity for staffing firms at government worksites","Multi-worksite compliance variation across client locations","Travel time between client locations (compensable vs. commute)","On-call and standby compensation (engaged-to-wait vs. waiting-to-engage)","Per diem and expense reimbursement for traveling healthcare workers","Joint employer liability allocation between staffing firm and client","Exempt classification for traveling nurses and therapists"],key:"The novel public agency immunity defense applies when staffing firms place healthcare workers at government worksites where the staffing firm lacks operational control over the working conditions generating the alleged violations. If a county hospital controls meal period scheduling and the staffing firm has no authority to modify that schedule, the staffing firm should not bear PAGA penalties for the hospital's scheduling decisions. This defense is undeveloped in published authority — creating both risk and opportunity. Multi-worksite analysis is critical for manageability arguments under Estrada: a staffing firm placing employees at 14 different client locations, each with different scheduling practices, break policies, and supervisory structures, creates individualized proof requirements that representative treatment cannot adequately address. Travel time analysis requires distinguishing between home-to-first-client travel (generally non-compensable) and inter-client travel during the workday (compensable under Morillion and its progeny).",authorities:["Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582","Morillion v. Royal Packing (2000) 22 Cal.4th 575","Dynamex Operations West v. Superior Court (2018) 4 Cal.5th 903"],crossRef:[{type:"Matter",label:"Healthcare Staffing Agency — Novel Theory"},{type:"Publication",label:"Statistical Sampling in Wage-and-Hour Defense"},{type:"Tool",label:"SOL Calculator — Expense Reimbursement lookback"}]},
    {metric:"2 hrs/day retroactive OT",name:"Solar & Energy",icon:"SE",headline:"One missed step in the AWS election retroactively converts every 10-hour day across every affected employee into 2 hours of unpaid daily overtime.",issues:["AWS compliance and DIR election procedures (four-step statutory process)","Travel time from reporting locations to remote installation sites","Piece-rate non-productive time compensation under § 226.2","Expense reimbursement for personal vehicles, tools, and safety equipment","Heat illness prevention compliance (shade, water, rest, training)","Multi-site scheduling and rest period logistics for field crews","Prevailing wage compliance for public works projects"],key:"Alternative workweek schedule compliance is the primary exposure driver. The DIR election process has four mandatory steps: (1) written disclosure at least 14 days before election, (2) a meeting to discuss the proposed schedule, (3) a secret ballot election with two-thirds approval, and (4) results reported to DIR within 30 days. Missing any single step — even a procedural technicality like late DIR filing — can invalidate the entire AWS retroactively, reverting every employee to the standard 8/40 schedule and creating substantial daily overtime exposure for every workweek the AWS was in effect. This retroactive exposure can be enormous for solar installers who routinely work four 10-hour days under a 4/10 AWS — every hour beyond 8 in each day becomes unpaid overtime. Travel time from employer-designated reporting locations to remote installation sites is compensable under Morillion, but travel from home to a reporting location is generally not — the distinction turns on whether the employer 'requires' reporting to a specific location versus permitting direct travel to the worksite.",authorities:["Lab. Code § 511 (AWS election requirements)","Morillion v. Royal Packing (2000) 22 Cal.4th 575","Lab. Code § 226.2 (piece-rate compensation)"],crossRef:[{type:"Tool",label:"Regular Rate Calculator — Solar Installer preset"},{type:"Tool",label:"Penalty Estimator — Overtime category"},{type:"Tool",label:"Pre-PAGA Compliance Audit — Industry Addendum: Solar"}]},
    {metric:"§ 515.5 ≠ exempt",name:"Technology & Startups",icon:"TE",headline:"The administrative exemption does not cover 'important work.' It covers work 'directly related to management policies or general business operations.' Most tech companies conflate the two.",issues:["Exempt classification under administrative, professional, and computer employee exemptions","Equity compensation (RSUs, stock options) in regular rate calculations","Remote work expense reimbursement under § 2802","Flexible scheduling and unlimited PTO policies vs. daily overtime triggers","Startup dissolution, wind-down, and ABC-assignee employment obligations","Misclassification of contractors in platform and gig-model operations","Wage statement compliance for complex multi-component compensation"],key:"Technology companies present two distinct PAGA profiles. Active companies face classification-driven exposure: the administrative exemption requires 'directly related to management policies or general business operations' — not merely important work. A software engineer who exercises independent judgment on complex technical decisions is not administratively exempt; the computer professional exemption under § 515.5 requires a minimum hourly rate ($56.97 for 2025) or a minimum annual salary, and the work must be 'intellectual or creative' requiring the exercise of discretion and independent judgment. Dissolved startups present a categorically different defense challenge: no active employees, corporate records scattered across former executives' personal devices, assignments for benefit of creditors complicating document production and asset tracing. In one matter involving a dissolved fashion technology company, I managed a 121-page discovery response reconstructing the entire employment framework from fragments — building the exempt classification defense into the production framework itself so that the documents told the defense story before the defense was formally asserted.",authorities:["Lab. Code § 515.5 (computer professional exemption)","Dynamex Operations West v. Superior Court (2018) 4 Cal.5th 903","Lab. Code § 2802 (expense reimbursement)"],crossRef:[{type:"Matter",label:"Dissolved Fashion Startup — 121-page discovery"},{type:"Tool",label:"Wage Statement Checker — Element (9) hourly rates"},{type:"Tool",label:"Recoverability Checker — Expense Reimbursement"}]},
    {metric:"100+ employees, no records",name:"Agriculture",icon:"AG",headline:"Legacy piece-rate systems predating § 226.2 create a structural underpayment embedded in every pay period for every field worker — compounding across years of noncompliance.",issues:["Piece-rate compensation and non-productive time under § 226.2","Heat illness prevention compliance (Cal/OSHA regulations)","Field sanitation and rest area requirements","Labor contractor joint employment liability","Seasonal workforce payroll complexity and final pay timing","Wage Order 14 applicability and agricultural exemptions","Crew leader and foreman exempt classification"],key:"Agricultural PAGA matters carry distinctive exposure characteristics: large workforces (often 100+ aggrieved employees), systemic violations embedded in legacy piece-rate compensation structures that predate § 226.2's separate-compensation requirements, and frequently inadequate record-keeping — particularly for rest periods, which are often not tracked in field operations. The piece-rate problem is structural: before § 226.2 (effective January 1, 2016), many agricultural employers paid piece-rate without separately compensating workers for rest periods and non-productive time. Post-§ 226.2, the employer must pay rest period time at a regular rate calculated from the piece-rate earnings, and must separately identify this payment on the wage statement. Most legacy payroll systems cannot perform this calculation automatically. Joint employer liability between growers and labor contractors creates allocation disputes: if the contractor controls hiring and scheduling but the grower controls the work pace and field conditions, both may be liable — but the allocation of penalties between them is uncharted in PAGA authority. The Premium Packing settlement approval motion — a 20-page, 41-citation brief that exhaustive public records research confirmed as the most analytically sophisticated PAGA-only motion available — was drafted in exactly this agricultural context.",authorities:["Lab. Code § 226.2 (piece-rate compensation)","Estrada v. Royalty Carpet Mills (2024) 15 Cal.5th 582","Moniz v. Adecco USA (2021) 72 Cal.App.5th 56"],crossRef:[{type:"Matter",label:"Agricultural Employer — PAGA Settlement Approval"},{type:"Publication",label:"Drafting PAGA Settlement Approval Motions After Moniz"},{type:"Tool",label:"Penalty Estimator — large workforce modeling"}]},
  ];

  const matters=[
    {cat:"Exposure Modeling",title:"Multi-Property Hotel Operator",short:"Nine violation categories. ~95 aggrieved employees. Created the \"Two Hotels\" framework.",full:"The plaintiff alleged nine categories of Labor Code violations across a hotel operation with approximately 95 aggrieved employees. The initial demand treated the entire PAGA period as a monolith — applying maximum violation rates uniformly. The analysis I built rejected that approach. By disaggregating the PAGA period into a Legacy Period (before a documented compliance transformation) and a Remedied Period (after), the model revealed that the employer had achieved a 90%+ reduction in overtime violations during the latter half of the statutory period. Each violation category was scored independently using actual time records and payroll data, with penalty stacking calculated across all nine categories. The three-scenario output — plaintiff maximum, data-driven realistic, and defense best case — provided the carrier with a defensible settlement authority range. The framework was subsequently adopted as the standard PAGA analytical methodology across the entire practice group.",result:"Framework Adopted Firm-Wide"},
    {cat:"Exposure Modeling",title:"Medical Transportation Company",short:"100+ aggrieved employees. Reduced claimed exposure by more than 60%.",quote:{text:"Described supporting witness declarations as among the strongest he had reviewed in his career.",attr:"Mediator — Former Plaintiff's Wage-and-Hour Attorney"},full:"Plaintiff demanded penalties based on a blanket assumption of 100% violation rates across all violation categories for all employees in all pay periods. The exposure model I constructed challenged each assumption independently: initial violations carry a $100 penalty while subsequent violations carry $200, but the plaintiff's demand applied the subsequent rate to every pay period. Job-classification-specific analysis revealed that certain categories — particularly meal period claims — affected only a subset of the workforce (drivers on specific routes, not dispatchers or administrative staff). The supporting declaration addressed the factual basis for each violation rate reduction, incorporating time record analysis and route-scheduling data. The mediator — a former plaintiff's wage-and-hour attorney — described the declarations as among the strongest he had reviewed in his career. Plaintiff's counsel acknowledged the analysis materially reduced their settlement demand.",result:"60%+ Exposure Reduction"},
    {cat:"Novel Theory",title:"Healthcare Staffing Agency",short:"Novel defense: PAGA penalties inapplicable to immune public agency worksites.",full:"A staffing firm placed healthcare workers at government worksites — county hospitals and public clinics — where the staffing firm had no operational control over scheduling, meal period timing, or rest period availability. The PAGA notice alleged meal/rest, overtime, and wage statement violations. The defense I developed argued that where the alleged violations arise from working conditions controlled by an immune public agency employer, and the staffing firm is a secondary employer without operational authority over those conditions, PAGA penalties should not attach to the staffing firm. This required distinguishing between violations attributable to the staffing firm's own payroll and administrative obligations (wage statements, timely payment) and violations attributable to the agency's worksite operations (meal timing, rest period scheduling). The multi-worksite analysis also created a strong manageability challenge — the staffing firm placed employees at 14 different government facilities, each with different scheduling practices. 132 aggrieved employees across multiple job classifications and worksites.",result:"Favorable Settlement"},
    {cat:"Appellate Authority",title:"Car Wash Operators — Arbitration",short:"Applied newly decided California Supreme Court authority to defeat a motion to vacate an order compelling arbitration.",full:"The employer had successfully compelled individual PAGA claims to arbitration, but the arbitration fees were paid 14 days late due to a holiday-period administrative processing delay. Plaintiff moved to vacate the order under CCP § 1281.98, citing the then-universal appellate authority holding that any late payment — regardless of reason — automatically forfeited arbitration rights. The California Supreme Court decided Hohenshelt v. Superior Court (2025) 18 Cal.5th 310 while the motion was pending. The supplemental brief I drafted applied Hohenshelt's equitable framework: the majority opinion required forfeiture only for willful, grossly negligent, or fraudulent nonpayment. The brief distinguished every unfavorable appellate authority that Hohenshelt had disapproved — Gallo, Espinoza, De Leon, Williams, Doe v. Superior Court, Colon-Perez, and Sanders — and demonstrated through internal communications and payment records that the 14-day delay was attributable to a holiday-period invoice processing failure, not strategic conduct. The court adopted the analysis and denied the motion to vacate.",result:"Motion Denied"},
    {cat:"Class Certification",title:"Multi-Dealership Automotive Group",short:"Finalized class certification opposition navigating multiple related actions and a six-hour evidentiary hearing.",full:"The matter involved overlapping PAGA and class action claims against a multi-location dealership group, with a tentative global settlement from a prior case, arbitration rulings from a separate six-hour evidentiary hearing, and competing class definitions across the related actions. The class certification opposition required synthesizing the procedural history across all related matters, identifying inconsistencies between the plaintiff's proposed class definition and the evidence adduced at the evidentiary hearing, and demonstrating that individualized issues — particularly around the commissioned-employee exemption, which required workweek-by-workweek verification — predominated over common questions. The prior attorneys' draft had been in progress for weeks. The final submission integrated the multi-case procedural analysis, the evidentiary hearing record, and the substantive predominance arguments into a cohesive opposition.",result:"Motion Finalized"},
    {cat:"Forensic Analysis",title:"Luxury Dealership — Commissions",short:"Identified structural commission forfeiture exposure the supervising partner had never seen raised.",full:"The forensic analysis began with a routine review of the dealership's commission plan and pay statements. The commission structure conditioned payment on continued employment through deal funding — standard in the industry, but almost certainly unlawful under Sciborski v. Pacific Bell Directory (2012) 205 Cal.App.4th 1152. Under Sciborski, commissions are earned when the employee completes the work entitling them to the commission — at deal closing, not at deal funding. The timing mismatch meant that every salesperson who departed between closing and funding had been unlawfully denied earned wages. Tracing commission timing mismatches across pay statements and deal funding dates revealed a pattern of structural underpayment affecting departed employees. The regular rate analysis compounded the exposure: because commissions were not properly included in the regular rate for overtime and premium calculations, every commissioned employee's overtime and meal/rest premiums had been systematically underpaid. The supervising partner — a senior wage-and-hour practitioner with decades of experience — noted he had never seen the Sciborski forfeiture theory raised in his practice.",result:"Novel Issue Identified"},
    {cat:"FEHA Defense",title:"Behavioral Health Provider",short:"Seventeen causes of action. Defeated from plaintiff's own documents.",full:"The plaintiff — a former behavioral health counselor — alleged seventeen causes of action including disability discrimination, failure to accommodate, failure to engage in the interactive process, retaliation, wrongful termination, and multiple wage-and-hour claims. The defense strategy centered on the plaintiff's own documentary record. Medical records produced in discovery revealed a pre-existing car accident injury that the plaintiff had recharacterized as a work-related condition requiring accommodation. The timeline analysis showed that the plaintiff's accommodation requests coincided with a performance improvement plan, not with any workplace incident. The interactive process documentation — which the plaintiff's counsel argued was deficient — actually showed multiple documented exchanges where the employer offered modified duties and schedule adjustments. The plaintiff's subjective complaints of workplace stress were undermined by contemporaneous social media posts and personal communications produced under a narrowly crafted discovery request.",result:"17 COAs Addressed"},
    {cat:"Investigation",title:"National Retailer — Executive Complaint",short:"C-suite harassment allegations. PE-owned company. Eight witnesses.",full:"A private-equity-owned national retailer referred a complaint alleging harassment by a senior executive against multiple subordinates. The investigation involved eight witness interviews across three states, forensic analysis of GPS and payroll data to verify travel schedules and expense claims, and review of electronic communications spanning 18 months. The challenge was structural: the private equity sponsor, the board, the executive leadership team, and the complaining employees each had different interests and different access to information. The investigation report included individualized credibility assessments for each witness (incorporating demeanor observations, internal consistency analysis, and corroboration mapping), organizational recommendations addressing both the specific complaint and systemic culture issues identified during the investigation, and a facilitated mediation plan for workplace relationships disrupted by the investigation process. The report was delivered directly to the board of directors.",result:"Report Delivered to Board"},
    {cat:"Misclassification",title:"Travel Management Company",short:"Independent contractor classification under ABC and Borello. Multi-state choice-of-law.",full:"A pre-litigation demand alleged misclassification of travel agents as independent contractors, asserting seventeen causes of action across wage-and-hour, expense reimbursement, and waiting time penalty theories. The threshold issue was choice of law: the agents worked remotely across multiple states, but the employer was headquartered in California. Under the ABC test (Dynamex Operations West v. Superior Court (2018) 4 Cal.5th 903), the classification was likely indefensible for California-based agents. But research identified a statutory exemption for licensed travel agents under Business & Professions Code § 17550 et seq. that, combined with the multi-state choice-of-law analysis under Restatement (Second) of Conflict of Laws § 188, narrowed the viable class to a subset of the workforce and eliminated several cause of action categories entirely. The pre-litigation analysis reduced the plaintiff's counsel's initial demand framework significantly before any formal discovery.",result:"Exposure Narrowed"},
    {cat:"Settlement",title:"Agricultural Employer — PAGA Approval",short:"20-page motion. 41 citations. No comparable PAGA-only settlement motion found in public records.",full:"The PAGA settlement in Ramirez Benitez v. Premium Packing resolved claims across 13+ Labor Code sections for a settlement amount of $109,530. The approval motion I drafted was designed to preemptively address every basis on which PAGA settlement motions are typically challenged or rejected. The structure applied the Moniz v. Adecco three-part purpose test (remediation, deterrence, enforcement maximization) as an organizing framework, then preemptively distinguished Kullar v. Foot Locker — the leading authority reversing settlements for inadequate investigation — by documenting the specific discovery conducted, the time records reviewed, and the analytical methodology employed. A claim-by-claim litigation risk analysis identified the evidentiary burden for each violation category: which claims required individualized proof (meal period waiver defenses under Brinker), which turned on scienter (wage statement penalties requiring 'knowing and intentional' violation under § 226(e)), and which were susceptible to the Donohue presumption. The fee application demonstrated a negative lodestar multiplier of 0.237 — counsel's actual time exceeded the fees requested. Exhaustive research across Westlaw, Lexis, and Trellis.Law confirmed no publicly available PAGA-only settlement approval motion of comparable analytical depth.",result:"No Comparable Motion in Public Records"},
    {cat:"Discovery",title:"Dissolved Fashion Startup",short:"121-page discovery response reconstructing an employment framework from corporate fragments.",full:"The defendant was a dissolved fashion technology startup that had gone through an assignment for benefit of creditors — the corporate equivalent of an informal liquidation. No active employees remained. Corporate records were scattered across former executives, personal email accounts, and cloud storage services with expiring credentials. The plaintiff alleged exempt misclassification, unpaid overtime, missed meal and rest periods, and wage statement violations. The 121-page discovery response to 92+ document requests was designed not merely to comply with discovery obligations but to affirmatively build the exempt classification defense into the document production framework itself. Each objection anticipated the specific certification motion arguments the plaintiff would later make. The document index cataloged 90+ responsive documents by Bates number with explanatory parentheticals connecting each document to a specific defense theory — job duties analysis for the administrative exemption, salary basis documentation, discretion and independent judgment evidence. The production told the defense story before the defense was formally asserted.",result:"Defense Record Built From Fragments"},
    {cat:"Client Relations",title:"Private Motorsports Club",short:"EPLI carrier transferred the matter from prior counsel at the client's specific request.",quote:{text:"The client renewed their request for the firm specifically to maintain the working relationship.",attr:"EPLI Carrier Claims File"},full:"The initial matter involved employment litigation against a prestigious private motorsports club. The client's executive — who interfaced directly with counsel on litigation strategy and document collection — described the work product as 'sharp.' When a subsequent employment matter arose approximately six months later, the EPLI carrier's claims counsel confirmed that the client had 'renewed their request' for the firm specifically to maintain the working relationship. The carrier approved the transfer from the prior handling firm — O'Hagan Meyer — to the firm. Client-requested representation resulting in carrier-approved matter transfers is uncommon in the carrier-assigned defense model, where panel counsel assignments are typically driven by the carrier's internal rotation and cost considerations rather than client preference. The transfer reflected both the quality of the work product and the strength of the client relationship developed during the initial engagement.",result:"Client-Requested Counsel Transfer"},
  ];

  return(
    <div style={{fontFamily:"'Libre Baskerville',Georgia,serif",color:"#1a1a1a",background:"#fff",minHeight:"100vh",overflow:"hidden"}}>

      <a href="#section-main-content" style={{position:"absolute",top:-100,left:16,padding:"12px 24px",background:"#2c3e3a",color:"#fff",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:600,zIndex:10001,textDecoration:"none"}} onFocus={function(e){e.target.style.top="12px"}} onBlur={function(e){e.target.style.top="-100px"}}>Skip to main content</a>
      <div className="side-dots">{NAV.map((s,i)=><div key={i} className={"side-dot "+(active===s?"on":"")} data-label={s} onClick={()=>go(s)} role="button" aria-label={"Navigate to "+s}/>)}</div>
      {scrollY>600&&<button className="btt" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top">↑</button>}

      {/* PROGRESS BAR */}
      <div style={{position:"fixed",top:0,right:0,width:3,height:scrollPct+"%",background:"linear-gradient(180deg,#2c3e3a,#4a7a6f)",zIndex:10000,transition:"height .1s",opacity:scrollPct>2?0.4:0}}/>

      <nav className="nav" style={{background:scrollY>60?"rgba(255,255,255,.96)":"transparent",backdropFilter:scrollY>60?"blur(20px)":"none",boxShadow:scrollY>60?"0 1px 0 rgba(0,0,0,.05)":"none"}}>
        <div className="nav-in">
          <a className="nav-logo" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} role="button" aria-label="Scroll to top">Arthur Karadzhyan</a>
          <div className="nav-links">{NAV.map(s=><button key={s} className={"nav-link "+(active===s?"on":"")} onClick={()=>go(s)}>{s}</button>)}</div>
          <button className="burger" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation menu" aria-expanded={menu}><span/><span/><span/></button>
        </div>
      </nav>
      <div className={"mob "+(menu?"on":"")}>{NAV.map(s=><button key={s} className="nav-link" style={{fontSize:14,letterSpacing:4}} onClick={()=>go(s)}>{s}</button>)}</div>

      {/* HERO */}
      <section className="hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",position:"relative"}}>
        <div className="hero-panel" style={{position:"absolute",right:0,top:0,bottom:0,width:"35%",background:"linear-gradient(160deg,#2c3e3a,#1e2d2a)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>

        </div>
        <div className="hero-ak" style={{position:"absolute",right:"-40px",top:"50%",transform:"translateY(-50%)",fontFamily:"'Outfit',sans-serif",fontSize:280,fontWeight:700,color:"rgba(44,62,58,.025)",lineHeight:1,letterSpacing:-16,pointerEvents:"none",zIndex:1}}>AK</div>
        <div className="hero-content" style={{flex:1,padding:"140px 64px 80px",position:"relative",zIndex:2,maxWidth:"65%"}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:48,fontWeight:700,color:"rgba(44,62,58,.08)",letterSpacing:-2,marginBottom:8}}>10,098</div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"#999",marginBottom:32}}>PAGA notices filed in California in 2025 — a record high</div>
          <h1 className="h-name" style={{margin:0}}>Arthur<br/>Karadzhyan</h1>
          <div className="h-title">Employment Defense Attorney · California</div>
          <div className="h-line"/>
          <div className="h-desc">PAGA representative actions, wage-and-hour class actions, workplace investigations, and single-plaintiff defense. Built on quantitative exposure modeling, not blanket assumptions.</div>
          <div className="h-cta"><button className="h-btn" onClick={()=>go("Contact")}>Get in Touch</button><button className="h-ghost" onClick={()=>go("Insights")}>Read Insights</button></div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"#bbb",marginTop:36}}>ANALYTICAL PLATFORM · 8 INTERACTIVE TOOLS · 12 PUBLICATIONS · 12 CASE LAW ANALYSES · 6 INDUSTRY PROFILES</div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-band" ref={el=>refs.current["stats"]=el}>
        {[{w:500,h:500,t:-250,r:-150},{w:250,h:250,b:-100,l:"15%"},{w:150,h:150,t:"30%",l:"55%"}].map((g,i)=><div key={i} className="geo" style={{...g,animation:"float "+(8+i*2)+"s ease-in-out infinite"}}/>)}
        <div className="stats-in">
          {[{num:"10098",suf:"",label:"PAGA Notices Filed\nin California (2025)"},{num:"85",suf:"%",label:"Maximum Penalty\nReduction Under Reforms"},{num:"33",suf:"",label:"Days — Shortest\nDeadline After Notice"},{num:"3",suf:"",label:"Supreme Court PAGA\nCases Pending"}].map((s,i)=>(<div className="stat" key={i} style={fade("stats",i*.12)}><div className="stat-num"><Counter end={s.num} suffix={s.suf} started={vis["stats"]}/></div><div className="stat-label" style={{whiteSpace:"pre-line"}}>{s.label}</div></div>))}
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:8,color:"rgba(255,255,255,.2)",textAlign:"center",marginTop:24,letterSpacing:1,gridColumn:"1 / -1"}}>DIR PAGA Filing Data · LWDA Initial Statement of Reasons (Feb. 2026) · AB 2288 / SB 92</div>
        </div>
      </div>

      {/* ABOUT */}
      <section className="sec" ref={el=>refs.current["About"]=el} id="section-main-content" style={fade("About")}>
        <div className="sh"><div className="sn">01</div><h2 className="sl2">About</h2><div className="sln"/></div>
        <div className="ag">
          <div className="at2">
            <p>Most PAGA defense is reactive. A notice arrives, counsel answers, discovery happens, and someone negotiates a number at mediation. The exposure model — if one exists — is a back-of-the-envelope calculation based on blanket assumptions. The result: settlements driven by plaintiff's framing, not by the actual data.</p>
            <p>This practice is built differently. Every matter starts with a quantitative exposure model that disaggregates penalties by violation category, applies per-category violation rates from actual time records and payroll data, strips non-recoverable categories under the ZB, N.A. and Kirby frameworks, and produces three outputs — plaintiff maximum, data-driven realistic, and defense best case.</p>
            {/* Pull quote */}
            <div style={{padding:"20px 0",margin:"16px 0",borderTop:"1px solid #eee",borderBottom:"1px solid #eee"}}>
              <div style={{fontSize:20,fontWeight:300,color:"#2c3e3a",lineHeight:1.5,fontStyle:"italic"}}>"Among the strongest declarations I have reviewed in my career."</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#999",marginTop:8,letterSpacing:2,textTransform:"uppercase"}}>Mediator — Former Plaintiff's Wage-and-Hour Attorney</div>
            </div>
            <p>I built this practice on the plaintiff side — litigating wage-and-hour class actions on behalf of employees before transitioning to defense. I evaluate claims the way opposing counsel evaluates them, anticipate certification arguments before they're filed, and identify the pressure points that actually move mediations.</p>
            <p>The tools, publications, and case analyses on this site are the working methodology — the same frameworks applied in active litigation, adapted for open access. The 2024 PAGA reforms created the most significant shift in defense strategy since the statute's enactment. No published appellate decision has yet interpreted the reform provisions. The analytical frameworks being built now will define the landscape when that authority arrives.</p>
          </div>
          <div className="as2">
            <h4 style={{color:"#2c3e3a"}}>Focus</h4>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"#888",lineHeight:2.2,marginBottom:20}}>PAGA penalty exposure modeling<br/>Wage-and-hour class certification opposition<br/>2024 reform strategy (AB 2288 / SB 92)<br/>Forensic payroll and regular rate analysis<br/>Carrier-assigned defense and panel work</div>
            <h4 style={{color:"#2c3e3a"}}>On This Site</h4>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
              {[["8","Tools"],["12","Publications"],["12","Case Analyses"],["6","Industries"]].map(([n,l],i)=>(
                <div key={i} style={{textAlign:"center",padding:"12px 0",background:"#fafafa"}}>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:700,color:"#2c3e3a"}}>{n}</div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#999"}}>{l}</div>
                </div>
              ))}
            </div>
            <h4>Admissions</h4>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"#888",lineHeight:2.2}}>State Bar of California (No. 353639)<br/>U.S.D.C. Central District of California<br/>U.S.D.C. Northern District of California<br/>U.S.D.C. Eastern District of California<br/>U.S.D.C. Southern District of California</div>
          </div>
        </div>
      </section>

      {/* PRACTICE */}
      <section className="sec" ref={el=>refs.current["Practice"]=el} style={fade("Practice")}>
        <div className="sh"><div className="sn">02</div><h2 className="sl2">Practice Areas</h2><div className="sln"/></div>
        <div style={{marginBottom:40,marginTop:-36,maxWidth:700}}>
          <div style={{fontFamily:"Georgia,serif",fontSize:19,lineHeight:1.6,color:"#555",fontStyle:"italic",marginBottom:12}}>Every defense is built on the data, not around it.</div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"#999",lineHeight:1.7}}>Five practice areas unified by the same analytical infrastructure — quantitative exposure modeling, forensic payroll analysis, and penalty-by-penalty recoverability assessment. The tools and case analyses elsewhere on this site are the working components.</div>
        </div>
        {[{t:"PAGA Representative Actions",d:"Full-lifecycle defense from LWDA notice through resolution.",subs:[{t:"Exposure Modeling",d:"Three-scenario output with per-category violation rates, penalty stacking, and temporal bifurcation."},{t:"Penalty Caps",d:"Pre-notice documentation for the 15% cap, post-notice remediation within 60 days for the 30% cap."},{t:"Standing & Scope",d:"Reformed personal-experience requirement (§ 2699(c)). Manageability limitation under Estrada and § 2699(p)."},{t:"Arbitration",d:"Individual-claim arbitration under Adolph with stay of representative claims. Hohenshelt fee compliance."},{t:"Forensic Analysis",d:"Regular rate errors (Alvarado, Ferra), commission timing (Sciborski), derivative cascades (§ 226, § 203, § 210)."},{t:"Settlement",d:"Moniz framework with preemptive Kullar treatment. Cure proposals for employers under 100 employees."}]},{t:"Wage-and-Hour Class Actions",d:"Certification opposition through trial plan challenges.",subs:[{t:"Certification",d:"Predominance failures, individualized proof requirements, Duran-compliant sampling methodology challenges."},{t:"Class Definition",d:"Identifying overbroad definitions sweeping in exempt employees, multi-location workforces, or different job classifications."},{t:"Merits Defense",d:"Meal/rest under Brinker and Donohue, overtime and regular rate, off-the-clock, expense reimbursement, wage statements."},{t:"Dual-Track",d:"Coordinating PAGA and class defense — defeating certification narrows the PAGA case and drives the mediation calculus."}]},{t:"Workplace Investigations",d:"Fact-finding for harassment, discrimination, retaliation, and policy violation complaints.",subs:[{t:"Witness Protocols",d:"Structured interviews with credibility assessment — demeanor analysis, consistency mapping, corroboration tracking."},{t:"Reporting",d:"Defensible reports calibrated for board, C-suite, and carrier audiences. Privileged structures under attorney-client and work-product doctrines."},{t:"Remediation",d:"Post-investigation remediation planning and facilitated mediation for disrupted workplace relationships."}]},{t:"Employment Counseling & Compliance",d:"Pre-litigation compliance infrastructure designed for penalty cap qualification.",subs:[{t:"Penalty Cap Positioning",d:"Handbook drafting, supervisor training, payroll audits, and attestation systems — all documented for 15% cap evidence."},{t:"AWS Implementation",d:"Four-step DIR election process. One missed step retroactively converts every 10-hour day into daily overtime."},{t:"Commission Plans",d:"Sciborski forfeiture exposure analysis and § 2751 written-agreement compliance."},{t:"Regular Rate Audits",d:"Overtime and premium accuracy across all compensation components — commissions, bonuses, piece-rate, differentials."}]},{t:"Single-Plaintiff Litigation",d:"FEHA defense and individual Labor Code claims.",subs:[{t:"FEHA Defense",d:"Disability discrimination, accommodation, interactive process failures, harassment, retaliation, wrongful termination."},{t:"Misclassification",d:"Independent contractor analysis under the ABC test (Dynamex) and Borello multi-factor framework."},{t:"Early Resolution",d:"Pre-litigation demand evaluation, strategic assessment, and early resolution positioning."}]}].map(function(p,i){return <div className="prac-item" key={i}><div className="prac-title">{p.t}</div><div className="prac-desc"><div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,lineHeight:1.9,color:"#666",marginBottom:p.subs?16:0}}>{p.d}</div>{p.subs&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{p.subs.map(function(sub,j){return <div key={j} style={{padding:"12px 16px",background:"#fafafa",borderLeft:"2px solid #2c3e3a"}}><div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#2c3e3a",marginBottom:4}}>{sub.t}</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,lineHeight:1.7,color:"#888"}}>{sub.d}</div></div>})}</div>}</div></div>})}
      </section>

      {/* TOOLS */}
      <div style={{background:"linear-gradient(160deg,#2c3e3a,#1e2d2a)",borderTop:"1px solid #eee",borderBottom:"1px solid #eee"}}>
        <section className="sec" ref={el=>refs.current["Tools"]=el} style={fade("Tools")}>
          <div className="sh"><div className="sn" style={{color:"#fff",opacity:.12}}>03</div><h2 className="sl2" style={{color:"#8aa39e"}}>Tools</h2><div className="sln" style={{background:"rgba(255,255,255,.1)"}}/></div>
          <div style={{marginBottom:32,marginTop:-36,maxWidth:700}}>
            <div style={{fontFamily:"Georgia,serif",fontSize:19,lineHeight:1.6,color:"rgba(255,255,255,.75)",fontStyle:"italic",marginBottom:12}}>The same exposure models used in active litigation — penalty estimation, regular rate forensics, recoverability filtering, statute-of-limitations mapping — adapted for open access.</div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"rgba(255,255,255,.45)",lineHeight:1.7}}>All calculations run in your browser. No data is transmitted or stored. Inputs are illustrative defaults — adjust to your matter.</div>
          </div>

          {/* PAGA PRIMER — full width above sidebar */}
          <div style={{padding:"20px 24px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.06)",marginBottom:24,cursor:"pointer"}} onClick={()=>setExpandedPrac(expandedPrac==="primer"?null:"primer")} role="button" aria-expanded={expandedPrac==="primer"}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:600,color:"rgba(255,255,255,.6)"}}>New to PAGA? What Every Referring Attorney Should Know</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:16,color:"rgba(255,255,255,.3)",transform:expandedPrac==="primer"?"rotate(45deg)":"rotate(0)",transition:"transform .3s"}}>+</div>
            </div>
          </div>

                    {expandedPrac==="primer"&&<div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,lineHeight:2,color:"rgba(255,255,255,.6)",marginBottom:24,padding:"24px 28px",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)"}}>
                <div style={{marginBottom:16}}>PAGA (Private Attorneys General Act, Lab. Code § 2698 et seq.) authorizes employees to sue employers for Labor Code violations on behalf of themselves and all other “aggrieved employees” — functioning as a private enforcement mechanism for the state.</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                  <div style={{padding:16,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.06)"}}>
                    <div style={{fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"rgba(138,163,158,.7)",marginBottom:8}}>How It Differs From a Class Action</div>
                    <div style={{fontSize:11,lineHeight:1.8,color:"rgba(255,255,255,.55)"}}>No class certification required. The plaintiff files on behalf of all aggrieved employees automatically. The manageability framework is the only scope-limitation tool.</div>
                  </div>
                  <div style={{padding:16,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.06)"}}>
                    <div style={{fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"rgba(138,163,158,.7)",marginBottom:8}}>Why the Numbers Are Enormous</div>
                    <div style={{fontSize:11,lineHeight:1.8,color:"rgba(255,255,255,.55)"}}>Penalties are calculated per employee × per pay period × per violation category. A single meal period violation across 50 employees and 26 pay periods generates $260,000 — before derivative penalties multiply the exposure by 3–5×.</div>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  <div style={{padding:16,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.06)"}}>
                    <div style={{fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"rgba(138,163,158,.7)",marginBottom:8}}>The 65-Day LWDA Process</div>
                    <div style={{fontSize:11,lineHeight:1.8,color:"rgba(255,255,255,.55)"}}>The plaintiff must mail a notice to the LWDA. The LWDA has 65 days to decide whether to investigate. The 33-day cure deadline for small employers begins running from the notice date.</div>
                  </div>
                  <div style={{padding:16,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.06)"}}>
                    <div style={{fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"rgba(138,163,158,.7)",marginBottom:8}}>The 2024 Reforms Changed Everything</div>
                    <div style={{fontSize:11,lineHeight:1.8,color:"rgba(255,255,255,.55)"}}>AB 2288 and SB 92 introduced penalty caps, cure mechanisms, early evaluation conferences, and manageability limitations. No published appellate decision has yet interpreted the reform provisions.</div>
                  </div>
                </div>
              </div>}

          {/* VERTICAL SIDEBAR + TOOL PANEL */}
          <div className="tools-layout" style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:0}}>
            {/* LEFT SIDEBAR */}
            <div style={{borderRight:"1px solid rgba(255,255,255,.06)"}}>
              {/* TOOL LIST */}
              <div role="tablist" aria-label="Analysis tools">
                {[
                  {id:0,name:"Penalty Estimator",sub:"Three-scenario exposure model"},
                  {id:1,name:"Regular Rate Calculator",sub:"Ferra and Alvarado methodology"},
                  {id:2,name:"Cap Qualifier",sub:"15% and 30% documentation"},
                  {id:3,name:"SOL Calculator",sub:"PAGA vs. underlying lookback"},
                  {id:4,name:"Recoverability Checker",sub:"ZB, N.A. category analysis"},
                  {id:5,name:"Derivative Mapper",sub:"Naranjo penalty cascade"},
                  {id:6,name:"Decision Tree",sub:"Post-reform strategic routing"},
                  {id:7,name:"Wage Statement Checker",sub:"Nine elements of § 226(a)"},
                ].map(function(tool){return(
                  <button key={tool.id} onClick={function(){setActiveTool(tool.id)}} role="tab" aria-selected={activeTool===tool.id} style={{
                    display:"block",width:"100%",textAlign:"left",
                    padding:"14px 20px",
                    background:activeTool===tool.id?"rgba(255,255,255,.08)":"transparent",
                    borderLeft:activeTool===tool.id?"3px solid #8aa39e":"3px solid transparent",
                    borderTop:"none",borderRight:"none",borderBottom:"1px solid rgba(255,255,255,.04)",
                    cursor:"pointer",transition:"all .2s"
                  }}>
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:activeTool===tool.id?600:400,color:activeTool===tool.id?"#fff":"rgba(255,255,255,.7)",letterSpacing:1,marginBottom:2}}>{tool.name}</div>
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:activeTool===tool.id?"rgba(255,255,255,.35)":"rgba(255,255,255,.35)"}}>{tool.sub}</div>
                  </button>
                )})}
              </div>

              {/* DECISION TREE CTA */}
              <div style={{padding:"16px 20px",marginTop:8,background:"rgba(138,163,158,.08)",borderTop:"1px solid rgba(255,255,255,.06)",cursor:"pointer"}} onClick={function(){setActiveTool(6)}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,color:"#8aa39e",marginBottom:4}}>Received a notice?</div>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:"rgba(255,255,255,.5)",lineHeight:1.5}}>5–8 questions → strategic recommendation with citations</div>
              </div>
            </div>

            {/* RIGHT PANEL — ACTIVE TOOL */}
            <div ref={activeToolRef} style={{paddingLeft:32,minHeight:400}}>
              {activeTool===0&&<PagaCalc/>}
              {activeTool===1&&<RegRateCalc/>}
              {activeTool===2&&<CapQualifier/>}
              {activeTool===3&&<SOLCalc/>}
              {activeTool===4&&<RecoverCheck/>}
              {activeTool===5&&<DerivativeMapper/>}
              {activeTool===6&&<DecisionTree/>}
              {activeTool===7&&<WageStmtCheck/>}
            </div>
          </div>
        </section>
      </div>

      {/* INSIGHTS */}
      <section className="sec" ref={el=>refs.current["Insights"]=el} id="section-insights" style={fade("Insights")}>
        <div className="sh"><div className="sn">04</div><h2 className="sl2">Insights & Publications</h2><div className="sln"/></div>
        <p style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"#999",marginBottom:28,marginTop:-36}}>Original analysis of the frameworks, statutory provisions, and case authority that shape PAGA defense strategy. Click to read.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {insights.map((ins,i)=>(
          <div key={i} className="card-hover" onClick={()=>{setExpandedInsight(expandedInsight===i?null:i);setExpandedCase(null);setExpandedInd(null);setExpanded(null)}} role="button" aria-expanded={expandedInsight===i} style={{
            padding:"20px 24px",border:"1px solid #eee",cursor:"pointer",transition:"all .3s",
            gridColumn:expandedInsight===i?"1 / -1":"auto",
            background:expandedInsight===i?"#fafafa":"#fff"
          }}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <span style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#2c3e3a"}}>{ins.tag}</span>
                  
                  
                </div>
                <div style={{fontSize:expandedInsight===i?17:15,fontWeight:600,color:"#1a1a1a",lineHeight:1.4,transition:"all .3s"}}>{ins.title}</div>
                {expandedInsight!==i&&<div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"#999",marginTop:8,lineHeight:1.6}}>{ins.desc}</div>}
              </div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:18,color:"#ccc",transform:expandedInsight===i?"rotate(45deg)":"rotate(0)",transition:"transform .3s",flexShrink:0,marginLeft:12}}>+</div>
            </div>
            {expandedInsight===i&&<div style={{marginTop:16}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"#888",lineHeight:1.6,marginBottom:16}}>{ins.desc}</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,lineHeight:2,color:"#555",borderTop:"1px solid #eee",paddingTop:16}}>{ins.full}</div>
              {ins.tool&&<div style={{marginTop:16,padding:"12px 16px",background:"#f0f5f4",border:"1px solid #e0e8e6",display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={(e)=>{e.stopPropagation();go("Tools");const toolKeywords={"Penalty Estimator":0,"Regular Rate":1,"Penalty Cap":2,"Cap Qualifier":2,"SOL Calculator":3,"Recoverability":4,"Derivative":5,"Decision Tree":6,"Wage Statement":7};const match=Object.entries(toolKeywords).find(([k])=>ins.tool.includes(k));if(match)setTimeout(()=>setActiveTool(match[1]),400)}}>
                <span style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#2c3e3a"}}>Try the Tool</span>
                <span style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"#888"}}>{ins.tool}</span>
                <span style={{marginLeft:"auto",color:"#2c3e3a"}}>→</span>
              </div>}
              <Link href={"/insights/"+ins.slug} onClick={function(e){e.stopPropagation()}} style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:16,fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#2c3e3a",textDecoration:"none",padding:"8px 16px",border:"1px solid #2c3e3a"}}>Read Full Analysis →</Link>
            </div>}
          </div>
        ))}
        </div>
      </section>

      {/* INDUSTRY DEEP DIVES */}
      <div style={{background:"linear-gradient(160deg,#2c3e3a,#1e2d2a)",borderTop:"1px solid #eee"}} ref={el=>refs.current["Industries"]=el}>
        <section className="sec" style={fade("Industries")}>
          <div className="sh"><div className="sn" style={{color:"#fff",opacity:.12}}>05</div><h2 className="sl2" style={{color:"#8aa39e"}}>Industry Intelligence</h2><div className="sln" style={{background:"rgba(255,255,255,.1)"}}/></div>
          <div style={{marginBottom:36,marginTop:-24}}>
            <div style={{fontFamily:"Georgia,serif",fontSize:22,lineHeight:1.6,color:"rgba(255,255,255,.7)",fontStyle:"italic",maxWidth:700,marginBottom:16}}>Every industry has a structural vulnerability that generic defense strategies miss.</div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"rgba(255,255,255,.5)",lineHeight:1.8,maxWidth:600}}>Hospitality runs on tip credits and 24/7 scheduling. Automotive lives and dies by commission forfeiture timing. Healthcare staffing operates across immune government worksites where the staffing firm cannot control the conditions generating the violations. The defense that works for one will fail for another — and the penalty exposure structure is different in each.</div>
          </div>
          <div className="industry-stats" style={{display:"flex",gap:0,marginBottom:36}}>
            {[["6","Industries"],["42","Exposure Categories"],["18","Governing Authorities"],["12","Defense Strategies"]].map(([n,l],i)=>(
              <div key={i} style={{flex:1,padding:"16px 0",borderRight:i<3?"1px solid rgba(255,255,255,.06)":"none",textAlign:"center"}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:24,fontWeight:700,color:"#8aa39e"}}>{n}</div>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:500,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,.25)",marginTop:4}}>{l}</div>
              </div>
            ))}
          </div>
          <div className="tool-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
            {industries.map((ind,i)=>{
              const isOpen=expandedInd===i;
              return(
                <div key={i} className="card-hover-dark" onClick={()=>{setExpandedInd(isOpen?null:i);setExpandedInsight(null);setExpandedCase(null);setExpanded(null)}} role="button" aria-expanded={isOpen} style={{
                  background:isOpen?"rgba(255,255,255,.06)":"rgba(255,255,255,.02)",
                  border:"1px solid "+(isOpen?"rgba(255,255,255,.12)":"rgba(255,255,255,.05)"),
                  cursor:"pointer",
                  transition:"all .4s cubic-bezier(.25,.1,.25,1)",
                  gridColumn:isOpen?"1 / -1":"auto",
                  position:"relative",overflow:"hidden",
                  padding:isOpen?"0":"28px 24px"
                }}>
                  {/* Accent bar */}
                  <div style={{position:"absolute",top:0,left:0,right:0,height:isOpen?3:2,background:isOpen?"#8aa39e":"rgba(138,163,158,.15)",transition:"all .4s"}}/>

                  {/* COLLAPSED STATE */}
                  {!isOpen&&<div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div>
                        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"rgba(138,163,158,.4)",marginBottom:6}}>{ind.issues.length} Exposure Categories</div>
                        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:19,fontWeight:700,color:"#fff"}}>{ind.name}</div>
                      </div>
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:18,color:"rgba(255,255,255,.15)",flexShrink:0}}>+</div>
                    </div>
                    <div style={{fontFamily:"Georgia,serif",fontSize:13,lineHeight:1.6,color:"rgba(255,255,255,.65)",fontStyle:"italic",marginBottom:14,paddingLeft:12,borderLeft:"2px solid rgba(138,163,158,.2)"}}>{ind.headline.length>130?ind.headline.slice(0,130)+"...":ind.headline}</div>
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,lineHeight:1.7,color:"rgba(255,255,255,.25)",marginBottom:14}}>
                      {ind.issues.slice(0,3).join(" · ")}{ind.issues.length>3&&<span style={{color:"rgba(255,255,255,.15)"}}>{` +${ind.issues.length-3}`}</span>}
                    </div>
                    {/* Metric */}
                    <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:14}}>
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:700,color:"#8aa39e"}}>{ind.metric}</div>
                    </div>
                  </div>}

                  {/* EXPANDED STATE */}
                  {isOpen&&<div>
                    {/* Header band */}
                    <div style={{padding:"28px 32px 24px",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div>
                          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"rgba(138,163,158,.7)",marginBottom:8}}>Industry Profile</div>
                          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:24,fontWeight:700,color:"#fff"}}>{ind.name}</div>
                        </div>
                        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:22,color:"rgba(255,255,255,.2)",transform:"rotate(45deg)",transition:"transform .3s",flexShrink:0}}>+</div>
                      </div>
                    </div>

                    {/* Headline insight — full-width pull quote */}
                    <div style={{padding:"24px 32px",background:"rgba(138,163,158,.06)",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                      <div style={{fontFamily:"Georgia,serif",fontSize:16,lineHeight:1.7,color:"rgba(255,255,255,.75)",fontStyle:"italic",position:"relative",paddingLeft:20}}>
                        <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:"rgba(138,163,158,.4)"}}/>
                        {ind.headline}
                      </div>
                    </div>

                    {/* Three-column expanded layout */}
                    <div className="ind-expanded-cols" style={{display:"grid",gridTemplateColumns:"1fr 1.4fr 0.8fr",gap:0}}>

                      {/* Column 1: Exposure Categories */}
                      <div style={{padding:"24px 28px",borderRight:"1px solid rgba(255,255,255,.04)"}}>
                        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"rgba(138,163,158,.5)",marginBottom:16}}>Exposure Categories</div>
                        {ind.issues.map((issue,j)=>(
                          <div key={j} style={{display:"flex",gap:10,marginBottom:12,alignItems:"flex-start"}}>
                            <div style={{width:5,height:5,borderRadius:"50%",background:"rgba(138,163,158,.35)",marginTop:7,flexShrink:0}}/>
                            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,lineHeight:1.7,color:"rgba(255,255,255,.6)"}}>{issue}</div>
                          </div>
                        ))}
                      </div>

                      {/* Column 2: Defense Analysis */}
                      <div style={{padding:"24px 28px",borderRight:"1px solid rgba(255,255,255,.04)"}}>
                        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"rgba(138,163,158,.5)",marginBottom:16}}>Defense Analysis</div>
                        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,lineHeight:2,color:"rgba(255,255,255,.55)"}}>{ind.key}</div>
                      </div>

                      {/* Column 3: Authorities + Cross-References */}
                      <div style={{padding:"24px 28px"}}>
                        <div style={{marginBottom:24}}>
                          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"rgba(138,163,158,.5)",marginBottom:12}}>Key Authorities</div>
                          {ind.authorities.map((auth,j)=>(
                            <div key={j} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,lineHeight:1.6,color:"rgba(255,255,255,.45)",fontStyle:"italic",marginBottom:8,paddingLeft:10,borderLeft:"2px solid rgba(138,163,158,.15)"}}>{auth}</div>
                          ))}
                        </div>
                        <div>
                          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"rgba(138,163,158,.5)",marginBottom:12}}>See Also</div>
                          {ind.crossRef.map((ref,j)=>(
                            <div key={j} style={{marginBottom:8,cursor:"pointer"}} onClick={(e)=>{e.stopPropagation();go(ref.type==="Publication"?"Insights":ref.type==="Tool"?"Tools":"Matters")}}>
                              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"rgba(138,163,158,.3)",marginBottom:2}}>{ref.type}</div>
                              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"rgba(255,255,255,.5)",textDecoration:"underline",textDecorationColor:"rgba(255,255,255,.15)",textUnderlineOffset:3}}>{ref.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>}
                </div>
              );
            })}
          </div>

          {/* WHY THESE INDUSTRIES */}
          <div style={{marginTop:40,padding:"28px 32px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)"}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"rgba(138,163,158,.5)",marginBottom:16}}>Why Industry-Specific Analysis</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,lineHeight:1.9,color:"rgba(255,255,255,.5)"}}>Each profile maps to a different wage order, exemption framework, and compensation structure. A hospitality employer under Wage Order 5 with tipped employees and 24/7 scheduling faces a fundamentally different compliance landscape than an automotive dealership under Wage Order 7 with commissioned salespeople and flat-rate technicians. The penalty exposure structure — and the viable defenses — diverge at every level.</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,lineHeight:1.9,color:"rgba(255,255,255,.5)"}}>The AWS election exposure in solar, the commission forfeiture pattern in automotive, the multi-worksite manageability challenge in staffing, the piece-rate legacy gap in agriculture — each requires a defense methodology calibrated to that sector's specific violation categories, governing authorities, and operational patterns.</div>
            </div>
          </div>
        </section>
      </div>

      {/* MID-PAGE CTA */}
      <div style={{padding:"40px 48px",borderTop:"1px solid #eee",borderBottom:"1px solid #eee",background:"#fafafa",textAlign:"center"}}>
        <div style={{maxWidth:540,margin:"0 auto"}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"#2c3e3a",marginBottom:12}}>Stay Current</div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:"#888",marginBottom:20,lineHeight:1.6}}>Tools, publications, and case analyses are updated as new appellate authority and reform developments emerge.</div>
          <button onClick={()=>go("Contact")} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",padding:"12px 24px",background:"#2c3e3a",color:"#fff",border:"none",cursor:"pointer"}}>Contact</button>
        </div>
      </div>

      {/* CASE LAW LABORATORY */}
      <section className="sec" ref={el=>refs.current["Cases"]=el} style={fade("Cases")}>
        <div className="sh"><div className="sn">06</div><h2 className="sl2">Case Law Laboratory</h2><div className="sln"/></div>
        <div style={{marginBottom:32,marginTop:-36,maxWidth:750}}>
          <div style={{fontFamily:"Georgia,serif",fontSize:18,lineHeight:1.6,color:"#555",fontStyle:"italic",marginBottom:12}}>The holdings that define PAGA defense — and the strategies built on each one.</div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"#999",lineHeight:1.7}}>From Kirby's foundational distinction between wages and penalties, through Naranjo's derivative cascade that turns one meal violation into four penalty streams, to Hohenshelt's equitable rescue of late arbitration payments that reversed five years of strict-liability authority. Each analysis maps the holding to a concrete defense application.</div>
        </div>
        <div className="tool-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
        {caseLaw.map((c,i)=>(
          <div key={i} className="card-hover" onClick={()=>{setExpandedCase(expandedCase===i?null:i);setExpandedInsight(null);setExpandedInd(null);setExpanded(null)}} role="button" aria-expanded={expandedCase===i} style={{
            padding:"20px",border:"1px solid "+(expandedCase===i?"#2c3e3a":"#eee"),cursor:"pointer",
            transition:"all .3s",gridColumn:expandedCase===i?"1 / -1":"auto",
            background:expandedCase===i?"#fafafa":"#fff"
          }}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#2c3e3a",marginBottom:6}}>{c.issue}</div>
                <div style={{fontSize:expandedCase===i?17:15,fontWeight:600,fontStyle:"italic",color:"#1a1a1a",lineHeight:1.3}}>{c.case}</div>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"#999",marginTop:2}}>{c.cite}</div>
                {expandedCase!==i&&c.preview&&<div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"#888",marginTop:8,lineHeight:1.6}}>{c.preview}</div>}
              </div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:16,color:"#ccc",transform:expandedCase===i?"rotate(45deg)":"rotate(0)",transition:"transform .3s",flexShrink:0,marginLeft:8}}>+</div>
            </div>
            {expandedCase===i&&<div className="case-expanded-cols" style={{marginTop:20,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,borderTop:"1px solid #eee",paddingTop:20}}>
              <div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#2c3e3a",marginBottom:8}}>Holding</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,lineHeight:1.8,color:"#555"}}>{c.holding}</div></div>
              <div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#2c3e3a",marginBottom:8}}>Impact</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,lineHeight:1.8,color:"#555"}}>{c.impact}</div></div>
              <div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#198754",marginBottom:8}}>Defense Strategy</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,lineHeight:1.8,color:"#555"}}>{c.defense}</div>
              <Link href={"/cases/"+c.slug} onClick={function(e){e.stopPropagation()}} style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:16,fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#2c3e3a",textDecoration:"none",padding:"8px 16px",border:"1px solid #2c3e3a"}}>Full Analysis →</Link>
              </div>
            </div>}
          </div>
        ))}
        </div>
        <div style={{marginTop:40,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#2c3e3a,#4a7a6f)"}}/>
          <div style={{padding:"28px 32px",border:"1px solid #e0e0e0",borderTop:"none"}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:4,textTransform:"uppercase",color:"#2c3e3a",marginBottom:20}}>Currently Monitoring</div>
            {[
              {status:"pending",case:"Leeper v. Shipt, Inc.",cite:"S289305",desc:"Whether headless PAGA claims are permitted. Will determine whether Viking River’s arbitration framework can be circumvented through strategic claim abandonment."},
              {status:"pending",case:"Camp v. Home Depot U.S.A.",cite:"S277518",desc:"Whether time rounding in general timekeeping violates the Labor Code after Donohue eliminated rounding for meal periods."},
              {status:"pending",case:"Prime Healthcare Mgmt. v. Superior Court",cite:"",desc:"Whether an arbitrator’s finding of no individual injury eliminates standing for representative PAGA claims."},
              {status:"tracking",case:"LWDA Proposed Regulations",cite:"",desc:"First-ever formal PAGA regulations published Feb. 2026. High-frequency filer framework, vexatious filer designation, cure conference procedures, settlement reporting."},
              {status:"tracking",case:"Reform Appellate Authority",cite:"",desc:"No published decision has yet interpreted the 2024 reform provisions. The first decisions will define the defense landscape."},
              {status:"tracking",case:"Hohenshelt Progeny",cite:"",desc:"Post-Hohenshelt decisions on the willful/grossly negligent/fraudulent standard. Wilson (2025) excused a one-business-day delay. Colon-Perez excused six days during a natural disaster."},
              {status:"tracking",case:"Headless PAGA in Lower Courts",cite:"",desc:"Pending Leeper, trial courts are splitting. CRST Expedited permitted broad claims; Rodriguez v. Lawrence Equipment found standing eliminated."},
              {status:"tracking",case:"PAGA Settlement Oversight",cite:"",desc:"Proposed regulations would require 45-day LWDA review of settlements with authority to object or intervene."},
            ].map(function(item,i){return(
              <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"12px 0",borderBottom:i<7?"1px solid #f0f0f0":"none"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:item.status==="pending"?"#CC8800":"#2c3e3a",marginTop:5,flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:600,color:"#333"}}>{item.case}{item.cite&&<span style={{fontWeight:400,color:"#999",fontSize:11}}> ({item.cite})</span>}<span style={{fontFamily:"'Outfit',sans-serif",fontSize:8,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:item.status==="pending"?"#CC8800":"#2c3e3a",marginLeft:8}}>{item.status==="pending"?"PENDING":"TRACKING"}</span></div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"#888",lineHeight:1.6,marginTop:2}}>{item.desc}</div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      <div style={{maxWidth:1100,margin:"0 auto",height:1,background:"linear-gradient(90deg,transparent,#ddd,transparent)"}}/>

      {/* MATTERS */}
      <section className="sec" ref={el=>refs.current["Matters"]=el} style={fade("Matters")}>
        <div className="sh"><div className="sn">07</div><h2 className="sl2">Select Matters</h2><div className="sln"/></div>
        <div style={{marginBottom:32,marginTop:-36,maxWidth:750}}>
          <div style={{fontFamily:"Georgia,serif",fontSize:19,lineHeight:1.6,color:"#555",fontStyle:"italic",marginBottom:12}}>Every engagement below produced a specific, identifiable defense outcome — not a participation narrative.</div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"#999",lineHeight:1.7}}>Exposure modeling that changed settlement authority. Novel theories that opened new lines of defense. Forensic analysis that collapsed inflated demands. Across hospitality, automotive, healthcare staffing, and single-plaintiff FEHA defense. Click to expand.</div>
        </div>
        <div className="tool-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
        {matters.map((m,i)=>(
          <div key={i} className="card-hover" onClick={()=>{setExpanded(expanded===i?null:i);setExpandedInsight(null);setExpandedCase(null);setExpandedInd(null)}} role="button" aria-expanded={expanded===i} style={{
            padding:"20px",border:"1px solid "+(expanded===i?"#2c3e3a":"#eee"),cursor:"pointer",
            transition:"all .3s",gridColumn:expanded===i?"1 / -1":"auto",
            background:expanded===i?"#fafafa":"#fff"
          }}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#2c3e3a",marginBottom:6}}>{m.cat}</div>
                <div style={{fontSize:expanded===i?16:14,fontWeight:600,color:"#1a1a1a",lineHeight:1.3}}>{m.title}</div>
                {expanded!==i&&<div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"#999",marginTop:8,lineHeight:1.6}}>{m.short}</div>}
              </div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:16,color:"#ccc",transform:expanded===i?"rotate(45deg)":"rotate(0)",transition:"transform .3s",flexShrink:0,marginLeft:8}}>+</div>
            </div>
            {expanded===i&&<div style={{marginTop:16,borderTop:"1px solid #eee",paddingTop:16}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"#888",marginBottom:12}}>{m.short}</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,lineHeight:2,color:"#555"}}>{m.full}</div>
              {m.quote&&<div style={{marginTop:16,padding:"16px 20px",background:"#f8faf9",borderLeft:"3px solid #2c3e3a"}}>
                <div style={{fontFamily:"Georgia,serif",fontSize:14,fontStyle:"italic",color:"#555",lineHeight:1.6}}>"{m.quote.text}"</div>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#999",marginTop:8,letterSpacing:2,textTransform:"uppercase"}}>{m.quote.attr}</div>
              </div>}
              <div style={{marginTop:16,fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#2c3e3a",padding:"8px 16px",background:"rgba(44,62,58,.05)",display:"inline-block"}}>{m.result}</div>
            </div>}
          </div>
        ))}
        </div>
      </section>

      {/* BACKGROUND */}
      <section className="sec" ref={el=>refs.current["Background"]=el} style={fade("Background")}>
        <div className="sh"><div className="sn">08</div><h2 className="sl2">Background</h2><div className="sln"/></div>
        <div className="about-grid">
          <div className="at2">
            <p>I started on the plaintiff side — litigating wage-and-hour class actions at a Los Angeles firm that prosecuted meal-and-rest, overtime, and off-the-clock claims against mid-market and enterprise employers. That work taught me where defendants lose cases: not at trial, but in the assumptions embedded in their exposure models, the concessions made before anyone runs the numbers, and the certification arguments they don't see coming. Every defense strategy I build starts from that perspective.</p>
            <p>The transition to defense was deliberate. At a global litigation firm's employment practice group, I built the quantitative exposure models, novel defense theories, and sampling methodologies that became standard analytical tools across the practice group. The "Two Hotels" temporal bifurcation framework, the 174-question expert deposition outline, the three-scenario penalty model — each originated from the recognition that PAGA defense requires a different kind of rigor than most employment litigation. The results showed: a mediator described one declaration as among the strongest he'd reviewed in his career; a client's executive requested that the carrier transfer new matters to maintain the working relationship; a partner noted that a novel liability theory I'd identified had never been raised in his decades of practice.</p>
            <p>Earlier, I practiced intellectual property at a boutique firm — trademark prosecution, licensing disputes, and the kind of close-grained statutory interpretation that transactional IP demands. The training shows in the work I do now: commission plan analysis requires the same precision as a license agreement, arbitration clause drafting requires the same attention to contingency, and PAGA's penalty architecture rewards the same instinct for structural reading.</p>
            <p>The thread across all of it: I treat every legal problem as a system to be understood completely before a position is taken. The tools and analyses on this site exist because that is how I practice — and because the 2024 reforms created a landscape where the attorneys building the analytical frameworks now will define the field when appellate authority arrives.</p>
          </div>
          <div className="as2">
            <h4>Education</h4>
            <div style={{marginBottom:14}}><p style={{color:"#333",fontWeight:500}}>Pepperdine University School of Law</p><p>Juris Doctor</p><p style={{color:"#888",fontSize:12}}>Full-Tuition Dean's Merit Scholarship · Dean's Honor List (Top 15%)</p></div>
            <div><p style={{color:"#333",fontWeight:500}}>University of California, Berkeley</p><p>Bachelor of Arts</p><p style={{color:"#888",fontSize:12}}>Graduated with Honors · Dean's Honors List (Top 4%, College of Letters & Science)</p></div>
            <h4>Admissions</h4>
            <ul style={{padding:0}}>{["State Bar of California (No. 353639)","U.S.D.C. Central District of California","U.S.D.C. Northern District of California","U.S.D.C. Eastern District of California","U.S.D.C. Southern District of California"].map((a,i)=><li key={i}>{a}</li>)}</ul>
            <h4>Practice Trajectory</h4>
            <p style={{lineHeight:2.2}}>Transactional IP (trademark prosecution, licensing) → Plaintiff-side wage-and-hour class actions → Employment defense (PAGA, class actions, investigations, counseling)</p>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <div ref={el=>refs.current["Resources"]=el} style={{background:"#f9f9f9",borderTop:"1px solid #eee",borderBottom:"1px solid #eee"}}>
        <section className="sec">
          <div className="sh"><div className="sn">09</div><h2 className="sl2">Resources</h2><div className="sln"/></div>
          <p style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:"#888",marginBottom:32,marginTop:-36,maxWidth:600}}>Checklists, templates, and reference frameworks developed from active PAGA and class action defense — structured for carrier reporting, compliance documentation, and litigation preparation.</p>
          <div className="resource-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:28}}>
            {[
              {title:"PAGA Notice Response Checklist",sub:"The First 72 Hours",desc:"Five-phase action plan from Day 1 through post-65-day litigation preparation. Matter information sheet, remediation plan structure, carrier notification guide, and key authorities appendix."},
              {title:"Penalty Cap Qualification Tracker",sub:"§§ 2699(g) and 2699(h) Documentation",desc:"Two-track checklist for the 15% and 30% caps with statutory citations. Common documentation failures, 10-tab evidence assembly guide, and dollar-impact worksheet."},
              {title:"Pre-PAGA Compliance Audit",sub:"Self-Assessment for California Employers",desc:"24-item assessment across five compliance categories with three industry-specific addenda. Scored output with remediation priority matrix and 90-day implementation timeline."},
              {title:"Three-Scenario Exposure Template",sub:"Carrier-Ready Reporting Format",desc:"Structured template for presenting plaintiff maximum, data-driven realistic, and defense best case scenarios. Per-category breakdown, penalty cap impact analysis, and settlement authority format."},
              {title:"Cure Proposal Framework",sub:"Employers Under 100 Employees",desc:"Step-by-step guide to the 33-day cure proposal process under § 2699.3. Sample proposal structure, LWDA filing procedures, cure conference preparation, and post-cure documentation."},
              {title:"Regular Rate Audit Worksheet",sub:"Ferra and Alvarado Exposure",desc:"Calculating correct regular rates across compensation types — commissions, flat-sum bonuses, piece-rate, shift differentials. Side-by-side comparison with per-employee underpayment quantification."},
              {title:"Derivative Cascade Reference",sub:"Naranjo Stacking — Pre- and Post-Reform",desc:"Visual reference mapping how a single meal period violation generates up to four penalty streams. Pre-reform full cascade and post-reform § 2699(i) anti-stacking limitations."},
              {title:"Arbitration Agreement Checklist",sub:"Post-Adolph, Post-Hohenshelt",desc:"14-point review protocol. PAGA splitting provision analysis, poison pill identification, Iskanian waiver check, fee payment compliance, and Hohenshelt-responsive language."},
              {title:"Wage Statement Compliance Matrix",sub:"Nine Elements of § 226(a)",desc:"Element-by-element compliance guide with common deficiency patterns, risk ratings, Naranjo derivative exposure, and remediation steps including post-Ferra regular rate display requirements."},
              {title:"Mediation Preparation Guide",sub:"From Exposure Model to Settlement Authority",desc:"Three-scenario exposure presentation, penalty cap documentation package assembly, plaintiff demand rebuttal framework, carrier authority recommendation format, and Moniz requirements."},
              {title:"Early Evaluation Conference Playbook",sub:"Maximizing § 2699.3(f)",desc:"Strategic guide to the post-reform EEC process. Confidential statement drafting, cure identification strategy, neutral evaluator preparation, and post-conference positioning."},
              {title:"2024 Reform Quick Reference",sub:"AB 2288 / SB 92 — Defense Provisions",desc:"Single-page reference covering penalty caps (§§ 2699(g)-(h)), anti-stacking (§ 2699(i)), standing (§ 2699(c)(1)), manageability (§ 2699(p)), reduced penalties, weekly halving (§ 2699(o)), and cure procedures."},
              {title:"Carrier Status Report Template",sub:"First 30 Days After Notice",desc:"Structured format for the initial carrier report: matter summary, three-scenario exposure analysis, defense strategy recommendation, litigation budget estimate, and early resolution assessment."},
              {title:"Expert Deposition Framework",sub:"Statistical Sampling Challenges",desc:"Six-domain deposition outline targeting plaintiff's sampling expert: population definition, sample selection, violation definition, paid premiums, confidence intervals, and affirmative defense accommodation."},
              {title:"Commission Plan Audit Checklist",sub:"Sciborski Forfeiture and § 2751 Compliance",desc:"Timing analysis framework for commission payment structures. Identifies forfeiture exposure for departed employees with pending deals, § 2751 written agreement requirements, and regular rate inclusion methodology."},
              {title:"Manageability Motion Framework",sub:"Scope Limitation Under § 2699(p) and Estrada",desc:"Template for pre-trial manageability motions. Multi-worksite analysis, job classification variation mapping, individualized proof identification, and scope limitation order language."},
            ].map((r,i) => (
              <div key={i} className="card-hover" style={{padding:"24px 20px",border:"1px solid #e0e0e0",background:"#fff",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"#2c3e3a"}}/>
                <div style={{fontSize:14,fontWeight:700,color:"#1a1a1a",marginBottom:4,lineHeight:1.3}}>{r.title}</div>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"#888",fontStyle:"italic",marginBottom:10}}>{r.sub}</div>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,lineHeight:1.7,color:"#777"}}>{r.desc}</div>
              </div>
            ))}
          </div>
          <div style={{maxWidth:480,margin:"0 auto",textAlign:"center"}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"#888",marginBottom:8}}>Contact to request any of these resources.</div>
            <button onClick={()=>go("Contact")} style={{fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",padding:"12px 24px",background:"#2c3e3a",color:"#fff",border:"none",cursor:"pointer",whiteSpace:"nowrap"}}>Get in Touch</button>
          </div>
        </section>
      </div>

      {/* CONTACT */}
      <section ref={el=>refs.current["Contact"]=el} id="section-contact" className="contact">
        {[{w:500,h:500,t:-150,r:-120},{w:300,h:300,b:-100,l:"10%"},{w:180,h:180,t:"35%",r:"20%"}].map((g,i)=><div key={i} className="geo" style={{...g,animation:"float "+(7+i*2)+"s ease-in-out infinite "+i*0.5+"s"}}/>)}
        <div className="contact-in">
          <div>
            <div className="contact-heading">The analysis<br/>starts here.</div>
            <div className="contact-sub">Available for referrals, co-counsel arrangements, carrier-assigned defense, workplace investigations, and compliance advisory across California.</div>
            {/* URGENCY PROMPT - Change #10 */}
            <div style={{marginTop:28,padding:"20px 24px",background:"rgba(204,136,0,.08)",border:"1px solid rgba(204,136,0,.2)",borderLeft:"4px solid #CC8800"}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:600,color:"#CC8800",marginBottom:6}}>Time-Sensitive</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,lineHeight:1.8,color:"rgba(255,255,255,.5)"}}>If you've received a PAGA notice, the 33-day cure proposal submission window for employers under 100 employees may already be running. The 60-day remediation window for penalty cap qualification (§ 2699(h)(1)) starts when you receive the notice.</div>
            </div>
          </div>
          <div className="cd">
            <h4>Email</h4><p><a href="mailto:arthur.karadzhyan@gmail.com" aria-label="Email Arthur Karadzhyan">arthur.karadzhyan@gmail.com</a></p>
            <h4>Phone</h4><p><a href="tel:+18184218324" aria-label="Call Arthur Karadzhyan">(818) 421-8324</a></p>
            <h4>Location</h4><p>Los Angeles, California</p>
            <h4>Bar Number</h4><p>State Bar of California, No. 353639</p>
            <h4>LinkedIn</h4><p><a href="https://www.linkedin.com/in/karadzhyan/" target="_blank" rel="noopener noreferrer">linkedin.com/in/karadzhyan</a></p>

            {/* FIRST 48 HOURS - Change #17/28 */}
            <div style={{marginTop:24,paddingTop:20,borderTop:"1px solid rgba(255,255,255,.1)"}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"rgba(255,255,255,.35)",marginBottom:16}}>What Happens When You Call</div>
              <div className="contact-timeline" style={{display:"flex",gap:0,alignItems:"flex-start"}}>
                {[["Call","Scope & deadlines"],["24 hrs","Preliminary assessment"],["48 hrs","Action plan with citations"],["2 wks","Carrier status report"]].map(([time,label],i)=>(
                  <div key={i} style={{flex:1,textAlign:"center",position:"relative"}}>
                    {i>0&&<div style={{position:"absolute",top:4,left:0,right:"50%",height:1,background:"rgba(138,163,158,.3)"}}/>}
                    {i<3&&<div style={{position:"absolute",top:4,left:"50%",right:0,height:1,background:"rgba(138,163,158,.3)"}}/>}
                    <div style={{width:9,height:9,borderRadius:"50%",background:"#8aa39e",margin:"0 auto 8px",position:"relative",zIndex:1}}/>
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,color:"#8aa39e"}}>{time}</div>
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:"rgba(255,255,255,.35)",marginTop:4}}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARRIER PANEL - Change #15 */}
            <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid rgba(255,255,255,.1)"}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"rgba(255,255,255,.35)",marginBottom:12}}>For Carriers</div>
              <div className="carrier-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"rgba(255,255,255,.5)",lineHeight:1.8}}>Available for panel assignments across California. EPLI defense experience spanning hospitality, automotive, healthcare staffing, solar, technology, and retail industries. Conflict check turnaround: 48 hours.</div>
                </div>
                <div>
                  {[["14 days","Three-scenario exposure report"],["30 days","Carrier status report with authority recommendation"],["Ongoing","Quarterly status updates with budget tracking"]].map(([time,item],j)=>(
                    <div key={j} style={{display:"flex",gap:8,marginBottom:6}}>
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:600,color:"#8aa39e",width:55,flexShrink:0}}>{time}</div>
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"rgba(255,255,255,.35)"}}>{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER LINE */}
        <div style={{maxWidth:1100,margin:"40px auto 0",paddingTop:28,borderTop:"1px solid rgba(255,255,255,.08)",textAlign:"center",position:"relative",zIndex:2}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"rgba(255,255,255,.5)"}}>Tools and publications updated as new authority develops.</div>
        </div>
      </section>


      {/* PRIVACY MODAL */}
      {showPrivacy&&<div role="dialog" aria-modal="true" aria-label="Privacy policy" style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",padding:24}} onClick={()=>setShowPrivacy(false)}>
        <div onClick={e=>e.stopPropagation()} style={{background:"#fff",maxWidth:640,width:"100%",maxHeight:"80vh",overflow:"auto",padding:"48px 40px",position:"relative"}}>
          <button onClick={()=>setShowPrivacy(false)} style={{position:"absolute",top:16,right:16,background:"none",border:"none",fontSize:20,color:"#999",cursor:"pointer"}}>×</button>
          <S fontSize={10} fontWeight={600} letterSpacing={4} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>Privacy & Terms</S>
          <S fontSize={10} color="#999" marginBottom={24}>Last updated: March 2026</S>
          <S fontSize={13} lineHeight="2" color="#555" marginBottom={16}><strong>Information Collection.</strong> This website does not use cookies, tracking pixels, or analytics software. No personal information is collected automatically. If you contact the attorney via email or phone, the information you provide is used solely to respond to your inquiry and evaluate potential representation.</S>
          <S fontSize={13} lineHeight="2" color="#555" marginBottom={16}><strong>Interactive Tools.</strong> All calculations performed by the interactive tools on this site are executed entirely in your browser. No inputs, outputs, or tool interactions are transmitted to any server, stored, or logged. Your exposure models remain on your device.</S>
          <S fontSize={13} lineHeight="2" color="#555" marginBottom={16}><strong>No Legal Advice.</strong> This website provides general information about California employment law defense. It does not constitute legal advice, create an attorney-client relationship, or establish any duty of representation. The interactive tools produce illustrative estimates based on user-supplied inputs and statutory frameworks; they are not substitutes for individualized legal analysis.</S>
          <S fontSize={13} lineHeight="2" color="#555" marginBottom={16}><strong>Attorney Advertising.</strong> This website constitutes attorney advertising under California Rules of Professional Conduct, Rule 7.1. Arthur Karadzhyan is responsible for this content. Prior results described on this site do not guarantee or predict a similar outcome in any future matter.</S>
          <S fontSize={13} lineHeight="2" color="#555" marginBottom={16}><strong>Professional Liability Insurance.</strong> Information regarding professional liability insurance coverage is available upon request.</S>
          <S fontSize={13} lineHeight="2" color="#555"><strong>California Residents.</strong> Under the California Consumer Privacy Act (CCPA), California residents have the right to know what personal information is collected and to request its deletion. Because this website does not collect personal information automatically, these rights are implicated only if you voluntarily provide personal information via email or phone. To exercise your rights, contact arthur.karadzhyan@gmail.com.</S>
        </div>
      </div>}

      {/* FOOTER */}
      <div style={{padding:"24px 48px",textAlign:"center",borderTop:"1px solid #eee",background:"#fafafa"}}>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#999",letterSpacing:2}}>© {new Date().getFullYear()} Arthur Karadzhyan · Los Angeles, California</div>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:"#999",letterSpacing:1,marginTop:6}}>Attorney Advertising · Prior results do not guarantee a similar outcome · This website does not constitute legal advice · <span style={{cursor:"pointer",textDecoration:"underline",textUnderlineOffset:2}} onClick={()=>setShowPrivacy(true)}>Privacy & Terms</span></div>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:"#aaa",letterSpacing:1,marginTop:6}}>No information submitted through this website is stored or shared. Contact information is used solely to respond to inquiries. Professional liability insurance status available upon request.</div>
      </div>
    </div>
  );
}
