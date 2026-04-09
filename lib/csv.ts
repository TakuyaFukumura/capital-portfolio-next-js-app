/**
 * CSV文字列を解析し、オブジェクトの配列に変換する。
 * 1行目をヘッダーとして扱い、2行目以降をデータ行として処理する。
 * 空行はスキップされ、フィールド数が不足している場合は空文字列で補完される。
 *
 * ⚠️ 制限事項: カンマを含むフィールドのダブルクォート囲みには対応していない。
 * このパーサーはカンマ区切りを単純に split(',') で処理するため、
 * RFC 4180 のクォートフィールドや改行を含む値は正しく扱えない。
 * 本アプリの静的CSVデータはこれらの文字を含まない前提で使用している。
 *
 * @param content - 解析するCSV文字列
 * @returns ヘッダーをキー、各行の値をバリューとするオブジェクトの配列
 */
export function parseCsv<T extends Record<string, string>>(content: string): T[] {
    const lines = content.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim());

    return lines.slice(1)
        .filter(line => line.trim() !== '')
        .map(line => {
            const values = line.split(',').map(v => v.trim());
            const obj: Record<string, string> = {};
            headers.forEach((header, i) => {
                obj[header] = values[i] ?? '';
            });
            return obj as T;
        });
}
