import { Link } from 'react-router-dom';
import style from './Topbar.module.css';
import { MdLogout } from 'react-icons/md';
import { FaHome, FaUser, FaProductHunt } from 'react-icons/fa'; 

export function Topbar({ children }) {
    return (
        <div>
            <div className={style.topbar_conteudo}>
                <div className={style.topbar_icones}>
                <Link to={"/"} className={style.botao_nav}><FaHome /></Link>
                <Link to={"/usuario"} className={style.botao_nav}><FaUser /></Link>
                <Link to={"/produtos"} className={style.botao_nav}><FaProductHunt /></Link>
                </div>

                <div className={style.topbar_iconeSair}>
                <Link to={"/login"} className={style.botao_deslogar}><MdLogout /></Link>
                </div>
            </div>
            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    );
}
