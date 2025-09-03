import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { COLORS } from "@shared/lib";
import type { EditorTools } from "../types";

interface EditorState {
	tool: EditorTools;
	currentColor: string;
}

const initialState: EditorState = {
	tool: "brush",
	currentColor: COLORS.black,
};

export const editorSlice = createSlice({
	initialState,
	name: "editor",
	reducers: {
		selectTool(state, { payload }: PayloadAction<EditorTools>) {
			state.tool = payload;
		},
		setCurrentColor(state, { payload }: PayloadAction<string>) {
			state.currentColor = payload;
		},
	},
});

export const { selectTool, setCurrentColor } = editorSlice.actions;
