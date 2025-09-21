import type { Point } from "@/shared/lib";

export function drawSelectedPoints(
	context: CanvasRenderingContext2D,
	selectedPoints: Point[],
	pixelSize: number,
	color = "rgba(0, 150, 255, 0.7)"
) {
	context.fillStyle = color;
	for (const point of selectedPoints) {
		const rectX = point.x * pixelSize;
		const rectY = point.y * pixelSize;
		context.fillRect(rectX, rectY, pixelSize, pixelSize);
	}
}
