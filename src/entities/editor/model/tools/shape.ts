import type { PayloadAction } from "@reduxjs/toolkit";
import type { Point } from "@/shared/lib";
import type { EditorState, Shapes } from "../types";

function setShapeStartPoint(
	state: EditorState,
	{ payload }: PayloadAction<Point>
) {
	if (state.toolState.tool === "shape") {
		state.toolState.startPoint = payload;
	}
}
function clearShapeState(state: EditorState) {
	if (state.toolState.tool === "shape") {
		state.toolState.startPoint = null;
	}
}
function setShape(state: EditorState, { payload }: PayloadAction<Shapes>) {
	if (state.toolState.tool === "shape") {
		state.toolState.shape = payload;
	}
}

export const shapeReducers = {
	setShapeStartPoint,
	clearShapeState,
	setShape,
};
