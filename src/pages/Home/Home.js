import { Topbar } from '../../componentes/Topbar/Topbar';
import style from './Home.module.css';

window.onload = function () {
    // Após 4 segundos, mostramos o conteúdo principal
    setTimeout(function () {
        document.getElementById("welcomeMessage").style.display = "none"; // Esconde a mensagem de boas-vindas
        document.getElementById("mainContent").style.display = "block"; // Mostra o conteúdo principal
    }, 4000); // 4000ms = 4 segundos
}


export function Home() {
    return (
        <div className={style.conteudo}>
            <Topbar>
                <div className={style.pagina_conteudo}>
                </div>
            </Topbar>
            <div className="container">
                <div id="welcomeMessage" className="welcome-message">
                    <h1>Bem-vindo ao seu Gerenciador de Compras!</h1>
                    <p>Estamos felizes em ter você aqui. Vamos começar sua lista de compras.</p>
                </div>

                <div id="mainContent" className="main-content" style={{ display: 'none' }}>
                    <h2>Adicione seus itens à lista e organize suas compras de forma fácil e rápida.</h2>
                </div>
            </div>
        </div>
    )
}
