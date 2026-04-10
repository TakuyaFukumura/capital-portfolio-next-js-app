import {type Period, type StrategyType} from '../../../lib/data';

export const PERIOD_LABELS: Record<Period, string> = {
    short: '短期',
    mid: '中期',
    long: '長期',
};

export const STRATEGY_BADGE: Record<StrategyType | 'none', string> = {
    reinforce: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    maintain: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
    suppress: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    none: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
};

export const STRATEGY_LABELS: Record<StrategyType | 'none', string> = {
    reinforce: '強化',
    maintain: '維持',
    suppress: '抑制',
    none: '未設定',
};

export const STRATEGY_BAR_COLOR: Record<StrategyType | 'none', string> = {
    reinforce: 'bg-blue-500',
    maintain: 'bg-gray-400',
    suppress: 'bg-orange-500',
    none: 'bg-purple-500',
};

export const STRATEGY_TEXT: Record<StrategyType | 'none', string> = {
    reinforce: 'text-blue-600 dark:text-blue-400',
    maintain: 'text-gray-500 dark:text-gray-400',
    suppress: 'text-orange-600 dark:text-orange-400',
    none: 'text-purple-600 dark:text-purple-400',
};

export const STRATEGY_FILL: Record<StrategyType | 'none', string> = {
    reinforce: 'rgba(59, 130, 246, 0.3)',
    maintain: 'rgba(156, 163, 175, 0.3)',
    suppress: 'rgba(249, 115, 22, 0.3)',
    none: 'rgba(168, 85, 247, 0.3)',
};

export const STRATEGY_STROKE: Record<StrategyType | 'none', string> = {
    reinforce: 'rgb(59, 130, 246)',
    maintain: 'rgb(156, 163, 175)',
    suppress: 'rgb(249, 115, 22)',
    none: 'rgb(168, 85, 247)',
};

export const TYPE_LABEL: Record<'action' | 'result', string> = {
    action: '行動',
    result: '結果',
};
