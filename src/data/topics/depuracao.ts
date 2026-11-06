import { Bug } from "lucide-react";
import type { StudyTopic } from "@/types/study";

export const depuracaoTopic: StudyTopic = {
  id: "depuracao",
  title: "Depuração",
  discipline: "Laboratório de Software",
  summary: "Leia erros, teste hipóteses, use breakpoints e valide entradas.",
  icon: Bug,
  image: "https://images.pexels.com/photos/34804018/pexels-photo-34804018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  imageAlt: "Tela de computador com ferramentas de depuração de código.",
  theory: [
    {
      title: "Lendo mensagens de erro",
      paragraphs: [
        "A mensagem de erro informa o tipo do problema, o arquivo e a linha onde ele aconteceu. Comece sempre pela primeira linha da mensagem e pela linha indicada.",
        "NullPointerException significa que você tentou usar um objeto que está vazio (null). ArithmeticException com a mensagem '/ by zero' indica divisão por zero. ArrayIndexOutOfBoundsException indica que você acessou uma posição que não existe em uma lista ou vetor.",
      ],
      code: `Exception in thread "main" java.lang.ArithmeticException: / by zero
    at Calculadora.dividir(Calculadora.java:12)
    at Main.main(Main.java:5)

// Linha 12 de Calculadora.java faz uma divisao por zero.
// Corrija checando o divisor antes de dividir.`,
      codeCaption: "Leitura de uma mensagem de erro: tipo, arquivo e linha.",
    },
    {
      title: "Testando hipóteses",
      paragraphs: [
        "Depurar é um método científico: observe o comportamento, formule uma hipótese sobre a causa, teste essa hipótese e conclua.",
        "Reproduzir o erro de forma consistente é o primeiro passo. Depois, imprima valores em pontos-chave para confirmar o que está de fato acontecendo.",
      ],
      code: `int total = calcularTotal(itens);
System.out.println("total intermediario = " + total);
// Se o total estiver errado aqui, o problema
// esta na funcao calcularTotal, nao depois dela.`,
      codeCaption: "Impressão de valores intermediários para confirmar uma hipótese.",
    },
    {
      title: "Breakpoints",
      paragraphs: [
        "Um breakpoint é um marcador colocado em uma linha do código. Quando a execução chega nele, o programa pausa e permite inspecionar o valor de cada variável.",
        "Com os comandos de avançar (step over) e entrar (step into), você percorre o código linha a linha e vê como os valores mudam.",
      ],
      code: `public void processar(int[] numeros) {
  int soma = 0;           // <-- breakpoint aqui
  for (int n : numeros) {
    soma += n;
  }
  System.out.println(soma);
}`,
      codeCaption: "Ponto ideal para um breakpoint: antes do laço, para inspecionar a entrada.",
    },
    {
      title: "Validando entradas",
      paragraphs: [
        "Dados vindos do usuário nem sempre são confiáveis. Validar entradas significa checar se o valor faz sentido antes de usá-lo, por exemplo, verificar se uma idade não é negativa.",
      ],
      code: `if (idade < 0) {
  System.out.println("Idade invalida");
  return;
}

// Depois de validar, o programa pode prosseguir
// sabendo que idade e um valor aceitavel.`,
      codeCaption: "Validação de entrada antes de usar o valor.",
    },
  ],
  questions: [
    {
      question: "O que significa uma NullPointerException?",
      options: [
        "A conta resultou em número muito grande",
        "Foi feita uma tentativa de usar um objeto que está vazio (null)",
        "O arquivo não foi encontrado no disco",
        "O código tem um erro de digitação",
      ],
      correctIndex: 1,
      explanation: "Quando a variável não aponta para nenhum objeto, usar um método ou atributo dela gera NullPointerException.",
      difficulty: "facil",
    },
    {
      question: "A mensagem '/ by zero' em uma ArithmeticException indica que:",
      options: [
        "O resultado é zero",
        "Houve uma divisão por zero",
        "Uma variável não foi declarada",
        "O laço ficou infinito",
      ],
      correctIndex: 1,
      explanation: "Dividir qualquer número por zero é impossível matematicamente, e o Java sinaliza o erro com essa mensagem.",
      difficulty: "facil",
    },
    {
      question: "Para que serve um breakpoint durante a depuração?",
      options: [
        "Para apagar a linha com erro automaticamente",
        "Para pausar a execução naquela linha e inspecionar as variáveis",
        "Para reiniciar o computador",
        "Para formatar o código com indentação",
      ],
      correctIndex: 1,
      explanation: "O breakpoint interrompe o programa no ponto marcado, permitindo ver o valor atual de cada variável.",
      difficulty: "medio",
    },
    {
      question: "Qual é o primeiro passo mais adequado ao encontrar um bug?",
      options: [
        "Reescrever o programa inteiro do zero",
        "Ignorar a mensagem de erro e continuar programando",
        "Reproduzir o erro e formular uma hipótese sobre a causa",
        "Apagar a linha indicada pelo erro",
      ],
      correctIndex: 2,
      explanation: "Reproduzir o problema e formular uma hipótese guia a investigação e evita mudanças aleatórias que criam novos bugs.",
      difficulty: "medio",
    },
    {
      question: "Analise o código. O que acontece ao executá-lo?",
      code: `int[] vetor = new int[3];
vetor[0] = 10;
vetor[1] = 20;
vetor[2] = 30;
System.out.println(vetor[3]);`,
      options: [
        "Imprime 30",
        "Imprime 0",
        "Gera uma ArrayIndexOutOfBoundsException, pois a posição 3 não existe",
        "Cria automaticamente uma posição nova no vetor",
      ],
      correctIndex: 2,
      explanation: "Um vetor de tamanho 3 tem posições 0, 1 e 2. Acessar vetor[3] está fora dos limites e dispara ArrayIndexOutOfBoundsException.",
      difficulty: "dificil",
    },
  ],
};
