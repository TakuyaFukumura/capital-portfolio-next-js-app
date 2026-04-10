'use client';

import React, {useState} from 'react';
import {type CapitalWithScore, type Period} from '../../../lib/data';
import RadarChart from './RadarChart';
import CapitalBarChart from './CapitalBarChart';
import KpiTable from './KpiTable';
import PeriodTabs from './PeriodTabs';

interface DashboardClientProps {
    dataByPeriod: Record<Period, CapitalWithScore[]>;
}

export default function DashboardClient({dataByPeriod}: DashboardClientProps) {
    const [period, setPeriod] = useState<Period>('short');
    const capitals = dataByPeriod[period];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* 期間タブ */}
            <div className="mb-8">
                <PeriodTabs period={period} onChange={setPeriod}/>
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
