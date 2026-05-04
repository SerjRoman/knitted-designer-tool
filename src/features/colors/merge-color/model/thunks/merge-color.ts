import { decodeColorId, removeColor, replaceColorId, setPixelsWithCode } from "@/entities/canva";
import { addActionToHistory } from "@/entities/history";
import type { PointWithCode } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

interface MergeColorPayload {
	colorToMerge: string;
	newColor: string;
	pixels: PointWithCode[];
}

export const mergeColor = createAppAsyncThunk(
	"features/colors/mergeColor",
	async (payload: MergeColorPayload, { dispatch, getState }) => {
		const { colorToMerge, newColor, pixels } = payload;
		if (colorToMerge === newColor) return;
		const colors = getState().canvas.colors;
		const colorToMergeId = colors.indexOf(colorToMerge);
		const newColorId = colors.indexOf(newColor);
		if (colorToMergeId === -1 || newColorId === -1) return;
		const pixelsBefore = pixels
			.filter((pixel) => decodeColorId(pixel.code) === colorToMergeId)
			.map((pixel) => ({ ...pixel }));
		const pixelsAfter = pixelsBefore.map((pixel) => ({
			...pixel,
			code: replaceColorId(pixel.code, newColorId),
		}));
		dispatch(
			setPixelsWithCode({
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
