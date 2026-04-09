/**
 * CSV パーサー機能のテスト
 *
 * このテストファイルは、lib/csv.tsの機能をテストします。
 */

import {parseCsv} from '../../lib/csv';

describe('parseCsv', () => {
    describe('基本的なパース', () => {
        it('ヘッダーと1行のデータを正しくパースする', () => {
            const csv = 'id,name\nec001,経済資本';
            const result = parseCsv<{id: string; name: string}>(csv);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({id: 'ec001', name: '経済資本'});
        });

        it('複数行をパースする', () => {
            const csv = 'id,name\nec001,経済資本\nhu001,人的資本';
            const result = parseCsv<{id: string; name: string}>(csv);

            expect(result).toHaveLength(2);
            expect(result[0].id).toBe('ec001');
            expect(result[1].id).toBe('hu001');
        });

        it('空白行を無視する', () => {
            const csv = 'id,name\nec001,経済資本\n\nhu001,人的資本\n';
            const result = parseCsv<{id: string; name: string}>(csv);

            expect(result).toHaveLength(2);
        });

        it('ヘッダーのみの場合は空配列を返す', () => {
            const csv = 'id,name';
            const result = parseCsv(csv);

            expect(result).toHaveLength(0);
        });

        it('空文字列の場合は空配列を返す', () => {
            const result = parseCsv('');
            expect(result).toHaveLength(0);
        });

        it('1行未満の場合は空配列を返す', () => {
            const result = parseCsv('   ');
            expect(result).toHaveLength(0);
        });
    });

    describe('フィールド処理', () => {
        it('各フィールドの前後の空白をトリムする', () => {
            const csv = ' id , name \n ec001 , 経済資本 ';
            const result = parseCsv<{id: string; name: string}>(csv);

            expect(result[0].id).toBe('ec001');
            expect(result[0].name).toBe('経済資本');
        });

        it('存在しないフィールドには空文字列を代入する', () => {
            const csv = 'id,name,extra\nec001,経済資本';
            const result = parseCsv<{id: string; name: string; extra: string}>(csv);

            expect(result[0].extra).toBe('');
        });

        it('複数カラムを正しく扱う', () => {
            const csv = 'id,capital_id,name,unit,type\nec001,economic,月間貯蓄額,円,result';
            const result = parseCsv<{id: string; capital_id: string; name: string; unit: string; type: string}>(csv);

            expect(result[0]).toEqual({
                id: 'ec001',
                capital_id: 'economic',
                name: '月間貯蓄額',
                unit: '円',
                type: 'result',
            });
        });
    });

    describe('実データの形式', () => {
        it('capital.csvの形式をパースできる', () => {
            const csv = 'id,name\neconomic,経済資本\nhuman,人的資本\ncultural,文化資本\nsocial,社会関係資本';
            const result = parseCsv<{id: string; name: string}>(csv);

            expect(result).toHaveLength(4);
            expect(result.find(r => r.id === 'economic')?.name).toBe('経済資本');
        });

        it('goal.csvの数値フィールドをパースできる', () => {
            const csv = 'kpi_id,period,target_value,current_value\nec001,short,50000,35000';
            const result = parseCsv<{kpi_id: string; period: string; target_value: string; current_value: string}>(csv);

            expect(result[0].target_value).toBe('50000');
            expect(Number(result[0].target_value)).toBe(50000);
            expect(Number(result[0].current_value)).toBe(35000);
        });
    });
});
