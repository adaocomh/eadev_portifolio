"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div className="w-25 h-25 bg-[var(--cor-primaria)] rounded-full animate-pulse" />,
});

export default function LottieWord() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    import("../../../public/lottiejson/word.json")
      .then((data) => setAnimationData(data.default))
      .catch((err) => console.error("Erro ao carregar animação:", err));
  }, []);

  if (!animationData) {
    return <div className="w-25 h-25 bg-[var(--cor-primaria)] rounded-full" />;
  }

  return (
    <div className="w-25 h-25">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}