'use client'
import styles from './style.module.css'
import SlideEffect from '../slideEffect/slideEffect'
import { LogoContato } from './logoContato'
import { ConteudoForm } from './form'
import React, { useRef, useState } from 'react'
export default function FtPg(){
    const [emailCopiadpo, setEmailCopiado] = useState<boolean>(false)
    const emailRef = useRef<HTMLAnchorElement | null>(null)
     
    const copiarEmail = () => {
        const email = emailRef.current?.innerText
        if(email){
        navigator.clipboard.writeText(email)
        setEmailCopiado(true)
        setTimeout(() => {
            setEmailCopiado(false)
        }, 1500)
    }
    }
    return(
        <div className='relative flex justify-center items-center min-h-[95vh] max-h-[95vh] bg-[var(--cor-terciario)] overflow-hidden
        md:min-h-[100vh] md:max-h-[100vh] 
        xl:min-h-[110vh] xl:max-h-[110vh]
        ' id="footerS4">
            <div className='flex flex-col justify-center max-w-[80vw]'>
                <div className='flex justify-center'>
                    <div className='hidden
                    md:flex md:top-[11vh] justify-center items-center bg-[url(/imgs/self/logoPiscando.png)] bg-no-repeat bg-center bg-[var(--cor-primaria)] rounded-[50%] absolute left-[5vw] w-[100px] h-[100px] xl:top-[15vh]'></div>
                    <ConteudoForm/>
                </div>
                <div className='flex items-center gap-[12%] m-[1.3vw_0_1.8vw_0]
                md:m-[1.3vw_0_0.8vw_0]
                xl:m-[2.3vw_0_2vw_0]'>
                    <div className='w-[88%] border-b-[0.1px] border-[var(--cor-primaria)]'/> <LogoContato/>
                </div>
                <SlideEffect<HTMLDivElement>>
                    {(ref, visivel) => (
                <div ref={ref} className={`${visivel ? 'flex flex-col justify-start items-center max-w-[100%] gap-[2vw] translate-y-[0] transition-all duration-1200 opacity-100 md:flex-row md:max-w-max' : 'flex justify-start flex-col items-center max-w-[100%] gap-[2vw] translate-y-[100%] transition-all duration-1200 opacity-0 md:flex-row md:max-w-max'}`}>
                    <a ref={emailRef} className='text-[var(--cor-primaria)] border-[0.1px] rounded-[50px] font-extralight text-[16px] p-[2vw] w-[100%] text-center hover:bg-[#474837] hover:translate-y-[-4px] hover:transition-all hover:duration-300 hover:shadow-[0px_3px_8px_rgba(0,0,0,0.3)]' onClick={copiarEmail}>{emailCopiadpo ? 'E-mail copiado!' : 'eadevcontato@gmail.com'}</a>
                    <a href='https://wa.me/48988325514?text=Olá,%20Éverton!%20Poderíamos%20falar%20sobre%20um%20suposto%20projeto?'  rel='noopener noreferrer' className='text-[var(--cor-primaria)] border-[0.1px] rounded-[50px] font-extralight text-[16px] p-[2vw] w-[100%] text-center hover:bg-[#474837] hover:translate-y-[-4px] hover:transition-all hover:duration-300 hover:shadow-[0px_3px_8px_rgba(0,0,0,0.3)]'>+55 (48) 98832-5514</a>
                </div>)}
                </SlideEffect>
            </div>
        </div>
    )
}