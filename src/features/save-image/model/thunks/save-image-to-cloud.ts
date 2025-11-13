import { AxiosError } from "axios";
import { ApiClient } from "@/shared/api";
import {
	createAppAsyncThunk,
	RGBAToHEX,
	type RowInUploadedImage,
} from "@/shared/lib";

export const saveImageToCloud = createAppAsyncThunk(
	"editor/save-image-to-cloud",
	async (_, { getState, rejectWithValue }) => {
		const {
			canvas: { colors, grid, numberColumns, numberRows },
			"features/saveImage": { filename },
		} = getState();

		const hexColors = colors.map((color) => RGBAToHEX(color));
		const colorsMap = new Map<string, number>();
		for (let index = 0; index < hexColors.length; index++) {
			colorsMap.set(colors[index], index);
		}
		const rows: RowInUploadedImage[] = [];
		for (let y = 0; y < grid.length; y++) {
			const row: RowInUploadedImage = { index: y, pixels: [] };
			for (let x = 0; x < grid[y].length; x++) {
				const lastPixel = row.pixels.at(-1);
				const currentColor = grid[y][x];
				const colorIndex = colorsMap.get(currentColor)!;
				if (lastPixel && lastPixel.color === colorIndex) {
					lastPixel.count++;
					continue;
				} else {
					row.pixels.push({ color: colorIndex, count: 1 });
				}
			}
			rows.push(row);
		}
		const dataToSend = {
			width: numberColumns,
			height: numberRows,
			colors: hexColors,
			rows,
		};
		try {
			await ApiClient.Post(
				"https://assets.knittedforyou.com/save-json",
				JSON.stringify({
					filename: filename+'.json',
					content: dataToSend,
				})
			);
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				return rejectWithValue({
					message: "Unknown server error. Please try again later!",
				});
			}
			return rejectWithValue({
				message: "Unhandled server error. Please try again later!",
			});
		}
	}
);
