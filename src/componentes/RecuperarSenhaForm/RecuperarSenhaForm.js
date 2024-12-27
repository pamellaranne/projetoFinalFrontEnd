// RecuperarSenhaForm.js
import React, { useState } from 'react';
import style from './RecuperarSenhaForm.module.css';
import UsuarioAPI from '../../services/usuarioAPI';
import { useNavigate } from 'react-router-dom';

function RecuperarSenhaForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Por favor, informe seu e-mail.');
      return;
    }

    setLoading(true);
    try {
      // Envia a solicitação de recuperação de senha para a API
      const response = await UsuarioAPI.esqueciMinhaSenha(email);

      setMessage('Um link de redefinição de senha foi enviado para o seu e-mail.');
      setError('');
    } catch (error) {
      setError('Não foi possível enviar o link de redefinição. Verifique seu e-mail e tente novamente.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <h2>Recuperar Senha</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.input_group}>
          <label htmlFor="email">Informe seu e-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={style.inputEmail}
            required
          />
        </div>
        <button type="submit" className={style.button} disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar link de redefinição'}
        </button>
      </form>

      {message && <p className={style.success}>{message}</p>}
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
}

export default RecuperarSenhaForm;
