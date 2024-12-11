import { useLocation, useNavigate } from 'react-router-dom';
import { Topbar } from '../../componentes/Topbar/Topbar';
import style from './EditarUsuario.module.css';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import usuarioAPI from '../../services/usuarioAPI';
import Button from 'react-bootstrap/Button';

export function EditarUsuario() {
    const location = useLocation();
    const navigate = useNavigate();
    const [id] = useState(location.state);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState();
    const [tiposUsuarios, setTiposUsuarios] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            await usuarioAPI.atualizarAsync(id, nome, email, senha, tipoUsuario);
            navigate('/usuario')
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    useEffect(() => {

        const buscarTiposUsuarios = async () => {
            try {
                const tipos = await usuarioAPI.listarTiposUsuarioAsync();
                setTiposUsuarios(tipos);
                console.log(tiposUsuarios)
            } catch (error) {
                console.error("Erro ao buscar tipos de usuários:", error);
            }
        };

        const buscarDadosUsuario = async () => {
            try {
                const usuario = await usuarioAPI.obterAsync(id);
                setTipoUsuario(usuario?.tipoUsuarioId);
                setNome(usuario.nome)
                setEmail(usuario.email)
                setSenha(usuario.senha)

            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        }
        buscarDadosUsuario();
        buscarTiposUsuarios();

    }, []);

    const isFormValid = () => {
        return nome && email && senha;
    };

    return (
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Editar Usuário</h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digite seu email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                name="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!isFormValid()}>
                            Salvar
                        </Button>
                    </Form>
                </div>
            </Topbar>
    )
}