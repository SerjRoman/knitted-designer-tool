import { type Point } from "@/shared/lib";

export function drawPreviewPoints(
	context: CanvasRenderingContext2D,
	points: Point[],
	pixelSize: number,
	color = "rgba(0, 150, 255, 0.7)"
) {
	context.fillStyle = color;

	for (const point of points) {
		const rectX = point.x * pixelSize;
		const rectY = point.y * pixelSize;
		context.fillRect(rectX, rectY, pixelSize, pixelSize);
	}
}
