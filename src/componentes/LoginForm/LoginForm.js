import React, { useState } from 'react';
import style from './LoginForm.module.css';
import UsuarioAPI from '../../services/usuarioAPI';  // Importa a API de usuários
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');  // Estado para mensagens de erro
  const [loading, setLoading] = useState(false);  // Controle de carregamento

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se os campos estão preenchidos
    if (!email || !senha) {
      setError("Por favor, preencha ambos os campos.");
      return;
    }

    setLoading(true);  // Inicia o carregamento

    try {
      // Faz a requisição à API de validação
      const response = await UsuarioAPI.validarUsuarioAsync(email, senha);
      console.log(response.id);  // Adicionado para depuração

      // Verifica se a resposta foi bem-sucedida
      if (response !== null ) {
        // Armazena no localStorage como usuário autenticado
        localStorage.setItem('isAuthenticated', 'true');

        
        const usuarioId = response.id;

        localStorage.setItem('usuarioId',usuarioId );
        // Redireciona para a página principal
        navigate('/');
      }
    } catch (error) {
      console.error("Erro ao validar usuário:", error);
      
    } finally {
      setLoading(false);  // Finaliza o carregamento
    }
  };

  // Funções de navegação para outras páginas
  const handleEsqueceuSenha = () => {
    navigate('/recuperar-senha');
  };

  const handleNovoUsuario = () => {
    navigate('/cadastro');
  };

  return (
    <div className={style.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={style.form}>
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={style.inputSenha}
            required
          />
        </div>
        <button type="submit" className={style.button} disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
        <div className={style.botoesAuxiliares}>
          <button
            type="button"
            className={style.buttonNovoUsuario}
            disabled={loading}
            onClick={handleNovoUsuario}
          >
            {loading ? 'Carregando...' : 'Novo Usuário'}
          </button>

          <button
            type="button"
            className={style.buttonEsqueceuSenha}
            disabled={loading}
            onClick={handleEsqueceuSenha}
          >
            {loading ? 'Carregando...' : 'Esqueceu a senha?'}
          </button>
        </div>
      </form>

      {/* Exibe erro caso ocorra */}
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
}

export default LoginForm;
