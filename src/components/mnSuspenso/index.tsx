'use client'
import MnSmobile from './mnSMobile'
import { useState, useEffect} from 'react'

export default function MenuSuspenso() {
  const [overFooter, setOverFooter] = useState(false)

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
      <div className={`hover:bg-[#474837] hover:translate-y-[-4px] hover:transition-all hover:shadow-[0px_3px_8px_rgba(0,0,0,0.3)] p-[20px] rounded-[50px] transition-[background] duration-300 ${overFooter ? "bg-[#3F4030] text-(--cor-primaria) border-[0.1px]" : "bg-[#f1ebdf90] shadow-[0px_8px_10px_rgba(0,0,0,0.05)]"}`}>
        <p className="cursor-pointer font-light">
          ⓒ Code by É. Adão
        </p>
      </div>
      <nav>
        <ul className={`hidden rounded-[50px] md:flex md:flex-row md:gap-[20px] md:p-[20px] transition-[background] duration-300 ${overFooter ? "bg-[#3F4030] text-(--cor-primaria) border-[0.1px]" : "bg-[#f1ebdf90] shadow-[0px_8px_10px_rgba(0,0,0,0.05)]"}`}>
          <li className="cursor-pointer" onClick={() => scrollSection("sS2")}>Meu objetivo</li>
          <li className="cursor-pointer" onClick={() => scrollSection("aPS2")}>Demo.</li>
          <li className="cursor-pointer" onClick={() => scrollSection("footerS4")}>Contato</li>
        </ul>
        <MnSmobile />
      </nav>
    </div>
  )
}