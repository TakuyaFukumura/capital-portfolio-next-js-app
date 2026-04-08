'use client';

import React, {useState} from 'react';
import {type CapitalWithScore, type Period, type StrategyType} from '../../../lib/data';
import RadarChart from './RadarChart';
import CapitalBarChart from './CapitalBarChart';
import KpiTable from './KpiTable';

interface DashboardClientProps {
    dataByPeriod: Record<Period, CapitalWithScore[]>;
}

const PERIOD_LABELS: Record<Period, string> = {
    short: '短期',
    mid: '中期',
    long: '長期',
};

export const STRATEGY_COLORS: Record<StrategyType | 'none', string> = {
    reinforce: 'bg-blue-500',
    maintain: 'bg-gray-400',
    suppress: 'bg-orange-500',
    none: 'bg-purple-500',
};

export const STRATEGY_TEXT_COLORS: Record<StrategyType | 'none', string> = {
    reinforce: 'text-blue-600',
    maintain: 'text-gray-500',
    suppress: 'text-orange-600',
    none: 'text-purple-600',
};

export const STRATEGY_LABELS: Record<StrategyType | 'none', string> = {
    reinforce: '強化',
    maintain: '維持',
    suppress: '抑制',
    none: '未設定',
};

export default function DashboardClient({dataByPeriod}: DashboardClientProps) {
    const [period, setPeriod] = useState<Period>('short');
    const capitals = dataByPeriod[period];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* 期間タブ */}
            <div className="flex gap-2 mb-8">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* レーダーチャート */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        資本ポートフォリオ概観
                    </h2>
                    <RadarChart capitals={capitals}/>
                </div>

                {/* バーチャート */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        達成率
                    </h2>
                    <CapitalBarChart capitals={capitals}/>
                </div>
            </div>

            {/* KPIテーブル */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    KPI一覧
                </h2>
                <KpiTable capitals={capitals}/>
            </div>
        </div>
    );
}
