import { changeColorInGrid } from "@/entities/canva";
import { setCurrentColor } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const changeColorToCustom = createAppAsyncThunk(
	"editor/change-color-to-custom",
	(
		{ prevColor, newColor }: { prevColor: string; newColor: string },
		{ dispatch },
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
		dispatch(setCurrentColor(newColor));
	},
);
