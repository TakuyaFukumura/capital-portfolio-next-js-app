import React from 'react';
import {type CapitalWithScore} from '../../../lib/data';
import {STRATEGY_BAR_COLOR, STRATEGY_LABELS, STRATEGY_TEXT} from './constants';

interface CapitalBarChartProps {
    capitals: CapitalWithScore[];
}

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
