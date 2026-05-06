import type { CellCode, CellPaint, CellSymbolId, ColorId } from "./types";

export const COLOR_BITS = 8;
export const COLOR_MASK = (1 << COLOR_BITS) - 1;
const decodeCache = new Map<
	string | number,
	{ colorId: number; symbolId: number }
>();
export function encodeCellCode({
	colorId,
	symbolId,
}: Readonly<CellPaint>): CellCode {
	return (symbolId << COLOR_BITS) | colorId;
}

export function decodeColorId(code: CellCode): ColorId {
	return code & COLOR_MASK;
}

export function decodeSymbolId(code: CellCode): CellSymbolId {
	return code >> COLOR_BITS;
}

export function decodeCellCode(code: CellCode): CellPaint {
	if (decodeCache.has(code)) {
		return decodeCache.get(code)!;
	}
	const result = {
		colorId: decodeColorId(code),
		symbolId: decodeSymbolId(code),
	};
	decodeCache.set(code, result);
	return result;
}

export function replaceColorId(code: CellCode, colorId: ColorId): CellCode {
	return encodeCellCode({ colorId, symbolId: decodeSymbolId(code) });
}

export function replaceSymbolId(
	code: CellCode,
	symbolId: CellSymbolId,
): CellCode {
	return encodeCellCode({ colorId: decodeColorId(code), symbolId });
}
