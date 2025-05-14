'use client'
import style from './style.module.css'
import SlideEffect from '../slideEffect/slideEffect'

export default function AreaPrj(){
    return(
        <div className={style.prjComp} id='aPS2'>
            <div className={style.prjConteudo}>
                <SlideEffect<HTMLDivElement>>{
                    (ref, visivel)=>(
                <div ref={ref} className={`${style.prjSlide} ${visivel ? style.ativo : ''}`}>
                    <div  className={style.prjHeader}>
                        <h2>Titulo</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.  </p>
                    </div>
                </div>
                )
                }</SlideEffect>
                <div className={style.prjImg}></div>
            </div>
        </div>
    )
}