"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

/*
  Comparative exposure profile chart — works for any industry.
  Accepts industryName prop to select the correct data set.
  Qualitative ranking based on statutory structure and case law.
*/

var industryProfiles = {
  Hospitality: [
    { name: "Meal & Rest\n(24/7 Ops)", exposure: 95, statute: "§§ 226.7, 512", detail: "Donohue presumption + derivative cascade across all shifts", color: "#dc3545" },
    { name: "Off-the-Clock\nWork", exposure: 75, statute: "§§ 510, 1194", detail: "Post-Troester: 5–10 min/shift × hundreds of employees daily", color: "#CC8800" },
    { name: "Tip Pooling &\nService Charges", exposure: 55, statute: "§ 351", detail: "Classification traps in mandatory service charges", color: "#2c3e3a" },
    { name: "Split-Shift\nPremiums", exposure: 35, statute: "WO 5, § 4(C)", detail: "Already-compensated defense available; minimum wage offset", color: "#8aa39e" },
  ],
  "Automotive (Dealerships)": [
    { name: "Commission\nForfeiture", exposure: 95, statute: "§§ 200-204", detail: "Sciborski: commissions earned at deal closing, not funding", color: "#dc3545" },
    { name: "Regular Rate\nTrue-Up", exposure: 80, statute: "§ 510", detail: "Ferra + Alvarado: complex compensation in regular rate", color: "#CC8800" },
    { name: "OT Exemption\nFailure", exposure: 65, statute: "WO 7, § 3(D)", detail: "Workweek-by-workweek verification required, not averaged", color: "#2c3e3a" },
    { name: "Flat-Rate Tech\nOvertime", exposure: 50, statute: "§§ 510, 1194", detail: "Flag hours vs. actual hours: payroll systems miscalculate", color: "#8aa39e" },
  ],
  "Healthcare & Staffing": [
    { name: "Multi-Worksite\nManageability", exposure: 90, statute: "§ 2699(p)", detail: "14 worksites with different staffing and policies", color: "#dc3545" },
    { name: "Joint Employer\nLiability", exposure: 80, statute: "Martinez", detail: "Penalty burden for client facility violations", color: "#CC8800" },
    { name: "Travel Time\nCompensation", exposure: 60, statute: "§§ 510, 1194", detail: "Morillion: employer-directed travel between client sites", color: "#2c3e3a" },
  ],
  "Solar & Energy": [
    { name: "AWS\nInvalidity", exposure: 95, statute: "§ 511", detail: "Missing any of 4 steps invalidates retroactively: 2 hrs/day OT", color: "#dc3545" },
    { name: "Travel Time\n(Yard to Site)", exposure: 75, statute: "§§ 510, 1194", detail: "Employer-designated reporting yard to remote installation sites", color: "#CC8800" },
    { name: "Piece-Rate\nNon-Productive", exposure: 60, statute: "§ 226.2", detail: "Rest period compensation at piece-rate regular rate", color: "#2c3e3a" },
  ],
  "Technology & Startups": [
    { name: "§ 515.5\nMisclassification", exposure: 90, statute: "§ 515.5", detail: "Computer professional exemption: duties test, not job title", color: "#dc3545" },
    { name: "Remote Work\nExpenses", exposure: 70, statute: "§ 2802", detail: "Post-COVID: 200 employees = 200 aggrieved per pay period", color: "#CC8800" },
    { name: "RSU/Equity in\nRegular Rate", exposure: 55, statute: "§ 510", detail: "Vested equity compensation inclusion in OT calculations", color: "#2c3e3a" },
  ],
  Agriculture: [
    { name: "Piece-Rate\n§ 226.2", exposure: 95, statute: "§ 226.2", detail: "Legacy payroll can't calculate rest period compensation", color: "#dc3545" },
    { name: "Heat Illness\nPrevention", exposure: 75, statute: "T8 § 3395", detail: "Cal/OSHA + PAGA: outdoor agricultural operations", color: "#CC8800" },
    { name: "Final Pay\nTiming", exposure: 65, statute: "§§ 201-203", detail: "100+ seasonal employees: systematic separation pay delays", color: "#2c3e3a" },
  ],
};

function CustomTooltip(props) {
  var active = props.active;
  var payload = props.payload;
  if (!active || !payload || !payload.length) return null;
  var d = payload[0].payload;
  return (
    <div style={{
      background: "#fff", border: "1px solid #e0e0e0", padding: "12px 16px", maxWidth: 260, fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: d.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{d.statute}</div>
      <div style={{ fontSize: 12, color: "#333", lineHeight: 1.5 }}>{d.detail}</div>
    </div>
  );
}

function CustomTick(props) {
  var lines = (props.payload.value || "").split("\n");
  return (
    <g transform={"translate(" + props.x + "," + props.y + ")"}>
      {lines.map(function (line, i) {
        return (
          <text key={i} x={0} y={i * 13} dy={10} textAnchor="middle"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fill: "#666", fontWeight: 500 }}>{line}</text>
        );
      })}
    </g>
  );
}

export default function ExposureProfileChart({ industryName }) {
  var data = industryProfiles[industryName || "Hospitality"];
  if (!data) return null;

  return (
    <div style={{
      background: "#fff", border: "1px solid #e0e0e0", padding: "32px 24px 20px", marginBottom: 32, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #2c3e3a, #4a7a6f)" }} />
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#2c3e3a", marginBottom: 6 }}>Exposure Profile</div>
      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, color: "#333", marginBottom: 4, lineHeight: 1.4 }}>Relative Penalty Exposure by Category</div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginBottom: 24, lineHeight: 1.5 }}>
        Qualitative ranking based on statutory structure, derivative penalty multipliers, and case law applicability. Actual exposure varies by employer size, operational model, and compliance history.
      </div>

      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 36 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
            <XAxis dataKey="name" tick={CustomTick} axisLine={{ stroke: "#e0e0e0" }} tickLine={false} interval={0} height={48} />
            <YAxis hide={true} domain={[0, 100]} />
            <Tooltip content={CustomTooltip} cursor={{ fill: "rgba(44,62,58,.04)" }} />
            <Bar dataKey="exposure" radius={[3, 3, 0, 0]} maxBarSize={64}>
              {data.map(function (entry, index) { return <Cell key={index} fill={entry.color} />; })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", marginTop: 16, paddingTop: 16, borderTop: "1px solid #eee" }}>
        {data.map(function (d, i) {
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <div style={{ width: 10, height: 10, background: d.color, flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, color: "#333" }}>{d.name.replace("\n", " ")}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#999" }}>{d.statute}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
