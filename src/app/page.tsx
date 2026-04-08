import {computeCapitalScores} from '../../lib/data';
import DashboardClient from './components/DashboardClient';

/**
 * ダッシュボードページ（サーバーコンポーネント）
 * 全期間のデータを事前取得してクライアントに渡す
 */
export default function HomePage() {
    const dataByPeriod = {
        short: computeCapitalScores('short'),
        mid: computeCapitalScores('mid'),
        long: computeCapitalScores('long'),
    };

    return (
        <main>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold">資本ポートフォリオ</h1>
                    <p className="text-blue-100 mt-1 text-sm">個人の資本を多面的に可視化し、目標管理および戦略的意思決定を支援します</p>
                </div>
            </div>
            <DashboardClient dataByPeriod={dataByPeriod}/>
        </main>
    );
}
