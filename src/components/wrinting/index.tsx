'use client'
import React, { useState, useEffect } from "react";

interface MachineProps{
    text: string;
}

export function Wrinting({ text: fullText }: MachineProps) {
    const [text, setText] = useState<string>("");
    const [index, setIndex] = useState<number>(0);
    const [mostrarCursor, setMostrarCursor] = useState<boolean>(false)

    useEffect(() => {
        setText("");
        setIndex(0);
    }, [fullText]);

    useEffect(() => {
        if (index < fullText?.length) {
            const timeout = setTimeout(() => {
                setText((prev) => prev + fullText[index]);
                setIndex((prev) => prev + 1);
            }, 80);
            return () => clearTimeout(timeout);
        }
    }, [index, fullText]);
    
    useEffect(() => {
        const intervaloCursor = setInterval(() => {
            setMostrarCursor((prev) => !prev)
        }, 350)
        return () => clearInterval(intervaloCursor)
    }, [])
    return (
        <p className='text-[20px] font-extralight text-[var(--cor-font)] text-shadow-[0px_0px_10px_rgba(0,0,0,0.3)] md:text-[25px] lg:text-[30px]'>
        Construindo experiências {text}{mostrarCursor && <span>|</span>}
        </p>
    );
}