import style from './style.module.css';
import SlideEffect from '../../slideEffect/slideEffect'

export function Adjetivos() {
    return (
        <SlideEffect<HTMLDivElement>>
            {(ref, visivel) => (
        <div ref={ref} className={`${style.circles} ${visivel ? style.ativo : ''}`}>
            <img className={`${style.pngGoal2} ${style.adjetivos}`} src='imgs/icons/alvo.png' width={50} alt='Icon de um alvo com uma flexa'/>
            <img className={`${style.pngSetting} ${style.adjetivos}`} src='imgs/icons/settings.png' width={50} alt='Icon de uma engrenagem'/>
            <img className={`${style.pngWork} ${style.adjetivos}`} src='imgs/icons/working.png' width={150} alt='Icon de um boneco no computador'/>
            <img className={`${style.pngGoal} ${style.adjetivos}`} src='imgs/icons/goal.png' width={300} alt='Icon de uma prancheta junto de um alvo com uma flexa'/> 
        </div>)}
        </SlideEffect>
    );
}
