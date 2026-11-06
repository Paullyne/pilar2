import { useState } from "react";
import { ClipboardCheck, BookOpen, type LucideIcon } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import PerformanceReport from "@/components/PerformanceReport";
import QuizPanel from "@/components/QuizPanel";
import StudentRegistration from "@/components/StudentRegistration";
import TheoryPanel from "@/components/TheoryPanel";
import TopicTabs from "@/components/TopicTabs";
import { StudentProvider, useStudent } from "@/context/StudentContext";
import { topics } from "@/data/topics";

type ActiveView = "teoria" | "quiz";

const views: { id: ActiveView; label: string; icon: LucideIcon }[] = [
  { id: "teoria", label: "Teoria", icon: BookOpen },
  { id: "quiz", label: "Quiz", icon: ClipboardCheck },
];

function StudyArea() {
  const { studentName, studentId, answers, isLoading } = useStudent();
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const [activeView, setActiveView] = useState<ActiveView>("teoria");
  const [showReport, setShowReport] = useState(false);

  const activeTopic = topics.find((topic) => topic.id === activeTopicId) ?? topics[0];

  const scores: Record<string, number> = {};
  for (const topic of topics) {
    const topicAnswers = answers.filter((a) => a.topicId === topic.id);
    const uniqueCorrect = new Map<number, boolean>();
    for (const answer of topicAnswers) {
      if (answer.isCorrect) {
        uniqueCorrect.set(answer.questionIndex, true);
      }
    }
    scores[topic.id] = uniqueCorrect.size;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="font-mono text-sm text-slate-500">Carregando...</p>
      </div>
    );
  }

  if (!studentId || !studentName) {
    return <StudentRegistration />;
  }

  if (showReport) {
    return <PerformanceReport onBack={() => setShowReport(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      <HeroSection studentName={studentName} onShowReport={() => setShowReport(true)} />

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <TopicTabs
          topics={topics}
          activeId={activeTopic.id}
          scores={scores}
          onSelect={(id) => {
            setActiveTopicId(id);
            setActiveView("teoria");
          }}
        />

        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit rounded-lg border border-slate-800 bg-slate-900 p-1" role="group" aria-label="Escolha entre teoria e quiz">
            {views.map((view) => {
              const Icon = view.icon;
              const isActive = view.id === activeView;
              return (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => setActiveView(view.id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive ? "bg-cyan-400 text-slate-950" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {view.label}
                </button>
              );
            })}
          </div>

          {activeView === "teoria" ? (
            <TheoryPanel key={`${activeTopic.id}-teoria`} topic={activeTopic} />
          ) : (
            <QuizPanel key={activeTopic.id} topic={activeTopic} />
          )}
        </div>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center font-mono text-xs text-slate-500">
        Pilar 2 · Lógica e Desenvolvimento de Software
      </footer>
    </div>
  );
}

function App() {
  return (
    <StudentProvider>
      <StudyArea />
    </StudentProvider>
  );
}

export default App;
