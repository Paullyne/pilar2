import type { StudyTopic } from "@/types/study";

interface TopicTabsProps {
  topics: StudyTopic[];
  activeId: string;
  scores: Record<string, number>;
  onSelect: (id: string) => void;
}

export default function TopicTabs({ topics, activeId, scores, onSelect }: TopicTabsProps) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      <div role="tablist" aria-label="Tópicos de estudo" className="flex min-w-max gap-3 sm:grid sm:min-w-0 sm:grid-cols-4">
        {topics.map((topic) => {
          const isActive = topic.id === activeId;
          const score = scores[topic.id];
          const total = topic.questions.length;
          const Icon = topic.icon;

          return (
            <button
              key={topic.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(topic.id)}
              className={`group flex w-56 flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 sm:w-auto ${
                isActive
                  ? "border-cyan-400/60 bg-slate-900 shadow-[0_0_24px_-6px_rgba(34,211,238,0.5)]"
                  : "border-slate-800 bg-slate-900/50 hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-900"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    isActive ? "bg-cyan-400 text-slate-950" : "bg-slate-800 text-cyan-300"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {score !== undefined && (
                  <span className="rounded-md bg-emerald-400/15 px-2 py-0.5 font-mono text-xs text-emerald-300">
                    {score}/{total}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">{topic.title}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-slate-400">{topic.discipline}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
