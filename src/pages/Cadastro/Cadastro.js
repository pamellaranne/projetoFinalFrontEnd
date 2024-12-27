import React from 'react';
import style from './Cadastro.module.css'
import CadastroForm from '../../componentes/CadastroForm/CadastroForm';

export function Cadastro() {
  return (
    <div className={style.pagina_conteudo}>
      <CadastroForm />
    </div>
  );
}
