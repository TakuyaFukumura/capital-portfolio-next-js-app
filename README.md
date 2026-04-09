# 資本ポートフォリオ管理アプリ

Next.js を使った個人資本ポートフォリオ管理アプリケーションです。
4種の資本（経済・人的・文化・社会関係）に対するKPI達成率を可視化し、戦略的な意思決定を支援します。

## 技術スタック

- **Next.js** - React フレームワーク（App Router を使用）
- **React** - ユーザーインターフェース構築
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **ESLint** - コード品質管理

## 機能

- 4種の資本（経済・人的・文化・社会関係）のKPI達成率を可視化
- 期間切り替え（短期・中期・長期）対応のダッシュボード
- SVGレーダーチャート・水平バーチャート・KPI一覧テーブル
- 資本詳細ページ（資本別KPI進捗・期間切り替え）
- KPI設計ガイドページ（設計原則・良い例/悪い例・KPIテンプレート）
- レスポンシブデザイン対応
- ダークモード対応（手動切替機能付き）
- TypeScript による型安全性

## データ構造

データは `public/data/` 配下のCSVファイルで管理します（データベース不使用）。

```
public/data/
├── capital.csv   # 資本定義（経済・人的・文化・社会関係）
├── kpi.csv       # KPI定義（各資本に紐づく指標）
├── goal.csv      # 目標値・現在値（期間別）
└── strategy.csv  # 戦略タイプ（reinforce/maintain/suppress）
```

## 始め方

### 前提条件

- Node.js 20.x 以上
- npm、yarn、または pnpm

### インストール

1. リポジトリをクローン：
    ```bash
    git clone https://github.com/TakuyaFukumura/capital-portfolio-next-js-app.git
    ```
    ```bash
    cd capital-portfolio-next-js-app
    ```

2. 依存関係をインストール：
    ```bash
    npm install
    ```
   または
    ```bash
    yarn install
    ```
   または
    ```bash
    pnpm install
    ```

### 開発サーバーの起動

```bash
npm run dev
```

または

```bash
yarn dev
```

または

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認してください。

### ビルドと本番デプロイ

本番用にアプリケーションをビルドする：

```bash
npm run build
```

```bash
npm start
```

または

```bash
yarn build && yarn start
```

または

```bash
pnpm build && pnpm start
```

## プロジェクト構造

```
├── lib/
│   ├── csv.ts               # CSVパーサーユーティリティ
│   └── data.ts              # データ読み込み・スコア計算ロジック
├── public/
│   └── data/
│       ├── capital.csv      # 資本定義
│       ├── kpi.csv          # KPI定義
│       ├── goal.csv         # 目標値・現在値
│       └── strategy.csv     # 戦略タイプ
├── src/
│   └── app/
│       ├── api/
│       │   ├── capitals/    # GET /api/capitals?period=short|mid|long
│       │   └── kpis/        # GET /api/kpis
│       ├── capital/[id]/    # 資本詳細ページ
│       ├── components/      # 共通コンポーネント
│       │   ├── CapitalBarChart.tsx
│       │   ├── constants.ts          # 共通定数（ラベル・バッジクラス）
│       │   ├── DarkModeProvider.tsx
│       │   ├── DashboardClient.tsx
│       │   ├── Header.tsx
│       │   ├── KpiTable.tsx
│       │   └── RadarChart.tsx
│       ├── guide/           # KPI設計ガイドページ
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx         # ダッシュボード（トップページ）
├── __tests__/               # テスト
├── package.json
├── next.config.ts
└── tsconfig.json
```

## API エンドポイント

### GET /api/capitals

資本スコア一覧を返します。

**クエリパラメータ:**

| パラメータ    | 型                          | デフォルト   | 説明 |
|----------|----------------------------|---------|----|
| `period` | `short` \| `mid` \| `long` | `short` | 期間 |

**レスポンス例:**

```json
[
  {
    "id": "economic",
    "name": "経済資本",
    "score": 0.75,
    "kpis": [...],
    "strategy": { "strategy_type": "reinforce", ... }
  }
]
```

### GET /api/kpis

KPI一覧を返します。

**レスポンス例:**

```json
[
  {
    "id": "kpi_savings",
    "capital_id": "economic",
    "name": "月間貯蓄額",
    "unit": "円",
    "type": "result"
  }
]
```

## 開発

### テスト

```bash
npm test
```

または

```bash
yarn test
```

または

```bash
pnpm test
```

#### テストの監視モード

```bash
npm run test:watch
```

#### カバレッジレポートの生成

```bash
npm run test:coverage
```

#### テストファイルの構成

- `__tests__/lib/csv.test.ts`: CSVパーサーのテスト
- `__tests__/lib/data.test.ts`: データ読み込み・スコア計算ロジックのテスト
- `__tests__/src/app/components/DarkModeProvider.test.tsx`: ダークモードProvider のテスト
- `__tests__/src/app/components/Header.test.tsx`: ヘッダーコンポーネントのテスト

### リンティング

```bash
npm run lint
```

または

```bash
yarn lint
```

または

```bash
pnpm lint
```

## CI/CD

このプロジェクトは GitHub Actions を使用した継続的インテグレーション（CI）を設定しています。

### 自動テスト

以下の条件で CI が実行されます：

- `main` ブランチへのプッシュ時
- プルリクエストの作成・更新時

CI では以下のチェックが行われます：

- ESLint による静的解析
- TypeScript の型チェック
- Jest を使用したユニットテスト
- アプリケーションのビルド検証
- Node.js 20.x での動作確認

## 自動依存関係更新（Dependabot）

このプロジェクトでは、依存関係の安全性と最新化のために [Dependabot](https://docs.github.com/ja/code-security/dependabot) を利用しています。

- GitHub Actions および npm パッケージの依存関係は**月次（月曜日 09:00 JST）**で自動チェック・更新されます。
- 更新内容は自動でプルリクエストとして作成されます。
- 詳細な設定は `.github/dependabot.yml` を参照してください。

## ポート競合

デフォルトのポート 3000 が使用中の場合：

```bash
npm run dev -- --port 3001
```
