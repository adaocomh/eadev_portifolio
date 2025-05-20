'use client'
import { useState } from 'react'
export function MnSmobile() {
        const [aberto, setAberto] = useState<boolean>(false)
        const scrollSection = (id: string) => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    return(
        <>
            <button className='flex md:hidden' onClick={() => setAberto(!aberto)}>{aberto ? <img src={'/imgs/icons/cross.png'} alt="Menu" width={24} height={24}/> : <img src={'/imgs/icons/interface-2.png'} alt="Menu" width={24} height={24}/>}
            </button>
            <div className='absolute top-[60px] right-[0px] overflow-hidden'>
                <ul className={`flex justify-around items-center md:hidden h-[40px] w-[100vw] bg-[#51503c] list-none cursor-pointer ${aberto ? 'translate-y-[0%] transition-all duration-200 opacity-[1]' : 'translate-y-[-100%] transition-all duration-300 opacity-[0]'}`}>
                            <li className='text-[var(--cor-primaria)] md:m-[0px_0px_0px_25px] hover:translate-y-[-2px] hover:transition-all hover:duration-200' onClick={()=>{scrollSection("sS2")}}>Meu objetivo</li>
                            <li className='text-[var(--cor-primaria)] md:m-[0px_0px_0px_25px] hover:translate-y-[-2px] hover:transition-all hover:duration-200' onClick={()=>{scrollSection("aPS2")}}>Demo</li>
                            <li className='text-[var(--cor-primaria)] md:m-[0px_0px_0px_25px] hover:translate-y-[-2px] hover:transition-all hover:duration-200' onClick={()=>{scrollSection("footerS4")}}>Contato</li>
                </ul>
            </div>
        </>
    )
}