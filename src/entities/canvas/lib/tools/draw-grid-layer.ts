import { GRID_COLOR } from "@/shared/lib";

export function drawGridLayer(
	context: CanvasRenderingContext2D,
	pixelSize: number,
	columns: number,
	rows: number
) {
	context.strokeStyle = GRID_COLOR;
	context.lineWidth = 1;
	context.beginPath();
	for (let row = 0; row <= rows; row++) {
		const coordX = row * pixelSize;
		context.moveTo(coordX, 0);
		context.lineTo(coordX, columns * pixelSize);
	}

	for (let column = 0; column <= columns; column++) {
		const coordY = column * pixelSize;
		context.moveTo(0, coordY);
		context.lineTo(rows * pixelSize, coordY);
	}

	context.stroke();
}
