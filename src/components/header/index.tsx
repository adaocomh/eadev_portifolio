'use client'

import { useEffect, useRef } from 'react';
import { TitleComp } from './componets/title';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
    const containerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.querySelectorAll('.animate-on-scroll');

        gsap.fromTo(
            elements,
            { opacity: 1, y: 0 },
            {
                opacity: 0,
                y: 200,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0, // cada elemento aparece com 0.3s de diferença
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 0%',
                    end: 'bottom 10%',
                    scrub: 0.5, // suaviza o movimento com delay
                },
            }
        )
    }, []);

    return (
        <div ref={containerRef} className="flex flex-col h-[100vh] p-[80px]" id="hdS1">
            <div className="flex flex-col justify-around h-[100%]">
                <h2 className="animate-h2 max-w-[200px] text-start text-[4.5vh] text-[var(--cor-font)] 
                    text-shadow-[0px_10px_15px_rgba(0,0,0,0.3)] ml-[15px] md:max-w-max md:text-[2.8vw]">
                    Dev.<br /> Front-end freelancer<br />
                </h2>
                    <TitleComp/>
                <div className="animate-on-scroll flex justify-between">
                    <img
                        className="h-[250px]"
                        src="/imgs/icons/sla.jpeg"
                        alt="Foto do desenvolvedor"
                    />
                    <p className="title self-end font-extralight 
                        text-[2.9vh] text-[var(--cor-font)] 
                        text-shadow-[0px_10px_15px_rgba(0,0,0,0.3)] md:text-[1.6rem]">
                        Construindo experiências interativas e intuitivas na web.
                    </p>
                </div>
            </div>
        </div>
    );
}