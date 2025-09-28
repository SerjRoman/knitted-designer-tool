import { createAsyncThunk } from "@reduxjs/toolkit";
import { drawPixelWithColor } from "@/features/draw-with-tool";
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
		clipboard.points.forEach((point) => {
			dispatch(
				drawPixelWithColor({
					x: point.x + origin.x,
					y: point.y + origin.y,
					color: point.color,
				})
			);
		});
		dispatch(clearClipboard());
		dispatch(selectTool("select"));
	}
);
