import { setPixelsWithColor } from "@/entities/canva";
import type { DrawActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const undoDrawAction = createAppAsyncThunk<void, DrawActionPayload>(
	"history/undoDrawAction",
	(payload, { dispatch }) => {
		dispatch(setPixelsWithColor({ points: payload.pointsBefore }));
	},
);
export const redoDrawAction = createAppAsyncThunk<void, DrawActionPayload>(
	"history/redoDrawAction",
	(payload, { dispatch }) => {
		dispatch(setPixelsWithColor({ points: payload.pointsAfter }));
	},
);
