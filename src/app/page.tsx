import Header from '../components/header'
import MeuObjetivo from '../components/meuObjetivo'
import Demo from '../components/demo'
import FooterContato from '../components/footerContato'
import MenuSuspenso from '../components/mnSuspenso'

export default function Home() {
  return (
    <>
        <MenuSuspenso/>
        <Header/>
        <MeuObjetivo/>
        <Demo/>
        <FooterContato/>
    </>
  );
}
