"use client";
import { useEffect, useState, useRef } from "react";

export default function TextCircle() {
  const [letters, setLetters] = useState<string[]>([]);
  const [translateZ, setTranslateZ] = useState(80);
  const content = "© code by É. Adão. ";
  const rafId = useRef<number | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLetters(content.split(""));

    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        if (rafId.current !== null) {
          cancelAnimationFrame(rafId.current);
        }
        
        rafId.current = requestAnimationFrame(() => {
          setTranslateZ(window.innerWidth >= 768 ? 120 : 80);
        });
      }, 150);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const getTransform = (deg: number) => {
    return `rotateY(${deg}deg) translateZ(${translateZ}px)`;
  };

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      <div className="m-auto origin-center" style={{
          transform: "rotateX(20deg) rotate(-20deg)",
          transformStyle: "preserve-3d"}}>
        <div className="uppercase font-medium text-[30px] text-[#555936D8] animate-[spinY_10s_linear_infinite] md:text-[50px]" style={{ transformStyle: "preserve-3d" }}>
          {letters.map((l, i) => {
            const step = 360 / letters.length;
            const deg = step * i;
            return (
              <span key={i} className="absolute" style={{ transform: getTransform(deg) }}>
                {l}
              </span>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        @keyframes spinY {
          0% {
            transform: rotateY(1turn);
          }
          100% {
            transform: rotateY(0deg);
          }
        }
      `}</style>
    </div>
  );
}