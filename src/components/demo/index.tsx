'use client'
import SlideEffect from '../slideEffect/slideEffect'
import Link from 'next/link'
import { useState, useRef, useEffect, use } from 'react'

const projetos = [
    {
        name: "Atlas API",
        img: "/imgs/icons/sla.jpg",
        url: "https://example.com",
      },
      {
        name: "3XMEND",
        img: "/imgs/icons/w-kindle.png",
        url: "https://example.com",
      },
      {
        name: "RMAV engearia e contruções",
        img: "/imgs/icons/IMG_3276.jpg",
        url: "https://example.com",
      },
]

export default function Demo(){
    const displayRef = useRef<HTMLImageElement>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);

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
        <div className='flex flex-col items-center w-[100vw] pb-[200px]'>
                <div className='flex flex-col w-[80vw]'>
                    <div  className='flex items-center border-b-1 w-full h-[100px] px-[80px]'>
                        <p className='text-[16px] font-extralight opacity-50'>demo serviços</p>
                    </div>
                        {projetos.map((p)=> (
                            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className='flex justify-between items-center border-b-1 w-full h-[100px] px-[80px]'
                            onMouseEnter={() => setHovered(p.name)}
                            onMouseOver={() => setVisible(true)}
                            onMouseOut={()=> setVisible(false)}>
                                
                                <h3 className='text-[2vw] text-[var(--cor-font)]'>{p.name}</h3>
                                <img className='w-[20px] h-[20px]' src="imgs/icons/up-right.png" alt="seta que indica direcionamento"/>
                            </a>
                        ))}</div>
             
                <div
          ref={displayRef}
          className={`fixed w-[400px] h-[400px] border-1 border-black shadow-lg z-50 
                  transition-opacity duration-300 bg-black
                  ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {hovered && (
            <img
              src={projetos.find((p) => p.name === hovered)?.img || ""}
              alt={hovered}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    )
}