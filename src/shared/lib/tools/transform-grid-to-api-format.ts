import type { ApiImageBody, Grid, RowInApiImageBody } from "../types";
import { RGBAToHEX } from "./rgba-to-hex";

export function transformGridToApiFormat(
	grid: Grid,
	colors: string[],
	width: number,
	height: number
): ApiImageBody {
	const hexColors = colors.map((color) => RGBAToHEX(color));
	const colorsMap = new Map<string, number>();
	for (let index = 0; index < hexColors.length; index++) {
		colorsMap.set(colors[index], index);
	}
	const rows: RowInApiImageBody[] = [];
	for (let y = 0; y < grid.length; y++) {
		const row: RowInApiImageBody = { index: y, pixels: [] };
		for (const element of grid[y]) {
			const lastPixel = row.pixels.at(-1);
			const currentColor = element;
			const colorIndex = colorsMap.get(currentColor)!;
			if (lastPixel?.color === colorIndex) {
				lastPixel.count++;
			} else {
				row.pixels.push({ color: colorIndex, count: 1 });
			}
		}
		rows.push(row);
	}
	return {
		colors: hexColors,
		width,
		height,
		rows,
	};
}
