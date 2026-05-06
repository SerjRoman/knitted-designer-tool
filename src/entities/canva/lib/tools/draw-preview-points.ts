import { SELECTION_COLOR, type Point } from "@/shared/lib";

export function drawPreviewPoints(
	context: CanvasRenderingContext2D,
	points: Point[],
	pixelWidth: number,
	pixelHeight: number,
	color = SELECTION_COLOR,
) {
	context.fillStyle = color;

	for (const point of points) {
		const rectX = point.x * pixelWidth;
		const rectY = point.y * pixelHeight;
		context.fillRect(rectX, rectY, pixelWidth, pixelHeight);
	}
}
