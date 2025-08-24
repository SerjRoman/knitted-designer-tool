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
	pixelSize: number
) {
	ctx.fillStyle = BACKGROUND_COLOR;
	ctx.fillRect(0, 0, GRID_WIDTH, GRID_HEIGHT);

	for (let y = 0; y < GRID_HEIGHT; y++) {
		for (let x = 0; x < GRID_WIDTH; x++) {
			const color = grid[y][x];
			if (color !== BACKGROUND_COLOR) {
				ctx.fillStyle = color;
				ctx.fillRect(
					x * pixelSize,
					y * pixelSize,
					pixelSize,
					pixelSize
				);
			}
		}
	}
	ctx.strokeStyle = GRID_COLOR;
	ctx.lineWidth = 1;

	// --- Начинаем магию ---
	ctx.beginPath();

	// Рисуем вертикальные линии со смещением
	for (let x = 0; x <= GRID_WIDTH; x += pixelSize) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, GRID_HEIGHT);
	}

	// Рисуем горизонтальные линии со смещением
	for (let y = 0; y <= GRID_HEIGHT; y += pixelSize) {
		ctx.moveTo(0, y);
		ctx.strokeText(String(Math.floor(y / pixelSize)), -30, y);
		ctx.lineTo(GRID_WIDTH, y);
	}
	ctx.stroke();
}
