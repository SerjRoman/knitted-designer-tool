import {
	selectBackgroundColor,
	selectGrid,
	setPixels,
} from "@/entities/canvas";
import { selectSelectedPoints } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { type PointWithColor } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";
import { copySelection } from "./copy-selection";

export const cutSelection = createAppAsyncThunk(
	"editor/copy-selection",
	async (_, { getState, dispatch }) => {
		const state = getState();
		const backgroundColor = selectBackgroundColor(state);
		const selectedPoints = selectSelectedPoints(state);
		const grid = selectGrid(state);
		if (!selectedPoints || selectedPoints.length === 0) return;
		const pointsToClear = [...selectedPoints];
		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];
		pointsToClear.forEach((point) => {
			const pointBefore = {
				color: grid[point.y][point.x],
				x: point.x,
				y: point.y,
			};
			const pointAfter = {
				color: backgroundColor,
				x: point.x,
				y: point.y,
			};
			pointsAfter.push(pointAfter);
			pointsBefore.push(pointBefore);
		});
		await dispatch(copySelection());

		dispatch(setPixels({ points: pointsToClear, color: backgroundColor }));

		dispatch(
			addActionToHistory({
				type: "DRAW",
				payload: {
					pointsAfter,
					pointsBefore,
				},
			})
		);
	}
);
