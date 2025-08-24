import { configureStore } from "@reduxjs/toolkit";
import { canvsaSlice } from "@/entities/canvas";

export const store = configureStore({
	reducer: {
		[canvsaSlice.reducerPath]: canvsaSlice.reducer,
	},
});
