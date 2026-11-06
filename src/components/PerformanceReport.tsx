import { ArrowLeft, Download, TrendingUp, Trophy, Lightbulb } from "lucide-react";
import { topics } from "@/data/topics";
import { useStudent } from "@/context/StudentContext";
import type { Difficulty } from "@/types/study";

interface PerformanceReportProps {
  onBack: () => void;
}

const difficultyLabels: Record<Difficulty, string> = {
  facil: "Fácil",
  medio: "Médio",
  dificil: "Difícil",
};

function buildReportText(name: string, answers: ReturnType<typeof useStudent>["answers"]): string {
  const dateStr = new Date().toLocaleDateString("pt-BR");
  const lines: string[] = [];

  lines.push("============================================");
  lines.push("   RELATÓRIO DE DESEMPENHO - PILAR 2");
  lines.push("   Lógica e Desenvolvimento de Software");
  lines.push("============================================");
  lines.push("");
  lines.push(`Aluno: ${name}`);
  lines.push(`Data: ${dateStr}`);
  lines.push("");

  let totalCorrect = 0;
  let totalAnswered = 0;

  for (const topic of topics) {
    const topicAnswers = answers.filter((a) => a.topicId === topic.id);
    const topicCorrect = topicAnswers.filter((a) => a.isCorrect).length;
    totalCorrect += topicCorrect;
    totalAnswered += topicAnswers.length;

    lines.push(`--------------------------------------------`);
    lines.push(`TÓPICO: ${topic.title}`);
    lines.push(`--------------------------------------------`);
    lines.push(`Disciplina: ${topic.discipline}`);
    lines.push(`Acertos: ${topicCorrect} / ${topic.questions.length}`);
    const pct = topic.questions.length > 0 ? Math.round((topicCorrect / topic.questions.length) * 100) : 0;
    lines.push(`Aproveitamento: ${pct}%`);

    if (topicAnswers.length > 0) {
      const wrong = topicAnswers.filter((a) => !a.isCorrect);
      if (wrong.length > 0) {
        lines.push("");
        lines.push("Questões não assimiladas (revisar):");
        for (const w of wrong) {
          const q = topic.questions[w.questionIndex];
          if (!q) continue;
          lines.push(`  [${difficultyLabels[w.difficulty]}] Questão ${w.questionIndex + 1}: ${q.question}`);
          lines.push(`    Resposta correta: ${q.options[q.correctIndex]}`);
          lines.push(`    Explicação: ${q.explanation}`);
          lines.push("");
        }
      } else {
        lines.push("");
        lines.push("Parabéns! Você acertou todas as questões deste tópico.");
        lines.push("");
      }
    } else {
      lines.push("");
      lines.push("Você ainda não respondeu as questões deste tópico.");
      lines.push("");
    }
  }

  lines.push("============================================");
  lines.push("RESUMO GERAL");
  lines.push("============================================");
  lines.push(`Total de questões respondidas: ${totalAnswered}`);
  lines.push(`Total de acertos: ${totalCorrect}`);
  const overallPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  lines.push(`Aproveitamento geral: ${overallPct}%`);

  const weakTopics = topics.filter((topic) => {
    const topicAnswers = answers.filter((a) => a.topicId === topic.id);
    if (topicAnswers.length === 0) return true;
    const correct = topicAnswers.filter((a) => a.isCorrect).length;
    return correct / topic.questions.length < 0.6;
  });

  lines.push("");
  lines.push("DICAS DE ESTUDO:");
  if (weakTopics.length === 0) {
    lines.push("  Ótimo desempenho em todos os tópicos respondidos!");
    lines.push("  Continue praticando para manter o nível.");
  } else {
    lines.push("  Revise com atenção os tópicos abaixo:");
    for (const topic of weakTopics) {
      lines.push(`  - ${topic.title}: releia a teoria e refaça o quiz.`);
    }
  }
  lines.push("");

  const allWrong = answers.filter((a) => !a.isCorrect);
  const byDifficulty: Record<Difficulty, number> = { facil: 0, medio: 0, dificil: 0 };
  for (const w of allWrong) byDifficulty[w.difficulty] += 1;
  lines.push("Distribuição dos erros por nível de dificuldade:");
  lines.push(`  Fácil: ${byDifficulty.facil} erro(s)`);
  lines.push(`  Médio: ${byDifficulty.medio} erro(s)`);
  lines.push(`  Difícil: ${byDifficulty.dificil} erro(s)`);
  lines.push("");
  lines.push("============================================");
  lines.push("Bons estudos! Releia a teoria dos pontos não");
  lines.push("assimilados e refaça os quizzes.");
  lines.push("============================================");

  return lines.join("\n");
}

