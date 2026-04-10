import React from 'react';
import {type CapitalWithScore} from '../../../lib/data';
import {STRATEGY_FILL, STRATEGY_STROKE} from './constants';

interface RadarChartProps {
    capitals: CapitalWithScore[];
}

/**
 * 資本をレーダーチャート上に均等配置するコンポーネント
 */
export default function RadarChart({capitals}: RadarChartProps) {
    const size = 300;
    const cx = size / 2;
    const cy = size / 2;
    const maxR = 110;

    if (capitals.length === 0) {
        return (
            <div className="flex items-center justify-center h-48 text-sm text-gray-500 dark:text-gray-400">
                データを表示できません（資本数: {capitals.length}）
            </div>
        );
    }

    // 資本数に応じて角度を均等配置（先頭を上=-90度に固定）
    const angles = capitals.map((_, i) => (360 / capitals.length) * i - 90);

    const toXY = (angle: number, r: number) => ({
        x: cx + r * Math.cos((angle * Math.PI) / 180),
        y: cy + r * Math.sin((angle * Math.PI) / 180),
    });

    // 目標ライン（100%）の正方形
    const targetPoints = angles.map(a => toXY(a, maxR));
    const targetPath = targetPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';

    // グリッド線（25%, 50%, 75%）
    const gridRatios = [0.25, 0.5, 0.75];

    // 実績ポリゴン（資本ごとに色を変える）
    const achievementPoints = capitals.map((cap, i) => toXY(angles[i], cap.score * maxR));
    const achievementPath = achievementPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';

    // 代表的なストラテジーカラー（最初の資本の色で塗る）
    const dominantStrategy = capitals[0]?.strategy?.strategy_type ?? 'none';

    return (
        <svg
            viewBox={`0 0 ${size} ${size}`}
            width="100%"
            height="100%"
            className="max-h-72"
            aria-label="資本ポートフォリオレーダーチャート"
        >
            {/* グリッド線 */}
            {gridRatios.map(ratio => {
                const pts = angles.map(a => toXY(a, maxR * ratio));
                const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
                return (
                    <path
                        key={ratio}
                        d={d}
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity={0.15}
                        strokeWidth={1}
                        className="text-gray-500"
                    />
                );
            })}

            {/* 軸線 */}
            {angles.map((angle, i) => {
                const end = toXY(angle, maxR);
                return (
                    <line
                        key={i}
                        x1={cx}
                        y1={cy}
                        x2={end.x}
                        y2={end.y}
                        stroke="currentColor"
                        strokeOpacity={0.2}
                        strokeWidth={1}
                        className="text-gray-500"
                    />
                );
            })}

            {/* 目標ライン（100%） */}
            <path
                d={targetPath}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.4}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                className="text-gray-400"
            />

            {/* 実績ポリゴン */}
            <path
                d={achievementPath}
                fill={STRATEGY_FILL[dominantStrategy]}
                stroke={STRATEGY_STROKE[dominantStrategy]}
                strokeWidth={2}
            />

            {/* 各資本のドットとラベル */}
            {capitals.map((cap, i) => {
                const pt = toXY(angles[i], cap.score * maxR);
                const labelPt = toXY(angles[i], maxR + 22);
                const pct = Math.round(cap.score * 100);
                const strategy = cap.strategy?.strategy_type ?? 'none';
                return (
                    <g key={cap.id}>
                        <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={4}
                            fill={STRATEGY_STROKE[strategy]}
                        />
                        <text
                            x={labelPt.x}
                            y={labelPt.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={11}
                            className="fill-gray-700 dark:fill-gray-300"
                        >
                            {cap.name}
                        </text>
                        <text
                            x={labelPt.x}
                            y={labelPt.y + 13}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={10}
                            fill={STRATEGY_STROKE[strategy]}
                        >
                            {pct}%
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}
