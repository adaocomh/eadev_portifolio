import SlideEffect from '../../slideEffect/slideEffect'
import React from 'react'
import LottiePlane from '@/components/lottieAnimate/plane'

export function SlidePlane(){
    return(
        <SlideEffect<HTMLImageElement>>
        {(ref, visivel) => (
        <div ref={ref} className={`${visivel ?'bg-[#F5ECDB] w-[200px] h-[200px] rounded-[50%] translate-x-[0] transition-all duration-1800 opacity-100' : ' transition-all duration-1800 opacity-0'}`}>
            <LottiePlane/>
        </div>
        )}
        </SlideEffect>
    )
}