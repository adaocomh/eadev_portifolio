'use client'
import style from '../title/title.module.css'
import React, { useState, useEffect } from "react";

interface MachineProps{
    text: string;
}

export function Machine({ text: fullText }: MachineProps) {
    const [text, setText] = useState<string>("");
    const [index, setIndex] = useState<number>(0);
    const [mostrarCursor, setMostrarCursor] = useState<boolean>(false)

    useEffect(() => {
        setText(""); // Resetando o texto ao mudar a props.text
        setIndex(0);
    }, [fullText]);

    useEffect(() => {
        if (index < fullText?.length) {
            const timeout = setTimeout(() => {
                setText((prev) => prev + fullText[index]);
                setIndex((prev) => prev + 1);
            }, 115);
            return () => clearTimeout(timeout); // Limpa o timeout ao desmontar o componente
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
        <h1 className={style.titleComp}>
            {text[0]}<span>{text[1]}</span>{text.slice(2, 7)}
            <span>{text[7]}</span>{text.slice(8, 12)}
            {mostrarCursor && <span>|</span>}
        </h1>
    </>
    );
}