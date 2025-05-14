'use client'
import styles from './style.module.css'
import SlideEffect from '../slideEffect/slideEffect'
import { LogoContato } from './logoContato'
import { ConteudoForm } from './form'
import React, { useRef, useState } from 'react'
export default function FtPg(){
    const [emailCopiadpo, setEmailCopiado] = useState<boolean>(false)
    const emailRef = useRef<HTMLAnchorElement | null>(null)
     
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
    return(
        <div className={styles.ftPg} id="footerS4">
            <div className={styles.conteudoFt}>
                <div className={styles.contAvFm}>
                    <div className={styles.avatar}></div>
                    <ConteudoForm/>
                </div>
                <div className={styles.cantainerLogoContato}>
                    <div className={styles.linhaDiv}/> <LogoContato/>
                </div>
                <SlideEffect<HTMLDivElement>>
                    {(ref, visivel) => (
                <div ref={ref} className={`${styles.contatos} ${visivel ? styles.ativo : ''}`}>
                    <a ref={emailRef} className={styles.linkContato} onClick={copiarEmail}>{emailCopiadpo ? 'E-mail copiado!' : 'eadevcontato@gmail.com'}</a>
                    <a href='https://wa.me/48988325514?text=Olá,%20Éverton!%20Poderíamos%20falar%20sobre%20um%20suposto%20projeto?'  rel='noopener noreferrer' className={styles.linkContato}>+55 (48) 98832-5514</a>
                </div>)}
                </SlideEffect>
            </div>
        </div>
    )
}