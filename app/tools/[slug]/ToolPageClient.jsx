"use client";
import { useState } from 'react';
import Link from 'next/link';
import { tools, getToolBySlug } from '@/data/tools';
import PagaCalc from '@/components/tools/PagaCalc';
import RegRateCalc from '@/components/tools/RegRateCalc';
import CapQualifier from '@/components/tools/CapQualifier';
import SOLCalc from '@/components/tools/SOLCalc';
import RecoverCheck from '@/components/tools/RecoverCheck';
import DerivativeMapper from '@/components/tools/DerivativeMapper';
import DecisionTree from '@/components/tools/DecisionTree';
import WageStmtCheck from '@/components/tools/WageStmtCheck';

var toolComponents = {
  PagaCalc: PagaCalc,
  RegRateCalc: RegRateCalc,
  CapQualifier: CapQualifier,
  SOLCalc: SOLCalc,
  RecoverCheck: RecoverCheck,
  DerivativeMapper: DerivativeMapper,
  DecisionTree: DecisionTree,
  WageStmtCheck: WageStmtCheck,
};

export default function ToolPageClient({ slug }) {
  var tool = getToolBySlug(slug);
  var [showMethodology, setShowMethodology] = useState(false);

  if (!tool) {
    return (
      <div style={{ fontFamily: "'Outfit',sans-serif", padding: '120px 48px', textAlign: 'center' }}>
        <h1>Tool Not Found</h1>
        <Link href="/#Tools" style={{ color: '#2c3e3a' }}>Back to all tools</Link>
      </div>
    );
  }

  var ToolComponent = toolComponents[tool.component];

  return (
    <div style={{ fontFamily: "'Libre Baskerville',Georgia,serif", color: '#1a1a1a', background: '#fff', minHeight: '100vh' }}>
      <nav style={{ padding: '22px 48px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: 6, textTransform: 'uppercase', color: '#1a1a1a', textDecoration: 'none' }}>
          Arthur Karadzhyan
        </Link>
        <Link href="/#Tools" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#999', textDecoration: 'none' }}>
          ← All Tools
        </Link>
      </nav>

      {/* HEADER */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 48px 0' }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 8 }}>
          Interactive Tool
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, lineHeight: 1.25, marginBottom: 12 }}>
          {tool.name}
        </h1>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, lineHeight: 1.8, color: '#888', marginBottom: 8, maxWidth: 700 }}>
          {tool.desc}
        </p>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: '#bbb', marginBottom: 24 }}>
          All calculations run in your browser. No data is transmitted or stored.
        </div>

        {/* METHODOLOGY TOGGLE */}
        <div
          onClick={function() { setShowMethodology(!showMethodology); }}
          style={{ padding: '12px 16px', background: '#f8faf9', border: '1px solid #e0e8e6', marginBottom: 24, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 700 }}
        >
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#2c3e3a' }}>Methodology</span>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, color: '#2c3e3a', opacity: 0.4, transform: showMethodology ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform .3s' }}>+</span>
        </div>
        {showMethodology && (
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, lineHeight: 2, color: '#555', marginBottom: 32, padding: '20px 24px', background: '#f8faf9', border: '1px solid #e0e8e6', maxWidth: 700 }}>
            {tool.methodology}
          </div>
        )}

        {/* CROSS REFERENCES */}
        {(tool.relatedInsights.length > 0 || tool.relatedCases.length > 0) && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {tool.relatedInsights.map(function(slug, i) {
              return (
                <Link key={'i' + i} href={'/insights/' + slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#2c3e3a', textDecoration: 'none', padding: '6px 12px', border: '1px solid #2c3e3a' }}>
                  Related Publication →
                </Link>
              );
            })}
            {tool.relatedCases.map(function(slug, i) {
              return (
                <Link key={'c' + i} href={'/cases/' + slug} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#999', textDecoration: 'none', padding: '6px 12px', border: '1px solid #eee' }}>
                  Related Case →
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* TOOL */}
      <div style={{ background: 'linear-gradient(160deg,#2c3e3a,#1e2d2a)', padding: '48px 48px 60px', borderTop: '1px solid #eee' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {ToolComponent && <ToolComponent />}
        </div>
      </div>

      {/* OTHER TOOLS NAV */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 48px 80px' }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 16 }}>
          Other Tools
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {tools.filter(function(t) { return t.slug !== slug; }).map(function(t) {
            return (
              <Link key={t.slug} href={'/tools/' + t.slug} style={{ padding: '14px 16px', border: '1px solid #eee', textDecoration: 'none', transition: 'all .2s' }}>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: '#1a1a1a', marginBottom: 2 }}>{t.name}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, color: '#999' }}>{t.sub}</div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* DISCLAIMER */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 48px' }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: '#bbb', fontStyle: 'italic', paddingTop: 24, borderTop: '1px solid #eee' }}>
          For illustrative purposes only. This tool does not constitute legal advice. All calculations are based on statutory frameworks and user-supplied inputs. Consult with counsel for matter-specific analysis.
        </div>
      </div>

      <div style={{ padding: '24px 48px', textAlign: 'center', borderTop: '1px solid #eee', background: '#fafafa' }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: '#999', letterSpacing: 2 }}>
          © {new Date().getFullYear()} Arthur Karadzhyan · Los Angeles, California
        </div>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, color: '#999', letterSpacing: 1, marginTop: 6 }}>
          Attorney Advertising · Prior results do not guarantee a similar outcome · This website does not constitute legal advice
        </div>
      </div>
    </div>
  );
}
