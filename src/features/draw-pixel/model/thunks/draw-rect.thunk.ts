import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixel } from "@/entities/canvas";
import { clearLineStartPoint } from "@/entities/editor";
import { getRectPixels, type AppStateSchema, type Point } from "@/shared/lib";

export const drawRect = createAsyncThunk(
	"canvas/draw-preview-rect",
	(endPoint: Point, { getState, dispatch }) => {
		const {
			editor: { currentColor, toolState },
		} = getState() as AppStateSchema;
		if (toolState.tool !== "rect" || !toolState.startPoint) return;
		const pointsToFill = getRectPixels(toolState.startPoint, endPoint);
		pointsToFill.forEach((point) => {
			dispatch(setPixel({ point, color: currentColor }));
		});
		dispatch(clearLineStartPoint());
	}
);
