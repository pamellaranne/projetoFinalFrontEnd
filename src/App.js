import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Usuarios } from './pages/Usuarios/Usuarios';
import { NovoUsuario } from './pages/NovoUsuario/NovoUsuario';
import { EditarUsuario } from './pages/EditarUsuario/EditarUsuario';
import { EditarProduto } from './pages/EditarProduto/EditarProduto';
import { NovoProduto } from './pages/NovoProduto/NovoProduto';
import { Login } from './pages/Login/Login';
import { Produtos } from './pages/Produtos/Produtos';
import { RecuperarSenha } from './pages/RecuperarSenha/RecuperarSenha';
import { Cadastro } from './pages/Cadastro/Cadastro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/usuario' element={<Usuarios />} />
        <Route path='/usuario/novo' element={<NovoUsuario />} />
        <Route path='/usuario/editar' element={<EditarUsuario />} />
        <Route path='/produtos' element={<Produtos />} />
        <Route path='/produtos/novo' element={<NovoProduto />} />
        <Route path='/produtos/editar' element={<EditarProduto />} />
        <Route path='/recuperar-senha' element={<RecuperarSenha />} />
        <Route path='/cadastro' element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
