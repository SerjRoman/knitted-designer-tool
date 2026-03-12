import { GRID_COLOR } from "@/shared/lib";

export function drawGridLayer(
	context: CanvasRenderingContext2D,
	pixelWidth: number,
	pixelHeight: number,
	columns: number,
	rows: number,
	scale: number
) {
	context.strokeStyle = GRID_COLOR;
	context.lineWidth = 2 / scale;
	context.globalAlpha = 0.05;
	context.beginPath();

	for (let row = 0; row <= rows; row++) {
		const coordY = row * pixelHeight;
		context.moveTo(0, coordY);
		context.lineTo(columns * pixelWidth, coordY);
	}

	for (let column = 0; column <= columns; column++) {
		const coordX = column * pixelWidth;
		context.moveTo(coordX, 0);
		context.lineTo(coordX, rows * pixelHeight);
	}

	context.stroke();
	context.globalAlpha = 1;
}
