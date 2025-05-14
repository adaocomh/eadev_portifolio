import SlideEffect from '../../slideEffect/slideEffect'
import style from './style.module.css'
import React from 'react'
export function LogoContato(){
    return(
        <SlideEffect<HTMLImageElement>>
        {(ref, visivel) => (
        <img src='imgs/icons/contact-maill.png' ref={ref} className={`${style.logoContato} ${visivel ? style.ativo : ''}`} alt='Icon que representa o e-mail e o numero telefone'/>
        )}
        </SlideEffect>
    )
}