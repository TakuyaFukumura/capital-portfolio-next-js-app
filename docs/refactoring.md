# リファクタリング検討ドキュメント

## 概要

本ドキュメントでは、資本ポートフォリオ管理アプリにおいて、コードの可読性・保守性・再利用性を高めるためのリファクタリング案を洗い出す。

---

## 改善候補一覧

### 1. `PERIOD_LABELS` の重複定義の解消

**対象ファイル**
- `src/app/components/DashboardClient.tsx`
- `src/app/capital/[id]/CapitalDetailClient.tsx`

**現状**
以下の同一オブジェクトが両ファイルにそれぞれ定義されている。

```ts
const PERIOD_LABELS: Record<Period, string> = {
    short: '短期',
    mid: '中期',
    long: '長期',
};
```

**改善案**
`src/app/components/constants.ts` に `PERIOD_LABELS` を移動し、両コンポーネントからインポートする形に統一する。

---

### 2. 期間タブ UI コンポーネントの共通化

**対象ファイル**
- `src/app/components/DashboardClient.tsx`
- `src/app/capital/[id]/CapitalDetailClient.tsx`

**現状**
期間切り替えタブのボタン群が、ほぼ同一の JSX として両ファイルに重複して記述されている。

**改善案**
`PeriodTabs` という共通コンポーネントを `src/app/components/` に切り出す。

```ts
// 想定インターフェース
interface PeriodTabsProps {
    period: Period;
    onChange: (period: Period) => void;
}
```

---

### 3. 達成率バーの共通化

**対象ファイル**
- `src/app/components/KpiTable.tsx`
- `src/app/capital/[id]/CapitalDetailClient.tsx`

**現状**
以下の進捗バー（プログレスバー）JSX が両ファイルに重複している。

```tsx
<div className="flex items-center gap-2">
    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 min-w-16">
        <div
            className="h-2 rounded-full bg-blue-500"
            style={{width: `${Math.round(kpi.achievement * 100)}%`}}
        />
    </div>
    <span className="text-xs text-gray-600 dark:text-gray-400 w-10 text-right">
        {Math.round(kpi.achievement * 100)}%
    </span>
</div>
```

**改善案**
`AchievementBar` という共通コンポーネントを `src/app/components/` に切り出す。

```ts
// 想定インターフェース
interface AchievementBarProps {
    achievement: number; // 0.0〜1.0
}
```

---

### 4. ストラテジー関連のカラー定数の集約

**対象ファイル**
- `src/app/components/CapitalBarChart.tsx`（`STRATEGY_BAR_COLOR`, `STRATEGY_TEXT`）
- `src/app/components/RadarChart.tsx`（`STRATEGY_FILL`, `STRATEGY_STROKE`）
- `src/app/components/constants.ts`（`STRATEGY_BADGE`, `STRATEGY_LABELS`）

**現状**
戦略タイプ（`reinforce` / `maintain` / `suppress` / `none`）に対応するカラー定義が複数ファイルに分散しており、追加・変更の際に修正箇所が増える。

**改善案**
`constants.ts` にストラテジー関連の全カラー定数を集約する。

---

### 5. `CapitalPage` における `notFound()` 呼び出しの重複排除

**対象ファイル**
- `src/app/capital/[id]/page.tsx`

**現状**
`findCapital` → `if (!cap) notFound()` のパターンが short / mid / long の 3 期間分繰り返されている。

```ts
const shortCap = findCapital(scoresByPeriod.short);
if (!shortCap) notFound();

const midCap = findCapital(scoresByPeriod.mid);
if (!midCap) notFound();

const longCap = findCapital(scoresByPeriod.long);
if (!longCap) notFound();
```

**改善案**
ヘルパー関数を用いてループ処理に置き換える、もしくは一括で検索・検証を行うロジックを導入し、コードの重複を減らす。

---

### 6. `Header.tsx` のテーマ関連ロジックの簡略化

**対象ファイル**
- `src/app/components/Header.tsx`

**現状**
`getThemeIcon()` と `getThemeLabel()` がそれぞれ if-else チェーンで実装されている。

```ts
const getThemeIcon = () => {
    if (theme === 'light') {
        return '☀️';
    } else {
        return '🌙';
    }
};
```

