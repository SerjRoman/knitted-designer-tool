import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ViewportSlice {
	scale: number;
	offset: { x: number; y: number };
	isPanning: boolean;
}

const initialState: ViewportSlice = {
	scale: 1,
	offset: { x: 0, y: 0 },
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
		updateZoomScale(state, { payload }: PayloadAction<number>) {
			state.scale += payload;
		},
		updateOffset(
			state,
			{ payload }: PayloadAction<{ x: number; y: number }>
		) {
			state.offset.x += payload.x;
			state.offset.y += payload.y;
		},
	},
});

export const { startPanning, endPanning, updateZoomScale, updateOffset } =
	viewportSlice.actions;
