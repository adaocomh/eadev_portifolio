'use client'
import {ReactNode, useEffect, useRef, useState } from "react"

interface SlideProps<T extends HTMLElement> {
    children: (ref: React.RefObject<T>, visivel: boolean) => ReactNode
};

export default function SlideContato<T extends HTMLElement>({ children }: SlideProps<T>){
    const ref = useRef<T>(null)
    const [visivel, setVisivel] = useState(false)
    useEffect(()=>{
        const observe = new IntersectionObserver(([entry]) => setVisivel(entry.isIntersecting), {threshold: 0.1})
        if(ref.current) observe.observe(ref.current)
            return () => observe.disconnect()
    }, [])
    return <>{children(ref, visivel)}</>
}