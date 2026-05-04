import {
	paintToCellCode,
	resolveDrawingPaint,
	selectBackgroundColorId,
} from "@/entities/canva";
import {
	clearStrokedPoints,
	selectCurrentColorId,
	selectCurrentSymbolId,
	selectToolState,
} from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import type { PointWithCode } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const completeBrushStroke = createAppAsyncThunk(
	"editor/complete-brush-stroke",
	(_, { dispatch, getState }) => {
		const state = getState();
		const toolState = selectToolState(state);
		const currentColorId = selectCurrentColorId(state);
		const backgroundColorId = selectBackgroundColorId(state);
		const currentSymbolId = selectCurrentSymbolId(state);
		if (toolState.tool !== "brush" && toolState.tool !== "eraser") return;
		const { strokedPoints } = toolState;
		if (!strokedPoints || strokedPoints.length <= 0) return;
		const pointsBefore: PointWithCode[] = strokedPoints.map((point) => ({
			...point,
		}));
		const paint = resolveDrawingPaint({
			isEraser: toolState.tool === "eraser",
			currentColorId,
			backgroundColorId,
			currentSymbolId,
		});
		const pointsAfter: PointWithCode[] = strokedPoints.map((point) => ({
			...point,
			code: paintToCellCode(paint),
		}));

		if (pointsAfter.length > 0) {
			dispatch(
				addActionToHistory({
					type: "DRAW",
					payload: {
						pointsBefore,
						pointsAfter,
					},
				}),
			);
		}
		dispatch(clearStrokedPoints());
	},
);
