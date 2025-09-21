import { getRectPixels, type Point } from "@/shared/lib";

export function drawPreviewSelect(
	context: CanvasRenderingContext2D,
	startPoint: Point,
	endPoint: Point,
	pixelSize: number,
	color = "rgba(0, 150, 255, 0.7)"
) {
	context.fillStyle = color;

	const pixelsToDraw: Point[] = getRectPixels(startPoint, endPoint);
	for (const point of pixelsToDraw) {
		const rectX = point.x * pixelSize;
		const rectY = point.y * pixelSize;
		context.fillRect(rectX, rectY, pixelSize, pixelSize);
	}
}
