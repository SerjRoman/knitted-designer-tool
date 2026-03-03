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
			const response = await ApiClient.Post(
				"https://assets.knittedforyou.com/save-json",
				JSON.stringify({
					filename: filename + ".json",
					content: dataToSend,
				}),
			);
			if (!response.ok) {
				console.error("Failed to save motif:", response.statusText);
				switch (response.status) {
					case 404:
						return rejectWithValue({
							message: "Not found",
						});
					case 500:
						return rejectWithValue({
							message: "Internal Server Error.",
						});
					default:
						return rejectWithValue({
							message:
								"Unknown server error. Please try again later!",
						});
				}
			}
		} catch (error) {
			console.error(error);
			return rejectWithValue({
				message: "Network error. Please try again later!",
			});
		}
	},
);
