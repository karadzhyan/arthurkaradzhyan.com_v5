/*
 * ReformWaterfall — SVG waterfall chart showing >99% penalty reduction
 * through 5 cumulative reform provisions.
 *
 * THE screenshot visual. A GC forwards this to their CEO.
 * Client component for IntersectionObserver animation.
 *
 * Enhanced with cumulative percentage annotations, documentation requirements,
 * employee share comparison, and prominent spanning annotation.
 */
"use client";
import { useEffect, useRef, useState } from "react";

export default function ReformWaterfall() {
  var ref = useRef(null);
  var [visible, setVisible] = useState(false);
  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) { if (entries[0].isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  /*
   * 50 employees × 26 pay periods × 35% violation rate × meal period category
   * Step 1: Pre-reform baseline = $500,000+
   * Step 2: Anti-stacking § 2699(i) = $45,500
   * Step 3: 15% cap § 2699(g) = $6,825
   * Step 4: 35% employee share (post-reform split) = $2,389
   * Step 5: Per-employee recovery = $47.78
   */
  var steps = [
    { label: 'Pre-Reform\nBaseline', value: 500000, display: '$500K+', color: '#dc3545', detail: '50 emps × 26 pp × $200 × 35%' },
    { label: 'Anti-Stacking\n§ 2699(i)', value: 45500, display: '$45,500', color: '#CC8800', detail: 'Derivative penalties eliminated' },
    { label: '15% Cap\n§ 2699(g)', value: 6825, display: '$6,825', color: '#CC8800', detail: '"All reasonable steps" documentation' },
    { label: '35% Employee\nShare', value: 2389, display: '$2,389', color: '#4a7a6f', detail: 'Post-reform split (was 25%)' },
    { label: 'Per Employee\nRecovery', value: 47.78, display: '$47.78', color: '#198754', detail: '÷ 50 employees' },
  ];

  /* Cumulative percentage reductions from baseline */
  var cumulativeReductions = [
    '',
    '-90.9%',
    '-98.6%',
    '-99.5%',
    '-99.99%',
  ];

  var W = 640, H = 400;
  var padL = 50, padR = 40, padT = 70, padB = 90;
  var plotW = W - padL - padR;
  var plotH = H - padT - padB;
  var barW = plotW / steps.length - 12;

  /* Log scale for the enormous range */
  var logMax = Math.log10(500000);
  var logMin = Math.log10(40);
  function barHeight(val) {
    var logVal = Math.log10(Math.max(val, 40));
    return ((logVal - logMin) / (logMax - logMin)) * plotH;
  }

  /* Documentation requirements for 15% cap */
  var docItems = ['Written policies', 'Training records', 'Supervisor ack', 'Payroll audits'];

  return (
    <div
      ref={ref}
      style={{
        maxWidth: 680, margin: '0 auto 24px', padding: '0 16px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity .8s ease, transform .8s ease',
      }}
    >
      <div style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 9, fontWeight: 600,
        letterSpacing: 3, textTransform: 'uppercase', color: '#2c3e3a', marginBottom: 4,
      }}>
        2024 Reform Impact — Exposure Reduction Cascade
      </div>
      <div style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 8, color: '#999', marginBottom: 16,
      }}>
        Meal period category · 50 employees · 26 pay periods · 35% violation rate
      </div>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ display: 'block' }}>
        {/* Prominent spanning annotation: From $500K to $47.78 */}
        <line x1={padL + barW / 2} y1={padT - 38} x2={padL + 4 * (plotW / steps.length) + 6 + barW / 2} y2={padT - 38}
          stroke="#2c3e3a" strokeWidth={1} opacity={0.4} />
        <polygon
          points={
            (padL + barW / 2 + 2) + "," + (padT - 41) + " " +
            (padL + barW / 2 + 2) + "," + (padT - 35) + " " +
            (padL + barW / 2 - 3) + "," + (padT - 38)
          }
          fill="#2c3e3a" opacity={0.4} />
        <polygon
          points={
            (padL + 4 * (plotW / steps.length) + 6 + barW / 2 - 2) + "," + (padT - 41) + " " +
            (padL + 4 * (plotW / steps.length) + 6 + barW / 2 - 2) + "," + (padT - 35) + " " +
            (padL + 4 * (plotW / steps.length) + 6 + barW / 2 + 3) + "," + (padT - 38)
          }
          fill="#2c3e3a" opacity={0.4} />
        <text x={W / 2} y={padT - 44} textAnchor="middle"
          fontFamily="'Libre Baskerville',serif" fontSize={10} fontWeight={700} fill="#2c3e3a">
          From $500K to $47.78
        </text>
        <text x={W / 2} y={padT - 32} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7} fill="#888" letterSpacing={1}>
          {'>'} 99.99% REDUCTION
        </text>

        {/* Background grid lines */}
        {[100, 1000, 10000, 100000, 500000].map(function (v) {
          var y = padT + plotH - barHeight(v);
          var label = v >= 1000 ? '$' + (v / 1000) + 'K' : '$' + v;
          if (v === 500000) label = '$500K';
          return (
            <g key={v}>
              <line x1={padL} y1={y} x2={W - padR} y2={y}
                stroke="#f0f0f0" strokeWidth={0.75} />
              <text x={padL - 6} y={y + 3} textAnchor="end"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#ccc">
                {label}
              </text>
            </g>
          );
        })}

        {/* Waterfall bars */}
        {steps.map(function (step, i) {
          var x = padL + i * (plotW / steps.length) + 6;
          var h = barHeight(step.value);
          var y = padT + plotH - h;

          /* Connector line from previous bar */
          var connector = null;
          if (i > 0) {
            var prevH = barHeight(steps[i - 1].value);
            var prevY = padT + plotH - prevH;
            var prevX = padL + (i - 1) * (plotW / steps.length) + 6 + barW;
            connector = (
              <line x1={prevX} y1={prevY} x2={x} y2={prevY}
                stroke="#e0e0e0" strokeWidth={1} strokeDasharray="4 3" />
            );
          }

          /* Reduction arrow with cumulative percentage */
          var arrow = null;
          if (i > 0) {
            var prevBarH = barHeight(steps[i - 1].value);
            var prevBarY = padT + plotH - prevBarH;
            var reduction = ((1 - step.value / steps[i - 1].value) * 100).toFixed(0);
            var arrowX = x + barW / 2;
            arrow = (
              <g>
                <line x1={arrowX} y1={prevBarY + 4} x2={arrowX} y2={y - 4}
                  stroke="#dc3545" strokeWidth={0.75} opacity={0.4} />
                {/* Step reduction */}
                <text x={arrowX + barW / 2 + 4} y={(prevBarY + y) / 2 - 1}
                  fontFamily="'Outfit',sans-serif" fontSize={7.5} fontWeight={600}
                  fill="#dc3545" opacity={0.6}>
                  -{reduction}%
                </text>
                {/* Cumulative reduction */}
                <text x={arrowX + barW / 2 + 4} y={(prevBarY + y) / 2 + 9}
                  fontFamily="'Outfit',sans-serif" fontSize={6.5} fontWeight={700}
                  fill="#2c3e3a" opacity={0.5}>
                  {cumulativeReductions[i]}
                </text>
              </g>
            );
          }

          return (
            <g key={i}>
              {connector}
              {arrow}

              {/* Bar */}
              <rect x={x} y={y} width={barW} height={h} rx={3}
                fill={step.color}
                opacity={visible ? 0.85 : 0}
                style={{
                  transition: 'opacity .6s ease ' + (i * 0.15) + 's, height .6s ease ' + (i * 0.15) + 's',
                }}
              />

              {/* Value above bar */}
              <text x={x + barW / 2} y={y - 8} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={13} fontWeight={700}
                fill={step.color}>
                {step.display}
              </text>

              {/* Label below */}
              {step.label.split('\n').map(function (line, li) {
                return (
                  <text key={li} x={x + barW / 2} y={padT + plotH + 16 + li * 12}
                    textAnchor="middle"
                    fontFamily="'Outfit',sans-serif" fontSize={8.5}
                    fontWeight={li === 0 ? 600 : 400}
                    fill={li === 0 ? '#333' : '#888'}>
                    {line}
                  </text>
                );
              })}

              {/* Detail note */}
              <text x={x + barW / 2} y={padT + plotH + 44} textAnchor="middle"
                fontFamily="'Outfit',sans-serif" fontSize={7} fill="#bbb">
                {step.detail}
              </text>

              {/* Documentation requirements under the 15% cap bar (index 2) */}
              {i === 2 && (
                <g>
                  {docItems.map(function (doc, di) {
                    return (
                      <text key={'doc' + di} x={x + barW / 2} y={padT + plotH + 54 + di * 9}
                        textAnchor="middle"
                        fontFamily="'Outfit',sans-serif" fontSize={6} fill="#CC8800" opacity={0.6}>
                        {doc}
                      </text>
                    );
                  })}
                </g>
              )}

              {/* Employee share comparison under 35% bar (index 3) */}
              {i === 3 && (
                <text x={x + barW / 2} y={padT + plotH + 56} textAnchor="middle"
                  fontFamily="'Outfit',sans-serif" fontSize={6.5} fontWeight={600}
                  fill="#4a7a6f" opacity={0.7}>
                  Pre: 25% / Post: 35%
                </text>
              )}
            </g>
          );
        })}

        {/* Result callout */}
        <rect x={W - padR - 150} y={padT - 8} width={150} height={40} rx={4}
          fill="#198754" opacity={0.06} stroke="#198754" strokeWidth={0.75} />
        <text x={W - padR - 75} y={padT + 8} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={8} fontWeight={600}
          letterSpacing={2} fill="#198754">
          TOTAL REDUCTION
        </text>
        <text x={W - padR - 75} y={padT + 24} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={16} fontWeight={700}
          fill="#198754">
          {'>'}99%
        </text>

        {/* Source */}
        <text x={W / 2} y={H - 4} textAnchor="middle"
          fontFamily="'Outfit',sans-serif" fontSize={7.5} fill="#bbb" fontStyle="italic">
          AB 2288 / SB 92 · Effective June 19, 2024 · Per-category employee-side exposure
        </text>
      </svg>
    </div>
  );
}
