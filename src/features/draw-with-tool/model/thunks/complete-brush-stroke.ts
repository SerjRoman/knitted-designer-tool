import { createAsyncThunk } from "@reduxjs/toolkit";
import { addActionToHistory, clearStrokedPoints } from "@/entities/editor";
import type { AppStateSchema, PointWithColor } from "@/shared/lib";

export const completeBrushStroke = createAsyncThunk(
	"editor/complete-brush-stroke",
	(_, { dispatch, getState }) => {
		const {
			editor: { currentColor, toolState },
		} = getState() as AppStateSchema;
		const {
			canvas: { backgroundColor },
		} = getState() as AppStateSchema;
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
					pointsBefore,
					pointsAfter,
				})
			);
		}
		dispatch(clearStrokedPoints());
	}
);
