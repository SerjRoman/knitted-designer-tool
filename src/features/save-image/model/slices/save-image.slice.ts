import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { saveImageToCloud } from "../thunks";

interface SaveImageState {
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	filename: string | null;
}

const initialState: SaveImageState = {
	status: "idle",
	error: null,
	filename: null,
};

export const saveImageSlice = createSlice({
	name: "features/saveImage",
	initialState,
	reducers: {
		resetUploadState: () => initialState,
		setFilename(state, { payload }: PayloadAction<string>) {
			state.filename = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(saveImageToCloud.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(saveImageToCloud.fulfilled, (state) => {
				state.status = "succeeded";
			})
			.addCase(saveImageToCloud.rejected, (state, action) => {
				state.status = "failed";
				let message = state.error;
				if (
					typeof action.payload === "object" &&
					action.payload &&
					"message" in action.payload
				) {
					message = action.payload.message as string;
				}
				state.error =
					message || "Failure in uploading image. Please try again";
			});
	},
});

export const { resetUploadState, setFilename } = saveImageSlice.actions;
export default saveImageSlice.reducer;
