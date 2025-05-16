import SlideEffect from '../../slideEffect/slideEffect';

export function TextBlocks() {
    return (
        <div className='text-shadow-[0px_2px_5px_rgba(0,0,0,0.3)] xl:text-shadow-[0px_3px_8px_rgba(0,0,0,0.3)]'>
            <div className='hidden
            md:block md:text-[2.3vw] md:font-extralight md:text-[var(--cor-font)]
            xl:md:text-[2.5vw]'>
                {["Buscando entregar projetos interativos e",
                  "intuitivos; sem descartar suas intenções, tenho",
                  "como objetivo oferecer a melhor solução para o",
                  "que você busca."].map((text, index) => (
                    <div key={index} className='overflow-hidden'>
                        <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                        <div ref={ref} className={`${visivel ? 'translate-y-[0%] transition-all duration-1200 opacity-100' : 'translate-y-[89%] transition-all duration-1200 opacity-0'}`}>{text}</div>
                        )}</SlideEffect>
                    </div>
                ))}
            </div>
                <div className='hidden md:block overflow-hidden m-[7vh_0]'>
                    <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                    <div ref={ref} className={`${visivel ? 'w-[35vw] border-b-1 pb-[5px]  font-normal text-[3vw] text-[var(--cor-font)] translate-y-[0%] transition-all duration-1200 opacity-100' : 'w-[35vw] border-b-1 pb-[5px] font-normal text-[3vw] text-[var(--cor-font)] translate-y-[89%] transition-all duration-1200 opacity-0'}`}>Posso atuar...</div>)}</SlideEffect>
                </div>
            <div className='hidden 
            md:block md:text-[2.3vw] md:font-extralight md:text-[var(--cor-font)]
            xl:md:text-[2.5vw]'>
                {["transformando layouts pré-definidos em",
                  "código funcional ou colaborar na criação do",
                  "projeto desde o início, unindo design e ",
                  "desenvolvimento para uma solução completa."].map((text, index) => (
                    <div key={index} className='overflow-hidden'>
                        <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                        <div ref={ref} className={`${visivel ? 'translate-y-[0%] transition-all duration-1200 opacity-100' : 'translate-y-[89%] transition-all duration-1200 opacity-0'}`}>{text}</div>
                        )}</SlideEffect>
                    </div>
                ))}
            </div>
            <div className='md:hidden font-extralight text-[3.2vh] text-[var(--cor-font)]'>
                {["Buscando entregar projetos", 
                  "interativos e intuitivos; sem",
                  "descartar suas intenções,", 
                  "tenho como objetivo oferecer",
                  "a melhor solução para o que",
                  "você busca."].map((text, index) => (
                    <div key={index} className='overflow-hidden'>
                        <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                        <div ref={ref} className={`${visivel ? 'translate-y-[0%] transition-all duration-1200 opacity-100' : 'translate-y-[89%] transition-all duration-1200 opacity-0'}`}>{text}</div>
                        )}</SlideEffect>
                    </div>
                ))}
            </div>
                <div className='md:hidden overflow-hidden m-[3vh_0]'>
                    <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                    <div ref={ref} className={`${visivel ? 'w-[75vw] border-b-1 pb-[5px] font-normal text-[5vh] text-[var(--cor-font)] translate-y-[0%] transition-all duration-1200 opacity-100' : 'w-[75vw] border-b-1 pb-[5px] font-normal text-[5vh] text-[var(--cor-font)] translate-y-[89%] transition-all duration-1200 opacity-0'}`}>Posso atuar...</div>)}</SlideEffect>
                </div>
            <div className='md:hidden font-extralight text-[3.2vh] text-[var(--cor-font)]'>
                {["transformando layouts", 
                  "pré-definidos em código",
                  "funcional ou colaborar na",
                  "criação do projeto desde",
                  " o início, unindo design e ",
                  "desenvolvimento para uma", 
                  "solução completa."].map((text, index) => (
                    <div key={index} className='overflow-hidden'>
                        <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                        <div ref={ref} className={`${visivel ? 'translate-y-[0%] transition-all duration-1200 opacity-100' : 'translate-y-[89%] transition-all duration-1200 opacity-0'}`}>{text}</div>
                        )}</SlideEffect>
                    </div>
                ))}
            </div>
        </div>
    );
}
