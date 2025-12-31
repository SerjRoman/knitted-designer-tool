import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { COLORS, type Point, type PointWithColor } from "@shared/lib";
import {
	drawingReducers,
	lineReducers,
	shapeReducers,
	selectReducers,
	toolInitialStates,
} from "../tools";
import type { EditorState, EditorTools } from "../types";

const initialState: EditorState = {
	toolState: { tool: "brush", strokedPoints: null },
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
	selectors: {
		selectCurrentColor: (state) => state.currentColor,
		selectToolState: (state) => state.toolState,
		selectClipboard: (state) => state.clipboard,
		selectSelectedPoints: (state) => state.selectedPoints,
	},
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
		clearSelectedPoints(state) {
			state.selectedPoints = null;
		},
		clearClipboard(state) {
			state.clipboard.points = null;
			state.clipboard.origin = null;
		},
		...lineReducers,
		...shapeReducers,
		...selectReducers,
		...drawingReducers,
	},
});

export const {
	selectTool,
	setCurrentColor,
	setLineStartPoint,
	setShapeStartPoint,
	clearShapeState,
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
	addStrokedPoint,
	clearStrokedPoints,
	setShape,
} = editorSlice.actions;
export const {
	selectClipboard,
	selectCurrentColor,
	selectSelectedPoints,
	selectToolState,
} = editorSlice.selectors;
