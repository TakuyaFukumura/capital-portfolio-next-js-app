import {notFound} from 'next/navigation';
import {cache} from 'react';
import {computeCapitalScores} from '../../../../lib/data';
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

    const findCapital = (list: ReturnType<typeof computeCapitalScores>) =>
        list.find(c => c.id === id);

    const shortCap = findCapital(scoresByPeriod.short);
    if (!shortCap) notFound();

    const midCap = findCapital(scoresByPeriod.mid);
    if (!midCap) notFound();

    const longCap = findCapital(scoresByPeriod.long);
    if (!longCap) notFound();

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
