const url = 'https://tarefasapi-b-2025.vercel.app';

const tarefas = [];
let tarefaAtual = null;

carregarTarefas();

function carregarTarefas() {
    fetch(url + '/tarefa')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar tarefas');
            }
            return response.json();
        })

        .then(data => {
            tarefas.length = 0;
            tarefas.push(...data);
            listarCards();
        })

        .catch((erro) => {
            console.log(erro);
            alert('Problemas com a conexão da API');
        });
}

function listarCards() {
    const container = document.querySelector('main');

    container.innerHTML = '';

    tarefas.forEach(tarefa => {

        const card = document.createElement('div');

        card.classList.add('card');

        card.innerHTML = `
            <h3>${tarefa.nome}</h3>
            <img src="${tarefa.img}" alt="${tarefa.nome}">
            <p>Data início: ${tarefa.dataInicio || ''}</p>
            <p>Data fim: ${tarefa.dataFim || ''}</p>
        `;

        card.onclick = () => abrirTarefa(tarefa);

        container.appendChild(card);
    });
}

function abrirTarefa(tarefa) {

    tarefaAtual = tarefa;

    tituloTarefa.innerHTML = tarefa.nome;

    nomeEdit.value = tarefa.nome;
    imgTarefa.src = tarefa.img;
    imgEdit.value = tarefa.img;

    dataInicioEdit.value = tarefa.dataInicio;
    dataFimEdit.value = tarefa.dataFim;

    descricaoEdit.value = tarefa.descricao;

    detalhes.classList.remove('oculto');
}

imgEdit.addEventListener("input", () => {
    imgTarefa.src = imgEdit.value;
});

document.querySelector('#formCad').addEventListener('submit', function (e) {

    e.preventDefault();

    const novaTarefa = {
        nome: nome.value,
        dataInicio: dataI.value,
        dataFim: dataF.value,
        descricao: descricao.value,
        img: urlImagem.value
    };

    fetch(url + '/tarefa', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(novaTarefa)
    })

        .then((res) => {

            if (!res.ok) {
                throw new Error('Erro ao salvar');
            }

            return res.json();
        })

        .then(() => {

            alert("Tarefa adicionada com sucesso!");

            cadastro.classList.add('oculto');

            carregarTarefas();

            document.querySelector('#formCad').reset();
        })

        .catch((erro) => {

            console.log(erro);

            alert("Erro ao salvar tarefa");
        });

});

function salvarEdicao() {

    const tarefaEditada = {

        nome: nomeEdit.value,

        dataInicio: dataInicioEdit.value,

        dataFim: dataFimEdit.value,

        descricao: descricaoEdit.value,

        img: imgEdit.value
    };

    fetch(url + '/tarefa/' + tarefaAtual.id, {

        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(tarefaEditada)
    })

        .then((res) => {

            if (!res.ok) {
                throw new Error('Erro ao editar');
            }

            return res.json();
        })

        .then(() => {

            alert("Tarefa editada com sucesso!");

            detalhes.classList.add('oculto');

            carregarTarefas();
        })

        .catch((erro) => {

            console.log(erro);

            alert("Erro ao editar tarefa");
        });
}

function excluirTarefaAtual() {

    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

    fetch(url + '/tarefa/' + tarefaAtual.id, {

        method: 'DELETE'
    })

        .then((res) => {

            if (!res.ok) {
                throw new Error('Erro ao excluir');
            }

            alert("Tarefa excluída com sucesso!");

            detalhes.classList.add('oculto');

            carregarTarefas();
        })

        .catch((erro) => {

            console.log(erro);

            alert("Erro ao excluir tarefa");
        });
}