import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
export function ConteudoForm(){
    const form = useRef<HTMLFormElement>(null)
    const enviarEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!form.current) return

        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            form.current,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
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
        <div className='max-h-[65vh] md:max-h-[56vh]'>
            <h1 className='text-[var(--cor-primaria)] text-[5vh] mb-[5vh] font-medium text-center text-shadow-[0px_10px_15px_rgba(0,0,0,0.3)]
            md:text-[3vw] md:mb-[3vh]'>Vamos trabalhar juntos?</h1>
            <form ref={form} onSubmit={enviarEmail} className='grid grid-rows-[10px_1fr_10px_1fr_1fr_1fr_1fr] grid-cols-[repeat(4,1fr)] gap-[2vh] md:gap-[1.3vw] xl:gap-[0.8vw]'>
                <label htmlFor='name' className='font-extralight text-[var(--cor-primaria)] text-[18px] col-[1]'>Nome</label>
                <input type="text" id='name' name='name' className='w-[35vw] h-[4vh] col-[1/3] row-[2/3] p-[5px] border-none bg-[#737156] text-[var(--cor-primaria)] rounded-[10px] placeholder:text-[#3F4030] font-extralight text-[15px]
                md:w-[25vw]' placeholder="Nome" required/>

                <label htmlFor='email'  className='font-extralight text-[var(--cor-primaria)] text-[18px] col-[3]'>E-mail</label>
                <input type="email" id='email' name='email' className='w-[35vw] h-[4vh] col-[3/5] row-[2/3] p-[5px] border-none bg-[#737156] text-[var(--cor-primaria)] rounded-[10px] placeholder:text-[#3F4030] font-extralight text-[15px]
                md:w-[25vw]' placeholder="E-mail" required/>

                <label htmlFor='areatxt' className='font-extralight text-[var(--cor-primaria)] text-[18px] col-[1] row-[3]'>Mensagem</label>
                <textarea id='areatxt' name='message' className='col-[1/5] row-[4/7] p-[5px] border-none bg-[#737156] text-[var(--cor-primaria)] rounded-[10px] placeholder:text-[#3F4030] font-extralight text-[15px]' placeholder="Mensagem com seu intuito" required/>

                <button type="submit" className='h-[5vh] col-[1/5] row-[7] font-normal text-[2.3vh] p-[5px] border-none bg-[#737156] text-[var(--cor-primaria)] rounded-[10px]
                md:font-extralight md:text-[15px] 
                hover:bg-[#7c7a5d] hover:translate-y-[-1px] hover:transition-all hover:duration-300 
                hover:shadow-[0px_3px_8px_rgba(0,0,0,0.3)]'>Enviar</button>
            </form>
        </div>
    )
}