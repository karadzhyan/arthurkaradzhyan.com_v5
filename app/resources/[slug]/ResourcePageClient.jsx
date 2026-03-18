"use client";
import { useState } from "react";
import Link from "next/link";
import { getResourceBySlug } from "@/data/resources";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

var S = function(p) { return <div style={{fontFamily:"'Outfit',sans-serif",...p}}>{p.children}</div>; };

function Accordion({title, subsections, text}) {
  var s = useState(false); var open = s[0]; var setOpen = s[1];
  return (
    <div style={{border:"1px solid #e0e0e0",marginBottom:8,overflow:"hidden"}}>
      <div onClick={function(){setOpen(!open)}} style={{padding:"16px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",background:open?"#fafafa":"#fff"}}>
        <S fontSize={13} fontWeight={600} color="#1a1a1a">{title}</S>
        <span style={{fontFamily:"'Outfit',sans-serif",fontSize:16,color:"#ccc",transform:open?"rotate(45deg)":"rotate(0)",transition:"transform .3s"}}>+</span>
      </div>
      {open && <div style={{padding:"0 20px 20px",borderTop:"1px solid #eee"}}>
        {text && <S fontSize={13} lineHeight="2" color="#555" style={{paddingTop:16,whiteSpace:"pre-line"}}>{text}</S>}
        {subsections && subsections.map(function(sub,j){return(
          <div key={j} style={{paddingTop:16}}>
            <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#2c3e3a" marginBottom={6}>{sub.label}</S>
            <S fontSize={13} lineHeight="2" color="#555" style={{whiteSpace:"pre-line"}}>{sub.text}</S>
          </div>
        )})}
      </div>}
    </div>
  );
}

