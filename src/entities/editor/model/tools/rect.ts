import type { PayloadAction } from "@reduxjs/toolkit";
import type { Point } from "@/shared/lib";
import type { EditorState } from "../types";

function setRectStartPoint(
	state: EditorState,
	{ payload }: PayloadAction<Point>
) {
	if (state.toolState.tool === "rect") {
		state.toolState.startPoint = payload;
	}
}
function clearRectState(state: EditorState) {
	if (state.toolState.tool === "rect") {
		state.toolState.startPoint = null;
	}
}

export const rectReducers = {
	setRectStartPoint,
	clearRectState,
};
