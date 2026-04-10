import {notFound} from 'next/navigation';
import {cache} from 'react';
import {computeCapitalScores, VALID_PERIODS, type CapitalWithScore, type Period} from '../../../../lib/data';
import CapitalDetailClient from './CapitalDetailClient';

interface PageProps {
    params: { id: string };
}

const getScoresByPeriod = cache(() => ({
    short: computeCapitalScores('short'),
    mid: computeCapitalScores('mid'),
    long: computeCapitalScores('long'),
}));

/**
 * 資本詳細ページ（サーバーコンポーネント）
 */
export default function CapitalPage({params}: PageProps) {
    const {id} = params;

    const scoresByPeriod = getScoresByPeriod();

    const dataByPeriod: Partial<Record<Period, CapitalWithScore>> = {};
    for (const period of VALID_PERIODS) {
        const cap = scoresByPeriod[period].find(c => c.id === id);
        if (!cap) notFound();
        dataByPeriod[period] = cap;
    }

    return (
        <main>
            <CapitalDetailClient
                dataByPeriod={dataByPeriod as Record<Period, CapitalWithScore>}
            />
        </main>
    );
}
