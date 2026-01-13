# Skill Tracker

**🚀 Live Demo: [https://skill-tracker-mu.vercel.app](https://skill-tracker-mu.vercel.app)**

[English](#english) | [日本語](#japanese)

---

<a name="english"></a>

A full-stack skill management application built with Next.js, TypeScript, and Supabase.

## 📋 Overview

Skill Tracker is a modern CRUD application that allows users to manage their technical skills, track experience levels, and visualize their expertise with interactive charts. This project demonstrates modern web development practices and full-stack architecture.

## 📸 Screenshots

### Main Dashboard
[Screenshot coming soon]

### Voice Input
[Screenshot coming soon]

## ✨ Features

- **User Authentication**: Secure email/password authentication with Supabase Auth
- **AI-Powered Input**:
  - Voice-to-text skill input with Google Gemini API
  - AI chat assistant for natural language skill entry
  - Automatic skill data extraction from conversation
- **Interactive Dashboard**: Beautiful charts visualizing skills by category and level
- **CRUD Operations**: Create, read, update, and delete skills with instant updates
- **Smart Category Input**: Autocomplete with existing categories while allowing custom entries
- **Data Visualization**: Chart.js powered doughnut and bar charts
- **Smooth Animations**: Framer Motion for card animations and transitions
- **Real Database**: Supabase PostgreSQL with Row Level Security and user-specific data
- **Modern UI**:
  - Fixed header navigation
  - Gradient designs and responsive layouts
  - Optimized scroll behavior for different pages
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
| Authentication | Supabase Auth       |
| AI/Voice       | Google Gemini API, Web Speech API |
| Deployment     | Vercel              |

## 📐 Architecture

**High-level flow:**
```
Client (Browser) → Next.js App → Supabase PostgreSQL
    ↓                   ↓              ↓
Voice Input      AI Chat (Gemini)  User Auth (RLS)
    ↓                   ↓
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
GEMINI_API_KEY=your-google-gemini-api-key
```

### Database Setup

Run the SQL migrations in `supabase/` in your Supabase SQL Editor:
1. `init.sql` - Create the skills table with initial schema
2. `migrations/002_add_user_auth.sql` - Add user authentication and RLS policies

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
│   │   ├── api/
│   │   │   ├── skills/          # Skill CRUD API routes
│   │   │   │   ├── [id]/        # Individual skill operations
│   │   │   │   └── categories/  # Category autocomplete API
│   │   │   ├── chat/            # AI chat API
│   │   │   └── parse-voice/     # Voice input parsing API
│   │   ├── add/                 # Add skill page with AI chat
│   │   ├── edit/[id]/           # Edit skill page with AI chat
│   │   │   └── EditSkillClient.tsx  # Client-side edit component
│   │   ├── login/               # Authentication page
│   │   ├── settings/            # User settings page
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Home page with charts
│   │   ├── not-found.tsx        # 404 page
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx           # Fixed navigation header
│   │   ├── SkillList.tsx        # Animated skill cards
│   │   ├── SkillCharts.tsx      # Chart.js visualizations
│   │   ├── SkillForm.tsx        # Create/edit form with category autocomplete
│   │   ├── AIChat.tsx           # AI chat assistant component
│   │   ├── VoiceInput.tsx       # Voice-to-text input component
│   │   └── AuthProvider.tsx     # Authentication provider
│   ├── types/
│   │   └── skill.ts             # TypeScript types
│   └── lib/
│       ├── auth.ts              # Authentication helpers
│       ├── api.ts               # Authenticated fetch wrapper
│       ├── data.ts              # Supabase data layer
│       ├── supabase.ts          # Supabase client
│       └── validation.ts        # Zod schemas
├── supabase/
│   ├── init.sql                 # Initial database schema
│   └── migrations/              # Database migrations
│       └── 002_add_user_auth.sql
├── README.md
└── package.json
```

## 📡 API Endpoints

| Method | Endpoint                    | Description                  |
|--------|----------------------------|------------------------------|
| GET    | `/api/skills`              | Get all user's skills        |
| POST   | `/api/skills`              | Create new skill             |
| GET    | `/api/skills/:id`          | Get skill by ID              |
| PATCH  | `/api/skills/:id`          | Update skill                 |
| DELETE | `/api/skills/:id`          | Delete skill                 |
| GET    | `/api/skills/categories`   | Get user's unique categories |
| POST   | `/api/chat`                | AI chat for skill extraction |
| POST   | `/api/parse-voice`         | Parse voice input to skill   |

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
- Supabase PostgreSQL integration
- CRUD operations separated from API logic

### 4. UI/UX
- Fixed header navigation that follows scroll
- Optimized scroll behavior (fixed layouts for add/edit, scrollable home)
- Responsive grid layout
- Color-coded skill levels
- Loading states
- Confirmation dialogs for destructive actions
- Double-enter to send in AI chat
- Category autocomplete with custom entry support
- Instant UI updates after deletions

### 5. AI Integration
- Google Gemini API for natural language processing
- Voice-to-text using Web Speech API
- Context-aware chat for skill entry
- Automatic skill data extraction from conversation

### 6. Authentication & Security
- Supabase Auth with email/password
- Row Level Security (RLS) for user-specific data
- Token-based API authentication
- Secure session management

## 🔧 Future Enhancements

- [ ] Dark mode toggle
- [ ] Search and filter functionality
- [ ] Skill tags and advanced categorization
- [ ] Export data to JSON/CSV
- [ ] Skill progress tracking over time
- [ ] Unit and integration tests
- [ ] Social login (Google, GitHub)
- [ ] Public skill profile sharing
- [ ] Skill recommendations based on category
- [ ] Multi-language support

## 🎯 Why This Project?

This project demonstrates:
- **Full-stack development**: Frontend + Backend + Database integration
- **Modern React**: App Router, Server Components, Client Components
- **AI Integration**: Google Gemini API for natural language processing
- **Voice Input**: Web Speech API for voice-to-text conversion
- **Authentication**: Supabase Auth with Row Level Security
- **Data visualization**: Interactive charts with Chart.js
- **Animation**: Smooth UX with Framer Motion
- **Type safety**: TypeScript + Zod validation
- **Database**: Supabase PostgreSQL with RLS and user-specific data
- **Best practices**: Clean architecture, error handling, responsive design, security

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

## 📸 スクリーンショット

### メインダッシュボード
[スクリーンショット準備中]

### 音声入力
[スクリーンショット準備中]

## ✨ 機能

- **ユーザー認証**: Supabase Authによるメール/パスワード認証
- **AI駆動の入力**:
  - Google Gemini APIによる音声入力機能
  - 自然言語でスキルを登録できるAIチャットアシスタント
  - 会話から自動的にスキルデータを抽出
- **インタラクティブダッシュボード**: カテゴリーとレベル別にスキルを可視化する美しいチャート
- **CRUD操作**: スキルの作成、読み取り、更新、削除を即座に反映
- **スマートなカテゴリー入力**: 既存カテゴリーの自動補完とカスタム入力の両立
- **データ可視化**: Chart.jsによるドーナツグラフと棒グラフ
- **スムーズなアニメーション**: Framer Motionによるカードアニメーションとトランジション
- **本格的なデータベース**: Row Level Securityとユーザー固有データを備えたSupabase PostgreSQL
- **モダンなUI**:
  - 固定ヘッダーナビゲーション
  - グラデーションデザインとレスポンシブレイアウト
  - ページごとに最適化されたスクロール動作
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
| 認証           | Supabase Auth       |
| AI/音声        | Google Gemini API, Web Speech API |
| デプロイ       | Vercel              |

## 📐 アーキテクチャ

**概要フロー:**
```
クライアント (ブラウザ) → Next.jsアプリ → Supabase PostgreSQL
    ↓                        ↓              ↓
音声入力              AIチャット(Gemini)  ユーザー認証(RLS)
    ↓                        ↓
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
GEMINI_API_KEY=あなたのgoogle-gemini-api-key
```

### データベースセットアップ

`supabase/` のSQLマイグレーションをSupabase SQL Editorで実行します:
1. `init.sql` - 初期スキーマでskillsテーブル作成
2. `migrations/002_add_user_auth.sql` - ユーザー認証とRLSポリシー追加

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
│   │   ├── api/
│   │   │   ├── skills/          # スキルCRUD APIルート
│   │   │   │   ├── [id]/        # 個別スキル操作
│   │   │   │   └── categories/  # カテゴリー自動補完API
│   │   │   ├── chat/            # AIチャットAPI
│   │   │   └── parse-voice/     # 音声入力解析API
│   │   ├── add/                 # AIチャット付きスキル追加ページ
│   │   ├── edit/[id]/           # AIチャット付きスキル編集ページ
│   │   │   └── EditSkillClient.tsx  # クライアント側編集コンポーネント
│   │   ├── login/               # 認証ページ
│   │   ├── settings/            # ユーザー設定ページ
│   │   ├── layout.tsx
│   │   ├── page.tsx             # チャート付きホームページ
│   │   ├── not-found.tsx        # 404ページ
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx           # 固定ナビゲーションヘッダー
│   │   ├── SkillList.tsx        # アニメーション付きスキルカード
│   │   ├── SkillCharts.tsx      # Chart.js可視化
│   │   ├── SkillForm.tsx        # カテゴリー自動補完付き作成/編集フォーム
│   │   ├── AIChat.tsx           # AIチャットアシスタントコンポーネント
│   │   ├── VoiceInput.tsx       # 音声テキスト変換入力コンポーネント
│   │   └── AuthProvider.tsx     # 認証プロバイダー
│   ├── types/
│   │   └── skill.ts             # TypeScript型定義
│   └── lib/
│       ├── auth.ts              # 認証ヘルパー
│       ├── api.ts               # 認証付きfetchラッパー
│       ├── data.ts              # Supabaseデータ層
│       ├── supabase.ts          # Supabaseクライアント
│       └── validation.ts        # Zodスキーマ
├── supabase/
│   ├── init.sql                 # 初期データベーススキーマ
│   └── migrations/              # データベースマイグレーション
│       └── 002_add_user_auth.sql
├── README.md
└── package.json
```

## 📡 APIエンドポイント

| メソッド | エンドポイント                | 説明                      |
|----------|------------------------------|--------------------------|
| GET      | `/api/skills`                | ユーザーの全スキル取得     |
| POST     | `/api/skills`                | 新規スキル作成            |
| GET      | `/api/skills/:id`            | ID指定スキル取得          |
| PATCH    | `/api/skills/:id`            | スキル更新                |
| DELETE   | `/api/skills/:id`            | スキル削除                |
| GET      | `/api/skills/categories`     | ユーザーの一意なカテゴリー取得 |
| POST     | `/api/chat`                  | スキル抽出用AIチャット    |
| POST     | `/api/parse-voice`           | 音声入力からスキルを解析   |

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
- Supabase PostgreSQL統合
- APIロジックからCRUD操作を分離

### 4. UI/UX
- スクロールに追従する固定ヘッダーナビゲーション
- 最適化されたスクロール動作（追加/編集は固定レイアウト、ホームはスクロール可能）
- レスポンシブグリッドレイアウト
- 色分けされたスキルレベル
- ローディング状態
- 破壊的操作の確認ダイアログ
- AIチャットでのダブルエンター送信
- カスタム入力をサポートするカテゴリー自動補完
- 削除後の即座のUI更新

### 5. AI統合
- 自然言語処理用のGoogle Gemini API
- Web Speech APIを使った音声テキスト変換
- スキル入力のためのコンテキスト認識チャット
- 会話からの自動スキルデータ抽出

### 6. 認証とセキュリティ
- Supabase Authによるメール/パスワード認証
- ユーザー固有データのためのRow Level Security (RLS)
- トークンベースのAPI認証
- セキュアなセッション管理

## 🔧 今後の改善

- [ ] ダークモード切り替え
- [ ] 検索・フィルター機能
- [ ] スキルタグと高度なカテゴリ分類
- [ ] JSON/CSVへのデータエクスポート
- [ ] 時系列でのスキル進捗追跡
- [ ] ユニットテストと統合テスト
- [ ] ソーシャルログイン（Google、GitHub）
- [ ] 公開スキルプロフィール共有
- [ ] カテゴリーに基づくスキル推奨
- [ ] 多言語サポート

## 🎯 このプロジェクトについて

このプロジェクトで示されること:
- **フルスタック開発**: フロントエンド + バックエンド + データベース統合
- **モダンReact**: App Router、Server Components、Client Components
- **AI統合**: 自然言語処理用のGoogle Gemini API
- **音声入力**: 音声テキスト変換用のWeb Speech API
- **認証**: Row Level Securityを備えたSupabase Auth
- **データ可視化**: Chart.jsによるインタラクティブチャート
- **アニメーション**: Framer MotionによるスムーズなUX
- **型安全性**: TypeScript + Zodバリデーション
- **データベース**: RLSとユーザー固有データを備えたSupabase PostgreSQL
- **ベストプラクティス**: クリーンアーキテクチャ、エラーハンドリング、レスポンシブデザイン、セキュリティ

以下の用途に最適:
- **ポートフォリオ**: エンドツーエンドの開発能力を実証
- **就職面接**: モダンスタックの習熟度を示す
- **学習**: Next.js 16 + Supabase統合のリファレンス

## 📝 ライセンス

ISC
