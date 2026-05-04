import type { Grid, Point, PointWithCode } from "@/shared/lib";
import { decodeCellCode, encodeCellCode } from "./cell-codec";
import type {
	CellCode,
	CellPaint,
	CellSymbolId,
	ColorId,
	PaintDiff,
} from "./types";

interface BuildPaintDiffParams {
	points: Point[];
	grid: Grid;
	nextPaint: CellPaint;
}

interface ResolveDrawingPaintParams {
	isEraser: boolean;
	currentColorId: ColorId;
	backgroundColorId: ColorId;
	currentSymbolId?: CellSymbolId;
}

export function createPaint(
	colorId: ColorId,
	symbolId: CellSymbolId = 0,
): CellPaint {
	return { colorId, symbolId };
}

export function resolveColorId(
	colors: string[],
	color: string,
	fallbackColorId = 0,
): ColorId {
	const colorId = colors.indexOf(color);
	return colorId === -1 ? fallbackColorId : colorId;
}

export function resolveDrawingPaint({
	isEraser,
	currentColorId,
	backgroundColorId,
	currentSymbolId,
}: ResolveDrawingPaintParams): CellPaint {
	if (isEraser) return createPaint(backgroundColorId);
	return createPaint(currentColorId, currentSymbolId ?? 0);
}

export function paintToCellCode(paint: CellPaint): CellCode {
	return encodeCellCode(paint);
}

export function cellCodeToPaint(code: CellCode): CellPaint {
	return decodeCellCode(code);
}

export function buildPaintDiff({
	points,
	grid,
	nextPaint,
}: BuildPaintDiffParams): PaintDiff {
	const pointsBefore: PointWithCode[] = [];
	const pointsAfter: PointWithCode[] = [];
	const nextCode = paintToCellCode(nextPaint);

	for (const point of points) {
		pointsBefore.push({
			...point,
			code: grid[point.y][point.x],
		});
		pointsAfter.push({
			...point,
			code: nextCode,
		});
	}

	return { pointsBefore, pointsAfter };
}
