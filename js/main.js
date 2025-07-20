import ui from "./ui.js"
import api from "./api.js";

document.addEventListener('DOMContentLoaded', () => {
    ui.renderPensamentos();

    const formPensamento = document.getElementById('pensamento-form');
    const btnCancel = document.getElementById("botao-cancelar");

    formPensamento.addEventListener('submit', handleSubmit);
    btnCancel.addEventListener('click', handleClearForm)
})

async function handleSubmit(event) {
    event.preventDefault();
    const id = document.getElementById('pensamento-id').value
    const conteudo = document.getElementById('pensamento-conteudo').value
    const autoria = document.getElementById('pensamento-autoria').value

    try {
        if (id) {
            await api.editarPensamento({ id, conteudo, autoria })
        } else {
            await api.savePensamentos({ conteudo, autoria });
        }
    } catch {
        alert("Erro ao salvar");
    }
}

function handleClearForm() {
    ui.clearForm();
}

