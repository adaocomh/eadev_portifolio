import SlideEffect from '../../slideEffect/slideEffect'
import React from 'react'
import LottiePlane from '@/components/lottieAnimate/plane'

export function SlidePlane(){
    return(
        <SlideEffect<HTMLImageElement>>
        {(ref, visivel) => (
        <div ref={ref} className={`bg-[#F5ECDB] w-[200px] h-[200px] rounded-[50%] transition-all duration-1800 ${visivel ?'translate-x-[0] opacity-100' : 'translate-x-[-200px] opacity-0'}`}>
            <LottiePlane/>
        </div>
        )}
        </SlideEffect>
    )
}