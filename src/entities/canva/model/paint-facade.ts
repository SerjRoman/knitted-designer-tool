import type { Grid, Point, PointWithCode } from "@/shared/lib";
import { decodeCellCode, encodeCellCode } from "./cell-codec";
import type {
    CellCode,
    CellPaint,
    CellSymbolId,
    ColorId,
    PaintDiff,
} from "./types";

interface BuildPaintDiffBaseParams {
    points: Point[];
    grid: Grid;
}

interface BuildPaintDiffWithValueParams extends BuildPaintDiffBaseParams {
    nextPaint: CellPaint;
}

interface BuildPaintDiffWithResolverParams extends BuildPaintDiffBaseParams {
    nextPaint: (point: Point) => CellPaint;
}

interface BuildPaintDiffWithCodeParams extends BuildPaintDiffBaseParams {
    nextCode: CellCode;
}

interface BuildPaintDiffWithCodeResolverParams extends BuildPaintDiffBaseParams {
    nextCode: (point: Point) => CellCode;
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

function buildPaintDiffByCodeResolver(
    { points, grid }: BuildPaintDiffBaseParams,
    resolveNextCode: (point: Point) => CellCode,
): PaintDiff {
    const pointsBefore: PointWithCode[] = [];
    const pointsAfter: PointWithCode[] = [];

    for (const point of points) {
        pointsBefore.push({
            ...point,
            code: grid[point.y][point.x],
        });

        pointsAfter.push({
            ...point,
            code: resolveNextCode(point),
        });
    }

    return { pointsBefore, pointsAfter };
}

export function buildPaintDiffFromPaint({
    points,
    grid,
    nextPaint,
}: BuildPaintDiffWithValueParams): PaintDiff {
    return buildPaintDiffByCodeResolver({ points, grid }, () =>
        paintToCellCode(nextPaint),
    );
}

export function buildPaintDiffFromPaintResolver({
    points,
    grid,
    nextPaint,
}: BuildPaintDiffWithResolverParams): PaintDiff {
    return buildPaintDiffByCodeResolver({ points, grid }, (point) =>
        paintToCellCode(nextPaint(point)),
    );
}

export function buildPaintDiffFromCode({
    points,
    grid,
    nextCode,
}: BuildPaintDiffWithCodeParams): PaintDiff {
    return buildPaintDiffByCodeResolver({ points, grid }, () => nextCode);
}

export function buildPaintDiffFromCodeResolver({
    points,
    grid,
    nextCode,
}: BuildPaintDiffWithCodeResolverParams): PaintDiff {
    return buildPaintDiffByCodeResolver({ points, grid }, (point) =>
        nextCode(point),
    );
}

// facade
export function buildPaintDiff(
    params: BuildPaintDiffWithValueParams,
): PaintDiff;
export function buildPaintDiff(
    params: BuildPaintDiffWithResolverParams,
): PaintDiff;
export function buildPaintDiff(params: BuildPaintDiffWithCodeParams): PaintDiff;
export function buildPaintDiff(
    params: BuildPaintDiffWithCodeResolverParams,
): PaintDiff;
export function buildPaintDiff(
    params:
        | BuildPaintDiffWithValueParams
        | BuildPaintDiffWithResolverParams
        | BuildPaintDiffWithCodeParams
        | BuildPaintDiffWithCodeResolverParams,
): PaintDiff {
    if ("nextCode" in params) {
        if (typeof params.nextCode === "function") {
            return buildPaintDiffFromCodeResolver(
                params as BuildPaintDiffWithCodeResolverParams,
            );
        }
        return buildPaintDiffFromCode(params as BuildPaintDiffWithCodeParams);
    }

    if (typeof params.nextPaint === "function") {
        return buildPaintDiffFromPaintResolver(
            params as BuildPaintDiffWithResolverParams,
        );
    }

    return buildPaintDiffFromPaint(params as BuildPaintDiffWithValueParams);
}
