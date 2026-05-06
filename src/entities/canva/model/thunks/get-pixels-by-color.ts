import type { Point, PointWithCode } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store/store";
import { decodeColorId, encodeCellCode } from "../cell-codec";
import { selectGrid } from "../slices";

interface GetPixelsByCodePayload {
	color: string;
}
export const getPixelsByColor = createAppAsyncThunk<
	Point[],
	GetPixelsByCodePayload
>(
	"canvas/getPixelsByColor",
	async (payload: GetPixelsByCodePayload, { getState }) => {
		const state = getState();
		const colors = state.canvas.colors;
		const colorId = colors.indexOf(payload.color);
		if (colorId === -1) return [];
		const grid = selectGrid(state);
		const pixels: Point[] = [];
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				if (decodeColorId(grid[y][x]) === colorId) {
					pixels.push({ x, y });
				}
			}
		}
		return pixels;
	},
);
export const getPixelsByColorWithColors = createAppAsyncThunk<
	PointWithCode[],
	GetPixelsByCodePayload
>(
	"canvas/getPixelsByColor/withColors",
	async (payload: GetPixelsByCodePayload, { getState }) => {
		const state = getState();
		const colors = state.canvas.colors;
		const colorId = colors.indexOf(payload.color);
		if (colorId === -1) return [];
		const grid = selectGrid(state);
		const pixelsWithCode: PointWithCode[] = [];
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				if (decodeColorId(grid[y][x]) === colorId) {
					pixelsWithCode.push({
						x,
						y,
						code: encodeCellCode({ colorId, symbolId: 0 }),
					});
				}
			}
		}
		return pixelsWithCode;
	},
);
