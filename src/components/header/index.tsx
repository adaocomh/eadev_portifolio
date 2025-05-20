import { TitleComp } from './componets/title'
import { Txt } from './componets/txt'

export default function Header(){
    return (
        <div className='flex flex-col justify-between gap-[5vh] min-h-[calc(100vh-146px)] bg-[url(/imgs/self/Pasted%20Graphic.png)] bg-no-repeat bg-fixed bg-position-[180px_46vh] bg-size-[45vh] p-[40px_40px_40px_40px]

        md:justify-start md:gap-[23vh] md:min-h-[calc(100vh-45px)] md:bg-position-[center_53vh] md:bg-size-[55vh] md:p-[0px_60px_60px_60px]

        xl:justify-start xl:gap-[14vw] xl:max-w-[100vw] xl:max-h-[100vh] xl:min-h-[calc(100vh-40px)] xl:bg-position-[center_45vh] xl:bg-size-[65vh]  xl:p-[0px_80px_80px_80px]
        ' id='hdS1'>
            <TitleComp/>
            <Txt/>
        </div>
    )
}