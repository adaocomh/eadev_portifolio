import { Machine } from '../machine'
import style from './title.module.css'

export function TitleComp(){
    return (
            <div className={style.ContPaiTitle}>
                <div className={style.conTitle}>
                    <Machine text="Éverton_Adão"/>
                </div>
            </div>
    )
}