import { selectBackgroundColor } from "@/entities/canvas";
import {
	clearStrokedPoints,
	selectCurrentColor,
	selectToolState,
} from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import type { PointWithColor } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const completeBrushStroke = createAppAsyncThunk(
	"editor/complete-brush-stroke",
	(_, { dispatch, getState }) => {
		const state = getState();
		const toolState = selectToolState(state);
		const currentColor = selectCurrentColor(state);
		const backgroundColor = selectBackgroundColor(state);
		if (toolState.tool !== "brush" && toolState.tool !== "eraser") return;
		const { strokedPoints } = toolState;
		if (!strokedPoints || strokedPoints.length <= 0) return;
		const pointsBefore: PointWithColor[] = strokedPoints.map((point) => ({
			...point,
		}));
		const pointsAfter: PointWithColor[] = strokedPoints.map((point) => ({
			...point,
			color: toolState.tool === "brush" ? currentColor : backgroundColor,
		}));

		if (pointsAfter.length > 0) {
			dispatch(
				addActionToHistory({
					type: "DRAW",
					payload: {
						pointsBefore,
						pointsAfter,
					},
				})
			);
		}
		dispatch(clearStrokedPoints());
	}
);
