"use client";
import { useEffect, useState } from "react";

export default function TextCircle() {
  const [letters, setLetters] = useState<string[]>([]);
  const content = "© code by É.adão · ";
  const radius = 120;

  // Gerar letras apenas uma vez
  useEffect(() => {
    setLetters(content.split(""));
  }, []);

  // Função para calcular a transformação de cada letra
  const getTransform = (deg: number) => {
    return `rotateY(${deg}deg) translateZ(${radius}px)`;
  };

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      {/* Cena 3D */}
      <div
        className="m-auto origin-center"
        style={{
          transform: "rotateY(45deg) rotate(-45deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="uppercase font-medium text-[50px] text-[#555936D8] animate-[spinY_10s_linear_infinite]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {letters.map((l, i) => {
            const step = 360 / letters.length;
            const deg = step * i;
            return (
              <span
                key={i}
                className="absolute"
                style={{ transform: getTransform(deg) }}
              >
                {l}
              </span>
            );
          })}
        </div>
      </div>

      {/* Keyframes custom */}
      <style jsx>{`
        @keyframes spinY {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(1turn);
          }
        }
      `}</style>
    </div>
  );
}