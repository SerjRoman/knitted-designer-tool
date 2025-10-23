import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	clearSelectedPoints,
	setClipboardOrigin,
	setClipboardPoints,
} from "@/entities/editor";
import {
	getBoundingBox,
	type AppStateSchema,
	type PointWithColor,
} from "@/shared/lib";

export const copySelection = createAsyncThunk(
	"editor/copy-selection",
	async (_, { getState, dispatch }) => {
		const {
			editor: { selectedPoints },
		} = getState() as AppStateSchema;
		const {
			canvas: { grid },
		} = getState() as AppStateSchema;
		if (!selectedPoints || selectedPoints.length === 0) return;
		const pointsWithColor: PointWithColor[] = selectedPoints.map(
			(point) => {
				return {
					...point,
					color: grid[point.y][point.x],
				};
			}
		);
		const { maxX, maxY, minX, minY } = getBoundingBox(pointsWithColor);
		const centerX = Math.floor((minX + maxX) / 2);
		const centerY = Math.floor((minY + maxY) / 2);

		const originPoint = { x: centerX, y: centerY };
		dispatch(setClipboardPoints(pointsWithColor));
		dispatch(setClipboardOrigin(originPoint));
		dispatch(clearSelectedPoints());
	}
);
