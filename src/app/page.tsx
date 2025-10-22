'use client'
import MenuSuspenso from '../components/mnSuspenso'
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/all';
import { SplitText } from 'gsap/all';
import CircleText from '../components/circleTag/circleTag';
import { ConteudoForm } from '../components/form'
import Data from "../arquivoDemo/demo.json"
import LottieWord from '@/components/lottieAnimate/lottieWord';
import Clock from '@/components/relogio';

gsap.registerPlugin(SplitText) 
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const mm = gsap.matchMedia();

export default function Home() {
  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const demoRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [emailCopiado, setEmailCopiado] = useState<boolean>(false)
  const emailRef = useRef<HTMLAnchorElement | null>(null)
  const containerCards = useRef<HTMLDivElement>(null)

  //ScrollSmoother global
  useEffect(() => {
    if (!containerCards.current) return;

    const cards = containerCards.current.querySelectorAll(".card")

    // Cria o scroll suave
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.6,
      effects: true,
    });

    // Timeline de movimento horizontal
    gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerCards.current,
        pin: true,
        scrub: 0.5,
        start: "top 28%", 
        end: () => "+=1000px",
      },
    });

    const meuojt =  ScrollTrigger.create({
    pin: '.meuObj',
    start: 'top top',
    end:'+=600px'
    })

    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      meuojt.kill()
    };
  }, []);


  //"title-name-e-clock"
  useEffect(() => {
    if (!headerRef.current) return;

    const elements = headerRef.current.querySelectorAll('.title-name-e-clock');

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

  //Text "meu objetivo"
  useEffect(() =>{

document.fonts.ready.then(() => {
gsap.set(".text", { opacity: 1 });

const split = new SplitText(".text", {
    type: "words,lines",
    linesClass: "line",
    autoSplit: true,
    mask: "lines",
    });
    
    gsap.from(split.lines, {
        duration: 2,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
            trigger: ".text",
            start: "top 70%",
            toggleActions: "play none none reverse", // anima ao entrar, reverte ao sair
        }
    });
});
  }, [])

  useEffect(() => {
    const el = document.querySelector('.titleMn')
    if (!el) return

    // Hover: troca de texto com transição suave
    const handleEnter = () => {
      const newText = el.textContent?.replace('É. Adão', 'Éverton Adão')
      if (!newText) return

      gsap.to(el, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          el.textContent = newText
          gsap.to(el, { opacity: 1, duration: 0.1, ease: 'power2.out' })
        },
      })
    }

    // Volta ao texto original
    const handleLeave = () => {
      const originalText = el.textContent?.replace('Éverton Adão', 'É. Adão')
      if (!originalText) return

      gsap.to(el, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          el.textContent = originalText
          gsap.to(el, { opacity: 1, duration: 0.1, ease: 'power2.out' })
        },
      })
    }

    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)

    // Cleanup
    return () => {
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  //"circle-text"
  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelector('.circle-text');

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

  //scroll "demo"
  useEffect(() => {
    if (!demoRef.current) return;

    const elements = demoRef.current.querySelectorAll('.scroll-demo');

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
                start: 'top 70%',
                end: 'top center',
                scrub: 3,
            },
        }
    )
  }, []);

  //"Borda" circular
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

  //"sile-memoji"
  useEffect(()=>{
    if (!footerRef.current) return

    const slideMemoji = footerRef.current.querySelector('.slide-memoji')

    gsap.fromTo(slideMemoji, {
        opacity: 0,
        translateX: '-200px'
    }, {
        opacity: 1,
        translateX: '0px',
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: footerRef.current,
            start: 'top center',
            end: 'bottom bottom',
            scrub: 0,
        }
    }
    )
  })

  //"slide-contato"
  useEffect(()=>{
    if (!footerRef.current) return

    const slideMemoji = footerRef.current.querySelector('.slide-contato')

    gsap.fromTo(slideMemoji, {
        opacity: 0,
        translateY: '250px'
    }, {
        opacity: 1,
        translateY: '0px',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 10%',
            end: 'bottom bottom',
            scrub: 0,
        }
    }
    )
  })
  
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
    <div id="smooth-wrapper">
        <div id="smooth-content">
        <header ref={headerRef} className="flex flex-col h-[106vh] p-[20px_0px_0px_20px] bg-[var(--cor-primaria)] lg:h-[119vh] lg:p-[80px_0px_0px_80px]" id='header'>
          <div className="flex flex-col justify-end h-[100%] md:gap-[5vh]">
            <div className="flex flex-col justify-center items-start pr-[20px] gap-[20px] md:flex-row md:justify-start md:items-end lg:gap-[80px]">
                <img className="h-[300px] md:h-[330px]" src="/imgs/perfil/perfil.jpeg" alt="Foto do desenvolvedor"/>
                <div className='flex flex-col gap-[10px]'>
                    <h2 className="text-start text-[35px] text-[var(--cor-font)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] md:text-[50px] lg:text-[60px]"> Dev.<br/> Front-end freelancer<br/></h2>
                    <p className='text-[20px] font-extralight text-[var(--cor-font)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] md:text-[25px] lg:text-[30px]'>Construindo experiências interativas e intuitivas na web.</p>
                </div>
                <div className='absolute right-0 top-[20vh] md:top-auto md:self-start flex justify-between items-center p-[10px] pr-[20px] bg-[rgba(0,0,0,0.82)] rounded-l-full w-[200px] title-name-e-clock'>
                    <div className='w-25 h-25 bg-[var(--cor-primaria)] rounded-full'>
                        <LottieWord/>
                    </div>
                    <div className='flex flex-col self-end items-end w-[100%]'>
                        <Clock/>
                        <p className='text-[22px] font-extralight text-end text-(--cor-primaria)'>Brasil</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-end items-center h-[25vh] font-[Barriecito] lg:h-[50vh] title-name-e-clock'>
            <h1 className='text-[28vw] text-[rgba(0,0,0,0.9)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)]'>É<span className='text-[var(--cor-secundaria)]'>v</span>erton</h1>
            </div>
          </div>
        </header>
        <main  ref={containerRef} className='bg-[var(--cor-primaria)]'>
          <section className='meuObj flex flex-col justify-center items-center gap-[35px] md:gap-[50px] w-[100vw] h-[100vh] p-[100px_0px_0px_0px] md:p-[200px_0px_50px_0px]' id='meu-objetivo'>
            <div className='flex flex-col items-center justify-center gap-[20px] w-[90vw] md:flex-row md:justify-between md:items-start md:w-[70vw] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)]'>
                <h3 className='md:w-[70%] w-[100%] text text-[7vw] md:text-[2vw] md:font-extralight md:text-[var(--cor-font)]
                '>Buscando entregar projetos interativos e intuitivos; sem descartar suas intenções, tenho como objetivo oferecer a melhor solução para o que você busca.</h3>
                <div className='flex flex-col md:w-[30%] w-[100%]'>
                    <div className='mb-[12px] w-[100%]'>
                        <div className='text w-[60vw] md:w-[20vw] border-b-1 pb-[5px]  font-normal text-[6vw] md:text-[1.6vw] text-[var(--cor-font)'>Posso atuar...</div>
                    </div>
                    <p className='w-[100%] text text-[4vw] md:text-[1vw] md:font-extralight md:text-[var(--cor-font)]'>Transformando layouts pré-definidos em código funcional ou colaborar na criação do projeto desde o início, unindo design desenvolvimento para uma solução completa.</p>
                </div>
            </div>
            <div className='circle-text w-[50vw] flex justify-end'>
                <CircleText/>
            </div>
          </section>
          <section ref={demoRef} className='flex flex-col justify-start items-start w-[100vw] h-[200vh] overflow-hidden' id='demo'>
                    <div className='flex flex-col items-start pl-[80px] scroll-demo'>
                    <div  className='flex items-center'>
                        <p className='text-[16px] font-extralight opacity-50'>Demo.</p>
                    </div>
                    <div ref={containerCards} className='self-start flex justify-start items-start gap-[40px] w-fit min-w-[100vw] overflow-visible'>
                        <a href="" className={`card flex flex-col items-start w-[70vw] gap-[25px]`} target="_blank" rel="noopener">
                            <div className='flex justify-between w-full items-center'>
                                <div className='border-b-[0.1px] border-gray-400 w-[45%]'>
                                    <h1 className={`text-[26px] md:text-[40px] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] font-extralight opacity-90`}>3XMEND</h1>
                                </div>
                            </div>
                            <img src="/imgs/imgsDemo/header-mend.png" alt="" className="w-[100%] rounded-[20px]"/>
                        </a>
                        <a href="" className={`card flex flex-col items-start w-[70vw] gap-[25px]`} target="_blank" rel="noopener">
                            <div className='flex justify-between w-full items-center'>
                                <div className='border-b-[0.1px] border-(--cor-font) w-[40%]'>
                                    <h1 className={`text-[26px] md:text-[40px] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] font-extralight opacity-90`}>Atlas API</h1>
                                </div>
                            </div>
                            <img src="/imgs/imgsDemo/atlas-API.png" alt="" className="w-[100%] rounded-[20px]"/>
                        </a>
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
                        <img src='/imgs/perfil/contato.png' className='slide-memoji w-[80px] md:w-[150px] rounded-b-[50%]'/>
                    </div>
                    <div className='flex w-[100%] justify-between'>
                        <div className={`slide-contato w-full flex flex-col items-center gap-[15px] md:gap-[2vw] md:flex-row`}>
                            <a ref={emailRef} className='w-full md:w-max rounded-[50px] font-extralight text-[16px] p-[15px] md:p-[2vw] text-center text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] hover:translate-y-[-4px] hover:transition-all hover:duration-500 hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_12px_rgba(0,0,0,0.15)] bg-[rgba(128,128,128,0.05)] backdrop-blur-xs text-[var(--cor-primaria)] shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_10px_rgba(0,0,0,0.08)]' onClick={copiarEmail}>{emailCopiado ? 'E-mail copiado!' : 'eadevcontato@gmail.com'}</a>
                            <a href='https://wa.me/48988325514?text=Olá,%20Éverton!%20Gostaria%20de%20falar%20mais%20sobre%20seus%20serviços%20oferecido.' target='_blank' rel='noopener noreferrer' className='w-full md:w-max rounded-[50px] font-extralight text-[16px] p-[15px] md:p-[2vw] text-center text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] hover:translate-y-[-4px] hover:transition-all hover:duration-500 hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_12px_rgba(0,0,0,0.15)] bg-[rgba(128,128,128,0.05)] backdrop-blur-xs text-[var(--cor-primaria)] shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_10px_rgba(0,0,0,0.08)]'>+55 (48) 98832-5514</a>
                        </div>
                    </div>
                </div>
                </div>
        </footer>
    </div>
    </div>
    </>
  );
}
