"use client";
import CaseLawTimeline from "./CaseLawTimeline";
import RecoverabilityMatrix from "./RecoverabilityMatrix";

export default function CasesPageViz() {
  return (
    <div>
      <CaseLawTimeline />
      <RecoverabilityMatrix />
    </div>
  );
}
