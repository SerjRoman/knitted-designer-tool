import { selectGrid } from "@/entities/canvas";
import { selectTool, setCurrentColor } from "@/entities/editor";
import type { Point } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const pickColor = createAppAsyncThunk(
	"canvas/pick-color",
	(point: Point, { getState, dispatch }) => {
		const state = getState();
		const grid = selectGrid(state);

		dispatch(setCurrentColor(grid[point.y][point.x]));
		dispatch(selectTool("brush"));
	}
);
