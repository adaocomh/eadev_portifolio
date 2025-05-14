import TelaIni from '../components/header'
import Sobre from '../components/meuObjetivo'
import AreaPrj from '../components/projetos'
import FtPg from '../components/footerContato'
import { MenuSuspenso } from '../components/mnSuspenso'

export default function Home() {
  return (
    <>
        <MenuSuspenso/>
        <TelaIni/>
        <Sobre/>
        <AreaPrj/>
        <FtPg/>
    </>
  );
}
