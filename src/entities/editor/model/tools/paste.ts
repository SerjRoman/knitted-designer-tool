import type { PayloadAction } from "@reduxjs/toolkit";
import type { EditorState } from "../types";

function setPasteRepeat(
	state: EditorState,
	{ payload }: PayloadAction<boolean>,
) {
	if (state.toolState.tool !== "paste") return;
	state.toolState.repeat = payload;
}

export const pasteReducers = {
	setPasteRepeat,
};
