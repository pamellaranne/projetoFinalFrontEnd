import { useLocation, useNavigate } from 'react-router-dom';
import { Topbar } from '../../componentes/Topbar/Topbar';
import style from './EditarProduto.module.css';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import produtoAPI from '../../services/produtoAPI';
import Button from 'react-bootstrap/Button';

export function EditarProduto() {
    const location = useLocation();
    const navigate = useNavigate();
    const [id] = useState(location.state);

    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [tiposCategoria, setTiposCategoria] = useState('');
    const [tiposProdutos, setTiposProdutos] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            await produtoAPI.atualizarAsync(id, nome, quantidade, tiposCategoria);
            navigate('/produto')
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    useEffect(() => {

        const buscarTiposProdutos = async () => {
            try {
                const tipos = await produtoAPI.listarTiposProdutosAsync();
                setTiposProdutos(tipos);
                console.log(tiposProdutos)
            } catch (error) {
                console.error("Erro ao buscar tipos de produtos:", error);
            }
        };

        const buscarDadosProduto = async () => {
            try {
                const produto = await produtoAPI.obterAsync(id);
                setNome(produto.nome)
                setQuantidade(produto.quantidade)
                setTiposCategoria(produto.tiposCategoria)

            } catch (error) {
                console.error("Erro ao buscar dados do produto:", error);
            }
        }
        buscarDadosProduto();
        buscarTiposProdutos();

    }, []);

    const isFormValid = () => {
        return nome && quantidade && tiposCategoria;
    };

    return (
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Editar Produto</h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu produto"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite sua quantidade"
                                name="quantidade"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                as="select"
                                name="tiposCategoria"
                                value={tiposCategoria}
                                onChange={(e) => setTiposCategoria(e.target.value)}
                                required
                            >
                                {tiposProdutos.map((tipo) => (
                                        <option value={tipo.id}>{tipo.nome}</option>
                                
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