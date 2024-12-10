import { useEffect, useState } from 'react';
import { Topbar } from '../../componentes/Topbar/Topbar';
import style from './NovoProduto.module.css';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import produtoAPI from '../../services/produtoAPI';

export function NovoProduto() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [tipoCategoria, setTipoCategoria] = useState();
    const [categorias, setCategorias] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const tipos = await produtoAPI.listarTiposCategoriasAsync();
                setCategorias(tipos);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };
        fetchCategorias();
    }, []);

    const usuarioId = 1;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            await produtoAPI.criarAsync(nome, quantidade, tipoCategoria, usuarioId);
            navigate('/produtos')
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    const isFormValid = () => {
        return nome && quantidade && tipoCategoria;
    };

    return (
        <Topbar>
            <div className={style.pagina_conteudo}>
                <h3>Novo Produto</h3>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNome" className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome do produto"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Digite a quantidade"
                            name="quantidade"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formSenha" className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            as="select"
                            name="tipoCategoria"
                            value={tipoCategoria}
                            onChange={(event) => setTipoCategoria(event.target.value)}
                            required
                        >
                            <option value="">Selecione o tipo de categoria</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={!isFormValid()}>
                        Salvar
                    </Button>
                </Form>
            </div>
        </Topbar>
    )
}