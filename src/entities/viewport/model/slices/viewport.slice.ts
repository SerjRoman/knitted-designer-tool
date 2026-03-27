import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { MAX_ZOOM, MIN_ZOOM } from "../constants/constants";

interface ViewportSlice {
	scale: number;
	offsets: { x: number; y: number };
	isPanning: boolean;
}

const initialState: ViewportSlice = {
	scale: 1,
	offsets: { x: 50, y: 50 },
	isPanning: false,
};

export const viewportSlice = createSlice({
	initialState,
	name: "viewport",
	selectors: {
		selectZoomScale: (state: ViewportSlice) => state.scale,
		selectOffsets: (state: ViewportSlice) => state.offsets,
		selectIsPanning: (state: ViewportSlice) => state.isPanning,
	},
	reducers: {
		startPanning(state) {
			state.isPanning = true;
		},
		endPanning(state) {
			state.isPanning = false;
		},
		setZoomScale(state, { payload }: PayloadAction<number>) {
			if (payload < MIN_ZOOM || payload > MAX_ZOOM) return;
			state.scale = payload;
		},
		setOffset(state, { payload }: PayloadAction<{ x: number; y: number }>) {
			state.offsets.x = payload.x;
			state.offsets.y = payload.y;
		},
	},
});

export const { startPanning, endPanning, setZoomScale, setOffset } =
	viewportSlice.actions;
export const { selectZoomScale, selectOffsets, selectIsPanning } =
	viewportSlice.selectors;
