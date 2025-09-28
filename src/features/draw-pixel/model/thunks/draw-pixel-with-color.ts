import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixel } from "@/entities/canvas";
import type { PointWithColor } from "@/shared/lib";

export const drawPixelWithColor = createAsyncThunk(
	"canvas/draw-pixel-with-color",
	({ x, y, color }: PointWithColor, { dispatch }) => {
		dispatch(setPixel({ point: { x, y }, color }));
	}
);
