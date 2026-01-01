import { useCallback } from "react";
import { pasteFromClipboard } from "@/features/clipboard-control";
import { drawClipboardPreview, selectPixelDimensions } from "@/entities/canvas";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import type { PreviewToolHandler, ToolHandler, ToolHandlers } from "../lib";

export function usePasteTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const {
		toolState: { tool },
		clipboard,
	} = useAppSelector((state) => state.editor);
	const { numberOfColumns, numberOfRows } = useAppSelector(
		(state) => state.canvas
	);
	const { width: pixelWidth, height: pixelHeight } = useAppSelector(
		selectPixelDimensions
	);
	const onMouseDown: ToolHandler = useCallback(
		({ point }) => {
			if (tool === "paste") {
				dispatch(pasteFromClipboard(point));
			}
		},
		[dispatch, tool]
	);
	const onDrawPreview: PreviewToolHandler = useCallback(
		(context, { lastValidPoint }) => {
			if (!lastValidPoint || !clipboard.points || !clipboard.origin)
				return;
			const offset = {
				x: lastValidPoint.x - clipboard.origin.x,
				y: lastValidPoint.y - clipboard.origin.y,
			};
			drawClipboardPreview(
				context,
				clipboard.points,
				offset,
				pixelWidth,
				pixelHeight,
				numberOfColumns,
				numberOfRows
			);
		},
		[clipboard, numberOfColumns, numberOfRows, pixelHeight, pixelWidth]
	);
	return { onMouseDown, onDrawPreview };
}
