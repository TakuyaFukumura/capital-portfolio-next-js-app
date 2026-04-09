import Link from 'next/link';

const CAPITAL_DESCRIPTIONS = [
    {
        id: 'economic',
        name: '経済資本',
        icon: '💰',
        description: '貯蓄・投資・収入など、財務的な豊かさを表す資本。短期的な安定と長期的な資産形成を目指します。',
    },
    {
        id: 'human',
        name: '人的資本',
        icon: '🎓',
        description: 'スキル・知識・健康など、個人の能力と潜在力を表す資本。継続的な学習と成長が核心です。',
    },
    {
        id: 'cultural',
        name: '文化資本',
        icon: '🎨',
        description: '教養・審美眼・文化的経験など、感性と知性の豊かさを表す資本。多様な文化に触れることで深まります。',
    },
    {
        id: 'social',
        name: '社会関係資本',
        icon: '🤝',
        description: '人脈・信頼・コミュニティなど、社会的なつながりを表す資本。質の高い関係構築が重要です。',
    },
];

const DESIGN_PRINCIPLES = [
    {
        title: '測定可能性',
        icon: '📏',
        description: 'KPIは数値で測定できるものを選びましょう。「頑張る」ではなく「週3回」のように具体的な数値で表現します。',
    },
    {
        title: '行動ベース',
        icon: '⚡',
        description: '結果だけでなく、行動指標（アクション型）を設定しましょう。行動をコントロールすることで結果につながります。',
    },
    {
        title: '更新頻度',
        icon: '🔄',
        description: '週次・月次など、定期的に更新できる指標を選びましょう。頻度が高いほど早期に軌道修正できます。',
    },
];

const GOOD_BAD_EXAMPLES = [
    {
        capital: '経済資本',
        good: '月間貯蓄額 5万円 / 副業収入 1万円',
        bad: 'お金を貯める / 収入を増やす',
    },
    {
        capital: '人的資本',
        good: '週間学習時間 5時間 / 月次アウトプット 4本',
        bad: 'もっと勉強する / スキルアップする',
    },
    {
        capital: '文化資本',
        good: '月間読書冊数 4冊 / 美術館訪問 2回/月',
        bad: '本をたくさん読む / 文化的な活動をする',
    },
    {
        capital: '社会関係資本',
        good: '交流イベント参加 2回/月 / 新規コネクション 5人/月',
        bad: '人脈を広げる / 積極的に交流する',
    },
];

const TEMPLATES = [
    {
        capital: '経済資本',
        items: [
            {name: '月間貯蓄額', unit: '円', short: '30,000', mid: '80,000', long: '150,000'},
            {name: '投資額', unit: '円', short: '10,000', mid: '50,000', long: '200,000'},
            {name: '副業収入', unit: '円', short: '5,000', mid: '30,000', long: '100,000'},
        ],
    },
    {
        capital: '人的資本',
        items: [
            {name: '週間学習時間', unit: '時間', short: '3', mid: '7', long: '15'},
            {name: 'アウトプット数', unit: '回/月', short: '2', mid: '6', long: '12'},
            {name: '資格取得数', unit: '個/年', short: '1', mid: '2', long: '4'},
        ],
    },
    {
        capital: '文化資本',
        items: [
            {name: '読書冊数', unit: '冊/月', short: '2', mid: '4', long: '8'},
            {name: '美術館訪問回数', unit: '回/月', short: '1', mid: '2', long: '4'},
            {name: '鑑賞時間', unit: '時間/週', short: '3', mid: '8', long: '15'},
        ],
    },
    {
        capital: '社会関係資本',
        items: [
            {name: '交流イベント参加回数', unit: '回/月', short: '1', mid: '3', long: '6'},
            {name: 'メンター面談回数', unit: '回/月', short: '1', mid: '2', long: '4'},
            {name: '新規コネクション数', unit: '人/月', short: '2', mid: '5', long: '10'},
        ],
    },
];

/**
 * KPI設計ガイドページ（サーバーコンポーネント）
 */
export default function GuidePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <Link href="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    ← ダッシュボードに戻る
                </Link>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">KPI設計ガイド</h1>

            {/* 1. 資本説明 */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">資本の種類</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CAPITAL_DESCRIPTIONS.map(cap => (
                        <div key={cap.id}
                             className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">{cap.icon}</span>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{cap.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{cap.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. KPI設計原則 */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">KPI設計原則</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {DESIGN_PRINCIPLES.map(p => (
                        <div key={p.title}
                             className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
                            <div className="text-2xl mb-2">{p.icon}</div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{p.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{p.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. 良い例/悪い例 */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">良い例 / 悪い例</h2>
                <div className="space-y-4">
                    {GOOD_BAD_EXAMPLES.map(ex => (
                        <div key={ex.capital}
                             className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
                            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">{ex.capital}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                                    <div className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">✅
                                        良い例
                                    </div>
                                    <div className="text-sm text-gray-700 dark:text-gray-300">{ex.good}</div>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                                    <div className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">❌
                                        悪い例
                                    </div>
                                    <div className="text-sm text-gray-700 dark:text-gray-300">{ex.bad}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. テンプレート */}
            <section>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">KPIテンプレート</h2>
                <div className="space-y-4">
                    {TEMPLATES.map(tpl => (
                        <div key={tpl.capital}
                             className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">{tpl.capital}</h3>
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                                    <th className="text-left py-1 pr-4">KPI名</th>
                                    <th className="text-left py-1 pr-4">単位</th>
                                    <th className="text-right py-1 pr-4">短期</th>
                                    <th className="text-right py-1 pr-4">中期</th>
                                    <th className="text-right py-1">長期</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tpl.items.map(item => (
                                    <tr key={item.name}
                                        className="border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300">
                                        <td className="py-2 pr-4">{item.name}</td>
                                        <td className="py-2 pr-4 text-gray-500 dark:text-gray-400">{item.unit}</td>
                                        <td className="py-2 pr-4 text-right">{item.short}</td>
                                        <td className="py-2 pr-4 text-right">{item.mid}</td>
                                        <td className="py-2 text-right">{item.long}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
