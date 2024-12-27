import React from 'react';
import style from './RecuperarSenha.module.css'
import RecuperarSenhaForm from '../../componentes/RecuperarSenhaForm/RecuperarSenhaForm';

export function RecuperarSenha() {
  return (
    <div className={style.pagina_conteudo}>
      <RecuperarSenhaForm />
    </div>
  );
}
