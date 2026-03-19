"use client";

export default function PagaFilingChart() {
  var data = [
    { year: "2017", count: 3742, label: "3,742" },
    { year: "2018", count: 4546, label: "4,546" },
    { year: "2019", count: 5412, label: "5,412" },
    { year: "2020", count: 4298, label: "4,298" },
    { year: "2021", count: 5986, label: "5,986" },
    { year: "2022", count: 6542, label: "6,542" },
    { year: "2023", count: 7834, label: "7,834" },
    { year: "2024", count: 8917, label: "8,917" },
    { year: "2025", count: 10098, label: "10,098" }
  ];

  var max = 10098;
  var cagr = ((Math.pow(10098 / 3742, 1 / 8) - 1) * 100).toFixed(1);

  function yoy(i) {
    if (i === 0) return null;
    return ((data[i].count - data[i - 1].count) / data[i - 1].count * 100).toFixed(0);
  }

  return (
    <div className="filing-chart">
      <div className="filing-chart-bars">
        {data.map(function (d, i) {
          var pct = Math.round((d.count / max) * 100);
          var isLatest = i === data.length - 1;
          var isPandemic = d.year === "2020";
          var isReform = d.year === "2024";
          var change = yoy(i);
          return (
            <div key={i} className="filing-chart-col">
              <div className="filing-chart-val" style={{
                color: isLatest ? "#dc3545" : "#999",
                fontWeight: isLatest ? "700" : "400"
              }}>
                {d.label}
              </div>
              <div className="filing-chart-bar-wrap">
                {isReform && (
                  <div className="filing-chart-reform-marker">
                    <div className="filing-chart-reform-line" />
                    <div className="filing-chart-reform-label">Reforms enacted</div>
                  </div>
                )}
                <div
                  className="filing-chart-bar"
                  style={{
                    height: pct + "%",
                    background: isLatest
                      ? "linear-gradient(0deg, #dc3545, #ff6b6b)"
                      : isPandemic
                        ? "#ddd"
                        : "linear-gradient(0deg, #2c3e3a, #4a7a6f)"
                  }}
                />
              </div>
              <div className="filing-chart-year" style={{
                fontWeight: isLatest ? "700" : "400"
              }}>
                {d.year}
              </div>
              <div className="filing-chart-yoy" style={{
                color: change && parseInt(change) < 0 ? "#dc3545" : change && parseInt(change) > 15 ? "#dc3545" : "#999"
              }}>
                {change ? (parseInt(change) > 0 ? "+" : "") + change + "%" : "—"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="filing-chart-metrics">
        <div className="filing-chart-metric">
          <div className="filing-chart-metric-num">{cagr}%</div>
          <div className="filing-chart-metric-label">Compound Annual Growth Rate (2017–2025)</div>
        </div>
        <div className="filing-chart-metric">
          <div className="filing-chart-metric-num">+170%</div>
          <div className="filing-chart-metric-label">Total Growth Over Period</div>
        </div>
        <div className="filing-chart-metric">
          <div className="filing-chart-metric-num">+13.2%</div>
          <div className="filing-chart-metric-label">Post-Reform Growth (2024→2025)</div>
        </div>
        <div className="filing-chart-metric">
          <div className="filing-chart-metric-num">28/day</div>
          <div className="filing-chart-metric-label">Average PAGA Notices Per Business Day (2025)</div>
        </div>
      </div>

      <div className="filing-chart-annotations">
        <div className="filing-chart-annotation">
          <span className="filing-chart-ann-dot" style={{ background: "#ddd" }} />
          <span className="filing-chart-ann-text">2020 — COVID dip (−20.6%), courts closed, filings deferred</span>
        </div>
        <div className="filing-chart-annotation">
          <span className="filing-chart-ann-dot" style={{ background: "#CC8800" }} />
          <span className="filing-chart-ann-text">2024 — AB 2288 / SB 92 enacted July 1, plaintiff-side rush to file pre-reform</span>
        </div>
        <div className="filing-chart-annotation">
          <span className="filing-chart-ann-dot" style={{ background: "#dc3545" }} />
          <span className="filing-chart-ann-text">2025 — Record high despite reforms. Plaintiff bar adapting, not retreating</span>
        </div>
      </div>
      <div className="filing-chart-insight">
        <div className="filing-chart-insight-label">What This Means</div>
        <div className="filing-chart-insight-text">
          The 2024 reforms reduced per-notice penalty exposure — but did nothing to reduce filing
          volume. The plaintiff bar responded by filing more cases at lower individual value,
          maintaining aggregate revenue through volume. For employers, the probability of receiving
          a PAGA notice is higher than ever. At 28 notices per business day, the question for most
          California employers is not whether they will receive a notice, but when.
        </div>
      </div>
      <div className="filing-chart-source">
        Source: DIR PAGA Filing Data · LWDA Initial Statement of Reasons (Feb. 2026)
      </div>
    </div>
  );
}
