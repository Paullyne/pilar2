import { Code2 } from "lucide-react";
import type { StudyTopic } from "@/types/study";

export const sintaxeTopic: StudyTopic = {
  id: "sintaxe",
  title: "Sintaxe Conceitual",
  discipline: "POO/Java",
  summary: "Classe, objeto, atributo, método, construtor e as palavras que os conectam.",
  icon: Code2,
  image: "https://images.pexels.com/photos/14553730/pexels-photo-14553730.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  imageAlt: "Código em uma tela de computador destacando sintaxe de programação.",
  theory: [
    {
      title: "Classe, objeto, atributo e método",
      paragraphs: [
        "Uma classe é o molde ou a planta de um tipo de coisa. Um objeto é uma instância concreta desse molde, criada a partir dele.",
        "Atributos guardam dados do objeto (cor, modelo). Métodos são ações que o objeto sabe executar (ligar, buzinar).",
      ],
      code: `public class Carro {        // classe
  String cor;              // atributo
  String modelo;           // atributo

  void buzinar() {         // metodo
    System.out.println("Bii!");
  }
}

Carro meuCarro = new Carro(); // objeto
meuCarro.buzinar();           // chamada de metodo`,
      codeCaption: "Classe Carro com atributos e um método, e criação de um objeto.",
    },
    {
      title: "Construtor",
      paragraphs: [
        "O construtor é um bloco especial chamado quando um objeto é criado. Ele tem o mesmo nome da classe e não tem tipo de retorno. Sua função é inicializar os atributos.",
        "A palavra new reserva espaço na memória para o objeto e em seguida chama o construtor.",
      ],
      code: `public class Carro {
  String cor;

  public Carro(String cor) {
    this.cor = cor;
  }
}

Carro c = new Carro("azul");
System.out.println(c.cor); // imprime "azul"`,
      codeCaption: "Construtor recebendo um parâmetro e inicializando o atributo cor.",
    },
    {
      title: "this e extends",
      paragraphs: [
        "A palavra this se refere ao próprio objeto em execução. É útil para diferenciar um atributo de um parâmetro com o mesmo nome.",
        "A palavra extends indica herança. Combinada com @Override, marca um método que foi sobrescrito na subclasse.",
      ],
      code: `public class Veiculo {
  int velocidade;

  public void acelerar() {
    velocidade += 10;
  }
}

public class Moto extends Veiculo {
  @Override
  public void acelerar() {
    this.velocidade += 20; // this refere-se a esta Moto
  }
}`,
      codeCaption: "Uso de this dentro de um método sobrescrito em uma subclasse.",
    },
  ],
  questions: [
    {
      question: "Em 'class Carro { String cor; void buzinar() {} }', o que é 'cor'?",
      options: ["Um método", "Um objeto", "Um atributo", "Uma classe"],
      correctIndex: 2,
      explanation: "Cor é um dado guardado pelo objeto, portanto é um atributo. Buzinar é uma ação, ou seja, um método.",
      difficulty: "facil",
    },
    {
      question: "Qual é a principal característica do construtor de uma classe?",
      options: [
        "Tem nome diferente da classe e retorna um número",
        "Tem o mesmo nome da classe e não tem tipo de retorno",
        "Deve sempre se chamar main",
        "Só pode existir um por programa",
      ],
      correctIndex: 1,
      explanation: "O construtor usa o nome exato da classe e não declara tipo de retorno. Ele é chamado automaticamente na criação do objeto.",
      difficulty: "facil",
    },
    {
      question: "No comando 'Carro c = new Carro();', o que a palavra new faz?",
      options: [
        "Apaga o objeto anterior",
        "Declara uma nova classe",
        "Reserva memória para um novo objeto e chama o construtor",
        "Imprime o objeto na tela",
      ],
      correctIndex: 2,
      explanation: "O new cria a instância: aloca memória e executa o construtor para inicializar seus atributos.",
      difficulty: "medio",
    },
    {
      question: "Analise o trecho. Qual é o valor impresso?",
      code: `public class Carro {
  String cor;
  public Carro(String cor) {
    this.cor = cor;
  }
}

Carro c = new Carro("vermelho");
System.out.println(c.cor);`,
      options: ["\"azul\"", "\"vermelho\"", "null", "Gera erro de compilação"],
      correctIndex: 1,
      explanation: "O construtor recebe \"vermelho\" e atribui ao atributo cor usando this. Logo, c.cor vale \"vermelho\".",
      difficulty: "medio",
    },
    {
      question: "No código abaixo, qual é o valor final de velocidade?",
      code: `public class Veiculo {
  int velocidade = 0;
  public void acelerar() { velocidade += 10; }
}

public class Moto extends Veiculo {
  @Override
  public void acelerar() { velocidade += 20; }
}

Moto m = new Moto();
m.acelerar();
m.acelerar();`,
      options: ["20", "40", "10", "30"],
      correctIndex: 1,
      explanation: "A sobrescrita faz acelerar somar 20 (e não 10). Chamado duas vezes: 0 + 20 + 20 = 40.",
      difficulty: "dificil",
    },
  ],
};
