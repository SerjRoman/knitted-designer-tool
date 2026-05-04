import {
	buildPaintDiff,
	createPaint,
	selectGrid,
	setPixelsWithCode,
} from "@/entities/canva";
import {
	selectCurrentColorId,
	selectCurrentSymbolId,
} from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import {
	getAdjacentPoints,
	type Point,
} from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";
export const fillArea = createAppAsyncThunk(
	"editor/fill-area",
	(point: Point, { getState, dispatch }) => {
		const state = getState();
		const grid = selectGrid(state);
		const currentColorId = selectCurrentColorId(state);
		const currentSymbolId = selectCurrentSymbolId(state);
		const pointsToFill = getAdjacentPoints(point, grid);
		const paintDiff = buildPaintDiff({
			points: pointsToFill,
			grid,
			nextPaint: createPaint(currentColorId, currentSymbolId),
		});
		dispatch(setPixelsWithCode({ points: paintDiff.pointsAfter }));
		dispatch(
			addActionToHistory({
				type: "DRAW",
				payload: {
					pointsBefore: paintDiff.pointsBefore,
					pointsAfter: paintDiff.pointsAfter,
				},
			}),
		);
	},
);
