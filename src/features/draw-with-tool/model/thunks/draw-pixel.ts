import { selectBackgroundColor, selectGrid, setPixel } from "@/entities/canvas";
import {
	addStrokedPoint,
	selectCurrentColor,
	selectToolState,
} from "@/entities/editor";
import type { Point } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const drawPixel = createAppAsyncThunk(
	"canvas/draw-pixel",
	async (point: Point, { getState, dispatch }) => {
		const state = getState();
		const grid = selectGrid(state);
		const backgroundColor = selectBackgroundColor(state);
		const currentColor = selectCurrentColor(state);
		const { tool } = selectToolState(state);
		const color = tool === "eraser" ? backgroundColor : currentColor;
		const oldColor = grid[point.y][point.x];
		dispatch(addStrokedPoint({ ...point, color: oldColor }));
		dispatch(setPixel({ point: point, color }));
	}
);
