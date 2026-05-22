import {
	setSymbols,
	setPixelsWithCode,
} from "@/entities/canva";
import type { MergeSymbolActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const undoMergeSymbolAction = createAppAsyncThunk<
	void,
	MergeSymbolActionPayload
>(
	"history/undoMergeSymbolAction",
	({ pixelsBefore, symbolsBefore }, { dispatch }) => {
		dispatch(setSymbols(symbolsBefore));
		dispatch(setPixelsWithCode({ points: pixelsBefore }));
	},
);

export const redoMergeSymbolAction = createAppAsyncThunk<
	void,
	MergeSymbolActionPayload
>(
	"history/redoMergeSymbolAction",
	({ pixelsAfter, symbolsAfter }, { dispatch }) => {
		dispatch(setPixelsWithCode({ points: pixelsAfter }));
		dispatch(setSymbols(symbolsAfter));
	},
);
