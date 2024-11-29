import { Topbar } from '../../componentes/Topbar/Topbar';
import style from './Home.module.css';

export function Home() {
    return (
        <div className={style.conteudo}>
                <Topbar>
                    <div className={style.pagina_conteudo}>
                        
                    </div>
                </Topbar>
        </div>
    )
}