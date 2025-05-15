export function Txt(){
    return (
        <div className='flex flex-col-reverse justify-around max-w-[100vw] h-[60vw]
        md:grid md:grid-cols-[repeat(2,1fr)] md:grid-rows-[repeat(3,1fr)] md:h-0
        '>
            <p className='max-w-[170px] font-extralight text-[2.9vw] text-[var(--cor-font)] text-shadow-[0px_10px_15px_rgba(0,0,0,0.3)] row-start-3 col-start-1 md:max-w-max md:text-[2.6vw]'>Construindo experiências <br/>interativas e intuitivas na <br/>web.</p>
            <div className='min-w-[300px] md:min-w-[450px]'></div>
            <p className='max-w-[200px] font-normal text-start text-[4.5vw] text-[var(--cor-font)] text-shadow-[0px_10px_15px_rgba(0,0,0,0.3)] row-start-3 col-start-3 ml-[15px] md:max-w-max md:text-[2.8vw]'>Dev.<br/> Front-end freelancer<br/></p>
        </div>
    )
}