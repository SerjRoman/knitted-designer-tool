import { setPixelDimensions } from "@/entities/canva";
import type { ChangePixelDimensionsActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const undoChangePixelDimensions = createAppAsyncThunk<
	void,
	ChangePixelDimensionsActionPayload
>(
	"history/undoChangePixelDimensions",
	({ pixelHeightBefore, pixelWidthBefore }, { dispatch }) => {
		dispatch(
			setPixelDimensions({
				width: pixelWidthBefore,
				heigth: pixelHeightBefore,
			}),
		);
	},
);
export const redoChangePixelDimensions = createAppAsyncThunk<
	void,
	ChangePixelDimensionsActionPayload
>(
	"history/redoChangePixelDimensions",
	({ pixelHeightAfter, pixelWidthAfter }, { dispatch }) => {
		dispatch(
			setPixelDimensions({
				width: pixelWidthAfter,
				heigth: pixelHeightAfter,
			}),
		);
	},
);
