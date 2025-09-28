import { useCallback } from "react";
import { pasteFromClipboard } from "@/features/clipboard";
import { drawClipboardPreview } from "@/entities/canvas";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import type { PreviewToolHandler, ToolHandler, ToolHandlers } from "../lib";

export function usePasteTool(): ToolHandlers & { isPreview: boolean } {
	const dispatch = useAppDispatch();
	const {
		toolState: { tool },
		clipboard,
	} = useAppSelector((state) => state.editor);
	const pixelSize = useAppSelector((state) => state.canvas.pixelSize);

	const onMouseDown: ToolHandler = useCallback(
		({ point }) => {
			if (tool === "paste") {
				dispatch(pasteFromClipboard(point));
			}
		},
		[dispatch, tool]
	);
	const onDrawPreview: PreviewToolHandler = useCallback(
		(context, { point }) => {
			if (tool === "paste") {
				if (clipboard.points && clipboard.origin) {
					drawClipboardPreview(
						context,
						clipboard.points,
						{
							x: point.x - clipboard.origin.x,
							y: point.y - clipboard.origin.y,
						},
						pixelSize
					);
				}
			}
		},
		[clipboard, pixelSize, tool]
	);
	return { onMouseDown, onDrawPreview, isPreview: false };
}
