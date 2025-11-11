import { configureStore } from "@reduxjs/toolkit";
import { saveImageSlice } from "@/features/save-image";
import { uploadImageSlice } from "@/features/upload-image";
import { canvasSlice } from "@/entities/canvas";
import { editorSlice } from "@/entities/editor";
import { viewportSlice } from "@/entities/viewport";

export const store = configureStore({
	reducer: {
		[canvasSlice.reducerPath]: canvasSlice.reducer,
		[viewportSlice.reducerPath]: viewportSlice.reducer,
		[editorSlice.reducerPath]: editorSlice.reducer,
		[uploadImageSlice.reducerPath]: uploadImageSlice.reducer,
		[saveImageSlice.reducerPath]: saveImageSlice.reducer,
	},
});
