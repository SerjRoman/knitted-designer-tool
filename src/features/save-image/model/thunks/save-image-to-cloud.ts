import { AxiosError } from "axios";
import { ApiClient } from "@/shared/api";
import { transformGridToApiFormat } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const saveImageToCloud = createAppAsyncThunk(
	"editor/save-image-to-cloud",
	async (_, { getState, rejectWithValue }) => {
		const {
			canvas: { colors, grid, numberOfColumns, numberOfRows },
			"features/saveImage": { filename },
		} = getState();

		const dataToSend = transformGridToApiFormat(
			grid,
			colors,
			numberOfColumns,
			numberOfRows,
		);
		try {
			await ApiClient.Post(
				"https://assets.knittedforyou.com/save-json",
				JSON.stringify({
					filename: filename + ".json",
					content: dataToSend,
				}),
			);
		} catch (error) {
			console.error(error);
			if (error instanceof AxiosError) {
				return rejectWithValue({
					message: "Unknown server error. Please try again later!",
				});
			}
			return rejectWithValue({
				message: "Unhandled server error. Please try again later!",
			});
		}
	},
);
