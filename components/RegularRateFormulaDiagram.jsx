"use client";
import { useState, useEffect, useRef } from "react";

/*
  Annotated formula diagram for the regular rate calculation.
  Shows what pay components are included in the numerator,
  what's excluded, and the Ferra error (base rate vs. regular rate).
  Per Alvarado v. Dart Container (2018) 4 Cal.5th 542
  and Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858.
*/

var included = [
  { label: "Base Hourly Pay", sub: "hourly rate × all hours worked", color: "#2c3e3a" },
  { label: "Commissions", sub: "earned in the pay period", color: "#2c3e3a" },
  { label: "Non-Discretionary Bonuses", sub: "flat-sum: divide by non-OT hours (Alvarado)", color: "#2c3e3a" },
  { label: "Piece-Rate Earnings", sub: "per-unit production pay", color: "#2c3e3a" },
  { label: "Shift Differentials", sub: "premium for night/weekend shifts", color: "#2c3e3a" },
];

var excluded = [
  { label: "Discretionary Bonuses", sub: "employer retains sole discretion" },
  { label: "Expense Reimbursements", sub: "not compensation" },
  { label: "Premium Overtime Pay", sub: "the 0.5× premium itself" },
];

export default function RegularRateFormulaDiagram() {
  var [visible, setVisible] = useState(false);
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  return (
    <div ref={ref} style={{
      background: "#fff",
      border: "1px solid #e0e0e0",
      padding: "32px 32px 24px",
      marginBottom: 24,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #2c3e3a, #4a7a6f)" }} />

      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: "#2c3e3a",
        marginBottom: 4,
      }}>
        The Formula
      </div>
      <div style={{
        fontFamily: "'Libre Baskerville', serif",
        fontSize: 15,
        color: "#333",
        marginBottom: 20,
        lineHeight: 1.4,
      }}>
        How the Regular Rate Is Calculated
      </div>

      {/* Main formula */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "24px 16px",
        background: "#fafafa",
        border: "1px solid #eee",
        marginBottom: 24,
        flexWrap: "wrap",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease 0.2s",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: 20,
            fontWeight: 700,
            color: "#2c3e3a",
          }}>
            Regular Rate
          </div>
        </div>
        <div style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: 28,
          color: "#999",
          lineHeight: 1,
        }}>=</div>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "#333",
            padding: "8px 20px",
            borderBottom: "2px solid #2c3e3a",
          }}>
            Total Straight-Time Compensation
          </div>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "#333",
            padding: "8px 20px",
          }}>
            Total Hours Worked
          </div>
        </div>
      </div>

      {/* Two columns: included vs excluded */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease 0.4s",
      }}>
        {/* Included */}
        <div>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#198754",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="6" fill="none" stroke="#198754" strokeWidth="1.5" />
              <path d="M4 7l2 2 4-4" fill="none" stroke="#198754" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Included in Numerator
          </div>
          {included.map(function (item, i) {
            return (
              <div key={i} style={{
                padding: "8px 12px",
                borderLeft: "3px solid #198754",
                background: "#f0faf4",
                marginBottom: 6,
              }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, color: "#333" }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#888" }}>
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Excluded */}
        <div>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#dc3545",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="6" fill="none" stroke="#dc3545" strokeWidth="1.5" />
              <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" fill="none" stroke="#dc3545" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Excluded from Numerator
          </div>
          {excluded.map(function (item, i) {
            return (
              <div key={i} style={{
                padding: "8px 12px",
                borderLeft: "3px solid #dc3545",
                background: "#fef5f5",
                marginBottom: 6,
              }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, color: "#333" }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#888" }}>
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Ferra error callout */}
      <div style={{
        marginTop: 20,
        padding: "16px 20px",
        background: "#fff8f0",
        border: "1px solid #f0e0c0",
        borderLeft: "4px solid #CC8800",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease 0.6s",
      }}>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#CC8800",
          marginBottom: 6,
        }}>
          The Common Error (Ferra v. Loews Hollywood Hotel)
        </div>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 12,
          color: "#666",
          lineHeight: 1.7,
        }}>
          Most employers calculate meal and rest period premiums at the <strong style={{ color: "#dc3545" }}>base hourly rate</strong> instead of the <strong style={{ color: "#198754" }}>regular rate</strong>. When an employee earns commissions, bonuses, or piece-rate pay, the regular rate exceeds the base rate — and every premium calculated at the base rate is an underpayment. The gap compounds across every missed meal and rest period in the PAGA statutory period.
        </div>
      </div>

      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 9,
        color: "#bbb",
        marginTop: 12,
        lineHeight: 1.5,
      }}>
        Per Alvarado v. Dart Container (2018) 4 Cal.5th 542 (flat-sum bonus methodology) and Ferra v. Loews Hollywood Hotel (2021) 11 Cal.5th 858 (regular rate for premiums).
      </div>
    </div>
  );
}
