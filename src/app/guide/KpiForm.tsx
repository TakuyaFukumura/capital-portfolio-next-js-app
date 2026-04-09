'use client';

import React, {useState} from 'react';

interface KpiFormState {
    capital: string;
    name: string;
    unit: string;
    shortTarget: string;
    midTarget: string;
    longTarget: string;
}

const CAPITAL_OPTIONS = [
    {id: 'economic', label: '経済資本'},
    {id: 'human', label: '人的資本'},
    {id: 'cultural', label: '文化資本'},
    {id: 'social', label: '社会関係資本'},
];

const INITIAL_FORM: KpiFormState = {
    capital: 'economic',
    name: '',
    unit: '',
    shortTarget: '',
    midTarget: '',
    longTarget: '',
};

/**
 * KPI作成フォーム（クライアントコンポーネント）
 */
export default function KpiForm() {
    const [form, setForm] = useState<KpiFormState>(INITIAL_FORM);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (field: keyof KpiFormState, value: string) => {
        setForm(prev => ({...prev, [field]: value}));
        setSubmitted(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleReset = () => {
        setForm(INITIAL_FORM);
        setSubmitted(false);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="kpi-capital" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            資本カテゴリ
                        </label>
                        <select
                            id="kpi-capital"
                            value={form.capital}
                            onChange={e => handleChange('capital', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 text-sm"
                        >
                            {CAPITAL_OPTIONS.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="kpi-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            KPI名
                        </label>
                        <input
                            id="kpi-name"
                            type="text"
                            value={form.name}
                            onChange={e => handleChange('name', e.target.value)}
                            placeholder="例: 月間読書冊数"
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="kpi-unit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            単位
                        </label>
                        <input
                            id="kpi-unit"
                            type="text"
                            value={form.unit}
                            onChange={e => handleChange('unit', e.target.value)}
                            placeholder="例: 冊, 時間, 円"
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 text-sm"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="kpi-short-target" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            短期目標値
                        </label>
                        <input
                            id="kpi-short-target"
                            type="number"
                            value={form.shortTarget}
                            onChange={e => handleChange('shortTarget', e.target.value)}
                            placeholder="短期"
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="kpi-mid-target" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            中期目標値
                        </label>
                        <input
                            id="kpi-mid-target"
                            type="number"
                            value={form.midTarget}
                            onChange={e => handleChange('midTarget', e.target.value)}
                            placeholder="中期"
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="kpi-long-target" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            長期目標値
                        </label>
                        <input
                            id="kpi-long-target"
                            type="number"
                            value={form.longTarget}
                            onChange={e => handleChange('longTarget', e.target.value)}
                            placeholder="長期"
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 text-sm"
                        />
                    </div>
                </div>
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        KPIを作成
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        リセット
                    </button>
                </div>
            </form>

            {submitted && form.name && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-1">KPIが作成されました</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>{form.name}</strong>（{form.unit}）
                        ／ 資本: {CAPITAL_OPTIONS.find(o => o.id === form.capital)?.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        目標値 — 短期: {form.shortTarget || '未設定'} ／ 中期: {form.midTarget || '未設定'} ／ 長期: {form.longTarget || '未設定'}
                    </p>
                </div>
            )}
        </div>
    );
}
