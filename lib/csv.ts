/**
 * CSVパーサーユーティリティ
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
