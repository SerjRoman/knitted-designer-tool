import {
	encodeCellCode,
	selectBackgroundColorId,
	selectGrid,
	setPixels,
} from "@/entities/canva";
import { selectSelectedPoints } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { type PointWithCode } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";
import { copySelection } from "./copy-selection";

export const cutSelection = createAppAsyncThunk(
	"editor/copy-selection",
	async (_, { getState, dispatch }) => {
		const state = getState();
		const backgroundColorId = selectBackgroundColorId(state);
		const selectedPoints = selectSelectedPoints(state);
		const grid = selectGrid(state);
		const backgroundCode = encodeCellCode({ colorId: backgroundColorId, symbolId: 0 });
		if (!selectedPoints || selectedPoints.length === 0) return;
		const pointsToClear = [...selectedPoints];
		const pointsBefore: PointWithCode[] = [];
		const pointsAfter: PointWithCode[] = [];
		pointsToClear.forEach((point) => {
			const pointBefore = {
				code: grid[point.y][point.x],
				x: point.x,
				y: point.y,
			};
			const pointAfter = {
				code: backgroundCode,
				x: point.x,
				y: point.y,
			};
            pointsAfter.push(pointAfter);
            pointsBefore.push(pointBefore);
		});
		await dispatch(copySelection());

		dispatch(setPixels({ points: pointsToClear, code: backgroundCode }));

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
