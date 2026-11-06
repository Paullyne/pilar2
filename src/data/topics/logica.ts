import { Workflow } from "lucide-react";
import type { StudyTopic } from "@/types/study";

export const logicaTopic: StudyTopic = {
  id: "logica",
  title: "Lógica de Programação",
  discipline: "Lógica de Programação",
  summary: "Variáveis, operadores, decisões e repetições: a base de todo programa.",
  icon: Workflow,
  image: "https://images.pexels.com/photos/2061168/pexels-photo-2061168.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  imageAlt: "Código colorido em uma tela de computador.",
  theory: [
    {
      title: "Variáveis e tipos de dados",
      paragraphs: [
        "Uma variável é um espaço na memória que guarda um valor e recebe um nome. O tipo define que tipo de valor ela aceita.",
        "Os tipos mais comuns são: inteiro (números sem vírgula), real (números com vírgula), texto (sequência de caracteres) e lógico (verdadeiro ou falso).",
        "Antes de usar uma variável, é preciso declará-la. Em pseudocódigo, usamos o sinal <- para atribuir um valor; em Java, usamos o sinal =.",
      ],
      code: `// Pseudocodigo
inteiro idade <- 20
real altura <- 1.75
texto nome <- "Ana"
logico aprovado <- verdadeiro

// Java
int idade = 20;
double altura = 1.75;
String nome = "Ana";
boolean aprovado = true;`,
      codeCaption: "Declaração de variáveis em pseudocódigo e em Java.",
    },
    {
      title: "Operadores",
      paragraphs: [
        "Operadores aritméticos fazem contas: + (soma), - (subtração), * (multiplicação), / (divisão) e % (resto da divisão).",
        "Operadores relacionais comparam valores e resultam em verdadeiro ou falso: == (igual), != (diferente), >, <, >= e <=.",
        "Operadores lógicos combinam condições: E (ambas verdadeiras), OU (pelo menos uma verdadeira) e NÃO (inverte o valor). A ordem de avaliação segue: parênteses, aritméticos, relacionais e, por último, lógicos.",
      ],
      code: `int a = 10, b = 3;
boolean maior = (a > b);            // verdadeiro
boolean ambos = (a > b) && (b > 0); // verdadeiro
int resto = a % b;                  // 1 (10 dividido por 3 da 3 e sobra 1)`,
      codeCaption: "Operadores relacionais, lógicos e o resto da divisão em Java.",
    },
    {
      title: "Estruturas de decisão",
      paragraphs: [
        "A estrutura se/senão (if/else) executa um bloco de código somente quando uma condição é verdadeira. Se a condição for falsa, o bloco do senão é executado.",
        "Use senão se (else if) quando há mais de dois caminhos possíveis.",
      ],
      code: `// Pseudocodigo
se (nota >= 7) {
  escreva("Aprovado")
} senao se (nota >= 5) {
  escreva("Recuperacao")
} senao {
  escreva("Reprovado")
}

// Java
if (nota >= 7) {
  System.out.println("Aprovado");
} else if (nota >= 5) {
  System.out.println("Recuperacao");
} else {
  System.out.println("Reprovado");
}`,
      codeCaption: "Estrutura de decisão com três caminhos.",
    },
    {
      title: "Estruturas de repetição",
      paragraphs: [
        "O laço para (for) repete um bloco um número conhecido de vezes, usando um contador. O laço enquanto (while) repete enquanto a condição for verdadeira, e por isso precisa de algo que a torne falsa em algum momento.",
        "Um acumulador é uma variável que guarda somas parciais dentro de um laço. Abaixo, somamos os números de 1 a 5.",
      ],
      code: `// Pseudocodigo
soma <- 0
para i de 1 ate 5 faca
  soma <- soma + i
fim_para
escreva(soma)  // imprime 15

// Java
int soma = 0;
for (int i = 1; i <= 5; i++) {
  soma += i;
}
System.out.println(soma); // imprime 15`,
      codeCaption: "Laço de repetição com acumulador somando de 1 a 5.",
    },
  ],
  questions: [
    {
      question: "Qual tipo de dado é o mais adequado para guardar apenas 'verdadeiro' ou 'falso'?",
      options: ["Inteiro", "Real", "Texto", "Lógico"],
      correctIndex: 3,
      explanation: "O tipo lógico (boolean) armazena somente dois valores: verdadeiro ou falso.",
      difficulty: "facil",
    },
    {
      question: "Qual é o resultado da expressão 17 % 5?",
      options: ["3", "2", "5", "3.4"],
      correctIndex: 1,
      explanation: "O operador % devolve o resto da divisão. 17 dividido por 5 dá 3 e sobra 2.",
      difficulty: "facil",
    },
    {
      question: "Com idade = 16 e tem_cadastro = verdadeiro, qual o valor de (idade >= 18) E tem_cadastro?",
      options: ["Verdadeiro", "Falso", "16", "Erro de execução"],
      correctIndex: 1,
      explanation: "(16 >= 18) é falso. Falso E verdadeiro resulta em falso, pois o E exige que as duas condições sejam verdadeiras.",
      difficulty: "medio",
    },
    {
      question: "Analise o código abaixo. Qual valor é impresso ao final?",
      code: `int soma = 0;
for (int i = 1; i <= 4; i++) {
  soma += i;
}
System.out.println(soma);`,
      options: ["6", "10", "4", "24"],
      correctIndex: 1,
      explanation: "O laço soma 1 + 2 + 3 + 4, que é 10. O acumulador guarda o total a cada volta.",
      difficulty: "medio",
    },
    {
      question: "No trecho a seguir, quantas vezes a mensagem é impressa e qual o valor final de x?",
      code: `int x = 0;
while (x < 20) {
  x = x + 5;
  System.out.println("oi");
}`,
      options: [
        "3 vezes e x termina em 15",
        "4 vezes e x termina em 20",
        "5 vezes e x termina em 25",
        "O laço é infinito",
      ],
      correctIndex: 1,
      explanation: "x assume 5, 10, 15 e 20. Quando chega a 20, a condição (x < 20) vira falso e o laço para. São 4 voltas.",
      difficulty: "dificil",
    },
  ],
};
