import style from './style.module.css';
import SlideEffect from '../../slideEffect/slideEffect';

export function TextBlocks() {
    return (
        <div className={style.containerBlocoDTxt}>
            <div className={style.tornandoPara}>
                {["Buscando entregar projetos interativos e",
                  "intuitivos; sem descartar suas intenções, tenho",
                  "como objetivo oferecer a melhor solução para o",
                  "que você busca."].map((text, index) => (
                    <div key={index} className={style.containerPara}>
                        <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                        <div ref={ref} className={`${style.txtSlide} ${visivel ? style.ativo : ''}`}>{text}</div>
                        )}</SlideEffect>
                    </div>
                ))}
            </div>
                <div className={`${style.containerPara} ${style.containerHDois}`}>
                    <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                    <div ref={ref} className={`${style.txtSlide} ${style.subTitleHDois} ${visivel ? style.ativo : ''}`}>Posso atuar...</div>)}</SlideEffect>
                </div>
            <div className={style.tornandoPara}>
                {["transformando layouts pré-definidos em",
                  "código funcional ou colaborar na criação do",
                  "projeto desde o início, unindo design e ",
                  "desenvolvimento para uma solução completa."].map((text, index) => (
                    <div key={index} className={style.containerPara}>
                        <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                        <div ref={ref} className={`${style.txtSlide} ${visivel ? style.ativo : ''}`}>{text}</div>
                        )}</SlideEffect>
                    </div>
                ))}
            </div>
            <div className={style.tornandoParaMobile}>
                {["Buscando entregar projetos", 
                  "interativos e intuitivos; sem",
                  "descartar suas intenções,", 
                  "tenho como objetivo oferecer",
                  "a melhor solução para o que",
                  "você busca."].map((text, index) => (
                    <div key={index} className={style.containerPara}>
                        <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                        <div ref={ref} className={`${style.txtSlide} ${visivel ? style.ativo : ''}`}>{text}</div>
                        )}</SlideEffect>
                    </div>
                ))}
            </div>
                <div className={`${style.containerParaMobile} ${style.containerHDois}`}>
                    <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                    <div ref={ref} className={`${style.txtSlide} ${style.subTitleHDoisMobile} ${visivel ? style.ativo : ''}`}>Posso atuar...</div>)}</SlideEffect>
                </div>
            <div className={style.tornandoParaMobile}>
                {["transformando layouts", 
                  "pré-definidos em código",
                  "funcional ou colaborar na",
                  "criação do projeto desde",
                  " o início, unindo design e ",
                  "desenvolvimento para uma", 
                  "solução completa."].map((text, index) => (
                    <div key={index} className={style.containerPara}>
                        <SlideEffect<HTMLDivElement>>{(ref, visivel) => (
                        <div ref={ref} className={`${style.txtSlide} ${visivel ? style.ativo : ''}`}>{text}</div>
                        )}</SlideEffect>
                    </div>
                ))}
            </div>
        </div>
    );
}
