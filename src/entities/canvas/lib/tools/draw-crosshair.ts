import { COLORS, type Point } from "@/shared/lib";
export function drawCrosshair(
	context: CanvasRenderingContext2D,
	point: Point,
	pixelSize: number
) {
	context.strokeStyle = COLORS.blue;
	context.fillStyle = "rgba(0, 150, 255, 0.2)";
	context.lineWidth = 2 / context.getTransform().a;

	const cellX = point.x * pixelSize;
	const cellY = point.y * pixelSize;
	context.fillRect(cellX, cellY, pixelSize, pixelSize);
	context.strokeRect(cellX, cellY, pixelSize, pixelSize);

	const centerX = cellX + pixelSize / 2;
	const centerY = cellY + pixelSize / 2;
	context.beginPath();
	context.moveTo(centerX, 0);
	context.lineTo(centerX, context.canvas.width);
	context.stroke();

	context.beginPath();
	context.moveTo(0, centerY);
	context.lineTo(context.canvas.height, centerY);
	context.stroke();
}
