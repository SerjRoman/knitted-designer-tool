import type { PayloadAction } from "@reduxjs/toolkit";
import type { Point } from "@/shared/lib";
import type { EditorState } from "../types";

function setSelectStartPoint(
	state: EditorState,
	{ payload }: PayloadAction<Point>,
) {
	if (state.toolState.tool === "select") {
		state.toolState.startPoint = payload;
	}
}
function setSelectedPoints(
	state: EditorState,
	{ payload }: PayloadAction<Point[]>,
) {
	if (state.toolState.tool === "select") {
		state.selectedPoints = payload;
	}
}
function addSelectedPoint(
	state: EditorState,
	{ payload }: PayloadAction<Point>,
) {
	if (state.toolState.tool === "select") {
		state.selectedPoints ??= [];
		const isPointInSelected = state.selectedPoints.find(
			(p) => p.x === payload.x && p.y === payload.y,
		);
		if (isPointInSelected) return;
		state.selectedPoints.push(payload);
	}
}

function removeSelectedPoint(
	state: EditorState,
	{ payload }: PayloadAction<Point>,
) {
	if (state.toolState.tool === "select" && state.selectedPoints) {
		state.selectedPoints = state.selectedPoints.filter((point) => {
			const isX = point.x === payload.x;
			const isY = point.y === payload.y;
			return !(isX && isY);
		});
	}
}
function clearSelectStartPoint(state: EditorState) {
	if (state.toolState.tool === "select") {
		state.toolState.startPoint = null;
	}
}

export const selectReducers = {
	addSelectedPoint,
	removeSelectedPoint,
	setSelectStartPoint,
	setSelectedPoints,
	clearSelectStartPoint,
};
