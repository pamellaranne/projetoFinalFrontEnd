import React, { useState, useEffect } from 'react';
import { Topbar } from '../../componentes/Topbar/Topbar';
import style from './Home.module.css';
import imgLista from'../../assets/lista.png'; 

export function Home() {
    // Estado para controlar o que deve ser mostrado
    const [showMainContent, setShowMainContent] = useState(false);

    useEffect(() => {
        // Após 4 segundos, mudamos o estado para mostrar o conteúdo principal
        const timer = setTimeout(() => {
            setShowMainContent(true);
        }, 4000); // 4000ms = 4 segundos

        // Limpeza do timer quando o componente for desmontado
        return () => clearTimeout(timer);
    }, []); // [] faz com que o useEffect seja chamado apenas uma vez, na montagem do componente

    return (
        <div className={style.conteudo}>
            <Topbar>
                <div className={style.pagina_conteudo}>
                </div>
            </Topbar>
            <div className={style.container}>
                {/* Mensagem de boas-vindas */}
                {!showMainContent && (
                    <div className={style.main_content}>
                        <h2>Bem-vindo ao seu Gerenciador de Compras!</h2>
                        <h2>Estamos felizes em ter você aqui.</h2>
                    </div>
                )}

                {/* Conteúdo principal que aparece após 4 segundos */}
                {showMainContent && (
                    <div className={style.main_content}>
                        <h2>Adicione seus itens à lista e organize suas compras de forma fácil e rápida.</h2>
                        <h2>Vamos começar?</h2>
                    </div>
                )}

                
                    <div className={style.container_imagem}>
                    <img className={style.imagem} src={imgLista}></img>
                    </div>
                
            </div>
        </div>
    );
}
