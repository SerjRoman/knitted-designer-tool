import {
	getPointsFromText,
	selectGrid,
	type PixelFontSize,
} from "@/entities/canva";
import {
	selectCurrentColor,
	selectToolState,
	setClipboardOrigin,
	setClipboardPoints,
	setTool,
} from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import type { PointWithColor } from "@/shared/lib";
import { getBoundingBox } from "@/shared/lib/tools/";
import { createAppAsyncThunk } from "@/shared/store";
interface DrawTextPayload {
	text: string;
	size: PixelFontSize;
}
export const drawText = createAppAsyncThunk<void, DrawTextPayload>(
	"canvas/draw-text",
	({ text, size }, { getState, dispatch }) => {
		const state = getState();
		const grid = selectGrid(state);
		const toolState = selectToolState(state);
		const currentColor = selectCurrentColor(state);
		if (toolState.tool !== "insertText") return;
		const pointsToFill = getPointsFromText(text, size);
		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];
		pointsToFill.forEach((point) => {
			const oldColor = grid[point.y][point.x];
			pointsBefore.push({ ...point, color: oldColor });
			pointsAfter.push({ ...point, color: currentColor });
		});
		const { maxX, maxY, minX, minY } = getBoundingBox(pointsToFill);
		const centerX = Math.floor((minX + maxX) / 2);
		const centerY = Math.floor((minY + maxY) / 2);
		const originPoint = { x: centerX, y: centerY };

		dispatch(setClipboardPoints(pointsAfter));
		dispatch(setClipboardOrigin(originPoint));
		dispatch(setTool("paste"));
		dispatch(
			addActionToHistory({
				type: "DRAW",
				payload: {
					pointsBefore,
					pointsAfter,
				},
			}),
		);
	},
);
