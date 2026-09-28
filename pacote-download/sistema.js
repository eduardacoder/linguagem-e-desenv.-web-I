function criarAlunos() {
    let q = quantidade.value;

    alunos.innerHTML = `
    <span>Aluno</span>
    <span>N1</span>
    <span>N2</span>
    <span>N3</span>
    <span>N4</span>
    `;
    for (let i = 1; i <= q; i++){
        alunos.innerHTML += `
            <p>
                <input id="nome${i}">
                <input id="n1${i}" type="number">
                <input id="n2${i}" type="number">
                <input id="n3${i}" type="number">
                <input id="n4${i}" type="number">
                <span id="res${i}"></span>
            </p>
        `;}

    alunos.innerHTML += "<button onclick='calcular()'>Calcular</button>";
}

function calcular() {
    let q = quantidade.value;
    let a = 0, f = 0, r = 0, soma = 0;

    for (let i = 1; i <= q; i++) {

        let media = (
            Number(document.getElementById("n1" + i).value) +
            2 * Number(document.getElementById("n2" + i).value) +
            3 * Number(document.getElementById("n3" + i).value) +
            4 * Number(document.getElementById("n4" + i).value)
        ) / 10;

        let situacao;

        if (media >= 6) {
            situacao = "Aprovado";
            a++;
        } else if (media >= 3) {
            situacao = "Final";
            f++;
        } else {
            situacao = "Reprovado";
            r++;
        }

        soma += media;
        document.getElementById("res" + i).innerHTML =
            ` Média: ${media.toFixed(2)} - ${situacao}`;
    }

    resultado.innerHTML = `
        <h3>Relatório Final</h3>
        Aprovados: ${a}<br>
        Finais: ${f}<br>
        Reprovados: ${r}<br>
        Média geral: ${(soma / q).toFixed(2)}

    `;
}
