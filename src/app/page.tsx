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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [emailCopiadpo, setEmailCopiado] = useState<boolean>(false)
  const emailRef = useRef<HTMLAnchorElement | null>(null)


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
                stagger: 0, // cada elemento aparece com 0.3s de diferença
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 0%',
                    end: 'bottom 5%',
                    scrub: 0, // suaviza o movimento com delay
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
          { opacity: 0, y: 100 },
          {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power1.inOut',
              stagger: 0,
              scrollTrigger: {
                  trigger: demoRef.current,
                  start: 'top 80%',
                  end: 'center bottom',
                  scrub: 3,
              },
          }
      )
  }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
          if (cardRef.current) {
            cardRef.current.style.left = e.clientX + 20 + "px";
            cardRef.current.style.top = e.clientY - 200 + "px";
          }
        };
    
        window.addEventListener("mousemove", handleMouseMove);
      }, []);

      

    useEffect(() => {
      if (!footerRef.current) return;

      const elements = footerRef.current.querySelectorAll('.animate-on-scroll-form');

      gsap.fromTo(
          elements,
          { opacity: 0, y: 0 },
          {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'powe1.inOut',
              stagger: 0,
              scrollTrigger: {
                  trigger: footerRef.current,
                  start: 'top 60%',
                  end: 'top top',
                  scrub: 2,
              },
          }
      )

      const section = footerRef.current.querySelector('#footerS4') as HTMLElement | null
      let pinInstance: ScrollTrigger | undefined
      if (section) {
          pinInstance = ScrollTrigger.create({
              trigger: section,
              start: 'top 20%',
              end: '+=150%',
              scrub: 1,
              pin: true,
              pinSpacing: false,
          })
      }

      return () => {
          pinInstance?.kill()
      }
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
        <header ref={headerRef} className="flex flex-col h-[119vh] p-[20px_0px_0px_20px] bg-[var(--cor-primaria)] lg:p-[80px_0px_0px_80px]" id="hdS1">
          <div className="flex flex-col justify-end h-[100%] md:gap-[60px]">
            <div className="flex flex-col justify-center items-start pr-[20px] gap-[20px] md:flex-row md:justify-start md:items-end lg:gap-[80px]">
                <img className="h-[300px] md:h-[330px]" src="/imgs/perfil/perfil.jpeg" alt="Foto do desenvolvedor"/>
                <div className='flex flex-col gap-[10px]'>
                    <h2 className="text-start text-[35px] text-[var(--cor-font)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] md:text-[50px] lg:text-[60px]"> Dev.<br/> Front-end freelancer<br/></h2>
                    <p className="text-[20px] font-extralight text-[var(--cor-font)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] md:text-[25px] lg:text-[30px]">Construindo experiências interativas e intuitivas na web.</p>
                </div>
            </div>
            <div className='flex justify-end items-center h-[25vh] font-[Barriecito] md:h-[50vh] animate-on-scroll'>
            <h1 className='text-[28vw] text-[rgba(0,0,0,0.9)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)]'>É<span className='text-[var(--cor-secundaria)]'>v</span>erton</h1>
            </div>
          </div>
        </header>
        <main  ref={containerRef} className='bg-[var(--cor-primaria)]'>
          <section className='flex flex-col justify-center items-center gap-[50px] w-[100vw] overflow-hidden p-[100px_0px_0px_0px] md:p-[200px_0px_50px_0px]' id='sS2'>
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
                            <div ref={ref} className={`${visivel ? 'translate-y-[0%] transition-all duration-1200 opacity-100' : 'translate-y-[89%] transition-all duration-1200 opacity-0'}`}>{text}</div>
                            )}</SlideEffect>
                        </div>
                    ))}
                </div>
                    <div className='flex flex-col'>
                        <div className='hidden md:block overflow-hidden mb-[10px]'>
                            <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                            <div ref={ref} className={`${visivel ? 'w-[20vw] border-b-1 pb-[5px]  font-normal text-[1.6vw] text-[var(--cor-font)] translate-y-[0%] transition-all duration-1200 opacity-100' : 'w-[20vw] border-b-1 pb-[5px] font-normal text-[1.6vw] text-[var(--cor-font)] translate-y-[89%] transition-all duration-1200 opacity-0'}`}>Posso atuar...</div>)}</SlideEffect>
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
                                <div ref={ref} className={`${visivel ? 'translate-y-[0%] transition-all duration-1200 opacity-100' : 'translate-y-[89%] transition-all duration-1200 opacity-0'}`}>{text}</div>
                                )}</SlideEffect>
                            </div>
                        ))}
                        </div>
                    </div>
                <div className='md:hidden w-full font-extralight text-[3.5vh] text-[var(--cor-font)]'>
                    {["Buscando entregar projetos",
                      "interativos e intuitivos; sem",
                      "descartar suas intenções,",
                      "tenho como objetivo oferecer",
                      "a melhor solução para o que",
                      "você busca."].map((text, index) => (
                        <div key={index} className='overflow-hidden'>
                            <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                            <div ref={ref} className={`${visivel ? 'translate-y-[0%] transition-all duration-1200 opacity-100' : 'translate-y-[89%] transition-all duration-1200 opacity-0'}`}>{text}</div>
                            )}</SlideEffect>
                        </div>
                    ))}
                </div>
                    <div className='md:hidden w-full overflow-hidden m-[3vh_0]'>
                        <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                        <div ref={ref} className={`${visivel ? 'w-[75vw] border-b-1 pb-[5px] font-normal text-[5vh] text-[var(--cor-font)] translate-y-[0%] transition-all duration-1200 opacity-100' : 'w-[75vw] border-b-1 pb-[5px] font-normal text-[5vh] text-[var(--cor-font)] translate-y-[89%] transition-all duration-1200 opacity-0'}`}>Posso atuar...</div>)}</SlideEffect>
                    </div>
                <div className='md:hidden w-full font-extralight text-[3vh] text-[var(--cor-font)]'>
                    {["transformando layouts pré-",
                      "definidos em código funcional ou",
                      "colaborar na criação do projeto",
                      "desde o início, unindo design e",
                      "desenvolvimento para uma solução",
                      "completa."].map((text, index) => (
                        <div key={index} className='overflow-hidden'>
                            <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                            <div ref={ref} className={`${visivel ? 'translate-y-[0%] transition-all duration-1200 opacity-100' : 'translate-y-[89%] transition-all duration-1200 opacity-0'}`}>{text}</div>
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
          <section ref={demoRef} className='flex flex-col items-center w-[100vw] pb-[200px]' id='demo'>
          <div className='animate-on-scroll-demo flex flex-col w-[80vw]'>
                    <div  className='flex items-center border-b-1 w-full h-[100px] px-[80px]'>
                        <p className='text-[16px] font-extralight opacity-50'>Demonstração</p>
                    </div>
                        {Data.demo.map((d)=> (
                            <a key={d.name} href={d.url} target="_blank" rel="noopener noreferrer" className={`flex justify-between items-center border-b-1 w-full h-[100px] px-[80px] transition-color duration-300 z-30`}
                            onMouseEnter={() => setHovered(d.name)}
                            onMouseOver={() => setVisible(true)}
                            onMouseOut={()=> {
                              setHovered(null)
                              setVisible(false)
                              }}>
          
                                <h3 className={`pointer-events-none text-[2vw] text-[var(--cor-font)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] cursor- ${hovered === d.name ? "translate-y-[4px] translate-x-[3px] transition-all duration-300 opacity-50" : ""}`}>{d.name}</h3>
                                <img className={`w-[20px] h-[20px] ${hovered === d.name ? "translate-y-[-4px] translate-x-[3px] transition-all duration-300 animate-bounce" : ""}`} src="icons/up-right.png" alt="seta que indica direcionamento"/>
                            </a>
                        ))}</div>
          
                <div
          ref={cardRef}
          className={`fixed flex justify-center items-center w-[500px] h-[450px] rounded-[20px] z-50
                  transition-opacity duration-300 bg-[rgba(128,128,128,0.08)] backdrop-blur-md shadow-[inset_2.5px_2.5px_12px_rgba(255,255,255,0.18),2.5px_8px_10px_rgba(0,0,0,0.08)]
                  ${visible ? "opacity-100" : "opacity-0"}`}
                >
          {hovered && (
              <img
                src={Data.demo.find((d) => d.name === hovered)?.img || ""}
                alt={hovered}
                className="w-[450px]"
              />
          )}
                </div>
          </section>
        </main>
        <footer ref={footerRef} className='bg-[var(--cor-primaria)] h-[100vh] ' id="footerS4">
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
                            <a ref={emailRef} className='w-max rounded-[50px] font-extralight text-[16px] p-[2vw] text-center text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] hover:translate-y-[-4px] hover:transition-all hover:duration-500 hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_12px_rgba(0,0,0,0.15)] bg-[rgba(128,128,128,0.05)] backdrop-blur-xs text-(--cor-primaria) shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_10px_rgba(0,0,0,0.08)]' onClick={copiarEmail}>{emailCopiadpo ? 'E-mail copiado!' : 'eadevcontato@gmail.com'}</a>
                            <a href='https://wa.me/48988325514?text=Olá,%20Éverton!%20Gostaria%20de%20falar%20mais%20sobre%20seus%20serviços%20oferecido.' target='_blank' rel='noopener noreferrer' className='w-max rounded-[50px] font-extralight text-[16px] p-[2vw] text-center text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] hover:translate-y-[-4px] hover:transition-all hover:duration-500 hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_12px_rgba(0,0,0,0.15)] bg-[rgba(128,128,128,0.05)] backdrop-blur-xs text-(--cor-primaria) shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_10px_rgba(0,0,0,0.08)]'>+55 (48) 98832-5514</a>
                        </div>
                    </div>)}
                    </SlideEffect>
                </div>
                </div>
        </footer>
    </>
  );
}








