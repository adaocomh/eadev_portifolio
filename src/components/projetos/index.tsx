'use client'
import SlideEffect from '../slideEffect/slideEffect'
import Image from 'next/image'

export default function AreaPrj(){
    return(
        <div className='flex justify-center items-center h-[125vh] p-[0px_40px_0px_40px] bg-linear-[180deg,rgba(0,0,0,0.020)1%,rgba(245,236,219,1)99%] md:h-[80vh] md:p-[80px]' id='aPS2'>
            <div className='flex flex-col justify-center gap-[0vh] max-h-[100vh]
            md:flex-row md:items-center md:max-h-[80vh]
            xl:gap-[5vh] xl:max-w-[80vw]'>
                <SlideEffect<HTMLDivElement>>{
                    (ref, visivel)=>(
                <div ref={ref} className={`${visivel ? 'translate-x-[0%] transition-all duration-1200 opacity-100' : 'translate-x-[-95%] transition-all duration-1200 opacity-0'}`}>
                    <div>
                        <h2 className='w-[75vw] text-[9vw] font-medium text-[var(--cor-font)] text-shadow-[0px_3px_8px_rgba(0,0,0,0.3)] border-b-1 pb-[5px] m-[2vh_0] md:w-[25vw] md:text-[2.5vw]'>Atlas API <span className='text-[12px] text-[rgba(0,0,0,0.6)]'>(projeto ilustrativo)</span></h2>
                        <p className='text-[3vh] font-extralight text-[var(--cor-font)] text-shadow-[0px_3px_8px_rgba(0,0,0,0.3)] md:max-w-[500px] xl:max-w-[800px]'>Aplicação web que consome a REST Countries API para exibir informações sobre países do mundo, com funcionalidades de busca, filtro por região, visualização de detalhes e alternância entre temas claro e escuro. O projeto foi desenvolvido com foco em responsividade, usabilidade e boas práticas de desenvolvimento front-end moderno, simulando um cenário real de integração com API pública e interface dinâmica.</p>
                    </div>
                </div>
                )
                }</SlideEffect>
                <div className='flex justify-center'>
                    <Image src='/imgs/dispoPrj/exposiPrj.png' alt='' width={800} height={800}/>
                </div>
            </div>
        </div>
    )
}