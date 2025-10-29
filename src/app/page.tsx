'use client'
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import Data from "../arquivoDemo/demo.json"
import Image from 'next/image';
import MenuSuspenso from '../components/mnSuspenso'

// Lazy loading de componentes pesados
const LottieWord = dynamic(() => import('@/components/lottieAnimate/lottieWord'), {
  ssr: false,
  loading: () => <div className="w-25 h-25 bg-[var(--cor-primaria)] rounded-full animate-pulse" />,
});

const Clock = dynamic(() => import('@/components/relogio'), {
  ssr: false,
});

const CircleText = dynamic(() => import('../components/circleTag/circleTag'), {
  ssr: false,
  loading: () => <div className="w-[50vw] h-[100px]" />,
});

const ConteudoForm = dynamic(() => import('../components/form'), {
  ssr: false,
});

// Lazy load dos plugins GSAP (serão carregados quando necessários)
let ScrollTrigger: any;
let ScrollSmoother: any;
let SplitText: any;
let mm: any;

export default function Home() {
  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const demoRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [emailCopiado, setEmailCopiado] = useState<boolean>(false)
  const emailRef = useRef<HTMLButtonElement | null>(null)
  const containerCards = useRef<HTMLDivElement>(null)

  //ScrollSmoother global
  useEffect(() => {
    if (!containerCards.current) return;
    
    let smoother: any;
    let cleanup: (() => void) | null = null;

    // Carrega plugins GSAP de forma assíncrona
    Promise.all([
      import('gsap/dist/ScrollTrigger'),
      import('gsap/all'),
    ]).then(([ScrollTriggerModule, ScrollSmootherModule]) => {
      ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      ScrollSmoother = ScrollSmootherModule.ScrollSmoother;
      
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.6,
        effects: true,
      });

      const handleLinkClick = (e: Event) => {
        e.preventDefault();
        const link = e.currentTarget as HTMLAnchorElement;
        const targetId = link.getAttribute("href");
        if (targetId) {
          const target = document.querySelector(targetId);
          if (target) {
            smoother.scrollTo(target, true, "top top");
          }
        }
      };

      const links = document.querySelectorAll<HTMLAnchorElement>("a[href^='#']");
      links.forEach(link => {
        link.addEventListener("click", handleLinkClick);
      });

      cleanup = () => {
        links.forEach(link => {
          link.removeEventListener("click", handleLinkClick);
        });
        smoother?.kill();
      };
    });

    return () => {
      cleanup?.();
    };
  }, []);

  //Movimento horizontal responsivo
  useEffect(() => {
    if (!containerCards.current) return;

    const cards = containerCards.current.querySelectorAll(".card");
    let cleanup: (() => void) | null = null;

    import('gsap/dist/ScrollTrigger').then((ScrollTriggerModule) => {
      if (!ScrollTrigger) {
        ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
      }
      
      mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context: any) => {
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
            ScrollTrigger.getAll().forEach((trigger: any) => {
              if (trigger.trigger === containerCards.current) {
                trigger.kill();
              }
            });
          };
        }
      );

      cleanup = () => {
        mm?.revert();
      };
    });

    return () => {
      cleanup?.();
    };
  }, []);

  //"title-name-e-clock"
  useEffect(() => {
    if (!headerRef.current) return;

    const elements = headerRef.current.querySelectorAll('.title-name-e-clock');
    let animation: any;

    import('gsap/dist/ScrollTrigger').then((ScrollTriggerModule) => {
      if (!ScrollTrigger) {
        ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
      }

      animation = gsap.fromTo(
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
      );
    });

    return () => {
      animation?.kill();
    };
}, []);

  //Text "meu objetivo"
  useEffect(() => {
    let split: any = null;

    const initAnimation = async () => {
      try {
        // Carrega SplitText e ScrollTrigger de forma assíncrona
        const [SplitTextModule, ScrollTriggerModule] = await Promise.all([
          import('gsap/all'),
          import('gsap/dist/ScrollTrigger'),
        ]);

        SplitText = SplitTextModule.SplitText;
        if (!ScrollTrigger) {
          ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        }
        gsap.registerPlugin(SplitText, ScrollTrigger);

        await document.fonts.ready;
        gsap.set(".textElement", { opacity: 1 });

        split = new SplitText(".textElement", {
          type: "lines",
          linesClass: "line"
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
      } catch (error) {
        console.error("Erro ao inicializar animação de texto:", error);
      }
    };

    initAnimation();

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
    let animation: any;

    import('gsap/dist/ScrollTrigger').then((ScrollTriggerModule) => {
      if (!ScrollTrigger) {
        ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
      }

      animation = gsap.fromTo(
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
      );
    });

    return () => {
      animation?.kill();
    };
  }, []);

  //scroll "demo"
  useEffect(() => {
    if (!demoRef.current) return;

    const elements = demoRef.current.querySelectorAll('.scroll-demo');
    let animation: any;

    import('gsap/dist/ScrollTrigger').then((ScrollTriggerModule) => {
      if (!ScrollTrigger) {
        ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
      }

      animation = gsap.fromTo(
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
      );
    });

    return () => {
      animation?.kill();
    };
  }, []);

  //Projetor de sobra...
  useEffect(() => {
    if (!footerRef.current) return;

    let cleanup: (() => void) | null = null;

    import('gsap/dist/ScrollTrigger').then((ScrollTriggerModule) => {
      if (!ScrollTrigger) {
        ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
      }

      mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 768px)",
          isDesktop: "(min-width: 769px)",

        },
        (context: any) => {
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

      cleanup = () => {
        mm?.revert();
      };
    });

    return () => {
      cleanup?.();
    };
  }, []);

  //"sile-memoji"
  useEffect(() => {
    if (!footerRef.current) return;

    const slideMemoji = footerRef.current.querySelector('.slide-memoji');
    if (!slideMemoji) return;

    let animation: any;

    import('gsap/dist/ScrollTrigger').then((ScrollTriggerModule) => {
      if (!ScrollTrigger) {
        ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
      }

      animation = gsap.fromTo(slideMemoji, {
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
      });
    });

    return () => {
      animation?.kill();
    };
  }, [])

  //"slide-contato"
  useEffect(() => {
    if (!footerRef.current) return;

    const contatos = footerRef.current.querySelector('.slide-contato');
    if (!contatos) return;

    let animation: any;

    import('gsap/dist/ScrollTrigger').then((ScrollTriggerModule) => {
      if (!ScrollTrigger) {
        ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
      }

      animation = gsap.fromTo(contatos, {
        opacity: 0,
        translateY: '100%'
      }, {
        opacity: 1,
        translateY: '0%',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 30%',
          end: 'bottom bottom',
          scrub: 0.2,
        }
      });
    });

    return () => {
      animation?.kill();
    };
  }, [])
  
  const copiarEmail = async () => {
    const email = emailRef.current?.innerText;
    if (!email) return;
    
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopiado(true);
      setTimeout(() => {
        setEmailCopiado(false);
      }, 1500);
    } catch (error) {
      console.error("Erro ao copiar email:", error);
    }
  }

  return (
  <>
  <nav className='fixed w-[100vw] p-[20px_20px_0px_20px] z-45 md:p-[20px_80px_20px_80px]'><MenuSuspenso/></nav>
    <div id="smooth-wrapper">
        <div id="smooth-content">
        <header ref={headerRef} className="flex flex-col h-[106vh] pl-[20px] bg-[var(--cor-primaria)] lg:h-[119vh] lg:pl-[80px]" id='header'>
          <div className="flex flex-col justify-end h-[100%] md:gap-[5vh]">
            <div className="flex flex-col justify-center items-start gap-[20px] pr-[20px] md:flex-row md:justify-start md:items-end lg:gap-[80px]">
              <div className='hidden md:block'>
                <Image src="/imgs/perfil/perfil.webp" alt="Foto de perfil do desenvolvedor" width={264} height={330}/>
              </div>
              <div className='block md:hidden'>
                <Image src="/imgs/perfil/perfil.webp" alt="Foto de perfil do desenvolvedor" width={240} height={300}/>
              </div>
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
              <h1 className='font-barriecito text-[28vw] text-[rgba(0,0,0,0.9)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)]'>É<span className='text-[var(--cor-secundaria)]'>v</span>erton</h1>
            </div>
          </div>
        </header>
        <main  ref={containerRef} className='bg-[var(--cor-primaria)]'>
          <section className='flex flex-col justify-center items-center gap-[30px] w-[100vw] h-[100vh] pt-[100px] md:p-[200px_0px_50px_0px]' id='meu-objetivo'>
            <div className='flex flex-col items-center justify-center gap-[20px] w-[90vw] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] md:flex-row md:justify-between md:w-[70vw]'>
                <p className='w-[100%] text-[7vw] text-[var(--cor-font)] font-extralight md:text-[2vw] md:w-[70%] textElement'>Buscando entregar projetos interativos e intuitivos; sem descartar suas intenções, tenho como objetivo oferecer a melhor solução para o que você busca.</p>
                <div className='flex flex-col w-[100%] md:w-[30%]'>
                    <div className='w-[60%] mb-[12px] border-b-[0.1px] border-black/30'>
                        <h4 className='font-normal text-[6vw] text-[var(--cor-font) md:text-[1.6vw] textElement'>Posso atuar...</h4>
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
                          <a key={card.name} href={card.url} className={`card flex flex-col items-start w-[90vw] md:w-[70vw] gap-[15px] md:gap-[25px]`} target="_blank" rel="noopener noreferrer">
                              <div className='pointer-events-none border-b-[0.1px] border-black/30 w-[40%]'>
                                  <h1 className={`text-[26px] font-extralight text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] opacity-90  md:text-[40px]`}>{card.name}</h1>
                              </div>
                              <Image src={card.img} alt={card.name} width={1917} height={965} className="pointer-events-none w-[100%]"/>
                          </a>))}
                      </div>
                </div>
          </section>
        </main>
        <footer ref={footerRef} className='relative flex flex-col justify-end gap-[20px] md:gap-[40px] h-[110vh] md:h-[100vh] footerS4 overflow-hidden' id="footer">
          <div className='projecao-sombra absolute top-0 w-[100vw] bg-[var(--cor-primaria)] shadow-[0px_25px_150px_rgba(0,0,0,1)]'/>
          <div className='flex justify-center items-end bg-[var(--cor-terciario)] md:items-center'>
            <div className='flex flex-col justify-center gap-[15px] max-w-[80vw]'>
                <ConteudoForm/>
                <div className='flex items-center md:gap-[12%]
                md:m-[1vw_0_0.8vw_0]'>
                  <div className='hidden w-[70%] border-b-[0.1px] border-[#F5ECDB50] md:block'/>
                  <h1 className='md:hidden w-full text-[24px] text-[var(--cor-primaria)] font-medium text-start text-shadow-[0px_0px_10px_rgba(0,0,0,0.5)]'>Vamos trabalhar<br/> juntos?</h1>
                  <div className='hidden md:block'>
                    <Image src='/imgs/perfil/contato.webp' width={150} height={157} className='rounded-b-[50%] slide-memoji' alt='Memoji apple do desenvolvedor'/>
                  </div>
                  <div className='md:hidden'>
                    <Image src='/imgs/perfil/contato.webp' width={80} height={93} className='rounded-b-[50%] slide-memoji' alt='Memoji apple do desenvolvedor'/>
                  </div>
                </div>
                <div className={`w-[100%] flex flex-col items-center gap-[15px] md:gap-[2vw] md:flex-row slide-contato`}>
                  <button ref={emailRef} className='btn-custom' onClick={copiarEmail} type="button">{emailCopiado ? 'E-mail copiado!' : 'eadevcontato@gmail.com'}</button>
                  <a href='https://wa.me/48984229769?text=Olá,%20Éverton!%20Gostaria%20de%20falar%20mais%20sobre%20seus%20serviços%20oferecido.' target='_blank' rel='noopener noreferrer' className='btn-custom'>+55 (48) 98422-9769</a>
                </div>
            </div>
          </div>
          <div className='flex flex-col items-center mb-[20px] md:flex-row md:justify-between md:px-[80px]'>
            <p className='text-[15px] text-[var(--cor-primaria)] font-extralight'>2025 Todos os direitos reservados.</p>
            <p className='text-[12px] text-[var(--cor-primaria)] font-extralight opacity-70'>@ Code by Éverton Adão</p>
          </div>
        </footer>
    </div>
    </div>
    </>
  );
}
