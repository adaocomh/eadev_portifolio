import SlideEffect from '../slideEffect/slideEffect'
import React from 'react'

export function SlideMemoji(){
    return(
        <SlideEffect<HTMLImageElement>>
        {(ref, visivel) => (
        <div ref={ref} className={`transition-all duration-1500 ${visivel ?'translate-x-[0] opacity-100' : 'translate-x-[-200px] opacity-0'}`}>
            <img src='/imgs/self/contato.png' className='w-[150px] h-[150px] rounded-b-[50%]'/>
        </div>
        )}
        </SlideEffect>
    )
}