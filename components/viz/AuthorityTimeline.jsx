"use client";
import { useState, useEffect, useRef } from "react";

/*
  Authority case law timeline.
  Extracts year from citation strings like "Donohue v. AMN Services (2021) 11 Cal.5th 58"
  and renders a horizontal timeline.
*/

function extractYear(citation) {
  var match = citation.match(/\((\d{4})\)/);
  return match ? parseInt(match[1]) : null;
}

function extractName(citation) {
  var match = citation.match(/^([^(]+)/);
  return match ? match[1].trim() : citation;
}

export default function AuthorityTimeline({ authorities }) {
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

  if (!authorities || authorities.length === 0) return null;

  var parsed = authorities.map(function (auth) {
    return { full: auth, year: extractYear(auth), name: extractName(auth) };
  }).filter(function (a) { return a.year !== null; }).sort(function (a, b) { return a.year - b.year; });

  if (parsed.length === 0) return null;

  var minYear = parsed[0].year;
  var maxYear = parsed[parsed.length - 1].year;
  var range = Math.max(maxYear - minYear, 1);

  var w = 600;
  var h = 100;
  var padL = 30;
  var padR = 30;
  var lineY = 40;
  var barW = w - padL - padR;

  function yearToX(year) {
    return padL + ((year - minYear) / range) * barW;
  }

  return (
    <div ref={ref} style={{
      padding: "16px 0",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: "#2c3e3a",
        marginBottom: 12,
      }}>
        Case Law Timeline
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: w, height: "auto", display: "block" }}>
          {/* Timeline line */}
          <line x1={padL} y1={lineY} x2={w - padR} y2={lineY} stroke="#e0e0e0" strokeWidth={2} />

          {/* Authority points */}
          {parsed.map(function (auth, i) {
            var x = yearToX(auth.year);
            var labelAbove = i % 2 === 0;
            var delay = 0.2 + i * 0.15;

            return (
              <g key={i} opacity={visible ? 1 : 0} style={{ transition: "opacity 0.4s ease " + delay + "s" }}>
                {/* Dot */}
                <circle cx={x} cy={lineY} r={5} fill="#2c3e3a" />

                {/* Connector line */}
                <line x1={x} y1={lineY + (labelAbove ? -8 : 8)} x2={x} y2={lineY + (labelAbove ? -20 : 20)}
                  stroke="#2c3e3a" strokeWidth={1} />

                {/* Year */}
                <text x={x} y={labelAbove ? lineY - 24 : lineY + 30} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700, fill: "#2c3e3a" }}>
                  {auth.year}
                </text>

                {/* Case name */}
                <text x={x} y={labelAbove ? lineY - 36 : lineY + 42} textAnchor="middle"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 7, fill: "#888" }}>
                  {auth.name.length > 25 ? auth.name.substring(0, 25) + "..." : auth.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
