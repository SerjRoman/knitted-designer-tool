import {
	paintToCellCode,
	resolveDrawingPaint,
	selectBackgroundColorId,
	selectGrid,
	setPixel,
} from "@/entities/canva";
import {
	addStrokedPoint,
	selectCurrentColorId,
	selectCurrentSymbolId,
	selectToolState,
} from "@/entities/editor";
import type { Point } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const drawPixel = createAppAsyncThunk(
	"canvas/draw-pixel",
	async (point: Point, { getState, dispatch }) => {
		const state = getState();
		const grid = selectGrid(state);
		const backgroundColorId = selectBackgroundColorId(state);
		const currentColorId = selectCurrentColorId(state);
		const currentSymbolId = selectCurrentSymbolId(state);
		const { tool } = selectToolState(state);
		const paint = resolveDrawingPaint({
			isEraser: tool === "eraser",
			currentColorId,
			backgroundColorId,
			currentSymbolId,
		});
		const oldCode = grid[point.y][point.x];
		dispatch(addStrokedPoint({ ...point, code: oldCode }));
		dispatch(setPixel({ point: point, code: paintToCellCode(paint) }));
	},
);
