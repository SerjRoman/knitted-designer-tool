import { setPixelDimensions } from "@/entities/canvas";
import type { ChangePixelDimensionsActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/lib";

export const undoChangePixelDimensions = createAppAsyncThunk(
	"history/undoChangePixelDimensions",
	(
		{
			pixelHeightBefore,
			pixelWidthBefore,
		}: ChangePixelDimensionsActionPayload,
		{ dispatch }
	) => {
		dispatch(
			setPixelDimensions({
				width: pixelWidthBefore,
				heigth: pixelHeightBefore,
			})
		);
	}
);
export const redoChangePixelDimensions = createAppAsyncThunk(
	"history/redoChangePixelDimensions",
	(
		{
			pixelHeightAfter,
			pixelWidthtAfter,
		}: ChangePixelDimensionsActionPayload,
		{ dispatch }
	) => {
		dispatch(
			setPixelDimensions({
				width: pixelWidthtAfter,
				heigth: pixelHeightAfter,
			})
		);
	}
);
