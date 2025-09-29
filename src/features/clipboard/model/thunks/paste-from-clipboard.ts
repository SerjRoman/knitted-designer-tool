import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixelsWithColor } from "@/entities/canvas";
import { clearClipboard, selectTool } from "@/entities/editor";
import type { AppStateSchema, Point } from "@/shared/lib";

export const pasteFromClipboard = createAsyncThunk(
	"editor/paster-from-clipboard",
	(offsetPoint: Point, { getState, dispatch }) => {
		const {
			editor: { clipboard, toolState },
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
		const pointsToFill = clipboard.points.map((point) => ({
			x: point.x + origin.x,
			y: point.y + origin.y,
			color: point.color,
		}));
		dispatch(setPixelsWithColor({ points: pointsToFill }));
		dispatch(clearClipboard());
		dispatch(selectTool("select"));
	}
);
