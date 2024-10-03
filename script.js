'use strict';
// 1) Dado a sequência de Fibonacci, onde se inicia por 0 e 1 e o próximo valor sempre será a soma dos 2 valores anteriores (exemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...), escreva um programa na linguagem que desejar onde, informado um número, ele calcule a sequência de Fibonacci e retorne uma mensagem avisando se o número informado pertence ou não a sequência.

function fibonacciChecker(num) {
  if (num < 0)
    return `${num} não pertence à sequência de Fibonacci, pois é negativo.`;
  if (num === 0 || num === 1)
    return `${num} pertence à sequência de Fibonacci.`;

  let a = 0,
    b = 1;
  while (b < num) {
    let temp = b;
    b = a + b;
    a = temp;
  }

  if (b === num) {
    return `${num} pertence à sequência de Fibonacci.`;
  } else {
    return `${num} não pertence à sequência de Fibonacci.`;
  }
}
console.log(fibonacciChecker(10));
console.log(fibonacciChecker(2));

//2) Escreva um programa que verifique, em uma string, a existência da letra ‘a’, seja maiúscula ou minúscula, além de informar a quantidade de vezes em que ela ocorre.
function checkLetterA(str) {
  const lowerStr = str.toLowerCase();

  const count = (lowerStr.match(/a/g) || []).length;

  if (count > 0) {
    return `A letra 'a' existe na string e ocorre ${count} vez(es).`;
  } else {
    return "A letra 'a' não existe na string.";
  }
}

console.log(checkLetterA('Jogos'));
console.log(checkLetterA('abacaxi'));

//3) Observe o trecho de código abaixo: int INDICE = 12, SOMA = 0, K = 1; enquanto K < INDICE faça { K = K + 1; SOMA = SOMA + K; } imprimir(SOMA);

let indice = 12;
let soma = 0;
let k = 1;

while (k < indice) {
  k = k + 1;
  soma = soma + k;
}

console.log(`O valor da soma é : ${soma}`);

//4) Descubra a lógica e complete o próximo elemento:
//a) 1, 3, 5, 7, ___
//b) 2, 4, 8, 16, 32, 64, ____
//c) 0, 1, 4, 9, 16, 25, 36, ____
//d) 4, 16, 36, 64, ____
//e) 1, 1, 2, 3, 5, 8, ____
//f) 2,10, 12, 16, 17, 18, 19, ____

// Sequências fornecidas
const sequences = {
  a: [1, 3, 5, 7],
  b: [2, 4, 8, 16, 32, 64],
  c: [0, 1, 4, 9, 16, 25, 36],
  d: [4, 16, 36, 64],
  e: [1, 1, 2, 3, 5, 8],
  f: [2, 10, 12, 16, 17, 18, 19],
};

const nextCalculators = {
  a: seq => seq[seq.length - 1] + 2,
  b: seq => seq[seq.length - 1] * 2,
  c: seq => Math.pow(Math.sqrt(seq[seq.length - 1]) + 1, 2),
  d: seq => Math.pow(Math.sqrt(seq[seq.length - 1]) + 2, 2),
  e: seq => seq[seq.length - 1] + seq[seq.length - 2],
  f: seq => seq[seq.length - 1] + 1,
};

Object.keys(sequences).forEach(key => {
  const nextNumber = nextCalculators[key](sequences[key]);
  console.log(`${key}) Próximo número: ${nextNumber}`);
});

//5) Você está em uma sala com três interruptores, cada um conectado a uma lâmpada em salas diferentes. Você não pode ver as lâmpadas da sala em que está, mas pode ligar e desligar os interruptores quantas vezes quiser. Seu objetivo é descobrir qual interruptor controla qual lâmpada. Como você faria para descobrir, usando apenas duas idas até uma das salas das lâmpadas, qual interruptor controla cada lâmpada?

// Estado inicial das lâmpadas (false = desligada, true = ligada)
let lamps = [false, false, false]; // Cada índice representa uma lâmpada

// Função para ligar/desligar lâmpadas
function switchLamp(lampIndex, state) {
  lamps[lampIndex] = state;
}

// Função para embaralhar um array (aleatoriedade)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Estratégia para descobrir qual interruptor controla qual lâmpada
function findLampsSwitch() {
  let associations = {}; // Armazena as associações entre interruptores e lâmpadas

  // Embaralha a ordem dos interruptores e das lâmpadas para aleatoriedade
  let switches = shuffle(['Interruptor 1', 'Interruptor 2', 'Interruptor 3']);
  let rooms = shuffle(['Sala A', 'Sala B', 'Sala C']);

  console.log('Ordem aleatória dos interruptores:', switches);
  console.log('Ordem aleatória das salas:', rooms);

  // Passo 1: Ligue o Interruptor 1 e o Interruptor 2 temporariamente
  switchLamp(0, true); // Interruptor 1 ligado (deixa ligado)

  // Primeira ida a uma sala (exemplo: vamos à primeira sala aleatória)
  if (lamps[rooms.indexOf('Sala A')]) {
    associations['Sala A'] = switches[0]; // Se a lâmpada está acesa, é controlada pelo Interruptor 1
  } else {
    // Se está apagada, é controlada pelo Interruptor 2 ou 3
    associations['Sala A'] = switches[1] + ' ou ' + switches[2];
  }

  // Segunda ida: agora vamos para a próxima sala aleatória
  if (lamps[rooms.indexOf('Sala B')]) {
    associations['Sala B'] = switches[0]; // Se a lâmpada está acesa, é controlada pelo Interruptor 1
  } else {
    // Se está apagada, é controlada pelo Interruptor 2 ou 3
    associations['Sala B'] = switches[1] + ' ou ' + switches[2];
  }

  // A última sala é a que resta, e associamos corretamente
  associations['Sala C'] = switches[2]; // Se foi eliminada, sabemos que é o Interruptor 3

  return associations; // Retorna a associação final
}

// Execução do código
let resultado = findLampsSwitch();
console.log('Associações entre salas e interruptores:', resultado);
