import { removeColor, setPixelsWithColor } from "@/entities/canva";
import { addActionToHistory } from "@/entities/history";
import type { PointWithColor } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

interface MergeColorPayload {
	colorToMerge: string;
	newColor: string;
	pixels: PointWithColor[];
}

export const mergeColor = createAppAsyncThunk(
	"features/colors/mergeColor",
	async (payload: MergeColorPayload, { dispatch }) => {
		const { colorToMerge, newColor, pixels } = payload;
		if (colorToMerge === newColor) return;
		const pixelsAfter = pixels.map((pixel) => ({
			...pixel,
			color: newColor,
		}));
		const pixelsBefore = pixels.map((pixel) => ({
			...pixel,
			color: colorToMerge,
		}));
		dispatch(
			setPixelsWithColor({
				points: pixelsAfter,
			}),
		);
		dispatch(removeColor(colorToMerge));

		dispatch(
			addActionToHistory({
				type: "MERGE_COLOR",
				payload: {
					pixelsBefore,
					pixelsAfter,
					colorToMerge,
					newColor,
				},
			}),
		);
	},
);
