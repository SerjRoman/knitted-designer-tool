import { createSlice } from "@reduxjs/toolkit";
import { uploadImageFromCloud } from "../thunks";

interface UploadState {
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialState: UploadState = {
	status: "idle",
	error: null,
};

export const uploadImageSlice = createSlice({
	name: "features/uploadImage",
	initialState,
	reducers: {
		resetUploadState: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(uploadImageFromCloud.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(uploadImageFromCloud.fulfilled, (state) => {
				state.status = "succeeded";
			})
			.addCase(uploadImageFromCloud.rejected, (state, action) => {
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

export const { resetUploadState } = uploadImageSlice.actions;
