import { TitleComp } from './componets/title'
import { Txt } from './componets/txt'
import MenuSuspenso from '../mnSuspenso'

export default function Header(){
    return (
        <div className='flex flex-col h-[100vh] p-[80px_80px_80px_80px]' id='hdS1'>
            <div className='flex flex-col justify-around h-[100%]'>
            <p className='max-w-[200px] text-start text-[4.5vh] text-[var(--cor-font)] text-shadow-[0px_10px_15px_rgba(0,0,0,0.3)] row-start-3 col-start-3 ml-[15px] md:max-w-max md:text-[2.8vw]'>Dev.<br/> Front-end freelancer<br/></p>
                <TitleComp/>
                <p className='self-end font-extralight text-[2.9vh] text-[var(--cor-font)] text-shadow-[0px_10px_15px_rgba(0,0,0,0.3)]

             md:text-[1.6rem]
            '>Construindo experiências interativas e intuitivas na web.</p>
            </div>
        </div>
    )
}