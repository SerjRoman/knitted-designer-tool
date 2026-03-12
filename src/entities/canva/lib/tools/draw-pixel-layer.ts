import { BACKGROUND_COLOR, type Grid } from "@/shared/lib";

export function drawPixelLayer(
	context: CanvasRenderingContext2D,
	grid: Grid,
	pixelWidth: number,
	pixelHeight: number
) {
	context.fillStyle = BACKGROUND_COLOR;
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			const color = grid[y][x];
			if (color !== BACKGROUND_COLOR) {
				context.fillStyle = color;
				context.fillRect(
					x * pixelWidth,
					y * pixelHeight,
					pixelWidth,
					pixelHeight
				);
			}
		}
	}
	context.stroke();
}
