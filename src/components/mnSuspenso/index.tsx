'use client'
import MnSmobile from './mnSMobile'
import { useState,useEffect } from 'react'

export default function MenuSuspenso(){
    const [scrolled, setScrolled] = useState(false);
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
    return (
        <div className='flex justify-between items-center w-[100vw] p-[0px_80px]'>
            <div className={`p-[20px] rounded-[50px] transition-all duration-600 ${scrolled ? "bg-[#f1ebdf90] shadow-[0px_8px_10px_rgba(0,0,0,0.05)]": ""}`}>
                <p className={`cursor-pointer hover:translate-y-[-1px] hover:transition-all hover:duration-300 hover:text-shadow-[0px_5px_15px_rgba(0,0,0,0.3)] font-light`}>ⓒ Code by É. Adão</p>
            </div>
            <nav>
                 <ul className={`hidden transition-all duration-600 md:relative md:flex md:flex-row md:justify-between md:gap-[20px] md:p-[20px] md:rounded-[50px] ${scrolled ? "bg-[#f1ebdf90] shadow-[0px_10px_15px_rgba(0,0,0,0.05)]": ""}`}>
                    <li className='cursor-pointer hover:translate-y-[-1px] hover:transition-all hover:duration-300 hover:text-shadow-[0px_5px_15px_rgba(0,0,0,0.3)]' onClick={()=>{scrollSection("sS2")}}>Meu objetivo</li>
                    <li className='cursor-pointer hover:translate-y-[-1px] hover:transition-all hover:duration-300 hover:text-shadow-[0px_5px_15px_rgba(0,0,0,0.3)]' onClick={()=>{scrollSection("aPS2")}} >Demo</li>
                    <li className='cursor-pointer hover:translate-y-[-1px] hover:transition-all hover:duration-300 hover:text-shadow-[0px_5px_15px_rgba(0,0,0,0.3)]' onClick={()=>{scrollSection("footerS4")}} >Contato</li>
                </ul>
                <MnSmobile/>
            </nav>
        </div>
    )
}