import {
	changeColorInGrid,
	resolveColorId,
	selectColors,
} from "@/entities/canva";
import { setCurrentColorId } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const changeColorToCustom = createAppAsyncThunk(
	"editor/change-color-to-custom",
	(
		{ prevColor, newColor }: { prevColor: string; newColor: string },
		{ dispatch, getState },
	) => {
		dispatch(changeColorInGrid({ colorToChange: prevColor, newColor }));

		dispatch(
			addActionToHistory({
				type: "EDIT_COLOR",
				payload: {
					colorBefore: prevColor,
					colorAfter: newColor,
				},
			}),
		);
		const color = resolveColorId(selectColors(getState()), newColor);
		if (color) {
			dispatch(setCurrentColorId(color));
		}
	},
);
