import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppStateSchema, Point } from "@/shared/lib";
import { drawPixelWithColor } from "./draw-pixel-with-color";

export const drawPixel = createAsyncThunk(
	"canvas/draw-pixel",
	async (point: Point, { getState, dispatch }) => {
		const {
			canvas: { backgroundColor },
		} = getState() as AppStateSchema;
		const {
			editor: {
				currentColor,
				toolState: { tool },
			},
		} = getState() as AppStateSchema;
		const color = tool === "eraser" ? backgroundColor : currentColor;

		await dispatch(drawPixelWithColor({ x: point.x, y: point.y, color }));
	}
);
