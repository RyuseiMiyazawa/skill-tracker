-- スキルテーブルにuser_idカラムを追加
ALTER TABLE skills ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 既存のRLSポリシーを削除
DROP POLICY IF EXISTS "Enable read access for all users" ON skills;
DROP POLICY IF EXISTS "Enable insert for all users" ON skills;
DROP POLICY IF EXISTS "Enable update for all users" ON skills;
DROP POLICY IF EXISTS "Enable delete for all users" ON skills;

-- ユーザー別のRLSポリシーを作成
CREATE POLICY "Users can view own skills"
  ON skills FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skills"
  ON skills FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skills"
  ON skills FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own skills"
  ON skills FOR DELETE
  USING (auth.uid() = user_id);
