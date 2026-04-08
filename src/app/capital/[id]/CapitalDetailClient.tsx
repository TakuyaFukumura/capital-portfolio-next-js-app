'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {type CapitalWithScore, type Period, type StrategyType} from '../../../../lib/data';

interface CapitalDetailClientProps {
    dataByPeriod: Record<Period, CapitalWithScore>;
}

const PERIOD_LABELS: Record<Period, string> = {
    short: '短期',
    mid: '中期',
    long: '長期',
};

const STRATEGY_BADGE: Record<StrategyType | 'none', string> = {
    reinforce: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    maintain: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
    suppress: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    none: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
};

const STRATEGY_LABELS: Record<StrategyType | 'none', string> = {
    reinforce: '強化',
    maintain: '維持',
    suppress: '抑制',
    none: '未設定',
};

const TYPE_LABEL: Record<'action' | 'result', string> = {
    action: '行動',
    result: '結果',
};

export default function CapitalDetailClient({dataByPeriod}: CapitalDetailClientProps) {
    const [period, setPeriod] = useState<Period>('short');
    const capital = dataByPeriod[period];
    const strategy = capital.strategy?.strategy_type ?? 'none';

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <Link
                    href="/"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                    ← ダッシュボードに戻る
                </Link>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {capital.name}
                </h1>
                <span className={`px-2 py-1 rounded text-sm font-medium ${STRATEGY_BADGE[strategy]}`}>
                    {STRATEGY_LABELS[strategy]}
                </span>
            </div>

            {/* 期間タブ */}
            <div className="flex gap-2 mb-6">
                {(Object.keys(PERIOD_LABELS) as Period[]).map(p => (
                    <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                            period === p
                                ? 'bg-blue-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                        }`}
                    >
                        {PERIOD_LABELS[p]}
                    </button>
                ))}
            </div>

            {/* スコアサマリー */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">総合達成率</span>
                    <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        {Math.round(capital.score * 100)}%
                    </span>
                </div>
                <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                        className="h-3 rounded-full bg-blue-500 transition-all duration-500"
                        style={{width: `${Math.round(capital.score * 100)}%`}}
                    />
                </div>
            </div>

            {/* KPI詳細テーブル */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">KPI詳細</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">KPI名</th>
                            <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">種別</th>
                            <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">現在値</th>
                            <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">目標値</th>
                            <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">達成率</th>
                        </tr>
                        </thead>
                        <tbody>
                        {capital.kpis.map(kpi => (
                            <tr
                                key={kpi.id}
                                className="border-b border-gray-100 dark:border-gray-800"
                            >
                                <td className="py-3 px-3 text-gray-700 dark:text-gray-300">{kpi.name}</td>
                                <td className="py-3 px-3">
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                        {TYPE_LABEL[kpi.type]}
                                    </span>
                                </td>
                                <td className="py-3 px-3 text-right text-gray-700 dark:text-gray-300">
                                    {kpi.current_value.toLocaleString()} {kpi.unit}
                                </td>
                                <td className="py-3 px-3 text-right text-gray-700 dark:text-gray-300">
                                    {kpi.target_value.toLocaleString()} {kpi.unit}
                                </td>
                                <td className="py-3 px-3">
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
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
