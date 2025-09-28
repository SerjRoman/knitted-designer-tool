import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixel } from "@/entities/canvas";
import { clearLineStartPoint } from "@/entities/editor";
import { getLinePixels, type AppStateSchema, type Point } from "@/shared/lib";

export const drawLine = createAsyncThunk(
	"canvas/draw-preview-line",
	(endPoint: Point, { getState, dispatch }) => {
		const {
			editor: { currentColor, toolState },
		} = getState() as AppStateSchema;
		if (toolState.tool !== "line" || !toolState.startPoint) return;
		const pointsToFill = getLinePixels(toolState.startPoint, endPoint);
		pointsToFill.forEach((point) => {
			dispatch(setPixel({ point, color: currentColor }));
		});
		dispatch(clearLineStartPoint());
	}
);
