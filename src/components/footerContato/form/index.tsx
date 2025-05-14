import styles from './style.module.css'
import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
export function ConteudoForm(){
    const form = useRef<HTMLFormElement>(null)
    const enviarEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!form.current) return

        emailjs.sendForm(
            'service_z4idfyi',
            'template_cbveu0h',
            form.current,
            'gErIOmQI0JSAI3jmz'
        )
        .then((result) =>{
            alert('Mensagem enviada com sucesso!')
            console.log(result.text)
            form.current?.reset()
        }, 
    (error) => {
        alert('Erro ao enviar, tente novamente.')
        console.log(error.text)
    })
    }
    return(
        <div className={styles.containerForm}>
            <h1 className={styles.titleForm}>Vamos trabalhar juntos?</h1>
            <form ref={form} onSubmit={enviarEmail} className={styles.form}>
                <label htmlFor='name' className={`${styles.label} ${styles.lbName}`}>Nome</label>
                <input type="text" id='name' name='name' className={`${styles.inputName} ${styles.input}`} placeholder="Nome" required/>

                <label htmlFor='email'  className={`${styles.label} ${styles.lbEmail}`}>E-mail</label>
                <input type="email" id='email' name='email' className={`${styles.inputEmail} ${styles.input}`} placeholder="E-mail" required/>

                <label htmlFor='areatxt' className={`${styles.label} ${styles.lbTxt}`}>Mensagem</label>
                <textarea id='areatxt' name='message' className={`${styles.textarea} ${styles.input}`} placeholder="Mensagem com seu intuito" required/>

                <button type="submit" className={`${styles.btn} ${styles.input}`}>Enviar</button>
            </form>
        </div>
    )
}