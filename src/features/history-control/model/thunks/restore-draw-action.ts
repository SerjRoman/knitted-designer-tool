import { setPixelsWithColor } from "@/entities/canvas";
import type { DrawActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/lib";

export const undoDrawAction = createAppAsyncThunk(
	"history/undoDrawAction",
	(payload: DrawActionPayload, { dispatch }) => {
		dispatch(setPixelsWithColor({ points: payload.pointsBefore }));
	}
);
export const redoDrawAction = createAppAsyncThunk(
	"history/redoDrawAction",
	(payload: DrawActionPayload, { dispatch }) => {
		dispatch(setPixelsWithColor({ points: payload.pointsAfter }));
	}
);
