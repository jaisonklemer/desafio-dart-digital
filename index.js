//definição dos padrões

var unidade = [
  "um",
  "dois",
  "três",
  "quatro",
  "cinco",
  "seis",
  "sete",
  "oito",
  "nove",
  "dez",
  "onze",
  "doze",
  "treze",
  "quatorze",
  "quinze",
  "dezesseis",
  "dezessete",
  "dezoito",
  "dezenove",
];

var dezena = [
  "vinte",
  "trinta",
  "quarenta",
  "cinquenta",
  "sessenta",
  "setenta",
  "oitenta",
  "noventa",
];

var centena = [
  "cento",
  "duzentos",
  "trezentos",
  "quatrocentos",
  "quinhentos",
  "seiscentos",
  "setecentos",
  "oitocentos",
  "novecentos",
];

var numerosFixos = ["cem", "mil"];

/**
 * Retornar o número por extenso
 * @param  {Number} numero Número que irá retornar em formato por extenso
 * @return {String}        String referente ao número passado por parâmetro
 */
function numeroPorExtenso(numero) {
  if (numero < 20) {
    return unidade[numero - 1];
  } else if (numero >= 20 && numero < 100) {
    // descobrir o resto para descobrir a unidade
    resto = numero % 10;

    // descobrir o index e corrigir para pegar a posição correta do array de dezenas
    index = parseInt(numero / 10) - 2;

    if (resto) {
      return dezena[index] + " e " + unidade[resto - 1];
    } else {
      return dezena[index];
    }
  } else if (numero > 100 && numero < 1000) {
    // descobrir o resto para descobrir a unidade
    resto = numero % 10;

    // descobrir o index e corrigir para pegar a posição correta do array de centenas
    index = parseInt((numero / 10).toString()[0]) - 1;

    // verificação para descobrir qual a é a dezena
    var testDezena = parseInt(numero.toString().substr(1, 2));

    //testa se a dezena é maior que 20 e possui resto
    if (testDezena > 20 && testDezena % 10) {
      return centena[index] + " e " + numeroPorExtenso(testDezena);
    } else if (testDezena > 10) {
      return centena[index] + " e " + numeroPorExtenso(testDezena);
    } else {
      return centena[index] + " e " + unidade[resto - 1];
    }
  } else if (numero == 100) {
    return numerosFixos[0];
  } else if (numero == 1000) {
    return numerosFixos[1];
  }
}

/**
 * Conta as letras de cada número, iniciando em 1 até o número passado por parâmetro
 * @param  {Number} numero A contagem irá até este número
 */
function contarLetras(numero) {
  var soma = 0;
  let numeroInicial = numero;

  while (numero > 0) {
    //retorna o numero por extenso
    var string = numeroPorExtenso(numero);

    //remove os espaços da string
    string = string.replace(/ /g, "");

    soma += string.length;

    numero--;
  }
  console.log(`Número: ${numeroInicial}\nLetras: ${soma}`);
  return soma;
}

function getRepositories() {
  var endpoint = "https://api.github.com/repositories";

 return fetch(endpoint, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

window.onload = () => {
    contarLetras(1000);
    getRepositories().then((response)=> console.log(response))
}
