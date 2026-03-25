import { changeColorInGrid } from "@/entities/canva";
import { setCurrentColor } from "@/entities/editor";
import type { EditColorActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const undoEditColorAction = createAppAsyncThunk<
	void,
	EditColorActionPayload
>("history/undoEditColorAction", (payload, { dispatch, getState }) => {
	const {
		canvas: { colors },
	} = getState();
	const isEditedColorInPalette = colors.indexOf(payload.colorBefore);
	if (isEditedColorInPalette === -1) return;
	dispatch(
		changeColorInGrid({
			colorToChange: payload.colorAfter,
			newColor: payload.colorBefore,
		}),
	);
	dispatch(setCurrentColor(payload.colorBefore));
});

export const redoEditColorAction = createAppAsyncThunk<
	void,
	EditColorActionPayload
>("history/redoEditColorAction", (payload, { dispatch }) => {
	dispatch(
		changeColorInGrid({
			colorToChange: payload.colorBefore,
			newColor: payload.colorAfter,
		}),
	);
	dispatch(setCurrentColor(payload.colorAfter));
});
