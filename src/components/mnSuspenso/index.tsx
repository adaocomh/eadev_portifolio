'use client'
import { MnSmobile } from './mnSMobile'

export function MenuSuspenso(){
    const scrollSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
    return (
        <div className='flex justify-between items-center sticky top-[0px] h-[60px] bg-[#F5ECDB] p-[0px_27px] border-b-[1px] shadow-[0px_10px_20px_rgba(0,0,0,0.1)] z-1'>
            <p className='hover:translate-y-[-2px] hover:transition-all hover:duration-200 hover:text-shadow-[0px_5px_10px_rgba(0,0,0,0.250)] cursor-pointer font-light' onClick={()=>{scrollSection("hdS1")}}>ⓒ Code by É. Adão</p>
            <nav>
                 <ul className='hidden md:relative md:flex md:flex-row'>
                    <li className='md:m-[0px_0px_0px_25px] hover:translate-y-[-2px] hover:transition-all hover:duration-200 hover:text-shadow-[0px_5px_15px_rgba(0,0,0,0.3)]' onClick={()=>{scrollSection("sS2")}} >Meu objetivo</li>
                    <li className='md:m-[0px_0px_0px_25px] hover:translate-y-[-2px] hover:transition-all hover:duration-200 hover:text-shadow-[0px_5px_15px_rgba(0,0,0,0.3)]' onClick={()=>{scrollSection("aPS2")}} >Projetos</li>
                    <li className='md:m-[0px_0px_0px_25px] hover:translate-y-[-2px] hover:transition-all hover:duration-200 hover:text-shadow-[0px_5px_15px_rgba(0,0,0,0.3)]' onClick={()=>{scrollSection("footerS4")}} >Contato</li>
                </ul>
                <MnSmobile/>
            </nav>
        </div>
    )
}