import type { Point, PointWithColor } from "@/shared/lib";

export function drawClipboardPreview(
	context: CanvasRenderingContext2D,
	clipboardPoints: PointWithColor[],
	origin: Point,
	pixelSize: number
) {
	context.globalAlpha = 0.75;
	for (const point of clipboardPoints) {
		context.fillStyle = point.color;
		const rectX = (point.x + origin.x) * pixelSize;
		const rectY = (point.y + origin.y) * pixelSize;
		if (
			rectX >= context.canvas.width ||
			rectY >= context.canvas.height ||
			rectX < 0 ||
			rectY < 0
		)
			continue;
		context.fillRect(rectX, rectY, pixelSize, pixelSize);
	}
	context.globalAlpha = 1.0;
}
