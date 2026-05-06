import {
	addColor,
	changeColorInGrid,
	removeColor,
	selectBackgroundColor,
	selectColors,
} from "@/entities/canva";
import { setCurrentColorId } from "@/entities/editor";
import type { AddColorActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const undoAddColorAction = createAppAsyncThunk(
	"history/undoAddColorAction",
	(payload: AddColorActionPayload, { getState, dispatch }) => {
		const state = getState();
		const colors = selectColors(state);
		const backgroundColor = selectBackgroundColor(state);
		const colorToRemove = payload.color;
		let colorInsteadOfRemoved: string = backgroundColor;

		const bgColorFromPalette = colors.find(
			(color) => color === backgroundColor,
		);
		const firstColorInPalette = colors.at(0);
		if (bgColorFromPalette) {
			colorInsteadOfRemoved = bgColorFromPalette;
		} else if (firstColorInPalette) {
			colorInsteadOfRemoved = firstColorInPalette;
		} else {
			dispatch(addColor(backgroundColor));
		}

		dispatch(
			changeColorInGrid({
				colorToChange: colorToRemove,
				newColor: colorInsteadOfRemoved,
			}),
		);
		dispatch(removeColor(colorToRemove));
		const colorId = colors.indexOf(colorInsteadOfRemoved);
		dispatch(setCurrentColorId(colorId));
	},
);
export const redoAddColorAction = createAppAsyncThunk(
	"history/redoAddColorAction",
	(payload: AddColorActionPayload, { getState, dispatch }) => {
		const state = getState();
		const colors = selectColors(state);
		const existingColorId = colors.indexOf(payload.color);
		const nextColorId =
			existingColorId === -1 ? colors.length : existingColorId;
		dispatch(addColor(payload.color));
		dispatch(setCurrentColorId(nextColorId));
	},
);
