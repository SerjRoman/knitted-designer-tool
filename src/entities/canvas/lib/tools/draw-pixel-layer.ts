import {
	BACKGROUND_COLOR,
	GRID_HEIGHT,
	GRID_WIDTH,
	type Grid,
} from "@/shared/lib";

export function drawPixelLayer(
	context: CanvasRenderingContext2D,
	grid: Grid,
	columnOffsets: number[],
	rowOffsets: number[],
	columnWidths: number[],
	rowHeights: number[]
) {
	context.clearRect(0, 0, GRID_WIDTH, GRID_HEIGHT);
	context.fillStyle = BACKGROUND_COLOR;
	context.fillRect(0, 0, GRID_WIDTH, GRID_HEIGHT);

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			const color = grid[y][x];
			if (color !== BACKGROUND_COLOR) {
				context.fillStyle = color;

				context.fillRect(
					columnOffsets[x],
					rowOffsets[y],
					columnWidths[x],
					rowHeights[y]
				);
			}
		}
	}
	context.stroke();
}
