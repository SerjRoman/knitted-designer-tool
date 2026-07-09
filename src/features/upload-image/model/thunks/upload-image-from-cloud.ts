import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	updateGridSizes,
	setColors,
	setGrid,
	setSymbols,
	StitchSymbol,
} from "@/entities/canva";
import { setCurrentColorId } from "@/entities/editor";
import { ApiClient } from "@/shared/api";
import { HEXToRGB, type Grid, type ApiImageBody } from "@/shared/lib";

export const uploadImageFromCloud = createAsyncThunk(
	"features/upload-image-from-cloud",
	async (filename: string, { dispatch, rejectWithValue }) => {
		try {
			const { response, data } = await ApiClient.Get<ApiImageBody>(
				`https://assets.knittedforyou.com/motif/${filename}.json`,
			);
			if (!response.ok) {
				console.error("Failed to fetch motif:", response.statusText);
				if (response.status === 500) {
					return rejectWithValue(
						"Server error. Please try again later!",
					);
				}
				if (response.status === 404) {
					return rejectWithValue({
						message:
							"Motif not found. Please check that the motif exists!",
					});
				}
			}
			const { width, height, colors, symbols, rows } = data;
			const RGBColors = colors.map(HEXToRGB);
			const grid: Grid = Array.from<[]>({ length: height }).fill([]);
			for (const row of rows) {
				const transformedRow = row.pixels.flatMap((pixel) => {
					const array = Array.from<number>({
						length: pixel.count,
					}).fill(pixel.code);
					return array;
				});
				grid[row.index] = transformedRow;
			}
			dispatch(setColors(RGBColors));
			dispatch(setSymbols(symbols as StitchSymbol[]));
			dispatch(setCurrentColorId(0));
			dispatch(
				updateGridSizes({
					numberOfColumns: width,
					numberOfRows: height,
				}),
			);
			dispatch(setGrid(grid));
		} catch (error) {
			console.error(error);
			return rejectWithValue({
				message: "Network error. Please try again!",
			});
		}
	},
);
