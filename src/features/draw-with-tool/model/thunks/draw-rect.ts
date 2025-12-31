import { selectGrid, setPixels } from "@/entities/canvas";
import {
	clearShapeState,
	selectCurrentColor,
	selectToolState,
} from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import {
	createAppAsyncThunk,
	getRectPoints,
	type Point,
	type PointWithColor,
} from "@/shared/lib";

export const drawRect = createAppAsyncThunk(
	"canvas/draw-rect",
	(endPoint: Point, { getState, dispatch }) => {
		const state = getState();
		const toolState = selectToolState(state);
		const grid = selectGrid(state);
		const currentColor = selectCurrentColor(state);
		if (
			toolState.tool !== "shape" ||
			toolState.shape !== "rect" ||
			!toolState.startPoint
		)
			return;
		const pointsToFill = getRectPoints(toolState.startPoint, endPoint);

		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];
		pointsToFill.forEach((point) => {
			const oldColor = grid[point.y][point.x];
			pointsBefore.push({ ...point, color: oldColor });
			pointsAfter.push({ ...point, color: currentColor });
		});

		dispatch(setPixels({ points: pointsToFill, color: currentColor }));
		dispatch(clearShapeState());

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
