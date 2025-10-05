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
	const transform = context.getTransform();
	const invTransform = transform.inverse();

	const topLeft = invTransform.transformPoint({ x: 0, y: 0 });
	const bottomRight = invTransform.transformPoint({
		x: context.canvas.width,
		y: context.canvas.height,
	});

	context.beginPath();
	context.moveTo(centerX, topLeft.y);
	context.lineTo(centerX, bottomRight.y);
	context.stroke();

	context.beginPath();
	context.moveTo(topLeft.x, centerY);
	context.lineTo(bottomRight.x, centerY);
	context.stroke();
}
