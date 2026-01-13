-- skills テーブル作成
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 1 AND level <= 5),
  category TEXT NOT NULL,
  experience_months INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- サンプルデータ挿入
INSERT INTO skills (name, level, category, experience_months) VALUES
  ('Next.js', 4, 'Frontend', 24),
  ('TypeScript', 4, 'Language', 30),
  ('AWS', 3, 'Infrastructure', 18);
