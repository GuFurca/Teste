let editais = [];

let editalSelecionado = null;

let modoEdicao = false;

function abrirModalNovo(){

    modoEdicao = false;

    document.getElementById("tituloModal")
        .textContent = "Criar Edital";

    document.getElementById("formEdital")
        .reset();

    document.getElementById("modalEdital")
        .classList.remove("oculto");
}

function fecharModal() {

    document
        .getElementById("modalEdital")
        .classList.add("oculto");
}

function renderizarLista() {

    const lista =
        document.getElementById("listaEditais");

    lista.innerHTML = "";

    editais.forEach(edital => {

        const card =
            document.createElement("div");

        card.classList.add("edital");

        if (edital.id === editalSelecionado) {
            card.classList.add("ativo");
        }

        card.innerHTML = `
            <h3>${edital.nome}</h3>
            <p>${edital.status}</p>
        `;

        card.addEventListener("click", () => {
            abrirEdital(edital.id);
        });

        lista.appendChild(card);
    });
}

function abrirEdital(id) {

    const edital =
        editais.find(e => e.id === id);

    editalSelecionado = id;

    document.getElementById("cardDocumento")
    .style.display = "block";

    document.getElementById("cardCronograma")
    .style.display = "block";

    document.getElementById("tituloEdital")
        .textContent = edital.nome;

    document.getElementById("descricaoEdital")
        .textContent = edital.descricao;

    const status =
        document.getElementById("statusEdital");

    status.textContent = edital.status;

    status.className = "";

    switch (edital.status) {

        case "ABERTO":
            status.classList.add("aberto");
            break;

        case "EM_ANALISE":
            status.classList.add("analise");
            break;

        case "FINALIZADO":
            status.classList.add("finalizado");
            break;
    }
    document.getElementById("linkDocumento").href =
    edital.urlDocumento;

    document.getElementById("linkDocumento").target =
    "_blank";

    document.getElementById("inicioInscricao")
        .textContent = edital.inicioInscricao || "-";

    document.getElementById("fimInscricao")
        .textContent = edital.fimInscricao || "-";

    document.getElementById("resultadoPreliminar")
        .textContent = edital.resultadoPreliminar || "-";

    document.getElementById("resultadoFinal")
        .textContent = edital.resultadoFinal || "-";

    renderizarLista();
}

window.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("formEdital")
        .addEventListener("submit", salvarEdital);

});
function salvarEdital(event) {

    event.preventDefault();

    const edital = {

        id: modoEdicao
            ? editalSelecionado
            : Date.now(),

        nome:
            document.getElementById("nome").value,

        descricao:
            document.getElementById("descricao").value,

        urlDocumento:
            document.getElementById("urlDocumento").value,

        linkDownload:
            document.getElementById("linkDownload").value,

        inicioInscricao:
            document.getElementById("inicioInscricaoInput").value,

        fimInscricao:
            document.getElementById("fimInscricaoInput").value,

        resultadoPreliminar:
            document.getElementById("resultadoPreliminarInput").value || null,

        recursoInicio:
            document.getElementById("recursoInicioInput").value || null,

        recursoFim:
            document.getElementById("recursoFimInput").value || null,

        resultadoFinal:
            document.getElementById("resultadoFinalInput").value || null,
        aceitaDocumentos:
            document.getElementById("aceitaDocumentos").checked,

        status:
            document.getElementById("status").value
    };

    if (modoEdicao) {

        const indice =
            editais.findIndex(
                e => e.id === editalSelecionado
            );

        editais[indice] = edital;

    } else {

        editais.push(edital);
    }

    salvarLocalStorage();

    renderizarLista();

    abrirEdital(edital.id);

    fecharModal();
}

function excluirEdital() {

    if (!editalSelecionado)
        return;

    if (!confirm("Excluir edital?"))
        return;

    editais =
        editais.filter(
            e => e.id !== editalSelecionado
        );

    editalSelecionado = null;

    salvarLocalStorage();

    renderizarLista();
    limparDetalhes();
}

function salvarLocalStorage() {

    localStorage.setItem(
        "editais",
        JSON.stringify(editais)
    );
}

function carregarLocalStorage() {

    const dados =
        localStorage.getItem("editais");

    if (dados) {

        editais = JSON.parse(dados);
    }
}

window.onload = () => {

    carregarLocalStorage();

    renderizarLista();

    if (editais.length > 0) {

        abrirEdital(editais[0].id);

    } else {

        limparDetalhes();
    }

    fecharModal();
};

function abrirModalEditar() {

    if (!editalSelecionado) {
        alert("Selecione um edital.");
        return;
    }

    modoEdicao = true;

    const edital =
        editais.find(
            e => e.id === editalSelecionado
        );

    document.getElementById("tituloModal")
        .textContent = "Editar Edital";

    document.getElementById("nome").value =
        edital.nome;

    document.getElementById("descricao").value =
        edital.descricao;

    document.getElementById("urlDocumento").value =
        edital.urlDocumento;

    document.getElementById("linkDownload").value =
        edital.linkDownload;

    document.getElementById("inicioInscricaoInput").value =
        edital.inicioInscricao || "";

    document.getElementById("fimInscricaoInput").value =
        edital.fimInscricao || "";

    document.getElementById("resultadoPreliminarInput").value =
        edital.resultadoPreliminar || "";

    document.getElementById("recursoInicioInput").value =
        edital.recursoInicio || "";

    document.getElementById("recursoFimInput").value =
        edital.recursoFim || "";

    document.getElementById("resultadoFinalInput").value =
        edital.resultadoFinal || "";

    document.getElementById("aceitaDocumentos").checked =
        edital.aceitaDocumentos;

    document.getElementById("status").value =
        edital.status;

    document.getElementById("modalEdital")
        .classList.remove("oculto");
}

function limparDetalhes(){

    document.getElementById("tituloEdital").textContent = "";
    document.getElementById("descricaoEdital").textContent = "";
    document.getElementById("statusEdital").textContent = "";

    document.getElementById("inicioInscricao").textContent = "";
    document.getElementById("fimInscricao").textContent = "";
    document.getElementById("resultadoPreliminar").textContent = "";
    document.getElementById("resultadoFinal").textContent = "";

    document.getElementById("linkDocumento")
        .removeAttribute("href");

    document.getElementById("cardDocumento")
        .style.display = "none";

    document.getElementById("cardCronograma")
        .style.display = "none";
}

function voltarMenu(){
    window.location.href = "index.html";
}