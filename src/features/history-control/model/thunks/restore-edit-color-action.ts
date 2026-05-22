import { changeColorInGrid } from "@/entities/canva";
import { setCurrentColorId } from "@/entities/editor";
import type { EditColorActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const undoEditColorAction = createAppAsyncThunk<
	void,
	EditColorActionPayload
>("history/undoEditColorAction", (payload, { dispatch, getState }) => {
	const {
		canvas: { colors },
	} = getState();
	const isEditedColorInPalette = colors.indexOf(payload.colorAfter);
	if (isEditedColorInPalette === -1) return;
	dispatch(
		changeColorInGrid({
			colorToChange: payload.colorAfter,
			newColor: payload.colorBefore,
		}),
	);
	dispatch(setCurrentColorId(isEditedColorInPalette));
});

export const redoEditColorAction = createAppAsyncThunk<
	void,
	EditColorActionPayload
>("history/redoEditColorAction", (payload, { dispatch, getState }) => {
	const {
		canvas: { colors },
	} = getState();
	const isEditedColorInPalette = colors.indexOf(payload.colorBefore);
	if (isEditedColorInPalette === -1) return;
	dispatch(
		changeColorInGrid({
			colorToChange: payload.colorBefore,
			newColor: payload.colorAfter,
		}),
	);
	dispatch(setCurrentColorId(isEditedColorInPalette));
});
