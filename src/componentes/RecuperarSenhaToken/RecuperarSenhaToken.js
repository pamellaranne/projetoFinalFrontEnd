import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./RecuperarSenhaToken.module.css";
import UsuarioAPI from "../../services/usuarioAPI";

function RecuperarSenhaToken() {
  const [token, setToken] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Função para extrair o token da URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromURL = queryParams.get("token");
    if (tokenFromURL) {
      setToken(tokenFromURL);  // Armazena o token no estado
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !novaSenha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await UsuarioAPI.redefinirMinhaSenha(token, novaSenha);

      setMessage("Senha redefinida com sucesso!");
      setError("");
      navigate("/");  // Redireciona para a página inicial ou login
    } catch (error) {
      setError(
        "Não foi possível redefinir a senha. Verifique o token e tente novamente."
      );
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.input_group}>
          <label htmlFor="token">Token:</label>
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className={style.inputToken}
            required
            disabled  // Não permite que o usuário edite o token, pois já está na URL
          />
        </div>

        <div className={style.input_group}>
          <label htmlFor="novaSenha">Nova Senha:</label>
          <input
            type="password"
            id="novaSenha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className={style.inputSenha}
            required
          />
        </div>

        <button type="submit" className={style.button} disabled={loading}>
          {loading ? "Redefinindo..." : "Redefinir Senha"}
        </button>
      </form>

      {message && <p className={style.success}>{message}</p>}
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
}

export default RecuperarSenhaToken;
