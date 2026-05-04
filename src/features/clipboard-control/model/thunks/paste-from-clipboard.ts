import { selectGrid, setPixelsWithCode } from "@/entities/canva";
import {
	clearClipboard,
	selectClipboard,
	selectToolState,
	setTool,
} from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { type Point, type PointWithCode } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const pasteFromClipboard = createAppAsyncThunk(
    "editor/paster-from-clipboard",
    (offsetPoint: Point, { getState, dispatch }) => {
        const state = getState();
        const clipboard = selectClipboard(state);
        const toolState = selectToolState(state);
        const grid = selectGrid(state);
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
		const pointsBefore: PointWithCode[] = [];
		const pointsAfter: PointWithCode[] = [];
		clipboard.points.forEach((point) => {
			const [x, y] = [point.x + origin.x, point.y + origin.y];
			if (x < 0 || y < 0 || y >= grid.length || x >= grid[y].length)
				return;
			const pointAfter = {
				x: x,
				y: y,
				code: point.code,
			};
			const pointBefore = {
				x,
				y,
				code: grid[y][x],
			};
			pointsAfter.push(pointAfter);
			pointsBefore.push(pointBefore);
		});
		dispatch(setPixelsWithCode({ points: pointsAfter }));
        if (!toolState.repeat) {
            dispatch(clearClipboard());
            dispatch(setTool("brush"));
        }
        dispatch(
            addActionToHistory({
                type: "DRAW",
				payload: {
					pointsAfter,
					pointsBefore,
				},
			}),
		);
	},
);
