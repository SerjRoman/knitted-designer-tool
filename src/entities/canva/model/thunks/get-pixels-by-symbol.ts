import type { PointWithCode } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store/store";
import { decodeColorId, decodeSymbolId, encodeCellCode } from "../cell-codec";
import { selectGrid } from "../slices";
import type { StitchSymbol } from "../symbols";

interface GetPixelsByCodePayload {
	symbol: StitchSymbol;
}

export const getPixelsBySymbolWithSymbols = createAppAsyncThunk<
	PointWithCode[],
	GetPixelsByCodePayload
>(
	"canvas/getPixelsBySymbol/withSymbols",
	async (payload: GetPixelsByCodePayload, { getState }) => {
		const state = getState();
		const symbols = state.canvas.symbols;
		const symbolId = symbols.indexOf(payload.symbol);
		if (symbolId === -1) return [];
		const grid = selectGrid(state);
		const pixelsWithCode: PointWithCode[] = [];
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				if (decodeSymbolId(grid[y][x]) === symbolId) {
					pixelsWithCode.push({
						x,
						y,
						code: encodeCellCode({
							colorId: decodeColorId(grid[y][x]),
							symbolId,
						}),
					});
				}
			}
		}
		return pixelsWithCode;
	},
);
