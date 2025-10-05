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
        threshold: 0.84,
      }
    )

    observer.observe(footer)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="flex justify-between items-center w-[100vw] p-[0px_80px] transition-all duration-500">
      <div className={`hover:translate-y-[-4px] hover:transition-all hover:shadow-[0px_3px_8px_rgba(0,0,0,0.3)] p-[20px] rounded-[50px] transition-[background] duration-300 ${overFooter ? "text-(--cor-primaria) border-[0.1px] borde-(--cor-primaria)" : scrolled ? "bg-transparent backdrop-blur-md shadow-[0px_8px_10px_rgba(0,0,0,0.05)] transition-all duration-600" : "transition-all duration-600"}`}>
        <p className="cursor-pointer font-light">
          ⓒ Code by É. Adão
        </p>
      </div>
      <nav>
        <ul className={`hidden rounded-[50px] md:flex md:flex-row md:gap-[20px] md:p-[20px] transition-[background] duration-300 ${overFooter ? "text-(--cor-primaria) border-[0.1px] borde-(--cor-primaria)" : scrolled ? "bg-transparent backdrop-blur-md shadow-[0px_8px_10px_rgba(0,0,0,0.05)] transition-all duration-600" : "transition-all duration-600"}}`}>
          <li className="cursor-pointer hover:translate-y-[-1px] hover:transition-all hover:duration-300 hover:text-shadow-[0px_5px_15px_rgba(0,0,0,0.3)]" onClick={() => scrollSection("sS2")}>Meu objetivo</li>
          <li className="cursor-pointer hover:translate-y-[-1px] hover:transition-all hover:duration-300 hover:text-shadow-[0px_5px_15px_rgba(0,0,0,0.3)]" onClick={() => scrollSection("aPS2")}>Demo.</li>
          <li className="cursor-pointer hover:translate-y-[-1px] hover:transition-all hover:duration-300 hover:text-shadow-[0px_5px_15px_rgba(0,0,0,0.3)]" onClick={() => scrollSection("footerS4")}>Contato</li>
        </ul>
        <MnSmobile />
      </nav>
    </div>
  )
}