"use client";
import ExposureModel from "./ExposureModel";
import PenaltyWaterfall from "./PenaltyWaterfall";

export default function AboutPageViz() {
  return (
    <div>
      <PenaltyWaterfall />
      <ExposureModel />
    </div>
  );
}