function Block({block}) {
  if (block.type === "timeline") {
    return (
      <div style={{position:"relative",paddingLeft:24}}>
        <div style={{position:"absolute",left:5,top:8,bottom:8,width:1,background:"#e0e0e0"}}/>
        {block.items.map(function(item,i){
          var dotColor = item.dot==="critical"?"#dc3545":item.dot==="active"?"#2c3e3a":"#999";
          return(
            <div key={i} style={{position:"relative",paddingBottom:28}}>
              <div style={{position:"absolute",left:-21,top:6,width:11,height:11,borderRadius:"50%",background:dotColor,border:"2px solid #fff",boxShadow:"0 0 0 1px "+dotColor}}/>
              <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color={dotColor} marginBottom={4}>{item.day}</S>
              <div style={{fontSize:17,fontWeight:700,color:"#1a1a1a",lineHeight:1.3,marginBottom:8}}>{item.title}</div>
              <S fontSize={13} lineHeight="2" color="#555" marginBottom={12}>{item.body}</S>
              {item.actions && <div style={{paddingLeft:16,borderLeft:"2px solid #e0e0e0"}}>
                {item.actions.map(function(a,j){return(
                  <div key={j} style={{display:"flex",gap:8,marginBottom:8,alignItems:"flex-start"}}>
                    <div style={{width:5,height:5,borderRadius:"50%",background:"#2c3e3a",marginTop:8,flexShrink:0}}/>
                    <S fontSize={12} lineHeight="1.9" color="#666">{a}</S>
                  </div>
                )})}
              </div>}
            </div>
          );
        })}
      </div>
    );
  }

  if (block.type === "danger-box") {
    return (
      <div style={{padding:"16px 20px",background:"#fff5f5",border:"1px solid #dc3545",marginBottom:16}}>
        <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#dc3545" marginBottom={6}>{block.label}</S>
        <S fontSize={13} lineHeight="2" color="#555">{block.text}</S>
      </div>
    );
  }

  if (block.type === "warning-box") {
    return (
      <div style={{padding:"16px 20px",background:"#fffbf0",border:"1px solid #CC8800",marginBottom:16}}>
        <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#CC8800" marginBottom={6}>{block.label}</S>
        <S fontSize={13} lineHeight="2" color="#555">{block.text}</S>
      </div>
    );
  }

  if (block.type === "info-box") {
    return (
      <div style={{padding:"16px 20px",background:"#f0f5f4",border:"1px solid #e0e8e6",marginBottom:16}}>
        <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#2c3e3a" marginBottom={6}>{block.label}</S>
        <S fontSize={13} lineHeight="2" color="#555">{block.text}</S>
      </div>
    );
  }

  if (block.type === "checklist") {
    return (
      <div style={{marginBottom:16}}>
        {block.items.map(function(item,i){return(
          <div key={i} style={{display:"flex",gap:12,padding:"14px 0",borderBottom:i<block.items.length-1?"1px solid #f0f0f0":"none",alignItems:"flex-start"}}>
            <div style={{width:18,height:18,border:"2px solid #2c3e3a",borderRadius:3,flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div style={{width:8,height:8,background:"#2c3e3a",borderRadius:1}}/>
            </div>
            <div>
              <S fontSize={12} fontWeight={600} color="#1a1a1a" marginBottom={2}>{item.label}</S>
              <S fontSize={12} lineHeight="1.8" color="#666">{item.text}</S>
            </div>
          </div>
        )})}
      </div>
    );
  }

  if (block.type === "curability-grid") {
    var colors = {curable:{bg:"#f0fff0",border:"#c0e0c0",label:"Curable",color:"#198754"},difficult:{bg:"#fffbf0",border:"#e0d0a0",label:"Potentially Curable",color:"#CC8800"},noncurable:{bg:"#fff5f5",border:"#e0c0c0",label:"Non-Curable",color:"#dc3545"}};
    return (
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        {block.items.map(function(item,i){var c=colors[item.status]||colors.difficult;return(
          <div key={i} style={{padding:"16px 18px",background:c.bg,border:"1px solid "+c.border}}>
            <S fontSize={8} fontWeight={600} letterSpacing={2} textTransform="uppercase" color={c.color} marginBottom={4}>{c.label}</S>
            <S fontSize={13} fontWeight={600} color="#1a1a1a" marginBottom={6}>{item.title}</S>
            <S fontSize={12} lineHeight="1.8" color="#555">{item.body}</S>
          </div>
        )})}
      </div>
    );
  }

  if (block.type === "proposal-section") {
    return (
      <div style={{padding:"20px 24px",border:"1px solid #e0e0e0",marginBottom:12,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"#2c3e3a"}}/>
        <div style={{display:"flex",gap:12,alignItems:"baseline",marginBottom:8}}>
          <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#2c3e3a">{block.num}</S>
          <div style={{fontSize:16,fontWeight:700,color:"#1a1a1a"}}>{block.title}</div>
        </div>
        <S fontSize={13} lineHeight="2" color="#555" style={{whiteSpace:"pre-line"}}>{block.body}</S>
      </div>
    );
  }

  if (block.type === "sample-block") {
    return (
      <div style={{padding:"20px 24px",background:"#f9f9f9",border:"1px solid #e8e8e8",borderLeft:"3px solid #2c3e3a",marginBottom:16}}>
        <S fontSize={9} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>{block.label}</S>
        <S fontSize={12} lineHeight="2" color="#555" style={{whiteSpace:"pre-line",fontStyle:"italic"}}>{block.text}</S>
      </div>
    );
  }

  if (block.type === "calc-block") {
    return (
      <div style={{marginBottom:16,border:"1px solid #e0e0e0",overflow:"hidden"}}>
        <div style={{padding:"12px 20px",background:"#f8faf9",borderBottom:"1px solid #e0e0e0"}}>
          <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#2c3e3a">{block.header}</S>
        </div>
        {block.rows.map(function(row,i){return(
          <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 20px",borderBottom:i<block.rows.length-1?"1px solid #f0f0f0":"none",background:row.total?"#f0fff0":"transparent"}}>
            <S fontSize={12} color={row.total?"#198754":"#555"} fontWeight={row.total?600:400}>{row.label}</S>
            <S fontSize={12} fontWeight={600} color={row.total?"#198754":"#1a1a1a"} style={{fontVariantNumeric:"tabular-nums"}}>{row.value}</S>
          </div>
        )})}
      </div>
    );
  }

  if (block.type === "accordion") {
    return <Accordion title={block.title} subsections={block.subsections} text={block.text} />;
  }

  if (block.type === "hypothetical") {
    return (
      <div style={{padding:"16px 20px",background:"#fafafa",border:"1px solid #e8e8e8",borderLeft:"3px solid #CC8800",marginBottom:12}}>
        <S fontSize={9} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#CC8800" marginBottom={6}>{block.label}</S>
        <S fontSize={12} lineHeight="1.9" color="#555">{block.text}</S>
      </div>
    );
  }

  if (block.type === "motion-component") {
    var tagColors = {required:"#2c3e3a",critical:"#dc3545",strategic:"#CC8800"};
    var tc = tagColors[block.tag] || "#2c3e3a";
    return (
      <div style={{padding:"20px 24px",border:"1px solid #e0e0e0",marginBottom:12,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:tc}}/>
        <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:8}}>
          <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color={tc}>{block.num}</S>
          <div style={{fontSize:16,fontWeight:700,color:"#1a1a1a",flex:1}}>{block.title}</div>
          <S fontSize={8} fontWeight={600} letterSpacing={1} textTransform="uppercase" color={tc} style={{padding:"2px 8px",border:"1px solid "+tc}}>{block.tag}</S>
        </div>
        <S fontSize={13} lineHeight="2" color="#555" style={{whiteSpace:"pre-line"}}>{block.text}</S>
      </div>
    );
  }

  if (block.type === "scenario-panel") {
    var lvlColors = {strong:{bg:"#f0fff0",border:"#c0e0c0",color:"#198754"},moderate:{bg:"#fffbf0",border:"#e0d0a0",color:"#CC8800"},weak:{bg:"#fff5f5",border:"#e0c0c0",color:"#dc3545"}};
    return (
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:16}}>
        {block.items.map(function(item,i){var c=lvlColors[item.level]||lvlColors.moderate;return(
          <div key={i} style={{padding:"20px 18px",background:c.bg,border:"1px solid "+c.border}}>
            <S fontSize={8} fontWeight={600} letterSpacing={2} textTransform="uppercase" color={c.color} marginBottom={6}>{item.level}</S>
            <S fontSize={14} fontWeight={600} color="#1a1a1a" marginBottom={8}>{item.title}</S>
            <S fontSize={12} lineHeight="1.8" color="#555">{item.body}</S>
          </div>
        )})}
      </div>
    );
  }

  return null;
}

