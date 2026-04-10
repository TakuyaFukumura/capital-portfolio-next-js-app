import {notFound} from 'next/navigation';
import {cache} from 'react';
import {computeCapitalScores, VALID_PERIODS, type CapitalWithScore, type Period} from '../../../../lib/data';
import CapitalDetailClient from './CapitalDetailClient';

interface PageProps {
    readonly params: { id: string };
}

const getScoresByPeriod = cache(() => ({
    short: computeCapitalScores('short'),
    mid: computeCapitalScores('mid'),
    long: computeCapitalScores('long'),
}));

/**
 * 資本詳細ページ（サーバーコンポーネント）
 */
export default function CapitalPage({params}: Readonly<PageProps>) {
    const {id} = params;

    const scoresByPeriod = getScoresByPeriod();

    const dataByPeriod = VALID_PERIODS.reduce<Record<Period, CapitalWithScore>>(
        (acc, period) => {
            const cap = scoresByPeriod[period].find(c => c.id === id);
            if (!cap) notFound();
            acc[period] = cap;
            return acc;
        },
        {} as Record<Period, CapitalWithScore>
    );

    return (
        <main>
            <CapitalDetailClient
                dataByPeriod={dataByPeriod}
            />
        </main>
    );
}
