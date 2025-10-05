import { createAsyncThunk } from "@reduxjs/toolkit";
import { addActionToHistory } from "@/entities/editor";
import type { AppStateSchema, Point, PointWithColor } from "@/shared/lib";

export const completeBrushStroke = createAsyncThunk(
	"editor/complete-brush-stroke",
	(strokePoints: Point[], { dispatch, getState }) => {
		if (strokePoints.length === 0) return;

		const {
			editor: { currentColor },
		} = getState() as AppStateSchema;
		const {
			canvas: { grid },
		} = getState() as AppStateSchema;

		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];

		strokePoints.forEach((point) => {
			const oldColor = grid[point.x]?.[point.y];
			if (oldColor !== undefined && oldColor !== currentColor) {
				pointsBefore.push({ ...point, color: oldColor });
				pointsAfter.push({ ...point, color: currentColor });
			}
		});

		if (pointsAfter.length > 0) {
			dispatch(
				addActionToHistory({
					pointsBefore,
					pointsAfter,
				})
			);
		}
	}
);
