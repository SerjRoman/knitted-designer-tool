import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, AppStateSchema } from "../types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppStateSchema;
	dispatch: AppDispatch;
	rejectValue: { message: string };
}>();
