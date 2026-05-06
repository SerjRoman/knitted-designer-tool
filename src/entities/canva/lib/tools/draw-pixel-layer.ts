import { type Grid } from "@/shared/lib";
import { decodeCellCode } from "../../model";
import { drawSymbol } from "./draw-symbol";

export function drawPixelLayer(
	context: CanvasRenderingContext2D,
	grid: Grid,
	pixelWidth: number,
	pixelHeight: number,
	backgroundColorId: number,
	colors: string[],
) {
	context.beginPath();
	context.fillStyle = colors[backgroundColorId];
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			const cell = decodeCellCode(grid[y][x]);
			if (cell.colorId !== backgroundColorId) {
				context.fillStyle = colors[cell.colorId];
				context.fillRect(
					x * pixelWidth,
					y * pixelHeight,
					pixelWidth,
					pixelHeight,
				);
			}
			if (cell.symbolId !== 0) {
				drawSymbol(
					context,
					x * pixelWidth,
					y * pixelHeight,
					pixelWidth,
					pixelHeight,
					cell.symbolId,
				);
			}
		}
	}
	context.stroke();
}
