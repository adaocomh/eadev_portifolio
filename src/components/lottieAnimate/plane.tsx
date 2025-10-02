"use client";

import Lottie from "lottie-react";
import animationData from "../../../public/lottiejson/plane.json";

export default function LottiePlane() {
  return (
    <div className="w-80 h-70">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}