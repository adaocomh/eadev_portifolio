'use client'
import { useState, useEffect } from 'react'
export default function MnSmobile() {
        const [aberto, setAberto] = useState<boolean>(false)
        const [scrolled, setScrolled] = useState(false);
        const [overFooter, setOverFooter] = useState(false)

        useEffect(() => {
            const handleScroll = () => {
              setScrolled(window.scrollY > 50);
            };
        
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
          }, []);

          useEffect(() => {
            if (aberto) {
              document.body.style.overflow = "hidden";
            } else {
              document.body.style.overflow = "auto";
            }
        
            return () => {
              document.body.style.overflow = "auto";
            };
          }, [aberto]);

          useEffect(() => {
            const footer = document.querySelector("#footer")
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
                threshold: 0.9,
              }
            )
        
            observer.observe(footer)
        
            return () => {
              observer.disconnect()
            }
          }, [])

    return(
        <div className={`md:hidden flex justify-center items-center w-[60px] h-[60px] p-[10px] rounded-full transition-all duration-500 ease-in-out z-40 ${aberto ? "" : overFooter ? "bg-[rgba(128,128,128,0.05)] backdrop-blur-xs shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_10px_rgba(0,0,0,0.08)] hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_12px_rgba(0,0,0,0.15)]" : scrolled ? "bg-[rgba(128,128,128,0.05)] backdrop-blur-xs shadow-[inset_2px_2px_8px_rgba(255,255,255,0.1),2px_8px_10px_rgba(0,0,0,0.08)]" : ""}`} onClick={() => setAberto(!aberto)}>
          <div className={`absolute flex justify-center items-center w-0 h-0 bg-[rgba(245,236,219,0.95)] backdrop-blur-xs transition-all duration-600 ease-in-out rounded-[100%] ${aberto ? "right-[0px] top-[0px] w-[100vw] h-[100vh] p-[40px_40px_100px_40px] rounded-none" : ""}`}>
            <ul className={`w-full h-full flex-col justify-end items-start gap-[40px] list-none ${aberto ? 'flex' : 'hidden'}`}>
              <a href='#meu-objetivo' className='links-mn-mobile slideMenu1'>Meu objetivo</a>
              <a href='#demo' className='links-mn-mobile slideMenu2'>Demo.</a>
              <a href='#footer' className='links-mn-mobile slideMenu3'>Contato</a>
              <a href='#header' className="font-light hover:translate-y-[-4px] hover:transition-all rounded-[50px] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] transition-all duration-500 slideMenu4">
              ⓒ Code by É. Adão
              </a>
            </ul>
          </div>
          <button onClick={() => setAberto(!aberto)} className="relative w-[30px] h-[30px] transition-all duration-800 ease-in-out">
              <span
                className={`absolute right-0 block h-[2.1px] rounded-full ${overFooter ? aberto ? "bg-[var(--cor-font)] duration-600" : "bg-[var(--cor-primaria)] duration-600" : "bg-[var(--cor-font)] duration-600"} transition-all duration-700 ease-in-out 
                  ${aberto ? "w-[30px] rotate-[135deg]" : "top-[5px] w-[20px] rotate-0"}`}
              />
              <span
                className={`absolute right-0 block h-[2.1px] w-[30px] rounded-lg ${overFooter ? aberto ? "bg-[var(--cor-font)] duration-600" : "bg-[var(--cor-primaria)] duration-600" : "bg-[var(--cor-font)] duration-600"}  transition-all duration-500 ease-in-out
                  ${aberto ? "opacity-0" : "top-[14px] opacity-100"}`}
              />
              <span
                className={`absolute right-0 block h-[2.1px] rounded-lg ${overFooter ? aberto ? "bg-[var(--cor-font)] duration-600" : "bg-[var(--cor-primaria)] duration-600" : "bg-[var(--cor-font)] duration-600"}  transition-all duration-700 ease-in-out
                  ${aberto ? "w-[30px] -rotate-[135deg]" : "top-[23px] w-[25px] rotate-0"}`}
              />
          </button>
        </div>
    )
}