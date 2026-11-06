import { useState } from "react";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { useStudent } from "@/context/StudentContext";

export default function StudentRegistration() {
  const { registerStudent } = useStudent();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Digite seu nome completo para continuar.");
      return;
    }
    setError("");
    setSubmitting(true);
    await registerStudent(trimmed);
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-300">
          <GraduationCap className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-2xl font-bold text-slate-50">Bem-vindo aos estudos</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Pilar 2: Lógica e Desenvolvimento de Software. Digite seu nome para salvar seu progresso e receber seu relatório de desempenho ao final.
        </p>

        <label htmlFor="student-name" className="mt-6 block text-xs font-semibold uppercase tracking-wide text-slate-400">
          Seu nome
        </label>
        <input
          id="student-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ex.: Maria Silva"
          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-cyan-400"
          autoFocus
        />
        {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-300 disabled:opacity-60"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          {submitting ? "Salvando..." : "Começar a estudar"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