function ReformPage({res}) {
  var s = useState(0); var activeTab = s[0]; var setActiveTab = s[1];
  var tab = res.tabs[activeTab];
  return (
    <div>
      {/* EFFECTIVE DATE */}
      <div style={{padding:"16px 20px",background:"#f0f5f4",border:"1px solid #e0e8e6",marginBottom:32}}>
        <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#2c3e3a" marginBottom={4}>Effective Date: {res.effectiveDate}</S>
        <S fontSize={12} lineHeight="1.8" color="#555">{res.effectiveNote}</S>
      </div>

      {/* CASCADE */}
      {res.cascade && <div style={{marginBottom:48}}>
        <S fontSize={10} fontWeight={600} letterSpacing={4} textTransform="uppercase" color="#2c3e3a" marginBottom={12}>Cumulative Impact — Exposure Reduction Cascade</S>
        <S fontSize={12} color="#888" marginBottom={20}>{res.cascade.description}</S>
        <div style={{display:"flex",gap:0,alignItems:"stretch"}}>
          {res.cascade.steps.map(function(step,i){
            var bg = step.level==="start"?"#fff5f5":step.level==="end"?"#f0fff0":"#fffbf0";
            var border = step.level==="start"?"#e0c0c0":step.level==="end"?"#c0e0c0":"#e0d0a0";
            return(
              <div key={i} style={{flex:1,padding:"16px 14px",background:bg,border:"1px solid "+border,borderRight:i<res.cascade.steps.length-1?"none":"1px solid "+border}}>
                <S fontSize={9} fontWeight={600} letterSpacing={1} textTransform="uppercase" color="#999" marginBottom={4}>{step.num}</S>
                <S fontSize={11} fontWeight={600} color="#1a1a1a" marginBottom={4}>{step.title}</S>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:22,fontWeight:700,color:step.level==="end"?"#198754":step.level==="start"?"#dc3545":"#CC8800",marginBottom:4}}>{step.value}</div>
                <S fontSize={10} color="#888" lineHeight="1.5">{step.detail}</S>
              </div>
            );
          })}
        </div>
        <div style={{padding:"12px 16px",background:"#f0fff0",border:"1px solid #c0e0c0",borderTop:"none"}}>
          <S fontSize={13} fontWeight={600} color="#198754">{res.cascade.result}</S>
          <S fontSize={10} color="#888" style={{marginTop:4}}>{res.cascade.note}</S>
        </div>
      </div>}

      {/* TABS */}
      <div style={{borderBottom:"2px solid #e0e0e0",display:"flex",gap:0,marginBottom:32,flexWrap:"wrap"}}>
        {res.tabs.map(function(t,i){return(
          <button key={t.id} onClick={function(){setActiveTab(i)}} style={{
            fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:activeTab===i?600:400,
            letterSpacing:2,textTransform:"uppercase",
            padding:"12px 20px",border:"none",cursor:"pointer",
            color:activeTab===i?"#2c3e3a":"#999",
            background:activeTab===i?"#f0f5f4":"transparent",
            borderBottom:activeTab===i?"2px solid #2c3e3a":"2px solid transparent",
            marginBottom:-2
          }}>{t.label}</button>
        )})}
      </div>

      {/* TAB CONTENT */}
      {tab.intro && <S fontSize={13} lineHeight="2" color="#555" marginBottom={24}>{tab.intro}</S>}

      {/* Provisions */}
      {tab.provisions && tab.provisions.map(function(prov,i){return(
        <div key={i} style={{padding:"20px 24px",border:"1px solid #e0e0e0",marginBottom:12,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"#2c3e3a"}}/>
          <div style={{display:"flex",gap:12,alignItems:"baseline",marginBottom:4}}>
            <S fontSize={10} fontWeight={600} letterSpacing={1} color="#2c3e3a">{prov.section}</S>
            <div style={{fontSize:16,fontWeight:700,color:"#1a1a1a"}}>{prov.title}</div>
          </div>
          <S fontSize={12} fontWeight={500} color="#888" marginBottom={8}>{prov.summary}</S>
          <S fontSize={13} lineHeight="2" color="#555" marginBottom={10} style={{whiteSpace:"pre-line"}}>{prov.body}</S>
          <div style={{padding:"10px 14px",background:"#f0fff0",border:"1px solid #c0e0c0"}}>
            <S fontSize={9} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#198754" marginBottom={4}>Defense Action</S>
            <S fontSize={12} lineHeight="1.8" color="#555">{prov.defense}</S>
          </div>
        </div>
      )})}

      {/* Notes within tab */}
      {tab.notes && tab.notes.map(function(note,i){return <Block key={"n"+i} block={note}/>})}

      {/* Open questions */}
      {tab.openQuestions && <div style={{marginTop:16}}>
        {tab.openQuestions.map(function(q,i){return(
          <div key={i} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid #f0f0f0",alignItems:"flex-start"}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:16,fontWeight:700,color:"#2c3e3a",opacity:0.3,flexShrink:0,width:24,textAlign:"right"}}>{q.num}</div>
            <S fontSize={13} lineHeight="1.8" color="#555">{q.text}</S>
          </div>
        )})}
      </div>}

      {/* Comparison */}
      {tab.comparison && <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,marginBottom:24}}>
        <div style={{padding:"24px",background:"#fff5f5",border:"1px solid #e0c0c0"}}>
          <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#dc3545" marginBottom={16}>{tab.comparison.pre.label}</S>
          {tab.comparison.pre.items.map(function(item,i){return(
            <div key={i} style={{marginBottom:10}}>
              <S fontSize={11} fontWeight={600} color="#1a1a1a">{item.label}</S>
              <S fontSize={12} color="#555">{item.text}</S>
            </div>
          )})}
        </div>
        <div style={{padding:"24px",background:"#f0fff0",border:"1px solid #c0e0c0",borderLeft:"none"}}>
          <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#198754" marginBottom={16}>{tab.comparison.post.label}</S>
          {tab.comparison.post.items.map(function(item,i){return(
            <div key={i} style={{marginBottom:10}}>
              <S fontSize={11} fontWeight={600} color="#1a1a1a">{item.label}</S>
              <S fontSize={12} color="#555">{item.text}</S>
            </div>
          )})}
        </div>
      </div>}

      {/* Reference table */}
      {tab.referenceTable && <div style={{border:"1px solid #e0e0e0",overflow:"hidden",marginBottom:24}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1.5fr",background:"#f8faf9",borderBottom:"1px solid #e0e0e0"}}>
          <S fontSize={9} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#2c3e3a" style={{padding:"10px 14px"}}>Provision</S>
          <S fontSize={9} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#2c3e3a" style={{padding:"10px 14px"}}>Section</S>
          <S fontSize={9} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#2c3e3a" style={{padding:"10px 14px"}}>Defense Impact</S>
        </div>
        {tab.referenceTable.map(function(row,i){return(
          <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1.5fr",borderBottom:i<tab.referenceTable.length-1?"1px solid #f0f0f0":"none"}}>
            <S fontSize={12} fontWeight={500} color="#1a1a1a" style={{padding:"10px 14px"}}>{row.provision}</S>
            <S fontSize={11} color="#2c3e3a" style={{padding:"10px 14px"}}>{row.section}</S>
            <S fontSize={11} color="#555" style={{padding:"10px 14px"}}>{row.impact}</S>
          </div>
        )})}
      </div>}
    </div>
  );
}

