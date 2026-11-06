import { BookOpen } from "lucide-react";
import type { StudyTopic } from "@/types/study";

interface TheoryPanelProps {
  topic: StudyTopic;
}

export default function TheoryPanel({ topic }: TheoryPanelProps) {
  return (
    <article className="space-y-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300">
          <BookOpen className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-50 sm:text-2xl">{topic.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">{topic.summary}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800">
        <img
          src={topic.image}
          alt={topic.imageAlt}
          loading="lazy"
          className="h-48 w-full object-cover sm:h-64"
        />
      </div>

      {topic.theory.map((section, index) => (
        <section
          key={section.title}
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6"
        >
          <h3 className="flex items-center gap-3 text-lg font-semibold text-slate-100">
            <span className="font-mono text-sm text-cyan-400">{String(index + 1).padStart(2, "0")}</span>
            {section.title}
          </h3>
          <div className="mt-4 space-y-3">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
          {section.code && (
            <div className="mt-5">
              {section.codeCaption && (
                <p className="mb-2 font-mono text-xs text-slate-500">{section.codeCaption}</p>
              )}
              <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-sm leading-relaxed text-emerald-200">
                <code>{section.code}</code>
              </pre>
            </div>
          )}
        </section>
      ))}
    </article>
  );
}
