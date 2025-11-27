import { setPixelsWithColor, updateGridSizes } from "@/entities/canvas";
import type { ChangeGridSizesActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/lib";

export const undoChangeGridSizesAction = createAppAsyncThunk(
	"history/undoChangeGridSizesAction",
	(
		{ sizesBefore, lostPixels }: ChangeGridSizesActionPayload,
		{ dispatch }
	) => {
		dispatch(updateGridSizes({ ...sizesBefore }));
		if (lostPixels && lostPixels.length > 0) {
			dispatch(setPixelsWithColor({ points: lostPixels }));
		}
	}
);
export const redoChangeGridSizesAction = createAppAsyncThunk(
	"history/undoChangeGridSizesAction",
	({ sizesAfter }: ChangeGridSizesActionPayload, { dispatch }) => {
		dispatch(updateGridSizes({ ...sizesAfter }));
	}
);
