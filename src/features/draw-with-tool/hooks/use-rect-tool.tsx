import { useCallback } from "react";
import { drawPreviewRect } from "@/entities/canvas";
import { setRectStartPoint } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import type { PreviewToolHandler, ToolHandler, ToolHandlers } from "../lib";
import { drawRect } from "../model";

export function useRectTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const { toolState } = useAppSelector((state) => state.editor);
	const pixelSize = useAppSelector((state) => state.canvas.pixelSize);
	const onMouseDown: ToolHandler = useCallback(
		({ point }) => {
			if (toolState.tool === "rect") {
				dispatch(setRectStartPoint(point));
			}
		},
		[dispatch, toolState.tool]
	);
	const onMouseUp: ToolHandler = useCallback(
		({ point }) => {
			if (toolState.tool === "rect") {
				dispatch(drawRect(point));
			}
		},
		[dispatch, toolState.tool]
	);
	const onDrawPreview: PreviewToolHandler = useCallback(
		(context, { point }) => {
			if (toolState.tool === "rect" && toolState.startPoint) {
				drawPreviewRect(
					context,
					toolState.startPoint,
					point,
					pixelSize
				);
			}
		},
		[toolState, pixelSize]
	);
	return { onMouseDown, onMouseUp, onDrawPreview };
}
