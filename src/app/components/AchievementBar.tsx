import React from 'react';

interface AchievementBarProps {
    readonly achievement: number; // 0.0〜1.0
}

export default function AchievementBar({achievement}: Readonly<AchievementBarProps>) {
    const pct = Math.round(achievement * 100);
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 min-w-16">
                <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{width: `${pct}%`}}
                />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 w-10 text-right">
                {pct}%
            </span>
        </div>
    );
}
