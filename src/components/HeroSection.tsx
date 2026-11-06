import { Cpu } from "lucide-react";
import { topics } from "@/data/topics";

const disciplines = ["Lógica de Programação", "POO/Java", "Laboratório de Software"];

interface HeroSectionProps {
  studentName: string | null;
  onShowReport: () => void;
}

export default function HeroSection({ studentName, onShowReport }: HeroSectionProps) {
  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);

  return (
    <header className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs text-cyan-300">
            <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
            Pilar 2 · Lógica e Desenvolvimento de Software
          </div>
          {studentName && (
            <button
              type="button"
              onClick={onShowReport}
              className="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-400/20"
            >
              Ver meu relatório
            </button>
          )}
        </div>

        <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-slate-50 sm:text-5xl">
          Domine a lógica e a programação orientada a objetos
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Estude a teoria de cada tópico com exemplos de código e teste seus conhecimentos com questões de múltipla escolha. Você recebe a correção na hora, com explicação.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {disciplines.map((discipline) => (
            <span
              key={discipline}
              className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-slate-300"
            >
              {discipline}
            </span>
          ))}
        </div>

        <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <dt className="text-xs text-slate-400">Tópicos</dt>
            <dd className="mt-1 text-2xl font-bold text-slate-50">{topics.length}</dd>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <dt className="text-xs text-slate-400">Questões</dt>
            <dd className="mt-1 text-2xl font-bold text-slate-50">{totalQuestions}</dd>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <dt className="text-xs text-slate-400">Correção</dt>
            <dd className="mt-1 text-2xl font-bold text-cyan-300">Automática</dd>
          </div>
        </dl>
      </div>
    </header>
  );
}
