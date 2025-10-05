import Header from '../components/header'
import MeuObjetivo from '../components/meuObjetivo'
import Demo from '../components/demo'
import FooterContato from '../components/footerContato'
import MenuSuspenso from '../components/mnSuspenso'

export default function Home() {
  return (
    <>
        <div className='fixed top-[20px] h-[100px] z-50'><MenuSuspenso/></div>
        <Header/>
        <MeuObjetivo/>
        <Demo/>
        <FooterContato/>
    </>
  );
}
