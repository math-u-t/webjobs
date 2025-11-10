# WebJobs - 求人マッチングプラットフォーム

Vue 3 + Vite + TypeScriptを使用した求人マッチングWebアプリケーションのフロントエンド

## ✨ 特徴

- 🎨 **モダンなUI** - TailwindCSSによる美しいデザイン
- 🌙 **ダークモード** - ライト/ダークモード完全対応
- 📱 **レスポンシブ** - モバイル、タブレット、デスクトップ対応
- ⚡ **高速** - Viteによる超高速ビルド
- 🔐 **認証機能** - ログイン・新規登録
- 💼 **求人管理** - 検索、フィルタリング、投稿
- 🎯 **TypeScript** - 型安全な開発
- 📦 **状態管理** - Piniaによる効率的な状態管理

## 🛠️ 技術スタック

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Router**: Vue Router
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Icons**: Lucide Vue Next
- **Animations**: @vueuse/motion

## 📋 前提条件

- Node.js 18.x 以上
- npm または yarn

## 🚀 セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env`ファイルを編集して、必要な環境変数を設定してください：

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=WebJobs
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:5173](http://localhost:5173) を開いてください。

## 🏗️ ビルド

### プロダクションビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

## 📁 ディレクトリ構成

```
webjobs/
├── public/              # 静的ファイル
├── src/
│   ├── api/            # API クライアント
│   ├── assets/         # アセット（画像など）
│   ├── components/     # Vueコンポーネント
│   │   ├── common/     # 共通コンポーネント
│   │   ├── layout/     # レイアウトコンポーネント
│   │   ├── job/        # 求人関連コンポーネント
│   │   ├── user/       # ユーザー関連コンポーネント
│   │   └── form/       # フォームコンポーネント
│   ├── layouts/        # レイアウト
│   ├── pages/          # ページコンポーネント
│   ├── router/         # ルーティング設定
│   ├── stores/         # Pinia ストア
│   ├── styles/         # グローバルスタイル
│   ├── types/          # TypeScript型定義
│   ├── utils/          # ユーティリティ関数
│   ├── App.vue         # ルートコンポーネント
│   └── main.ts         # エントリポイント
├── index.html          # HTMLテンプレート
├── package.json        # パッケージ設定
├── tailwind.config.js  # TailwindCSS設定
├── tsconfig.json       # TypeScript設定
└── vite.config.ts      # Vite設定
```

## 🎨 主要な機能

### ページ一覧

- `/` - ホームページ
- `/jobs` - 求人一覧
- `/jobs/:id` - 求人詳細
- `/post` - 求人投稿（認証必須）
- `/profile` - プロフィール（認証必須）
- `/login` - ログイン
- `/register` - 新規登録
- `/about` - サービス概要
- `/faq` - よくある質問
- `/inquiry` - お問い合わせ
- `/devs` - 開発者向け
- `/stats` - 統計情報
- `/policy` - プライバシーポリシー
- `/terms` - 利用規約

## 🔧 開発ツール

### コード品質チェック

```bash
# ESLint
npm run lint

# TypeScript型チェック
npm run type-check
```

### コードフォーマット

```bash
npm run format
```

## 📝 コーディング規約

- **命名規則**
  - コンポーネント: PascalCase (`BaseButton.vue`)
  - ファイル: kebab-case (`api-client.ts`)
  - 変数/関数: camelCase (`userName`, `fetchData()`)

- **TypeScript**
  - strictモード有効
  - 型を明示的に定義
  - `any`の使用を避ける

- **Vue 3**
  - Composition API優先
  - `<script setup>`構文使用
  - PropとEmitの型定義

## 📄 ライセンス

MIT License

---

Made with ❤️ by WebJobs Team
