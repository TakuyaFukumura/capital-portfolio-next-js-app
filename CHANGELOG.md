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
- src/app/components/DashboardClient.tsx: 期間タブ切り替えクライアントコンポーネント
- src/app/components/RadarChart.tsx: SVGベースのレーダーチャート
- src/app/components/CapitalBarChart.tsx: 水平バーチャート
- src/app/components/KpiTable.tsx: KPI一覧テーブル（達成率プログレスバー付き）
- src/app/capital/[id]/page.tsx: 資本詳細ページ
- src/app/guide/page.tsx: KPI設計ガイドページ（資本説明・設計原則・良い例悪い例・KPI作成フォーム・テンプレート）

### 変更

- src/app/page.tsx: サーバーコンポーネントによるダッシュボードに全面刷新
- src/app/components/Header.tsx: ナビゲーションリンク（ダッシュボード・KPIガイド）を追加
- src/app/layout.tsx: メタデータを資本ポートフォリオ用に更新
- __tests__/lib/database.test.ts: SQLiteテストをCSVパーサーテストに置き換え

### 削除

- src/app/api/message/route.ts: SQLiteベースのメッセージAPIを削除

## [0.1.0] - 2026-04-08

### 追加

- 初期リリース
