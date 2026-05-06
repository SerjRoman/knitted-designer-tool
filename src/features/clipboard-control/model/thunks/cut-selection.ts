import {
	buildPaintDiff,
	encodeCellCode,
	selectBackgroundColorId,
	selectGrid,
	setPixels,
} from "@/entities/canva";
import { selectSelectedPoints } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";
import { copySelection } from "./copy-selection";

export const cutSelection = createAppAsyncThunk(
	"editor/copy-selection",
	async (_, { getState, dispatch }) => {
		const state = getState();
		const backgroundColorId = selectBackgroundColorId(state);
		const selectedPoints = selectSelectedPoints(state);
		const grid = selectGrid(state);
		const backgroundCode = encodeCellCode({
			colorId: backgroundColorId,
			symbolId: 0,
		});
		if (!selectedPoints || selectedPoints.length === 0) return;
		const pointsToClear = buildPaintDiff({
			points: selectedPoints,
			grid,
			nextPaint: { colorId: backgroundColorId, symbolId: 0 },
		});

		await dispatch(copySelection());

		dispatch(
			setPixels({
				points: pointsToClear.pointsAfter,
				code: backgroundCode,
			}),
		);

		dispatch(
			addActionToHistory({
				type: "DRAW",
				payload: {
					pointsAfter: pointsToClear.pointsAfter,
					pointsBefore: pointsToClear.pointsBefore,
				},
			}),
		);
	},
);
