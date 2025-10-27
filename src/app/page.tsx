'use client'
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/all';
import { SplitText } from 'gsap/all';
import Data from "../arquivoDemo/demo.json"
import MenuSuspenso from '../components/mnSuspenso'
import LottieWord from '@/components/lottieAnimate/lottieWord';
import Clock from '@/components/relogio';
import CircleText from '../components/circleTag/circleTag';
import ConteudoForm from '../components/form'

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
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null)

  //ScrollSmoother global
  useEffect(() => {
    if (!containerCards.current) return;
    
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.6,
      effects: true,
    });

    document.querySelectorAll("a[href^='#']").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
    
        const targetId = link.getAttribute("href");
        if (targetId) {
          const target = document.querySelector(targetId);
          if (target) {
            smoother.scrollTo(target, true, "top top");
          }
        }
      })
    });

    return () => {
      smoother.kill();
    };
  }, []);

  //Movimento horizontal responsivo
  useEffect(() => {
    if (!containerCards.current) return;

    const cards = containerCards.current.querySelectorAll(".card");

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        const { isMobile, isDesktop } = context.conditions as { isMobile: boolean; isDesktop: boolean };

        if (isDesktop) {
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
        } else if (isMobile) {
          gsap.set(cards, { xPercent: 0 });
        }

        return () => {
          ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger === containerCards.current) {
              trigger.kill();
            }
          });
        };
      }
    );

    return () => {
      mm.revert();
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
    let split: SplitText | null = null;

    document.fonts.ready.then(() => {
    gsap.set(".textElement", { opacity: 1 });

      split = new SplitText(".textElement", {
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
                  trigger: ".textElement",
                  start: "top 70%",
                  toggleActions: "play none none reverse",
              }
          });
  });

    return () => {
      if (split) {
        split.revert();
      }
    };
  }, [])

  //"circle-text"
  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelector('.circle-text');

    gsap.fromTo(
        elements,
        {y: 300 },
        {
          y:"-" + 225,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0,
          scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 100%',
              end: 'bottom 0%',
              scrub: 1,
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
            ease: "expoScale(0.5,7, none)",
            stagger: 0,
            scrollTrigger: {
                trigger: demoRef.current,
                start: 'top 70%',
                end: 'top center',
                scrub: 1,
            },
        }
    )
  }, []);

  //Projetor de sobra...
  useEffect(() => {
    if (!footerRef.current) return;

    mm.add(
      {
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)",

      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };
        const projetorS = footerRef.current?.querySelector(".projecao-sombra")

        if (!projetorS) return;

        const heightIni = isMobile ? "24vh" : "40vh";

        gsap.fromTo(
          projetorS,
          {
            height: heightIni,
          },
          {
            height: "0vh",
            ease: "none",
            scrollTrigger: {
              id: "footerProjeao",
              trigger: footerRef.current,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );

        return () => {
          ScrollTrigger.getById("footerProjeao")?.kill();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  //"sile-memoji"
  useEffect(()=>{
    if (!footerRef.current) return

    const slideMemoji = footerRef.current.querySelector('.slide-memoji')

    const animation = gsap.fromTo(slideMemoji, {
        opacity: 0,
        translateX: '-200px'
    }, {
        opacity: 1,
        translateX: '0px',
        ease: 'power2.out',
        scrollTrigger: {
            trigger: footerRef.current,
            start: 'top center',
            end: 'bottom bottom',
            scrub: 0,
        }
    }
    )

    return () => {
      animation.kill();
    };
  }, [])

  //"slide-contato"
  useEffect(()=>{
    if (!footerRef.current) return

    const contatos = footerRef.current.querySelector('.slide-contato')

    const animation = gsap.fromTo(contatos, {
        opacity: 0,
        translateY: '250px'
    }, {
        opacity: 1,
        translateY: '0px',
        ease: 'power2.out',
        scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 10%',
            end: 'bottom bottom',
            scrub: 0.2,
        }
    }
    )

    return () => {
      animation.kill();
    };
  }, [])
  
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
  <nav className='fixed w-[100vw] p-[20px_20px_0px_20px] z-50 md:p-[20px_80px_20px_80px]'><MenuSuspenso/></nav>
    <div id="smooth-wrapper">
        <div id="smooth-content">
        <header ref={headerRef} className="flex flex-col h-[106vh] pl-[20px] bg-[var(--cor-primaria)] lg:h-[119vh] lg:pl-[80px]" id='header'>
          <div className="flex flex-col justify-end h-[100%] md:gap-[5vh]">
            <div className="flex flex-col justify-center items-start gap-[20px] pr-[20px] md:flex-row md:justify-start md:items-end lg:gap-[80px]">
              <img className="h-[300px] md:h-[330px]" src="/imgs/perfil/perfil.jpeg" alt="Foto de perfil desenvolvedor"/>
              <div className='flex flex-col gap-[10px]'>
                <h2 className="text-start text-[35px] text-[var(--cor-font)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] md:text-[50px] lg:text-[60px]"> Dev.<br/> Front-end freelancer<br/></h2>
                <p className='text-start text-[20px] font-extralight text-[var(--cor-font)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] md:text-[25px] lg:text-[30px]'>Construindo experiências interativas e intuitivas na web.</p>
              </div>
              <div className='absolute right-0 top-[20vh] flex justify-between items-center w-[200px] p-[10px] pr-[20px] bg-[rgba(0,0,0,0.9)] rounded-l-full md:top-auto md:self-start title-name-e-clock'>
                <div className='w-25 h-25 bg-[var(--cor-primaria)] rounded-full'>
                    <LottieWord/>
                </div>
                <div className='flex flex-col self-end items-end w-[100%]'>
                    <Clock/>
                    <p className='text-[22px] font-extralight text-end text-(--cor-primaria)'>Brasil</p>
                </div>
              </div>
            </div>
            <div className='flex justify-end items-center h-[25vh] lg:h-[50vh] title-name-e-clock'>
              <h1 className='font-[Barriecito] text-[28vw] text-[rgba(0,0,0,0.9)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)]'>É<span className='text-[var(--cor-secundaria)]'>v</span>erton</h1>
            </div>
          </div>
        </header>
        <main  ref={containerRef} className='bg-[var(--cor-primaria)]'>
          <section className='flex flex-col justify-center items-center gap-[30px] w-[100vw] h-[100vh] pt-[100px] md:p-[200px_0px_50px_0px]' id='meu-objetivo'>
            <div className='flex flex-col items-center justify-center gap-[20px] w-[90vw] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] md:flex-row md:justify-between md:w-[70vw]'>
                <h3 className='w-[100%] text-[7vw] text-[var(--cor-font)] font-extralight md:text-[2vw] md:w-[70%] textElement'>Buscando entregar projetos interativos e intuitivos; sem descartar suas intenções, tenho como objetivo oferecer a melhor solução para o que você busca.</h3>
                <div className='flex flex-col w-[100%] md:w-[30%]'>
                    <div className='w-[60%] mb-[12px] border-b-[0.1px] border-black/30'>
                        <h3 className='font-normal text-[6vw] text-[var(--cor-font) md:text-[1.6vw] textElement'>Posso atuar...</h3>
                    </div>
                    <p className='w-[100%] text-[4vw] text-[var(--cor-font)] font-extralight md:text-[1vw] textElement'>Transformando layouts pré-definidos em código funcional ou colaborar na criação do projeto desde o início, unindo design e desenvolvimento para uma solução completa.</p>
                </div>
            </div>
            <div className=' flex justify-end w-[50vw] circle-text'>
                <CircleText/>
            </div>
          </section>
          <section ref={demoRef} className='flex w-[100vw] h-max pb-[20px] md:h-[213vh] md:pb-0 overflow-hidden' id='demo'>
                    <div className='flex flex-col items-start md:pl-[80px] scroll-demo'>
                      <p className='pl-[20px] text-[16px] text-start font-extralight opacity-50 md:pl-[0px] pointer-events-none'>Demo.
                      </p>
                      <div ref={containerCards} className='flex flex-col items-center gap-[20px] w-fit min-w-[100vw] md:flex-row md:items-start md:gap-[60px] overflow-visible'>
                        {Data.demo.map((card) => (
                          <a key={card.name} href={card.url} className={`card flex flex-col items-start w-[90vw] md:w-[70vw] gap-[15px] md:gap-[25px]`} target="_blank" rel="noopener">
                              <div className='pointer-events-none border-b-[0.1px] border-black/30 w-[40%]'>
                                  <h1 className={`text-[26px] font-extralight text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] opacity-90  md:text-[40px]`}>{card.name}</h1>
                              </div>
                              <img src={card.img} alt={card.name} className="pointer-events-none w-[100%]"/>
                          </a>))}
                      </div>
                </div>
          </section>
        </main>
        <footer ref={footerRef} className='relative flex flex-col h-[105vh] md:h-[100vh] footerS4 overflow-hidden' id="footer">
          <div className='projecao-sombra absolute top-[-5px] w-[100vw] bg-[var(--cor-primaria)] shadow-[0px_25px_150px_rgba(0,0,0,1)]'/>
          <div className='flex justify-center items-end h-[100vh] bg-[var(--cor-terciario)] md:items-center'>
            <div className='flex flex-col justify-center gap-[15px] max-w-[80vw]'>
                <ConteudoForm/>
                <div className='flex items-center m-[1.3vw_0_1.8vw_0] md:gap-[12%]
                md:m-[1vw_0_0.8vw_0]'>
                  <div className='hidden w-[70%] border-b-[0.1px] border-[#F5ECDB50] md:block'/>
                  <h1 className='md:hidden w-full text-[24px] text-[var(--cor-primaria)] font-medium text-start text-shadow-[0px_0px_10px_rgba(0,0,0,0.5)]'>Vamos trabalhar<br/> juntos?</h1>
                  <img src='/imgs/perfil/contato.png' className=' w-[80px] rounded-b-[50%] md:w-[150px] slide-memoji' alt='Memoji apple do desenvolvedor'/>
                </div>
                <div className={`w-[100%] flex flex-col items-center gap-[15px] md:gap-[2vw] md:flex-row slide-contato`}>
                  <a ref={emailRef} className='btn-custom' onClick={copiarEmail}>{emailCopiado ? 'E-mail copiado!' : 'eadevcontato@gmail.com'}</a>
                  <a href='https://wa.me/48984229769?text=Olá,%20Éverton!%20Gostaria%20de%20falar%20mais%20sobre%20seus%20serviços%20oferecido.' target='_blank' className='btn-custom'>+55 (48) 98422-9769</a>
                </div>
            </div>
          </div>
          <div className='abdolute bottom-0 flex flex-col items-center p-[20px] md:flex-row md:justify-between md:px-[80px]'>
            <p className='text-[15px] text-[var(--cor-primaria)] font-extralight'>2025 Todos os direitos reservados.</p>
            <p className='text-[12px] text-[var(--cor-primaria)] font-extralight opacity-70'>@ Code by Éverton Adão</p>
          </div>
        </footer>
    </div>
    </div>
    </>
  );
}
