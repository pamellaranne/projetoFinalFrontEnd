import React, { useState } from 'react';
import style from './LoginForm.module.css';
import UsuarioAPI from '../../services/usuarioAPI';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Estado para armazenar mensagens de erro
  const [loading, setLoading] = useState(false);  // Estado para mostrar carregando enquanto valida
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Limpar mensagens de erro anteriores
    setError('');

    setLoading(true); // Ativa o estado de carregamento

    try {
      // Chama a função de validação do usuário, aguardando a resposta
      const resposta = await UsuarioAPI.validarUsuarioAsync(email, password);

      // Se a resposta for bem-sucedida, redireciona o usuário
      if (resposta.status === 200) {
        navigate('/'); // Navega para a página inicial
      } else {
        // Se a resposta não for 200, trata como erro
        setError('Credenciais inválidas.');
      }
    } catch (error) {
      // Se ocorrer um erro durante a requisição
      console.error('Erro ao validar login:', error);
      setError('Ocorreu um erro ao tentar fazer login. Tente novamente.');
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  }

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={style.inputSenha}
            required
          />
        </div>
        <button type="submit" className={style.button} disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
        <div className={style.botoesAuxiliares}>
          <button type="button" className={style.buttonNovoUsuario} disabled={loading}>
            {loading ? 'Carregando...' : 'Novo Usuário'}
          </button>

          <button type="button" className={style.buttonEsqueceuSenha} disabled={loading}>
            {loading ? 'Carregando...' : 'Esqueceu a senha?'}
          </button>
        </div>
      </form>

      {/* Mensagem de erro */}
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
}

export default LoginForm;
