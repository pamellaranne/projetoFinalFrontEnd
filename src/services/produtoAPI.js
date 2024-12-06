import { HTTPClient } from "./client";

const produtoAPI = {

    async obterAsync(produtoId) {
        try {
            const response = await HTTPClient.get(`/Produto/Obter/${produtoId}?ativo=true`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter produto:", error);
            throw error;
        }
    },
    async listarAsync(ativos) {
        try {
            const response = await HTTPClient.get(`/Produto/Listar?ativos=${ativos}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            throw error;
        }
    },
    async criarAsync(nome, quantidade, tiposCategoria, usuarioId) {
        try {
            const produtoCriar = {
                Nome: nome,
                Quantidade: quantidade,
                TiposCategoria: tiposCategoria,
                UsuarioId: usuarioId
            };
            const response = await HTTPClient.post(`/Produto/Criar`, produtoCriar);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            throw error;
        }
    },
    async atualizarAsync(id, nome, quantidade, tiposCategoria, usuarioId) {
        try {
            const produtoAtualizar = {
                Id: id,
                Nome: nome,
                Quantidade: quantidade,
                TiposCategoria: tiposCategoria,
                UsuarioId: usuarioId
            };
            console.log(produtoAtualizar);
            const response = await HTTPClient.put(`/Produto/Atualizar`, produtoAtualizar);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            throw error;
        }
    },
    async deletarAsync(produtoId) {
        try {
            const response = await HTTPClient.delete(`/Produto/Deletar/${produtoId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            throw error;
        }
    },
    async listarTiposProdutosAsync() {
        try {
            const response = await HTTPClient.get(`/Produto/ListarTiposProduto`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar tipos de produto:", error);
            throw error;
        }
    },

    async listarTiposCategoriasAsync() {
        try {
            const response = await HTTPClient.get(`/Produto/ListarTiposCategorias`);
            return response.data; 
        } catch (error) {
            console.error("Erro ao listar tipos de categorias:", error);
            throw error;
        }
    },
   
    async restaurarAsync(produtoId) {
        try {
            const response = await HTTPClient.put(`/Produto/Restaurar/${produtoId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao restaurar produto:", error);
            throw error;
        }
    }
   
}
 export default produtoAPI;