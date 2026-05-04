import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Point, type PointWithCode } from "@shared/lib";
import {
	drawingReducers,
	lineReducers,
	shapeReducers,
	selectReducers,
	toolInitialStates,
	pasteReducers,
} from "../tools";
import type { EditorState, EditorTools } from "../types";

const initialState: EditorState = {
	toolState: { tool: "brush", strokedPoints: null },
	currentColorId: 1,
	currentSymbolId: 0,
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
		selectCurrentColorId: (state) => state.currentColorId,
		selectCurrentSymbolId: (state) => state.currentSymbolId,
		selectToolState: (state) => state.toolState,
		selectClipboard: (state) => state.clipboard,
		selectSelectedPoints: (state) => state.selectedPoints,
	},
	reducers: {
		setTool(state, { payload }: PayloadAction<EditorTools>) {
			state.toolState = toolInitialStates[payload];
		},
		setCurrentColorId(state, { payload }: PayloadAction<number>) {
			state.currentColorId = payload;
		},
		setCurrentSymbolId(state, { payload }: PayloadAction<number>) {
			state.currentSymbolId = payload;
		},
		setClipboardPoints(state, { payload }: PayloadAction<PointWithCode[]>) {
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
		...pasteReducers,
	},
});

export const {
	setTool,
	setCurrentColorId,
	setCurrentSymbolId,
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
	setPasteRepeat,
} = editorSlice.actions;
export const {
	selectClipboard,
	selectCurrentColorId,
	selectCurrentSymbolId,
	selectSelectedPoints,
	selectToolState,
} = editorSlice.selectors;
