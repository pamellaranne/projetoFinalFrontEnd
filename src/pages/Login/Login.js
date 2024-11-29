import React from 'react';
import style from './Login.module.css'
import LoginForm from '../../componentes/LoginForm/LoginForm';

export function Login() {
  return (
    <div className={style.pagina_conteudo}>
      <LoginForm />
    </div>
  );
}
