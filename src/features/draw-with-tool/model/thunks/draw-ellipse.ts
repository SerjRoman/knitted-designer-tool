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
import { getEllipsePoints, type Point } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const drawEllipse = createAppAsyncThunk(
	"canvas/draw-ellipse",
	(endPoint: Point, { getState, dispatch }) => {
		const state = getState();
		const currentColorId = selectCurrentColorId(state);
		const toolState = selectToolState(state);
		const currentSymbolId = selectCurrentSymbolId(state);
		const grid = selectGrid(state);
		if (
			toolState.tool !== "shape" ||
			toolState.shape !== "ellipse" ||
			!toolState.startPoint
		)
			return;
		const pointsToFill = getEllipsePoints(toolState.startPoint, endPoint);
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
