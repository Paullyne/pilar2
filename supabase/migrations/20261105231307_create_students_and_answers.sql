/*
# Create students and answers tables (single-tenant, no auth)

1. New Tables
- `students`: armazena o nome do aluno e a data de início.
  - `id` (uuid, chave primária)
  - `name` (texto, obrigatório)
  - `created_at` (timestamp)
- `answers`: registra cada resposta dada pelo aluno em um quiz.
  - `id` (uuid, chave primária)
  - `student_id` (uuid, chave estrangeira para students, com CASCADE no delete)
  - `topic_id` (texto, identifica o tópico, ex.: "logica")
  - `question_index` (inteiro, índice da questão dentro do tópico)
  - `selected_index` (inteiro, alternativa escolhida)
  - `is_correct` (booleano, se acertou)
  - `difficulty` (texto, nível: "facil", "medio", "dificil")
  - `answered_at` (timestamp)
2. Security
- RLS habilitado em ambas as tabelas.
- Concedido CRUD para `anon` e `authenticated` em ambas (app sem login).
- Políticas permissivas (USING true / WITH CHECK true) porque os dados são
  intencionalmente compartilhados — o app não tem tela de login.
3. Notas
- Como não há autenticação, o `student_id` é gerado no frontend e enviado
  explicitamente; o `DEFAULT gen_random_uuid()` apenas garante unicidade.
- Índice em `student_id` para agilizar a busca do histórico do aluno.
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON students TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_students" ON students;
CREATE POLICY "anon_select_students" ON students FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_students" ON students;
CREATE POLICY "anon_insert_students" ON students FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_students" ON students;
CREATE POLICY "anon_update_students" ON students FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_students" ON students;
CREATE POLICY "anon_delete_students" ON students FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  topic_id text NOT NULL,
  question_index int NOT NULL,
  selected_index int NOT NULL,
  is_correct boolean NOT NULL,
  difficulty text NOT NULL DEFAULT 'facil',
  answered_at timestamptz DEFAULT now()
);

ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON answers TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_answers" ON answers;
CREATE POLICY "anon_select_answers" ON answers FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_answers" ON answers;
CREATE POLICY "anon_insert_answers" ON answers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_answers" ON answers;
CREATE POLICY "anon_update_answers" ON answers FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_answers" ON answers;
CREATE POLICY "anon_delete_answers" ON answers FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_answers_student_id ON answers(student_id);
