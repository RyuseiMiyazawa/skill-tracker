# Skill Tracker

**🚀 Live Demo: [https://skill-tracker-mu.vercel.app](https://skill-tracker-mu.vercel.app)**

[English](#english) | [日本語](#japanese)

---

<a name="english"></a>

A full-stack skill management application built with Next.js, TypeScript, and Supabase.

## 📋 Overview

Skill Tracker is a modern CRUD application that allows users to manage their technical skills, track experience levels, and visualize their expertise with interactive charts. This project demonstrates modern web development practices and full-stack architecture.

## ✨ Features

- **Interactive Dashboard**: Beautiful charts visualizing skills by category and level
- **CRUD Operations**: Create, read, update, and delete skills
- **Data Visualization**: Chart.js powered doughnut and bar charts
- **Smooth Animations**: Framer Motion for card animations and transitions
- **Real Database**: Supabase PostgreSQL with Row Level Security
- **Modern UI**: Gradient designs, shadows, and responsive layout
- **Type Safety**: Full TypeScript coverage with Zod validation
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

| Layer          | Technology           |
|----------------|---------------------|
| Frontend       | Next.js 16 (App Router), React 19, TypeScript |
| Styling        | Tailwind CSS v4     |
| Animation      | Framer Motion       |
| Charts         | Chart.js + react-chartjs-2 |
| Validation     | Zod                 |
| API            | Next.js API Routes  |
| Database       | Supabase (PostgreSQL) |
| Deployment     | Vercel (recommended) |

## 📐 Architecture

**High-level flow:**
```
Client (Browser) → Next.js App → Supabase PostgreSQL
                 ↓
              Chart.js Visualization
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/RyuseiMiyazawa/skill-tracker.git
cd skill-tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your Supabase credentials to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Database Setup

Run the SQL in `supabase/init.sql` in your Supabase SQL Editor to create the skills table.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
skill-tracker/
├── src/
│   ├── app/
│   │   ├── api/skills/          # API routes
│   │   ├── add/                 # Add skill page
│   │   ├── edit/[id]/           # Edit skill page
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Home page with charts
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx           # Navigation header
│   │   ├── SkillList.tsx        # Animated skill cards
│   │   ├── SkillCharts.tsx      # Chart.js visualizations
│   │   └── SkillForm.tsx        # Create/edit form
│   ├── types/
│   │   └── skill.ts             # TypeScript types
│   └── lib/
│       ├── data.ts              # Supabase data layer
│       ├── supabase.ts          # Supabase client
│       └── validation.ts        # Zod schemas
├── supabase/
│   └── init.sql                 # Database schema
├── README.md
└── package.json
```

## 📡 API Endpoints

| Method | Endpoint            | Description         |
|--------|---------------------|---------------------|
| GET    | `/api/skills`       | Get all skills      |
| POST   | `/api/skills`       | Create new skill    |
| GET    | `/api/skills/:id`   | Get skill by ID     |
| PATCH  | `/api/skills/:id`   | Update skill        |
| DELETE | `/api/skills/:id`   | Delete skill        |

### Request/Response Examples

**POST /api/skills**
```json
{
  "name": "Next.js",
  "level": 4,
  "category": "Frontend",
  "experience_months": 24
}
```

**Response:**
```json
{
  "id": "1",
  "name": "Next.js",
  "level": 4,
  "category": "Frontend",
  "experience_months": 24,
  "created_at": "2024-01-13T05:00:00.000Z",
  "updated_at": "2024-01-13T05:00:00.000Z"
}
```

## 💡 Key Implementation Details

### 1. Type Safety
- Full TypeScript coverage
- Strict mode enabled
- Zod for runtime validation

### 2. API Design
- RESTful conventions
- Proper HTTP status codes
- Error handling with meaningful messages

### 3. Data Layer
- Abstracted in `lib/data.ts`
- Easy to swap for DynamoDB/Postgres
- CRUD operations separated from API logic

### 4. UI/UX
- Responsive grid layout
- Color-coded skill levels
- Loading states
- Confirmation dialogs for destructive actions

## 🔧 Future Enhancements

- [ ] Dark mode toggle
- [ ] Search and filter functionality
- [ ] Skill tags and advanced categorization
- [ ] Export data to JSON/CSV
- [ ] Authentication with NextAuth.js
- [ ] User profiles and multi-user support
- [ ] Skill progress tracking over time
- [ ] Unit and integration tests

## 🎯 Why This Project?

This project demonstrates:
- **Full-stack development**: Frontend + Backend + Database integration
- **Modern React**: App Router, Server Components, Client Components
- **Data visualization**: Interactive charts with Chart.js
- **Animation**: Smooth UX with Framer Motion
- **Type safety**: TypeScript + Zod validation
- **Database**: Supabase PostgreSQL with RLS
- **Best practices**: Clean architecture, error handling, responsive design

Perfect for showcasing in:
- **Portfolios**: Demonstrates end-to-end capability
- **Job interviews**: Shows modern stack proficiency
- **Learning**: Reference for Next.js 16 + Supabase integration

## 📝 License

ISC

---

<a name="japanese"></a>

# Skill Tracker

**🚀 ライブデモ: [https://skill-tracker-mu.vercel.app](https://skill-tracker-mu.vercel.app)**

[English](#english) | [日本語](#japanese)

---

Next.js、TypeScript、Supabaseで構築されたフルスタックスキル管理アプリケーション

## 📋 概要

Skill Trackerは、技術スキルを管理し、経験レベルを追跡し、インタラクティブなチャートで専門性を可視化できるモダンなCRUDアプリケーションです。このプロジェクトは、最新のWeb開発手法とフルスタックアーキテクチャを実証します。

## ✨ 機能

- **インタラクティブダッシュボード**: カテゴリーとレベル別にスキルを可視化する美しいチャート
- **CRUD操作**: スキルの作成、読み取り、更新、削除
- **データ可視化**: Chart.jsによるドーナツグラフと棒グラフ
- **スムーズなアニメーション**: Framer Motionによるカードアニメーションとトランジション
- **本格的なデータベース**: Row Level Securityを備えたSupabase PostgreSQL
- **モダンなUI**: グラデーションデザイン、シャドウ、レスポンシブレイアウト
- **型安全性**: TypeScript完全対応とZodバリデーション
- **レスポンシブデザイン**: モバイル対応のインターフェース

## 🛠️ 技術スタック

| レイヤー       | 技術                |
|----------------|---------------------|
| フロントエンド | Next.js 16 (App Router)、React 19、TypeScript |
| スタイリング   | Tailwind CSS v4     |
| アニメーション | Framer Motion       |
| チャート       | Chart.js + react-chartjs-2 |
| バリデーション | Zod                 |
| API            | Next.js API Routes  |
| データベース   | Supabase (PostgreSQL) |
| デプロイ       | Vercel (推奨)       |

## 📐 アーキテクチャ

**概要フロー:**
```
クライアント (ブラウザ) → Next.jsアプリ → Supabase PostgreSQL
                        ↓
                    Chart.js可視化
```

## 🚀 セットアップ

### 前提条件

- Node.js 18以上
- npmまたはyarn
- Supabaseアカウント（無料プランあり）

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/RyuseiMiyazawa/skill-tracker.git
cd skill-tracker

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.local.example .env.local
# .env.localにSupabaseの認証情報を追加

# 開発サーバーを起動
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開いてアプリを表示します。

### 環境変数

`.env.local` ファイルを作成:

```env
NEXT_PUBLIC_SUPABASE_URL=あなたのsupabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたのsupabase-anon-key
```

### データベースセットアップ

`supabase/init.sql` のSQLをSupabase SQL Editorで実行してskillsテーブルを作成します。

### 本番ビルド

```bash
npm run build
npm start
```

## 📁 プロジェクト構造

```
skill-tracker/
├── src/
│   ├── app/
│   │   ├── api/skills/          # APIルート
│   │   ├── add/                 # スキル追加ページ
│   │   ├── edit/[id]/           # スキル編集ページ
│   │   ├── layout.tsx
│   │   ├── page.tsx             # チャート付きホームページ
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx           # ナビゲーションヘッダー
│   │   ├── SkillList.tsx        # アニメーション付きスキルカード
│   │   ├── SkillCharts.tsx      # Chart.js可視化
│   │   └── SkillForm.tsx        # 作成/編集フォーム
│   ├── types/
│   │   └── skill.ts             # TypeScript型定義
│   └── lib/
│       ├── data.ts              # Supabaseデータ層
│       ├── supabase.ts          # Supabaseクライアント
│       └── validation.ts        # Zodスキーマ
├── supabase/
│   └── init.sql                 # データベーススキーマ
├── README.md
└── package.json
```

## 📡 APIエンドポイント

| メソッド | エンドポイント      | 説明                 |
|----------|---------------------|---------------------|
| GET      | `/api/skills`       | 全スキル取得        |
| POST     | `/api/skills`       | 新規スキル作成      |
| GET      | `/api/skills/:id`   | ID指定スキル取得    |
| PATCH    | `/api/skills/:id`   | スキル更新          |
| DELETE   | `/api/skills/:id`   | スキル削除          |

## 💡 主要実装ポイント

### 1. 型安全性
- TypeScript完全対応
- Strictモード有効
- Zodによる実行時バリデーション

### 2. API設計
- RESTful規約に準拠
- 適切なHTTPステータスコード
- 意味のあるエラーメッセージ

### 3. データ層
- `lib/data.ts`で抽象化
- Supabase統合
- APIロジックからCRUD操作を分離

### 4. UI/UX
- レスポンシブグリッドレイアウト
- スキルレベルの視覚化
- スムーズなアニメーション
- 破壊的操作の確認ダイアログ

## 🔧 今後の改善

- [ ] ダークモード切り替え
- [ ] 検索・フィルター機能
- [ ] スキルタグと高度なカテゴリ分類
- [ ] JSON/CSVへのデータエクスポート
- [ ] NextAuth.jsによる認証
- [ ] ユーザープロファイルとマルチユーザー対応
- [ ] 時系列でのスキル進捗追跡
- [ ] ユニットテストと統合テスト

## 🎯 このプロジェクトについて

このプロジェクトで示されること:
- **フルスタック開発**: フロントエンド + バックエンド + データベース統合
- **モダンReact**: App Router、Server Components、Client Components
- **データ可視化**: Chart.jsによるインタラクティブチャート
- **アニメーション**: Framer MotionによるスムーズなUX
- **型安全性**: TypeScript + Zodバリデーション
- **データベース**: Row Level Security付きSupabase PostgreSQL
- **ベストプラクティス**: クリーンアーキテクチャ、エラーハンドリング、レスポンシブデザイン

以下の用途に最適:
- **ポートフォリオ**: エンドツーエンドの開発能力を実証
- **就職面接**: モダンスタックの習熟度を示す
- **学習**: Next.js 16 + Supabase統合のリファレンス

## 📝 ライセンス

ISC
