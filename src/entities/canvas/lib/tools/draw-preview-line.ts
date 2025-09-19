import { getLinePixels, type Point } from "@/shared/lib";

export function drawPreviewLine(
	context: CanvasRenderingContext2D,
	startPoint: Point,
	endPoint: Point,
	pixelSize: number,
	color = "rgba(0, 150, 255, 0.7)"
) {
	const pixelsToDraw = getLinePixels(startPoint, endPoint);

	context.fillStyle = color;

	for (const point of pixelsToDraw) {
		const rectX = point.x * pixelSize;
		const rectY = point.y * pixelSize;
		context.fillRect(rectX, rectY, pixelSize, pixelSize);
	}
}
