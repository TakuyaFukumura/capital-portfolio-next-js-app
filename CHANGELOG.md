# Changelog

このプロジェクトのすべての変更はこのファイルに記録されます。

フォーマットは [Keep a Changelog](https://keepachangelog.com/ja/1.0.0/) に基づいており、
このプロジェクトは [Semantic Versioning](https://semver.org/lang/ja/) に従っています。

## [Unreleased]

### 追加

- CSVベースのデータ管理（public/data/capital.csv, kpi.csv, goal.csv, strategy.csv）
- lib/csv.ts: CSVパーサーユーティリティ
- lib/data.ts: データ読み込みおよびスコア計算ロジック
- src/app/api/capitals/route.ts: 資本スコア一覧APIエンドポイント（期間パラメータ対応）
- src/app/api/kpis/route.ts: KPI一覧APIエンドポイント
- src/app/components/constants.ts: 共通定数モジュール（STRATEGY_LABELS, STRATEGY_BADGE, TYPE_LABEL）
- src/app/components/DashboardClient.tsx: 期間タブ切り替えクライアントコンポーネント
- src/app/components/RadarChart.tsx: SVGベースのレーダーチャート
- src/app/components/CapitalBarChart.tsx: 水平バーチャート
- src/app/components/KpiTable.tsx: KPI一覧テーブル（達成率プログレスバー付き）
- src/app/capital/[id]/page.tsx: 資本詳細ページ
- src/app/guide/page.tsx: KPI設計ガイドページ（資本説明・設計原則・良い例悪い例・KPIテンプレート）

### 変更

- src/app/page.tsx: サーバーコンポーネントによるダッシュボードに全面刷新
- src/app/components/Header.tsx: ナビゲーションリンク（ダッシュボード・KPIガイド）を追加
- src/app/layout.tsx: メタデータを資本ポートフォリオ用に更新
- __tests__/lib/csv.test.ts（旧 database.test.ts）: SQLiteテストをCSVパーサーテストに置き換え
- lib/data.ts: CSVフィールドの実行時バリデーション追加（type/period/strategy_typeの不正値を除外）
- lib/data.ts: computeCapitalScores()をMapベースのインデックスで最適化
- README.md: アプリケーション概要・構造・APIを資本ポートフォリオ管理アプリ向けに更新

### リファクタリング

- lib/data.ts: `VALID_PERIODS` 定数を追加・エクスポートし、期間バリデーション箇所を一元化
- src/app/api/capitals/route.ts: 期間バリデーションに `isPeriod()` を使用するよう変更
- src/app/components/constants.ts: `PERIOD_LABELS`・`STRATEGY_BAR_COLOR`・`STRATEGY_TEXT`・`STRATEGY_FILL`・`STRATEGY_STROKE` を追加し、ストラテジー関連カラー定数をファイル全体で集約
- src/app/components/PeriodTabs.tsx: 期間タブUIコンポーネントを新規作成し、重複していたタブ実装を共通化
- src/app/components/AchievementBar.tsx: 達成率バーコンポーネントを新規作成し、重複していたプログレスバー実装を共通化
- src/app/components/DashboardClient.tsx: `PERIOD_LABELS` ローカル定義を削除し `PeriodTabs` を使用するよう変更
- src/app/capital/[id]/CapitalDetailClient.tsx: `PERIOD_LABELS` ローカル定義を削除し `PeriodTabs`・`AchievementBar` を使用するよう変更
- src/app/components/KpiTable.tsx: `AchievementBar` を使用するよう変更
- src/app/components/CapitalBarChart.tsx: ローカル定義のカラー定数を削除し `constants.ts` からインポートするよう変更
- src/app/components/RadarChart.tsx: ローカル定義のカラー定数を削除し `constants.ts` からインポート、資本数に応じた動的角度計算に変更
- src/app/capital/[id]/page.tsx: `notFound()` 呼び出しの重複を排除
- src/app/components/Header.tsx: `getThemeIcon()`・`getThemeLabel()` 関数をオブジェクトルックアップに簡略化

### 削除

- src/app/api/message/route.ts: SQLiteベースのメッセージAPIを削除
- lib/database.ts: SQLiteデータベース接続モジュールを削除
- better-sqlite3 / @types/better-sqlite3: SQLite依存関係を削除
- docs/refactoring.md: リファクタリング実装完了のため削除

## [0.1.0] - 2026-04-08

### 追加

- 初期リリース
