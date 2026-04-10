import {notFound} from 'next/navigation';
import {cache} from 'react';
import {computeCapitalScores, type Period} from '../../../../lib/data';
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

    const findCapital = (period: Period) =>
        scoresByPeriod[period].find(c => c.id === id);

    const periods: Period[] = ['short', 'mid', 'long'];
    const found = periods.map(findCapital);
    if (found.some(cap => !cap)) notFound();

    const [shortCap, midCap, longCap] = found as NonNullable<ReturnType<typeof findCapital>>[];

    return (
        <main>
            <CapitalDetailClient
                dataByPeriod={{
                    short: shortCap,
                    mid: midCap,
                    long: longCap,
                }}
            />
        </main>
    );
}
