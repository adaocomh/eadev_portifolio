'use client'
import { useState, useRef, useEffect, use } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projetos = [
    {
        name: "Atlas API",
        img: "/imgs/icons/atlas-API.png",
        url: "https://example.com",
      },
      {
        name: "3XMEND",
        img: "/imgs/icons/header-mend.png",
        url: "https://example.com",
      },
      {
        name: "RMAV engearia e contruções",
        img: "/imgs/icons/atlas-API.png",
        url: "https://example.com",
      },
]

export default function Demo(){
    const displayRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      if (!containerRef.current) return;

      const elements = containerRef.current.querySelectorAll('.animate-on-scroll-demo');

      gsap.fromTo(
          elements,
          { opacity: 0, y: 50 },
          {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power1.inOut',
              stagger: 0, // cada elemento aparece com 0.3s de diferença
              scrollTrigger: {
                  trigger: containerRef.current,
                  start: 'top 50%',
                  end: 'center bottom',
                  scrub: 3, // suaviza o movimento com delay
              },
          }
      )
  }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
          if (displayRef.current) {
            displayRef.current.style.left = e.clientX + 20 + "px";
            displayRef.current.style.top = e.clientY - 200 + "px";
          }
        };
    
        window.addEventListener("mousemove", handleMouseMove);
      }, []);
    
    return(
        <div ref={containerRef} className='flex flex-col items-center w-[100vw] pb-[200px]' id='demo'>
                <div className='animate-on-scroll-demo flex flex-col w-[80vw]'>
                    <div  className='flex items-center border-b-1 w-full h-[100px] px-[80px]'>
                        <p className='text-[16px] font-extralight opacity-50'>Demonstração</p>
                    </div>
                        {projetos.map((p)=> (
                            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className={`flex justify-between items-center border-b-1 w-full h-[100px] px-[80px] transition-color duration-300`}
                            onMouseEnter={() => setHovered(p.name)}
                            onMouseOver={() => setVisible(true)}
                            onMouseOut={()=> {
                              setHovered(null)
                              setVisible(false)
                              }}>
                                
                                <h3 className={`text-[2vw] text-[var(--cor-font)] ${hovered === p.name ? "translate-y-[4px] translate-x-[3px] transition-all duration-300 opacity-50" : ""}`}>{p.name}</h3>
                                <img className={`w-[20px] h-[20px] ${hovered === p.name ? "translate-y-[-4px] translate-x-[3px] transition-all duration-300 animate-bounce" : ""}`} src="imgs/icons/up-right.png" alt="seta que indica direcionamento"/>
                            </a>
                        ))}</div>
             
                <div
          ref={displayRef}
          className={`fixed flex justify-center items-center w-[500px] h-[450px] rounded-[20px] z-50 
                  transition-opacity duration-300 bg-[rgba(128,128,128,0.08)] backdrop-blur-md shadow-[inset_2.5px_2.5px_12px_rgba(255,255,255,0.18),2.5px_8px_10px_rgba(0,0,0,0.08)]
                  ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {hovered && (
              <img
                src={projetos.find((p) => p.name === hovered)?.img || ""}
                alt={hovered}
                className="w-[450px]"
              />
          )}
        </div>
      </div>
    )
}