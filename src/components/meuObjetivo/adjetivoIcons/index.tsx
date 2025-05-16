import SlideEffect from '../../slideEffect/slideEffect'

export function Adjetivos() {
    return (
        <SlideEffect<HTMLDivElement>>
            {(ref, visivel) => (
        <div ref={ref} className={`${visivel ? 'opacity-100 translate-x-[0%] transition-all duration-1200' : 'opacity-0 translate-x-[100%] transition-all duration-1200'}`}>
            <img className='block relative bottom-[50vh] left-[60vw] w-[60px] h-[60px] opacity-85 md:hidden' src='imgs/icons/alvo.png' alt='Icon de um alvo com uma flexa'/>
            <img className='relative top-[0vh] right-[0vw] w-[30px] h-[30px] opacity-85
            md:top-[25vh] md:left-[-23vw] md:w-[40px] md:h-[40px] 
            xl:top-[30vh] xl:left-[-20vw]' src='imgs/icons/settings.png'
            alt='Icon de uma engrenagem'/>

            <img className='relative top-[-12vh] left-[50vw] w-[100px] h-[100px] opacity-85
            md:top-[48vh] md:left-[5vw] md:w-[100px] md:h-[100px] 
            xl:top-[60vh] xl:left-[5vw] xl:w-[150px] xl:h-[150px]' 
            src='imgs/icons/working.png'alt='Icon de um boneco no computador'/>

            <img className='hidden opacity-85 
            md:block md:relative md:bottom-[20vh] md:left-[6vw] md:w-[170px] md:h-[170px]
            xl:bottom-[15vh] xl:left-[5vw] xl:w-[350px] xl:h-[350px]' 
            src='imgs/icons/goal.png' alt='Icon de uma prancheta junto de um alvo com uma flexa'/> 
        </div>)}
        </SlideEffect>
    );
}
