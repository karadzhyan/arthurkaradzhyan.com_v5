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

  return (
    <div className="filing-chart">
      <div className="filing-chart-bars">
        {data.map(function (d, i) {
          var pct = Math.round((d.count / max) * 100);
          var isLatest = i === data.length - 1;
          var isPandemic = d.year === "2020";
          return (
            <div key={i} className="filing-chart-col">
              <div className="filing-chart-val" style={{
                color: isLatest ? "#dc3545" : "#999",
                fontWeight: isLatest ? "700" : "400"
              }}>
                {d.label}
              </div>
              <div className="filing-chart-bar-wrap">
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
            </div>
          );
        })}
      </div>
      <div className="filing-chart-annotations">
        <div className="filing-chart-annotation">
          <span className="filing-chart-ann-dot" style={{ background: "#ddd" }} />
          <span className="filing-chart-ann-text">2020 — COVID dip</span>
        </div>
        <div className="filing-chart-annotation">
          <span className="filing-chart-ann-dot" style={{ background: "#dc3545" }} />
          <span className="filing-chart-ann-text">2025 — Record high despite reforms</span>
        </div>
      </div>
      <div className="filing-chart-source">
        Source: DIR PAGA Filing Data · LWDA Initial Statement of Reasons (Feb. 2026)
      </div>
    </div>
  );
}
