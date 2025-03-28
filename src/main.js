import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


document.querySelector('#app').innerHTML = /*html*/`
  
  <div class="menu">
    <h1>Busca por moedas</h1>
    <h3>Dados atualizados a cada 30 segundos</h3>
    <button onclick="bitcoin()">Bitcoin</button>
    <button onclick="dolar()">Dólar</button>
    <button onclick="euro()">Euro</button>
  </div>
  <div id="container"></div>
`
let moedaAtual = ""; // Armazena a moeda que está sendo exibida

function toggleContainer(moeda) {
  let container = document.getElementById("container");

  if (moedaAtual === moeda) {
    // Se clicar na mesma moeda, esconde o container
    container.style.display = "none";
    moedaAtual = "";
    return false;
  } else {
    // Se for uma moeda diferente, apenas atualiza o valor de moedaAtual
    moedaAtual = moeda;
    return true;
  }
}

window.dolar = async function () {
  if (!toggleContainer("dolar")) return;

  try {
    let resposta = await fetch("https://economia.awesomeapi.com.br/json/last/USD");
    let dolar = await resposta.json();

    const { USDBRL: { code, name, create_date, ask, pctChange } } = dolar;

    let resultado = /*html*/`
      <h2>${name}</h2>
      <p><strong>Código:</strong> ${code}</p>
      <p><strong>Data:</strong> ${create_date}</p>
      <p><strong>Preço:</strong> R$ ${parseFloat(ask).toFixed(2)}</p>
      <p><strong>Variação percentual:</strong> ${parseFloat(pctChange).toFixed(2)}%</p>
    `;

    let container = document.getElementById("container");
    container.innerHTML = resultado;
    container.style.display = "block";
  } catch (erro) {
    document.getElementById("container").innerHTML = "Erro ao buscar os dados.";
    document.getElementById("container").style.display = "block";
  }
};

window.bitcoin = async function () {
  if (!toggleContainer("bitcoin")) return;

  try {
    let resposta = await fetch("https://economia.awesomeapi.com.br/json/last/BTC-BRL");
    let bitcoin = await resposta.json();

    const { BTCBRL: { code, name, create_date, ask, pctChange } } = bitcoin;

    let resultado = /*html*/`
      <h2>${name}</h2>
      <p><strong>Código:</strong> ${code}</p>
      <p><strong>Data:</strong> ${create_date}</p>
      <p><strong>Preço:</strong> R$ ${parseFloat(ask).toFixed(2)}</p>
      <p><strong>Variação percentual:</strong> ${parseFloat(pctChange).toFixed(2)}%</p>
    `;

    let container = document.getElementById("container");
    container.innerHTML = resultado;
    container.style.display = "block";
  } catch (erro) {
    document.getElementById("container").innerHTML = "Erro ao buscar os dados.";
    document.getElementById("container").style.display = "block";
  }
};

window.euro = async function () {
  if (!toggleContainer("euro")) return;

  try {
    let resposta = await fetch("https://economia.awesomeapi.com.br/json/last/EUR-BRL");
    let euro = await resposta.json();

    const { EURBRL: { code, name, create_date, ask, pctChange } } = euro;

    let resultado = /*html*/`
      <h2>${name}</h2>
      <p><strong>Código:</strong> ${code}</p>
      <p><strong>Data:</strong> ${create_date}</p>
      <p><strong>Preço:</strong> R$ ${parseFloat(ask).toFixed(2)}</p>
      <p><strong>Variação percentual:</strong> ${parseFloat(pctChange).toFixed(2)}%</p>
    `;

    let container = document.getElementById("container");
    container.innerHTML = resultado;
    container.style.display = "block";
  } catch (erro) {
    document.getElementById("container").innerHTML = "Erro ao buscar os dados.";
    document.getElementById("container").style.display = "block";
  }
};
