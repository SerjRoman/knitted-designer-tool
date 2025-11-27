import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixelsWithColor } from "@/entities/canvas";
import { addActionToHistory } from "@/entities/history";
import {
	getAdjacentPoints,
	type AppStateSchema,
	type Point,
	type PointWithColor,
} from "@/shared/lib";
export const fillArea = createAsyncThunk(
	"editor/fill-area",
	(point: Point, { getState, dispatch }) => {
		const {
			canvas: { grid },
			editor: { currentColor },
		} = getState() as AppStateSchema;
		const colorToFill = grid[point.y][point.x];

		const pointsToFill = getAdjacentPoints(point, grid);
		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];
		pointsToFill.forEach((point) => {
			pointsBefore.push({ ...point, color: colorToFill });
			pointsAfter.push({ ...point, color: currentColor });
		});
		dispatch(setPixelsWithColor({ points: pointsAfter }));
		dispatch(
			addActionToHistory({
				type: "DRAW",
				payload: {
					pointsBefore,
					pointsAfter,
				},
			})
		);
	}
);
