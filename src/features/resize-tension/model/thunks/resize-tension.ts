import {
	selectPixelHeight,
	selectPixelWidth,
	setPixelDimensions,
} from "@/entities/canvas";
import { addActionToHistory } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/lib";

export const resizeTension = createAppAsyncThunk<
	Promise<void>,
	{
		newPixelWidth: number;
		newPixelHeight: number;
	}
>(
	"resizeTension",
	async ({ newPixelWidth, newPixelHeight }, { getState, dispatch }) => {
		const state = getState();
		const pixelWidth = selectPixelWidth(state);
		const pixelheight = selectPixelHeight(state);
		if (newPixelWidth === pixelWidth && newPixelHeight === pixelheight)
			return;
		dispatch(
			setPixelDimensions({ width: newPixelWidth, heigth: newPixelHeight })
		);

		dispatch(
			addActionToHistory({
				type: "CHANGE_PIXEL_DIMENSIONS",
				payload: {
					pixelHeightBefore: pixelheight,
					pixelHeightAfter: newPixelHeight,
					pixelWidthBefore: pixelWidth,
					pixelWidthtAfter: newPixelWidth,
				},
			})
		);
	}
);
