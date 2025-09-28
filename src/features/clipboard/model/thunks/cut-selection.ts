import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixel } from "@/entities/canvas";
import type { AppStateSchema } from "@/shared/lib";
import { copySelection } from "./copy-selection";

export const cutSelection = createAsyncThunk(
	"editor/copy-selection",
	async (_, { getState, dispatch }) => {
		const {
			editor: { selectedPoints },
		} = getState() as AppStateSchema;
		const {
			canvas: { backgroundColor },
		} = getState() as AppStateSchema;
		if (!selectedPoints || selectedPoints.length === 0) return;
		const pointsToClear = [...selectedPoints];
		await dispatch(copySelection());

		pointsToClear.forEach((point) => {
			dispatch(setPixel({ point, color: backgroundColor }));
		});
	}
);
