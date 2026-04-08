import fs from 'fs';
import path from 'path';
import {parseCsv} from './csv';

export type Period = 'short' | 'mid' | 'long';
export type StrategyType = 'reinforce' | 'maintain' | 'suppress';

export interface Capital {
    id: string;
    name: string;
}

export interface KPI {
    id: string;
    capital_id: string;
    name: string;
    unit: string;
    type: 'action' | 'result';
}

export interface Goal {
    kpi_id: string;
    period: Period;
    target_value: number;
    current_value: number;
}

export interface Strategy {
    capital_id: string;
    period: Period;
    strategy_type: StrategyType;
}

export interface KPIWithAchievement extends KPI {
    target_value: number;
    current_value: number;
    achievement: number; // 0.0〜1.0（上限1.0）
}

export interface CapitalWithScore extends Capital {
    score: number; // 0.0〜1.0
    kpis: KPIWithAchievement[];
    strategy?: Strategy;
}

/** CSVファイルのパスを解決する */
function dataPath(filename: string): string {
    return path.join(process.cwd(), 'public', 'data', filename);
}

export function loadCapitals(): Capital[] {
    const content = fs.readFileSync(dataPath('capital.csv'), 'utf-8');
    return parseCsv<Record<string, string>>(content).map(row => ({
        id: row.id ?? '',
        name: row.name ?? '',
    }));
}

export function loadKpis(): KPI[] {
    const content = fs.readFileSync(dataPath('kpi.csv'), 'utf-8');
    return parseCsv<{ id: string; capital_id: string; name: string; unit: string; type: string }>(content).map(row => ({
        ...row,
        type: row.type as 'action' | 'result',
    }));
}

export function loadGoals(): Goal[] {
    const content = fs.readFileSync(dataPath('goal.csv'), 'utf-8');
    return parseCsv<{ kpi_id: string; period: string; target_value: string; current_value: string }>(content).map(row => ({
        kpi_id: row.kpi_id,
        period: row.period as Period,
        target_value: Number(row.target_value),
        current_value: Number(row.current_value),
    }));
}

export function loadStrategies(): Strategy[] {
    const content = fs.readFileSync(dataPath('strategy.csv'), 'utf-8');
    return parseCsv<{ capital_id: string; period: string; strategy_type: string }>(content).map(row => ({
        capital_id: row.capital_id,
        period: row.period as Period,
        strategy_type: row.strategy_type as StrategyType,
    }));
}

/** 指定期間の資本スコアを計算する */
export function computeCapitalScores(period: Period): CapitalWithScore[] {
    const capitals = loadCapitals();
    const kpis = loadKpis();
    const goals = loadGoals();
    const strategies = loadStrategies();

    return capitals.map(capital => {
        const capitalKpis = kpis.filter(k => k.capital_id === capital.id);
        const strategy = strategies.find(s => s.capital_id === capital.id && s.period === period);

        const kpisWithAchievement: KPIWithAchievement[] = capitalKpis.map(kpi => {
            const goal = goals.find(g => g.kpi_id === kpi.id && g.period === period);
            const target_value = goal?.target_value ?? 0;
            const current_value = goal?.current_value ?? 0;
            const achievement = target_value > 0
                ? Math.min(current_value / target_value, 1.0)
                : 0;
            return {...kpi, target_value, current_value, achievement};
        });

        const score = kpisWithAchievement.length > 0
            ? kpisWithAchievement.reduce((sum, k) => sum + k.achievement, 0) / kpisWithAchievement.length
            : 0;

        return {
            ...capital,
            score,
            kpis: kpisWithAchievement,
            strategy,
        };
    });
}
