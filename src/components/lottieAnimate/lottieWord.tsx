"use client";

import Lottie from "lottie-react";
import animationData from "../../../public/lottiejson/word.json";

export default function LottieWord() {
  return (
    <div className="w-25 h-25">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}