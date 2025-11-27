import {
	CROSSHAIR_ALPHA,
	CROSSHAIR_COLOR,
	CROSSHAIR_RECT_COLOR,
	type Point,
} from "@/shared/lib";
export function drawCrosshair(
	context: CanvasRenderingContext2D,
	point: Point,
	pixelSize: number,
	columns: number,
	rows: number
) {
	context.strokeStyle = CROSSHAIR_COLOR;
	context.globalAlpha = CROSSHAIR_ALPHA;
	context.fillStyle = CROSSHAIR_RECT_COLOR;
	context.lineWidth = 1 / context.getTransform().a;

	const cellX = point.x * pixelSize;
	const cellY = point.y * pixelSize;
	context.fillRect(cellX, cellY, pixelSize, pixelSize);
	context.strokeRect(cellX, cellY, pixelSize, pixelSize);

	const centerX = cellX + pixelSize / 2;
	const centerY = cellY + pixelSize / 2;

	const topLeft = {
		x: 0,
		y: 0,
	};
	const bottomRight = {
		x: columns * pixelSize,
		y: rows * pixelSize,
	};

	context.beginPath();
	context.moveTo(centerX, topLeft.y);
	context.lineTo(centerX, bottomRight.y);
	context.stroke();

	context.beginPath();
	context.moveTo(topLeft.x, centerY);
	context.lineTo(bottomRight.x, centerY);
	context.stroke();
	context.globalAlpha = 1.0;
}