function SectionedPage({res}) {
  return (
    <div>
      {/* STATUTORY CONTEXT */}
      {res.statutoryContext && <div style={{marginBottom:48,padding:"24px 28px",background:"#f8faf9",border:"1px solid #e0e8e6"}}>
        {res.statutoryContext.paragraphs.map(function(p,i){return(
          <div key={i} style={{marginBottom:i<res.statutoryContext.paragraphs.length-1?16:0}}>
            <S fontSize={10} fontWeight={600} letterSpacing={2} textTransform="uppercase" color="#2c3e3a" marginBottom={4}>{p.label}</S>
            <S fontSize={13} lineHeight="2" color="#555">{p.text}</S>
          </div>
        )})}
      </div>}

      {/* SECTIONS */}
      {res.sections.map(function(section,i){return(
        <div key={i} style={{marginBottom:60}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:42,fontWeight:300,color:"#2c3e3a",opacity:0.18,lineHeight:1}}>{section.number}</div>
            <S fontSize={11} fontWeight={500} letterSpacing={5} textTransform="uppercase" color="#2c3e3a">{section.label}</S>
            <div style={{flex:1,height:1,background:"#ddd"}}/>
          </div>
          {section.intro && <S fontSize={13} lineHeight="2" color="#555" marginBottom={24}>{section.intro}</S>}
          {section.blocks.map(function(block,j){return <Block key={j} block={block}/>})}
        </div>
      )})}

      {/* AUTHORITIES */}
      {res.authorities && <div style={{marginBottom:40}}>
        <S fontSize={10} fontWeight={600} letterSpacing={4} textTransform="uppercase" color="#2c3e3a" marginBottom={16}>Key Authorities</S>
        {res.authorities.map(function(auth,i){return(
          <div key={i} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:i<res.authorities.length-1?"1px solid #f0f0f0":"none"}}>
            <S fontSize={12} fontWeight={500} color="#1a1a1a" style={{minWidth:200,flexShrink:0}}>{auth.cite}</S>
            <S fontSize={12} color="#888">{auth.note}</S>
          </div>
        )})}
      </div>}
    </div>
  );
}

