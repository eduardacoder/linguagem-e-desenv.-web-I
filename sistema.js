// Lista com os dados de cada evento. Cada objeto abaixo representa um evento.
const eventos = [
    { id: 1, titulo: "Game Hacking", descricao: "Introdução à análise de jogos para fins de segurança.", categoria: "Segurança", data: "Quarta, 11/11", horario: "19:00 - 20:20", local: "IFCE Campus Crato (Lab 01)", vagas: 5 },
    { id: 2, titulo: "Fundamentos de Segurança da Informação", descricao: "Conceitos de proteção de dados, segurança em redes e prevenção contra ameaças digitais.", categoria: "Segurança", data: "Quarta, 11/11", horario: "20:20 - 22:00", local: "IFCE Campus Crato (Auditório)", vagas: 12 },
    { id: 3, titulo: "Introdução a versionamento com Git e GitHub", descricao: "Aprenda a controlar versões do código e colaborar em projetos com Git e GitHub.", categoria: "Programação", data: "Quarta, 11/11", horario: "20:20 - 22:00", local: "IFCE Campus Crato (Lab 02)", vagas: 0 },
    { id: 4, titulo: "Retornando à base: Programação em C", descricao: "Conceitos de lógica e estrutura de dados usando a linguagem C.", categoria: "Programação", data: "Quarta, 11/11", horario: "20:20 - 22:00", local: "IFCE Campus Crato (Lab 03)", vagas: 8 },
    { id: 5, titulo: "Como não ser demitido pela I.A", descricao: "Discussão sobre tendências do mercado de trabalho e como usar ferramentas de IA.", categoria: "Inteligência Artificial", data: "Quinta, 12/11", horario: "19:00 - 20:20", local: "Transmissão Online", vagas: 30 },
    { id: 6, titulo: "Engenharia Reversa/Análise de Binários com LLMs", descricao: "Aplicações de inteligência artificial na análise de arquivos binários.", categoria: "Segurança", data: "Quinta, 12/11", horario: "19:00 - 22:00", local: "IFCE Campus Crato (Lab 01)", vagas: 3 },
    { id: 7, titulo: "Mercado financeiro e tendências", descricao: "Tecnologia aplicada às finanças, fintechs e algoritmos de negociação.", categoria: "Carreira & Mercado", data: "Quinta, 12/11", horario: "20:20 - 22:00", local: "Transmissão Online", vagas: 15 },
    { id: 8, titulo: "A Carreira de um Engenheiro de Software", descricao: "Dicas de carreira, mercado de trabalho e primeiros passos no desenvolvimento.", categoria: "Carreira & Mercado", data: "Sexta, 13/11", horario: "19:00 - 20:20", local: "Auditório Principal", vagas: 20 },
    { id: 9, titulo: "Competição de Programação", descricao: "Desafio de resolução de problemas de lógica de programação.", categoria: "Programação", data: "Sexta, 13/11", horario: "20:20 - 22:00", local: "IFCE Campus Crato (Lab 01 e 02)", vagas: 10 }
];

// Busca no HTML os elementos que o JavaScript vai atualizar ou monitorar.
const listaDeEventos = document.getElementById("events-list");
const pesquisa = document.getElementById("search-input");
const filtroCategoria = document.getElementById("category-filter");
const modalEvento = document.getElementById("event-modal");
const formularioInscricao = document.getElementById("subscription-form");
const mensagemConfirmacao = document.getElementById("confirmation-message");
// Agrupa os campos do modal para facilitar o preenchimento dos detalhes.
const elementos = {
    titulo: document.getElementById("modal-title"),
    descricao: document.getElementById("modal-desc"),
    data: document.getElementById("modal-date"),
    horario: document.getElementById("modal-time"),
    local: document.getElementById("modal-location"),
    vagas: document.getElementById("modal-vacancies"),
    detalhes: document.getElementById("modal-details"),
    botaoInscricao: document.getElementById("btn-abrir-inscricao")
};
// Guarda qual evento está aberto para consultar ou alterar suas vagas.
let eventoSelecionado;

