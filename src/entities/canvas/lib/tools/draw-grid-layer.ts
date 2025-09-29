import { GRID_COLOR } from "@/shared/lib";

export function drawGridLayer(
	context: CanvasRenderingContext2D,
	pixelSize: number,
	columns: number,
	rows: number,
	scale: number
) {
	context.strokeStyle = GRID_COLOR;
	context.lineWidth = 2 / scale;
	context.globalAlpha = 0.05;
	context.beginPath();

	for (let row = 0; row <= rows; row++) {
		const coordY = row * pixelSize;
		context.moveTo(0, coordY);
		context.lineTo(columns * pixelSize, coordY);
	}

	for (let column = 0; column <= columns; column++) {
		const coordX = column * pixelSize;
		context.moveTo(coordX, 0);
		context.lineTo(coordX, rows * pixelSize);
	}

	context.stroke();
	context.globalAlpha = 1;
}
