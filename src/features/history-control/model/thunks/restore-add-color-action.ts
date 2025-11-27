import { addColor, changeColorInGrid, removeColor } from "@/entities/canvas";
import { setCurrentColor } from "@/entities/editor";
import type { AddColorActionPayload } from "@/entities/history";
import { BACKGROUND_COLOR, createAppAsyncThunk } from "@/shared/lib";

export const undoAddColorAction = createAppAsyncThunk(
	"history/undoAddColorAction",
	(payload: AddColorActionPayload, { getState, dispatch }) => {
		const {
			canvas: { colors },
		} = getState();
		const colorToRemove = payload.color;
		let colorInsteadOfRemoved: string = BACKGROUND_COLOR;

		const whiteColorFromPalette = colors.find(
			(color) => color === BACKGROUND_COLOR
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
			})
		);
		dispatch(removeColor(colorToRemove));
		dispatch(
			setCurrentColor(
				firstColorInPalette ? firstColorInPalette : BACKGROUND_COLOR
			)
		);
	}
);
export const redoAddColorAction = createAppAsyncThunk(
	"history/redoAddColorAction",
	(payload: AddColorActionPayload, { dispatch }) => {
		dispatch(addColor(payload.color));
		dispatch(setCurrentColor(payload.color));
	}
);
