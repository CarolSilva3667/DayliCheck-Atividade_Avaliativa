const key = "6e2f8e0443cdb621d8d248c5e78f7b56";

function colocarDadosNaTela(dados) {
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".tempo").innerHTML = Math.floor(dados.main.temp) + "ºC";
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".img-previsao").src =
        "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";
}

async function buscarCidade(cidade) {
    const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
    );

    const dados = await resposta.json();

    colocarDadosNaTela(dados);
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value;

    buscarCidade(cidade);
}