import { getSymbolInfo, SYMBOL_SVG_SIZE, type StitchSymbol } from "../../model";

export function drawSymbol(
	context: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	symbol: StitchSymbol,
) {
	const info = getSymbolInfo(symbol);
	if (!info.path) return;

	context.save();
	context.fillStyle = "rgba(0, 0, 0, 1)";
	context.strokeStyle = "rgba(0, 0, 0, 1)";
	context.lineWidth = 1;
	const matrix = new DOMMatrix()
		.translate(x, y)
		.scale(width / SYMBOL_SVG_SIZE, height / SYMBOL_SVG_SIZE);
	const transformedPath = new Path2D();
	transformedPath.addPath(info.path, matrix);

	if (info.isFill) {
		context.fill(transformedPath);
	}
	if (info.isStroke) {
		context.stroke(transformedPath);
	}
	context.restore();
}
