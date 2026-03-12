import {
	CROSSHAIR_ALPHA,
	CROSSHAIR_COLOR,
	CROSSHAIR_RECT_COLOR,
	type Point,
} from "@/shared/lib";
export function drawCrosshair(
	context: CanvasRenderingContext2D,
	point: Point,
	pixelWidth: number,
	pixelHeight: number,
	columns: number,
	rows: number
) {
	context.strokeStyle = CROSSHAIR_COLOR;
	context.globalAlpha = CROSSHAIR_ALPHA;
	context.fillStyle = CROSSHAIR_RECT_COLOR;
	context.lineWidth = 1 / context.getTransform().a;
	const cellX = point.x * pixelWidth;
	const cellY = point.y * pixelHeight;
	context.fillRect(cellX, cellY, pixelWidth, pixelHeight);
	context.strokeRect(cellX, cellY, pixelWidth, pixelHeight);

	const centerX = cellX + pixelWidth / 2;
	const centerY = cellY + pixelHeight / 2;

	const topLeft = {
		x: 0,
		y: 0,
	};
	const bottomRight = {
		x: columns * pixelWidth,
		y: rows * pixelHeight,
	};

	context.beginPath();
	context.moveTo(centerX, topLeft.y);
	context.lineTo(centerX, bottomRight.y);
	context.stroke();

	context.beginPath();
	context.moveTo(topLeft.x, centerY);
	context.lineTo(bottomRight.x, centerY);
	context.stroke();
	context.globalAlpha = 1;
}
