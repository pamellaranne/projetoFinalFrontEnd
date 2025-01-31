import React from 'react';
import style from './RecuperarSenha2.module.css';
import RecuperarSenhaToken from '../../componentes/RecuperarSenhaToken/RecuperarSenhaToken';

export function RecuperarSenha2() {
  return (
    <div className={style.pagina_conteudo}>
      <RecuperarSenhaToken />
    </div>
  );
}
