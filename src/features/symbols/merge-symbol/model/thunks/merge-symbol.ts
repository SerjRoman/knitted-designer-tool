import { decodeSymbolId, removeSymbol, replaceSymbolId, setPixelsWithCode } from "@/entities/canva";
import { addActionToHistory } from "@/entities/history";
import type { PointWithCode } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

interface MergeSymbolPayload {
	symbolToMerge: string;
	newSymbol: string;
	pixels: PointWithCode[];
}

export const mergeSymbol = createAppAsyncThunk(
	"features/symbols/mergeSymbol",
	async (payload: MergeSymbolPayload, { dispatch, getState }) => {
		const { symbolToMerge, newSymbol, pixels } = payload;
		if (symbolToMerge === newSymbol) return;
		const symbols = getState().canvas.symbols;
		const symbolToMergeId = symbols.indexOf(symbolToMerge);
		const newSymbolId = symbols.indexOf(newSymbol);
		if (symbolToMergeId === -1 || newSymbolId === -1) return;
		const pixelsBefore = pixels
			.filter((pixel) => decodeSymbolId(pixel.code) === symbolToMergeId)
			.map((pixel) => ({ ...pixel }));
		const pixelsAfter = pixelsBefore.map((pixel) => ({
			...pixel,
			code: replaceSymbolId(pixel.code, newSymbolId),
		}));
		dispatch(
			setPixelsWithCode({
				points: pixelsAfter,
			}),
		);
		dispatch(removeSymbol(symbolToMerge));

		dispatch(
			addActionToHistory({
				type: "MERGE_SYMBOL",
				payload: {
					pixelsBefore,
					pixelsAfter,
					symbolToMerge,
					newSymbol,
					symbolsBefore: symbols,
					symbolsAfter: symbols.filter((symbol) => symbol !== symbolToMerge),
				},
			}),
		);
	},
);
