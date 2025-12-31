import { selectGrid, setPixels } from "@/entities/canvas";
import {
	clearLineStartPoint,
	selectCurrentColor,
	selectToolState,
} from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import {
	createAppAsyncThunk,
	getLinePoints,
	type Point,
	type PointWithColor,
} from "@/shared/lib";

export const drawLine = createAppAsyncThunk(
	"canvas/draw-preview-line",
	(endPoint: Point, { getState, dispatch }) => {
		const state = getState();
		const toolState = selectToolState(state);
		const currentColor = selectCurrentColor(state);
		const grid = selectGrid(state);

		if (toolState.tool !== "line" || !toolState.startPoint) return;
		const pointsToFill = getLinePoints(toolState.startPoint, endPoint);
		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];
		pointsToFill.forEach((point) => {
			const oldColor = grid[point.y][point.x];
			pointsBefore.push({ ...point, color: oldColor });
			pointsAfter.push({ ...point, color: currentColor });
		});
		dispatch(setPixels({ points: pointsToFill, color: currentColor }));
		dispatch(clearLineStartPoint());

		dispatch(
			addActionToHistory({
				type: "DRAW",
				payload: {
					pointsBefore,
					pointsAfter,
				},
			})
		);
	}
);
