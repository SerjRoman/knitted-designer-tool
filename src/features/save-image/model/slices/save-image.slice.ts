import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SaveImageState {
	status: "info" | "success" | "error";
	error: string | null;
	filename: string | null;
}

const initialState: SaveImageState = {
	status: "info",
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
});

export const { resetUploadState, setFilename } = saveImageSlice.actions;
export default saveImageSlice.reducer;
