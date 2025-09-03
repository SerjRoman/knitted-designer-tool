import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixel } from "@/entities/canvas";
import type { AppStateSchema, Point } from "@/shared/lib";

export const drawPixel = createAsyncThunk(
	"canvas/draw-pixel",
	(point: Point, { getState, dispatch }) => {
		const {
			canvas: { backgroundColor },
		} = getState() as AppStateSchema;
		const {
			editor: { currentColor, tool },
		} = getState() as AppStateSchema;
		const color = tool === "eraser" ? backgroundColor : currentColor;

		dispatch(setPixel({ point, color }));
	}
);
