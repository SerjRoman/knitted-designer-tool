import { createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "@app/store";

export type AppStateSchema = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppStateSchema;
	dispatch: AppDispatch;
}>();
