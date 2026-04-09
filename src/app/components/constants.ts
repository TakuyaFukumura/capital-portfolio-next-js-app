import {type StrategyType} from '../../../lib/data';

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

export const TYPE_LABEL: Record<'action' | 'result', string> = {
    action: '行動',
    result: '結果',
};
