/**
 * データ読み込み・スコア計算機能のテスト
 *
 * このテストファイルは、lib/data.tsの主要ロジックをテストします。
 * computeCapitalScores の達成率計算・資本スコア算出を検証します。
 */

import {computeCapitalScores} from '../../lib/data';

describe('computeCapitalScores', () => {
    describe('期間別スコア取得', () => {
        it('short期間のスコアを返す', () => {
            const result = computeCapitalScores('short');
            expect(result.length).toBeGreaterThan(0);
        });

        it('mid期間のスコアを返す', () => {
            const result = computeCapitalScores('mid');
            expect(result.length).toBeGreaterThan(0);
        });

        it('long期間のスコアを返す', () => {
            const result = computeCapitalScores('long');
            expect(result.length).toBeGreaterThan(0);
        });

        it('4つの資本を返す', () => {
            const result = computeCapitalScores('short');
            expect(result).toHaveLength(4);
        });
    });

    describe('スコアの値域', () => {
        it('各資本スコアは0以上1以下である', () => {
            const result = computeCapitalScores('short');
            result.forEach(cap => {
                expect(cap.score).toBeGreaterThanOrEqual(0);
                expect(cap.score).toBeLessThanOrEqual(1.0);
            });
        });

        it('各KPI達成率は0以上1以下である（上限1.0）', () => {
            const result = computeCapitalScores('short');
            result.forEach(cap => {
                cap.kpis.forEach(kpi => {
                    expect(kpi.achievement).toBeGreaterThanOrEqual(0);
                    expect(kpi.achievement).toBeLessThanOrEqual(1.0);
                });
            });
        });

        it('current_value が target_value を超えても達成率は1.0を超えない', () => {
            const result = computeCapitalScores('short');
            result.forEach(cap => {
                cap.kpis.forEach(kpi => {
                    if (kpi.current_value >= kpi.target_value && kpi.target_value > 0) {
                        expect(kpi.achievement).toBe(1.0);
                    }
                });
            });
        });
    });

    describe('KPI達成率の計算', () => {
        it('達成率は current_value / target_value である', () => {
            const result = computeCapitalScores('short');
            result.forEach(cap => {
                cap.kpis.forEach(kpi => {
                    if (kpi.target_value > 0 && kpi.current_value < kpi.target_value) {
                        const expected = kpi.current_value / kpi.target_value;
                        expect(kpi.achievement).toBeCloseTo(expected, 5);
                    }
                });
            });
        });

        it('target_value が0の場合は達成率が0である', () => {
            const result = computeCapitalScores('short');
            result.forEach(cap => {
                cap.kpis.forEach(kpi => {
                    if (kpi.target_value === 0) {
                        expect(kpi.achievement).toBe(0);
                    }
                });
            });
        });
    });

    describe('資本スコアの計算', () => {
        it('資本スコアはKPI達成率の平均である', () => {
            const result = computeCapitalScores('short');
            result.forEach(cap => {
                if (cap.kpis.length > 0) {
                    const avg = cap.kpis.reduce((sum, k) => sum + k.achievement, 0) / cap.kpis.length;
                    expect(cap.score).toBeCloseTo(avg, 5);
                }
            });
        });
    });

    describe('データ構造', () => {
        it('各資本にIDと名前が含まれる', () => {
            const result = computeCapitalScores('short');
            result.forEach(cap => {
                expect(cap.id).toBeTruthy();
                expect(cap.name).toBeTruthy();
            });
        });

        it('各資本にKPIリストが含まれる', () => {
            const result = computeCapitalScores('short');
            result.forEach(cap => {
                expect(Array.isArray(cap.kpis)).toBe(true);
                expect(cap.kpis.length).toBeGreaterThan(0);
            });
        });

        it('各KPIにname, unit, type, current_value, target_valueが含まれる', () => {
            const result = computeCapitalScores('short');
            result.forEach(cap => {
                cap.kpis.forEach(kpi => {
                    expect(kpi.name).toBeTruthy();
                    expect(kpi.unit).toBeTruthy();
                    expect(['action', 'result']).toContain(kpi.type);
                    expect(typeof kpi.current_value).toBe('number');
                    expect(typeof kpi.target_value).toBe('number');
                });
            });
        });

        it('strategyが設定されている資本はstrategy_typeを持つ', () => {
            const result = computeCapitalScores('short');
            result.forEach(cap => {
                if (cap.strategy) {
                    expect(['reinforce', 'maintain', 'suppress']).toContain(cap.strategy.strategy_type);
                }
            });
        });
    });
});
