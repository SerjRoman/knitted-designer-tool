import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { COLORS } from "@shared/lib";
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
} = editorSlice.actions;
