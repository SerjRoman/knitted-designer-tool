import {
	addColor,
	removeColor,
	selectColors,
	setPixelsWithCode,
} from "@/entities/canva";
import type { MergeColorActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const undoMergeColorAction = createAppAsyncThunk<
	void,
	MergeColorActionPayload
>(
	"history/undoMergeColorAction",
	({ pixelsBefore, colorToMerge }, { dispatch, getState }) => {
		const colors = selectColors(getState());
		if (!colors.includes(colorToMerge)) {
			dispatch(addColor(colorToMerge));
		}

		dispatch(setPixelsWithCode({ points: pixelsBefore }));
	},
);
export const redoMergeColorAction = createAppAsyncThunk<
	void,
	MergeColorActionPayload
>(
	"history/redoMergeColorAction",
	({ pixelsAfter, newColor, colorToMerge }, { dispatch, getState }) => {
		const colors = selectColors(getState());
		if (!colors.includes(newColor)) {
			dispatch(addColor(newColor));
		}
		if (colors.includes(colorToMerge)) {
			dispatch(removeColor(colorToMerge));
		}
		dispatch(setPixelsWithCode({ points: pixelsAfter }));
	},
);
