import {notFound} from 'next/navigation';
import {computeCapitalScores} from '../../../../lib/data';
import CapitalDetailClient from './CapitalDetailClient';

interface PageProps {
    params: Promise<{id: string}>;
}

/**
 * 資本詳細ページ（サーバーコンポーネント）
 */
export default async function CapitalPage({params}: PageProps) {
    const {id} = await params;

    const short = computeCapitalScores('short');
    const mid = computeCapitalScores('mid');
    const long = computeCapitalScores('long');

    const findCapital = (list: ReturnType<typeof computeCapitalScores>) =>
        list.find(c => c.id === id);

    const shortCap = findCapital(short);
    if (!shortCap) notFound();

    const midCap = findCapital(mid)!;
    const longCap = findCapital(long)!;

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
