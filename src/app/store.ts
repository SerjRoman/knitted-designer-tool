import { configureStore } from "@reduxjs/toolkit";
import { canvsaSlice } from "@/entities/canvas";
import { editorSlice } from "@/entities/editor";
import { viewportSlice } from "@/entities/viewport";

export const store = configureStore({
	reducer: {
		[canvsaSlice.reducerPath]: canvsaSlice.reducer,
		[viewportSlice.reducerPath]: viewportSlice.reducer,
		[editorSlice.reducerPath]: editorSlice.reducer,
	},
});
