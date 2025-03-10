  
function extractOne(text: string, startStr: string, endStr: string, offset: number = 0, inclusive: boolean = true): [string | null, number, number] {
    const start = text.indexOf(startStr, offset);
    const end = text.indexOf(endStr, start + startStr.length) + endStr.length;
    if (start < 0 || end < 0) {
        return [null, -1, -1];
    }
    if (inclusive) {
        return [text.substring(start, end), start, end];
    } else {
        return [text.substring(start + startStr.length, end - endStr.length), start, end];
    }
}

function extractAll(text: string, startStr: string, endStr: string, offset: number = 0, inclusive: boolean = true): string[] {
    const result: string[] = [];
    while (true) {
        const [tmp, start, end] = extractOne(text, startStr, endStr, offset, inclusive);
        if (tmp === null) {
            break;
        }
        result.push(tmp);
        offset = end;
    }
    return result;
}
