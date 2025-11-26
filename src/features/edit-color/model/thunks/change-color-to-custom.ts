import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeColorInGrid } from "@/entities/canvas";
import { addActionToHistory, setCurrentColor } from "@/entities/editor";
import type { AppStateSchema, PointWithColor } from "@/shared/lib";

export const changeColorToCustom = createAsyncThunk(
	"editor/change-color-to-custom",
	(newColor: string, { getState, dispatch }) => {
		const {
			editor: { currentColor },
			canvas: { grid },
		} = getState() as AppStateSchema;
		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				const color = grid[y][x];
				if (color !== currentColor) continue;
				pointsBefore.push({ x, y, color: currentColor });
				pointsAfter.push({ x, y, color: newColor });
			}
		}
		dispatch(changeColorInGrid({ colorToChange: currentColor, newColor }));
		dispatch(setCurrentColor(newColor));

		dispatch(addActionToHistory({ pointsAfter, pointsBefore }));
	}
);