// Mostra na página os eventos recebidos como argumento.
function renderizarEventos(eventosParaMostrar) {
    // Remove os cartões anteriores antes de desenhar a lista atualizada.
    listaDeEventos.replaceChildren();

    // Se a lista estiver vazia, mostra uma mensagem e encerra a função.
    if (eventosParaMostrar.length === 0) {
        listaDeEventos.textContent = "Nenhum evento encontrado.";
        return;
    }

    // Cria um cartão para cada evento da lista.
    eventosParaMostrar.forEach(evento => {
        const cartaoEvento = document.createElement("article");
        const tituloEvento = document.createElement("h3");
        const detalhesEvento = document.createElement("p");
        const botaoDetalhes = document.createElement("button");

        cartaoEvento.className = "cartao-evento";
        tituloEvento.textContent = evento.titulo;
        // Monta os detalhes e informa se ainda há vagas.
        detalhesEvento.textContent = `${evento.categoria} | ${evento.data}, ${evento.horario} | ${evento.local} | ${evento.vagas ? `${evento.vagas} vaga(s)` : "Esgotado"}`;
        botaoDetalhes.className = "botao-principal";
        botaoDetalhes.textContent = "Ver detalhes";
        // Ao clicar, abre os detalhes do evento correspondente.
        botaoDetalhes.addEventListener("click", () => abrirdados(evento.id));
        // Coloca título, detalhes e botão dentro do cartão e o cartão na página.
        cartaoEvento.append(tituloEvento, detalhesEvento, botaoDetalhes);
        listaDeEventos.appendChild(cartaoEvento);
    });
}

// Aplica a pesquisa pelo nome e o filtro de categoria, depois atualiza a lista.
function filtrarEventos() {
    renderizarEventos(eventos.filter(evento =>
        // Converte para minúsculas para não diferenciar letras maiúsculas.
        evento.titulo.toLowerCase().includes(pesquisa.value.toLowerCase()) &&
        // Mostra qualquer categoria quando "todos" estiver selecionado.
        (filtroCategoria.value === "todos" || evento.categoria === filtroCategoria.value)
    ));
}

// Procura o evento pelo ID e preenche o modal com seus dados.
function abrirdados(id) {
    eventoSelecionado = eventos.find(evento => evento.id === id);
    // Encerra se nenhum evento corresponder ao ID recebido.
    if (!eventoSelecionado) return;

    // Atualiza cada campo de texto do modal.
    elementos.titulo.textContent = eventoSelecionado.titulo;
    elementos.descricao.textContent = eventoSelecionado.descricao;
    elementos.data.textContent = eventoSelecionado.data;
    elementos.horario.textContent = eventoSelecionado.horario;
    elementos.local.textContent = eventoSelecionado.local;
    elementos.vagas.textContent = eventoSelecionado.vagas;

    // Desativa a inscrição se não houver vagas e ajusta o texto do botão.
    elementos.botaoInscricao.disabled = eventoSelecionado.vagas === 0;
    elementos.botaoInscricao.textContent = elementos.botaoInscricao.disabled
        ? "Vagas esgotadas"
        : "Realizar inscrição";
    elementos.botaoInscricao.classList.toggle("botao-desativado", elementos.botaoInscricao.disabled);

    // Mostra o modal e os detalhes; esconde o formulário e uma confirmação anterior.
    elementos.detalhes.classList.remove("oculto");
    formularioInscricao.classList.add("oculto");
    mensagemConfirmacao.classList.add("oculto");
    modalEvento.classList.remove("oculto");
}

// Fecha o modal e limpa os campos preenchidos no formulário.
function fecharModal() {
    modalEvento.classList.add("oculto");
    formularioInscricao.reset();
}

// Esconde os detalhes do evento para exibir o formulário de inscrição.
function mostrarFormulario() {
    elementos.detalhes.classList.add("oculto");
    formularioInscricao.classList.remove("oculto");
}

// Esconde o formulário e volta a mostrar os detalhes do evento.
function esconderFormulario() {
    formularioInscricao.classList.add("oculto");
    elementos.detalhes.classList.remove("oculto");
}

// Valida os dados enviados, registra a inscrição e atualiza as vagas.
function confirmarInscricao(event) {
    // Impede o envio padrão do navegador, que recarregaria a página.
    event.preventDefault();

    // Para se os campos forem inválidos, não houver evento selecionado
    // ou as vagas tiverem acabado.
    if (!formularioInscricao.reportValidity() || !eventoSelecionado || eventoSelecionado.vagas === 0) return;

    // Reserva uma vaga, atualiza o modal e mostra a confirmação.
    eventoSelecionado.vagas--;
    elementos.vagas.textContent = eventoSelecionado.vagas;
    formularioInscricao.classList.add("oculto");
    mensagemConfirmacao.classList.remove("oculto");
    // Atualiza o cartão com a quantidade restante de vagas.
    filtrarEventos();
}

// Atualiza os resultados quando a pessoa digita ou troca a categoria.
pesquisa.addEventListener("input", filtrarEventos);
filtroCategoria.addEventListener("change", filtrarEventos);

// Exibe todos os eventos assim que o JavaScript é carregado.
renderizarEventos(eventos);

