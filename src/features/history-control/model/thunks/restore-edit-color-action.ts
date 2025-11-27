import { changeColorInGrid } from "@/entities/canvas";
import { setCurrentColor } from "@/entities/editor";
import type { EditColorActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/lib";

export const undoEditColorAction = createAppAsyncThunk(
	"history/undoEditColorAction",
	(payload: EditColorActionPayload, { dispatch, getState }) => {
		const {
			canvas: { colors },
		} = getState();
		const isEditedColorInPalette = colors.findIndex(
			(color) => color === payload.colorBefore
		);
		if (!isEditedColorInPalette) return;
		dispatch(
			changeColorInGrid({
				colorToChange: payload.colorAfter,
				newColor: payload.colorBefore,
			})
		);
		dispatch(setCurrentColor(payload.colorBefore));
	}
);

export const redoEditColorAction = createAppAsyncThunk(
	"history/redoEditColorAction",
	(payload: EditColorActionPayload, { dispatch }) => {
		dispatch(
			changeColorInGrid({
				colorToChange: payload.colorBefore,
				newColor: payload.colorAfter,
			})
		);
		dispatch(setCurrentColor(payload.colorAfter));
	}
);
