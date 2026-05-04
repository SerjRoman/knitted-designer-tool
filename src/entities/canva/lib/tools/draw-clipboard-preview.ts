import type { Point, PointWithCode } from "@/shared/lib";
import { decodeColorId } from "../../model";

export function drawClipboardPreview(
	context: CanvasRenderingContext2D,
	clipboardPoints: PointWithCode[],
	origin: Point,
	sizes: {
		pixelWidth: number;
		pixelHeight: number;
		numberOfColumns: number;
		numberOfRows: number;
	},
	colors: string[],
) {
	context.globalAlpha = 0.75;
	for (const point of clipboardPoints) {
		const worldX = point.x + origin.x;
		const worldY = point.y + origin.y;

		if (
			worldX >= sizes.numberOfColumns ||
			worldY >= sizes.numberOfRows ||
			worldX < 0 ||
			worldY < 0
		) {
			continue;
		}

		context.fillStyle = colors[decodeColorId(point.code)];
		const rectX = worldX * sizes.pixelWidth;
		const rectY = worldY * sizes.pixelHeight;

		context.fillRect(rectX, rectY, sizes.pixelWidth, sizes.pixelHeight);
	}

	context.globalAlpha = 1;
}
