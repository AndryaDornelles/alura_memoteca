import api from "./api.js";

const ui = {
    async preencherFormulário(pensamentoID) {
        const pensamento = await api.getPensamentosPorID(pensamentoID)
        document.getElementById("pensamento-id").value = pensamento.id
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo
        document.getElementById("pensamento-autoria").value = pensamento.autoria
    },

    async clearForm() {
        document.getElementById("pensamento-form").reset();
    },

    async renderPensamentos() {
        const listaPensamentos = document.getElementById("lista-pensamentos")
        const mensagemVazia = document.getElementById("mensagem-vazia");
        listaPensamentos.innerHTML = ''
        try {
            const pensamentos = await api.getPensamentos();
            pensamentos.forEach(ui.addPensamentos);
            if(pensamentos.length === 0) {
                mensagemVazia.style.display = "block";
            } else {
                mensagemVazia.style.display = "none";
            }
        }
        catch {
            alert('Erro ao renderizar pensamentos')
        }
    },

    async addPensamentos(pensamento) {
        const listaPensamentos = document.getElementById('lista-pensamentos');
        const li = document.createElement('li');
        li.setAttribute("data-id", pensamento.id);
        li.classList.add("li-pensamento");

        const iconAspas = document.createElement('img');
        iconAspas.src = "assets/imagens/aspas-azuis.png";
        iconAspas.alt = "Aspas azuis";
        iconAspas.classList.add("icone-aspas");

        const pensamentoConteudo = document.createElement('div');
        pensamentoConteudo.textContent = pensamento.conteudo;
        pensamentoConteudo.classList.add("pensamento-conteudo");

        const pensamentoAutoria = document.createElement('div');
        pensamentoAutoria.textContent = pensamento.autoria;
        pensamentoAutoria.classList.add("pensamento-autoria")

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("botao-editar");
        btnEdit.onclick = () => ui.preencherFormulário(pensamento.id);

        const iconEdit = document.createElement("img");
        iconEdit.src = "assets/imagens/icone-editar.png";
        iconEdit.alt = "Editar";
        btnEdit.appendChild(iconEdit);

        const btnExcluir = document.createElement("button");
        btnExcluir.classList.add("botao-excluir");
        btnExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id);
                ui.renderPensamentos();
            } catch (error) {
                alert("Erro ao excluir pensamento");
            }
        };

        const iconExcluir = document.createElement("img");
        iconExcluir.src = "assets/imagens/icone-excluir.png";
        iconExcluir.alt = "Excluir";
        btnExcluir.appendChild(iconExcluir);


        const icons = document.createElement("div");
        icons.classList.add("icones")
        icons.appendChild(btnEdit);
        icons.appendChild(btnExcluir)

        li.appendChild(iconAspas);
        li.appendChild(pensamentoConteudo);
        li.appendChild(pensamentoAutoria);
        li.appendChild(icons);
        listaPensamentos.appendChild(li);
    },
}

export default ui;