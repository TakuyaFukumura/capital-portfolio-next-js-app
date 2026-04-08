import React from 'react';
import Link from 'next/link';
import {type CapitalWithScore, type StrategyType} from '../../../lib/data';

interface KpiTableProps {
    capitals: CapitalWithScore[];
}

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

export default function KpiTable({capitals}: KpiTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">資本</th>
                    <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">KPI名</th>
                    <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">種別</th>
                    <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">現在値</th>
                    <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">目標値</th>
                    <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">達成率</th>
                </tr>
                </thead>
                <tbody>
                {capitals.map(cap => {
                    const strategy = cap.strategy?.strategy_type ?? 'none';
                    return cap.kpis.map((kpi, idx) => (
                        <tr
                            key={kpi.id}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            {idx === 0 && (
                                <td
                                    className="py-2 px-3 text-gray-800 dark:text-gray-200"
                                    rowSpan={cap.kpis.length}
                                >
                                    <Link
                                        href={`/capital/${cap.id}`}
                                        className="font-medium hover:underline"
                                    >
                                        {cap.name}
                                    </Link>
                                    <span
                                        className={`ml-2 text-xs px-1.5 py-0.5 rounded ${STRATEGY_BADGE[strategy]}`}
                                    >
                                        {STRATEGY_LABELS[strategy]}
                                    </span>
                                </td>
                            )}
                            <td className="py-2 px-3 text-gray-700 dark:text-gray-300">{kpi.name}</td>
                            <td className="py-2 px-3">
                                <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                    {TYPE_LABEL[kpi.type]}
                                </span>
                            </td>
                            <td className="py-2 px-3 text-right text-gray-700 dark:text-gray-300">
                                {kpi.current_value.toLocaleString()} {kpi.unit}
                            </td>
                            <td className="py-2 px-3 text-right text-gray-700 dark:text-gray-300">
                                {kpi.target_value.toLocaleString()} {kpi.unit}
                            </td>
                            <td className="py-2 px-3">
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
                    ));
                })}
                </tbody>
            </table>
        </div>
    );
}
