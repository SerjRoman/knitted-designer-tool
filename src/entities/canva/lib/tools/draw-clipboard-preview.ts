import type { Point, PointWithCode } from "@/shared/lib";
import {
	decodeCellCode,
	createPathGroup,
	addSymbolToGroup,
	SYMBOL_SVG_SIZE,
    type StitchSymbol,
} from "../../model";

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
	symbols: StitchSymbol[],
) {
	context.globalAlpha = 0.75;

	const group = createPathGroup();

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
			const symbol = symbols[cell.symbolId];
			if (symbol) {
				const matrix = new DOMMatrix()
					.translate(
						worldX * sizes.pixelWidth,
						worldY * sizes.pixelHeight,
					)
					.scale(
						sizes.pixelWidth / SYMBOL_SVG_SIZE,
						sizes.pixelHeight / SYMBOL_SVG_SIZE,
					);
				addSymbolToGroup(group, symbol, matrix);
			}
		}
	}

	context.fillStyle = "rgba(0, 0, 0, 1)";
	context.fill(group.fill);

	context.strokeStyle = "rgba(0, 0, 0, 1)";
	context.lineWidth = 1;
	context.stroke(group.stroke);
	context.globalAlpha = 1;
}
