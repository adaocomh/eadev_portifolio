import SlideEffect from '../../slideEffect/slideEffect'
import React from 'react'
export function LogoContato(){
    return(
        <SlideEffect<HTMLImageElement>>
        {(ref, visivel) => (
        <img src='imgs/icons/contact-maill.png' ref={ref} className={`${visivel ? 'w-[12vw] rounded-[50%] p-[10px] translate-x-[0] transition-all duration-1200 opacity-100 bg-[var(--cor-primaria)] md:w-[6vw]' : 'w-[12vw] rounded-[50%] p-[10px] translate-x-[-100%] transition-all duration-1200 opacity-0 bg-[var(--cor-primaria)] md:w-[6vw]'}`} alt='Icon que representa o e-mail e o numero telefone'/>
        )}
        </SlideEffect>
    )
}