function downloadReport(name: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeName = name.trim().replace(/\s+/g, "_").toLowerCase();
  link.href = url;
  link.download = `relatorio_${safeName || "aluno"}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function PerformanceReport({ onBack }: PerformanceReportProps) {
  const { studentName, answers } = useStudent();

  const reportText = buildReportText(studentName ?? "Aluno", answers);

  const totalAnswered = answers.length;
  const totalCorrect = answers.filter((a) => a.isCorrect).length;
  const overallPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const topicStats = topics.map((topic) => {
    const topicAnswers = answers.filter((a) => a.topicId === topic.id);
    const correct = topicAnswers.filter((a) => a.isCorrect).length;
    const total = topic.questions.length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const answered = topicAnswers.length;
    return { topic, correct, total, pct, answered };
  });

  const weakTopics = topicStats.filter((stat) => stat.answered === 0 || stat.pct < 60);

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-cyan-300"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Voltar aos estudos
      </button>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-50 sm:text-3xl">Relatório de Desempenho</h1>
            <p className="mt-2 text-slate-400">
              Aluno: <span className="font-semibold text-slate-200">{studentName}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => downloadReport(studentName ?? "aluno", reportText)}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Baixar relatório
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300">
              <Trophy className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-3 text-xs text-slate-400">Aproveitamento geral</p>
            <p className="mt-1 text-3xl font-bold text-slate-50">{overallPct}%</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
              <TrendingUp className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-3 text-xs text-slate-400">Acertos</p>
            <p className="mt-1 text-3xl font-bold text-slate-50">
              {totalCorrect}
              <span className="text-lg text-slate-500"> / {totalAnswered}</span>
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/15 text-amber-300">
              <Lightbulb className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-3 text-xs text-slate-400">Tópicos a revisar</p>
            <p className="mt-1 text-3xl font-bold text-slate-50">{weakTopics.length}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-100">Desempenho por tópico</h2>
        {topicStats.map(({ topic, correct, total, pct, answered }) => (
          <div key={topic.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-100">{topic.title}</p>
              <span className={`font-mono text-sm ${pct >= 60 ? "text-emerald-300" : "text-rose-300"}`}>
                {answered > 0 ? `${correct}/${total} (${pct}%)` : "Não iniciado"}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ${pct >= 60 ? "bg-emerald-400" : "bg-rose-400"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            {answered > 0 && pct < 60 && (
              <p className="mt-3 text-sm text-amber-300">
                Revise a teoria deste tópico e refaça o quiz para melhorar seu aproveitamento.
              </p>
            )}
          </div>
        ))}
      </div>

      {weakTopics.length > 0 && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-amber-200">
            <Lightbulb className="h-5 w-5" aria-hidden="true" />
            Dicas de melhoria
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Concentre seus estudos nos tópicos abaixo. Releia a teoria com atenção aos exemplos de código e refaça o quiz:
          </p>
          <ul className="mt-3 space-y-1.5">
            {weakTopics.map(({ topic }) => (
              <li key={topic.id} className="flex items-center gap-2 text-sm text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                {topic.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
