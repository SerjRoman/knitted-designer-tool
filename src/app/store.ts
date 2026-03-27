import { configureStore } from "@reduxjs/toolkit";
import { referenceSlice, uploadImageSlice } from "@/features/upload-image";
import { canvasSlice } from "@/entities/canva";
import { editorSlice } from "@/entities/editor";
import { historySlice } from "@/entities/history";
import { uiSlice } from "@/entities/modal";
import { settingsSlice } from "@/entities/settings";
import { viewportSlice } from "@/entities/viewport";
import { configSlice, productSlice } from "@/shared/store";

const persistSettings = localStorage.getItem("settings");
const preloadedSettings = persistSettings
	? JSON.parse(persistSettings)
	: settingsSlice.getInitialState();

export const store = configureStore({
	reducer: {
		[canvasSlice.reducerPath]: canvasSlice.reducer,
		[viewportSlice.reducerPath]: viewportSlice.reducer,
		[editorSlice.reducerPath]: editorSlice.reducer,
		[uploadImageSlice.reducerPath]: uploadImageSlice.reducer,
		[historySlice.reducerPath]: historySlice.reducer,
		[uiSlice.reducerPath]: uiSlice.reducer,
		[referenceSlice.reducerPath]: referenceSlice.reducer,
		[configSlice.reducerPath]: configSlice.reducer,
		[productSlice.reducerPath]: productSlice.reducer,
		[settingsSlice.reducerPath]: settingsSlice.reducer,
	},
	preloadedState: {
		[settingsSlice.reducerPath]: preloadedSettings,
	},
});
store.subscribe(() => {
	const state = store.getState();
	localStorage.setItem(
		"settings",
		JSON.stringify(state[settingsSlice.reducerPath]),
	);
});
