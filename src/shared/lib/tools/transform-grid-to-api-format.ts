import { decodeCellCode, encodeCellCode, StitchSymbol } from "@/entities/canva";
import type { ApiImageBody, Grid, RowInApiImageBody } from "../types";
import { RGBAToHEX } from "./rgba-to-hex";

function getValueByIndex(
	values: string[],
	index: number,
	valueName: string,
): string {
	const value = values[index];
	if (value === undefined) {
		throw new Error(`Invalid ${valueName} id ${index} in grid code`);
	}
	return value;
}

function toHexColor(color: string): string {
	return color.startsWith("#") ? color : RGBAToHEX(color);
}

export function transformGridToApiFormat(
	grid: Grid,
	colors: string[],
	symbols: StitchSymbol[],
	width: number,
	height: number,
): ApiImageBody {
	const usedColors: string[] = [];
	const usedSymbols: StitchSymbol[] = [];
	const colorIdMap = new Map<number, number>();
	const symbolIdMap = new Map<number, number>();
	const rows: RowInApiImageBody[] = [];

	for (let y = 0; y < grid.length; y++) {
		const row: RowInApiImageBody = { index: y, pixels: [] };
		for (const code of grid[y]) {
			const { colorId, symbolId } = decodeCellCode(code);

			let compactColorId = colorIdMap.get(colorId);
			if (compactColorId === undefined) {
				compactColorId = usedColors.length;
				colorIdMap.set(colorId, compactColorId);
				usedColors.push(
					toHexColor(getValueByIndex(colors, colorId, "color")),
				);
			}

			let compactSymbolId = symbolIdMap.get(symbolId);
			if (compactSymbolId === undefined) {
				compactSymbolId = usedSymbols.length;
				symbolIdMap.set(symbolId, compactSymbolId);
				usedSymbols.push(getValueByIndex(symbols, symbolId, "symbol"));
			}

			const compactCode = encodeCellCode({
				colorId: compactColorId,
				symbolId: compactSymbolId,
			});
			const lastPixel = row.pixels.at(-1);
			if (lastPixel?.code === compactCode) {
				lastPixel.count++;
			} else {
				row.pixels.push({ code: compactCode, count: 1 });
			}
		}
		rows.push(row);
	}

	return {
		colors: usedColors,
		symbols: usedSymbols,
		width,
		height,
		rows,
	};
}
