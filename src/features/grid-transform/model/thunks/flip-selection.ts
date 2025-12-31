import { applyFlip, selectBackgroundColor, selectGrid } from "@/entities/canvas";
import { selectSelectedPoints, setSelectedPoints } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import {
	createAppAsyncThunk,
	getBoundingBox,
	type PointWithColor,
} from "@/shared/lib";

type FlipDirection = "horizontal" | "vertical";

export const flipSelection = createAppAsyncThunk(
	"canvas/flip-selection",
	async (direction: FlipDirection, { getState, dispatch }) => {
		const state = getState();
		const selectedPoints = selectSelectedPoints(state)
        const grid = selectGrid(state)
        const backgroundColor = selectBackgroundColor(state)

		if (!selectedPoints || selectedPoints.length === 0) {
			return;
		}
		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];

		const { minX, maxX, minY, maxY } = getBoundingBox(selectedPoints);

		selectedPoints.forEach((point) => {
			const color = grid[point.y]?.[point.x] ?? backgroundColor;

			const newX =
				direction === "horizontal" ? minX + maxX - point.x : point.x;
			const newY =
				direction === "vertical" ? minY + maxY - point.y : point.y;
			const pointBefore: PointWithColor = {
				...point,
				color,
			};
			const pointAfter: PointWithColor = {
				x: Math.floor(newX),
				y: Math.floor(newY),
				color,
			};
			pointsAfter.push(pointAfter);
			pointsBefore.push(pointBefore);
		});

		const pixelsToClear = selectedPoints;
		const newSelectedPoints = pointsAfter.map(({ x, y }) => ({ x, y }));

		dispatch(applyFlip({ pixelsToClear, pixelsToApply: pointsAfter }));

		dispatch(setSelectedPoints(newSelectedPoints));

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