export default function ResourcePageClient({slug}) {
  var res = getResourceBySlug(slug);

  if (!res) {
    return (
      <div className="page-wrap">
        <SiteNav current="Resources" />
        <div className="not-found">
          <h1>Resource Not Found</h1>
          <Link href="/resources">Back to all resources</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  var isReform = !!res.tabs;

  return (
    <div className="page-wrap">
      <SiteNav current="Resources" />

      {/* HEADER */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"60px 48px 0"}}>
        <S fontSize={10} fontWeight={600} letterSpacing={4} textTransform="uppercase" color="#2c3e3a" marginBottom={8}>Resource</S>
        <h1 style={{fontSize:"clamp(24px,3.5vw,36px)",fontWeight:700,lineHeight:1.25,marginBottom:8}}>{res.title}</h1>
        <S fontSize={14} color="#888" marginBottom={32} style={{fontStyle:"italic"}}>{res.subtitle}</S>
      </div>

      {/* CONTENT */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 48px 80px"}}>
        {isReform ? <ReformPage res={res}/> : <SectionedPage res={res}/>}
      </div>

      {/* FOOTER */}
      {res.footer && <div style={{maxWidth:900,margin:"0 auto",padding:"0 48px 48px"}}>
        <S fontSize={10} color="#bbb" fontStyle="italic" style={{paddingTop:24,borderTop:"1px solid #eee"}}>{res.footer}</S>
      </div>}

      <SiteFooter />
    </div>
  );
}
