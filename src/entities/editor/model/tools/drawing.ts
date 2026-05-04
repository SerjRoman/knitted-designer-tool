import type { PayloadAction } from "@reduxjs/toolkit";
import type { PointWithCode } from "@/shared/lib";
import type { EditorState } from "../types";

function addStrokedPoint(
	state: EditorState,
	{ payload }: PayloadAction<PointWithCode>,
) {
	if (state.toolState.tool !== "eraser" && state.toolState.tool !== "brush")
		return;
	state.toolState.strokedPoints ??= [];
	if (
		state.toolState.strokedPoints.some(
			(point) => point.x === payload.x && point.y === payload.y,
		)
	)
		return;
	state.toolState.strokedPoints.push(payload);
}

function clearStrokedPoints(state: EditorState) {
	if (state.toolState.tool !== "eraser" && state.toolState.tool !== "brush")
		return;
	state.toolState.strokedPoints = null;
}

export const drawingReducers = {
	clearStrokedPoints,
	addStrokedPoint,
};
