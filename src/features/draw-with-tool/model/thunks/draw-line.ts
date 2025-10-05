import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixels } from "@/entities/canvas";
import {
	addActionToHistory,
	clearLineStartPoint,
	type Action,
} from "@/entities/editor";
import {
	getLinePixels,
	type AppStateSchema,
	type Point,
	type PointWithColor,
} from "@/shared/lib";

export const drawLine = createAsyncThunk(
	"canvas/draw-preview-line",
	(endPoint: Point, { getState, dispatch }) => {
		const {
			editor: { currentColor, toolState },
		} = getState() as AppStateSchema;
		const {
			canvas: { grid },
		} = getState() as AppStateSchema;
		if (toolState.tool !== "line" || !toolState.startPoint) return;
		const pointsToFill = getLinePixels(toolState.startPoint, endPoint);
		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];
		pointsToFill.forEach((point) => {
			const oldColor = grid[point.y][point.x];
			pointsBefore.push({ ...point, color: oldColor });
			pointsAfter.push({ ...point, color: currentColor });
		});
		dispatch(setPixels({ points: pointsToFill, color: currentColor }));
		dispatch(clearLineStartPoint());

		const historyAction: Omit<Action, "id" | "toolUsed"> = {
			pointsBefore,
			pointsAfter,
		};
		dispatch(addActionToHistory(historyAction));
	}
);
