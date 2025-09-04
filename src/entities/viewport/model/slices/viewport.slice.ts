import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ViewportSlice {
	scale: number;
	offsets: { x: number; y: number };
	isPanning: boolean;
}

const initialState: ViewportSlice = {
	scale: 1,
	offsets: { x: 0, y: 0 },
	isPanning: false,
};

export const viewportSlice = createSlice({
	initialState,
	name: "viewport",
	reducers: {
		startPanning(state) {
			state.isPanning = true;
		},
		endPanning(state) {
			state.isPanning = false;
		},
		setZoomScale(state, { payload }: PayloadAction<number>) {
			state.scale = payload;
		},
		setOffset(
			state,
			{ payload }: PayloadAction<{ x: number; y: number }>
		) {
			state.offsets.x = payload.x;
			state.offsets.y = payload.y;
		},
	},
});

export const { startPanning, endPanning, setZoomScale, setOffset } =
	viewportSlice.actions;
