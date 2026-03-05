import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeColorInGrid } from "@/entities/canvas";
import { setCurrentColor } from "@/entities/editor";
import type { AppStateSchema } from "@/shared/lib";

export const changeColorToCustom = createAsyncThunk(
	"editor/change-color-to-custom",
	(newColor: string, { getState, dispatch }) => {
		const {
			editor: { currentColor },
		} = getState() as AppStateSchema;
		dispatch(changeColorInGrid({ colorToChange: currentColor, newColor }));
		dispatch(setCurrentColor(newColor));
	}
);
