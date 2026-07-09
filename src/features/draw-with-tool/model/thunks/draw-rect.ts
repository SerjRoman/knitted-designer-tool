import {
	buildPaintDiff,
	createPaint,
	paintToCellCode,
	selectGrid,
	setPixels,
} from "@/entities/canva";
import {
	clearShapeState,
	selectCurrentColorId,
	selectCurrentSymbolId,
	selectToolState,
} from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { getRectPoints, type Point } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const drawRect = createAppAsyncThunk(
	"canvas/draw-rect",
	(endPoint: Point, { getState, dispatch }) => {
		const state = getState();
		const toolState = selectToolState(state);
		const grid = selectGrid(state);
		const currentColorId = selectCurrentColorId(state);
		const currentSymbolId = selectCurrentSymbolId(state);
		if (
			toolState.tool !== "shape" ||
			toolState.shape !== "rect" ||
			!toolState.startPoint
		)
			return;
		const pointsToFill = getRectPoints(toolState.startPoint, endPoint);
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
		dispatch(clearShapeState());

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
