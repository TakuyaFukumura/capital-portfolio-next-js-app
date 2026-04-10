import {cache} from 'react';
import {NextRequest, NextResponse} from 'next/server';
import {computeCapitalScores, isPeriod, type Period} from '../../../../lib/data';

const getCachedCapitalScores = cache((period: Period) => computeCapitalScores(period));

/**
 * 資本スコア一覧を返すAPIエンドポイント
 * クエリパラメータ: period=short|mid|long（デフォルト: short）
 */
export async function GET(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const periodParam = searchParams.get('period') ?? 'short';
        const period: Period = isPeriod(periodParam) ? periodParam : 'short';

        const capitals = getCachedCapitalScores(period);
        return NextResponse.json(capitals);
    } catch (error) {
        console.error('資本スコアの取得に失敗しました:', error);
        return NextResponse.json(
            {error: '資本スコアの取得に失敗しました'},
            {status: 500}
        );
    }
}
