import styles from './index.module.css'
import { TitleComp } from './componets/title'
import { Txt } from './componets/txt'

export default function TelaIni(){
    return (
        <div className={styles.hdComp} id='hdS1'>
            <TitleComp/>
            <Txt/>
        </div>
    )
}