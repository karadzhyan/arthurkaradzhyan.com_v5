"use client";
import { useState, useEffect, useRef } from "react";

/*
  Defense strategy decision flow — deepened version.
  Additions:
  - Case law citation per step
  - Outcome assessment (strength indicator)
  - Cross-links to related tools
  - Expandable detail panel per step
  - Progress indicator showing completion through defense layers
*/

var outcomeColors = {
  strong: "#198754",
  moderate: "#CC8800",
  developing: "#2c3e3a",
};

export default function DefenseStrategyFlow({ strategies, citations }) {
  var [visible, setVisible] = useState(false);
  var [expandedStep, setExpandedStep] = useState(-1);
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  if (!strategies || strategies.length === 0) return null;

  // Parse citations if provided (parallel array)
  var cites = citations || [];

  // Known defense strategy patterns with strength assessments
  var strategyAnnotations = {
    "arbitration": { strength: "strong", cite: "Viking River (2022); Hohenshelt (2025)", tool: "paga-reform-decision-tree" },
    "standing": { strength: "strong", cite: "Adolph (2023); Leeper (pending)", tool: "paga-reform-decision-tree" },
    "manageability": { strength: "moderate", cite: "Estrada (2024); § 2699(p)", tool: "paga-reform-decision-tree" },
    "cure": { strength: "strong", cite: "§ 2699.3(a)(2)(A) — 33 days", tool: "penalty-cap-qualifier" },
    "cap": { strength: "strong", cite: "§ 2699(g)(1) 15% / § 2699(h)(1) 30%", tool: "penalty-cap-qualifier" },
    "bifurcation": { strength: "strong", cite: "Two Hotels framework", tool: "paga-penalty-estimator" },
    "sampling": { strength: "moderate", cite: "Duran (2014); Bell (2001)", tool: "" },
    "recoverability": { strength: "strong", cite: "ZB, N.A. (2019); Kirby (2012)", tool: "recoverability-checker" },
    "regular rate": { strength: "moderate", cite: "Ferra (2021); Alvarado (2018)", tool: "regular-rate-calculator" },
    "derivative": { strength: "moderate", cite: "Naranjo (2022); § 2699(i)", tool: "derivative-penalty-mapper" },
    "statute of limitations": { strength: "strong", cite: "CCP § 340(a) — 1 year PAGA", tool: "statute-of-limitations-calculator" },
    "wage statement": { strength: "moderate", cite: "§ 226(e); post-Naranjo scienter", tool: "wage-statement-compliance-checker" },
  };

  function getAnnotation(text) {
    var lower = text.toLowerCase();
    for (var key in strategyAnnotations) {
      if (lower.indexOf(key) !== -1) return strategyAnnotations[key];
    }
    return null;
  }

  function truncate(text, max) {
    if (text.length <= max) return text;
    return text.substring(0, max) + "...";
  }

  return (
    <div ref={ref} style={{
      padding: "20px 0 16px",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "#198754",
        }}>
          Defense Sequence
        </div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#888" }}>
          {strategies.length} layers
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
        {strategies.map(function (_, i) {
          return (
            <div key={i} style={{
              flex: 1,
              height: 3,
              borderRadius: 1.5,
              background: i <= expandedStep ? "#198754" : "#eee",
              transition: "background 0.3s ease",
            }} />
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {/* Start node */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 4,
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#dc3545",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Outfit', sans-serif",
            fontSize: 9,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: 1,
            flexShrink: 0,
          }}>
            !
          </div>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            color: "#dc3545",
          }}>
            Violation Identified
          </div>
        </div>

        <div style={{ marginLeft: 15, width: 2, height: 12, background: "#ddd" }} />

        {/* Strategy nodes */}
        {strategies.map(function (strategy, i) {
          var delay = 0.2 + i * 0.1;
          var annotation = getAnnotation(strategy);
          var cite = cites[i] || (annotation ? annotation.cite : "");
          var strength = annotation ? annotation.strength : "developing";
          var isExpanded = expandedStep === i;

          return (
            <div key={i}>
              <div style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                opacity: visible ? 1 : 0,
                transition: "opacity 0.4s ease " + delay + "s",
                cursor: "pointer",
              }} onClick={function () { setExpandedStep(isExpanded ? -1 : i); }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#198754",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    padding: "8px 12px",
                    background: isExpanded ? "#f0faf4" : "#f8faf9",
                    borderLeft: "3px solid #198754",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 11,
                    color: "#555",
                    lineHeight: 1.6,
                    transition: "background 0.2s ease",
                  }}>
                    {truncate(strategy, 200)}
                    {cite && (
                      <div style={{ fontSize: 9, color: "#999", marginTop: 4, fontStyle: "italic" }}>
                        {cite}
                      </div>
                    )}
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && annotation && (
                    <div style={{
                      padding: "8px 12px",
                      background: "#fff",
                      borderLeft: "3px solid " + outcomeColors[strength],
                      marginTop: 2,
                    }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                        <div style={{
                          padding: "2px 6px",
                          background: outcomeColors[strength] + "15",
                          border: "1px solid " + outcomeColors[strength] + "30",
                          borderRadius: 3,
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: 8,
                          fontWeight: 600,
                          color: outcomeColors[strength],
                          letterSpacing: 0.5,
                          textTransform: "uppercase",
                        }}>
                          {strength} defense
                        </div>
                      </div>
                      {annotation.tool && (
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#2c3e3a", marginTop: 4 }}>
                          Related tool: {annotation.tool.replace(/-/g, " ")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {i < strategies.length - 1 && (
                <div style={{ marginLeft: 15, width: 2, height: 8, background: "#ddd" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
