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
		for (let x = 0; x < grid[y].length; x++) {
			const lastPixel = row.pixels.at(-1);
			const currentColor = grid[y][x];
			const colorIndex = colorsMap.get(currentColor)!;
			if (lastPixel && lastPixel.color === colorIndex) {
				lastPixel.count++;
				continue;
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
