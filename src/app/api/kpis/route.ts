import {cache} from 'react';
import {NextResponse} from 'next/server';
import {loadKpis} from '../../../../lib/data';

const getCachedKpis = cache(() => loadKpis());

/**
 * KPI一覧を返すAPIエンドポイント
 */
export async function GET() {
    try {
        const kpis = getCachedKpis();
        return NextResponse.json(kpis);
    } catch (error) {
        console.error('KPIの取得に失敗しました:', error);
        return NextResponse.json(
            {error: 'KPIの取得に失敗しました'},
            {status: 500}
        );
    }
}
