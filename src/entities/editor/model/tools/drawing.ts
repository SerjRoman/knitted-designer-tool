import type { PayloadAction } from "@reduxjs/toolkit";
import type { PointWithColor } from "@/shared/lib";
import type { EditorState } from "../types";

function addStrokedPoint(
	state: EditorState,
	{ payload }: PayloadAction<PointWithColor>
) {
	if (state.toolState.tool !== "eraser" && state.toolState.tool !== "brush")
		return;
	if (!state.toolState.strokedPoints) {
		state.toolState.strokedPoints = [];
	}
	if (
		state.toolState.strokedPoints.find(
			(point) => point.x === payload.x && point.y === payload.y
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
