import {
	setColors,
	setPixelsWithCode,
} from "@/entities/canva";
import type { MergeColorActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const undoMergeColorAction = createAppAsyncThunk<
	void,
	MergeColorActionPayload
>(
	"history/undoMergeColorAction",
	({ pixelsBefore, colorsBefore }, { dispatch }) => {
		dispatch(setColors(colorsBefore));
		dispatch(setPixelsWithCode({ points: pixelsBefore }));
	},
);

export const redoMergeColorAction = createAppAsyncThunk<
	void,
	MergeColorActionPayload
>(
	"history/redoMergeColorAction",
	({ pixelsAfter, colorsAfter }, { dispatch }) => {
		dispatch(setPixelsWithCode({ points: pixelsAfter }));
		dispatch(setColors(colorsAfter));
	},
);
