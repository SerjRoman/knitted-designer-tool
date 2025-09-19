import type { PayloadAction } from "@reduxjs/toolkit";
import type { Point } from "@/shared/lib";
import type { EditorState } from "../types";

function setLineStartPoint(
	state: EditorState,
	{ payload }: PayloadAction<Point>
) {
	if (state.toolState.tool === "line") {
		state.toolState.startPoint = payload;
	}
}
function clearLineStartPoint(state: EditorState) {
	if (state.toolState.tool === "line") {
		state.toolState.startPoint = null;
	}
}

export const lineReducers = {
	setLineStartPoint,
	clearLineStartPoint,
};
