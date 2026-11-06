import { useState } from "react";
import { CheckCircle2, ArrowRight, RotateCcw, Trophy, XCircle, Flame, Star } from "lucide-react";
import type { Difficulty, StudyTopic } from "@/types/study";
import { useStudent } from "@/context/StudentContext";

interface QuizPanelProps {
  topic: StudyTopic;
}

const difficultyConfig: Record<Difficulty, { label: string; icon: typeof Star; color: string }> = {
  facil: { label: "Fácil", icon: Star, color: "text-emerald-300 bg-emerald-400/15 border-emerald-400/30" },
  medio: { label: "Médio", icon: Flame, color: "text-amber-300 bg-amber-400/15 border-amber-400/30" },
  dificil: { label: "Difícil", icon: Flame, color: "text-rose-300 bg-rose-400/15 border-rose-400/30" },
};

export default function QuizPanel({ topic }: QuizPanelProps) {
  const { recordAnswer } = useStudent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = topic.questions.length;
  const question = topic.questions[currentIndex];
  const answered = selectedIndex !== null;
  const isLast = currentIndex === total - 1;

  const handleSelect = (optionIndex: number) => {
    if (answered) return;
    setSelectedIndex(optionIndex);
    const isCorrect = optionIndex === question.correctIndex;
    if (isCorrect) {
      setScore((previous) => previous + 1);
    }
    recordAnswer({
      topicId: topic.id,
      questionIndex: currentIndex,
      selectedIndex: optionIndex,
      isCorrect,
      difficulty: question.difficulty,
    });
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    setCurrentIndex((previous) => previous + 1);
    setSelectedIndex(null);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percentage = Math.round((score / total) * 100);
    const message =
      percentage === 100
        ? "Excelente! Você dominou este tópico."
        : percentage >= 60
          ? "Bom resultado. Revise os pontos que errou."
          : "Releia a teoria e tente novamente.";

    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
          <Trophy className="h-7 w-7" aria-hidden="true" />
        </span>
        <p className="mt-5 font-mono text-sm text-slate-400">Resultado do tópico</p>
        <p className="mt-2 text-4xl font-bold text-slate-50">
          {score}/{total}
        </p>
        <p className="mt-2 text-slate-300">{message}</p>
        <div className="mx-auto mt-6 max-w-xs rounded-lg border border-slate-700 bg-slate-950/70 p-4 text-left">
          <p className="font-mono text-xs text-slate-400">Desempenho por nível</p>
          {(["facil", "medio", "dificil"] as Difficulty[]).map((level) => {
            const levelQuestions = topic.questions.filter((q) => q.difficulty === level);
            if (levelQuestions.length === 0) return null;
            const levelCorrect = levelQuestions.reduce((acc, q) => {
              const qIndex = topic.questions.indexOf(q);
              const localCorrect = qIndex < currentIndex + (answered ? 1 : 0) && selectedIndex === q.correctIndex && q.difficulty === level;
              return acc + (localCorrect ? 1 : 0);
            }, 0);
            return (
              <p key={level} className="mt-1 flex justify-between text-sm text-slate-300">
                <span>{difficultyConfig[level].label}</span>
                <span>
                  {levelCorrect}/{levelQuestions.length}
                </span>
              </p>
            );
          })}
        </div>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-8 inline-flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-400 hover:text-cyan-300"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Refazer quiz
        </button>
      </div>
    );
  }

  const DiffIcon = difficultyConfig[question.difficulty].icon;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 sm:p-8">
      <div className="flex items-center justify-between font-mono text-xs text-slate-400">
        <span>
          Questão {currentIndex + 1} de {total}
        </span>
        <span>Acertos: {score}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all duration-500"
          style={{ width: `${((currentIndex + (answered ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <span
        className={`mt-5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs ${difficultyConfig[question.difficulty].color}`}
      >
        <DiffIcon className="h-3.5 w-3.5" aria-hidden="true" />
        {difficultyConfig[question.difficulty].label}
      </span>

      <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-100 sm:text-xl">{question.question}</h3>

      {question.code && (
        <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-sm leading-relaxed text-emerald-200">
          <code>{question.code}</code>
        </pre>
      )}

      <div className="mt-6 grid gap-3">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctIndex;
          const isSelected = index === selectedIndex;

          let style = "border-slate-700 bg-slate-950/60 text-slate-200 hover:border-cyan-400/60 hover:bg-slate-900";
          if (answered && isCorrect) {
            style = "border-emerald-400 bg-emerald-400/10 text-emerald-100";
          } else if (answered && isSelected) {
            style = "border-rose-400 bg-rose-400/10 text-rose-100";
          } else if (answered) {
            style = "border-slate-800 bg-slate-950/40 text-slate-500";
          }

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(index)}
              disabled={answered}
              className={`flex items-center gap-4 rounded-lg border px-4 py-3.5 text-left transition-all duration-200 ${style} ${
                answered ? "cursor-default" : "cursor-pointer active:scale-[0.99]"
              }`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-current font-mono text-xs">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 text-sm leading-relaxed sm:text-base">{option}</span>
              {answered && isCorrect && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />}
              {answered && isSelected && !isCorrect && <XCircle className="h-5 w-5 shrink-0 text-rose-300" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          role="status"
          className="mt-6 animate-fadeIn rounded-lg border border-slate-700 bg-slate-950/70 p-4"
        >
          <p className={`font-semibold ${selectedIndex === question.correctIndex ? "text-emerald-300" : "text-rose-300"}`}>
            {selectedIndex === question.correctIndex ? "Resposta correta!" : "Resposta incorreta."}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">{question.explanation}</p>
        </div>
      )}

      {answered && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
          >
            {isLast ? "Ver resultado" : "Próxima questão"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
