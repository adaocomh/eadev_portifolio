'use client'
import MenuSuspenso from '../components/mnSuspenso'
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SlideEffect from '../components/slideEffect/slideEffect';
import CircleText from '../components/circleTag/circleTag';
import { SlideMemoji } from '../components/slideMemoji'
import { ConteudoForm } from '../components/form'
import Data from "../arquivoDemo/demo.json"
import LottieWord from '@/components/lottieAnimate/lottieWord';
import Clock from '@/components/relogio';

gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();
const triggers: ScrollTrigger[] = [];

export default function Home() {
  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const demoRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [emailCopiado, setEmailCopiado] = useState<boolean>(false)
  const emailRef = useRef<HTMLAnchorElement | null>(null)
  const aRefs = useRef<(HTMLElement | null)[]>([]);

  const slideShow = 'translate-y-[0%] transition-all duration-1200 opacity-100';
  const slideHide = 'translate-y-[89%] transition-all duration-1200 opacity-0';



    useEffect(() => {
    if (!aRefs.current.length) return;
    mm.add(
        {
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)",
        },
        (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };
    
        aRefs.current.forEach((el, index) => {
            if (!el) return;
            const alturaFechado = isMobile ? "12vh" : "18vh";
            const alturaAberto = isMobile ? "42vh" : "95vh";
            const endM = isMobile ? "100% top" : "450% top";
            const startM = isMobile ? "-250% top" : "-100% top";

    
            const abrir = () => {
            aRefs.current.forEach((other, i) => {
                if (other && i !== index) {
                gsap.to(other, {
                    height: alturaFechado,
                    duration: 0.01,
                    ease: "power1.inOut",
                });
                }
            });
            
            gsap.to(el, {
                height: alturaAberto,
                duration: 0.1,
                ease: "power1.out",
            });
            gsap.fromTo(el.querySelector(".img"), {
                opacity: 0,
            }, {
                opacity: 1,
                duration: 0.8,
            })
            };
            
            const fechar = () => {
            gsap.to(el, {
                height: alturaFechado,
                duration: 0.1,
                ease: "power1.inOut",
            });
            gsap.fromTo(el.querySelector(".img"), {
                opacity: 1,
            }, {
                opacity: 0,
                duration: 0.5,
            })
            };
    
            const trigger = ScrollTrigger.create({
            trigger: el,
            start: startM,
            end: endM,
            onEnter: abrir,
            onEnterBack: abrir,
            onLeave: fechar,     
            onLeaveBack: fechar, 
            });
    
            triggers.push(trigger);
        });
    
        return () => {
            triggers.forEach((t) => t.kill());
        };
        }
    );
    
    return () => {
        mm.revert();
    };
    }, []);

    useEffect(() => {
        if (!headerRef.current) return;

        const elements = headerRef.current.querySelectorAll('.animate-on-scroll');

        gsap.fromTo(
            elements,
            { opacity: 1, y: 0 },
            {
                opacity: 0,
                y: 200,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0,
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 0%',
                    end: 'bottom 5%',
                    scrub: 0,
                },
            }
        )
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.querySelectorAll('.animate-on-scroll-lottie');

        gsap.fromTo(
            elements,
            { opacity: 1, y: 300 },
            {
                opacity: 1,
                y:"-" + 225,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 100%',
                    end: 'bottom 0%',
                    scrub: 1.5,
                },
            }
        )
    }, []);

    useEffect(() => {
      if (!demoRef.current) return;

      const elements = demoRef.current.querySelectorAll('.animate-on-scroll-demo');

      gsap.fromTo(
          elements,
          { opacity: 0, y: 150 },
          {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "expoScale(0.5,7, none)",
              stagger: 0,
              scrollTrigger: {
                  trigger: demoRef.current,
                  start: 'top 50%',
                  end: 'top center',
                  scrub: 3,
              },
          }
      )
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;

    mm.add(
      {
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)",
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };
        const curve = footerRef.current?.querySelector(".curve")

        if (!curve) return;

        // define valores diferentes se quiser para mobile/desktop
        const initialTop = isMobile ? "-30vh" : "-50vh";
        const initialHeight = isMobile ? "60vh" : "100vh";

        gsap.fromTo(
          curve,
          {
            borderRadius: "100%",
            height: initialHeight,
            top: initialTop,
          },
          {
            borderRadius: "0%",
            height: "0vh",
            top: "0vh",
            ease: "none",
            scrollTrigger: {
              id: "footerCurve",
              trigger: footerRef.current,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );

        return () => {
          // remove triggers ao desmontar
          ScrollTrigger.getById("footerCurve")?.kill();
        };
      }
    );

    return () => {
      mm.revert(); // limpa tudo
    };
  }, []);
  
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

  return (
    <>
        <nav className='fixed w-[100vw] h-[100px] p-[20px_20px_0px_20px] z-50 md:p-[20px_80px_20px_80px]'><MenuSuspenso/></nav>
        <header ref={headerRef} className="flex flex-col h-[106vh] p-[20px_0px_0px_20px] bg-[var(--cor-primaria)] lg:h-[119vh] lg:p-[80px_0px_0px_80px]" id='header'>
          <div className="flex flex-col justify-end h-[100%] md:gap-[60px]">
            <div className="flex flex-col justify-center items-start pr-[20px] gap-[20px] md:flex-row md:justify-start md:items-end lg:gap-[80px]">
                <img className="h-[300px] md:h-[330px]" src="/imgs/perfil/perfil.jpeg" alt="Foto do desenvolvedor"/>
                <div className='flex flex-col gap-[10px]'>
                    <h2 className="text-start text-[35px] text-[var(--cor-font)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] md:text-[50px] lg:text-[60px]"> Dev.<br/> Front-end freelancer<br/></h2>
                    <p className='text-[20px] font-extralight text-[var(--cor-font)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] md:text-[25px] lg:text-[30px]'>Construindo experiências interativas e intuitivas na web.</p>
                </div>
                <div className='absolute right-0 top-[25vh] md:top-[45vh] flex justify-between items-center p-[10px] pr-[20px] bg-[rgba(0,0,0,0.82)] rounded-l-full w-[200px] animate-on-scroll'>
                    <div className='w-25 h-25 bg-[var(--cor-primaria)] rounded-full'>
                        <LottieWord/>
                    </div>
                    <div className='flex flex-col self-end items-end w-[100%]'>
                        <Clock/>
                        <p className='text-[22px] font-extralight text-end text-(--cor-primaria)'>Brasil</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-end items-center h-[25vh] font-[Barriecito] lg:h-[50vh] animate-on-scroll'>
            <h1 className='text-[28vw] text-[rgba(0,0,0,0.9)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)]'>É<span className='text-[var(--cor-secundaria)]'>v</span>erton</h1>
            </div>
          </div>
        </header>
        <main  ref={containerRef} className='bg-[var(--cor-primaria)]'>
          <section className='flex flex-col justify-center items-center gap-[35px] md:gap-[50px] w-[100vw] h-[100vh] p-[100px_0px_0px_0px] md:p-[200px_0px_50px_0px]' id='sS2'>
          <div className='flex justify-center items-center'>
            <div className='flex flex-col items-center justify-center w-[90vw] md:flex-row md:justify-between md:items-start md:w-[70vw] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)]'>
                <div className='hidden
                md:block md:text-[2vw] md:font-extralight md:text-[var(--cor-font)]
                '>
                    {["Buscando entregar projetos interativos e",
                      "intuitivos; sem descartar suas intenções, tenho",
                      "como objetivo oferecer a melhor solução para o",
                      "que você busca."].map((text, index) => (
                        <div key={index} className='overflow-hidden'>
                            <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                            <div ref={ref} className={`${visivel ? slideShow : slideHide}`}>{text}</div>
                            )}</SlideEffect>
                        </div>
                    ))}
                </div>
                    <div className='flex flex-col'>
                        <div className='hidden md:block overflow-hidden mb-[10px]'>
                            <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                            <div ref={ref} className={`${visivel ? `w-[20vw] border-b-1 pb-[5px]  font-normal text-[1.6vw] text-[var(--cor-font)] ${slideShow}` : `w-[20vw] border-b-1 pb-[5px] font-normal text-[1.6vw] text-[var(--cor-font)] ${slideHide}`}`}>Posso atuar...</div>)}</SlideEffect>
                        </div>
                                    <div className='hidden
                                    md:block md:text-[1vw] md:font-extralight md:text-[var(--cor-font)]
                                    '>
                        {["transformando layouts pré-definidos em",
                          "código funcional ou colaborar na criação do",
                          "projeto desde o início, unindo design e ",
                          "desenvolvimento para uma solução completa."].map((text, index) => (
                            <div key={index} className='overflow-hidden'>
                                <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                                <div ref={ref} className={`${visivel ? slideShow : slideHide}`}>{text}</div>
                                )}</SlideEffect>
                            </div>
                        ))}
                        </div>
                    </div>
                <div className='md:hidden w-full font-extralight text-[6.5vw] text-[var(--cor-font)]'>
                    {["Buscando entregar projetos",
                      "interativos e intuitivos; sem",
                      "descartar suas intenções,",
                      "tenho como objetivo oferecer",
                      "a melhor solução para o que",
                      "você busca."].map((text, index) => (
                        <div key={index} className='overflow-hidden'>
                            <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                            <div ref={ref} className={`${visivel ? slideShow : slideHide}`}>{text}</div>
                            )}</SlideEffect>
                        </div>
                    ))}
                </div>
                    <div className='md:hidden w-full overflow-hidden m-[3vh_0]'>
                        <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                        <div ref={ref} className={`${visivel ? `w-[75vw] border-b border-[rgba(0, 0, 0, 0.6)] pb-[5px] font-normal text-[5vh] text-[var(--cor-font)] ${slideShow}` : `w-[75vw] border-b-1 pb-[5px] font-normal text-[5vh] text-[var(--cor-font)] ${slideHide}`}`}>Posso atuar...</div>)}</SlideEffect>
                    </div>
                <div className='md:hidden w-full font-extralight text-[4.5vw] text-[var(--cor-font)]'>
                    {["transformando layouts pré-definidos em",
                      "código funcional ou colaborar na criação do",
                      "projeto desde o início, unindo design e",
                      "desenvolvimento para uma solução",
                      "completa."].map((text, index) => (
                        <div key={index} className='overflow-hidden'>
                            <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                            <div ref={ref} className={`${visivel ? slideShow : slideHide}`}>{text}</div>
                            )}</SlideEffect>
                        </div>
                    ))}
                </div>
            </div>
            </div>
            <div className='animate-on-scroll-lottie w-[50vw] flex justify-end'>
                <CircleText/>
            </div>
          </section>
          <section ref={demoRef} className='flex flex-col justify-start items-center w-[100vw] h-[70vh] md:h-[130vh]' id='demo'>
                <div className='animate-on-scroll-demo'>
                    <div className='flex flex-col gap-[30px]'>
                    <div  className='flex items-center w-full'>
                        <p className='text-[16px] font-extralight opacity-50'>Demonstração</p>
                    </div>
                    <div className='flex flex-col gap-[5vh]'>
                        {Data.demo.map((d, index) => (<a key={d.name} href={d.url} ref={(el) => { aRefs.current[index] = el }} data-name={d.name} className={`transition-all flex flex-col justify-start items-center w-[95vw] h-[12vh] md:h-[18vh] overflow-hidden rounded-[20px] duration-500 bg-[rgba(128,128,128,0.06)] backdrop-blur-md shadow-[inset_2.5px_2.5px_13px_rgba(255,255,255,0.20),2.5px_8px_10px_rgba(0,0,0,0.08)]`} target="_blank" rel="noopener">
                            <div className='flex justify-between w-full items-center px-[5%] min-h-[12vh] md:min-h-[18vh] contImg'>
                                <h1 className={`text-[26px] md:text-[40px] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] font-extralight opacity-70 transition-all duration-500`}>{d.name}</h1>
                                <img src="/icons/link.png" className='w-[22px] md:w-[40px] opacity-70' alt="icon de link" />
                            </div>
                            <img src={d.img} alt={d.name} className="w-[80%] md:w-[70%] img"/>
                        </a>))}
                    </div>
                </div>
                </div>
          </section>
        </main>
        <footer ref={footerRef} className='relative flex flex-col h-[105vh] md:h-[100vh] footerS4 overflow-hidden' id="footer">
            <div className='curve absolute left-1/2 -translate-x-1/2 w-[150vw] bg-[var(--cor-primaria)] shadow-[0px_10px_100px_rgba(0,0,0,0.6)]'/>
        <div className='flex justify-center items-end md:items-center bg-[var(--cor-terciario)] h-[100vh]'>
                <div className='flex flex-col justify-center gap-[15px] max-w-[80vw]'>
                    <ConteudoForm/>
                    <div className='flex items-center md:gap-[12%] m-[1.3vw_0_1.8vw_0]
                    md:m-[1vw_0_0.8vw_0]'>
                        <div className='hidden md:block w-[70%] border-b-[0.1px] border-[#F5ECDB50]'/>
                        <h1 className='md:hidden w-full text-[var(--cor-primaria)] text-[24px] font-medium text-start text-shadow-[0px_0px_10px_rgba(0,0,0,0.5)] my-[10px]'>Vamos trabalhar<br/> juntos?</h1>
                        <SlideMemoji/>
                    </div>
                    <SlideEffect<HTMLDivElement>>
                        {(ref, visivel) => (
                    <div className='flex w-[100%] justify-between'>
                        <div ref={ref} className={`${visivel ? 'w-full flex flex-col items-center gap-[15px] md:gap-[2vw] translate-y-[0] transition-all duration-1000 opacity-100 md:flex-row' : 'flex flex-col items-center gap-[2vw] translate-y-[19%] transition-all duration-1000 opacity-0 md:flex-row'}`}>
                            <a ref={emailRef} className='w-full md:w-max rounded-[50px] font-extralight text-[16px] p-[15px] md:p-[2vw] text-center text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] hover:translate-y-[-4px] hover:transition-all hover:duration-500 hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_12px_rgba(0,0,0,0.15)] bg-[rgba(128,128,128,0.05)] backdrop-blur-xs text-[var(--cor-primaria)] shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_10px_rgba(0,0,0,0.08)]' onClick={copiarEmail}>{emailCopiado ? 'E-mail copiado!' : 'eadevcontato@gmail.com'}</a>
                            <a href='https://wa.me/48988325514?text=Olá,%20Éverton!%20Gostaria%20de%20falar%20mais%20sobre%20seus%20serviços%20oferecido.' target='_blank' rel='noopener noreferrer' className='w-full md:w-max rounded-[50px] font-extralight text-[16px] p-[15px] md:p-[2vw] text-center text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] hover:translate-y-[-4px] hover:transition-all hover:duration-500 hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_12px_rgba(0,0,0,0.15)] bg-[rgba(128,128,128,0.05)] backdrop-blur-xs text-[var(--cor-primaria)] shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_10px_rgba(0,0,0,0.08)]'>+55 (48) 98832-5514</a>
                        </div>
                    </div>)}
                    </SlideEffect>
                </div>
                </div>
        </footer>
    </>
  );
}