import { decodeColorId, decodeSymbolId, selectGrid } from "@/entities/canva";
import { setCurrentColorId, setCurrentSymbolId, setTool } from "@/entities/editor";
import type { Point } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const pickColor = createAppAsyncThunk(
    "canvas/pick-color",
	(point: Point, { getState, dispatch }) => {
		const state = getState();
		const grid = selectGrid(state);
		const code = grid[point.y][point.x];
		const colorId = decodeColorId(code);
		const symbolId = decodeSymbolId(code);

		dispatch(setCurrentColorId(colorId));
		dispatch(setCurrentSymbolId(symbolId));
		dispatch(setTool("brush"));
	},
);
