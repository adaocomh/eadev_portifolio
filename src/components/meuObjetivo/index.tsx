'use client'
import { TextBlocks } from './blocosDTextos';
import { Adjetivos } from './adjetivoIcons';

export default function MeuObjetivo() {
    return (
                <div className='flex justify-center items-center min-h-[100vh] max-w-[100vw] shadow-[inset_0px_30px_100px_rgba(0,0,0,0.040)] overflow-hidden' id='sS2'>
                    <div className='flex flex-col items-start min-h-[90vh] p-[45px_0px_0px_0px]
                    md:flex-row md:min-h-[80vh] md:max-h-[80vh] md:p-[0px]
                    xl:max-w-[80vw]'>
                        <TextBlocks/>
                        <Adjetivos/>
                    </div>
                </div>
    )
}