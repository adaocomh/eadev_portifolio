'use client'

import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

export default function ConteudoForm(){
    const form = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    
    const enviarEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!form.current) return

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

        if (!serviceId || !templateId || !publicKey) {
            alert('Configuração do formulario não encontrada. Entre em contato pelo WhatsApp +55 (48) 98422-9769 ou email eadevcontato@gmail.com')
            console.error('EmailJS environment variables not configured:', {
                serviceId: !!serviceId,
                templateId: !!templateId,
                publicKey: !!publicKey
            })
            return
        }

        setLoading(true)
        setSubmitStatus('idle')

        try {
            const result = await emailjs.sendForm(
                serviceId,
                templateId,
                form.current,
                publicKey
            )
            
            setSubmitStatus('success')
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve.')
            console.log('EmailJS sucesso:', result.text)
            form.current?.reset()
            
        } catch (error: any) {
            setSubmitStatus('error')
            
            if (error.status === 400) {
                alert('Erro ao enviar: Dados inválidos. Verifique os campos.')
            } else if (error.status === 429) {
                alert('Muitas tentativas. Tente novamente em alguns minutos.')
            } else if (error.status === 401) {
                alert('Erro de autenticação. Entre em contato pelo WhatsApp +55 (48) 98422-9769.')
            } else if (error.status === 0 || !navigator.onLine) {
                alert('Sem conexão com a internet. Verifique sua conexão.')
            } else {
                alert('Erro ao enviar mensagem. Entre em contato pelo WhatsApp +55 (48) 98422-9769 ou email eadevcontato@gmail.com')
            }
            
            console.error('EmailJS erro:', error.text || error)
        } finally {
            setLoading(false)
            setTimeout(() => setSubmitStatus('idle'), 1500)
        }
    }
    return(
        <div className='flex flex-col'>
            <h1 className='hidden md:inline-block text-[var(--cor-primaria)] text-[3vw] font-medium text-center mb-[3vh] text-shadow-[0px_0px_10px_rgba(0,0,0,0.5)]'>Vamos trabalhar juntos?</h1>
            <form ref={form} onSubmit={enviarEmail} className='grid grid-rows-[1fr_1fr_1fr_1fr_1fr] grid-cols-[repeat(4,1fr)] gap-[2vh] md:gap-[1.3vw] xl:gap-[0.8vw]'>
                <label htmlFor='name' className='hidden'></label>
                <input type="text" id='name' name='name' className='w-[100%] h-[5vh] col-[1/3] row-[1/2] p-[10px] border-none bg-[#737156] text-[var(--cor-primaria)] rounded-[10px] placeholder:text-[#3F4030] font-extralight text-[15px]
                md:w-[25vw] shadow-[inset_2px_2px_8px_rgba(0,0,0,0.4)]' placeholder="Nome" required/>

                <label htmlFor='email'  className='hidden'></label>
                <input type="email" id='email' name='email' className='w-[100%] h-[5vh] col-[3/5] row-[1/2] p-[10px] border-none bg-[#737156] text-[var(--cor-primaria)] rounded-[10px] placeholder:text-[#3F4030] font-extralight text-[15px]
                md:w-[25vw] shadow-[inset_2px_2px_8px_rgba(0,0,0,0.4)]' placeholder="E-mail" required/>

                <label htmlFor='areatxt' className='font-extralight text-[var(--cor-primaria)] text-[18px] col-[1] row-[3]'></label>
                <textarea id='areatxt' name='message' className='col-[1/5] row-[2/6] md:row-[2/7] p-[10px] border-none bg-[#737156] text-[var(--cor-primaria)] rounded-[10px] placeholder:text-[#3F4030] font-extralight text-[15px] shadow-[inset_2px_2px_8px_rgba(0,0,0,0.4)]' placeholder="Mensagem com seu intuito" required/>

                <button 
                    type="submit" 
                    disabled={loading}
                    className={`text-center hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_12px_rgba(0,0,0,0.12)] bg-[rgba(128,128,128,0.05)] backdrop-blur-md shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08),2px_8px_10px_rgba(0,0,0,0.08)] h-[5vh] col-[1/5] row-[6/8] md:row-[7/8] font-normal text-[2.3vh] p-[5px] border-none text-[var(--cor-primaria)] rounded-[10px]
                    md:font-extralight md:text-[15px] 
                    hover:translate-y-[-3px] hover:transition-all hover:duration-500 transition-all duration-500 
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
                >
                    {loading ? 'Enviando...' : submitStatus === 'success' ? 'Enviado!' : submitStatus === 'error' ? 'Erro' : 'Enviar'}
                </button>

            </form>
        </div>
    )
}