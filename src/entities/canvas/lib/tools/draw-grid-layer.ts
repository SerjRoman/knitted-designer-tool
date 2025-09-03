import { GRID_COLOR, RULER_SIZE } from "@/shared/lib";

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
		const coordX = row * pixelSize + RULER_SIZE;
		context.moveTo(coordX, RULER_SIZE);
		context.lineTo(coordX, columns * pixelSize + RULER_SIZE);
	}

	for (let column = 0; column <= columns; column++) {
		const coordY = column * pixelSize + RULER_SIZE;
		context.moveTo(RULER_SIZE, coordY);
		context.lineTo(rows * pixelSize + RULER_SIZE, coordY);
	}

	context.fillStyle = GRID_COLOR;
	context.font = "16px arial";
	for (let y = 1; y <= columns; y++) {
		context.fillText(
			String(y),
			RULER_SIZE / 2,
			y * pixelSize + RULER_SIZE - 5
		);
	}
	for (let x = 1; x <= rows; x++) {
		context.fillText(
			String(x),
			x * pixelSize + RULER_SIZE / 2,
			RULER_SIZE - 5
		);
	}
	context.stroke();
}
