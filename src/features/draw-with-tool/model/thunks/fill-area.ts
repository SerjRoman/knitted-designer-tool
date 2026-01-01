import { selectGrid, setPixelsWithColor } from "@/entities/canvas";
import { selectCurrentColor } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import {
	getAdjacentPoints,
	type Point,
	type PointWithColor,
} from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";
export const fillArea = createAppAsyncThunk(
	"editor/fill-area",
	(point: Point, { getState, dispatch }) => {
		const state = getState();
		const grid = selectGrid(state);
		const currentColor = selectCurrentColor(state);
		const colorToFill = grid[point.y][point.x];

		const pointsToFill = getAdjacentPoints(point, grid);
		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];
		pointsToFill.forEach((point) => {
			pointsBefore.push({ ...point, color: colorToFill });
			pointsAfter.push({ ...point, color: currentColor });
		});
		dispatch(setPixelsWithColor({ points: pointsAfter }));
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
