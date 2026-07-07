import { type Grid } from "@/shared/lib";
import {
	decodeCellCode,
	createPathGroup,
	addSymbolToGroup,
	SYMBOL_SVG_SIZE,
	type StitchSymbol,
} from "../../model";

export function drawPixelLayer(
	context: CanvasRenderingContext2D,
	grid: Grid,
	pixelWidth: number,
	pixelHeight: number,
	backgroundColorId: number,
	colors: string[],
	symbols: StitchSymbol[],
) {
	context.fillStyle = colors[backgroundColorId];
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	const group = createPathGroup();

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
				const symbol = symbols[cell.symbolId];
				if (symbol) {
					const matrix = new DOMMatrix()
						.translate(x * pixelWidth, y * pixelHeight)
						.scale(
							pixelWidth / SYMBOL_SVG_SIZE,
							pixelHeight / SYMBOL_SVG_SIZE,
						);
					addSymbolToGroup(group, symbol, matrix);
				}
			}
		}
	}

	context.fillStyle = "rgba(0, 0, 0, 1)";
	context.fill(group.fill);

	context.strokeStyle = "rgba(0, 0, 0, 1)";
	context.lineWidth = 1;
	context.stroke(group.stroke);
}
