import { Boxes } from "lucide-react";
import type { StudyTopic } from "@/types/study";

export const pooTopic: StudyTopic = {
  id: "poo",
  title: "POO em Java",
  discipline: "POO/Java",
  summary: "Herança, polimorfismo, encapsulamento e abstração na prática.",
  icon: Boxes,
  image: "https://images.pexels.com/photos/11035547/pexels-photo-11035547.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  imageAlt: "Pessoa segurando um adesivo com linguagens de programação.",
  theory: [
    {
      title: "Encapsulamento",
      paragraphs: [
        "Encapsulamento protege os dados de um objeto. Os atributos ficam marcados como private e só são acessados por métodos públicos, como getters e setters.",
        "Assim, a classe pode validar o que entra no objeto. Um saldo, por exemplo, nunca fica negativo se o setter recusar valores inválidos.",
      ],
      code: `public class ContaBancaria {
  private double saldo;

  public double getSaldo() {
    return saldo;
  }

  public void depositar(double valor) {
    if (valor > 0) {
      saldo += valor;
    }
  }
}`,
      codeCaption: "Atributo privado acessado apenas por métodos públicos.",
    },
    {
      title: "Herança",
      paragraphs: [
        "Herança permite que uma classe (subclasse) reaproveite atributos e métodos de outra (superclasse). Em Java usa-se a palavra extends.",
        "Use herança quando há uma relação do tipo 'é um': um Cachorro é um Animal. A subclasse ganha tudo que a superclasse tem e pode acrescentar seu próprio comportamento.",
      ],
      code: `public class Animal {
  public void respirar() {
    System.out.println("Respirando...");
  }
}

public class Cachorro extends Animal {
  public void latir() {
    System.out.println("Au au!");
  }
}

// Uso:
Cachorro c = new Cachorro();
c.respirar(); // herdado de Animal
c.latir();    // proprio de Cachorro`,
      codeCaption: "Cachorro herda o método respirar() de Animal.",
    },
    {
      title: "Sobrescrita e polimorfismo",
      paragraphs: [
        "Sobrescrita (override) acontece quando a subclasse redefine um método herdado, com o mesmo nome e os mesmos parâmetros. A anotação @Override ajuda o compilador a conferir isso.",
        "Polimorfismo significa 'muitas formas': uma referência do tipo pai pode apontar para objetos de subclasses diferentes, e cada um executa a sua própria versão do método.",
      ],
      code: `public class Animal {
  public void emitirSom() {
    System.out.println("Som generico");
  }
}

public class Cachorro extends Animal {
  @Override
  public void emitirSom() {
    System.out.println("Au au!");
  }
}

// Polimorfismo: a variavel e do tipo Animal,
// mas o objeto e um Cachorro
Animal a = new Cachorro();
a.emitirSom(); // imprime "Au au!"`,
      codeCaption: "Polimorfismo: a versão executada é a do objeto real.",
    },
    {
      title: "Abstração",
      paragraphs: [
        "Abstração foca no essencial e esconde detalhes. Uma classe abstract não pode ser instanciada diretamente: ela serve de modelo para subclasses que completam seus métodos abstratos.",
        "Interfaces definem um contrato de métodos que uma classe se compromete a implementar com implements.",
      ],
      code: `public abstract class Forma {
  public abstract double area();
}

public class Quadrado extends Forma {
  private double lado;

  public Quadrado(double lado) {
    this.lado = lado;
  }

  @Override
  public double area() {
    return lado * lado;
  }
}

// Uso:
Forma f = new Quadrado(4.0);
System.out.println(f.area()); // imprime 16.0`,
      codeCaption: "Classe abstrata Forma e subclasse concreta Quadrado.",
    },
  ],
  questions: [
    {
      question: "Qual palavra-chave indica, em Java, que uma classe herda de outra?",
      options: ["implements", "extends", "inherits", "private"],
      correctIndex: 1,
      explanation: "A palavra extends conecta a subclasse à superclasse. Já implements é usado com interfaces.",
      difficulty: "facil",
    },
    {
      question: "Por que os atributos de uma classe costumam ser declarados como private?",
      options: [
        "Para que o programa rode mais rápido",
        "Para controlar o acesso e proteger os dados (encapsulamento)",
        "Para que possam ser usados sem criar objetos",
        "Porque o Java exige isso em todas as classes",
      ],
      correctIndex: 1,
      explanation: "O private impede acesso direto de fora da classe, obrigando o uso de métodos que podem validar as alterações.",
      difficulty: "facil",
    },
    {
      question: "O que é sobrescrita (override) de método?",
      options: [
        "Apagar um método da superclasse",
        "Criar dois métodos com nomes diferentes na mesma classe",
        "Redefinir, na subclasse, um método herdado com a mesma assinatura",
        "Chamar um método que não existe",
      ],
      correctIndex: 2,
      explanation: "A subclasse fornece sua própria implementação de um método herdado, mantendo o mesmo nome e parâmetros.",
      difficulty: "medio",
    },
    {
      question: "Analise o código. Qual é a saída do trecho abaixo?",
      code: `Animal a = new Cachorro();
a.emitirSom();`,
      options: [
        "\"Som generico\"",
        "\"Au au!\"",
        "Nada, gera erro de compilação",
        "As duas mensagens ao mesmo tempo",
      ],
      correctIndex: 1,
      explanation: "Esse é o polimorfismo: a referência é do tipo Animal, mas o método executado pertence ao objeto real, que é um Cachorro.",
      difficulty: "medio",
    },
    {
      question: "No código a seguir, o que acontece ao tentar compilar e executar?",
      code: `abstract class Forma {
  public abstract double area();
}

Forma f = new Forma();`,
      options: [
        "Compila e cria um objeto com area igual a 0",
        "Gera erro, pois uma classe abstract nao pode ser instanciada diretamente",
        "Compila, mas area() retorna null",
        "Cria um objeto automaticamente com valor aleatorio",
      ],
      correctIndex: 1,
      explanation: "Classes abstract servem apenas de modelo. Para usá-las é preciso criar uma subclasse concreta que implemente o método abstrato e instanciar essa subclasse.",
      difficulty: "dificil",
    },
  ],
};
