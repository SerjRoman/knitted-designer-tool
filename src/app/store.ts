import { configureStore } from "@reduxjs/toolkit";
import { canvasSlice } from "@/entities/canvas";
import { editorSlice } from "@/entities/editor";
import { viewportSlice } from "@/entities/viewport";

export const store = configureStore({
	reducer: {
		[canvasSlice.reducerPath]: canvasSlice.reducer,
		[viewportSlice.reducerPath]: viewportSlice.reducer,
		[editorSlice.reducerPath]: editorSlice.reducer,
	},
});
