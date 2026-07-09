import {
	buildPaintDiff,
	createPaint,
	paintToCellCode,
	selectGrid,
	setPixels,
} from "@/entities/canva";
import {
	clearLineStartPoint,
	selectCurrentColorId,
	selectCurrentSymbolId,
	selectToolState,
} from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { getLinePoints, type Point } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const drawLine = createAppAsyncThunk(
	"canvas/draw-preview-line",
	(endPoint: Point, { getState, dispatch }) => {
		const state = getState();
		const toolState = selectToolState(state);
		const currentColorId = selectCurrentColorId(state);
		const currentSymbolId = selectCurrentSymbolId(state);
		const grid = selectGrid(state);

		if (toolState.tool !== "line" || !toolState.startPoint) return;
		const pointsToFill = getLinePoints(toolState.startPoint, endPoint);
		const nextPaint = createPaint(currentColorId, currentSymbolId);
		const paintDiff = buildPaintDiff({
			points: pointsToFill,
			grid,
			nextPaint,
		});
		dispatch(
			setPixels({
				points: pointsToFill,
				code: paintToCellCode(nextPaint),
			}),
		);
		dispatch(clearLineStartPoint());

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
