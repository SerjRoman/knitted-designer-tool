import { setPixelsWithCode } from "@/entities/canva";
import type { DrawActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const undoDrawAction = createAppAsyncThunk<void, DrawActionPayload>(
	"history/undoDrawAction",
	(payload, { dispatch }) => {
		dispatch(setPixelsWithCode({ points: payload.pointsBefore }));
	},
);
export const redoDrawAction = createAppAsyncThunk<void, DrawActionPayload>(
	"history/redoDrawAction",
	(payload, { dispatch }) => {
		dispatch(setPixelsWithCode({ points: payload.pointsAfter }));
	},
);
