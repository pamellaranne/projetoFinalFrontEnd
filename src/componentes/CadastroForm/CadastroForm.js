import React, { useState } from 'react';
import style from './CadastroForm.module.css';
import UsuarioAPI from '../../services/usuarioAPI';
import { useNavigate } from 'react-router-dom';

function CadastroForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Estado para armazenar mensagens de erro
  const [successMessage, setSuccessMessage] = useState('');  // Estado para armazenar mensagem de sucesso
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage(''); // Limpa mensagem de sucesso

    setLoading(true); // Ativa o estado de carregamento

    await UsuarioAPI.criarAsync(nome, email, password);
    navigate('/');

  };

  return (
    <div className={style.container}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.input_group}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="email"  
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={style.inputEmail}
            required
          />
        </div>
        <div className={style.input_group}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={style.inputEmail}
            required
          />
        </div>
        <div className={style.input_group}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={style.inputSenha}
            required
          />
        </div>
        <button type="submit" className={style.button} disabled={loading}>
          {loading ? 'Carregando...' : 'Cadastrar'}
        </button>
      </form>

      {/* Mensagem de erro */}
      {error && <p className={style.error}>{error}</p>}
      
      {/* Mensagem de sucesso */}
      {successMessage && <p className={style.success}>{successMessage}</p>}
    </div>
  );
}

export default CadastroForm;
