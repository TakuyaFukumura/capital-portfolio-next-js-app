import {NextRequest, NextResponse} from 'next/server';
import {computeCapitalScores, type Period} from '../../../../lib/data';

/**
 * 資本スコア一覧を返すAPIエンドポイント
 * クエリパラメータ: period=short|mid|long（デフォルト: short）
 */
export async function GET(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const periodParam = searchParams.get('period') ?? 'short';
        const period: Period = ['short', 'mid', 'long'].includes(periodParam)
            ? (periodParam as Period)
            : 'short';

        const capitals = computeCapitalScores(period);
        return NextResponse.json(capitals);
    } catch (error) {
        console.error('資本スコアの取得に失敗しました:', error);
        return NextResponse.json(
            {error: '資本スコアの取得に失敗しました'},
            {status: 500}
        );
    }
}
