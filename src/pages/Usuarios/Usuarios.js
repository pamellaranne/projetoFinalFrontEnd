import Table from "react-bootstrap/esm/Table";
import { Link } from "react-router-dom";
import { Topbar } from "../../componentes/Topbar/Topbar";
import style from "./Usuarios.module.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import usuarioAPI from "../../services/usuarioAPI";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export function Usuarios() {
  const [usuario, setUsuario] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const MostrarUsuario = (usuario) => {
    return (
      <tr key={usuario.id}>
        <td>{usuario.nome}</td>
        <td>{usuario.email}</td>
        <td>
          <Link
            to="/usuario/editar"
            state={usuario.id}
            className={style.botao_editar}
          >
            <MdEdit />
          </Link>
        </td>
      </tr>
    );
  };

  const handleFecharmodal = async () => {
    setMostrarModal(false);
    setUsuarioSelecionado(null);
  };

  async function carregarUsuario() {
    var usuarioId = localStorage.getItem("usuarioId");
    try {
      const usuarioEncontrado = await usuarioAPI.obterAsync(usuarioId);
      setUsuario(usuarioEncontrado);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  }

  useEffect(() => {
    carregarUsuario();
  }, []);

  return (
    <Topbar>
      <div className={style.pagina_conteudo}>
        <div className={style.pagina_cabecalho}>
          <h3>Usuários</h3>
          {/* <Link to='/usuario/novo' className={style.botao_novo}>+ Novo</Link> */}
        </div>

        <div className={style.tabela}>
          {/* tabela fica responsiva automaticamente */}
          <Table responsive>
            <thead className={style.tabela_cabecalho}>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className={style.tabela_corpo}>{MostrarUsuario(usuario)}</tbody>
          </Table>
        </div>

        <Modal show={mostrarModal} onHide={handleFecharmodal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que deseja deletar o usuário {usuarioSelecionado?.nome}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleFecharmodal}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Topbar>
  );
}
