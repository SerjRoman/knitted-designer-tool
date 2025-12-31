import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@app/store";

export type AppStateSchema = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppStateSchema;
	dispatch: AppDispatch;
	rejectValue: { message: string };
}>();

export const useAppSelector = useSelector.withTypes<AppStateSchema>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
