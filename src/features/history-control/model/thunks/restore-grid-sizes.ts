import { setPixelsWithColor, updateGridSizes } from "@/entities/canva";
import type { ChangeGridSizesActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const undoChangeGridSizesAction = createAppAsyncThunk<
	void,
	ChangeGridSizesActionPayload
>(
	"history/undoChangeGridSizesAction",
	({ sizesBefore, lostPixels }, { dispatch }) => {
		dispatch(updateGridSizes({ ...sizesBefore }));
		if (lostPixels && lostPixels.length > 0) {
			dispatch(setPixelsWithColor({ points: lostPixels }));
		}
	},
);
export const redoChangeGridSizesAction = createAppAsyncThunk<
	void,
	ChangeGridSizesActionPayload
>(
	"history/redoChangeGridSizesAction",
	({ sizesAfter }: ChangeGridSizesActionPayload, { dispatch }) => {
		dispatch(updateGridSizes({ ...sizesAfter }));
	},
);
