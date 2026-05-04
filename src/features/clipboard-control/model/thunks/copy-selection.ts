import { selectGrid } from "@/entities/canva";
import {
	clearSelectedPoints,
	selectSelectedPoints,
	setClipboardOrigin,
	setClipboardPoints,
} from "@/entities/editor";
import { getBoundingBox, type PointWithCode } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const copySelection = createAppAsyncThunk(
    "editor/copy-selection",
    async (_, { getState, dispatch }) => {
		const state = getState();
		const grid = selectGrid(state);
		const selectedPoints = selectSelectedPoints(state);
		if (!selectedPoints || selectedPoints.length === 0) return;
		const pointsWithCode: PointWithCode[] = selectedPoints.map(
			(point) => {
				return {
					...point,
					code: grid[point.y][point.x],
				};
			},
		);
		const { maxX, maxY, minX, minY } = getBoundingBox(pointsWithCode);
		const centerX = Math.floor((minX + maxX) / 2);
		const centerY = Math.floor((minY + maxY) / 2);

		const originPoint = { x: centerX, y: centerY };
		dispatch(setClipboardPoints(pointsWithCode));
		dispatch(setClipboardOrigin(originPoint));
		dispatch(clearSelectedPoints());
	},
);
