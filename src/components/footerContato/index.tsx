'use client'
import SlideEffect from '../slideEffect/slideEffect'
import { SlideMemoji } from './slideMemoji'
import { ConteudoForm } from './form'
import React, { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FooterContato(){
    const containerRef = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        if (!containerRef.current) return;
  
        const elements = containerRef.current.querySelectorAll('.animate-on-scroll-form');
  
        gsap.fromTo(
            elements,
            { opacity: 0.50, y: 50 + "%" },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'powe1.inOut',
                stagger: 0, // cada elemento aparece com 0.3s de diferença
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    end: 'top 50%',
                    scrub: 3,
                },
            }
        )

        // Fixar a seção do footer no topo durante o scroll com aceleração
        const section = containerRef.current.querySelector('#footerS4') as HTMLElement | null
        let pinInstance: ScrollTrigger | undefined
        if (section) {
            pinInstance = ScrollTrigger.create({
                trigger: section,
                start: 'top 20%',
                end: 'top top',
                scrub: 0.5, // Valor menor = mais responsivo/acelerado
                pin: true,
                pinSpacing: false, // Easing para suavizar a aceleração
            })
        }

        return () => {
            pinInstance?.kill()
        }
    }, []);

    return(
    <div ref={containerRef} className='bg-gradient-to-t from-[var(--cor-terciario)] from-40% to-[var(--cor-primaria)] to-60% h-[100vh] ' id="footerS4">
        
            <div className='animate-on-scroll-form sticky top-[0px] flex justify-center items-center bg-[var(--cor-terciario)] h-[100vh]'>
                <div className='flex flex-col justify-center max-w-[80vw]'>
                    <ConteudoForm/>
                    <div className='flex items-center gap-[12%] m-[1.3vw_0_1.8vw_0]
                    md:m-[1.3vw_0_0.8vw_0]
                    xl:m-[2.3vw_0_2vw_0]'>
                        <div className='w-[70%] border-b-[0.1px] border-[#F5ECDB50]'/><SlideMemoji/>
                    </div>
                    <SlideEffect<HTMLDivElement>>
                        {(ref, visivel) => (
                    <div className='flex w-[100%] justify-between'>
        
                        <div ref={ref} className={`${visivel ? 'flex items-center gap-[2vw] translate-y-[0] transition-all duration-1000 opacity-100 md:flex-row' : 'flex flex-col items-center gap-[2vw] translate-y-[19%] transition-all duration-1000 opacity-0 md:flex-row'}`}>
                            <a ref={emailRef} className='w-max rounded-[50px] font-extralight text-[16px] p-[2vw] text-center hover:translate-y-[-4px] hover:transition-all hover:duration-500 hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_12px_rgba(0,0,0,0.15)] bg-[rgba(128,128,128,0.05)] backdrop-blur-xs text-(--cor-primaria) shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_10px_rgba(0,0,0,0.08)]' onClick={copiarEmail}>{emailCopiadpo ? 'E-mail copiado!' : 'eadevcontato@gmail.com'}</a>
                            <a href='https://wa.me/48988325514?text=Olá,%20Éverton!%20Gostaria%20de%20falar%20mais%20sobre%20seus%20serviços%20oferecido.' target='_blank' rel='noopener noreferrer' className='w-max rounded-[50px] font-extralight text-[16px] p-[2vw] text-center  hover:translate-y-[-4px] hover:transition-all hover:duration-500 hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_12px_rgba(0,0,0,0.15)] bg-[rgba(128,128,128,0.05)] backdrop-blur-xs text-(--cor-primaria) shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_10px_rgba(0,0,0,0.08)]'>+55 (48) 98832-5514</a>
                        </div>
                    </div>)}
                    </SlideEffect>
                </div>
                </div>
    </div>
    )
}