import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectTool, setCurrentColor } from "@/entities/editor";
import type { AppStateSchema, Point } from "@/shared/lib";

export const pickColor = createAsyncThunk(
	"canvas/pick-color",
	(point: Point, { getState, dispatch }) => {
		const {
			canvas: { grid },
		} = getState() as AppStateSchema;

		dispatch(setCurrentColor(grid[point.y][point.x]));
		dispatch(selectTool("brush"));
	}
);
