import type { Point, PointWithColor } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store/store";
import { selectGrid } from "../slices";

interface GetPixelsByColorPayload {
	color: string;
}
export const getPixelsByColor = createAppAsyncThunk<
	Point[],
	GetPixelsByColorPayload
>(
	"canvas/getPixelsByColor",
	async (payload: GetPixelsByColorPayload, { getState }) => {
		const state = getState();
		const grid = selectGrid(state);
		const pixels: Point[] = [];
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				if (grid[y][x] === payload.color) {
					pixels.push({ x, y });
				}
			}
		}
		return pixels;
	},
);
export const getPixelsByColorWithColors = createAppAsyncThunk<
	PointWithColor[],
	GetPixelsByColorPayload
>(
	"canvas/getPixelsByColor/withColors",
	async (payload: GetPixelsByColorPayload, { getState }) => {
		const state = getState();
		const grid = selectGrid(state);
		const pixelsWithColor: PointWithColor[] = [];
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				if (grid[y][x] === payload.color) {
					pixelsWithColor.push({ x, y, color: payload.color });
				}
			}
		}
		return pixelsWithColor;
	},
);
