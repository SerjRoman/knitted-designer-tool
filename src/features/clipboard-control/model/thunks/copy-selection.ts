import { selectGrid } from "@/entities/canvas";
import {
	clearSelectedPoints,
	selectSelectedPoints,
	setClipboardOrigin,
	setClipboardPoints,
} from "@/entities/editor";
import {
	createAppAsyncThunk,
	getBoundingBox,
	type PointWithColor,
} from "@/shared/lib";

export const copySelection = createAppAsyncThunk(
	"editor/copy-selection",
	async (_, { getState, dispatch }) => {
		const state = getState();
		const grid = selectGrid(state);
		const selectedPoints = selectSelectedPoints(state);
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
