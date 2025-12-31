import { changeColorInGrid } from "@/entities/canvas";
import { selectCurrentColor, setCurrentColor } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const changeColorToCustom = createAppAsyncThunk(
	"editor/change-color-to-custom",
	(newColor: string, { getState, dispatch }) => {
		const state = getState();
		const currentColor = selectCurrentColor(state);
		dispatch(changeColorInGrid({ colorToChange: currentColor, newColor }));

		dispatch(
			addActionToHistory({
				type: "EDIT_COLOR",
				payload: {
					colorBefore: currentColor,
					colorAfter: newColor,
				},
			})
		);
		dispatch(setCurrentColor(newColor));
	}
);
