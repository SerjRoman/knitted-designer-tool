import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit/react";
import {
	BACKGROUND_COLOR,
	COLORS,
	GRID_HEIGHT,
	GRID_WIDTH,
	INITIAL_PIXEL_SIZE,
	MAX_PIXEL_SIZE,
	MIN_PIXEL_SIZE,
	type Grid,
	type Point,
} from "@/shared/lib";
import { createEmptyGrid } from "../../lib";

interface CanvasSlice {
	grid: Grid;
	currentColor: string;
	backgroundColor: string;
	gridWidth: number;
	gridHeight: number;
	pixelSize: number;
}
const initialState: CanvasSlice = {
	grid: createEmptyGrid(GRID_WIDTH, GRID_HEIGHT, BACKGROUND_COLOR),
	currentColor: COLORS.black,
	backgroundColor: BACKGROUND_COLOR,
	gridWidth: GRID_WIDTH,
	gridHeight: GRID_HEIGHT,
	pixelSize: INITIAL_PIXEL_SIZE,
};
export const canvsaSlice = createSlice({
	name: "canvas",
	initialState,
	reducers: {
		setColor(state, { payload }: PayloadAction<string>) {
			state.currentColor = payload;
		},
		setBackgroundColor(state, { payload }: PayloadAction<string>) {
			state.backgroundColor = payload;
		},
		setEraser(state) {
			state.currentColor = state.backgroundColor;
		},
		setPixel(state, { payload: { x, y } }: PayloadAction<Point>) {
			state.grid[y][x] = state.currentColor;
		},
		setPixelSize(state, { payload }: PayloadAction<number>) {
			state.pixelSize = Math.max(
				MIN_PIXEL_SIZE,
				Math.min(MAX_PIXEL_SIZE, payload)
			);
		},
	},
});

export const {
	setColor,
	setBackgroundColor,
	setEraser,
	setPixel,
	setPixelSize,
} = canvsaSlice.actions;
