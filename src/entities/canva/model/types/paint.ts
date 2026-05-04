import type { Point, PointWithCode } from "@/shared/lib";

export type CellCode = number;
export type ColorId = number;
export type CellSymbolId = number;

export interface CellPaint {
	colorId: ColorId;
	symbolId: CellSymbolId;
}

export interface PointWithPaint extends Point {
	paint: CellPaint;
}

export interface PaintDiff {
	pointsBefore: PointWithCode[];
	pointsAfter: PointWithCode[];
}
