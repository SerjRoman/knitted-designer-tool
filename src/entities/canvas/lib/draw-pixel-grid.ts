import {
	BACKGROUND_COLOR,
	GRID_COLOR,
	GRID_HEIGHT,
	GRID_WIDTH,
	type Grid,
} from "@/shared/lib";

export function drawPixelGrid(
	ctx: CanvasRenderingContext2D,
	grid: Grid,
	pixelSize: number,
	columnOffsets: number[],
	rowOffsets: number[],
	columnWidths: number[],
	rowHeights: number[]
) {
	ctx.fillStyle = BACKGROUND_COLOR;
	ctx.fillRect(0, 0, GRID_WIDTH, GRID_HEIGHT);

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			const color = grid[y][x];
			if (color !== BACKGROUND_COLOR) {
				ctx.fillStyle = color;

				ctx.fillRect(
					columnOffsets[x],
					rowOffsets[y],
					columnWidths[x],
					rowHeights[y]
				);
			}
		}
	}
	ctx.strokeStyle = GRID_COLOR;
	ctx.lineWidth = 1;

	ctx.beginPath();

	for (let x = 0; x <= GRID_WIDTH; x += pixelSize) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, GRID_HEIGHT);
	}

	for (let y = 0; y <= GRID_HEIGHT; y += pixelSize) {
		ctx.moveTo(0, y);
		ctx.strokeText(String(Math.floor(y / pixelSize)), -30, y);
		ctx.lineTo(GRID_WIDTH, y);
	}
	ctx.stroke();
}
