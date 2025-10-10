'use client'
import { useState, useEffect } from 'react'
export default function MnSmobile() {
        const [aberto, setAberto] = useState<boolean>(false)
        const [scrolled, setScrolled] = useState(false);
        const [overFooter, setOverFooter] = useState(false)

        const scrollSection = (id: string) => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" })
        }

        useEffect(() => {
            const handleScroll = () => {
              setScrolled(window.scrollY > 50);
            };
        
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
          }, []);

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

    return(
        <div className={`md:hidden flex justify-center items-center w-[70px] h-[70px] p-[20px] rounded-full cursor-pointer transition-all duration-500 ease-in-out z-40 ${overFooter ? "bg-[rgba(128,128,128,0.05)] backdrop-blur-xs shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_10px_rgba(0,0,0,0.08)] hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_12px_rgba(0,0,0,0.15)]" : scrolled ? "bg-[rgba(128,128,128,0.05)] backdrop-blur-xs shadow-[inset_2px_2px_8px_rgba(255,255,255,0.1),2px_8px_10px_rgba(0,0,0,0.08)]" : ""}`} onClick={() => setAberto(!aberto)}>
      <div className={`absolute flex justify-center items-center w-0 h-0 bg-[rgba(245,236,219,0.95)] backdrop-blur-xs transition-all duration-600 ease-in-out rounded-[100%] ${aberto ? "right-[-20px] top-0 w-[100vw] h-[100vh] rounded-none" : ""}`}>

      <ul className={`w-full h-full flex-col justify-end items-start p-[100px] gap-[50px] md:hidden list-none ${aberto ? 'flex' : 'hidden'}`}>
                                <li className='w-max text-[var(--cor-terciario)] text-[60px] font-black slideMenu1 hover:translate-y-[-4px] hover:transition-all rounded-[50px] text-shadow-[0px_0px_10px_rgba(0,0,0,0.08)] transition-all duration-500' onClick={()=>{scrollSection("sS2")}}>Meu objetivo</li>
                                <li className='w-max text-[var(--cor-terciario)] text-[60px] font-black slideMenu1 hover:translate-y-[-4px] hover:transition-all rounded-[50px] text-shadow-[0px_0px_10px_rgba(0,0,0,0.08)] transition-all duration-500' onClick={()=>{scrollSection("aPS2")}}>Demo.</li>
                                <li className='w-max text-[var(--cor-terciario)] text-[60px] font-black slideMenu1 hover:translate-y-[-4px] hover:transition-all rounded-[50px] text-shadow-[0px_0px_10px_rgba(0,0,0,0.08)] transition-all duration-500' onClick={()=>{scrollSection("footerS4")}}>Contato</li>
                                <p className="cursor-pointer font-light hover:translate-y-[-4px] hover:transition-all rounded-[50px] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] transition-all duration-500" onClick={() => scrollSection("hdS1")}>
                                ⓒ Code by É. Adão
                                </p>
                    </ul>
      </div>
      <button
        onClick={() => setAberto(!aberto)}
        className="relative w-[30px] h-[30px] transition-all duration-800 ease-in-out hoverSeta"
      >
        <div className="hoverSeta">
          <span
            className={`absolute left-0 block h-[3px] rounded-lg ${overFooter ? "bg-[var(--cor-primaria)] duration-600" : "bg-black duration-600"} transition-all duration-700 ease-in-out hoverSeta
              ${aberto ? "w-[30px] rotate-[135deg]" : "top-[5px] w-[20px] rotate-0"} listras`}
          />
          <span
            className={`absolute left-0 block h-[3px] w-[30px] rounded-lg ${overFooter ? "bg-[var(--cor-primaria)] duration-600" : "bg-black duration-600"}  transition-all duration-500 ease-in-out hoverSeta
              ${aberto ? "opacity-0" : "top-[14px] opacity-100"} listras`}
          />
          <span
            className={`absolute left-0 block h-[3px] rounded-lg ${overFooter ? "bg-[var(--cor-primaria)] duration-600" : "bg-black duration-600"}  transition-all duration-700 ease-in-out hoverSeta
              ${aberto ? "w-[30px] -rotate-[135deg]" : "top-[23px] w-[25px] rotate-0"} listras`}
          />
        </div>
      </button>
    </div>
    )
}