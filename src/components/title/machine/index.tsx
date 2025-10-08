'use client'
import React, { useState, useEffect } from "react";

interface MachineProps{
    text: string;
}

export function Machine({ text: fullText }: MachineProps) {
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
            }, 140);
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
    <>
        <h1 className='text-[13vw] text-[rgba(0,0,0,0.9)]  text-shadow-[0px_10px_15px_rgba(0,0,0,0.3)]'>
            {text[0]}<span className='text-[var(--cor-secundaria)]'>{text[1]}</span>{text.slice(2, 7)}
            <span className='text-[var(--cor-secundaria)]'>{text[7]}</span>{text.slice(8, 12)}
            {mostrarCursor && <span className='text-[var(--cor-secundaria)]'>|</span>}
        </h1>
    </>
    );
}