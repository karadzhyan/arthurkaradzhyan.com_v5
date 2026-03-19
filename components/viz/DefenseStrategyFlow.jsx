"use client";
import { useState, useEffect, useRef } from "react";

/*
  Defense strategy decision flow — renders a numbered path diagram
  from violation identified through each defense strategy.
  Accepts strategies array as prop from industry data.
*/

export default function DefenseStrategyFlow({ strategies }) {
  var [visible, setVisible] = useState(false);
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

  // Truncate strategy text for the diagram
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
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: "#198754",
        marginBottom: 16,
      }}>
        Defense Sequence
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

        {/* Connector */}
        <div style={{ marginLeft: 15, width: 2, height: 12, background: "#ddd" }} />

        {/* Strategy nodes */}
        {strategies.map(function (strategy, i) {
          var delay = 0.2 + i * 0.1;
          return (
            <div key={i}>
              <div style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                opacity: visible ? 1 : 0,
                transition: "opacity 0.4s ease " + delay + "s",
              }}>
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
                <div style={{
                  flex: 1,
                  padding: "8px 12px",
                  background: "#f0faf4",
                  borderLeft: "3px solid #198754",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 11,
                  color: "#555",
                  lineHeight: 1.6,
                }}>
                  {truncate(strategy, 180)}
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
