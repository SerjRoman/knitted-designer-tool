import { addColor, changeColorInGrid, removeColor } from "@/entities/canva";
import { setCurrentColorId } from "@/entities/editor";
import type { AddColorActionPayload } from "@/entities/history";
import { BACKGROUND_COLOR } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const undoAddColorAction = createAppAsyncThunk(
	"history/undoAddColorAction",
	(payload: AddColorActionPayload, { getState, dispatch }) => {
		const {
			canvas: { colors },
		} = getState();
		const colorToRemove = payload.color;
		let colorInsteadOfRemoved: string = BACKGROUND_COLOR;

		const whiteColorFromPalette = colors.find(
			(color) => color === BACKGROUND_COLOR,
		);
		const firstColorInPalette = colors.at(0);
		if (whiteColorFromPalette) {
			colorInsteadOfRemoved = whiteColorFromPalette;
		} else if (firstColorInPalette) {
			colorInsteadOfRemoved = firstColorInPalette;
		} else {
			dispatch(addColor(BACKGROUND_COLOR));
		}

		dispatch(
			changeColorInGrid({
				colorToChange: colorToRemove,
				newColor: colorInsteadOfRemoved,
			}),
		);
		dispatch(removeColor(colorToRemove));
		dispatch(setCurrentColorId(2)); // CHANGE
	},
);
export const redoAddColorAction = createAppAsyncThunk(
	"history/redoAddColorAction",
	(payload: AddColorActionPayload, { dispatch }) => {
		dispatch(addColor(payload.color));
		dispatch(setCurrentColorId(1)); // CHANGE
	},
);