**改善案**
オブジェクトルックアップまたは三項演算子を用いることで、コードを簡潔に記述できる。

```ts
const THEME_ICONS: Record<Theme, string> = { light: '☀️', dark: '🌙' };
const THEME_LABELS: Record<Theme, string> = { light: 'ライトモード', dark: 'ダークモード' };
```

---

### 7. `RadarChart` の資本数への強依存の緩和

**対象ファイル**
- `src/app/components/RadarChart.tsx`

**現状**
レーダーチャートの軸角度がハードコードされており、資本数が 4 でない場合はエラー表示になる。

```ts
const angles = [-90, 0, 90, 180];

if (capitals.length !== angles.length) {
    return <div>データを表示できません（資本数: {capitals.length}）</div>;
}
```

**改善案**
資本数に応じて角度を動的に計算するよう変更し、資本の増減に柔軟に対応できるようにする。

```ts
// 例: n 個の資本に均等配置
const angles = capitals.map((_, i) => (360 / capitals.length) * i - 90);
```

---

### 8. `computeCapitalScores` の呼び出し元キャッシュ戦略の整理

**対象ファイル**
- `src/app/page.tsx`
- `src/app/capital/[id]/page.tsx`
- `src/app/api/capitals/route.ts`

**現状**
`computeCapitalScores` は各呼び出しごとにCSVファイルを読み込む。ページ・APIルートそれぞれで React の `cache()` を使って対応しているが、`cache()` の適用範囲がリクエストスコープに限られるため、サーバー起動後の初回以降も毎回ファイルI/Oが発生する。

**改善案**
- `lib/data.ts` 側でモジュールスコープのキャッシュ（例: Map やシングルトン）を導入してファイル読み込み結果を保持する案を検討する。
- ただし、データを動的に更新する要件が生じた場合は適宜キャッシュ無効化の仕組みも合わせて検討する。

---

### 9. 期間バリデーションロジックの重複排除

**対象ファイル**
- `src/app/api/capitals/route.ts`
- `lib/data.ts`（`loadGoals`, `loadStrategies`）

**現状**
有効な Period 値のリスト `['short', 'mid', 'long']` が複数箇所に散在しており、期間の種類を変更する際に複数ファイルを修正する必要がある。

**改善案**
`lib/data.ts` に定数 `VALID_PERIODS` を定義してエクスポートし、API ルートおよびデータ読み込み関数が共通の定数を参照するように統一する。

```ts
export const VALID_PERIODS: Period[] = ['short', 'mid', 'long'];
```

---

### 10. KPI テーブルのロジックと表示の分離

**対象ファイル**
- `src/app/components/KpiTable.tsx`

**現状**
`capitals.map(cap => cap.kpis.map(...))` のようにネストされたマップ処理で戦略バッジや達成率バーが混在しており、テーブル構造の把握が難しい。

**改善案**
行データの変換ロジック（データ加工）と JSX のレンダリングを分離することで可読性を向上させる。たとえばデータを先にフラットな配列へ変換してから `map` でレンダリングする、あるいは行コンポーネントを切り出す。

---

## 優先度まとめ

| # | 改善内容 | 優先度 | 理由 |
|---|----------|--------|------|
| 1 | `PERIOD_LABELS` の重複解消 | 高 | 変更時の影響範囲が広い |
| 2 | 期間タブの共通化 | 高 | 同一 UI の重複が大きい |
| 3 | 達成率バーの共通化 | 高 | 同一 UI の重複が大きい |
| 9 | 期間バリデーションの集約 | 高 | 仕様変更時のバグリスクが高い |
| 4 | ストラテジー定数の集約 | 中 | 可読性・保守性の向上 |
| 5 | `notFound()` 重複排除 | 中 | 軽微だが可読性向上に寄与 |
| 6 | Header テーマロジックの簡略化 | 低 | 機能影響なし・軽微な改善 |
| 7 | RadarChart の柔軟化 | 低 | 現状は資本数が固定のため問題なし |
| 8 | データキャッシュ戦略の整理 | 低 | パフォーマンス改善だが静的データのため影響限定的 |
| 10 | KPI テーブルのロジック分離 | 低 | 可読性向上のみ |
