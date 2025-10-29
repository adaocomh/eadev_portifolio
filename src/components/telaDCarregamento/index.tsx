"use client";

import { useState, useEffect } from "react";
import { gsap } from 'gsap';


let SplitText: any;

export default function TelaDeCarregamentoIni({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let split: any = null;

    const initAnimation = async () => {
      try {
        // Carrega SplitText e ScrollTrigger de forma assíncrona
        const [SplitTextModule] = await Promise.all([
          import('gsap/all'),
        ]);

        SplitText = SplitTextModule.SplitText;
        gsap.registerPlugin(SplitText);

        await document.fonts.ready;
        gsap.set(".textLoading", { opacity: 1 });

        split = new SplitText(".textLoading", {
          type: "words",
          wordsClass: "word"
        });
        
        gsap.from(split.words, {
          duration: 0.8,
          yPercent: 50,
          opacity: 0,
          stagger: 0.2,
          ease: "expo.out"
        });
      } catch (error) {
        console.error("Erro ao inicializar animação de texto:", error);
      }
    };

    initAnimation();

    return () => {
      if (split) {
        split.revert();
      }
    };
  }, [])

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex justify-center items-center bg-[var(--cor-terciario)]
          transition-opacity duration-1800
          ${loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <p className="font-light text-[var(--cor-primaria)] opacity-0 textLoading" >ⓒ Code by É. Adão</p>
      </div>
      <div>
        {children}
      </div>
    </>
  );
}