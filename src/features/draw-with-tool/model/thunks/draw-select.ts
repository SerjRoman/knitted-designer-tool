import {
	clearSelectStartPoint,
	selectSelectedPoints,
	selectToolState,
	setSelectedPoints,
} from "@/entities/editor";
import { type Point, getRectPoints } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const drawSelect = createAppAsyncThunk(
	"canvas/draw-select",
	(endPoint: Point, { getState, dispatch }) => {
		const state = getState();
		const toolState = selectToolState(state);
		const selectedPoints = selectSelectedPoints(state);

		if (toolState.tool !== "select") return;

		if (!toolState.startPoint || selectedPoints) return;
		const rectSelectedPoints = getRectPoints(
			toolState.startPoint,
			endPoint
		);
		dispatch(setSelectedPoints(rectSelectedPoints));
		dispatch(clearSelectStartPoint());
	}
);
