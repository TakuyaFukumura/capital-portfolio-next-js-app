'use client';

import React from 'react';
import {type Period} from '../../../lib/data';
import {PERIOD_LABELS} from './constants';

interface PeriodTabsProps {
    period: Period;
    onChange: (period: Period) => void;
}

export default function PeriodTabs({period, onChange}: PeriodTabsProps) {
    return (
        <div className="flex gap-2">
            {(Object.keys(PERIOD_LABELS) as Period[]).map(p => (
                <button
                    key={p}
                    type="button"
                    onClick={() => onChange(p)}
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
    );
}
