'use client'
import { TextBlocks } from './blocosDTextos';
import { Adjetivos } from './adjetivoIcons';
import style from './style.module.css';

export default function Sobre() {
    return (
                <div className={style.sbContainer} id='sS2'>
                    <div className={style.sbConteudo}>
                        <TextBlocks/>
                        <Adjetivos/>
                    </div>
                </div>
    )
}