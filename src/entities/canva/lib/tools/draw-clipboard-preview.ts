import type { Point, PointWithCode } from "@/shared/lib";
import { decodeCellCode } from "../../model";
import { drawSymbol } from "./draw-symbol";

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
	backgroundColorId: number,
) {
	context.globalAlpha = 0.75;
	context.beginPath();

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

		const cell = decodeCellCode(point.code);

		if (cell.colorId !== backgroundColorId) {
			context.fillStyle = colors[cell.colorId];
			const rectX = worldX * sizes.pixelWidth;
			const rectY = worldY * sizes.pixelHeight;

			context.fillRect(rectX, rectY, sizes.pixelWidth, sizes.pixelHeight);
		}

		if (cell.symbolId !== 0) {
			drawSymbol(
				context,
				worldX * sizes.pixelWidth,
				worldY * sizes.pixelHeight,
				sizes.pixelWidth,
				sizes.pixelHeight,
				cell.symbolId,
			);
		}
	}

	context.globalAlpha = 1;
	context.stroke();
}
