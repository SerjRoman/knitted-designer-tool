import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { COLORS, type Point, type PointWithColor } from "@shared/lib";
import {
	lineReducers,
	rectReducers,
	selectReducers,
	toolInitialStates,
} from "../tools";
import type { EditorState, EditorTools } from "../types";

const initialState: EditorState = {
	toolState: { tool: "brush" },
	currentColor: COLORS.black,
	selectedPoints: null,
	clipboard: {
		points: null,
		origin: null,
	},
};

export const editorSlice = createSlice({
	initialState,
	name: "editor",
	reducers: {
		selectTool(state, { payload }: PayloadAction<EditorTools>) {
			state.toolState = toolInitialStates[payload];
		},
		setCurrentColor(state, { payload }: PayloadAction<string>) {
			state.currentColor = payload;
		},
		setClipboardPoints(
			state,
			{ payload }: PayloadAction<PointWithColor[]>
		) {
			state.clipboard.points = payload;
		},
		setClipboardOrigin(state, { payload }: PayloadAction<Point>) {
			state.clipboard.origin = payload;
		},
		clearSelectedPoints(state: EditorState) {
			state.selectedPoints = null;
		},
		clearClipboard(state: EditorState) {
			state.clipboard.points = null;
			state.clipboard.origin = null;
		},
		...lineReducers,
		...rectReducers,
		...selectReducers,
	},
});

export const {
	selectTool,
	setCurrentColor,
	setLineStartPoint,
	setRectStartPoint,
	clearRectState,
	clearLineStartPoint,
	setSelectStartPoint,
	addSelectedPoint,
	removeSelectedPoint,
	clearSelectedPoints,
	setSelectedPoints,
	clearSelectStartPoint,
	setClipboardPoints,
	setClipboardOrigin,
	clearClipboard,
} = editorSlice.actions;
