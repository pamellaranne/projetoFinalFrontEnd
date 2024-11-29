import Table from 'react-bootstrap/esm/Table'
import { Link } from 'react-router-dom';
import { Topbar } from '../../componentes/Topbar/Topbar';
import style from './Produtos.module.css';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useEffect, useState } from 'react';
import produtoAPI from '../../services/produtoAPI';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const handleClickDeletar = (produto) => {
        setProdutoSelecionado(produto)
        setMostrarModal(true);
    };

    const handleDeletar = async () => {
        try {
            await produtoAPI.deletarAsync(produtoSelecionado.id);
            setProdutos(produtos.filter(u => u.id !== produtoSelecionado.id));
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        } finally {
            handleFecharmodal()
        }
    };

    const handleFecharmodal = async () => {
        setMostrarModal(false);
        setProdutoSelecionado(null);
    };

    async function carregarProdutos() {
        try {
            const listaProdutos = await produtoAPI.listarAsync(true);
            console.log(listaProdutos);
            setProdutos(listaProdutos);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }

    useEffect(() => {
        carregarProdutos();
    }, []);

    return (
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <h3>Produtos</h3>
                        <Link to='/produtos/novo' className={style.botao_novo}>+ Novo</Link>
                    </div>

                    <div className={style.tabela}>
                        {/* tabela fica responsiva automaticamente */}
                        <Table responsive>
                            <thead className={style.tabela_cabecalho}>
                                <tr>
                                    <th>Nome</th>
                                    <th>Quantidade</th>
                                    <th>Categoria</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody className={style.tabela_corpo}>
                                {produtos.map((produto) => (
                                    <tr key={produto.id}>
                                        <td>{produto.nome}</td>
                                        <td>{produto.quantidade}</td>
                                        <td>{produto.tiposCategoriasId}</td>
                                        <td>
                                            <Link to='/produtos/editar' state={produto.id} className={style.botao_editar}>
                                                <MdEdit />
                                            </Link>
                                            <button onClick={() => handleClickDeletar(produto)} className={style.botao_deletar}>
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <Modal show={mostrarModal} onHide={handleFecharmodal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Tem certeza que deseja deletar o produto {produtoSelecionado?.nome}?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleFecharmodal}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDeletar}>
                                Deletar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Topbar>
    )
}