import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixel } from "@/entities/canvas";
import { addStrokedPoint } from "@/entities/editor";
import type { AppStateSchema, Point } from "@/shared/lib";

export const drawPixel = createAsyncThunk(
	"canvas/draw-pixel",
	async (point: Point, { getState, dispatch }) => {
		const {
			canvas: { backgroundColor, grid },
		} = getState() as AppStateSchema;
		const {
			editor: {
				currentColor,
				toolState: { tool },
			},
		} = getState() as AppStateSchema;
		const color = tool === "eraser" ? backgroundColor : currentColor;
		const oldColor = grid[point.y][point.x];
		dispatch(addStrokedPoint({ ...point, color: oldColor }));
		dispatch(setPixel({ point: point, color }));
	}
);
