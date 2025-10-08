'use client'
import MnSmobile from './mnSMobile'
import { useState, useEffect} from 'react'

export default function MenuSuspenso() {
  const [overFooter, setOverFooter] = useState(false)
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    })
  }

  useEffect(() => {
    const footer = document.querySelector("#footerS4")
    if (!footer) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setOverFooter(true)
          } else {
            setOverFooter(false)
          }
        })
      },
      {
        root: null,
        threshold: 0.85,
      }
    )

    observer.observe(footer)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="flex justify-between items-center w-[100vw] p-[0px_80px] transition-all duration-500">
      <div className={`hover:translate-y-[-4px] hover:transition-all p-[20px] rounded-[50px] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] transition-all duration-500 ${overFooter ? "bg-[rgba(128,128,128,0.05)] backdrop-blur-xs text-(--cor-primaria) shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_10px_rgba(0,0,0,0.08)] hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_12px_rgba(0,0,0,0.15)]" : scrolled ? "bg-[rgba(128,128,128,0.05)] backdrop-blur-xs shadow-[inset_2px_2px_8px_rgba(255,255,255,0.1),2px_8px_10px_rgba(0,0,0,0.08)]" : ""}`} onClick={() => scrollSection("hdS1")}>
        <p className="cursor-pointer font-light">
          ⓒ Code by É. Adão
        </p>
      </div>
      <nav>
        <ul className={`hidden rounded-[50px] md:flex md:flex-row md:gap-[20px] md:p-[20px] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] transition-all duration-500 ${overFooter ? "bg-[rgba(128,128,128,0.05)] backdrop-blur-xs text-(--cor-primaria) shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_10px_rgba(0,0,0,0.08)]" : scrolled ? "bg-[rgba(128,128,128,0.05)] backdrop-blur-xs shadow-[inset_2px_2px_8px_rgba(255,255,255,0.1),2px_8px_10px_rgba(0,0,0,0.08)]" : ""}`}>
          <li className="cursor-pointer hover:translate-y-[-1px] hover:transition-all hover:duration-500 hover:text-shadow-[0px_5px_15px_rgba(0,0,0,0.3)]" onClick={() => scrollSection("sS2")}>Meu objetivo</li>
          <li className="cursor-pointer hover:translate-y-[-1px] hover:transition-all hover:duration-500 hover:text-shadow-[0px_5px_15px_rgba(0,0,0,0.3)]" onClick={() => scrollSection("demo")}>Demo.</li>
          <li className="cursor-pointer hover:translate-y-[-1px] hover:transition-all hover:duration-500 hover:text-shadow-[0px_5px_15px_rgba(0,0,0,0.3)]" onClick={() => scrollSection("footerS4")}>Contato</li>
        </ul>
        <MnSmobile />
      </nav>
    </div>
  )
}