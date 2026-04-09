import React from 'react';
import {type CapitalWithScore, type StrategyType} from '../../../lib/data';
import {STRATEGY_LABELS} from './constants';

interface CapitalBarChartProps {
    capitals: CapitalWithScore[];
}

const STRATEGY_BAR_COLOR: Record<StrategyType | 'none', string> = {
    reinforce: 'bg-blue-500',
    maintain: 'bg-gray-400',
    suppress: 'bg-orange-500',
    none: 'bg-purple-500',
};

const STRATEGY_TEXT: Record<StrategyType | 'none', string> = {
    reinforce: 'text-blue-600 dark:text-blue-400',
    maintain: 'text-gray-500 dark:text-gray-400',
    suppress: 'text-orange-600 dark:text-orange-400',
    none: 'text-purple-600 dark:text-purple-400',
};

export default function CapitalBarChart({capitals}: CapitalBarChartProps) {
    return (
        <div className="space-y-4">
            {capitals.map(cap => {
                const strategy = cap.strategy?.strategy_type ?? 'none';
                const pct = Math.round(cap.score * 100);
                return (
                    <div key={cap.id}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {cap.name}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-medium ${STRATEGY_TEXT[strategy]}`}>
                                    {STRATEGY_LABELS[strategy]}
                                </span>
                                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {pct}%
                                </span>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div
                                className={`h-3 rounded-full transition-all duration-500 ${STRATEGY_BAR_COLOR[strategy]}`}
                                style={{width: `${pct}%`}}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
