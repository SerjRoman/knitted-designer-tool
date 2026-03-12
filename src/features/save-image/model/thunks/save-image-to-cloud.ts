import { ApiClient } from "@/shared/api";
import { transformGridToApiFormat } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const saveImageToCloud = createAppAsyncThunk<void, { filename: string }>(
	"editor/save-image-to-cloud",
	async ({ filename }, { getState, rejectWithValue }) => {
		const {
			canvas: { colors, grid, numberOfColumns, numberOfRows },
		} = getState();

		const dataToSend = transformGridToApiFormat(
			grid,
			colors,
			numberOfColumns,
			numberOfRows,
		);
		try {
			const { response } = await ApiClient.Post(
				"https://assets.knittedforyou.com/save-json",
				{ filename: filename + ".json", content: dataToSend },
			);
			console.log(response);

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
