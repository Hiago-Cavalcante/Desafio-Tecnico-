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

class Lampada {
  constructor(nome) {
    this.nome = nome;
    this.estado = 'desligada';
    this.tempoLigada = 0;
  }

  ligar() {
    this.estado = 'ligada';
  }

  desligar() {
    this.estado = 'desligada';
  }

  passarTempo() {
    if (this.estado === 'ligada') {
      this.tempoLigada++;
    }
  }

  verificar() {
    if (this.estado === 'ligada') return 'ligada';
    if (this.tempoLigada > 0) return 'quente';
    return 'fria';
  }
}

class Enigma {
  constructor() {
    this.lampadas = [new Lampada('A'), new Lampada('B'), new Lampada('C')];
    this.interruptores = ['1', '2', '3'];
    this.visitas = 0;
  }

  acionarInterruptor(numero) {
    const indice = parseInt(numero) - 1;
    if (this.lampadas[indice].estado === 'ligada') {
      this.lampadas[indice].desligar();
      console.log(`Interruptor ${numero} desligado.`);
    } else {
      this.lampadas[indice].ligar();
      console.log(`Interruptor ${numero} ligado.`);
    }
  }

  passarTempo() {
    this.lampadas.forEach(lampada => lampada.passarTempo());
    console.log('Algum tempo se passou...');
  }

  visitarSala(sala) {
    if (this.visitas >= 2) {
      console.log('Você já visitou a sala duas vezes. O enigma terminou.');
      return;
    }
    this.visitas++;
    console.log(`Visita ${this.visitas} à sala ${sala}:`);
    console.log(
      `Lâmpada ${this.lampadas[sala - 1].nome}: ${this.lampadas[
        sala - 1
      ].verificar()}`
    );
  }

  terminarEnigma() {
    console.log('Resolver o enigma:');
    this.lampadas.forEach((lampada, index) => {
      console.log(
        `Lâmpada ${lampada.nome} corresponde ao interruptor ${this.interruptores[index]}.`
      );
    });
  }
}

const enigma = new Enigma();

enigma.acionarInterruptor('1');
enigma.passarTempo();
enigma.acionarInterruptor('1');
enigma.acionarInterruptor('2');
enigma.visitarSala(1);
enigma.visitarSala(2);
enigma.terminarEnigma();
