import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixelsWithColor } from "@/entities/canvas";
import { addActionToHistory, type Action } from "@/entities/editor";
import type { AppStateSchema, Point, PointWithColor } from "@/shared/lib";

export const pasteFromClipboard = createAsyncThunk(
	"editor/paster-from-clipboard",
	(offsetPoint: Point, { getState, dispatch }) => {
		const {
			editor: { clipboard, toolState },
			canvas: { grid },
		} = getState() as AppStateSchema;
		if (
			!clipboard.origin ||
			!clipboard.points ||
			toolState.tool !== "paste"
		)
			return;
		const origin = {
			x: offsetPoint.x - clipboard.origin.x,
			y: offsetPoint.y - clipboard.origin.y,
		};
		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];
		clipboard.points.forEach((point) => {
			const [x, y] = [point.x + origin.x, point.y + origin.y];
			if (x < 0 || y < 0 || y >= grid.length || x >= grid[y].length)
				return;
			const pointAfter = {
				x: x,
				y: y,
				color: point.color,
			};
			const pointBefore = {
				x,
				y,
				color: grid[y][x],
			};
			pointsAfter.push(pointAfter);
			pointsBefore.push(pointBefore);
		});
		dispatch(setPixelsWithColor({ points: pointsAfter }));

		const historyAction: Omit<Action, "id" | "toolUsed"> = {
			pointsBefore,
			pointsAfter,
		};
		dispatch(addActionToHistory(historyAction));
	}
);
