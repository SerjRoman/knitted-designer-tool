import { selectGrid, setPixelsWithColor } from "@/entities/canvas";
import { selectClipboard, selectToolState } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import {
	createAppAsyncThunk,
	type Point,
	type PointWithColor,
} from "@/shared/lib";

export const pasteFromClipboard = createAppAsyncThunk(
	"editor/paster-from-clipboard",
	(offsetPoint: Point, { getState, dispatch }) => {
		const state = getState();
		const clipboard = selectClipboard(state);
		const toolState = selectToolState(state);
		const grid = selectGrid(state);
		if (
			!clipboard.origin ||
			!clipboard.points ||
			toolState.tool !== "paste"
		)
			return;
		const origin = {
			x: offsetPoint.x - clipboard.origin.x,
			y: offsetPoint.y - clipboard.origin.y,
		};
		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];
		clipboard.points.forEach((point) => {
			const [x, y] = [point.x + origin.x, point.y + origin.y];
			if (x < 0 || y < 0 || y >= grid.length || x >= grid[y].length)
				return;
			const pointAfter = {
				x: x,
				y: y,
				color: point.color,
			};
			const pointBefore = {
				x,
				y,
				color: grid[y][x],
			};
			pointsAfter.push(pointAfter);
			pointsBefore.push(pointBefore);
		});
		dispatch(setPixelsWithColor({ points: pointsAfter }));

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
