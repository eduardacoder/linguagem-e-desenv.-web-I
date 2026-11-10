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

const eventsList = document.getElementById("events-list");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const modal = document.getElementById("event-modal");
const form = document.getElementById("subscription-form");
const confirmation = document.getElementById("confirmation-message");
let eventoSelecionado;

function renderizarEventos(lista) {
    eventsList.replaceChildren();

    if (lista.length === 0) {
        eventsList.textContent = "Nenhum evento encontrado.";
        return;
    }

    lista.forEach(evento => {
        const card = document.createElement("article");
        const titulo = document.createElement("h3");
        const detalhes = document.createElement("p");
        const botao = document.createElement("button");

        card.className = "card";
        titulo.textContent = evento.titulo;
        detalhes.textContent = `${evento.categoria} | ${evento.data}, ${evento.horario} | ${evento.local} | ${evento.vagas ? `${evento.vagas} vaga(s)` : "Esgotado"}`;
        botao.className = "btn-primary";
        botao.textContent = "Ver detalhes";
        botao.addEventListener("click", () => abrirModal(evento.id));
        card.append(titulo, detalhes, botao);
        eventsList.appendChild(card);
    });
}

function filtrarEventos() {
    const texto = searchInput.value.toLowerCase();
    const categoria = categoryFilter.value;
    const filtrados = eventos.filter(evento =>
        evento.titulo.toLowerCase().includes(texto) &&
        (categoria === "todos" || evento.categoria === categoria)
    );
    renderizarEventos(filtrados);
}

function abrirModal(id) {
    eventoSelecionado = eventos.find(evento => evento.id === id);
    if (!eventoSelecionado) return;

    document.getElementById("modal-title").textContent = eventoSelecionado.titulo;
    document.getElementById("modal-desc").textContent = eventoSelecionado.descricao;
    document.getElementById("modal-date").textContent = eventoSelecionado.data;
    document.getElementById("modal-time").textContent = eventoSelecionado.horario;
    document.getElementById("modal-location").textContent = eventoSelecionado.local;
    document.getElementById("modal-vacancies").textContent = eventoSelecionado.vagas;

    const botao = document.getElementById("btn-abrir-inscricao");
    botao.disabled = eventoSelecionado.vagas === 0;
    botao.textContent = botao.disabled ? "Vagas esgotadas" : "Realizar inscrição";
    botao.classList.toggle("btn-disabled", botao.disabled);

    document.getElementById("modal-details").classList.remove("hidden");
    form.classList.add("hidden");
    confirmation.classList.add("hidden");
    modal.classList.remove("hidden");
}

function fecharModal() {
    modal.classList.add("hidden");
    form.reset();
}

function mostrarFormulario() {
    document.getElementById("modal-details").classList.add("hidden");
    form.classList.remove("hidden");
}

function esconderFormulario() {
    form.classList.add("hidden");
    document.getElementById("modal-details").classList.remove("hidden");
}

function confirmarInscricao(event) {
    event.preventDefault();
    if (!form.reportValidity() || !eventoSelecionado || eventoSelecionado.vagas === 0) return;

    eventoSelecionado.vagas--;
    document.getElementById("modal-vacancies").textContent = eventoSelecionado.vagas;
    form.classList.add("hidden");
    confirmation.classList.remove("hidden");
    filtrarEventos();
}

searchInput.addEventListener("input", filtrarEventos);
categoryFilter.addEventListener("change", filtrarEventos);
renderizarEventos(eventos);