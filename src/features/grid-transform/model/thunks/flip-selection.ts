import {
	applyFlip,
	encodeCellCode,
	selectBackgroundColorId,
	selectGrid,
} from "@/entities/canva";
import { selectSelectedPoints, setSelectedPoints } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { getBoundingBox, type PointWithCode } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

type FlipDirection = "horizontal" | "vertical";

export const flipSelection = createAppAsyncThunk(
	"canvas/flip-selection",
	async (direction: FlipDirection, { getState, dispatch }) => {
		const state = getState();
		const selectedPoints = selectSelectedPoints(state);
		const grid = selectGrid(state);
		const backgroundColorId = selectBackgroundColorId(state);
		const backgroundCode = encodeCellCode({
			colorId: backgroundColorId,
			symbolId: 0,
		});

		if (!selectedPoints || selectedPoints.length === 0) {
			return;
		}
		const pointsBefore: PointWithCode[] = [];
		const pointsAfter: PointWithCode[] = [];

		const { minX, maxX, minY, maxY } = getBoundingBox(selectedPoints);

		selectedPoints.forEach((point) => {
			const code = grid[point.y]?.[point.x] ?? backgroundCode;

			const newX =
				direction === "horizontal" ? minX + maxX - point.x : point.x;
			const newY =
				direction === "vertical" ? minY + maxY - point.y : point.y;
			const pointBefore: PointWithCode = {
				...point,
				code,
			};
			const pointAfter: PointWithCode = {
				x: Math.floor(newX),
				y: Math.floor(newY),
				code,
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
			}),
		);
	},
);
