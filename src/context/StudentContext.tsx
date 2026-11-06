import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { AnswerRecord, Difficulty } from "@/types/study";

interface StoredAnswer extends AnswerRecord {
  answeredAt: string;
}

interface StudentContextValue {
  studentId: string | null;
  studentName: string | null;
  isLoading: boolean;
  answers: StoredAnswer[];
  registerStudent: (name: string) => Promise<void>;
  recordAnswer: (answer: AnswerRecord) => Promise<void>;
  resetProgress: () => Promise<void>;
}

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

const STORAGE_ID_KEY = "pilar2_student_id";
const STORAGE_NAME_KEY = "pilar2_student_name";

export function StudentProvider({ children }: { children: ReactNode }) {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [answers, setAnswers] = useState<StoredAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAnswers = useCallback(async (id: string) => {
    const { data, error } = await supabase
      .from("answers")
      .select("topic_id, question_index, selected_index, is_correct, difficulty, answered_at")
      .eq("student_id", id)
      .order("answered_at", { ascending: true });

    if (error) return;

    const stored: StoredAnswer[] = (data ?? []).map((row) => ({
      topicId: row.topic_id as string,
      questionIndex: row.question_index as number,
      selectedIndex: row.selected_index as number,
      isCorrect: row.is_correct as boolean,
      difficulty: row.difficulty as Difficulty,
      answeredAt: row.answered_at as string,
    }));
    setAnswers(stored);
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem(STORAGE_ID_KEY);
    const storedName = localStorage.getItem(STORAGE_NAME_KEY);
    if (storedId && storedName) {
      setStudentId(storedId);
      setStudentName(storedName);
      loadAnswers(storedId).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [loadAnswers]);

  const registerStudent = useCallback(
    async (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;

      const { data, error } = await supabase
        .from("students")
        .insert({ name: trimmed })
        .select("id, name")
        .single();

      if (error || !data) return;

      localStorage.setItem(STORAGE_ID_KEY, data.id);
      localStorage.setItem(STORAGE_NAME_KEY, data.name);
      setStudentId(data.id);
      setStudentName(data.name);
      setAnswers([]);
    },
    [],
  );

  const recordAnswer = useCallback(
    async (answer: AnswerRecord) => {
      if (!studentId) return;
      const { error } = await supabase.from("answers").insert({
        student_id: studentId,
        topic_id: answer.topicId,
        question_index: answer.questionIndex,
        selected_index: answer.selectedIndex,
        is_correct: answer.isCorrect,
        difficulty: answer.difficulty,
      });
      if (error) return;

      setAnswers((previous) => [
        ...previous,
        { ...answer, answeredAt: new Date().toISOString() },
      ]);
    },
    [studentId],
  );

  const resetProgress = useCallback(async () => {
    if (!studentId) return;
    await supabase.from("answers").delete().eq("student_id", studentId);
    setAnswers([]);
  }, [studentId]);

  const value = useMemo<StudentContextValue>(
    () => ({
      studentId,
      studentName,
      isLoading,
      answers,
      registerStudent,
      recordAnswer,
      resetProgress,
    }),
    [studentId, studentName, isLoading, answers, registerStudent, recordAnswer, resetProgress],
  );

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) throw new Error("useStudent deve ser usado dentro de StudentProvider");
  return context;
}
